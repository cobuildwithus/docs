"use client";

export function CapsGatesDiagram() {
  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">
          Caps &amp; Gates
        </div>
        <div className="text-xs text-neutral-500">
          Safety rails that control fund flow at each level
        </div>
      </div>

      <div className="flex justify-center">
        <svg
          viewBox="0 0 520 340"
          className="block w-full"
          style={{ maxWidth: 520 }}
        >
          <defs>
            <marker
              id="cgArrIn"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
            </marker>
            <marker
              id="cgArrOut"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
            </marker>
          </defs>

          {/* Inflow arrow */}
          <text x="180" y="16" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="500">inflow</text>
          <line x1="180" y1="24" x2="180" y2="54" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#cgArrIn)" />

          {/* Tank body */}
          <rect x="100" y="60" width="160" height="210" rx="6" fill="#141414" stroke="#404040" strokeWidth="1.5" />

          {/* runwayCap zone — top of tank */}
          <text x="180" y="85" textAnchor="middle" fill="#525252" fontSize="10">
            inflow pauses
          </text>

          {/* runwayCap dashed line */}
          <line x1="100" y1="100" x2="260" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 3" />

          {/* runwayCap label — right side */}
          <line x1="260" y1="100" x2="290" y2="100" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
          <text x="296" y="104" fill="#f87171" fontSize="11" fontWeight="500">runwayCap</text>

          {/* Balance fill */}
          <rect x="104" y="104" width="152" height="100" rx="3" fill="#14532d" opacity="0.4" />
          <text x="180" y="160" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="600">
            balance
          </text>

          {/* activationThreshold solid line */}
          <line x1="100" y1="208" x2="260" y2="208" stroke="#f97316" strokeWidth="1.5" />

          {/* activationThreshold label — right side */}
          <line x1="260" y1="208" x2="290" y2="208" stroke="#f97316" strokeWidth="1" opacity="0.5" />
          <text x="296" y="212" fill="#fb923c" fontSize="11" fontWeight="500">activationThreshold</text>

          {/* Inactive zone label */}
          <text x="180" y="245" textAnchor="middle" fill="#404040" fontSize="10">
            inactive
          </text>

          {/* Outflow arrow */}
          <line x1="180" y1="276" x2="180" y2="306" stroke="#4ade80" strokeWidth="2" markerEnd="url(#cgArrOut)" />
          <text x="180" y="326" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="500">outflow</text>
        </svg>
      </div>

      {/* Parameter cards */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-800 px-3 py-2">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
          <div>
            <div className="text-xs font-semibold text-violet-400">minStake</div>
            <div className="mt-0.5 text-[11px] text-neutral-500">
              Must have ≥ minStake active weight to receive any stream.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-800 px-3 py-2">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
          <div>
            <div className="text-xs font-semibold text-orange-400">activationThreshold</div>
            <div className="mt-0.5 text-[11px] text-neutral-500">
              Budget cannot spend until balance reaches this minimum.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-800 px-3 py-2">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
          <div>
            <div className="text-xs font-semibold text-red-400">runwayCap</div>
            <div className="mt-0.5 text-[11px] text-neutral-500">
              Inflow pauses when balance hits cap. Prevents overfunding.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-lg border border-neutral-800 px-3 py-2">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          <div>
            <div className="text-xs font-semibold text-blue-400">maxRatePerStakeUnit</div>
            <div className="mt-0.5 text-[11px] text-neutral-500">
              Caps flow rate per unit of stake. Limits extraction speed.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center text-[11px] text-neutral-600">
        When caps bind, overflow stays in parent treasury (not redistributed).
      </div>
    </div>
  );
}
