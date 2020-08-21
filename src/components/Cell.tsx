import React, { useCallback } from "react";

interface CellProps {
  text?: string;
  isShipPoint?: boolean;
  isHitPoint?: boolean;
}

export function Cell({ text, isHitPoint, isShipPoint }: CellProps) {
  const getCellColor = useCallback(() => {
    if (isShipPoint && isHitPoint) {
      return "red";
    }
    if (isShipPoint) {
      return "teal";
    }
    if (isHitPoint) {
      return "gray";
    }
    return "gainsboro";
  }, [isShipPoint, isHitPoint]);

  return (
    <div
      style={{
        backgroundColor: getCellColor(),
        border: "1px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "aqua",
      }}
    >
      {text}
    </div>
  );
}
