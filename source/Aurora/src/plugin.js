/* eslint-disable camelcase */
import '../../Core/main.min';
import { colors } from './constants';
import { PlayerLight } from './managers/PlayerLight';
import { EventLight } from './managers/EventLight';
import { TimeSystemLight } from './managers/TimeSystemLight';

class CycloneAurora extends CyclonePlugin {
  static register() {
    super.initialize('CycloneAurora');

    super.register({});
    this.enabled = true;

    PlayerLight.register();
    EventLight.register();
    TimeSystemLight.register();
  }

  static get defaultMaskColor() {
    return 'black';
  }
  static get opacityVariable() {
    return 0;
  }
  static get lightMaskSwitch() {
    return 0;
  }
  static get tintSpeed() {
    return 0.3;
  }
  static get defaultBackOpacity() {
    return 160;
  }

  static get enabled() {
    return this._enabled;
  }
  static set enabled(value) {
    this._enabled = value;
  }

  static get dirty() {
    return this._dirty;
  }
  static set dirty(value) {
    this._dirty = value;
  }

  static get lastMaskColor() {
    return this._lastMaskColor;
  }
  static set lastMaskColor(value) {
    this._lastMaskColor = value;
  }
  static get currentRGB() {
    return this._currentRGB;
  }
  static set currentRGB(value) {
    this._currentRGB = value;
  }
  static get lastOpacity() {
    return this._lastOpacity;
  }
  static set lastOpacity(value) {
    this._lastOpacity = value;
  }
  static get showing() {
    return this._showing;
  }
  static set showing(value) {
    this._showing = value;
  }

  static clear() {
    this._currentRGB = undefined;
    this._lastMaskColor = undefined;
    this._lastOpacity = undefined;
  }

  static shouldShowLightMask() {
    return this.lightMaskSwitch === 0 || $gameSwitches.value(this.lightMaskSwitch);
  }

  static isActive() {
    return this.enabled;
  }

  static colorNameToHex(color) {
    if (color.charAt('0') == '#') {
      return color;
    }

    const colorName = color.toLowerCase();

    if (typeof colors[colorName] !== 'undefined') {
      return colors[colorName];
    }

    return false;
  }

  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red : parseInt(result[1], 16),
      green : parseInt(result[2], 16),
      blue : parseInt(result[3], 16)
    } : null;
  }

  static getCharacterPosition(character) {
    const pw = $gameMap.tileWidth();
    const ph = $gameMap.tileHeight();
    const dx = $gameMap.displayX();
    const dy = $gameMap.displayY();
    const px = character._realX;
    const py = character._realY;
    const pd = character._direction;

    const x1 = (pw / 2) + ((px - dx) * pw);
    const y1 = (ph / 2) + ((py - dy) * ph);

    return [x1, y1, pd];
  }
}

globalThis.CycloneAurora = CycloneAurora;
CycloneAurora.register();