import {
  AddFlag, MoveFlag, RemoveFlag,
  Rotate, FastPass,
  Bug, ForkBomb, Debug, TradeOff,
  RemoveCommand, Reverse, SwapCommand, Subroutine,
  Increment
} from "./Card";
import { Reorder } from "./Reorder";

export const WeAreProgrammer = [
  MoveFlag, Reorder, Reverse, Subroutine, Rotate, SwapCommand, Bug, FastPass
]

export const LifeRace = [
  AddFlag, MoveFlag, Reorder, Bug, ForkBomb, Debug, TradeOff, Increment
]

export const Inflation = [
  SwapCommand, Subroutine, AddFlag, MoveFlag, Increment, FastPass, TradeOff, Debug
]

export const Catastrophe = [
  RemoveFlag, RemoveCommand, Increment, Subroutine, SwapCommand, Bug, ForkBomb, TradeOff
]

const x = 1;;