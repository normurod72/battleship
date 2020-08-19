import React from "react";

interface CellProps {
  type?: "empty" | "ship" | "miss" | "hit";
  text?: string;
}

const CellConfig = {
  empty: "GAINSBORO",
  ship: "teal",
  miss: "GRAY",
  hit: "red",
};

export function Cell({ type = "empty", text }: CellProps) {
  return (
    <div
      style={{
        backgroundColor: CellConfig[type],
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
