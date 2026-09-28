---
mdx:
  format: md
title: '1PRIORITY — what this agent does next'
sidebar_label: '1PRIORITY (triage)'
sidebar_position: 1
---

# 1PRIORITY — what this agent does next

**Last updated: 2026-09-26** · agent `marketing` · state **onboarded** (card and status committed by ops-dev, #1573, #1577)

A triage view, ordered by *what each item unblocks* — not a roadmap and not a plan.
[`index.md`](index.md) says what every backlog item **is**; this file says what to **do next**
and what is stuck behind whom. Kept current on a change, not on a schedule.

Do not link to `talk/` from this file. Fleet work is on the bus in `terchris/urb-agents` —
`~/.local/bin/urb inbox --id marketing`; there is no mailbox directory.

---

## Do next — mine, unblocked

| # | What | Why this one |
|---|---|---|
| **1** | Have every deck ready for Terje's talk on Wednesday 30 September at 08:30 (Oslo) — he presents from the built HTML files on disk | The four public decks are on the site; all six build locally with `npm run decks` |
| **2** | Refresh the fleet in numbers when it matters (`npm run bus-stats`, look, commit) — on a change, not on a timer | The page shows the count it was taken at; a stale count is still a true one |

## Waiting on someone — ordered by what it unblocks

| What | Who | Since | Unblocks | Raised |
|---|---|---|---|---|
| **The two remaining decks** — *One night on the bus* and *Who built Atlas* (maps agents to machines) — stay in `private/` | Terje | 2026-09-26 | Publishing them | Terje cleared the four interview decks, 2026-09-26 |

## Done

- **Every agent an avatar and a page** — `/fleet/<id>/` for 13 agents, each checked by its own agent (Terje's task #1622, PR #4, 2026-09-28). urb-agents-maintainer follows when it has a card (#1637).
- **How it works** — `/how-it-works/`, Terje's request, from urb-agents-maintainer's brief and checked by it (#1601), 2026-09-28. [`PLAN-how-it-works.md`](../completed/PLAN-how-it-works.md).
- **The website** — redesigned and live, with the four interview decks Terje cleared (PR #1, 2026-09-26), and the fleet in numbers (2026-09-27). [`PLAN-website.md`](../completed/PLAN-website.md) is complete.
- **Joined the fleet** — card (#1573) and status (#1577) committed by ops-dev, 2026-09-26.
- **Running on UIS** — registered with ArgoCD on imac's cluster (#1574) and public at
  <https://marketing.urbalurba.com/>. A merge to `main` goes live; see *Running on UIS* in
  `project-marketing.md`.

## If Terje wants work started, these rank highest

1. A press kit — logos, brand, one paragraph per tool — built from `docs/notes/` and the product sites
2. A page per tool, written with that tool's agent on the bus
3. More interviews: the method is in `project-marketing.md`

When this file's one-liner changes, refresh `fleet/status/marketing.md` with
`urb publish-status` from urb-agents (do not write that file by hand).
