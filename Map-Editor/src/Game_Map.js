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

  // canvasToMapX(x) {
  //   if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
  //     return $super.canvasToMapX.call(this, x);
  //   }

  //   const tileWidth = this.tileWidth() * CycloneMapEditor.currentZoom;
  //   const originX = this._displayX * tileWidth;
  //   const mapX = Math.floor((originX + x) / tileWidth);
  //   return this.roundX(mapX);
  // }

  // canvasToMapY(y) {
  //   if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
  //     return $super.canvasToMapY.call(this, y);
  //   }

  //   const tileHeight = this.tileHeight() * CycloneMapEditor.currentZoom;
  //   const originY = this._displayY * tileHeight;
  //   const mapY = Math.floor((originY + y) / tileHeight);
  //   return this.roundY(mapY);
  // }
});
