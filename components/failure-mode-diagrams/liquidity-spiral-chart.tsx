"use client";

import { useEffect, useState } from "react";

export function LiquiditySpiralChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const steps = [
    {
      label: "Price drops",
      bg: "rgba(244,63,94,0.2)",
      text: "#fb7185",
      border: "rgba(244,63,94,0.3)",
    },
    {
      label: "Holders redeem",
      bg: "rgba(245,158,11,0.2)",
      text: "#fbbf24",
      border: "rgba(245,158,11,0.3)",
    },
    {
      label: "AMM drains",
      bg: "rgba(249,115,22,0.2)",
      text: "#fb923c",
      border: "rgba(249,115,22,0.3)",
    },
    {
      label: "Volatility ↑",
      bg: "rgba(244,63,94,0.2)",
      text: "#fb7185",
      border: "rgba(244,63,94,0.3)",
    },
  ];

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-4">
      <div className="mb-3 text-xs text-neutral-500">
        Speculative demand creates liquidity spirals
      </div>
      <div className="flex items-center justify-center gap-2 py-3">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="rounded-md px-2.5 py-1.5 text-[10px] font-medium"
              style={{
                backgroundColor: step.bg,
                color: step.text,
                borderWidth: 1,
                borderColor: step.border,
              }}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && <span className="text-neutral-600">→</span>}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <svg width={200} height={30} viewBox="0 0 200 30">
          <path
            d="M 180 5 Q 190 15 180 25 L 20 25 Q 10 15 20 5"
            fill="none"
            stroke="#525252"
            strokeWidth={1}
            strokeDasharray="4 4"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#525252" />
            </marker>
          </defs>
        </svg>
      </div>
      <div className="mt-1 text-center text-[10px] text-neutral-600">Cycle repeats</div>
    </div>
  );
}
