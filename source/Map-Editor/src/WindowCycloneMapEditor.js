import { Layers, Tools, TilePassageType } from './constants';

class WindowCycloneMapEditor extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
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
    return CycloneMapEditor.currentLayer === 7 || CycloneMapEditor.currentLayer < 4 || CycloneMapEditor.currentLayer > 10;
  }

  makeTileList() {
    if (CycloneMapEditor.puzzleMode) {
      this.makePuzzleList();
      return;
    }

    for (let tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_A5; tileId < Tilemap.TILE_ID_A5 + 128; tileId++) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_A5; tileId++) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_A5 + 256; tileId < Tilemap.TILE_ID_A5 + 512; tileId++) {
      this.addTile(tileId);
    }
  }

  makePuzzleList() {
    const min = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A1) ? Tilemap.TILE_ID_A1 : Tilemap.TILE_ID_A2;
    const max = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A2) ? Tilemap.TILE_ID_A3 : Tilemap.TILE_ID_A2;

    const tileList = [];

    for (let tileId = min; tileId < max; tileId += 48) {
      if (Tilemap.isWaterfallTile(tileId)) {
        continue;
      }
      if (tileId === 2144 || tileId === 2192) {
        continue;
      }

      tileList.push(tileId);
    }

    for (let i = 0; i < tileList.length; i += 4) {
      for (let pieceY = 0; pieceY < 6; pieceY++) {
        for (let idx = 0; idx <= 3; idx++) {
          const tileId = tileList[i + idx];
          if (!tileId) {
            continue;
          }

          for (let pieceX = 0; pieceX < 4; pieceX++) {
            const pieceId = tileId + pieceX + pieceY * 4;
            this.addCommand(pieceId, 'puzzle', true, pieceId);
          }
        }
      }
    }
  }

  makeCommandList() {
    if (CycloneMapEditor.changingTileProps) {
      this.makeTileList();
      return;
    }

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
    this.addCommand(20, 'collision', true, 20);
    this.addCommand(16, 'collision', true, 16);

    this.addCommand(11, 'collision', true, 11);
    this.addCommand(12, 'collision', true, 12);
    this.addCommand(13, 'collision', true, 13);

    this.addCommand(22, 'collision', true, 22);
    this.addCommand(26, 'collision', true, 26);
    this.addCommand(24, 'collision', true, 24);
    this.addCommand(28, 'collision', true, 28);

    this.addCommand(4, 'collision', true, 4);
    this.addCommand(5, 'collision', true, 5);
  }

  getTileRow(tileId) {
    const index = this._list.findIndex(item => item?.name === tileId);
    if (index >= 0) {
      return Math.floor(index / this.maxCols());
    }

    return -1;
  }

  jumpToTile(tileId) {
    const row = this.getTileRow(tileId);
    if (row < 0) {
      return false;
    }

    this.setTopRow(row || 0);
    return true;
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

    if (!CycloneMapEditor.changingTileProps) {
      // Force the tilemap cursor to redraw too
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }
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

    if (CycloneMapEditor.puzzleMode) {
      return 16;
    }

    return 8;
  }

  itemWidth() {
    const w = CycloneMapEditor.tileDrawWidth;
    if (CycloneMapEditor.puzzleMode) {
      return w / 2;
    }

    return w;
  }

  itemHeight() {
    const h = CycloneMapEditor.tileDrawHeight;
    if (CycloneMapEditor.puzzleMode) {
      return h / 2;
    }

    return h;
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

  drawPuzzle(index) {
    const pieceId = this._list[index].ext;
    if (!pieceId) {
      return;
    }

    const rect = this.itemRect(index);
    this.contents.drawPuzzlePiece(pieceId, rect.x, rect.y, rect.width, rect.height);
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

  updateOpacityForTile(tileId) {
    if (!CycloneMapEditor.changingTileProps || Input.isPressed('shift')) {
      return this.changePaintOpacity(true);
    }

    return this.changePaintOpacity(false);
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

    if (symbol === 'puzzle') {
      this.drawPuzzle(index);
      return;
    }

    const rect = this.itemRect(index);
    const tileId = this._list[index].ext;

    this.updateOpacityForTile(tileId);

    const bitmap = this.contents.drawTile(tileId, rect.x, rect.y, this.itemWidth(), this.itemHeight());
    if (!bitmap) {
      return;
    }

    if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
      bitmap.addLoadListener(() => {
        this._needsRedraw = true;
      });
    }

    this.changePaintOpacity(true);
    if (!this._needsRedraw && CycloneMapEditor.changingTileProps) {
      this.drawTileProp(this.commandName(index), rect);
    }
  }

  translucentOpacity() {
    return 90;
  }

  drawTileProp(tileId, rect) {
    if (Input.isPressed('shift')) {
      return;
    }

    switch(CycloneMapEditor.currentTool) {
      case Tools.passage:
        return this.drawTilePassage(tileId, rect);
      case Tools.passage4:
        return this.drawTilePassage4(tileId, rect);
      case Tools.ladder:
        return this.drawTileLadder(tileId, rect);
      case Tools.bush:
        return this.drawTileBush(tileId, rect);
      case Tools.counter:
        return this.drawTileCounter(tileId, rect);
      case Tools.damage:
        return this.drawTileDamage(tileId, rect);
      case Tools.terrain:
        return this.drawTileTerrain(tileId, rect);
    }
  }

  drawTilePassage(tileId, rect) {
    const passageType = $gameMap.checkTileIdPassageType(tileId);
    const context = this.contents.context;

    if (passageType === TilePassageType.blocked) {
      context.strokeStyle = '#000000';
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(rect.x + 8, rect.y + 8);
      context.lineTo(rect.x + rect.width - 8, rect.y + rect.height - 8);
      context.stroke();

      context.beginPath();
      context.moveTo(rect.x + rect.width - 8, rect.y + 8);
      context.lineTo(rect.x + 8, rect.y + rect.height - 8);
      context.stroke();

      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(rect.x + 8, rect.y + 8);
      context.lineTo(rect.x + rect.width - 8, rect.y + rect.height - 8);
      context.stroke();

      context.beginPath();
      context.moveTo(rect.x + rect.width - 8, rect.y + 8);
      context.lineTo(rect.x + 8, rect.y + rect.height - 8);
      context.stroke();

      return;
    }

    if (passageType === TilePassageType.star) {
      let rot = Math.PI / 5;
      const step = Math.PI / 5;
      const outerRadius = Math.floor(Math.min(rect.width, rect.height) / 3);
      const innerRadius = Math.floor(Math.min(rect.width, rect.height) / 6);
      const baseX = Math.floor(rect.x + (rect.width / 2));
      const baseY = Math.floor(rect.y + (rect.height / 2));

      context.beginPath();
      context.moveTo(baseX, baseY - outerRadius);
      for (let i = 0; i < 5; i++) {
        const x = baseX + Math.cos(rot) * outerRadius;
        const y = baseY + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        const inX = baseX + Math.cos(rot) * innerRadius;
        const inY = baseY + Math.sin(rot) * innerRadius;
        context.lineTo(inX, inY);
        rot += step;
      }
      context.lineTo(baseX, baseY - outerRadius);
      context.closePath();
      context.lineWidth = 5;
      context.strokeStyle = '#000000';
      context.stroke();
      context.fillStyle = '#FFFFFF';
      context.fill();
      return;
    }

    context.strokeStyle = '#000000';
    context.lineWidth = 8;
    context.beginPath();
    context.arc(Math.floor(rect.x + rect.width / 2), Math.floor(rect.y + rect.height / 2), Math.floor(Math.min(rect.width - 10, rect.height - 10) / 2), 0, Math.PI * 2, false);
    context.stroke();

    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 4;
    context.beginPath();
    context.arc(Math.floor(rect.x + rect.width / 2), Math.floor(rect.y + rect.height / 2), Math.floor(Math.min(rect.width - 10, rect.height - 10) / 2), 0, Math.PI * 2, false);
    context.stroke();
  }

  drawTilePassage4(tileId, rect) {
    const flag = $gameMap.getTileFlag(tileId);
    const top = $gameMap.getPassageBitType(flag, 8);
    const bottom = $gameMap.getPassageBitType(flag, 2);
    const left = $gameMap.getPassageBitType(flag, 4);
    const right = $gameMap.getPassageBitType(flag, 6);
    const margin = 3;

    const middleX = rect.x + Math.floor(rect.width / 2);
    const middleY = rect.y + Math.floor(rect.height / 2);

    const context = this.contents.context;
    context.lineWidth = 6;
    context.strokeStyle = '#000000';

    const drawArrow = (x, y, x2, y2) => {
      const headLen = Math.floor(rect.width / 5);
      const angle1 = Math.PI / 13;
      const angle2 = Math.atan2(y2 - y, x2 - x);
      const diff1 = angle2 - angle1;
      const diff2 = angle2 + angle1;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x2, y2);
      context.moveTo(x2, y2);
      context.lineTo(x2 - headLen * Math.cos(diff1), y2 - headLen * Math.sin(diff1));

      context.moveTo(x2, y2);
      context.lineTo(x2 - headLen * Math.cos(diff2), y2 - headLen * Math.sin(diff2));
      context.closePath();
      context.stroke();
    };

    const drawArrows = () => {
      if (top) {
        drawArrow(middleX, middleY, middleX, rect.y + margin);
      }

      if (bottom) {
        drawArrow(middleX, middleY, middleX, rect.y + rect.height - margin);
      }

      if (left) {
        drawArrow(middleX, middleY, rect.x + margin, middleY);
      }

      if (right) {
        drawArrow(middleX, middleY, rect.x + rect.width - margin, middleY);
      }
    };

    drawArrows();
    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    drawArrows();
  }

  drawTileLadder(tileId, rect) {
    if (!$gameMap.tileIdIsLadder(tileId)) {
      return;
    }

    const context = this.contents.context;
    const w = Math.floor(rect.width / 4);
    const h = Math.floor(rect.height / 3);
    const x = Math.floor(rect.x + (rect.width / 2) - (w / 2));
    const y = Math.floor(rect.y + (rect.height / 2) - (w / 2));

    const drawLadder = () => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y + h);

      context.moveTo(x + w, y);
      context.lineTo(x + w, y + h);

      context.moveTo(x, y + Math.floor(h / 3));
      context.lineTo(x + w, y + Math.floor(h / 3));

      context.moveTo(x, y + Math.floor(h / 3) * 2);
      context.lineTo(x + w, y + Math.floor(h / 3) * 2);

      context.closePath();

      context.stroke();
    };

    context.strokeStyle = '#000000';
    context.lineWidth = 6;
    drawLadder();
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 2;
    drawLadder();
  }

  drawTileBush(tileId, rect) {
    if (!$gameMap.tileIdIsBush(tileId)) {
      return;
    }

    this.contents.drawText('~', rect.x, rect.y, rect.width, rect.height - 8, 'center');
    this.contents.drawText('~', rect.x, rect.y + 8, rect.width, rect.height - 8, 'center');
  }

  drawTileCounter(tileId, rect) {
    if (!$gameMap.tileIdIsCounter(tileId)) {
      return;
    }

    const context = this.contents.context;
    const w = Math.floor(rect.width / 2);
    const h = Math.floor(rect.height / 2);
    const x = rect.x + w;
    const y = rect.y + h / 2;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - w / 2, y + h / 2);
    context.lineTo(x, y + h);
    context.lineTo(x + w / 2, y + h / 2);

    context.closePath();

    context.strokeStyle = '#000000';
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = '#FFFFFF';
    context.fill();
  }

  drawTileDamage(tileId, rect) {
    if (!$gameMap.tileIdIsDamage(tileId)) {
      return;
    }

    this.contents.drawText('DMG', rect.x, rect.y, rect.width, rect.height, 'center');
  }

  drawTileTerrain(tileId, rect) {
    const tag = $gameMap.tileIdTerrainTag(tileId);
    if (!tag) {
      return;
    }

    this.contents.drawText(tag, rect.x, rect.y, rect.width, rect.height, 'center');
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

    if (CycloneMapEditor.puzzleMode) {
      rowDrawCount = 0.5;
      colDrawCount = 0.5;
    } else if (!this._manualTileSelected && CycloneMapEditor.selectedTileList.length >= 2 && Tilemap.isSameKindTile(CycloneMapEditor.selectedTileList[0], CycloneMapEditor.selectedTileList[1])) {
      rowDrawCount = 1;
      colDrawCount = 1;
    }

    const selectionWidth = CycloneMapEditor.tileDrawWidth * colDrawCount;
    const selectionHeight = CycloneMapEditor.tileDrawHeight * rowDrawCount;

    const context = this.contents.context;
    context.fillStyle = '#000000';

    context.fillRect(x - 1, y - 1, selectionWidth + 2, 4);
    context.fillRect(x - 1, y + selectionHeight - 2, selectionWidth + 2, 4);
    context.fillRect(x - 1, y, 4, selectionHeight);
    context.fillRect(x + selectionWidth - 1, y, 4, selectionHeight);

    context.fillStyle = '#FFFFFF';
    context.fillRect(x + 2, y + 2, selectionWidth - 3, 2);
    context.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 3, 2);
    context.fillRect(x + 2, y + 2, 2, selectionHeight - 4);
    context.fillRect(x + selectionWidth - 3, y + 2, 2, selectionHeight - 4);
  }

  isSelectedTile(tileId) {
    if (!Tilemap.isSameKindTile(tileId, CycloneMapEditor.currentTileId)) {
      return false;
    }

    if (tileId !== CycloneMapEditor.currentTileId) {
      if (this._manualTileSelected !== undefined) {
        return false;
      }

      if (CycloneMapEditor.puzzleMode) {
        return false;
      }
    }

    return true;
  }

  drawSelection() {
    if (CycloneMapEditor.changingTileProps) {
      return;
    }

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
      if (!TouchInput.isPressed() || CycloneMapEditor.changingTileProps || CycloneMapEditor.puzzleMode) {
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
    } else if (CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown && !this._mouseDown && !CycloneMapEditor.changingTileProps) {
      this.toggleManualTiles();
      return;
    }

    if (this._mouseDown) {
      this._mouseMoved = true;
      this.continueSelectingTile();
    }
  }

  update() {
    const shift = Input.isPressed('shift');
    if (shift !== this._oldShift) {
      this._needsRedraw = true;
      this._oldShift = shift;
    }

    if (this._needsRedraw) {
      this._needsRedraw = false;
      this.redraw();
    }

    super.update();
  }
}

export {
  WindowCycloneMapEditor,
};