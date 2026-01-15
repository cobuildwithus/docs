"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { time: "Day 1", price: 1 },
  { time: "Day 3", price: 1 },
  { time: "Week 1", price: 1 },
  { time: "Week 2", price: 5 },
  { time: "Week 3", price: 5 },
  { time: "Week 4", price: 5 },
  { time: "Month 2", price: 10 },
  { time: "Month 3", price: 10 },
];

export function StagedIssuanceChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Staged Pricing</div>
        <div className="text-xs text-neutral-500">Time-based, not volume-based</div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v}`}
              domain={[0, 12]}
              dx={-4}
            />
            <ReferenceLine
              y={1}
              stroke="#525252"
              strokeDasharray="3 3"
              label={{
                value: "$1",
                position: "right",
                fill: "#737373",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={5}
              stroke="#525252"
              strokeDasharray="3 3"
              label={{
                value: "$5",
                position: "right",
                fill: "#737373",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={10}
              stroke="#525252"
              strokeDasharray="3 3"
              label={{
                value: "$10",
                position: "right",
                fill: "#737373",
                fontSize: 10,
              }}
            />
            <Area
              type="stepAfter"
              dataKey="price"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#priceGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        Same stage = same price
      </div>
    </div>
  );
}
