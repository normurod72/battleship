export function getRandomItemFromArray<T>(value: Array<T>): T {
  return value[Math.floor(Math.random() * 100) % value.length];
}

export function isValidGridPoint([i, j]: [number, number], gridSize: number) {
  return i > -1 && i < gridSize && j > -1 && j < gridSize;
}

export function getSurroundingPoints(
  [i, j]: [number, number],
  gridSize: number
) {
  const points: [number, number][] = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
  return points.filter((p) => isValidGridPoint(p, gridSize));
}
