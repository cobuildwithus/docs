"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from "recharts";

const data = [
  { time: 0, dump: 1.0, cashout: 1.0 },
  { time: 1, dump: 0.85, cashout: 1.05 },
  { time: 2, dump: 0.68, cashout: 1.12 },
  { time: 3, dump: 0.52, cashout: 1.2 },
  { time: 4, dump: 0.38, cashout: 1.3 },
  { time: 5, dump: 0.25, cashout: 1.42 },
  { time: 6, dump: 0.15, cashout: 1.55 },
];

export function CashOutComparisonChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Getting working capital</div>
          <div className="text-xs text-neutral-500">Effect on other holders</div>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full" style={{ backgroundColor: "#ef4444" }} />
            <span className="text-neutral-400">Dump on market</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
            <span className="text-neutral-400">Cash out</span>
          </div>
        </div>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="dumpGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="cashoutGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 11 }}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
              domain={[0, 1.7]}
              dx={-4}
            />
            <ReferenceDot
              x={2}
              y={0.68}
              r={3}
              fill="#ef4444"
              stroke="none"
              label={{ value: "sell", position: "bottom", fill: "#ef4444", fontSize: 9 }}
            />
            <ReferenceDot
              x={4}
              y={0.38}
              r={3}
              fill="#ef4444"
              stroke="none"
              label={{ value: "sell", position: "bottom", fill: "#ef4444", fontSize: 9 }}
            />
            <ReferenceDot
              x={2}
              y={1.12}
              r={3}
              fill="#22c55e"
              stroke="none"
              label={{ value: "cash out", position: "top", fill: "#22c55e", fontSize: 9 }}
            />
            <ReferenceDot
              x={4}
              y={1.3}
              r={3}
              fill="#22c55e"
              stroke="none"
              label={{ value: "cash out", position: "top", fill: "#22c55e", fontSize: 9 }}
            />
            <Area
              type="monotone"
              dataKey="dump"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#dumpGradient2)"
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="cashout"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#cashoutGradient)"
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
