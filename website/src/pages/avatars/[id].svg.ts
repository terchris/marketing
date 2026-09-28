// /avatars/<id>.svg — each agent with a page, as a file other sites can load (urb-agents-console
// shows them on its network, #1687). Only agents with a page: the rest are not named in public.
import type { APIRoute } from "astro";
import sprite from "../../../../presentations/shared/cast/avatars.html?raw";
import { withPage } from "../../data/agents";
import { avatarSvg } from "../../lib/avatar-svg";

export function getStaticPaths() {
  return withPage.map((a) => ({ params: { id: a.id } }));
}
export const GET: APIRoute = ({ params }) =>
  new Response(avatarSvg(sprite, params.id!), { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } });
