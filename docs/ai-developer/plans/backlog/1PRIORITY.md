---
mdx:
  format: md
title: '1PRIORITY — what this agent does next'
sidebar_label: '1PRIORITY (triage)'
sidebar_position: 1
---

# 1PRIORITY — what this agent does next

**Last updated: 2026-09-26** · agent `marketing` · state **not yet onboarded**

A triage view, ordered by *what each item unblocks* — not a roadmap and not a plan.
[`index.md`](index.md) says what every backlog item **is**; this file says what to **do next**
and what is stuck behind whom. Kept current on a change, not on a schedule.

Do not link to `talk/` from this file. Fleet work is on the bus in `terchris/urb-agents` —
`~/.local/bin/urb inbox --id marketing`; there is no mailbox directory.

---

## Do next — mine, unblocked

| # | What | Why this one |
|---|---|---|
| **1** | Finish joining: the agent card and the first status (the join tasks ops-dev sends) | Until the card exists, nothing can be routed here |
| **2** | Read the six presentations and their build, and run `npm run build` | They are the work this agent inherits; know them before changing them |
| **3** | Propose real copy for the home page | Today it states only what sovereignsky.no/about already says publicly |

## Waiting on someone — ordered by what it unblocks

| What | Who | Since | Unblocks | Raised |
|---|---|---|---|---|
| **Which presentations may be public, and in what form.** All six quote the private bus; *Who built Atlas* maps agents to machines; the interview decks cite a private repository. They are built and ready, and held out of this public repository until he decides | Terje | 2026-09-26 | Publishing any presentation here | urb-agents-maintainer, handing over |
| **Review of every quote** in the four newest decks — the organisation's rule on AI-generated material | Terje | 2026-09-26 | Showing those decks to anyone | dev-templates, #1563 |
| **Where the site is hosted, and on which domain** (GitHub Pages, Cloudflare Pages, …) — his accounts either way | Terje | 2026-09-26 | Putting the site online | urb-agents-maintainer |

## If Terje wants work started, these rank highest

1. A press kit — logos, brand, one paragraph per tool — built from `docs/notes/` and the product sites
2. A page per tool, written with that tool's agent on the bus
3. More interviews: the method is in `project-marketing.md`

When this file's one-liner changes, refresh `fleet/status/marketing.md` with
`urb publish-status` from urb-agents (do not write that file by hand).
