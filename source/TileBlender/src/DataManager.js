CycloneTileBlender.patchClass(DataManager, $super => class {
  static onLoad(object) {
    $super.onLoad.call(this, object);

    if (this.isMapObject(object)) {
      CycloneTileBlender.loadMagic();
    }
  }
});
