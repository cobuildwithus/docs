import {
  CENTER_X,
  SOURCE_HEIGHT,
  SOURCE_WIDTH,
  SOURCES_Y,
  TREASURY_SIZE,
  TREASURY_Y,
  REVENUE_SOURCES,
} from "./constants";
import { CurvedPath } from "./curved-path";
import { SourceIcon } from "./icons";
import { getSourceX } from "./utils";

export function DiagramSources() {
  return (
    <>
      {REVENUE_SOURCES.map((source, i) => {
        const x = getSourceX(i);
        return (
          <g key={source.id}>
            <rect
              x={x - SOURCE_WIDTH / 2}
              y={SOURCES_Y - SOURCE_HEIGHT / 2}
              width={SOURCE_WIDTH}
              height={SOURCE_HEIGHT}
              rx={10}
              fill="#0d0d0d"
              stroke="#262626"
              strokeWidth={1}
              className="source-box"
            />
            <g className="source-icon">
              <SourceIcon type={i} x={x} y={SOURCES_Y - 16} />
            </g>
            <text
              x={x}
              y={SOURCES_Y + 12}
              textAnchor="middle"
              fill="#e5e5e5"
              fontSize={11}
              fontWeight={500}
              className="source-title"
            >
              {source.name}
            </text>
            <text
              x={x}
              y={SOURCES_Y + 26}
              textAnchor="middle"
              fill="#737373"
              fontSize={9}
              className="source-desc"
            >
              {source.description}
            </text>
          </g>
        );
      })}

      {REVENUE_SOURCES.map((source, i) => (
        <CurvedPath
          key={`path-source-${source.id}`}
          x1={getSourceX(i)}
          y1={SOURCES_Y + SOURCE_HEIGHT / 2}
          x2={CENTER_X}
          y2={TREASURY_Y - TREASURY_SIZE / 2}
        />
      ))}
    </>
  );
}
