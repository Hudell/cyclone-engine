CycloneTileBlender.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ((mapX === 2 || mapX === 3) && mapY === 3) {
        return;
      }
    }

    return $super._addSpotTile.call(this, tileId, dx, dy);
  }
});