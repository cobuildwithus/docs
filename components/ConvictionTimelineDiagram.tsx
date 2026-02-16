"use client";

export function ConvictionTimelineDiagram() {
  const width = 700;
  const height = 300;
  const chartLeft = 100;
  const chartRight = width - 50;
  const chartTop = 70;
  const chartBottom = 210;
  const chartWidth = chartRight - chartLeft;

  // Timeline points (as fractions of chartWidth)
  const exposureStart = 0.08;
  const weightZeroStart = 0.32;
  const weightZeroEnd = 0.58;
  const budgetResolve = 0.88;

  // Y positions
  const exposureY = chartTop + 25;
  const weightHighY = chartTop + 45;
  const zeroY = chartBottom - 5;

  // Build the conviction area path
  const convictionPath = `
    M ${chartLeft + chartWidth * exposureStart} ${chartBottom}
    L ${chartLeft + chartWidth * exposureStart} ${exposureY}
    L ${chartLeft + chartWidth * budgetResolve} ${exposureY}
    L ${chartLeft + chartWidth * budgetResolve} ${chartBottom}
    Z
  `;

  // Weight line path
  const weightLinePath = `
    M ${chartLeft + chartWidth * exposureStart} ${weightHighY}
    L ${chartLeft + chartWidth * weightZeroStart} ${weightHighY}
    L ${chartLeft + chartWidth * weightZeroStart} ${zeroY}
    L ${chartLeft + chartWidth * weightZeroEnd} ${zeroY}
    L ${chartLeft + chartWidth * weightZeroEnd} ${weightHighY}
    L ${chartLeft + chartWidth * budgetResolve} ${weightHighY}
  `;

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Conviction Accrual Timeline</div>
        <div className="text-xs text-neutral-500">
          Conviction accrues while exposure is locked, regardless of weight
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto block min-w-[700px]"
        >
          <defs>
            <linearGradient id="ctConvictionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.05" />
            </linearGradient>
            <pattern id="ctHatchPattern" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#fbbf24" strokeWidth="1" opacity="0.15" />
            </pattern>
          </defs>

          {/* Legend - top right, outside chart */}
          <g transform={`translate(${width - 160}, 20)`}>
            <rect x="-10" y="-8" width="150" height="55" rx="6" fill="#1a1a1a" stroke="#262626" strokeWidth="1" />
            <line x1="5" y1="8" x2="30" y2="8" stroke="#f97316" strokeWidth="3" />
            <text x="38" y="12" fill="#f97316" fontSize="10">exposure (locked)</text>

            <line x1="5" y1="24" x2="30" y2="24" stroke="#a78bfa" strokeWidth="2" />
            <text x="38" y="28" fill="#a78bfa" fontSize="10">weight (adjustable)</text>

            <rect x="5" y="34" width="25" height="8" fill="url(#ctConvictionGrad)" stroke="#fbbf24" strokeWidth="0.5" opacity="0.8" />
            <text x="38" y="42" fill="#fbbf24" fontSize="10">conviction (area)</text>
          </g>

          {/* Grid */}
          <g stroke="#262626" strokeWidth="1">
            <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} />
            <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom} />
            {/* Horizontal grid lines */}
            <line x1={chartLeft} y1={exposureY} x2={chartRight} y2={exposureY} strokeDasharray="4 4" opacity="0.3" />
          </g>

          {/* Conviction area */}
          <path d={convictionPath} fill="url(#ctConvictionGrad)" />
          <path d={convictionPath} fill="url(#ctHatchPattern)" />

          {/* Exposure line (constant) */}
          <line
            x1={chartLeft + chartWidth * exposureStart}
            y1={exposureY}
            x2={chartLeft + chartWidth * budgetResolve}
            y2={exposureY}
            stroke="#f97316"
            strokeWidth="3"
          />
          {/* Exposure start/end markers */}
          <circle cx={chartLeft + chartWidth * exposureStart} cy={exposureY} r="4" fill="#f97316" />
          <circle cx={chartLeft + chartWidth * budgetResolve} cy={exposureY} r="4" fill="#f97316" />

          {/* Weight line */}
          <path d={weightLinePath} fill="none" stroke="#a78bfa" strokeWidth="2" />
          {/* Weight line markers */}
          <circle cx={chartLeft + chartWidth * exposureStart} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroStart} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroStart} cy={zeroY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroEnd} cy={zeroY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * weightZeroEnd} cy={weightHighY} r="3" fill="#a78bfa" />
          <circle cx={chartLeft + chartWidth * budgetResolve} cy={weightHighY} r="3" fill="#a78bfa" />

          {/* Timeline markers */}
          {/* Stake */}
          <g>
            <line
              x1={chartLeft + chartWidth * exposureStart}
              y1={chartTop - 5}
              x2={chartLeft + chartWidth * exposureStart}
              y2={chartBottom + 5}
              stroke="#525252"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={chartLeft + chartWidth * exposureStart}
              y={chartBottom + 22}
              textAnchor="middle"
              fill="#a3a3a3"
              fontSize="10"
            >
              stake
            </text>
          </g>

          {/* Weight → 0 */}
          <g>
            <line
              x1={chartLeft + chartWidth * weightZeroStart}
              y1={weightHighY}
              x2={chartLeft + chartWidth * weightZeroStart}
              y2={chartBottom + 5}
              stroke="#525252"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={chartLeft + chartWidth * weightZeroStart}
              y={chartBottom + 22}
              textAnchor="middle"
              fill="#a3a3a3"
              fontSize="10"
            >
              weight → 0
            </text>
          </g>

          {/* Weight restored */}
          <g>
            <line
              x1={chartLeft + chartWidth * weightZeroEnd}
              y1={weightHighY}
              x2={chartLeft + chartWidth * weightZeroEnd}
              y2={chartBottom + 5}
              stroke="#525252"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={chartLeft + chartWidth * weightZeroEnd}
              y={chartBottom + 22}
              textAnchor="middle"
              fill="#a3a3a3"
              fontSize="10"
            >
              weight → w
            </text>
          </g>

          {/* Budget resolves */}
          <g>
            <line
              x1={chartLeft + chartWidth * budgetResolve}
              y1={chartTop - 5}
              x2={chartLeft + chartWidth * budgetResolve}
              y2={chartBottom + 5}
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x={chartLeft + chartWidth * budgetResolve}
              y={chartBottom + 22}
              textAnchor="middle"
              fill="#22c55e"
              fontSize="10"
              fontWeight="500"
            >
              resolves
            </text>
          </g>

          {/* Y-axis labels */}
          <text x={chartLeft - 8} y={exposureY + 4} textAnchor="end" fill="#f97316" fontSize="9" fontWeight="500">
            exposure
          </text>
          <text x={chartLeft - 8} y={zeroY + 4} textAnchor="end" fill="#737373" fontSize="9">
            0
          </text>

          {/* X-axis label */}
          <text x={chartRight} y={chartBottom + 22} textAnchor="end" fill="#737373" fontSize="9">
            time →
          </text>

          {/* Annotation: "weight = 0 but conviction accrues" zone */}
          <g>
            <rect
              x={chartLeft + chartWidth * weightZeroStart + 5}
              y={chartTop + 2}
              width={chartWidth * (weightZeroEnd - weightZeroStart) - 10}
              height="20"
              rx="4"
              fill="#451a03"
              opacity="0.6"
            />
            <text
              x={chartLeft + chartWidth * ((weightZeroStart + weightZeroEnd) / 2)}
              y={chartTop + 16}
              textAnchor="middle"
              fill="#fcd34d"
              fontSize="9"
              fontWeight="500"
            >
              weight = 0, conviction still accrues
            </text>
          </g>
        </svg>
      </div>

      {/* Key insight callout */}
      <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-950/20 p-3">
        <div className="mt-0.5 text-amber-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <div className="text-xs text-neutral-400">
          <strong className="text-amber-400">Key insight:</strong> Setting weight to 0 stops funding but{" "}
          <em>does not</em> stop conviction accrual. You cannot escape risk by removing weight before resolution.
        </div>
      </div>
    </div>
  );
}
