export type Builder = {
  id: string;
  name: string;
  handle: string;
  pitch: string;
  stake: number;
  status: "active" | "challenged" | "removed";
  monthlyStream: number;
};

export type Challenge = {
  id: string;
  builderId: string;
  challengerStake: number;
  reason: string;
  votes: { for: number; against: number };
  status: "voting" | "resolved";
  result?: "removed" | "defended";
};
