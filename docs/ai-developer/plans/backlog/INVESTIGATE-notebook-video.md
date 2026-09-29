# INVESTIGATE — a 3-minute video, made in Google's notebook tool, on how the agents develop the applications

How to get a short, non-technical video out of the notebook Terje already uses, explaining how the fleet's agents build the SovereignSky tools.

## Status: Backlog

**Last Updated**: 2026-09-29

**Asked by**: Terje, 2026-09-29: "start investigation on how we can create a 3 minute video about how the different applications are developed by the agents. we need to end up with a script that the notebook can use." He has used the notebook before, to explain complex things to non-technical people.

---

## What was checked

- **Access:** the notebook link redirects to a Google login (`302 → notebook.google.com/login`). marketing has no Google account and should not get one, so it **cannot open, fill or generate in the notebook**. Terje pastes; marketing writes.
- **How the notebook makes a video.** *Not verified here* — from general knowledge, to be confirmed by Terje in the tool:
  - it builds a narrated overview from the **sources** in the notebook, not from a script read word for word;
  - it takes a short **instruction** (audience, focus, what to leave out), and possibly a length or format choice;
  - it writes its own narration, so the result will paraphrase and may drift from the sources.

  So "a script the notebook can use" means **two things**: a source document that holds only what may be said, and an instruction that steers it.

## Options

| | how | for | against |
|---|---|---|---|
| **A. Source + instruction** (recommended) | one source document written as a 3-minute story, plus a steering prompt | uses the tool as designed; quick to redo | the narration is the tool's, so every run must be watched for invented facts |
| B. Source = the website | add marketing.urbalurba.com pages as sources | no writing | the site is a reference, not a story; the tool picks what to stress |
| C. No notebook | marketing writes the narration, Terje records it over the site | every word controlled | not the tool Terje asked for; more of his time |

## Risks

1. **Invented facts.** The tool will fill gaps. The source must state every figure it may use, and nothing else numeric; Terje watches the result against it before showing it.
2. **What goes to Google.** Anything pasted in is sent to an outside service. The source uses **only material already public on marketing.urbalurba.com** — no bus content, no interview answers beyond what the site shows, nothing from `host.md`.
3. **AI-generated video.** The organisation's rules say AI-generated video should not be used externally. Terje has said this is a test lab and the rules do not apply; noted here once, and the video should say it is AI-made.

## Recommendation

Option A. The draft source and instruction are in [`docs/video/notebook-source.md`](../../../video/notebook-source.md). Terje pastes both, generates, watches it against the source, and sends back what drifted; marketing tightens the source.

## Next

- [ ] Terje: paste, generate, report what the tool offers (length, format) and what it got wrong
- [ ] marketing: revise the source from that; turn this into a PLAN if more than one round is needed
