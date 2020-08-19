import React, { useMemo, useCallback } from "react";

import { Cell } from "./Cell";
import {
  getBoardPoints,
  BOARD_CELL_COUNT,
  BOARD_CELL_SIZE,
} from "../shared/Constants";

interface BoardProps {
  shipsPoints?: Set<string>;
  hitPoints?: Set<string>;
}

export function Board({ shipsPoints, hitPoints }: BoardProps) {
  const boardPoints = useMemo(() => getBoardPoints(), []);

  const getCellType = useCallback(
    (point: string) => {
      const isShipPoint = shipsPoints?.has(point);
      const isHitPoint = hitPoints?.has(point);

      if (isShipPoint && isHitPoint) {
        return "hit";
      }
      if (isShipPoint) {
        return "ship";
      }
      if (isHitPoint) {
        return "miss";
      }
      return "empty";
    },
    [hitPoints, shipsPoints]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${BOARD_CELL_COUNT}, ${BOARD_CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${BOARD_CELL_COUNT}, ${BOARD_CELL_SIZE}px)`,
      }}
    >
      {boardPoints.map(([i, j]) => (
        <Cell key={`${i}_${j}`} type={getCellType(`${i}${j}`)} />
      ))}
    </div>
  );
}
