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
      Min: ${fps.min} (σ = ${fps.min})
      Max: ${fps.max} (σ = ${fps.max})
      Median: ${fps.median} (σ = ${fps.median})
      Mean: ${fps} (σ = ${fps})
    Renders: ${renders} (σ = ${renders})
    Duration: ${duration} (σ = ${duration})
    Memory: ${memory} (σ = ${memory})
    CPU: ${cpu} (σ = ${cpu})
    CPU percentage usage: ${process} (σ = ${process})
    Frames: ${frames} (σ = ${frames})
    Nodes: ${nodes} (σ = ${nodes})
    LayoutCount: ${layoutCount} (σ = ${layoutCount})
    LayoutDuration: ${layoutDuration} (σ = ${layoutDuration})
    RecalcStyleCount: ${recalcStyleCount} (σ = ${recalcStyleCount})
    RecalcStyleDuration: ${recalcStyleDuration} (σ = ${recalcStyleDuration})
    WhitespaceAmount: ${whitespaceAmount} (σ = ${whitespaceAmount})
  `);
}
