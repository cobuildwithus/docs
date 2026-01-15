import { CENTER_X, REVENUE_SOURCES, INITIAL_BUDGETS } from "./constants";

export function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function formatUsd(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export function getSourceX(index: number) {
  const totalWidth = (REVENUE_SOURCES.length - 1) * 160;
  const startX = CENTER_X - totalWidth / 2;
  return startX + index * 160;
}

export function getBudgetX(index: number) {
  const totalWidth = (INITIAL_BUDGETS.length - 1) * 200;
  const startX = CENTER_X - totalWidth / 2;
  return startX + index * 200;
}

export function getBuilderX(budgetIndex: number, builderIndex: number, builderCount: number) {
  const budgetX = getBudgetX(budgetIndex);
  const spacing = 36;
  const totalWidth = (builderCount - 1) * spacing;
  return budgetX - totalWidth / 2 + builderIndex * spacing;
}

export function getPointOnCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number
): { x: number; y: number } {
  const controlOffset = Math.abs(y2 - y1) * 0.4;
  const cp1y = y1 + controlOffset;
  const cp2y = y2 - controlOffset;

  const mt = 1 - t;
  const x = mt * mt * mt * x1 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x2;
  const y = mt * mt * mt * y1 + 3 * mt * mt * t * cp1y + 3 * mt * t * t * cp2y + t * t * t * y2;

  return { x, y };
}
