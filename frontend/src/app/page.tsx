"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import RpeSlider from "./components/RpeSlider";
import FatigueCard from "./components/FatigueCard";
import PlanAdjustCard from "./components/PlanAdjustCard";

type Tab = "plan" | "chat";

interface Message {
  role: "user" | "assistant";
  content: string;
  card?: "fatigue" | "plan_adjust";
}

const QUOTES = [
  "陪你轻松练，每一步都算数 💪",
  "你的私人 AI 健身教练 🏋️",
  "科学训练，快乐运动 🌟",
];

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("plan");
  const [rpeScore, setRpeScore] = useState(3);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemoFlow, setShowDemoFlow] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是 FitBuddy，你的智能健身助手 💪\n\n有什么我可以帮你的吗？",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    // Demo flow: if user says "今天太累了", show cards
    if (trimmed.includes("太累") || trimmed.includes("不想运动") || trimmed.includes("累了")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "我理解你的感受！让我先帮你分析一下当前状态 🧐",
          },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "",
              card: "fatigue",
            },
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "根据你的疲劳程度，我已经自动调整了今天的训练计划：",
              },
            ]);
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: "",
                  card: "plan_adjust",
                },
              ]);
              setLoading(false);
            }, 400);
          }, 400);
        }, 500);
      }, 600);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, rpe_score: rpeScore }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "抱歉，出了点问题，请稍后再试 😢" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "网络连接失败，请检查网络后重试 🔌" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
  };

  const triggerDemoFlow = () => {
    setShowDemoFlow(true);
    const msg: Message = { role: "user", content: "今天太累了，不想运动 😮‍💨" };
    setMessages((prev) => [...prev, msg]);
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "我理解你的感受！让我先帮你分析一下当前状态 🧐" },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "", card: "fatigue" },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "根据你的疲劳程度，我已经自动调整了今天的训练计划：" },
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "", card: "plan_adjust" },
            ]);
            setLoading(false);
          }, 400);
        }, 400);
      }, 500);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen max-w-[600px] mx-auto bg-white shadow-xl relative">
      {/* ========== PLAN TAB ========== */}
      {tab === "plan" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="shrink-0 px-5 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-800">FitBuddy</h1>
              <p className="text-[11px] text-mint-600">{quote}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mint-200/50">
              F
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-5 space-y-4 pb-4">
            {/* Energy Card */}
            <div className="bg-gradient-to-br from-mint-50 via-emerald-50 to-mint-100 rounded-2xl p-4 border border-mint-100 shadow-sm animate-fade-in-up">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mint-100 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L4 14h5l-2 8 9-12h-5l2-8z" fill="#059669" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-mint-800">今日能量</p>
                    <p className="text-2xl font-bold text-mint-700 mt-0.5">恢复模式</p>
                  </div>
                </div>
                <div className="w-14 h-14 relative flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 64 64" className="-rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#D1FAE5" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="4"
                      strokeDasharray="163"
                      strokeDashoffset="49"
                      strokeLinecap="round"
                      className="circle-progress"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-mint-700">70%</span>
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-[11px]">
                <span className="px-2 py-0.5 bg-mint-100 text-mint-700 rounded-full font-medium">建议减量</span>
                <span className="px-2 py-0.5 bg-warm-100 text-warm-700 rounded-full font-medium">睡眠不足</span>
              </div>
            </div>

            {/* Today's Plan Card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 p-4 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-mint-50 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">今日计划</p>
                  <p className="text-[11px] text-mint-600">已根据状态自动调整</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { icon: "🫧", title: "泡沫轴放松", dur: "10 min", done: true },
                  { icon: "🤸", title: "动态拉伸", dur: "8 min", done: true },
                  { icon: "🚶", title: "低强度有氧", dur: "25 min", done: false },
                  { icon: "🧘", title: "核心稳定性", dur: "10 min", done: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                      item.done ? "bg-mint-50/50" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className={`flex-1 text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                      {item.title}
                    </span>
                    <span className="text-[11px] text-gray-400">{item.dur}</span>
                    {item.done && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/plan")}
                className="mt-3 w-full py-2.5 bg-gradient-to-r from-mint-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-mint-600 hover:to-emerald-600 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.25)] active:scale-[0.98]"
              >
                查看完整计划 →
              </button>
            </div>

            {/* RPE Slider */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 p-4 animate-fade-in-up">
              <RpeSlider value={rpeScore} onChange={setRpeScore} />
            </div>

            {/* Quick Chat CTA */}
            <button
              onClick={() => {
                setTab("chat");
                if (!showDemoFlow) {
                  setTimeout(() => triggerDemoFlow(), 300);
                }
              }}
              className="w-full py-3 bg-white border-2 border-mint-200 text-mint-700 text-sm font-medium rounded-2xl hover:bg-mint-50 transition-all flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              和 FitBuddy 聊聊今天的训练
            </button>
          </main>
        </div>
      )}

      {/* ========== CHAT TAB ========== */}
      {tab === "chat" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <header className="shrink-0 flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur-md border-b border-mint-100/50">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mint-200/50">
                F
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-mint-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-gray-800">FitBuddy</h1>
              <p className="text-[10px] text-mint-500 truncate">在线 · 智能健身助手</p>
            </div>
            {!showDemoFlow && (
              <button
                onClick={triggerDemoFlow}
                className="text-[10px] text-mint-500 border border-mint-200 rounded-full px-3 py-1 hover:bg-mint-50 transition-colors"
              >
                演示对话
              </button>
            )}
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 30}ms` }}>
                {msg.role === "assistant" && !msg.card && (
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      F
                    </div>
                    <div className="bg-white text-gray-700 text-sm leading-relaxed whitespace-pre-wrap rounded-2xl rounded-bl-md px-4 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-100/50 max-w-[85%]">
                      {msg.content}
                    </div>
                  </div>
                )}

                {msg.role === "user" && (
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-mint-400 to-mint-500 text-white text-sm leading-relaxed whitespace-pre-wrap rounded-2xl rounded-br-md px-4 py-2.5 shadow-md shadow-mint-200/50 max-w-[85%]">
                      {msg.content}
                    </div>
                  </div>
                )}

                {msg.card === "fatigue" && (
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      F
                    </div>
                    <div className="max-w-[90%]">
                      <FatigueCard />
                    </div>
                  </div>
                )}

                {msg.card === "plan_adjust" && (
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      F
                    </div>
                    <div className="max-w-[90%]">
                      <PlanAdjustCard onViewPlan={() => router.push("/plan")} />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2 animate-fade-in-up">
                <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-mint-300 to-mint-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  F
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-100/50">
                  <div className="flex items-center gap-1.5">
                    <span className="typing-dot w-2 h-2 bg-mint-400 rounded-full animate-bounce" />
                    <span className="typing-dot w-2 h-2 bg-mint-400 rounded-full animate-bounce" />
                    <span className="typing-dot w-2 h-2 bg-mint-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </main>

          {/* Chat Input */}
          <footer className="shrink-0 bg-white/80 backdrop-blur-md border-t border-mint-100/50 px-4 pt-2 pb-4">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  handleInput();
                }}
                onKeyDown={handleKeyDown}
                placeholder="输入消息..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent bg-gray-50 placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="shrink-0 w-10 h-10 rounded-xl bg-mint-500 text-white flex items-center justify-center hover:bg-mint-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* ========== BOTTOM TAB BAR ========== */}
      <nav className="shrink-0 bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-6 py-2 safe-area-bottom">
        <button
          onClick={() => setTab("plan")}
          className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl transition-all ${
            tab === "plan" ? "text-mint-600" : "text-gray-400"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              stroke={tab === "plan" ? "#059669" : "#9CA3AF"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-medium">计划</span>
          {tab === "plan" && <div className="w-1 h-1 rounded-full bg-mint-500" />}
        </button>

        <button
          onClick={() => {
            setTab("chat");
            if (!showDemoFlow) {
              setTimeout(() => triggerDemoFlow(), 300);
            }
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl transition-all ${
            tab === "chat" ? "text-mint-600" : "text-gray-400"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke={tab === "chat" ? "#059669" : "#9CA3AF"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] font-medium">对话</span>
          {tab === "chat" && <div className="w-1 h-1 rounded-full bg-mint-500" />}
        </button>
      </nav>
    </div>
  );
}