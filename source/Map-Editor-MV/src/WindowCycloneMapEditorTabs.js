import { WindowCycloneMapEditorTabs } from '../../Map-Editor/src/WindowCycloneMapEditorTabs';

WindowCycloneMapEditorTabs.prototype.initialize = function() {
  const x = Graphics.width - CycloneMapEditor.windowWidth;
  const y = SceneManager._scene._mapEditorCommands.y + SceneManager._scene._mapEditorCommands.height;
  Window_Command.prototype.initialize.call(this, x, y);
  this.showBackgroundDimmer();
  this.configureHandlers();
};

WindowCycloneMapEditorTabs.prototype.windowWidth = function() {
  return CycloneMapEditor.windowWidth;
};

WindowCycloneMapEditorTabs.prototype.windowHeight = function() {
  return 65;
};

WindowCycloneMapEditorTabs.prototype.standardPadding = function() {
  return 8;
};

WindowCycloneMapEditorTabs.prototype.spacing = function() {
  return 6;
};

WindowCycloneMapEditorTabs.prototype._updateCursor = function() {
  this._windowCursorSprite.visible = false;
};

WindowCycloneMapEditorTabs.prototype.itemHeight = function() {
  return this.lineHeight() + 8;
};

WindowCycloneMapEditorTabs.prototype.onTouch = function(triggered) {
  const x = this.canvasToLocalX(TouchInput.x);
  const y = this.canvasToLocalY(TouchInput.y);
  const hitIndex = this.hitTest(x, y);

  if (hitIndex >= 0) {
    this.select(hitIndex);
    if (triggered) {
      this.processOk();
    }
  }
};
