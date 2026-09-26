// Builds every deck: presentations/<slug>/deck.json lists its parts in order, and this script
// concatenates them into one self-contained HTML file at website/public/presentations/<slug>.html.
//
// Placeholders it fills, and nothing else:
//   {{title}}           the deck's title, from deck.json
//   {{av:<agent>}}      one character, as a <use> of a symbol in shared/cast/avatars.html
//   {{graph}}           the who-talks-to-whom network, drawn from the deck's graph.json
//   {{UPPER_CASE}}      a figure from the deck's stats.json — no number on a slide is typed by hand
//   /*__DATA__*/null    the deck's data.json, for decks whose script draws from data
// A placeholder left unfilled is an error: the build stops rather than ship "{{".
//
//   node presentations/build.mjs            build every deck
//   node presentations/build.mjs <slug>     build one
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "website", "public", "presentations");

const avatar = (a) =>
  `<svg class="av" viewBox="0 0 200 200" aria-hidden="true"><use href="#av-${a}" width="200" height="200"/></svg>`;

// Python's str(float) for the few values the original generator printed that way ("64.0", not "64").
const pyFloat = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));

// ── the network ────────────────────────────────────────────────────────────────────────────
// Laid out by MEANING rather than by physics: the hub at the centre, the characters on an inner
// ring (drawn as their avatars), the rest of the fleet outside. Line width and
// weight follow the number of tasks between two agents, both directions summed.
function graph(G) {
  const W = 1200, H = 720, CX = 600, CY = 368;
  // The layout is data, in the deck's graph.json: who sits at the centre, who is drawn as a
  // character, and each agent's angle on the inner or outer ring.
  const { hub, characters: SIX, inner, outer, human: HUMAN } = G.layout;
  const rad = (d) => (d * Math.PI) / 180;
  const pos = new Map([[hub, [CX, CY]]]);
  for (const [a, d] of Object.entries(inner)) pos.set(a, [CX + 305 * Math.cos(rad(d)), CY + 205 * Math.sin(rad(d))]);
  for (const [a, d] of Object.entries(outer)) pos.set(a, [CX + 520 * Math.cos(rad(d)), CY + 318 * Math.sin(rad(d))]);
  const pairs = G.pairs, tot = G.total;
  const mx = Math.max(...pairs.map((p) => p[2]));
  const f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2);
  const out = [`<svg class="net" viewBox="0 0 ${W} ${H}" role="img" aria-label="${G.label}">`];
  for (const [a, b, n] of [...pairs].sort((p, q) => p[2] - q[2])) {
    if (!pos.has(a) || !pos.has(b)) continue;
    const [x1, y1] = pos.get(a), [x2, y2] = pos.get(b);
    const core = SIX.includes(a) && SIX.includes(b);
    out.push(`<line class="${core ? "ec" : "eo"}" x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke-width="${f2(0.9 + 0.62 * Math.sqrt(n))}" opacity="${f2(0.22 + 0.7 * Math.sqrt(n / mx))}"/>`);
  }
  const heavy = [...pairs].sort((p, q) => q[2] - p[2]);
  const labelled = [...heavy.filter((p) => p[0] === hub || p[1] === hub).slice(0, 6),
    ...heavy.filter((p) => p[0] !== hub && p[1] !== hub).slice(0, 1)];
  for (const [a, b, n] of labelled) {
    let [x1, y1] = pos.get(a), [x2, y2] = pos.get(b);
    const withHub = a === hub || b === hub;
    if (withHub && a !== hub) [x1, y1, x2, y2] = [x2, y2, x1, y1];
    const t = withHub ? 0.45 : 0.5;
    out.push(`<g class="cnt" transform="translate(${f1(x1 + (x2 - x1) * t)} ${f1(y1 + (y2 - y1) * t)})"><rect x="-17" y="-11" width="34" height="21" rx="10"/><text y="4.5" text-anchor="middle">${n}</text></g>`);
  }
  for (const [a, [x, y]] of pos) {
    if (SIX.includes(a)) {
      const s = a === hub ? 118 : 92;
      out.push(`<g class="nav"><circle cx="${f1(x)}" cy="${f1(y)}" r="${pyFloat(s / 2 + 5)}" class="halo"/><use href="#av-${a}" x="${f1(x - s / 2)}" y="${f1(y - s / 2)}" width="${s}" height="${s}"/>` +
        `<text class="nl big" x="${f1(x)}" y="${f1(y + s / 2 + 22)}" text-anchor="middle">${a}</text></g>`);
    } else {
      const r = 7 + 1.7 * Math.sqrt(tot[a] ?? 0), human = a === HUMAN;
      out.push(`<g class="${human ? "nh" : "no"}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/>` +
        `<text class="nl" x="${f1(x)}" y="${f1(y + r + 16)}" text-anchor="middle">${human ? `${a} — the human` : a}</text></g>`);
    }
  }
  out.push("</svg>");
  return out.join("\n");
}

function build(slug) {
  const dir = join(HERE, slug);
  const deck = JSON.parse(readFileSync(join(dir, "deck.json"), "utf8"));
  const read = (f) => readFileSync(join(dir, f), "utf8");
  let html = deck.parts.map(read).join("");
  html = html.replaceAll("{{title}}", deck.title);
  html = html.replace(/\{\{av:([a-z-]+)\}\}/g, (_, a) => avatar(a));
  if (deck.graph) html = html.replace("{{graph}}", graph(JSON.parse(read(deck.graph))));
  if (deck.data) html = html.replace("/*__DATA__*/null", JSON.stringify(JSON.parse(read(deck.data))));
  if (deck.stats) {
    const stats = JSON.parse(read(deck.stats));
    const missing = [...new Set([...html.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)].map((m) => m[1]))].filter((k) => !(k in stats));
    if (missing.length) throw new Error(`${slug}: unfilled figures: ${missing.join(", ")}`);
    html = html.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, k) => String(stats[k]));
  }
  const left = html.match(/\{\{[^}]*\}\}/g);
  if (left) throw new Error(`${slug}: unfilled placeholders: ${[...new Set(left)].join(", ")}`);
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, `${slug}.html`), html);
  console.log(`${slug}.html  ${html.length.toLocaleString("en")} chars`);
}

const only = process.argv[2];
const slugs = readdirSync(HERE, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(HERE, d.name, "deck.json")))
  .map((d) => d.name).sort();
for (const s of only ? [only] : slugs) build(s);
