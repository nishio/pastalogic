import { RemoveCommand } from "./card/RemoveCommand";
import { RemoveFlag } from "./card/RemoveFlag";
import { TradeOff } from "./card/TradeOff";
import { Debug } from "./card/Debug";
import { ForkBomb } from "./card/ForkBomb";
import { FastPass } from "./card/FastPass";
import { SwapCommand } from "./card/SwapCommand";
import { Rotate } from "./card/Rotate";
import { Reverse } from "./card/Reverse";
import { Increment } from "./card/Increment";
import { MoveFlag } from "./card/MoveFlag";
import { Subroutine } from "./card/Subroutine";
import { AddFlag } from "./card/AddFlag";
import { Bug } from "./card/Bug";
import { Reorder } from "./card/Reorder";

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
