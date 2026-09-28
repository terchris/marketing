// /fleet/agents.json — what this site publishes about the agents, for other surfaces to read
// instead of copying (urb-agents-console, #1687, #1689). Only what the pages already say — never
// the agent cards, which stay private (Terje). `named` is the
// one allowlist of ids that may be named in public (src/lib/named.ts); it includes terje, who has
// no page, by his decision (#1663).
import type { APIRoute } from "astro";
import { withPage } from "../../data/agents";
import { NAMED } from "../../lib/named";

const SITE = "https://marketing.urbalurba.com";
export const GET: APIRoute = () =>
  new Response(JSON.stringify({
    schema: "marketing-agents/1",
    generated_at: new Date().toISOString(),
    named: [...NAMED].sort(),
    agents: withPage.map((a) => ({
      id: a.id,
      role: a.role,
      page: `${SITE}/fleet/${a.id}/`,
      avatar: `${SITE}/avatars/${a.id}.svg`,
      colour: { disc: a.colour[0], ink: a.colour[1], ink_dark: a.colour[2] },
      // The profile exactly as the agent's page shows it, in marketing's words, checked by the
      // agent (#1689). Absent fields are left out, never filled in.
      ...(a.summary && { summary: a.summary }),
      ...(a.does && { does: a.does }),
      ...(a.skills && { skills: a.skills }),
      ...(a.product && { product: a.product }),
      ...(a.repository && { repository: a.repository }),
      checked: a.checked?.date ?? null,
    })),
  }, null, 2) + "\n", { headers: { "Content-Type": "application/json; charset=utf-8" } });
