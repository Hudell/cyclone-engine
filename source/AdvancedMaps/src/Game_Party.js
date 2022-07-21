CycloneAdvancedMaps.patchClass(Game_Party, $super => class {
  onPlayerWalk() {
    $super.onPlayerWalk.call(this);

    if (CycloneAdvancedMaps.commonEventRegions.size > 0) {
      CycloneAdvancedMaps.checkRegionActions();
    }
  }
});