import './CharacterOverride';

CycloneMovement.patchClass(Game_Vehicle, $super => class {
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

    return true;
  }

  getOff() {
    this._driving = false;
    this.setWalkAnime(false);
    this.setStepAnime(false);
    $gameSystem.replayWalkingBgm();
  }
});
