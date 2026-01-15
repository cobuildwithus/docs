import type { Builder, FlowConfig } from "./types";
import { BUILDER_ORBIT, CENTER_X, CENTER_Y, FLOW_ORBIT } from "./constants";

const toRad = (deg: number) => (deg * Math.PI) / 180;

export const getFlowPosition = (flow: FlowConfig) => {
  const rad = toRad(flow.angle);
  return {
    x: CENTER_X + Math.cos(rad) * FLOW_ORBIT,
    y: CENTER_Y + Math.sin(rad) * FLOW_ORBIT,
  };
};

export const getBuilderPosition = (flow: FlowConfig, builder: Builder) => {
  const flowPos = getFlowPosition(flow);
  const rad = toRad(flow.angle + builder.angle);
  return {
    x: flowPos.x + Math.cos(rad) * BUILDER_ORBIT,
    y: flowPos.y + Math.sin(rad) * BUILDER_ORBIT,
  };
};

export const smoothstep = (t: number) => t * t * (3 - 2 * t);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
