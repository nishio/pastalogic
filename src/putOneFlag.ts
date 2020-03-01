import { updateCard } from "./updateCard";
import { Game, PlayerID } from "./Types";
export const putOneFlag = (game: Game, playerId: PlayerID): Game => {
  const candidate = [];
  for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
    if (!game.cards[cardIndex].flags.some((x) => (x === playerId))) {
      const next = updateCard(game, cardIndex, (card) => ({
        ...card, flags: [...card.flags, playerId]
      }));
      candidate.push(next);
    }
  }
  return game.players[playerId].chooseFromCandidate("putOneFlag", candidate);
};
