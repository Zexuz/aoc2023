export function part1(input: string) {
  const lines = input.split("\n");

  const searchStrings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const searchStringsMap = new Map<string, number>(
    [
      ['1', 1],
      ['2', 2],
      ['3', 3],
      ['4', 4],
      ['5', 5],
      ['6', 6],
      ['7', 7],
      ['8', 8],
      ['9', 9],
      ['one', 1],
      ['two', 2],
      ['three', 3],
      ['four', 4],
      ['five', 5],
      ['six', 6],
      ['seven', 7],
      ['eight', 8],
      ['nine', 9],
    ])

  let sum = 0;

  for (const line of lines) {
    if (line.trim() == '') continue

    let lowestMatchIndex = lines.length - 1;
    let lowestMatchSearchString = '';

    let highestMatchIndex = 0;
    let highestMatchSearchString = '';

    for (const searchString of searchStrings) {
      const index = line.indexOf(searchString);
      const lastIndex = line.lastIndexOf(searchString);
      if (index == -1) continue

      if (index <= lowestMatchIndex) {
        lowestMatchIndex = index;
        lowestMatchSearchString = searchString;
      }

      if (lastIndex >= highestMatchIndex) {
        highestMatchIndex = lastIndex;
        highestMatchSearchString = searchString;
      }
    }

    sum += parseInt(searchStringsMap.get(lowestMatchSearchString)! + "" + searchStringsMap.get(highestMatchSearchString)!);
  }

  return sum;
}
