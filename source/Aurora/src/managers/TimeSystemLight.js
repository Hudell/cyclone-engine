import { pluginIsActive } from '../../../Utils/pluginIsActive';

const hourColors = [
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#111111',
  '#111111',
  '#666666',
  '#AAAAAA',
  '#EEEEEE',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#EEEEEE',
  '#AAAAAA',
  '#776666',
  '#441111',
  '#000000',
  '#000000',
  '#000000',
];

const insideColors = [
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
];

export class TimeSystemLight {
  static get enabled() {
    return this._enabled;
  }

  static set enabled(value) {
    this._enabled = value;
  }

  static get hourColors() {
    return hourColors;
  }

  static get insideBuildingHoursColor() {
    return insideColors;
  }

  static getCurrentColor(lightmask) {
    if (!window.CycloneTime) {
      return;
    }

    const { hour } = CycloneTime;
    // #ToDo: add support to different colors when inside buildings

    return hourColors[hour % hourColors.length];
  }

  static register() {
    CycloneAurora.registerEvent('calculateMaskColor', (...args) => {
      return this.getCurrentColor(...args);
    });

    this.enabled = pluginIsActive('CycloneTime');
  }
}