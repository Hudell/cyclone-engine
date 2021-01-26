import { Lightmask } from '../classes/Lightmask';

CycloneAurora.patchClass(Spriteset_Map, $super => class {
  createWeather() {
    this.createLightmask();
    $super.createWeather.call(this);
  }

  createLightmask() {
    this._lightmask = new Lightmask();
    this.addChild(this._lightmask);
  }
});
