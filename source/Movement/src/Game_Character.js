CycloneMovement.patchClass(Game_Character, $super => class {
  moveTowardCharacter(character) {
    if (!CycloneMovement.params.enableMoveTowardCharacter) {
      return $super.moveTowardCharacter.call(this, character);
    }

    const sx = this.deltaXFrom(character.x);
    const sy = this.deltaYFrom(character.y);

    const horizontalDirection = sx > 0 ? 4 : 6;
    const verticalDirection = sy > 0 ? 8 : 2;

    const realHorizontalDistance = CycloneMovement.params.applyToEvents ? Math.abs(sx) : Math.floor(Math.abs(sx));
    const realVerticalDistance = CycloneMovement.params.applyToEvents ? Math.abs(sy) : Math.floor(Math.abs(sy));

    if (CycloneMovement.params.approachDiagonally && realVerticalDistance > 0 && realHorizontalDistance > 0) {
      this.moveDiagonally(horizontalDirection, verticalDirection);
      if (this.isMovementSucceeded()) {
        return;
      }
    }

    const minDistance = CycloneMovement.params.minDistanceToChangeDirection;
    const horizontalDistance = realHorizontalDistance + (this._direction === horizontalDirection ? Math.min(minDistance, realVerticalDistance) : 0);
    const verticalDistance = realVerticalDistance + (this._direction === verticalDirection ? Math.min(minDistance, realHorizontalDistance) : 0);

    if (horizontalDistance > verticalDistance) {
      this.moveStraight(horizontalDirection);
      if (!this.isMovementSucceeded() && realVerticalDistance !== 0) {
        this.moveStraight(verticalDirection);
      }
    } else if (realVerticalDistance !== 0) {
      this.moveStraight(verticalDirection);
      if (!this.isMovementSucceeded() && realHorizontalDistance !== 0) {
        this.moveStraight(horizontalDirection);
      }
    } else if (realHorizontalDistance !== 0) {
      this.moveStraight(horizontalDirection);
    }
  }
});
