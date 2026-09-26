// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // The deck sources live beside the site, in ../presentations — the presentations page reads
  // their deck.json files, so the dev server must be allowed to look one level up.
  vite: { server: { fs: { allow: [".."] } } },
});
