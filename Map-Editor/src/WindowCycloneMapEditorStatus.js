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

  // eslint-disable-next-line complexity
  drawContents() {
    this.contents.clear();
    this.contents.fontSize = 16;

    let line = '';
    let splitter = '';

    if (CycloneMapEditor.params.showMapId) {
      line += `${ splitter }Map: ${ $gameMap._mapId }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showTilesetId) {
      line += `${ splitter }Tileset: ${ $gameMap._tilesetId }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showPosition) {
      line += `${ splitter }Pos: ${ CycloneMapEditor.statusMapX }, ${ CycloneMapEditor.statusMapY }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showCellTiles) {
      const { statusTile1, statusTile2, statusTile3, statusTile4 } = CycloneMapEditor;
      if (line) {
        line += ' - ';
      }

      line += `Tiles: (${ statusTile1 }, ${ statusTile2 }, ${ statusTile3 }, ${ statusTile4 })`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showRegionId) {
      line += `${ splitter }Region: ${ CycloneMapEditor.statusRegion }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showTag) {
      line += `${ splitter }Tag: ${ CycloneMapEditor.statusTag }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showCollision) {
      line += `${ splitter }Collision: ${ CycloneMapEditor.statusCollision }`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showLadder && CycloneMapEditor.statusLadder) {
      line += `${ splitter } Ladder`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showBush && CycloneMapEditor.statusBush) {
      line += `${ splitter } Bush`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showCounter && CycloneMapEditor.statusCounter) {
      line += `${ splitter } Counter`;
      splitter = ', ';
    }

    if (CycloneMapEditor.params.showDamageFloor && CycloneMapEditor.statusDamage) {
      line += `${ splitter } Damage`;
      splitter = ', ';
    }

    this.drawText(`${ line }`, 8, 12, this.width - 8, 'left');
    this.drawText(`TileId: ${ CycloneMapEditor.statusTileId }`, 0, 12, this.width - 8, 'right');
  }
}

export {
  WindowCycloneMapEditorStatus,
};