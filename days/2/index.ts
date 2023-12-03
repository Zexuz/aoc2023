export function part1(input: string) {
  const games = input.split("\n");
  let sum = 0;

  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  const logger = (message: string) => {
    console.log(message);
  }


  for (let game of games) {
    if (game.trim() == '') continue
    const gameParts = game.split(":");
    const gameName = gameParts[0].trim();
    const gameSets = gameParts[1].trim();


    let totalOfRed = 0;
    let totalOfGreen = 0;
    let totalOfBlue = 0;
    let isValue = true;

    logger(`Doing game ${gameName}`);

    const sets = gameSets.split(";");
    for (let set of sets) {
      logger(`Doing set ${set}`);
      const cubes = set.split(",");
      for (let cube of cubes) {
        logger(`Doing cube ${cube}`);
        const [number, color] = cube.trim().split(" ");


        if(color == 'red') {
          if(parseInt(number) > maxRed) {
            isValue = false;
            break;
          }
        }

        if(color == 'green') {
          if(parseInt(number) > maxGreen) {
            isValue = false;
            break;
          }
        }

        if(color == 'blue') {
          if(parseInt(number) > maxBlue) {
            isValue = false;
            break;
          }
        }
      }

      if(!isValue) {
        logger(`Game ${gameName} is not valid`);
        break;
      }
    }

    if(!isValue) {
      logger(`Game ${gameName} is not valid`);
      continue;
    }

    sum += parseInt(game.split(" ")[1]);
  }


  return sum;
}
