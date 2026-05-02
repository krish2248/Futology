"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUp, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import {
  getDemoOdds,
  SEVERITY_COLOR,
  SEVERITY_LABEL,
  type OddsMovement,
} from "@/lib/data/demoOdds";
import { cn } from "@/lib/utils/cn";

type Filter = "all" | "alert" | "watch" | "info";

export function OddsMovementView() {
  const movements = useMemo(() => getDemoOdds(), []);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return movements;
    return movements.filter((m) => m.severity === filter);
  }, [movements, filter]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.maxShift - a.maxShift),
    [filtered],
  );

  const counts = useMemo(
    () => ({
      total: movements.length,
      alert: movements.filter((m) => m.severity === "alert").length,
      watch: movements.filter((m) => m.severity === "watch").length,
      sharpestShift: Math.max(...movements.map((m) => m.maxShift)),
    }),
    [movements],
  );

  return (
    <div className="space-y-6">
      <Link
        href="/intelligence/extras"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Extras
      </Link>
      <PageHeader
        title="Odds Movement Alerts"
        description="Opening vs current odds for upcoming and live fixtures. Implied probability shift ≥ 12 pp = alert. Demo data; bible Phase 6 cutover hits odds-api.com."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Watched fixtures" value={String(counts.total)} hint="Upcoming + live" />
        <StatTile label="Alert (≥12 pp)" value={String(counts.alert)} hint="Sharp moves" />
        <StatTile label="Watch (7–11 pp)" value={String(counts.watch)} />
        <StatTile
          label="Sharpest shift"
          value={`${counts.sharpestShift.toFixed(1)} pp`}
          hint="Single-outcome max"
        />
      </div>

      <Card className="flex flex-wrap items-center gap-2 p-3">
        <span className="text-xs uppercase tracking-wider text-text-secondary">
          Severity
        </span>
        {(["all", "alert", "watch", "info"] as const).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-xs capitalize transition-colors",
                active
                  ? "border-accent/60 bg-accent-muted text-accent"
                  : "border-border bg-bg-surface text-text-secondary hover:border-accent/40",
              )}
            >
              {f === "all" ? "All" : SEVERITY_LABEL[f as Exclude<Filter, "all">]}
            </button>
          );
        })}
      </Card>

      <ul className="space-y-3">
        {sorted.map((m) => (
          <MovementRow key={m.fixtureId} movement={m} />
        ))}
        {sorted.length === 0 ? (
          <li className="surface px-4 py-8 text-center text-sm text-text-muted">
            No movements in this filter.
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function MovementRow({ movement }: { movement: OddsMovement }) {
  const m = movement.match;
  const targetShift =
    movement.movedTo === "home"
      ? movement.shift.home
      : movement.movedTo === "away"
        ? movement.shift.away
        : movement.shift.draw;
  const positive = targetShift > 0;
  const color = SEVERITY_COLOR[movement.severity];

  return (
    <li className="surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-text-muted">
            {m.leagueName}
            {m.status === "live" ? (
              <span className="ml-2 inline-flex items-center gap-1 text-live">
                <span className="live-dot h-1.5 w-1.5" aria-hidden /> Live
              </span>
            ) : null}
          </p>
          <p className="mt-0.5 truncate font-medium">
            {m.homeTeam} vs {m.awayTeam}
          </p>
          <p className="text-[11px] text-text-secondary">
            Bookmaker: {movement.bookmaker} · take rate{" "}
            <span className="tabular">{movement.takeRate}%</span>
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: `${color}1F`,
            color,
            border: `1px solid ${color}55`,
          }}
        >
          <AlertCircle className="h-3 w-3" aria-hidden /> {SEVERITY_LABEL[movement.severity]}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <OddsCol
          label={m.homeTeam}
          opening={movement.opening.homeWin}
          current={movement.current.homeWin}
          shift={movement.shift.home}
          highlight={movement.movedTo === "home"}
        />
        <OddsCol
          label="Draw"
          opening={movement.opening.draw}
          current={movement.current.draw}
          shift={movement.shift.draw}
          highlight={movement.movedTo === "draw"}
        />
        <OddsCol
          label={m.awayTeam}
          opening={movement.opening.awayWin}
          current={movement.current.awayWin}
          shift={movement.shift.away}
          highlight={movement.movedTo === "away"}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-text-secondary">
        <span className="rounded-full border border-border-strong px-2 py-0.5 uppercase tracking-wider">
          Moved to {movement.movedTo}
        </span>
        <span
          className={cn(
            "tabular inline-flex items-center gap-1 font-medium",
            positive ? "text-accent" : "text-live",
          )}
        >
          {positive ? (
            <ArrowUp className="h-3 w-3" aria-hidden />
          ) : (
            <ArrowDown className="h-3 w-3" aria-hidden />
          )}
          {Math.abs(targetShift).toFixed(1)} pp implied
        </span>
      </div>

      {movement.alerts.length > 0 ? (
        <ul className="mt-2 space-y-1 border-t border-border pt-2">
          {movement.alerts.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-text-secondary"
            >
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-warning" aria-hidden />
              {a}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function OddsCol({
  label,
  opening,
  current,
  shift,
  highlight,
}: {
  label: string;
  opening: number;
  current: number;
  shift: number;
  highlight: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-2 py-2",
        highlight
          ? "border-accent/40 bg-accent-muted/40"
          : "border-border bg-bg-elevated",
      )}
    >
      <p className="truncate text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <p className="tabular mt-0.5 text-base font-semibold">{current.toFixed(2)}</p>
      <p className="tabular text-[10px] text-text-muted">
        was {opening.toFixed(2)} ·{" "}
        <span
          className={cn(shift > 0 ? "text-accent" : shift < 0 ? "text-live" : "")}
        >
          {shift > 0 ? "+" : ""}
          {shift.toFixed(1)}pp
        </span>
      </p>
    </div>
  );
}
