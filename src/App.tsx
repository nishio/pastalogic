import React from "react";
import "./App.css";
import { startNoviceGame } from "./startNoviceGame";
import { chooseMC } from "./chooseMC";
import { HumanPlayer, chooseByHuman } from "./HumanPlayer";
import { useGlobal } from "reactn";
import { initializeGlobalState } from "./GLOBAL_STATE";
import { Game } from "./Game";
import { debugToStr } from "./debugPrint";

initializeGlobalState();
startNoviceGame(HumanPlayer, chooseMC);

function App() {
  const [log] = useGlobal("log");
  //wholeTest()
  //testNoviceGame(chooseControledRandom, chooseControledRandom)
  //startRandomGame(chooseMC, chooseMC)

  const items = log.map((x: any) => {
    if (typeof x === "string") {
      return <p>{x}</p>;
    }
    const toButton = (game: Game, i: number) => {
      return (
        <li>
          <button onClick={chooseByHuman(i)}>{debugToStr(game)}</button>
        </li>
      );
    };
    return <ul>{x.map(toButton)}</ul>;
  });
  return <div className="App">{items}</div>;
}

export default App;
