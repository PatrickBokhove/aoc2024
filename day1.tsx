// https://adventofcode.com/2024/day/1

import { day1 } from "./assignmentInputs";

// PART 1

const leftValues: number[] = day1
  .split("\n")
  .filter(Boolean)
  .map((line) => parseInt(line.split("   ")[0]))
  .sort((a, b) => a - b);

const rightValues: number[] = day1
  .split("\n")
  .filter(Boolean)
  .map((line) => parseInt(line.split("   ")[1]))
  .sort((a, b) => a - b);

let sumOfAllDiffs = 0;

leftValues.forEach((leftValue, index) => {
  const rightValue = rightValues[index];
  const diff = Math.abs(leftValue - rightValue);
  sumOfAllDiffs += diff;
});

console.log("sum of all diffs", sumOfAllDiffs);

// PART 2

let sumOfSimilarities = 0;

leftValues.forEach((leftValue) => {
  const occurencesOfLeftValueInRightValues = rightValues.filter(
    (value) => value === leftValue
  ).length;

  const similarity = occurencesOfLeftValueInRightValues * leftValue;
  sumOfSimilarities += similarity;
});

console.log("sum of similarities", sumOfSimilarities);
