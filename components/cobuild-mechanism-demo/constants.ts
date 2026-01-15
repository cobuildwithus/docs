import type { RevenueSource, Budget } from "./types";

export const SVG_WIDTH = 700;
export const SVG_HEIGHT = 480;
export const CENTER_X = SVG_WIDTH / 2;

export const SOURCES_Y = 50;
export const TREASURY_Y = 190;
export const BUDGETS_Y = 340;
export const BUILDERS_Y = 420;

export const SOURCE_WIDTH = 130;
export const SOURCE_HEIGHT = 72;
export const TREASURY_SIZE = 80;
export const BUDGET_WIDTH = 120;
export const BUDGET_HEIGHT = 60;
export const BUILDER_SIZE = 24;

export const BUILDER_SHARE = 0.15;

export const REVENUE_SOURCES: RevenueSource[] = [
  { id: 0, name: "Minting", description: "New tokens issued" },
  { id: 1, name: "Splits", description: "Revenue sharing" },
  { id: 2, name: "Donations", description: "Direct contributions" },
  { id: 3, name: "Fees", description: "Protocol fees" },
];

export const INITIAL_BUDGETS: Budget[] = [
  { id: 0, name: "Development", color: "#3b82f6", allocation: 0, builders: ["ali", "bob", "car"] },
  { id: 1, name: "Meetups", color: "#8b5cf6", allocation: 0, builders: ["dan", "eve"] },
  { id: 2, name: "Content", color: "#ec4899", allocation: 0, builders: ["fay", "gus", "hal"] },
];
