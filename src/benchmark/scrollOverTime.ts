import { Page } from "puppeteer";
import { delay } from "../utils/delay";

export async function scrollOverTime(
  page: Page,
  {
    duration = 0, // How long to scroll for [ms]
    deltaX = 0, // How much to scroll horizontally on each tick [px]
    deltaY = 0, // How much to scroll vertically on each tick [px]
    interval = 16, // Tick interval [ms]
    easingCycle = 0, // ease in/out scrolling in cycles of this duration [ms]
  } = {}
) {
  const startTime = Date.now();
  let now = Date.now();
  const cycles = easingCycle / interval;
  let i = 0;

  while (now < startTime + duration) {
    const fraction = cycles
      ? (Math.sin((2 * i * Math.PI) / cycles - Math.PI / 2) + 1) / 2
      : 1;
    i += 1;
    await Promise.race([
      page.mouse.wheel({
        deltaX: fraction * deltaX,
        deltaY: fraction * deltaY,
      }),
      delay(interval),
    ]);
    now = Date.now();
  }
}
