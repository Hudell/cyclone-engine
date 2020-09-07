CycloneMovement.patchClass(Game_Interpreter, $super => class {
  command201() {
    $super.command201.call(this);

    if ($gameParty.inBattle()) {
      return;
    }

    CycloneMovement.clearCheckedTiles();
    if (!CycloneMovement.triggerTouchEventAfterTeleport) {
      $gamePlayer.runForAllTiles((x, y) => {
        CycloneMovement.markTileAsChecked(x, y);
      });
    }
  }
});
