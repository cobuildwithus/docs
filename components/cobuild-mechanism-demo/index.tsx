"use client";

import { CobuildMechanismControls } from "./controls";
import { CobuildMechanismDiagram } from "./diagram";
import { useMechanism } from "./use-mechanism";

export function CobuildMechanismDemo() {
  const {
    treasury,
    supply,
    particles,
    budgets,
    floorPrice,
    marketPrice,
    mint,
    buyProduct,
    donate,
    takeLoan,
    cashOut,
  } = useMechanism();

  return (
    <div className="bg-demo-dark my-6 w-full overflow-hidden rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4 sm:gap-8">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Floor</div>
            <div className="font-mono text-base font-semibold tabular-nums text-emerald-400 sm:text-lg">
              ${floorPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Price</div>
            <div className="font-mono text-base font-semibold tabular-nums text-orange-400 sm:text-lg">
              ${marketPrice.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Supply</div>
          <div className="font-mono text-base font-semibold tabular-nums text-neutral-300 sm:text-lg">
            {supply.toLocaleString()} tokens
          </div>
        </div>
      </div>

      <CobuildMechanismDiagram budgets={budgets} particles={particles} treasury={treasury} />
      <CobuildMechanismControls
        mint={mint}
        buyProduct={buyProduct}
        donate={donate}
        takeLoan={takeLoan}
        cashOut={cashOut}
      />

      <div className="mt-4 border-t border-neutral-800/50 pt-3 text-center text-xs text-neutral-500">
        Revenue grows the floor • Newly minted tokens fund budgets • Budgets pay builders
      </div>
    </div>
  );
}
