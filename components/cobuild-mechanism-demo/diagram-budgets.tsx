import {
  BUDGET_HEIGHT,
  BUDGET_WIDTH,
  BUDGETS_Y,
  BUILDER_SIZE,
  BUILDERS_Y,
  CENTER_X,
  TREASURY_SIZE,
  TREASURY_Y,
} from "./constants";
import { CurvedPath } from "./curved-path";
import { formatUsd, getBudgetX, getBuilderX } from "./utils";
import type { Budget } from "./types";

type DiagramBudgetsProps = {
  budgets: Budget[];
};

export function DiagramBudgets({ budgets }: DiagramBudgetsProps) {
  return (
    <>
      {budgets.map((budget, i) => (
        <CurvedPath
          key={`path-budget-${budget.id}`}
          x1={CENTER_X}
          y1={TREASURY_Y + TREASURY_SIZE / 2}
          x2={getBudgetX(i)}
          y2={BUDGETS_Y - BUDGET_HEIGHT / 2}
        />
      ))}

      {budgets.map((budget, i) => {
        const x = getBudgetX(i);
        return (
          <g key={budget.id}>
            <circle
              cx={x}
              cy={BUDGETS_Y}
              r={BUDGET_WIDTH / 2 + 20}
              fill={`url(#budgetGlow-${budget.id})`}
            />
            <rect
              x={x - BUDGET_WIDTH / 2}
              y={BUDGETS_Y - BUDGET_HEIGHT / 2}
              width={BUDGET_WIDTH}
              height={BUDGET_HEIGHT}
              rx={12}
              fill="#0a0a0a"
              stroke={budget.color}
              strokeWidth={1.5}
            />
            <text
              x={x}
              y={BUDGETS_Y - 4}
              textAnchor="middle"
              fill={budget.color}
              fontSize={11}
              fontWeight={500}
              className="budget-title"
            >
              {budget.name}
            </text>
            <text
              x={x}
              y={BUDGETS_Y + 12}
              textAnchor="middle"
              fill="#a3a3a3"
              fontSize={10}
              fontFamily="monospace"
              className="budget-amount"
            >
              {formatUsd(budget.allocation)}/mo
            </text>

            {budget.builders.map((_, j) => {
              const bx = getBuilderX(i, j, budget.builders.length);
              return (
                <line
                  key={`line-${budget.id}-${j}`}
                  x1={x}
                  y1={BUDGETS_Y + BUDGET_HEIGHT / 2}
                  x2={bx}
                  y2={BUILDERS_Y - BUILDER_SIZE / 2}
                  stroke={budget.color}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                  opacity={0.3}
                />
              );
            })}

            {budget.builders.map((builder, j) => {
              const bx = getBuilderX(i, j, budget.builders.length);
              return (
                <g key={`builder-${budget.id}-${j}`}>
                  <circle
                    cx={bx}
                    cy={BUILDERS_Y}
                    r={BUILDER_SIZE / 2}
                    fill={`${budget.color}15`}
                    stroke={`${budget.color}60`}
                    strokeWidth={1}
                  />
                  <text
                    x={bx}
                    y={BUILDERS_Y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={budget.color}
                    fontSize={7}
                    opacity={0.9}
                  >
                    {builder}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </>
  );
}
