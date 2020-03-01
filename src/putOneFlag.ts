import { Game, PlayerID } from "./Types";
import { appendOneFlag, consumeOneFlag } from "./util";

export const putOneFlag = (game: Game, playerId: PlayerID): Game => {
  const candidate = [] as Game[];
  game.cards.forEach((card, cardIndex) => {
    if (!card.flags.some((x) => (x === playerId))) {
      let next = appendOneFlag(game, cardIndex, playerId);
      candidate.push(consumeOneFlag(next, playerId));
    }
  })

  return game.players[playerId].chooseFromCandidate("putOneFlag", candidate);
};

