CycloneAdvancedMaps.patchClass(Tilemap, $super => class {
  initialize() {
    $super.initialize.call(this);
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
  }

  updateTransform() {
    if (CycloneAdvancedMaps.params.disableTilemap && CycloneAdvancedMaps.params.enableOverlays) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _addShadow(...args) {
    if (CycloneAdvancedMaps.disableAutoShadows) {
      return;
    }

    return $super._addShadow.call(this, ...args);
  }
});