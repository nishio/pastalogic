export type PlayerID = 0 | 1;
export const FirstPlayer = 0 as PlayerID;
export const SecondPlayer = 1 as PlayerID;

export type CursorDirection = "forward" | "backward";

export type Player = {
  life: number;
  color: string;
  chooseFromCandidate: AlgorithToChooseCandidate;
};

export type AlgorithToChooseCandidate = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => Promise<Game> | Game;

export type Game = {
  players: Player[];
  cards: Card[];
  cursor: {
    cardIndex: number;
    flagIndex: number;
    repeatIndex: number;
  };
  returnAddress: null | number;
  maxFlag: number;
  maxLife: number;
  numInitialFlag: number;
  cursorDirection: CursorDirection;
  time: number;
  phase: "PutFlag" | "RunProgram";
};

type TypePlay = (
  game: Game,
  playerId: PlayerID,
  algorithm: AlgorithToChooseCandidate
) => Promise<Game> | Game;
export type TypeCandidateGetter = (game: Game, me: PlayerID) => Game[];
export type TypeRepeatGetter = (game: Game) => number;

export type Card = {
  name: string;
  flags: PlayerID[];
  getCandidate: TypeCandidateGetter;
  play: TypePlay;
  numIncrementToken: number;
  numDecrementToken: number;
  repeat: TypeRepeatGetter;
};
export const MAX_FLAGS_ON_A_CARD = 4;
