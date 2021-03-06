import React from "react";
import { startNoviceGame } from "./startNoviceGame";
import { chooseMC } from "./player/chooseMC";
import { HumanPlayer } from "./player/HumanPlayer";
import { WeAreProgrammer, LifeRace, Inflation, Catastrophe } from "./Preset";
import { startPresetGame } from "./startPresetGame";
import { startRandomGame } from "./startRandomGame";
import { startFullRandomGame } from "./startFullRandomGame";
export const NewGame = () => {
  const menu: [string, any][] = [
    [
      "Small game for tutorial (First Player)",
      () => startNoviceGame(HumanPlayer, chooseMC)
    ],
    [
      "Small game for tutorial (Second Player)",
      () => startNoviceGame(chooseMC, HumanPlayer)
    ],
    [
      "Preset: WeAreProgrammer (Shuffled Cards/Players)",
      () => startPresetGame(WeAreProgrammer)
    ],
    [
      "Preset: LifeRace (Shuffled Cards/Players)",
      () => startPresetGame(LifeRace)
    ],
    [
      "Preset: Inflation (Shuffled Cards/Players)",
      () => startPresetGame(Inflation)
    ],
    [
      "Preset: Catastrophe (Shuffled Cards/Players)",
      () => startPresetGame(Catastrophe)
    ],
    ["Random game(include BASIC cards)", () => startRandomGame()],
    ["Full Random game(random cards)", () => startFullRandomGame()],
    ["(developing new feature)", () => startRandomGame(true)]
  ];
  const items = menu.map(([caption, onClick], i: number) => {
    return (
      <li key={i}>
        <button onClick={onClick}>{caption}</button>
      </li>
    );
  });
  return <div className="App">New game: {items}</div>;
};
