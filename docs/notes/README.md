# Marketing notes

Collected notes on producing visual assets for publication — screen recordings, screenshots, images, logos, brand. Each file here is a **copy** of a note that lives in another repo under `~/learn/helpers/`. The originals stay where they are; this folder is the working index.

## Video

| File | Covers | Original source |
|---|---|---|
| [`creating-recordings.md`](./creating-recordings.md) | Recording a terminal session with `asciinema`, converting to GIF with `agg`, building a teaser by trimming the `.cast` file, speed/size guidelines, embedding in markdown. | `devcontainer-toolbox/website/docs/ai-developer/CREATING-RECORDINGS.md` |
| [`screenshots-and-video.md`](./screenshots-and-video.md) | Automated capture pipeline for the Railway docs site: Playwright + headless Chromium driving the app, then `ffmpeg-static` stitching the PNGs into per-role MP4 promos with a navy caption strip. Includes wizard-validation walkthrough, admin session bootstrap, troubleshooting. | `railway/website/docs/contributors/screenshots-and-video.md` |

## Images, logos, brand

| File | Covers | Original source |
|---|---|---|
| [`images.md`](./images.md) | Tool-logo conventions (SVG source → WebP via `dev-logos`), directory layout under `static/img/tools/`, size/format requirements, ImageMagick + `rsvg-convert` basics. | `devcontainer-toolbox/website/docs/contributors/images.md` |
| [`branding.md`](./branding.md) | DCT brand identity — name/abbreviation, logo usage on light vs dark backgrounds, compact mark, social card spec (1408×752), brand colours. | `devcontainer-toolbox/website/docs/contributors/branding.md` |
| [`logo-sources.md`](./logo-sources.md) | Provenance table for every third-party tool logo used on the DCT site — official source URL and license per logo. Use this before adding a new logo. | `devcontainer-toolbox/website/static/img/LOGO-SOURCES.md` |

## Screenshot embedding conventions

| File | Covers | Original source |
|---|---|---|
| [`writing-user-docs.md`](./writing-user-docs.md) | Broader Railway user-doc style guide; relevant section is screenshot filenames, 720 px display / 1440 px source for Retina, no raw `<img>` tags. | `railway/website/docs/contributors/writing-user-docs.md` |

## Related, not copied

These exist in the source repos and are adjacent but more about site/page architecture than asset production. Linking rather than copying — open them in place if needed.

- `devcontainer-toolbox/website/docs/contributors/homepage-design.mdx` — floating-cubes hero, cube layout/animation, responsive breakpoints.
- `sovereignsky-site/docs/DESIGN-COMPONENTS.md` — design system shortcodes and tokens.
- `sovereignsky-site/docs/PAGE-LAYOUTS.md` — page layout naming and structure.

## Refreshing this folder

These are copies — they will drift from the originals. To resync, re-copy from the source paths in the tables above. If a note evolves enough that the copy is more authoritative than the original, decide explicitly which one is canonical and link the other to it.
