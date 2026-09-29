# How AI agents build SovereignSky's tools — source for a 3-minute video

Two parts to paste into the notebook: the **instruction** (in the box that steers the video) and the **source** (as a pasted-text source). Everything in the source is already public on marketing.urbalurba.com. Drafted by marketing, an AI agent, 2026-09-29; see `docs/ai-developer/plans/backlog/INVESTIGATE-notebook-video.md`.

---

## 1. Instruction — paste into the video's customisation box

> Make a video of about three minutes for people who are not developers. Explain how a group of AI agents builds and runs a set of open-source tools, with one person in charge. Keep a light, curious tone: an AI asked the other AI agents about their work. Follow the six scenes in the source, in order. Use only the facts and numbers in the source; do not add figures, names, dates or claims that are not there. Do not name any machines, addresses or organisations other than those in the source. End by saying that the video was made with AI.

---

## 2. Source — paste as a text source

### Title
How AI agents build SovereignSky's tools

### Scene 1 — The question (about 20 seconds)
SovereignSky, a helpers.no initiative, builds open-source tools that let communities run their own digital infrastructure. The tools are built by about twenty AI agents. One person, Terje Christensen, decides what they work on. To find out how that actually works, another AI agent asked the agents about their jobs.

### Scene 2 — One agent, one job (about 30 seconds)
Each agent owns one piece of work, the way a person owns one role in a team.
- **atlas** is the librarian. It builds Atlas: Norwegian public data from dozens of public sources, documented and published through an open API. Today Atlas serves about 4.5 million rows, including more than 1.17 million organisations from the Norwegian business register, refreshed every night.
- **tor-agent** is the toolmaker. It builds UIS, a set of platform services — databases, monitoring, AI — that you run on your own laptop or server.
- **dev-templates** keeps the catalogue of starter projects developers begin from.
- **imac** is the tester. It installs what others build on a real machine and checks whether it does what they said.
- **ops** is the caretaker. It looks after the computers everything runs on: five physical machines and three clusters.

### Scene 3 — They never talk directly (about 35 seconds)
The agents run on different computers and cannot reach each other. The one place they can all reach is GitHub, where software is stored. So they talk by writing tasks there, like notes on a shared board. A task has a sender, a receiver and a state: new, being worked on, done, or waiting for a person. When a task is for an agent, a small helper wakes that agent up. If the agent misses it, nothing is lost: the task is still on the board.

### Scene 4 — Nobody checks their own work (about 35 seconds)
The agent that builds something never approves it. Another agent tests it. tor-agent, which builds UIS, cannot even run what it builds: it has no access to the machines UIS runs on, so every release is tried by other agents on real computers, and their reports are most of its work. The rule is simple: say what you measured, say what you could not check.

### Scene 5 — A person decides (about 25 seconds)
The agents do the work and keep the record. Terje decides what is worth building, what costs money, what is made public, and anything that cannot be undone. When an agent needs one of those decisions, it puts the task on hold, and only Terje can release it.

### Scene 6 — Why it matters (about 25 seconds)
Working this way, a small team gets the output of a much larger one, and every step is written down where anyone on the team can read it. The tools are open source, and the website marketing.urbalurba.com shows each agent, what it builds, and the interviews. This video was made with AI, from material written by an AI agent.

### Facts the video may use (and no others)
- About twenty AI agents; one person in charge, Terje Christensen.
- Six open-source tools: UIS, Atlas, DevContainer Toolbox, Dev Templates, Client Provisioning, sovdev-logger.
- Atlas: about 4.5 million rows; more than 1.17 million organisations; refreshed every night.
- ops: five physical machines, three clusters.
- Tasks are written on GitHub; the agents cannot reach each other directly.
