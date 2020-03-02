import { Game, PlayerID } from "./Types"
import { isGameOver } from "./isGameOver"
import { usedFlag } from "./Card"
import { getOpponent, getCurrentCard, moveCursorToNextCard, moveCursorToNextFlag, chooseControledRandom, controledRandom } from "./util"

export const chooseMC = (type: string, playerId: PlayerID, candidate: Game[]): Game => {
  let bestScore = -101;
  let bestGame = { ...candidate[0] };
  for (let game of candidate) {
    const start = { ...game };
    game = { ...game }
    for (let i = 0; i < 10; i++) {
      const currentCard = getCurrentCard(game);
      const currentPlayer = currentCard.flags[game.cursor.flagIndex];
      if (currentPlayer === undefined) {
        game = moveCursorToNextCard(game);
        continue
      }
      game = currentCard.play(game, playerId, chooseControledRandom);
      const ret = isGameOver(game);
      if (ret) {
        const s = score(game, playerId)
        if (s > bestScore) {
          bestGame = start
          bestScore = s
        }
      }
      game = moveCursorToNextFlag(game);
    }
    const s = score(game, playerId)
    if (s > bestScore) {
      bestGame = start
      bestScore = s
    }
  };
  console.log("best score:", bestScore)
  return bestGame
}

const score = (game: Game, playerId: PlayerID) => {
  const g = isGameOver(game);
  if (g) {
    if (g.type === "win") {
      if (g.winner == playerId) {
        return 100
      } else {
        return -100
      }
    } else {
      return 0;
    }
  }

  let ret = 0;
  ret += numToScore(game.players[playerId].life)
  ret += numToScore(usedFlag(playerId, game))
  ret -= numToScore(game.players[getOpponent(playerId)].life)
  ret -= numToScore(usedFlag(getOpponent(playerId), game))
  ret += controledRandom() / 1000;
  return ret;
}

const numToScore = (n: number) => {
  if (n > 6) return 32;
  return 32 - (2 ** (6 - n))
}
