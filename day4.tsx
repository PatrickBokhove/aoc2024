// https://adventofcode.com/2024/day/4

import { day4 } from "./assignmentInputs";

// PART 1
const inputAs2dStringArray = day4
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

function getHorizontalStrings() {
  return inputAs2dStringArray.map((row) => row.join(""));
}

function getVerticalStrings() {
  return inputAs2dStringArray[0].map((_, i) =>
    inputAs2dStringArray.map((row) => row[i]).join("")
  );
}

const stringToFind = "XMAS";
const reversedStringToFind = stringToFind.split("").reverse().join("");

// Get diagonal strings from a certain starting point
function getDiagonal(
  grid: string[][],
  startRow: number,
  startCol: number,
  rowIncrement: number,
  colIncrement: number
) {
  const diagonal: string[] = [];
  let row = startRow;
  let col = startCol;

  while (row < grid.length && col >= 0 && col < grid[row].length) {
    diagonal.push(grid[row][col]);
    row += rowIncrement;
    col += colIncrement;
  }

  // Return the diagonal string if it's long enough to contain the target string
  return diagonal.length >= stringToFind.length ? diagonal.join("") : null;
}

function getLeftToRightDiagonals() {
  const grid = inputAs2dStringArray;
  const diagonals: string[] = [];

  // Top left to bottom right diagonals (starting from the top row)
  for (let startRow = 0; startRow < grid.length; startRow++) {
    const diagonal = getDiagonal(grid, startRow, 0, 1, 1);
    if (diagonal) diagonals.push(diagonal);
  }

  // Top left to bottom right diagonals (starting from the left column)
  for (let startCol = 1; startCol < grid[0].length; startCol++) {
    const diagonal = getDiagonal(grid, 0, startCol, 1, 1);
    if (diagonal) diagonals.push(diagonal);
  }

  return diagonals;
}

function getRightToLeftDiagonals() {
  const grid = inputAs2dStringArray;
  const diagonals: string[] = [];

  // Top right to bottom left diagonals (starting from the top row)
  for (let startRow = 0; startRow < grid.length; startRow++) {
    const diagonal = getDiagonal(
      grid,
      startRow,
      grid[startRow].length - 1,
      1,
      -1
    );
    if (diagonal) diagonals.push(diagonal);
  }

  // Top right to bottom left diagonals (starting from the right column)
  for (let startCol = grid[0].length - 2; startCol >= 0; startCol--) {
    const diagonal = getDiagonal(grid, 0, startCol, 1, -1);
    if (diagonal) diagonals.push(diagonal);
  }

  return diagonals;
}

// Get all strings
const horizontalStrings = getHorizontalStrings();
const verticalStrings = getVerticalStrings();
const diagonalTopLeftToBottomRightStrings = getLeftToRightDiagonals();
const diagonalTopRightToBottomLeftStrings = getRightToLeftDiagonals();

let hits = 0;

for (const string of horizontalStrings) {
  hits += string.split(stringToFind).length - 1;
  hits += string.split(reversedStringToFind).length - 1;
}

for (const string of verticalStrings) {
  hits += string.split(stringToFind).length - 1;
  hits += string.split(reversedStringToFind).length - 1;
}

for (const string of diagonalTopLeftToBottomRightStrings) {
  hits += string.split(stringToFind).length - 1;
  hits += string.split(reversedStringToFind).length - 1;
}

for (const string of diagonalTopRightToBottomLeftStrings) {
  hits += string.split(stringToFind).length - 1;
  hits += string.split(reversedStringToFind).length - 1;
}

console.log("total hits:", hits);

// PART 2

const word = "MAS";
const wordReversed = word.split("").reverse().join("");
let counter = 0;

// Gets all possible 3x3 options from the grid
function getAll3x3Grids(grid: string[][]): string[][][] {
  const result: string[][][] = [];

  for (let row = 0; row <= grid.length - 3; row++) {
    for (let col = 0; col <= grid[row].length - 3; col++) {
      const subgrid = [
        grid[row].slice(col, col + 3),
        grid[row + 1].slice(col, col + 3),
        grid[row + 2].slice(col, col + 3),
      ];
      result.push(subgrid);
    }
  }

  return result;
}

// Check for diagonal occurences of the word or the reversed word
function checkForMASInRotatedGrids(grid: string[][]): boolean {
  // Dirty hard coded cross
  const diagonal1 = grid[2][0] + grid[1][1] + grid[0][2]; // Top right to bottom left
  const diagonal2 = grid[0][0] + grid[1][1] + grid[2][2]; // Top left to bottom right

  return (
    (diagonal1.includes(word) || diagonal1.includes(wordReversed)) &&
    (diagonal2.includes(word) || diagonal2.includes(wordReversed))
  );
}

const all3x3Grids = getAll3x3Grids(inputAs2dStringArray);

// Check all 3x3 grids for the word in the diagonals
all3x3Grids.forEach((grid) => {
  if (checkForMASInRotatedGrids(grid)) {
    counter++;
  }
});

console.log("amount of x masses:", counter);
