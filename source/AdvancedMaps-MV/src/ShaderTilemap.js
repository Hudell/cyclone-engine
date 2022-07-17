CycloneAdvancedMaps.patchClass(ShaderTilemap, $super => class {
  updateTransform() {
    if (CycloneAdvancedMaps.params.disableTilemap) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _drawShadow(...args) {
    if (CycloneAdvancedMaps.params.disableAutoShadows) {
      return;
    }

    return $super._drawShadow.call(this, ...args);
  }
});