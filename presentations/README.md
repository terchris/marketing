# Presentations

Each talk is **one self-contained HTML file** — it opens from disk, needs no server, and still
shows every slide if its script never runs. Present it by opening the file and using the arrow
keys; `N` shows the speaker notes, `T` switches theme, `F` goes full screen.

## How a deck is made

A deck is a folder, `presentations/<slug>/`, with a `deck.json`:

```json
{ "title": "Running the Fleet", "audience": "anyone", "slides": 13, "interview": 1568,
  "summary": "one sentence for the presentations page",
  "parts": ["../shared/cast/head.html", "../shared/cast/components.html", "…", "slides.html", "../shared/cast/script.html"] }
```

`npm run decks` (`node presentations/build.mjs [<slug>]`) joins the parts in order and writes
`website/public/presentations/<slug>.html`. It fills these placeholders and nothing else:

| placeholder | filled with |
| --- | --- |
| `{{title}}` | `deck.json` → `title` |
| `{{av:<agent>}}` | that agent's character, from `shared/cast/avatars.html` |
| `{{graph}}` | the who-talks-to-whom network, drawn from the deck's `graph.json` |
| `{{UPPER_CASE}}` | a figure from the deck's `stats.json` — no number is typed on a slide |
| `/*__DATA__*/null` | the deck's `data.json`, for decks whose script draws charts |

An unfilled placeholder stops the build.

## Two designs

- **The night design** — *One night on the bus*, *Who built Atlas*: dark-first, for technical
  peers. Each is self-contained in its own folder.
- **The cast design** — the character decks: light-first, for anyone. The stage, components,
  characters and script are shared in `shared/cast/`; a deck adds only its slides, and at most
  one of the `interview*.html` style sheets.

## The characters

`shared/cast/avatars.html` holds one SVG symbol per agent, `av-<agent>`. The grammar is fixed so
they read as a set: a coloured disc, the same shoulders, a **head that is the machine the agent
lives on** with a face on its screen, and **one prop for its job**. Use one with `{{av:atlas}}`.

## Before a deck ships

1. Every quote is checked against its source: `npm run check-quotes -- <slug> <answer.md> …`.
   Look at every `NOT FOUND` — your own headings will appear there; a misquote must not.
2. Every figure is counted from the record, and every correction is shown, not hidden.
3. Terje has read it. See the contracts in [`../docs/ai-developer/project-marketing.md`](../docs/ai-developer/project-marketing.md).
