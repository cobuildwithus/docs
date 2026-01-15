import { colors } from "./data";
import type { CorridorPoint } from "./data";

type PriceCorridorDiagramProps = {
  data: CorridorPoint[];
};

export function PriceCorridorDiagram({ data }: PriceCorridorDiagramProps) {
  const width = 600;
  const height = 280;
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxY = 2.5;
  const minY = 0;

  const scaleX = (t: number) => padding.left + (t / 24) * chartWidth;
  const scaleY = (v: number) => padding.top + (1 - (v - minY) / (maxY - minY)) * chartHeight;

  const ceilingPath = data
    .map((d, i) => {
      const x = scaleX(d.time);
      const y = scaleY(d.ceiling);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const floorPath = data
    .map((d, i) => {
      const x = scaleX(d.time);
      const y = scaleY(d.floor);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const marketPath = data
    .map((d, i) => {
      const x = scaleX(d.time);
      const y = scaleY(d.market);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const corridorPath = `
    ${data.map((d, i) => `${i === 0 ? "M" : "L"} ${scaleX(d.time)} ${scaleY(d.ceiling)}`).join(" ")}
    ${[...data]
      .reverse()
      .map((d) => `L ${scaleX(d.time)} ${scaleY(d.floor)}`)
      .join(" ")}
    Z
  `;

  const events = data.filter((d) => d.event);

  return (
    <div>
      <svg
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="corridorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {[0.5, 1.0, 1.5, 2.0].map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={scaleY(v)}
              x2={width - padding.right}
              y2={scaleY(v)}
              stroke="#262626"
              strokeDasharray="2 4"
            />
            <text
              x={padding.left - 8}
              y={scaleY(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#525252"
              fontSize={10}
            >
              ${v.toFixed(1)}
            </text>
          </g>
        ))}

        <path d={corridorPath} fill="url(#corridorGradient)" />

        <path
          d={ceilingPath}
          fill="none"
          stroke={colors.amber}
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <path d={floorPath} fill="none" stroke={colors.emerald} strokeWidth={2} />
        <path
          d={marketPath}
          fill="none"
          stroke={colors.orange}
          strokeWidth={2}
          strokeLinecap="round"
        />

        {events.map((d, i) => {
          const x = scaleX(d.time);
          const y = scaleY(d.floor);
          const eventColors = {
            issuance: { bg: colors.blue, text: "#60a5fa" },
            cashout: { bg: colors.orange, text: "#fb923c" },
            loan: { bg: colors.violet, text: "#a78bfa" },
          };
          const color = eventColors[d.event!.type];
          return (
            <g key={i}>
              <line
                x1={x}
                y1={padding.top}
                x2={x}
                y2={height - padding.bottom}
                stroke={color.bg}
                strokeWidth={1}
                strokeDasharray="2 3"
                opacity={0.5}
              />
              <circle cx={x} cy={y} r={4} fill={color.bg} stroke="#0a0a0a" strokeWidth={2} />
              <text
                x={x}
                y={padding.top - 10}
                textAnchor="middle"
                fill={color.text}
                fontSize={9}
                fontWeight={500}
              >
                {d.event!.label}
              </text>
            </g>
          );
        })}

        <text x={width / 2} y={height - 8} textAnchor="middle" fill="#525252" fontSize={11}>
          Time →
        </text>
      </svg>
    </div>
  );
}
