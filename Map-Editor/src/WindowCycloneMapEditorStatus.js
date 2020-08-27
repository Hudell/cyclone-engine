class WindowCycloneMapEditorStatus extends Window_Base {
  constructor() {
    const h = 40;
    super(new Rectangle(0, Graphics.height - h, Graphics.width, h));
    this.showBackgroundDimmer();
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  refresh() {
    this.drawContents();
  }

  lineHeight() {
    return 16;
  }

  drawContents() {
    this.contents.clear();
    this.contents.fontSize = 16;

    const line = `Map: ${ $gameMap._mapId }, Tileset: ${ $gameMap._tilesetId}, Pos: ${ CycloneMapEditor.statusMapX }, ${ CycloneMapEditor.statusMapY }, ${ CycloneMapEditor.currentLayer }`;
    const tiles = `Tiles: (${ CycloneMapEditor.statusTile1 }, ${ CycloneMapEditor.statusTile2 }, ${ CycloneMapEditor.statusTile3 }, ${ CycloneMapEditor.statusTile4 }), Region: ${ CycloneMapEditor.statusRegion }`;

    this.drawText(`${ line } - ${ tiles }`, 8, 12, this.width - 8, 'left');
    this.drawText(`TileId: ${ CycloneMapEditor.statusTileId }`, 0, 12, this.width - 8, 'right');
  }
}

export {
  WindowCycloneMapEditorStatus,
};