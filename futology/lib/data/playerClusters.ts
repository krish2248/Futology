export type ClusterId =
  | "target-striker"
  | "creative-playmaker"
  | "box-to-box"
  | "ball-playing-defender"
  | "high-press-forward"
  | "deep-lying-playmaker";

export type ClusterProfile = {
  id: ClusterId;
  name: string;
  color: string;
  description: string;
  definingStats: string[];
};

export const CLUSTERS: readonly ClusterProfile[] = [
  {
    id: "target-striker",
    name: "Target Striker",
    color: "#FF6B6B",
    description:
      "High shot volume, aerial duels, lives in the box. Converts the chances created by others.",
    definingStats: ["Shots/90", "Aerial duels won", "xG/90"],
  },
  {
    id: "creative-playmaker",
    name: "Creative Playmaker",
    color: "#4ECDC4",
    description:
      "Threads the needle. High key passes, expected assists, dribbles into the final third.",
    definingStats: ["Key passes/90", "xA/90", "Final-third entries"],
  },
  {
    id: "box-to-box",
    name: "Box-to-Box Midfielder",
    color: "#45B7D1",
    description:
      "Engine in the middle of the park. Pressures defenders, carries forward, recycles possession.",
    definingStats: ["Pressures/90", "Progressive carries", "Tackles + interceptions"],
  },
  {
    id: "ball-playing-defender",
    name: "Ball-Playing Defender",
    color: "#96CEB4",
    description:
      "Composed in possession. Initiates attacks with progressive passes and aerial dominance.",
    definingStats: ["Pass accuracy", "Progressive passes", "Aerial duels won"],
  },
  {
    id: "high-press-forward",
    name: "High Press Forward",
    color: "#FFEAA7",
    description:
      "Defends from the front. High pressures and recoveries in the opposition half.",
    definingStats: ["Pressures/90", "Recoveries (att 3rd)", "Off-ball runs"],
  },
  {
    id: "deep-lying-playmaker",
    name: "Deep-Lying Playmaker",
    color: "#DDA0DD",
    description:
      "Conducts from deep. High pass volume and switches of play, low shot volume.",
    definingStats: ["Passes/90", "Pass accuracy", "Switches of play"],
  },
] as const;

export function clusterById(id: ClusterId): ClusterProfile {
  const c = CLUSTERS.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown cluster: ${id}`);
  return c;
}
