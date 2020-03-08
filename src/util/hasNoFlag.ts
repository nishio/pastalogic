import { Card } from "../Types";
export const hasNoFlag = (card: Card): boolean => {
  return card.flags.length === 0;
};
