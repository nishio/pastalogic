import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "./createCard";
import { isCurrentCard } from "../util/isCurrentCard";

const getCandidate = (game: Game, playerId: PlayerID) => {
  const candidate = [game];
  let next = game;
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    if (isSubroutineAndIsUsing(card, game)) return;
    const newFlag = [...card.flags];
    const v = newFlag.pop();
    if (v !== undefined) {
      newFlag.unshift(v);
      next = updateFlag(next, cardIndex, newFlag);
    }
  });
  candidate.push(next);
  return candidate;
};

export const Rotate = () => {
  return createCard({
    name: "Rotate",
    getCandidate: getCandidate
  });
};
