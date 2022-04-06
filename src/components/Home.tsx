import React from "react";
import { PuppeteerBenchmarkResultWithoutImage } from "../benchmark";
import { samplesToSampleMetrics } from "../benchmark/sample";
import { Header } from "./Header";

// const samples: Record<
//   string,
//   { default: PuppeteerBenchmarkResultWithoutImage[] }
// > = import.meta.globEager("../samples/*.json");

// const x = Object.fromEntries(
//   Object.entries(samples).map(([key, { default: results }]) => [
//     key,
//     results.map((result) => ({
//       scenario: result.scenario,
//       metrics: samplesToSampleMetrics(result.samples),
//     })),
//   ])
// );
// console.log(x);

export const Home = React.memo(() => (
  <>
    <Header />
  </>
));
