import { Game } from "./Types";
export const isGameOver = (game: Game) => {
  // if game is over, return winner info
  {
    const f0 = (game.players[0].life <= 0);
    const f1 = (game.players[1].life <= 0);
    if (f0 && f1) {
      return { type: "draw" };
    }
    if (f0) {
      return { type: "win", winner: 1 };
    }
    if (f1) {
      return { type: "win", winner: 0 };
    }
  }
  {
    const numFlags = [0, 0];
    game.cards.forEach((card) => {
      card.flags.forEach((flag) => {
        numFlags[flag]++;
      });
    });
    const f0 = (numFlags[0] === 0);
    const f1 = (numFlags[1] === 0);
    if (f0 && f1) {
      return { type: "draw" };
    }
    if (f0) {
      return { type: "win", winner: 1 };
    }
    if (f1) {
      return { type: "win", winner: 0 };
    }
  }
};
