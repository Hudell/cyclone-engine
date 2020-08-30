CycloneMapEditor.patchClass(DataManager, $super => class {
  static loadMapData(mapId) {
    if (mapId > 0 && CycloneMapEditor.mapCaches[mapId]) {
      globalThis.$dataMap = CycloneMapEditor.mapCaches[mapId];
      this.onLoad('$dataMap');
      return;
    }

    return $super.loadMapData.call(this, mapId);
  }
});

