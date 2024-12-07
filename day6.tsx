import { day6 } from "./assignmentInputs";

// PART 1

const playingField = day6
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

let player: {
  xPosition: number | undefined;
  yPosition: number | undefined;
  facing: "^" | "v" | "<" | ">" | undefined;
} = {
  xPosition: undefined,
  yPosition: undefined,
  facing: undefined,
};

let previousPosition: { x: number | undefined; y: number | undefined } = {
  x: undefined,
  y: undefined,
};

for (let y = 0; y < playingField.length; y++) {
  for (let x = 0; x < playingField[y].length; x++) {
    if (playingField[y][x] === "^") {
      player = { xPosition: x, yPosition: y, facing: "^" };
    } else if (playingField[y][x] === "v") {
      player = { xPosition: x, yPosition: y, facing: "v" };
    } else if (playingField[y][x] === "<") {
      player = { xPosition: x, yPosition: y, facing: "<" };
    } else if (playingField[y][x] === ">") {
      player = { xPosition: x, yPosition: y, facing: ">" };
    }
  }
}

function whatIsAtPosition(direction: "^" | "v" | "<" | ">") {
  try {
    if (!player.xPosition || !player.yPosition) {
      return undefined;
    }
    return direction === "^"
      ? playingField[player.yPosition - 1][player.xPosition]
      : direction === "v"
      ? playingField[player.yPosition + 1][player.xPosition]
      : direction === "<"
      ? playingField[player.yPosition][player.xPosition - 1]
      : playingField[player.yPosition][player.xPosition + 1];
  } catch (e) {
    return undefined;
  }
}

function whatIsTheNextMove(): "move" | "rotate" | "stop" {
  if (!player.xPosition || !player.yPosition || !player.facing) {
    return "stop";
  }
  const atNextPosition = whatIsAtPosition(player.facing);

  if (atNextPosition === "#") {
    return "rotate";
  } else if (atNextPosition === "." || atNextPosition === "X") {
    return "move";
  } else {
    return "stop";
  }
}

function takeStep() {
  if (!player.xPosition || !player.yPosition || !player.facing) {
    return;
  }
  const nextMove = whatIsTheNextMove();
  if (nextMove === "stop") {
    return;
  } else if (nextMove === "rotate") {
    player.facing =
      player.facing === "^"
        ? ">"
        : player.facing === ">"
        ? "v"
        : player.facing === "v"
        ? "<"
        : "^";
  } else if (nextMove === "move") {
    console.log("moving in direction", player.facing);
    previousPosition = { x: player.xPosition, y: player.yPosition };
    const nextCoordinates =
      player.facing === "^"
        ? { x: player.xPosition, y: player.yPosition - 1 }
        : player.facing === "v"
        ? { x: player.xPosition, y: player.yPosition + 1 }
        : player.facing === "<"
        ? { x: player.xPosition - 1, y: player.yPosition }
        : { x: player.xPosition + 1, y: player.yPosition };

    player = {
      ...player,
      xPosition: nextCoordinates.x,
      yPosition: nextCoordinates.y,
    };
  }
}

function markAsVisited() {
  if (!previousPosition.x || !previousPosition.y) {
    return;
  }
  playingField[previousPosition.y][previousPosition.x] = "X";
}

while (whatIsTheNextMove() !== "stop") {
  takeStep();
  markAsVisited();
}

const amountOfXs = playingField
  .map((line) => line.filter((cell) => cell === "X").length)
  .reduce((acc, curr) => acc + curr, 0);

console.log("Amount of locations visited:", amountOfXs + 1);
