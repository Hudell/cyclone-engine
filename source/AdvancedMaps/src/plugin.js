import '../../Core/main.min';
import { getMetaObject } from '../../Utils/getMetaObject';

class CycloneAdvancedMaps extends CyclonePlugin {
  static register() {
    super.initialize('CycloneAdvancedMaps');

    this.structs.set('CycloneCommonEventRegion', {
      regionId: 'int',
      commonEventId: 'int',
    });
    this.structs.set('CycloneNamedRegion', {
      regionId: 'int',
      name: 'string',
    });
    this.structs.set('CycloneLayerPosition', {
      x: 'int',
      y: 'int',
      unit: 'string',
      boundTo: 'string',
      moveX: 'int',
      moveY: 'int',
      tiling: 'boolean',
    });
    this.structs.set('CycloneOverlayItem', {
      layerName: 'string',
      fileName: 'string',
      tagName: 'string',
      appendMapId: {
        type: 'boolean',
        defaultValue: true,
      },
      switchId: 'int',
      invertSwitch: 'boolean',
      quickStart: {
        type: 'boolean',
        defaultValue: true,
      },
      z: 'int',
      opacity: {
        type: 'int',
        defaultValue: 255,
      },
      opacitySpeed: {
        type: 'int',
        defaultValue: 25,
      },
      blendMode: 'int',
      mapList: 'int[]',
      position: {
        type: 'struct<CycloneLayerPosition>',
        defaultValue: '{}',
      },
      fadeIn: 'boolean',
    });
    this.structs.set('CycloneCustomLayer', {
      name: 'string',
      layerName: 'string',
      file: 'string',
      fileName: 'string',
      // tag: 'string',
      switch: 'int',
      switchId: 'int',
      invertSwitch: 'boolean',
      z: 'int',
      opacity: 'int',
      opacitySpeed: 'int',
      blendMode: 'int',
      x: 'int',
      y: 'int',
      unit: 'string',
      boundTo: 'string',
      moveX: 'int',
      moveY: 'int',
      tiling: 'boolean'
    });

    super.register({
      debug: {
        name: 'debug',
        type: 'boolean',
        defaultValue: false,
      },
      mapChangeEventId: 'int',
      tileWidth: {
        type: 'int',
        defaultValue: 48,
      },
      tileHeight: {
        type: 'int',
        defaultValue: 48,
      },
      tilesetPath: {
        type: 'string',
        defaultValue: 'img/tilesets/',
      },
      disableTilemap: 'boolean',
      disableAutoShadows: 'boolean',
      balloonZ: {
        type: 'int',
        defaultValue: 7,
      },
      animationZ: {
        type: 'int',
        defaultValue: 8,
      },

      overlayEnabled: 'boolean',
      overlayPath: {
        type: 'string',
        defaultValue: 'img/overlays',
      },
      folders: 'string',

      layers: {
        type: 'struct<CycloneOverlayItem>[]',
        defaultValue: '[]',
      },

      bushRegionId: 'int',
      blockRegionId: 'int',
      unblockRegionId: 'int',
      blockPlayerRegionId: 'int',
      unblockPlayerRegionId: 'int',
      blockEventRegionId: 'int',
      unblockEventRegionId: 'int',

      commonEventRegions: {
        type: 'struct<CycloneCommonEventRegion>[]',
        defaultValue: '[]',
      },
      namedRegions: {
        type: 'struct<CycloneNamedRegion>[]',
        defaultValue: '[]',
      },
      regionNamesStay: 'boolean',
    });

    this.registerCommand('newLayerOpacity', {
      layerName: 'string',
      opacity: 'int',
      duration: 'int',
    }, ({layerName, opacity, duration}) => {
      this.changeLayerOpacity(layerName, opacity, duration);
    }, ['layerName', 'opacity', 'duration']);

    this.registerCommand('layer', {
      layerName: 'string',
      fileName: 'string',
    }, ({layerName, fileName}) => {
      if (!layerName || !fileName) {
        CycloneAdvancedMaps.params.debug && console.error('Invalid layer parameters', layerName, fileName);
        return;
      }

      CycloneAdvancedMaps.changeLayerFileName(layerName, fileName);
    }, ['layerName', 'fileName'])

    this.registerCommand('customLayer', {
      layerName: 'string',
      fileName: 'string',
      z : 'int',
      switchId: 'int',
      x: 'int',
      y: 'int',
      unit: 'string',
      invertSwitch: 'boolean',
    }, ({layerName, fileName, z, switchId = 0, x = 0, y = 0, unit = 'tiles', invertSwitch = false}) => {
      if (!layerName || !fileName || typeof z !== 'number') {
        CycloneAdvancedMaps.params.debug && console.error('Invalid custom layer parameters', layerName, fileName, z);
        return;
      }

      CycloneAdvancedMaps.addCustomLayer({
        layerName,
        fileName,
        z,
        switchId,
        invertSwitch,
        position: {
          x,
          y,
          unit: ['pixels', 'px'].includes(unit)  ? 'pixels' : 'tiles',
        },
      });
    }, ['layerName', 'fileName', 'z', 'switchId', 'x', 'y', 'unit', 'invertSwitch']);

    this.clearSettings();
  }

