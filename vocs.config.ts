import { defineConfig } from "vocs";

export default defineConfig({
  rootDir: ".",
  theme: {
    colorScheme: "system",
  },
  title: "Cobuild Docs",
  description: "A new kind of organization is necessary for the intelligence age.",
  logoUrl: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  iconUrl: "/favicon.ico",
  vite: {
    plugins: [
      {
        name: "logo-link-fix",
        transformIndexHtml: (html: string) =>
          html
            .replace(
              "</head>",
              `<link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin="anonymous" />\n</head>`
            )
            .replace(
              "</body>",
              `<script>
              (function(){
                var target = location.port === '5173' ? 'http://localhost:3000' : 'https://co.build';
                document.addEventListener('click', function(e) {
                  var el = e.target;
                  while (el && el.tagName !== 'A') el = el.parentElement;
                  if (el && el.querySelector && el.querySelector('img[alt="Logo"]')) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = target;
                  }
                }, true);
                setInterval(function() {
                  document.querySelectorAll('img[alt="Logo"]').forEach(function(img) {
                    var a = img.closest('a');
                    if (a) a.href = target;
                  });
                }, 100);
              })();
            </script></body>`
            ),
      },
    ],
  },
  aiCta: true,
  socials: [
    {
      icon: "x",
      link: "https://x.com/justcobuild",
    },
    {
      icon: "farcaster",
      link: "https://farcaster.xyz/cobuild",
    },
    {
      icon: "discord",
      link: "https://discord.com/invite/PwWFgTck7f",
    },
    {
      icon: "github",
      link: "https://github.com/cobuildwithus",
    },
  ],
  sidebar: [
    {
      text: "Introduction",
      items: [
        { text: "Manifesto", link: "/" },
        { text: "Why Cobuild", link: "/introduction" },
        { text: "Our Mission", link: "/our-mission" },
        { text: "Vision", link: "/vision" },
        { text: "Bill of Rights", link: "/bill-of-rights" },
      ],
    },
    {
      text: "Quickstart",
      items: [
        { text: "What is Cobuild", link: "/quickstart/what-is-cobuild" },
        { text: "$COBUILD Launchpad", link: "/quickstart/cobuild-token" },
        { text: "Getting Started", link: "/quickstart/getting-started" },
      ],
    },
    {
      text: "Capital Allocation",
      items: [
        { text: "Our Perspective", link: "/allocation/our-perspective" },
        { text: "Allocation Stack", link: "/allocation/stack" },
        { text: "Reaction Markets", link: "/allocation/reaction-markets" },
        { text: "Rounds", link: "/allocation/rounds" },
        { text: "Flows", link: "/allocation/flows" },
      ],
    },
    {
      text: "Cobuild Tokens",
      items: [
        { text: "Why Crypto", link: "/fundraising/why-crypto" },
        { text: "Issues Today", link: "/fundraising/issues-today" },
        { text: "Staged Issuance", link: "/fundraising/staged-issuance" },
        { text: "Cash-out Floor", link: "/fundraising/cash-out-floor" },
        { text: "Revenue Networks", link: "/fundraising/revenue-networks" },
        { text: "Working Capital", link: "/fundraising/working-capital" },
        { text: "Zero Governance", link: "/fundraising/zero-governance" },
      ],
    },
    {
      text: "Token Economics",
      collapsed: true,
      items: [
        { text: "Overview", link: "/economics/overview" },
        { text: "Designing a Cobuild", link: "/economics/designing" },
        { text: "Issuance Curve", link: "/economics/issuance-curve" },
        { text: "Issuance & Redemption", link: "/economics/tokens-exits" },
        { text: "Holder Behavior", link: "/economics/holder-behavior" },
        { text: "Builder Payouts", link: "/economics/builders" },
        { text: "Loans", link: "/economics/loans" },
        { text: "Failure Modes", link: "/economics/failure-modes" },
      ],
    },
    {
      text: "Open Infra",
      collapsed: true,
      items: [
        { text: "Introduction", link: "/self-hosted" },
        { text: "Chat API", link: "/self-hosted/chat-api" },
        { text: "Docs", link: "/self-hosted/docs" },
      ],
    },
  ],
});
