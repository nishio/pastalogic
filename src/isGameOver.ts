import { Game } from "./Types";
export const isGameOver = (game: Game) => {
  // if game is over, return winner info
  {
    const f0 = (game.players[0].life <= 0);
    const f1 = (game.players[1].life <= 0);
    if (f0 && f1) {
      return { type: "draw", reason: "life" };
    }
    if (f0) {
      return { type: "win", winner: 1, reason: "life" };
    }
    if (f1) {
      return { type: "win", winner: 0, reason: "life" };
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
      return { type: "draw", reason: "flag" };
    }
    if (f0) {
      return { type: "win", winner: 1, reason: "flag" };
    }
    if (f1) {
      return { type: "win", winner: 0, reason: "flag" };
    }
  }

  if (noFlagsExcept("RemoveFlag", game)) {
    const f0 = game.players[0].life;
    const f1 = game.players[1].life;
    if (f0 > f1) {
      return { type: "win", winner: 0, reason: "no flags except for RemoveFlag, life" };
    } else if (f1 > f0) {
      return { type: "win", winner: 1, reason: "no flags except for RemoveFlag, life" };
    } else {
      return { type: "draw", reason: "no flags except for RemoveFlag, life" };
    }
  }
};

const noFlagsExcept = (name: string, game: Game) => {
  const numFlags = [0, 0];
  game.cards.forEach((card) => {
    if (card.name === name) return;
    card.flags.forEach((flag) => {
      numFlags[flag]++;
    });
  });
  if (numFlags[0] == 0 && numFlags[1] == 0) {
    return true;
  }
  return false;
}