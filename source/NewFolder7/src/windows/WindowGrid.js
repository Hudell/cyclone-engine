/* eslint-disable complexity */
export class WindowGrid extends Window_Base {
  initialize() {
    super.initialize(0, 0, Graphics.width, Graphics.height);

    this.padding = 0;
    this.refresh();
    this.opacity = 0;

    this.backOpacity = 0;
    this.deactivate();
  }

  get z() {
    return 0;
  }

  standardPadding() {
    return 0;
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  drawCellGrid(x, y, color, size = 1) {
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();

    const context = this.contents.context;

    if (size === 1) {
      context.strokeStyle = color;
      context.strokeRect(x, y, drawWidth, drawHeight);
      context.stroke();
      return;
    }

    // context.fillStyle = `${color}66`;
    // context.fillRect(x, y, drawWidth, drawHeight);

    context.fillStyle = `${color}AA`;
    const halfSize = Math.floor(size / 2);

    context.fillRect(x, y - halfSize, drawWidth, size);
    context.fillRect(x - halfSize, y, size, drawHeight);

    context.fillRect(x, y + drawHeight - halfSize, drawWidth, size);
    context.fillRect(x + drawWidth - halfSize, y, size, drawHeight);
  }

  getRealColor(color) {
    switch(color) {
      case 'blue':
        return '#0000CC';
      case 'red':
        return '#CC0000';
      case 'yellow':
        return '#CCCC00';
      case 'purple':
        return '#800080';
    }

    return '#33333300';
  }

  maybeDrawTerritoryLines(x, y, mapX, mapY, territory) {
    const { color } = territory;
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();

    const context = this.contents.context;
    const territoryColor = this.getRealColor(color);
    context.fillStyle = `${territoryColor}AA`;

    if (!$gameMap.findTerritory(mapX, mapY - 1, color)) {
      this.drawSingleTerritoryLine(x, y, drawWidth, 4, territoryColor);
    }

    if (!$gameMap.findTerritory(mapX, mapY + 1, color)) {
      this.drawSingleTerritoryLine(x, y + drawHeight - 4, drawWidth, 4, territoryColor);
    }

    if (!$gameMap.findTerritory(mapX - 1, mapY, color)) {
      this.drawSingleTerritoryLine(x, y, 4, drawHeight, territoryColor);
    }

    if (!$gameMap.findTerritory(mapX + 1, mapY, color)) {
      this.drawSingleTerritoryLine(x + drawWidth - 4, y, 4, drawHeight, territoryColor);
    }
  }

  drawSingleTerritoryLine(x, y, width, height, color) {
    const context = this.contents.context;
    context.fillStyle = `${color}AA`;

    for (let drawX = x; drawX < (x + width); drawX+= 8) {
      for (let drawY = y; drawY < (y + height); drawY+= 8) {
        context.fillRect(drawX, drawY, 4, 4);
      }
    }

  }

  checkTilePassability(x, y, d) {
    return $gameMap.isPassable(x, y, d);
  }

  drawCell(x, y) {
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    if (!$gameMap.isValid(mapX, mapY)) {
      return false;
    }

    const territory = $gameMap._territories.find((t) => t.x === mapX && t.y === mapY);
    const territoryColor = territory?.color;

    const troop = $gameMap.eventsXyNt(mapX, mapY).find((e) => e.isTroop());
    if (troop && troop._usedTurn && !troop.isMoving() && troop.color === 'blue') {
      const tileWidth = $gameMap.tileWidth() ;
      const tileHeight = $gameMap.tileHeight();

      const context = this.contents.context;
      context.fillStyle = '#999999EE';

      context.fillRect(x, y, tileWidth, tileHeight);
    }

    if (territoryColor) {
      this.maybeDrawTerritoryLines(x, y, mapX, mapY, territory);
    // } else {
    //   this.drawCellGrid(x, y, '#666666', 1);
    }

  }

  drawTargetTile(mapX, mapY, green = true) {
    if (!$gameMap.isValid(mapX, mapY)) {
      return;
    }

    // if ($gameMap.terrainTag(mapX, mapY) === 2) {
    //   return;
    // }

    const x = $gameMap.mapToCanvasX(mapX);
    const y = $gameMap.mapToCanvasY(mapY);

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const context = this.contents.context;
    context.fillStyle = green ? '#00999966' : '#99000066';

    context.fillRect(x, y, tileWidth, tileHeight);
  }

  drawAddingHighlights() {
    if (!$gameMap._addingTroop) {
      return;
    }

    const castle = $gameMap.armyCastle('blue');
    if (castle) {
      this.drawTargetTile(castle._x, castle._y + 1);
    }

    // for (let x = 0; x < $gameMap.width(); x++) {
    //   for (let y = 0; y < $gameMap.height(); y++) {
    //     if (!$gameMap.canAddTroopTo(x, y, 'blue')) {
    //       continue;
    //     }

    //     this.drawTargetTile(x, y);
    //   }
    // }
  }

  drawActionHighlights() {
    if ($gameMap._selectedX < 0 || $gameMap._selectedY < 0) {
      return;
    }

    const character = $gameMap.selectedTroop();
    if (!character) {
      return;
    }

    const mapX = $gameMap._selectedX;
    const mapY = $gameMap._selectedY;
    this.drawSelectedTile();

    const maxDistance = 6;

    for (let x = mapX - maxDistance; x <= mapX + maxDistance; x++) {
      for (let y = mapY - maxDistance; y <= mapY + maxDistance; y++) {
        if (character.canWalkTo(x, y)) {
          this.drawTargetTile(x, y, !!character._range.find((t) => t.x === x && t.y === y)?.free);
        }
      }
    }
  }

  drawSelectedTile() {
    const x = $gameMap.mapToCanvasX($gameMap._selectedX);
    const y = $gameMap.mapToCanvasY($gameMap._selectedY);

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const context = this.contents.context;
    context.fillStyle = '#DDDDDD';

    context.fillRect(x, y, tileWidth, 4);
    context.fillRect(x, y, 4, tileHeight);

    context.fillRect(x + tileWidth - 4, y, 4, tileHeight);
    context.fillRect(x + tileWidth - tileWidth, y, tileWidth, 4);

    context.fillRect(x, y + tileHeight - tileHeight, 4, tileHeight);
    context.fillRect(x, y + tileHeight - 4, tileWidth, 4);

    context.fillRect(x + tileWidth - 4, y + tileHeight - tileHeight, 4, tileHeight);
    context.fillRect(x + tileWidth - tileWidth, y + tileHeight - 4, tileWidth, 4);

    context.fillStyle = '#333333';

    context.fillRect(x, y - 4, tileWidth, 4);
    context.fillRect(x - 4, y, 4, tileHeight);

    context.fillRect(x + tileWidth, y, 4, tileHeight);
    context.fillRect(x + tileWidth - tileWidth, y - 4, tileWidth, 4);

    context.fillRect(x - 4, y + tileHeight - tileHeight, 4, tileHeight);
    context.fillRect(x, y + tileHeight, tileWidth, 4);

    context.fillRect(x + tileWidth, y + tileHeight - tileHeight, 4, tileHeight);
    context.fillRect(x + tileWidth - tileWidth, y + tileHeight, tileWidth, 4);
  }

  refresh() {
    this.contents.clear();

    this._lastDisplayX = $gameMap._displayX;
    this._lastDisplayY = $gameMap._displayY;
    this._lastSelectedX = $gameMap._selectedX;
    this._lastSelectedY = $gameMap._selectedY;
    this._lastAdding = $gameMap._addingTroop;
    $gameMap.markGridAsRefreshed();

    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();

    let paddingX;
    let paddingY;

    if ($gameMap._displayX < 0) {
      paddingX = Math.floor($gameMap._displayX * drawWidth);
    } else {
      paddingX = Math.floor(($gameMap._displayX - Math.floor($gameMap._displayX)) * drawWidth);
    }

    if ($gameMap._displayY < 0) {
      paddingY = Math.floor($gameMap._displayY * drawHeight);
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

    this.drawActionHighlights();
    this.drawAddingHighlights();
  }

  needsRefresh() {
    if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
      return true;
    }

    if (this._lastSelectedX !== $gameMap._selectedX || this._lastSelectedY !== $gameMap._selectedY) {
      return true;
    }

    if ($gameMap._refreshGrid) {
      return true;
    }

    if (this._lastAdding !== $gameMap._addingTroop) {
      return true;
    }

    return false;
  }

  update() {
    if (this._refreshDelay > 0) {
      this._refreshDelay--;
      return;
    }

    if ($gameMap.isScrolling()) {
      this._refreshDelay = 2;
    } else {
      this._refreshDelay = 0;
    }

    if (this.needsRefresh()) {
      this.refresh();
    }
  }

  requestRefresh() {
    this._lastDisplayX = -999;
  }
}
