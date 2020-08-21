import React from "react";
import ReactDOM from "react-dom";

import { GameContextProvider } from "./GameContext";
import { Game } from "./Game";

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
