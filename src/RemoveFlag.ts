import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateFlag, isUsingSubroutine } from "./util";
import { asParameter, createCard } from "./utilCardImpl";
export const RemoveFlag = () => {
  return createCard(
    "RemoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game];
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "RemoveFlag") return;
        if (isUsingSubroutine(card, game)) return;
        if (card.flags.length === 0) return;
        card.flags.forEach((f, flagIndex) => {
          const newFlags = [...card.flags];
          newFlags.splice(flagIndex, 1);
          candidate.push(updateFlag(game, cardIndex, newFlags));
        });
      });
      return candidate;
    },
    game => asParameter(game, 1)
  );
};
