import React from "react";
import { startNoviceGame } from "./startNoviceGame";
import { chooseMC } from "./player/chooseMC";
import { HumanPlayer } from "./player/HumanPlayer";
import { WeAreProgrammer, LifeRace, Inflation, Catastrophe } from "./Preset";
import { startPresetGame } from "./startPresetGame";
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
    ]
  ];
  const items = menu.map(([caption, onClick]) => {
    return (
      <li>
        <button onClick={onClick}>{caption}</button>
      </li>
    );
  });
  return <div className="App">New game: {items}</div>;
};
