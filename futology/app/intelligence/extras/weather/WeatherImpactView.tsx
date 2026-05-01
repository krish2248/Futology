"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CloudRain } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import {
  WEATHER_LABELS,
  WEATHER_LEAGUES,
  aggregateAll,
  type WeatherSplit,
  type WeatherBucket,
} from "@/lib/data/demoWeather";
import { cn } from "@/lib/utils/cn";

type Filter = "all" | number;

export function WeatherImpactView() {
  const [filter, setFilter] = useState<Filter>("all");
  const splits: WeatherSplit[] = useMemo(() => {
    if (filter === "all") return aggregateAll();
    const found = WEATHER_LEAGUES.find((l) => l.leagueId === filter);
    return found ? found.splits : aggregateAll();
  }, [filter]);

  const totalMatches = splits.reduce((acc, s) => acc + s.matches, 0);
  const baselineHome =
    splits.reduce((acc, s) => acc + s.homeWin * s.matches, 0) /
    Math.max(1, totalMatches);

  const mostHostile = [...splits].sort((a, b) => a.homeWin - b.homeWin)[0];
  const friendliest = [...splits].sort((a, b) => b.homeWin - a.homeWin)[0];

  return (
    <div className="space-y-6">
      <Link
        href="/intelligence/extras"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Extras
      </Link>
      <PageHeader
        title="Weather Impact"
        description="Match-outcome splits by weather bucket. Demo data; bible Phase 6 cutover hits Open-Meteo for real per-match conditions."
      />

      <Card className="flex flex-wrap items-center gap-2 p-3">
        <p className="text-xs uppercase tracking-wider text-text-secondary">
          League
        </p>
        <button
          type="button"
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={cn(
            "rounded-full border px-3 py-1 text-xs transition-colors",
            filter === "all"
              ? "border-accent/60 bg-accent-muted text-accent"
              : "border-border bg-bg-surface text-text-secondary hover:border-accent/40",
          )}
        >
          All leagues
        </button>
        {WEATHER_LEAGUES.map((l) => {
          const active = filter === l.leagueId;
          return (
            <button
              key={l.leagueId}
              type="button"
              onClick={() => setFilter(l.leagueId)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                active
                  ? "border-accent/60 bg-accent-muted text-accent"
                  : "border-border bg-bg-surface text-text-secondary hover:border-accent/40",
              )}
            >
              {l.leagueName}
            </button>
          );
        })}
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label="Matches"
          value={totalMatches.toLocaleString()}
          hint="In sample"
        />
        <StatTile
          label="Baseline home %"
          value={`${(baselineHome * 100).toFixed(1)}%`}
          hint="All conditions"
        />
        <StatTile
          label="Friendliest"
          value={friendliest ? WEATHER_LABELS[friendliest.bucket].label : "—"}
          hint={friendliest ? `${(friendliest.homeWin * 100).toFixed(1)}% home wins` : ""}
        />
        <StatTile
          label="Most hostile"
          value={mostHostile ? WEATHER_LABELS[mostHostile.bucket].label : "—"}
          hint={mostHostile ? `${(mostHostile.homeWin * 100).toFixed(1)}% home wins` : ""}
        />
      </div>

      <section>
        <h2 className="mb-3 inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight">
          <CloudRain className="h-4 w-4 text-info" aria-hidden /> Outcome split by weather
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {splits.map((s) => (
            <BucketCard key={s.bucket} split={s} baselineHome={baselineHome} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BucketCard({
  split,
  baselineHome,
}: {
  split: WeatherSplit;
  baselineHome: number;
}) {
  const meta = WEATHER_LABELS[split.bucket];
  const homePct = split.homeWin * 100;
  const drawPct = split.draw * 100;
  const awayPct = split.awayWin * 100;
  const delta = homePct - baselineHome * 100;

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-2xl">
          {meta.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium">{meta.label}</p>
          <p className="truncate text-[11px] text-text-muted">
            {meta.description}
          </p>
        </div>
        <span className="tabular text-[11px] text-text-muted">
          {split.matches.toLocaleString()} matches
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="tabular font-medium text-accent">
          Home {homePct.toFixed(0)}%
        </span>
        <span className="tabular text-text-muted">
          Draw {drawPct.toFixed(0)}%
        </span>
        <span className="tabular font-medium text-info">
          Away {awayPct.toFixed(0)}%
        </span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
        <span
          className="block h-full bg-accent"
          style={{ width: `${homePct}%` }}
        />
        <span
          className="block h-full bg-text-muted/40"
          style={{ width: `${drawPct}%` }}
        />
        <span
          className="block h-full bg-info"
          style={{ width: `${awayPct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-secondary">
        <span>
          Δ vs baseline:{" "}
          <span
            className={cn(
              "tabular font-medium",
              Math.abs(delta) < 1
                ? "text-text-secondary"
                : delta > 0
                  ? "text-accent"
                  : "text-live",
            )}
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(1)} pp
          </span>
        </span>
        <span>
          Goals/match{" "}
          <span className="tabular font-medium text-text-primary">
            {split.goalsPerMatch.toFixed(2)}
          </span>
        </span>
      </div>
    </Card>
  );
}
