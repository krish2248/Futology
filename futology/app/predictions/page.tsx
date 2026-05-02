import type { Metadata } from "next";
import { PredictionsView } from "./PredictionsView";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const metadata: Metadata = { title: "Predictions" };

export default function PredictionsPage() {
  return (
    <ErrorBoundary>
      <PredictionsView />
    </ErrorBoundary>
  );
}
