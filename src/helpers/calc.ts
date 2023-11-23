export const calculateMean = (values: number[]): number => {
  return values.reduce((acc, curr) => acc + curr, 0) / values.length;
};

export const calculateStandardDeviation = (values: number[]): number => {
  const mean = calculateMean(values);
  const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
  const variance = calculateMean(squaredDifferences);
  return Math.sqrt(variance);
};
