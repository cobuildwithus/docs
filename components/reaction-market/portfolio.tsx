import { AnimatedNumber } from "./animated-number";
import { BUDGET_CONFIG } from "./constants";

type PortfolioProps = {
  value: number;
};

export function PortfolioSummary({ value }: PortfolioProps) {
  return (
    <div className="rounded-lg border border-neutral-800/50 bg-neutral-900/30 p-4">
      <div className="mb-2 text-[10px] uppercase tracking-wider text-neutral-500">
        Your Portfolio
      </div>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-neutral-100">
          <AnimatedNumber value={value} />
        </span>
        <span className="text-xs text-neutral-500">in $NETWORK</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">Likes</span>
          <span className="tabular-nums text-rose-400">
            ${BUDGET_CONFIG.like.amount.toFixed(2)}/each
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">Comments</span>
          <span className="tabular-nums text-sky-400">
            ${BUDGET_CONFIG.comment.amount.toFixed(2)}/each
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">Follows</span>
          <span className="tabular-nums text-violet-400">
            ${BUDGET_CONFIG.follow.amount.toFixed(2)}/each
          </span>
        </div>
      </div>
    </div>
  );
}
