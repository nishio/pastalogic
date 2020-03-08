import { PlayerID } from "../Types";
import { Game } from "../Types";
import { asParameter } from "../util/asParameter";
import { createCard } from "./createCard";
import { getOpponent } from "../util/getOpponent";
import { updateLife } from "../util/updateLife";

const getCandidate = (game: Game, me: PlayerID) => {
  const candidate = [game];
  let next = updateLife(game, me, -asParameter(game, 1));
  next = updateLife(next, getOpponent(me), -asParameter(game, 2));
  candidate.push(next);
  return candidate;
};

export const TradeOff = () => {
  return createCard({
    name: "TradeOff",
    getCandidate: getCandidate
  });
};
