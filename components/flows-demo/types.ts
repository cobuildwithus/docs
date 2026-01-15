export interface Builder {
  id: number;
  angle: number;
  name: string;
}

export interface FlowConfig {
  id: number;
  name: string;
  color: string;
  accentColor: string;
  builders: Builder[];
  angle: number;
}

export interface Particle {
  id: number;
  flowIndex: number;
  builderIndex: number;
  phase: "toFlow" | "toBuilder";
  progress: number;
}
