CycloneMaps.patchClass(Tilemap, $super => class {
  initialize() {
    $super.initialize.call(this);
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
  }

  updateTransform() {
    if (CycloneMaps.params.disableTilemap && CycloneMaps.params.enableOverlays) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _addShadow(...args) {
    if (CycloneMaps.disableAutoShadows) {
      return;
    }

    return $super._addShadow.call(this, ...args);
  }
});