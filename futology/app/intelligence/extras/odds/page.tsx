import type { Metadata } from "next";
import { OddsMovementView } from "./OddsMovementView";

export const metadata: Metadata = { title: "Odds Movement" };

export default function OddsMovementPage() {
  return <OddsMovementView />;
}
