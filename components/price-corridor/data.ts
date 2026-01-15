export type CorridorEvent = { type: "issuance" | "cashout" | "loan"; label: string };

export type CorridorPoint = {
  time: number;
  ceiling: number;
  floor: number;
  market: number;
  event?: CorridorEvent;
};

export const colors = {
  amber: "#fbbf24",
  emerald: "#22c55e",
  orange: "#f97316",
  blue: "#3b82f6",
  violet: "#8b5cf6",
};

export const generateData = (): CorridorPoint[] => {
  const data: CorridorPoint[] = [];
  let ceiling = 1.0;
  let floor = 0.4;
  let market = 0.7;

  for (let t = 0; t <= 24; t++) {
    const point: CorridorPoint = { time: t, ceiling, floor, market };

    if (t === 4) {
      point.event = { type: "issuance", label: "Issuance" };
      floor += 0.08;
      market += 0.15;
    }
    if (t === 8) {
      ceiling = 1.5;
    }
    if (t === 10) {
      point.event = { type: "cashout", label: "Cash-out" };
      floor += 0.05;
      market -= 0.1;
    }
    if (t === 14) {
      point.event = { type: "loan", label: "Loan" };
      floor += 0.03;
    }
    if (t === 16) {
      ceiling = 2.0;
    }

    market += (Math.random() - 0.45) * 0.08;
    market = Math.max(floor + 0.05, Math.min(ceiling - 0.05, market));
    floor += 0.012;

    data.push(point);
  }
  return data;
};
