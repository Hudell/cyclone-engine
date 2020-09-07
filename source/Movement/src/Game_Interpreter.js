CycloneMovement.patchClass(Game_Interpreter, $super => class {
  command201(...args) {
    const result = $super.command201.call(this, ...args);

    if ($gameParty.inBattle()) {
      return result;
    }

    CycloneMovement.clearCheckedTiles();
    if (!CycloneMovement.triggerTouchEventAfterTeleport) {
      $gamePlayer.runForAllTiles((x, y) => {
        CycloneMovement.markTileAsChecked(x, y);
      });
    }

    return result;
  }
});
