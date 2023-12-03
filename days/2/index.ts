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


    let highestNumberOfRed = 0;
    let highestNumberOfGreen = 0;
    let highestNumberOfBlue = 0;
    let combinedPowers = 0;

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
          if(parseInt(number) > highestNumberOfRed) {
            highestNumberOfRed = parseInt(number);
          }

          if(parseInt(number) > maxRed) {
            isValue = false;
            // break;
          }
        }

        if(color == 'green') {
          if(parseInt(number) > highestNumberOfGreen) {
            highestNumberOfGreen = parseInt(number);
          }

          if(parseInt(number) > maxGreen) {
            isValue = false;
            // break;
          }
        }

        if(color == 'blue') {
          if(parseInt(number) > highestNumberOfBlue) {
            highestNumberOfBlue = parseInt(number);
          }

          if(parseInt(number) > maxBlue) {
            isValue = false;
            // break;
          }
        }
      }

      if(!isValue) {
        logger(`Game ${gameName} is not valid`);
        // break;
      }
    }

    combinedPowers = highestNumberOfRed * highestNumberOfGreen * highestNumberOfBlue;

    if(!isValue) {
      logger(`Game ${gameName} is not valid`);
      // continue;
    }

    // sum += parseInt(game.split(" ")[1]);
    sum += combinedPowers;
  }


  return sum;
}
