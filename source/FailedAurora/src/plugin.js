/* eslint-disable camelcase */
import {
  CyclonePlugin
} from '../../Core/main';

const cache = {};
const lights = {
  // ARTIFICIAL
  halogen: {
    fileName: 'halogen',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  halogen_big: {
    fileName: 'halogen',
    intensity: 100,
    variation: 0,
    size: 180,
    offsetX: 0,
    offsetY: 0
  },
  tungsten: {
    fileName: 'tungsten',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  fluorescent: {
    fileName: 'fluorescent',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  broken: {
    fileName: 'halogen',
    intensity: 60,
    variation: 30,
    offsetX: 0,
    offsetY: 0
  },
  flashlight: {
    fileName: 'flashlight',
    intensity: 100,
    variation: 0,
    offsetX: {
      2: 0,
      4: 0,
      6: 0,
      8: 0
    },
    offsetY: {
      2: 0,
      4: 0,
      6: 0,
      8: 0
    },
    syncWithDirection: true
  },
  // CANDLE
  candle: {
    fileName: 'candle',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  // TORCH
  torch: {
    fileName: 'torch',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  torch_big: {
    fileName: 'torch',
    intensity: 80,
    variation: 20,
    size: 150,
    offsetX: 0,
    offsetY: 0
  },
  white_torch: {
    fileName: 'white',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  red_torch: {
    fileName: 'red',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  green_torch: {
    fileName: 'green',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  blue_torch: {
    fileName: 'blue',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  pink_torch: {
    fileName: 'pink',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  cyan_torch: {
    fileName: 'cyan',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  yellow_torch: {
    fileName: 'yellow',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  purple_torch: {
    fileName: 'purple',
    intensity: 80,
    variation: 20,
    offsetX: 0,
    offsetY: 0
  },
  // COLORED 
  white: {
    fileName: 'white',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  red: {
    fileName: 'red',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  green: {
    fileName: 'green',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  blue: {
    fileName: 'blue',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  pink: {
    fileName: 'pink',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  cyan: {
    fileName: 'cyan',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  yellow: {
    fileName: 'yellow',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  purple: {
    fileName: 'purple',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
  // TEST
  test: {
    fileName: 'test',
    intensity: 100,
    variation: 0,
    offsetX: 0,
    offsetY: 0
  },
};

class CycloneAurora extends CyclonePlugin {
  static register() {
    super.initialize('CycloneAurora');

    super.register({});
  }

  static get clearLightOnTransfer() {
    return true;
  }

  static loadResources() {
    const lightNames = Object.keys(lights);
    for (const name of lightNames) {
      const data = lights[name];
      if (data.syncWithDirection) {
        cache[name] = {
          2: ImageManager.loadLight(`${ data.fileName }_2`),
          4: ImageManager.loadLight(`${ data.fileName }_4`),
          6: ImageManager.loadLight(`${ data.fileName }_6`),
          8: ImageManager.loadLight(`${ data.fileName }_8`),
        };
      } else {
        cache[name] = ImageManager.loadLight(data.fileName);
      }
    }
  }

  getCachedBitmap(id, direction = 2) {
    const item = cache[id];
    if (item && item.hasOwnProperty[direction]) {
      return item[direction];
    }

    return item;
  }

  getData(lightId) {
    return lights[lightId];
  }
}

globalThis.CycloneAurora = CycloneAurora;
CycloneAurora.register();