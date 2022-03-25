import puppeteer from "puppeteer";
import rimraf from "rimraf";
import fs from "fs/promises";
import { Mode } from "../utils/configuration";
import { mkdirIfNotExists } from "../utils/mkdirIfNotExists";
import { FrameObject } from "../utils/PuppeteerScreenCastFrames";
import scenarios from "../../scenarios.json";
import { printSampleMetrics, Sample, samplesToSampleMetrics } from "./sample";
import { generateSamples } from "./generateSamples";
import { scrollOverTime } from "./scrollOverTime";

type Scenario = typeof scenarios[number];
interface PuppeteerBenchmarkResult {
  scenario: Scenario;
  samples: Sample[];
  images: FrameObject[];
}

export interface RunPuppeteerBenchmarkOptions {
  baseURL: string;
  mode: Mode;
  duration: number;
  delta: number;
}

export async function runPuppeteerBenchmark(
  options: RunPuppeteerBenchmarkOptions
) {
  const browser = await puppeteer.launch({
    args: [
      "--font-render-hinting=none",
      "--disable-features=SpareRendererForSitePerProcess",
      "--js-flags=--expose-gc",
      "--enable-precise-memory-info",
      "--enable-gpu-rasterization",
      "--no-first-run",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-cache",
      "--disable-translate",
      "--disable-sync",
      "--disable-extensions",
      "--disable-default-apps",
    ],
    headless: false,
    devtools: true,
  });

  const result = await scenarios.reduce(async (acc, scenario) => {
    const previous = await acc;
    const [samples, images] = await generateSamples({
      browser,
      mode: options.mode,
      url: `${options.baseURL}/${scenario.path}`,
      setupTest: async (page: puppeteer.Page) => {
        await page.mouse.move(200, 200);
        await scrollOverTime(page, {
          duration: options.duration,
          deltaY: options.delta,
        });
      },
    });
    return [...previous, { scenario, samples, images }];
  }, Promise.resolve<PuppeteerBenchmarkResult[]>([]));

  await browser.close();
  return result;
}

export async function savePuppeteerBenchmarkFrames(
  basePath: string,
  results: Pick<PuppeteerBenchmarkResult, "scenario" | "images">[]
) {
  rimraf.sync(basePath);
  for (const { scenario, images } of results) {
    await mkdirIfNotExists(`${basePath}/${scenario.path}`);
    for (const frame of images) {
      await fs.writeFile(
        `${basePath}/${scenario.path}/${frame.metadata.timestamp}.png`,
        frame.data,
        "base64"
      );
    }
  }
}

export async function printPuppeteerBenchmarkResults(
  results: Pick<PuppeteerBenchmarkResult, "scenario" | "samples">[]
) {
  for (const { scenario, samples } of results) {
    console.log(`${scenario.name}:`);
    printSampleMetrics(samplesToSampleMetrics(samples));
  }
}

export async function loadPuppeteerBenchmarkResults(fileName: string) {
  return JSON.parse(await fs.readFile(fileName, "utf8")) as Pick<
    PuppeteerBenchmarkResult,
    "scenario" | "samples"
  >[];
}

export async function savePuppeteerBenchmarkResults(
  fileName: string,
  results: PuppeteerBenchmarkResult[]
) {
  await fs.writeFile(
    fileName,
    JSON.stringify(
      results.map(({ scenario, samples }) => ({ scenario, samples })),
      null,
      2
    )
  );
}
