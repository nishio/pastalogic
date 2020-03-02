import { Game, PlayerID } from "./Types";
import { updateCard } from "./updateCard";
import { getCardIndex, hasEnoughSpace, appendOneFlag, updateFlag, getCurrentCard } from "./util";
import { isGameOver } from "./isGameOver";
import { attack, asParameter, repeat, createCard, payLife, reverse } from "./utilCardImpl";

export type Card = {
  name: string;
  flags: PlayerID[];
  play: (game: Game, playerId: PlayerID) => Game;
  numIncrementToken: number;
};


export const Bug = () => {
  return createCard(
    "Bug",
    (game: Game, playerId: PlayerID) => {
      return attack(game, playerId, asParameter(game, 1));
    }
  )
};

export const AddFlag = () => {
  return createCard(
    "AddFlag",
    (game: Game, playerId: PlayerID) => {
      return repeat(asParameter(game, 1), game, (game: Game) => {
        if (game.usedFlag[playerId] === game.maxFlag) return game;
        const candidate = [game]
        /* eslint no-loop-func: 0 */
        game.cards.forEach((card, cardIndex) => {
          if (hasEnoughSpace(card)) {
            candidate.push(appendOneFlag(game, cardIndex, playerId));
          }
        })
        return game.players[playerId].chooseFromCandidate("AddFlag", candidate);
      })
    }
  )
};

export const Subroutine = () => {
  return createCard(
    "Subroutine",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      const returnAddress = game.cursor.flagIndex + 1;
      const reach = asParameter(game, 1)
      for (let i = -reach; i <= reach; i++) {
        if (i === 0) continue;
        const next = {
          ...game,
          cursor: {
            cardIndex: getCardIndex(game, game.cursor.cardIndex, i),
            flagIndex: -1
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
      return repeat(asParameter(game, 1), game, (game: Game) => {
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

              let next = updateFlag(game, i, newCi)
              next = updateFlag(next, j, newCj)
              candidate.push(next);
            })
          })
        })
        return game.players[playerId].chooseFromCandidate("MoveFlag", candidate)
      })
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



export const Reverse = () => {
  return createCard(
    "Increment",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      const cost = asParameter(game, 1)
      if (game.players[playerId].life > cost) {
        const next = {
          ...game,
          cursorDirection: reverse(game.cursorDirection),
        }
        candidate.push(payLife(next, playerId, cost))

      }
      return game.players[playerId].chooseFromCandidate("Reverse", candidate)
    }
  )
};


export const Rotate = () => {
  return createCard(
    "Rotate",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      let next = game
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "Rotate") return;
        if (card.name === "Subroutine" && game.returnAddress !== null) {
          return
        }
        const newFlag = [...card.flags]
        const v = newFlag.pop()
        if (v !== undefined) {
          newFlag.unshift(v)
          next = updateFlag(next, cardIndex, newFlag)
        }
      })
      candidate.push(next)
      return game.players[playerId].chooseFromCandidate("Rotate", candidate)
    }
  )
};

export const SwapCard = () => {
  return createCard(
    "SwapCard",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "SwapCard") return;
        const newCards = [...game.cards]
        newCards[cardIndex] = getCurrentCard(game)
        newCards[game.cursor.cardIndex] = card
        const next = {
          ...game,
          cards: newCards,
          cursor: { ...game.cursor, cardIndex: cardIndex }
        }
        candidate.push(next)
      })
      return game.players[playerId].chooseFromCandidate("SwapCard", candidate)
    }
  )
};

