import { performance } from 'perf_hooks';

export class Stopwatch {
  private startTime: number;
  private endTime: number;

  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  start(): void {
    this.startTime = performance.now();
  }

  stop(): void {
    this.endTime = performance.now();
  }

  read(): number {
    return this.endTime - this.startTime;
  }
}
