CycloneExtraTilesets.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    this._extraTilesetId = 0;

    CycloneExtraTilesets.loadExtraTilesets(window.$dataMap);
    this.buildTilesetFlags();
  }

  buildTilesetFlags() {
    if (!this._extraTilesetId || this._extraTilesetId === this._tilesetId) {
      return;
    }

    const baseFlags = $super.tilesetFlags.call(this);
    const tileset = this.extraTileset();

    this._allFlags = [...baseFlags];

    if (tileset) {
      const newZero = Tilemap.TILE_ID_E + 256;
      const newFlags = tileset.flags;

      for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_D; tileId++) {
        const newTileId = tileId + newZero;
        this._allFlags[newTileId] = newFlags[tileId] || 0;
      }

      for (let tileId = Tilemap.TILE_ID_D; tileId < Tilemap.TILE_ID_E; tileId++) {
        const newTileId = tileId - Tilemap.TILE_ID_D + Tilemap.TILE_ID_A5 + 256;
        this._allFlags[newTileId] = newFlags[tileId] || 0;
      }
    }

    return this._allFlags;
  }

  tilesetFlags() {
    if (this._allFlags) {
      return this._allFlags;
    }

    return $super.tilesetFlags.call(this);
  }

  changeTileset(tilesetId) {
    $super.changeTileset.call(this, tilesetId);
    this.buildTilesetFlags();
  }

  extraTileset() {
    return $dataTilesets[this._extraTilesetId];
  }
});