"use client";

import { useRouter } from "next/navigation";

const TASKS = [
  {
    time: "09:00",
    title: "泡沫轴放松",
    desc: "全身肌筋膜放松",
    duration: "10 min",
    icon: "🫧",
    done: true,
  },
  {
    time: "09:15",
    title: "动态拉伸",
    desc: "肩髋踝关节激活",
    duration: "8 min",
    icon: "🤸",
    done: true,
  },
  {
    time: "09:30",
    title: "低强度有氧",
    desc: "快走或骑行 · 心率 Zone 2",
    duration: "25 min",
    icon: "🚶",
    done: false,
  },
  {
    time: "10:00",
    title: "核心稳定性",
    desc: "平板支撑 + 鸟狗式",
    duration: "10 min",
    icon: "🧘",
    done: false,
  },
  {
    time: "10:15",
    title: "静态拉伸放松",
    desc: "重点：腘绳肌、髋屈肌",
    duration: "7 min",
    icon: "🧎",
    done: false,
  },
];

export default function PlanPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen max-w-[600px] mx-auto bg-white">
      {/* Header */}
      <header className="shrink-0 px-5 py-4 flex items-center gap-3 border-b border-gray-50">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-semibold text-gray-800">恢复训练计划</h1>
          <p className="text-[11px] text-mint-600">已根据你的疲劳状态自动调整</p>
        </div>
      </header>

      {/* Summary Card */}
      <div className="shrink-0 px-5 pt-4 pb-2">
        <div className="bg-gradient-to-r from-mint-50 to-emerald-50 rounded-2xl p-4 border border-mint-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-mint-600 font-medium">今日训练概览</p>
              <p className="text-2xl font-bold text-mint-800 mt-0.5">60 min</p>
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#D1FAE5" strokeWidth="5" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="5"
                  strokeDasharray="176"
                  strokeDashoffset="53"
                  strokeLinecap="round"
                  className="circle-progress"
                />
              </svg>
              <span className="absolute text-xs font-bold text-mint-700">70%</span>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="text-red-400 font-medium">↓ 44%</span>
              <span className="text-gray-400">vs 原计划</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-mint-500 font-medium">RPE 3-4</span>
              <span className="text-gray-400">目标强度</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Timeline */}
      <main className="flex-1 overflow-y-auto px-5 py-2">
        <p className="text-xs font-medium text-gray-400 mb-3 ml-1">训练任务</p>
        <div className="relative pl-6 border-l-2 border-mint-100 space-y-4">
          {TASKS.map((task, i) => (
            <div key={i} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Timeline dot */}
              <div
                className={`absolute -left-[25px] w-3 h-3 rounded-full border-2 ${
                  task.done
                    ? "bg-mint-500 border-mint-500"
                    : "bg-white border-mint-300"
                }`}
              />

              <div
                className={`rounded-xl p-3 border transition-all ${
                  task.done
                    ? "bg-mint-50/50 border-mint-100"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{task.icon}</span>
                    <div>
                      <p className={`text-sm font-medium ${task.done ? "text-gray-400" : "text-gray-700"}`}>
                        {task.title}
                      </p>
                      <p className="text-[11px] text-gray-400">{task.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-400">{task.duration}</span>
                    <p className="text-[10px] text-gray-300">{task.time}</p>
                  </div>
                </div>
                {task.done && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-mint-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    已完成
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom CTA */}
      <footer className="shrink-0 px-5 py-4 border-t border-gray-50">
        <button className="w-full py-3 bg-gradient-to-r from-mint-500 to-emerald-500 text-white text-sm font-semibold rounded-xl hover:from-mint-600 hover:to-emerald-600 transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] active:scale-[0.98]">
          开始训练
        </button>
      </footer>
    </div>
  );
}