const uselessCommands = Object.freeze([
  // comments
  108,
  408,
  // label
  118,
  // end of list
  0,
]);

CycloneMovement.patchClass(Game_Event, $super => class {
  turnTowardPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);

    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection(10 - $gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 4 : 6);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  }

  turnAwayFromPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);
    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection($gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 6 : 4);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  }

  hasAnythingToRun() {
    if (!CycloneMovement.ignoreEmptyEvents) {
      return true;
    }

    for (const command of this.list()) {
      if (uselessCommands.includes(Number(command.code))) {
        continue;
      }

      return true;
    }

    return false;
  }
});
