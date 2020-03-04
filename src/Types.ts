import { Game } from "./Game";

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
) => Game;
