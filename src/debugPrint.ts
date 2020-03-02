import { Game, PlayerID, FirstPlayer, SecondPlayer } from "./Types";
import { Card } from "./Card";
import { neverComeHere } from "./util";

export const debugPrint = (game: Game) => {
  let cardStr = "";
  game.cards.forEach((card, cardIndex) => {
    cardStr += cardToStr(card, cardIndex, game)
  })
  console.log(
    `life ${game.players[0].life}:${game.players[1].life} ` +
    `cursor ${game.cursor.cardIndex}, ${game.cursor.flagIndex}\n` +
    cardStr
  )
};

const cardToStr = (card: Card, cardIndex: number, game: Game) => {
  let flags = " ";
  if (card.flags.length === 0) {
    flags = ""
  } else {
    card.flags.forEach((flag, flagIndex) => {
      let fs = flagToStr(flag)
      if (cardIndex === game.cursor.cardIndex) {
        if (flagIndex === game.cursor.flagIndex) {
          fs = `(${fs})`
        }
      }
      flags += fs;
    })
  }
  let cursor = "";
  if (cardIndex === game.cursor.cardIndex) {
    if (game.cursorDirection === "forward") {
      cursor = ">"
    } else {
      cursor = "<"
    }
  }
  const inc = "+".repeat(card.numIncrementToken)
  const dec = "-".repeat(card.numDecrementToken)

  return `[${cursor}${card.name}${inc}${dec}${flags}]`
}

const flagToStr = (flag: PlayerID) => {
  if (flag === FirstPlayer) {
    return "o"
  } else if (flag === SecondPlayer) {
    return "x"
  } else {
    neverComeHere("undefined user")
  }
}