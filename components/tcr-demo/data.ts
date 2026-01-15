import type { Builder } from "./types";

export const INITIAL_BUILDERS: Builder[] = [
  {
    id: "1",
    name: "alice.eth",
    handle: "@alice",
    pitch: "Building open-source analytics dashboard for DAOs",
    stake: 100,
    status: "active",
    monthlyStream: 2000,
  },
  {
    id: "2",
    name: "bob.eth",
    handle: "@bob",
    pitch: "Creating educational content about web3 governance",
    stake: 100,
    status: "active",
    monthlyStream: 1500,
  },
];

export const CHALLENGE_REASONS = [
  "No progress updates in 3 weeks",
  "Work quality doesn't meet standards",
  "Misrepresented project scope",
];
