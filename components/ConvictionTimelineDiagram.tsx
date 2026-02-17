"use client";

export function ConvictionTimelineDiagram() {
  const w = 600;
  const height = 300;
  const chartLeft = 60;
  const chartRight = w - 30;
  const chartTop = 70;
  const chartBottom = 210;
  const chartWidth = chartRight - chartLeft;

  // Timeline points (as fractions of chartWidth)
  const stakeStart = 0.08;
  const weightZeroStart = 0.32;
  const weightZeroEnd = 0.58;
  const budgetResolve = 0.88;

  // Y positions
  const lockedY = chartTop + 25;
  const weightHighY = chartTop + 45;
  const zeroY = chartBottom - 5;

  // Points area fills entire locked duration (no gap when weight=0)
  const pointsPath = `
    M ${chartLeft + chartWidth * stakeStart} ${chartBottom}
    L ${chartLeft + chartWidth * stakeStart} ${lockedY}
    L ${chartLeft + chartWidth * budgetResolve} ${lockedY}
    L ${chartLeft + chartWidth * budgetResolve} ${chartBottom}
    Z
  `;

  // Weight line path (drops to 0 in the middle)
  const weightLinePath = `
    M ${chartLeft + chartWidth * stakeStart} ${weightHighY}
    L ${chartLeft + chartWidth * weightZeroStart} ${weightHighY}
    L ${chartLeft + chartWidth * weightZeroStart} ${zeroY}
    L ${chartLeft + chartWidth * weightZeroEnd} ${zeroY}
    L ${chartLeft + chartWidth * weightZeroEnd} ${weightHighY}
    L ${chartLeft + chartWidth * budgetResolve} ${weightHighY}
  `;

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Reward Accrual Timeline</div>
        <div className="text-xs text-neutral-500">
          Rewards accrue while stake is allocated, even when weight is zero
        </div>
      </div>

      <div>
        <svg
          viewBox={`0 0 ${w} ${height}`}
          className="mx-auto block w-full"
          style={{ maxWidth: `${w}px` }}
        >
          <defs>
            <linearGradient id="ctPointsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
            </linearGradient>
            <pattern id="ctHatchPattern" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#f97316" strokeWidth="1" opacity="0.15" />
            </pattern>
          </defs>

          {/* Legend - top right */}
          <g transform={`translate(${w - 155}, 8)`}>
            <rect x="-6" y="-4" width="140" height="50" rx="5" fill="#1a1a1a" stroke="#262626" strokeWidth="1" />
            <line x1="5" y1="8" x2="25" y2="8" stroke="#f97316" strokeWidth="3" />
            <text x="32" y="12" fill="#f97316" fontSize="10">stake (allocated)</text>

            <line x1="5" y1="22" x2="25" y2="22" stroke="#a78bfa" strokeWidth="2" />
            <text x="32" y="26" fill="#a78bfa" fontSize="10">weight (routing)</text>

            <rect x="5" y="32" width="20" height="7" fill="url(#ctPointsGrad)" stroke="#f97316" strokeWidth="0.5" opacity="0.8" />
            <text x="32" y="39" fill="#f97316" fontSize="10">rewards (area)</text>
          </g>

          {/* Grid */}
          <g stroke="#262626" strokeWidth="1">
            <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} />
            <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom} />
            <line x1={chartLeft} y1={lockedY} x2={chartRight} y2={lockedY} strokeDasharray="4 4" opacity="0.3" />
          </g>

          {/* Points area — fills entire locked duration */}
          <path d={pointsPath} fill="url(#ctPointsGrad)" />
          <path d={pointsPath} fill="url(#ctHatchPattern)" />

          {/* Locked stake line (constant — locked the whole time) */}
          <line
            x1={chartLeft + chartWidth * stakeStart}
            y1={lockedY}
            x2={chartLeft + chartWidth * budgetResolve}
            y2={lockedY}
            stroke="#f97316"
            strokeWidth="3"
          />
          <circle cx={chartLeft + chartWidth * stakeStart} cy={lockedY} r="4" fill="#f97316" />
          <circle cx={chartLeft + chartWidth * budgetResolve} cy={lockedY} r="4" fill="#f97316" />

          {/* Weight line */}
          <path d={weightLinePath} fill="none" stroke="#a78bfa" strokeWidth="2" />
          <circle cx={chartLeft + chartWidth * stakeStart} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroStart} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroStart} cy={zeroY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroEnd} cy={zeroY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroEnd} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * budgetResolve} cy={weightHighY} r="3" fill="#a78bfa" />

          {/* Timeline markers */}
          <g>
            <line x1={chartLeft + chartWidth * stakeStart} y1={chartTop - 5} x2={chartLeft + chartWidth * stakeStart} y2={chartBottom + 5} stroke="#525252" strokeWidth="1" strokeDasharray="3 3" />
            <text x={chartLeft + chartWidth * stakeStart} y={chartBottom + 22} textAnchor="middle" fill="#a3a3a3" fontSize="10">stake</text>
          </g>

          <g>
            <line x1={chartLeft + chartWidth * weightZeroStart} y1={weightHighY} x2={chartLeft + chartWidth * weightZeroStart} y2={chartBottom + 5} stroke="#525252" strokeWidth="1" strokeDasharray="3 3" />
            <text x={chartLeft + chartWidth * weightZeroStart} y={chartBottom + 22} textAnchor="middle" fill="#a3a3a3" fontSize="10">{`weight \u2192 0`}</text>
          </g>

          <g>
            <line x1={chartLeft + chartWidth * weightZeroEnd} y1={weightHighY} x2={chartLeft + chartWidth * weightZeroEnd} y2={chartBottom + 5} stroke="#525252" strokeWidth="1" strokeDasharray="3 3" />
            <text x={chartLeft + chartWidth * weightZeroEnd} y={chartBottom + 22} textAnchor="middle" fill="#a3a3a3" fontSize="10">{`weight \u2192 w`}</text>
          </g>

          <g>
            <line x1={chartLeft + chartWidth * budgetResolve} y1={chartTop - 5} x2={chartLeft + chartWidth * budgetResolve} y2={chartBottom + 5} stroke="#22c55e" strokeWidth="2" />
            <text x={chartLeft + chartWidth * budgetResolve} y={chartBottom + 22} textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">resolves</text>
          </g>

          {/* Y-axis labels */}
          <text x={chartLeft - 8} y={lockedY + 4} textAnchor="end" fill="#f97316" fontSize="9" fontWeight="500">staked</text>
          <text x={chartLeft - 8} y={zeroY + 4} textAnchor="end" fill="#737373" fontSize="9">0</text>

          {/* X-axis label */}
          <text x={chartRight} y={chartBottom + 22} textAnchor="end" fill="#737373" fontSize="9">{`time \u2192`}</text>

          {/* Annotation: rewards still accruing when weight=0 */}
          <g>
            <rect
              x={chartLeft + chartWidth * weightZeroStart + 5}
              y={chartTop + 2}
              width={chartWidth * (weightZeroEnd - weightZeroStart) - 10}
              height="20"
              rx="4"
              fill="#431407"
              opacity="0.8"
            />
            <text
              x={chartLeft + chartWidth * ((weightZeroStart + weightZeroEnd) / 2)}
              y={chartTop + 16}
              textAnchor="middle"
              fill="#fb923c"
              fontSize="9"
              fontWeight="500"
            >
              weight = 0, rewards still accruing
            </text>
          </g>
        </svg>
      </div>

      {/* Key insight callout */}
      <div className="mt-4 flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-950/20 p-3">
        <div className="mt-0.5 text-orange-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <div className="text-xs text-neutral-400">
          <strong className="text-orange-400">Key insight:</strong> Rewards accrue on stake-time, not active weight. Setting weight to 0 stops routing but keeps earning — as long as your stake is allocated to the budget, you're earning points.
        </div>
      </div>
    </div>
  );
}
