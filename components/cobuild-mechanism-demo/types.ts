export interface Particle {
  id: number;
  phase: "toTreasury" | "toBudget" | "toBuilder";
  progress: number;
  sourceIndex: number;
  targetBudget: number;
  targetBuilder: number;
  color: string;
}

export interface RevenueSource {
  id: number;
  name: string;
  description: string;
}

export interface Budget {
  id: number;
  name: string;
  color: string;
  allocation: number;
  builders: string[];
}
