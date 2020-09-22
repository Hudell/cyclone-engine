CycloneExtraTilesets.patchClass(Spriteset_Map, $super => class {
  loadTileset() {
    this._tileset = $gameMap.tileset();
    this._extraTileset = $gameMap.extraTileset();

    if (!this._tileset) {
      return;
    }

    const tilesetNames = this._tileset.tilesetNames;
    for (let i = 0; i < tilesetNames.length; i++) {
      this._tilemap.bitmaps[i] = ImageManager.loadTileset(tilesetNames[i]);
    }
    if (this._extraTileset) {
      this._tilemap.bitmaps[tilesetNames.length] = ImageManager.loadTileset(this._extraTileset.tilesetNames[5]);
      this._tilemap.bitmaps[tilesetNames.length + 1] = ImageManager.loadTileset(this._extraTileset.tilesetNames[6]);
      this._tilemap.bitmaps[tilesetNames.length + 2] = ImageManager.loadTileset(this._extraTileset.tilesetNames[7]);
    }

    const newTilesetFlags = $gameMap.tilesetFlags();
    this._tilemap.refreshTileset();
    if (!this._tilemap.flags.equals(newTilesetFlags)) {
      this._tilemap.refresh();
    }

    this._tilemap.flags = newTilesetFlags;
  }

  updateTileset() {
    if (this._extraTileset !== $gameMap.extraTileset()) {
      return this.loadTileset();
    }

    $super.updateTileset.call(this);
  }
});
