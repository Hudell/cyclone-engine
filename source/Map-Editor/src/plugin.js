import '../../Core/main.min';
import { Layers, Tools, tilePropTools } from './constants';
import { MapshotTileMap } from './mapshot/MapshotTileMap';
import { LZString } from '../../Libs/lz-string.min';
import { throttle } from '../../Utils/throttle';
import { debounce } from '../../Utils/debounce';
import { DirectionHelper } from '../../Utils/DirectionHelper';
import { logImage } from '../../Utils/logImage';
import { getTilesetIndex } from '../../Utils/getTilesetIndex';

const layerVisibility = [true, true, true, true, true, false, true, false, false, false, false];
let editorActive = true;
let windowWidth = 216;
const mapCaches = {};
let customCollisionTable = {};
let tileBlendingTable = {};

let currentLayer = 7;
let currentTab = 'A';
let currentTileId = undefined;
let tileCols = 1;
let tileRows = 1;
let selectedTileList = [];
let multiLayerSelection = [];
let tileWidth = 48;
let tileHeight = 48;
let currentTool = 'pencil';
let lastDrawingTool = 'pencil';
let wasPressing = false;
let isRightButtonDown = false;
let wasRightButtonDown = false;
let rectangleStartMouseX = 0;
let rectangleStartMouseY = 0;
let rectangleStartX = 0;
let rectangleStartY = 0;
let rectangleWidth = 0;
let rectangleHeight = 0;
let rectangleBackWidth = 0;
let rectangleBackHeight = 0;
const tabs = ['A', 'B', 'C', 'D', 'E'];
let changeHistory = [];
let undoHistory = [];
let currentChange = false;
let previewChanges = {};
let messySelection = false;
let showGrid = true;
let statusTileId = 0;
let statusMapX = 0;
let statusMapY = 0;
let statusTile1 = 0;
let statusTile2 = 0;
let statusTile3 = 0;
let statusTile4 = 0;
let statusRegion = 0;
let statusTag = 0;
let statusCollision = 0;
let statusBush = false;
let statusCounter = false;
let statusDamage = false;
let statusLadder = false;
let currentZoom = 1;
let puzzleMode = false;

let circleData = false;
let smallCircleData = false;

const _ = '';
const o = true;
const x = false;
const autoTileShapeTable = [
  // o means there's a compatible tile on that position,
  // x means there is no compatible tile on that position
  // _ means that position doesn't matter
  [o, o, o, o, o, o, o, o], // 0
  [x, o, o, o, o, o, o, o], // 1
  [o, o, x, o, o, o, o, o], // 2
  [x, o, x, o, o, o, o, o], // 3
  [o, o, o, o, o, o, o, x], // 4
  [x, o, o, o, o, o, o, x], // 5
  [o, o, x, o, o, o, o, x], // 6
  [x, o, x, o, o, o, o, x], // 7
  [o, o, o, o, o, x, o, o], // 8
  [x, o, o, o, o, x, o, o], // 9
  [o, o, x, o, o, x, o, o], //10
  [x, o, x, o, o, x, o, o], //11
  [o, o, o, o, o, x, o, x], //12
  [x, o, o, o, o, x, o, x], //13
  [o, o, x, o, o, x, o, x], //14
  [x, o, x, o, o, x, o, x], //15
  [_, o, o, x, o, _, o, o], //16
  [_, o, x, x, o, _, o, o], //17
  [_, o, o, x, o, _, o, x], //18
  [_, o, x, x, o, _, o, x], //19
  [_, x, _, o, o, o, o, o], //20
  [_, x, _, o, o, o, o, x], //21
  [_, x, _, o, o, x, o, o], //22
  [_, x, _, o, o, x, o, x], //23
  [o, o, _, o, x, o, o, _], //24
  [o, o, _, o, x, x, o, _], //25
  [x, o, _, o, x, o, o, _], //26
  [x, o, _, o, x, x, o, _], //27
  [o, o, o, o, o, _, x, _], //28
  [x, o, o, o, o, _, x, _], //29
  [o, o, x, o, o, _, x, _], //30
  [x, o, x, o, o, _, x, _], //31
  [_, o, _, x, x, _, o, _], //32
  [_, x, _, o, o, _, x, _], //33
  [_, x, _, x, o, _, o, o], //34
  [_, x, _, x, o, _, o, x], //35
  [_, x, _, o, x, o, o, _], //36
  [_, x, _, o, x, x, o, _], //37
  [o, o, _, o, x, _, x, _], //38
  [x, o, _, o, x, _, x, _], //39
  [_, o, o, x, o, _, x, _], //40
  [_, o, x, x, o, _, x, _], //41
  [_, x, _, x, x, _, o, _], //42
  [_, x, _, x, o, _, x, _], //43
  [_, o, _, x, x, _, x, _], //44
  [_, x, _, o, x, _, x, _], //45
  [_, x, _, x, x, _, x, _]  //46
];

const highLayerAutotiles = [
  1,
  2,
  3,
  20,
  21,
  22,
  23,
  28,
  29,
  30,
  31,
  36,
  37,
  38,
  39,
  44,
  45,
  46,
  47,
];

const refreshGrid = throttle(() => {
  SceneManager._scene._mapEditorGrid.refresh();
}, 50);

const refreshTilemap = throttle(() => {
  SceneManager._scene._spriteset._tilemap.refresh();
}, 200);

const refreshCollision = throttle(() => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      refreshCollision();
    }, 1);
    return;
  }
  if (window.CycloneMovement) {
    window.CycloneMovement.setupCollision();
  }
}, 200);

const refreshMagic = throttle(() => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      refreshMagic();
    }, 1);
    return;
  }

  if (window.CycloneMagic) {
    window.CycloneMagic.loadMagic();
    forceBlenderRefresh(true);
  }
});

const forceBlenderRefresh = throttle((...args) => {
  CycloneMapEditor.forceBlenderRefresh(...args);
}, 50);

const saveExtraData = throttle((refreshCollisionToo = false) => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      saveExtraData(refreshCollisionToo);
    }, 1);
    return;
  }

  CycloneMapEditor.saveExtraData();
  if (refreshCollisionToo) {
    refreshCollision();
    refreshMagic();
  }
}, 200);

const fullRefresh = debounce(() => {
  saveExtraData(true);
}, 500);

class CycloneMapEditor extends CyclonePlugin {
  static get currentTab() {
    return currentTab;
  }
  static get active() {
    return editorActive;
  }
  static set active(value) {
    editorActive = value;
  }
  static get tileWidth() {
    return tileWidth;
  }
  static set tileWidth(value) {
    tileWidth = value;
  }
  static get tileDrawWidth() {
    if (Graphics.width < 1280) {
      if (tileWidth > 32) {
        return Math.floor(tileWidth / 2);
      }

      if (tileWidth <= 16) {
        return tileWidth * 2;
      }
    } else {
      if (tileWidth < 32) {
        return tileWidth * 2;
      }
    }

    return tileWidth;
  }
  static get tileHeight() {
    return tileHeight;
  }
  static set tileHeight(value) {
    tileHeight = value;
  }
  static get tileDrawHeight() {
    if (Graphics.width < 1280) {
      if (tileHeight > 32) {
        return Math.floor(tileHeight / 2);
      }

      if (tileHeight <= 16) {
        return tileHeight * 2;
      }
    } else {
      if (tileHeight < 32) {
        return tileHeight * 2;
      }
    }

    return tileHeight;
  }
  static get windowWidth() {
    return windowWidth;
  }
  static set windowWidth(value) {
    windowWidth = value;
  }

  static get isRightButtonDown() {
    return isRightButtonDown;
  }
  static set isRightButtonDown(value) {
    isRightButtonDown = value;
  }

  // the size of the rectangle tool when the user stretches it right
  static get rectangleWidth() { return rectangleWidth; }
  static set rectangleWidth(value) { rectangleWidth = value; }

  // The size of the rectangle tool when the user stretches it down
  static get rectangleHeight() { return rectangleHeight; }
  static set rectangleHeight(value) { rectangleHeight = value; }

  // the size of the rectangle tool when the user stretches it left
  static get rectangleBackWidth() { return rectangleBackWidth; }
  static set rectangleBackWidth(value) { rectangleBackWidth = value; }

  // The size of the rectangle tool when the user stretches it up
  static get rectangleBackHeight() { return rectangleBackHeight; }
  static set rectangleBackHeight(value) { rectangleBackHeight = value; }

  // The X tile where the rectangle started
  static get rectangleStartX() { return rectangleStartX; }
  static set rectangleStartX(value) { rectangleStartX = value; }

  // The Y tile where the rectangle started
  static get rectangleStartY() { return rectangleStartY; }
  static set rectangleStartY(value) { rectangleStartY = value; }

  static get tileCols() { return tileCols; }
  static set tileCols(value) { tileCols = value; }
  static get tileRows() { return tileRows; }
  static set tileRows(value) { tileRows = value; }

  // The Mouse X position where the rectangle started
  static get rectangleStartMouseX() { return rectangleStartMouseX; }
  static set rectangleStartMouseX(value) { rectangleStartMouseX = value; }

  // The Mouse Y position where the rectangle started
  static get rectangleStartMouseY() { return rectangleStartMouseY; }
  static set rectangleStartMouseY(value) { rectangleStartMouseY = value; }

  static get messySelection() { return messySelection; }
  static set messySelection(value) { messySelection = value; }

  static get changeHistory() { return changeHistory; }
  static get undoHistory() { return undoHistory; }
  static get layerVisibility() { return layerVisibility; }

  static get wasRightButtonDown() { return wasRightButtonDown; }
  static set wasRightButtonDown(value) { wasRightButtonDown = value; }
  static get wasPressing() { return wasPressing; }
  static set wasPressing(value) { wasPressing = value; }

  static get currentTool() { return currentTool; }
  static get currentLayer() { return currentLayer; }
  static get showGrid() { return showGrid; }
  static get previewChanges() { return previewChanges; }
  static get puzzleMode() { return puzzleMode; }

  static get currentTileId() { return currentTileId; }
  static set currentTileId(value) { currentTileId = value; }
  static get selectedTileList() { return selectedTileList; }
  static set selectedTileList(value) { selectedTileList = value; }
  static get multiLayerSelection() { return multiLayerSelection; }
  static set multiLayerSelection(value) { multiLayerSelection = value; }

  static get statusTileId() { return statusTileId; }
  static set statusTileId(value) { statusTileId = value; }
  static get statusMapX() { return statusMapX; }
  static set statusMapX(value) { statusMapX = value; }
  static get statusMapY() { return statusMapY; }
  static set statusMapY(value) { statusMapY = value; }
  static get statusTile1() { return statusTile1; }
  static set statusTile1(value) { statusTile1 = value; }
  static get statusTile2() { return statusTile2; }
  static set statusTile2(value) { statusTile2 = value; }
  static get statusTile3() { return statusTile3; }
  static set statusTile3(value) { statusTile3 = value; }
  static get statusTile4() { return statusTile4; }
  static set statusTile4(value) { statusTile4 = value; }
  static get statusRegion() { return statusRegion; }
  static get statusTag() { return statusTag; }
  static get statusCollision() { return statusCollision; }
  static get statusBush() { return statusBush; }
  static get statusCounter() { return statusCounter; }
  static get statusDamage() { return statusDamage; }
  static get statusLadder() { return statusLadder; }
  static get customCollisionTable() { return customCollisionTable; }
  static get tileBlendingTable() { return tileBlendingTable; }

  static get mapCaches() { return mapCaches; }

  static get currentZoom() { return currentZoom; }
  static set currentZoom(value) {
    currentZoom = value;
    $gameScreen._zoomScale = value;

    if (this.isMapEditorScene()) {
      $gameMap.zoom = new Point(value, value);
      SceneManager._scene._mapEditorGrid.refresh();
      SceneManager._scene._spriteset.updatePosition();
    }

    // if (Utils.isNwjs()) {
    //   this.zoom100Menu.checked = value === 1;
    //   this.zoom150Menu.checked = value === 1.5;
    //   this.zoom200Menu.checked = value === 2;
    //   this.zoom400Menu.checked = value === 4;
    // }
  }

  static get changingTileProps() {
    return tilePropTools.includes(currentTool);
  }

  static register() {
    super.initialize('CycloneMapEditor');

    this.structs.set('CycloneRegionIcon', {
      regionId: 'int',
      icon: 'int',
    });

    super.register({
      regionIcons: {
        type: 'struct<CycloneRegionIcon>[]',
        defaultValue: '[]',
      },
      showMapId: {
        type: 'boolean',
        defaultValue: true,
      },
      showTilesetId: {
        type: 'boolean',
        defaultValue: true,
      },
      showPosition: {
        type: 'boolean',
        defaultValue: true,
      },
      showCellTiles: {
        type: 'boolean',
        defaultValue: true,
      },
      showRegionId: {
        type: 'boolean',
        defaultValue: true,
      },
      showTag: {
        type: 'boolean',
        defaultValue: true,
      },
      showCollision: {
        type: 'boolean',
        defaultValue: true,
      },
      showLadder: {
        type: 'boolean',
        defaultValue: true,
      },
      showBush: {
        type: 'boolean',
        defaultValue: true,
      },
      showCounter: {
        type: 'boolean',
        defaultValue: true,
      },
      showDamageFloor: {
        type: 'boolean',
        defaultValue: true,
      },
      collisionStepCount: {
        type: 'int',
        defaultValue: 1,
      }
    });

    document.addEventListener('keydown', (...args) => {
      this.onKeyDown(...args);
    });
    document.addEventListener('keypress', (...args) => {
      this.onKeyPress(...args);
    });
    document.addEventListener('keyup', (...args) => {
      this.onKeyUp(...args);
    });

    const regionIcons = this.params.regionIcons;
    this.regionIcons = new Map();
    if (regionIcons) {
      for (const { regionId, icon } of regionIcons) {
        if (regionId && icon) {
          this.regionIcons.set(regionId, icon);
        }
      }
    }
  }

