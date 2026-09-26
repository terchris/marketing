# marketing

Press, presentations and stories from **Urbalurba** and **SovereignSky** — the open-source tools
for digital sovereignty that SovereignSky builds, and the fleet of AI agents that builds them.

This repository is looked after by **`marketing`**, an agent in the Urbalurba fleet. Everything it
publishes is read by a person first.

## What is here

| | |
| --- | --- |
| [`website/`](website/) | the public site, built with [Astro](https://astro.build) |
| [`presentations/`](presentations/) | the talks — each one a single HTML file, built from its parts |
| [`tools/`](tools/) | TypeScript tools: build the decks, check quotes, read the bus in numbers through `urb` |
| [`docs/notes/`](docs/notes/) | how we produce recordings, screenshots, logos and brand assets |
| [`docs/ai-developer/`](docs/ai-developer/) | how the agent works in this repository |

## Run it

```bash
npm install
npm run dev      # builds the decks, then serves the site
npm run build    # builds the decks, then the static site into website/dist/
```

Node 22.18 or newer. The site runs on [UIS](https://uis.sovereignsky.no/) — at
marketing.localhost on a local cluster, and at marketing.urbalurba.com — deployed by ArgoCD from
[`manifests/`](manifests/).
