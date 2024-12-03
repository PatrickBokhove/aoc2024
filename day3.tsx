import { day3 } from "./assignmentInputs";

// PART 1
const regex = /mul\((\d+),(\d+)\)/g;

function sumForSection(section: string): number {
  let match;
  let sum = 0;
  while ((match = regex.exec(section))) {
    const [_, num1, num2] = match;
    sum += parseInt(num1) * parseInt(num2);
  }
  return sum;
}

const sumForWholeFile = sumForSection(day3);

console.log("sum for whole file", sumForWholeFile);
