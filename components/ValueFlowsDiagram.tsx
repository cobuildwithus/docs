"use client";

export function ValueFlowsDiagram() {
  const w = 650;
  const h = 380;

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Value Flows</div>
        <div className="text-xs text-neutral-500">
          How funds split into operating budget and reward pool
        </div>
      </div>

      <div>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="mx-auto block w-full"
          style={{ maxWidth: `${w}px` }}
        >
          <defs>
            <linearGradient id="vfGoalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <linearGradient id="vfRewardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#713f12" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="vfStreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            <linearGradient id="vfBudgetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14532d" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
            <linearGradient id="vfAllocGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <marker id="vfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#525252" />
            </marker>
            <marker id="vfArrowYellow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
            <marker id="vfArrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
            </marker>
            <marker id="vfArrowBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
            </marker>
          </defs>

          {/* MAIN FLOW */}

          {/* Inflow arrow and label */}
          <text x="50" y="35" textAnchor="middle" fill="#a3a3a3" fontSize="10">contributors</text>
          <text x="50" y="48" textAnchor="middle" fill="#a3a3a3" fontSize="10">deposit</text>
          <line x1="50" y1="55" x2="50" y2="75" stroke="#525252" strokeWidth="2" markerEnd="url(#vfArrow)" />

          {/* Goal Treasury */}
          <g transform="translate(50, 110)">
            <rect x="-42" y="-25" width="84" height="50" rx="8" fill="url(#vfGoalGrad)" stroke="#8b5cf6" strokeWidth="2" />
            <text x="0" y="-5" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="600">Goal</text>
            <text x="0" y="10" textAnchor="middle" fill="#a78bfa" fontSize="9">Treasury</text>
          </g>

          {/* Line to split */}
          <line x1="92" y1="110" x2="128" y2="110" stroke="#525252" strokeWidth="2" />

          {/* Split indicator */}
          <g transform="translate(152, 110)">
            <rect x="-22" y="-35" width="44" height="70" rx="6" fill="#1a1a1a" stroke="#525252" strokeWidth="1.5" />
            <text x="0" y="-18" textAnchor="middle" fill="#737373" fontSize="9">split</text>
            <line x1="-15" y1="-8" x2="15" y2="-8" stroke="#404040" strokeWidth="1" />
            <text x="0" y="8" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">20%</text>
            <text x="0" y="23" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="600">80%</text>
          </g>

          {/* Upper branch: Reward Pool (20%) */}
          <line x1="174" y1="90" x2="230" y2="62" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#vfArrowYellow)" />
          <text x="195" y="68" fill="#fbbf24" fontSize="9" fontWeight="500">20%</text>

          <g transform="translate(295, 55)">
            <rect x="-55" y="-22" width="110" height="44" rx="8" fill="url(#vfRewardGrad)" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
            <text x="0" y="-4" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="600">Reward Pool</text>
            <text x="0" y="11" textAnchor="middle" fill="#a3a3a3" fontSize="8">escrowed until Goal success</text>
          </g>

          {/* Lower branch: Streamable (80%) */}
          <line x1="174" y1="130" x2="230" y2="158" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#vfArrow)" />
          <text x="195" y="155" fill="#a78bfa" fontSize="9" fontWeight="500">80%</text>

          <g transform="translate(295, 165)">
            <rect x="-55" y="-22" width="110" height="44" rx="8" fill="url(#vfStreamGrad)" stroke="#a78bfa" strokeWidth="2" />
            <text x="0" y="-4" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="600">Streamable</text>
            <text x="0" y="11" textAnchor="middle" fill="#a3a3a3" fontSize="8">funds available for budgets</text>
          </g>

          {/* Arrow to Budgets */}
          <line x1="350" y1="165" x2="405" y2="165" stroke="#4ade80" strokeWidth="2" markerEnd="url(#vfArrowGreen)" />
          <text x="378" y="157" fill="#4ade80" fontSize="8">streams</text>

          {/* Budgets */}
          <g transform="translate(460, 165)">
            <rect x="-48" y="-30" width="96" height="60" rx="8" fill="url(#vfBudgetGrad)" stroke="#22c55e" strokeWidth="2" />
            <text x="0" y="-10" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="600">Budgets</text>
            <text x="0" y="5" textAnchor="middle" fill="#737373" fontSize="9">pro-rata by</text>
            <text x="0" y="18" textAnchor="middle" fill="#737373" fontSize="9">stake weight</text>
          </g>

          {/* Arrow to Mechanisms */}
          <line x1="508" y1="165" x2="545" y2="165" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#vfArrowBlue)" />

          {/* Mechanisms */}
          <g transform="translate(585, 165)">
            <rect x="-33" y="-30" width="66" height="60" rx="8" fill="url(#vfAllocGrad)" stroke="#3b82f6" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="500">Flows</text>
            <text x="0" y="7" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="500">Rounds</text>
            <text x="0" y="22" textAnchor="middle" fill="#737373" fontSize="8">{"\u2192"}builders</text>
          </g>

          {/* REWARD DISTRIBUTION SECTION (bottom) */}
          <g transform="translate(0, 250)">
            <line x1="20" y1="0" x2={w - 20} y2="0" stroke="#262626" strokeWidth="1" strokeDasharray="6 4" />
            <rect x="20" y="-12" width="130" height="24" rx="4" fill="#0a0a0a" />
            <text x="85" y="4" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">On Goal Success</text>

            <g transform="translate(0, 45)">
              {/* Reward pool (small reference) */}
              <g transform="translate(100, 0)">
                <rect x="-45" y="-18" width="90" height="36" rx="6" fill="url(#vfRewardGrad)" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="0" y="-2" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="500">Reward Pool</text>
                <text x="0" y="11" textAnchor="middle" fill="#a3a3a3" fontSize="8">unlocks</text>
              </g>

              {/* Arrow */}
              <line x1="150" y1="0" x2="230" y2="0" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#vfArrowYellow)" />
              <text x="190" y="-8" textAnchor="middle" fill="#fbbf24" fontSize="9">claims</text>

              {/* Distribution box */}
              <g transform="translate(295, 0)">
                <rect x="-58" y="-22" width="116" height="44" rx="6" fill="#1a1a1a" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="0" y="-5" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="500">Distribute by</text>
                <text x="0" y="10" textAnchor="middle" fill="#a3a3a3" fontSize="9">conviction share</text>
              </g>

              {/* Arrow to underwriters */}
              <line x1="358" y1="0" x2="420" y2="0" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#vfArrowYellow)" />

              {/* Underwriters */}
              <g transform="translate(488, 0)">
                <rect x="-58" y="-22" width="116" height="44" rx="6" fill="#1a1a1a" stroke="#f97316" strokeWidth="2" />
                <text x="0" y="-5" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="600">Underwriters</text>
                <text x="0" y="10" textAnchor="middle" fill="#737373" fontSize="9">(stakers)</text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-800/50 pt-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-violet-400" />
          <span>Operating funds (80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 border-t-2 border-dashed border-amber-400" />
          <span>Reward escrow (20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-green-400" />
          <span>Budget streams</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-blue-400" />
          <span>Mechanism payouts</span>
        </div>
      </div>
    </div>
  );
}
