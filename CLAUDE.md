# CLAUDE.md

This repo (`marketing`) is the marketing and press repository for Urbalurba and SovereignSky: the Astro website, the presentations, and the stories told about the tools and the agent fleet that builds them.

The repo uses the URB AI-developer workflow. **Before doing anything else, read the docs in
[`docs/ai-developer/`](docs/ai-developer/).**

## Start here (in order)

1. **``docs/ai-developer/project-marketing.md``** —
   the authoritative description of *this* repo: what it is, where code lives, which commands to
   run, which framework docs apply, and the non-negotiable contracts. **Read this first.**
2. **[`docs/ai-developer/README.md`](docs/ai-developer/README.md)** — how the AI-developer
   system works and the full reading order.
3. Reference these as needed — **only if `project-*.md` says they apply**:
   - `WORKFLOW.md` — idea → plan → implementation
   - `PLANS.md` — plan/investigation structure
   - `GIT.md` — git safety; GitHub `gh` vs Azure DevOps `az`
   - `AZURE-DEVOPS.md` — only if `origin` is Azure DevOps
   - `WORKTREE.md`, `DEVCONTAINER.md`
   - `SECURITY.md` — before writing anything sensitive into a published site

**Fleet coordination is not in this repo.** The protocol lives in `terchris/urb-agents`
(`protocol/communication.md`), read remotely — do not clone urb-agents and do not copy `protocol/`
here. This agent's inbox is a **query, not a directory**: `urb inbox --id marketing`, which
is open issues labelled `to:marketing`. See ``COORDINATION.md``
for where `gh` applies and where `urb` does.

**There is no file bus.** `talk/`, `TALK.md` and `mailboxes/` were all retired; nothing reads them.
If you find one in your project repo, delete it — unless it is a **product** document that happens
to be called `TALK.md` (for example under `website/docs/` or `docs/`), which is yours to keep.

Plans live in [`docs/ai-developer/plans/`](docs/ai-developer/) (`backlog/`, `active/`,
`completed/`). Current triage is ``docs/ai-developer/plans/backlog/1PRIORITY.md``.
Keep it true on a change, not on a timer.

## Never — the rules that survive a restart

These are in full in [`docs/ai-developer/project-marketing.md`](docs/ai-developer/project-marketing.md).
They are here too because this repository is **public**: a push is a publication.

- **Never publish bus content without Terje.** The bus (`terchris/urb-agents`) is private.
  Quotes, issue text, figures and interview answers from it go into this repository only after
  Terje has said that specific material may be public.
- **Never publish AI-written text for an audience before Terje has read it.** That is the
  organisation's rule on AI-generated material, and everything this agent writes is covered by it.
- **Never commit what `host.md` protects** — tokens, IP addresses, the roster, internal hostnames,
  machine specifications — nor anything from a private repository.
- **Never reword a quote.** Cut with "…", never paraphrase inside quotation marks, never insert
  words in brackets. Run `npm run check-quotes` against the source before a deck ships.
- **Never type a number from memory** — count it from the record, and check an agent's own count
  before repeating it. Agents miscount their own work; three did in one week.
- **Credit the decision to whoever made it.** An agent writing down a rule is not the author of
  the rule.
