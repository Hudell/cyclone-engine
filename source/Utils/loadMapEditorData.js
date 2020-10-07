import { LZString } from '../Libs/lz-string.min';

export function decompress(data) {
  if (!data.startsWith('v=')) {
    return LZString.decompress(data);
  }

  const idx = data.indexOf(';') + 1;
  return LZString.decompressFromBase64(data.substring(idx));
}

export function parseMapEditorData(note) {
  let json;
  try {
    json = decompress(note);
  } catch(e) {
    console.error('Failed to decompress data from CycloneMapEditor event.');
    console.log(note);
    console.log(e);
    return;
  }

  let data;
  try {
    data = JSON.parse(json);

  } catch(e) {
    console.error('Failed to parse data from CycloneMapEditor event.');
    console.log(json);
    console.log(e);
    return;
  }

  return data;
}

export function loadMapEditorData() {
  if (!$dataMap) {
    return false;
  }

  for (const event of $dataMap.events) {
    if (!event) {
      continue;
    }

    if (event.name !== 'CycloneMapEditor') {
      continue;
    }

    return parseMapEditorData(event.note);
  }
}