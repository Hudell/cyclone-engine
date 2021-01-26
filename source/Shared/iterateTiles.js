import { CyclonePatcher } from '../Core/patcher';

CyclonePatcher.patchClass(Game_Map, $super => class {
  iterateTiles(callback) {
    const { width, height } = $dataMap;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        callback(x, y);
      }
    }
  }
});
