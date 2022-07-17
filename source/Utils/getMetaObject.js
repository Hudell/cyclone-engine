export function getMetaObject(notes, tagName) {
  const rgx = new RegExp(`<${tagName}([^>]*)`, 'gis');
  const list = [];

  while (true) {
    const match = rgx.exec(notes);
    if (!match) {
      break;
    }

    if (match.length < 2) {
      continue;
    }

    const dataRgx = /([^=:\n\r\t]+)[=:]?(.*)/gm;
    const obj = match[1];
    const newObject = {};

    while (true) {
      const attribute = dataRgx.exec(obj);
      if (!attribute) {
        break;
      }

      if (attribute.length < 2) {
        continue;
      }

      const name = attribute[1].trim();
      if (!name) {
        continue;
      }

      if (attribute.length > 2 && attribute[0] !== attribute[1]) {
        newObject[name] = attribute[2].trim();
      } else {
        newObject[name] = true;
      }
    }

    list.push(newObject);
  }

  return list;
}
