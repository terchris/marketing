# PLAN — rewrite the site for Terje's talk: developing with agents, with this fleet as the example

Cuts the AI slop, fixes the wrong claims, and adds what the agents said the AI got wrong about them — for the talk on Wednesday 30 September at 08:30.

> **IMPLEMENTATION RULES:** plain headings that say what is on the page; the method stated once,
> in the footer; every claim concrete and true; one word for the bus. Quotes verbatim, checked
> against the saved source. Nothing from host.md.

## Status: Completed

**Goal**: Someone at the talk can open the site and see, plainly and with some humour, how a real fleet of agents builds real software — and what each agent works on.

**Last Updated**: 2026-09-29

**Progress:** content rewritten. Home 675 words (slogans and self-praise cut), How it works from 1,176 to about 750 words, "word for word" from 9 mentions to the footer's one line, "noticeboard" to "bus" everywhere but ops-dev's own verbatim summary. 18 correction quotes verified against private/checks/. Every page at 360/390/1280 px, light and dark, no horizontal scroll. Live 2026-09-29 11:58Z (PR #5). Rehearsal: all six decks from disk in Chrome, presenting mode — every slide visited, no text outside a frame, no script errors, UTF-8, arrows, N and T work. Not tested in Safari itself (no WebKit here). One 504 on / during the rollout (a single replica restarting): do not deploy during the talk.

**Decisions (Terje, 2026-09-29):** the audience is the talk ("developing using agents"); the fleet is the example, with the programs and repositories the agents work on; "a bit humoristic as i asked AI to interview the various AI agents". Plan approved. **Cleared for publication:** each agent's correction of its own page, quoted verbatim from its check task (#1624–#1636).

## Phase 1: Content
- [x] 1.1 Home: the premise (an AI interviewed the AI agents), the fleet, what it builds, the talks — no slogans, no self-praise
- [x] 1.2 Agent pages: "What the AI got wrong about me", verbatim; repository prominent; filler cut
- [x] 1.3 Tools: wrong claims fixed, all six tools linked to their agent and repository
- [x] 1.4 How it works: about half the length, for developers, "the bus" throughout
- [x] 1.5 Presentations and fleet intros: plain; footer says the method once

## Phase 2: Check and ship
- [x] 2.1 Quotes verified against private/checks/<agent>.md; build; every page at phone and laptop, light and dark
- [x] 2.2 Merge, check live
- [x] 2.3 Rehearse all six decks from disk before 08:30
