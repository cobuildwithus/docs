import { Button } from "../ui/button";
import { CommentIcon, HeartIcon } from "./icons";
import type { Duel, Post } from "./types";

type PostCardProps = {
  post: Post;
  allocation: number;
  fromReactions: number;
  fromDuels: number;
  onLike: () => void;
  onComment: () => void;
  flash: boolean;
  commentFlash: boolean;
};

export function PostCard({
  post,
  allocation,
  fromReactions,
  fromDuels,
  onLike,
  onComment,
  flash,
  commentFlash,
}: PostCardProps) {
  const total = fromReactions + fromDuels;
  const reactionWidth = total > 0 ? (fromReactions / total) * 100 : 0;
  const duelWidth = total > 0 ? (fromDuels / total) * 100 : 0;

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-neutral-400">{post.handle}</span>
        <span className="text-sm font-semibold tabular-nums text-emerald-400">
          ${allocation.toFixed(0)}
        </span>
      </div>
      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-neutral-300">{post.content}</p>
      <div className="mb-3 flex items-center gap-4">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 text-xs transition-all duration-200 ${
            flash ? "scale-105 text-rose-500" : "text-neutral-500 hover:text-rose-500"
          }`}
        >
          <HeartIcon filled={flash} />
          <span className="tabular-nums">{post.likes}</span>
        </button>
        <button
          onClick={onComment}
          className={`flex items-center gap-1.5 text-xs transition-all duration-200 ${
            commentFlash ? "scale-105 text-sky-400" : "text-neutral-500 hover:text-sky-400"
          }`}
        >
          <CommentIcon />
          <span className="tabular-nums">{post.comments}</span>
        </button>
      </div>
      <div className="flex overflow-hidden rounded-full bg-neutral-800" style={{ height: 8 }}>
        {reactionWidth >= 1 && (
          <div
            className="transition-all duration-500 ease-out"
            style={{
              width: `${reactionWidth}%`,
              backgroundColor: "#10b981",
              height: 8,
              borderTopLeftRadius: 9999,
              borderBottomLeftRadius: 9999,
            }}
          />
        )}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            width: `${duelWidth}%`,
            borderTopLeftRadius: reactionWidth < 1 ? 9999 : 0,
            borderBottomLeftRadius: reactionWidth < 1 ? 9999 : 0,
            backgroundColor: "#f59e0b",
            height: 8,
          }}
        />
      </div>
    </div>
  );
}

type DuelCardProps = {
  duel: Duel;
  isActive: boolean;
};

export function DuelCard({ duel, isActive }: DuelCardProps) {
  const winnerPost = duel.winner === "A" ? duel.postA : duel.postB;
  const loserPost = duel.winner === "A" ? duel.postB : duel.postA;

  return (
    <div
      className={`rounded-lg border bg-neutral-900/80 p-3 transition-all duration-300 ${
        isActive ? "border-amber-500/50 shadow-lg shadow-amber-500/5" : "border-neutral-800"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-amber-500/80">
          Duel #{duel.id}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span>
            <span className="truncate text-neutral-300">{winnerPost.handle}</span>
          </div>
          <p className="truncate text-[10px] text-neutral-500">{winnerPost.content}</p>
        </div>
        <div className="px-2 text-lg text-neutral-700">vs</div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="text-neutral-600">✗</span>
            <span className="truncate text-neutral-500">{loserPost.handle}</span>
          </div>
          <p className="truncate text-[10px] text-neutral-600">{loserPost.content}</p>
        </div>
      </div>
      <div className="mt-2 border-t border-neutral-800/50 pt-2 text-[10px] italic text-neutral-500">
        "{duel.reasoning}"
      </div>
    </div>
  );
}

type DuelStackProps = {
  duels: Duel[];
  activeDuelIndex: number;
  onNavigate: (idx: number) => void;
};

export function DuelStack({ duels, activeDuelIndex, onNavigate }: DuelStackProps) {
  if (duels.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-800 p-4 text-center">
        <div className="text-xs text-neutral-600">No duels yet</div>
        <div className="mt-1 text-[10px] text-neutral-700">Add a post to trigger an LLM duel</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-neutral-400">Duel History</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(Math.max(0, activeDuelIndex - 1))}
            disabled={activeDuelIndex === 0}
            className="text-[10px] text-neutral-500 hover:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>
          <span className="text-[10px] tabular-nums text-neutral-600">
            {activeDuelIndex + 1}/{duels.length}
          </span>
          <button
            onClick={() => onNavigate(Math.min(duels.length - 1, activeDuelIndex + 1))}
            disabled={activeDuelIndex === duels.length - 1}
            className="text-[10px] text-neutral-500 hover:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
      <DuelCard duel={duels[activeDuelIndex]} isActive={true} />
    </div>
  );
}

export function SubmitButton({
  isComplete,
  onClick,
}: {
  isComplete: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-lg"
      onClick={onClick}
      disabled={isComplete}
    >
      {isComplete ? "All submissions added" : "Submit idea"}
    </Button>
  );
}
