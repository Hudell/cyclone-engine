CycloneExtraLayers.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    CycloneExtraLayers.loadExtraLayers(window.$dataMap);
  }
});