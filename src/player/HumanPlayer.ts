import { Game } from "../Types";
import { AlgorithToChooseCandidate, PlayerID } from "../Types";
import { debugPrint } from "../debugPrint";
import { setGlobal } from "reactn";
import { popLog } from "../GLOBAL_STATE";

const USE_CONSOLE = false;
export const HumanPlayer: AlgorithToChooseCandidate = async (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  if (candidate.length === 1) {
    return candidate[0];
  }

  const p: Promise<number> = new Promise(resolve => {
    //console.log("promise called", resolve);
    // @ts-ignore
    window.resolve = resolve;
  });

  if (USE_CONSOLE) {
    console.log("---");
    candidate.forEach((game, index) => {
      console.log(`candidate ${index}`);
      debugPrint(game);
      console.log("---");
    });
  }

  setGlobal(g => ({
    log: [...g.log, candidate]
  }));
  const result = candidate[await p];
  popLog();
  return result;
};

export const chooseByHuman = (i: number) => {
  return () => {
    // @ts-ignore
    window.resolve(i);
  };
};
