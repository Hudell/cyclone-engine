GGJ.patchClass(Game_CharacterBase, $super => class {
  // Set the first frame as the "stopped" one
  straigthen() {
    if (this.hasWalkAnime() || this.hasStepAnime()) {
      this._pattern = 0;
    }

    this._animationCount = 0;
  }

  isOriginalPattern() {
    return this.pattern() === 0;
  }

  resetPattern() {
    this.setPattern(0);
  }

  maxPattern() {
    return 8;
  }

  // This changes the movement animation to sequential
  pattern() {
    return this._pattern;
  }

  // Speed up the movement animation a little bit.
  animationWait() {
    return (9 - this.realMoveSpeed()) * 2.5;
  }
});