import { Card } from "../Types";
import { Game } from "../Types";

type CardUpdater = (c: Card) => Card;

export const updateCard = (
  game: Game,
  cardIndex: number,
  updater: CardUpdater
): Game => {
  const nextCards = [...game.cards];
  nextCards[cardIndex] = updater(game.cards[cardIndex]);
  const next = { ...game, cards: nextCards };
  return next;
};
