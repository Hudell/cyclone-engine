CycloneAurora.patchClass(Game_Player, $super => class {
  update(...args) {
    const { _x, _y, _direction } = this;

    $super.update.call(this, ...args);

    if (this.isMoving() || _direction !== this._direction || _x !== this._x || _y !== this._y) {
      CycloneAurora.dirty = true;
    }
  }
});
