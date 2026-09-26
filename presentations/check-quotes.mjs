// Checks that every quoted passage on a deck is word for word in its source — the agent's answer
// on the bus, saved as a file. A quote is the text between “ and ”, plus the one-sentence boxes
// (class="one"), the big warning lines (class="warnline") and <blockquote>s.
//
// A cut is marked "…", and each fragment between cuts must appear in the source. Differences
// that do not change the words are ignored: markdown bold/italic markers, emoji, the style of
// quotation mark, and an inline "(#123)" reference moved out of the quote into its citation.
//
//   node presentations/check-quotes.mjs <slug> <source.md> [<source.md> …]
//
// Prints each quote with "verbatim" or "NOT FOUND", and exits 1 if any quote is not found.
// A NOT FOUND is not always a misquote — it can be your own heading or a question — but every
// one must be looked at before the deck is published.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const [slug, ...sources] = process.argv.slice(2);
if (!slug || !sources.length) {
  console.error("usage: node presentations/check-quotes.mjs <slug> <source.md> [<source.md> …]");
  process.exit(2);
}
const HERE = dirname(fileURLToPath(import.meta.url));
const deck = JSON.parse(readFileSync(join(HERE, slug, "deck.json"), "utf8"));
const own = deck.parts.filter((p) => !p.startsWith("../")).map((p) => readFileSync(join(HERE, slug, p), "utf8")).join("");

const EMOJI = /[☀-⟿\u{1F300}-\u{1FAFF}️]/gu;
const norm = (s) => s.replace(/[*_`]/g, "").replace(EMOJI, "").replace(/[‘’“”'"]/g, '"')
  .replace(/\s*\(#\d+\)/g, "").replace(/\s+/g, " ").trim().toLowerCase();
const text = (html) => html.replace(/<[^>]+>/g, "").replace(/&nbsp;| /g, " ")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const source = norm(sources.map((s) => readFileSync(s, "utf8")).join("\n"));
let bad = 0, count = 0;
for (const [, label, body0] of own.matchAll(/<section[^>]*aria-label="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)) {
  const body = body0.replace(/<aside>[\s\S]*?<\/aside>/g, "");
  const quotes = [...text(body).matchAll(/“([^”]{3,})”/g)].map((m) => m[1]);
  for (const m of body.matchAll(/class="(?:one|warnline)"[^>]*>(?:<small>[^<]*<\/small>)?([^<“]+)</g)) quotes.push(text(m[1]));
  for (const m of body.matchAll(/<blockquote[^>]*>([^<]+)<\/blockquote>/g)) quotes.push(text(m[1]));
  const seen = [...new Set(quotes.map((q) => q.trim()))];
  if (!seen.length) continue;
  console.log(`\n## ${label}`);
  for (const q of seen) {
    const frags = q.split("…").map((f) => norm(f).replace(/^[ .,"]+|[ .,"]+$/g, "")).filter((f) => f.length > 1);
    const ok = frags.length > 0 && frags.every((f) => source.includes(f));
    count++; if (!ok) bad++;
    console.log(`- ${ok ? "verbatim " : "NOT FOUND"}  “${q}”`);
  }
}
console.log(`\n${count} quotes, ${bad} not found`);
process.exit(bad ? 1 : 0);
