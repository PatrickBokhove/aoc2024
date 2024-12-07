// https://adventofcode.com/2024/day/7

import { day7 } from "./assignmentInputs";

// PART 1

const equations = day7.split("\n").filter(Boolean);
const allowedOperators = ["+", "*", "||"];

let sumOfSolvedValues = 0;

equations.forEach((line) => {
  let solved = false;
  const testValue = parseInt(line.split(":")[0]);
  const options = line
    .split(": ")[1]
    .split(" ")
    .map((val) => parseInt(val));

  function solveEquation(
    options: number[],
    currentEquation: string,
    currentTotal: number
  ) {
    if (solved) {
      return;
    }

    if (options.length === 0) {
      if (currentTotal === testValue) {
        sumOfSolvedValues += testValue;
        solved = true;
      }
      return;
    }

    allowedOperators.forEach((operator) => {
      solveEquation(
        options.slice(1),
        currentEquation + operator + options[0],
        operator === "+"
          ? currentTotal + options[0]
          : operator === "*"
          ? currentTotal * options[0]
          : parseInt(`${currentTotal}${options[0]}`) // PART 2
      );
    });
  }

  solveEquation(options.slice(1), options[0].toString(), options[0]);
});

console.log("sum of solved values", sumOfSolvedValues);
