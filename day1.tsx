// https://adventofcode.com/2024/day/1

import { day1 } from "./assignmentInputs";

// PART 1

const sortedLeftValues: number[] = day1
  .split("\n")
  .filter(Boolean)
  .map((line) => parseInt(line.split("   ")[0]))
  .sort((a, b) => a - b);

const sortedRightValues: number[] = day1
  .split("\n")
  .filter(Boolean)
  .map((line) => parseInt(line.split("   ")[1]))
  .sort((a, b) => a - b);

let sumOfAllDiffs = 0;

sortedLeftValues.forEach((leftValue, index) => {
  const rightValue = sortedRightValues[index];
  const diff = Math.abs(leftValue - rightValue);
  sumOfAllDiffs += diff;
});

console.log("sum of all diffs", sumOfAllDiffs);

// PART 2

let sumOfSimilarities = 0;

sortedLeftValues.forEach((leftValue) => {
  const occurencesOfLeftValueInsortedRightValues = sortedRightValues.filter(
    (value) => value === leftValue
  ).length;

  const similarity = occurencesOfLeftValueInsortedRightValues * leftValue;
  sumOfSimilarities += similarity;
});

console.log("sum of similarities", sumOfSimilarities);
