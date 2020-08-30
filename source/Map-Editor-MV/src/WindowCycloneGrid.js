import { WindowCycloneGrid } from '../../Map-Editor/src/WindowCycloneGrid';

WindowCycloneGrid.prototype.initialize = function() {
  const width = Graphics.width;
  const height = Graphics.height;

  Window_Base.prototype.initialize.call(this, 0, 0, width, height);

  this.refresh();
  this.opacity = 0;

  this.backOpacity = 0;
  this.hide();
  this.deactivate();
};

WindowCycloneGrid.prototype.standardPadding = function() {
  return 0;
};
