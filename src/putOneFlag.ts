import { updateCard } from "./updateCard";
import { Game, PlayerID } from "./Types";

export const putOneFlag = (game: Game, playerId: PlayerID): Game => {
  const candidate = [] as Game[];
  game.cards.forEach((card, cardIndex) => {
    if (!card.flags.some((x) => (x === playerId))) {
      const next = updateCard(game, cardIndex, (card) => ({
        ...card, flags: [...card.flags, playerId]
      }));
      candidate.push(next);
    }
  })

  return game.players[playerId].chooseFromCandidate("putOneFlag", candidate);
};
