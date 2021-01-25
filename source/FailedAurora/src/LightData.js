import { AuroraLight } from './AuroraLight';

export class LightData {
  constructor() {
    this.initialize();
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    this._enabled = value;
  }

  get ambientLight() {
    return this._ambientLight;
  }

  get autoAmbientLight() {
    return this._autoAmbientLight;
  }

  set autoAmbientLight(value) {
    this._autoAmbientLight = value;
  }

  initialize() {
    this._enabled = true;
    this._ambientLight = new AuroraLight();
    this._autoAmbientLight = true;
    this._savedStates = {};
    this.resetLighting();
  }

  resetLighting() {
    this._ambientLight.reset();
  }

  update() {
    if (!this._enabled) {
      return;
    }

    this._ambientLight.update();
  }

  enable() {
    this._enabled = true;
  }

  disable() {
    this._enabled = false;
  }

  setAmbientLightIntensity(targetIntensity, time = 0) {
    this._ambientLight.setTargetIntensity(targetIntensity.clamp(0, 100) / 100, time);
  }

  setAmbientLightColor(red, green, blue, time = 0) {
    this._ambientLight.setTargetColor(red / 255, green / 255, blue / 255, time);
  }
}