import { PlayerID, Game } from "./Types";
import { getOpponent, getCardIndex } from "./util";
import { updateCard } from "./updateCard";
export type Card = {
  name: string;
  flags: PlayerID[];
  play: (game: Game, playerId: PlayerID) => Game;
};

export const Bug = () => {
  return {
    name: "Bug",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      const nextPlayers = [...game.players];
      nextPlayers[getOpponent(playerId)].life--;
      return { ...game, players: nextPlayers };
    }
  };
};

export const AddFlag = () => {
  return {
    name: "AddFlag",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      game.cards.forEach((card, cardIndex) => {
        if (card.flags.length < 4) {
          const next = updateCard(game, cardIndex, (card) => ({
            ...card, flags: [...card.flags, playerId]
          }));
          candidate.push(next);
        }
      })
      return game.players[playerId].chooseFromCandidate("AddFlag", candidate);
    }
  };
};

export const Subroutine = () => {
  return {
    name: "Subroutine",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      const returnAddress = game.cursor.flagIndex + 1;
      for (let i = -1; i <= 1; i++) {
        const next = {
          ...game,
          cursor: {
            cardIndex: getCardIndex(game, game.cursor.cardIndex, i),
            flagIndex: 0
          },
          returnAddress: returnAddress
        }
        candidate.push(next)
      }

      return game.players[playerId].chooseFromCandidate("Subroutine", candidate)
    }
  };
};

export const MoveFlag = () => {
  return {
    name: "MoveFlag",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};

export const Increment = () => {
  return {
    name: "Increment",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};
