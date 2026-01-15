"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  {
    month: "M1",
    builder1: 2,
    builder2: 0,
    builder3: 0,
    builder4: 0,
    floor: 0.1,
  },
  {
    month: "M2",
    builder1: 3,
    builder2: 1,
    builder3: 0,
    builder4: 0,
    floor: 0.14,
  },
  {
    month: "M3",
    builder1: 4,
    builder2: 2,
    builder3: 1,
    builder4: 0,
    floor: 0.21,
  },
  {
    month: "M4",
    builder1: 5,
    builder2: 3,
    builder3: 2,
    builder4: 1,
    floor: 0.32,
  },
  {
    month: "M5",
    builder1: 5,
    builder2: 4,
    builder3: 3,
    builder4: 2,
    floor: 0.46,
  },
  {
    month: "M6",
    builder1: 6,
    builder2: 5,
    builder3: 4,
    builder4: 3,
    floor: 0.64,
  },
  {
    month: "M7",
    builder1: 7,
    builder2: 6,
    builder3: 5,
    builder4: 5,
    floor: 0.87,
  },
  {
    month: "M8",
    builder1: 8,
    builder2: 7,
    builder3: 6,
    builder4: 6,
    floor: 1.14,
  },
];

const builders = [
  { key: "builder1", label: "Merch", color: "#f97316" },
  { key: "builder2", label: "Events", color: "#8b5cf6" },
  { key: "builder3", label: "Courses", color: "#06b6d4" },
  { key: "builder4", label: "Services", color: "#ec4899" },
];

export function NetworkRevenueChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Many builders, one treasury</div>
          <div className="text-xs text-neutral-500">Each sale lifts the floor for everyone</div>
        </div>
        <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-xs">
          {builders.map((b) => (
            <div key={b.key} className="flex items-center gap-1.5">
              <div className="size-2 rounded" style={{ backgroundColor: b.color, opacity: 0.7 }} />
              <span className="text-neutral-400">{b.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-400">Floor</span>
          </div>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              {builders.map((b) => (
                <linearGradient key={b.key} id={`gradient-${b.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={b.color} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={b.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
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
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v}k`}
              domain={[0, 30]}
            />
            <YAxis
              yAxisId="floor"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={[0, 1.4]}
            />
            {builders.map((b) => (
              <Area
                key={b.key}
                yAxisId="revenue"
                type="monotone"
                dataKey={b.key}
                stackId="1"
                stroke={b.color}
                strokeWidth={1}
                fill={`url(#gradient-${b.key})`}
                isAnimationActive={false}
              />
            ))}
            <Area
              yAxisId="floor"
              type="monotone"
              dataKey="floor"
              stroke="#22c55e"
              strokeWidth={2.5}
              fill="none"
              isAnimationActive={false}
              dot={{ fill: "#22c55e", r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        Your customer's tokens gain value from every builder's sales, not just yours
      </div>
    </div>
  );
}
