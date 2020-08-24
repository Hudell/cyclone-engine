/*:
 * @target MZ
 * @plugindesc Live Map Editor
 *
 * <pluginName:CycloneMapEditor>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-map-editor
 * @orderAfter Cyclone-Core
 *
 * @help
 * ===========================================================================
 *                                    88
 *                                    88
 *                                    88
 *   ,adPPYba, 8b       d8  ,adPPYba, 88  ,adPPYba,  8b,dPPYba,   ,adPPYba,
 *  a8"     "" `8b     d8' a8"     "" 88 a8"     "8a 88P'   `"8a a8P_____88
 *  8b          `8b   d8'  8b         88 8b       d8 88       88 8PP"""""""
 *  "8a,   ,aa   `8b,d8'   "8a,   ,aa 88 "8a,   ,a8" 88       88 "8b,   ,aa
 *   `"Ybbd8"'     Y88'     `"Ybbd8"' 88  `"YbbdP"'  88       88  `"Ybbd8"'
 *                 d8'
 *                d8'
 * Live  Map Editor 1.00.00                                          by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels (in order of preference):
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Tagging me on threads on Rpg Maker related Forums, such as:
 *      rpgmakerweb.com (English)
 *      centrorpg.com (Portuguese)
 *      condadobraveheart.com (Portuguese)
 *   1.c. Opening threads on the plugin's itch.io page
 *   1.d. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 3. A special exception is created for patreon users who get access to my
 * priority support discord server.
 *
 * 4. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 5. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 6. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 7. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 8. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Did you know?
 * Early map makers used to include fake towns on their maps to identify
 * copies of their work.
 * ===========================================================================
 *
 * @param Main Key
 * @type string
 * @default p
 * @desc What key should trigger the map editor when pressed?
 *
 **/

CycloneEngine.requireVersion(2, 'CycloneMapEditor');

