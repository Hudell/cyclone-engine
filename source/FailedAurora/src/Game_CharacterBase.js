CycloneAurora.patchClass(Game_CharacterBase, $super => class {
  get ligthId() {
    return this._lightId;
  }

  get lightOriginX() {
    return this._lightOriginX;
  }

  get lightOriginY() {
    return this._lightOriginY;
  }

  get lightSize() {
    return this._lightSize;
  }

  get lightTransition() {
    return this._lightTransition;
  }

  initialize() {
    $super.initialize.call(this);
    this.clearLight();
  }

  setLight(lightId, transition = null) {
    this.clearLight();
    this._lightTransition = transition;
    this.registerLight(lightId);
  }

  registerLight(lightId) {
    this._lightId = lightId;
  }

  clearLight() {
    this._lightId = null;
    this._lightOriginX = null;
    this._lightOriginY = null;
    this._lightSize = null;
    this._lightTransition = null;
  }

  hasLight() {
    return Boolean(this._lightId);
  }

  lightScreenX() {
    return Math.round(($gameMap.adjustX(this._realX) + 0.5) * $gameMap.tileWidth() + $gameScreen.shake());
  }

  lightScreenY() {
    return Math.round(($gameMap.adjustY(this._realY) + 0.5) * $gameMap.tileHeight());
  }

  lightHeight() {
    return $gameMap.getHeightLevel(this._x, this._y);
  }
});
