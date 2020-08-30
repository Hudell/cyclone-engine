CycloneMaps.patchClass(DataManager, $super => class {
  static setupNewGame() {
    $super.setupNewGame.call(this);

    if (CycloneMaps.params.enableOverlays && CycloneMaps.params.quickStart) {
      const { fogSwitchId, lightSwitchId, parallaxSwitchId, shadowSwitchId } = CycloneMaps.params;

      if (fogSwitchId > 0) {
        $gameSwitches.setValue(fogSwitchId, true);
      }

      if (lightSwitchId > 0) {
        $gameSwitches.setValue(lightSwitchId, true);
      }

      if (parallaxSwitchId > 0) {
        $gameSwitches.setValue(parallaxSwitchId, true);
      }

      if (shadowSwitchId > 0) {
        $gameSwitches.setValue(shadowSwitchId, true);
      }
    }
  }
});
