"use client";

import { useState, useEffect } from "react";
import { ComposedChart, Area, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 5, floor: 0.5 },
  { month: "Feb", revenue: 8, floor: 0.55 },
  { month: "Mar", revenue: 12, floor: 0.62 },
  { month: "Apr", revenue: 15, floor: 0.7 },
  { month: "May", revenue: 22, floor: 0.82 },
  { month: "Jun", revenue: 18, floor: 0.9 },
  { month: "Jul", revenue: 25, floor: 1.0 },
  { month: "Aug", revenue: 30, floor: 1.12 },
];

export function RevenueFloorChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Revenue → Floor</div>
          <div className="text-xs text-neutral-500">Earn more, floor rises</div>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded bg-orange-500/60" />
            <span className="text-neutral-400">Revenue</span>
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
              <linearGradient id="floorGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              yAxisId="revenue"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v}k`}
              domain={[0, 35]}
            />
            <YAxis
              yAxisId="floor"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={[0, 1.3]}
              dx={-4}
            />
            <Bar
              yAxisId="revenue"
              dataKey="revenue"
              fill="#f97316"
              fillOpacity={0.4}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
            <Area
              yAxisId="floor"
              type="monotone"
              dataKey="floor"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#floorGradient2)"
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        Real activity grows the treasury
      </div>
    </div>
  );
}
