class WindowCycloneGrid extends Window_Base {
  initialize() {
    const width = Graphics.width;
    const height = Graphics.height;
    const rect = new Rectangle(0, 0, width, height);

    super.initialize(rect);

    this.padding = 0;
    this.refresh();
    this.opacity = 0;

    this.backOpacity = 0;
    this.hide();
    this.deactivate();
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  drawCellGrid(x, y) {
    if (!CycloneMapEditor.showGrid) {
      return;
    }

    const padding = this.padding;
    const context = this.contents.context;
    context.save();
    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(x - padding, y - padding);
    context.lineTo(x - padding + CycloneMapEditor.tileWidth, y - padding);
    context.stroke();
    context.beginPath();
    context.moveTo(x - padding, y - padding);
    context.lineTo(x - padding, y - padding + CycloneMapEditor.tileHeight);
    context.stroke();
  }

  drawCell(x, y) {
    this.drawCellGrid(x, y);

    if (!CycloneMapEditor.areRegionsVisible()) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    const regionId = $gameMap.regionId(mapX, mapY);
    if (regionId > 0) {
      this.contents.drawRegion(regionId, x, y);
    }
  }

  refresh() {
    this.contents.clear();

    this._lastDisplayX = $gameMap._displayX;
    this._lastDisplayY = $gameMap._displayY;

    let paddingX;
    let paddingY;

    if ($gameMap._displayX < 0) {
      paddingX = $gameMap._displayX * CycloneMapEditor.tileWidth;
    } else {
      paddingX = ($gameMap._displayX - Math.floor($gameMap._displayX)) * CycloneMapEditor.tileWidth;
    }

    if ($gameMap._displayY < 0) {
      paddingY = $gameMap._displayY * CycloneMapEditor.tileHeight;
    } else {
      paddingY = ($gameMap._displayY - Math.floor($gameMap._displayY)) * CycloneMapEditor.tileHeight;
    }

    const mapStartX = 0 - paddingX;
    const mapStartY = 0 - paddingY;
    const mapEndX = mapStartX + ($gameMap.width() * CycloneMapEditor.tileWidth);
    const mapEndY = mapStartY + ($gameMap.height() * CycloneMapEditor.tileHeight);

    const rightPos = Math.min(Graphics.width, mapEndX);
    let bottomPos = Math.min(Graphics.height, mapEndY);

    for (let x = mapStartX; x < rightPos; x += CycloneMapEditor.tileWidth) {
      if (x + CycloneMapEditor.tileWidth < 0) {
        continue;
      }

      for (let y = mapStartY; y < bottomPos; y += CycloneMapEditor.tileHeight) {
        if (y + CycloneMapEditor.tileHeight < 0) {
          continue;
        }

        this.drawCell(x, y);
      }
    }
  }

  update() {
    if (!CycloneMapEditor.active) {
      return;
    }

    if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
      this.refresh();
    }
  }
}

export {
  WindowCycloneGrid,
};