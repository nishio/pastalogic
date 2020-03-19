import { Game, PlayerID, Card, CardName } from "../Types";
import { AddFlag } from "../card/AddFlag";
import { Bug } from "../card/Bug";
import { Debug } from "../card/Debug";
import { Decrement } from "../card/Decrement";
import { FastPass } from "../card/FastPass";
import { ForkBomb } from "../card/ForkBomb";
import { Increment } from "../card/Increment";
import { MoveFlag } from "../card/MoveFlag";
import { RemoveCommand } from "../card/RemoveCommand";
import { RemoveFlag } from "../card/RemoveFlag";
import { Reorder } from "../card/Reorder";
import { Rotate } from "../card/Rotate";
import { Subroutine } from "../card/Subroutine";
import { SwapCommand } from "../card/SwapCommand";
import { TradeOff } from "../card/TradeOff";
import { gameToStr } from "../debugPrint";

const nameToCard = {
  AddFlag: AddFlag(),
  Bug: Bug(),
  Debug: Debug(),
  Decrement: Decrement(),
  FastPass: FastPass(),
  ForkBomb: ForkBomb(),
  Increment: Increment(),
  MoveFlag: MoveFlag(),
  RemoveCommand: RemoveCommand(),
  RemoveFlag: RemoveFlag(),
  Reorder: Reorder(),
  Rotate: Rotate(),
  Subroutine: Subroutine(),
  SwapCommand: SwapCommand(),
  TradeOff: TradeOff()
} as { [key: string]: Card };

const getCardImpl = (name: CardName): Card => {
  const key: string = name;
  const card = nameToCard[key];
  return card;
};
const start = (candidateOfOpponent: Game[], me: PlayerID) => {
  candidateOfOpponent.forEach((game: Game) => {
    game.cards.forEach((card: Card) => {
      const c = getCardImpl(card.name);
      card.getCandidate = c.getCandidate;
      card.play = c.play;
    });
  });

  // play random until my turn
  // calc score for each choice
};

onmessage = (e: any) => {
  console.log("webworker called", e);
  if (e.data.type === "start") {
    start(e.data.candidateOfOpponent, e.data.mySide);
  }
  // // @ts-ignore
  // postMessage(result);
};
