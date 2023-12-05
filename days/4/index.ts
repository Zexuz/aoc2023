export const part1 = (input: string) => {
  const lines = input.split("\n");

  let sum = 0;

  for (let line of lines) {
    if (line.trim() === "") continue;

    const split = line.split(":");
    const cardId = split[0].trim().split(" ")[1];

    const cardString = split[1].trim();
    const cardParts = cardString.split("|");
    const winningNumber = cardParts[0].trim().split(" ").filter(s => s.trim() !== "").map(n => parseInt(n));
    const myNumbers = cardParts[1].trim().split(" ").filter(s => s.trim() !== "").map(n => parseInt(n));

    const numberOfMatches = myNumbers.filter(n => winningNumber.includes(n)).length;

    sum += numberOfMatches;
    // if(numberOfMatches === 0) continue;
    // sum += Math.pow(2, numberOfMatches - 1)
  }

  return (sum + lines.length-1) *2;
}
