import { Game, PlayerID } from "../Types";

const start = (candidateOfOpponent: Game[], me: PlayerID) => {};

onmessage = (e: any) => {
  console.log("webworker called", e);
  if (e.data.type === "start") {
    start(e.data.candidateOfOpponent, e.data.mySide);
  }
  // // @ts-ignore
  // postMessage(result);
};
