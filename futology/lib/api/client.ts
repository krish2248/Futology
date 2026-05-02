import { CLUBS } from "@/lib/data/clubs";
import { LEAGUES, findLeague } from "@/lib/data/leagues";
import { PLAYERS } from "@/lib/data/players";
import {
  getDemoMatches,
  liveMatches,
  matchesByStatus,
  type DemoMatch,
  type MatchStatus,
} from "@/lib/data/demoMatches";
import { getDemoMatchDetail, type MatchDetail } from "@/lib/data/demoMatchDetail";
import {
  getBandsForLeague,
  getDemoStandings,
  type StandingRow,
  type StandingsBands,
} from "@/lib/data/demoStandings";
import type { LeagueSeed } from "@/lib/data/leagues";

export type SearchKind = "league" | "club" | "player";
export type SearchHit = {
  kind: SearchKind;
  id: number;
  title: string;
  subtitle: string;
};

// Static-export-friendly: every method is a synchronous lookup wrapped in a
// resolved promise so the call sites still feel async. When we cut over to
// real services in the Supabase phase, swap each method for a fetch.
function resolved<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export const api = {
  liveScores: (params?: { league?: number; status?: MatchStatus | "all" }) => {
    const all = getDemoMatches();
    const status = params?.status ?? "live";
    const byStatus = status === "live" ? liveMatches(all) : matchesByStatus(all, status);
    const filtered = params?.league
      ? byStatus.filter((m) => m.leagueId === params.league)
      : byStatus;
    return resolved<DemoMatch[]>(filtered);
  },

  fixtures: (params?: {
    league?: number;
    team?: number;
    status?: MatchStatus | "all";
  }) => {
    let result = matchesByStatus(getDemoMatches(), params?.status ?? "all");
    if (params?.league) result = result.filter((m) => m.leagueId === params.league);
    if (params?.team)
      result = result.filter(
        (m) => m.homeTeamId === params.team || m.awayTeamId === params.team,
      );
    return resolved<DemoMatch[]>(result);
  },

  standings: (leagueId: number) => {
    const league = findLeague(leagueId);
    const rows = getDemoStandings(leagueId);
    const bands = getBandsForLeague(leagueId);
    return resolved<{
      league: LeagueSeed | undefined;
      bands: StandingsBands;
      rows: StandingRow[];
    }>({ league, bands, rows });
  },

  match: (fixtureId: number) => {
    const match = getDemoMatches().find((m) => m.id === fixtureId);
    if (!match) {
      return Promise.reject(new Error(`Match ${fixtureId} not found`));
    }
    return resolved<MatchDetail>(getDemoMatchDetail(match));
  },

  search: (
    query: string,
    type: "all" | "team" | "player" | "league" = "all",
  ) => {
    const q = query.trim().toLowerCase();
    if (!q) return resolved<SearchHit[]>([]);
    const hits: SearchHit[] = [];
    const includeLeagues = type === "all" || type === "league";
    const includeClubs = type === "all" || type === "team";
    const includePlayers = type === "all" || type === "player";

    if (includeLeagues) {
      for (const l of LEAGUES) {
        if (
          l.name.toLowerCase().includes(q) ||
          l.shortName.toLowerCase().includes(q) ||
          l.country.toLowerCase().includes(q)
        ) {
          hits.push({
            kind: "league",
            id: l.id,
            title: l.name,
            subtitle: l.country,
          });
        }
      }
    }
    if (includeClubs) {
      for (const c of CLUBS) {
        if (
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q)
        ) {
          hits.push({
            kind: "club",
            id: c.id,
            title: c.name,
            subtitle: c.country,
          });
        }
      }
    }
    if (includePlayers) {
      for (const p of PLAYERS) {
        if (
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
        ) {
          hits.push({
            kind: "player",
            id: p.id,
            title: p.name,
            subtitle: `${p.team} · ${p.position}`,
          });
        }
      }
    }
    return resolved<SearchHit[]>(hits.slice(0, 24));
  },
};
