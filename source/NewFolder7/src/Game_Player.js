CycloneNewFolder7.patchClass(Game_Player, $super => class {
  initialize() {
    $super.initialize.call(this);
    this._through = true;
  }
});
