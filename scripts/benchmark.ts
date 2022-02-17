/// <reference types="../src/vite-env" />

import { preview } from "vite";
import puppeteer from "puppeteer";
import scenarios from "../scenarios.json";
import { runFPSMeasure, scrollOverTime } from "../src/benchmark";
import { printSamplesMeasure } from "../src/benchmark/sample";
import { Mode } from "../src/utils/configuration";
import { FrameObject } from "../src/utils/PuppeteerMassScreenshot";
import rimraf from "rimraf";
import { mkdirIfNotExists } from "../src/utils/mkdirIfNotExists";
import fs from "fs/promises";

const PORT = 5000;

export async function runPuppeteerBenchmark() {
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

  rimraf.sync("./screenshots");
  for (const scenario of scenarios) {
    await mkdirIfNotExists(`./screenshots/${scenario.path}`);
    console.log(`${scenario.name} ${scenario.external ?? ""}:`);
    const frames: FrameObject[] = [];
    const samples = await runFPSMeasure({
      browser,
      mode: Mode.FULL,
      url: `http://localhost:${PORT}/${scenario.path}`,
      setupTest: async (page: puppeteer.Page) => {
        await page.mouse.move(200, 200);
        await scrollOverTime(page, {
          duration: 2000,
          deltaY: 500,
        });
      },
      afterFrame: (frame) => {
        frames.push(frame);
      },
    });
    for (const frame of frames) {
      await fs.writeFile(
        `./screenshots/${scenario.path}/${frame.metadata.timestamp}.png`,
        frame.data,
        "base64"
      );
    }
    printSamplesMeasure(samples);
  }
  await browser.close();
}

(async () => {
  const server = await preview({ preview: { port: PORT } });
  await runPuppeteerBenchmark();
  server.httpServer.close();
})();
