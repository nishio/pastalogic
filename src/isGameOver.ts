import { Game } from "./Game";
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
    const numFlags = countFlags(game)
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
    return determineByLife("no flags except for RemoveFlag", game)
  }

  if (noFlagsExcept("RemoveCommand", game)) {
    return determineByLife("no flags except for RemoveCommand", game)
  }

  if (noFlagsExceptOrder(game)) {
    return determineByLife("no flags except for Order Changing Cards", game)
  }

  if (noUsefulCard(game)) {
    return determineByLife("no flags which useful to win", game)
  }

  // if (noDamageNoAdd(game)) {
  //   return determineByLife("no damage card and no add-flag card", game)
  // }
  // BAD, it is possible to win by RemoveCommand
};


export const countFlags = (game: Game) => {
  const numFlags = [0, 0];
  game.cards.forEach((card) => {
    card.flags.forEach((flag) => {
      numFlags[flag]++;
    });
  });
  return numFlags;
}

const determineByLife = (reason: string, game: Game) => {
  const f0 = game.players[0].life;
  const f1 = game.players[1].life;
  if (f0 > f1) {
    return { type: "win", winner: 0, reason: reason };
  } else if (f1 > f0) {
    return { type: "win", winner: 1, reason: reason };
  } else {
    return { type: "draw", reason: reason };
  }
}

const noFlagsExcept = (name: string, game: Game) => {
  const numFlags = [0, 0];
  game.cards.forEach((card) => {
    if (card.name === name) return;
    card.flags.forEach((flag) => {
      numFlags[flag]++;
    });
  });
  if (numFlags[0] === 0 && numFlags[1] === 0) {
    return true;
  }
  return false;
}

const noFlagsExceptOrder = (game: Game) => {
  const numFlags = [0, 0];
  game.cards.forEach((card) => {
    if (card.name === "Rotate" || card.name === "Reorder") return;
    card.flags.forEach((flag) => {
      numFlags[flag]++;
    });
  });
  if (numFlags[0] === 0 && numFlags[1] === 0) {
    return true;
  }
  return false;
}


const noUsefulCard = (game: Game) => {
  /* example: [Subroutine- oxxx][FastPass x][ForkBomb][>Decrement xx(x)x]
  [SwapCommand+ xxxx][Reverse xx][Increment xx][Reorder- xxxx] */
  const numFlags = countFlags(game)

  /* example: [FastPass x][ForkBomb] */
  const usefulFlags = [0, 0]
  game.cards.forEach((card) => {
    if (card.name === "Rotate" || card.name === "Reorder") return;
    if (card.name === "Increment" || card.name === "Decrement") return;
    if (card.name === "SwapCommand" || card.name === "Reverse" || card.name === "Subroutine") return;
    if (card.name === "Debug") return;
    if (card.name === "FastPass" || card.name === "AddFlag") {
      card.flags.forEach((flag) => {
        if (numFlags[flag] < game.maxFlag) {
          usefulFlags[flag]++;
        }
      });
      return
    }
    card.flags.forEach((flag) => {
      usefulFlags[flag]++;
    });

  });
  if (usefulFlags[0] === 0 && usefulFlags[1] === 0) {
    return true;
  }
  return false;
}

const noDamageNoAdd = (game: Game) => {
  for (let card of game.cards) {
    if (card.name === "Bug" || card.name === "TradeOff" || card.name === "Forkbomb") return false;
    if (card.name === "AddFlag" || card.name === "FastPass") return false;
  }
  return true;
}
