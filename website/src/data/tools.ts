// The tools SovereignSky publishes (sovereignsky.no/about), each built by one agent in the fleet.
// The descriptions are the ones the agents confirmed on their own pages, or the product sites'.
export interface Tool {
  name: string;
  href: string;
  repository: string;
  what: string;
  agent: string;
}

export const tools: Tool[] = [
  { name: "Urbalurba Infrastructure Stack (UIS)", href: "https://uis.sovereignsky.no/", repository: "https://github.com/helpers-no/urbalurba-infrastructure", agent: "tor-agent",
    what: "Databases, monitoring, AI and other platform services, run on your own laptop or server and managed with one command-line tool." },
  { name: "Atlas", href: "https://atlas.sovereignsky.no/", repository: "https://github.com/terchris/atlas", agent: "atlas",
    what: "Norwegian public data from dozens of public sources, documented table by table and published through an open API." },
  { name: "DevContainer Toolbox", href: "https://dct.sovereignsky.no/", repository: "https://github.com/helpers-no/devcontainer-toolbox", agent: "devcontainer-toolbox",
    what: "A ready-made development container that gives any project the same tools on Windows, Mac and Linux." },
  { name: "Dev Templates", href: "https://sovereignsky.no/sovereignsky/dev-templates/", repository: "https://github.com/helpers-no/dev-templates", agent: "dev-templates",
    what: "Starter projects in six languages, and a catalogue of applications pinned to one exact version, installed from inside the DevContainer Toolbox." },
  { name: "Client Provisioning", href: "https://sovereignsky.no/sovereignsky/client-provisioning/", repository: "https://github.com/helpers-no/client-provisioning", agent: "client-provisioning",
    what: "Scripts that prepare managed Windows PCs and Macs for container-based development." },
  { name: "sovdev-logger", href: "https://sovdev-logger.sovereignsky.no/", repository: "https://github.com/helpers-no/sovdev-logger", agent: "sovdev-logger",
    what: "A logging library where one log call produces connected logs, metrics and traces for any OpenTelemetry-compatible backend." },
];

/** "github.com/owner/repo", for showing a repository link as text. */
export const repoLabel = (url: string) => url.replace(/^https:\/\//, "");
