import { CommentIcon, FollowIcon, HeartIcon } from "./icons";

type SocialPostProps = {
  flash: { like: boolean; comment: boolean; follow: boolean };
  counts: { like: number; comment: number };
  isFollowing: boolean;
  onFollow: () => void;
  onReact: (type: "like" | "comment" | "follow") => void;
};

export function SocialPost({ flash, counts, isFollowing, onFollow, onReact }: SocialPostProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="relative">
          <img src="/rocketman.png" alt="rocketman" className="size-10 rounded-full object-cover" />
          <button
            onClick={onFollow}
            className={`absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full transition-all duration-200 ${
              isFollowing
                ? "bg-violet-500 text-white"
                : flash.follow
                  ? "scale-110 bg-violet-500 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:bg-violet-500 hover:text-white"
            }`}
          >
            {isFollowing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <FollowIcon small />
            )}
          </button>
        </div>
        <div>
          <div className="text-sm font-medium text-white">rocketman</div>
          <div className="text-xs text-neutral-500">@rocketman · 2h</div>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-neutral-200">
        Just finished our second Cobuild meetup in San Francisco
        <br />
        <br />
        So many great people and conversations.
      </p>

      <div className="flex items-center gap-6 border-t border-neutral-800 pt-3">
        <button
          onClick={() => onReact("like")}
          className={`flex items-center gap-2 text-sm transition-all duration-200 ${
            flash.like ? "text-rose-500" : "text-neutral-500 hover:text-rose-500"
          }`}
        >
          <span
            className={`transition-all duration-200 ${
              flash.like ? "drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" : ""
            }`}
          >
            <HeartIcon filled={flash.like} />
          </span>
          <span className="font-medium tabular-nums">{counts.like}</span>
        </button>

        <button
          onClick={() => onReact("comment")}
          className={`flex items-center gap-2 text-sm transition-all duration-200 ${
            flash.comment ? "text-sky-400" : "text-neutral-500 hover:text-sky-500"
          }`}
        >
          <span
            className={`transition-all duration-200 ${
              flash.comment ? "drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" : ""
            }`}
          >
            <CommentIcon />
          </span>
          <span className="font-medium tabular-nums">{counts.comment}</span>
        </button>
      </div>
    </div>
  );
}
