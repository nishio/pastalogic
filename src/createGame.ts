import {
  AlgorithToChooseCandidate,
  CursorDirection,
  Card,
  Game
} from "./Types";
export const createGame = (
  initialLife: number,
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate,
  cards: Card[],
  maxFlag = 10,
  maxLife = 6,
  numInitialFlag = 5
): Game => {
  let game: Game = {
    // common initial value
    cursor: {
      cardIndex: 0,
      flagIndex: 0,
      repeatIndex: 1
    },
    returnAddress: null,
    cursorDirection: "forward" as CursorDirection,
    phase: "PutFlag",
    time: 0,

    // parameter
    maxFlag: maxFlag,
    maxLife: maxLife,
    numInitialFlag: numInitialFlag,

    players: [
      { life: initialLife, color: "red", chooseFromCandidate: algorithm0 },
      { life: initialLife, color: "blue", chooseFromCandidate: algorithm1 }
    ],
    cards: cards
  };
  return game;
};
