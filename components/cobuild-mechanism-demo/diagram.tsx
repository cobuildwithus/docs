import { SVG_HEIGHT, SVG_WIDTH } from "./constants";
import { DiagramBudgets } from "./diagram-budgets";
import { DiagramDefs } from "./diagram-defs";
import { DiagramParticles } from "./diagram-particles";
import { DiagramSources } from "./diagram-sources";
import { DiagramTreasury } from "./diagram-treasury";
import type { Budget, Particle } from "./types";

type CobuildMechanismDiagramProps = {
  budgets: Budget[];
  particles: Particle[];
  treasury: number;
};

export function CobuildMechanismDiagram({
  budgets,
  particles,
  treasury,
}: CobuildMechanismDiagramProps) {
  return (
    <div className="relative flex w-full justify-center overflow-x-auto">
      <svg
        viewBox={`30 0 ${SVG_WIDTH - 60} ${SVG_HEIGHT}`}
        className="h-auto w-full min-w-[500px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <DiagramDefs />
        <DiagramSources />
        <DiagramTreasury treasury={treasury} />
        <DiagramBudgets budgets={budgets} />
        <DiagramParticles particles={particles} />
      </svg>
    </div>
  );
}
