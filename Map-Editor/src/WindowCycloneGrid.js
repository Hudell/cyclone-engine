import { Layers } from './constants';

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

    const drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom);
    const drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom);

    const padding = this.padding;
    const context = this.contents.context;
    context.save();
    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(x - padding, y - padding);
    context.lineTo(x - padding + drawWidth, y - padding);
    context.stroke();
    context.beginPath();
    context.moveTo(x - padding, y - padding);
    context.lineTo(x - padding, y - padding + drawHeight);
    context.stroke();
  }

  maybeDrawRegions(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.regions)) {
      return;
    }

    if (CycloneMapEditor.isLayerVisible(Layers.tags)) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    const regionId = $gameMap.regionId(mapX, mapY);
    if (regionId > 0) {
      this.contents.drawRegion(regionId, x, y);
    }
  }

  maybeDrawCollisions(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.collisions)) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);
    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    const downBlocked = !$gameMap.isPassable(mapX, mapY, 2);
    const upBlocked = !$gameMap.isPassable(mapX, mapY, 8);
    const leftBlocked = !$gameMap.isPassable(mapX, mapY, 4);
    const rightBlocked = !$gameMap.isPassable(mapX, mapY, 6);

    if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
      this.contents.fillRect(x, y, drawWidth, drawHeight, '#FF000066');
      return;
    }

    const pieceHeight = Math.floor(drawHeight / 4);
    const pieceWidth = Math.floor(drawWidth / 4);

    if (downBlocked) {
      this.contents.fillRect(x, y + drawHeight - pieceHeight, drawWidth, pieceHeight, '#FF0000AA');
    }
    if (upBlocked) {
      this.contents.fillRect(x, y, drawWidth, pieceHeight, '#FF0000AA');
    }
    if (leftBlocked) {
      this.contents.fillRect(x, y, pieceWidth, drawHeight, '#FF0000AA');
    }
    if (rightBlocked) {
      this.contents.fillRect(x + drawWidth - pieceWidth, y, pieceWidth, drawHeight, '#FF0000AA');
    }
  }

  maybeDrawTags(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.tags)) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    const terrainTag = $gameMap.terrainTag(mapX, mapY);
    if (terrainTag === 0) {
      return;
    }

    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    this.contents.drawText(terrainTag, x, y, drawWidth, drawHeight, 'center');
  }

  drawCell(x, y) {
    this.drawCellGrid(x, y);

    this.maybeDrawRegions(x, y);
    this.maybeDrawCollisions(x, y);
    this.maybeDrawTags(x, y);
  }

  refresh() {
    this.contents.clear();

    this._lastDisplayX = $gameMap._displayX;
    this._lastDisplayY = $gameMap._displayY;

    const drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom);
    const drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom);

    let paddingX;
    let paddingY;

    if ($gameMap._displayX < 0) {
      paddingX = Math.floor($gameMap._displayX * CycloneMapEditor.tileWidth);
    } else {
      paddingX = Math.floor(($gameMap._displayX - Math.floor($gameMap._displayX)) * drawWidth);
    }

    if ($gameMap._displayY < 0) {
      paddingY = Math.floor($gameMap._displayY * CycloneMapEditor.tileHeight);
    } else {
      paddingY = Math.floor(($gameMap._displayY - Math.floor($gameMap._displayY)) * drawHeight);
    }

    const mapStartX = 0 - paddingX;
    const mapStartY = 0 - paddingY;
    const mapEndX = mapStartX + ($gameMap.width() * drawWidth);
    const mapEndY = mapStartY + ($gameMap.height() * drawHeight);

    const rightPos = Math.min(Graphics.width, mapEndX);
    let bottomPos = Math.min(Graphics.height, mapEndY);

    for (let x = mapStartX; x < rightPos; x += drawWidth) {
      if (x + drawWidth < 0) {
        continue;
      }

      for (let y = mapStartY; y < bottomPos; y += drawHeight) {
        if (y + drawHeight < 0) {
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