export const BOARD_CELL_COUNT = 10;
export const BOARD_CELL_SIZE = 50;

export function getBoardPoints(): Array<[number, number]> {
  const points: Array<[number, number]> = [];

  for (let i = 0; i < BOARD_CELL_COUNT; i++) {
    for (let j = 0; j < BOARD_CELL_COUNT; j++) {
      points.push([i, j]);
    }
  }

  return points;
}
