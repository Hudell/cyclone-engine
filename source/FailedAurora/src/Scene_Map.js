CycloneAurora.patchClass(Scene_Map, $super => class {
  terminate() {
    if (this._spriteset) {
      this._spriteset.clearScene();
    }
    $super.terminate.call(this);
  }
});
