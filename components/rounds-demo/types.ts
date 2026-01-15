export type Post = {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  comments: number;
  elo: number;
};

export type Duel = {
  id: string;
  postA: Post;
  postB: Post;
  winner: "A" | "B";
  reasoning: string;
};
