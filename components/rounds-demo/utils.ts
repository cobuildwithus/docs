import type { Post } from "./types";

export const calculateAllocations = (posts: Post[], budget: number) => {
  const reactionBudget = budget * 0.5;
  const duelBudget = budget * 0.5;

  const reactionScores = posts.map((p) => {
    const likeWeight = Math.sqrt(p.likes);
    const commentWeight = Math.sqrt(p.comments) * 1.5;
    return Math.pow(likeWeight + commentWeight + 0.5, 2);
  });
  const totalReaction = reactionScores.reduce((a, b) => a + b, 0);

  const duelScores = posts.map((p) => {
    const eloWeight = Math.max(0, (p.elo - 1400) / 100);
    return Math.pow(eloWeight + 0.5, 2);
  });
  const totalDuel = duelScores.reduce((a, b) => a + b, 0);

  return posts.map((p, i) => {
    const fromReactions =
      totalReaction > 0 ? (reactionScores[i] / totalReaction) * reactionBudget : 0;
    const fromDuels = totalDuel > 0 ? (duelScores[i] / totalDuel) * duelBudget : 0;
    const total = fromReactions + fromDuels;
    return {
      ...p,
      allocation: total,
      percent: (total / budget) * 100,
      fromReactions,
      fromDuels,
    };
  });
};
