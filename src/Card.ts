import { PlayerID, AlgorithToChooseCandidate } from "./Types";
import { Game } from "./Game";
import { updateCard } from "./updateCard";
import {
  getCardIndex,
  hasEnoughSpace,
  appendOneFlag,
  updateFlag,
  getCurrentCard,
  isUsingSubroutine,
} from "./util";
import { isGameOver } from "./isGameOver";
import {
  attack,
  asParameter,
  createCard,
  payLife,
  reverse,
  payFlag,
} from "./utilCardImpl";

export type Card = {
  name: string;
  flags: PlayerID[];
  getCandidate: (game: Game, playerId: PlayerID) => Game[];
  play: (
    game: Game,
    playerId: PlayerID,
    algorithm: AlgorithToChooseCandidate
  ) => Game;
  numIncrementToken: number;
  numDecrementToken: number;
  repeat: (game: Game) => number;
};

export const Bug = () => {
  return createCard("Bug", (game: Game, playerId: PlayerID) => {
    return [attack(game, playerId, asParameter(game, 1))];
  });
};

export const AddFlag = () => {
  return createCard(
    "AddFlag",
    (game: Game, playerId: PlayerID) => {
      if (usedFlag(playerId, game) === game.maxFlag) return [game];
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

export const usedFlag = (playerId: PlayerID, game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    c.flags.forEach(f => {
      if (f === playerId) {
        ret++;
      }
    });
  });
  return ret;
};

export const Subroutine = () => {
  return createCard("Subroutine", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    const returnAddress = game.cursor.flagIndex + 1;
    const reach = asParameter(game, 1);
    for (let i = -reach; i <= reach; i++) {
      if (i === 0) continue;
      const next = {
        ...game,
        cursor: {
          cardIndex: getCardIndex(game, game.cursor.cardIndex, i),
          flagIndex: -1,
          repeatIndex: 1,
        },
        returnAddress: returnAddress,
      };
      candidate.push(next);
    }
    return candidate;
  });
};

export const MoveFlag = () => {
  return createCard(
    "MoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game];
      const me = game.cursor.cardIndex;
      game.cards.forEach((ci, i) => {
        if (i === me) return;
        game.cards.forEach((cj, j) => {
          if (j === me) return;
          if (i === j) return;
          if (!hasEnoughSpace(cj)) return;
          ci.flags.forEach((fk, k) => {
            const newCi = [...ci.flags];
            newCi.splice(k, 1);
            const newCj = [...cj.flags, fk];

            let next = updateFlag(game, i, newCi);
            next = updateFlag(next, j, newCj);
            candidate.push(next);
          });
        });
      });
      return candidate;
    },
    game => asParameter(game, 1)
  );
};

export const Increment = () => {
  return createCard("Increment", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    if (usedIncrementToken(game) < 2) {
      game.cards.forEach((card, cardIndex) => {
        const next = updateCard(game, cardIndex, card => ({
          ...card,
          numIncrementToken: card.numIncrementToken + 1,
        }));
        candidate.push(next);
      });
    }
    return candidate;
  });
};

export const usedIncrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numIncrementToken;
  });
  return ret;
};

export const usedDecrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numDecrementToken;
  });
  return ret;
};

export const Decrement = () => {
  return createCard("Decrement", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    if (usedDecrementToken(game) < 2) {
      game.cards.forEach((card, cardIndex) => {
        const next = updateCard(game, cardIndex, card => ({
          ...card,
          numDecrementToken: card.numDecrementToken + 1,
        }));
        candidate.push(next);
      });
    }
    return candidate;
  });
};

export const Reverse = () => {
  return createCard("Reverse", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    const cost = asParameter(game, 1);
    if (game.players[playerId].life > cost) {
      const next = {
        ...game,
        cursorDirection: reverse(game.cursorDirection),
      };
      candidate.push(payLife(next, playerId, cost));
    }
    return candidate;
  });
};

export const Rotate = () => {
  return createCard("Rotate", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = game;
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "Rotate") return;
      if (isUsingSubroutine(card, game)) return;
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

export const SwapCommand = () => {
  return createCard("SwapCommand", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "SwapCommand") return;
      const newCards = [...game.cards];
      newCards[cardIndex] = getCurrentCard(game);
      newCards[game.cursor.cardIndex] = card;
      const next = {
        ...game,
        cards: newCards,
        cursor: { ...game.cursor, cardIndex: cardIndex },
      };
      candidate.push(next);
    });
    return candidate;
  });
};

export const FastPass = () => {
  return createCard("FastPass", (game: Game, playerId: PlayerID) => {
    if (usedFlag(playerId, game) === game.maxFlag) return [game];
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "FastPass") return;
      if (isUsingSubroutine(card, game)) return;
      const newFlags = [...card.flags];
      newFlags.unshift(playerId);
      if (newFlags.length === 5) {
        newFlags.pop();
      }
      candidate.push(updateFlag(game, cardIndex, newFlags));
    });
    return candidate;
  });
};

export const ForkBomb = () => {
  return createCard("ForkBomb", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = attack(game, playerId, asParameter(game, 2));
    if (isGameOver(next)) return [game, next];
    candidate.push(payFlag(next));
    return candidate;
  });
};

export const Debug = () => {
  return createCard("Debug", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = payLife(game, playerId, -asParameter(game, 3));
    candidate.push(payFlag(next));
    return candidate;
  });
};

export const TradeOff = () => {
  return createCard("TradeOff", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = payLife(game, playerId, asParameter(game, 1));
    next = attack(game, playerId, asParameter(game, 2));
    candidate.push(next);
    return candidate;
  });
};

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

export const RemoveCommand = () => {
  return createCard("RemoveCommand", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      const newCards = [...game.cards];
      newCards.splice(cardIndex, 1);
      let newCursor = { ...game.cursor };
      if (cardIndex < game.cursor.cardIndex) {
        newCursor.cardIndex--;
      } else if (cardIndex === game.cursor.cardIndex) {
        // remove self
        if (game.cursorDirection === "forward") {
          newCursor.cardIndex--;
        } else {
          // when cursorDirection is backward, keep cardIndex
          // except for RemoveCommand is the last card
          if (newCards.length === newCursor.cardIndex) {
            newCursor = {
              cardIndex: 0,
              flagIndex: 4,
              repeatIndex: 1,
            };
          }
        }
        newCursor.flagIndex = 4;
      }
      candidate.push({
        ...game,
        cards: newCards,
        cursor: newCursor,
      });
    });
    return candidate;
  });
};

const foo = () => {
  bar({
    a: 3,
    b: x => x + 1,
  });
};
type T1 = (x: number) => number;
// type Props = {
//   a: number,
//   b: T1
// }
// const bar = (props: Props) => {
//   const { a, b } = props;
// }

const bar = ({
  a = (null as unknown) as number,
  b = (null as unknown) as T1,
}) => {};
