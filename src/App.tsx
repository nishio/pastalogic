import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { startNoviceGame, testNoviceGame } from "./startNoviceGame";
import { chooseControledRandom, chooseRandom } from "./chooseRandom";
import { startRandomGame } from "./startRandomGame";
import { chooseMC } from "./chooseMC";
import { wholeTest } from "./wholeTest";

function App() {
  //wholeTest()
  //startNoviceGame(chooseMC, chooseMC)
  //testNoviceGame(chooseControledRandom, chooseControledRandom)
  //startRandomGame(chooseMC, chooseMC)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
