"use client";

interface PlanAdjustCardProps {
  onViewPlan: () => void;
}

export default function PlanAdjustCard({ onViewPlan }: PlanAdjustCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-mint-100 overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-mint-50 to-emerald-50 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              stroke="#059669"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-mint-800">计划已自动调整</p>
          <p className="text-[11px] text-mint-600">智能匹配当前状态</p>
        </div>
      </div>

      <div className="px-4 py-3">
        {/* Before → After comparison */}
        <div className="flex items-stretch gap-3">
          {/* Before: HIIT */}
          <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-medium mb-1">调整前</p>
            <p className="text-sm font-bold text-gray-400 line-through">HIIT 燃脂</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] text-gray-400">45 min</span>
              <span className="text-gray-300">·</span>
              <span className="text-[11px] text-gray-400">高强度</span>
            </div>
            <div className="mt-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-1 flex-1 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* After: Recovery */}
          <div className="flex-1 bg-mint-50 rounded-xl p-3 border border-mint-200">
            <p className="text-[10px] text-mint-600 font-medium mb-1">调整后</p>
            <p className="text-sm font-bold text-mint-700">恢复训练</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] text-mint-600">25 min</span>
              <span className="text-mint-400">·</span>
              <span className="text-[11px] text-mint-600">低强度</span>
            </div>
            <div className="mt-2 flex gap-0.5">
              {[1, 2].map((i) => (
                <div key={i} className="h-1 flex-1 rounded-full bg-mint-300" />
              ))}
              {[3, 4, 5].map((i) => (
                <div key={i} className="h-1 flex-1 rounded-full bg-mint-100" />
              ))}
            </div>
          </div>
        </div>

        {/* Change summary */}
        <div className="mt-3 flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1">
            <span className="text-red-400 font-medium">↓ 44%</span>
            <span className="text-gray-400">时长</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-400 font-medium">↓ 60%</span>
            <span className="text-gray-400">强度</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-mint-500 font-medium">+ 恢复</span>
            <span className="text-gray-400">模式</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onViewPlan}
          className="mt-3 w-full py-2.5 bg-gradient-to-r from-mint-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-mint-600 hover:to-emerald-600 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] active:scale-[0.98]"
        >
          查看调整后计划 →
        </button>
      </div>
    </div>
  );
}