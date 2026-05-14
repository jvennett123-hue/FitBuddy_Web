"use client";

export default function FatigueCard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-mint-100 overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-mint-50 to-mint-100 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-mint-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L4 14h5l-2 8 9-12h-5l2-8z"
              fill="#059669"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-mint-800">疲劳分析</p>
          <p className="text-[11px] text-mint-600">基于 RPE 7 · 很强烈</p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warm-400" />
          <p className="text-xs text-gray-600">
            <span className="font-medium text-gray-700">训练负荷偏高</span> — 本周已累计 4 次高强度训练
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warm-400" />
          <p className="text-xs text-gray-600">
            <span className="font-medium text-gray-700">恢复不足</span> — 建议睡眠 7-8h，当前平均 6.2h
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint-400" />
          <p className="text-xs text-gray-600">
            <span className="font-medium text-gray-700">建议调整</span> — 将今日 HIIT 替换为低强度恢复训练
          </p>
        </div>
      </div>
    </div>
  );
}