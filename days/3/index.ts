interface NumberWithIndex {
  value: number,
  startIndex: number,
  endIndex: number,
}

function findNumbersOnLine(line: string, searchStrings: string[]) {

  const numbers = [];

  let stringBuilder = '';
  let isBuildingString = false;
  let startIndex = 0;
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (!searchStrings.includes(char)) {
      if (isBuildingString) {
        numbers.push({
          value: parseInt(stringBuilder),
          startIndex,
          endIndex: j - 1,
        })
        isBuildingString = false;
        stringBuilder = '';
      }
      continue;
    }

    if (!isBuildingString) {
      startIndex = j;
    }

    isBuildingString = true;
    stringBuilder += char;
  }

  if (isBuildingString) {
    numbers.push({
      value: parseInt(stringBuilder),
      startIndex,
      endIndex: line.length - 1,
    })
  }

  return numbers;
}

function checkForSymbols(number: NumberWithIndex, line: string, previousLine: string, nextLine: string) {
  const {startIndex, endIndex, value} = number;
  const safeStartIndex = startIndex == 0 ? 0 : startIndex - 1;
  const safeEndIndex = endIndex == line.length - 1 ? endIndex + 1 : endIndex + 2;


  let combinedString = '';

  if (previousLine) {
    combinedString += previousLine.substring(safeStartIndex, safeEndIndex)
  }

  if (nextLine) {
    combinedString += nextLine.substring(safeStartIndex, safeEndIndex)
  }

  if (startIndex != 0) {
    combinedString += line.substring(safeStartIndex, safeStartIndex + 1);
  }

  if (endIndex != line.length - 1) {
    combinedString += line.substring(safeEndIndex - 1, safeEndIndex);
  }

  console.log('combined', combinedString);

  const symbolsRegEx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g;

  return symbolsRegEx.test(combinedString);
}

export const part1 = (input: string) => {
  let sum = 0;

  const lines = input.split("\n");

  const searchStrings = '1234567890'.split('');

  for (let i = 0; i < lines.length; i++) {
    const previousLine = i > 0 ? lines[i - 1] : "";
    const line = lines[i];
    const nextLine = i < lines.length - 1 ? lines[i + 1] : "";

    const numbers = findNumbersOnLine(line, searchStrings);


    for (let number of numbers) {
      if (!checkForSymbols(number, line, previousLine, nextLine)) continue;

      sum += number.value;
    }
  }


  return sum;
}
