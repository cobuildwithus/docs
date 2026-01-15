interface CurvedPathProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function CurvedPath({ x1, y1, x2, y2 }: CurvedPathProps) {
  const controlOffset = Math.abs(y2 - y1) * 0.4;
  const d = `M ${x1} ${y1} C ${x1} ${y1 + controlOffset}, ${x2} ${y2 - controlOffset}, ${x2} ${y2}`;

  return (
    <path
      d={d}
      fill="none"
      stroke="#10b981"
      strokeWidth={1.5}
      strokeDasharray="4 6"
      opacity={0.3}
    />
  );
}
