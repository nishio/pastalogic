import { Card } from "./Card";
import { AlgorithToChooseCandidate, Game } from "./Types";
export const createGame = (initialLife: number, algorithm0: AlgorithToChooseCandidate, algorithm1: AlgorithToChooseCandidate, cards: Card[], maxFlag = 10, maxLife = 6): Game => {
  let game = {} as Game;
  game.cursor = { cardIndex: 0, flagIndex: 0 };
  game.returnAddress = null;
  game.maxFlag = maxFlag;
  game.maxLife = maxLife;
  game.cursorDirection = "forward";
  game.players = [
    { life: initialLife, color: "red", chooseFromCandidate: algorithm0 },
    { life: initialLife, color: "blue", chooseFromCandidate: algorithm1 },
  ];
  game.cards = cards;
  return game;
};
