/// <reference types="../src/vite-env" />

import {
  loadPuppeteerBenchmarkResults,
  printPuppeteerBenchmarkResults,
} from "../src/benchmark";
import fs from "fs/promises";

async function loadAndPrintSampleResults(filePath: string) {
  const result = await loadPuppeteerBenchmarkResults(filePath);
  console.log(filePath);
  printPuppeteerBenchmarkResults(result);
}

const [fileName] = process.argv.slice(2);
fs.lstat(fileName).then(async (stat) => {
  if (stat.isDirectory()) {
    const samplePaths = await fs.readdir(fileName);
    for (const samplePath of samplePaths) {
      await loadAndPrintSampleResults(`${fileName}/${samplePath}`);
    }
  } else {
    loadAndPrintSampleResults(fileName);
  }
});
