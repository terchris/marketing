// The tools, as SovereignSky lists them on sovereignsky.no/about and the product sites. Each is
// built and maintained by its own agent in the Urbalurba fleet; `agent` is set only for the three
// whose agent is one of the six characters.
export interface Tool {
  name: string;
  short: string;
  href: string;
  what: string;
  agent?: string;
}

export const tools: Tool[] = [
  { name: "Urbalurba Infrastructure Stack", short: "UIS", href: "https://uis.sovereignsky.no/", agent: "tor-agent",
    what: "A complete datacenter on your laptop — databases, monitoring, AI and more, on your own hardware." },
  { name: "Atlas", short: "Atlas", href: "https://atlas.sovereignsky.no/", agent: "atlas",
    what: "Norwegian public data, in one place anyone can query." },
  { name: "Dev Templates", short: "Templates", href: "https://sovereignsky.no/sovereignsky/dev-templates/", agent: "dev-templates",
    what: "Production-ready project starters." },
  { name: "DevContainer Toolbox", short: "DCT", href: "https://dct.sovereignsky.no/",
    what: "A consistent development environment across every platform." },
  { name: "Client Provisioning", short: "Provisioning", href: "https://sovereignsky.no/sovereignsky/client-provisioning/",
    what: "Automated Rancher Desktop deployment for managed machines." },
  { name: "sovdev-logger", short: "Logging", href: "https://sovereignsky.no/sovereignsky/sovdev-logger/",
    what: "Structured logging with OpenTelemetry." },
];
