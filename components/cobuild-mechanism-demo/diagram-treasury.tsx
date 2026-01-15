import { CENTER_X, TREASURY_SIZE, TREASURY_Y } from "./constants";
import { TreasuryIcon } from "./icons";
import { formatUsd } from "./utils";

type DiagramTreasuryProps = {
  treasury: number;
};

export function DiagramTreasury({ treasury }: DiagramTreasuryProps) {
  return (
    <>
      <circle cx={CENTER_X} cy={TREASURY_Y} r={TREASURY_SIZE + 30} fill="url(#treasuryGlow)" />
      <rect
        x={CENTER_X - TREASURY_SIZE}
        y={TREASURY_Y - TREASURY_SIZE / 2}
        width={TREASURY_SIZE * 2}
        height={TREASURY_SIZE}
        rx={14}
        fill="#0a0a0a"
        stroke="#34d399"
        strokeWidth={1.5}
        opacity={0.7}
      />
      <TreasuryIcon x={CENTER_X} y={TREASURY_Y - 21} />
      <text
        x={CENTER_X}
        y={TREASURY_Y + 4}
        textAnchor="middle"
        fill="#e5e5e5"
        fontSize={12}
        fontWeight={600}
      >
        Network Treasury
      </text>
      <text
        x={CENTER_X}
        y={TREASURY_Y + 24}
        textAnchor="middle"
        fill="#10b981"
        fontSize={14}
        fontWeight={600}
        fontFamily="monospace"
      >
        {formatUsd(treasury)}
      </text>
    </>
  );
}
