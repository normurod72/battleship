import React, {
  PropsWithChildren,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

import { getRandomItemFromArray } from "./shared/Utils";
import { getBoardPoints, BOARD_CELL_COUNT } from "./shared/Constants";
import {
  getShipPointsWithSurroundings,
  GetShipPointsProps,
} from "./shared/Ships";

interface GameContext {
  boardPoints: Array<[number, number]>;
  allShipsPoints: Set<string>;
  addShip: (getShipPoints: (props: GetShipPointsProps) => Set<string>) => void;
}

const Context = React.createContext<GameContext | null>(null);
Context.displayName = "AppContext";

export function useGameContext() {
  return React.useContext(Context as React.Context<NonNullable<GameContext>>);
}

export function GameContextProvider({ children }: PropsWithChildren<unknown>) {
  const boardPoints = useMemo(() => getBoardPoints(), []);
  const availablePoints = useRef(boardPoints);
  const [allShipsPoints, setAllShipsPoints] = useState<Set<string>>(
    new Set([])
  );

  const addShip = useCallback(
    (getShipPoints: (props: GetShipPointsProps) => Set<string>) => {
      const randomPoint = getRandomItemFromArray(availablePoints.current);
      const shipPoints = getShipPoints({
        point: randomPoint,
        availablePoints: new Set(
          availablePoints.current.map((x) => x.join(""))
        ),
        boardCellCounts: BOARD_CELL_COUNT,
      });

      setAllShipsPoints(
        (prev) => new Set(Array.from(prev).concat(Array.from(shipPoints)))
      );

      const shipPointsWithSurroundings = getShipPointsWithSurroundings(
        shipPoints
      );

      availablePoints.current = availablePoints.current.filter(
        (p) => !shipPointsWithSurroundings.has(p.join(""))
      );
    },
    []
  );

  return (
    <Context.Provider value={{ boardPoints, addShip, allShipsPoints }}>
      {children}
    </Context.Provider>
  );
}
