"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Target,
  Users,
  MessageCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import { PredictionCard } from "@/components/predictions/PredictionCard";
import { MyPredictions } from "@/components/predictions/MyPredictions";
import { PredictionLeagues } from "@/components/predictions/PredictionLeagues";
import { CommunityTab } from "@/components/predictions/CommunityTab";
import { getDemoPredictions } from "@/lib/data/demoPredictions";
import { useSession } from "@/lib/store/session";
import { useIsClient } from "@/hooks/useHydratedSession";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "ai", label: "AI Predictions", icon: Sparkles },
  { id: "mine", label: "My Predictions", icon: Target },
  { id: "leagues", label: "Leagues", icon: Users },
  { id: "community", label: "Community", icon: MessageCircle },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function PredictionsView() {
  const [tab, setTab] = useState<TabId>("ai");
  const ready = useIsClient();
  const predictions = useMemo(() => getDemoPredictions().slice(0, 8), []);
  const userPredictions = useSession((s) => s.predictions);

  const stats = useMemo(() => {
    const total = userPredictions.length;
    const settled = userPredictions.filter((p) => p.isSettled);
    const correct = settled.filter((p) => p.pointsEarned > 0).length;
    const points = settled.reduce((acc, p) => acc + p.pointsEarned, 0);
    const accuracy = settled.length > 0 ? Math.round((correct / settled.length) * 100) : null;

    // Streak = consecutive correct from most recently settled going back.
    const sorted = [...settled].sort(
      (a, b) => +new Date(b.matchDate) - +new Date(a.matchDate),
    );
    let streak = 0;
    for (const p of sorted) {
      if (p.pointsEarned > 0) streak += 1;
      else break;
    }

    return { total, correct, points, accuracy, streak };
  }, [userPredictions]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictions"
        description="Pick scores, climb leaderboards, compare with the ML model."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label="Total"
          value={ready ? String(stats.total) : "—"}
        />
        <StatTile
          label="Accuracy"
          value={ready && stats.accuracy !== null ? `${stats.accuracy}%` : "—"}
          hint={ready && stats.total > 0 ? `${stats.correct} correct` : undefined}
        />
        <StatTile
          label="Points"
          value={ready ? String(stats.points) : "—"}
          hint={ready && stats.total > 0 ? "3 exact · 1 winner" : undefined}
        />
        <StatTile
          label="Streak"
          value={ready ? String(stats.streak) : "—"}
          hint={ready && stats.streak > 0 ? "Correct in a row" : undefined}
        />
      </div>

      <Card className="flex flex-wrap items-center gap-2 p-3">
        {TABS.map((option) => {
          const Icon = option.icon;
          const active = tab === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTab(option.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                active
                  ? "bg-accent-muted text-accent"
                  : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {option.label}
            </button>
          );
        })}
      </Card>

      {tab === "ai" ? (
        <div className="grid gap-3 md:grid-cols-2">
          {predictions.map((p) => (
            <PredictionCard key={p.fixtureId} prediction={p} />
          ))}
        </div>
      ) : null}

      {tab === "mine" ? <MyPredictions /> : null}
      {tab === "leagues" ? <PredictionLeagues /> : null}
      {tab === "community" ? <CommunityTab /> : null}
    </div>
  );
}
