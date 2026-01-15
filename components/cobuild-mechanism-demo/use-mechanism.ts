import { useState, useRef, useCallback, useEffect } from "react";
import type { Particle, Budget } from "./types";
import { INITIAL_BUDGETS, BUILDER_SHARE } from "./constants";

export function useMechanism() {
  const [treasury, setTreasury] = useState(10000);
  const [supply, setSupply] = useState(1000);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL_BUDGETS);
  const idRef = useRef(0);
  const frameRef = useRef<number>(0);

  const floorPrice = treasury / supply;
  const marketPrice = floorPrice * 1.2;

  const addRevenueParticles = useCallback((sourceIndex: number, amount: number) => {
    const builderShare = amount * BUILDER_SHARE;

    const newParticles: Particle[] = [];
    for (let i = 0; i < 3; i++) {
      const targetBudget = i % INITIAL_BUDGETS.length;
      const targetBuilder = Math.floor(
        Math.random() * INITIAL_BUDGETS[targetBudget].builders.length
      );
      newParticles.push({
        id: idRef.current++,
        phase: "toTreasury",
        progress: i * -0.15,
        sourceIndex,
        targetBudget,
        targetBuilder,
        color: "#10b981",
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
    setBudgets((prev) =>
      prev.map((b) => ({
        ...b,
        allocation: b.allocation + builderShare / INITIAL_BUDGETS.length,
      }))
    );
  }, []);

  const mint = useCallback(
    (amount: number) => {
      const cost = amount * marketPrice;
      const treasuryShare = cost * (1 - BUILDER_SHARE);

      setTreasury((t) => t + treasuryShare);
      setSupply((s) => s + amount);
      addRevenueParticles(0, cost);
    },
    [marketPrice, addRevenueParticles]
  );

  const buyProduct = useCallback(
    (amount: number) => {
      const tokensIssued = amount / marketPrice;
      const treasuryShare = amount * (1 - BUILDER_SHARE);
      setTreasury((t) => t + treasuryShare);
      setSupply((s) => Math.round(s + tokensIssued));
      addRevenueParticles(1, amount);
    },
    [marketPrice, addRevenueParticles]
  );

  const donate = useCallback(
    (amount: number) => {
      const treasuryShare = amount * (1 - BUILDER_SHARE);
      setTreasury((t) => t + treasuryShare);
      addRevenueParticles(2, amount);
    },
    [addRevenueParticles]
  );

  const takeLoan = useCallback(
    (amount: number) => {
      if (amount > treasury * 0.2) return;

      const fee = amount * 0.2;
      const tokensLocked = amount / floorPrice;

      setTreasury((t) => t - amount + fee);
      setSupply((s) => Math.round(s - tokensLocked));
      addRevenueParticles(3, fee);
    },
    [treasury, floorPrice, addRevenueParticles]
  );

  const cashOut = useCallback(
    (tokens: number) => {
      if (tokens > supply * 0.1) return;

      const cashOutFee = 0.15;
      const grossValue = tokens * floorPrice;
      const fee = grossValue * cashOutFee;

      setTreasury((t) => t - grossValue + fee);
      setSupply((s) => s - tokens);
      addRevenueParticles(3, fee);
    },
    [floorPrice, supply, addRevenueParticles]
  );

  useEffect(() => {
    function tick() {
      setParticles((prev) => {
        const result: Particle[] = [];
        for (const p of prev) {
          const speed = 0.018;
          const newProgress = p.progress + speed;

          if (newProgress >= 1) {
            if (p.phase === "toTreasury") {
              result.push({
                ...p,
                phase: "toBudget",
                progress: 0,
                color: INITIAL_BUDGETS[p.targetBudget].color,
              });
            } else if (p.phase === "toBudget") {
              const budget = INITIAL_BUDGETS[p.targetBudget];
              for (let i = 0; i < budget.builders.length; i++) {
                result.push({
                  ...p,
                  id: idRef.current++,
                  phase: "toBuilder",
                  progress: i * -0.1,
                  targetBuilder: i,
                });
              }
            }
          } else {
            result.push({ ...p, progress: newProgress });
          }
        }
        return result.slice(-150);
      });

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return {
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
  };
}
