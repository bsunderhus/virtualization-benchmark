/// <reference types="../src/vite-env" />

import { preview } from "vite";
import puppeteer from "puppeteer";
import scenarios from "../scenarios.json";
import { delay } from "../src/utils/delay";

type Scenario = typeof scenarios[number];

const PORT = 5000;

export async function runPuppeteerBenchmark() {
  const browser = await puppeteer.launch({
    args: [
      // "--font-render-hinting=none",
      // "--disable-features=SpareRendererForSitePerProcess",
      // "--js-flags=--expose-gc",
      // "--enable-precise-memory-info",
      // "--enable-gpu-rasterization",
      // "--no-first-run",
      // "--disable-background-networking",
      // "--disable-background-timer-throttling",
      // "--disable-cache",
      // "--disable-translate",
      // "--disable-sync",
      // "--disable-extensions",
      // "--disable-default-apps",
    ],
    headless: false,
    devtools: false,
  });

  for (const scenario of scenarios) {
    const page = await browser.newPage();
    // const devtoolsProtocolClient = await page.target().createCDPSession();
    // await devtoolsProtocolClient.send("Overlay.setShowFPSCounter", {
    //   show: true,
    // });
    await page.goto(`http://localhost:${PORT}/${scenario.path}`);
    await delay(1000);
    await page.evaluate(() => {
      const main = document.querySelector("main");
      if (main) {
        main.scroll({ top: main.scrollHeight, behavior: "smooth" });
      }
    });
    await delay(100000);
    await page.close();
  }

  await browser.close();
}

(async () => {
  const server = await preview({ preview: { port: PORT } });
  await runPuppeteerBenchmark();
  server.httpServer.close();
})();
