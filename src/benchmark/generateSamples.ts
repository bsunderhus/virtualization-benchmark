import puppeteer from "puppeteer";

import { processMap, processMemory } from "./memory";
import { calculateMedian } from "./math";
import { Sample } from "./sample";
import { Mode } from "../utils/configuration";
import { startProcessMetrics } from "../utils/processMetrics";
import {
  FrameObject,
  PuppeteerScreenCastFrames,
} from "../utils/PuppeteerScreenCastFrames";
import { base64ToWhitespaceAmount } from "../utils/base64ToWhitespaceAmount";

const PROCESS_NAME = "type=renderer";

export interface FPSMeasureOptions {
  browser: puppeteer.Browser;
  interact: (page: puppeteer.Page) => Promise<void>;
  url: string;
  mode: Mode;
}

// Inspired by
// https://github.com/Janpot/mui-plus/blob/master/scripts/benchmark.ts
export async function generateSamples({
  browser,
  interact,
  url,
  mode,
}: FPSMeasureOptions) {
  const samples: Sample[] = [];
  const frames: FrameObject[] = [];

  const processes = await processMap(PROCESS_NAME);
  for (let i = 0; i < 4; i += 1) {
    const page = await browser.newPage();
    await page.goto(url);
    await page.bringToFront();
    const devtoolsProtocolClient = await page.target().createCDPSession();
    const imageFrames: FrameObject[] = [];
    const puppeteerScreenCastFrames = new PuppeteerScreenCastFrames();
    await puppeteerScreenCastFrames.init(devtoolsProtocolClient, (frame) => {
      imageFrames.push(frame);
    });
    await page.evaluate((mode) => {
      window.__setMode(mode);
    }, mode);

    const getProcessMetrics = await startProcessMetrics(
      devtoolsProtocolClient,
      300
    );
    await puppeteerScreenCastFrames.start({ maxHeight: 600, maxWidth: 800 });
    await page.evaluate(() => {
      window.__fps = [];
      let lastFrameTime: number | undefined;
      const loop = (frameTime: number) => {
        if (typeof lastFrameTime === "number") {
          const fps = 1 / ((window.performance.now() - lastFrameTime) / 1000);
          window.__fps!.push(fps);
        }
        lastFrameTime = frameTime;
        window.requestAnimationFrame(loop);
      };
      window.requestAnimationFrame(loop);
    });
    await interact(page);
    const { renders, fps, firstRender, start, lastRender } =
      await page.evaluate(() => ({
        fps: window.__fps ?? [],
        firstRender: window.__firstRender!,
        renders: window.__renders!,
        lastRender: window.__lastRender!,
        // duration: window.__lastRender! - window.__start!,
        start: window.__start!,
      }));
    await puppeteerScreenCastFrames.stop();
    const processMetrics = await getProcessMetrics();
    const { pid, memory, cpu } = await processMemory(processes, PROCESS_NAME);
    processes[pid] = true;

    const metrics = await page.metrics();
    await page.close();
    samples.push({
      ...metrics,
      firstRender: firstRender!,
      process: processMetrics,
      fps: fps,
      memory: Number.parseInt(memory),
      cpu: Math.ceil(Number.parseFloat(cpu)),
      renders: renders!,
      duration: 0,
      whitespaceAmount: calculateMedian(
        await Promise.all(
          imageFrames.map((frame) => base64ToWhitespaceAmount(frame.data))
        )
      ),
    });
    frames.push(...imageFrames);
  }
  return [samples, frames] as const;
}
