// The shape of `urb stats --json` (schema urb-stats/1), as the site uses it. The tool that fetches
// it (tools/bus-stats.ts) checks every field against this before anything is written, and the page
// that shows it (src/pages/fleet.astro) reads it through this type.
export const BUS_STATS_SCHEMA = "urb-stats/1";

export interface BusStats {
  schema: typeof BUS_STATS_SCHEMA;
  generated_at: string;
  window: { from: string | null; to: string };
  tasks: {
    total: number;
    open: number;
    closed: number;
    closed_as: { completed: number; failed: number; canceled: number; rejected: number; unlabelled: number };
    open_in: Record<string, number>;
  };
  replies: { total: number; stamped: number };
  agents: { id: string; sent: number; received: number; replies: number }[];
  pairs: { a: string; b: string; tasks: number }[];
  days: { date: string; created: number; closed: number }[];
  first_reply_minutes: { tasks: number; median: number | null; p90: number | null };
}
