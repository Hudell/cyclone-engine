import { CyclonePatcher } from '../../Core/patcher';
import { LZString } from '../../Libs/lz-string.min';

class CycloneExtraLayers extends CyclonePatcher {
  static register() {
    this.initialize('CycloneExtraLayers');
  }

  static parseExtraLayers(object) {
    if (!object || !object.note || !object.data) {
      return;
    }

    if (!object.note.includes('<CycloneExtraLayers>')) {
      return;
    }

    const matches = object.note.match(/<CycloneExtraLayers>(.*)<\/CycloneExtraLayers>/i);
    if (matches.length < 2) {
      return;
    }

    const compressed = matches[1];
    try {
      const extraLayersStr = LZString.decompressFromBase64(compressed);
      const extraLayers = JSON.parse(extraLayersStr);
      if (!extraLayers || !Array.isArray(extraLayers)) {
        return;
      }
      object.extraLayers = extraLayers;
    } catch(e) {
      console.error(e);
      return;
    }
  }

  static loadExtraLayers(object) {
    this.parseExtraLayers(object);
  }
}

globalThis.CycloneExtraLayers = CycloneExtraLayers;
CycloneExtraLayers.register();
