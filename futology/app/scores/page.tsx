import type { Metadata } from "next";
import { ScoresView } from "./ScoresView";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const metadata: Metadata = { title: "Scores" };

export default function ScoresPage() {
  return (
    <ErrorBoundary>
      <ScoresView />
    </ErrorBoundary>
  );
}
