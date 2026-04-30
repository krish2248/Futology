import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card } from "@/components/shared/Card";

export const metadata: Metadata = { title: "Scores" };

const FILTERS = ["All", "Live", "Finished", "Scheduled"] as const;

export default function ScoresPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Scores & Fixtures"
        description="5 days back · 7 days ahead · live updates every 30s."
      />

      <Card className="flex flex-wrap items-center gap-2 p-3">
        {FILTERS.map((filter, i) => (
          <button
            key={filter}
            type="button"
            className={
              i === 0
                ? "rounded-lg bg-accent-muted px-3 py-1.5 text-sm text-accent"
                : "rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
            }
          >
            {filter}
          </button>
        ))}
      </Card>

      <EmptyState
        icon={Trophy}
        title="Live scores will appear here"
        description="Phase 2 will wire API-Football for live matches, fixtures, lineups, events and stats."
      />
    </div>
  );
}
