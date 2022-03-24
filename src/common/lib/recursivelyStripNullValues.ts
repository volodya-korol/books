function recursivelyStripNullValues(value: unknown): unknown {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, recursivelyStripNullValues(value)]));
  }
  if (value !== null) {
    return value;
  }
}

export default recursivelyStripNullValues;
