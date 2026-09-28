# PLAN — a "How it works" page: the bus, the urb command, the doorbell

A top-level page that explains how the fleet's agents talk to each other: tasks as GitHub issues, one client that holds every rule, and a tmux doorbell.

> **IMPLEMENTATION RULES:** Terje asked for this topic to be public (#1601). Still no bus *content* —
> no task titles, quotes or thread text — and nothing from the brief's "Leave out" list: hostnames,
> tmux session names, file paths, job script names, tokens, credentials, the roster. Every example on
> the page is marked as an illustration. **Terje reads it before it is published**, and
> urb-agents-maintainer checks it technically first.

## Status: Active

**Goal**: A reader who has never seen the fleet understands, in one page, how twenty agents that cannot reach each other still work together.

**Last Updated**: 2026-09-28

**Progress:** draft on branch `how-it-works`, PR open, not merged. Checked: build and typecheck pass; 25 moves drawn, counted against `urb states`; every page at 360/390/1280 px, light and dark, no horizontal scroll; nothing from the Leave-out list in `dist/`. Waiting: the maintainer's technical check, then Terje's read.

**Source**: the technical brief from urb-agents-maintainer, #1601 (accurate as of `urb` 0.5.43). Requested by Terje, 2026-09-28.

---

## Phase 1: The data — DONE when the state machine is a file

- [x] 1.1 `tools/bus-states.ts` + `npm run bus-states`: `urb states --json` → `website/src/data/bus-states.json`, after checking its shape (known fields, state ids, every move to a known state). The diagram is drawn from this file, never by hand
- [x] 1.2 Record it in `project-marketing.md` beside *The bus in numbers*

## Phase 2: The page — `/how-it-works/`

- [x] 2.1 Hero and the idea in one paragraph: no agent can reach another; the one thing all can reach is GitHub
- [x] 2.2 A task is an issue: the three labels, the inbox as a question, the speaker stamp — an illustrated issue, marked as an example
- [x] 2.3 The state machine: an interactive diagram generated from `bus-states.json` (click a state: its moves, its description, whom it wakes), with a plain table of the same moves for readers without the diagram
- [x] 2.4 One client, `urb`: the verbs grouped, "refuses rather than guesses", how a release reaches every machine
- [x] 2.5 The doorbell: the tmux ring, "a nudge, never the message", who gets woken (from the `rings` field)
- [x] 2.6 The four jobs that keep it honest, and the five design ideas
- [x] 2.7 "How it works" in the main navigation

### Validation

`npm run build`; every page at 360/390/1280 px, light and dark; the diagram's moves counted against `urb states` (25); grep `dist/` for anything on the Leave-out list.

## Phase 3: Review and publish

- [x] 3.1 Branch and PR; send the draft to urb-agents-maintainer for a technical check (#1601)
- [ ] 3.2 Fix what it finds; Terje reads the PR
- [ ] 3.3 Merge after Terje has read it; check it live; update `1PRIORITY.md` and the status; move this plan to `completed/`

## Acceptance Criteria

- [ ] The page explains the queue, the client and the doorbell with no bus content and nothing from the Leave-out list
- [ ] The state diagram is generated from `urb states` and shows all 25 moves
- [ ] urb-agents-maintainer has checked it; Terje has read it before merge
