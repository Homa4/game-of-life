const {
  parseInput,
  countLiveNeighbors,
  nextCellState,
  nextGeneration,
  runGenerations,
  formatGrid,
} = require("./index");

describe("Game of Life – basic logic", () => {
  test("countLiveNeighbors with torus wrapping", () => {
    const grid = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(countLiveNeighbors(grid, 1, 1, 3, 3)).toBe(1);
  });

  test("dead cell becomes alive with exactly 3 neighbors", () => {
    const grid = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    expect(nextCellState(grid, 1, 1, 3, 3)).toBe(1);
  });

  test("alive cell survives with 2 neighbors", () => {
    const grid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    expect(nextCellState(grid, 1, 1, 3, 3)).toBe(1);
  });

  test("alive cell dies with less than 2 neighbors", () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(nextCellState(grid, 1, 1, 3, 3)).toBe(0);
  });
});

describe("Formatting output", () => {
  test("formatGrid converts grid to string", () => {
    const grid = [
      [0, 1, 0],
      [1, 0, 1],
    ];

    expect(formatGrid(grid)).toBe(".x.\nx.x");
  });
});
