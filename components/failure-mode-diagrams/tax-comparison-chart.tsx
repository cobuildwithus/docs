"use client";

import { useEffect, useState } from "react";

export function TaxComparisonChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const lowTaxData = { exit: 85, loan: 15 };
  const highTaxData = { exit: 25, loan: 75 };

  const colors = {
    cashout: "#f97316",
    loan: "#8b5cf6",
  };

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-4">
      <div className="mb-4 text-xs text-neutral-500">How holders exit under stress</div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-2 text-[11px] text-neutral-400">Low Tax (&lt;10%)</div>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                <span>Cash-out</span>
                <span>{lowTaxData.exit}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${lowTaxData.exit}%`, backgroundColor: colors.cashout }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                <span>Loan</span>
                <span>{lowTaxData.loan}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${lowTaxData.loan}%`, backgroundColor: colors.loan }}
                />
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px]" style={{ color: colors.cashout }}>
            Exit-dominant
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] text-neutral-400">High Tax (&gt;30%)</div>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                <span>Cash-out</span>
                <span>{highTaxData.exit}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${highTaxData.exit}%`, backgroundColor: colors.cashout }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-neutral-500">
                <span>Loan</span>
                <span>{highTaxData.loan}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${highTaxData.loan}%`, backgroundColor: colors.loan }}
                />
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px]" style={{ color: colors.loan }}>
            Loan-dominant
          </div>
        </div>
      </div>
    </div>
  );
}
