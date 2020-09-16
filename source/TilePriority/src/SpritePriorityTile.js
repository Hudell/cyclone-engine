export class SpritePriorityTile extends Sprite {
  initialize(tileId, x, y, tag) {
    this._tileId = tileId;
    this._mapX = x;
    this._mapY = y;
    this._tilePriority = tag ?? 1;
    super.initialize();
    this.anchor.x = 0;
    this.anchor.y = 1;
  }

  update() {
    super.update();
    this.updateBitmap();
    this.updatePosition();
  }

  updateBitmap() {
    if (!this.bitmap) {
      this.bitmap = CycloneTilePriority.getTileBitmap(this._tileId, this._tilePriority);
    }
  }

  updatePosition() {
    const scrolledX = $gameMap.adjustX(this._mapX);
    this.x = Math.floor(scrolledX * $gameMap.tileWidth());

    const scrolledY = $gameMap.adjustY(this._mapY + this._tilePriority);
    this.y = Math.floor(scrolledY * $gameMap.tileHeight());

    this.z = 3;
  }
}
