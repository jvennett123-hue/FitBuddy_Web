"use client";

interface RpeSliderProps {
  value: number;
  onChange: (val: number) => void;
}

const RPE_LABELS: Record<number, { label: string; color: string; desc: string }> = {
  1: { label: "极轻", color: "#A7F3D0", desc: "几乎没有感觉" },
  2: { label: "很轻", color: "#6EE7B7", desc: "可以轻松交谈" },
  3: { label: "轻松", color: "#34D399", desc: "能完整唱歌" },
  4: { label: "中等偏轻", color: "#10B981", desc: "呼吸稍加深" },
  5: { label: "中等", color: "#059669", desc: "有点喘但可控" },
  6: { label: "中等偏强", color: "#F59E0B", desc: "说话开始断句" },
  7: { label: "很强烈", color: "#F97316", desc: "只能短句交流" },
  8: { label: "非常强烈", color: "#EF4444", desc: "几乎无法说话" },
  9: { label: "极强烈", color: "#DC2626", desc: "极限边缘" },
  10: { label: "极限", color: "#991B1B", desc: "完全力竭" },
};

export default function RpeSlider({ value, onChange }: RpeSliderProps) {
  const current = RPE_LABELS[value] || RPE_LABELS[5];
  const percentage = ((value - 1) / 9) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">RPE 自感疲劳度</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: current.color + "20",
            color: current.color,
          }}
        >
          {value} · {current.label}
        </span>
      </div>

      <div className="relative h-10 flex items-center">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #A7F3D0 0%, #34D399 30%, #10B981 50%, #F59E0B 65%, #EF4444 85%, #991B1B 100%)`,
          }}
        />
        <div
          className="absolute top-0 w-6 h-6 rounded-full border-2 border-white shadow-md transition-all duration-200 pointer-events-none"
          style={{
            left: `calc(${percentage}% - ${percentage * 0.12}px)`,
            backgroundColor: current.color,
            transform: "translateY(-2px)",
          }}
        />
      </div>

      <div className="flex justify-between mt-1">
        {[1, 3, 5, 7, 10].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`text-[10px] transition-colors ${
              value === n ? "font-bold" : "text-gray-400"
            }`}
            style={{ color: value === n ? RPE_LABELS[n].color : undefined }}
          >
            {n}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-gray-400 mt-1.5 text-center italic">
        {current.desc}
      </p>
    </div>
  );
}