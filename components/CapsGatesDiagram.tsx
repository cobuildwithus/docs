"use client";

export function CapsGatesDiagram() {
  const tankW = 120;
  const tankH = 220;
  const svgW = 320;
  const svgH = 330;
  const tankX = (svgW - tankW) / 2;
  const tankY = 60;

  // Threshold positions (from bottom, as percentages)
  const activationPct = 0.35;
  const runwayCapPct = 0.85;
  const currentBalancePct = 0.55;

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Caps &amp; Gates</div>
        <div className="text-xs text-neutral-500">
          Safety rails that control fund flow at each level
        </div>
      </div>

      {/* Tank SVG — centered, compact */}
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="block w-full"
          style={{ maxWidth: `${svgW}px` }}
        >
          <defs>
            <linearGradient id="cgBalanceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="cgTankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#262626" />
            </linearGradient>
            <marker id="cgArrowPurple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
            </marker>
            <marker id="cgArrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
            </marker>
          </defs>

          <g transform={`translate(${tankX}, ${tankY})`}>
            {/* Tank label */}
            <text x={tankW / 2} y="-18" textAnchor="middle" fill="#a3a3a3" fontSize="12" fontWeight="500">
              Budget Treasury
            </text>

            {/* Inflow arrow */}
            <path d={`M ${tankW / 2} -48 L ${tankW / 2} -8`} stroke="#a78bfa" strokeWidth="2" markerEnd="url(#cgArrowPurple)" />
            <text x={tankW / 2} y="-54" textAnchor="middle" fill="#a78bfa" fontSize="10">inflow</text>

            {/* Tank background */}
            <rect x="0" y="0" width={tankW} height={tankH} rx="6" fill="url(#cgTankGrad)" stroke="#404040" strokeWidth="2" />

            {/* Current balance fill */}
            <rect x="4" y={tankH * (1 - currentBalancePct)} width={tankW - 8} height={tankH * currentBalancePct - 4} rx="3" fill="url(#cgBalanceGrad)" />
            <text x={tankW / 2} y={tankH * (1 - currentBalancePct / 2)} textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="600">
              balance
            </text>

            {/* Runway cap threshold line */}
            <line x1="-12" y1={tankH * (1 - runwayCapPct)} x2={tankW + 12} y2={tankH * (1 - runwayCapPct)} stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
            <text x={tankW + 18} y={tankH * (1 - runwayCapPct) + 4} fill="#f87171" fontSize="9" fontWeight="500">
              runwayCap
            </text>

            {/* Activation threshold line */}
            <line x1="-12" y1={tankH * (1 - activationPct)} x2={tankW + 12} y2={tankH * (1 - activationPct)} stroke="#f97316" strokeWidth="2" />
            <text x={tankW + 18} y={tankH * (1 - activationPct) + 4} fill="#fb923c" fontSize="9" fontWeight="500">
              activationThreshold
            </text>

            {/* Zone labels inside tank */}
            <text x={tankW / 2} y={tankH * (1 - runwayCapPct) - 8} textAnchor="middle" fill="#ef4444" fontSize="9" opacity="0.7">
              inflow pauses
            </text>
            <text x={tankW / 2} y={tankH * (1 - activationPct) + 16} textAnchor="middle" fill="#f97316" fontSize="9" opacity="0.7">
              can spend
            </text>
            <text x={tankW / 2} y={tankH - 10} textAnchor="middle" fill="#737373" fontSize="9" opacity="0.7">
              inactive
            </text>

            {/* Outflow arrow */}
            <path d={`M ${tankW / 2} ${tankH + 8} L ${tankW / 2} ${tankH + 38}`} stroke="#4ade80" strokeWidth="2" markerEnd="url(#cgArrowGreen)" />
            <text x={tankW / 2} y={tankH + 55} textAnchor="middle" fill="#4ade80" fontSize="10">outflow</text>
          </g>
        </svg>
      </div>

      {/* Explanation cards — HTML, naturally responsive */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="flex gap-3 rounded-lg border border-violet-500/40 bg-violet-950/10 px-3 py-2.5">
          <div className="mt-0.5 h-full w-1 shrink-0 rounded-full bg-violet-500" />
          <div>
            <div className="text-xs font-semibold text-violet-400">minStake</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Child must have ≥ minStake active weight to receive any stream.
            </div>
          </div>
          <div className="ml-auto shrink-0 self-center text-[10px] font-medium text-violet-400/60">
            eligibility
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-orange-500/40 bg-orange-950/10 px-3 py-2.5">
          <div className="mt-0.5 h-full w-1 shrink-0 rounded-full bg-orange-500" />
          <div>
            <div className="text-xs font-semibold text-orange-400">activationThreshold</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Budget cannot spend until balance reaches this minimum.
            </div>
          </div>
          <div className="ml-auto shrink-0 self-center text-[10px] font-medium text-orange-400/60">
            start gate
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-red-500/40 bg-red-950/10 px-3 py-2.5">
          <div className="mt-0.5 h-full w-1 shrink-0 rounded-full bg-red-500" />
          <div>
            <div className="text-xs font-semibold text-red-400">runwayCap</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Inflow pauses when balance hits cap. Prevents overfunding.
            </div>
          </div>
          <div className="ml-auto shrink-0 self-center text-[10px] font-medium text-red-400/60">
            max balance
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-blue-500/40 bg-blue-950/10 px-3 py-2.5">
          <div className="mt-0.5 h-full w-1 shrink-0 rounded-full bg-blue-500" />
          <div>
            <div className="text-xs font-semibold text-blue-400">maxRatePerStakeUnit</div>
            <div className="mt-0.5 text-xs text-neutral-500">
              Caps flow rate per unit of stake. Limits extraction speed.
            </div>
          </div>
          <div className="ml-auto shrink-0 self-center text-[10px] font-medium text-blue-400/60">
            rate limit
          </div>
        </div>
      </div>

      {/* Overflow note */}
      <div className="mt-2 rounded-md border border-dashed border-neutral-700 px-3 py-1.5 text-center text-[11px] text-neutral-500">
        When caps bind, overflow stays in parent treasury (not redistributed)
      </div>
    </div>
  );
}
