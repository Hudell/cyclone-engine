export class SpriteBlenderTile extends Sprite {
  initialize(tiles, x, y) {
    this._tiles = tiles;
    this._mapX = x;
    this._mapY = y;
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
      this.bitmap = CycloneTileBlender.getTileBitmap(this.spriteId, this._tiles);
    }
  }

  updatePosition() {
    const scrolledX = $gameMap.adjustX(this._mapX);
    this.x = Math.floor(scrolledX * $gameMap.tileWidth());

    const scrolledY = $gameMap.adjustY(this._mapY);
    this.y = Math.floor((scrolledY + 1) * $gameMap.tileHeight());

    this.z = 1;
  }
}
