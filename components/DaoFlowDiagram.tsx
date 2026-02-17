"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Budget = {
  name: string;
  stake: number;
  yourStake: number;
  completed?: boolean;
};

type Particle = {
  id: number;
  phase: "toReward" | "toBudget" | "toAlloc";
  progress: number;
  budgetIndex: number;
  color: string;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function getQuadraticPoint(x0: number, y0: number, x1: number, y1: number, t: number) {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2 - 20;
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  };
}

const REWARD_RATE = 0.2;

export function DaoFlowDiagram() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { name: "Budget A", stake: 500, yourStake: 0 },
    { name: "Budget B", stake: 300, yourStake: 0 },
    { name: "Budget C", stake: 200, yourStake: 0 },
  ]);
  const [stakeAmount, setStakeAmount] = useState(100);
  const [pendingAllocation, setPendingAllocation] = useState<number[]>([0, 0, 0]);
  const [rewardBalance, setRewardBalance] = useState(0);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  const totalYourStake = useMemo(
    () => budgets.reduce((sum, b) => sum + b.yourStake, 0),
    [budgets]
  );
  // Only count active (non-completed) budgets for stake calculations
  const totalEffectiveStake = useMemo(
    () => budgets.filter((b) => !b.completed).reduce((sum, b) => sum + b.stake + b.yourStake, 0),
    [budgets]
  );
  const stakePercentages = useMemo(
    () =>
      budgets
        .filter((b) => !b.completed)
        .map((b) =>
          totalEffectiveStake > 0 ? Math.round(((b.stake + b.yourStake) / totalEffectiveStake) * 100) : 0
        ),
    [budgets, totalEffectiveStake]
  );

  const remainingToAllocate = stakeAmount - pendingAllocation.reduce((a, b) => a + b, 0);

  // Particle animation
  useEffect(() => {
    function tick(now: number) {
      if (now - lastSpawnRef.current > 400) {
        lastSpawnRef.current = now;

        const newParticles: Particle[] = [];

        // Spawn reward particle occasionally
        if (Math.random() < 0.2) {
          newParticles.push({
            id: idRef.current++,
            phase: "toReward",
            progress: 0,
            budgetIndex: 0,
            color: "#fbbf24",
          });
        }

        // Spawn budget particle based on stake weights (only active budgets)
        const activeOnly = budgets.filter((b) => !b.completed);
        const effStakes = activeOnly.map((b) => b.stake + b.yourStake);
        const totalEff = effStakes.reduce((a, b) => a + b, 0);

        if (totalEff > 0) {
          const rand = Math.random();
          let cumulative = 0;
          for (let i = 0; i < activeOnly.length; i++) {
            cumulative += effStakes[i] / totalEff;
            if (rand < cumulative) {
              newParticles.push({
                id: idRef.current++,
                phase: "toBudget",
                progress: 0,
                budgetIndex: i,
                color: "#a78bfa",
              });
              break;
            }
          }
        }

        setParticles((prev) => [...prev.slice(-60), ...newParticles]);
      }

      setParticles((prev) => {
        const result: Particle[] = [];
        for (const p of prev) {
          const speed = 0.02;
          const newProgress = p.progress + speed;

          if (newProgress >= 1) {
            if (p.phase === "toBudget") {
              result.push({
                ...p,
                id: idRef.current++,
                phase: "toAlloc",
                progress: 0,
                color: "#60a5fa",
              });
            }
          } else {
            result.push({ ...p, progress: newProgress });
          }
        }
        return result;
      });

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [budgets]);

  const handleStake = useCallback(() => {
    const totalPending = pendingAllocation.reduce((a, b) => a + b, 0);
    if (totalPending === 0) return;

    setBudgets((prev) =>
      prev.map((b, i) => ({
        ...b,
        yourStake: b.yourStake + pendingAllocation[i],
      }))
    );
    setStakeAmount((prev) => Math.max(0, prev - totalPending));
    setPendingAllocation(budgets.map(() => 0));
  }, [pendingAllocation, budgets]);

  const handleMarkSuccess = useCallback(() => {
    const target = budgets[selectedBudgetIndex];
    if (!target || target.completed) return;

    const reclaimed = target.yourStake;
    const reward = Math.round(reclaimed * REWARD_RATE);

    setBudgets((prev) =>
      prev.map((b, i) => (i === selectedBudgetIndex ? { ...b, yourStake: 0, completed: true } : b))
    );
    if (reclaimed > 0) {
      setRewardBalance((prev) => prev + reward);
      setStakeAmount((prev) => prev + reclaimed + reward);
    }
  }, [budgets, selectedBudgetIndex]);

  const handlePropose = useCallback(() => {
    setBudgets((prev) => {
      const nextName = `Budget ${String.fromCharCode(65 + prev.length)}`;
      return [...prev, { name: nextName, stake: 0, yourStake: 0 }];
    });
    setPendingAllocation((prev) => [...prev, 0]);
  }, []);

  // Separate active and completed budgets
  const activeBudgets = budgets.filter((b) => !b.completed);
  const completedBudgets = budgets.filter((b) => b.completed);

  const width = Math.max(560, Math.max(activeBudgets.length, 1) * 160 + 120);
  const height = 360;
  const centerX = width / 2;

  const goalY = 60;
  const rewardX = width - 70;
  const rewardY = 46;
  const budgetY = 185;
  const allocY = 290;

  const budgetSpacing = (width - 100) / Math.max(activeBudgets.length, 1);
  const budgetXs = activeBudgets.map((_, i) => 50 + budgetSpacing * (i + 0.5));

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-medium text-neutral-200">Treasury Graph</div>
          <div className="text-sm text-neutral-500">Funds stream pro-rata by stake weight</div>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-right">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Total staked</div>
          <div className="text-sm font-mono text-orange-300">{totalYourStake} $CO</div>
          <div className="mt-1 text-[10px] uppercase tracking-wide text-neutral-500">Current rewards</div>
          <div className="text-sm font-mono text-amber-300">{rewardBalance} $CO</div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto block w-full"
      >
        <defs>
          <linearGradient id="goalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#2e1065" />
          </linearGradient>
          <linearGradient id="rewardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#713f12" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="budgetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <linearGradient id="allocGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
        </defs>

        <text x={centerX} y="20" textAnchor="middle" fill="#a3a3a3" fontSize="11">
          funders deposit
        </text>
        <path d={`M ${centerX} 28 L ${centerX} 48`} stroke="#a3a3a3" strokeWidth="2" />

        <g transform={`translate(${centerX}, ${goalY})`}>
          <rect x="-110" y="-20" width="220" height="40" rx="8" fill="url(#goalGrad)" stroke="#8b5cf6" strokeWidth="2" />
          <text x="0" y="6" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="500" fontFamily="monospace">
            Goal Treasury
          </text>
        </g>

        <path
          d={`M ${centerX + 50} ${goalY - 10} Q ${centerX + 110} ${goalY - 30} ${rewardX - 50} ${rewardY}`}
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.5"
        />

        <g transform={`translate(${rewardX}, ${rewardY})`}>
          <rect x="-55" y="-18" width="110" height="36" rx="6" fill="url(#rewardGrad)" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" />
          <text x="0" y="-1" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="500">
            Reward Pool
          </text>
          <text x="0" y="11" textAnchor="middle" fill="#a3a3a3" fontSize="8">
            unlocks on success
          </text>
        </g>

        {budgetXs.map((bx, i) => {
          const strokeW = 1 + (stakePercentages[i] / 100) * 3;
          return (
            <path
              key={`g-${i}`}
              d={`M ${centerX} ${goalY + 20} Q ${centerX} ${goalY + 60} ${(centerX + bx) / 2} ${budgetY - 60} Q ${bx} ${budgetY - 40} ${bx} ${budgetY - 22}`}
              stroke="#a78bfa"
              strokeWidth={strokeW}
              strokeDasharray="6 5"
              fill="none"
              opacity="0.4"
            />
          );
        })}

        {budgetXs.map((bx, i) => (
          <g key={`b-${i}`} transform={`translate(${bx}, ${budgetY})`}>
            <rect x="-65" y="-18" width="130" height="36" rx="8" fill="url(#budgetGrad)" stroke="#22c55e" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="500">
              {activeBudgets[i].name}
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#737373" fontSize="10">
              {stakePercentages[i]}%
            </text>
            {activeBudgets[i].yourStake > 0 && (
              <g transform="translate(0, -32)">
                <rect x="-30" y="-10" width="60" height="18" rx="4" fill="#f97316" opacity="0.9" />
                <text x="0" y="3" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">
                  {activeBudgets[i].yourStake} $CO
                </text>
              </g>
            )}
          </g>
        ))}

        {budgetXs.map((bx, i) => (
          <path key={`a-${i}`} d={`M ${bx} ${budgetY + 42} L ${bx} ${allocY - 18}`} stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        ))}

        {budgetXs.map((bx, i) => (
          <g key={`m-${i}`} transform={`translate(${bx}, ${allocY})`}>
            <rect x="-55" y="-12" width="110" height="28" rx="6" fill="url(#allocGrad)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="0" y="5" textAnchor="middle" fill="#60a5fa" fontSize="9">
              Grants / Contests
            </text>
          </g>
        ))}

        <text x={centerX} y={allocY + 45} textAnchor="middle" fill="#737373" fontSize="10">
          to contributors
        </text>

        {/* Animated particles */}
        {particles.map((p) => {
          const t = smoothstep(p.progress);
          let x: number, y: number;

          if (p.phase === "toReward") {
            const pos = getQuadraticPoint(centerX, goalY, rewardX, rewardY, t);
            x = pos.x;
            y = pos.y;
          } else if (p.phase === "toBudget") {
            const bx = budgetXs[p.budgetIndex];
            x = lerp(centerX, bx, t);
            y = lerp(goalY + 20, budgetY - 18, t);
          } else {
            const bx = budgetXs[p.budgetIndex];
            x = bx;
            y = lerp(budgetY + 18, allocY - 12, t);
          }

          const fadeIn = Math.min(1, p.progress * 5);
          const fadeOut = p.progress > 0.8 ? (1 - p.progress) * 5 : 1;

          return (
            <circle
              key={p.id}
              cx={x}
              cy={y}
              r={4}
              fill={`${p.color}60`}
              stroke={p.color}
              strokeWidth={1.5}
              opacity={fadeIn * fadeOut}
            />
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-6 border-t border-neutral-800/50 pt-4">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-4">
            <div className="text-xs text-neutral-500">Your $CO to stake:</div>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => {
                setStakeAmount(Math.max(0, parseInt(e.target.value) || 0));
                setPendingAllocation(budgets.map(() => 0));
              }}
              className="w-20 appearance-none rounded border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-neutral-200 focus:border-orange-500 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            {budgets.map((b, i) =>
              b.completed ? null : (
                <div key={b.name} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-neutral-400">{b.name}</span>
                  {b.yourStake > 0 && (
                    <span className="rounded bg-orange-900/50 px-2 py-0.5 text-xs text-orange-400">
                      {b.yourStake} locked
                    </span>
                  )}
                  <input
                    type="range"
                    min="0"
                    max={remainingToAllocate + pendingAllocation[i]}
                    value={pendingAllocation[i]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPendingAllocation((prev) => {
                        const next = [...prev];
                        next[i] = val;
                        return next;
                      });
                    }}
                    className="h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-neutral-700 accent-orange-500"
                  />
                  <span className="w-10 text-right font-mono text-xs text-orange-400">
                    {pendingAllocation[i]}
                  </span>
                </div>
              )
            )}
          </div>

          {pendingAllocation.some((a) => a > 0) && (
            <button
              onClick={handleStake}
              className="mt-3 rounded-md bg-orange-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-orange-500"
            >
              Stake {pendingAllocation.reduce((a, b) => a + b, 0)} $CO
            </button>
          )}
        </div>

        <div>
          <div className="mb-2 text-xs text-neutral-500">Actions</div>
          <div className="flex flex-col gap-2">
            <button
              className="rounded-md border border-green-600 bg-green-950/50 px-3 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-900/50"
              onClick={handlePropose}
            >
              + Propose new budget
            </button>
            <div className="flex items-center gap-2">
              <select
                value={selectedBudgetIndex}
                onChange={(e) => setSelectedBudgetIndex(parseInt(e.target.value))}
                className="h-8 rounded border border-neutral-700 bg-neutral-800 px-2 text-xs text-neutral-200"
              >
                {budgets.map((b, i) =>
                  b.completed ? null : (
                    <option key={b.name} value={i}>
                      {b.name}
                    </option>
                  )
                )}
              </select>
              <button
                className="h-8 rounded-md border border-amber-500/60 bg-amber-950/40 px-3 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-900/40"
                onClick={handleMarkSuccess}
              >
                Mark success + reclaim
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completed budgets */}
      {completedBudgets.length > 0 && (
        <div className="mt-4 border-t border-neutral-800/50 pt-4">
          <div className="mb-2 text-xs text-neutral-500">Completed Budgets</div>
          <div className="flex flex-wrap gap-2">
            {completedBudgets.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-2 rounded-md border border-green-800/50 bg-green-950/30 px-3 py-1.5"
              >
                <span className="text-xs text-green-400">{b.name}</span>
                <span className="text-[10px] text-green-600">Success</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
