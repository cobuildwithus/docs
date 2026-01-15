"use client";

import { useState, useEffect } from "react";

const stages = [
  {
    id: "start",
    label: "Hold",
    wallet: { tokens: 1000 },
    treasury: null,
    cash: null,
  },
  {
    id: "lock",
    label: "Lock",
    wallet: { tokens: 0 },
    treasury: { tokens: 1000 },
    cash: { amount: 8000 },
  },
  {
    id: "wait",
    label: "Wait",
    wallet: { tokens: 0 },
    treasury: { tokens: 1000 },
    cash: { amount: 8000, note: "Use freely" },
  },
  {
    id: "repay",
    label: "Repay",
    wallet: { tokens: 1000, returned: true },
    treasury: null,
    cash: null,
  },
];

const colors = {
  emerald: {
    border: "rgba(16, 185, 129, 0.6)",
    bg: "rgba(16, 185, 129, 0.1)",
    text: "#34d399",
    sub: "rgba(16, 185, 129, 0.6)",
  },
  amber: {
    border: "rgba(245, 158, 11, 0.6)",
    bg: "rgba(245, 158, 11, 0.1)",
    text: "#fbbf24",
    sub: "rgba(245, 158, 11, 0.6)",
  },
  sky: {
    border: "rgba(56, 189, 248, 0.6)",
    bg: "rgba(56, 189, 248, 0.1)",
    text: "#38bdf8",
    sub: "rgba(56, 189, 248, 0.6)",
  },
};

function Box({
  label,
  value,
  subtext,
  active,
  color,
  highlight,
}: {
  label: string;
  value: string;
  subtext?: string;
  active: boolean;
  color: "emerald" | "amber" | "sky";
  highlight?: boolean;
}) {
  const c = colors[color];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="text-[11px] font-medium text-neutral-500">{label}</div>
      <div
        className="relative flex h-[72px] w-[72px] flex-col items-center justify-center rounded-lg transition-all duration-300"
        style={{
          border: active ? `1px solid ${c.border}` : "1px solid #262626",
          backgroundColor: active ? c.bg : "rgba(23, 23, 23, 0.5)",
        }}
      >
        {active ? (
          <>
            <div className="font-mono text-xl font-semibold" style={{ color: c.text }}>
              {value}
            </div>
            {subtext && (
              <div className="text-[9px] uppercase tracking-wide" style={{ color: c.sub }}>
                {subtext}
              </div>
            )}
          </>
        ) : (
          <div className="text-neutral-700">—</div>
        )}
        {highlight && (
          <div
            className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full"
            style={{ backgroundColor: "#22c55e" }}
          >
            <span className="text-[8px] text-white">✓</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function LoanCycleChart() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const stage = stages[step];

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const descriptions = [
    "You hold 1,000 tokens in your wallet",
    "Lock tokens as collateral, receive $8k cash",
    "1–2 years pass. Use the cash however you need.",
    "Repay loan → same 1,000 tokens returned",
  ];

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-200">Treasury Loan Cycle</div>
        <div className="flex gap-1">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className="rounded px-2 py-0.5 text-[10px] transition-all"
              style={{
                backgroundColor: i === step ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: i === step ? "#34d399" : "#525252",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-5 text-sm text-neutral-400">{descriptions[step]}</div>

      {/* Visual */}
      <div className="flex items-center justify-center gap-3">
        <Box
          label="Wallet"
          value={stage.wallet.tokens.toLocaleString()}
          subtext="tokens"
          active={stage.wallet.tokens > 0}
          color="emerald"
          highlight={stage.wallet.returned}
        />

        <div className="px-1 text-lg text-neutral-700">→</div>

        <Box
          label="Locked"
          value={stage.treasury?.tokens.toLocaleString() ?? "0"}
          subtext="collateral"
          active={!!stage.treasury}
          color="amber"
        />

        <div className="px-1 text-lg text-neutral-700">→</div>

        <Box
          label="Cash"
          value={stage.cash ? `$${stage.cash.amount / 1000}k` : "$0"}
          subtext={stage.cash?.note}
          active={!!stage.cash}
          color="sky"
        />
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>
        <span className="text-xs tabular-nums text-neutral-700">
          {step + 1}/{stages.length}
        </span>
        <button
          onClick={() => setStep(Math.min(stages.length - 1, step + 1))}
          disabled={step === stages.length - 1}
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
