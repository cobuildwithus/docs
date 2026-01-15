"use client";

import { useState, useEffect } from "react";

export function AutoIssuanceDiagram() {
  const [mounted, setMounted] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const beforeTreasury = 100;
  const beforeSupply = 100;
  const beforeFloor = beforeTreasury / beforeSupply;

  const afterTreasury = 100;
  const autoMint = 25;
  const afterSupply = beforeSupply + autoMint;
  const afterFloor = afterTreasury / afterSupply;

  const barMaxHeight = 120;
  const treasuryHeight = barMaxHeight;
  const beforeSupplyHeight = barMaxHeight;
  const afterSupplyHeight = barMaxHeight;

  // Colors as hex/rgba for production reliability
  const colors = {
    emerald: {
      text: "#34d399",
      bg: "rgba(16, 185, 129, 0.3)",
      border: "rgba(16, 185, 129, 0.5)",
    },
    orange: {
      text: "#fdba74",
      bg: "rgba(249, 115, 22, 0.3)",
      border: "rgba(249, 115, 22, 0.5)",
    },
    blue: {
      text: "#93c5fd",
      bg: "rgba(59, 130, 246, 0.3)",
      border: "rgba(59, 130, 246, 0.5)",
    },
    red: {
      text: "#f87171",
      bg: "rgba(239, 68, 68, 0.3)",
      border: "rgba(239, 68, 68, 0.5)",
    },
  };

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Auto-issuance Effect</div>
          <div className="text-xs text-neutral-500">Mints tokens without adding to treasury</div>
        </div>
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="rounded-md bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-700"
        >
          {showAfter ? "Reset" : "Auto-mint"}
        </button>
      </div>

      <div className="flex items-end justify-center gap-4 py-6 sm:gap-8">
        {/* Treasury */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-xs font-medium" style={{ color: colors.emerald.text }}>
            Treasury
          </div>
          <div className="relative w-16">
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: treasuryHeight,
                backgroundColor: colors.emerald.bg,
                border: `1px solid ${colors.emerald.border}`,
              }}
            >
              <div className="absolute inset-x-0 bottom-2 text-center">
                <span className="text-sm font-semibold" style={{ color: colors.emerald.text }}>
                  ${showAfter ? afterTreasury : beforeTreasury}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-neutral-500">unchanged</div>
        </div>

        {/* Divider */}
        <div className="self-center text-2xl text-neutral-600">÷</div>

        {/* Supply */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-xs font-medium" style={{ color: colors.orange.text }}>
            Supply
          </div>
          <div className="relative w-16">
            <div
              className="w-full overflow-hidden rounded-t-md transition-all duration-500"
              style={{
                height: showAfter ? afterSupplyHeight + 30 : beforeSupplyHeight,
              }}
            >
              {/* Original supply */}
              <div
                className="w-full rounded-t-md"
                style={{
                  height: beforeSupplyHeight,
                  backgroundColor: colors.orange.bg,
                  border: `1px solid ${colors.orange.border}`,
                  borderBottom: "none",
                }}
              />
              {/* Auto-minted portion */}
              <div
                className="w-full transition-all duration-500"
                style={{
                  height: showAfter ? 30 : 0,
                  backgroundColor: colors.red.bg,
                  border: `1px solid ${colors.red.border}`,
                  borderTopStyle: "dashed",
                  opacity: showAfter ? 1 : 0,
                }}
              >
                {showAfter && (
                  <div className="pt-1.5 text-center text-[9px]" style={{ color: colors.red.text }}>
                    +{autoMint}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-2 text-center">
              <span className="text-sm font-semibold" style={{ color: colors.orange.text }}>
                {showAfter ? afterSupply : beforeSupply}
              </span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-neutral-500">
            {showAfter ? <span style={{ color: colors.red.text }}>↑ increased</span> : "tokens"}
          </div>
        </div>

        {/* Equals */}
        <div className="self-center text-2xl text-neutral-600">=</div>

        {/* Floor Price */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-xs font-medium" style={{ color: colors.blue.text }}>
            Floor Price
          </div>
          <div className="relative w-16">
            <div
              className="flex w-full items-end justify-center rounded-t-md pb-2 transition-all duration-500"
              style={{
                height: showAfter ? 96 : 120,
                backgroundColor: colors.blue.bg,
                border: `1px solid ${colors.blue.border}`,
              }}
            >
              <span className="text-sm font-semibold" style={{ color: colors.blue.text }}>
                ${showAfter ? afterFloor.toFixed(2) : beforeFloor.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-neutral-500">
            {showAfter ? <span style={{ color: colors.red.text }}>↓ diluted</span> : "per token"}
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="my-3 border-b border-t border-neutral-800/50 py-3 text-center">
        <code className="text-xs text-neutral-400">
          floor = treasury ÷ supply = ${showAfter ? afterTreasury : beforeTreasury} ÷{" "}
          {showAfter ? afterSupply : beforeSupply} ={" "}
          <span style={{ color: showAfter ? colors.red.text : colors.blue.text }}>
            ${showAfter ? afterFloor.toFixed(2) : beforeFloor.toFixed(2)}
          </span>
        </code>
      </div>

      {/* Key insight */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div
          className="rounded-lg px-3 py-2"
          style={{
            backgroundColor: colors.red.bg,
            border: `1px solid ${colors.red.border}`,
          }}
        >
          <div className="text-[11px] font-medium" style={{ color: colors.red.text }}>
            Auto-issuance dilutes
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-neutral-400">
            Tokens minted without payment → floor goes down
          </div>
        </div>
        <div
          className="rounded-lg px-3 py-2"
          style={{
            backgroundColor: colors.emerald.bg,
            border: `1px solid ${colors.emerald.border}`,
          }}
        >
          <div className="text-[11px] font-medium" style={{ color: colors.emerald.text }}>
            Use sparingly
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-neutral-400">
            Only for past work (founders, angels, partners)
          </div>
        </div>
      </div>
    </div>
  );
}
