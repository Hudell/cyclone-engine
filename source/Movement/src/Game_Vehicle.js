import './CharacterOverride';

CycloneMovement.patchClass(Game_Vehicle, $super => class {
  get width() {
    return 1;
  }
  get height() {
    return 1;
  }

  get hitboxX() {
    return 0;
  }

  get hitboxY() {
    return 0;
  }

  checkPassage(x, y) {
    if (this.isBoat()) {
      return $gameMap.isBoatPassable(x, y);
    }

    if (this.isShip()) {
      return $gameMap.isShipPassable(x, y);
    }

    return this.isAirship();
  }

  shouldPassThrough() {
    if (this.isAirship()) {
      return true;
    }

    return $super.shouldPassThrough.call(this);
  }

  isAirshipLandOk(x, y) {
    if (!$gamePlayer.canLandOn(x, y)) {
      return false;
    }

    const floorX = Math.floor(x);
    const floorY = Math.floor(y);

    if (!$gameMap.isAirshipLandOk(floorX, floorY)) {
      return false;
    }

    if ($gameMap.eventsXy(floorX, floorY).length > 0) {
      return false;
    }

    return true;
  }

  isLandOk(x, y, d) {
    if (this.isAirship()) {
      return this.isAirshipLandOk(x, y);
    }

    // // const x2 = CycloneMovement.roundXWithDirection(x, d, CycloneMovement.collisionSize);
    // // const y2 = CycloneMovement.roundYWithDirection(y, d, CycloneMovement.collisionSize);

    // if (!$gameMap.isValid(x, y)) {
    //   return false;
    // }

    // if (!$gamePlayer.canLandOn(x, y)) {
    //   return false;
    // }

    // // if (!$gameMap.isPassable(x, y, this.reverseDir(d))) {
    // //   return false;
    // // }

    // if (this.isCollidedWithCharacters(x, y)) {
    //   return false;
    // }

    return true;
  }
});
