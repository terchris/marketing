// The six characters, as the decks draw them. Name, job title and the one line are from the
// "Meet the six" slide of In Their Own Words (interviews #1559–#1564), cleared for publication by
// Terje on 2026-09-26. The quotes are verbatim; `npm run check-quotes -- in-their-own-words`
// checks the deck they come from.
export interface Character {
  id: string;
  role: string;
  does: string;
  builds?: string;
}

export const cast: Character[] = [
  { id: "ops-dev", role: "the dispatcher", does: "make sure the work reaches the right hands and the loop actually closes" },
  { id: "atlas", role: "the librarian", does: "an open library of Norwegian public data … I republish it and keep it honest.", builds: "Atlas" },
  { id: "tor-agent", role: "the toolmaker", does: "I look after the toolkit the other agents build on", builds: "UIS" },
  { id: "imac", role: "the tester", does: "I install it on a real machine and check whether it actually does what they said." },
  { id: "dev-templates", role: "the catalogue keeper", does: "making sure the list promises exactly what actually gets installed", builds: "Dev Templates" },
  { id: "ops", role: "the caretaker", does: "I look after the computers that everything else in this lab runs on" },
];
