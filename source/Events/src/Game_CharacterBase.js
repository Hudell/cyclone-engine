const failedMovementDelay = 30;

CycloneEvents.patchClass(Game_CharacterBase, $super => class {
  _updateXyDestinationPartialTile() {
    const xDistance = this._x - this._xDestination;
    const yDistance = this._y - this._yDestination;

    // Check if there's any additional partial tile to walk
    if (Math.abs(xDistance) < 1 && Math.abs(yDistance) < 1) {
      if (xDistance < 0) {
        this._direction = 6;
        this._x = this._xDestination;
        return true;
      }

      if (yDistance < 0) {
        this._direction = 2;
        this._y = this._yDestination;
        return true;
      }

      if (xDistance > 0) {
        this._direction = 4;
        this._x = this._xDestination;
        return true;
      }

      if (yDistance > 0) {
        this._y = this._yDestination;
        this._direction = 8;
        return true;
      }
    }

    //Check if there's any partial position to fix before start walking
    if (this._x - Math.floor(this._x) || this._y - Math.floor(this._y)) {
      if (this._xDestination > this._x) {
        this._direction = 6;
        this._x = Math.ceil(this._x);
      } else {
        this._direction = 4;
        this._x = Math.floor(this._x);
      }

      if (this._yDestination > this._y) {
        this._direction = 2;
        this._y = Math.ceil(this._y);
      } else {
        this._direction = 8;
        this._y = Math.floor(this._y);
      }

      return true;
    }
  }

  updateXyDestination() {
    if (this._xDestination == this._x && this._yDestination == this._y) {
      // If the character reached the destination, check if there's a direction to face
      if (this._dDestination !== undefined && this._dDestination !== 0) {
        if (this.isMoving()) {
          return true;
        }
        this._direction = this._dDestination;
      }

      this.clearDestination();
    }

    if (this._xDestination === undefined) {
      return false;
    }

    if (this.isMoving()) {
      return false;
    }

    if (this._updateXyDestinationPartialTile()) {
      return true;
    }

    const direction = this.findDirectionTo(Math.floor(this._xDestination), Math.floor(this._yDestination));

    if (direction > 0) {
      this.moveStraight(direction);
      if (!this.isMovementSucceeded()) {
        this._cycloneMovementDelay = failedMovementDelay;
      }

      return true;
    }
  }

  updateCharacterDestination() {
    if (this._destinationCharacter._x === this._x && this._destinationCharacter._y == this._y) {
      //If the stalker reached the character, check if it needs to keep following it
      if (this._followCharacter !== true) {
        this.clearDestination();
        return false;
      }

      return true;
    }

    if (this.isMoving()) {
      return false;
    }

    const direction = this.findDirectionTo(this._destinationCharacter._x, this._destinationCharacter._y);
    if (direction > 0) {
      this.moveStraight(direction);

      if (!this.isMovementSucceeded()) {
        //If failed to move, and it's not set to follow the character and distance is less than 1 tile, stop moving.
        if (this._followCharacter !== true) {
          const distance = Math.abs(this._x - this._destinationCharacter._x) + Math.abs(this._y - this._destinationCharacter._y);
          if (distance <= 1) {
            this.clearDestination();
            return true;
          }
        }

        this._cycloneMovementDelay = failedMovementDelay;
      }

      return true;
    }
  }

  updateStop() {
    if (this._cycloneMovementDelay !== undefined && this._cycloneMovementDelay > 0) {
      this._cycloneMovementDelay--;
      return;
    }


    if (this._xDestination !== undefined && this._yDestination !== undefined && this.updateXyDestination()) {
      return;
    }


    if (this._destinationCharacter !== undefined && this.updateCharacterDestination()) {
      return;
    }

    $super.updateStop.call(this);
  }

  // Change the advanceMoveRouteIndex  to only advance the index when the character reach the destination.
  advanceMoveRouteIndex() {
    if (this._xDestination === undefined && this._yDestination === undefined && this._destinationCharacter === undefined) {
      $super.advanceMoveRouteIndex.call(this);
    }
  }

  // Clears the destination automatically if a new move route is set
  setMoveRoute(moveRoute) {
    this.clearDestination();
    $super.setMoveRoute.call(this, moveRoute);
  }

  setDestination(x, y, d) {
    if (this._x != x || this._y != y || this.isMoving()) {
      this._xDestination = x;
      this._yDestination = y;

      if (d !== undefined) {
        this._dDestination = d;
      }
    } else if (d !== undefined && d !== 0) {
      this._direction = d;
    }
  }

  setCharacterDestination(character, follow = false) {
    if (typeof(character) == 'number') {
      character = $gameMap._interpreter.character(character);
    }

    if (character === undefined) return;

    if (follow === true) {
      this._destinationCharacter = character;
      this._followCharacter = true;
    } else {
      if (this._x != character._x || this._y != character._y || this.isMoving()) {
        this._destinationCharacter = character;
        this._followCharacter = false;
      }
    }
  }

  clearDestination() {
    this._xDestination = undefined;
    this._yDestination = undefined;
    this._dDestination = undefined;
    this._destinationCharacter = undefined;
    this._followCharacter = false;
  }
});