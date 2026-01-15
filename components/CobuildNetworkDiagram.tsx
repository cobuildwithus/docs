"use client";

export function CobuildNetworkDiagram() {
  const width = 840;
  const height = 620;
  const centerX = width / 2;
  const centerY = height / 2;

  // Network positions horizontally aligned (centered)
  const networkXOffsets = [0, 130, 260];
  const networkStartX = centerX + 26;

  return (
    <div className="my-6 w-full rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5">
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="mx-auto max-w-3xl">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#525252" />
          </marker>
          <marker
            id="arrowDown"
            viewBox="0 0 10 10"
            refX="5"
            refY="10"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 5 10 L 10 0 z" fill="#a3a3a3" />
          </marker>
          <marker
            id="arrowUp"
            viewBox="0 0 10 10"
            refX="5"
            refY="10"
            markerWidth="10"
            markerHeight="10"
            orient="0"
          >
            <path d="M 0 10 L 5 0 L 10 10 z" fill="#525252" />
          </marker>
          <linearGradient id="cobuildGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="netGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3d2a" stopOpacity="1" />
            <stop offset="100%" stopColor="#0f2418" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Top arcs only - bottom arcs rendered after network boxes */}
        {networkXOffsets.map((offset, i) => {
          const cobuildX = centerX - 238;
          const netX = networkStartX + offset;
          const rx = (netX - cobuildX) / 2;
          const ry = rx * 1.1;
          const isLargest = i === networkXOffsets.length - 1;
          return (
            <path
              key={`top-${i}`}
              d={`M ${cobuildX} ${centerY} A ${rx} ${ry} 0 0 1 ${netX} ${centerY}`}
              fill="none"
              stroke="#525252"
              strokeWidth={isLargest ? 1.5 : 1}
              strokeDasharray={isLargest ? undefined : "4 6"}
              opacity={0.6}
            />
          );
        })}

        {/* $COBUILD - Main token (left) */}
        <g transform={`translate(${centerX - 238}, ${centerY})`}>
          <circle cx="0" cy="0" r="101" fill="url(#cobuildGlow)" />
          <circle cx="0" cy="0" r="79" fill="#0a0a0a" stroke="#d946ef" strokeWidth="3" />
          <circle cx="0" cy="0" r="72" fill="none" stroke="#d946ef" strokeWidth="1" opacity="0.3" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#d946ef"
            fontSize="20"
            fontWeight="600"
            fontFamily="monospace"
          >
            $COBUILD
          </text>
        </g>

        {/* Culture label at top of outer ellipse */}
        {(() => {
          const cobuildX = centerX - 238;
          const netX = networkStartX + networkXOffsets[networkXOffsets.length - 1];
          const ellipseCenterX = (cobuildX + netX) / 2;
          const ry = ((netX - cobuildX) / 2) * 1.1;
          return (
            <text
              x={ellipseCenterX}
              y={centerY - ry - 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#d946ef"
              fontSize="18"
              fontWeight="500"
              fontStyle="italic"
            >
              Culture
            </text>
          );
        })()}

        {/* Label above $COBUILD */}
        <text x={centerX - 238} y={centerY - 130} textAnchor="middle" fill="#a3a3a3" fontSize="16">
          Represents all networks
        </text>
        <text x={centerX - 238} y={centerY - 111} textAnchor="middle" fill="#a3a3a3" fontSize="16">
          as one token
        </text>

        {/* Label below $COBUILD */}
        <text x={centerX - 238} y={centerY + 128} textAnchor="middle" fill="#a3a3a3" fontSize="16">
          Networks paired
        </text>
        <text x={centerX - 238} y={centerY + 147} textAnchor="middle" fill="#a3a3a3" fontSize="16">
          in $COBUILD
        </text>

        {/* Network tokens (right side, horizontally aligned) */}
        {networkXOffsets.map((offset, i) => (
          <g key={i} transform={`translate(${networkStartX + offset}, ${centerY})`}>
            <rect
              x="-58"
              y="-50"
              width="116"
              height="100"
              rx="14"
              fill="url(#netGradient)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill="#22c55e"
              fontSize="17"
              fontWeight="600"
              fontFamily="monospace"
            >
              $NETWORK
            </text>
          </g>
        ))}

        {/* Bottom arcs ending below network boxes */}
        {networkXOffsets.map((offset, i) => {
          const cobuildX = centerX - 238;
          const netX = networkStartX + offset;
          const rx = (netX - cobuildX) / 2;
          const ry = rx * 1.1;
          const isLargest = i === networkXOffsets.length - 1;
          const ellipseCenterX = (cobuildX + netX) / 2;
          const boxBottom = centerY + 75;
          const endTheta = Math.asin(Math.min((boxBottom - centerY) / ry, 1));
          const endX = ellipseCenterX + rx * Math.cos(endTheta);
          const endY = centerY + ry * Math.sin(endTheta);
          return (
            <path
              key={`bottom-${i}`}
              d={`M ${cobuildX} ${centerY} A ${rx} ${ry} 0 0 0 ${endX} ${endY}`}
              fill="none"
              stroke="#525252"
              strokeWidth={isLargest ? 1.5 : 1}
              strokeDasharray={isLargest ? undefined : "4 6"}
              opacity={0.6}
              markerEnd="url(#arrowUp)"
            />
          );
        })}

        {/* $COBUILD circle rendered last to cover arc overlaps */}
        <g transform={`translate(${centerX - 238}, ${centerY})`}>
          <circle cx="0" cy="0" r="101" fill="url(#cobuildGlow)" />
          <circle cx="0" cy="0" r="79" fill="#0a0a0a" stroke="#d946ef" strokeWidth="3" />
          <circle cx="0" cy="0" r="72" fill="none" stroke="#d946ef" strokeWidth="1" opacity="0.3" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#d946ef"
            fontSize="20"
            fontWeight="600"
            fontFamily="monospace"
          >
            $COBUILD
          </text>
        </g>

        {/* Capital label at bottom - rendered last for highest z-index */}
        {(() => {
          const cobuildX = centerX - 238;
          const netX = networkStartX + networkXOffsets[networkXOffsets.length - 1];
          const ellipseCenterX = (cobuildX + netX) / 2;
          const ry = ((netX - cobuildX) / 2) * 1.1;
          return (
            <text
              x={ellipseCenterX}
              y={centerY + ry + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#d946ef"
              fontSize="18"
              fontWeight="500"
              fontStyle="italic"
            >
              Capital
            </text>
          );
        })()}
      </svg>
    </div>
  );
}
