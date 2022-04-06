import { CPUStats } from "../utils/processMetrics";
import {
  calculateMean,
  calculateMedian,
  calculateStandardDeviation,
} from "./math";
import Table from "cli-table3";

export interface Sample {
  fps: number[];
  memory: number;
  cpu: number;
  renders: number;
  duration: number;
  frames: number;
  nodes: number;
  layoutCount: number;
  layoutDuration: number;
  recalcStyleCount: number;
  recalcStyleDuration: number;
  process: CPUStats;
  whitespaceAmount: number;
}

export interface SampleMetrics {
  fps: {
    min: number;
    max: number;
    median: number;
    mean: number;
  };
  memory: number;
  cpu: number;
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

export interface Mean {
  mean: number;
  standardDeviation: number;
}

const formatter = new Intl.NumberFormat("en");
const format = formatter.format.bind(formatter);

export function valuesToMetrics(numbers: number[]): Mean {
  return {
    mean: calculateMean(numbers),
    standardDeviation: calculateStandardDeviation(numbers),
  };
}

export function samplesToSampleMetrics(samples: Sample[]): SampleMetrics {
  return {
    fps: {
      min: calculateMean(samples.map((sample) => Math.min(...sample.fps))),
      max: calculateMean(samples.map((sample) => Math.max(...sample.fps))),
      median: calculateMean(
        samples.map((sample) => calculateMedian(sample.fps))
      ),
      mean: calculateMean(samples.map((sample) => calculateMean(sample.fps))),
    },
    memory: calculateMean(samples.map((sample) => sample.memory)),
    cpu: calculateMean(samples.map((sample) => sample.cpu)),
    renders: calculateMean(samples.map((sample) => sample.renders)),
    duration: calculateMean(samples.map((sample) => sample.duration)),
    whitespaceAmount: calculateMean(
      samples.map((sample) => sample.whitespaceAmount)
    ),

    frames: calculateMean(samples.map((sample) => sample.frames)),
    nodes: calculateMean(samples.map((sample) => sample.nodes)),
    layoutCount: calculateMean(samples.map((sample) => sample.layoutCount)),
    layoutDuration: calculateMean(
      samples.map((sample) => sample.layoutDuration)
    ),
    recalcStyleCount: calculateMean(
      samples.map((sample) => sample.recalcStyleCount)
    ),
    recalcStyleDuration: calculateMean(
      samples.map((sample) => sample.recalcStyleDuration)
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
}: SampleMetrics): void {
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
