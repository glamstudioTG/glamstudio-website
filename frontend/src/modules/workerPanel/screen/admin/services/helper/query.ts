function serializeQuery<T extends Record<string, any>>(query: T) {
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      value !== undefined ? String(value) : undefined,
    ]),
  );
}
