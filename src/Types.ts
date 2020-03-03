import { Card } from "./Card";

export type PlayerID = 0 | 1;
export const FirstPlayer = 0 as PlayerID;
export const SecondPlayer = 1 as PlayerID;

export type CursorDirection = ("forward" | "backward")

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
  cursorDirection: CursorDirection
};

type Player = {
  life: number;
  color: string;
  chooseFromCandidate: AlgorithToChooseCandidate;
};

export type AlgorithToChooseCandidate = (type: string, playerId: PlayerID, candidate: Game[]) => Game;
