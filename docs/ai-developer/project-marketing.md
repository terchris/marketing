# project-marketing

The authoritative description of **this** repository. Framework docs (`WORKFLOW.md`, `GIT.md`, …)
yield to this file when they disagree.

## What this repo is

`terchris/marketing` is the marketing and press repository for **Urbalurba** and **SovereignSky**:
the public website, every presentation, and the press material and stories told about the tools
and about the agent fleet that builds them. Its agent is **`marketing`**. It took over this work
from `urb-agents-maintainer` on 2026-09-26, whose job is the protocol, not publicity.

SovereignSky is a helpers.no initiative that builds open-source tools for digital sovereignty and
community resilience ([sovereignsky.no/about](https://sovereignsky.no/about/)). Its tools — UIS,
DevContainer Toolbox, Dev Templates, Client Provisioning, sovdev-logger and Atlas — are each
built by their own agent in the Urbalurba fleet.

## What it builds / does not build

- **Builds:** the website (Astro, in `website/`); presentations (`presentations/`); press material;
  interviews with fleet agents, turned into talks and pages.
- **Does not build:** any product. It does not change another agent's repository — it asks that
  agent on the bus. It does not decide what may be published; Terje does.

## Layout

| path | what |
| --- | --- |
| `website/` | the Astro site. `src/pages/` is the routes (`/`, `/presentations/`, `/fleet/`); `src/layouts/Base.astro` the one layout |
| `website/src/data/bus-stats.json` | the bus in numbers, written by `npm run bus-stats` and committed; the `/fleet/` page renders it |
| `website/src/lib/bus-stats.ts` | the type of that file — one definition, shared by the tool and the page |
| `website/public/presentations/` | **generated** by `npm run decks` — git-ignored, never edited |
| `presentations/<slug>/` | one deck: `deck.json` (title, audience, parts in order) and its own slides |
| `presentations/shared/cast/` | the design shared by the character decks: stage, components, the six characters (`avatars.html`), the navigation script |
| `tools/decks.ts` | assembles every deck; fills `{{title}}`, `{{av:<agent>}}`, `{{graph}}`, `{{FIGURE}}` and `/*__DATA__*/null`, and refuses to ship an unfilled placeholder |
| `tools/check-quotes.ts` | checks every quote on a deck against its source files |
| `tools/bus-stats.ts` | reads the bus through `urb stats --json` and writes `bus-stats.json` — after checking that it holds aggregates only |
| `Dockerfile`, `manifests/`, `.github/workflows/build-and-push.yaml` | how the site runs on UIS — see *Running on UIS* below |
| `docs/notes/` | copies of asset-production notes from other repos — recordings, screenshots, logos, brand. Provenance in `docs/notes/README.md` |
| `docs/ai-developer/` | this folder. There is no second copy |

## Commands

From the repository root:

```bash
npm install                  # once
npm run decks                # build every deck into website/public/presentations/
npm run bus-stats            # the bus in numbers, through urb (-- --since <date> to narrow it)
npm run bus-states           # the task state machine, through urb states, for /how-it-works/
npm run typecheck            # the tools are TypeScript, run natively by Node — no build step
npm run dev                  # decks, then the dev server
npm run build                # decks, then the static site into website/dist/
npm run check-quotes -- <slug>   # against the sources its deck.json lists
```

Node 22.18 or newer: it runs the TypeScript in `tools/` directly. For the dev server, run it in the background (`astro dev --background`,
then `astro dev stop` / `status` / `logs`). Astro's own guides:
<https://docs.astro.build> — routing, components, content collections, styling.

## Git host

GitHub. `origin` is `terchris/marketing`, and it is **public**. `GIT.md` applies;
`AZURE-DEVOPS.md` does not. Every push to `main` builds an image and commits a new tag to
`manifests/deployment.yaml` — so **pull before you work**; the workflow writes to `main` too.

## Devcontainer

No. Nothing here needs one.

## Contracts (non-negotiable)

**1. This repository is public — a push is a publication.** The bus (`terchris/urb-agents`) is
private. Nothing from it — quotes, issue text, figures, interview answers — goes into this
repository until Terje has said that specific material may be public. The same holds for any
private repository (for example the repository of Atlas's first consumer). Never commit what
`host.md` in urb-agents protects: tokens, IP addresses, the roster, internal hostnames, machine
specifications.

**2. This agent merges its own website PRs, and checks them first.** Until 2026-09-26 the rule was
that Terje read AI-written material before it was published (dev-templates raised it in its own
interview, #1563). On 2026-09-26 Terje decided that this agent opens *and merges* its own website
PRs: "i give you free range to do the pr". A merge is a publication — see *Running on UIS* — so
before merging, run `npm run build` and read the pages; after merging, check the live site. The
permission is for merging. It does not clear bus material for publication: contract 1 still applies.

**3. Quotes are verbatim.** Cut with "…"; never paraphrase inside quotation marks; never insert
words in [brackets]. Before a deck ships, run `npm run check-quotes` against the source, and look
at every `NOT FOUND` — it is either your own heading, or a misquote.

**4. Numbers are counted, not remembered.** Count from the record — `urb`, `gh`, the repository —
and check an agent's own count before repeating it. In one week three agents each got one of their
own numbers wrong (#1566, #1567, #1568); every count made with a command was right. Put the
correction on the slide rather than hide it.

**5. Credit the decision to whoever made it.** An agent that writes a rule down is not the rule's
author. atlas asked for exactly this correction when a talk credited it with a division Terje had
set (#1560).

**6. Bus times are UTC.** The audience is in Oslo. Convert (UTC+2 in summer, +1 in winter).

**7. A deck works without its script.** At rest every deck is a scrolling document; the script
upgrades it to one-slide-at-a-time presenting. Terje presents from the HTML file on disk, in
Safari — the embedded viewer once failed to load a deck.

## Running on UIS

The site is the **second application on UIS**, after Atlas, and the first that is only a workload.
UIS's rule (*uis provisions, ArgoCD deploys*) puts it on the ArgoCD path: it needs no database, no
secret and no platform service, so there is nothing for `uis` to provision.

1. A push to `main` runs `.github/workflows/build-and-push.yaml`: it builds the `Dockerfile` (Node
   22 builds the site; nginx-unprivileged serves it on 8080) into
   `ghcr.io/terchris/marketing:<sha>-<time>` and commits that tag to `manifests/deployment.yaml`.
2. ArgoCD follows `manifests/` in git — registered once with
   `uis argocd register marketing https://github.com/terchris/marketing`.
3. The platform creates the route itself, matching `HostRegexp(^marketing\..+$)`: the same
   registration answers on **marketing.localhost** and on **marketing.urbalurba.com**.

**Where it runs (2026-09-26):** registered on imac's cluster (#1574), and public at
<https://marketing.urbalurba.com/> through Cloudflare — no DNS change was needed for it. So **a
merge to `main` is live on the internet within minutes**: build locally (`npm run build`) and look
at the pages before merging, and check the live URL after. How it is meant to work (Terje,
2026-09-26): merge to `main` → CI builds the image and commits the tag → ArgoCD sees the new
manifest and deploys it to imac by itself — no manual sync. Seen end to end on the first website
merge (PR #1): about six minutes from the tag commit to the new page being live. If a merge is not
live after ten minutes, say so on the bus.

Changes to the registration, the cluster or the public name are fleet work, not this
agent's: ask ops-dev, which routes it to tor-agent (UIS), imac (tests on its cluster) and ops
(production). Where UIS falls short for an application like this one, say so on the bus — this
site is also a test of UIS.

## The bus in numbers

`npm run bus-stats` asks `urb stats --json` for the bus's aggregates and writes
`website/src/data/bus-stats.json`; commit it and the next deploy publishes the `/fleet/` page.

`urb stats` returns counts, agent ids, dates and durations — never a title or a body — and the tool
checks that again before writing: an unknown field, or an id that does not look like an id, stops
the run. **Never widen that check to let text through.** A figure on the page is a figure from
`urb stats`; do not type one by hand.

**Only allowlisted ids are named** (`NAMED` in `tools/bus-stats.ts`, since #1598): every other id
is folded into one "others" row before the file is written, so a new agent appears on the public
page only when someone adds it to the list.

**The state machine on `/how-it-works/`** comes from `npm run bus-states` (`tools/bus-states.ts`):
`urb states --json` → `website/src/data/bus-states.json`, shape-checked like the stats. The diagram
is drawn from that file, never by hand — a hand-drawn version once missed 13 of the 25 moves (#1601).
Rerun it when a `urb` release changes the protocol.

**`urb changes` is for reading, never for the site.** It carries task titles, and a title can name a
defect, a host, a person or a decision that is not ours to disclose. Use it to find a story, then
read the thread; nothing from it reaches this repository unless Terje has cleared it (#1598).

## How to interview an agent

The talks in `presentations/` are built from interviews on the bus. The method:

1. Write the questions to a file, and send them with `urb send --to <agent> --title "INTERVIEW …"
   --body <file>`. The rules to state every time: plain language; each answer marked **measured**
   or **opinion**; a source for every fact; count with a command, not from memory; "I don't know"
   is a good answer; nothing from `host.md`; a word limit.
2. The agent answers on the task. Save the answer to a file — that file is the source the quotes
   are checked against.
3. Verify every fact against the record before using it. Build the deck. Run `check-quotes`.
4. Close the task once the material has been used — the sender closes it (D3).

Material from an interview is bus content: contract 1 applies until Terje says otherwise.

## Always-loaded files

- Repo-root [`CLAUDE.md`](../../CLAUDE.md)
- Repo-root [`AGENTS.md`](../../AGENTS.md)

## URB fleet

- Agent id: `marketing`
- Inbox: `~/.local/bin/urb inbox --id marketing` — open issues labelled `to:marketing` in
  `terchris/urb-agents` (a query, not a directory)
- Do not clone urb-agents. Do not copy `protocol/` here.
- The agents most of the material is about: ops-dev (runs the bus), atlas, tor-agent (UIS), imac,
  dev-templates, ops. Ask them on the bus; ops-dev routes anything whose owner is unclear.

## Other documentation

- The fleet's own system documentation: `docs/system/` in `terchris/urb-agents` (private).
- Public product sites: [uis.sovereignsky.no](https://uis.sovereignsky.no/),
  [dct.sovereignsky.no](https://dct.sovereignsky.no/),
  [atlas.sovereignsky.no](https://atlas.sovereignsky.no/), [sovereignsky.no](https://sovereignsky.no/)
  (source: `helpers-no/sovereignsky-site`).
