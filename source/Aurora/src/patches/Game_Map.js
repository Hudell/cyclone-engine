CycloneAurora.patchClass(Game_Map, $super => class {
  setup(...args) {
    $super.setup.call(this, ...args);
    CycloneAurora.clear();
  }
});