(() => {
  let windowWidth = 300;
  const layerVisibility = [true, true, true, true, false, true, true, false];
  let editorActive = false;

  let currentLayer = 3;
  let currentTab = 'A';
  let currentTileId = 0;
  let tileCols = 1;
  let tileRows = 1;
  let selectedTileList = [];
  let tileWidth = 48;
  let tileHeight = 48;
  let leftSidebar = false;
  let currentTool = 'pencil';
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
  const changeHistory = [];
  let undoHistory = [];
  let currentChange = false;
  let previewChanges = {};

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

  class CycloneMapEditor extends CyclonePlugin {
    static get currentLayer() {
      return currentLayer;
    }
    static get currentTab() {
      return currentTab;
    }
    static get active() {
      return editorActive;
    }
    static get layerVisibility() {
      return layerVisibility;
    }

    static register() {
      super.register('CycloneMapEditor', {
        mainKey: {
          name: 'Main Key',
          type: 'str',
          defaultValue: 'p',
        },
      });

      document.addEventListener('keydown', (...args) => {
        this.onKeyDown(...args);
      });
      document.addEventListener('keypress', (...args) => {
        this.onKeyPress(...args);
      });
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

      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      if (event.keyCode === 8 || event.keyCode === 46) {
        scene._mapEditorWindow.selectTileId(0);
        scene.showMapEditorWindows();
      }

      if (event.keyCode === 32) {
        leftSidebar = !leftSidebar;
        scene.showMapEditorWindows();
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

    static checkTabKeys(key) {
      // switch(key) {
      //   case '1':
      //     this.changeCurrentTab('A');
      //     return;
      //   case '2':
      //     this.changeCurrentTab('B');
      //     return;
      //   case '3':
      //     this.changeCurrentTab('C');
      //     return;
      //   case '4':
      //     this.changeCurrentTab('D');
      //     return;
      //   case '5':
      //     this.changeCurrentTab('E');
      //     return;
      // }
    }

    static checkScrollKeys(key) {
      switch(key) {
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

    static checkToolKeys(key) {
      switch(key) {
        case '1':
          this.pencilButton();
          return;
        case '2':
          this.rectangleButton();
          return;
        case '3':
          this.fillButton();
          return;
        case '4':
          this.eraserButton();
          // this.changeCurrentTab('D');
          return;
        case '5':
          // this.changeCurrentTab('E');
          return;
      }
    }

    static checkControlKeys(code) {
      switch(code) {
        case 'KeyZ':
          this.undoLastChange();
          break;
        case 'KeyY':
          this.redoLastUndoneChange();
          break;
      }
    }

    static loadMapFile() {
      SceneManager._scene._mapEditorCommands.hide();
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
          SceneManager.goto(Scene_Map);
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


    static undoButton() {
      this.undoLastChange();
    }
    static redoButton() {
      this.redoLastUndoneChange();
    }

    static pencilButton() {
      currentTool = 'pencil';
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    static rectangleButton() {
      currentTool = 'rectangle';
      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      rectangleStartX = 0;
      rectangleStartY = 0;
      rectangleStartMouseX = 0;
      rectangleStartMouseY = 0;
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    static fillButton() {
      currentTool = 'fill';
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    static eraserButton() {
      currentTool = 'eraser';
      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      rectangleStartX = 0;
      rectangleStartY = 0;
      rectangleStartMouseX = 0;
      rectangleStartMouseY = 0;
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    static saveButton() {
      if (!confirm('Are you sure you want to SAVE the map file?')) {
        SceneManager._scene.refreshMapEditorWindows();
        return;
      }

      SceneManager._scene._mapEditorCommands.hide();

      const fs = require('fs');
      const path = require('path');

      const projectFolder = path.dirname(process.mainModule.filename);
      const dataFolder = path.join(projectFolder, 'data');
      const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;

      const filePath = path.join(dataFolder, fileName);

      const json = JSON.stringify($dataMap, null, 2);
      fs.writeFileSync(filePath, json);

      SoundManager.playSave();

      SceneManager._scene.refreshMapEditorWindows();
    }

    static reloadButton() {
      if (!confirm('Are you sure you want to RELOAD the map file?')) {
        SceneManager._scene.refreshMapEditorWindows();
        return;
      }

      this.loadMapFile();
    }

    static onKeyPress(event) {
      if (event.key === this.params.get('mainKey')) {
        this.toggleMapEditor();
        return;
      }

      if (editorActive) {
        if (event.ctrlKey) {
          this.checkControlKeys(event.code);
        } else {
          this.checkTabKeys(event.key);
          this.checkScrollKeys(event.key);
          this.checkToolKeys(event.key);
        }
      }
    }

    static toggleMapEditor() {
      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      scene.toggleMapEditor();
    }

    static refreshMapEditor() {
      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      scene.refreshMapEditorWindows();
    }

    static getTileIdTilesetIndex(tileId) {
      if (tileId < Tilemap.TILE_ID_A5) {
        const tilesetIndex = Math.floor(tileId / 256);
        if (tilesetIndex >= 0 && tilesetIndex < 4) {
          return 5 + tilesetIndex;
        }

        return -1;
      }

      if (tileId < Tilemap.TILE_ID_A1) {
        return 4;
      }

      if (tileId < Tilemap.TILE_ID_A2) {
        return 0;
      }

      if (tileId < Tilemap.TILE_ID_A3) {
        return 1;
      }

      if (tileId < Tilemap.TILE_ID_A4) {
        return 2;
      }

      if (tileId < Tilemap.TILE_ID_MAX) {
        return 3;
      }

      return -1;
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

      return tileset.tilesetNames[tilesetIndex];
    }

    static loadTilesetBitmap(tileId) {
      const realFileName = this.getTilesetName(tileId);
      if (realFileName) {
        return ImageManager.loadTileset(realFileName);
      }
    }

    static changeCurrentLayer(newIndex) {
      if (newIndex >= layerVisibility.length) {
        return;
      }

      currentLayer = newIndex;
      // document.getElementsByTagName('title')[0].innerText = `Layer ${ newIndex + 1}`;
    }

    static changeCurrentTab(tabLetter) {
      currentTab = tabLetter;
      this.refreshMapEditor();
    }

    static tileIndex(x, y, z) {
      return (z * $gameMap.height() + y) * $gameMap.width() + x;
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

    static getAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
      if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
        return this.getWallShapeForPosition(x, y, z, tileId, skipPreview);
      }

      if (Tilemap.isWaterfallTile(tileId)) {
        return this.getWaterfallShapeForPosition(x, y, z, tileId, skipPreview);
      }

      const a = this.isSameKindTile(tileId, x -1, y -1, z, skipPreview);
      const b = this.isSameKindTile(tileId, x, y -1, z, skipPreview);
      const c = this.isSameKindTile(tileId, x +1, y -1, z, skipPreview);

      const d = this.isSameKindTile(tileId, x -1, y, z, skipPreview);
      const e = this.isSameKindTile(tileId, x +1, y, z, skipPreview);

      const f = this.isSameKindTile(tileId, x -1, y +1, z, skipPreview);
      const g = this.isSameKindTile(tileId, x, y +1, z, skipPreview);
      const h = this.isSameKindTile(tileId, x +1, y +1, z, skipPreview);

      const config = [a, b, c, d, e, f, g, h];
      return this.getShapeForConfiguration(config);
    }

    static changeAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
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

    static undoLastChange() {
      if (changeHistory.length === 0) {
        SoundManager.playBuzzer();
        return;
      }

      const lastChange = changeHistory.pop();
      currentChange = {};
      for (const tileIndex in lastChange) {
        currentChange[tileIndex] = $dataMap.data[tileIndex];
        $dataMap.data[tileIndex] = lastChange[tileIndex];
      }

      undoHistory.push(currentChange);
      currentChange = false;
    }

    static redoLastUndoneChange() {
      if (undoHistory.length === 0) {
        SoundManager.playBuzzer();
        return;
      }

      const lastChange = undoHistory.pop();
      currentChange = {};
      for (const tileIndex in lastChange) {
        currentChange[tileIndex] = $dataMap.data[tileIndex];
        $dataMap.data[tileIndex] = lastChange[tileIndex];
      }

      this.logChange(false);
    }

    static logChange(clearUndo = true) {
      const hasChanges = Object.keys(currentChange).length > 0;

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
    }

    static setMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false) {
      if (x < 0 || x >= $gameMap.width()) {
        return;
      }

      if (y < 0 || y >= $gameMap.height()) {
        return;
      }

      const tileIndex = this.tileIndex(x, y, z);
      let effectiveTileId = tileId;

      if (Tilemap.isAutotile(tileId)) {
        effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, false);
      }

      if (previewOnly) {
        previewChanges[tileIndex] = effectiveTileId;
      } else {
        const oldTile = $dataMap.data[tileIndex];
        if (currentChange[tileIndex] === undefined && oldTile !== effectiveTileId) {
          currentChange[tileIndex] = oldTile;
        }

        $dataMap.data[tileIndex] = effectiveTileId;
      }

      if (updateNeighbors) {
        this.resetTileShape(x -1, y -1, z, previewOnly);
        this.resetTileShape(x, y -1, z, previewOnly);
        this.resetTileShape(x +1, y -1, z, previewOnly);

        this.resetTileShape(x -1, y, z, previewOnly);
        this.resetTileShape(x +1, y, z, previewOnly);

        this.resetTileShape(x -1, y +1, z, previewOnly);
        this.resetTileShape(x, y + 1, z, previewOnly);
        this.resetTileShape(x +1, y +1, z, previewOnly);
      }
    }

    static getSelectedTileCell(col, row) {
      if (currentTool === 'eraser') {
        return 0;
      }

      if (!currentTileId) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }

      const realCol = col % tileCols;
      const realRow = row % tileRows;
      const index = realRow * tileCols + realCol;
      return selectedTileList[index];
    }

    static applyRectangle(startX, startY, width, height, previewOnly = false) {
      if (!currentTileId && currentTool !== 'eraser') {
        return;
      }

      let selectionRow = 0;
      let selectionCol = 0;

      if (previewOnly) {
        previewChanges = {};
      } else {
        currentChange = {};
      }

      for (let tileY = startY; tileY < startY + height; tileY++) {
        for (let tileX = startX; tileX < startX + width; tileX++) {
          const tileId = this.getSelectedTileCell(selectionCol, selectionRow) ?? 0;
          this.setMapTile(tileX, tileY, currentLayer, tileId, true, previewOnly);
          selectionCol++;
        }
        selectionRow++;
      }

      if (previewOnly) {
        SceneManager._scene._spriteset._tilemap.refresh();
      } else {
        this.logChange();
        this.refreshTilemap();
      }
    }

    static refreshTilemap() {
      previewChanges = {};
      SceneManager._scene._spriteset._tilemap.refresh();
    }

    static copyRectangle(startX, startY, width, height) {
      if (!wasRightButtonDown) {
        return;
      }

      let index = 0;
      selectedTileList = Array(width * height);
      currentTileId = 0;

      for (let tileY = startY; tileY < startY + height; tileY++) {
        for (let tileX = startX; tileX < startX + width; tileX++) {
          const tileIndex = this.tileIndex(tileX, tileY, currentLayer);
          selectedTileList[index] = $dataMap.data[tileIndex] || 0;
          if (!currentTileId) {
            currentTileId = selectedTileList[index];
          }
          index++;
        }
      }

      tileCols = width;
      tileRows = height;

      this.refreshTilemap();
    }

    static collectFillAreaFrom(mapX, mapY) {
      const area = {};
      const tileIndex = this.tileIndex(mapX, mapY, currentLayer);
      const initialTileId = $dataMap.data[tileIndex];

      const list = [tileIndex];

      const height = $gameMap.height();
      const width = $gameMap.width();

      const maybeAddToList = (index) => {
        if (index >= 0 && !list.includes(index)) {
          list.push(index);
        }
      };

      for (let i = 0; i < list.length; i++) {
        const index = list[i];
        if (area[index] === undefined) {
          const tileId = $dataMap.data[index];
          area[index] = Tilemap.isSameKindTile(tileId, initialTileId);

          if (area[index]) {
            const y = this.indexPositionY(index, currentLayer);
            const x = index - this.tileIndex(0, y, currentLayer);

            const leftIndex = x > 0 ? this.tileIndex(x - 1, y, currentLayer) : -1;
            const rightIndex = x < width -1 ? this.tileIndex(x + 1, y, currentLayer) : -1;
            const upIndex = y > 0 ? this.tileIndex(x, y - 1, currentLayer) : -1;
            const downIndex = y < height - 1 ? this.tileIndex(x, y + 1, currentLayer) : -1;

            maybeAddToList(leftIndex);
            maybeAddToList(rightIndex);
            maybeAddToList(upIndex);
            maybeAddToList(downIndex);
          }
        }
      }

      return Object.keys(area).filter(key => area[key]);
    }

    static applyFillArea(mapX, mapY) {
      if (!currentTileId) {
        return;
      }

      const affectedArea = this.collectFillAreaFrom(mapX, mapY);
      const height = $gameMap.height();
      const width = $gameMap.width();

      currentChange = {};
      for (const tileIndex of affectedArea) {
        const y = this.indexPositionY(tileIndex, currentLayer);
        const x = tileIndex - this.tileIndex(0, y, currentLayer);

        const xDiff = (x + width - mapX) % tileCols;
        const yDiff = (y + height - mapY) % tileRows;

        const tileId = this.getSelectedTileCell(xDiff, yDiff) ?? 0;
        this.setMapTile(x, y, currentLayer, tileId);
      }

      this.logChange();
      this.refreshTilemap();
    }

    static applySelectedTiles(mapX, mapY) {
      if (!currentTileId) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }

      let index = 0;
      for (let y = mapY; y < mapY + tileRows; y++) {
        if (y >= $gameMap.height()) {
          continue;
        }

        for (let x = mapX; x < mapX + tileCols; x++) {
          if (x >= $gameMap.width()) {
            continue;
          }
          this.setMapTile(x, y, currentLayer, selectedTileList[index]);
          index++;
        }
      }

      this.refreshTilemap();
    }
  }

  class WindowCycloneMapEditorCommands extends Window_Command {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = 0;
      const w = windowWidth;
      const h = 70;
      super(new Rectangle(x, y, w, h));
    }

    processCursorMove() {
    }

    processHandling() {
    }

    makeCommandList() {
      this.addCommand('Undo', 'undo');
      this.addCommand('Redo', 'redo');

      this.addCommand('Pencil', 'pencil');
      this.addCommand('Rectangle', 'rectangle');
      this.addCommand('Fill', 'fill');
      this.addCommand('Eraser', 'eraser');

      this.addCommand('Save', 'save');
      this.addCommand('Reload', 'reload');

      this.setHandler('undo', () => {
        CycloneMapEditor.undoButton();
        this.activate();
      });
      this.setHandler('redo', () => {
        CycloneMapEditor.redoButton();
        this.activate();
      });
      this.setHandler('pencil', () => {
        CycloneMapEditor.pencilButton();
        this.activate();
      });
      this.setHandler('rectangle', () => {
        CycloneMapEditor.rectangleButton();
        this.activate();
      });
      this.setHandler('fill', () => {
        CycloneMapEditor.fillButton();
        this.activate();
      });
      this.setHandler('eraser', () => {
        CycloneMapEditor.eraserButton();
        this.activate();
      });
      this.setHandler('save', () => {
        CycloneMapEditor.saveButton();
        this.activate();
      });
      this.setHandler('reload', () => {
        CycloneMapEditor.reloadButton();
        this.activate();
      });
    }

    colSpacing() {
      return 0;
    }

    rowSpacing() {
      return 0;
    }

    maxCols() {
      return 8;
    }

    // itemWidth() {
    //   return ImageManager.iconWidth;
    // }

    // itemHeight() {
    //   return ImageManager.iconHeight;
    // }

    // drawItem(index) {
    //   const rect = this.itemRect(index);
    //   this.resetTextColor();
    //   this.changePaintOpacity(this.isCommandEnabled(index));
    // }

    drawAllItems() {
      super.drawAllItems();
    }

    playCursorSound() {
    }

    playOkSound() {
    }

    playBuzzerSound() {
    }
  }

  class WindowCycloneMapEditorLayerList extends Window_Base {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = SceneManager._scene._mapEditorCommands.height;
      const h = 150;
      super(new Rectangle(x, y, windowWidth, h));

      this.eyeOpened = new Image();
      this.eyeOpened.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABeUlEQVRYR2NkIBH8////Pz4tjIyMjKQYSZJikMF0dwC6hb0esng9WLzjMYo8oRAhGAID5gCYxeg+jq1xxxsCi1t2osjDQgRXSOAMgQFzALrFMB9/EkolJXEz8L2bDVYPCxFcIYERAgPmAHSLXUMUwT7gsuoG0+KScighMCvSDIWftvwUCv/l80dg/rdjpWB695r7YBo9JOAhMGAOQLdYWZob7FKd4oVYfQ7zJiwEYOph4s49+7GGxJXeeLD43adfUUNi0DggyVga7DI/A14wje4TmLe+X60FM4/NP4LiU6tEGzCfU7sZRRzG2VviCGZuuvAZTM87+xRMM8JCYMAcAHMhsQ6BhQBWb2IJAZw+h9aaGLmAUEjQzAG4QgImPnHPGVyexiqe72KCIg6Pc7T2As6SEBYSdHcAekjA+OgOIhQcMB/D1JFdGw6YA9B9SKgphq6eUEsIHjKEghJXlBDSR3UHELKQXHmCbUJyDSZW36gDRkNgNARGQwAAsuEAIID/zUkAAAAASUVORK5CYII=';

      this.eyeClosed = new Image();
      this.eyeClosed.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABLklEQVRYR2NkIBH8////Pz4tjIyMjKQYSZJikMF0dwC6hb0esng9WLzjMYo8oRAhGAID5gCYxeg+jq1xxxsCi1t2osjDQgRXSOAMgQFzALrFhHxMKMXDQgRXSGCEwIA5AN1i1xBFsOckNNQIeRKv/Isbt8Dyu9fcB9PoIQEPgQFzALrFytLcYJdaJdpQ5HN0zcfmHwEL3X36FTUkBo0DkoylwS7zM+ClaQhsuvAZbP68s0/BNCMsBAbMAbC4opVDYHGP4XNorYmRC6gdEkQ7AFdIwMQ7JnqSlCsq8rejqIfHOVp7AWdJCAsJujsAPSRgfHQHEQoOmI9h6siuDQfMAeg+JNQUQ1dPqCUEDxlCQYkrSgjpo7oDCFlIrjzBNiG5BhOrb9QBoyEwGgKjIQAAKU3QEWJ5SkIAAAAASUVORK5CYII=';
    }

    update() {
      super.update();

    }

    refresh() {
      this.drawContents();
      SceneManager._scene.redrawMap();
    }

    drawContents() {
      this.contents.clear();
      this.contents.fontSize = 22;
      const ctx = this.contents._canvas.getContext('2d');

      const names = [
        'Layer 1',
        'Layer 2',
        'Layer 3',
        'Layer 4',
        'Regions',
        'Shadows',
        'Events',
        'Collision',
      ];

      for (let i = 0; i < 4; i++) {
        ctx.drawImage(layerVisibility[i] ? this.eyeOpened : this.eyeClosed, 0, 8 + 30 * i);
        this.contents.fontBold = currentLayer === i;
        this.changeTextColor(currentLayer === i ? ColorManager.powerUpColor() : ColorManager.normalColor());

        this.drawText(names[i], 40, i * 30, windowWidth / 2 - 40, 'left');

        if (names[i + 4]) {
          ctx.drawImage(layerVisibility[i + 4] ? this.eyeOpened : this.eyeClosed, windowWidth / 2, 8 + 30 * i);
          this.contents.fontBold = currentLayer === (i + 4);
          this.changeTextColor(currentLayer === (i + 4) ? ColorManager.powerUpColor() : ColorManager.normalColor());
          this.drawText(names[i + 4], windowWidth / 2 + 40, i * 30, windowWidth / 2 - 40, 'left');
        }
      }
    }

    toggleLayerVisibility(layerIndex) {
      layerVisibility[layerIndex] = !layerVisibility[layerIndex];
      this.refresh();
    }

    getLayerIndex(y) {
      const padding = this.padding + 10;

      if (y < padding || y > this.height - padding + 6) {
        return -1;
      }

      const layerIndex = Math.floor((y - padding) / 30);
      if (y > padding + (layerIndex * 30) + 22) {
        return -1;
      }

      if (layerIndex > layerVisibility.length) {
        return -1;
      }

      return layerIndex;
    }

    onMapTouch(x, y) {
      let layerIndex = this.getLayerIndex(y);
      if (layerIndex < 0) {
        return;
      }

      if (x >= windowWidth / 2) {
        x -= windowWidth / 2;
        layerIndex += 4;
      }

      if (x < 40) {
        this.toggleLayerVisibility(layerIndex);
        return;
      }

      CycloneMapEditor.changeCurrentLayer(layerIndex);
      this.refresh();
    }
  }

  class WindowCycloneMapEditor extends Window_Command {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
      const w = windowWidth;
      const h = Graphics.height - y;
      super(new Rectangle(x, y, w, h));
    }

    onMapTouch(x, y) {

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

    makeCommandList() {
      for (let tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
        this.addTile(tileId);
      }

      for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_A5; tileId++) {
        this.addTile(tileId);
      }
    }

    redraw() {
      Window_Selectable.prototype.refresh.call(this);

      // Force the tilemap cursor to redraw too
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    colSpacing() {
      return 0;
    }

    rowSpacing() {
      return 0;
    }

    maxCols() {
      return Math.floor(this.width / tileWidth);
    }

    itemWidth() {
      return tileWidth;
    }

    itemHeight() {
      return tileHeight;
    }

    drawItem(index) {
      const rect = this.itemRect(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));

      this.contents.drawTile(this._list[index].ext, rect.x, rect.y);
    }

    drawAllItems() {
      super.drawAllItems();
      this.drawSelection();
    }

    drawSelection() {
      const cols = this.maxCols();

      for (let index = 0; index < this._list.length; index++) {
        const item = this._list[index];
        if (item.name !== currentTileId) {
          continue;
        }

        let col = index % cols;
        let row = Math.floor(index / cols);
        let rowCount = tileRows;
        let colCount = tileCols;
        let rowDrawCount = tileRows <= 0 ? Math.abs(tileRows) + 2 : tileRows;
        let colDrawCount = tileCols <= 0 ? Math.abs(tileCols) + 2 : tileCols;

        while (rowCount <= 0) {
          rowCount++;
          row--;
        }

        while (colCount <= 0) {
          colCount++;
          col--;
        }

        const topIndex = (row * cols) + col;
        const rect = this.itemRect(topIndex);
        const { x, y } = rect;

        const selectionWidth = tileWidth * colDrawCount;
        const selectionHeight = tileHeight * rowDrawCount;

        this.contents.fillRect(x, y, selectionWidth, 4, '#000000');
        this.contents.fillRect(x, y + selectionHeight - 4, selectionWidth, 4, '#000000');
        this.contents.fillRect(x, y, 4, selectionHeight, '#000000');
        this.contents.fillRect(x + selectionWidth - 4, y, 4, selectionHeight, '#000000');

        this.contents.fillRect(x + 2, y + 2, selectionWidth - 4, 2, '#FFFFFF');
        this.contents.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 4, 2, '#FFFFFF');
        this.contents.fillRect(x + 2, y + 2, 2, selectionHeight - 4, '#FFFFFF');
        this.contents.fillRect(x + selectionWidth - 4, y + 2, 2, selectionHeight - 4, '#FFFFFF');

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
      currentTileId = tileId;
      tileCols = cols ?? 1;
      tileRows = rows ?? 1;

      const topIndex = this._list.findIndex((item) => item.name === tileId);
      if (topIndex < 0) {
        currentTileId = 0;
        selectedTileList = [];
        this.redraw();
        return;
      }

      selectedTileList = Array(cols * rows);
      selectedTileList[0] = currentTileId;

      const maxCols = this.maxCols();
      const topRow = Math.floor(topIndex / maxCols);
      const leftCol = topIndex % maxCols;

      let selectionIndex = 0;
      for (let y = topRow; y < topRow + tileRows; y++) {
        for (let x = leftCol; x < leftCol + tileCols; x++) {
          const newIndex = y * maxCols + x;
          const newTileId = this.commandName(newIndex);
          selectedTileList[selectionIndex] = newTileId;

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
      const prevCols = tileCols;
      const prevRows = tileRows;

      if (index >= 0) {
        let initialIndex = this.findName(currentTileId);
        if (initialIndex < 0) {
          initialIndex = this._index;
        }

        const initialCol = initialIndex % this.maxCols();
        const initialRow = Math.floor(initialIndex / this.maxCols());
        const newCol = index % this.maxCols();
        const newRow = Math.floor(index / this.maxCols());

        tileCols = (newCol - initialCol) + 1;
        tileRows = (newRow - initialRow) + 1;
      }

      if (this._mouseDown) {
        if (!TouchInput.isPressed()) {
          this.finalizeTileSelection();
        } else if (TouchInput.isMoved()) {
          if (prevCols !== tileCols || prevRows !== tileRows) {
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
        if (item.name !== currentTileId) {
          continue;
        }

        let col = index % cols;
        let row = Math.floor(index / cols);
        let rowCount = tileRows;
        let colCount = tileCols;
        const newTileRows = tileRows <= 0 ? Math.abs(tileRows) + 2 : tileRows;
        const newTileCols = tileCols <= 0 ? Math.abs(tileCols) + 2 : tileCols;

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
            this.selectTileId(currentTileId);
          }
        } else {
          this.selectTileId(0);
        }

        break;
      }

      this.redraw();
    }

    processTouchScroll() {
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.startSelectingTile();
      }

      if (this._mouseDown) {
        this._mouseMoved = true;
        this.continueSelectingTile();
      }
    }
  }

  class SpriteMapEditorCursor extends Sprite {
    initialize() {
      super.initialize(new Bitmap(tileWidth, tileHeight));
    }

    update() {
      super.update();
      if (this.visible !== editorActive) {
        this.visible = editorActive;
      }

      if (editorActive) {
        this.updatePosition();
      }
    }

    updateDrawing() {
      if (isRightButtonDown) {
        return this.updateRectangle();
      }

      switch (currentTool) {
        case 'fill':
          return this.updateTiles();
        case 'pencil':
          return this.updateTiles();
        case 'eraser':
          return this.updateEraser();
        case 'rectangle':
          if ((!rectangleWidth && !rectangleBackWidth) || (!rectangleHeight && !rectangleBackHeight)) {
            this.updateTiles();
            return;
          }

          return this.updateRectangle();
      }
    }

    getNewBitmapWidth() {
      return (tileWidth * (rectangleWidth || (rectangleBackWidth + 1))) || 1;
    }

    getNewBitmapHeight() {
      return (tileHeight * (rectangleHeight || (rectangleBackHeight + 1))) || 1;
    }

    updateRectangle() {
      const width = this.getNewBitmapWidth();
      const height = this.getNewBitmapHeight();

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      const fillColor = isRightButtonDown ? '#00000033' : '#00FF0033';

      if (width > 8 && height > 8) {
        this.bitmap.fillRect(0, 0, width, 4, '#000000');
        this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
        this.bitmap.fillRect(0, 0, 4, height, '#000000');
        this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

        this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
        this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

        this.bitmap.fillRect(4, 4, width - 8, height - 8, fillColor);
      } else if (width > 0 && height > 0) {
        this.bitmap.fillRect(0, 0, width, height, fillColor);
      }
    }

    updateEraser() {
      const width = this.getNewBitmapWidth();
      const height = this.getNewBitmapHeight();

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      if (width > 8 && height > 8) {
        this.bitmap.fillRect(0, 0, width, 4, '#000000');
        this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
        this.bitmap.fillRect(0, 0, 4, height, '#000000');
        this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

        this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
        this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

        this.bitmap.fillRect(4, 4, width - 8, height - 8, '#FF000033');
      } else if (width > 0 && height > 0) {
        this.bitmap.fillRect(0, 0, width, height, '#FF000033');
      }
    }

    updateTiles() {
      let x = 0;
      let y = 0;
      let column = 0;
      let row = 0;

      const width = tileWidth * tileCols;
      const height = tileHeight * tileRows;

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      for (const tileId of selectedTileList) {
        if (column >= tileCols) {
          column = 0;
          row++;
        }

        x = column * tileWidth;
        y = row * tileHeight;

        this.bitmap.drawTile(tileId, x, y);
        column++;
      }
    }

    getCursorTileX() {
      if (currentTool === 'rectangle' || currentTool === 'eraser' || isRightButtonDown) {
        if (rectangleWidth > 0) {
          return rectangleStartX;
        }
        if (rectangleBackWidth > 0) {
          return rectangleStartX - rectangleBackWidth;
        }
      }

      return $gameMap.canvasToMapX(TouchInput.x);
    }

    getCursorTileY() {
      if (currentTool === 'rectangle' || currentTool === 'eraser' || isRightButtonDown) {
        if (rectangleHeight > 0) {
          return rectangleStartY;
        }
        if (rectangleBackHeight > 0) {
          return rectangleStartY - rectangleBackHeight;
        }
      }

      return $gameMap.canvasToMapY(TouchInput.y);
    }

    updatePosition() {
      if (!editorActive) {
        return;
      }

      const tileX = this.getCursorTileX();
      const tileY = this.getCursorTileY();

      this.x = Math.floor($gameMap.adjustX(tileX) * tileWidth);
      this.y = Math.floor($gameMap.adjustY(tileY) * tileHeight);
    }
  }

  CycloneMapEditor.patchClass(Scene_Map, $super => class {
    createAllWindows() {
      $super.createAllWindows.call(this);

      this.createMapEditorWindows();
      this.refreshMapEditorWindows();
    }

    isMapEditorActive() {
      return editorActive;
    }

    toggleMapEditor() {
      tileWidth = $gameMap.tileWidth();
      tileHeight = $gameMap.tileHeight();

      editorActive = !editorActive;
      this.refreshMapEditorWindows();
    }

    createMapEditorWindows() {
      tileWidth = $gameMap.tileWidth();
      tileHeight = $gameMap.tileHeight();
      windowWidth = tileWidth * 8 + 24;

      this._mapEditorCommands = new WindowCycloneMapEditorCommands();
      this.addChild(this._mapEditorCommands);
      this._mapEditorCommands.hide();
      this._mapEditorCommands.deactivate();

      this._mapEditorLayerListWindow = new WindowCycloneMapEditorLayerList();
      this.addChild(this._mapEditorLayerListWindow);
      this._mapEditorLayerListWindow.hide();
      this._mapEditorLayerListWindow.deactivate();

      this._mapEditorWindow = new WindowCycloneMapEditor();
      this.addChild(this._mapEditorWindow);
      this._mapEditorWindow.hide();
      this._mapEditorWindow.deactivate();
    }

    refreshMapEditorWindows() {
      this._mapEditorCommands.visible = editorActive;
      this._mapEditorLayerListWindow.visible = editorActive;
      this._mapEditorWindow.visible = editorActive;

      this._mapEditorCommands.active = editorActive;
      this._mapEditorLayerListWindow.active = editorActive;
      this._mapEditorWindow.active = editorActive;

      this._mapEditorCommands.refresh();
      this._mapEditorLayerListWindow.refresh();
      this._mapEditorWindow.refresh();

      if (editorActive) {
        this._spriteset._mapEditorCursor.updateDrawing();
      }
    }

    redrawMap() {
      this._spriteset._tilemap.refresh();
    }

    processMapTouch() {
      if (!editorActive) {
        $super.processMapTouch.call(this);
        return;
      }

      this._touchCount = 0;
      if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
        this.onMapTouch();
      }
    }

    onMapTouch() {
      if (!editorActive) {
        $super.onMapTouch.call(this);
        return;
      }
    }

    editorX() {
      if (leftSidebar) {
        return 0;
      }

      return Graphics.width - windowWidth;
    }

    collapseMapEditorWindows() {
      const x = leftSidebar ? (50 - windowWidth) : (Graphics.width - 50);

      this._mapEditorCommands.x = x;
      this._mapEditorWindow.x = x;
      this._mapEditorLayerListWindow.x = x;
    }

    showMapEditorWindows() {
      const editorX = this.editorX();

      this._mapEditorCommands.x = editorX;
      this._mapEditorWindow.x = editorX;
      this._mapEditorLayerListWindow.x = editorX;
    }

    updateMapEditorMenuPosition() {
      const { x } = TouchInput;
      const editorX = this.editorX();

      if (leftSidebar) {
        if (x >= windowWidth + 50) {
          if (currentTileId) {
            this.collapseMapEditorWindows();
          }
          return;
        }

        if (x <= 50) {
          this.showMapEditorWindows();
          return;
        }

        return;
      }

      if (x < editorX - 50) {
        if (currentTileId) {
          this.collapseMapEditorWindows();
        }
        return;
      }

      if (x >= Graphics.width - 50) {
        this.showMapEditorWindows();
        return;
      }
    }

    canUpdateMouse() {
      return editorActive && this._mapEditorWindow && this._mapEditorLayerListWindow;
    }

    updateMenuTouch(x, y, pressed) {
      if (!pressed) {
        return;
      }

      if (x > this._mapEditorLayerListWindow.x && x < this._mapEditorLayerListWindow.x + this._mapEditorLayerListWindow.width) {
        if (y < this._mapEditorLayerListWindow.height + this._mapEditorLayerListWindow.y) {
          this._mapEditorLayerListWindow.onMapTouch(x - this._mapEditorLayerListWindow.x, y - this._mapEditorLayerListWindow.y);
          return true;
        }

        this._mapEditorWindow.onMapTouch(x - this._mapEditorWindow.x, y - this._mapEditorWindow.y);
        return true;
      }
    }

    updateRightMouse() {
      if (!this.canUpdateMouse()) {
        isRightButtonDown = false;
        wasRightButtonDown = false;
        return;
      }

      if (!isRightButtonDown && !wasRightButtonDown) {
        return;
      }

      const { x, y } = TouchInput;
      if (this.updateMenuTouch(x, y, isRightButtonDown)) {
        return;
      }

      const mapX = $gameMap.canvasToMapX(x);
      const mapY = $gameMap.canvasToMapY(y);

      if (mapX >= 0 && mapY >= 0) {
        this.updateRightTouch(mapX, mapY);
      }

      wasRightButtonDown = isRightButtonDown;
    }

    updateMouse() {
      if (!this.canUpdateMouse()) {
        wasPressing = false;
        return;
      }

      this.updateMapEditorMenuPosition();
      const pressed = TouchInput.isPressed();

      if (!pressed && !wasPressing) {
        return;
      }

      const { x, y } = TouchInput;
      if (this.updateMenuTouch(x, y, pressed)) {
        return;
      }

      const mapX = $gameMap.canvasToMapX(x);
      const mapY = $gameMap.canvasToMapY(y);

      if (mapX >= 0 && mapY >= 0) {
        this.updateCurrentToolTouch(mapX, mapY);
      }

      wasPressing = pressed;
    }

    updateRightTouch(x, y) {
      if (isRightButtonDown) {
        if (!wasRightButtonDown) {
          rectangleStartX = x;
          rectangleStartY = y;
          rectangleStartMouseX = TouchInput.x;
          rectangleStartMouseY = TouchInput.y;
        }

        rectangleWidth = (x - rectangleStartX + 1).clamp(0, 30);
        rectangleHeight = (y - rectangleStartY + 1).clamp(0, 30);
        rectangleBackWidth = (rectangleStartX - x).clamp(0, 30);
        rectangleBackHeight = (rectangleStartY - y).clamp(0, 30);

        if (this.crossedHorizontalLoop()) {
          // moved right through the edge, limit the width to it
          if (rectangleStartX > x) {
            rectangleWidth = $gameMap.width() - rectangleStartX;
            rectangleBackWidth = 0;
          } else if (x > rectangleStartX) {
            rectangleBackWidth = rectangleStartX;
            rectangleWidth = 0;
          }
        }

        if (this.crossedVerticalLoop()) {
          if (rectangleStartY > y) {
            rectangleHeight = $gameMap.height() - rectangleStartY;
            rectangleBackHeight = 0;
          } else if (y > rectangleStartY) {
            rectangleBackHeight = rectangleStartY;
            rectangleHeight = 0;
          }
        }
        this._spriteset._mapEditorCursor.updateDrawing();
        return;
      }

      if (wasRightButtonDown) {
        this.updateRectangleReleased();
        return;
      }
    }

    updateCurrentToolTouch(x, y) {
      switch(currentTool) {
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

    changeRectangleArea(previewOnly = false) {
      let startX = rectangleStartX;
      let startY = rectangleStartY;
      let applyWidth = 0;
      let applyHeight = 0;

      if (rectangleWidth > 0) {
        applyWidth = rectangleWidth;
      } else if (rectangleBackWidth > 0) {
        startX -= rectangleBackWidth;
        applyWidth = rectangleBackWidth +1;
      }

      if (rectangleHeight > 0) {
        applyHeight = rectangleHeight;
      } else if (rectangleBackHeight > 0) {
        startY -= rectangleBackHeight;
        applyHeight = rectangleBackHeight + 1;
      }

      if (applyWidth > 0 && applyHeight > 0) {
        if (wasRightButtonDown) {
          if (!previewOnly) {
            CycloneMapEditor.copyRectangle(startX, startY, applyWidth, applyHeight);
          }
        } else {
          CycloneMapEditor.applyRectangle(startX, startY, applyWidth, applyHeight, previewOnly);
        }
      }
    }

    updateRectangleReleased() {
      this.changeRectangleArea();

      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      this._spriteset._mapEditorCursor.updateDrawing();
    }

    crossedHorizontalLoop() {
      if (!$gameMap.isLoopHorizontal()) {
        return false;
      }

      // if moved left but the end position is to the right
      if ((rectangleStartMouseX > TouchInput.x && rectangleWidth > 0) ) {
        return true;
      }

      if ((rectangleStartMouseX < TouchInput.x && rectangleBackWidth > 0)) {
        return true;
      }

      return false;
    }

    crossedVerticalLoop() {
      if (!$gameMap.isLoopVertical()) {
        return false;
      }

      if ((rectangleStartMouseY > TouchInput.y && rectangleHeight > 0)) {
        return true;
      }

      if ((rectangleStartMouseY < TouchInput.y && rectangleBackHeight > 0)) {
        return true;
      }

      return false;
    }

    updateRectangle(x, y) {
      if (TouchInput.isPressed()) {
        if (!wasPressing) {
          rectangleStartX = x;
          rectangleStartY = y;
          rectangleStartMouseX = TouchInput.x;
          rectangleStartMouseY = TouchInput.y;
        }

        rectangleWidth = (x - rectangleStartX + 1).clamp(0, 30);
        rectangleHeight = (y - rectangleStartY + 1).clamp(0, 30);
        rectangleBackWidth = (rectangleStartX - x).clamp(0, 30);
        rectangleBackHeight = (rectangleStartY - y).clamp(0, 30);

        if (this.crossedHorizontalLoop()) {
          // moved right through the edge, limit the width to it
          if (rectangleStartX > x) {
            rectangleWidth = $gameMap.width() - rectangleStartX;
            rectangleBackWidth = 0;
          } else if (x > rectangleStartX) {
            rectangleBackWidth = rectangleStartX;
            rectangleWidth = 0;
          }
        }

        if (this.crossedVerticalLoop()) {
          if (rectangleStartY > y) {
            rectangleHeight = $gameMap.height() - rectangleStartY;
            rectangleBackHeight = 0;
          } else if (y > rectangleStartY) {
            rectangleBackHeight = rectangleStartY;
            rectangleHeight = 0;
          }
        }

        this.changeRectangleArea(true);
        this._spriteset._mapEditorCursor.updateDrawing();
        return;
      }

      if (wasPressing) {
        this.updateRectangleReleased();
        return;
      }
    }

    updateFill(x, y) {
      if (!TouchInput.isPressed() || wasPressing) {
        return;
      }

      CycloneMapEditor.applyFillArea(x, y);
    }

    updateEraser(x, y) {
      this.updateRectangle(x, y);
    }

    updatePencil(x, y) {
      if (TouchInput.isPressed()) {
        if (!currentChange) {
          currentChange = {};
        }

        CycloneMapEditor.applySelectedTiles(x, y);
        return;
      }

      if (wasPressing) {
        CycloneMapEditor.logChange();
      }
    }

    isMenuEnabled() {
      if (editorActive) {
        return false;
      }

      return $super.isMenuEnabled.call(this);
    }
  });

  CycloneMapEditor.patchClass(Tilemap, $super => class {
    _readMapData(x, y, z) {
      if (z <= 3 && !layerVisibility[z]) {
        return 0;
      }

      const tileIndex = CycloneMapEditor.tileIndex(x, y, z);
      if (previewChanges?.[tileIndex] !== undefined) {
        return previewChanges[tileIndex];
      }

      return $super._readMapData.call(this, x, y, z);
    }
  });

  CycloneMapEditor.patchClass(Spriteset_Map, $super => class {
    initialize() {
      $super.initialize.call(this);

      this.createMapEditorCursor();
    }

    createMapEditorCursor() {
      this._mapEditorCursor = new SpriteMapEditorCursor();
      this.addChild(this._mapEditorCursor);
    }
  });

  CycloneMapEditor.patchClass(TouchInput, $super => class {
    static _onLeftButtonDown(event) {
      $super._onLeftButtonDown.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.updateMouse();
      }
    }

    static _onMouseMove(event) {
      $super._onMouseMove.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.updateMouse();
        SceneManager._scene.updateRightMouse();
      }
    }

    static _onMouseUp(event) {
      $super._onMouseUp.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        if (event.button === 0) {
          SceneManager._scene.updateMouse();
        } else if (event.button === 2) {
          isRightButtonDown = false;
          SceneManager._scene.updateRightMouse();
        }
      }
    }

    static _onRightButtonDown(event) {
      $super._onRightButtonDown.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        isRightButtonDown = true;
        SceneManager._scene.updateRightMouse();
      }
    }
  });

  CycloneMapEditor.patchClass(Bitmap, $super => class {
    drawNormalTile(tileId, x, y) {
      const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

      const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * tileWidth;
      const sourceY = (Math.floor((tileId % 256) / 8) % 16) * tileHeight;

      this.blt(bitmap, sourceX, sourceY, tileWidth, tileHeight, x, y);
      return bitmap;
    }

    drawAutoTileTable(bitmap, table, tileX, tileY, x, y) {
      const halfWidth = tileWidth / 2;
      const halfHeight = tileHeight / 2;

      for (let i = 0; i < 4; i++) {
        const tableX = table[i][0];
        const tableY = table[i][1];

        const sourceX = (tileX * tileWidth) + (tableX * halfWidth);
        const sourceY = (tileY * tileHeight) + (tableY * halfHeight);
        const targetX = x + (i % 2) * halfWidth;
        const targetY = y + Math.floor(i / 2) * halfHeight;

        this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY);
      }
    }

    drawTileA1(bitmap, tileId, x, y) {
      let tileX = 0;
      let tileY = 0;
      let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
      const kind = Tilemap.getAutotileKind(tileId);
      const shape = Tilemap.getAutotileShape(tileId);

      switch(kind) {
        case 0:
          tileX = 0;
          tileY = 0;
          break;
        case 1:
          tileX = 0;
          tileY = 3;
          break;
        case 2:
          tileX = 6;
          tileY = 0;
          break;
        case 3:
          tileX = 6;
          tileY = 3;
          break;
        default:
          tileX = Math.floor((kind % 8) / 4) * 8;
          tileY = Math.floor(kind / 8) * 6 + (Math.floor((kind % 8) / 2) % 2) * 3;

          if (kind % 2 === 1) {
            tileX += 6;
            autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
          }
          break;
      }

      this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y);
    }

    drawTileA2(bitmap, tileId, x, y) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = (Math.floor(kind / 8) - 2) * 3;
      const shape = Tilemap.getAutotileShape(tileId);

      this.drawAutoTileTable(bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y);
    }

    drawTileA3(bitmap, tileId, x, y) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = (Math.floor(kind / 8) - 6) * 2;
      const shape = Tilemap.getAutotileShape(tileId);

      this.drawAutoTileTable(bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y);
    }

    drawTileA4(bitmap, tileId, x, y) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
      const shape = Tilemap.getAutotileShape(tileId);
      let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

      if (Math.floor(kind / 8) % 2 === 1) {
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
      }

      this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y);
    }

    drawAutoTile(tileId, x, y) {
      const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

      if (Tilemap.isTileA1(tileId)) {
        return this.drawTileA1(bitmap, tileId, x, y);
      }

      if (Tilemap.isTileA2(tileId)) {
        return this.drawTileA2(bitmap, tileId, x, y);
      }

      if (Tilemap.isTileA3(tileId)) {
        return this.drawTileA3(bitmap, tileId, x, y);
      }

      if (Tilemap.isTileA4(tileId)) {
        return this.drawTileA4(bitmap, tileId, x, y);
      }
    }

    drawTile(tileId, x, y) {
      if (tileId <= 0) {
        return;
      }

      if (tileId >= Tilemap.TILE_ID_A1) {
        this.drawAutoTile(tileId, x, y);
      } else {
        this.drawNormalTile(tileId, x, y);
      }
    }
  });

  CycloneMapEditor.register();
})();

