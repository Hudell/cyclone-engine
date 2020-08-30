import { WindowCycloneMapEditorLayerList } from '../../Map-Editor/src/WindowCycloneMapEditorLayerList';

WindowCycloneMapEditorLayerList.prototype.initialize = function() {
  const x = Graphics.width - CycloneMapEditor.windowWidth;
  const y = SceneManager._scene._mapEditorCommands.height;
  const h = 150;
  Window_Base.prototype.initialize.call(this, x, y, CycloneMapEditor.windowWidth, h);
  this.showBackgroundDimmer();
};

WindowCycloneMapEditorLayerList.prototype.standardPadding = function() {
  return 8;
};
