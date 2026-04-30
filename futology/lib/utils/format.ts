export function formatKickoff(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const same = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (same(d, now)) return `Today · ${time}`;

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (same(d, tomorrow)) return `Tomorrow · ${time}`;

  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }) + ` · ${time}`;
}

export function formatScore(home: number | undefined, away: number | undefined): string {
  if (typeof home !== "number" || typeof away !== "number") return "—";
  return `${home} – ${away}`;
}

export function formatRelativeMinute(minute: number | undefined): string {
  if (typeof minute !== "number") return "";
  if (minute > 90) return `${minute}'+`;
  return `${minute}'`;
}
