"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from "recharts";

const data = [
  { time: 0, price: 0.01 },
  { time: 1, price: 0.02 },
  { time: 2, price: 0.08 },
  { time: 3, price: 0.25 },
  { time: 4, price: 0.6 },
  { time: 5, price: 1.0 },
  { time: 6, price: 0.7 },
  { time: 7, price: 0.3 },
  { time: 8, price: 0.15 },
  { time: 9, price: 0.08 },
  { time: 10, price: 0.05 },
  { time: 11, price: 0.03 },
];

export function PumpDumpChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Bonding Curve</div>
        <div className="text-xs text-neutral-500">Fast wins, late loses</div>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="pumpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={[0, 1.1]}
              dx={-4}
            />
            <ReferenceDot
              x={1}
              y={0.02}
              r={4}
              fill="#22c55e"
              stroke="none"
              label={{
                value: "Bots",
                position: "top",
                fill: "#22c55e",
                fontSize: 10,
              }}
            />
            <ReferenceDot
              x={5}
              y={1.0}
              r={4}
              fill="#f97316"
              stroke="none"
              label={{
                value: "Hype buyers",
                position: "top",
                fill: "#f97316",
                fontSize: 10,
              }}
            />
            <ReferenceDot
              x={10}
              y={0.05}
              r={4}
              fill="#ef4444"
              stroke="none"
              label={{
                value: "Bag holders",
                position: "top",
                fill: "#ef4444",
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#pumpGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-between text-xs text-neutral-600">
        <span>Launch</span>
        <span className="text-neutral-500">Time →</span>
      </div>
    </div>
  );
}
