import { Game, PlayerID } from "./Types";
import { Card } from "./Card";
import { updateCard } from "./updateCard";

const neverComeHere = (msg?: string) => {
  throw new Error(msg)
}

export const moveCursorToNextCard = (game: Game): Game => {
  if (game.returnAddress !== null) {
    // Subroutine call finished, return to Subroutine
    const cardIndex = game.cards.findIndex((card) => card.name === "Subroutine")
    if (cardIndex === -1) {
      neverComeHere("card Subroutine is not found when return to it")
    }
    console.log(`return ${cardIndex},${game.returnAddress}`)
    return {
      ...game,
      cursor: {
        cardIndex: cardIndex,
        flagIndex: game.returnAddress,
      },
      returnAddress: null
    }
  }

  return {
    ...game,
    cursor: {
      cardIndex: getNextCardIndex(game, game.cursor.cardIndex),
      flagIndex: 0
    }
  };
};

export const moveCursorToNextFlag = (game: Game) => {
  return {
    ...game,
    cursor: {
      ...game.cursor,
      flagIndex: game.cursor.flagIndex + 1
    }
  };
};

const getNextCardIndex = (game: Game, index: number) => {
  if (game.cursorDirection === "forward") {
    return (index + 1) % game.cards.length;
  } else {
    return (index - 1 + game.cards.length) % game.cards.length;
  }
};

export const getCardIndex = (game: Game, index: number, change: number) => {
  return (index + change + game.cards.length) % game.cards.length;
};

export const getOpponent = (p: PlayerID) => {
  return 1 - p;
};

export const chooseFirst = (type: string, candidate: Game[]) => (candidate[0])

export const chooseRandom = (type: string, candidate: Game[]) => (
  candidate[Math.floor(Math.random() * candidate.length)]
)

let index = 0;
let buffer = [0, 1]
export const chooseControledRandom = (type: string, candidate: Game[]) => {
  const ret = candidate[buffer[index] % candidate.length]
  index++
  index %= buffer.length
  return ret
}

export const hasEnoughSpace = (card: Card) => {
  return card.flags.length < 4;
}

export const getCurrentCard = (game: Game) => {
  return game.cards[game.cursor.cardIndex];
}

export const consumeOneFlag = (game: Game, playerId: PlayerID): Game => {
  const newUsedFlag = [...game.usedFlag] as [number, number]
  newUsedFlag[playerId]++;
  return {
    ...game, usedFlag: newUsedFlag
  }
}

export const appendOneFlag = (game: Game, cardIndex: number, playerId: PlayerID) => {
  return updateCard(game, cardIndex, (card) => ({
    ...card,
    flags: [...card.flags, playerId]
  }));
}

export const updateFlag = (game: Game, cardIndex: number, newFlag: PlayerID[]) => {
  return updateCard(game, cardIndex, (card) => ({
    ...card, flags: newFlag
  }))
}
