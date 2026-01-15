"use client";

import { useState } from "react";
import { BUDGET_CONFIG } from "./reaction-market/constants";
import { PortfolioSummary } from "./reaction-market/portfolio";
import { SocialPost } from "./reaction-market/social-post";

export function ReactionMarketDemo() {
  const [portfolio, setPortfolio] = useState(0);
  const [flash, setFlash] = useState({
    like: false,
    comment: false,
    follow: false,
  });
  const [counts, setCounts] = useState({ like: 12, comment: 3 });
  const [isFollowing, setIsFollowing] = useState(false);

  const handleReaction = (type: "like" | "comment" | "follow") => {
    const config = BUDGET_CONFIG[type];

    setFlash((prev) => ({ ...prev, [type]: true }));
    setPortfolio((prev) => prev + config.amount);

    if (type !== "follow") {
      setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }

    setTimeout(() => setFlash((prev) => ({ ...prev, [type]: false })), 200);
  };

  const handleFollow = () => {
    if (!isFollowing) {
      setIsFollowing(true);
      handleReaction("follow");
    }
  };

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-200">Reaction Markets</div>
        <div className="text-xs text-neutral-500">Your reactions become micro-purchases</div>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        <SocialPost
          flash={flash}
          counts={counts}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onReact={handleReaction}
        />
        <PortfolioSummary value={portfolio} />
      </div>

      <div className="mt-4 border-t border-neutral-800/50 pt-3 text-center text-xs text-neutral-500">
        Click the reactions to see your attention become capital
      </div>
    </div>
  );
}
