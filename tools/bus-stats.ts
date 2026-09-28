// Fetches the bus in numbers through `urb stats --json` and writes website/src/data/bus-stats.json,
// which the fleet page renders. Run it, look at the diff, commit, and the next deploy publishes it.
//
//   npm run bus-stats                      since the bus began (1 September 2026)
//   npm run bus-stats -- --since 2026-09-20
//
// THE BUS IS PRIVATE AND THIS SITE IS PUBLIC. `urb stats` returns aggregates only — counts, agent
// ids, dates, durations; never a title or a body. This tool checks that promise again before it
// writes anything: every field must be one it knows, of the type it expects, and every id must look
// like an agent id. Anything else stops the run. Never widen the check to let text through.
//
// It goes through `urb` because an agent never builds a bus query itself. The binary is URB_BIN,
// else ~/.local/bin/urb (where ops-agent sync installs it), else `urb` on PATH.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BUS_STATS_SCHEMA, type BusStats } from "../website/src/lib/bus-stats.ts";
import { NAMED, OTHERS } from "../website/src/lib/named.ts";

// ── which ids are named on the page ───────────────────────────────────────────────────────────
// The allowlist lives in website/src/lib/named.ts — one list for this tool, the site and the
// console. Every other id is folded into one "others" row, in the agent table and in the pairs,
// and only the number of folded ids is kept.
export { NAMED, OTHERS };

export function foldUnnamed(s: BusStats): BusStats {
  const name = (id: string): string => (NAMED.has(id) ? id : OTHERS);
  const agents = new Map<string, BusStats["agents"][number]>();
  for (const a of s.agents) {
    const k = name(a.id), cur = agents.get(k) ?? { id: k, sent: 0, received: 0, replies: 0 };
    agents.set(k, { id: k, sent: cur.sent + a.sent, received: cur.received + a.received, replies: cur.replies + a.replies });
  }
  const pairs = new Map<string, BusStats["pairs"][number]>();
  for (const p of s.pairs) {
    const [a, b] = [name(p.a), name(p.b)].sort();
    if (a === b && a === OTHERS) continue; // between two unnamed agents: nothing to show
    const k = `${a} ${b}`;
    pairs.set(k, { a, b, tasks: (pairs.get(k)?.tasks ?? 0) + p.tasks });
  }
  const others = s.agents.filter((a) => !NAMED.has(a.id)).length;
  const named = [...agents.values()].filter((a) => a.id !== OTHERS);
  const rest = agents.get(OTHERS);
  return {
    ...s,
    agents: rest ? [...named, rest] : named,
    pairs: [...pairs.values()].sort((x, y) => y.tasks - x.tasks),
    others,
  };
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "website", "src", "data", "bus-stats.json");
const BUS_START = "2026-09-01";

function urbBinary(): string {
  if (process.env.URB_BIN) return process.env.URB_BIN;
  const local = join(homedir(), ".local", "bin", "urb");
  return existsSync(local) ? local : "urb";
}

function fetchStats(since: string): unknown {
  const urb = urbBinary();
  try {
    return JSON.parse(execFileSync(urb, ["stats", "--json", "--since", since], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
  } catch (e) {
    const err = e as { stderr?: string; message: string };
    const said = (err.stderr ?? err.message).trim();
    if (/unknown verb|stats/.test(said) && !/GitHub/.test(said)) {
      throw new Error(`${urb} has no 'stats' verb yet — it arrives with the urb release that carries terchris/urb-agents PR #1570. Ask ops-dev.\n${said}`);
    }
    throw new Error(`urb stats failed: ${said}`);
  }
}

// ── the second check: aggregates only ─────────────────────────────────────────────────────────
const ID = /^[a-z][a-z0-9-]*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
function fail(path: string, why: string): never { throw new Error(`refusing to write bus-stats.json: ${path} ${why}`); }
function count(v: unknown, path: string): number { if (typeof v !== "number" || !Number.isFinite(v) || v < 0) fail(path, "is not a count"); return v; }
function keys(v: unknown, path: string, allowed: string[]): Record<string, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) fail(path, "is not an object");
  const extra = Object.keys(v).filter((k) => !allowed.includes(k));
  if (extra.length) fail(path, `has fields this tool does not know: ${extra.join(", ")}`);
  return v as Record<string, unknown>;
}
function id(v: unknown, path: string): string { if (typeof v !== "string" || !ID.test(v)) fail(path, "is not an agent id"); return v; }

