"use client";

export function StakeLifecycleDiagram() {
  const steps = [
    {
      num: 1,
      title: "Stake on Goal",
      desc: "$COBUILD locked at the Goal level",
      color: "#f97316",
      bg: "rgba(249,115,22,0.08)",
    },
    {
      num: 2,
      title: "Allocate to budgets",
      desc: "Move stake between budgets freely — streams reroute with weight",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.06)",
    },
    {
      num: 3,
      title: "Reallocate anytime",
      desc: "Unstake from one budget, restake on another — points accrue while allocated",
      color: "#22c55e",
      bg: "rgba(34,197,94,0.06)",
    },
    {
      num: 4,
      title: "Goal resolves",
      desc: "$COBUILD withdrawable",
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.06)",
    },
  ];

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <div className="mb-5">
        <div className="text-sm font-medium text-neutral-200">
          Stake Lifecycle
        </div>
        <div className="text-xs text-neutral-500">
          From staking on a Goal to withdrawal
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch">
            {/* Left: number + vertical line */}
            <div className="flex w-8 flex-col items-center">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  border: `2px solid ${step.color}`,
                  color: step.color,
                  backgroundColor: step.bg,
                }}
              >
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-px flex-1"
                  style={{ backgroundColor: "#262626" }}
                />
              )}
            </div>

            {/* Right: content */}
            <div className={`ml-3 ${i < steps.length - 1 ? "pb-5" : "pb-0"}`}>
              <div
                className="text-sm font-medium"
                style={{ color: step.color }}
              >
                {step.title}
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
