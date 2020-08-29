import { WindowCycloneMapEditorStatus } from '../../Map-Editor/src/WindowCycloneMapEditorStatus';

WindowCycloneMapEditorStatus.prototype.initialize = function() {
  const h = 40;
  Window_Base.prototype.initialize.call(this, 0, Graphics.height - h, Graphics.width, h);
  this.showBackgroundDimmer();
};

WindowCycloneMapEditorStatus.prototype.textY = function() {
  return 2;
};

WindowCycloneMapEditorStatus.prototype.standardPadding = function() {
  return 8;
};