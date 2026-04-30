import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = { title: "Leagues" };

export default function LeaguesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Leagues"
        description="Standings, top scorers, top assists — for every league you follow."
      />
      <EmptyState
        icon={Trophy}
        title="No leagues followed yet"
        description="Onboarding (Phase 1) lets you pick from 20 top leagues. Phase 2 wires standings tables with European spots, relegation bands and position arrows."
      />
    </div>
  );
}
