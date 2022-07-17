CycloneAdvancedMaps.patchClass(ShaderTilemap, $super => class {
  updateTransform() {
    if (CycloneAdvancedMaps.params.disableTilemap && CycloneAdvancedMaps.params.enableOverlays) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _drawShadow(...args) {
    if (CycloneAdvancedMaps.disableAutoShadows) {
      return;
    }

    return $super._drawShadow.call(this, ...args);
  }
});