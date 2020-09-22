class WindowCycloneMapEditorStatus extends Window_Base {
  initialize() {
    const h = 40;
    super.initialize(new Rectangle(0, Graphics.height - h, Graphics.width, h));
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

  makeLine() {
    let line = '';

    const addConditional = (paramName, newPart) => {
      if (CycloneMapEditor.params[paramName]) {
        if (line && newPart) {
          return `, ${ newPart }`;
        }

        return newPart;
      }

      return '';
    };

    line += addConditional('showMapId', `Map: ${ $gameMap._mapId }`);
    line += addConditional('showTilesetId', `Tileset: ${ $gameMap._tilesetId }`);
    line += addConditional('showPosition', `Pos: ${ CycloneMapEditor.statusMapX }, ${ CycloneMapEditor.statusMapY }`);

    if (CycloneMapEditor.params.showCellTiles) {
      const { statusTile1, statusTile2, statusTile3, statusTile4 } = CycloneMapEditor;
      if (line) {
        line += ' - ';
      }
      line += `Tiles: (${ statusTile1 }, ${ statusTile2 }, ${ statusTile3 }, ${ statusTile4 })`;
    }

    line += addConditional('showRegionId', `Region: ${ CycloneMapEditor.statusRegion }`);
    line += addConditional('showTag', `Tag: ${ CycloneMapEditor.statusTag }`);
    line += addConditional('showCollision', `Collision: ${ CycloneMapEditor.statusCollision }`);
    line += addConditional('showLadder', CycloneMapEditor.statusLadder ? ' Ladder' : '');
    line += addConditional('showBush', CycloneMapEditor.statusBush ? ' Bush' : '');
    line += addConditional('showCounter', CycloneMapEditor.statusCounter ? ' Counter' : '');
    line += addConditional('showDamageFloor', CycloneMapEditor.statusDamage ? ' Damage' : '');

    return line;
  }

  textY() {
    return 12;
  }

  drawMainLine() {
    const line = this.makeLine();
    this.drawText(line, 8, this.textY(), this.width - 8, 'left');
  }

  drawRightLine() {
    this.drawText(`TileId: ${ CycloneMapEditor.statusTileId }`, 0, this.textY(), this.width - 8, 'right');
  }

  drawContents() {
    this.contents.clear();
    this.contents.fontSize = 16;

    this.drawMainLine();
    this.drawRightLine();
  }
}

export {
  WindowCycloneMapEditorStatus,
};