CycloneMapEditor.patchClass(Game_Player, $super => class {
  centerX() {
    if (!CycloneMapEditor.active) {
      return $super.centerX.call(this);
    }

    return ((Graphics.width - CycloneMapEditor.windowWidth) / $gameMap.tileWidth() - 1) / 2.0;
  }

  centerY() {
    if (!CycloneMapEditor.active) {
      return $super.centerY.call(this);
    }

    return ((Graphics.height - 40) / $gameMap.tileHeight() - 1) / 2.0;
  }

  reserveTransfer(mapId, ...args) {
    if (CycloneMapEditor.changeHistory.length > 0) {
      if (confirm('Do you want to save your map before teleporting away?')) {
        CycloneMapEditor._doSave();
      }
    }

    $super.reserveTransfer.call(this, mapId, ...args);
  }

  executeEncounter() {
    const result = $super.executeEncounter.call(this);

    if (result) {
      if (CycloneMapEditor.changeHistory.length > 0) {
        if (confirm('Do you want to save your map before the battle starts?')) {
          CycloneMapEditor._doSave();
        }
      }
    }

    return result;
  }

  updateMove() {
    $super.updateMove.call(this);
    CycloneMapEditor.requestCollisionRefresh();
  }
});
