import puppeteer from "puppeteer";
import rimraf from "rimraf";
import fs from "fs/promises";
import { Mode } from "../utils/configuration";
import { mkdirIfNotExists } from "../utils/mkdirIfNotExists";
import { FrameObject } from "../utils/PuppeteerScreenCastFrames";
import scenarios from "../../scenarios.json" assert { type: "json" };
import { Sample, SamplesMeans, samplesToMeans } from "./sample";
import { generateSamples } from "./generateSamples";
import { scrollOverTime } from "./scrollOverTime";
import Table, {
  CrossTableRow,
  HorizontalTableRow,
  TableConstructorOptions,
  VerticalTableRow,
} from "cli-table3";

type Scenario = (typeof scenarios)[number];
export interface PuppeteerBenchmarkResult {
  scenario: Scenario;
  samples: Sample[];
  images: FrameObject[];
}
export type PuppeteerBenchmarkResultWithoutImage = Pick<
  PuppeteerBenchmarkResult,
  "scenario" | "samples"
>;

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

      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-zygote",
    ],
    headless: false,
    devtools: true,
  });

  const result: PuppeteerBenchmarkResult[] = [];

  for (const scenario of scenarios) {
    const [samples, images] = await generateSamples({
      browser,
      mode: options.mode,
      url: `${options.baseURL}/${scenario.path}`,
      interact: async (page: puppeteer.Page) => {
        await page.mouse.move(200, 200);
        await scrollOverTime(page, {
          duration: options.duration,
          deltaY: options.delta,
        });
      },
    });
    result.push({ scenario, samples, images });
  }
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

export function sampleMeansToRows(metrics: SamplesMeans[]) {
  return [
    {
      "FPS Max": metrics.map(({ fps }) => fps.max.toFixed(2)),
    },
    {
      "FPS Min": metrics.map(({ fps }) => fps.min.toFixed(2)),
    },
    {
      "FPS Median": metrics.map(({ fps }) => fps.median.toFixed(2)),
    },
    {
      "FPS Mean": metrics.map(({ fps }) => fps.mean.toFixed(2)),
    },
    { Renders: metrics.map(({ renders }) => Math.round(renders)) },
    { Duration: metrics.map(({ duration }) => Math.round(duration)) },
    {
      FirstRender: metrics.map(({ firstRender }) => Math.round(firstRender)),
    },
    { Memory: metrics.map(({ memory }) => memory) },
    { "CPU %": metrics.map(({ process }) => process.toFixed(2)) },
    { Frames: metrics.map(({ frames }) => Math.round(frames)) },
    { Nodes: metrics.map(({ nodes }) => Math.round(nodes)) },
    {
      LayoutCount: metrics.map(({ layoutCount }) => Math.round(layoutCount)),
    },
    {
      LayoutDuration: metrics.map(({ layoutDuration }) =>
        Math.round(layoutDuration)
      ),
    },
    {
      RecalcStyleCount: metrics.map(({ recalcStyleCount }) =>
        Math.round(recalcStyleCount)
      ),
    },
    {
      RecalcStyleDuration: metrics.map(({ recalcStyleDuration }) =>
        Math.round(recalcStyleDuration)
      ),
    },
    {
      Whitespace: metrics.map(({ whitespaceAmount }) =>
        Math.round(whitespaceAmount)
      ),
    },
  ] as CrossTableRow[];
}

export function puppeteerBenchmarkResultsPerScenarioToTables(
  results: Record<string, Record<Mode, Sample[]>>,
  options?: TableConstructorOptions
) {
  return Object.fromEntries(
    Object.entries(results).map(([scenarioName, resultPerMode]) => {
      const table = new Table({
        head: ["", ...Object.keys(resultPerMode)],
        ...options,
      });

      const metrics = Object.values(resultPerMode).map((results) =>
        samplesToMeans(results)
      );
      table.push(...sampleMeansToRows(metrics));

      return [scenarioName, table] as const;
    })
  );
}

export function puppeteerBenchmarkResultsToTable(
  results: Pick<PuppeteerBenchmarkResult, "scenario" | "samples">[],
  options?: TableConstructorOptions
) {
  const table = new Table({
    head: ["", ...results.map((result) => result.scenario.name)],
    ...options,
  });

  const metrics = results.map((result) => samplesToMeans(result.samples));
  table.push(...sampleMeansToRows(metrics));
  return table;
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
