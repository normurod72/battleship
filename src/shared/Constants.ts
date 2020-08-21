export const BOARD_CELL_COUNT = 10;
export const BOARD_CELL_SIZE = 50; // in pixels, height=width

export function getBoardPoints() {
  const points: Array<[number, number]> = [];

  for (let i = 0; i < BOARD_CELL_COUNT; i++) {
    for (let j = 0; j < BOARD_CELL_COUNT; j++) {
      points.push([i, j]);
    }
  }

  return points;
}
