export function buildMetadata(notes) {
  const rgx = /<([^<>:]+)(:?)([^>]*)>/g;
  const matches = notes.matchAll(rgx);
  const values = new Map();

  for (const match of matches) {
    if (match.length > 3 && match[2] === ':') {
      values.set(match[1], match[3]);
    } else {
      values.set(match[1], true);
    }
  }

  return values;
}
