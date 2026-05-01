import type { Metadata } from "next";
import { PlayerPulseView } from "./PlayerPulseView";

export const metadata: Metadata = { title: "Player Pulse" };

export default function PlayersPage() {
  return <PlayerPulseView />;
}
