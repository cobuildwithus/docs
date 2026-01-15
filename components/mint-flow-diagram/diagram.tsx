export function MintFlowDiagramSvg() {
  const width = 700;
  const height = 360;

  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="usdcGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="treasuryGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="tokenGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="splitGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
          </linearGradient>
          <marker
            id="arrowBlue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
          </marker>
          <marker
            id="arrowGreen"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
          </marker>
          <marker
            id="arrowOrange"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fb923c" />
          </marker>
          <marker
            id="arrowViolet"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
          </marker>
          <marker
            id="arrowRed"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
          </marker>
        </defs>

        <g transform="translate(50, 100)">
          <rect
            x="-40"
            y="-25"
            width="80"
            height="50"
            rx="8"
            fill="#1a1a1a"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <text x="0" y="-5" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">
            User pays
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="600">
            100 USDC
          </text>
        </g>

        <path
          d="M 115 100 Q 180 100 180 160"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          markerEnd="url(#arrowGreen)"
        />
        <text x="145" y="140" fill="#4ade80" fontSize="9" fontWeight="500">
          +100 USDC
        </text>

        <g transform="translate(180, 200)">
          <rect
            x="-50"
            y="-25"
            width="100"
            height="50"
            rx="8"
            fill="#1a1a1a"
            stroke="#22c55e"
            strokeWidth="1.5"
          />
          <text x="0" y="-5" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="500">
            Treasury
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#86efac" fontSize="11">
            Holds all funds
          </text>
        </g>

        <path
          d="M 115 100 Q 260 100 260 130"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          markerEnd="url(#arrowOrange)"
        />
        <text x="190" y="90" fill="#fb923c" fontSize="9" fontWeight="500">
          Mints tokens
        </text>

        <g transform="translate(260, 165)">
          <rect
            x="-50"
            y="-25"
            width="100"
            height="50"
            rx="8"
            fill="#1a1a1a"
            stroke="#f97316"
            strokeWidth="1.5"
          />
          <text x="0" y="-5" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="500">
            Mint
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#fdba74" fontSize="11">
            100 tokens
          </text>
        </g>

        <path
          d="M 315 165 Q 395 165 395 100"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          markerEnd="url(#arrowOrange)"
        />
        <text x="330" y="130" fill="#fb923c" fontSize="9" fontWeight="500">
          (1-σ)
        </text>

        <g transform="translate(460, 100)">
          <rect
            x="-50"
            y="-30"
            width="100"
            height="60"
            rx="8"
            fill="#1a1a1a"
            stroke="#f97316"
            strokeWidth="1.5"
          />
          <text x="0" y="-10" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="500">
            Buyer
          </text>
          <text x="0" y="5" textAnchor="middle" fill="#fdba74" fontSize="10">
            85 tokens
          </text>
          <text x="0" y="18" textAnchor="middle" fill="#737373" fontSize="9">
            (if 15% split)
          </text>
        </g>

        <path
          d="M 315 175 Q 395 175 395 240"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
          markerEnd="url(#arrowViolet)"
        />
        <text x="330" y="210" fill="#a78bfa" fontSize="9" fontWeight="500">
          σ
        </text>

        <g transform="translate(460, 270)">
          <rect
            x="-60"
            y="-30"
            width="120"
            height="60"
            rx="8"
            fill="#1a1a1a"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />
          <text x="0" y="-10" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="500">
            Split Recipients
          </text>
          <text x="0" y="5" textAnchor="middle" fill="#c4b5fd" fontSize="10">
            15 tokens
          </text>
          <text x="0" y="18" textAnchor="middle" fill="#737373" fontSize="9">
            Team, partners, etc.
          </text>
        </g>

        <g transform="translate(575, 175)">
          <rect
            x="-45"
            y="-55"
            width="90"
            height="110"
            rx="8"
            fill="#1a1a1a"
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <text x="0" y="-35" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="500">
            Auto-issuance
          </text>
          <text x="0" y="-20" textAnchor="middle" fill="#737373" fontSize="9">
            (if configured)
          </text>
          <line x1="-30" y1="-8" x2="30" y2="-8" stroke="#262626" />
          <text x="0" y="8" textAnchor="middle" fill="#fca5a5" fontSize="9">
            Mints tokens
          </text>
          <text x="0" y="22" textAnchor="middle" fill="#fca5a5" fontSize="9">
            directly to
          </text>
          <text x="0" y="36" textAnchor="middle" fill="#fca5a5" fontSize="9">
            recipients
          </text>
          <line x1="-30" y1="48" x2="30" y2="48" stroke="#262626" />
          <text x="0" y="68" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="500">
            ⚠ Dilutes floor
          </text>
        </g>
      </svg>
    </div>
  );
}
