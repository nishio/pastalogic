import React from "react";
import "./App.css";
import { chooseByHuman } from "./player/HumanPlayer";
import { useGlobal, setGlobal } from "reactn";
import { initializeGlobalState } from "./GLOBAL_STATE";
import { debugToStr } from "./debugPrint";
import { Game } from "./Types";
import { NewGame } from "./NewGame";

initializeGlobalState();

function App() {
  const [log] = useGlobal("log");

  if (log.length === 0) {
    return <NewGame />;
  }

  const items = log.map((x: any) => {
    if (typeof x === "string") {
      if (x === "[newgame]") {
        return (
          <button
            onClick={() => {
              setGlobal({ log: [] });
            }}
          >
            New game
          </button>
        );
      }
      return <p>{x}</p>;
    }
    const toButton = (game: Game, i: number) => {
      return (
        <li>
          <button onClick={chooseByHuman(i)}>{debugToStr(game)}</button>
        </li>
      );
    };
    return (
      <p>
        select: <ul>{x.map(toButton)}</ul>
      </p>
    );
  });
  return <div className="App">{items}</div>;
}

export default App;
