import './CharacterOverride';

CycloneMovement.patchClass(Game_Follower, $super => class {
  // eslint-disable-next-line complexity
  chaseCharacter(character) {
    if (this.isMoving()) {
      return;
    }

    const position = character.getPositionToFollow();
    if (!position) {
      return;
    }

    const { x, y } = position;

    this.chasePosition(x, y);
  }
});
