"use client";

import { useState, useEffect } from "react";

const colors = {
  emerald: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.4)", text: "#34d399" },
  blue: { bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.4)", text: "#60a5fa" },
  amber: { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.4)", text: "#fbbf24" },
  red: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.4)", text: "#f87171" },
};

const actions = [
  {
    id: "hold",
    label: "Hold",
    exposure: "Full",
    floor: "No change",
    floorUp: false,
    color: "emerald" as const,
  },
  {
    id: "loan",
    label: "Loan",
    exposure: "Full",
    floor: "↑ Up",
    floorUp: true,
    color: "blue" as const,
  },
  {
    id: "sell",
    label: "AMM Sell",
    exposure: "Reduced",
    floor: "No change",
    floorUp: false,
    color: "amber" as const,
  },
  {
    id: "cashout",
    label: "Cash-out",
    exposure: "Reduced",
    floor: "↑ Up",
    floorUp: true,
    color: "red" as const,
  },
];

export function BuilderFloorEffect() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Effect per Action</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const c = colors[action.color];
          return (
            <div
              key={action.id}
              className="rounded-lg p-4"
              style={{
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <div className="mb-3 text-sm font-semibold" style={{ color: c.text }}>
                {action.label}
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Exposure</span>
                  <span className="text-neutral-300">{action.exposure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Floor</span>
                  <span style={{ color: action.floorUp ? "#34d399" : "#a3a3a3" }}>
                    {action.floor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
