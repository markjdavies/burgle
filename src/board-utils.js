export function diceAreAdjacent(firstDie, secondDie) {
    return (Math.abs(firstDie.row - secondDie.row) < 2) && (Math.abs(firstDie.col - secondDie.col) < 2)
  }