export function objectFromEntries(entries) {
  if (typeof Object.fromEntries === 'function') {
    return Object.fromEntries(entries);
  }

  return [...entries].reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}
