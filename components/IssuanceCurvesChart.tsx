"use client";

import { useState, useEffect } from "react";

const generateData = () => {
  const data = [];
  for (let week = 0; week <= 24; week++) {
    const steep = Math.pow(1.25, week);
    const gentle = 1 + week * 0.012;
    const round = Math.floor(week / 6);
    const stepwise = Math.pow(1.45, round);

    data.push({
      week,
      steep: Math.min(steep, 150),
      gentle,
      stepwise,
    });
  }
  return data;
};

export function IssuanceCurvesChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const data = generateData();
  const width = 600;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Log scale for Y axis
  const minY = 1;
  const maxY = 150;
  const scaleX = (week: number) => padding.left + (week / 24) * chartWidth;
  const scaleY = (y: number) => {
    const logMin = Math.log10(minY);
    const logMax = Math.log10(maxY);
    const logY = Math.log10(Math.max(y, minY));
    return padding.top + (1 - (logY - logMin) / (logMax - logMin)) * chartHeight;
  };

  const createPath = (key: "steep" | "gentle" | "stepwise") => {
    if (key === "stepwise") {
      // Step function for stepwise
      let path = "";
      for (let i = 0; i < data.length; i++) {
        const x = scaleX(data[i].week);
        const y = scaleY(data[i][key]);
        if (i === 0) {
          path = `M ${x} ${y}`;
        } else {
          const prevY = scaleY(data[i - 1][key]);
          if (data[i][key] !== data[i - 1][key]) {
            // Step: horizontal then vertical
            path += ` L ${x} ${prevY} L ${x} ${y}`;
          } else {
            path += ` L ${x} ${y}`;
          }
        }
      }
      return path;
    }
    return data
      .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.week)} ${scaleY(p[key])}`)
      .join(" ");
  };

  const yTicks = [1, 5, 10, 50, 100];

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Three Issuance Curves</div>
          <div className="text-xs text-neutral-500">How the ceiling rises over time</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid lines */}
          {yTicks.map((v) => (
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

          {/* X axis labels */}
          {[0, 6, 12, 18, 24].map((week) => (
            <text
              key={week}
              x={scaleX(week)}
              y={height - padding.bottom + 15}
              textAnchor="middle"
              fill="#525252"
              fontSize={10}
            >
              W{week}
            </text>
          ))}

          {/* Axis label */}
          <text x={width / 2} y={height - 5} textAnchor="middle" fill="#525252" fontSize={11}>
            Weeks
          </text>

          {/* Lines */}
          <path
            d={createPath("steep")}
            fill="none"
            stroke="#f97316"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={createPath("gentle")}
            fill="none"
            stroke="#22c55e"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={createPath("stepwise")}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-neutral-800/50 pt-3">
        <div className="text-center">
          <div className="text-xs font-medium" style={{ color: "#fb923c" }}>
            Steep
          </div>
          <div className="mt-0.5 text-[10px] text-neutral-400">High FOMO, fast treasury</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium" style={{ color: "#34d399" }}>
            Gentle
          </div>
          <div className="mt-0.5 text-[10px] text-neutral-400">Stable, calm participation</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-medium" style={{ color: "#a78bfa" }}>
            Stepwise
          </div>
          <div className="mt-0.5 text-[10px] text-neutral-400">Round-based campaigns</div>
        </div>
      </div>
    </div>
  );
}
