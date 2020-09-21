CycloneMagic.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    this._loadedMagic = true;
    CycloneMagic.loadMagic();
  }

  getMagicTilesLongList() {
    const list = [];
    const fullTable = CycloneMagic.tileBlendingTable;
    if (!fullTable) {
      return list;
    }

    const width = $gameMap.width();

    for (const tileIndex in fullTable) {
      if (!fullTable[tileIndex]) {
        continue;
      }

      const x = tileIndex % width;
      const y = Math.floor(tileIndex / width);

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

  magicTiles() {
    const list = this.getMagicTilesLongList();

    // When editing, keep each tile as a separate sprite
    if (window.CycloneMapEditor) {
      return list.map(item => ({
        x: item.x,
        y: item.y,
        width: 1,
        height: 1,
        tiles: [item.tiles],
      }));
    }

    const width = $gameMap.width();
    const height = $gameMap.height();

    const isPositionOnList = (x, y) => {
      return list.find(item => item.x === x && item.y === y);
    };

    const pluckItem = (x, y) => {
      const index = list.findIndex(item => item.x === x && item.y === y);
      if (index < 0) {
        return;
      }

      const item = list[index];
      list.splice(index, 1);

      return item;
    };

    const shortList = [];
    while (list.length > 0) {
      const firstItem = list[0];
      let minX = firstItem.x;
      let maxX = firstItem.x;
      let minY = firstItem.y;
      let maxY = firstItem.y;

      for (let newX = minX + 1; newX < width; newX++) {
        if (!isPositionOnList(newX, minY)) {
          break;
        }
        maxX = newX;
      }

      for (let newX = minX; newX <= maxX; newX++) {
        for (let newY = minY + 1; newY < height; newY++) {
          if (!isPositionOnList(newX, newY)) {
            break;
          }
          maxY = newY;
        }
      }

      const itemWidth = maxX - minX + 1;
      const itemHeight = maxY - minY + 1;
      const tiles = new Array(itemWidth * itemHeight);
      let index = 0;

      for (let blockY = minY; blockY <= maxY; blockY++) {
        for (let blockX = minX; blockX <= maxX; blockX++) {
          const oldItem = pluckItem(blockX, blockY);
          tiles[index] = oldItem?.tiles || [];
          index++;
        }
      }

      shortList.push({
        x: minX,
        y: minY,
        width: itemWidth,
        height: itemHeight,
        tiles,
      });
    }

    return shortList;
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
    if (!(tileIndex in CycloneMagic.tileBlendingTable)) {
      return false;
    }

    if (tileId === undefined) {
      return true;
    }

    const tileId0 = this._readMapDataIfLowerTile(x, y, 0);
    return tileId !== tileId0;
  }
});