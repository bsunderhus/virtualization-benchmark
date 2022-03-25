/// <reference types="../src/vite-env" />

import {
  runPuppeteerBenchmark,
  savePuppeteerBenchmarkResults,
} from "../src/benchmark";

import { preview } from "vite";
import { Mode } from "../src/utils/configuration";

const PORT = 5000;

async function run(modes: Mode[]) {
  const server = await preview({ preview: { port: PORT } });
  for (const mode of modes) {
    savePuppeteerBenchmarkResults(
      `src/samples/${mode}.json`,
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

run([Mode.CHAT_LIST_ITEM, Mode.FULL]);
