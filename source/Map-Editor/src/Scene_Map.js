import { WindowCycloneGrid } from './WindowCycloneGrid';
import { WindowCycloneMapEditorCommands } from './WindowCycloneMapEditorCommands';
import { WindowCycloneMapEditorLayerList } from './WindowCycloneMapEditorLayerList';
import { WindowCycloneMapEditorStatus } from './WindowCycloneMapEditorStatus';
import { WindowCycloneMapEditorTabs } from './WindowCycloneMapEditorTabs';
import { WindowCycloneMapEditor } from './WindowCycloneMapEditor';
import { Layers, Tools } from './constants';

let lastDisplayX = 0;
let lastDisplayY = 0;

CycloneMapEditor.patchClass(Scene_Map, $super => class {
  createAllWindows() {
    $super.createAllWindows.call(this);

    this.createMapEditorWindows();
    CycloneMapEditor.clearAllData();
    this.refreshMapEditorWindows();
    CycloneMapEditor.addMenuBar();

    CycloneMapEditor.loadExtraData();
  }

  toggleMapEditor() {
    if (CycloneMapEditor.active && CycloneMapEditor.changeHistory.length > 0) {
      if (confirm('Do you want to save your map before hiding the map editor?')) {
        CycloneMapEditor._doSave();
      }
    }

    CycloneMapEditor.tileWidth = $gameMap.tileWidth();
    CycloneMapEditor.tileHeight = $gameMap.tileHeight();
    CycloneMapEditor.active = !CycloneMapEditor.active;

    this.refreshMapEditorWindows();
    this._spriteset._mapEditorCursor.updateDrawing();
    this._spriteset.updatePosition();
  }

  createMapEditorWindows() {
    CycloneMapEditor.tileWidth = $gameMap.tileWidth();
    CycloneMapEditor.tileHeight = $gameMap.tileHeight();

    const neededWidth = CycloneMapEditor.tileDrawWidth * 8 + 24;
    if (neededWidth > CycloneMapEditor.windowWidth) {
      CycloneMapEditor.windowWidth = neededWidth;
    }

    this._mapEditorGrid = new WindowCycloneGrid();
    this.addChild(this._mapEditorGrid);
    this._mapEditorGrid.hide();
    this._mapEditorGrid.deactivate();

    this._mapEditorCommands = new WindowCycloneMapEditorCommands();
    this.addChild(this._mapEditorCommands);
    this._mapEditorCommands.hide();
    this._mapEditorCommands.deactivate();

    this._mapEditorLayerListWindow = new WindowCycloneMapEditorLayerList();
    this.addChild(this._mapEditorLayerListWindow);
    this._mapEditorLayerListWindow.hide();
    this._mapEditorLayerListWindow.deactivate();

    this._mapEditorTabsWindow = new WindowCycloneMapEditorTabs();
    this.addChild(this._mapEditorTabsWindow);
    this._mapEditorTabsWindow.hide();
    this._mapEditorTabsWindow.deactivate();

    this._mapEditorStatus = new WindowCycloneMapEditorStatus();
    this.addChild(this._mapEditorStatus);
    this._mapEditorStatus.hide();
    this._mapEditorStatus.deactivate();

    this._mapEditorWindow = new WindowCycloneMapEditor();
    this.addChild(this._mapEditorWindow);
    this._mapEditorWindow.hide();
    this._mapEditorWindow.deactivate();
  }

  refreshMapEditorWindows() {
    const { active } = CycloneMapEditor;

    this._mapEditorGrid.visible = active;
    this._mapEditorCommands.visible = active;
    this._mapEditorLayerListWindow.visible = active;
    this._mapEditorWindow.visible = active;
    this._mapEditorStatus.visible = active;
    this._mapEditorTabsWindow.visible = active;

    this._mapEditorCommands.active = active;
    this._mapEditorLayerListWindow.active = active;
    this._mapEditorWindow.active = active;
    this._mapEditorTabsWindow.active = active;

    this._mapEditorCommands.refresh();
    this._mapEditorLayerListWindow.refresh();
    this._mapEditorTabsWindow.refresh();
    this._mapEditorWindow.refresh();
    this._mapEditorGrid.refresh();
    this._mapEditorStatus.refresh();

    if (active) {
      this._spriteset._mapEditorCursor.updateDrawing();
    }
    CycloneMapEditor.refreshMenuVisibility();
  }

  redrawMap() {
    this._spriteset._tilemap.refresh();
  }

  processMapTouch() {
    if (!CycloneMapEditor.active) {
      $super.processMapTouch.call(this);
      return;
    }

    this._touchCount = 0;
    if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
      this.onMapTouch();
    }
  }

  onMapTouch() {
    if (!CycloneMapEditor.active) {
      $super.onMapTouch.call(this);
      return;
    }
  }

  editorX() {
    return Graphics.width - CycloneMapEditor.windowWidth;
  }

  canUpdateMouse() {
    return CycloneMapEditor.active && this._mapEditorWindow && this._mapEditorLayerListWindow;
  }

  updateMenuTouch(x, y, pressed) {
    if (!pressed) {
      return;
    }

    if (x > this._mapEditorLayerListWindow.x && x < this._mapEditorLayerListWindow.x + this._mapEditorLayerListWindow.width) {
      if (y < this._mapEditorLayerListWindow.height + this._mapEditorLayerListWindow.y) {
        if (!CycloneMapEditor.wasPressing) {
          this._mapEditorLayerListWindow.onMapTouch(x - this._mapEditorLayerListWindow.x, y - this._mapEditorLayerListWindow.y);
          CycloneMapEditor.wasPressing = true;
        }

        return true;
      }
    }

    if (x > this._mapEditorWindow.x && x < this._mapEditorWindow.x + this._mapEditorWindow.width) {
      this._mapEditorWindow.onMapTouch(x - this._mapEditorWindow.x, y - this._mapEditorWindow.y);
      return true;
    }
  }

  updateRightMouse() {
    if (!this.canUpdateMouse()) {
      CycloneMapEditor.isRightButtonDown = false;
      CycloneMapEditor.wasRightButtonDown = false;
      return;
    }

    if (!CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown) {
      return;
    }

    const { x, y } = TouchInput;
    if (this.updateMenuTouch(x, y, CycloneMapEditor.isRightButtonDown)) {
      return;
    }

    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);

    if (mapX >= 0 && mapY >= 0) {
      CycloneMapEditor.updateRightTouch(mapX, mapY);
    }

    CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
  }

  updateDisplayPositionData() {
    if (lastDisplayX === $gameMap._displayX && lastDisplayY === $gameMap._displayY) {
      return;
    }

    const xDiff = $gameMap._displayX - lastDisplayX;
    const yDiff = $gameMap._displayY - lastDisplayY;

    if (xDiff > 10 || yDiff > 10) {
      // If the difference is too big, then we don't update
      return;
    }

    if ((CycloneMapEditor.rectangleWidth > 0 || CycloneMapEditor.rectangleBackWidth > 0) && (CycloneMapEditor.rectangleHeight > 0 || CycloneMapEditor.rectangleBackHeight > 0)) {
      CycloneMapEditor.rectangleStartMouseX += xDiff * CycloneMapEditor.tileWidth;
      CycloneMapEditor.rectangleStartMouseY += yDiff * CycloneMapEditor.tileHeight;
    }
  }

  getSelectionTileAt(x, y) {
    if (x <= this._mapEditorWindow.x || x >= this._mapEditorWindow.x + this._mapEditorWindow.width) {
      return CycloneMapEditor.currentTileId;
    }

    if (y >= this._mapEditorWindow.height + this._mapEditorWindow.y) {
      return CycloneMapEditor.currentTileId;
    }

    const index = this._mapEditorWindow.hitIndex();
    if (index >= 0) {
      return this._mapEditorWindow.commandName(index);
    }
  }

  updateMouse() {
    if (!this.canUpdateMouse()) {
      CycloneMapEditor.wasPressing = false;
      return;
    }

    this.updateDisplayPositionData();
    lastDisplayX = $gameMap._displayX;
    lastDisplayY = $gameMap._displayY;

    const pressed = TouchInput.isPressed();
    const { x, y } = TouchInput;
    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);
    const fx = Math.floor(mapX);
    const fy = Math.floor(mapY);

    const tile1 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 0, true);
    const tile2 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 1, true);
    const tile3 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 2, true);
    const tile4 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 3, true);
    const tileId = this.getSelectionTileAt(x, y) ?? '';

    CycloneMapEditor.updateStatus({
      mapX,
      mapY,
      tile1,
      tile2,
      tile3,
      tile4,
      tileId,
    });

    if (!pressed && !CycloneMapEditor.wasPressing) {
      return;
    }

    if (this.updateMenuTouch(x, y, pressed)) {
      return;
    }

    let minX = 0;
    let minY = 0;

    if (CycloneMapEditor.isLayerVisible(Layers.blend) && [Tools.pencil, Tools.eraser].includes(CycloneMapEditor.currentTool)) {
      minX--;
      minY--;
    }

    if (mapX >= minX && mapY >= minY) {
      if (Input.isPressed('control') && !CycloneMapEditor.wasPressing) {
        CycloneMapEditor.selectHigherLayer(mapX, mapY);
      } else {
        CycloneMapEditor.updateCurrentToolTouch(mapX, mapY);
      }
    }

    CycloneMapEditor.wasPressing = pressed;
  }


  isMenuEnabled() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isMenuEnabled.call(this);
  }

  update() {
    $super.update.call(this);

    if (!CycloneMapEditor.active) {
      return;
    }

    if (CycloneMapEditor.wasPressing || CycloneMapEditor.wasRightButtonDown) {
      if (this._isControlPressed !== Input.isPressed('control') || this._isShiftPressed !== Input.isPressed('shift')) {
        this.updateMouse();
      }
    }

    this._isControlPressed = Input.isPressed('control');
    this._isShiftPressed = Input.isPressed('shift');
  }
});
