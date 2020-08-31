import { WindowCycloneMapEditorCommands } from '../../Map-Editor/src/WindowCycloneMapEditorCommands';

WindowCycloneMapEditorCommands.prototype.initialize = function() {
  const x = Graphics.width - CycloneMapEditor.windowWidth;
  const y = 0;
  Window_Command.prototype.initialize.call(this, x, y);
  this.showBackgroundDimmer();
  this.configureHandlers();
};

WindowCycloneMapEditorCommands.prototype.windowWidth = function() {
  return CycloneMapEditor.windowWidth;
};

WindowCycloneMapEditorCommands.prototype.windowHeight = function() {
  return 74;
};

WindowCycloneMapEditorCommands.prototype.standardPadding = function() {
  return 8;
};

WindowCycloneMapEditorCommands.prototype.spacing = function() {
  return 6;
};

WindowCycloneMapEditorCommands.prototype._updateCursor = function() {
  this._windowCursorSprite.visible = false;
};

WindowCycloneMapEditorCommands.prototype.itemHeight = function() {
  return this.lineHeight() + 8;
};

WindowCycloneMapEditorCommands.prototype.onTouch = function(triggered) {
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
