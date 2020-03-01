import { Game, PlayerID } from "./Types";
import { updateCard } from "./updateCard";
import { getCardIndex, getOpponent, hasEnoughSpace } from "./util";
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
        if (hasEnoughSpace(card)) {
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
      const candidate = [game]
      const me = game.cursor.cardIndex;
      game.cards.forEach((ci, i) => {
        if (i === me) return;
        game.cards.forEach((cj, j) => {
          if (j === me) return;
          if (i === j) return;
          if (!hasEnoughSpace(cj)) return;
          ci.flags.forEach((fk, k) => {
            const newCi = [...ci.flags]
            delete newCi[k]
            const newCj = [...cj.flags, fk]

            let next = updateCard(game, i, (card) => ({
              ...card, flags: newCi
            }));
            next = updateCard(next, j, (card) => ({
              ...card, flags: newCj
            }));
            candidate.push(next);
          })
        })
      })
      return game.players[playerId].chooseFromCandidate("MoveFlag", candidate)
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

