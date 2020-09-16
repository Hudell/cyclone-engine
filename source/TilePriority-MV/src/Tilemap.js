CycloneTilePriority.patchClass(Tilemap, $super => class {
  _drawNormalTile(bitmap, tileId, dx, dy) {
    if (bitmap === this._upperBitmap) {
      const tag = this.flags[tileId] >> 12;
      if (tag > 0) {
        return;
      }
    }

    $super._drawNormalTile.call(this, bitmap, tileId, dx, dy);
  }
});