export function checkAggregatesOnly(raw: unknown): BusStats {
  const s = keys(raw, "the output", ["schema", "generated_at", "window", "tasks", "replies", "agents", "pairs", "days", "first_reply_minutes"]);
  if (s.schema !== BUS_STATS_SCHEMA) fail("schema", `is ${JSON.stringify(s.schema)}, expected ${BUS_STATS_SCHEMA}`);
  if (typeof s.generated_at !== "string" || !ISO.test(s.generated_at)) fail("generated_at", "is not a UTC time");
  const w = keys(s.window, "window", ["from", "to"]);
  if (w.from !== null && (typeof w.from !== "string" || !ISO.test(w.from))) fail("window.from", "is not a UTC time");
  if (typeof w.to !== "string" || !ISO.test(w.to)) fail("window.to", "is not a UTC time");
  const t = keys(s.tasks, "tasks", ["total", "open", "closed", "closed_as", "open_in"]);
  for (const k of ["total", "open", "closed"]) count(t[k], `tasks.${k}`);
  const ca = keys(t.closed_as, "tasks.closed_as", ["completed", "failed", "canceled", "rejected", "unlabelled"]);
  for (const [k, v] of Object.entries(ca)) count(v, `tasks.closed_as.${k}`);
  for (const [k, v] of Object.entries(keys(t.open_in, "tasks.open_in", Object.keys(t.open_in as object)))) { id(k, `tasks.open_in key`); count(v, `tasks.open_in.${k}`); }
  const r = keys(s.replies, "replies", ["total", "stamped"]);
  count(r.total, "replies.total"); count(r.stamped, "replies.stamped");
  if (!Array.isArray(s.agents)) fail("agents", "is not a list");
  s.agents.forEach((a, i) => { const x = keys(a, `agents[${i}]`, ["id", "sent", "received", "replies"]); id(x.id, `agents[${i}].id`); for (const k of ["sent", "received", "replies"]) count(x[k], `agents[${i}].${k}`); });
  if (!Array.isArray(s.pairs)) fail("pairs", "is not a list");
  s.pairs.forEach((p, i) => { const x = keys(p, `pairs[${i}]`, ["a", "b", "tasks"]); id(x.a, `pairs[${i}].a`); id(x.b, `pairs[${i}].b`); count(x.tasks, `pairs[${i}].tasks`); });
  if (!Array.isArray(s.days)) fail("days", "is not a list");
  s.days.forEach((d, i) => { const x = keys(d, `days[${i}]`, ["date", "created", "closed"]); if (typeof x.date !== "string" || !DATE.test(x.date)) fail(`days[${i}].date`, "is not a date"); count(x.created, `days[${i}].created`); count(x.closed, `days[${i}].closed`); });
  const f = keys(s.first_reply_minutes, "first_reply_minutes", ["tasks", "median", "p90"]);
  count(f.tasks, "first_reply_minutes.tasks");
  for (const k of ["median", "p90"]) if (f[k] !== null) count(f[k], `first_reply_minutes.${k}`);
  return raw as BusStats;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const i = process.argv.indexOf("--since");
  const since = i > 0 ? process.argv[i + 1] ?? BUS_START : BUS_START;
  const stats = foldUnnamed(checkAggregatesOnly(fetchStats(since)));
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(stats, null, 2) + "\n");
  console.log(`wrote ${OUT.slice(ROOT.length + 1)}: ${stats.tasks.total} tasks, ${stats.replies.total} replies, ${stats.agents.length - (stats.others ? 1 : 0)} named ids + ${stats.others ?? 0} folded into "${OTHERS}", ${stats.days.length} days`);
}
