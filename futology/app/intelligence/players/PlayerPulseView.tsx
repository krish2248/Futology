"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import {
  ClusterFilter,
  PlayerClusterChart,
} from "@/components/intelligence/PlayerClusterChart";
import { PlayerComparisonRadar } from "@/components/intelligence/PlayerComparisonRadar";
import { PlayerPicker } from "@/components/intelligence/PlayerPicker";
import {
  nearestPlayers,
  toRadar,
  type PlayerStatLine,
} from "@/lib/data/demoPlayerStats";
import { CLUSTERS, clusterById, type ClusterId } from "@/lib/data/playerClusters";
import { cn } from "@/lib/utils/cn";

type Tab = "explore" | "compare";

export function PlayerPulseView() {
  const [tab, setTab] = useState<Tab>("explore");
  const [filter, setFilter] = useState<ClusterId | null>(null);
  const [highlight, setHighlight] = useState<PlayerStatLine | null>(null);
  const [home, setHome] = useState<PlayerStatLine | null>(null);
  const [away, setAway] = useState<PlayerStatLine | null>(null);

  return (
    <div className="space-y-6">
      <Link
        href="/intelligence"
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Intelligence Hub
      </Link>

      <PageHeader
        title="Player Pulse"
        description="K-Means clustering on per-90 stats. 6 named playing-style profiles. Click a dot for detail."
      />

      <Card className="flex flex-wrap items-center gap-2 p-3">
        {(
          [
            { id: "explore", label: "Cluster scatter", icon: Users },
            { id: "compare", label: "Compare two players", icon: Zap },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                active
                  ? "bg-accent-muted text-accent"
                  : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </Card>

      {tab === "explore" ? (
        <>
          <ClusterFilter value={filter} onChange={setFilter} />
          <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <PlayerClusterChart
              filterCluster={filter}
              onSelect={setHighlight}
              highlightId={highlight?.playerId}
            />
            <PlayerDetailPanel player={highlight} />
          </div>
          <ClusterProfiles />
        </>
      ) : (
        <CompareTab
          home={home}
          away={away}
          onSelectHome={setHome}
          onSelectAway={setAway}
        />
      )}
    </div>
  );
}

function CompareTab({
  home,
  away,
  onSelectHome,
  onSelectAway,
}: {
  home: PlayerStatLine | null;
  away: PlayerStatLine | null;
  onSelectHome: (p: PlayerStatLine | null) => void;
  onSelectAway: (p: PlayerStatLine | null) => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="space-y-3">
        <PlayerPicker
          label="Player A"
          selected={home}
          onSelect={onSelectHome}
          exclude={away?.playerId}
        />
        <PlayerPicker
          label="Player B"
          selected={away}
          onSelect={onSelectAway}
          exclude={home?.playerId}
        />
        <p className="text-xs text-text-muted">
          Pick two players to compare their per-90 profiles. Cluster name shows
          their playing-style assignment.
        </p>
      </Card>
      {home ? (
        <PlayerComparisonRadar
          homeName={home.name}
          homeStats={toRadar(home)}
          awayName={away?.name}
          awayStats={away ? toRadar(away) : undefined}
        />
      ) : (
        <Card>
          <p className="text-sm text-text-secondary">
            Pick a player on the left to see their radar appear here.
          </p>
        </Card>
      )}
    </div>
  );
}

function PlayerDetailPanel({ player }: { player: PlayerStatLine | null }) {
  if (!player) {
    return (
      <Card>
        <p className="font-medium">Click a dot to see detail</p>
        <p className="mt-1 text-sm text-text-secondary">
          Hover for a quick tooltip; click to lock the panel and show similar
          players.
        </p>
      </Card>
    );
  }
  const cluster = clusterById(player.cluster);
  const similar = nearestPlayers(player, 3);
  return (
    <Card className="space-y-4">
      <div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: `${cluster.color}22`,
            color: cluster.color,
            border: `1px solid ${cluster.color}55`,
          }}
        >
          {cluster.name}
        </span>
        <p className="mt-2 text-base font-semibold">{player.name}</p>
        <p className="text-sm text-text-secondary">
          {player.team} · {player.position}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <Stat label="Goals/90" value={player.goals.toFixed(2)} />
        <Stat label="Assists/90" value={player.assists.toFixed(2)} />
        <Stat label="xG/90" value={player.xG.toFixed(2)} />
        <Stat label="Key passes" value={player.keyPasses.toFixed(1)} />
        <Stat label="Pressures" value={String(player.pressures)} />
        <Stat label="Pass acc." value={`${player.passAccuracy.toFixed(0)}%`} />
      </div>

      <div>
        <p className="mb-2 text-[11px] uppercase tracking-wider text-text-muted">
          Similar players
        </p>
        <ul className="space-y-1.5">
          {similar.map((s) => {
            const sc = clusterById(s.cluster);
            return (
              <li
                key={s.playerId}
                className="flex items-center gap-2 rounded-md bg-bg-elevated px-2 py-1.5 text-xs"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: sc.color }}
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {s.name}
                </span>
                <span className="truncate text-text-secondary">{s.team}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-bg-elevated px-2 py-1.5">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
      <p className="tabular mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ClusterProfiles() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium tracking-wide text-text-secondary">
        Cluster profiles
      </h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {CLUSTERS.map((c) => (
          <Card key={c.id}>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: c.color }}
              />
              <p className="font-medium">{c.name}</p>
            </div>
            <p className="mt-1.5 text-sm text-text-secondary">
              {c.description}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {c.definingStats.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-bg-elevated px-2 py-0.5 text-[10px] text-text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
