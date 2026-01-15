import type { FlowConfig, Particle } from "./types";
import {
  BUILDER_ORBIT,
  CENTER_RADIUS,
  CENTER_X,
  CENTER_Y,
  FLOW_RADIUS,
  FLOW_ORBIT,
  SVG_HEIGHT,
  SVG_WIDTH,
} from "./constants";
import { FLOWS } from "./constants";
import { getBuilderPosition, getFlowPosition, lerp, smoothstep } from "./geometry";

type FlowsDiagramProps = {
  flows: FlowConfig[];
  particles: Particle[];
};

export function FlowsDiagram({ flows, particles }: FlowsDiagramProps) {
  return (
    <div className="relative flex justify-center">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          {flows.map((flow) => (
            <radialGradient key={flow.id} id={`flowGlow-${flow.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={flow.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={flow.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={FLOW_ORBIT}
          fill="none"
          stroke="#262626"
          strokeWidth={1}
          strokeDasharray="3 6"
          opacity={0.6}
        />

        {flows.map((flow) => {
          const pos = getFlowPosition(flow);
          return (
            <line
              key={flow.id}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={pos.x}
              y2={pos.y}
              stroke={flow.color}
              strokeWidth={1}
              strokeDasharray="2 4"
              opacity={0.25}
            />
          );
        })}

        <circle cx={CENTER_X} cy={CENTER_Y} r={70} fill="url(#centerGlow)" />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CENTER_RADIUS}
          fill="#0a0a0a"
          stroke="#10b981"
          strokeWidth={2}
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CENTER_RADIUS - 4}
          fill="none"
          stroke="#10b981"
          strokeWidth={1}
          opacity={0.3}
        />
        <text
          x={CENTER_X}
          y={CENTER_Y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#10b981"
          fontSize={14}
          fontWeight={600}
          fontFamily="monospace"
        >
          $NETWORK
        </text>

        {flows.map((flow) => {
          const pos = getFlowPosition(flow);
          return (
            <g key={flow.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={BUILDER_ORBIT}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth={1}
                opacity={0.5}
              />
              <circle cx={pos.x} cy={pos.y} r={40} fill={`url(#flowGlow-${flow.id})`} />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={FLOW_RADIUS}
                fill="#0a0a0a"
                stroke={flow.color}
                strokeWidth={1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={flow.accentColor}
                fontSize={9}
                fontWeight={500}
              >
                {flow.name}
              </text>

              {flow.builders.map((builder) => {
                const bPos = getBuilderPosition(flow, builder);
                return (
                  <g key={builder.id}>
                    <circle
                      cx={bPos.x}
                      cy={bPos.y}
                      r={12}
                      fill={`${flow.color}15`}
                      stroke={`${flow.color}60`}
                      strokeWidth={1}
                    />
                    <text
                      x={bPos.x}
                      y={bPos.y + 0.5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={flow.accentColor}
                      fontSize={7}
                      opacity={0.8}
                    >
                      {builder.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {particles.map((p) => {
          const flow = FLOWS[p.flowIndex];
          const flowPos = getFlowPosition(flow);
          const builder = flow.builders[p.builderIndex];
          const builderPos = getBuilderPosition(flow, builder);

          const t = smoothstep(p.progress);
          const [x, y] =
            p.phase === "toFlow"
              ? [lerp(CENTER_X, flowPos.x, t), lerp(CENTER_Y, flowPos.y, t)]
              : [lerp(flowPos.x, builderPos.x, t), lerp(flowPos.y, builderPos.y, t)];

          const fadeIn = Math.min(1, p.progress * 5);
          const fadeOut = p.progress > 0.8 ? (1 - p.progress) * 5 : 1;
          const color = p.phase === "toFlow" ? "#10b981" : flow.color;

          return (
            <circle
              key={p.id}
              cx={x}
              cy={y}
              r={5}
              fill={`${color}60`}
              stroke={color}
              strokeWidth={1}
              opacity={fadeIn * fadeOut}
            />
          );
        })}
      </svg>
    </div>
  );
}
