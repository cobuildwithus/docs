import { colors } from "./data";
import type { RunawayPoint } from "./data";

type RunawayChartDiagramProps = {
  data: RunawayPoint[];
};

export function RunawayChartDiagram({ data }: RunawayChartDiagramProps) {
  const width = 640;
  const height = 300;
  const padding = { top: 40, right: 90, bottom: 45, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxY = 6;
  const minY = 0;
  const runawayStart = 10;

  const scaleX = (t: number) => padding.left + (t / 30) * chartWidth;
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

  const runawayData = data.filter((d) => d.time >= runawayStart);
  const runawayZone = `
    M ${scaleX(runawayStart)} ${scaleY(runawayData[0].ceiling)}
    ${runawayData.map((d) => `L ${scaleX(d.time)} ${scaleY(d.ceiling)}`).join(" ")}
    L ${scaleX(30)} ${padding.top}
    L ${scaleX(runawayStart)} ${padding.top}
    Z
  `;

  const lastPoint = data[data.length - 1];

  return (
    <div>
      <svg
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="runawayZoneGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
          <pattern
            id="runawayStripes"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="#ef4444"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          </pattern>
        </defs>

        {[1, 2, 3, 4, 5].map((v) => (
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
              x={padding.left - 10}
              y={scaleY(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#525252"
              fontSize={10}
            >
              ${v.toFixed(0)}
            </text>
          </g>
        ))}

        <path d={runawayZone} fill="url(#runawayZoneGradient)" />
        <path d={runawayZone} fill="url(#runawayStripes)" />

        <rect
          x={scaleX(12)}
          y={padding.top + 5}
          width={140}
          height={36}
          rx={4}
          fill="#0a0a0a"
          fillOpacity={0.8}
        />
        <text
          x={scaleX(12) + 70}
          y={padding.top + 18}
          textAnchor="middle"
          fill="#ef4444"
          fontSize={10}
          fontWeight={600}
        >
          RUNAWAY ZONE
        </text>
        <text
          x={scaleX(12) + 70}
          y={padding.top + 32}
          textAnchor="middle"
          fill="#a3a3a3"
          fontSize={9}
        >
          Issuance halted, AMM only
        </text>

        <line
          x1={scaleX(runawayStart)}
          y1={padding.top}
          x2={scaleX(runawayStart)}
          y2={height - padding.bottom}
          stroke="#ef4444"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.5}
        />

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
          stroke={colors.rose}
          strokeWidth={2}
          strokeLinecap="round"
        />

        <g transform={`translate(${width - padding.right + 8}, ${scaleY(lastPoint.ceiling)})`}>
          <text fill={colors.amber} fontSize={10} dominantBaseline="middle">
            P_ceil
          </text>
        </g>
        <g transform={`translate(${width - padding.right + 8}, ${scaleY(lastPoint.floor) + 8})`}>
          <text fill={colors.emerald} fontSize={10} dominantBaseline="middle">
            P_floor
          </text>
        </g>
        <g transform={`translate(${width - padding.right + 8}, ${scaleY(lastPoint.market) - 8})`}>
          <text fill={colors.rose} fontSize={10} dominantBaseline="middle">
            P_AMM
          </text>
        </g>

        <text x={width / 2} y={height - 10} textAnchor="middle" fill="#525252" fontSize={11}>
          Time →
        </text>

        <text
          x={scaleX(5)}
          y={height - padding.bottom + 20}
          textAnchor="middle"
          fill="#737373"
          fontSize={9}
        >
          Healthy
        </text>
        <text
          x={scaleX(20)}
          y={height - padding.bottom + 20}
          textAnchor="middle"
          fill="#ef4444"
          fontSize={9}
        >
          Runaway
        </text>
      </svg>
    </div>
  );
}
