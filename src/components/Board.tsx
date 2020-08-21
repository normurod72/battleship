import React, { useMemo } from "react";

import { Cell } from "./Cell";
import {
  getBoardPoints,
  BOARD_CELL_COUNT,
  BOARD_CELL_SIZE,
} from "../shared/Constants";

interface BoardProps {
  shipsPoints?: Set<string>;
  touchedPoints?: Set<string>;
  cover?: React.ReactNode;
}

export function Board({ shipsPoints, touchedPoints, cover }: BoardProps) {
  const boardPoints = useMemo(() => getBoardPoints(), []);

  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${BOARD_CELL_COUNT}, ${BOARD_CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${BOARD_CELL_COUNT}, ${BOARD_CELL_SIZE}px)`,
      }}
    >
      {boardPoints.map(([i, j]) => (
        <Cell
          key={`${i}_${j}`}
          isShipPoint={shipsPoints?.has(`${i}${j}`)}
          isHitPoint={touchedPoints?.has(`${i}${j}`)}
        />
      ))}

      {!!cover && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(0 0 0 / 87%)",
            color: "aquamarine",
            fontSize: 72,
          }}
        >
          {cover}
        </div>
      )}
    </div>
  );
}
