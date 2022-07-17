import { WindowRegionName } from './WindowRegionName';

CycloneAdvancedMaps.patchClass(Scene_Map, $super => class {
  createRegionNameWindow() {
    const rect = this.mapNameWindowRect();
    this._regionNameWindow = new WindowRegionName(rect);
    this.addChild(this._regionNameWindow);
  }

  createMapNameWindow() {
    $super.createMapNameWindow.call(this);
    this.createRegionNameWindow();
  }

  updateTransferPlayer() {
    if ($gamePlayer.isTransferring()) {
      this._regionNameWindow.close();
    }

    $super.updateTransferPlayer();
    this._regionNameWindow._delay = 0;
    this._regionNameWindow.update();
  }

  callMenu() {
    $super.callMenu.call(this);
    this._regionNameWindow.hide();
  }

  launchBattle() {
    $super.launchBattle.call(this);
    this._regionNameWindow.hide();
  }

  stop() {
    this._regionNameWindow.close();
    $super.stop.call(this);
  }
});
