import { CyclonePatcher } from '../../Core/patcher';
import { LZString } from '../../Libs/lz-string.min';
import { loadMapEditorData } from '../../Utils/loadMapEditorData';

class CycloneExtraTilesets extends CyclonePatcher {
  static register() {
    this.initialize('CycloneExtraTilesets');
  }

  static parseExtraTileIds(object) {
    if (!object || !object.note || !object.data) {
      return;
    }

    if (!object.note.includes('<CycloneExtraTiles>')) {
      return;
    }

    const matches = object.note.match(/<CycloneExtraTiles>(.*)<\/CycloneExtraTiles>/i);
    if (matches.length < 2) {
      return;
    }

    const compressed = matches[1];
    try {
      const extraTilesStr = LZString.decompressFromBase64(compressed);
      const extraTiles = JSON.parse(extraTilesStr);
      if (!extraTiles || !Array.isArray(extraTiles)) {
        return;
      }
      const size = Math.min(extraTiles.length, object.width * object.height * 4);
      for (let i = 0; i < size; i++) {
        if (object.data[i] === 0 && extraTiles[i] > 0) {
          object.data[i] = extraTiles[i];
        }
      }
    } catch(e) {
      console.error(e);
      return;
    }
  }

  static loadExtraTilesets(object) {
    this.parseExtraTileIds(object);

    if (!$gameMap) {
      return;
    }

    const data = loadMapEditorData();
    if (!data?.extraTilesetId) {
      return;
    }

    $gameMap._extraTilesetId = data.extraTilesetId;
  }
}

globalThis.CycloneExtraTilesets = CycloneExtraTilesets;
CycloneExtraTilesets.register();
