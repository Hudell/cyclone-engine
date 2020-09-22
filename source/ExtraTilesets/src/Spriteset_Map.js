CycloneExtraTilesets.patchClass(Spriteset_Map, $super => class {
  loadTileset() {
    this._tileset = $gameMap.tileset();
    this._extraTileset = $gameMap.extraTileset();

    if (!this._tileset) {
      return;
    }

    const bitmaps = [];
    const tilesetNames = this._tileset.tilesetNames;
    for (const name of tilesetNames) {
      bitmaps.push(ImageManager.loadTileset(name));
    }

    if (this._extraTileset) {
      const tilesetNames = this._extraTileset.tilesetNames;
      bitmaps.push(ImageManager.loadTileset(tilesetNames[5]));
      bitmaps.push(ImageManager.loadTileset(tilesetNames[6]));
      bitmaps.push(ImageManager.loadTileset(tilesetNames[7]));
    }

    this._tilemap.setBitmaps(bitmaps);
    this._tilemap.flags = $gameMap.tilesetFlags();
  }

  updateTileset() {
    if (this._extraTileset !== $gameMap.extraTileset()) {
      return this.loadTileset();
    }

    $super.updateTileset.call(this);
  }
});
