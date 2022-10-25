CycloneNewFolder7.patchClass(Sprite_Character, $super => class {
  setCharacterBitmap() {
    $super.setCharacterBitmap.call(this);

    this._numSpriteColumns = this._character._numSpriteColumns;
    this._numSpriteRows = this._character._numSpriteRows;
  }

  setTileBitmap() {
    $super.setTileBitmap.call(this);
    this._numSpriteColumns = undefined;
    this._numSpriteRows = undefined;
  }

  patternWidth() {
    if (!this._numSpriteColumns || !this._numSpriteRows) {
      return $super.patternWidth.call(this);
    }

    return this.bitmap.width / this._numSpriteColumns;
  }

  patternHeight() {
    if (!this._numSpriteColumns || !this._numSpriteRows) {
      return $super.patternHeight.call(this);
    }

    return this.bitmap.height / this._numSpriteRows;
  }

  characterBlockX() {
    if (!this._numSpriteColumns || !this._numSpriteRows) {
      return $super.characterBlockX.call(this);
    }

    if (this._isBigCharacter) {
      return 0;
    }

    const index = this._character.characterIndex();
    return index % this._numSpriteColumns * 3;
  }

  characterBlockY() {
    if (!this._numSpriteColumns || !this._numSpriteRows) {
      return $super.characterBlockY.call(this);
    }

    const index = this._character.characterIndex();
    return index * 4;
  }

  updateOther() {
    $super.updateOther.call(this);

    if (this._mirror !== this._character._mirror) {
      this._mirror = this._character._mirror;
      this.scale.x = this._mirror ? -1 : 1;
    }
  }
});
