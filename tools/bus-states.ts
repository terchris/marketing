// Fetches the bus's state machine through `urb states --json` and writes
// website/src/data/bus-states.json, which the How it works page draws its diagram from. The
// diagram is never drawn by hand: a hand-drawn version once missed 13 of the 25 moves (#1601).
//
//   npm run bus-states
//
// The output is protocol, not bus content — state names, whom each state wakes, a one-line
// description, and the legal moves. The check below still refuses anything it does not know.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { BusStates } from "../website/src/lib/bus-states.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "website", "src", "data", "bus-states.json");
const ID = /^[a-z][a-z-]*$/;
const RINGS = ["recipient", "sender", "human", "none"];

function urbBinary(): string {
  if (process.env.URB_BIN) return process.env.URB_BIN;
  const local = join(homedir(), ".local", "bin", "urb");
  return existsSync(local) ? local : "urb";
}
function fail(path: string, why: string): never { throw new Error(`refusing to write bus-states.json: ${path} ${why}`); }
function only(v: unknown, path: string, allowed: string[]): Record<string, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) fail(path, "is not an object");
  const extra = Object.keys(v).filter((k) => !allowed.includes(k));
  if (extra.length) fail(path, `has fields this tool does not know: ${extra.join(", ")}`);
  return v as Record<string, unknown>;
}

export function checkStates(raw: unknown): BusStates {
  const s = only(raw, "the output", ["source", "states", "transitions"]);
  if (!Array.isArray(s.states) || !s.states.length) fail("states", "is not a list");
  const ids = new Set<string>();
  const states = s.states.map((x, i) => {
    const st = only(x, `states[${i}]`, ["state", "terminal", "close_reason", "hold", "rings", "description"]);
    if (typeof st.state !== "string" || !ID.test(st.state)) fail(`states[${i}].state`, "is not a state id");
    if (typeof st.terminal !== "boolean" || typeof st.hold !== "boolean") fail(`states[${i}]`, "terminal/hold are not booleans");
    if (typeof st.rings !== "string" || !RINGS.includes(st.rings)) fail(`states[${i}].rings`, `is not one of ${RINGS.join(", ")}`);
    if (typeof st.description !== "string" || st.description.length > 200) fail(`states[${i}].description`, "is not a short string");
    ids.add(st.state);
    return { state: st.state, terminal: st.terminal, hold: st.hold, rings: st.rings as BusStates["states"][number]["rings"], description: st.description };
  });
  const t = only(s.transitions, "transitions", [...ids]);
  const transitions: Record<string, string[]> = {};
  for (const id of ids) {
    const to = t[id] ?? [];
    if (!Array.isArray(to) || to.some((x) => typeof x !== "string" || !ids.has(x))) fail(`transitions.${id}`, "names a state that does not exist");
    transitions[id] = to as string[];
  }
  return { states, transitions };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const urb = urbBinary();
  const version = execFileSync(urb, ["--version"], { encoding: "utf8" }).trim().split(/\s+/)[1] ?? "unknown";
  const out = { ...checkStates(JSON.parse(execFileSync(urb, ["states", "--json"], { encoding: "utf8" }))), urb: version, generated_at: new Date().toISOString() };
  const moves = Object.values(out.transitions).reduce((n, to) => n + to.length, 0);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${OUT.slice(ROOT.length + 1)}: ${out.states.length} states, ${moves} moves, from urb ${version}`);
}
