"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { time: 0, market: 1.0, floor: 0.6 },
  { time: 1, market: 1.3, floor: 0.62 },
  { time: 2, market: 0.9, floor: 0.65 },
  { time: 3, market: 1.1, floor: 0.7 },
  { time: 4, market: 0.85, floor: 0.74 },
  { time: 5, market: 1.2, floor: 0.8 },
  { time: 6, market: 1.0, floor: 0.85 },
  { time: 7, market: 0.92, floor: 0.9 },
  { time: 8, market: 1.2, floor: 0.95 },
];

export function CashOutFloorChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Price vs Floor</div>
          <div className="text-xs text-neutral-500">Redemption mechanism</div>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-orange-500" />
            <span className="text-neutral-400">Market</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-400">Floor</span>
          </div>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="floorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={() => ""}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={[0.4, 1.5]}
              dx={-4}
            />
            <Area
              type="monotone"
              dataKey="floor"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#floorGradient)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="market"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#marketGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-between text-xs text-neutral-600">
        <span>Time →</span>
        <span className="text-neutral-500">Floor designed to rise</span>
      </div>
    </div>
  );
}