  static mapEditorScene() {
    return Scene_Map;
  }

  static isMapEditorScene() {
    return SceneManager._scene instanceof (this.mapEditorScene());
  }

  static makeMenuEvent(fn) {
    return () => {
      if (TouchInput.isPressed()) {
        return;
      }

      fn();
    };
  }

  static addFileMenu(menu) {
    const fileMenu = new nw.Menu();
    fileMenu.append(new nw.MenuItem( {
      label: 'Save Current Map',
      key: 's',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.saveButton();
      })
    }));
    fileMenu.append(new nw.MenuItem( {
      label: 'Reload Current Map',
      key: 'r',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.reloadButton();
      })
    }));

    fileMenu.append(new nw.MenuItem( {type: 'separator'}));
    fileMenu.append(new nw.MenuItem( {label: 'Exit', click: this.makeMenuEvent(() => {
      window.close();
    })}));

    menu.append(new nw.MenuItem({
      label: 'File',
      submenu: fileMenu,
    }));
  }

  static addEditMenu(menu) {
    const editMenu = new nw.Menu();
    editMenu.append(new nw.MenuItem( {
      label: 'Undo',
      key: 'z',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.undoButton();
      })
    }));
    editMenu.append(new nw.MenuItem( {
      label: 'Redo',
      key: 'y',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.redoButton();
      })
    }));
    editMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.showGridMenu = new nw.MenuItem( {
      label: 'Show Grid',
      type: 'checkbox',
      checked: showGrid,
      key: 'g',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.showGridButton();
      })
    });
    editMenu.append(this.showGridMenu);

    // const zoomMenu = new nw.Menu();
    // this.zoom100Menu = new nw.MenuItem({
    //   label: '100%',
    //   type: 'checkbox',
    //   checked: currentZoom === 1,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 1;

    //   }),
    // });
    // zoomMenu.append(this.zoom100Menu);
    // this.zoom150Menu = new nw.MenuItem({
    //   label: '150%',
    //   type: 'checkbox',
    //   checked: currentZoom === 1.5,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 1.5;

    //   }),
    // });
    // zoomMenu.append(this.zoom150Menu);
    // this.zoom200Menu = new nw.MenuItem({
    //   label: '200%',
    //   type: 'checkbox',
    //   checked: currentZoom === 2,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 2;

    //   }),
    // });
    // zoomMenu.append(this.zoom200Menu);

    // this.zoom400Menu = new nw.MenuItem({
    //   label: '400%',
    //   type: 'checkbox',
    //   checked: currentZoom === 4,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 4;
    //   }),
    // });
    // zoomMenu.append(this.zoom400Menu);

    // editMenu.append(new nw.MenuItem({
    //   label: 'Zoom',
    //   submenu: zoomMenu,
    // }));

    menu.append(new nw.MenuItem({
      label: 'Edit',
      submenu: editMenu,
    }));
  }

  static addMapMenu(menu) {
    const mapMenu = new nw.Menu();
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Up',
      key: 'w',
      click: () => {
        $gameMap.scrollUp(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Left',
      key: 'a',
      click: () => {
        $gameMap.scrollLeft(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Down',
      key: 's',
      click: () => {
        $gameMap.scrollDown(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Right',
      key: 'd',
      click: () => {
        $gameMap.scrollRight(3);
      },
    }));

    menu.append(new nw.MenuItem({
      label: 'Map',
      submenu: mapMenu,
    }));
  }

  static addModeMenu(menu) {
    const modeMenu = new nw.Menu();
    this.pencilMenu = new nw.MenuItem( {
      label: 'Pencil',
      type: 'checkbox',
      checked: currentTool === 'pencil',
      key: 'p',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.pencilButton();
      })
    });
    modeMenu.append(this.pencilMenu);
    this.rectangleMenu = new nw.MenuItem( {
      label: 'Rectangle',
      type: 'checkbox',
      checked: currentTool === 'rectangle',
      key: 'r',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.rectangleButton();
      })
    });
    modeMenu.append(this.rectangleMenu);
    this.fillMenu = new nw.MenuItem( {
      label: 'Flood Fill',
      type: 'checkbox',
      checked: currentTool === 'fill',
      key: 'f',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.fillButton();
      })
    });
    modeMenu.append(this.fillMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.puzzleMenu = new nw.MenuItem( {
      label: 'Magic Mode',
      type: 'checkbox',
      checked: puzzleMode,
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.puzzleButton();
      })
    });
    modeMenu.append(this.puzzleMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));

    this.eraserMenu = new nw.MenuItem( {
      label: 'Eraser',
      type: 'checkbox',
      checked: currentTool === 'eraser',
      key: 'e',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.eraserButton();
      })
    });
    modeMenu.append(this.eraserMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));

    const tilesetPropsMenu = new nw.Menu();
    this.tilePassageMenu = new nw.MenuItem({
      label: 'Passage',
      type: 'checkbox',
      checked: currentTool === Tools.passage,
      key: 'p',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.passage);
      }),
    });
    tilesetPropsMenu.append(this.tilePassageMenu);

    this.tilePassage4Menu = new nw.MenuItem({
      label: 'Passage (4 dir)',
      type: 'checkbox',
      checked: currentTool === Tools.passage4,
      key: 'o',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.passage4);
      }),
    });
    tilesetPropsMenu.append(this.tilePassage4Menu);

    this.tileLadderMenu = new nw.MenuItem({
      label: 'Ladder',
      type: 'checkbox',
      checked: currentTool === Tools.ladder,
      key: 'l',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.ladder);
      }),
    });
    tilesetPropsMenu.append(this.tileLadderMenu);

    this.tileBushMenu = new nw.MenuItem({
      label: 'Bush',
      type: 'checkbox',
      checked: currentTool === Tools.bush,
      key: 'b',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.bush);
      }),
    });
    tilesetPropsMenu.append(this.tileBushMenu);

    this.tileCounterMenu = new nw.MenuItem({
      label: 'Counter',
      type: 'checkbox',
      checked: currentTool === Tools.counter,
      key: 'c',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.counter);
      }),
    });
    tilesetPropsMenu.append(this.tileCounterMenu);

    this.tileDamageMenu = new nw.MenuItem({
      label: 'Damage',
      type: 'checkbox',
      checked: currentTool === Tools.damage,
      key: 'd',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.damage);
      }),
    });
    tilesetPropsMenu.append(this.tileDamageMenu);

    this.tileTerrainMenu = new nw.MenuItem({
      label: 'Terrain Tag',
      type: 'checkbox',
      checked: currentTool === Tools.terrain,
      key: 't',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.toolButton(Tools.terrain);
      }),
    });
    tilesetPropsMenu.append(this.tileTerrainMenu);

    modeMenu.append(new nw.MenuItem({
      label: 'Tile Properties',
      submenu: tilesetPropsMenu,
    }));

    menu.append(new nw.MenuItem({
      label: 'Mode',
      submenu: modeMenu,
    }));
  }

  static addLayerMenu(menu) {
    const layerMenu = new nw.Menu();
    this.autoLayerButton = new nw.MenuItem( {
      label: 'Automatic',
      type: 'checkbox',
      checked: currentLayer === 7,
      key: '0',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(7);
      })
    });
    this.layer1Button = new nw.MenuItem( {
      label: 'Layer 1',
      type: 'checkbox',
      checked: currentLayer === 0,
      key: '1',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(0);
      })
    });
    this.layer2Button = new nw.MenuItem( {
      label: 'Layer 2',
      type: 'checkbox',
      checked: currentLayer === 1,
      key: '2',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(1);
      })
    });
    this.layer3Button = new nw.MenuItem( {
      label: 'Layer 3',
      type: 'checkbox',
      checked: currentLayer === 2,
      key: '3',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(2);
      })
    });
    this.layer4Button = new nw.MenuItem( {
      label: 'Layer 4',
      type: 'checkbox',
      checked: currentLayer === 3,
      key: '4',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(3);
      })
    });
    layerMenu.append(this.autoLayerButton);
    layerMenu.append(this.layer1Button);
    layerMenu.append(this.layer2Button);
    layerMenu.append(this.layer3Button);
    layerMenu.append(this.layer4Button);

    layerMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.shadowsButton = new nw.MenuItem( {
      label: 'Shadows',
      type: 'checkbox',
      checked: currentLayer === 4,
      key: '5',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(4);
      })
    });
    layerMenu.append(this.shadowsButton);
    this.regionsButton = new nw.MenuItem( {
      label: 'Regions',
      type: 'checkbox',
      checked: currentLayer === 5,
      key: '6',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(5);
      })
    });
    layerMenu.append(this.regionsButton);
    this.eventsButton = new nw.MenuItem( {
      label: 'Events',
      type: 'checkbox',
      checked: currentLayer === 6,
      key: '7',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(6);
      })
    });
    layerMenu.append(this.eventsButton);
    layerMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.collisionsButton = new nw.MenuItem( {
      label: 'Collisions',
      type: 'checkbox',
      checked: currentLayer === 8,
      key: '8',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(8);
      })
    });
    layerMenu.append(this.collisionsButton);
    this.tagsButton = new nw.MenuItem( {
      label: 'Tags',
      type: 'checkbox',
      checked: currentLayer === 9,
      key: '9',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(9);
      })
    });
    layerMenu.append(this.tagsButton);

    menu.append(new nw.MenuItem({
      label: 'Layer',
      submenu: layerMenu,
    }));
  }

  static addBlendMenu(menu) {
    const blendMenu = new nw.Menu();

    this.blendButton = new nw.MenuItem( {
      label: 'Blend Layer',
      type: 'checkbox',
      checked: currentLayer === 10,
      key: 'B',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.changeCurrentLayer(10);
        CycloneMapEditor.updateCurrentTool();
      })
    });
    blendMenu.append(this.blendButton);

    blendMenu.append(new nw.MenuItem( {type: 'separator'}));
    blendMenu.append(new nw.MenuItem( {
      label: 'Remove blend effect',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.removeAllBlendsButton();
      })
    }));
    blendMenu.append(new nw.MenuItem( {
      label: 'Optimize blend effect',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.optimizeBlendsButton();
      })
    }));


    menu.append(new nw.MenuItem({
      label: 'Blend',
      submenu: blendMenu,
    }));
  }

  static addTilesetMenu(menu) {
    const tilesetMenu = new nw.Menu();

    this._mainTilesetMenu = new nw.MenuItem({
      label: 'Main Tileset',
      enabled: false,
    });

    tilesetMenu.append(this._mainTilesetMenu);
    this._extraTilesetMenu = new nw.Menu();

    for (const tileset of $dataTilesets) {
      if (!tileset) {
        continue;
      }

      const tilesetNames = tileset.tilesetNames;
      if (!tilesetNames[5] && !tilesetNames[6]) {
        continue;
      }

      const menuItem = new nw.MenuItem({
        label: `${ tileset.id.padZero(4) } ${ tileset.name }`,
        enabled: true,
        type: 'checkbox',
        click: this.makeMenuEvent(() => {
          this.toggleTileset(tileset.id);
        }),
      });

      this._extraTilesetMenu.append(menuItem);
    }

    this._extraTilesetMenuItem = new nw.MenuItem({
      label: 'Extra Tileset',
      submenu: this._extraTilesetMenu,
    });

    tilesetMenu.append(this._extraTilesetMenuItem);

    menu.append(new nw.MenuItem({
      label: 'Tilesets',
      submenu: tilesetMenu,
    }));
  }

  static addJumpMenu(menu) {
    const a1 = Tilemap.TILE_ID_A1;
    const a2 = Tilemap.TILE_ID_A2;
    const a3 = Tilemap.TILE_ID_A3;
    const a4 = Tilemap.TILE_ID_A4;
    const b = Tilemap.TILE_ID_B;
    const c = Tilemap.TILE_ID_C;
    const d = Tilemap.TILE_ID_D;
    const e = Tilemap.TILE_ID_E;
    const f = Tilemap.TILE_ID_E + 256;
    const g = Tilemap.TILE_ID_E + 512;
    const a5 = Tilemap.TILE_ID_A5;
    const h = Tilemap.TILE_ID_A5 + 256;

    const jumpToTabMenu = new nw.Menu();
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'AutoTiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([a1, a2, a3, a4]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'A5 Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToTile(a5);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'B Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([b, c, d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'C Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([c, d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'D Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'E Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([e, f, g, a5]);
      }),
    }));
    this._jumpToExtraBMenu = new nw.MenuItem({
      label: 'Extra B Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([f, g, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraBMenu);
    this._jumpToExtraCMenu = new nw.MenuItem({
      label: 'Extra C Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([g, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraCMenu);
    this._jumpToExtraDMenu = new nw.MenuItem({
      label: 'Extra D Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.jumpToOneTileOf([h, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraDMenu);

    menu.append(new nw.MenuItem({
      label: 'Jump To',
      submenu: jumpToTabMenu,
    }));
  }

  static refreshTilesetMenu() {
    if (!this._extraTilesetMenu) {
      return;
    }

    const tileset = $gameMap.tileset();
    this._mainTilesetMenu.label = `${ tileset.id.padZero(4) } ${ tileset.name }`;

    for (const item of this._extraTilesetMenu.items) {
      const id = parseInt(item.label.substring(0, 4), 10);
      if (id === $gameMap._tilesetId) {
        item.checked = false;
        item.enabled = false;
        continue;
      }

      item.enabled = true;
      item.checked = $gameMap._extraTilesetId === id;
    }
  }

  static addToolsMenu(menu) {
    const toolsMenu = new nw.Menu();

    const resizeTilesets = new nw.MenuItem({
      label: 'Generate 48x48 Tilesets',
      enabled: $gameMap.tileWidth() !== 48 || $gameMap.tileHeight() !== 48,
      click: this.makeMenuEvent(() => {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();

        let message;

        if (globalThis.CycloneMaps && CycloneMaps.params.tilesetPath) {
          const realPath = CycloneMaps.params.tilesetPath;
          const fakePath = 'img/tilesets/';
          message = `This option will replace the 48x48 files on ${ fakePath } with resized copies of the ${ width }x${ height } files on ${ realPath }. Are you SURE you want to do this?`;
        } else {
          message = `This option will replace the files on /img/tilesets with resized copies of your ${ width }x${ height } tilesets. Are you SURE you want to do this?`;
        }

        CycloneMapEditor.resizeTilesets(message);
      }),
    });

    toolsMenu.append(resizeTilesets);
    menu.append(new nw.MenuItem({
      label: 'Tools',
      submenu: toolsMenu,
    }));
  }

  static addExportMenu(menu) {
    const exportMenu = new nw.Menu();
    const exportLayersMenu = new nw.Menu();
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 1',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportSingleLayer(0);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 2',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportSingleLayer(1);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 3',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportSingleLayer(2);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 4',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportSingleLayer(3);
      }),
    }));

    exportMenu.append(new nw.MenuItem({
      label: 'Layers',
      submenu: exportLayersMenu,
    }));

    const exportRenderedMapMenu = new nw.Menu();
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Lower Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportLowerTiles();
      }),
    }));
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Upper Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportUpperTiles();
      }),
    }));
    exportRenderedMapMenu.append(new nw.MenuItem( {type: 'separator'}));
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Whole Map',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportWholeMap();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Rendered Map',
      submenu: exportRenderedMapMenu,
    }));

    const exportEventsMenu = new nw.Menu();
    exportEventsMenu.append(new nw.MenuItem({
      label: 'Low Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportLowEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'Normal Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportNormalEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'High Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportHighEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem( {type: 'separator'}));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'All Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportAllEvents();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Events',
      submenu: exportEventsMenu,
    }));

    const exportCollisionsMenu = new nw.Menu();
    exportCollisionsMenu.append(new nw.MenuItem({
      label: 'Custom Collision',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportCustomCollision();
      }),
    }));
    exportCollisionsMenu.append(new nw.MenuItem({
      label: 'Full Collision',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor.exportFullCollision();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Collision',
      submenu: exportCollisionsMenu,
    }));

    menu.append(new nw.MenuItem({
      label: 'Export',
      submenu: exportMenu,
    }));
  }

  static addHelpMenu(menu) {
    const helpMenu = new nw.Menu();
    helpMenu.append(new nw.MenuItem( {
      label: 'Plugin Page',
      key: 'F1',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://makerdevs.com/plugin/cyclone-map-editor');
      }),
    }));

    helpMenu.append(new nw.MenuItem( {
      label: 'Extra Tilesets Add-on',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-extra-tilesets');
      }),
    }));

    helpMenu.append(new nw.MenuItem( {
      label: 'Magic (Tile Blend) Add-on',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-magic');
      }),
    }));

    menu.append(new nw.MenuItem({
      label: 'Help',
      submenu: helpMenu,
    }));
  }

  static addMenuBar() {
    if (!Utils.isNwjs()) {
      return;
    }
    if (this.menu) {
      return this.refreshMenuVisibility();
    }

    const menu = new nw.Menu({ type: 'menubar' });

    this.addFileMenu(menu);
    this.addEditMenu(menu);
    this.addMapMenu(menu);
    this.addModeMenu(menu);
    this.addLayerMenu(menu);
    this.addBlendMenu(menu);
    this.addTilesetMenu(menu);
    this.addJumpMenu(menu);
    this.addToolsMenu(menu);
    this.addExportMenu(menu);
    this.addHelpMenu(menu);

    this.menu = menu;
    this.refreshTilesetMenu();
    this.refreshMenuVisibility();
  }

  static clearAllData() {
    changeHistory = [];
    undoHistory = [];
    rectangleStartMouseX = 0;
    rectangleStartMouseY = 0;
    rectangleStartX = 0;
    rectangleStartY = 0;
    rectangleWidth = 0;
    rectangleHeight = 0;
    rectangleBackWidth = 0;
    rectangleBackHeight = 0;
    customCollisionTable = {};
    tileBlendingTable = {};

    this.clearSelection();
  }

  static toggleTileset(id) {
    if ($gameMap._extraTilesetId === id) {
      $gameMap._extraTilesetId = 0;
    } else {
      $gameMap._extraTilesetId = id;
    }

    $gameMap.buildTilesetFlags && $gameMap.buildTilesetFlags();

    this.refreshTilesetMenu();
    this.refreshMapEditor();

    if (!this.jumpToTile(Tilemap.TILE_ID_E + 256) && !this.jumpToTile(Tilemap.TILE_ID_E + 512)) {
      this.jumpToLastTile();
    }
  }

  static applyExtraData(data) {
    customCollisionTable = {};
    tileBlendingTable = {};
    $gameMap._extraTilesetId = 0;

    const radix = data?.radix || 10;

    if (data?.collision) {
      for (let i = 0; i < data.collision.length; i++) {
        const col = parseInt(data.collision[i], radix) || 0;
        if (col) {
          customCollisionTable[i] = col;
        }
      }
    }

    if (data?.magic) {
      for (let tileId in data.magic) {
        if (!data.magic[tileId]) {
          continue;
        }

        const line = data.magic[tileId];
        const buffer = new ArrayBuffer(line.length);
        const list = new Uint8Array(buffer);
        for (let i = line.indexOf('1'); i < line.length; i++) {
          if (line[i] !== '0') {
            list[i] = Number(line[i]);
          }
        }
        tileBlendingTable[tileId] = list;
      }
    }

    if (data?.extraTilesetId) {
      $gameMap._extraTilesetId = data.extraTilesetId;
    }

    this.refreshTilesetMenu();
    this.refreshMapEditor();
  }

  static dataVersion() {
    return '02';
  }

  static compress(data) {
    return `v=${ this.dataVersion() };` + LZString.compressToBase64(data);
  }

  static decompress(data) {
    if (!data.startsWith('v=')) {
      return LZString.decompress(data);
    }

    const idx = data.indexOf(';') + 1;
    return LZString.decompressFromBase64(data.substring(idx));
  }

  static parseExtraData(note) {
    let json;
    try {
      json = this.decompress(note);
    } catch(e) {
      console.error('Failed to decompress data from CycloneMapEditor event.');
      console.log(note);
      console.log(e);
      return;
    }

    let data;
    try {
      data = JSON.parse(json);

    } catch(e) {
      console.error('Failed to parse extra data.');
      console.log(json);
      console.log(e);
      return;
    }

    this.applyExtraData(data);
  }

  static loadExtraData() {
    // Check if there's any event called CycloneMapEditor
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      this.parseExtraData(event.note);
      return;
    }
  }

  static getExtraData() {
    const radix = 36;
    const collision = new Array($dataMap.width * $dataMap.height * 16);
    for (let i = 0; i < collision.length; i++) {
      if (customCollisionTable[i]) {
        if (customCollisionTable[i] >= radix) {
          throw new Error('Invalid collision value: ', customCollisionTable[i]);
        }

        collision[i] = Number(customCollisionTable[i]).toString(radix);
      } else {
        collision[i] = '0';
      }
    }
    const magic = {};
    for (const tileId in tileBlendingTable) {
      if (!tileBlendingTable[tileId]) {
        continue;
      }
      const line = tileBlendingTable[tileId].join('');
      if (!line.includes('1')) {
        continue;
      }
      magic[tileId] = line;
    }

    const puzzle = window.CycloneMagic?.puzzleTiles || undefined;

    return {
      radix,
      collision: collision.join(''),
      magic,
      puzzle,
      extraTilesetId: $gameMap._extraTilesetId,
    };
  }

  static getExtraDataJson() {
    return this.compress(JSON.stringify(this.getExtraData(), null, 0));
  }

  static saveExtraData() {
    const data = this.getExtraDataJson();
    // Check if there's any event called CycloneMapEditor
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      event.note = data;
      return;
    }

    // Create a new event then
    $dataMap.events.push({
      id: $dataMap.events.length,
      name: 'CycloneMapEditor',
      note: data,
      pages: [],
      x: $dataMap.width,
      y: $dataMap.height,
    });
  }

  static clearSelection() {
    currentTileId = undefined;
    tileCols = 1;
    tileRows = 1;
    selectedTileList = [];
    multiLayerSelection = [];
  }

  static shouldDisplayMenu() {
    if (!editorActive) {
      return false;
    }

    if (!this.isMapEditorScene()) {
      return false;
    }

    return true;
  }

  static isFullScreen() {
    return Graphics._isFullScreen();
  }

  static refreshScreenSize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    if (this.isFullScreen()) {
      return;
    }

    this.resizeTimeout = setTimeout(() => {
      // Adds a second timeout to block the show/hide functionality for a little while
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = false;
      }, 500);

      const xDelta = Graphics.width - window.innerWidth;
      const yDelta = Graphics.height - window.innerHeight;
      if (xDelta !== 0 || yDelta !== 0) {
        window.moveBy(-xDelta / 2, -yDelta / 2);
        window.resizeBy(xDelta, yDelta);
      }
    }, 20);
  }

  static enablePluginOptions() {
    if (this.blendButton) {
      this.blendButton.enabled = Boolean(window.CycloneMagic);
    }
    if (this.puzzleMenu) {
      this.puzzleMenu.enabled = Boolean(window.CycloneMagic);
    }
    if (this._extraTilesetMenuItem) {
      this._extraTilesetMenuItem.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraBMenu) {
      this._jumpToExtraBMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraCMenu) {
      this._jumpToExtraCMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraDMenu) {
      this._jumpToExtraDMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
  }

  static refreshMenuVisibility() {
    if (!Utils.isNwjs()) {
      return;
    }

    const display = this.shouldDisplayMenu();
    const win = nw.Window.get();

    this.enablePluginOptions();
    if (display && win.menu === this.menu) {
      return;
    }

    if (display) {
      win.menu = this.menu;
    } else {
      win.menu = null;
    }

    this.refreshScreenSize();
  }

  static logImage(canvas, text) {
    logImage(canvas, text);
  }

  static isTabValid(tab) {
    const tileset = $gameMap.tileset();
    if (!tileset) {
      return false;
    }

    const names = tileset.tilesetNames;

    if (tab === 'A') {
      return Boolean(names[0] || names[1] || names[2] || names[3] || names[4]);
    }

    const tilesetIndex = tabs.indexOf(tab) + 4;
    return Boolean(names[tilesetIndex]);
  }

  static validTabs() {
    return tabs.filter(tab => this.isTabValid(tab));
  }

  static areRegionsVisible() {
    return layerVisibility[5];
  }

  static isLayerVisible(index) {
    if (index >= 8 && index <= 10) {
      return currentLayer === index;
    }

    if (index === 7) {
      return true;
    }

    return layerVisibility[index];
  }

  static selectPreviousTab() {
    const validTabs = this.validTabs();
    const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

    const index = oldIndex === 0 ? validTabs.length -1 : oldIndex -1;
    this.changeCurrentTab(validTabs[index % validTabs.length]);
  }

  static selectNextTab() {
    const validTabs = this.validTabs();
    const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

    const index = oldIndex +1;
    this.changeCurrentTab(validTabs[index % validTabs.length]);
  }

  static onKeyDown(event) {
    if (!editorActive) {
      return;
    }

    // const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    if (event.keyCode === 8 || event.keyCode === 46) {
      this.eraserButton();
      return;
    }

    if (event.keyCode === 33) {
      this.selectPreviousTab();
      return;
    }

    if (event.keyCode === 34) {
      this.selectNextTab();
      return;
    }
  }

  static checkNumKeys(code) {
    switch(code) {
      case 'Numpad0':
        this.changeCurrentLayer(7);
        break;
      case 'Numpad1':
        this.changeCurrentLayer(0);
        break;
      case 'Numpad2':
        this.changeCurrentLayer(1);
        break;
      case 'Numpad3':
        this.changeCurrentLayer(2);
        break;
      case 'Numpad4':
        this.changeCurrentLayer(3);
        break;
      case 'Numpad5':
        this.changeCurrentLayer(4);
        break;
      case 'Numpad6':
        this.changeCurrentLayer(5);
        break;
      case 'Numpad7':
        this.changeCurrentLayer(6);
        break;
      case 'Numpad8':
        this.changeCurrentLayer(8);
        break;
      case 'Numpad9':
        this.changeCurrentLayer(9);
        break;
    }
  }

  static checkLayerKeys(key) {
    switch(key) {
      case '0':
        this.changeCurrentLayer(7);
        break;
      case '1':
        this.changeCurrentLayer(0);
        break;
      case '2':
        this.changeCurrentLayer(1);
        break;
      case '3':
        this.changeCurrentLayer(2);
        break;
      case '4':
        this.changeCurrentLayer(3);
        break;
      case '5':
        this.changeCurrentLayer(4);
        break;
      case '6':
        this.changeCurrentLayer(5);
        break;
      case '8':
        this.changeCurrentLayer(8);
        break;
      case '9':
        this.changeCurrentLayer(9);
        break;
    }
  }

  static checkScrollKeys(key) {
    switch(key.toLowerCase()) {
      case 'w':
        $gameMap.scrollUp(3);
        break;
      case 'a':
        $gameMap.scrollLeft(3);
        break;
      case 's':
        $gameMap.scrollDown(3);
        break;
      case 'd':
        $gameMap.scrollRight(3);
        break;
    }
  }

  static sceneToReload() {
    return Scene_Map;
  }

  static loadMapFile() {
    SceneManager._scene._mapEditorCommands.hide();
    delete mapCaches[$gameMap._mapId];
    const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;

    const xhr = new XMLHttpRequest();
    const url = `data/${ fileName }`;

    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);

        // eslint-disable-next-line no-global-assign
        $dataMap = data;
        SoundManager.playLoad();
        SceneManager.goto(this.sceneToReload());
      } catch (e) {
        alert('Failed to parse map data.');
        SceneManager._scene.refreshMapEditorWindows();
      }
    };
    xhr.onerror = () => {
      alert('Failed to load map file from disk.');
      SceneManager._scene.refreshMapEditorWindows();
    };

    xhr.send();
  }

  static downloadMapshot(bitmap, fileName) {
    const imageType = 'png';
    const imageQuality = 1;

    const urlData = bitmap.canvas.toDataURL(imageType, imageQuality);
    const strippedData = urlData.replace(/^data:image\/png;base64,/, '');

    const data = atob(strippedData);
    const buffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < data.length; i++) {
      view[i] = data.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);

    let iframe = document.getElementsByName('image_download')[0];
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('name', 'image_download');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName + '.png');
    element.setAttribute('target', 'image_download');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static resizeTilesets(message) {
    const tileset = $dataTilesets[$dataMap.tilesetId];
    if (!tileset) {
      return alert('Tileset data not found.');
    }

    if (!Utils.isNwjs()) {
      return alert('This feature can only be used on a computer with a non web-version.');
    }

    const fileNames = tileset.tilesetNames;
    const newFiles = [];
    const existingFiles = [];
    const fs = require('fs');

    for (const fileName of fileNames) {
      if (!fileName) {
        continue;
      }

      if (fs.existsSync(`img/tilesets/${ fileName }.png`)) {
        existingFiles.push(fileName);
      } else {
        newFiles.push(fileName);
      }
    }

    if (existingFiles.length) {
      const overwrittenFilesMessage = `Files that will be replaced: ${ existingFiles.join(', ') }`;
      const newMessage = `${ message }\n${ overwrittenFilesMessage}`;
      if (!confirm(newMessage)) {
        return;
      }
    }

    this.doResizeTiles(fileNames);
  }

  static doResizeTiles(fileNames) {
    const width = $gameMap.tileWidth();
    const height = $gameMap.tileHeight();
    const fs = require('fs');

    for (const fileName of fileNames) {
      if (!fileName) {
        continue;
      }

      const bitmap = ImageManager.loadTileset(fileName);
      if (!bitmap) {
        continue;
      }

      const newWidth = Math.floor(bitmap.width / width * 48);
      const newHeight = Math.floor(bitmap.height / height * 48);

      const newBitmap = new Bitmap(newWidth, newHeight);
      newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newWidth, newHeight);

      const urlData = newBitmap.canvas.toDataURL('image/png', 70);
      const base64Data = urlData.replace(/^data:image\/png;base64,/, '');

      fs.writeFileSync(`img/tilesets/${ fileName }.png`, base64Data, 'base64');
    }
  }

  static exportSingleLayer(layerIndex) {
    const tilemap = new MapshotTileMap();
    tilemap.drawSingleLayer(layerIndex);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Layer${ layerIndex + 1 }`);
  }

  static exportLowerTiles() {
    const tilemap = new MapshotTileMap();
    tilemap.drawLowerTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Lower`);
  }

  static exportUpperTiles() {
    const tilemap = new MapshotTileMap();
    tilemap.drawUpperTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Upper`);
  }

  static exportWholeMap() {
    const tilemap = new MapshotTileMap();
    tilemap.drawLowerTiles();
    tilemap.drawUpperTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }`);
  }

  static exportLowEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(0);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_0`);
  }

  static exportNormalEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(1);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_1`);
  }

  static exportHighEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(2);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_2`);
  }

  static exportAllEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events`);
  }

  static exportCustomCollision() {
    const tilemap = new MapshotTileMap();
    tilemap.drawCustomCollision();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Collision`);
  }

  static exportFullCollision() {
    const tilemap = new MapshotTileMap();
    tilemap.drawDefaultCollision();
    tilemap.drawCustomCollision();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_FullCollision`);
  }

  static undoButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (changeHistory.length) {
      this.undoLastChange();
    }
  }

  static redoButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (undoHistory.length) {
      this.redoLastUndoneChange();
    }
  }

  static removeAllBlendsButton() {
    if (confirm('Are you sure you want to remove all blend effects on this map?')) {
      this.removeAllBlends();
    }
  }

  static optimizeBlendsButton() {
    if (confirm('This option will remove the blend from tiles that are completely hidden by the effect and change the tile itself to transparent. Optimize now?')) {
      this.optimizeBlends();
    }
  }

  // eslint-disable-next-line complexity
  static getCollisionSymbol(x, y) {
    const downCollision = !$gameMap.isPassable(x, y, 2);
    const leftCollision = !$gameMap.isPassable(x, y, 4);
    const rightCollision = !$gameMap.isPassable(x, y, 6);
    const upCollision = !$gameMap.isPassable(x, y, 8);

    if (downCollision && leftCollision && rightCollision && upCollision) {
      return 'X';
    }

    if (!downCollision && !leftCollision && !rightCollision && !downCollision) {
      return 'O';
    }

    let collisions = '';
    if (downCollision) {
      collisions += 'd:X ';
    } else {
      collisions += 'd:O ';
    }

    if (leftCollision) {
      collisions += 'l:X ';
    } else {
      collisions += 'l:O ';
    }
    if (rightCollision) {
      collisions += 'r:X ';
    } else {
      collisions += 'r:O ';
    }
    if (upCollision) {
      collisions += 'u:X ';
    } else {
      collisions += 'u:O ';
    }

    return collisions;
  }

  // eslint-disable-next-line complexity
  static updateStatus({ tileId, mapX, mapY, tile1, tile2, tile3, tile4 } = {}) {
    const oldTileId = statusTileId;
    const oldX = statusMapX;
    const oldY = statusMapY;
    const oldTile1 = statusTile1;
    const oldTile2 = statusTile2;
    const oldTile3 = statusTile3;
    const oldTile4 = statusTile4;

    statusTileId = tileId ?? statusTileId;
    statusMapX = mapX ?? statusMapX;
    statusMapY = mapY ?? statusMapY;
    statusTile1 = tile1 ?? statusTile1;
    statusTile2 = tile2 ?? statusTile2;
    statusTile3 = tile3 ?? statusTile3;
    statusTile4 = tile4 ?? statusTile4;

    const changedPos = oldX !== statusMapX || oldY !== statusMapY;
    if (changedPos) {
      statusRegion = $gameMap.regionId(statusMapX, statusMapY);
      statusTag = $gameMap.terrainTag(statusMapX, statusMapY);
      statusBush = $gameMap.isBush(statusMapX, statusMapY);
      statusCounter = $gameMap.isCounter(statusMapX, statusMapY);
      statusDamage = $gameMap.isDamageFloor(statusMapX, statusMapY);
      statusLadder = $gameMap.isLadder(statusMapX, statusMapY);
      statusCollision = this.getCollisionSymbol(statusMapX, statusMapY);
    }

    const changedTile = oldTile1 !== statusTile1 || oldTile2 !== statusTile2 || oldTile3 !== statusTile3 || oldTile4 !== statusTile4;
    const changed = changedTile || oldTileId !== statusTileId || changedPos;
    if (!changed) {
      return;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorStatus.refresh();
    }
  }

  static showGridButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    showGrid = !showGrid;
    this.showGridButton.checked = showGrid;
    SceneManager._scene._mapEditorGrid.refresh();
  }

  static selectHigherLayer(x, y) {
    if (currentLayer === Layers.collisions) {
      return;
    }

    for (let z = 3; z >= 0; z--) {
      const tileIndex = this.tileIndex(x, y, z);
      const tileId = $dataMap.data[tileIndex];

      if (tileId) {
        this.changeCurrentLayer(z);
        return;
      }
    }
  }

  static updateCurrentTool() {
    rectangleWidth = 0;
    rectangleHeight = 0;
    rectangleBackWidth = 0;
    rectangleBackHeight = 0;
    rectangleStartX = 0;
    rectangleStartY = 0;
    rectangleStartMouseX = 0;
    rectangleStartMouseY = 0;

    if (Utils.isNwjs()) {
      this.pencilMenu.checked = currentTool === Tools.pencil;
      this.rectangleMenu.checked = currentTool === Tools.rectangle;
      this.fillMenu.checked = currentTool === Tools.fill;
      this.puzzleMenu.checked = puzzleMode;
      this.eraserMenu.checked = currentTool === Tools.eraser;

      this.tilePassageMenu.checked = currentTool === Tools.passage;
      this.tilePassage4Menu.checked = currentTool === Tools.passage4;
      this.tileLadderMenu.checked = currentTool === Tools.ladder;
      this.tileBushMenu.checked = currentTool === Tools.bush;
      this.tileCounterMenu.checked = currentTool === Tools.counter;
      this.tileDamageMenu.checked = currentTool === Tools.damage;
      this.tileTerrainMenu.checked = currentTool === Tools.terrain;
    }

    this.refreshMapEditor();
  }

  static pencilButton() {
    this.toolButton(Tools.pencil);
  }

  static rectangleButton() {
    this.toolButton(Tools.rectangle);
  }

  static fillButton() {
    this.toolButton(Tools.fill);
  }

  static eraserButton() {
    this.toolButton(Tools.eraser);
  }

  static puzzleButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    puzzleMode = !puzzleMode;
    if (puzzleMode) {
      if (currentTool !== Tools.eraser) {
        currentTool = Tools.pencil;
      }
      if (CycloneMapEditor.currentLayer !== 1) {
        this.changeCurrentLayer(1);
      }
    }
    this.clearSelection();
    this.updateCurrentTool();
  }

  static toolButton(toolType) {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (puzzleMode && ![Tools.pencil, Tools.eraser].includes(toolType)) {
      return;
    }

    currentTool = toolType;
    if ([Tools.pencil, Tools.rectangle].includes(toolType)) {
      lastDrawingTool = toolType;
    }
    this.updateCurrentTool();
  }

  static _doWebSave(json, fileName) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${ encodeURIComponent(json) }`);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static _doLocalSave(json, fileName) {
    const fs = require('fs');
    const path = require('path');

    const projectFolder = path.dirname(process.mainModule.filename);
    const dataFolder = path.join(projectFolder, 'data');

    const filePath = path.join(dataFolder, fileName);

    fs.writeFileSync(filePath, json);
  }

  static _makeMapJson() {
    const map = {
      ...$dataMap,
      data: [
        ...$dataMap.data,
      ]
    };

    const size = map.width * map.height;
    const extraTiles = new Array(size * 4);
    let anyExtraTile = false;

    for (let i = 0; i < extraTiles.length; i++) {
      if (map.data[i] >= Tilemap.TILE_ID_E + 256 && map.data[i] < Tilemap.TILE_ID_A5) {
        extraTiles[i] = map.data[i];
        map.data[i] = 0;
        anyExtraTile = true;
      } else if (map.data[i] >= Tilemap.TILE_ID_A5 + 256 && map.data[i] < Tilemap.TILE_ID_A1) {
        extraTiles[i] = map.data[i];
        map.data[i] = 0;
        anyExtraTile = true;
      } else {
        extraTiles[i] = 0;
      }
    }

    let extraTilesTag = '';

    if (anyExtraTile) {
      const compressed = LZString.compressToBase64(JSON.stringify(extraTiles, null, 0));

      extraTilesTag = `<CycloneExtraTiles>${ compressed }</CycloneExtraTiles>`;
    }

    if (map.note?.includes('<CycloneExtraTiles>')) {
      map.note = map.note.replace(/<CycloneExtraTiles>.*<\/CycloneExtraTiles>/i, extraTilesTag);
    } else {
      map.note = `${ map.note ?? ''}\n${ extraTilesTag }`;
    }

    return JSON.stringify(map, null, 0);
  }

  static _doSave() {
    this.saveExtraData();

    const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;
    const json = this._makeMapJson();

    if (Utils.isNwjs()) {
      this._doLocalSave(json, fileName);
    } else {
      this._doWebSave(json, fileName);
    }
    SoundManager.playSave();
  }

  static saveButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (!confirm('Are you sure you want to SAVE the map file?')) {
      SceneManager._scene.refreshMapEditorWindows();
      return;
    }

    SceneManager._scene._mapEditorCommands.hide();

    this._doSave();
    SceneManager._scene.refreshMapEditorWindows();
  }

  static reloadButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (!confirm('Are you sure you want to RELOAD the map file?')) {
      SceneManager._scene.refreshMapEditorWindows();
      return;
    }

    this.clearAllData();
    this.loadMapFile();
  }

  static onKeyPress(event) {
    if (editorActive) {
      if (!Utils.isNwjs()) {
        this.checkScrollKeys(event.key);
      }
    }
  }

  static checkWebShortcuts(key) {
    switch (key) {
      case 'e':
        return this.eraserButton();
      case 'r':
        return this.rectangleButton();
      case 'p':
        return this.pencilButton();
      case 'f':
        return this.fillButton();
    }

  }

  static checkControlKeys(code) {
    switch (code) {
      case 'KeyZ':
        this.undoButton();
        return true;
      case 'KeyY':
        this.redoButton();
        return true;
      case 'KeyS':
        this.saveButton();
        return true;
      case 'KeyR':
        this.reloadButton();
        return true;
      case 'KeyG':
        this.showGridButton();
        return true;
    }
  }

  static onKeyUp(event) {
    if (!Utils.isNwjs()) {
      if (Input.isPressed('shift') || Input.isPressed('control')) {
        if (this.checkControlKeys(event.code)) {
          event.preventDefault();
        }
        return;
      }

      this.checkWebShortcuts(event.key);
      this.checkLayerKeys(event.key);
    }

    if (event.key === 'h') {
      this.toggleMapEditor();
      return;
    }

    this.checkNumKeys(event.code);
  }

  static toggleMapEditor() {
    if (this.resizeTimeout) {
      return;
    }

    const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    scene.toggleMapEditor();
  }

  static refreshMapEditor() {
    const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    scene.refreshMapEditorWindows();
  }

  static getTileIdTilesetIndex(tileId) {
    if (tileId !== 0) {
      if (!Tilemap.isVisibleTile(tileId)) {
        return -1;
      }
    }

    return getTilesetIndex(tileId);
  }

  static getTilesetName(tileId) {
    const tileset = $gameMap.tileset();
    if (!tileset) {
      return;
    }

    const tilesetIndex = this.getTileIdTilesetIndex(tileId);
    if (tilesetIndex < 0) {
      return;
    }

    if (tilesetIndex < tileset.tilesetNames.length) {
      return tileset.tilesetNames[tilesetIndex];
    }

    if (!window.CycloneExtraTilesets) {
      return;
    }

    const extraTileset = $gameMap.extraTileset();
    if (!extraTileset) {
      return;
    }

    const extraIndex = tilesetIndex - 9;
    const newIndex = extraIndex + 5;

    return extraTileset.tilesetNames[newIndex];
  }

  static loadTilesetBitmap(tileId) {
    const realFileName = this.getTilesetName(tileId);
    if (realFileName) {
      return ImageManager.loadTileset(realFileName);
    }
  }

  static deselectShadowOrRegion(newLayerIndex) {
    // coming from or to shadows/regions, then de-select the current index
    if (currentLayer === 4 || currentLayer === 5 || newLayerIndex === 4 || newLayerIndex === 5) {
      this.clearSelection();
    }
  }

  static changeCurrentLayer(newIndex) {
    if (newIndex >= layerVisibility.length) {
      return;
    }

    if (newIndex !== 1 && puzzleMode) {
      puzzleMode = false;
      this.updateCurrentTool();
    }

    this.deselectShadowOrRegion(newIndex);

    currentLayer = newIndex;
    if (Utils.isNwjs()) {
      this.layer1Button.checked = newIndex === 0;
      this.layer2Button.checked = newIndex === 1;
      this.layer3Button.checked = newIndex === 2;
      this.layer4Button.checked = newIndex === 3;
      this.shadowsButton.checked = newIndex === 4;
      this.regionsButton.checked = newIndex === 5;
      this.eventsButton.checked = newIndex === 6;
      this.autoLayerButton.checked = newIndex === 7;
      this.collisionsButton.checked = newIndex === 8;
      this.tagsButton.checked = newIndex === 9;
      this.blendButton.checked = newIndex === 10;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorLayerListWindow.refresh();
      SceneManager._scene._mapEditorWindow.refresh();
      SceneManager._scene._mapEditorStatus.refresh();
      SceneManager._scene._mapEditorGrid.refresh();
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }
  }

  static changeCurrentTab(tabLetter) {
    currentTab = tabLetter;
    this.refreshMapEditor();
  }

  static tileIndex(x, y, z) {
    return (z * $gameMap.height() + (y % $gameMap.height())) * $gameMap.width() + (x % $gameMap.width());
  }

  static indexPositionX(index, z) {
    const y = this.indexPositionY(index, z);
    return index - this.tileIndex(0, y, z);
  }

  static indexPositionY(index, z) {
    return Math.floor((index / $gameMap.width()) - (z * $gameMap.height()));
  }

  static getCurrentTileAtPosition(x, y, z, skipPreview = true) {
    if (x < 0 || y < 0 || x >= $gameMap.width() || y >= $gameMap.height()) {
      return 0;
    }

    const tileIndex = this.tileIndex(x, y, z);
    if (!skipPreview) {
      if (previewChanges[tileIndex] !== undefined) {
        return previewChanges[tileIndex];
      }
    }

    return $dataMap.data[tileIndex] ?? 0;
  }

  static isSameKindTile(tileId, x, y, z, skipPreview = true) {
    return Tilemap.isSameKindTile(tileId, this.getCurrentTileAtPosition(x, y, z, skipPreview));
  }

  static getWallColumnTypeForPosition(x, y, z, tileId, skipPreview = true) {
    // wall auto tiles need the left and right columns to have the same amount of rows for it to match
    let hasLeftColumn = true;
    let hasRightColumn = true;

    const compareWallAutoTileLine = (newY, sameCenter) => {
      const leftTileId = this.getCurrentTileAtPosition(x -1, newY, z, skipPreview);
      const rightTileId = this.getCurrentTileAtPosition(x + 1, newY, z, skipPreview);

      if (sameCenter) {
        if (!Tilemap.isSameKindTile(tileId, leftTileId)) {
          hasLeftColumn = false;
        }
        if (!Tilemap.isSameKindTile(tileId, rightTileId)) {
          hasRightColumn = false;
        }
      } else {
        if (Tilemap.isSameKindTile(tileId, leftTileId)) {
          hasLeftColumn = false;
        }
        if (Tilemap.isSameKindTile(tileId, rightTileId)) {
          hasRightColumn = false;
        }
      }
    };

    for (let newY = y; y < $gameMap.height(); y++) {
      const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
      const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
      compareWallAutoTileLine(newY, sameCenter);
      if (!sameCenter) {
        break;
      }
    }

    for (let newY = y -1; y >= 0; y--) {
      const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
      const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
      compareWallAutoTileLine(newY, sameCenter);
      if (!sameCenter) {
        break;
      }
    }

    if (hasLeftColumn) {
      if (hasRightColumn) {
        return 1;
      }

      return 2;
    }

    if (hasRightColumn) {
      return 0;
    }

    return 3;
  }

  static getWaterfallShapeForPosition(x, y, z, tileId, skipPreview = true) {
    const left = this.isSameKindTile(tileId, x - 1, y, z, skipPreview);
    const right = this.isSameKindTile(tileId, x + 1, y, z, skipPreview);

    if (left && right) {
      return 0;
    }

    if (left) {
      return 1;
    }

    if (right) {
      return 2;
    }

    return 3;
  }

  static getWallShapeForPosition(x, y, z, tileId, skipPreview = true) {
    const columnType = this.getWallColumnTypeForPosition(x, y, z, tileId, skipPreview);

    let shape = 0;
    const above = this.isSameKindTile(tileId, x, y -1, z, skipPreview);
    const below = this.isSameKindTile(tileId, x, y +1, z, skipPreview);

    if (above && below) {
      shape = 0;
    } else if (above) {
      shape = 8;
    } else if (below) {
      shape = 2;
    } else {
      shape = 10;
    }

    switch (columnType) {
      case 0:
        shape += 1;
        break;
      case 2:
        shape += 4;
        break;
      case 3:
        shape += 5;
        break;
    }

    return shape;
  }

  static getShapeForConfiguration(configuration) {
    for (let shape = 0; shape < autoTileShapeTable.length; shape++) {
      const shapeData = autoTileShapeTable[shape];
      let valid = true;

      for (let i = 0; i < configuration.length; i++) {
        const config = shapeData[i];

        if (config === true) {
          if (!configuration[i]) {
            valid = false;
            break;
          }
        } else if (config === false) {
          if (configuration[i]) {
            valid = false;
            break;
          }
        }
      }

      if (valid) {
        return shape;
      }
    }

    return 46;
  }


  static isAutotileMatch(tileId, x, y, z, skipPreview = true) {
    if (!$gameMap.isValid(x, y)) {
      return true;
    }

    const otherTileId = this.getCurrentTileAtPosition(x, y, z, skipPreview);

    if (Tilemap.isSameKindTile(tileId, otherTileId)) {
      return true;
    }

    const specialTiles = [5, 7, 13];
    const leftKind = Tilemap.getAutotileKind(tileId);
    const rightKind = Tilemap.getAutotileKind(otherTileId);

    const leftSpecial = specialTiles.includes(leftKind);
    const rightSpecial = specialTiles.includes(rightKind);
    if (leftSpecial !== rightSpecial) {
      return true;
    }

    return false;
  }

  static getAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
    if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
      return this.getWallShapeForPosition(x, y, z, tileId, skipPreview);
    }

    if (Tilemap.isWaterfallTile(tileId)) {
      return this.getWaterfallShapeForPosition(x, y, z, tileId, skipPreview);
    }

    const a = this.isAutotileMatch(tileId, x -1, y -1, z, skipPreview);
    const b = this.isAutotileMatch(tileId, x, y -1, z, skipPreview);
    const c = this.isAutotileMatch(tileId, x +1, y -1, z, skipPreview);

    const d = this.isAutotileMatch(tileId, x -1, y, z, skipPreview);
    const e = this.isAutotileMatch(tileId, x +1, y, z, skipPreview);

    const f = this.isAutotileMatch(tileId, x -1, y +1, z, skipPreview);
    const g = this.isAutotileMatch(tileId, x, y +1, z, skipPreview);
    const h = this.isAutotileMatch(tileId, x +1, y +1, z, skipPreview);

    const config = [a, b, c, d, e, f, g, h];
    return this.getShapeForConfiguration(config);
  }

  static isShiftMapping() {
    if (Input.isPressed('shift')) {
      return true;
    }

    if (SceneManager._scene._mapEditorWindow._manualTileSelected !== undefined) {
      return true;
    }

    return false;
  }

  static changeAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
    if (z >= 4 || this.isShiftMapping()) {
      return tileId;
    }

    const shape = this.getAutoTileShapeForPosition(x, y, z, tileId, skipPreview);
    return Tilemap.TILE_ID_A1 + Math.floor((tileId - Tilemap.TILE_ID_A1) / 48) * 48 + shape;
  }

  static resetTileShape(x, y, z, previewOnly = false) {
    if (x < 0 || x >= $gameMap.width()) {
      return;
    }

    if (y < 0 || y >= $gameMap.height()) {
      return;
    }

    const tileId = this.getCurrentTileAtPosition(x, y, z, !previewOnly);
    if (Tilemap.isAutotile(tileId)) {
      const effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, !previewOnly);
      if (tileId !== effectiveTileId) {
        this.setMapTile(x, y, z, effectiveTileId, false, previewOnly);
      }
    }
  }

  static resetCurrentChange() {
    currentChange = {
      tiles: {},
      collision: {},
      blend: {},
      puzzle: {},
    };
  }

  static undoLastChange() {
    if (this.changingTileProps) {
      return;
    }

    if (changeHistory.length === 0) {
      SoundManager.playBuzzer();
      return;
    }

    const lastChange = changeHistory.pop();
    this.resetCurrentChange();

    const size = $gameMap.tileWidth() * $gameMap.tileHeight();

    for (const tileIndex in lastChange.tiles) {
      currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
      $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
    }

    for (const tileIndex in lastChange.puzzle) {
      currentChange.puzzle[tileIndex] = CycloneMagic.puzzleTiles[tileIndex];
      CycloneMagic.puzzleTiles[tileIndex] = lastChange.puzzle[tileIndex];
    }

    for (const tileIndex in lastChange.collision) {
      currentChange.collision[tileIndex] = customCollisionTable[tileIndex];
      customCollisionTable[tileIndex] = lastChange.collision[tileIndex];
    }

    for (const tileIndex in lastChange.blend) {
      if (!tileBlendingTable[tileIndex]) {
        const buffer = new ArrayBuffer(size);
        tileBlendingTable[tileIndex] = new Int8Array(buffer);
      }

      const tilePixels = tileBlendingTable[tileIndex];
      currentChange.blend[tileIndex] = {};
      for (const pixelIndex in lastChange.blend[tileIndex]) {
        currentChange.blend[tileIndex][pixelIndex] = tilePixels[pixelIndex];
        tilePixels[pixelIndex] = lastChange.blend[tileIndex][pixelIndex];
      }
    }

    undoHistory.push(currentChange);
    currentChange = false;
    SceneManager._scene._mapEditorCommands.redraw();
    SceneManager._scene._mapEditorGrid.refresh();

    mapCaches[$gameMap._mapId] = $dataMap;
    this.refreshTilemap();
    saveExtraData(true);
  }

  static redoLastUndoneChange() {
    if (this.changingTileProps) {
      return;
    }

    if (undoHistory.length === 0) {
      SoundManager.playBuzzer();
      return;
    }

    const lastChange = undoHistory.pop();
    const size = $gameMap.tileWidth() * $gameMap.tileHeight();
    this.resetCurrentChange();
    let needsSaving = false;

    for (const tileIndex in lastChange.tiles) {
      currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
      $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
    }

    for (const tileIndex in lastChange.puzzle) {
      currentChange.puzzle[tileIndex] = CycloneMagic.puzzleTiles[tileIndex];
      CycloneMagic.puzzleTiles[tileIndex] = lastChange.puzzle[tileIndex];
    }

    for (const tileIndex in lastChange.collision) {
      currentChange.collision[tileIndex] = customCollisionTable[tileIndex];
      customCollisionTable[tileIndex] = lastChange.collision[tileIndex];
      needsSaving = true;
    }

    for (const tileIndex in lastChange.blend) {
      if (!tileBlendingTable[tileIndex]) {
        const buffer = new ArrayBuffer(size);
        tileBlendingTable[tileIndex] = new Int8Array(buffer);
      }

      const tilePixels = tileBlendingTable[tileIndex];
      currentChange.blend[tileIndex] = {};
      for (const pixelIndex in lastChange.blend[tileIndex]) {
        currentChange.blend[tileIndex][pixelIndex] = tilePixels[pixelIndex];
        tilePixels[pixelIndex] = lastChange.blend[tileIndex][pixelIndex];
        needsSaving = true;
      }
    }

    this.logChange(false);
    if (needsSaving) {
      saveExtraData(true);
    }
    this.refreshTilemap();
  }

  static getCurrentLayerChangeType() {
    switch (currentLayer) {
      case Layers.collisions:
        return 'collision';
      case Layers.blend:
        return 'blend';
      default:
        return 'tile';
    }
  }

  static logChange(clearUndo = true) {
    if (!currentChange) {
      return;
    }
    const hasTiles = Object.keys(currentChange.tiles).length > 0;
    const hasBlend = Object.keys(currentChange.blend).length > 0;
    const hasCollision = Object.keys(currentChange.collision).length > 0;
    const hasPuzzle = Object.keys(currentChange.puzzle).length > 0;
    const hasChanges = hasTiles || hasBlend || hasCollision || hasPuzzle;

    if (hasChanges) {
      changeHistory.push(currentChange);
      if (clearUndo) {
        undoHistory = [];
      }
    }
    currentChange = false;

    while (changeHistory.length > 300) {
      changeHistory.shift();
    }

    SceneManager._scene._mapEditorCommands.redraw();
    SceneManager._scene._mapEditorGrid.refresh();

    mapCaches[$gameMap._mapId] = $dataMap;

    fullRefresh();
  }

  static maybeUpdateTileNeighbors(x, y, z, expectedUpdate = true, previewOnly = false) {
    if (this.isShiftMapping()) {
      return;
    }

    if (!expectedUpdate) {
      return;
    }

    this.resetTileShape(x -1, y -1, z, previewOnly);
    this.resetTileShape(x, y -1, z, previewOnly);
    this.resetTileShape(x +1, y -1, z, previewOnly);

    this.resetTileShape(x -1, y, z, previewOnly);
    this.resetTileShape(x +1, y, z, previewOnly);

    this.resetTileShape(x -1, y +1, z, previewOnly);
    this.resetTileShape(x, y + 1, z, previewOnly);
    this.resetTileShape(x +1, y +1, z, previewOnly);
  }

  static getDefaultLayerForTileId(tileId) {
    if (!Tilemap.isAutotile(tileId)) {
      return 3;
    }

    if (tileId >= Tilemap.TILE_ID_A3) {
      return 0;
    }

    const kind = Tilemap.getAutotileKind(tileId);
    if (highLayerAutotiles.includes(kind)) {
      return 1;
    }

    return 0;
  }

  static getItemsToChange(x, y, z, tileId, skipPreview = true, updateHigherLayers = true) {
    if (z !== 7) {
      return [{
        x,
        y,
        z,
        tileId,
      }];
    }

    // When using automatic mode, we may need to change more than one layer at the same time
    const items = [];
    let layerId = this.getDefaultLayerForTileId(tileId);

    if (layerId === 1 && Tilemap.isTileA1(tileId)) {
      items.push({
        x,
        y,
        z: 0,
        tileId: Tilemap.TILE_ID_A1,
      });
    }

    if (layerId === 3) {
      // If there's already something on the fourth layer, then move it to the third and place the new tile on the 4th
      const currentTile = this.getCurrentTileAtPosition(x, y, 3, skipPreview);
      if (currentTile === tileId && tileId !== 0) {
        return [];
      }

      if (currentTile) {
        items.push({
          x,
          y,
          z: 2,
          tileId: currentTile,
        });
      }
    }

    items.push({
      x,
      y,
      z: layerId,
      tileId,
    });

    // Remove anything above the new tile
    if (updateHigherLayers) {
      for (let i = layerId + 1; i <= 3; i++) {
        items.push({
          x,
          y,
          z: i,
          tileId: 0,
        });
      }
    }

    return items;
  }

  static canEraseLayer(layerIndex) {
    if (currentTool === 'eraser') {
      return true;
    }

    if (layerIndex >= 2) {
      return true;
    }

    if (multiLayerSelection.length) {
      return true;
    }

    if (currentLayer !== Layers.auto) {
      return true;
    }

    // The lower layers can only be erased with the pen in auto mode when there are multiple layers selected
    return false;
  }

  static _eraseSingleLayerTile(x, y, z, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (!forceErasure && !this.canEraseLayer(z)) {
      return;
    }

    const tileIndex = this.tileIndex(x, y, z);
    if (previewOnly) {
      previewChanges[tileIndex] = 0;
    } else {
      const oldTile = $dataMap.data[tileIndex];
      if (currentChange.tiles[tileIndex] === undefined && oldTile !== 0) {
        currentChange.tiles[tileIndex] = oldTile;
      }

      $dataMap.data[tileIndex] = 0;
    }
  }

  static _eraseSingleMapTile(x, y, z, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (z > 3 && z !== Layers.auto) {
      this._eraseSingleLayerTile(x, y, z, updateNeighbors, previewOnly, forceErasure);
      return;
    }

    for (let newZ = 0; newZ <= 3; newZ++) {
      if (newZ !== z && z !== Layers.auto) {
        continue;
      }

      this._eraseSingleLayerTile(x, y, newZ, updateNeighbors, previewOnly, forceErasure);
      this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
    }
  }

  // eslint-disable-next-line complexity
  static _getBlockCollision(i, j, count, tileId) {
    if (tileId <= 3) {
      return tileId;
    }

    let goesUp = false;
    let goesDown = false;
    let goesRight = false;
    let goesLeft = false;

    if (tileId >= 20) {
      const d = tileId - 20;
      goesUp = !DirectionHelper.goesUp(d);
      goesDown = !DirectionHelper.goesDown(d);
      goesLeft = !DirectionHelper.goesLeft(d);
      goesRight = !DirectionHelper.goesRight(d);
    } else if (tileId > 10) {
      const d = tileId - 10;
      goesUp = DirectionHelper.goesUp(d);
      goesDown = DirectionHelper.goesDown(d);
      goesLeft = DirectionHelper.goesLeft(d);
      goesRight = DirectionHelper.goesRight(d);
    } else if (tileId === 4) {
      goesUp = true;
      goesDown = true;
    } else if (tileId === 5) {
      goesLeft = true;
      goesRight = true;
    }

    const up = goesUp && j === 0;
    const down = goesDown && j === count -1;
    const left = goesLeft && i === 0;
    const right = goesRight && i === count - 1;

    if (up) {
      if (left) {
        if (right) {
          if (down) {
            return 20;
          }

          return 22;
        }

        if (down) {
          return 26;
        }

        return 17;
      }

      if (right) {
        if (down) {
          return 24;
        }

        return 19;
      }

      if (down) {
        return 4;
      }
      return 18;
    }

    if (down) {
      if (left) {
        if (right) {
          return 28;
        }

        return 11;
      }

      if (right) {
        return 13;
      }
      return 12;
    }

    if (left) {
      if (right) {
        return 5;
      }

      return 14;
    }

    if (right) {
      return 16;
    }

    return 1;
  }

  static _applySingleCollision(x, y, tileId, previewOnly = false) {
    if (previewOnly) {
      return;
    }

    const gridRatio = this.getGridRatio();
    const count = 4 / gridRatio;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const intX = Math.floor(x * 4) + i;
        const intY = Math.floor(y * 4) + j;
        const height = $gameMap.height() * 4;
        const width = $gameMap.width() * 4;
        const index = (intY % height) * width + (intX % width);

        const blockCollision = this._getBlockCollision(i, j, count, tileId);
        const oldTile = customCollisionTable[index] || 0;
        if (currentChange.collision[index] === undefined && oldTile !== blockCollision) {
          currentChange.collision[index] = oldTile;
        }

        if (!blockCollision) {
          delete customCollisionTable[index];
          continue;
        }

        customCollisionTable[index] = blockCollision;
      }
    }
  }

  static _changePixelPositionBlend(x, y, px, py, newBlend, previewOnly = false) {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const fx = Math.floor(x) + Math.floor(px / tileWidth);
    const fy = Math.floor(y) + Math.floor(py / tileHeight);
    const pixelX = px % tileWidth;
    const pixelY = py % tileHeight;

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    const size = tileWidth * tileHeight;

    const fullTable = previewOnly ? window.CycloneMagic.tileBlendingTable : tileBlendingTable;
    if (!fullTable[tileIndex]) {
      const buffer = new ArrayBuffer(size);
      fullTable[tileIndex] = new Int8Array(buffer);
    }
    const table = fullTable[tileIndex];

    const pixelIndex = pixelY * tileWidth + pixelX;

    if (currentChange.blend[tileIndex]?.[pixelIndex] === undefined && (table[pixelIndex] ?? 0) !== newBlend) {
      if (currentChange.blend[tileIndex] === undefined) {
        currentChange.blend[tileIndex] = {};
      }

      currentChange.blend[tileIndex][pixelIndex] = (table[pixelIndex] ?? 0);
    }

    table[pixelIndex] = newBlend;
  }

  static _changePositionBlend(x, y, newBlend) {
    const fx = Math.floor(x);
    const fy = Math.floor(y);
    const tileIndex = this.tileIndex(fx, fy, 0);
    const gridRatio = this.getGridRatio();
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const size = tileWidth * tileHeight;

    if (!tileBlendingTable[tileIndex]) {
      const buffer = new ArrayBuffer(size);
      tileBlendingTable[tileIndex] = new Int8Array(buffer);
    }
    const table = tileBlendingTable[tileIndex];
    const subX = x - fx;
    const subY = y - fy;

    const leftPx = Math.round(subX * tileWidth);
    const topPx = Math.round(subY * tileHeight);
    const blockWidth = Math.floor(tileWidth / gridRatio);
    const blockHeight = Math.floor(tileHeight / gridRatio);

    const rightPx = leftPx + blockWidth;
    const bottomPx = topPx + blockHeight;

    for (let px = leftPx; px < rightPx; px++) {
      for (let py = topPx; py < bottomPx; py++) {
        const pixelIndex = py * tileWidth + px;

        if (currentChange.blend[tileIndex]?.[pixelIndex] === undefined && (table[pixelIndex] ?? 0) !== newBlend) {
          if (currentChange.blend[tileIndex] === undefined) {
            currentChange.blend[tileIndex] = {};
          }

          currentChange.blend[tileIndex][pixelIndex] = (table[pixelIndex] ?? 0);
        }

        table[pixelIndex] = newBlend;
      }
    }
  }

  static isPositionBlendSpriteReady(x, y) {
    if (!SceneManager._scene._spriteset?._blenderTileSprites) {
      return false;
    }

    for (const sprite of SceneManager._scene._spriteset._blenderTileSprites) {
      if (sprite._mapX === x && sprite._mapY === y) {
        return true;
      }
    }

    return false;
  }

  static forceBlenderRefresh(hardRefresh = false) {
    if (!window.CycloneMagic) {
      return;
    }

    SceneManager._scene._spriteset?.forceBlenderRefresh && SceneManager._scene._spriteset.forceBlenderRefresh(hardRefresh);
  }

  static buildSmallCircle() {
    const width = tileWidth / 4;
    const height = tileHeight / 4;
    const bitmap = new Bitmap(width, height);
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 2, '#00FF00');

    const imageData = bitmap.context.getImageData(0, 0, width, height);
    smallCircleData = imageData.data;
  }

  static buildCircle() {
    const width = tileWidth / 2;
    const height = tileHeight / 2;
    const bitmap = new Bitmap(width, height);

    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 4, '#00FF00');

    const imageData = bitmap.context.getImageData(0, 0, width, height);
    circleData = imageData.data;
  }

  static getCircleData() {
    if (circleData) {
      if (Input.isPressed('shift')) {
        return smallCircleData;
      }

      return circleData;
    }

    this.buildSmallCircle();
    this.buildCircle();

    return this.getCircleData();
  }

  static optimizeBlends() {
    this.resetCurrentChange();

    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        this.optimizeTileBlend(x, y);
      }
    }

    this.logChange(true);
  }

  static removeAllBlends() {
    this.resetCurrentChange();
    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        this.removeTileBlend(x, y, false);
      }
    }

    this.logChange(true);
  }

  static optimizeTileBlend(x, y) {
    const fx = Math.floor(x);
    const fy = Math.floor(y);

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    if (!tileBlendingTable[tileIndex]) {
      return;
    }

    const hasZero = tileBlendingTable[tileIndex].includes(0);
    const hasOne = tileBlendingTable[tileIndex].includes(1);

    if (hasZero === hasOne) {
      return;
    }

    // If it's all blended, then remove whatever tile is on layer 2
    if (hasOne) {
      this._applySingleMapTile(x, y, 1, 0, false, false, true);
    }

    currentChange.blend[tileIndex] = tileBlendingTable[tileIndex];
    delete tileBlendingTable[tileIndex];
  }

  static removeTileBlend(x, y, previewOnly = false) {
    if (previewOnly && !window.CycloneMagic) {
      return;
    }

    const fx = Math.floor(x);
    const fy = Math.floor(y);

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    if (previewOnly) {
      if (window.CycloneMagic.tileBlendingTable[tileIndex]) {
        delete window.CycloneMagic.tileBlendingTable[tileIndex];
      }
      return;
    }

    if (tileBlendingTable[tileIndex]) {
      currentChange.blend[tileIndex] = tileBlendingTable[tileIndex];
      delete tileBlendingTable[tileIndex];
    }
  }

  static _applyBlendBrush(x, y, previewOnly = false) {
    if (previewOnly && !window.CycloneMagic) {
      return;
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const divider = Input.isPressed('shift') ? 4 : 2;
    const width = tileWidth / divider;
    const height = tileHeight / divider;
    const pixels = this.getCircleData();

    let index = -1;

    const tileX = Math.floor(x);
    const tileY = Math.floor(y);
    const pixelX = Math.floor((x - tileX) * tileWidth);
    const pixelY = Math.floor((y - tileY) * tileHeight);
    const newBlend = currentTool === Tools.eraser ? 0 : 1;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        index++;

        if (pixels[index * 4 + 1] > 0) {
          this._changePixelPositionBlend(x, y, pixelX + px, pixelY + py, newBlend, previewOnly);
        } else if (pixels[index * 4 + 2] > 0) {
          if (Math.randomInt(10) > 5) {
            this._changePixelPositionBlend(x, y, pixelX + px, pixelY + py, newBlend, previewOnly);
          }
        }
      }
    }

    if (previewOnly) {
      forceBlenderRefresh();
    } else {
      // Let's do a quick refresh first and then save the data a little later
      if (window.CycloneMagic) {
        window.CycloneMagic.tileBlendingTable = tileBlendingTable;
        const maxTileX = tileX + Math.floor((pixelX + width) / tileWidth);
        const maxTileY = tileY + Math.floor((pixelY + height) / tileHeight);

        if (window.CycloneMagic) {
          for (let cacheX = tileX; cacheX <= maxTileX; cacheX++) {
            for (let cacheY = tileY; cacheY <= maxTileY; cacheY++) {
              window.CycloneMagic.clearPositionCache(cacheX, cacheY);
            }
          }
        }

        forceBlenderRefresh();
      }
    }
  }

  static _applySingleBlend(x, y) {
    if (currentTool === Tools.eraser) {
      this._changePositionBlend(x, y, 0);
      return;
    }

    this._changePositionBlend(x, y, 1);
  }

  static _applyPuzzleTile(x, y, tileId, previewOnly) {
    if (!window.CycloneMagic?.puzzleTiles) {
      return;
    }
    if (previewOnly) {
      return;
    }

    const width = $gameMap.width() * 2;
    const index = (y * 2) * width + x * 2;

    const oldTile = CycloneMagic.puzzleTiles[index] ?? 0;
    if (currentChange.puzzle[index] === undefined && oldTile !== tileId) {
      currentChange.puzzle[index] = oldTile;
    }

    if (tileId) {
      CycloneMagic.puzzleTiles[index] = tileId;
    } else if (CycloneMagic.puzzleTiles[index]) {
      delete CycloneMagic.puzzleTiles[index];
    }
  }

  static _applySingleMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (z === Layers.collisions) {
      return this._applySingleCollision(x, y, tileId, previewOnly);
    }

    if (z === 1 && puzzleMode) {
      this._applyPuzzleTile(x, y, tileId, previewOnly);
      return;
    }

    if (!tileId) {
      this._eraseSingleMapTile(x, y, z, updateNeighbors, previewOnly, forceErasure);
      return;
    }

    const itemsToChange = this.getItemsToChange(x, y, z, tileId, !previewOnly, updateNeighbors);
    for (const {x, y, z, tileId} of itemsToChange) {
      if (z > 5) {
        continue;
      }
      const tileIndex = this.tileIndex(x, y, z);
      let effectiveTileId = tileId;
      if (Tilemap.isAutotile(tileId)) {
        effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, false);
      }

      if (z === 1) {
        this.removeTileBlend(x, y, previewOnly);
      }

      if (previewOnly) {
        previewChanges[tileIndex] = effectiveTileId;
      } else {
        const oldTile = $dataMap.data[tileIndex];
        if (currentChange.tiles[tileIndex] === undefined && oldTile !== effectiveTileId) {
          currentChange.tiles[tileIndex] = oldTile;
        }

        $dataMap.data[tileIndex] = effectiveTileId;
      }

      this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
    }
  }

  static setMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false) {
    if (!$gameMap.isValid(x, y)) {
      return;
    }

    if (currentLayer === Layers.blend) {
      if (!previewOnly) {
        CycloneMapEditor._applySingleBlend(x, y);
      }
      return;
    }

    if (currentTool !== 'eraser') {
      if (tileId === undefined ) {
        return;
      }

      if (tileId === 0 && !this.canEraseLayer(z)) {
        return;
      }
    }

    this._applySingleMapTile(x, y, z, tileId, updateNeighbors, previewOnly);
  }

  static getSelectedTileIndex(col, row) {
    if (currentTool === 'eraser') {
      return;
    }

    if (currentTileId === undefined) {
      return;
    }

    if (selectedTileList.length < tileCols * tileRows) {
      return;
    }

    const realCol = col % tileCols;
    const realRow = row % tileRows;
    return realRow * tileCols + realCol;
  }

  static getSelectedTileCell(col, row) {
    const index = this.getSelectedTileIndex(col, row);
    if (index || index === 0) {
      return selectedTileList[index];
    }
  }

  static setSelectionTileMaybeMultiLayer(tileX, tileY, selectionCol, selectionRow, previewOnly = false, effectiveLayer = undefined) {
    effectiveLayer = effectiveLayer ?? currentLayer;
    const index = this.getSelectedTileIndex(selectionCol, selectionRow);

    if (effectiveLayer === 7 && multiLayerSelection.length) {
      for (let z = 0; z <= 3; z++) {
        const tileId = multiLayerSelection[z][index] ?? 0;
        this.setMapTile(tileX, tileY, z, tileId, true, previewOnly);
      }
    } else {
      const tileId = selectedTileList[index] ?? 0;
      this.setMapTile(tileX, tileY, effectiveLayer, tileId, true, previewOnly);

      if (effectiveLayer === 2 && currentLayer === 7 && currentTool === 'eraser') {
        this.setMapTile(tileX, tileY, 3, 0, true, previewOnly);
      }
    }
  }

  static canApplyRectangle() {
    return currentTileId !== undefined || currentTool === 'eraser' || currentLayer === Layers.blend;
  }

  static isAutoEraser() {
    return currentLayer === Layers.auto && currentTool === 'eraser' && !Input.isPressed('shift');
  }

  static getHighestLayerOnArea(startX, startY, width, height) {
    const highestLayer = (() => {
      for (let z = 3; z >= 1; z--) {
        for (let tileY = startY; tileY < startY + height; tileY++) {
          for (let tileX = startX; tileX < startX + width; tileX++) {
            const tileIndex = this.tileIndex(tileX, tileY, z);
            const tileId = $dataMap.data[tileIndex];

            if (tileId > 0) {
              return z;
            }
          }
        }
      }

      return 0;
    })();

    if (highestLayer === 3 && Input.isPressed('control')) {
      return 2;
    }

    return highestLayer;
  }

  static applyRectangle(startX, startY, width, height, previewOnly = false) {
    if (!this.canApplyRectangle()) {
      return;
    }

    this.ensureLayerVisibility();
    const gridRatio = this.getGridRatio();
    let initialRow = 0;
    let initialCol = 0;
    let rowIncrement = 1;
    let colIncrement = 1;

    if (rectangleBackWidth > 0) {
      initialCol = (width * gridRatio) - 1;
      colIncrement *= -1;
    }

    if (rectangleBackHeight > 0) {
      initialRow = (height * gridRatio) - 1;
      rowIncrement *= -1;
    }

    let selectionRow = initialRow;
    let selectionCol = initialCol;

    if (previewOnly) {
      previewChanges = {};
    } else {
      this.resetCurrentChange();
    }

    let effectiveLayer = currentLayer;
    if (this.isAutoEraser()) {
      effectiveLayer = this.getHighestLayerOnArea(startX, startY, width, height);
    }

    const tileIncrement = 1 / gridRatio;

    for (let tileY = startY; tileY < startY + height; tileY += tileIncrement) {
      selectionCol = initialCol;
      for (let tileX = startX; tileX < startX + width; tileX += tileIncrement) {
        this.setSelectionTileMaybeMultiLayer(tileX, tileY, selectionCol, selectionRow, previewOnly, effectiveLayer);
        selectionCol += colIncrement;
      }
      selectionRow += rowIncrement;
    }

    if (previewOnly) {
      SceneManager._scene._spriteset._tilemap.refresh();
      this.maybeRefreshGrid();
    } else {
      this.logChange();
      this.refreshTilemap();
    }
  }

  static maybeRefreshGrid() {
    if (currentLayer !== Layers.regions) {
      return;
    }

    refreshGrid();
  }

  static refreshTilemap() {
    previewChanges = {};
    if (currentLayer === Layers.collisions || currentLayer === Layers.blend) {
      saveExtraData(true);
    }

    if (TouchInput.isLongPressed()) {
      refreshTilemap();
    } else {
      SceneManager._scene._spriteset._tilemap.refresh();
    }
    refreshGrid();
  }

  static copyAutoRectangle(startX, startY, width, height) {
    for (let z = 0; z <= 3; z++) {
      multiLayerSelection[z] = Array(width * height);
    }

    this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
      for (let z = 0; z <= 3; z++) {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        multiLayerSelection[z][index] = $dataMap.data[tileIndex] || 0;
        selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;
        if (currentTileId === undefined) {
          currentTileId = selectedTileList[index];
        }
      }
    });
  }

  static _selectTileIfNoneSelectedYet(tileId) {
    if (currentTileId === undefined) {
      currentTileId = tileId;
    }
  }

  static _shouldSkipRemainingLayersCopy(foundAny, z) {
    if (!foundAny) {
      return false;
    }

    if (Input.isPressed('control')) {
      return z !== 3;
    }

    return true;
  }

  static iterateRectangle(startX, startY, width, height, fn) {
    let index = 0;
    for (let tileY = startY; tileY < startY + height; tileY++) {
      for (let tileX = startX; tileX < startX + width; tileX++) {
        fn(tileX, tileY, index);
        index++;
      }
    }
  }

  static copyHigherAutoRectangle(startX, startY, width, height) {
    for (let z = 0; z <= 3; z++) {
      multiLayerSelection[z] = Array(width * height);
    }

    let foundAny = false;
    for (let z = 3; z >= 0; z--) {
      if (!this.isLayerVisible(z)) {
        continue;
      }

      this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        multiLayerSelection[z][index] = $dataMap.data[tileIndex] || 0;
        selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;
        this._selectTileIfNoneSelectedYet(selectedTileList[index]);

        if ($dataMap.data[tileIndex]) {
          foundAny = true;
        }
      });

      if (this._shouldSkipRemainingLayersCopy(foundAny, z)) {
        return;
      }
    }
  }

  static copyHigherRectangle(startX, startY, width, height) {
    let foundAny = false;

    for (let z = 3; z >= 0; z--) {
      if (!this.isLayerVisible(z)) {
        continue;
      }

      this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        selectedTileList[index] = selectedTileList[index] || $dataMap.data[tileIndex] || 0;
        this._selectTileIfNoneSelectedYet(selectedTileList[index]);
        if ($dataMap.data[tileIndex]) {
          foundAny = true;
        }
      });

      if (this._shouldSkipRemainingLayersCopy(foundAny, z)) {
        return;
      }
    }
  }

  static copyManualRectangle(startX, startY, width, height) {
    this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
      const tileIndex = this.tileIndex(tileX, tileY, currentLayer);
      selectedTileList[index] = $dataMap.data[tileIndex] || 0;
      this._selectTileIfNoneSelectedYet(selectedTileList[index]);
    });
  }

  static copyRectangle(startX, startY, width, height) {
    if (puzzleMode) {
      return;
    }
    if (!wasRightButtonDown) {
      return;
    }
    if (currentLayer === Layers.collisions) {
      return;
    }

    const gridRatio = this.getGridRatio();
    multiLayerSelection = [];
    selectedTileList = Array((width * gridRatio) * (height * gridRatio));
    currentTileId = undefined;

    if (currentLayer === 7) {
      if (Input.isPressed('shift')) {
        this.copyHigherAutoRectangle(startX, startY, width, height);
      } else {
        this.copyAutoRectangle(startX, startY, width, height);
      }
    } else if (Input.isPressed('shift')) {
      this.copyHigherRectangle(startX, startY, width, height);
    } else {
      this.copyManualRectangle(startX, startY, width, height);
    }

    tileCols = width;
    tileRows = height;
    messySelection = true;

    if (currentTool == 'eraser') {
      this.restoreLastDrawingTool();
    }

    this.refreshTilemap();
    SceneManager._scene._mapEditorWindow._manualTileSelected = undefined;
    SceneManager._scene._mapEditorWindow.refresh();
    SceneManager._scene._mapEditorWindow.ensureSelectionVisible();
  }

  static restoreLastDrawingTool() {
    if (lastDrawingTool === 'rectangle') {
      this.rectangleButton();
    } else {
      this.pencilButton();
    }
  }

  static isSameKindTileCurrentLayer(layers, index) {
    const size = $gameMap.width() * $gameMap.height();

    if (currentLayer > 3) {
      for (let z = 0; z <= 3; z++) {
        const tileId = $dataMap.data[index + z * size];
        if (!Tilemap.isSameKindTile(tileId, layers[z])) {
          return false;
        }
      }

      return true;
    }

    const tileId = $dataMap.data[index];
    return Tilemap.isSameKindTile(layers[currentLayer], tileId);
  }

  static _maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds) {
    if (area[index] !== undefined) {
      return;
    }

    const height = $gameMap.height();
    const width = $gameMap.width();

    area[index] = this.isSameKindTileCurrentLayer(initialTileIds, index);

    if (!area[index]) {
      return;
    }

    const workLayer = currentLayer <= 3 ? currentLayer : 0;

    const y = this.indexPositionY(index, workLayer);
    const x = index - this.tileIndex(0, y, workLayer);

    const leftIndex = x > 0 ? this.tileIndex(x - 1, y, workLayer) : -1;
    const rightIndex = x < width -1 ? this.tileIndex(x + 1, y, workLayer) : -1;
    const upIndex = y > 0 ? this.tileIndex(x, y - 1, workLayer) : -1;
    const downIndex = y < height - 1 ? this.tileIndex(x, y + 1, workLayer) : -1;

    const maybeAddIndex = (index) => {
      if (index >= 0 && !list.includes(index)) {
        list.push(index);
      }
    };

    maybeAddIndex(leftIndex);
    maybeAddIndex(rightIndex);
    maybeAddIndex(upIndex);
    maybeAddIndex(downIndex);
  }

  static collectFillAreaFrom(mapX, mapY) {
    const list = [];
    const initialTileIds = [];

    const area = {};

    if (currentLayer === Layers.auto || currentLayer < 4) {
      for (let z = 0; z <= 3; z++) {
        const tileIndex = this.tileIndex(mapX, mapY, z);

        initialTileIds[z] = $dataMap.data[tileIndex];
        if (z === currentLayer || (currentLayer === 7 && z === 0)) {
          list.push(tileIndex);
        }
      }

      for (let i = 0; i < list.length; i++) {
        const index = list[i];
        this._maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds);
      }
    }

    return Object.keys(area).filter(key => area[key]);
  }

  static applyFillArea(mapX, mapY) {
    if (currentTileId === undefined) {
      return;
    }

    this.ensureLayerVisibility();
    const affectedArea = this.collectFillAreaFrom(mapX, mapY);
    const height = $gameMap.height();
    const width = $gameMap.width();
    const workLayer = currentLayer <= 3 ? currentLayer : 0;

    this.resetCurrentChange();
    for (const tileIndex of affectedArea) {
      const y = this.indexPositionY(tileIndex, workLayer);
      const x = tileIndex - this.tileIndex(0, y, workLayer);

      const xDiff = (x + width - mapX) % tileCols;
      const yDiff = (y + height - mapY) % tileRows;

      this.setSelectionTileMaybeMultiLayer(x, y, xDiff, yDiff, false);
    }

    this.logChange();
    this.refreshTilemap();
  }

  static ensureLayerVisibility() {
    if (!layerVisibility[currentLayer]) {
      layerVisibility[currentLayer] = true;

      if (this.isMapEditorScene()) {
        SceneManager._scene._mapEditorLayerListWindow.refresh();
      }
    }
  }

  static applySelectedTiles(mapX, mapY) {
    if (currentLayer !== Layers.blend) {
      if (currentTileId === undefined) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }
    }

    this.ensureLayerVisibility();
    let index = 0;
    const gridRatio = this.getGridRatio();
    const increment = 1 / gridRatio;

    for (let y = mapY; y < mapY + tileRows; y += increment) {
      for (let x = mapX; x < mapX + tileCols; x += increment) {
        if (!$gameMap.isValid(x, y)) {
          continue;
        }

        if (currentLayer === 7 && multiLayerSelection.length) {
          for (let z = 0; z <= 3; z++) {
            this.setMapTile(x, y, z, multiLayerSelection[z][index]);
          }
        } else {
          this.setMapTile(x, y, currentLayer, selectedTileList[index]);
        }

        index++;
      }
    }

    this.refreshTilemap();
  }

  static updateRightTouch(x, y) {
    if (CycloneMapEditor.isRightButtonDown) {
      if (!CycloneMapEditor.wasRightButtonDown) {
        CycloneMapEditor.rectangleStartX = x;
        CycloneMapEditor.rectangleStartY = y;
        CycloneMapEditor.rectangleStartMouseX = TouchInput.x;
        CycloneMapEditor.rectangleStartMouseY = TouchInput.y;
      }

      const gridRatio = CycloneMapEditor.getGridRatio();

      CycloneMapEditor.rectangleWidth = (x - CycloneMapEditor.rectangleStartX + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleHeight = (y - CycloneMapEditor.rectangleStartY + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleBackWidth = (CycloneMapEditor.rectangleStartX - x).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleBackHeight = (CycloneMapEditor.rectangleStartY - y).clamp(0, 30) * gridRatio;

      if (this.crossedHorizontalLoop()) {
        // moved right through the edge, limit the width to it
        if (CycloneMapEditor.rectangleStartX > x) {
          CycloneMapEditor.rectangleWidth = ($gameMap.width() - CycloneMapEditor.rectangleStartX) * gridRatio;
          CycloneMapEditor.rectangleBackWidth = 0;
        } else if (x > CycloneMapEditor.rectangleStartX) {
          CycloneMapEditor.rectangleBackWidth = CycloneMapEditor.rectangleStartX * gridRatio;
          CycloneMapEditor.rectangleWidth = 0;
        }
      }

      if (this.crossedVerticalLoop()) {
        if (CycloneMapEditor.rectangleStartY > y) {
          CycloneMapEditor.rectangleHeight = ($gameMap.height() - CycloneMapEditor.rectangleStartY) * gridRatio;
          CycloneMapEditor.rectangleBackHeight = 0;
        } else if (y > CycloneMapEditor.rectangleStartY) {
          CycloneMapEditor.rectangleBackHeight = CycloneMapEditor.rectangleStartY * gridRatio;
          CycloneMapEditor.rectangleHeight = 0;
        }
      }
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      return;
    }

    if (CycloneMapEditor.wasRightButtonDown) {
      this.updateRectangleReleased();
      return;
    }
  }

  static updateCurrentToolTouch(x, y) {
    switch(CycloneMapEditor.currentTool) {
      case 'fill':
        this.updateFill(x, y);
        break;
      case 'pencil':
        this.updatePencil(x, y);
        break;
      case 'rectangle':
        this.updateRectangle(x, y);
        break;
      case 'eraser':
        this.updateEraser(x, y);
        break;
    }
  }

  static changeRectangleArea(previewOnly = false) {
    let startX = CycloneMapEditor.rectangleStartX;
    let startY = CycloneMapEditor.rectangleStartY;
    let applyWidth = 0;
    let applyHeight = 0;
    const gridRatio = CycloneMapEditor.getGridRatio();

    if (CycloneMapEditor.rectangleWidth > 0) {
      applyWidth = CycloneMapEditor.rectangleWidth / gridRatio;
    } else if (CycloneMapEditor.rectangleBackWidth > 0) {
      startX -= CycloneMapEditor.rectangleBackWidth / gridRatio;
      applyWidth = (CycloneMapEditor.rectangleBackWidth + 1) / gridRatio;
    }

    if (CycloneMapEditor.rectangleHeight > 0) {
      applyHeight = CycloneMapEditor.rectangleHeight / gridRatio;
    } else if (CycloneMapEditor.rectangleBackHeight > 0) {
      startY -= CycloneMapEditor.rectangleBackHeight / gridRatio;
      applyHeight = (CycloneMapEditor.rectangleBackHeight + 1) / gridRatio;
    }

    if (applyWidth > 0 && applyHeight > 0) {
      if (CycloneMapEditor.wasRightButtonDown) {
        if (!previewOnly) {
          CycloneMapEditor.copyRectangle(startX, startY, applyWidth, applyHeight);
        }
      } else {
        CycloneMapEditor.applyRectangle(startX, startY, applyWidth, applyHeight, previewOnly);
      }
    }
  }

  static updateRectangleReleased() {
    this.changeRectangleArea();

    CycloneMapEditor.rectangleWidth = 0;
    CycloneMapEditor.rectangleHeight = 0;
    CycloneMapEditor.rectangleBackWidth = 0;
    CycloneMapEditor.rectangleBackHeight = 0;
    SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
  }

  static crossedHorizontalLoop() {
    if (!$gameMap.isLoopHorizontal()) {
      return false;
    }

    // if moved left but the end position is to the right
    if ((CycloneMapEditor.rectangleStartMouseX > TouchInput.x && CycloneMapEditor.rectangleWidth > 0) ) {
      return true;
    }

    if ((CycloneMapEditor.rectangleStartMouseX < TouchInput.x && CycloneMapEditor.rectangleBackWidth > 0)) {
      return true;
    }

    return false;
  }

  static crossedVerticalLoop() {
    if (!$gameMap.isLoopVertical()) {
      return false;
    }

    if ((CycloneMapEditor.rectangleStartMouseY > TouchInput.y && CycloneMapEditor.rectangleHeight > 0)) {
      return true;
    }

    if ((CycloneMapEditor.rectangleStartMouseY < TouchInput.y && CycloneMapEditor.rectangleBackHeight > 0)) {
      return true;
    }

    return false;
  }

  static updateRectangle(x, y) {
    if (TouchInput.isPressed()) {
      if (!wasPressing) {
        CycloneMapEditor.rectangleStartX = x;
        CycloneMapEditor.rectangleStartY = y;
        CycloneMapEditor.rectangleStartMouseX = TouchInput.x;
        CycloneMapEditor.rectangleStartMouseY = TouchInput.y;
      }

      const gridRatio = CycloneMapEditor.getGridRatio();
      CycloneMapEditor.rectangleWidth = (x - CycloneMapEditor.rectangleStartX + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleHeight = (y - CycloneMapEditor.rectangleStartY + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleBackWidth = (CycloneMapEditor.rectangleStartX - x).clamp(0, 30) * gridRatio;
      CycloneMapEditor.rectangleBackHeight = (CycloneMapEditor.rectangleStartY - y).clamp(0, 30) * gridRatio;

      if (this.crossedHorizontalLoop()) {
        // moved right through the edge, limit the width to it
        if (CycloneMapEditor.rectangleStartX > x) {
          CycloneMapEditor.rectangleWidth = ($gameMap.width() - CycloneMapEditor.rectangleStartX) * gridRatio;
          CycloneMapEditor.rectangleBackWidth = 0;
        } else if (x > CycloneMapEditor.rectangleStartX) {
          CycloneMapEditor.rectangleBackWidth = CycloneMapEditor.rectangleStartX * gridRatio;
          CycloneMapEditor.rectangleWidth = 0;
        }
      }

      if (this.crossedVerticalLoop()) {
        if (CycloneMapEditor.rectangleStartY > y) {
          CycloneMapEditor.rectangleHeight = ($gameMap.height() - CycloneMapEditor.rectangleStartY) * gridRatio;
          CycloneMapEditor.rectangleBackHeight = 0;
        } else if (y > CycloneMapEditor.rectangleStartY) {
          CycloneMapEditor.rectangleBackHeight = CycloneMapEditor.rectangleStartY * gridRatio;
          CycloneMapEditor.rectangleHeight = 0;
        }
      }

      this.changeRectangleArea(true);
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      return;
    }

    if (wasPressing) {
      this.updateRectangleReleased();
      return;
    }
  }

  static updateFill(x, y) {
    if (!TouchInput.isPressed() || wasPressing) {
      return;
    }

    CycloneMapEditor.applyFillArea(x, y);
  }

  static updateEraser(x, y) {
    if (this.isLayerVisible(Layers.blend)) {
      this.updatePencil(x, y);
      return;
    }

    this.updateRectangle(x, y);
  }

  static updatePencil(x, y) {
    if (TouchInput.isPressed()) {
      if (!currentChange) {
        this.resetCurrentChange();
      }

      if (currentLayer === Layers.blend) {
        const offset = Input.isPressed('shift') ? 0.125 : 0.25;
        CycloneMapEditor._applyBlendBrush(x - offset, y - offset, false);
        return;
      }

      CycloneMapEditor.applySelectedTiles(x, y);
      return;
    }

    if (wasPressing) {
      CycloneMapEditor.logChange();
    }
  }

  static getGridRatio(drawRatio = false) {
    if (!drawRatio) {
      if (currentLayer === Layers.blend) {
        return 16;
      }
    }

    if (puzzleMode) {
      return 2;
    }

    if (currentLayer === Layers.collisions) {
      if (window.CycloneMovement) {
        return window.CycloneMovement.collisionStepCount;
      }

      const count = this.params.collisionStepCount;
      if ([1, 2, 4].includes(count)) {
        return count;
      }

      return 1;
    }

    return 1;
  }

  static canvasToMapX(x) {
    const gridRatio = this.getGridRatio();
    const originX = $gameMap._displayX * tileWidth;
    const mapX = (originX + x) / tileWidth;
    return Math.floor(mapX * gridRatio) / gridRatio;
  }

  static canvasToMapY(y) {
    const gridRatio = this.getGridRatio();


    const originY = $gameMap._displayY * tileHeight;
    const mapY = (originY + y) / tileHeight;
    return Math.floor(mapY * gridRatio) / gridRatio;
  }

  static requestCollisionRefresh() {
    if (!this.active) {
      return;
    }

    if (currentLayer !== Layers.collisions) {
      return;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorGrid.requestRefresh();
    }
  }

  static jumpToTile(tileId) {
    return SceneManager._scene._mapEditorWindow && SceneManager._scene._mapEditorWindow.jumpToTile(tileId);
  }

  static jumpToLastTile() {
    if (!SceneManager._scene._mapEditorWindow) {
      return;
    }

    SceneManager._scene._mapEditorWindow.setTopRow(SceneManager._scene._mapEditorWindow.maxTopRow());
  }

  static jumpToOneTileOf(tileList) {
    for (const tileId of tileList) {
      if (this.jumpToTile(tileId)) {
        return;
      }
    }
  }
}

globalThis.CycloneMapEditor = CycloneMapEditor;
CycloneMapEditor.register();
