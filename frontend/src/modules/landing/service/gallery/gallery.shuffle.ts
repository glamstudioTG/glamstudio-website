export function seededShuffle<T extends { id: number }>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const seed = result[i]["id"] ?? i;
    const j = seed % (i + 1);

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
