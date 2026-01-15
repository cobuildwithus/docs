import {
  BUDGET_HEIGHT,
  BUDGETS_Y,
  BUILDERS_Y,
  CENTER_X,
  INITIAL_BUDGETS,
  SOURCE_HEIGHT,
  SOURCES_Y,
  TREASURY_SIZE,
  TREASURY_Y,
} from "./constants";
import { getBudgetX, getBuilderX, getPointOnCurve, getSourceX, lerp, smoothstep } from "./utils";
import type { Particle } from "./types";

type DiagramParticlesProps = {
  particles: Particle[];
};

export function DiagramParticles({ particles }: DiagramParticlesProps) {
  return (
    <>
      {particles.map((p) => {
        if (p.progress < 0) return null;
        const t = smoothstep(p.progress);
        let x: number, y: number;

        if (p.phase === "toTreasury") {
          const sourceX = getSourceX(p.sourceIndex);
          const pos = getPointOnCurve(
            sourceX,
            SOURCES_Y + SOURCE_HEIGHT / 2,
            CENTER_X,
            TREASURY_Y - TREASURY_SIZE / 2,
            t
          );
          x = pos.x;
          y = pos.y;
        } else if (p.phase === "toBudget") {
          const budgetX = getBudgetX(p.targetBudget);
          const pos = getPointOnCurve(
            CENTER_X,
            TREASURY_Y + TREASURY_SIZE / 2,
            budgetX,
            BUDGETS_Y - BUDGET_HEIGHT / 2,
            t
          );
          x = pos.x;
          y = pos.y;
        } else {
          const budgetX = getBudgetX(p.targetBudget);
          const builderX = getBuilderX(
            p.targetBudget,
            p.targetBuilder,
            INITIAL_BUDGETS[p.targetBudget].builders.length
          );
          x = lerp(budgetX, builderX, t);
          y = lerp(BUDGETS_Y + BUDGET_HEIGHT / 2, BUILDERS_Y, t);
        }

        const fadeIn = Math.min(1, p.progress * 5);
        const fadeOut = p.progress > 0.8 ? (1 - p.progress) * 5 : 1;

        return (
          <circle
            key={p.id}
            cx={x}
            cy={y}
            r={5}
            fill={`${p.color}60`}
            stroke={p.color}
            strokeWidth={1.5}
            opacity={fadeIn * fadeOut}
          />
        );
      })}
    </>
  );
}
