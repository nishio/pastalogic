import { Card } from "../Types";
export const hasEnoughSpace = (card: Card): boolean => {
  return card.flags.length < 4;
};
