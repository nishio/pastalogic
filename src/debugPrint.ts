import { PlayerID, FirstPlayer, SecondPlayer } from "./Types";
import { Game } from "./Game";
import { Card } from "./card/Card";
import { neverComeHere } from "./assertion";
import { pushLog } from "./GLOBAL_STATE";

export const debugToStr = (game: Game) => {
  let cardStr = "";
  game.cards.forEach((card, cardIndex) => {
    cardStr += cardToStr(card, cardIndex, game);
  });
  return `${game.players[0].life}:${game.players[1].life} ` + cardStr;
};

export const debugPrint = (game: Game) => {
  console.log(debugToStr(game));
};

export const debugPrintWithUI = (game: Game) => {
  const s = debugToStr(game);
  console.log(s);
  pushLog(s);
};

const cardToStr = (card: Card, cardIndex: number, game: Game) => {
  let flags = " ";

  let rep = "";
  if (card.repeat(game) > 1) {
    rep = `${game.cursor.repeatIndex + 1}`;
  }

  if (card.flags.length === 0) {
    flags = "";
  } else {
    card.flags.forEach((flag, flagIndex) => {
      let fs = flagToStr(flag);
      if (cardIndex === game.cursor.cardIndex) {
        if (flagIndex === game.cursor.flagIndex) {
          fs = `(${fs}${rep})`;
        }
      }
      if (game.returnAddress !== null && card.name === "Subroutine") {
        if (flagIndex === game.returnAddress) {
          fs = `(${fs}${rep})`;
        }
      }
      flags += fs;
    });
  }
  let cursor = "";
  if (cardIndex === game.cursor.cardIndex) {
    if (game.cursorDirection === "forward") {
      cursor = ">";
    } else {
      cursor = "<";
    }
  }
  const inc = "+".repeat(card.numIncrementToken);
  const dec = "-".repeat(card.numDecrementToken);

  return `[${cursor}${card.name}${inc}${dec}${flags}]`;
};

export const flagToStr = (flag: PlayerID) => {
  if (flag === FirstPlayer) {
    return "o";
  } else if (flag === SecondPlayer) {
    return "x";
  } else {
    neverComeHere("undefined user");
  }
};
