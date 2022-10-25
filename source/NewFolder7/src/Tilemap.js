import { WindowGrid } from './windows/WindowGrid';

CycloneNewFolder7.patchClass(Tilemap, $super => class {
  initialize(...args) {
    $super.initialize.call(this, ...args);
    this._mapGridWindow = new WindowGrid();
    this.addChild(this._mapGridWindow);
  }
});
