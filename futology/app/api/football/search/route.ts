import { NextResponse } from "next/server";
import { CLUBS } from "@/lib/data/clubs";
import { LEAGUES } from "@/lib/data/leagues";
import { PLAYERS } from "@/lib/data/players";
import { cacheHeaders, isDemoMode, jsonResponse } from "@/lib/api/config";

export const runtime = "nodejs";

export type SearchKind = "league" | "club" | "player";
export type SearchHit = {
  kind: SearchKind;
  id: number;
  title: string;
  subtitle: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const type = searchParams.get("type") ?? "all";

  if (!isDemoMode) {
    return NextResponse.json(
      { error: "Live search adapter not wired yet." },
      { status: 501 },
    );
  }

  if (!q) return jsonResponse<SearchHit[]>([], cacheHeaders.search);

  const hits: SearchHit[] = [];
  const includeLeagues = type === "all" || type === "league";
  const includeClubs = type === "all" || type === "club" || type === "team";
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

  return jsonResponse(hits.slice(0, 24), cacheHeaders.search);
}
