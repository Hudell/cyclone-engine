CycloneOnline.patchClass(Scene_Map, $super => class {
  start(...args) {
    $super.start.call(this, ...args);

    CycloneOnline.ensureConnection();
  }
});
