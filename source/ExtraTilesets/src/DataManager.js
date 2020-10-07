CycloneExtraTilesets.patchClass(DataManager, $super => class {
  static onLoad(object) {
    $super.onLoad.call(this, object);

    if (this.isMapObject(object) && window.$dataMap) {
      CycloneExtraTilesets.loadExtraTilesets(object);
    }
  }
});
