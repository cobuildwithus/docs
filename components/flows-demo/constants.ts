import type { Builder, FlowConfig } from "./types";

const BUILDER_NAMES = [
  ["ali", "bob", "car", "dan", "eve", "fay", "gus", "hal"],
  ["geo", "han", "ivy", "jay", "kim", "lou", "max"],
  ["leo", "mia", "ned", "ora", "pat", "quinn", "ren"],
  ["sam", "tia", "uma", "vic", "wil", "xen", "yara"],
  ["zoe", "ari", "ben", "cal", "dex", "eli", "fin"],
];

const makeBuilders = (names: string[]): Builder[] => {
  const spacing = 24;
  const start = -((names.length - 1) * spacing) / 2;
  return names.map((name, i) => ({ id: i, angle: start + i * spacing, name }));
};

export const FLOWS: FlowConfig[] = [
  { id: 0, name: "Dev Tools", color: "#3b82f6", accentColor: "#60a5fa", angle: -90 },
  { id: 1, name: "Content", color: "#8b5cf6", accentColor: "#a78bfa", angle: -18 },
  { id: 2, name: "Design", color: "#ec4899", accentColor: "#f472b6", angle: 54 },
  { id: 3, name: "Research", color: "#f59e0b", accentColor: "#fbbf24", angle: 126 },
  { id: 4, name: "Infra", color: "#10b981", accentColor: "#34d399", angle: 198 },
].map((f, i) => ({ ...f, builders: makeBuilders(BUILDER_NAMES[i]) }));

export const SVG_WIDTH = 760;
export const SVG_HEIGHT = 600;
export const CENTER_X = SVG_WIDTH / 2;
export const CENTER_Y = SVG_HEIGHT / 2;
export const CENTER_RADIUS = 56;
export const FLOW_ORBIT = 195;
export const BUILDER_ORBIT = 95;
export const FLOW_RADIUS = 40;
