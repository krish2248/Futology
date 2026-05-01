import type { Metadata } from "next";
import { RefereeBiasView } from "./RefereeBiasView";

export const metadata: Metadata = { title: "Referee Bias" };

export default function RefereeBiasPage() {
  return <RefereeBiasView />;
}
