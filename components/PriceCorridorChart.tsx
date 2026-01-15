"use client";

import { useEffect, useState } from "react";
import { colors, generateData } from "./price-corridor/data";
import { PriceCorridorDiagram } from "./price-corridor/diagram";

export function PriceCorridorChart() {
  const [mounted, setMounted] = useState(false);
  const [data] = useState(generateData);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Price Corridor</div>
          <div className="text-xs text-neutral-500">
            Market oscillates between ceiling and floor
          </div>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.amber }} />
            <span className="text-neutral-400">Ceiling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.emerald }} />
            <span className="text-neutral-400">Floor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.orange }} />
            <span className="text-neutral-400">Market</span>
          </div>
        </div>
      </div>

      <PriceCorridorDiagram data={data} />

      <div className="mt-4 flex gap-4 border-t border-neutral-800/50 pt-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full" style={{ backgroundColor: colors.blue }} />
          <span>Issuance raises floor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full" style={{ backgroundColor: colors.orange }} />
          <span>Cash-out raises floor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full" style={{ backgroundColor: colors.violet }} />
          <span>Loan raises floor</span>
        </div>
      </div>
    </div>
  );
}
