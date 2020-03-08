import { PlayerID, AlgorithToChooseCandidate, Game, Card } from "./Types";

// utility for card definition
export const createCard = (
  name: string,
  getCandidate: (game: Game, playerId: PlayerID) => Game[],
  repeat = (game: Game) => 1
): Card => {
  return {
    name: name,
    flags: [],
    getCandidate: getCandidate,
    play: (
      game: Game,
      playerId: PlayerID,
      algorithm: AlgorithToChooseCandidate
    ) => {
      return algorithm(name, playerId, getCandidate(game, playerId));
    },
    repeat: repeat,
    numIncrementToken: 0,
    numDecrementToken: 0
  };
};
