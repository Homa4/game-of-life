const {
  parseInput,
  countLiveNeighbors,
  nextCellState,
  nextGeneration,
  runGenerations,
  formatGrid,
} = require("./index");

describe("basic logic", () => {
  test("parseInput parses generations, size and grid correctly", () => {
    const input = `
3
4 3
....
.xx.
....
`;
    const { generations, width, height, grid } = parseInput(input);

    expect(generations).toBe(3);
    expect(width).toBe(4);
    expect(height).toBe(3);
    expect(grid).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);
  });

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

describe("Game of Life – figures", () => {
  test("block is stable (still life)", () => {
    const grid = [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
    ];

    const next = nextGeneration(grid, 4, 2);
    expect(next).toEqual(grid);
  });

  test("runGenerations applies multiple steps", () => {
    const start = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];

    const result = runGenerations(start, 3, 3, 2);
    expect(result).toEqual(start);
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
