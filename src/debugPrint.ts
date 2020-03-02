import { Game, PlayerID, FirstPlayer } from "./Types";
import { Card } from "./Card";

export const debugPrint = (game: Game) => {
  console.log(
    `life ${game.players[0].life}:${game.players[1].life} ` +
    `cursor ${game.cursor.cardIndex}, ${game.cursor.flagIndex}\n` +
    game.cards.map(cardToStr).join("")
  )
};

const cardToStr = (card: Card) => {
  let flags = " ";
  if (card.flags.length === 0) {
    flags = ""
  } else {
    card.flags.forEach((f) => {
      flags += flagToStr(f)
    })
  }
  const inc = "+".repeat(card.numIncrementToken)
  const dec = "-".repeat(card.numDecrementToken)

  return `[${card.name}${inc}${dec}${flags}]`
}

const flagToStr = (flag: PlayerID) => {
  if (flag === FirstPlayer) {
    return "o"
  } else {
    return "x"
  }
}