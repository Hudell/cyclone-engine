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

    const gridRatio = CycloneMapEditor.getGridRatio();

    const drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom) / gridRatio;
    const drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom) / gridRatio;

    const context = this.contents.context;
    context.strokeStyle = '#000000';

    for (let cellX = 0; cellX < gridRatio; cellX++) {
      for (let cellY = 0; cellY < gridRatio; cellY++) {

        const drawX = x + cellX * drawWidth;
        const drawY = y + cellY * drawHeight;

        context.strokeRect(drawX, drawY, drawWidth, drawHeight);
      }
    }
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

  checkTilePassability(x, y, d) {
    return $gameMap.isPassable(x, y, d);
  }

  drawTilesetCollision(x, y) {
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);
    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    const downBlocked = !this.checkTilePassability(mapX, mapY, 2);
    const upBlocked = !this.checkTilePassability(mapX, mapY, 8);
    const leftBlocked = !this.checkTilePassability(mapX, mapY, 4);
    const rightBlocked = !this.checkTilePassability(mapX, mapY, 6);

    if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
      this.contents.fillRect(x, y, drawWidth, drawHeight, '#FF000066');
      return;
    }

    const pieceHeight = Math.floor(drawHeight / 4);
    const pieceWidth = Math.floor(drawWidth / 4);

    if (downBlocked) {
      this.contents.fillRect(x, y + drawHeight - pieceHeight, drawWidth, pieceHeight, '#FF00FFAA');
    }
    if (upBlocked) {
      this.contents.fillRect(x, y, drawWidth, pieceHeight, '#FF00FFAA');
    }
    if (leftBlocked) {
      this.contents.fillRect(x, y, pieceWidth, drawHeight, '#FF00FFAA');
    }
    if (rightBlocked) {
      this.contents.fillRect(x + drawWidth - pieceWidth, y, pieceWidth, drawHeight, '#FF00FFAA');
    }
  }

  drawCustomCollision(x, y) {
    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);
    const customCollisionTable = CycloneMapEditor.customCollisionTable;
    const height = $gameMap.height() * 4;
    const width = $gameMap.width() * 4;
    const tileWidth = CycloneMapEditor.tileWidth;
    const tileHeight = CycloneMapEditor.tileHeight;
    const drawWidth = tileWidth / 4;
    const drawHeight = tileHeight / 4;
    const colors = ['#00FF0066', '#FF0000AA', '#FF00FFFF'];

    for (let cellX = 0; cellX < 4; cellX++) {
      for (let cellY = 0; cellY < 4; cellY++) {

        const intX = Math.floor(mapX * 4) + cellX;
        const intY = Math.floor(mapY * 4) + cellY;
        const index = (intY % height) * width + (intX % width);

        if (customCollisionTable[index]) {
          const drawX = x + (cellX * drawWidth);
          const drawY = y + (cellY * drawHeight);

          this.contents.clearRect(drawX, drawY, drawWidth, drawHeight);

          const colorIndex = customCollisionTable[index] - 1;
          const color = colors[colorIndex % colors.length];
          this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, color);
        }
      }
    }
  }

  maybeDrawCollisions(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.collisions)) {
      return;
    }

    this.drawTilesetCollision(x, y);
    this.drawCustomCollision(x, y);
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
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    if (!$gameMap.isValid(mapX, mapY)) {
      return false;
    }
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

    if (CycloneMapEditor.isLayerVisible(Layers.collisions)) {
      this.drawEventsCollision();
      this.drawPlayerCollision();
    }
  }

  drawEventsCollision() {
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();

    for (const event of $gameMap._events) {
      if (!event) {
        continue;
      }
      if (event._priorityType !== 1 || event._through || event._erased) {
        continue;
      }

      const x = event.x * $gameMap.tileWidth();
      const y = event.y * $gameMap.tileHeight();
      const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
      const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

      if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
        continue;
      }

      this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF00FF66');
    }
  }

  drawPlayerCollision() {
    if (window.CycloneMovement) {
      return this.drawCycloneMovementPlayerCollision();
    }

    const x = $gamePlayer.x * $gameMap.tileWidth();
    const y = $gamePlayer.y * $gameMap.tileHeight();
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();
    const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
    const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

    if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
      return;
    }

    this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
  }

  drawCycloneMovementPlayerCollision() {
    const { top, left, width, height } = $gamePlayer;

    const x = left * $gameMap.tileWidth();
    const y = top * $gameMap.tileHeight();
    const drawWidth = width * $gameMap.tileWidth();
    const drawHeight = height * $gameMap.tileHeight();
    const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
    const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

    if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
      return;
    }

    this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
  }

  update() {
    if (!CycloneMapEditor.active) {
      return;
    }

    if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
      this.refresh();
    }
  }

  requestRefresh() {
    this._lastDisplayX = -999;
  }
}

export {
  WindowCycloneGrid,
};