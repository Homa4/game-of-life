"use strict";

function parseInput(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .filter((l) => l.length > 0);

  if (lines.length < 2) throw new Error("Invalid input: not enough lines");

  const generations = Number(lines[0].trim());
  const [wStr, hStr] = lines[1].trim().split(/\s+/);
  const width = Number(wStr);
  const height = Number(hStr);

  if (lines.length < 2 + height)
    throw new Error("Invalid input: missing grid lines");

  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = lines[2 + y];

    grid.push([...row].map((ch) => (ch === "x" ? 1 : 0)));
  }

  return { generations, width, height, grid };
}

function countLiveNeighbors(grid, x, y, width, height) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = (x + dx + width) % width;
      const ny = (y + dy + height) % height;
      count += grid[ny][nx];
    }
  }
  return count;
}

function nextCellState(grid, x, y, width, height) {
  const alive = grid[y][x] === 1;
  const n = countLiveNeighbors(grid, x, y, width, height);

  if (!alive && n === 3) return 1;
  if (alive && (n === 2 || n === 3)) return 1;
  return 0;
}

function nextGeneration(grid, width, height) {
  const out = Array.from({ length: height }, () => Array(width).fill(0));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      out[y][x] = nextCellState(grid, x, y, width, height);
    }
  }
  return out;
}

function runGenerations(grid, width, height, generations) {
  let cur = grid;
  for (let i = 0; i < generations; i++) {
    cur = nextGeneration(cur, width, height);
  }
  return cur;
}

function formatGrid(grid) {
  return grid.map((row) => row.map((v) => (v ? "x" : ".")).join("")).join("\n");
}

function main() {
  const fs = require("fs");
  const input = fs.readFileSync(0, "utf8");
  const { generations, width, height, grid } = parseInput(input);
  const result = runGenerations(grid, width, height, generations);
  process.stdout.write(formatGrid(result) + "\n");
}

if (require.main === module) main();

module.exports = {
  parseInput,
  countLiveNeighbors,
  nextCellState,
  nextGeneration,
  runGenerations,
  formatGrid,
};
