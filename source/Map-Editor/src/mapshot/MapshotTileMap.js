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
}