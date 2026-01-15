"use client";

import { useRef, useState } from "react";
import { DUEL_REASONS, INITIAL_POSTS, NEW_POST_OPTIONS } from "./rounds-demo/data";
import { DuelStack, PostCard, SubmitButton } from "./rounds-demo/components";
import { calculateAllocations } from "./rounds-demo/utils";
import type { Duel, Post } from "./rounds-demo/types";

export function RoundsDemo() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [duels, setDuels] = useState<Duel[]>([]);
  const [activeDuelIndex, setActiveDuelIndex] = useState(0);
  const [flashingPost, setFlashingPost] = useState<string | null>(null);
  const [flashingComment, setFlashingComment] = useState<string | null>(null);
  const newPostIndex = useRef(0);

  const budget = 500;
  const allocations = calculateAllocations(posts, budget);

  const handleLike = (postId: string) => {
    setFlashingPost(postId);
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    setTimeout(() => setFlashingPost(null), 200);
  };

  const handleComment = (postId: string) => {
    setFlashingComment(postId);
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p)));
    setTimeout(() => setFlashingComment(null), 200);
  };

  const handleAddPost = () => {
    if (newPostIndex.current >= NEW_POST_OPTIONS.length) return;

    const newPostData = NEW_POST_OPTIONS[newPostIndex.current];
    const newPost: Post = {
      ...newPostData,
      id: String(posts.length + 1),
      likes: 0,
      comments: 0,
      elo: 1500,
    };

    const opponent = posts[Math.floor(Math.random() * posts.length)];
    const newPostWins = Math.random() > 0.5;
    const eloChange = 15 + Math.floor(Math.random() * 10);

    const updatedNewPost = {
      ...newPost,
      elo: newPostWins ? 1500 + eloChange : 1500 - eloChange,
    };

    setPosts((prev) => [
      ...prev.map((p) =>
        p.id === opponent.id
          ? { ...p, elo: newPostWins ? p.elo - eloChange : p.elo + eloChange }
          : p
      ),
      updatedNewPost,
    ]);

    const duel: Duel = {
      id: String(duels.length + 1),
      postA: newPost,
      postB: opponent,
      winner: newPostWins ? "A" : "B",
      reasoning: DUEL_REASONS[Math.floor(Math.random() * DUEL_REASONS.length)],
    };

    setDuels((prev) => [...prev, duel]);
    setActiveDuelIndex(duels.length);
    newPostIndex.current++;
  };

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">
            Share an idea for how to improve @cobuild
          </div>
        </div>
        <div className="text-lg font-semibold tabular-nums text-emerald-400">${budget}</div>
      </div>

      <div className="mb-3 flex items-center gap-4 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
          <span className="text-neutral-500">Reaction markets</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
          <span className="text-neutral-500">Duels</span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        {allocations.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            allocation={post.allocation}
            fromReactions={post.fromReactions}
            fromDuels={post.fromDuels}
            onLike={() => handleLike(post.id)}
            onComment={() => handleComment(post.id)}
            flash={flashingPost === post.id}
            commentFlash={flashingComment === post.id}
          />
        ))}
      </div>

      <div className="mb-4 flex justify-center">
        <SubmitButton
          isComplete={newPostIndex.current >= NEW_POST_OPTIONS.length}
          onClick={handleAddPost}
        />
      </div>

      <DuelStack duels={duels} activeDuelIndex={activeDuelIndex} onNavigate={setActiveDuelIndex} />

      <div className="mt-4 border-t border-neutral-800/50 pt-3 text-center text-xs text-neutral-500">
        Engage to shift allocation • Add posts to trigger duels
      </div>
    </div>
  );
}
