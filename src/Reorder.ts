import { Game, PlayerID } from "./Types";
import { updateCard } from "./updateCard";
import { asParameter, repeat, createCard } from "./utilCardImpl";

export const Reorder = () => {
  return createCard("Reorder", (game: Game, playerId: PlayerID) => {
    return repeat(asParameter(game, 1), game, (game: Game) => {
      const candidate = [game];
      game.cards.forEach((card, cardIndex) => {
        if (card.flags != []) {
          allReorder(card.flags).forEach((newFlag) => {
            const next = updateCard(game, cardIndex, (card) => ({
              ...card, flags: newFlag
            }));
            candidate.push(next);
          });
        }
      });
      return game.players[playerId].chooseFromCandidate("Reorder", candidate);
    });
  });
};

const allReorder = (flags: PlayerID[]) => {
  const digits = flags.length;
  const sum = (flags: PlayerID[]) => {
    let ret = 0;
    for (let v of flags) {
      ret += v;
    }
    return ret;
  };
  const numToFlags = (n: number) => {
    const ret = [];
    for (let i = 0; i < digits; i++) {
      ret.unshift(n % 2);
      n = Math.floor(n / 2);
    }
    return ret;
  };
  const s = sum(flags);
  const ret = [] as PlayerID[][];
  for (let i = 0; i < 2 ** digits; i++) {
    const f = numToFlags(i) as PlayerID[];
    if (sum(f) === s) {
      ret.push(f);
    }
  }
  return ret;
};
