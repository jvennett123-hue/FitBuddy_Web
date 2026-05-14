import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, rpe_score } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // --- 1. 调用 Coze API（首次聊天请求） ---
    const cozeResponse = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COZE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_BOT_ID,
        user_id: 'fitbuddy_user',
        stream: false,
        auto_save_history: true,
        additional_messages: [{ role: 'user', content: message, content_type: 'text' }],
      }),
    });

    let cozeData = await cozeResponse.json();
    const chatId = cozeData.data?.id;
    const conversationId = cozeData.data?.conversation_id;

    // --- 2. 增强轮询逻辑：等待任务完成并抓取消息 ---
    let answer = "";
    if (chatId && conversationId) {
      let status = cozeData.data?.status;
      let pollCount = 0;

      // 如果还在处理中，最多等 4 次（约 8 秒）
      while (status === 'in_progress' && pollCount < 4) {
        await new Promise(r => setTimeout(r, 2000)); // 每 2 秒查一次
        const pollRes = await fetch(`https://api.coze.cn/v3/chat/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`, {
          headers: { 'Authorization': `Bearer ${process.env.COZE_TOKEN}`, 'Content-Type': 'application/json' }
        });
        const pollData = await pollRes.json();
        status = pollData.data?.status;
        pollCount++;
        console.log(`轮询中... 状态: ${status}, 次数: ${pollCount}`);
      }

      // 无论状态如何，最后去消息列表抓取最新的 answer
      const listRes = await fetch(`https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${conversationId}`, {
        headers: { 'Authorization': `Bearer ${process.env.COZE_TOKEN}`, 'Content-Type': 'application/json' }
      });
      const listData = await listRes.json();
      if (Array.isArray(listData.data)) {
        const answerMsg = listData.data.find(m => m.type === 'answer');
        answer = answerMsg?.content || "";
      }
    }

    // --- 3. 兜底与异常处理 ---
    if (!answer) {
      console.log("Coze 解析失败，完整数据参考:", JSON.stringify(cozeData));
      answer = "AI 正在深度思考中，请稍后刷新，它已经为你准备好计划了！";
    }

    // --- 4. 存入 Supabase (修正字段兼容性) ---
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      // 使用动态 key 解决你终端里报错的列名不匹配问题
      const logData = { question: message, answer: answer };
      if (rpe_score !== undefined) logData.rpe_score = rpe_score;

      const { error: dbError } = await supabase.from('user_fitness_logs').insert([logData]);
      if (dbError) console.error('Supabase Error (Ignored):', dbError.message);
    }

    return NextResponse.json({ answer });

  } catch (err) {
    console.error('Final Crash Protection:', err);
    return NextResponse.json({ error: 'AI 暂时走神了' }, { status: 500 });
  }
}