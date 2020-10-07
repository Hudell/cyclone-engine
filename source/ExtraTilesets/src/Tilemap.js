CycloneExtraTilesets.patchClass(Tilemap, $super => class {
  isTileA5(tileId) {
    return tileId >= Tilemap.TILE_ID_A5 && tileId < (Tilemap.TILE_ID_A5 + 128);
  }

  _addNormalTile(layer, tileId, dx, dy) {
    if (tileId >= Tilemap.TILE_ID_A5 + 256 && tileId < Tilemap.TILE_ID_A1) {
      const setNumber = 11;
      const w = this._tileWidth;
      const h = this._tileHeight;
      const sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
      const sy = (Math.floor((tileId % 256) / 8) % 16) * h;

      layer.addRect(setNumber, sx, sy, dx, dy, w, h);
      return;
    }

    $super._addNormalTile.call(this, layer, tileId, dx, dy);
  }
});
