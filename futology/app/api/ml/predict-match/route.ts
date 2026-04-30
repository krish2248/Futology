import { NextResponse } from "next/server";
import { findClub } from "@/lib/data/clubs";
import { predictMatch } from "@/lib/ml/predictor";
import { cacheHeaders, isDemoMode, jsonResponse } from "@/lib/api/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDemoMode) {
    return NextResponse.json(
      { error: "ML service adapter not wired yet." },
      { status: 501 },
    );
  }

  let body: { home_id?: number; away_id?: number; competition_id?: number };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const home = body.home_id ? findClub(body.home_id) : undefined;
  const away = body.away_id ? findClub(body.away_id) : undefined;
  if (!home || !away) {
    return NextResponse.json(
      { error: "home_id and away_id required and must match seeded clubs" },
      { status: 400 },
    );
  }
  if (home.id === away.id) {
    return NextResponse.json(
      { error: "Home and away cannot be the same team" },
      { status: 400 },
    );
  }

  const result = predictMatch({
    home,
    away,
    competitionId: body.competition_id,
  });
  return jsonResponse(result, cacheHeaders.fixtures);
}
