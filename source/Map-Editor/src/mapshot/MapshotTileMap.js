export class MapshotTileMap extends Bitmap {
  constructor() {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const width = $gameMap.width() * tileWidth;
    const height = $gameMap.height() * tileHeight;

    super(width, height);
    this.flags = $gameMap.tileset().flags;
  }

  drawSingleLayer(layerIndex) {
    const width = $gameMap.width();
    const height = $gameMap.height();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawLayerSpot(x, y, layerIndex);
      }
    }
  }

  drawLayerSpot(x, y, z, filterFn = undefined) {
    const index = CycloneMapEditor.tileIndex(x, y, z);
    const tileId = $dataMap.data[index] ?? 0;

    if (filterFn && !filterFn(tileId)) {
      return;
    }

    const drawX = x * $gameMap.tileWidth();
    const drawY = y * $gameMap.tileHeight();

    this.drawTile(tileId, drawX, drawY);
  }

  isHigherTile(tileId) {
    return this.flags[tileId] & 0x10;
  }

  drawLowerTiles() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    const filterFn = (tileId) => !this.isHigherTile(tileId);

    for (let z = 0; z <= 3; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.drawLayerSpot(x, y, z, filterFn);
        }
      }
    }
  }

  drawUpperTiles() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    const filterFn = (tileId) => this.isHigherTile(tileId);

    for (let z = 0; z <= 3; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.drawLayerSpot(x, y, z, filterFn);
        }
      }
    }
  }

  drawEvents(priority = undefined) {
    const events = SceneManager._scene._spriteset._tilemap.children.filter(child => child instanceof Sprite_Character);
    for (const sprite of events) {
      if (sprite._character !== null) {
        if (sprite._character instanceof Game_Player || sprite._character instanceof Game_Follower || sprite._character instanceof Game_Vehicle) {
          continue;
        }
      }

      sprite.update();
      if (sprite._characterName === '' && sprite._tileId === 0) {
        continue;
      }

      if (priority !== undefined && sprite._character._priorityType !== priority) {
        continue;
      }

      const x = sprite.x - sprite._frame.width / 2 + $gameMap._displayX * $gameMap.tileWidth();
      const y = sprite.y - sprite._frame.height + $gameMap._displayY * $gameMap.tileHeight();

      this.blt(sprite.bitmap, sprite._frame.x, sprite._frame.y, sprite._frame.width, sprite._frame.height, x, y, sprite._frame.width, sprite._frame.height);
    }
  }

  drawDefaultCollision() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const drawWidth = CycloneMapEditor.tileWidth;
        const drawHeight = CycloneMapEditor.tileHeight;
        const drawX = x * drawWidth;
        const drawY = y * drawHeight;

        const downBlocked = !$gameMap.isPassable(x, y, 2);
        const upBlocked = !$gameMap.isPassable(x, y, 8);
        const leftBlocked = !$gameMap.isPassable(x, y, 4);
        const rightBlocked = !$gameMap.isPassable(x, y, 6);

        if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
          this.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF0000');
          continue;
        }

        const pieceHeight = Math.floor(drawHeight / 4);
        const pieceWidth = Math.floor(drawWidth / 4);

        if (downBlocked) {
          this.fillRect(drawX, drawY + drawHeight - pieceHeight, drawWidth, pieceHeight, '#FF00FF');
        }
        if (upBlocked) {
          this.fillRect(drawX, drawY, drawWidth, pieceHeight, '#FF00FF');
        }
        if (leftBlocked) {
          this.fillRect(drawX, drawY, pieceWidth, drawHeight, '#FF00FF');
        }
        if (rightBlocked) {
          this.fillRect(drawX + drawWidth - pieceWidth, drawY, pieceWidth, drawHeight, '#FF00FF');
        }
      }
    }
  }

  drawCustomCollision() {
    const customCollisionTable = CycloneMapEditor.customCollisionTable;
    const height = $gameMap.height();
    const width = $gameMap.width();
    const tileWidth = CycloneMapEditor.tileWidth;
    const tileHeight = CycloneMapEditor.tileHeight;
    const drawWidth = tileWidth / 4;
    const drawHeight = tileHeight / 4;
    const colors = ['#00FF00', '#FF0000'];
    const collisionHeight = height * 4;
    const collisionWidth = width * 4;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (let cellX = 0; cellX < 4; cellX++) {
          for (let cellY = 0; cellY < 4; cellY++) {

            const intX = Math.floor(x * 4) + cellX;
            const intY = Math.floor(y * 4) + cellY;
            const index = (intY % collisionHeight) * collisionWidth + (intX % collisionWidth);

            // eslint-disable-next-line max-depth
            if (customCollisionTable[index]) {
              const drawX = intX * drawWidth;
              const drawY = intY * drawHeight;

              this.clearRect(drawX, drawY, drawWidth, drawHeight);

              const colorIndex = customCollisionTable[index] - 1;
              const color = colors[colorIndex % colors.length];
              this.fillRect(drawX, drawY, drawWidth, drawHeight, color);
            }
          }
        }
      }
    }
  }
}