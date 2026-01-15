"use client";

import { useEffect, useRef, useState } from "react";
import { FLOWS } from "./flows-demo/constants";
import { FlowsDiagram } from "./flows-demo/diagram";
import type { Particle } from "./flows-demo/types";

export function FlowsDemo() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let lastSpawn = 0;

    function tick(now: number) {
      if (now - lastSpawn > 300) {
        lastSpawn = now;
        const newParticles: Particle[] = Array.from({ length: 2 }, () => {
          const flowIndex = Math.floor(Math.random() * FLOWS.length);
          return {
            id: idRef.current++,
            flowIndex,
            builderIndex: 0,
            phase: "toFlow" as const,
            progress: 0,
          };
        });
        setParticles((prev) => [...prev.slice(-80), ...newParticles]);
      }

      setParticles((prev) => {
        const result: Particle[] = [];
        for (const p of prev) {
          const speed = p.phase === "toFlow" ? 0.012 : 0.022;
          const newProgress = p.progress + speed;

          if (newProgress >= 1) {
            if (p.phase === "toFlow") {
              const flow = FLOWS[p.flowIndex];
              const splitCount = 1 + Math.floor(Math.random() * 5);
              const shuffled = [...flow.builders]
                .sort(() => Math.random() - 0.5)
                .slice(0, splitCount);

              for (const builder of shuffled) {
                result.push({
                  id: idRef.current++,
                  flowIndex: p.flowIndex,
                  builderIndex: builder.id,
                  phase: "toBuilder",
                  progress: Math.random() * 0.1,
                });
              }
            }
          } else {
            result.push({ ...p, progress: newProgress });
          }
        }
        return result.slice(-200);
      });

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="bg-demo-dark my-6 w-full overflow-hidden rounded-xl border border-neutral-800 p-5">
      <FlowsDiagram flows={FLOWS} particles={particles} />
    </div>
  );
}
