"use client";

import { useEffect, useState } from "react";

export function AutoIssuanceChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const width = 500;
  const height = 160;
  const padding = { top: 25, right: 55, bottom: 30, left: 40 };

  const points = [
    { x: 0, floor: 0.55, supply: 0.3 },
    { x: 1, floor: 0.6, supply: 0.32 },
    { x: 2, floor: 0.65, supply: 0.34 },
    { x: 3, floor: 0.5, supply: 0.52 },
    { x: 4, floor: 0.55, supply: 0.54 },
    { x: 5, floor: 0.6, supply: 0.56 },
    { x: 6, floor: 0.65, supply: 0.58 },
    { x: 7, floor: 0.48, supply: 0.78 },
    { x: 8, floor: 0.52, supply: 0.8 },
    { x: 9, floor: 0.56, supply: 0.82 },
  ];

  const scaleX = (x: number) => padding.left + (x / 9) * (width - padding.left - padding.right);
  const scaleYFloor = (y: number) =>
    padding.top + (1 - y) * (height - padding.top - padding.bottom);
  const scaleYSupply = (y: number) =>
    padding.top + (1 - y) * (height - padding.top - padding.bottom);

  const floorPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleYFloor(p.floor)}`)
    .join(" ");

  const supplyPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleYSupply(p.supply)}`)
    .join(" ");

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs text-neutral-500">Auto-issuance causes sudden floor drops</div>
        <div className="flex gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-3 bg-emerald-500" />
            <span className="text-neutral-500">Floor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-3 bg-blue-500" />
            <span className="text-neutral-500">Supply</span>
          </div>
        </div>
      </div>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={supplyPath} fill="none" stroke="#3b82f6" strokeWidth={2} />
        <path d={floorPath} fill="none" stroke="#22c55e" strokeWidth={2} />

        {[3, 7].map((x) => (
          <g key={x}>
            <line
              x1={scaleX(x)}
              y1={padding.top}
              x2={scaleX(x)}
              y2={height - padding.bottom}
              stroke="#ef4444"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.4}
            />
            <circle cx={scaleX(x)} cy={scaleYFloor(points[x].floor)} r={4} fill="#ef4444" />
            <circle
              cx={scaleX(x)}
              cy={scaleYSupply(points[x].supply)}
              r={4}
              fill="#3b82f6"
              stroke="#ef4444"
              strokeWidth={1.5}
            />
            <text
              x={scaleX(x)}
              y={padding.top - 8}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={9}
              fontWeight={500}
            >
              Auto-mint
            </text>
          </g>
        ))}

        <text
          x={width - padding.right + 8}
          y={scaleYFloor(points[points.length - 1].floor)}
          fill="#22c55e"
          fontSize={10}
          dominantBaseline="middle"
        >
          Floor
        </text>
        <text
          x={width - padding.right + 8}
          y={scaleYSupply(points[points.length - 1].supply)}
          fill="#3b82f6"
          fontSize={10}
          dominantBaseline="middle"
        >
          Supply
        </text>

        <text x={width / 2} y={height - 8} textAnchor="middle" fill="#525252" fontSize={10}>
          Time →
        </text>
      </svg>
      <div className="mt-3 text-center text-[10px] text-neutral-600">
        Supply jumps ↑ while floor drops ↓ — treasury unchanged but tokens increase
      </div>
    </div>
  );
}
