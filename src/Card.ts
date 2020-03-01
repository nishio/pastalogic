import { Game, PlayerID } from "./Types";
import { updateCard } from "./updateCard";
import { getCardIndex, getOpponent, hasEnoughSpace, getCurrentCard } from "./util";

export type Card = {
  name: string;
  flags: PlayerID[];
  play: (game: Game, playerId: PlayerID) => Game;
  numIncrementToken: number;
};

const createCard = (
  name: string,
  play: (game: Game, playerId: PlayerID) => Game
) => {
  return {
    name: name,
    flags: [],
    play: play,
    numIncrementToken: 0,
  }
}

export const Bug = () => {
  return createCard(
    "Bug",
    (game: Game, playerId: PlayerID) => {
      const nextPlayers = [...game.players];
      const damage = 1 + getCurrentCard(game).numIncrementToken
      nextPlayers[getOpponent(playerId)].life -= damage;
      return { ...game, players: nextPlayers };
    }
  )
};


export const AddFlag = () => {
  return createCard(
    "AddFlag",
    (game: Game, playerId: PlayerID) => {
      for (let i = 0; i < 1 + getCurrentCard(game).numIncrementToken; i++) {
        const candidate = [game]
        /* eslint no-loop-func: 0 */
        game.cards.forEach((card, cardIndex) => {
          if (hasEnoughSpace(card)) {
            const next = updateCard(game, cardIndex, (card) => ({
              ...card, flags: [...card.flags, playerId]
            }));
            candidate.push(next);
          }
        })
        game = game.players[playerId].chooseFromCandidate("AddFlag", candidate);
      }
      return game
    }
  )
};

export const Subroutine = () => {
  return createCard(
    "Subroutine",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      const returnAddress = game.cursor.flagIndex + 1;
      const reach = 1 + getCurrentCard(game).numIncrementToken
      for (let i = -reach; i <= reach; i++) {
        if (i === 0) continue;
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
  )
};

export const MoveFlag = () => {
  return createCard(
    "MoveFlag",
    (game: Game, playerId: PlayerID) => {
      for (let i = 0; i < 1 + getCurrentCard(game).numIncrementToken; i++) {
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
        game = game.players[playerId].chooseFromCandidate("MoveFlag", candidate)
      }
      return game
    }
  )
};

export const Increment = () => {
  return createCard(
    "Increment",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      if (game.usedIncrementToken < 2) {
        game.cards.forEach((card, cardIndex) => {
          const next = updateCard(game, cardIndex, (card) => ({
            ...card, numIncrementToken: card.numIncrementToken + 1
          }));
          candidate.push(next);
        })
      }
      return game.players[playerId].chooseFromCandidate("Increment", candidate)
    }
  )
};

