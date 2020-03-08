import { PlayerID } from "../Types";
import { Game } from "../Game";
import { isUsingSubroutine } from "../isUsingSubroutine";
import { appendOneFlag } from "../appendOneFlag";
import { hasEnoughSpace } from "../hasEnoughSpace";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { constUsedFlag } from "./Card";
export const AddFlag = () => {
  return createCard(
    "AddFlag",
    (game: Game, playerId: PlayerID) => {
      if (constUsedFlag(playerId, game) === game.maxFlag) return [game];
      const candidate = [game];
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "AddFlag") return;
        if (isUsingSubroutine(card, game)) return;
        if (hasEnoughSpace(card)) {
          candidate.push(appendOneFlag(game, cardIndex, playerId));
        }
      });
      return candidate;
    },
    game => asParameter(game, 1)
  );
};
