import { Game } from "./Game";
import { AlgorithToChooseCandidate, PlayerID } from "./Types";
import { debugPrint } from "./debugPrint";

export const HumanPlayer: AlgorithToChooseCandidate = async (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  if (candidate.length === 1) {
    return candidate[0];
  }

  const p: Promise<number> = new Promise(resolve => {
    console.log("promise called", resolve);
    // @ts-ignore
    window.resolve = resolve;
  });
  console.log("---");
  candidate.forEach((game, index) => {
    console.log(`candidate ${index}`);
    debugPrint(game);
    console.log("---");
  });
  const result = candidate[await p];
  return result;
};
