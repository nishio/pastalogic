import {
  PlayerID,
  AlgorithToChooseCandidate,
  Game,
  Card,
  TypeCandidateGetter,
  TypeRepeatGetter
} from "../Types";
import { asParameter } from "../util/asParameter";
import { neverComeHere } from "../util/assertion";

// utility for card definition

type CardProps = {
  name: string;
  getCandidate: TypeCandidateGetter;
  repeatable?: boolean;
};
export const createCard = (props: CardProps): Card => {
  let repeat: TypeRepeatGetter = game => 1;
  if (props.repeatable) {
    repeat = game => asParameter(game, 1);
  }

  return {
    name: props.name,
    getCandidate: props.getCandidate,
    play: (
      game: Game,
      playerId: PlayerID,
      algorithm: AlgorithToChooseCandidate
    ) => {
      return algorithm(
        props.name,
        playerId,
        props.getCandidate(game, playerId)
      );
    },
    repeat: repeat,

    // common initialization
    flags: [],
    numIncrementToken: 0,
    numDecrementToken: 0
  };
};
