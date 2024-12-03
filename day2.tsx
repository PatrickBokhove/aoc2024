// https://adventofcode.com/2024/day/2

import { day2 } from "./assignmentInputs";

const inputAs2dNumberArray = day2
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(" ").map((value) => parseInt(value)));

// PART 1

let amountOfSafeReports = 0;
const minDeviation = 1;
const maxDeviation = 3;

function isLineOrderedAndWithinDeviationBounds(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return false; // Either duplicate or not sorted
    }

    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < minDeviation || diff > maxDeviation) {
      return false; // Not within deviation
    }
  }
  return true; // The array is sorted and has no duplicates
}

// PART 2

function isSafeWithOneRemoval(line: number[]): boolean {
  for (let i = 0; i < line.length; i++) {
    const modifiedLine = [...line.slice(0, i), ...line.slice(i + 1)];
    if (isLineOrderedAndWithinDeviationBounds(modifiedLine)) {
      return true; // Safe after removing one element
    }
  }
  return false; // No removal made the line safe
}

inputAs2dNumberArray.forEach((line) => {
  const valuesOkay = isLineOrderedAndWithinDeviationBounds(line);
  const reversedValuesOkay = isLineOrderedAndWithinDeviationBounds(
    line.reverse()
  );
  const safeWithOneRemoval = isSafeWithOneRemoval(line);
  const reversedSafeWithOneRemoval = isSafeWithOneRemoval(line.reverse());

  if (
    valuesOkay ||
    reversedValuesOkay ||
    safeWithOneRemoval ||
    reversedSafeWithOneRemoval
  ) {
    amountOfSafeReports++;
  }
});

console.log("amount of safe reports", amountOfSafeReports);
