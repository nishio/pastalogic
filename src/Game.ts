import { Card } from "./card/Card";
import { Player, CursorDirection } from "./Types";
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
  cursorDirection: CursorDirection;
  time: number;
};
