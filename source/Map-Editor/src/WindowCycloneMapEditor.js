import { Layers } from './constants';

class WindowCycloneMapEditor extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
    const w = CycloneMapEditor.windowWidth;
    const h = Graphics.height - y - SceneManager._scene._mapEditorStatus.height;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
  }

  onMapTouch(x, y) {

  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  addTile(tileId) {
    if (!CycloneMapEditor.getTilesetName(tileId)) {
      return;
    }

    if (Tilemap.isAutotile(tileId)) {
      if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
        this.addCommand(tileId, 'tile', true, tileId);
      } else if (Tilemap.isWaterfallTile(tileId)) {
        this.addCommand(tileId, 'tile', true, tileId);
      } else {
        this.addCommand(tileId, 'tile', true, tileId + 46);
      }
      return;
    }

    this.addCommand(tileId, 'tile', true, tileId);
  }

  makeManualTilesList() {
    const tileId = this._manualTileSelected;
    let maxShape = 46;

    if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
      maxShape = 15;
    } else if (Tilemap.isWaterfallTile(tileId)) {
      maxShape = 3;
    }

    for (let i = 0; i <= maxShape; i++) {
      this.addCommand(tileId + i, 'tile', true, tileId + i);
    }
  }

  makeShadowList() {
    for (let i = 0; i <= 15; i++) {
      this.addCommand(i, 'shadow', true, i);
    }
  }

  makeRegionList() {
    for (let i = 0; i <= 255; i++) {
      this.addCommand(i, 'region', true, i);
    }
  }

  isTileLayer() {
    return CycloneMapEditor.currentLayer === 7 || CycloneMapEditor.currentLayer < 4;
  }

  makeTileList() {
    for (let tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_A5; tileId++) {
      this.addTile(tileId);
    }
  }

  makeCommandList() {
    if (this._manualTileSelected) {
      this.makeManualTilesList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 4) {
      this.makeShadowList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 5) {
      this.makeRegionList();
      return;
    }

    if (this.isTileLayer()) {
      this.makeTileList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 8) {
      this.makeCollisionList();
      return;
    }
  }

  makeCollisionList() {
    this.addCommand(0, 'collision', true, 0);
    this.addCommand(1, 'collision', true, 1);
    this.addCommand(2, 'collision', true, 2);

    this.addCommand(17, 'collision', true, 17);
    this.addCommand(18, 'collision', true, 18);
    this.addCommand(19, 'collision', true, 19);

    this.addCommand(14, 'collision', true, 14);
    this.addCommand(1, 'collision', true, 1);
    this.addCommand(16, 'collision', true, 16);

    this.addCommand(11, 'collision', true, 11);
    this.addCommand(12, 'collision', true, 12);
    this.addCommand(13, 'collision', true, 13);

  }

  ensureSelectionVisible() {
    if (this._selectionIndex < 0 || CycloneMapEditor.currentTileId === undefined) {
      return;
    }

    const row = Math.floor(this._selectionIndex / this.maxCols());
    if (row < this.topRow()) {
      this.setTopRow(Math.min(row, this.maxTopRow()));
    } else if (row > this.topRow() + this.maxPageRows()) {
      this.setTopRow(Math.min(row, this.maxTopRow()));
    }
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);

    // Force the tilemap cursor to redraw too
    SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
  }

  colSpacing() {
    if (CycloneMapEditor.currentLayer === Layers.collisions) {
      return 0;
    }

    return Math.floor((this.width - (this.maxCols() * this.itemWidth())) / this.maxCols());
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    if (CycloneMapEditor.currentLayer === Layers.collisions) {
      return 3;
    }

    return 8;
  }

  itemWidth() {
    return CycloneMapEditor.tileDrawWidth;
  }

  itemHeight() {
    return CycloneMapEditor.tileDrawHeight;
  }

  drawRegion(index) {
    const rect = this.itemRect(index);
    this.contents.fontSize = Graphics.width < 1280 ? 14 : 18;
    this.contents.drawRegion(index, rect.x, rect.y, rect.width, rect.height, true);
  }

  drawCollision(index) {
    if (index === 0) {
      return;
    }
    const collision = this._list[index].ext ?? index;
    if (collision === 0) {
      return;
    }

    const rect = this.itemRect(index);
    this.contents.drawCollisionType(collision, rect.x, rect.y, rect.width, rect.height);
  }

  drawShadow(index) {
    const rect = this.itemRect(index);
    const shadowId = index;
    const x = rect.x;
    const y = rect.y;
    const drawWidth = rect.width;
    const drawHeight = rect.height;

    const halfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const halfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    if (shadowId < 0 || shadowId > 15) {
      return;
    }

    const table = shadowId.toString(2).padZero(4);
    for (let i = 0; i < 4; i++) {
      let color = '#000000';
      if (table[3 - i] !== '1') {
        color = '#FFFFFF99';
      }

      const drawX = x + (i % 2) * halfWidth;
      const drawY = y + Math.floor(i / 2) * halfHeight;

      this.contents.fillRect(drawX, drawY, halfWidth, halfHeight, color);
    }

    const context = this.contents.context;
    context.save();
    context.strokeStyle = '#FF0000';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + drawWidth, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + drawHeight);
    context.stroke();
  }


  drawItem(index) {
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    const symbol = this.commandSymbol(index);

    if (symbol === 'region') {
      this.drawRegion(index);
      return;
    }

    if (symbol === 'shadow') {
      this.drawShadow(index);
      return;
    }

    if (symbol === 'collision') {
      this.drawCollision(index);
      return;
    }

    const rect = this.itemRect(index);
    const bitmap = this.contents.drawTile(this._list[index].ext, rect.x, rect.y, this.itemWidth(), this.itemHeight());
    if (!bitmap) {
      return;
    }

    if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
      bitmap.addLoadListener(() => {
        this._needsRefresh = true;
      });
    }
  }

  drawAllItems() {
    super.drawAllItems();
    this.drawSelection();
  }

  drawMessySelection() {
    this._selectionIndex = -1;

    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      let isSelected = Tilemap.isSameKindTile(item.name, CycloneMapEditor.currentTileId);
      if (isSelected) {
        this._selectionIndex = index;
      } else {
        for (const tileId of CycloneMapEditor.selectedTileList) {
          if (Tilemap.isSameKindTile(tileId, item.name)) {
            isSelected = true;
          }
        }
      }

      if (!isSelected) {
        continue;
      }

      this._drawSelection(index, 1, 1);
    }
  }

  _drawSelection(topIndex, rowDrawCount, colDrawCount) {
    const rect = this.itemRect(topIndex);
    const { x, y } = rect;

    if (!this._manualTileSelected && CycloneMapEditor.selectedTileList.length >= 2 && Tilemap.isSameKindTile(CycloneMapEditor.selectedTileList[0], CycloneMapEditor.selectedTileList[1])) {
      rowDrawCount = 1;
      colDrawCount = 1;
    }

    const selectionWidth = CycloneMapEditor.tileDrawWidth * colDrawCount;
    const selectionHeight = CycloneMapEditor.tileDrawHeight * rowDrawCount;

    this.contents.fillRect(x, y, selectionWidth, 4, '#000000');
    this.contents.fillRect(x, y + selectionHeight - 4, selectionWidth, 4, '#000000');
    this.contents.fillRect(x, y, 4, selectionHeight, '#000000');
    this.contents.fillRect(x + selectionWidth - 4, y, 4, selectionHeight, '#000000');

    this.contents.fillRect(x + 2, y + 2, selectionWidth - 4, 2, '#FFFFFF');
    this.contents.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 4, 2, '#FFFFFF');
    this.contents.fillRect(x + 2, y + 2, 2, selectionHeight - 4, '#FFFFFF');
    this.contents.fillRect(x + selectionWidth - 4, y + 2, 2, selectionHeight - 4, '#FFFFFF');
  }

  isSelectedTile(tileId) {
    if (!Tilemap.isSameKindTile(tileId, CycloneMapEditor.currentTileId)) {
      return false;
    }

    if (this._manualTileSelected !== undefined) {
      if (tileId !== CycloneMapEditor.currentTileId) {
        return false;
      }
    }

    return true;
  }

  drawSelection() {
    if (CycloneMapEditor.messySelection) {
      this.drawMessySelection();
      return;
    }

    const cols = this.maxCols();
    this._selectionIndex = -1;

    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      if (!this.isSelectedTile(item.name)) {
        continue;
      }

      this._selectionIndex = index;

      let col = index % cols;
      let row = Math.floor(index / cols);
      let rowCount = CycloneMapEditor.tileRows;
      let colCount = CycloneMapEditor.tileCols;
      let rowDrawCount = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
      let colDrawCount = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

      while (rowCount <= 0) {
        rowCount++;
        row--;
      }

      while (colCount <= 0) {
        colCount++;
        col--;
      }

      const topIndex = (row * cols) + col;
      this._drawSelection(topIndex, rowDrawCount, colDrawCount);
      break;
    }
  }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }

  selectTileId(tileId, cols = 1, rows = 1) {
    if (CycloneMapEditor.currentTool === 'eraser') {
      CycloneMapEditor.restoreLastDrawingTool();
    }

    CycloneMapEditor.currentTileId = tileId;
    CycloneMapEditor.tileCols = cols ?? 1;
    CycloneMapEditor.tileRows = rows ?? 1;
    CycloneMapEditor.messySelection = false;
    CycloneMapEditor.multiLayerSelection = [];

    const topIndex = this._list.findIndex((item) => item.name === tileId);
    if (topIndex < 0) {
      CycloneMapEditor.currentTileId = undefined;
      CycloneMapEditor.selectedTileList = [];
      this.redraw();
      return;
    }

    CycloneMapEditor.selectedTileList = Array(cols * rows);
    CycloneMapEditor.selectedTileList[0] = CycloneMapEditor.currentTileId;

    const maxCols = this.maxCols();
    const topRow = Math.floor(topIndex / maxCols);
    const leftCol = topIndex % maxCols;

    let selectionIndex = 0;
    for (let y = topRow; y < topRow + CycloneMapEditor.tileRows; y++) {
      for (let x = leftCol; x < leftCol + CycloneMapEditor.tileCols; x++) {
        const newIndex = y * maxCols + x;
        const newTileId = this.commandName(newIndex);
        CycloneMapEditor.selectedTileList[selectionIndex] = newTileId;

        selectionIndex++;
      }
    }

    this.redraw();
  }

  startSelectingTile() {
    if (!this._mouseDown) {
      const index = this.hitIndex();
      if (index < 0) {
        return;
      }
      const tileId = this.commandName(index);
      this.selectTileId(tileId);
      this._mouseDown = true;
    }
  }

  findName(name) {
    return this._list.findIndex(item => item.name === name);
  }

  continueSelectingTile() {
    const index = this.hitIndex();
    const prevCols = CycloneMapEditor.tileCols;
    const prevRows = CycloneMapEditor.tileRows;

    if (index >= 0) {
      let initialIndex = this.findName(CycloneMapEditor.currentTileId);
      if (initialIndex < 0) {
        initialIndex = this._index;
      }

      const initialCol = initialIndex % this.maxCols();
      const initialRow = Math.floor(initialIndex / this.maxCols());
      const newCol = index % this.maxCols();
      const newRow = Math.floor(index / this.maxCols());

      CycloneMapEditor.tileCols = (newCol - initialCol) + 1;
      CycloneMapEditor.tileRows = (newRow - initialRow) + 1;
    }

    if (this._mouseDown) {
      if (!TouchInput.isPressed()) {
        this.finalizeTileSelection();
      } else if (TouchInput.isMoved()) {
        if (prevCols !== CycloneMapEditor.tileCols || prevRows !== CycloneMapEditor.tileRows) {
          this.redraw();
        }
      }
    }
  }

  finalizeTileSelection() {
    this._mouseDown = false;

    const cols = this.maxCols();
    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      if (item.name !== CycloneMapEditor.currentTileId) {
        continue;
      }

      let col = index % cols;
      let row = Math.floor(index / cols);
      let rowCount = CycloneMapEditor.tileRows;
      let colCount = CycloneMapEditor.tileCols;
      const newTileRows = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
      const newTileCols = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

      while (rowCount <= 0) {
        rowCount++;
        row--;
      }

      while (colCount <= 0) {
        colCount++;
        col--;
      }

      const topIndex = (row * cols) + col;
      if (topIndex >= 0) {
        const newTileId = this.commandName(topIndex);
        if (newTileId || newTileId === 0) {
          this.selectTileId(newTileId, newTileCols, newTileRows);
        } else {
          this.selectTileId(CycloneMapEditor.currentTileId);
        }
      } else {
        this.selectTileId(0);
      }

      break;
    }

    this.redraw();
  }

  activateManualTile() {
    const index = this.hitIndex();
    if (index < 0) {
      return;
    }

    const tileId = this.commandName(index);
    if (Tilemap.isAutotile(tileId)) {
      this._manualTileSelected = tileId;
      this._selectionIndex = -1;
    }
  }

  toggleManualTiles() {
    if (this._manualTileSelected === undefined) {
      this.activateManualTile();
    } else {
      this._manualTileSelected = undefined;
    }

    this.refresh();
    this._mouseDown = false;
    CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
  }

  processTouchScroll() {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
      this.startSelectingTile();
    } else if (CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown && !this._mouseDown) {
      this.toggleManualTiles();
      return;
    }

    if (this._mouseDown) {
      this._mouseMoved = true;
      this.continueSelectingTile();
    }
  }

  update() {
    if (this._needsRefresh) {
      this.refresh();
    }

    super.update();
  }
}

export {
  WindowCycloneMapEditor,
};