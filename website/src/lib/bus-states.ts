// The shape of `urb states --json` as the site keeps it — written by tools/bus-states.ts, drawn by
// src/pages/how-it-works.astro.
export interface BusStates {
  states: { state: string; terminal: boolean; hold: boolean; rings: "recipient" | "sender" | "human" | "none"; description: string }[];
  transitions: Record<string, string[]>;
  urb?: string;
  generated_at?: string;
}
