CycloneMovement.patchClass(Game_Map, $super => class {
  isValid(x, y) {
    return x >= 0 && y >= 0 && Math.ceil(x) < this.width() && Math.ceil(y) < this.height();
  }

  setup(mapId) {
    $super.setup.call(this, mapId);
    CycloneMovement.setupCollision();
  }
});
