# PLAN — the marketing website, rebuilt around the fleet's stories

Turns marketing.urbalurba.com from four plain pages into a designed site: the tools, the six characters who build them, the presentations, and the fleet in numbers.

> **IMPLEMENTATION RULES:** This repository is public and a merge to `main` is live within minutes.
> Nothing from `private/` (the bus-derived handover) is committed unless Terje has cleared that
> specific deck. Build and look at every page before merging; check the live site after.

## Status: Active

**Goal**: A site that looks as good as the decks, says what SovereignSky and the fleet are, and publishes the presentations Terje clears.

**Last Updated**: 2026-09-26

**Progress:** phases 1–4 and 5.1 merged in PR #1 and live. The pipeline worked with no manual step: CI committed tag `da9a4e0-20260926171326` at 17:13:44Z, and the new site answered on marketing.urbalurba.com at 17:19:58Z (UTC). **Left:** 5.2, when `urb stats` is released; then 6.3 and completion. Checked before merge: `npm run build` and `npm run typecheck` pass; `check-quotes` on the four published decks (only the maintainer's two framing lines are NOT FOUND); every page at 360, 390 and 1280 px in light and dark, no horizontal scroll; no IP, hostname or Red Cross mention in `dist/`.

**Priority**: High — Terje asked for it, 2026-09-26 ("create a great looking website with the content").

**Decisions (Terje, 2026-09-26):** plan approved. Cleared for publication: **the four interview
decks** — *In Their Own Words*, *Sovereign on a Tuesday*, *Grown Up on the Fleet*, *Running the
Fleet*. **Not cleared:** *One night on the bus* and *Who built Atlas* — they stay in `private/`. The
clearance covers the decks; the full interview answers they are checked against stay in `private/`.
Asked again before publishing: **where each agent runs** (laptop, office machine, a 2011 iMac,
servers — no hostnames or addresses) is published **as is**; **mentions of Red Cross** are **removed**
from the decks — cut, never reworded.

---

## Problem Summary

The site that runs today has a heading, a bullet list of tools, an empty presentations page and an
empty fleet page. The decks, by contrast, have a finished design — the "cast": a palette, three
typefaces and six illustrated characters (`presentations/shared/cast/`, already public). The site
should read as the same thing as the decks.

The content arrived in #1587: six decks and the interviews behind them. All of it is derived from
the private bus, so **which decks go public is Terje's decision**. Everything else on the site is
written from public sources: the product sites and sovereignsky.no.

One sentence on the site today is no longer true: the footer says everything is reviewed by a person
first. Since 2026-09-26 this agent merges its own website PRs. The footer must say what actually
happens: the site is written by an AI agent, and the quotes are checked word for word against their
source.

---

## Phase 1: Design system and layout — DONE

### Tasks

- [x] 1.1 Tokens in `Base.astro`, taken from the cast so site and decks match: ground, surface, ink, muted, accent, and one colour per character; light and dark, with a theme toggle that remembers the choice
- [x] 1.2 Header with the brand and navigation (Tools · Presentations · The fleet), and a mobile menu; footer that describes the AI authorship honestly
- [x] 1.3 Components: section heading, card, tool card, deck card, figure tile, character avatar (the `<symbol>`s from `shared/cast/avatars.html`, inlined once per page)
- [x] 1.4 Layout works from 360 px up: 16 px side gutter, no horizontal scroll

### Validation

`npm run build` passes; every page checked at phone and desktop width, light and dark.

## Phase 2: Home page — DONE

### Tasks

- [x] 2.1 Hero: what SovereignSky is, and that its tools are built by a fleet of AI agents with a person deciding what matters. The six characters are the picture
- [x] 2.2 The tools: six cards with what each one does and a link to its site — facts from the product sites only
- [x] 2.3 How the fleet works, in three steps (one agent per project · a shared noticeboard · a person decides) — from public material and this repository's own docs, no bus quotes
- [x] 2.4 Teasers for the presentations and the fleet in numbers, each shown only when there is something to show

### Validation

Every factual claim traced to a public page. Build, look, merge, check live.

## Phase 3: Tools page and the cast — DONE

### Tasks

- [x] 3.1 `/tools/`: one section per tool — what it is, who it is for, its site
- [x] 3.2 The characters: which agent builds which tool, drawn as its character — agent ids and ownership only, nothing `host.md` protects (no machines, hosts or placement)

### Validation

No host, IP, machine or placement anywhere on the site (grep the built `dist/`).

## Phase 4: Presentations — DONE

### Tasks

- [x] 4.1 Redesign `/presentations/`: deck cards with the characters each deck is about, audience, slide count, a summary, how to present (keys)
- [x] 4.2 For each deck Terje clears: move it from `private/presentations/` to `presentations/`, run `check-quotes`, build, and look at every slide before committing
- [x] 4.3 A deck that is not cleared stays in `private/`, and the page does not mention it

### Validation

`check-quotes` on every published deck; every `NOT FOUND` looked at. Only cleared decks are in git.

## Phase 5: The fleet in numbers

### Tasks

- [x] 5.1 Restyle `/fleet/` in the new design (figure tiles, chart, table) so it is ready
- 5.2 waits on `urb stats` being released — not in this PR
- [ ] 5.2 When `urb stats` is released (urb-agents PR #1570): `npm run bus-stats`, check the page, commit

### Validation

Every figure comes from `bus-stats.json`; none is typed by hand.

## Phase 6: Ship and confirm the pipeline

### Tasks

- [x] 6.1 Merge; watch CI build the image and commit the tag
- [x] 6.2 Confirm that ArgoCD deployed it by itself: the change is visible on marketing.urbalurba.com. If not, report it on the bus
- [ ] 6.3 Update `1PRIORITY.md` and `fleet/status/marketing.md`; move this plan to `completed/`

---

## Acceptance Criteria

- [ ] marketing.urbalurba.com shows the new design on every page, light and dark, phone and desktop
- [ ] Every claim is from a public source or a deck Terje cleared; every quote passes `check-quotes`
- [ ] Nothing from `private/` is in git except the decks Terje cleared
- [ ] The site says openly that an AI agent writes it
- [ ] A merge reached the live site through CI and ArgoCD with no manual step (or the failure is on the bus)

## Files to Modify

- `website/src/layouts/Base.astro`, `website/src/pages/{index,fleet}.astro`, `website/src/pages/presentations/index.astro`
- New: `website/src/pages/tools.astro`, `website/src/components/*.astro`, `website/src/data/tools.ts`
- `presentations/<slug>/` — only for cleared decks
