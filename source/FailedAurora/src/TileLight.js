export class TileLight {
  get lightId() {
    return this._lightId;
  }

  get originX() {
    return this._originX;
  }

  get originY() {
    return this._originY;
  }

  get size() {
    return this._size;
  }

  get transition() {
    return this._transition;
  }

  initialize(x, y, lightId) {
    this._x = x;
    this._y = y;
    this._lightId = lightId;

    this._realX = x + 0.5;
    this._realY = y + 0.5;
    this._direction = 2;
    this._originX = null;
    this._originY = null;
    this._size = null;
    this._transition = null;
  }

  lightScreenX() {
    return Math.round($gameMap.adjustX(this._realX) * $gameMap.tileWidth() + $gameScreen.shake());
  }

  lightScreenY() {
    return Math.round($gameMap.adjustY(this._realY) * $gameMap.tileHeight());
  }

  height() {
    return $gameMap.getHeightLevel(this._x, this._y);
  }
}