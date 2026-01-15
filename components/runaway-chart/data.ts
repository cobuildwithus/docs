export type RunawayPoint = {
  time: number;
  ceiling: number;
  floor: number;
  market: number;
};

export const colors = {
  amber: "#fbbf24",
  emerald: "#22c55e",
  rose: "#f43f5e",
};

export const generateRunawayData = (): RunawayPoint[] => {
  const data: RunawayPoint[] = [];
  let ceiling = 1.0;
  let floor = 0.35;
  let market = 0.7;

  for (let t = 0; t <= 30; t++) {
    if (t === 6) ceiling = 1.5;
    if (t === 12) ceiling = 2.3;
    if (t === 18) ceiling = 3.5;
    if (t === 24) ceiling = 5.2;

    floor += 0.008;

    if (t < 10) {
      if (t === 2 || t === 5) {
        market = ceiling - 0.02;
      } else if (t === 7 || t === 8) {
        market = ceiling - 0.05;
      } else {
        market += (Math.random() - 0.3) * 0.1;
        market = Math.max(floor + 0.15, Math.min(ceiling - 0.02, market));
      }
    } else {
      const pullToFloor = (market - floor - 0.05) * 0.15;
      market -= pullToFloor;
      market += (Math.random() - 0.5) * 0.03;
      market = Math.max(floor + 0.02, market);
    }

    data.push({ time: t, ceiling, floor, market });
  }
  return data;
};
