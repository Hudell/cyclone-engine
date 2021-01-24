import { CyclonePlugin } from '../../Core/main';

import { loadFileAsync } from '../../Utils/loadFileAsync';

class CycloneEvents extends CyclonePlugin {
  static register() {
    super.initialize('CycloneEvents');

    super.register({
    });
  }

  static getAnotherMapData(mapId, callback) {
    const variableName = `$Map${ mapId.padZero(3) }`;
    const fileName = `data/Map${ mapId.padZero(3) }.json`;

    const onLoad = (xhr, filePath, name) => {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);

        callback();
      }
    };

    if (window[variableName] === undefined || window[variableName] === null) {
      loadFileAsync(fileName, undefined, onLoad);
    } else {
      callback();
    }
  }
}

globalThis.CycloneEvents = CycloneEvents;
CycloneEvents.register();
