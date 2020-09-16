import { CyclonePatcher } from '../../Core/patcher';

class CycloneTilePriority extends CyclonePatcher {
  static register() {
    this.initialize('CycloneTilePriority');
    this._cachedTiles = new Map();
  }

  static getTileBitmap(tileId, priority = 1) {
    if (this._cachedTiles.has(tileId)) {
      return this._cachedTiles.get(tileId);
    }

    const tileset = $gameMap.tileset();
    const setNumber = 5 + Math.floor(tileId / 256);
    const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

    if (!tilesetBitmap) {
      return;
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const bitmap = new Bitmap(tileWidth, tileHeight + tileHeight * (priority - 1));

    tilesetBitmap.addLoadListener(() => {
      const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * tileWidth;
      const sourceY = (Math.floor((tileId % 256) / 8) % 16) * tileHeight;

      bitmap.blt(tilesetBitmap, sourceX, sourceY, tileWidth, tileHeight, 0, bitmap.height - tileHeight * priority);
    });

    this._cachedTiles.set(tileId, bitmap);
    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }
}

globalThis.CycloneTilePriority = CycloneTilePriority;
CycloneTilePriority.register();
