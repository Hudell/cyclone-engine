CycloneMagic.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ($gameMap.isMagicTile(mapX, mapY, tileId)) {
        // when editing, delay hiding the position until the sprite is added to the spriteset
        if (window.CycloneMapEditor && window.CycloneMapEditor.isPositionBlendSpriteReady(mapX, mapY)) {
          return;
        }
      }
    }

    return $super._addSpotTile.call(this, tileId, dx, dy);
  }
});