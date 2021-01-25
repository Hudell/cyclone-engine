import { LightData } from './LightData';
import { TileLight } from './TileLight';

import '../../Shared/iterateTiles';

CycloneAurora.patchClass(Game_Map, $super => class {
  get lightData() {
    return this._lightData;
  }

  get tileLights() {
    return this._tileLights;
  }

  initialize() {
    this._lightData = new LightData();
    $super.initialize.call(this);
  }

  setupEvents(...args) {
    this._terrainTagLights = {};
    this._regionTagLights = {};
    this._tileLights = {};

    if (CycloneAurora.clearLightOnTransfer) {
      this._lightData.setAmbientLightIntensity(100);
      this._lightData.setAmbientLightColor(255, 255, 255);
    }

    this._lightData.setAmbientLightIntensity(40);
    this._lightData.setAmbientLightColor(255, 255, 255);


    $super.setupEvents.call(this, ...args);
  }

  setup(...args) {
    $super.setup.call(this, ...args);
    if (!$dataMap) {
      return;
    }

    // this.getHeightMap();
    this.loadMapLights();
  }

  loadMapLights() {
    this.iterateTiles((x, y) => {
      const regionId = this.regionId(x, y);
      if (regionId && this._regionTagLights[regionId]) {
        const lightId = this._regionTagLights[regionId];
        this.addTileLight(x, y, lightId);
      }

      const tag = this.terrainTag(x, y);
      if (tag && this._terrainTagLights[tag]) {
        const lightId = this._terrainTagLights[tag];
        this.addTileLight(x, y, lightId);
      }
    });
  }

  addTileLight(x, y, lightId) {
    this._tileLights.push(new TileLight(x, y, lightId));
  }

  getHeightLevel(x, y) {
    return 0;
    // return this.isValid(x, y) ? this._heightMap[x][y] : null;
  }

  // setHeight(x, y, h) {
  //   this._heightMap[x][y] = h;
  // }

  isWall(x, y) {
    // return this.getHeight(x, y) % 2 == 1;
    return false;
  }

  isFloor(x, y) {
    // return this.getHeight(x, y) % 2 == 0;
    return true;
  }

  genHeightMap() {
    this._heightMap = [];
    // for (var x = 0; x < this.width(); x++) {
    //   this._heightMap.push([]);
    //   for (var y = 0; y < this.height(); y++) {
    //     var h = Math.floor(this.regionId(x, y) / 10) * 2;
    //     this._heightMap[x].push(h);
    //   };
    // };
    // for (var x = 0; x < this.width(); x++) {
    //   for (var y = 0; y < this.height(); y++) {
    //     var h = this._heightMap[x][y];
    //     var nh = this.getHeight(x, y + 1);
    //     if (h > 0 && this.isFloor(x, y) && h > nh) {
    //       h -= 1;
    //       var dy = 1;
    //       while (h > 0 && (nh == 0 || h - 1 > nh) && this.isValid(x, y + dy)) {
    //         this.setHeight(x, y + dy, h);
    //         h -= 2;
    //         dy += 1;
    //         if (this.isValid(x, y + dy)) nh = this.getHeight(x, y + dy);
    //       };
    //     };
    //   };
    // };
  }
});
