"use client";

import { useEffect, useState } from "react";

export function FlatIssuanceChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const width = 500;
  const height = 140;
  const padding = { top: 20, right: 55, bottom: 30, left: 40 };

  const ceilingY = padding.top + 15;
  const floorStart = height - padding.bottom - 25;
  const floorEnd = height - padding.bottom - 50;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs text-neutral-500">Floor stagnates when ceiling stays flat</div>
        <div className="flex gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-3 bg-amber-500" />
            <span className="text-neutral-500">Ceiling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-3 bg-emerald-500" />
            <span className="text-neutral-500">Floor</span>
          </div>
        </div>
      </div>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1={padding.left}
          y1={ceilingY}
          x2={width - padding.right}
          y2={ceilingY}
          stroke="#fbbf24"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <text
          x={width - padding.right + 8}
          y={ceilingY}
          fill="#fbbf24"
          fontSize={10}
          dominantBaseline="middle"
        >
          Ceiling
        </text>

        <path
          d={`M ${padding.left} ${floorStart} 
              Q ${padding.left + 80} ${floorEnd + 15}, ${padding.left + 140} ${floorEnd}
              L ${width - padding.right} ${floorEnd}`}
          fill="none"
          stroke="#22c55e"
          strokeWidth={2}
        />
        <text
          x={width - padding.right + 8}
          y={floorEnd}
          fill="#22c55e"
          fontSize={10}
          dominantBaseline="middle"
        >
          Floor
        </text>

        <rect
          x={padding.left + 140}
          y={floorEnd - 4}
          width={width - padding.right - padding.left - 140}
          height={8}
          fill="#ef4444"
          fillOpacity={0.2}
          rx={2}
        />
        <text
          x={(padding.left + 160 + width - padding.right) / 2}
          y={floorEnd + 20}
          textAnchor="middle"
          fill="#ef4444"
          fontSize={10}
        >
          Stagnation zone
        </text>

        <text x={width / 2} y={height - 8} textAnchor="middle" fill="#525252" fontSize={10}>
          Time →
        </text>
      </svg>
    </div>
  );
}
