// Lives in data/, not lib/: import.meta.glob is Vite's, and tools/tsconfig.json typechecks lib/ with plain Node types.
// Every published deck: presentations/<slug>/deck.json beside the site, which `npm run decks`
// builds into public/presentations/<slug>.html. Decks in private/ are never read here.
import type { Deck } from "../../../tools/decks.ts";

export type SiteDeck = Deck & { slug: string };

const files = import.meta.glob<Deck>("../../../presentations/*/deck.json", { eager: true, import: "default" });

// Decks for anyone first. Within an audience, an overview (no single interview) before the
// in-depth interviews, and those in the order they were held; then by title.
const order = (d: Deck): number => d.interview ?? 0;
export const decks: SiteDeck[] = Object.entries(files)
  .map(([path, d]) => ({ ...d, slug: path.split("/").at(-2)! }))
  .sort((a, b) => a.audience !== b.audience ? (a.audience === "anyone" ? -1 : 1)
    : order(a) - order(b) || a.title.localeCompare(b.title));
