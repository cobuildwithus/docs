"use client";

import { useEffect, useState } from "react";
import { colors, generateRunawayData } from "./runaway-chart/data";
import { RunawayChartDiagram } from "./runaway-chart/diagram";

export function RunawayChart() {
  const [mounted, setMounted] = useState(false);
  const [data] = useState(generateRunawayData);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Ceiling Runaway Scenario</div>
          <div className="text-xs text-neutral-500">
            When ceiling grows faster than market can follow
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
            <div className="h-0.5 w-4" style={{ backgroundColor: colors.rose }} />
            <span className="text-neutral-400">Market</span>
          </div>
        </div>
      </div>

      <RunawayChartDiagram data={data} />

      <div className="mt-4 border-t border-neutral-800/50 pt-3">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div
            className="rounded-lg px-3 py-2"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div style={{ color: "#34d399" }} className="mb-1 font-medium">
              Healthy Phase
            </div>
            <div className="text-neutral-400">
              Market tracks between floor and ceiling. New issuance flows into treasury.
            </div>
          </div>
          <div
            className="rounded-lg px-3 py-2"
            style={{
              backgroundColor: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.2)",
            }}
          >
            <div style={{ color: "#fb7185" }} className="mb-1 font-medium">
              Runaway Phase
            </div>
            <div className="text-neutral-400">
              Ceiling escapes market. Rational buyers use AMM instead. Treasury growth halts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
