export function buildEventPageMetadata(page) {
  page.meta = page.meta || {};

  const rgx = /<([^<>:]+)(:?)([^>]*)>/g;
  for (const command of page.list) {
    if (!command?.code || (command.code !== 108 && command.code !== 408)) {
      continue;
    }

    const comment = command.parameters[0];
    while (true) {
      const match = rgx.exec(comment);

      if (match) {
        if (match[2] === ':') {
          page.meta[match[1]] = match[3];
        } else {
          page.meta[match[1]] = true;
        }
      } else {
        break;
      }
    }
  }

  return page.meta;
}
