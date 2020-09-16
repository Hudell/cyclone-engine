import { TilePassageType } from './constants';

CycloneMapEditor.patchClass(Game_Map, $super => class {
  screenTileX() {
    if (!CycloneMapEditor.active) {
      return $super.screenTileX.call(this);
    }

    return (Graphics.width - CycloneMapEditor.windowWidth) / this.tileWidth();
  }

  screenTileY() {
    if (!CycloneMapEditor.active) {
      return $super.screenTileY.call(this);
    }

    return (Graphics.height - 40) / this.tileHeight();
  }

  regionId(x, y) {
    if (CycloneMapEditor.active) {
      return CycloneMapEditor.getCurrentTileAtPosition(x, y, 5, false);
    }

    return $super.regionId.call(this, x, y);
  }

  isLoopHorizontal() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isLoopHorizontal.call(this);
  }

  isLoopVertical() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isLoopVertical.call(this);
  }

  canvasToMapX(x) {
    if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
      return $super.canvasToMapX.call(this, x);
    }

    const tileWidth = this.tileWidth() * CycloneMapEditor.currentZoom;
    const originX = this._displayX * tileWidth;
    const mapX = Math.floor((originX + x) / tileWidth);
    return this.roundX(mapX);
  }

  canvasToMapY(y) {
    if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
      return $super.canvasToMapY.call(this, y);
    }

    const tileHeight = this.tileHeight() * CycloneMapEditor.currentZoom;
    const originY = this._displayY * tileHeight;
    const mapY = Math.floor((originY + y) / tileHeight);
    return this.roundY(mapY);
  }

  scrollDown(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollDown.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
    const lastY = this._displayY;
    this._displayY = Math.min(this._displayY + distance, this.height() - this.screenTileY() + extraTiles);
    this._parallaxY += this._displayY - lastY;
  }

  scrollLeft(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollLeft.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 3;
    const lastX = this._displayX;
    this._displayX = Math.max(this._displayX - distance, -extraTiles);
    this._parallaxX += this._displayX - lastX;
  }

  scrollRight(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollRight.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 5;
    const lastX = this._displayX;
    this._displayX = Math.min(this._displayX + distance, this.width() - this.screenTileX() + extraTiles);
    this._parallaxX += this._displayX - lastX;
  }

  scrollUp(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollUp.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
    const lastY = this._displayY;
    this._displayY = Math.max(this._displayY - distance, -extraTiles);
    this._parallaxY += this._displayY - lastY;
  }

  checkTileIdPassage(tileId, d) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return this.getPassageBitType(flag, d);
  }

  getPassageBitType(flag, d) {
    const bit = (1 << (d / 2 - 1)) & 0x0f;
    if ((flag & bit) === 0) {
      // [o] Passable
      return true;
    }
    if ((flag & bit) === bit) {
      // [x] Impassable
      return false;
    }
  }

  getTileFlag(tileId) {
    const flags = this.tilesetFlags();
    return flags[tileId];
  }

  checkTileIdPassageType(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    if ((flag & 0x10) !== 0) {
      if (tileId < Tilemap.TILE_ID_A1) {
        return TilePassageType.star;
      }
      return TilePassageType.free;
    }

    const top = this.getPassageBitType(flag, 8);
    const bottom = this.getPassageBitType(flag, 2);
    const left = this.getPassageBitType(flag, 4);
    const right = this.getPassageBitType(flag, 6);

    if (top === false && bottom === false && left === false && right === false) {
      return TilePassageType.blocked;
    }

    return TilePassageType.free;
  }

  tileIdIsBush(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x40) !== 0;
  }

  tileIdIsLadder(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x20) !== 0;
  }

  tileIdIsCounter(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x80) !== 0;
  }

  tileIdIsDamage(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x100) !== 0;
  }

  tileIdTerrainTag(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    const tag = flag >> 12;
    if (tag > 0) {
      return tag;
    }

    return 0;
  }
});
