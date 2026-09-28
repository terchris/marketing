// One character as a standalone SVG file, cut from the sprite in presentations/shared/cast/
// avatars.html — the same drawing the site and the decks use, so there is no second copy to drift.
export function avatarSvg(sprite: string, id: string): string {
  const m = sprite.match(new RegExp(`<symbol id="av-${id}" viewBox="0 0 200 200">([\\s\\S]*?)</symbol>`));
  if (!m) throw new Error(`no avatar for ${id} in avatars.html`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">${m[1]}</svg>\n`;
}
