import {
  MoveFlag, Subroutine, Bug, Reverse, Rotate, SwapCommand, FastPass, AddFlag, Increment,
  Debug, TradeOff, ForkBomb
} from "./Card";
import { Reorder } from "./Reorder";

const WeAreProgrammer = [
  MoveFlag, Reorder, Reverse, Subroutine, Rotate, SwapCommand, Bug, FastPass
]

const LifeRace = [
  AddFlag, MoveFlag, Reorder, Bug, ForkBomb, Debug, TradeOff, Increment
]

const Inflation = [
  SwapCommand, Subroutine, AddFlag, MoveFlag, Increment, FastPass, TradeOff, Debug
]

const Catastrophe = [
  //  RemoveFlag, RemoveCommand, Increment, Subroutine, SwapCommand, Bug, ForkBomb, TradeOff
]
