export function easeOutCubic(progress: number) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  return 1 - Math.pow(1 - clampedProgress, 3);
}

export function formatMetricValue(value: number, decimals = 0) {
  return decimals > 0
    ? value.toFixed(decimals).replace(".", ",")
    : Math.round(value).toLocaleString("pt-BR");
}
