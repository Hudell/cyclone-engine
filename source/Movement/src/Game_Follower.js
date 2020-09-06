import './CharacterOverride';

CycloneMovement.patchClass(Game_Follower, $super => class {
  // eslint-disable-next-line complexity
  chaseCharacter(character) {
    if (this.isMoving()) {
      return;
    }

    const { stepSize } = CycloneMovement;
    const position = character.getPositionToFollow();
    if (!position) {
      return;
    }

    const { x, y} = position;

    const sx = this.deltaXFrom(x);
    const sy = this.deltaYFrom(y);

    const sxAbs = Math.abs(sx);
    const syAbs = Math.abs(sy);

    if (sxAbs >= stepSize && syAbs >= stepSize) {
      this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
    } else if (sxAbs >= stepSize) {
      this.moveStraight(sx > 0 ? 4 : 6);
    } else if (syAbs >= stepSize) {
      this.moveStraight(sy > 0 ? 8 : 2);
    }

    this.setMoveSpeed($gamePlayer.realMoveSpeed());
  }
});
