import { Card } from "./Card";
import { Game } from "./Types";

type CardUpdater = (c: Card) => Card;

export const updateCard = (game: Game, cardIndex: number, updater: CardUpdater) => {
  const nextCards = [...game.cards];
  nextCards[cardIndex] = updater(game.cards[cardIndex]);
  const next = { ...game, cards: nextCards };
  return next;
};
