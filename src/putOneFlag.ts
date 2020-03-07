import { PlayerID, AlgorithToChooseCandidate } from "./Types";
import { Game } from "./Game";
import { appendOneFlag } from "./util";

export const putOneFlag = (
  game: Game,
  playerId: PlayerID,
  algorithm: AlgorithToChooseCandidate
): Promise<Game> | Game => {
  const candidate = [] as Game[];
  game.cards.forEach((card, cardIndex) => {
    if (!card.flags.some(x => x === playerId)) {
      candidate.push(appendOneFlag(game, cardIndex, playerId));
    }
  });

  return algorithm("putOneFlag", playerId, candidate);
};
