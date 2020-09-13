CycloneMovement.patchClass(Scene_Map, $super => class {
  onMapTouch(...args) {
    if (CycloneMovement.disableMouseMovement) {
      return;
    }

    $super.onMapTouch.call(this, ...args);
  }
});
