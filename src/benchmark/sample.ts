import { CPUStats } from "../utils/processMetrics";
import {
  calculateMean,
  calculateMedian,
  calculateStandardDeviation,
} from "./math";
import puppeteer from "puppeteer";

export interface Sample extends puppeteer.Metrics {
  fps: number[];
  memory: number;
  cpu: number;
  renders: number;
  duration: number;
  firstRender: number;
  process: CPUStats;
  whitespaceAmount: number;
}

export interface SamplesMeans {
  fps: {
    min: number;
    max: number;
    median: number;
    mean: number;
  };
  memory: number;
  cpu: number;
  firstRender: number;
  renders: number;
  duration: number;
  frames: number;
  nodes: number;
  layoutCount: number;
  layoutDuration: number;
  recalcStyleCount: number;
  recalcStyleDuration: number;
  process: number;
  whitespaceAmount: number;
}

export function samplesToMeans(samples: Sample[]): SamplesMeans {
  return {
    fps: {
      min: calculateMean(samples.map((sample) => Math.min(...sample.fps))),
      max: calculateMean(samples.map((sample) => Math.max(...sample.fps))),
      median: calculateMean(
        samples.map((sample) => calculateMedian(sample.fps))
      ),
      mean: calculateMean(samples.map((sample) => calculateMean(sample.fps))),
    },
    firstRender: calculateMean(samples.map((sample) => sample.firstRender)),
    memory: calculateMean(samples.map((sample) => sample.memory)),
    cpu: calculateMean(samples.map((sample) => sample.cpu)),
    renders: calculateMean(samples.map((sample) => sample.renders)),
    duration: calculateMean(samples.map((sample) => sample.duration)),
    whitespaceAmount: calculateMean(
      samples.map((sample) => sample.whitespaceAmount)
    ),

    frames: calculateMean(
      samples
        .map((sample) => sample.Frames)
        .filter((value): value is number => Boolean(value))
    ),
    nodes: calculateMean(
      samples
        .map((sample) => sample.Nodes)
        .filter((value): value is number => Boolean(value))
    ),
    layoutCount: calculateMean(
      samples
        .map((sample) => sample.LayoutCount)
        .filter((value): value is number => Boolean(value))
    ),
    layoutDuration: calculateMean(
      samples
        .map((sample) => sample.LayoutDuration)
        .filter((value): value is number => Boolean(value))
    ),
    recalcStyleCount: calculateMean(
      samples
        .map((sample) => sample.RecalcStyleCount)
        .filter((value): value is number => Boolean(value))
    ),
    recalcStyleDuration: calculateMean(
      samples
        .map((sample) => sample.RecalcStyleDuration)
        .filter((value): value is number => Boolean(value))
    ),

    process: calculateMean(samples.map((sample) => sample.process.average)),
  };
}

export function printSampleMetrics({
  fps,
  cpu,
  whitespaceAmount,
  renders,
  recalcStyleDuration,
  recalcStyleCount,
  process,
  nodes,
  memory,
  layoutDuration,
  layoutCount,
  frames,
  duration,
}: SamplesMeans): void {
  console.log(`
    FPS: 
      Min: ${fps.min} (?? = ${fps.min})
      Max: ${fps.max} (?? = ${fps.max})
      Median: ${fps.median} (?? = ${fps.median})
      Mean: ${fps} (?? = ${fps})
    Renders: ${renders} (?? = ${renders})
    Duration: ${duration} (?? = ${duration})
    Memory: ${memory} (?? = ${memory})
    CPU: ${cpu} (?? = ${cpu})
    CPU percentage usage: ${process} (?? = ${process})
    Frames: ${frames} (?? = ${frames})
    Nodes: ${nodes} (?? = ${nodes})
    LayoutCount: ${layoutCount} (?? = ${layoutCount})
    LayoutDuration: ${layoutDuration} (?? = ${layoutDuration})
    RecalcStyleCount: ${recalcStyleCount} (?? = ${recalcStyleCount})
    RecalcStyleDuration: ${recalcStyleDuration} (?? = ${recalcStyleDuration})
    WhitespaceAmount: ${whitespaceAmount} (?? = ${whitespaceAmount})
  `);
}
