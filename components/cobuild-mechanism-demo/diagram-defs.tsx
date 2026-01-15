import { INITIAL_BUDGETS } from "./constants";

export function DiagramDefs() {
  return (
    <defs>
      <style>{`
              @media (max-width: 640px) {
                .source-desc { display: none; }
                .source-title { font-size: 14px; font-weight: 600; transform: translateY(8px); }
                .source-box { height: 58px; transform: translateY(7px); }
                .source-icon { transform: translateY(8px); }
                .budget-title { font-size: 13px; font-weight: 600; }
                .budget-amount { font-size: 12px; }
              }
            `}</style>
      <radialGradient id="treasuryGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </radialGradient>
      {INITIAL_BUDGETS.map((budget) => (
        <radialGradient key={budget.id} id={`budgetGlow-${budget.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={budget.color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={budget.color} stopOpacity="0" />
        </radialGradient>
      ))}
    </defs>
  );
}
