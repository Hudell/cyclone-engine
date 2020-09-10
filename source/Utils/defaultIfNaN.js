export function defaultIfNaN(value, defaultValue) {
  if (isNaN(Number(value))) {
    return defaultValue;
  }

  return value;
}
