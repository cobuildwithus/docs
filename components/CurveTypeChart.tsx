"use client";

import { useState, useEffect } from "react";

interface CurveTypeChartProps {
  type: "steep" | "gentle" | "stepwise";
}

const curveConfigs = {
  steep: {
    color: "#f97316",
    label: "Steep Curve",
    sublabel: "+25% per week",
    data: Array.from({ length: 13 }, (_, i) => ({
      x: i / 12,
      y: Math.pow(1.25, i),
    })),
  },
  gentle: {
    color: "#22c55e",
    label: "Gentle Curve",
    sublabel: "~3% per quarter",
    data: Array.from({ length: 13 }, (_, i) => ({
      x: i / 12,
      y: 1 + i * 0.03,
    })),
  },
  stepwise: {
    color: "#8b5cf6",
    label: "Stepwise Curve",
    sublabel: "+45% per round",
    data: [
      { x: 0, y: 1 },
      { x: 0.24, y: 1 },
      { x: 0.25, y: 1.45 },
      { x: 0.49, y: 1.45 },
      { x: 0.5, y: 2.1 },
      { x: 0.74, y: 2.1 },
      { x: 0.75, y: 3.05 },
      { x: 1, y: 3.05 },
    ],
  },
};

export function CurveTypeChart({ type }: CurveTypeChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const config = curveConfigs[type];
  const width = 600;
  const height = 180;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxY = type === "steep" ? 15 : type === "stepwise" ? 4 : 1.5;
  const minY = type === "gentle" ? 0.8 : 0;

  const scaleX = (x: number) => padding.left + x * chartWidth;
  const scaleY = (y: number) => padding.top + (1 - (y - minY) / (maxY - minY)) * chartHeight;

  const path = config.data
    .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`)
    .join(" ");

  const areaPath = `${path} L ${scaleX(1)} ${scaleY(minY)} L ${scaleX(0)} ${scaleY(minY)} Z`;

  return (
    <div className="bg-demo-dark my-4 w-full rounded-lg border border-neutral-800 p-4">
      <svg
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={config.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={config.color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#262626"
          strokeWidth={1}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#262626"
          strokeWidth={1}
        />

        {/* Area fill */}
        <path d={areaPath} fill={`url(#gradient-${type})`} />

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke={config.color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start dot */}
        <circle
          cx={scaleX(config.data[0].x)}
          cy={scaleY(config.data[0].y)}
          r={5}
          fill={config.color}
        />

        {/* End dot */}
        <circle
          cx={scaleX(config.data[config.data.length - 1].x)}
          cy={scaleY(config.data[config.data.length - 1].y)}
          r={5}
          fill={config.color}
        />

        {/* Labels */}
        <text x={padding.left} y={height - 10} fill="#525252" fontSize={12}>
          Start
        </text>
        <text
          x={width - padding.right}
          y={height - 10}
          textAnchor="end"
          fill="#525252"
          fontSize={12}
        >
          Time
        </text>
        <text
          x={padding.left - 10}
          y={padding.top + 5}
          textAnchor="end"
          fill="#525252"
          fontSize={12}
        >
          $
        </text>
      </svg>
      <div className="mt-3 flex items-center justify-between px-1">
        <span className="text-sm font-medium" style={{ color: config.color }}>
          {config.label}
        </span>
        <span className="text-xs text-neutral-500">{config.sublabel}</span>
      </div>
    </div>
  );
}
