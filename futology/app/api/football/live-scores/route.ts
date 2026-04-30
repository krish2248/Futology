import { NextResponse } from "next/server";
import {
  getDemoMatches,
  liveMatches,
  matchesByStatus,
  type MatchStatus,
} from "@/lib/data/demoMatches";
import { cacheHeaders, isDemoMode, jsonResponse } from "@/lib/api/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get("league");
  const status = (searchParams.get("status") ?? "live") as MatchStatus | "all";

  if (isDemoMode) {
    const matches = getDemoMatches();
    const byStatus =
      status === "live"
        ? liveMatches(matches)
        : matchesByStatus(matches, status);
    const filtered = league
      ? byStatus.filter((m) => String(m.leagueId) === league)
      : byStatus;
    return jsonResponse(filtered, cacheHeaders.liveScores);
  }

  // Phase 2 will replace this branch with a fetch to API-Football using
  // process.env.RAPIDAPI_KEY. The demo branch above runs until then.
  return NextResponse.json(
    { error: "Live data adapter not yet wired. Set DEMO_MODE=true." },
    { status: 501 },
  );
}
