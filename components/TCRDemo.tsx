"use client";

import { useState } from "react";
import { INITIAL_BUILDERS, CHALLENGE_REASONS } from "./tcr-demo/data";
import type { Builder, Challenge } from "./tcr-demo/types";
import { BuilderCard, ChallengePanel, ShieldIcon } from "./tcr-demo/components";

export function TCRDemo() {
  const [builders, setBuilders] = useState<Builder[]>(INITIAL_BUILDERS);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  const handleChallenge = (builderId: string) => {
    const reason = CHALLENGE_REASONS[Math.floor(Math.random() * CHALLENGE_REASONS.length)];
    setChallenge({
      id: "1",
      builderId,
      challengerStake: 100,
      reason,
      votes: { for: 0, against: 0 },
      status: "voting",
    });
  };

  const handleVote = (vote: "for" | "against") => {
    if (!challenge) return;
    setChallenge({
      ...challenge,
      votes: {
        ...challenge.votes,
        [vote]: challenge.votes[vote] + 1,
      },
    });
  };

  const handleResolve = () => {
    if (!challenge) return;

    const removed = challenge.votes.for > challenge.votes.against;
    setChallenge({
      ...challenge,
      status: "resolved",
      result: removed ? "removed" : "defended",
    });

    if (removed) {
      setBuilders((prev) =>
        prev.map((b) => (b.id === challenge.builderId ? { ...b, status: "removed" } : b))
      );
    }
  };

  const handleApply = () => {
    const newBuilder: Builder = {
      id: String(builders.length + 1),
      name: "you.eth",
      handle: "@you",
      pitch: "Your project pitch goes here",
      stake: 100,
      status: "active",
      monthlyStream: 1000,
    };
    setBuilders((prev) => [...prev, newBuilder]);
    setHasApplied(true);
  };

  const handleReset = () => {
    setBuilders(INITIAL_BUILDERS);
    setChallenge(null);
    setHasApplied(false);
  };

  const challengedBuilder = challenge ? builders.find((b) => b.id === challenge.builderId) : null;

  return (
    <div className="bg-demo-dark my-6 w-full rounded-xl border border-neutral-800 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-200">Builder Registry (TCR)</div>
          <div className="text-xs text-neutral-500">Stake to join • Challenge to curate</div>
        </div>
        <button
          onClick={handleReset}
          className="text-[10px] text-neutral-600 transition-colors hover:text-neutral-400"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Registry */}
        <div className="space-y-2">
          {builders.map((builder) => (
            <BuilderCard
              key={builder.id}
              builder={builder}
              onChallenge={() => handleChallenge(builder.id)}
              isChallenged={challenge?.builderId === builder.id}
            />
          ))}

          {!hasApplied && (
            <button
              onClick={handleApply}
              className="w-full rounded-lg border border-dashed border-neutral-700 p-3 text-xs text-neutral-500 transition-colors hover:border-neutral-600 hover:text-neutral-400"
            >
              + Apply to join (stake 100 tokens)
            </button>
          )}
        </div>

        {/* Challenge panel */}
        <div>
          {challenge && challengedBuilder ? (
            <ChallengePanel
              challenge={challenge}
              onVote={handleVote}
              onResolve={handleResolve}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-neutral-800 p-6 text-center">
              <div className="mb-2 text-neutral-600">
                <ShieldIcon />
              </div>
              <div className="mb-1 text-xs text-neutral-500">No active challenges</div>
              <div className="text-[10px] text-neutral-600">
                Click "Challenge" to start a curation vote
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-neutral-800/50 pt-3 text-center text-xs text-neutral-500">
        Challenge bad actors • Defend legitimate builders • Registry self-corrects
      </div>
    </div>
  );
}
