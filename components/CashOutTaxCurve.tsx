"use client";

import { useState, useEffect } from "react";

const generateData = () => {
  const data = [];
  for (let q = 0; q <= 100; q += 2) {
    const fraction = q / 100;
    const remaining = 1 - fraction;
    data.push({
      fraction: q,
      noTax: fraction * 100,
      lowTax: (1 - Math.pow(remaining, 1 / (1 - 0.05))) * 100,
      mediumTax: (1 - Math.pow(remaining, 1 / (1 - 0.2))) * 100,
      highTax: (1 - Math.pow(remaining, 1 / (1 - 0.4))) * 100,
    });
  }
  return data;
};

const colors = {
  noTax: "#525252",
  lowTax: "#22c55e",
  mediumTax: "#f97316",
  highTax: "#ef4444",
  emerald: { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.2)", text: "#34d399" },
  orange: { bg: "rgba(249, 115, 22, 0.1)", border: "rgba(249, 115, 22, 0.2)", text: "#fb923c" },
  red: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.2)", text: "#f87171" },
};

export function CashOutTaxCurve() {
  const [mounted, setMounted] = useState(false);
  const [data] = useState(generateData);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const width = 600;
  const height = 260;
  const padding = { top: 30, right: 30, bottom: 45, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const scaleX = (v: number) => padding.left + (v / 100) * chartWidth;
  const scaleY = (v: number) => padding.top + (1 - v / 100) * chartHeight;

  const createPath = (key: "noTax" | "lowTax" | "mediumTax" | "highTax") =>
    data.map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.fraction)} ${scaleY(p[key])}`).join(" ");

  const yTicks = [0, 25, 50, 75, 100];
  const xTicks = [0, 25, 50, 75, 100];

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Cash-out Curves by Tax Level</div>
          <div className="text-xs text-neutral-500">
            Higher tax = more sublinear curve (early exits get less)
          </div>
        </div>
        <div className="flex gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.lowTax }} />
            <span className="text-neutral-400">5%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.mediumTax }} />
            <span className="text-neutral-400">20%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.highTax }} />
            <span className="text-neutral-400">40%</span>
          </div>
        </div>
      </div>

      <div>
        <svg
          className="w-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {yTicks.map((v) => (
            <g key={v}>
              <line
                x1={padding.left}
                y1={scaleY(v)}
                x2={width - padding.right}
                y2={scaleY(v)}
                stroke="#262626"
                strokeDasharray="2 4"
              />
              <text
                x={padding.left - 8}
                y={scaleY(v)}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#525252"
                fontSize={10}
              >
                {v}%
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {xTicks.map((v) => (
            <text
              key={v}
              x={scaleX(v)}
              y={height - padding.bottom + 15}
              textAnchor="middle"
              fill="#525252"
              fontSize={10}
            >
              {v}%
            </text>
          ))}

          {/* Axis labels */}
          <text x={width / 2} y={height - 5} textAnchor="middle" fill="#525252" fontSize={11}>
            % of supply redeemed
          </text>
          <text
            x={12}
            y={height / 2}
            textAnchor="middle"
            fill="#525252"
            fontSize={11}
            transform={`rotate(-90, 12, ${height / 2})`}
          >
            Payout
          </text>

          {/* Reference line (linear) */}
          <path
            d={`M ${scaleX(0)} ${scaleY(0)} L ${scaleX(100)} ${scaleY(100)}`}
            fill="none"
            stroke="#262626"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Lines */}
          <path
            d={createPath("noTax")}
            fill="none"
            stroke={colors.noTax}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <path
            d={createPath("lowTax")}
            fill="none"
            stroke={colors.lowTax}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d={createPath("mediumTax")}
            fill="none"
            stroke={colors.mediumTax}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d={createPath("highTax")}
            fill="none"
            stroke={colors.highTax}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-800/50 pt-3">
        <div
          className="rounded-lg px-2.5 py-2"
          style={{
            backgroundColor: colors.emerald.bg,
            border: `1px solid ${colors.emerald.border}`,
          }}
        >
          <div className="text-[11px] font-medium" style={{ color: colors.emerald.text }}>
            Low Tax (0-10%)
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-neutral-400">
            Near-linear redemption. Best for liquidity.
          </div>
        </div>
        <div
          className="rounded-lg px-2.5 py-2"
          style={{ backgroundColor: colors.orange.bg, border: `1px solid ${colors.orange.border}` }}
        >
          <div className="text-[11px] font-medium" style={{ color: colors.orange.text }}>
            Medium Tax (10-25%)
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-neutral-400">
            Rewards patient holders. Good for fundraising.
          </div>
        </div>
        <div
          className="rounded-lg px-2.5 py-2"
          style={{ backgroundColor: colors.red.bg, border: `1px solid ${colors.red.border}` }}
        >
          <div className="text-[11px] font-medium" style={{ color: colors.red.text }}>
            High Tax (25-40%)
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-neutral-400">
            Strong floor growth. Loans become attractive.
          </div>
        </div>
      </div>
    </div>
  );
}
