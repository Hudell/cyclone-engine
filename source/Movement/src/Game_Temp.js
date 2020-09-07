let timeout;
let latestX;
let latestY;
let needsCalling = false;

CycloneMovement.patchClass(Game_Temp, $super => class {
  _setDestination(x, y) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = false;
      if (needsCalling) {
        this._setDestination(latestX, latestY);
      }
    }, 50 * CycloneMovement.stepCount);

    $super.setDestination.call(this, x, y);
    needsCalling = false;
    latestX = x;
    latestY = y;
  }

  setDestination(x, y) {
    if (!TouchInput.isLongPressed()) {
      return this._setDestination(x, y);
    }

    if (!timeout) {
      return this._setDestination(x, y);
    }

    const delta = $gameMap.distance(x, y, latestX, latestY);
    if (delta > 3) {
      return this._setDestination(x, y);
    }

    latestX = x;
    latestY = y;

    needsCalling = true;
  }

  clearDestination(...args) {
    $super.clearDestination.call(this, ...args);

    needsCalling = false;
    latestX = undefined;
    latestY = undefined;

    if (timeout) {
      clearTimeout(timeout);
      timeout = false;
    }
  }
});
