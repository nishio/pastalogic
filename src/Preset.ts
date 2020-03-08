import { RemoveCommand } from "./RemoveCommand";
import { RemoveFlag } from "./RemoveFlag";
import { TradeOff } from "./TradeOff";
import { Debug } from "./Debug";
import { ForkBomb } from "./ForkBomb";
import { FastPass } from "./FastPass";
import { SwapCommand } from "./SwapCommand";
import { Rotate } from "./Rotate";
import { Reverse } from "./Reverse";
import { Increment } from "./Increment";
import { MoveFlag } from "./MoveFlag";
import { Subroutine } from "./Subroutine";
import { AddFlag } from "./AddFlag";
import { Bug } from "./Bug";
import { Reorder } from "./Reorder";

export const WeAreProgrammer = [
  MoveFlag,
  Reorder,
  Reverse,
  Subroutine,
  Rotate,
  SwapCommand,
  Bug,
  FastPass
];

export const LifeRace = [
  AddFlag,
  MoveFlag,
  Reorder,
  Bug,
  ForkBomb,
  Debug,
  TradeOff,
  Increment
];

export const Inflation = [
  SwapCommand,
  Subroutine,
  AddFlag,
  MoveFlag,
  Increment,
  FastPass,
  TradeOff,
  Debug
];

export const Catastrophe = [
  RemoveFlag,
  RemoveCommand,
  Increment,
  Subroutine,
  SwapCommand,
  Bug,
  ForkBomb,
  TradeOff
];

const x = 1;
