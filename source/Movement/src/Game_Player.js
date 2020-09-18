import './CharacterOverride';

let tryToLeaveVehicleDelay = 0;

CycloneMovement.patchClass(Game_Player, $super => class {
  get defaultWidth() {
    return 0.75;
  }
  get defaultHeight() {
    return 0.375;
  }
  get defaultHitboxX() {
    return 0.125;
  }
  get defaultHitboxY() {
    return 0.5;
  }

  getWidth() {
    if (this.isInAnyVehicle()) {
      return 1;
    }

    return this.defaultWidth;
  }
  getHeight() {
    if (this.isInAnyVehicle()) {
      return 1;
    }

    return this.defaultHeight;
  }

  getHitboxX() {
    if (this.isInAnyVehicle()) {
      return 0;
    }

    return this.defaultHitboxX;
  }

  getHitboxY() {
    if (this.isInAnyVehicle()) {
      return 0;
    }

    return this.defaultHitboxY;
  }

  isInAnyVehicle() {
    if (this._ignoreVehicle) {
      return false;
    }

    return this._vehicleType !== 'walk';
  }

  moveByInput() {
    if (this.isMoving() || !this.canMove()) {
      return;
    }

    let direction = Input.dir4;
    let diagonalDirection = Input.dir8;
    let alternativeD = direction;

    if (direction > 0) {
      $gameTemp.clearDestination();
    } else if ($gameTemp.isDestinationValid()) {
      diagonalDirection = this.determineDirectionToDestination();
      direction = CycloneMovement.getFirstDirection(diagonalDirection);
    }

    alternativeD = CycloneMovement.getAlternativeDirection(direction, diagonalDirection);

    if (direction === 0) {
      return;
    }

    this.tryMoving(direction, alternativeD, diagonalDirection);

    if (!this.isMoving()) {
      if (this.tryOtherMovementOptions(direction)) {
        return;
      }

      if (this._direction !== direction) {
        this.setDirection(direction);
        this.checkEventTriggerTouchFront();
      }
    }
  }

  tryMoving(direction, alternativeD, diagonalDirection) {
    if (this.canPass(this._x, this._y, direction) || (direction !== alternativeD && this.canPass(this._x, this._y, alternativeD))) {
      this.onBeforeMove();

      const oldDirection = this._direction;
      this.executeMove(diagonalDirection);
      if (this.isMovementSucceeded()) {
        return;
      }

      this.executeMove(direction);
      if (!this.isMovementSucceeded()) {
        this.executeMove(alternativeD);

        // If none of the directions were clear and we were already facing one of them before, then revert back to it
        if (!this.isMovementSucceeded()) {
          if (oldDirection === direction || oldDirection === alternativeD) {
            this._direction = oldDirection;
          }
        }
      }
    }
  }

  onBeforeMove() {
    tryToLeaveVehicleDelay = 20;
  }

  tryOtherMovementOptions(direction) {
    if (this.tryToLeaveVehicle(direction)) {
      return true;
    }

    if (this.isInAnyVehicle()) {
      return false;
    }

    if (this.tryToAvoid(direction, CycloneMovement.params.maxOffset)) {
      return true;
    }

    return false;
  }

  tryToLeaveVehicle(direction) {
    if (!CycloneMovement.autoLeaveVehicles) {
      return false;
    }

    if (tryToLeaveVehicleDelay > 0) {
      tryToLeaveVehicleDelay--;
      return false;
    }

    if (!this.isInBoat() && !this.isInShip()) {
      return false;
    }

    return this.getOffVehicle(direction);
  }

  tryToAvoid(direction, maxOffset) {
    if (!CycloneMovement.params.sidestepEvents) {
      if (this._blockingReason === 'characters') {
        return false;
      }
    }

    if (direction === 4 || direction === 6) {
      if (this.tryToAvoidVertically(direction, maxOffset)) {
        return true;
      }
    }

    if (direction === 2 || direction === 8) {
      if (this.tryToAvoidHorizontally(direction, maxOffset)) {
        return true;
      }
    }

    return false;
  }

  tryToAvoidDirection(xOffset, yOffset, movementDirection, faceDirection) {
    if (this.canPass(this._x + xOffset, this._y + yOffset, faceDirection)) {
      this.executeMove(movementDirection);
      this.setDirection(faceDirection);
      return true;
    }

    return false;
  }

  tryToAvoidVertically(direction, maxOffset) {
    let previousOffset = 0;
    let offset = CycloneMovement.stepSize;

    let downEnabled = true;
    let upEnabled = true;

    while (offset <= maxOffset) {
      if (downEnabled) {
        if (!this.canPass(this._x, this._y + previousOffset, 2)) {
          downEnabled = false;
        }
      }

      if (upEnabled) {
        if (!this.canPass(this._x, this._y - previousOffset, 8)) {
          upEnabled = false;
        }
      }

      if (downEnabled && this.tryToAvoidDirection(0, offset, 2, direction)) {
        return true;
      }

      if (upEnabled && this.tryToAvoidDirection(0, -offset, 8, direction)) {
        return true;
      }

      previousOffset = offset;
      offset += CycloneMovement.stepSize;
    }
  }

  tryToAvoidHorizontally(direction, maxOffset) {
    let previousOffset = 0;
    let offset = CycloneMovement.stepSize;
    let leftEnabled = true;
    let rightEnabled = true;

    while (offset <= maxOffset) {
      if (leftEnabled) {
        if (!this.canPass(this._x - previousOffset, 4)) {
          leftEnabled = false;
        }
      }

      if (rightEnabled) {
        if (!this.canPass(this._x + previousOffset, 6)) {
          rightEnabled = false;
        }
      }

      if (rightEnabled && this.tryToAvoidDirection(offset, 0, 6, direction)) {
        return true;
      }

      if (leftEnabled && this.tryToAvoidDirection(-offset, 0, 4, direction)) {
        return true;
      }

      previousOffset = offset;
      offset += CycloneMovement.stepSize;
    }

    return false;
  }

  executeMove(direction) {
    switch (direction) {
      case 8:
      case 2:
      case 4:
      case 6:
        this.moveStraight(direction);
        break;

      case 7:
        this.moveDiagonally(4, 8);
        break;
      case 9:
        this.moveDiagonally(6, 8);
        break;
      case 1:
        this.moveDiagonally(4, 2);
        break;
      case 3:
        this.moveDiagonally(6, 2);
        break;

      default:
        break;
    }
  }

  updateDashing() {
    this.updateIsMoving();
    $super.updateDashing.call(this);
  }

  moveStraight(d) {
    if (this.isMovementSucceeded()) {
      this._followers.updateMove();
    }

    this._moveStraight(d);
  }

  moveDiagonally(horz, vert) {
    if (this.isMovementSucceeded()) {
      this._followers.updateMove();
    }

    this._moveDiagonally(horz, vert);
  }

  checkEventTriggerThere(triggers) {
    if (!this.canStartLocalEvents()) {
      return;
    }

    const direction = this.direction();
    const x1 = this.left;
    const y1 = this.top;

    const x2 = CycloneMovement.roundXWithDirection(x1, direction);
    const y2 = CycloneMovement.roundYWithDirection(y1, direction);

    this.startMapEvent(x2, y2, triggers, true);

    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
      const x3 = $gameMap.roundXWithDirection(x2, direction);
      const y3 = $gameMap.roundYWithDirection(y2, direction);

      this.startMapEvent(x3, y3, triggers, true);
    }
  }

  shouldTriggerEvent(event, triggers, normal) {
    if (!event) {
      return false;
    }

    if (!event.isTriggerIn(triggers)) {
      return false;
    }

    if (event.isNormalPriority() !== normal) {
      return false;
    }

    if (!event.hasAnythingToRun()) {
      return false;
    }

    return true;
  }

  startMapTileEvent(tileX, tileY, triggers, normal) {
    if (!CycloneMovement.triggerAllEvents && $gameMap.isEventRunning()) {
      return;
    }

    let anyStarted = false;

    const events = $gameMap.eventsXy(tileX, tileY);
    for (const event of events) {
      if (!this.shouldTriggerEvent(event, triggers, normal)) {
        continue;
      }

      event.start();
      anyStarted = true;

      if (!CycloneMovement.triggerAllEvents) {
        return true;
      }
    }

    return anyStarted;
  }

  checkEventTriggerHere(triggers) {
    if (!this.canStartLocalEvents()) {
      return;
    }

    // Remove "Player Touch" and "Event Touch" from possible trigers
    const newTriggers = [];
    for (const t of triggers) {
      if (t !== 1 && t !== 2) {
        newTriggers.push(t);
      }
    }

    if (newTriggers.length) {
      this.startMapEvent(this.left, this.top, newTriggers, false);
    }
  }

  startMapEvent(x, y, triggers, normal) {
    if ($gameMap.isEventRunning()) {
      return;
    }

    const left = x;
    const right = x + this.width;
    const top = y;
    const bottom = y + this.height;

    const firstX = Math.floor(left);
    const lastX = CycloneMovement.isRoundNumber(right) ? right - 1 : Math.floor(right);
    const firstY = Math.floor(top);
    const lastY = CycloneMovement.isRoundNumber(bottom) ? bottom -1 : Math.floor(bottom);

    for (let newX = firstX; newX <= lastX; newX++) {
      for (let newY = firstY; newY <= lastY; newY++) {
        if (this.startMapTileEvent(newX, newY, triggers, normal) === true) {
          return true;
        }
      }
    }

    return false;
  }

  isOnDamageFloor() {
    if (this.isInAirship()) {
      return false;
    }

    if (this._newMaxX < 0 || this._newMaxY < 0) {
      return false;
    }

    for (let x = this._newMinX; x <= this._newMaxX; x++) {
      for (let y = this._newMinY; y <= this._newMaxY; y++) {
        if ($gameMap.isDamageFloor(x, y)) {
          return true;
        }
      }
    }

    return false;
  }

  encounterProgressValue() {
    const old = $super.encounterProgressValue.call(this);

    return old / CycloneMovement.stepCount;
  }

  updateNonmoving(wasMoving, sceneActive) {
    try {
      if ($gameMap.isEventRunning()) {
        return;
      }

      const enteredNewTile = this._newMaxX >= 0 && this._newMaxY >= 0;
      if (enteredNewTile) {
        $gameParty.onPlayerWalk();
      }

      if (enteredNewTile) {
        for (let x = this._newMinX; x <= this._newMaxX; x++) {
          for (let y = this._newMinY; y <= this._newMaxY; y++) {
            this.startMapEvent(x, y, [1, 2], false);

            if ($gameMap.setupStartingEvent()) {
              return;
            }
          }
        }
      }

      if (sceneActive && this.triggerAction()) {
        return;
      }

      if (wasMoving) {
        this.updateEncounterCount();
      } else {
        $gameTemp.clearDestination();
      }

      if (wasMoving || Input.dir4 !== 0) {
        this.checkEventTriggerThere([1, 2]);
        $gameMap.setupStartingEvent();
      }
    } finally {
      this._newMinX = Infinity;
      this._newMinY = Infinity;
      this._newMaxX = -Infinity;
      this._newMaxY = -Infinity;
    }
  }

  updateMove() {
    this.iterateNewTiles((x, y) => {
      this._newMinX = Math.min(x, this._newMinX ?? -Infinity);
      this._newMinY = Math.min(y, this._newMinY ?? -Infinity);
      this._newMaxX = Math.max(x, this._newMaxX ?? Infinity);
      this._newMaxY = Math.max(y, this._newMaxY ?? Infinity);
    });

    $super.updateMove.call(this);
  }

  _isSamePos(x1, y1, destX, destY) {
    if (Math.floor(x1) !== destX && Math.ceil(x1) !== destX) {
      return false;
    }

    if (Math.floor(y1) !== destY && Math.ceil(y1) !== destY) {
      return false;
    }

    return true;
  }

  triggerTouchAction() {
    if (!$gameTemp.isDestinationValid()) {
      return false;
    }

    const direction = this.direction();
    const x1 = this.x;
    const y1 = this.y;
    const destX = $gameTemp.destinationX();
    const destY = $gameTemp.destinationY();

    if (this._isSamePos(x1, y1, destX, destY)) {
      const result = this.triggerTouchActionD1(x1, y1);
      if (result) {
        return result;
      }
    }

    const x2 = CycloneMovement.roundXWithDirection(x1, direction);
    const y2 = CycloneMovement.roundYWithDirection(y1, direction);

    if (this._isSamePos(x2, y2, destX, destY)) {
      const result = this.triggerTouchActionD2(x2, y2);
      if (result) {
        return result;
      }
    }

    const x3 = CycloneMovement.roundXWithDirection(x2, direction);
    const y3 = CycloneMovement.roundYWithDirection(y2, direction);

    if (this._isSamePos(x3, y3, destX, destY)) {
      return this.triggerTouchActionD3(x3, y3);
    }

    return false;
  }

  isTouchingAirship() {
    const airship = $gameMap.airship();
    if (!airship) {
      return false;
    }

    return this.isTouchingCharacter(airship);
  }

  isFacingVehicle(vehicle) {
    if (!vehicle) {
      return false;
    }

    let { x, y } = this;
    switch (this._direction) {
      case 2:
        y++;
        break;
      case 4:
        x--;
        break;
      case 6:
        x++;
        break;
      case 8:
        y--;
        break;
    }

    return this.wouldTouchCharacterAt(vehicle, x, y);
  }

  getOnVehicle() {
    if (this.isTouchingAirship()) {
      this._vehicleType = 'airship';
    } else if (this.isFacingVehicle($gameMap.ship())) {
      this._vehicleType = 'ship';
    } else if (this.isFacingVehicle($gameMap.boat())) {
      this._vehicleType = 'boat';
    }

    if (this.isInAnyVehicle()) {
      this._vehicleGettingOn = true;

      if (!this.isInAirship()) {
        const vehicle = this.vehicle();
        if (vehicle) {
          this._x = vehicle._x;
          this._y = vehicle._y;

          this.updateAnimationCount();
        }
      }

      this.gatherFollowers();
    }
    return this._vehicleGettingOn;
  }

  checkDistanceToLand(direction, targetX, targetY) {
    switch (direction) {
      case 2:
        if (Math.abs(targetY - this.bottom) > 0.5) {
          return false;
        }
        break;
      case 4:
        if (Math.abs(targetX - this.left) > 1) {
          return false;
        }
        break;
      case 6:
        if (Math.abs(targetX - this.right) > 0.5) {
          return false;
        }
        break;
      case 8:
        if (Math.abs(targetY - this.top) > 1) {
          return false;
        }
        break;
    }

    return true;
  }

  isValidLandingPosition(vehicle, x, y, d) {
    if (!this.canLandOn(x, y, d)) {
      return false;
    }

    if (this.isCollidedWithCharacters(x, y)) {
      return false;
    }

    if (!vehicle.isLandOk(x, y, d)) {
      return false;
    }

    return true;
  }

  getLandingXOffset(vehicle, x, y, direction) {
    const maxOffset = this.isInAirship() ? Math.ceil(CycloneMovement.stepCount / 2) : CycloneMovement.stepCount;

    for (let i = 1; i < maxOffset; i++) {
      const offset = CycloneMovement.stepSize * i;
      if (this.isValidLandingPosition(vehicle, x - offset, y, direction)) {
        return -offset;
      }

      if (this.isValidLandingPosition(vehicle, x + offset, y, direction)) {
        return offset;
      }
    }

    return 0;
  }

  getLandingYOffset(vehicle, x, y, direction) {
    const maxOffset = this.isInAirship() ? Math.ceil(CycloneMovement.stepCount / 2) : CycloneMovement.stepCount;

    for (let i = 1; i < maxOffset; i++) {
      const offset = CycloneMovement.stepSize * i;
      if (this.isValidLandingPosition(vehicle, x, y - offset, direction)) {
        return -offset;
      }

      if (this.isValidLandingPosition(vehicle, x, y + offset, direction)) {
        return offset;
      }
    }

    return 0;
  }

  getBestLandingPosition(vehicle, direction) {
    let x;
    let y;
    let vehicleX = this.x;
    let vehicleY = this.y;
    const { stepCount } = CycloneMovement;

    if (this.isInAirship()) {
      x = Math.round(this.x * stepCount) / stepCount;
      y = Math.round(this.y * stepCount) / stepCount;
    } else {
      switch(direction) {
        case 2:
          x = Math.round(this.x * stepCount) / stepCount;
          y = Math.ceil((this.y + this.hitboxY + this.height) * stepCount) / stepCount;
          break;
        case 4:
          x = Math.floor((this.x - this.defaultHitboxX - this.defaultWidth) * stepCount) / stepCount;
          y = Math.round(this.y * stepCount) / stepCount;
          break;
        case 6:
          x = Math.ceil((this.x + this.hitboxX + this.width) * stepCount) / stepCount;
          y = Math.round(this.y * stepCount) / stepCount;
          break;
        case 8:
          x = Math.round(this.x * stepCount) / stepCount;
          y = Math.floor((this.y - this.defaultHitboxY - this.defaultHeight) * stepCount) / stepCount;
          break;
      }
    }

    if (this.isValidLandingPosition(vehicle, x, y, direction)) {
      return {
        x,
        y,
        vehicleX,
        vehicleY,
      };
    }

    if (CycloneMovement.isVertical(direction) || this.isInAirship()) {
      const xOffset = this.getLandingXOffset(vehicle, x, y, direction);
      if (xOffset !== 0) {
        return {
          x: x + xOffset,
          y,
          vehicleX: vehicleX + xOffset,
          vehicleY,
        };
      }

      if (!this.isInAirship()) {
        return false;
      }
    }

    const yOffset = this.getLandingYOffset(vehicle, x, y, direction);
    if (yOffset !== 0) {
      return {
        x,
        y: y + yOffset,
        vehicleX,
        vehicleY: vehicleY + yOffset
      };
    }

    return false;
  }

  getOffVehicle(direction = undefined) {
    direction = direction || this.direction();
    const vehicle = this.vehicle();
    if (!vehicle) {
      return this._vehicleGettingOff;
    }

    const target = this.getBestLandingPosition(vehicle, direction);
    if (!target) {
      return this._vehicleGettingOff;
    }

    if (this.isInAirship()) {
      this.setDirection(2);
    }

    this._followers.synchronize(this.x, this.y, direction);
    vehicle.getOff();

    const oldVehicleY = vehicle._y;
    const oldVehicleX = vehicle._x;

    vehicle._x = target.vehicleX;
    vehicle._y = target.vehicleY;
    this._x = target.x;
    this._y = target.y;
    this._positionHistory = [];

    if (!this.isInAirship()) {
      if (oldVehicleX < target.vehicleX) {
        vehicle.setDirection(6);
      } else if (oldVehicleX > target.vehicleX) {
        vehicle.setDirection(4);
      } else if (oldVehicleY < target.vehicleY) {
        vehicle.setDirection(2);
      } else if (oldVehicleY > target.vehicleY) {
        vehicle.setDirection(8);
      }

      this.updateAnimationCount();
      this.setTransparent(false);
    }

    this._vehicleGettingOff = true;
    this.setMoveSpeed(4);
    this.setThrough(false);
    this.makeEncounterCount();
    this.gatherFollowers();
  }

  // Stop airship from setting the movement as through
  updateVehicleGetOn() {
    const oldThrough = this._through;
    $super.updateVehicleGetOn.call(this);
    this._through = oldThrough;
  }

  isThrough() {
    if (!this._ignoreVehicle && this.isInAirship()) {
      return true;
    }

    return $super.isThrough.call(this);
  }

  isPositionPassable(x, y, d) {
    const vehicle = this.vehicle();
    if (vehicle && !this._ignoreVehicle) {
      return vehicle.checkPassage(Math.floor(x), Math.floor(y));
    }

    return $super.isPositionPassable.call(this, x, y, d);
  }

  shouldSkipExtraPassabilityTests() {
    const vehicle = this.vehicle();

    if (vehicle && !this._ignoreVehicle) {
      return true;
    }

    return false;
  }

  isInVehicle() {
    if (this._ignoreVehicle) {
      return false;
    }

    return $super.isInVehicle.call(this);
  }

  // Check if there's enough room for the player on that position
  canLandOn(x, y, direction) {
    this._ignoreVehicle = true;
    this.updateHitbox();
    try {
      if (this.canPass(x, y, 2)) {
        return true;
      }
      if (this.canPass(x, y, 4)) {
        return true;
      }
      if (this.canPass(x, y, 6)) {
        return true;
      }
      if (this.canPass(x, y, 8)) {
        return true;
      }

      return false;
    } finally {
      this._ignoreVehicle = false;
      this.updateHitbox();
    }
  }

  determineDirectionToDestination() {
    const x = $gameTemp.destinationX();
    const y = $gameTemp.destinationY();

    return this.findDirectionTo(x, y);
  }

  searchLimit() {
    const limit = $super.searchLimit.call(this);

    if (TouchInput.isLongPressed()) {
      return Math.floor(limit / CycloneMovement.stepCount);
    }

    return limit;
  }
});
