/// <reference types="../src/vite-env" />

import {
  loadPuppeteerBenchmarkResults,
  printPuppeteerBenchmarkResults,
} from "../src/benchmark";

import fs from "fs/promises";

(async () => {
  const samplePaths = await fs.readdir("src/samples");
  for (const samplePath of samplePaths) {
    const result = await loadPuppeteerBenchmarkResults(
      `src/samples/${samplePath}`
    );
    console.log(`\n${samplePath}\n`);
    await printPuppeteerBenchmarkResults(result);
  }
})();
