/**
 * Deterministic "now" so relative times render identically on server and
 * client (avoids hydration mismatches). Matches the demo dataset's timeframe.
 */
export const NOW = new Date("2026-07-09T09:00:00Z")

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  const diffMin = Math.round((NOW.getTime() - then) / 60000)
  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `${diffH}h ago`
  const diffD = Math.round(diffH / 24)
  return `${diffD}d ago`
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(iso))
}

export function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}
