import { Card } from "./Card";

export type PlayerID = 0 | 1;
export const FirstPlayer = 0 as PlayerID;
export const SecondPlayer = 1 as PlayerID;
export type Game = {
  players: Player[];
  cards: Card[];
  cursor: {
    cardIndex: number;
    flagIndex: number;
  };
  returnAddress: null | number;
};
type Player = {
  life: number;
  color: string;
  chooseFromCandidate: AlgorithToChooseCandidate;
};
export type AlgorithToChooseCandidate = (type: string, candidate: Game[]) => Game;
