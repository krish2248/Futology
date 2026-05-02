"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import { PitchSVG } from "@/components/intelligence/PitchSVG";
import {
  getDemoPress,
  ZONE_COLOR,
  ZONE_LABEL,
  type PressTeam,
} from "@/lib/data/demoPress";
import { cn } from "@/lib/utils/cn";

type SortKey = "ppda" | "pressures" | "turnovers";

export function PressIntensityView() {
  const teams = useMemo(() => getDemoPress(), []);
  const [selectedId, setSelectedId] = useState<number>(teams[0]?.team.id ?? 0);
  const [sort, setSort] = useState<SortKey>("ppda");
  const [zoneFilter, setZoneFilter] = useState<"all" | "high" | "mid" | "low">("all");

  const filtered = useMemo(
    () => (zoneFilter === "all" ? teams : teams.filter((t) => t.pressZone === zoneFilter)),
    [teams, zoneFilter],
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "ppda") list.sort((a, b) => a.ppda - b.ppda);
    if (sort === "pressures") list.sort((a, b) => b.pressuresPer90 - a.pressuresPer90);
    if (sort === "turnovers") list.sort((a, b) => b.highTurnovers - a.highTurnovers);
    return list;
  }, [filtered, sort]);

  const selected = teams.find((t) => t.team.id === selectedId) ?? teams[0];
  const leagueAvgPpda = useMemo(
    () => teams.reduce((acc, t) => acc + t.ppda, 0) / Math.max(1, teams.length),
    [teams],
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
        title="Press Intensity"
        description="Pressing styles across the squad. PPDA = passes per defensive action — lower means more pressing. Heatmap shows where pressure happens on the pitch."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label="League avg PPDA"
          value={leagueAvgPpda.toFixed(1)}
          hint={`${teams.length} clubs`}
        />
        <StatTile
          label="Most aggressive press"
          value={
            [...teams].sort((a, b) => a.ppda - b.ppda)[0]?.team.shortName ?? "—"
          }
          hint={`${[...teams].sort((a, b) => a.ppda - b.ppda)[0]?.ppda.toFixed(1)} PPDA`}
        />
        <StatTile
          label="Selected"
          value={selected?.team.shortName ?? "—"}
          hint={selected ? ZONE_LABEL[selected.pressZone] : ""}
        />
        <StatTile
          label="Selected PPDA"
          value={selected?.ppda.toFixed(1) ?? "—"}
          hint={
            selected
              ? selected.ppda < leagueAvgPpda
                ? "Above average press"
                : "Below average press"
              : ""
          }
        />
      </div>

      <Card className="flex flex-wrap items-center gap-2 p-3">
        <span className="text-xs uppercase tracking-wider text-text-secondary">
          Style
        </span>
        {(["all", "high", "mid", "low"] as const).map((z) => {
          const active = zoneFilter === z;
          return (
            <button
              key={z}
              type="button"
              onClick={() => setZoneFilter(z)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                active
                  ? "border-accent/60 bg-accent-muted text-accent"
                  : "border-border bg-bg-surface text-text-secondary hover:border-accent/40",
              )}
            >
              {z === "all" ? "All" : ZONE_LABEL[z]}
            </button>
          );
        })}
        <span className="ml-auto text-[11px] text-text-muted">
          Sort:{" "}
          {(
            [
              { id: "ppda", label: "PPDA" },
              { id: "pressures", label: "Pressures/90" },
              { id: "turnovers", label: "High turnovers" },
            ] as Array<{ id: SortKey; label: string }>
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSort(opt.id)}
              className={cn(
                "ml-1.5 rounded px-2 py-0.5 transition-colors",
                sort === opt.id
                  ? "bg-accent-muted text-accent"
                  : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
              )}
            >
              {opt.label}
            </button>
          ))}
        </span>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_24rem]">
        <Card className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">
              {selected?.team.name} · pressure heatmap
            </p>
            <span
              aria-hidden
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                background: `${selected ? ZONE_COLOR[selected.pressZone] : "#525252"}22`,
                color: selected ? ZONE_COLOR[selected.pressZone] : "#525252",
                border: `1px solid ${selected ? ZONE_COLOR[selected.pressZone] : "#525252"}55`,
              }}
            >
              <Flame className="h-3 w-3" aria-hidden />
              {selected ? ZONE_LABEL[selected.pressZone] : ""}
            </span>
          </div>
          {selected ? <Heatmap team={selected} /> : null}
          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            <Mini label="PPDA" value={selected?.ppda.toFixed(1) ?? "—"} accent />
            <Mini
              label="Pressures/90"
              value={selected?.pressuresPer90.toString() ?? "—"}
            />
            <Mini
              label="Success rate"
              value={selected ? `${selected.pressureSuccessRate.toFixed(0)}%` : "—"}
            />
            <Mini
              label="High turnovers"
              value={selected?.highTurnovers.toString() ?? "—"}
            />
          </div>
        </Card>

        <div className="surface max-h-[32rem] overflow-y-auto p-2">
          <ul className="space-y-1">
            {sorted.map((t) => {
              const active = t.team.id === selectedId;
              return (
                <li key={t.team.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(t.team.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-accent-muted"
                        : "hover:bg-bg-elevated",
                    )}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: ZONE_COLOR[t.pressZone] }}
                    />
                    <span className="min-w-0 flex-1 truncate">{t.team.name}</span>
                    <span className="tabular text-text-muted">
                      {t.ppda.toFixed(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Heatmap({ team }: { team: PressTeam }) {
  // 12 columns × 8 rows on a pitch (own → opponent goal).
  const max = team.heatmap.flat().reduce((acc, v) => Math.max(acc, v), 0) || 1;
  return (
    <PitchSVG className="aspect-[12/8]">
      <div
        className="absolute inset-1 grid"
        style={{
          gridTemplateColumns: `repeat(12, 1fr)`,
          gridTemplateRows: `repeat(8, 1fr)`,
        }}
      >
        {team.heatmap.flatMap((row, x) =>
          row.map((v, y) => {
            const intensity = Math.pow(v / max, 0.85);
            const opacity = 0.05 + intensity * 0.65;
            return (
              <span
                key={`${x}-${y}`}
                aria-hidden
                className="block"
                style={{
                  background: `rgba(0, 213, 99, ${opacity.toFixed(3)})`,
                  borderRadius: 2,
                  margin: 1,
                }}
              />
            );
          }),
        )}
      </div>
    </PitchSVG>
  );
}

function Mini({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md bg-bg-elevated px-2 py-1.5 text-center">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p
        className={cn(
          "tabular mt-0.5 text-sm font-semibold",
          accent && "text-accent",
        )}
      >
        {value}
      </p>
    </div>
  );
}
