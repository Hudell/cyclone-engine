import { WindowCycloneMapEditorLayerList } from '../../Map-Editor/src/WindowCycloneMapEditorLayerList';

WindowCycloneMapEditorLayerList.prototype.initialize = function() {
  const x = 0;
  const y = 0;
  const h = Graphics.height - 40;
  const w = 180;
  Window_Base.prototype.initialize.call(this, x, y, w, h);
  this.showBackgroundDimmer();
};

WindowCycloneMapEditorLayerList.prototype.standardPadding = function() {
  return 8;
};
