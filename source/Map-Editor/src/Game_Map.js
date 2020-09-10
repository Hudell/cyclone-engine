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
});
