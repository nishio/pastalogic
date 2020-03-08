import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "../createCard";
export const Rotate = () => {
  return createCard("Rotate", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = game;
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "Rotate") return;
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
  });
};
