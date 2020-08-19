import React, {
  PropsWithChildren,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { getRandomItemFromArray } from "./shared/Utils";
import { getBoardPoints } from "./shared/Constants";
import { getShipPointsWithSurroundings } from "./shared/Ships";

export interface GetShipPointsProps {
  point: [number, number];
  rotations?: number[];
  availablePoints: Set<string>;
}

interface AppContextState {
  boardPoints: Array<[number, number]>;
  allShipsPointsSet: Set<string>;
  addShip: (getShipPoints: (props: GetShipPointsProps) => Set<string>) => void;
}

const Context = React.createContext<AppContextState | null>(null);
Context.displayName = "AppContext";

export function useAppContext() {
  return React.useContext(
    Context as React.Context<NonNullable<AppContextState>>
  );
}

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const boardPoints = useMemo(() => getBoardPoints(), []);
  const availablePoints = useRef(boardPoints);
  const [allShipsPointsSet, setAllShipsPointsSet] = useState<Set<string>>(
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
      });

      setAllShipsPointsSet(
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
    <Context.Provider value={{ boardPoints, addShip, allShipsPointsSet }}>
      {children}
    </Context.Provider>
  );
}
