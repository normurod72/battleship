import React, { useEffect, useState } from "react";

import { Board } from "./components/Board";
import { useGameContext } from "./GameContext";
import { getIShapedShipPoints, getLShapedShipPoints } from "./shared/Ships";
import { getRandomItemFromArray } from "./shared/Utils";

export function Game() {
  const { addShip, allShipsPoints, boardPoints } = useGameContext();
  const [untouchedPoints, setUntouchedPoints] = useState(
    boardPoints.map((x) => x.join(""))
  );
  const [totalHitPoints, setTotalHitPoints] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [randomHits, setRandomHits] = useState<Set<string>>(new Set([]));

  const isgameOver = totalHitPoints === allShipsPoints.size;

  useEffect(() => {
    if (!isGameStarted) {
      return;
    }

    const timeout = setInterval(() => {
      setRandomHits((p) => {
        const nextValues = new Set(p);
        const randomHitPoint = getRandomItemFromArray(untouchedPoints);
        nextValues.add(randomHitPoint);
        setUntouchedPoints((x) => x.filter((i) => i !== randomHitPoint));
        if (allShipsPoints.has(randomHitPoint)) {
          setTotalHitPoints((prev) => prev + 1);
        }
        return nextValues;
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    allShipsPoints,
    isgameOver,
    isGameStarted,
    totalHitPoints,
    untouchedPoints,
  ]);

  useEffect(() => {
    addShip(getLShapedShipPoints);
    addShip(getIShapedShipPoints);
    addShip(({ point }) => {
      return new Set([point.join("")]);
    });
    addShip(({ point }) => {
      return new Set([point.join("")]);
    });
  }, [addShip]);

  useEffect(() => {
    if (isgameOver) {
      setIsGameStarted(false);
    }
  }, [isgameOver]);

  return (
    <div style={{ display: "grid", justifyContent: "center", gridGap: "24px" }}>
      <Board
        shipsPoints={allShipsPoints}
        touchedPoints={randomHits}
        cover={isgameOver && <div>GAME OVER</div>}
      />

      <div>
        <button
          disabled={isGameStarted || isgameOver}
          onClick={() => setIsGameStarted(true)}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
