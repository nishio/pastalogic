import React from "react";
import "./App.css";
import { chooseByHuman } from "./player/HumanPlayer";
import { useGlobal, setGlobal } from "reactn";
import { initializeGlobalState } from "./GLOBAL_STATE";
import { gameToStr } from "./debugPrint";
import { Game } from "./Types";
import { NewGame } from "./NewGame";

initializeGlobalState();

function App() {
  const [log] = useGlobal("log");

  if (log.length === 0) {
    return <NewGame />;
  }

  const items = log.map((x: any, i: number) => {
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
      return <p key={i}>{x}</p>;
    }
    const toButton = (game: Game, i: number) => {
      return (
        <li key={i}>
          <button onClick={chooseByHuman(i)}>{gameToStr(game)}</button>
        </li>
      );
    };
    return (
      <div key={i}>
        select: <ul>{x.map(toButton)}</ul>
      </div>
    );
  });
  return <div className="App">{items}</div>;
}

export default App;
