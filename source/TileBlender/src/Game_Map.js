CycloneTileBlender.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    this._loadedMagic = true;
    CycloneTileBlender.loadMagic();
  }

  magicTiles() {
    const list = [];
    const fullTable = CycloneTileBlender.tileBlendingTable;
    if (!fullTable) {
      return list;
    }

    const width = $gameMap.width();
    const height = $gameMap.height();

    for (const tileIndex in fullTable) {
      if (!fullTable[tileIndex]) {
        continue;
      }

      const x = tileIndex % width;
      const y = Math.floor(tileIndex / width);

      // const tileId0 = this._readMapDataIfLowerTile(x, y, 0);
      const tileId1 = this._readMapDataIfLowerTile(x, y, 1);
      const tileId2 = this._readMapDataIfLowerTile(x, y, 2);
      const tileId3 = this._readMapDataIfLowerTile(x, y, 3);
      const tiles = [0, tileId1, tileId2, tileId3];

      list.push({
        tiles,
        x,
        y,
      });
    }

    return list;
  }

  _readMapData(x, y, z) {
    if (!$dataMap?.data) {
      return 0;
    }

    const width = this.width();
    const height = this.height();
    if (this.isLoopHorizontal()) {
      x = x.mod(width);
    }

    if (this.isLoopVertical()) {
      y = y.mod(height);
    }

    if (x >= 0 && x < width && y >= 0 && y < height) {
      return $dataMap.data[(z * height + y) * width + x] || 0;
    } else {
      return 0;
    }
  }

  _readMapDataIfLowerTile(x, y, z) {
    const tileId = this._readMapData(x, y, z);
    const flags = this.tilesetFlags();

    if (flags[tileId] & 0x10) {
      return 0;
    }

    return tileId;
  }

  isMagicTile(x, y, tileId) {
    const tileIndex = (y % $gameMap.height()) * $gameMap.width() + (x % $gameMap.width());
    if (!(tileIndex in CycloneTileBlender.tileBlendingTable)) {
      return false;
    }

    if (tileId === undefined) {
      return true;
    }

    const tileId0 = this._readMapDataIfLowerTile(x, y, 0);
    return tileId !== tileId0;
  }
});