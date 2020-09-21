export class SpriteBlenderTile extends Sprite {
  initialize(tiles, x, y, width, height) {
    this._tiles = tiles;
    this._mapX = x;
    this._mapY = y;
    this._mapWidth = width;
    this._mapHeight = height;
    super.initialize();
    this.anchor.x = 0;
    this.anchor.y = 0;
  }

  update() {
    super.update();
    this.updateBitmap();
    this.updatePosition();
  }

  updateBitmap() {
    if (!this.bitmap) {
      this.bitmap = CycloneMagic.getTileBitmap(this.spriteId, this._tiles, this._mapX, this._mapY, this._mapWidth, this._mapHeight);
    }
  }

  updatePosition() {
    const scrolledX = $gameMap.adjustX(this._mapX);
    this.x = Math.floor(scrolledX * $gameMap.tileWidth());

    const scrolledY = $gameMap.adjustY(this._mapY);
    this.y = Math.floor(scrolledY * $gameMap.tileHeight());

    this.z = 1;
  }
}
