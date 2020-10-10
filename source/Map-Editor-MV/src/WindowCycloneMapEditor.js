import { WindowCycloneMapEditor } from '../../Map-Editor/src/WindowCycloneMapEditor';

WindowCycloneMapEditor.prototype.initialize = function() {
  const x = Graphics.width - CycloneMapEditor.windowWidth;
  const y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;

  Window_Command.prototype.initialize.call(this, x, y);
  this.showBackgroundDimmer();
};

WindowCycloneMapEditor.prototype.windowWidth = function() {
  return CycloneMapEditor.windowWidth;
};

WindowCycloneMapEditor.prototype.windowHeight = function() {
  const y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
  return Graphics.height - y - SceneManager._scene._mapEditorStatus.height;
};

WindowCycloneMapEditor.prototype.spacing = function() {
  return 0;
};

WindowCycloneMapEditor.prototype.standardPadding = function() {
  return 8;
};

WindowCycloneMapEditor.prototype.processTouch = function() {
  return this.processTouchScroll();
};

WindowCycloneMapEditor.prototype._updateCursor = function() {
  this._windowCursorSprite.visible = false;
};
