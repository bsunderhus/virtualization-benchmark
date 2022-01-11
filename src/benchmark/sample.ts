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

  const min = calculateMean(mins);
  const minStd = calculateStandardDeviation(mins);
  const max = calculateMean(maxs);
  const maxStd = calculateStandardDeviation(maxs);
  const median = calculateMean(medians);
  const medianStd = calculateStandardDeviation(medians);
  const mean = calculateMean(means);
  const meanStd = calculateStandardDeviation(means);
  const memory = calculateMean(memories);
  const memoryStd = calculateStandardDeviation(memories);
  const cpu = calculateMean(cpus);
  const cpuStd = calculateStandardDeviation(cpus);
  const renders = calculateMean(renderss);
  const rendersStd = calculateStandardDeviation(renderss);
  const duration = calculateMean(durations);
  const durationStd = calculateStandardDeviation(durations);

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
    Min: ${format(min)} fps (σ = ${format(minStd)})
    Max: ${format(max)} fps (σ = ${format(maxStd)})
    Median: ${format(median)} fps (σ = ${format(medianStd)})
    Mean: ${format(mean)} fps (σ = ${format(meanStd)})
    renders: ${format(renders)} (σ = ${format(rendersStd)})
    duration: ${format(duration)} (σ = ${format(durationStd)})
    Memory: ${format(memory)} (σ = ${format(memoryStd)})
    CPU: ${format(cpu)} (σ = ${format(cpuStd)})
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
