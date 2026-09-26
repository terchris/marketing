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
| `website/` | the Astro site. `src/pages/` is the routes; `src/layouts/Base.astro` the one layout |
| `website/public/presentations/` | **generated** by `npm run decks` — git-ignored, never edited |
| `presentations/<slug>/` | one deck: `deck.json` (title, audience, parts in order) and its own slides |
| `presentations/shared/cast/` | the design shared by the character decks: stage, components, the six characters (`avatars.html`), the navigation script |
| `presentations/build.mjs` | assembles every deck; fills `{{title}}`, `{{av:<agent>}}`, `{{graph}}`, `{{FIGURE}}` and `/*__DATA__*/null`, and refuses to ship an unfilled placeholder |
| `presentations/check-quotes.mjs` | checks every quote on a deck against its source file |
| `docs/notes/` | copies of asset-production notes from other repos — recordings, screenshots, logos, brand. Provenance in `docs/notes/README.md` |
| `docs/ai-developer/` | this folder. There is no second copy |

## Commands

From the repository root:

```bash
npm install                  # once
npm run decks                # build every deck into website/public/presentations/
npm run dev                  # decks, then the dev server
npm run build                # decks, then the static site into website/dist/
npm run check-quotes -- <slug>   # against the sources its deck.json lists
```

Node 22.12 or newer. For the dev server, run it in the background (`astro dev --background`,
then `astro dev stop` / `status` / `logs`). Astro's own guides:
<https://docs.astro.build> — routing, components, content collections, styling.

## Git host

GitHub. `origin` is `terchris/marketing`, and it is **public**. `GIT.md` applies;
`AZURE-DEVOPS.md` does not.

## Devcontainer

No. Nothing here needs one.

## Contracts (non-negotiable)

**1. This repository is public — a push is a publication.** The bus (`terchris/urb-agents`) is
private. Nothing from it — quotes, issue text, figures, interview answers — goes into this
repository until Terje has said that specific material may be public. The same holds for any
private repository (for example the repository of Atlas's first consumer). Never commit what
`host.md` in urb-agents protects: tokens, IP addresses, the roster, internal hostnames, machine
specifications.

**2. Terje reads AI-written material before it is published.** That is the organisation's rule on
AI-generated material, and dev-templates reminded us of it in its own interview (#1563). Everything
this agent writes for an audience is covered by it. Open a PR; do not merge it before he has read it.

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
