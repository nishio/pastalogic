import { Card } from "./Card";
import { AlgorithToChooseCandidate, CursorDirection } from "./Types";
import { Game } from "./Game";
export const createGame = (initialLife: number, algorithm0: AlgorithToChooseCandidate, algorithm1: AlgorithToChooseCandidate, cards: Card[], maxFlag = 10, maxLife = 6): Game => {
  let game = {
    cursor: {
      cardIndex: 0,
      flagIndex: 0,
      repeatIndex: 1,
    },
    returnAddress: null,
    maxFlag: maxFlag,
    maxLife: maxLife,
    cursorDirection: "forward" as CursorDirection,
    time: 0,
    players: [
      { life: initialLife, color: "red", chooseFromCandidate: algorithm0 },
      { life: initialLife, color: "blue", chooseFromCandidate: algorithm1 },
    ],
    cards: cards,

  };
  return game;
};
