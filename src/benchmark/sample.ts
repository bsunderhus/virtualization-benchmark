import { CPUStats } from "../utils/processMetrics";
import { calculateMean, calculateStandardDeviation } from "./math";

export interface Sample {
  min: number;
  max: number;
  median: number;
  mean: number;
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
}

const formatter = new Intl.NumberFormat("en");
const format = formatter.format.bind(formatter);

export function printSamplesMeasure(samples: Sample[]): void {
  const mins = samples.map((result) => result.min);
  const maxs = samples.map((result) => result.max);
  const medians = samples.map((result) => result.median);
  const means = samples.map((result) => result.mean);
  const memories = samples.map((result) => result.memory);
  const cpus = samples.map((result) => result.cpu);
  const renderss = samples.map((result) => result.renders);
  const durations = samples.map((result) => result.duration);

  const framesArray = samples.map((result) => result.frames);
  const nodesArray = samples.map((result) => result.nodes);
  const layoutCountArray = samples.map((result) => result.layoutCount);
  const layoutDurationArray = samples.map((result) => result.layoutDuration);
  const recalcStyleCountArray = samples.map(
    (result) => result.recalcStyleCount
  );
  const recalcStyleDurationArray = samples.map(
    (result) => result.recalcStyleDuration
  );

  const processes = samples.map((result) => result.process.average);

  const min = calculateMean(mins);
  const minSTD = calculateStandardDeviation(mins);
  const max = calculateMean(maxs);
  const maxSTD = calculateStandardDeviation(maxs);
  const median = calculateMean(medians);
  const medianSTD = calculateStandardDeviation(medians);
  const mean = calculateMean(means);
  const meanSTD = calculateStandardDeviation(means);
  const memory = calculateMean(memories);
  const memorySTD = calculateStandardDeviation(memories);
  const cpu = calculateMean(cpus);
  const cpuSTD = calculateStandardDeviation(cpus);
  const renders = calculateMean(renderss);
  const rendersSTD = calculateStandardDeviation(renderss);
  const duration = calculateMean(durations);
  const durationSTD = calculateStandardDeviation(durations);

  const process = calculateMean(processes);
  const processSTD = calculateStandardDeviation(processes);

  const framesMean = calculateMean(framesArray);
  const framesSTD = calculateStandardDeviation(framesArray);
  const nodesMean = calculateMean(nodesArray);
  const nodesSTD = calculateStandardDeviation(nodesArray);
  const layoutCountMean = calculateMean(layoutCountArray);
  const layoutCountSTD = calculateStandardDeviation(layoutCountArray);
  const layoutDurationMean = calculateMean(layoutDurationArray);
  const layoutDurationSTD = calculateStandardDeviation(layoutDurationArray);
  const recalcStyleCountMean = calculateMean(recalcStyleCountArray);
  const recalcStyleCountSTD = calculateStandardDeviation(recalcStyleCountArray);
  const recalcStyleDurationMean = calculateMean(recalcStyleDurationArray);
  const recalcStyleDurationSTD = calculateStandardDeviation(
    recalcStyleDurationArray
  );

  console.log(`
    Min: ${format(min)} fps (σ = ${format(minSTD)})
    Max: ${format(max)} fps (σ = ${format(maxSTD)})
    Median: ${format(median)} fps (σ = ${format(medianSTD)})
    Mean: ${format(mean)} fps (σ = ${format(meanSTD)})
    renders: ${format(renders)} (σ = ${format(rendersSTD)})
    duration: ${format(duration)} (σ = ${format(durationSTD)})
    Memory: ${format(memory)} (σ = ${format(memorySTD)})
    CPU: ${format(cpu)} (σ = ${format(cpuSTD)})
    CPU percentage usage: ${format(process)} (σ = ${format(processSTD)})
    Frames: ${format(framesMean)} (σ = ${format(framesSTD)})
    Nodes: ${format(nodesMean)} (σ = ${format(nodesSTD)})
    LayoutCount: ${format(layoutCountMean)} (σ = ${format(layoutCountSTD)})
    LayoutDuration: ${format(layoutDurationMean)} (σ = ${format(
    layoutDurationSTD
  )})
    RecalcStyleCount: ${format(recalcStyleCountMean)} (σ = ${format(
    recalcStyleCountSTD
  )})
    RecalcStyleDuration: ${format(recalcStyleDurationMean)} (σ = ${format(
    recalcStyleDurationSTD
  )})
  `);
}
