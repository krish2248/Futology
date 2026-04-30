export const isDemoMode =
  process.env.DEMO_MODE === "true" ||
  !process.env.RAPIDAPI_KEY ||
  process.env.RAPIDAPI_KEY === "";

export const cacheHeaders = {
  noStore: "no-store",
  liveScores: "no-store",
  liveMatch: "public, s-maxage=30, stale-while-revalidate=60",
  fixtures: "public, s-maxage=300, stale-while-revalidate=600",
  standings: "public, s-maxage=300, stale-while-revalidate=600",
  team: "public, s-maxage=3600, stale-while-revalidate=7200",
  player: "public, s-maxage=3600, stale-while-revalidate=7200",
  finishedMatch: "public, s-maxage=3600, stale-while-revalidate=7200",
  search: "public, s-maxage=3600, stale-while-revalidate=7200",
  news: "public, s-maxage=900, stale-while-revalidate=1800",
} as const;

export function jsonResponse<T>(
  data: T,
  cache: string,
  init?: ResponseInit,
): Response {
  return new Response(JSON.stringify({ data, demo: isDemoMode }), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cache,
      ...(init?.headers ?? {}),
    },
  });
}
