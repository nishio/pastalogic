import { Card } from "./Card";
export const hasNoFlag = (card: Card) => {
  return card.flags.length === 0;
};
