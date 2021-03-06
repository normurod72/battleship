import { getRandomItemFromArray, getSurroundingPoints } from "./Utils";
import { BOARD_CELL_COUNT } from "./Constants";

export interface GetShipPointsProps {
  point: [number, number];
  rotations?: number[];
  availablePoints: Set<string>;
  boardCellCounts: number;
}

export function getIShapedShipPoints({
  point: [i, j],
  rotations = [0, 90, 180, 270],
  availablePoints,
  boardCellCounts,
}: GetShipPointsProps): Set<string> {
  const randomRotation = getRandomItemFromArray(rotations);
  let points;

  switch (randomRotation) {
    case 0:
      if (j < boardCellCounts - 3) {
        points = new Set([
          `${i}${j}`,
          `${i}${j + 1}`,
          `${i}${j + 2}`,
          `${i}${j + 3}`,
        ]);
      }
      break;

    case 90:
      if (i < boardCellCounts - 4) {
        points = new Set([
          `${i}${j}`,
          `${i + 1}${j}`,
          `${i + 2}${j}`,
          `${i + 3}${j}`,
        ]);
      }
      break;

    case 180:
      if (j > 3) {
        points = new Set([
          `${i}${j}`,
          `${i}${j - 1}`,
          `${i}${j - 2}`,
          `${i}${j - 3}`,
        ]);
      }
      break;

    case 270:
      if (i > 3) {
        points = new Set([
          `${i}${j}`,
          `${i - 1}${j}`,
          `${i - 2}${j}`,
          `${i - 3}${j}`,
        ]);
      }
      break;

    default:
      break;
  }

  if (
    points &&
    new Set(Array.from(points).concat(Array.from(availablePoints))).size ===
      availablePoints.size
  ) {
    return points;
  } else {
    return getIShapedShipPoints({
      point: [i, j],
      rotations: rotations.filter((r) => r !== randomRotation),
      availablePoints,
      boardCellCounts,
    });
  }
}

export function getLShapedShipPoints({
  point: [i, j],
  rotations = [0, 90, 180, 270],
  availablePoints,
  boardCellCounts,
}: GetShipPointsProps): Set<string> {
  const randomRotation = getRandomItemFromArray(rotations);
  let points;

  switch (randomRotation) {
    case 0:
      if (j < boardCellCounts - 2 && i < boardCellCounts - 1) {
        points = new Set([
          `${j}${i}`,
          `${j + 1}${i}`,
          `${j + 2}${i}`,
          `${j + 2}${i + 1}`,
        ]);
      }
      break;

    case 90:
      if (j > 0 && i < boardCellCounts - 2) {
        points = new Set([
          `${j}${i}`,
          `${j}${i + 1}`,
          `${j}${i + 2}`,
          `${j - 1}${i + 2}`,
        ]);
      }
      break;

    case 180:
      if (j > 1 && i > 0) {
        points = new Set([
          `${j}${i}`,
          `${j - 1}${i}`,
          `${j - 2}${i}`,
          `${j - 2}${i - 1}`,
        ]);
      }
      break;

    case 270:
      if (j < boardCellCounts - 1 && i > 1) {
        points = new Set([
          `${j}${i}`,
          `${j}${i - 1}`,
          `${j}${i - 2}`,
          `${j + 1}${i - 2}`,
        ]);
      }
      break;

    default:
      break;
  }

  if (
    points &&
    new Set(Array.from(points).concat(Array.from(availablePoints))).size ===
      availablePoints.size
  ) {
    return points;
  } else {
    return getLShapedShipPoints({
      point: [i, j],
      rotations: rotations.filter((r) => r !== 270),
      availablePoints,
      boardCellCounts,
    });
  }
}

export function getShipPointsWithSurroundings(points: Set<string>) {
  const surroundingPoints = new Set(points);
  points.forEach((point) => {
    const [i, j] = point.split("");
    getSurroundingPoints([Number(i), Number(j)], BOARD_CELL_COUNT).forEach(
      (p) => {
        surroundingPoints.add(p.join(""));
      }
    );
  });
  return surroundingPoints;
}
