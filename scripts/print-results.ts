/// <reference types="../src/vite-env" />

import {
  loadPuppeteerBenchmarkResults,
  puppeteerBenchmarkResultsPerScenarioToTables,
  puppeteerBenchmarkResultsToTable,
  PuppeteerBenchmarkResultWithoutImage,
} from "../src/benchmark";
import fs from "fs/promises";
import { Mode } from "../src/utils/configuration";
import scenarios from "../scenarios.json" assert { type: "json" };
import { Sample } from "../src/benchmark/sample";
import { TableConstructorOptions } from "cli-table3";

const CSVOptions = {
  chars: {
    top: "",
    "top-mid": "",
    "top-left": "",
    "top-right": "",
    bottom: "",
    "bottom-mid": "",
    "bottom-left": "",
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "",
    "right-mid": "",
    middle: ",",
  },
  style: { "padding-left": 0, "padding-right": 0, compact: true },
};

async function printResults(options?: TableConstructorOptions) {
  const [fileName] = process.argv.slice(2);
  fs.lstat(fileName).then(async (stat) => {
    if (stat.isDirectory()) {
      const samplePaths = await fs.readdir(fileName);
      const resultsPerScenario = await getResultsPerScenario(
        fileName,
        samplePaths
      );
      const tables = puppeteerBenchmarkResultsPerScenarioToTables(
        resultsPerScenario,
        options
      );

      for (const [scenario, table] of Object.entries(tables)) {
        console.log(scenario);
        console.log(table.toString());
        console.log("\n");
      }
    } else {
      const result = await loadPuppeteerBenchmarkResults(fileName);
      const table = puppeteerBenchmarkResultsToTable(result, options);
      console.log(table.toString());
    }
  });
}

async function getResultsPerScenario(
  baseDir: string,
  samplePaths: string[]
): Promise<Record<string, Record<Mode, Sample[]>>> {
  const resultsPerMode: Record<Mode, PuppeteerBenchmarkResultWithoutImage[]> =
    Object.fromEntries(
      await Promise.all(
        samplePaths.map(async (samplePath) => [
          samplePath.replace(".json", "") as Mode,
          await loadPuppeteerBenchmarkResults(`${baseDir}/${samplePath}`),
        ])
      )
    );

  const resultsPerScenario = Object.fromEntries(
    scenarios.map((scenario) => {
      return [
        scenario.name,
        Object.fromEntries(
          Object.entries(resultsPerMode).map(([mode, results]) => {
            return [
              mode,
              results.find((result) => result.scenario.name === scenario.name)
                ?.samples,
            ];
          })
        ) as Record<Mode, Sample[]>,
      ];
    })
  );
  return resultsPerScenario;
}

printResults();
