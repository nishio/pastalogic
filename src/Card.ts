import { Game, PlayerID } from "./Types";
import { updateCard } from "./updateCard";
import { getCardIndex, hasEnoughSpace, appendOneFlag, updateFlag, getCurrentCard, isUsingSubroutine } from "./util";
import { isGameOver } from "./isGameOver";
import { attack, asParameter, repeat, createCard, payLife, reverse, payFlag } from "./utilCardImpl";

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
          if (card.name === "AddFlag") return;
          if (isUsingSubroutine(card, game)) return;
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
        if (isUsingSubroutine(card, game)) return;
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

export const SwapCommand = () => {
  return createCard(
    "SwapCommand",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "SwapCommand") return;
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
      return game.players[playerId].chooseFromCandidate("SwapCommand", candidate)
    }
  )
};

export const FastPass = () => {
  return createCard(
    "FastPass",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      game.cards.forEach((card, cardIndex) => {
        if (card.name === "FastPass") return;
        if (isUsingSubroutine(card, game)) return;
        const newFlags = [...card.flags]
        newFlags.unshift(playerId)
        if (newFlags.length === 5) {
          newFlags.pop()
        }
        candidate.push(updateFlag(game, cardIndex, newFlags))
      })
      return game.players[playerId].chooseFromCandidate("FastPass", candidate)
    }
  )
};

export const ForkBomb = () => {
  return createCard(
    "ForkBomb",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      let next = attack(game, playerId, asParameter(game, 2));
      if (isGameOver(next)) return next;
      candidate.push(payFlag(next))
      return game.players[playerId].chooseFromCandidate("ForkBomb", candidate)
    }
  )
};

export const Debug = () => {
  return createCard(
    "Debug",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      let next = payLife(game, playerId, -asParameter(game, 3));
      candidate.push(payFlag(next))
      return game.players[playerId].chooseFromCandidate("Debug", candidate)
    }
  )
};


export const TradeOff = () => {
  return createCard(
    "TradeOff",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      let next = payLife(game, playerId, asParameter(game, 1));
      next = attack(game, playerId, asParameter(game, 2))
      candidate.push(next)
      return game.players[playerId].chooseFromCandidate("TradeOff", candidate)
    }
  )
};

export const RemoveFlag = () => {
  return createCard(
    "RemoveFlag",
    (game: Game, playerId: PlayerID) => {
      return repeat(asParameter(game, 1), game, (game: Game) => {
        const candidate = [game]
        game.cards.forEach((card, cardIndex) => {
          if (card.name === "RemoveFlag") return;
          if (isUsingSubroutine(card, game)) return;
          if (card.flags.length === 0) return;
          card.flags.forEach((f, flagIndex) => {
            const newFlags = [...card.flags]
            newFlags.splice(flagIndex, 1)
            candidate.push(updateFlag(game, cardIndex, newFlags));
          })
        })
        return game.players[playerId].chooseFromCandidate("RemoveFlag", candidate);
      })
    }
  )
};

export const RemoveCommand = () => {
  return createCard(
    "RemoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game]
      game.cards.forEach((card, cardIndex) => {
        const newCards = [...game.cards]
        newCards.splice(cardIndex, 1)
        candidate.push({
          ...game, cards: newCards
        });
      })
      return game.players[playerId].chooseFromCandidate("RemoveCommand", candidate);
    }
  )
};
