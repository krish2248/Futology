"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUp, Minus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { StatTile } from "@/components/shared/StatTile";
import { buildRefRows, type RefRow } from "@/lib/data/demoReferees";
import { cn } from "@/lib/utils/cn";

type SortKey = "name" | "yellowsPerMatch" | "bigGameDelta" | "homeFavorIndex";

export function RefereeBiasView() {
  const [bigGame, setBigGame] = useState(false);
  const [sort, setSort] = useState<SortKey>("bigGameDelta");

  const rows = useMemo(() => buildRefRows(), []);
  const sorted = useMemo(() => {
    const list = [...rows];
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "yellowsPerMatch")
      list.sort(
        (a, b) =>
          (bigGame ? b.bgYellowsPerMatch : b.yellowsPerMatch) -
          (bigGame ? a.bgYellowsPerMatch : a.yellowsPerMatch),
      );
    else if (sort === "bigGameDelta")
      list.sort((a, b) => b.bigGameDelta - a.bigGameDelta);
    else if (sort === "homeFavorIndex")
      list.sort((a, b) => b.homeFavorIndex - a.homeFavorIndex);
    return list;
  }, [rows, sort, bigGame]);

  const avgYellows = useMemo(() => {
    if (rows.length === 0) return 0;
    return (
      rows.reduce(
        (acc, r) => acc + (bigGame ? r.bgYellowsPerMatch : r.yellowsPerMatch),
        0,
      ) / rows.length
    );
  }, [rows, bigGame]);

  const tightestRef = sorted.find((r) => r.bigGameDelta > 0);

  return (
    <div className="space-y-6">
      <Link
        href="/intelligence/extras"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Extras
      </Link>
      <PageHeader
        title="Referee Bias Analyzer"
        description="Cards per match per referee, with a big-game-only filter. Demo data; bible Phase 6 cutover scrapes historical FBref ref logs."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          label={bigGame ? "Avg yellows (big)" : "Avg yellows"}
          value={avgYellows.toFixed(2)}
          hint="Per match"
        />
        <StatTile
          label="Refs analysed"
          value={String(rows.length)}
          hint="Across 6 leagues"
        />
        <StatTile
          label="Most card-happy"
          value={tightestRef?.name.split(" ").slice(-1)[0] ?? "—"}
          hint={
            tightestRef
              ? `+${tightestRef.bigGameDelta.toFixed(0)}% in big games`
              : ""
          }
        />
        <StatTile
          label="Filter mode"
          value={bigGame ? "Big games" : "All matches"}
          hint="Top 6 vs top 6"
        />
      </div>

      <Card className="flex flex-wrap items-center gap-3 p-3">
        <button
          type="button"
          onClick={() => setBigGame((v) => !v)}
          aria-pressed={bigGame}
          className={cn(
            "rounded-full border px-3 py-1 text-xs transition-colors",
            bigGame
              ? "border-accent/60 bg-accent-muted text-accent"
              : "border-border bg-bg-surface text-text-secondary hover:border-accent/40",
          )}
        >
          {bigGame ? "Showing big games only" : "Show big games only"}
        </button>
        <p className="ml-auto text-[11px] text-text-muted">
          Sort:{" "}
          {(
            [
              { id: "bigGameDelta", label: "Big-game effect" },
              { id: "yellowsPerMatch", label: "Cards/match" },
              { id: "homeFavorIndex", label: "Home tilt" },
              { id: "name", label: "Name" },
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
        </p>
      </Card>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-wider text-text-muted">
                <th className="py-2 pl-3 pr-2 text-left">Referee</th>
                <th className="hidden py-2 pr-2 text-left sm:table-cell">League</th>
                <th className="hidden py-2 pr-2 text-right tabular sm:table-cell">M</th>
                <th className="py-2 pr-2 text-right tabular">🟨/M</th>
                <th className="py-2 pr-2 text-right tabular">🟥/M</th>
                <th className="py-2 pr-2 text-right">Big-game</th>
                <th className="py-2 pr-3 text-right">Home tilt</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <Row key={r.id} row={r} bigGame={bigGame} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border bg-bg-primary/50 px-3 py-2 text-[11px] text-text-muted">
          Big-game = top-6 vs top-6 fixtures · Home tilt 50 = neutral, &gt;50
          favors home calls.
        </div>
      </div>
    </div>
  );
}

function Row({ row, bigGame }: { row: RefRow; bigGame: boolean }) {
  const yellow = bigGame ? row.bgYellowsPerMatch : row.yellowsPerMatch;
  const red = bigGame ? row.bgRedsPerMatch : row.redsPerMatch;
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="py-2 pl-3 pr-2 font-medium">{row.name}</td>
      <td className="hidden py-2 pr-2 text-text-secondary sm:table-cell">
        {row.league}
      </td>
      <td className="tabular hidden py-2 pr-2 text-right sm:table-cell">
        {bigGame ? row.bigGameDelta > 0 ? "Big" : "—" : row.matches}
      </td>
      <td className="tabular py-2 pr-2 text-right">{yellow.toFixed(2)}</td>
      <td className="tabular py-2 pr-2 text-right">{red.toFixed(2)}</td>
      <td className="py-2 pr-2 text-right">
        <BigGameDelta value={row.bigGameDelta} />
      </td>
      <td className="py-2 pr-3 text-right">
        <HomeTilt value={row.homeFavorIndex} />
      </td>
    </tr>
  );
}

function BigGameDelta({ value }: { value: number }) {
  if (Math.abs(value) < 0.5) {
    return (
      <span className="inline-flex items-center gap-1 text-text-muted">
        <Minus className="h-3 w-3" aria-hidden /> 0%
      </span>
    );
  }
  const positive = value > 0;
  return (
    <span
      className={cn(
        "tabular inline-flex items-center gap-1 font-medium",
        positive ? "text-warning" : "text-accent",
      )}
    >
      {positive ? (
        <ArrowUp className="h-3 w-3" aria-hidden />
      ) : (
        <ArrowDown className="h-3 w-3" aria-hidden />
      )}
      {Math.abs(value).toFixed(0)}%
    </span>
  );
}

function HomeTilt({ value }: { value: number }) {
  const delta = value - 50;
  const positive = delta > 0;
  return (
    <span
      className={cn(
        "tabular inline-flex items-center gap-1",
        Math.abs(delta) < 4
          ? "text-text-secondary"
          : positive
            ? "text-warning"
            : "text-info",
      )}
    >
      {value}
      {Math.abs(delta) >= 4 ? (positive ? " H" : " A") : null}
    </span>
  );
}
