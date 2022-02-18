import { CPUStats } from "../utils/processMetrics";
import {
  calculateMean,
  calculateMedian,
  calculateStandardDeviation,
} from "./math";

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
    min: Mean;
    max: Mean;
    median: Mean;
    mean: Mean;
  };
  memory: Mean;
  cpu: Mean;
  renders: Mean;
  duration: Mean;
  frames: Mean;
  nodes: Mean;
  layoutCount: Mean;
  layoutDuration: Mean;
  recalcStyleCount: Mean;
  recalcStyleDuration: Mean;
  process: Mean;
  whitespaceAmount: Mean;
}

export interface Mean {
  mean: number;
  standardDeviation: number;
}

const formatter = new Intl.NumberFormat("en");
const format = formatter.format.bind(formatter);

export function valuesToMetrics(numbers: number[]) {
  return {
    mean: calculateMean(numbers),
    standardDeviation: calculateStandardDeviation(numbers),
  };
}

export function samplesToSampleMetrics(samples: Sample[]): SampleMetrics {
  return {
    fps: {
      min: valuesToMetrics(samples.map((sample) => Math.min(...sample.fps))),
      max: valuesToMetrics(samples.map((sample) => Math.max(...sample.fps))),
      median: valuesToMetrics(
        samples.map((sample) => calculateMedian(sample.fps))
      ),
      mean: valuesToMetrics(samples.map((sample) => calculateMean(sample.fps))),
    },
    memory: valuesToMetrics(samples.map((sample) => sample.memory)),
    cpu: valuesToMetrics(samples.map((sample) => sample.cpu)),
    renders: valuesToMetrics(samples.map((sample) => sample.renders)),
    duration: valuesToMetrics(samples.map((sample) => sample.duration)),
    whitespaceAmount: valuesToMetrics(
      samples.map((sample) => sample.whitespaceAmount)
    ),

    frames: valuesToMetrics(samples.map((sample) => sample.frames)),
    nodes: valuesToMetrics(samples.map((sample) => sample.nodes)),
    layoutCount: valuesToMetrics(samples.map((sample) => sample.layoutCount)),
    layoutDuration: valuesToMetrics(
      samples.map((sample) => sample.layoutDuration)
    ),
    recalcStyleCount: valuesToMetrics(
      samples.map((sample) => sample.recalcStyleCount)
    ),
    recalcStyleDuration: valuesToMetrics(
      samples.map((sample) => sample.recalcStyleDuration)
    ),

    process: valuesToMetrics(samples.map((sample) => sample.process.average)),
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
      Min: ${format(fps.min.mean)} (σ = ${format(fps.min.standardDeviation)})
      Max: ${format(fps.max.mean)} (σ = ${format(fps.max.standardDeviation)})
      Median: ${format(fps.median.mean)} (σ = ${format(
    fps.median.standardDeviation
  )})
      Mean: ${format(fps.mean.mean)} (σ = ${format(fps.mean.standardDeviation)})
    Renders: ${format(renders.mean)} (σ = ${format(renders.standardDeviation)})
    Duration: ${format(duration.mean)} (σ = ${format(
    duration.standardDeviation
  )})
    Memory: ${format(memory.mean)} (σ = ${format(memory.standardDeviation)})
    CPU: ${format(cpu.mean)} (σ = ${format(cpu.standardDeviation)})
    CPU percentage usage: ${format(process.mean)} (σ = ${format(
    process.standardDeviation
  )})
    Frames: ${format(frames.mean)} (σ = ${format(frames.standardDeviation)})
    Nodes: ${format(nodes.mean)} (σ = ${format(nodes.standardDeviation)})
    LayoutCount: ${format(layoutCount.mean)} (σ = ${format(
    layoutCount.standardDeviation
  )})
    LayoutDuration: ${format(layoutDuration.mean)} (σ = ${format(
    layoutDuration.standardDeviation
  )})
    RecalcStyleCount: ${format(recalcStyleCount.mean)} (σ = ${format(
    recalcStyleCount.standardDeviation
  )})
    RecalcStyleDuration: ${format(recalcStyleDuration.mean)} (σ = ${format(
    recalcStyleDuration.standardDeviation
  )})
    WhitespaceAmount: ${format(whitespaceAmount.mean)} (σ = ${format(
    whitespaceAmount.standardDeviation
  )})
  `);
}
