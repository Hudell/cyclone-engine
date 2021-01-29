GGJ.patchClass(Sprite_Character, $super => class {

  setCharacterBitmap() {
    $super.setCharacterBitmap.call(this);

    this.setPatternCount();
  }

  setPatternCount() {
    const match = this._characterName.match(/.+\[(\d+)\]/i);
    if (!match?.length) {
      this._patternCount = 3;
      return;
    }

    this._patternCount = Number(match[1]) || 3;
  }

  patternWidth() {
    if (this._tileId > 0) {
      return $gameMap.tileWidth();
    }

    if (this._isBigCharacter) {
      return this.bitmap.width / this._patternCount;
    }

    return this.bitmap.width / (this._patternCount * 4);
  }

  characterBlockX() {
    if (this._isBigCharacter) {
      return 0;
    }

    const index = this._character.characterIndex();
    return (index % 4) * this._patternCount;
  }

  // characterPatternY() {
  //   return (this._character.displayDirection() - 2) / 2;
  // }

});