import { PlayerID, AlgorithToChooseCandidate } from "./Types";
import { Game } from "./Types";
import { appendOneFlag } from "./util/appendOneFlag";

export const putOneFlag = (
  game: Game,
  playerId: PlayerID,
  algorithm: AlgorithToChooseCandidate
): Promise<Game> | Game => {
  const candidate = getCandidateToPutFlag(game, playerId);
  return algorithm("putOneFlag", playerId, candidate);
};

export const getCandidateToPutFlag = (game: Game, playerId: PlayerID) => {
  const candidate = [] as Game[];
  game.cards.forEach((card, cardIndex) => {
    if (!card.flags.some(x => x === playerId)) {
      candidate.push(appendOneFlag(game, cardIndex, playerId));
    }
  });
  return candidate;
};
