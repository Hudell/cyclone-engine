const addPixelMovementToClass = (classRef) => {
  CycloneMovement.patchClass(classRef, $super => class {
    get width() {
      if (this._tempWidth !== undefined) {
        return this._tempWidth;
      }

      return this.getWidth();
    }
    get height() {
      if (this._tempHeight !== undefined) {
        return this._tempHeight;
      }

      return this.getHeight();
    }

    get hitboxX() {
      if (this._tempHitboxX !== undefined) {
        return this._tempHitboxX;
      }

      return this.getHitboxX();
    }

    get hitboxY() {
      if (this._tempHitboxY !== undefined) {
        return this._tempHitboxY;
      }

      return this.getHitboxY();
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

    getWidth() {
      return 1;
    }
    getHeight() {
      return 1;
    }

    getHitboxX() {
      return 0;
    }

    getHitboxY() {
      return 0;
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

    shouldSkipExtraPassabilityTests() {
      return false;
    }

    update(...args) {
      try {
        this._canPassCache = {};
        $super.update.call(this, ...args);
      } finally {
        delete this._canPassCache;
      }
    }

    shouldPassThrough() {
      if (this.isThrough() || this.isDebugThrough()) {
        return true;
      }

      return false;
    }

    canPass(x, y, d) {
      if (!this._canPassCache) {
        return this._canPass(x, y, d);
      }

      const index = CycloneMovement.collisionIndex(x, y);
      let result = this._canPassCache?.[index]?.[d];

      if (result !== undefined) {
        return result;
      }

      result = this._canPass(x, y, d);
      if (!this._canPassCache[index]) {
        this._canPassCache[index] = new Array(10);
      }

      this._canPassCache[index][d] = result;
      return result;
    }

    _canPass(x, y, d) {
      if (CycloneMovement.isDiagonal(d)) {
        const d1 = CycloneMovement.getFirstDirection(d);
        const d2 = CycloneMovement.getAlternativeDirection(d1, d);
        return this.canPassDiagonally(x, y, d2, d1);
      }

      const x2 = CycloneMovement.roundXWithDirection(x, d);
      const y2 = CycloneMovement.roundYWithDirection(y, d);

      if (!$gameMap.isValid(x2, y2)) {
        return false;
      }

      if (this.shouldPassThrough()) {
        return true;
      }

      if (!this.isMapPassable(x, y, d)) {
        return false;
      }

      if (this.shouldSkipExtraPassabilityTests()) {
        return true;
      }

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
        const checkUp = newY > firstY;
        const checkDown = newY < lastY;

        if (this.checkLeftPassage(left, newY, destinationLeft, checkUp, checkDown) === false) {
          return false;
        }
      }

      return true;
    }

    isPositionPassable(x, y, d) {
      return CycloneMovement.isPositionPassable(x, y, d);
    }

    checkLeftPassage(left, y, destinationLeft, checkUp = false, checkDown = false) {
      const count = CycloneMovement.collisionStepCount;
      const leftFloor = Math.floor(left * count) / count;
      const destinationLeftFloor = Math.floor(destinationLeft * count) / count;

      // if we're entering a new left tile
      if (destinationLeftFloor < leftFloor) {
        // check if the current left-most tile allows moving left
        if (!this.isPositionPassable(leftFloor, y, 4)) {
          return false;
        }

        // and check if the new left-most tile allows moving right
        if (!this.isPositionPassable(destinationLeftFloor, y, 6)) {
          return false;
        }

        if (this.checkVerticalPassage(destinationLeftFloor, y, checkUp, checkDown) === false) {
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
        const checkUp = newY > firstY;
        const checkDown = newY < lastY;

        if (this.checkRightPassage(right, newY, destinationRight, checkUp, checkDown) === false) {
          return false;
        }
      }

      return true;
    }

    checkRightPassage(right, y, destinationRight, checkUp = false, checkDown = false) {
      const lastXDestination = this.lastCollisionXAt((destinationRight - this.width - this.hitboxX));
      const lastX = this.lastCollisionXAt((right - this.width - this.hitboxX));

      // if we're entering a new right tile
      if (lastXDestination > lastX) {
        // check if the current right-most tile allows moving right
        if (!this.isPositionPassable(lastX, y, 6)) {
          return false;
        }

        // and check if the new right-most tile allows moving left
        if (!this.isPositionPassable(lastXDestination, y, 4)) {
          return false;
        }

        if (this.checkVerticalPassage(lastXDestination, y, checkUp, checkDown) === false) {
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
        const checkLeft = newX > firstX;
        const checkRight = newX < lastX;

        if (this.checkUpPassage(newX, top, destinationTop, checkLeft, checkRight) === false) {
          return false;
        }
      }

      return true;
    }

    checkVerticalPassage(x, y, checkUp, checkDown) {
      // If the collision block height is smaller than our hitbox height, then we need to check if horizontal movement is free among all new blocks we'll be touching
      if (this.height <= CycloneMovement.collisionSize) {
        return;
      }

      if (checkUp && !this.isPositionPassable(x, y, 8)) {
        return false;
      }
      if (checkDown && !this.isPositionPassable(x, y, 2)) {
        return false;
      }
    }

    checkHorizontalPassage(x, y, checkLeft, checkRight) {
      // If the collision block width is smaller than our hitbox width, then we need to check if horizontal movement is free among all new blocks we'll be touching
      if (this.width <= CycloneMovement.collisionSize) {
        return;
      }

      if (checkLeft && !this.isPositionPassable(x, y, 4)) {
        return false;
      }
      if (checkRight && !this.isPositionPassable(x, y, 6)) {
        return false;
      }
    }

    checkUpPassage(x, top, destinationTop, checkLeft = false, checkRight = false) {
      const count = CycloneMovement.collisionStepCount;
      const topFloor = Math.floor(top * count) / count;
      const destinationTopFloor = Math.floor(destinationTop * count) / count;

      // if we're entering a new top tile
      if (destinationTopFloor < topFloor) {
        // check if the current top tile allows moving up
        if (!this.isPositionPassable(x, topFloor, 8)) {
          return false;
        }

        // and check if the new top tile allows moving down
        if (!this.isPositionPassable(x, destinationTopFloor, 2)) {
          return false;
        }

        if (this.checkHorizontalPassage(x, destinationTopFloor, checkLeft, checkRight) === false) {
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
        const checkLeft = newX > firstX;
        const checkRight = newX < lastX;

        if (this.checkDownPassage(newX, bottom, destinationBottom, checkLeft, checkRight) === false) {
          return false;
        }
      }

      return true;
    }

    checkDownPassage(x, bottom, destinationBottom, checkLeft = false, checkRight = false) {
      const lastYDestination = this.lastCollisionYAt((destinationBottom - this.height - this.hitboxY));
      const lastY = this.lastCollisionYAt((bottom - this.height - this.hitboxY));

      // if we're entering a new bottom tile
      if (lastYDestination > lastY) {
        // check if the current bottom tile allows moving down
        if (!this.isPositionPassable(x, lastY, 2)) {
          return false;
        }

        // and check if the new bottom tile allows moving up
        if (!this.isPositionPassable(x, lastYDestination, 8)) {
          return false;
        }

        if (this.checkHorizontalPassage(x, lastYDestination, checkLeft, checkRight) === false) {
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

      if (!$gamePlayer.areFollowersGathering()) {
        if (this._positionHistory.length < CycloneMovement.followerStepsBehind - 1) {
          return false;
        }
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

    isTouchingPos(x, y) {
      if (!(x >= this.firstX && x <= this.lastX)) {
        return false;
      }

      if (!(y >= this.firstY && y <= this.lastY)) {
        return false;
      }

      return true;
    }

    isTouchingRect(left, top, right, bottom) {
      return this.wouldTouchRectAt(left, top, right, bottom, this._x, this._y);
    }

    isTouchingCharacter(character) {
      return this.wouldTouchCharacterAt(character, this._x, this._y);
    }

    wouldTouchRectAt(left, top, right, bottom, x, y) {
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);

      if (right < firstX) {
        return false;
      }

      if (left >= lastX) {
        return false;
      }

      if (bottom < firstY) {
        return false;
      }

      if (top >= lastY) {
        return false;
      }

      return true;
    }

    wouldTouchCharacterAt(character, x, y) {
      const {
        left = character.x,
        right = character.x + 1,
        top = character.y,
        bottom = character.y + 1,
      } = character;

      return this.wouldTouchRectAt(left, top, right, bottom, x, y);
    }

    pos(x, y) {
      if (this._x === x && this._y === y) {
        return true;
      }

      return this.isTouchingPos(x, y);
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

        if (this.isTouchingPos(blockX, blockY)) {
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

    isCollidedWithVehicles() {
      return false;
    }

    chasePosition(x, y) {
      const sx = this.deltaXFrom(x);
      const sy = this.deltaYFrom(y);

      const sxAbs = Math.abs(sx);
      const syAbs = Math.abs(sy);
      const { stepSize } = CycloneMovement;

      if (sxAbs >= stepSize && syAbs >= stepSize) {
        this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
      } else if (sxAbs >= stepSize) {
        this.moveStraight(sx > 0 ? 4 : 6);
      } else if (syAbs >= stepSize) {
        this.moveStraight(sy > 0 ? 8 : 2);
      } else if (sxAbs > 0 || syAbs > 0) {
        this._x = x;
        this._y = y;
      }

      this.setMoveSpeed($gamePlayer.realMoveSpeed());
    }

    setDirection(d) {
      if (CycloneMovement.goesUp(d)) {
        $super.setDirection.call(this, 8);
      } else if (CycloneMovement.goesDown(d)) {
        $super.setDirection.call(this, 2);
      } else if (CycloneMovement.goesLeft(d)) {
        $super.setDirection.call(this, 4);
      } else if (CycloneMovement.goesRight(d)) {
        $super.setDirection.call(this, 6);
      }
    }

    _findNextBestNode(best, x1, y1, direction, closedList, goalX, goalY, current, openList, nodeList) {
      const x2 = CycloneMovement.roundXWithDirection(x1, direction);
      const y2 = CycloneMovement.roundYWithDirection(y1, direction);

      const pos2 = y2 * $gameMap.width() + x2;

      if (closedList.contains(pos2)) {
        return best;
      }

      if (Math.floor(x1) === goalX && Math.floor(y1) === goalY) {
        return false;
      }

      if (!this.canPass(x1, y1, direction)) {
        return best;
      }

      let g2 = current.g + CycloneMovement.stepSize;
      if (CycloneMovement.isDiagonal(direction)) {
        g2 += CycloneMovement.stepSize;
      }

      const index2 = openList.indexOf(pos2);
      if (index2 < 0 || g2 < nodeList[index2].g) {
        let neighbor;
        if (index2 >= 0) {
          neighbor = nodeList[index2];
        } else {
          neighbor = {};
          nodeList.push(neighbor);
          openList.push(pos2);
        }

        neighbor.parent = current;
        neighbor.x = x2;
        neighbor.y = y2;
        neighbor.g = g2;
        neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);

        if (!best || neighbor.f - neighbor.g < best.f - best.g) {
          return neighbor;
        }
      }

      return best;
    }

    getDirectionNode(start, goalX, goalY) {
      const searchLimit = this.searchLimit();
      const mapWidth = $gameMap.width();
      const nodeList = [];
      const openList = [];
      const closedList = [];
      let best = start;

      if (this.x === goalX && this.y === goalY) {
        return undefined;
      }

      nodeList.push(start);
      openList.push(start.y * mapWidth + start.x);

      while (nodeList.length) {
        let bestIndex = 0;
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].f < nodeList[bestIndex].f) {
            bestIndex = i;
          }
        }

        const current = nodeList[bestIndex];
        const x1 = current.x;
        const y1 = current.y;
        const pos1 = y1 * mapWidth + x1;
        const g1 = current.g;

        nodeList.splice(bestIndex, 1);
        openList.splice(openList.indexOf(pos1), 1);
        closedList.push(pos1);

        if (this._positionMatch(current.x, current.y, goalX, goalY)) {
          best = current;
          break;
        }

        if (g1 >= searchLimit) {
          continue;
        }

        for (let d = 1; d <= 9; d++) {
          if (d === 5) {
            continue;
          }

          if (!CycloneMovement.diagonalPathfinding && CycloneMovement.isDiagonal(d)) {
            continue;
          }

          const nextBest = this._findNextBestNode(best, x1, y1, d, closedList, goalX, goalY, current, openList, nodeList);
          if (nextBest === false) {
            break;
          }

          best = nextBest;
        }
      }

      return best;
    }

    clearCachedNode() {
      this.setCachedNode();
    }

    setCachedNode(node, goalX, goalY) {
      this._cachedNode = node;
      this._cachedGoalX = goalX;
      this._cachedGoalY = goalY;

      this._cacheTTL = 2 * CycloneMovement.collisionSize * CycloneMovement.collisionSize - 1;
    }

    _getDirectionFromDeltas(deltaX, deltaY) {
      if (CycloneMovement.diagonalPathfinding) {
        if (deltaY > 0) {
          if (deltaX > 0) {
            return 3;
          }
          if (deltaX < 0) {
            return 1;
          }
        } else if (deltaY < 0) {
          if (deltaX < 0) {
            return 7;
          }
          if (deltaX > 0) {
            return 9;
          }
        }
      }

      if (deltaY > 0) {
        return 2;
      }

      if (deltaX < 0) {
        return 4;
      }

      if (deltaX > 0) {
        return 6;
      }

      if (deltaY < 0) {
        return 8;
      }

      return 0;
    }

    _returnDirection(direction, goalX, goalY, canRetry) {
      if (direction) {
        if (!this.canPass(this._x, this._y, direction)) {
          this.clearCachedNode();
          if (canRetry) {
            return this.findDirectionTo(goalX, goalY);
          }
          return 0;
        }
      }

      return direction;
    }

    _positionMatch(x1, y1, x2, y2) {
      return x1 === x2 && y1 === y2;
    }

    _nodeIsNotNextStep(node, x, y) {
      if (!node.parent) {
        return false;
      }

      return !this._positionMatch(node.parent.x, node.parent.y, x, y);
    }

    _findDirectionTo(goalX, goalY) {
      let node = this._cachedNode;
      const start = {};
      start.parent = null;
      start.x = this.x;
      start.y = this.y;
      start.g = 0;
      start.f = $gameMap.distance(start.x, start.y, goalX, goalY);

      let canRetry = true;
      if (node === undefined) {
        node = this.getDirectionNode(start, goalX, goalY);
        this.setCachedNode(node, goalX, goalY);
        if (node === undefined) {
          return 0;
        }
        canRetry = false;
      }

      if (node.x !== start.x || node.y !== start.y) {
        while (this._nodeIsNotNextStep(node, start.x, start.y)) {
          node = node.parent;
        }

        if (!node.parent) {
          this.clearCachedNode();
          if (canRetry) {
            node = this.getDirectionNode(start, goalX, goalY);
            this.setCachedNode(node, goalX, goalY);

            if (node === undefined) {
              return 0;
            }
          }
        }
      }

      const deltaX1 = $gameMap.deltaX(node.x, start.x);
      const deltaY1 = $gameMap.deltaY(node.y, start.y);
      const deltaD = this._getDirectionFromDeltas(deltaX1, deltaY1);

      if (deltaD) {
        return deltaD;
      }

      const deltaX2 = this.deltaXFrom(goalX);
      const deltaY2 = this.deltaYFrom(goalY);
      let direction = 0;

      if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
        direction = deltaX2 > 0 ? 4 : 6;
      } else if (deltaY2 !== 0) {
        direction = deltaY2 > 0 ? 8 : 2;
      }

      return this._returnDirection(direction, goalX, goalY, canRetry);
    }

    findDirectionTo(goalX, goalY) {
      if (this.x === goalX && this.y === goalY) {
        return 0;
      }

      if (this._cachedNode) {
        if (this._cachedGoalX !== goalX || this._cachedGoalY !== goalY) {
          this.clearCachedNode();
        } else if (this._cacheTTL > 0) {
          this._cacheTTL--;
        } else {
          this.clearCachedNode();
        }
      }


      try {
        return this._findDirectionTo(goalX, goalY);
      } finally {
        delete this._pfGrid;
      }
    }
  });
};

addPixelMovementToClass(Game_Player);
addPixelMovementToClass(Game_Follower);
