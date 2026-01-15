import { Button } from "../ui/button";
import type { Builder, Challenge } from "./types";

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function StreamingAmount({ amount }: { amount: number }) {
  return (
    <span className="text-xs tabular-nums text-emerald-400">${amount.toLocaleString()}/mo</span>
  );
}

export function BuilderCard({
  builder,
  onChallenge,
  isChallenged,
}: {
  builder: Builder;
  onChallenge: () => void;
  isChallenged: boolean;
}) {
  const isRemoved = builder.status === "removed";

  return (
    <div
      className={`rounded-lg border p-3 transition-all duration-300 ${
        isRemoved
          ? "border-red-900/50 bg-red-950/20 opacity-60"
          : isChallenged
            ? "border-amber-500/50 bg-amber-950/20"
            : "border-neutral-800 bg-neutral-900/50"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className={`flex size-8 items-center justify-center rounded-full text-xs font-medium ${
              isRemoved ? "bg-red-900/30 text-red-400" : "bg-neutral-800 text-neutral-300"
            }`}
          >
            {builder.name[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-neutral-200">{builder.name}</div>
          </div>
        </div>
        {!isRemoved && !isChallenged && (
          <button
            onClick={onChallenge}
            className="shrink-0 rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] text-neutral-400 transition-colors hover:bg-amber-900/50 hover:text-amber-400"
          >
            Challenge
          </button>
        )}
        {isChallenged && (
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-amber-900/50 px-2 py-0.5 text-[10px] text-amber-400">
            <AlertIcon />
            Challenged
          </span>
        )}
        {isRemoved && (
          <span className="shrink-0 rounded-md bg-red-900/50 px-2 py-0.5 text-[10px] text-red-400">
            Removed
          </span>
        )}
      </div>
      <p className="mb-2 line-clamp-2 text-xs text-neutral-400">{builder.pitch}</p>
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1 text-neutral-500">
          <ShieldIcon />
          <span className="tabular-nums">{builder.stake} tokens staked</span>
        </div>
        {!isRemoved && <StreamingAmount amount={builder.monthlyStream} />}
      </div>
    </div>
  );
}

export function ChallengePanel({
  challenge,
  onVote,
  onResolve,
}: {
  challenge: Challenge;
  onVote: (vote: "for" | "against") => void;
  onResolve: () => void;
}) {
  const totalVotes = challenge.votes.for + challenge.votes.against;
  const forPercent = totalVotes > 0 ? (challenge.votes.for / totalVotes) * 100 : 50;

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertIcon />
        <span className="text-sm font-medium text-amber-400">Active Challenge</span>
      </div>

      <div className="mb-3">
        <div className="text-xs italic text-neutral-300">"{challenge.reason}"</div>
      </div>

      <div className="mb-3">
        <div className="mb-1 text-xs text-neutral-400">Challenger stake:</div>
        <div className="text-xs tabular-nums text-amber-400">
          {challenge.challengerStake} tokens
        </div>
      </div>

      {challenge.status === "voting" && (
        <>
          <div className="mb-3">
            <div className="mb-2 text-xs text-neutral-400">Token holder vote:</div>
            <div className="mb-2 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVote("for")}
                className="h-8 flex-1 border-red-800/50 text-xs hover:bg-red-900/30 hover:text-red-400"
              >
                Remove ({challenge.votes.for})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVote("against")}
                className="h-8 flex-1 border-emerald-800/50 text-xs hover:bg-emerald-900/30 hover:text-emerald-400"
              >
                Keep ({challenge.votes.against})
              </Button>
            </div>

            <div className="flex h-2 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${forPercent}%` }}
              />
              <div
                className="bg-emerald-500 transition-all duration-300"
                style={{ width: `${100 - forPercent}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px]">
              <span className="tabular-nums text-red-400">{forPercent.toFixed(0)}%</span>
              <span className="tabular-nums text-emerald-400">
                {(100 - forPercent).toFixed(0)}%
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onResolve}
            className="w-full text-xs"
            disabled={totalVotes < 3}
          >
            {totalVotes < 3
              ? `Need ${3 - totalVotes} more vote${3 - totalVotes > 1 ? "s" : ""}`
              : "Resolve Challenge"}
          </Button>
        </>
      )}

      {challenge.status === "resolved" && (
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
          {challenge.result === "removed" ? (
            <>
              <XIcon />
              Builder removed
            </>
          ) : (
            <>
              <CheckIcon />
              Builder defended
            </>
          )}
        </div>
      )}
    </div>
  );
}
