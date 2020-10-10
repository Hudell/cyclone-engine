// import { Layers, Tools } from './constants';

class WindowCycloneMapEditorTabs extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
    const w = CycloneMapEditor.windowWidth;
    const h = 74;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
    this.configureHandlers();
  }

  configureHandlers() {
    this.setHandler('a', () => {
      CycloneMapEditor.jumpToOneTileOf([Tilemap.TILE_ID_A1, Tilemap.TILE_ID_A2, Tilemap.TILE_ID_A3, Tilemap.TILE_ID_A4, Tilemap.TILE_ID_A5]);
      this.activate();
    });
    this.setHandler('b', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_B);
      this.activate();
    });
    this.setHandler('c', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_C);
      this.activate();
    });
    this.setHandler('d', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_D);
      this.activate();
    });
    this.setHandler('e', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E);
      this.activate();
    });
    this.setHandler('f', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 256);
      this.activate();
    });
    this.setHandler('g', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 512);
      this.activate();
    });
    this.setHandler('h', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_A5 + 256);
      this.activate();
    });
  }
  maxScrollY() {
    return 0;
  }

  maxScrollX() {
    return 0;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  makeCommandList() {
    this.addCommand('A', 'a');
    this.addCommand('B', 'b');
    this.addCommand('C', 'c');
    this.addCommand('D', 'd');
    this.addCommand('E', 'e');
    this.addCommand('F', 'f', Boolean(window.CycloneExtraTilesets));
    this.addCommand('G', 'g', Boolean(window.CycloneExtraTilesets));
    this.addCommand('H', 'h', Boolean(window.CycloneExtraTilesets));
  }

  colSpacing() {
    return 6;
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    return 8;
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);
  }

  // itemRect(index) {
  //   const rect = super.itemRect(index);

  //   if (Graphics.width < 1280) {
  //     rect.width += 3;
  //   }

  //   return rect;
  // }

  // lineHeight() {
  //   if (Graphics.width >= 1280) {
  //     if (CycloneMapEditor.tileDrawWidth < 48) {
  //       return 14;
  //     }

  //     return 36;
  //   }

  //   return 14;
  // }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }
}

export {
  WindowCycloneMapEditorTabs,
};