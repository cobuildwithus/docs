"use client";

import { useState, useEffect } from "react";

const colors = {
  blue: {
    bg: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.3)",
    text: "#93c5fd",
    label: "#60a5fa",
    dot: "#3b82f6",
  },
  emerald: {
    bg: "rgba(16, 185, 129, 0.15)",
    border: "rgba(16, 185, 129, 0.3)",
    text: "#6ee7b7",
    label: "#34d399",
    dot: "#10b981",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.15)",
    border: "rgba(245, 158, 11, 0.3)",
    text: "#fcd34d",
    label: "#fbbf24",
    dot: "#f59e0b",
  },
};

const scenarios = [
  {
    tax: "Low",
    yield: "Low",
    strategy: "Exit",
    reason: "Cheap to leave, nowhere better to go",
    color: "blue" as const,
  },
  {
    tax: "Low",
    yield: "High",
    strategy: "Borrow",
    reason: "Cheap loans, great outside returns",
    color: "amber" as const,
  },
  {
    tax: "High",
    yield: "Low",
    strategy: "Hold",
    reason: "Exit expensive, wait for growth",
    color: "emerald" as const,
  },
  {
    tax: "High",
    yield: "High",
    strategy: "Borrow",
    reason: "Exit expensive, but can profit outside",
    color: "amber" as const,
  },
];

export function StrategyHeatmap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">What Wins in Each Scenario?</div>
        <div className="text-xs text-neutral-500">Tax level × Outside yield opportunity</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scenarios.map((s, i) => {
          const c = colors[s.color];
          return (
            <div
              key={i}
              className="rounded-lg p-4"
              style={{
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium" style={{ color: c.label }}>
                  {s.tax} tax · {s.yield} yield
                </span>
                <span className="text-sm font-bold" style={{ color: c.text }}>
                  {s.strategy}
                </span>
              </div>
              <div className="text-xs text-neutral-300">{s.reason}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-5 border-t border-neutral-800/50 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full" style={{ backgroundColor: colors.blue.dot }} />
          <span className="text-xs text-neutral-400">Exit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full" style={{ backgroundColor: colors.emerald.dot }} />
          <span className="text-xs text-neutral-400">Hold</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full" style={{ backgroundColor: colors.amber.dot }} />
          <span className="text-xs text-neutral-400">Borrow</span>
        </div>
      </div>
    </div>
  );
}
