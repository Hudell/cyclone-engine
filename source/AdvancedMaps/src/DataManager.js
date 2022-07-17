CycloneAdvancedMaps.patchClass(DataManager, $super => class {
  static setupNewGame() {
    $super.setupNewGame.call(this);

    if (!CycloneAdvancedMaps.params.overlayEnabled) {
      return;
    }

    for (const { quickStart, switchId } of CycloneAdvancedMaps.params.layers) {
      if (!quickStart || !switchId) {
        continue;
      }

      CycloneAdvancedMaps.params.debug && console.log(`Initializing switch ${ switchId }`);
      $gameSwitches.setValue(switchId, true);
    }
  }

  static createGameObjects() {
    $super.createGameObjects.call(this);
    CycloneAdvancedMaps.clearSettings();
  }
});
