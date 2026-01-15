"use client";

import { useState, useEffect } from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { time: 0, floor: 0.4, ceiling: 1.0, amm: 0.6 },
  { time: 1, floor: 0.42, ceiling: 1.0, amm: 0.75 },
  { time: 2, floor: 0.45, ceiling: 1.0, amm: 0.65 },
  { time: 3, floor: 0.5, ceiling: 2.0, amm: 0.8 },
  { time: 4, floor: 0.55, ceiling: 2.0, amm: 1.2 },
  { time: 5, floor: 0.6, ceiling: 2.0, amm: 1.0 },
  { time: 6, floor: 0.65, ceiling: 3.0, amm: 1.4 },
  { time: 7, floor: 0.7, ceiling: 3.0, amm: 1.8 },
  { time: 8, floor: 0.75, ceiling: 3.0, amm: 1.5 },
];

export function AMMBandChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">AMM Trading Band</div>
          <div className="text-xs text-neutral-500">Price floats between floor and ceiling</div>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-orange-500" />
            <span className="text-neutral-400">Mint Price</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-sky-400" />
            <span className="text-neutral-400">AMM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-400">Floor</span>
          </div>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="floorGradientBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(1)}`}
              domain={[0, 3.5]}
              dx={-4}
            />
            <Area
              type="monotone"
              dataKey="floor"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#floorGradientBand)"
              isAnimationActive={false}
            />
            <Line
              type="stepAfter"
              dataKey="ceiling"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="amm"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-between text-xs text-neutral-600">
        <span>Time →</span>
        <span className="text-neutral-500">Floor = redeem price</span>
      </div>
    </div>
  );
}