  static clearSettings() {
    this.params.debug && console.log('Clearing CycloneAdvancedMaps settings');

    const layers = this.params.layers;
    const commonEventRegions = this.params.commonEventRegions;
    const namedRegions = this.params.namedRegions;

    this.commonEventRegions = new Map();
    this.namedRegions = new Map();
    this.layers = [];
    for (let i = 0; i < layers.length; i++) {
      this.layers.push({
        ...layers[i],
        index: i,
        id: `cyclone_layer_${i}`,
        changed: false,
        extraX: 0,
        extraY: 0,
        opacityChange: this.opacitySpeedToChange(layers[i].opacitySpeed),
      })
    }

    this.params.debug && console.log('Layer Configuration', this.layers);

    for (const config of commonEventRegions) {
      if (config.regionId > 0 && config.commonEventId > 0) {
        this.commonEventRegions.set(config.regionId, config.commonEventId);
      }
    }
    for (const config of namedRegions) {
      if (config.regionId > 0) {
        this.namedRegions.set(config.regionId, config.name.trim());
      }
    }
  }

  static opacitySpeedToChange(speed) {
    if (speed) {
      return 255 / speed;
    }

    return 10;
  }

  static changeLayerOpacity(layerName, opacity, duration) {
    for (const layer of this.layers) {
      if (layer.layerName === layerName) {
        CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerName} opacity changed from ${ layer.opacity } to ${ opacity }, duration = ${ duration || layer.opacitySpeed }`);
        layer.opacity = opacity;
        layer.oneTimeOpacityDuration = duration;
        return;
      }
    }
  }

  static addCustomLayer(layerData) {
    this.params.debug && console.log('Add custom layer', layerData);

    // Remove an existing layer with the same name if found
    if (layerData.layerName) {
      for (let i = 0; i < this.layers.length; i++) {
        if (this.layers[i].layerName === layerData.layerName) {
          this.layers.splice(i, 1);
          break;
        }
      }
    }

    this.layers.push({
      extraX: 0,
      extraY: 0,
      ...layerData,
      index: this.layers.length,
      id: `cyclone_custom_layer_${ this.layers.length }`,
      changed: false,
      opacityChange: this.opacitySpeedToChange(layerData.opacitySpeed),
      mapList: [
        $gameMap._mapId,
      ],
    });
  }

  static loadMapCustomLayers() {
    const objects = getMetaObject($dataMap.note || '', 'customLayer');
    const structType = this.structs.get('CycloneCustomLayer');

    for (const data of objects) {
      CycloneAdvancedMaps.parseStructData(structType, data);

      if (!data.name && !data.layerName) {
        this.params.debug && console.error('Custom Layer is missing a name');
        continue;
      }

      this.addCustomLayer({
        layerName: data.name || data.layerName,
        fileName: data.file || data.fileName || '',
        tagName: '',
        appendMapId: false,
        switchId: data.switch || data.switchId || 0,
        invertSwitch: !!data.invertSwitch,
        quickStart: false,
        z: data.z || 0,
        opacity: data.opacity || 255,
        opacitySpeed: data.opacitySpeed || 25,
        blendMode: data.blendMode || 0,
        fadeIn: false,
        position: {
          x: data.x || 0,
          y: data.y || 0,
          unit: ['pixels', 'px'].includes(data.unit) ? 'pixels' : 'tiles',
          boundTo: data.boundTo === 'screen' ? 'screen' : 'map',
          moveX: data.moveX || 0,
          moveY: data.moveY || 0,
          tiling: !!data.tiling,
        }
      });
    }
  }

  static changeLayerFileName(layerName, fileName) {
    for (const layer of this.layers) {
      if (layer.layerName === layerName) {
        CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerName} file name changed from ${ layer.fileName } to ${ fileName }`);
        layer.fileName = fileName;
        layer.changed = true;
        return;
      }
    }
  }

  static checkRegionActions() {
    const regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);

    if (this.commonEventRegions.has(regionId)) {
      this.runCommonEvent(this.commonEventRegions.get(regionId));
    }
  }
}

globalThis.CycloneAdvancedMaps = CycloneAdvancedMaps;
CycloneAdvancedMaps.register();
