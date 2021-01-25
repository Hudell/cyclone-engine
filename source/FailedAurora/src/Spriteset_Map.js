import { LightLayer } from './LightLayer';

CycloneAurora.patchClass(Spriteset_Map, $super => class {
  createLowerLayer() {
    $super.createLowerLayer.call(this);
    CycloneAurora.loadResources();
    this._lighting = new LightLayer($gameMap.lightData);
    this._lighting.addMapLights();

    $gamePlayer.setLight('torch');

    this.addChild(this._lighting.layerSprite);
  }

  update() {
    $super.update.call(this);
    if (this._lighting) {
      this._lighting.update();
    }
  }

  clearScene() {
    this._lighting = null;
  }
});
