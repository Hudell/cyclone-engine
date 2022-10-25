export class WindowSelection extends Window_Base {
  initialize() {
    super.initialize(0, 0, Graphics.width, Graphics.height);

    this.padding = 0;
    this.refresh();
    this.opacity = 0;

    this.backOpacity = 0;
    this.deactivate();
  }

  standardPadding() {
    return 0;
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  drawSelectedTile() {
    if ($gameMap._mouseX < 0 || $gameMap._mouseY < 0) {
      return;
    }

    const x = $gameMap.mapToCanvasX($gameMap._mouseX);
    const y = $gameMap.mapToCanvasY($gameMap._mouseY);

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const drawWidth = Math.floor(tileWidth / 4);
    const drawHeight = Math.floor(tileHeight / 4);

    const context = this.contents.context;
    context.fillStyle = '#DDDDDD';

    context.fillRect(x, y, drawWidth, 4);
    context.fillRect(x, y, 4, drawHeight);

    context.fillRect(x + tileWidth - 4, y, 4, drawHeight);
    context.fillRect(x + tileWidth - drawWidth, y, drawWidth, 4);

    context.fillRect(x, y + tileHeight - drawHeight, 4, drawHeight);
    context.fillRect(x, y + tileHeight - 4, drawWidth, 4);

    context.fillRect(x + tileWidth - 4, y + tileHeight - drawHeight, 4, drawHeight);
    context.fillRect(x + tileWidth - drawWidth, y + tileHeight - 4, drawWidth, 4);

    context.fillStyle = '#333333';

    context.fillRect(x, y - 4, drawWidth, 4);
    context.fillRect(x - 4, y, 4, drawHeight);

    context.fillRect(x + tileWidth, y, 4, drawHeight);
    context.fillRect(x + tileWidth - drawWidth, y - 4, drawWidth, 4);

    context.fillRect(x - 4, y + tileHeight - drawHeight, 4, drawHeight);
    context.fillRect(x, y + tileHeight, drawWidth, 4);

    context.fillRect(x + tileWidth, y + tileHeight - drawHeight, 4, drawHeight);
    context.fillRect(x + tileWidth - drawWidth, y + tileHeight, drawWidth, 4);
  }

  refresh() {
    this.contents.clear();

    this._lastDisplayX = $gameMap._displayX;
    this._lastDisplayY = $gameMap._displayY;
    this._lastMouseX = $gameMap._mouseX;
    this._lastMouseY = $gameMap._mouseY;

    this.drawSelectedTile();
  }

  update() {
    if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY || this._lastMouseX !== $gameMap._mouseX || this._lastMouseY !== $gameMap._mouseY) {
      this.refresh();
    }
  }

  requestRefresh() {
    this._lastDisplayX = -999;
  }
}
