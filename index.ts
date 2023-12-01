import {readdir} from 'fs/promises'
import {Stopwatch} from "./libs/stopwatch.ts";
import * as fs from "fs";

const getAvailableDays = async () => {
  const rootDir = process.cwd();
  const dirs = await readdir('./days', {withFileTypes: true});
  return dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
}
const main = async () => {
  const args = Bun.argv;

  const avalibleDays = await getAvailableDays();

  const getUserSelectedDay = async () => {

    const devMode = args.includes('--dev');
    if (devMode) {
      console.log("Running in dev mode")
      return new Date().getDate();
    }

    const printPrompt = () => {
      console.log("Choose one of the folloing days by choosing a number:")
      console.log(avalibleDays)
    }

    printPrompt();
    for await (const line of console) {
      const day = parseInt(line);
      if (avalibleDays.includes(line)) {
        return day;
      }
      console.log("Invalid day, try again")
      printPrompt();
    }

    throw new Error("No day selected")
  }

  const selectedDay = await getUserSelectedDay();
  const filePath = `./days/${selectedDay}`
  const module = await import(filePath);
  const dayInput = await getInputForDay(selectedDay);

  const stopwatch = new Stopwatch();
  stopwatch.start();
  const res = module.part1(dayInput)
  stopwatch.stop();
  const sourceCode = await Bun.file(filePath + '/index.ts').text();
  const result = new Result(sourceCode, res, stopwatch.read(), Date.now())
  await writeResult(result, selectedDay)
  console.log(`Finished in ${stopwatch.read()}ms, result: ${res}`)
}

class Result {

  constructor(
    public code: string,
    public result: any,
    public time: number,
    public executionTime: number
  ) {
  }

  toJson() {
    return JSON.stringify(this)
  }

  static fromJson(json: string) {
    const obj = JSON.parse(json) as any;
    return new Result(obj.code, obj.result, obj.time, obj.executionTime)
  }
}

const writeResult = async (result: Result, day: number) => {
  const dir = `./results/${day}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const outputFile = Bun.file(`${dir}/${result.executionTime}.json`)
  await Bun.write(outputFile, result.toJson())
}


const checkForCachedInput = async (day: number) => {
  const dir = `./inputs/${day}`
  if (!fs.existsSync(dir)) {
    return null;
  }

  return await Bun.file(`${dir}/${day}.txt`).text()
}

const cacheInput = async (day: number, input: string) => {
  const dir = `./inputs/${day}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const outputFile = Bun.file(`${dir}/${day}.txt`)
  await Bun.write(outputFile, input)
}


const getInputForDay = async (day: number) => {
  const data = await checkForCachedInput(day);
  if (data) {
    return data;
  }

  const response = await fetch(getInputUrl(day), {
    headers: {
      cookie: `session=${process.env.AOC_SESSION_COOKIE}`
    }
  })
  const text = await response.text();

  await cacheInput(day, text);

  return text
};


const baseUrl = 'https://adventofcode.com/2023'
const getInputUrl = (day: number) => `${baseUrl}/day/${day}/input`


await main();
