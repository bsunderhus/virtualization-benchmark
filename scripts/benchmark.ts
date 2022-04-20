/// <reference types="../src/vite-env" />

import {
  runPuppeteerBenchmark,
  savePuppeteerBenchmarkResults,
} from "../src/benchmark";
import fs from "fs/promises";

import { preview } from "vite";
import { Mode } from "../src/utils/configuration";

const PORT = 5000;

async function run(modes: Mode[], basePath: string) {
  await fs.mkdir(basePath, { recursive: true });
  const server = await preview({ preview: { port: PORT } });
  for (const mode of modes) {
    savePuppeteerBenchmarkResults(
      `${basePath}/${mode}.json`,
      await runPuppeteerBenchmark({
        baseURL: `http://localhost:${PORT}`,
        mode,
        duration: 8000,
        delta: 100,
      })
    );
  }
  server.httpServer.close();
}

const [basePath] = process.argv.slice(2);

if (basePath) {
  run([Mode.CHAT_LIST_ITEM, Mode.FULL, Mode.LIGHT], basePath);
}
