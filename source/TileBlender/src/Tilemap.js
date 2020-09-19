CycloneTileBlender.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ($gameMap.isMagicTile(mapX, mapY, tileId)) {
        return;
      }
    }

    return $super._addSpotTile.call(this, tileId, dx, dy);
  }
});