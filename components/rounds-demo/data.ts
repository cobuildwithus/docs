import type { Post } from "./types";

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    author: "punk4156",
    handle: "@punk4156",
    content: "Weekly meta-round where the community votes on next week's round topics",
    likes: 12,
    comments: 4,
    elo: 1620,
  },
  {
    id: "2",
    author: "vitalik",
    handle: "@vitalik",
    content: "Weight duels by staked reputation of voters, not just token count",
    likes: 6,
    comments: 2,
    elo: 1450,
  },
];

export const NEW_POST_OPTIONS: Omit<Post, "id" | "likes" | "comments" | "elo">[] = [
  {
    author: "noun40",
    handle: "@noun40",
    content: "Auto-generate rounds from trending Farcaster threads",
  },
  {
    author: "jesse",
    handle: "@jesse",
    content: "Let round winners propose the next round's requirements",
  },
];

export const DUEL_REASONS = [
  "Clearer path to shipping something usable",
  "Unlocks more follow-on ideas from the community",
  "Directly improves the core funding loop",
  "Lower coordination overhead to implement",
  "Stronger signal this is what builders actually want",
];
