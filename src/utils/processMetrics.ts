import { CDPSession, Protocol } from "puppeteer";

export interface CPUUsageSnapshot {
  timestamp: number;
  usage: number;
}

export interface CPUStats {
  average: number;
  snapshots: CPUUsageSnapshot[];
}

function processMetrics(metrics: Protocol.Performance.GetMetricsResponse): {
  timestamp: number;
  activeTime: number;
} {
  const activeTime = metrics.metrics
    .filter((metric) => metric.name.includes("Duration"))
    .map((metric) => metric.value)
    .reduce((a, b) => a + b);
  return {
    timestamp:
      metrics.metrics.find((metric) => metric.name === "Timestamp")?.value || 0,
    activeTime,
  };
}

export async function startProcessMetrics(
  cdp: CDPSession,
  interval: number
): Promise<() => Promise<CPUStats>> {
  await cdp.send("Performance.enable", {
    timeDomain: "timeTicks",
  });

  const { timestamp: startTime, activeTime: initialActiveTime } =
    processMetrics(await cdp.send("Performance.getMetrics"));
  const snapshots: CPUUsageSnapshot[] = [];
  let cumulativeActiveTime = initialActiveTime;

  let lastTimestamp = startTime;
  const timer = setInterval(async () => {
    const { timestamp, activeTime } = processMetrics(
      await cdp.send("Performance.getMetrics")
    );
    const frameDuration = timestamp - lastTimestamp;
    let usage = (activeTime - cumulativeActiveTime) / frameDuration;
    cumulativeActiveTime = activeTime;

    if (usage > 1) usage = 1;
    snapshots.push({
      timestamp,
      usage,
    });

    lastTimestamp = timestamp;
  }, interval);

  return async () => {
    clearInterval(timer);
    await cdp.send("Performance.disable");

    return {
      average: cumulativeActiveTime / (lastTimestamp - startTime),
      snapshots,
    };
  };
}
