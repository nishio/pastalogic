import {
  AlgorithToChooseCandidate,
  CursorDirection,
  Card,
  Game
} from "./Types";

interface GameParams {
  initialLife: number;
  algorithmOfFirstPlayer: AlgorithToChooseCandidate;
  algorithmOfSecondPlayer: AlgorithToChooseCandidate;
  cards: Card[];
  maxFlag: number;
  maxLife: number;
  numInitialFlag: number;
}

const defaultParams = {
  maxFlag: 10,
  maxLife: 6,
  numInitialFlag: 5
};

export const createGame = (params: GameParams): Game => {
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
    maxFlag: params.maxFlag,
    maxLife: params.maxLife,
    numInitialFlag: params.numInitialFlag,

    players: [
      {
        life: params.initialLife,
        color: "red",
        chooseFromCandidate: params.algorithmOfFirstPlayer
      },
      {
        life: params.initialLife,
        color: "blue",
        chooseFromCandidate: params.algorithmOfSecondPlayer
      }
    ],
    cards: params.cards
  };
  return game;
};
