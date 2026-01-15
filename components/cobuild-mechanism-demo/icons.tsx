interface IconProps {
  x: number;
  y: number;
}

function MintIcon({ x, y }: IconProps) {
  return (
    <g transform={`translate(${x - 10}, ${y - 10})`}>
      <circle cx={10} cy={10} r={9} fill="#10b98120" stroke="#10b981" strokeWidth={1} />
      <text x={10} y={14} textAnchor="middle" fill="#10b981" fontSize={12} fontWeight={600}>
        $
      </text>
    </g>
  );
}

function SplitsIcon({ x, y }: IconProps) {
  return (
    <g transform={`translate(${x - 10}, ${y - 10})`}>
      <circle cx={10} cy={10} r={9} fill="#10b98120" stroke="#10b981" strokeWidth={1} />
      <path
        d="M6 13L10 9M10 9L14 13M10 9V7M6 7L10 11M10 11L14 7M10 11V13"
        stroke="#10b981"
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function DonationsIcon({ x, y }: IconProps) {
  return (
    <g transform={`translate(${x - 10}, ${y - 10})`}>
      <circle cx={10} cy={10} r={9} fill="#10b98120" stroke="#10b981" strokeWidth={1} />
      <rect
        x={6}
        y={8}
        width={8}
        height={6}
        rx={1}
        fill="none"
        stroke="#10b981"
        strokeWidth={1.2}
      />
      <path d="M8 8V6.5A2 2 0 0112 6.5V8" fill="none" stroke="#10b981" strokeWidth={1.2} />
    </g>
  );
}

function FeesIcon({ x, y }: IconProps) {
  return (
    <g transform={`translate(${x - 10}, ${y - 10})`}>
      <circle cx={10} cy={10} r={9} fill="#10b98120" stroke="#10b981" strokeWidth={1} />
      <rect
        x={5}
        y={7}
        width={10}
        height={7}
        rx={1}
        fill="none"
        stroke="#10b981"
        strokeWidth={1.2}
      />
      <circle cx={10} cy={10.5} r={1.5} fill="none" stroke="#10b981" strokeWidth={1} />
    </g>
  );
}

export function SourceIcon({ type, x, y }: { type: number; x: number; y: number }) {
  switch (type) {
    case 0:
      return <MintIcon x={x} y={y} />;
    case 1:
      return <SplitsIcon x={x} y={y} />;
    case 2:
      return <DonationsIcon x={x} y={y} />;
    case 3:
      return <FeesIcon x={x} y={y} />;
    default:
      return null;
  }
}

export function TreasuryIcon({ x, y }: IconProps) {
  return (
    <g transform={`translate(${x - 10}, ${y - 7})`}>
      <rect width={20} height={14} rx={2} fill="#10b981" />
      <rect x={3} y={3} width={5} height={8} rx={1} fill="#0a0a0a" />
      <rect x={12} y={3} width={5} height={8} rx={1} fill="#0a0a0a" />
    </g>
  );
}
