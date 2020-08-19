import React, { useEffect, useMemo, useState } from "react";

import { Board } from "./components/Board";
import { useAppContext } from "./AppContext";
import { getIShapedShipPoints, getLShapedShipPoints } from "./shared/Ships";
import { getRandomItemFromArray } from "./shared/Utils";

function App() {
  const { addShip, allShipsPointsSet, boardPoints } = useAppContext();
  const [untouchedPoints, setUntouchedPoints] = useState(
    boardPoints.map((x) => x.join(""))
  );
  const [randomHits, setRandomHits] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    const timeout = setInterval(() => {
      setRandomHits((p) => {
        const nextValues = new Set(p);
        const randomHitPoint = getRandomItemFromArray(untouchedPoints);
        nextValues.add(randomHitPoint);
        setUntouchedPoints((x) => x.filter((i) => i !== randomHitPoint));
        return nextValues;
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [untouchedPoints]);

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Board shipsPoints={allShipsPointsSet} hitPoints={randomHits} />
    </div>
  );
}

export default App;
