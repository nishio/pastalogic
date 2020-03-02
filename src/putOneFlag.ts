import { Game, PlayerID } from "./Types";
import { appendOneFlag } from "./util";

export const putOneFlag = (game: Game, playerId: PlayerID): Game => {
  const candidate = [] as Game[];
  game.cards.forEach((card, cardIndex) => {
    if (!card.flags.some((x) => (x === playerId))) {
      candidate.push(appendOneFlag(game, cardIndex, playerId));
    }
  })

  return game.players[playerId].chooseFromCandidate("putOneFlag", candidate);
};

