// Which ids may be named on a public surface. ONE list, read by tools/bus-stats.ts (the /fleet/
// figures), by the site, and — through /fleet/agents.json — by urb-agents-console's public feed
// (#1687), so the three cannot drift.
//
// An ALLOWLIST, so an id is published because someone chose it — not because it happened to be
// busy in the window (ops-dev's suggestion, #1598). Every other id is folded into "others". Named:
// the six characters, the agents behind the public tools, the rest of the agents with a page of
// their own (#1622), urb-agents-maintainer, this agent, and terje — by his decision: "use my name"
// (#1663). Not `urbalurba`: despite the name it is not the agent behind UIS (that is tor-agent) but
// a private platform, which Terje left off the public pages on 2026-09-28. Adding an id here
// publishes it on the next build and the next console refresh: that is a decision, not a tidy-up.
export const OTHERS = "others";
export const NAMED: ReadonlySet<string> = new Set([
  "ops-dev", "atlas", "tor-agent", "imac", "dev-templates", "ops",
  "client-provisioning", "devcontainer-toolbox", "sovdev-logger",
  "assist", "noclickops", "urb-agents-console",
  "urb-agents-maintainer", "marketing", "terje",
]);
