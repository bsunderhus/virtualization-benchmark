export function calculateMedian(values: number[]): number {
  const length = values.length;
  values.sort();
  if (length % 2 === 0) {
    return (values[length / 2] + values[length / 2 - 1]) / 2;
  }
  return values[Number.parseInt(length / 2, 10)];
}

export function calculateMean(values: number[]): number {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

export function calculateStandardDeviation(values: number[]): number {
  const mean = calculateMean(values);

  const squareDiffs = values.map((value) => {
    const diff = value - mean;
    return diff * diff;
  });

  return Math.sqrt(calculateMean(squareDiffs));
}
