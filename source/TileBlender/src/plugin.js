import { CyclonePatcher } from '../../Core/patcher';
import { drawTile, getTilesetIndex } from '../../Utils/drawTile';
import { loadMapEditorData } from '../../Utils/loadMapEditorData';

let tileBlendingTable = {};

class CycloneTileBlender extends CyclonePatcher {
  static get tileBlendingTable() {
    return tileBlendingTable;
  }

  static register() {
    this.initialize('CycloneTileBlender');
    this._cachedTiles = new Map();
  }

  static buildBitmap(spriteId, tiles, x, y) {
    const bitmap = this._cachedTiles.get(spriteId);
    if (!bitmap) {
      return;
    }

    const tileset = $gameMap.tileset();
    const bitmaps = [];
    for (const tileId of tiles) {
      if (!tileId) {
        continue;
      }

      const setNumber = getTilesetIndex(tileId);
      const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

      if (!tilesetBitmap) {
        continue;
      }

      if (!tilesetBitmap.isReady()) {
        tilesetBitmap.addLoadListener(() => {
          this.buildBitmap(spriteId, tiles);
        });

        return;
      }
      bitmaps[tileId] = tilesetBitmap;
    }

    const tileIndex = (y % $gameMap.height()) * $gameMap.width() + (x % $gameMap.width());
    const magic = tileBlendingTable[tileIndex];

    for (let idx = 1; idx < tiles.length; idx++) {
      const tileId = tiles[idx];
      if (!tileId || !bitmaps[tileId]) {
        continue;
      }

      const tilesetBitmap = bitmaps[tileId];
      if (idx === 1) {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();
        const size = width * height;

        const tempBitmap = new Bitmap(width, height);
        drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);

        const context = tempBitmap.context;
        const imageData = context.getImageData(0, 0, tempBitmap.width, tempBitmap.height);
        const pixels = imageData.data;

        for (let i = 0; i < size; i++) {
          if (magic?.[i] === 1) {
            pixels[i * 4 + 3] = 0;
          }
        }

        bitmap.context.putImageData(imageData, 0, 0);
        continue;
      }

      drawTile(bitmap, tilesetBitmap, tileId, 0, 0);
    }
  }

  static getTileBitmap(spriteId, tiles, x, y) {
    if (this._cachedTiles.has(spriteId)) {
      return this._cachedTiles.get(spriteId);
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const bitmap = new Bitmap(tileWidth, tileHeight);
    this._cachedTiles.set(spriteId, bitmap);

    const tileset = $gameMap.tileset();
    let buildNow = true;
    for (const tileId of tiles) {
      if (!tileId) {
        continue;
      }

      const setNumber = 5 + Math.floor(tileId / 256);
      const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

      if (!tilesetBitmap) {
        continue;
      }

      if (!tilesetBitmap.isReady()) {
        tilesetBitmap.addLoadListener(() => {
          this.buildBitmap(spriteId, tiles, x, y);
        });

        buildNow = false;
        break;
      }
    }

    if (buildNow) {
      this.buildBitmap(spriteId, tiles, x, y);
    }

    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }

  static loadMagic() {
    tileBlendingTable = {};
    this.clearBitmapCache();

    const data = loadMapEditorData();
    if (!data?.magic) {
      return;
    }

    this.setupMagic(data.magic);
  }

  static setupMagic(magic) {
    for (let tileId in magic) {
      if (!magic[tileId]) {
        continue;
      }

      const line = magic[tileId];
      const buffer = new ArrayBuffer(line.length);
      const list = new Uint8Array(buffer);
      for (let i = line.indexOf('1'); i < line.length; i++) {
        if (line[i] !== '0') {
          list[i] = Number(line[i]);
        }
      }

      tileBlendingTable[tileId] = list;
    }
  }
}

globalThis.CycloneTileBlender = CycloneTileBlender;
CycloneTileBlender.register();
