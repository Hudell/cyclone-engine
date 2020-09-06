const addPixelMovementToClass = (classRef) => {
  CycloneMovement.patchClass(classRef, $super => class {
    get width() {
      return 0.75;
    }
    get height() {
      return 0.375;
    }

    get hitboxX() {
      return 0.125;
    }

    get hitboxY() {
      return 0.5;
    }

    get left() {
      return this._x + this.hitboxX;
    }
    get right() {
      return this._x + this.hitboxX + this.width;
    }
    get top() {
      return this._y + this.hitboxY;
    }
    get bottom() {
      return this._y + this.hitboxY + this.height;
    }

    get firstY() {
      return this.firstYAt(this._y);
    }
    get lastY() {
      return this.lastYAt(this._y);
    }

    get firstX() {
      return this.firstXAt(this._x);
    }
    get lastX() {
      return this.lastXAt(this._x);
    }

    firstXAt(x) {
      return Math.floor(x + this.hitboxX);
    }
    lastXAt(x) {
      const right = x + this.hitboxX + this.width;
      if (CycloneMovement.isRoundNumber(right)) {
        return right - 1;
      }

      return Math.floor(right);
    }
    firstYAt(y) {
      return Math.floor(y + this.hitboxY);
    }
    lastYAt(y) {
      const bottom = y + this.hitboxY + this.height;
      if (CycloneMovement.isRoundNumber(bottom)) {
        return bottom - 1;
      }

      return Math.floor(bottom);
    }

    firstCollisionXAt(x) {
      const count = CycloneMovement.collisionStepCount;
      return Math.floor((x + this.hitboxX) * count) / count;
    }

    lastCollisionXAt(x) {
      const count = CycloneMovement.collisionStepCount;
      const right = (x + this.hitboxX + this.width) * count;
      if (CycloneMovement.isRoundNumber(right)) {
        return (right - 1) / count;
      }

      return Math.floor(right) / count;
    }

    firstCollisionYAt(y) {
      const count = CycloneMovement.collisionStepCount;
      return Math.floor((y + this.hitboxY) * count) / count;
    }

    lastCollisionYAt(y) {
      const count = CycloneMovement.collisionStepCount;
      const bottom = (y + this.hitboxY + this.height) * count;
      if (CycloneMovement.isRoundNumber(bottom)) {
        return (bottom - 1) / count;
      }

      return Math.floor(bottom) / count;
    }

    canPass(x, y, d) {
      const x2 = CycloneMovement.roundXWithDirection(x, d);
      const y2 = CycloneMovement.roundYWithDirection(y, d);

      if (!$gameMap.isValid(x2, y2)) {
        return false;
      }

      if (this.isThrough() || this.isDebugThrough()) {
        return true;
      }

      if (!this.isMapPassable(x, y, d)) {
        return false;
      }

      // if (this instanceof Game_Player) {
      //   const vehicle = this.vehicle();

      //   if (vehicle) {
      //     return true;
      //   }
      // }

      if (!this.isMapPassable(x2, y2, this.reverseDir(d))) {
        return false;
      }

      if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
      }

      return true;
    }

    canPassDiagonally(x, y, horz, vert) {
      if (!this.canPass(x, y, vert)) {
        return false;
      }
      if (!this.canPass(x, y, horz)) {
        return false;
      }

      const y2 = CycloneMovement.roundYWithDirection(y, vert);

      if (!this.canPass(x, y2, horz)) {
        return false;
      }

      const x2 = CycloneMovement.roundXWithDirection(x, horz);
      if (!this.canPass(x2, y, vert)) {
        return false;
      }

      return true;
    }

    isMapPassable(x, y, d) {
      if (CycloneMovement.goesUp(d)) {
        if (!this.canGoUp(x, y)) {
          return false;
        }
      } else if (CycloneMovement.goesDown(d)) {
        if (!this.canGoDown(x, y)) {
          return false;
        }
      }

      if (CycloneMovement.goesLeft(d)) {
        if (!this.canGoLeft(x, y)) {
          return false;
        }
      } else if (CycloneMovement.goesRight(d)) {
        if (!this.canGoRight(x, y)) {
          return false;
        }
      }

      return true;
    }

    canGoLeft(x, y) {
      const left = x + this.hitboxX;
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);
      const destinationLeft = left - CycloneMovement.stepSize;

      // Run the collision check for every Y tile the character is touching
      for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
        if (this.checkLeftPassage(left, newY, destinationLeft) === false) {
          return false;
        }
      }

      return true;
    }

    // eslint-disable-next-line complexity
    checkLeftPassage(left, y, destinationLeft) {
      // if (this instanceof Game_Player) {
      //   var vehicle = this.vehicle();
      //   if (vehicle !== undefined && vehicle !== null) {
      //     return vehicle.check_vehicle_passage(theX.floor(), newY) && vehicle.check_vehicle_passage(destination_x.floor(), newY);
      //   }
      // }

      // #ToDo: we may need additional tests for larger sprites
      const count = CycloneMovement.collisionStepCount;
      const leftFloor = Math.floor(left * count) / count;
      const destinationLeftFloor = Math.floor(destinationLeft * count) / count;

      // if we're entering a new left tile
      if (destinationLeftFloor < leftFloor) {
        // check if the current left-most tile allows moving left
        if (!CycloneMovement.isPositionPassable(leftFloor, y, 4)) {
          return false;
        }

        // and check if the new left-most tile allows moving right
        if (!CycloneMovement.isPositionPassable(destinationLeftFloor, y, 6)) {
          return false;
        }
      }

      return null;
    }

    canGoRight(x, y) {
      const right = x + this.hitboxX + this.width;
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);
      const destinationRight = right + CycloneMovement.stepSize;

      for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
        if (this.checkRightPassage(right, newY, destinationRight) === false) {
          return false;
        }
      }

      return true;
    }

    checkRightPassage(right, y, destinationRight) {
      // if (this instanceof Game_Player) {
      //   var vehicle = this.vehicle();
      //   if (vehicle !== undefined && vehicle !== null) {
      //     return vehicle.check_vehicle_passage(endX.floor(), newY) && vehicle.check_vehicle_passage(destinationEndX.floor(), newY);
      //   }
      // }

      const lastXDestination = this.lastCollisionXAt((destinationRight - this.width - this.hitboxX));
      const lastX = this.lastCollisionXAt((right - this.width - this.hitboxX));

      // if we're entering a new right tile
      if (lastXDestination > lastX) {
        // check if the current right-most tile allows moving right
        if (!CycloneMovement.isPositionPassable(lastX, y, 6)) {
          return false;
        }

        // and check if the new right-most tile allows moving left
        if (!CycloneMovement.isPositionPassable(lastXDestination, y, 4)) {
          return false;
        }
      }

      return null;
    }

    canGoUp(x, y) {
      const top = y + this.hitboxY;
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const destinationTop = (top - CycloneMovement.stepSize);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        if (this.checkUpPassage(newX, top, destinationTop) === false) {
          return false;
        }
      }

      return true;
    }

    // eslint-disable-next-line complexity
    checkUpPassage(x, top, destinationTop) {
      // if (this instanceof Game_Player) {
      //   var vehicle = this.vehicle();
      //   if (vehicle !== undefined && vehicle !== null) {
      //     return vehicle.check_vehicle_passage(newX, theY.floor()) && vehicle.check_vehicle_passage(newX, destinationY.floor());
      //   }
      // }

      // #ToDo: we may need additional tests for larger sprites
      const count = CycloneMovement.collisionStepCount;
      const topFloor = Math.floor(top * count) / count;
      const destinationTopFloor = Math.floor(destinationTop * count) / count;

      // if we're entering a new top tile
      if (destinationTopFloor < topFloor) {
        // check if the current top tile allows moving up
        if (!CycloneMovement.isPositionPassable(x, topFloor, 8)) {
          return false;
        }

        // and check if the new top tile allows moving down
        if (!CycloneMovement.isPositionPassable(x, destinationTopFloor, 2)) {
          return false;
        }
      }

      return null;
    }

    canGoDown(x, y) {
      const bottom = y + this.hitboxY + this.height;
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const destinationBottom = (bottom + CycloneMovement.stepSize);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        if (this.checkDownPassage(newX, bottom, destinationBottom) === false) {
          return false;
        }
      }

      return true;
    }

    checkDownPassage(x, bottom, destinationBottom) {
      // if (this instanceof Game_Player) {
      //   var vehicle = this.vehicle();
      //   if (vehicle !== undefined && vehicle !== null) {
      //     return vehicle.check_vehicle_passage(newX, endY.floor()) && vehicle.check_vehicle_passage(newX, destinationEndY.floor());
      //   }
      // }

      const lastYDestination = this.lastCollisionYAt((destinationBottom - this.height - this.hitboxY));
      const lastY = this.lastCollisionYAt((bottom - this.height - this.hitboxY));

      // if we're entering a new bottom tile
      if (lastYDestination > lastY) {
        // check if the current bottom tile allows moving down
        if (!CycloneMovement.isPositionPassable(x, lastY, 2)) {
          return false;
        }

        // and check if the new bottom tile allows moving up
        if (!CycloneMovement.isPositionPassable(x, lastYDestination, 8)) {
          return false;
        }
      }

      return null;
    }

    addNewPosition(x, y) {
      if (this instanceof Game_Vehicle) {
        return;
      }

      if (CycloneMovement.followerStepsBehind <= 1) {
        return;
      }

      if (!this._positionHistory) {
        this._positionHistory = [];
      }

      this._positionHistory.push({x, y});

      if (this._positionHistory.length > CycloneMovement.followerStepsBehind + 1) {
        this._positionHistory.shift();
      }
    }

    getPositionToFollow() {
      if (!this._positionHistory) {
        this._positionHistory = [];
        if (CycloneMovement.followerStepsBehind > 1) {
          return false;
        }
      }

      if (this._positionHistory.length < CycloneMovement.followerStepsBehind - 1) {
        return false;
      }

      if (this._positionHistory.length === 0) {
        return {
          x : this._x,
          y : this._y,
        };
      }

      return this._positionHistory.shift();
    }

    locate(...args) {
      this._positionHistory = [];
      $super.locate.call(this, ...args);
    }

    _moveStraight(d) {
      this.setMovementSuccess(this.canPass(this._x, this._y, d));
      if (this.isMovementSucceeded()) {
        this.setDirection(d);

        const { stepCount } = CycloneMovement;

        this._x = Math.round(CycloneMovement.roundXWithDirection(this._x, d) * stepCount) / stepCount;
        this._y = Math.round(CycloneMovement.roundYWithDirection(this._y, d) * stepCount) / stepCount;
        this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(d));
        this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(d));

        this.updateAnimationCount();
        this.addNewPosition(this._x, this._y);
        this.increaseSteps();
      } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
      }
    }

    _moveDiagonally(horz, vert) {
      this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));

      if (this.isMovementSucceeded()) {
        this._x = CycloneMovement.roundXWithDirection(this._x, horz);
        this._y = CycloneMovement.roundYWithDirection(this._y, vert);
        this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(vert));

        this.updateAnimationCount();
        this.addNewPosition(this._x, this._y);
        this.increaseSteps();
      }

      if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
      }
      if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
      }
    }

    moveStraight(d) {
      return this._moveStraight(d);
    }

    moveDiagonally(horz, vert) {
      return this._moveDiagonally(horz, vert);
    }

    isTouchingTile(x, y) {
      if (!(x >= this.firstX && x <= this.lastX)) {
        return false;
      }

      if (!(y >= this.firstY && y <= this.lastY)) {
        return false;
      }

      return true;
    }

    pos(x, y) {
      return this.isTouchingTile(x, y);
    }

    iterateTiles(callback) {
      return this.runForAllTiles(this._x, this._y, callback);
    }

    runForAllTiles(x, y, callback) {
      const firstX = Math.floor(this.firstCollisionXAt(x));
      const lastX = Math.floor(this.lastCollisionXAt(x));
      const firstY = Math.floor(this.firstCollisionYAt(y));
      const lastY = Math.floor(this.lastCollisionYAt(y));

      for (let newX = firstX; newX <= lastX; newX++) {
        for (let newY = firstY; newY <= lastY; newY++) {
          if (callback.call(this, newX, newY) === true) {
            return true;
          }
        }
      }

      return false;
    }

    iteratePositions(callback) {
      return this.runForAllPositions(this._x, this._y, callback);
    }

    runForAllPositions(x, y, callback) {
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
          if (callback.call(this, newX, newY) === true) {
            return true;
          }
        }
      }

      return false;
    }

    isCollidedWithEvents(x, y) {
      return this.runForAllTiles(x, y, function(blockX, blockY) {
        //If the player is "inside" it, then this event won't be considered,
        //because if it did, the player would be locked on it
        //this shouldn't be possible on normal conditions.

        if (this.isTouchingTile(blockX, blockY)) {
          return false;
        }

        return $gameMap.eventsXyNt(blockX, blockY).some(event  => event.isNormalPriority());
      });
    }

    isOnBush() {
      let bushCount = 0;
      let nonBushCount = 0;

      this.iteratePositions((x, y) => {
        if ($gameMap.isBush(Math.floor(x), Math.floor(y))) {
          bushCount++;
        } else {
          nonBushCount++;
        }
      });

      return bushCount > nonBushCount;
    }

    isOnLadder() {
      let ladderCount = 0;
      let nonLadderCount = 0;

      this.iteratePositions((x, y) => {
        if ($gameMap.isLadder(Math.floor(x), Math.floor(y))) {
          ladderCount++;
        } else {
          nonLadderCount++;
        }
      });

      return ladderCount > nonLadderCount;
    }
  });
};

addPixelMovementToClass(Game_Player);
addPixelMovementToClass(Game_Follower);
addPixelMovementToClass(Game_Vehicle);