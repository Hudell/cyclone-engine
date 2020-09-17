import { CyclonePatcher } from '../../Core/patcher';
import { drawTile, getTilesetIndex } from '../../Utils/drawTile';

class CycloneTileBlender extends CyclonePatcher {
  static register() {
    this.initialize('CycloneTileBlender');
    this._cachedTiles = new Map();
  }

  static buildBitmap(spriteId, tiles) {
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

    let drewAny = false;
    for (let idx = 0; idx < tiles.length; idx++) {
      const tileId = tiles[idx];
      if (!tileId || !bitmaps[tileId]) {
        continue;
      }

      const tilesetBitmap = bitmaps[tileId];
      if (idx === 1 && drewAny) {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();

        const tempBitmap = new Bitmap(width, height);
        drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);

        for (let y = 0; y < height; y++) {
          tempBitmap.clearRect(0, y, 10 + Math.randomInt(5), 1);
        }

        bitmap.blt(tempBitmap, 0, 0, tempBitmap.width, tempBitmap.height, 0, 0);
        continue;
      }
      drawTile(bitmap, tilesetBitmap, tileId, 0, 0);
      drewAny = true;
    }
  }

  static getTileBitmap(spriteId, tiles) {
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
          this.buildBitmap(spriteId, tiles);
        });

        buildNow = false;
        break;
      }
    }

    if (buildNow) {
      this.buildBitmap(spriteId, tiles);
    }

    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }
}

globalThis.CycloneTileBlender = CycloneTileBlender;
CycloneTileBlender.register();
