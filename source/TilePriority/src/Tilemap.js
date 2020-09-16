CycloneTilePriority.patchClass(Tilemap, $super => class {
  _addNormalTile(layer, tileId, dx, dy) {
    if (layer === this._upperLayer) {
      const tag = this.flags[tileId] >> 12;
      if (tag > 0) {
        return;
      }
    }

    $super._addNormalTile.call(this, layer, tileId, dx, dy);
  }
});