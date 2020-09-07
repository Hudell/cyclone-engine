import './CharacterOverride';

CycloneMovement.patchClass(Game_Follower, $super => class {
  getWidth() {
    return 0.75;
  }
  getHeight() {
    return 0.375;
  }
  getHitboxX() {
    return 0.125;
  }
  getHibtoxY() {
    return 0.5;
  }

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
