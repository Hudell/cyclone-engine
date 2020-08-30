CycloneMaps.patchClass(Game_Party, $super => class {
  onPlayerWalk() {
    $super.onPlayerWalk.call(this);

    if (CycloneMaps.commonEventRegions.size > 0) {
      CycloneMaps.checkRegionActions();
    }
  }
});