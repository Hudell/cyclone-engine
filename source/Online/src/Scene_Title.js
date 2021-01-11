CycloneOnline.patchClass(Scene_Title, $super => class {
  start(...args) {
    $super.start.call(this, ...args);

    CycloneOnline.endConnection();
  }
});
