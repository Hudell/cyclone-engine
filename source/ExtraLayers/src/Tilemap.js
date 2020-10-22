CycloneExtraLayers.patchClass(Tilemap, $super => class {
  _readMapData(x, y, z) {
    if (z > 10) {
      return this._readExtraMapData(x, y, z - 11);
    }

    return $super._readMapData.call(this, x, y, z);
  }

  _readExtraMapData(x, y, z) {
    if (!$gameMap.extraLayers) {
      return 0;
    }

    if (!$gameMap.isValid(x, y)) {
      return 0;
    }

    if (!CycloneMapEditor.layerVisibility[z + 11]) {
      return 0;
    }

    const width = this._mapWidth;
    const height = this._mapHeight;
    if (this.horizontalWrap) {
      x = x.mod(width);
    }
    if (this.verticalWrap) {
      y = y.mod(height);
    }

    if (x >= 0 && x < width && y >= 0 && y < height) {
      return $gameMap.extraLayers[(z * height + y) * width + x] || 0;
    } else {
      return 0;
    }
  }

  _addSpot(startX, startY, x, y) {
    $super._addSpot.call(this, startX, startY, x, y);

    const mx = startX + x;
    const my = startY + y;
    const dx = x * this._tileWidth;
    const dy = y * this._tileHeight;

    const tileId0 = this._readExtraMapData(mx, my, 0);
    const tileId1 = this._readExtraMapData(mx, my, 1);
    const tileId2 = this._readExtraMapData(mx, my, 2);
    const tileId3 = this._readExtraMapData(mx, my, 3);
    const tileId4 = this._readExtraMapData(mx, my, 4);
    const tileId5 = this._readExtraMapData(mx, my, 5);

    this._addSpotTile(tileId0, dx, dy);
    this._addSpotTile(tileId1, dx, dy);
    this._addSpotTile(tileId2, dx, dy);
    this._addSpotTile(tileId3, dx, dy);
    this._addSpotTile(tileId4, dx, dy);
    this._addSpotTile(tileId5, dx, dy);
  }
});
