import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { createGame } from "./createGame";
import { RemoveCommand } from "./card/RemoveCommand";
import { chooseRandom } from "./player/chooseRandom";
import { Bug } from "./card/Bug";
import { FirstPlayer, SecondPlayer } from "./Types";
import { gameToStr } from "./debugPrint";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("foo", () => {
  const game = createGame({
    initialLife: 1,
    maxFlag: 1,
    maxLife: 6,
    algorithmOfFirstPlayer: chooseRandom,
    algorithmOfSecondPlayer: chooseRandom,
    numInitialFlag: 1,
    cards: [RemoveCommand(), Bug()]
  });
  game.cards[0].flags.push(FirstPlayer);
  game.cards[1].flags.push(SecondPlayer);
  game.phase = "RunProgram";

  const candidate = game.cards[0].getCandidate(game, FirstPlayer);
  // console.log(
  //   candidate.map(game => {
  //     return [gameToStr(game), game.cursor];
  //   })
  // );
  expect(candidate[1].cursor.cardIndex).not.toBe(-1);
});
