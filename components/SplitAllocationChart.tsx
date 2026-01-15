"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const premintData = [
  { time: "Launch", founders: 500, buyers: 0 },
  { time: "", founders: 500, buyers: 100 },
  { time: "", founders: 500, buyers: 200 },
  { time: "", founders: 500, buyers: 300 },
  { time: "Time →", founders: 500, buyers: 400 },
];

const splitData = [
  { time: "Launch", founders: 0, buyers: 0 },
  { time: "", founders: 20, buyers: 80 },
  { time: "", founders: 40, buyers: 160 },
  { time: "", founders: 60, buyers: 240 },
  { time: "Time →", founders: 80, buyers: 320 },
];

export function SplitAllocationChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Premint vs Split</div>
        <div className="text-xs text-neutral-500">How founders get their tokens</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-300">Giant premint</span>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded" style={{ backgroundColor: "#ef4444" }} />
                <span className="text-neutral-500">Founders</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded" style={{ backgroundColor: "#0ea5e9" }} />
                <span className="text-neutral-500">Buyers</span>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: 120 }}>
            <ResponsiveContainer>
              <BarChart data={premintData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#525252", fontSize: 10 }}
                />
                <YAxis hide domain={[0, 600]} />
                <Bar dataKey="founders" stackId="a" fill="#ef4444" isAnimationActive={false} />
                <Bar
                  dataKey="buyers"
                  stackId="a"
                  fill="#0ea5e9"
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-neutral-500">Founders start with everything</div>
        </div>

        <div className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-300">Split every mint</span>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded" style={{ backgroundColor: "#22c55e" }} />
                <span className="text-neutral-500">Founders</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-1.5 rounded" style={{ backgroundColor: "#0ea5e9" }} />
                <span className="text-neutral-500">Buyers</span>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: 120 }}>
            <ResponsiveContainer>
              <BarChart data={splitData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#525252", fontSize: 10 }}
                />
                <YAxis hide domain={[0, 600]} />
                <Bar dataKey="founders" stackId="a" fill="#22c55e" isAnimationActive={false} />
                <Bar
                  dataKey="buyers"
                  stackId="a"
                  fill="#0ea5e9"
                  radius={[3, 3, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-neutral-500">Founders earn alongside buyers</div>
        </div>
      </div>

      <div className="mt-3 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        Splits align founder incentives with network growth
      </div>
    </div>
  );
}
