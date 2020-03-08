import { Card } from "./card/Card";
export const hasEnoughSpace = (card: Card) => {
  return card.flags.length < 4;
};
