import { CyclonePatcher } from '../../Core/patcher';
import { drawTile, getTilesetIndex } from '../../Utils/drawTile';
import { loadMapEditorData } from '../../Utils/loadMapEditorData';
// import { logImage } from '../../Utils/logImage';

let tileBlendingTable = {};

class CycloneTileBlender extends CyclonePatcher {
  static get tileBlendingTable() {
    return tileBlendingTable;
  }

  static register() {
    this.initialize('CycloneTileBlender');
    this._cachedTiles = new Map();
  }

  static getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
    const tileset = $gameMap.tileset();
    const bitmaps = [];

    for (const tileGroup of tiles) {
      for (const tileId of tileGroup) {
        if (!tileId || bitmaps[tileId]) {
          continue;
        }

        const setNumber = getTilesetIndex(tileId);
        const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

        if (!tilesetBitmap) {
          continue;
        }

        if (!tilesetBitmap.isReady()) {
          tilesetBitmap.addLoadListener(() => {
            this.buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);
          });

          return false;
        }

        bitmaps[tileId] = tilesetBitmap;
      }
    }

    return bitmaps;
  }

  static buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
    const bitmap = this._cachedTiles.get(spriteId);
    if (!bitmap) {
      return;
    }

    const bitmaps = this.getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);
    if (!bitmaps) {
      return;
    }

    const width = $gameMap.tileWidth();
    const height = $gameMap.tileHeight();
    const size = width * height;
    let spriteTileIndex = -1;

    for (let tileY = y; tileY < y + spriteMapHeight; tileY++) {
      for (let tileX = x; tileX < x + spriteMapWidth; tileX++) {
        spriteTileIndex++;
        const drawX = (tileX - x) * width;
        const drawY = (tileY - y) * height;

        const tileIndex = (tileY % $gameMap.height()) * $gameMap.width() + (tileX % $gameMap.width());
        const magic = tileBlendingTable[tileIndex];
        const cellTiles = tiles[spriteTileIndex];

        for (let idx = 1; idx < cellTiles.length; idx++) {
          const tileId = cellTiles[idx];
          if (!tileId || !bitmaps[tileId]) {
            continue;
          }

          const tilesetBitmap = bitmaps[tileId];
          if (idx === 1) {
            const tempBitmap = new Bitmap(width, height);
            drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);

            const context = tempBitmap.context;
            const imageData = context.getImageData(0, 0, tempBitmap.width, tempBitmap.height);

            if (magic) {
              const pixels = imageData.data;
              for (let i = 0; i < size; i++) {
                if (magic[i] === 1) {
                  pixels[i * 4 + 3] = 0;
                }
              }
            }

            bitmap.context.putImageData(imageData, drawX, drawY);
            continue;
          }

          drawTile(bitmap, tilesetBitmap, tileId, drawX, drawY);
        }
      }
    }
  }

  static getTileBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
    if (this._cachedTiles.has(spriteId)) {
      return this._cachedTiles.get(spriteId);
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const bitmap = new Bitmap(tileWidth * spriteMapWidth, tileHeight * spriteMapHeight);
    this._cachedTiles.set(spriteId, bitmap);

    const bitmaps = this.getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);

    if (bitmaps) {
      this.buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);
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
