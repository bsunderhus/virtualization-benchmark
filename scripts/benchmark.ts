/// <reference types="../src/vite-env" />

import { preview } from "vite";
import puppeteer from "puppeteer";
import paths from "../src/scenarios/paths.json";
import { runFPSMeasure, simulateScroll } from "../src/benchmark";
import { printSamplesMeasure } from "../src/benchmark/sample";
import { Mode } from "../src/utils/configuration";

const PORT = 5000;

export async function runPuppeteerBenchmark() {
  const browser = await puppeteer.launch({
    args: [
      "--font-render-hinting=none",
      "--disable-features=SpareRendererForSitePerProcess",
    ],
    headless: false,
    devtools: true,
  });

  for (const [name, path] of Object.entries(paths)) {
    console.log(`${name}:`);
    const samples = await runFPSMeasure({
      browser,
      mode: Mode.FULL,
      url: `http://localhost:${PORT}/${path}`,
      setupTest: async (page: puppeteer.Page) => {
        await page.mouse.move(200, 200);
        await simulateScroll(page, { duration: 5000, deltaY: 300 });
      },
    });
    printSamplesMeasure(samples);
  }
  await browser.close();
}

(async () => {
  const server = await preview({ preview: { port: PORT } });
  await runPuppeteerBenchmark();
  server.httpServer.close();
})();
