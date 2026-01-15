"use client";

import { useState, useEffect } from "react";

export function ClosingIssuanceChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const width = 500;
  const height = 200;
  const padding = { top: 30, right: 40, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const closingPoint = 0.65;
  const ceilingData = [
    { x: 0, y: 1 },
    { x: 0.15, y: 1.4 },
    { x: 0.3, y: 2 },
    { x: 0.45, y: 2.8 },
    { x: closingPoint, y: 4 },
  ];

  const floorData = [
    { x: 0, y: 0.3 },
    { x: 0.15, y: 0.5 },
    { x: 0.3, y: 0.8 },
    { x: 0.45, y: 1.2 },
    { x: closingPoint, y: 1.8 },
    { x: 0.8, y: 2.2 },
    { x: 1, y: 2.6 },
  ];

  const scaleX = (x: number) => padding.left + x * chartWidth;
  const scaleY = (y: number) => padding.top + (1 - y / 5) * chartHeight;

  const ceilingPath = ceilingData
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`)
    .join(" ");

  const floorPath = floorData
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`)
    .join(" ");

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Closing Issuance</div>
          <div className="text-xs text-neutral-500">Ceiling ends, floor continues</div>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: "#fbbf24" }} />
            <span className="text-neutral-400">Ceiling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: "#22c55e" }} />
            <span className="text-neutral-400">Floor</span>
          </div>
        </div>
      </div>

      <div>
        <svg
          className="w-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="activeZone" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="closedZone" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#525252" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#525252" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Active issuance zone */}
          <rect
            x={padding.left}
            y={padding.top}
            width={closingPoint * chartWidth}
            height={chartHeight}
            fill="url(#activeZone)"
          />

          {/* Closed zone */}
          <rect
            x={scaleX(closingPoint)}
            y={padding.top}
            width={(1 - closingPoint) * chartWidth}
            height={chartHeight}
            fill="url(#closedZone)"
          />

          {/* Closing line */}
          <line
            x1={scaleX(closingPoint)}
            y1={padding.top}
            x2={scaleX(closingPoint)}
            y2={height - padding.bottom}
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="6 4"
          />

          {/* Grid lines */}
          {[1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line
                x1={padding.left}
                y1={scaleY(v)}
                x2={width - padding.right}
                y2={scaleY(v)}
                stroke="#262626"
                strokeDasharray="2 4"
              />
              <text
                x={padding.left - 8}
                y={scaleY(v)}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#525252"
                fontSize={10}
              >
                ${v}
              </text>
            </g>
          ))}

          {/* Ceiling line (only during active phase) */}
          <path
            d={ceilingPath}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Ceiling end marker */}
          <circle
            cx={scaleX(closingPoint)}
            cy={scaleY(4)}
            r={5}
            fill="#0a0a0a"
            stroke="#fbbf24"
            strokeWidth={2}
          />

          {/* Floor line (continues through both phases) */}
          <path
            d={floorPath}
            fill="none"
            stroke="#22c55e"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Labels */}
          <text
            x={scaleX(closingPoint / 2)}
            y={height - 12}
            textAnchor="middle"
            fill="#f97316"
            fontSize={11}
            fontWeight={500}
          >
            Issuance Active
          </text>
          <text
            x={scaleX(closingPoint + (1 - closingPoint) / 2)}
            y={height - 12}
            textAnchor="middle"
            fill="#525252"
            fontSize={11}
            fontWeight={500}
          >
            Issuance Closed
          </text>

          {/* Closing point label */}
          <text
            x={scaleX(closingPoint)}
            y={padding.top - 10}
            textAnchor="middle"
            fill="#ef4444"
            fontSize={10}
            fontWeight={500}
          >
            Minting stops
          </text>

          {/* Arrow showing floor continues */}
          <g transform={`translate(${width - padding.right + 5}, ${scaleY(2.6)})`}>
            <path
              d="M 0 0 L 8 0 L 5 -3 M 8 0 L 5 3"
              stroke="#22c55e"
              strokeWidth={1.5}
              fill="none"
            />
          </g>
        </svg>
      </div>

      <div className="mt-4 flex gap-4 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-orange-500" />
          <span>New tokens can be minted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-neutral-600" />
          <span>Supply is fixed, only trading & cash-outs</span>
        </div>
      </div>
    </div>
  );
}
