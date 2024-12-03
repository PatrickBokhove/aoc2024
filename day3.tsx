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

// PART 2
const sectionsToEvaluate = [day3.slice(0, day3.indexOf("don't()"))];
const doUntilDontRegex = /do\(\)([^]*?)don't\(\)/g;

let sectionMatch;

while ((sectionMatch = doUntilDontRegex.exec(day3))) {
  const [_, section] = sectionMatch;
  sectionsToEvaluate.push(section);
}

let sum = 0;

for (const section of sectionsToEvaluate) {
  sum += sumForSection(section);
}

console.log("sum for relevant sections", sum);
