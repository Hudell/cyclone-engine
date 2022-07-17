import '../../Core/main.min';

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
    this.structs.set('CycloneOverlayItem', {
      layerName: 'string',
      fileName: 'string',
      tagName: 'string',
      appendMapId: {
        type: 'boolean',
        defaultValue: true,
      },
      switchId: 'int',
      quickStart: {
        type: 'boolean',
        defaultValue: true,
      },
      z: 'int',
      opacity: {
        type: 'int',
        defaultValue: 255,
      },
      mapList: 'int[]',
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
      animationsZ: {
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

    this.registerCommand('changeOpacity', {
      layerName: 'string',
      opacity: 'int',
      duration: 'int',
    }, ({layerName, opacity, duration}) => {
      this.newFogOpacity = opacity;
      this.newFogOpacityDuration = duration;
    }, ['opacity', 'duration']);

    this.registerCommand('fogFadeout', {
      duration: 'int',
    }, ({duration}) => {
      this.needsFogFadeOut = true;
      this.fogFadeOutDuration = duration;
    }, ['duration']);

    this.registerCommand('moveFog', {
      moveX: 'int',
      moveY: 'int',
    }, ({moveX, moveY}) => {
      this.fogMoveX = moveX;
      this.fogMoveY = moveY;
    }, ['moveX', 'moveY']);

    this.registerCommand('fogBlendMode', {
      blend: 'int',
    }, ({blend}) => {
      this.fogBlendMode = blend;
    }, ['blend']);

    this.registerCommand('fog', {
      fileName: 'string',
      moveX: 'int',
      moveY: 'int',
      blend: 'int',
    }, ({fileName, moveX, moveY, blend}) => {
      CycloneAdvancedMaps.params.debug && console.log('change FOG layer', fileName);
      this.fogFileName = fileName;
      this.changedFogFileName = true;
    }, ['fileName', 'moveX', 'moveY', 'blend']);

    this.registerCommand('light', ({fileName}) => {
      CycloneAdvancedMaps.params.debug && console.log('change LIGHT layer', fileName);
      this.lightName = fileName;
      this.changedLightFileName = true;
    }, ['fileName']);

    this.registerCommand('shadow', ({fileName}) => {
      CycloneAdvancedMaps.params.debug && console.log('change SHADOW layer', fileName);
      this.shadowName = fileName;
      this.changedShadowFileName = true;
    }, ['fileName']);
    this.registerCommand('par', ({fileName}) => {
      CycloneAdvancedMaps.params.debug && console.log('change PAR layer', fileName);
      this.parallaxName = fileName;
      this.changedParallaxFileName = true;
    }, ['fileName']);

    this.registerCommand('ground', ({fileName}) => {
      CycloneAdvancedMaps.params.debug && console.log('change GROUND layer', fileName);
      this.groundName = fileName;
      this.changedGroundFileName = true;
    }, ['fileName']);

    this.clearSettings();
  }

  static get groundZ() {
    return this.params.groundZ;
  }
  static get parallaxZ() {
    return this.params.parallaxZ;
  }
  static get shadowZ() {
    return this.params.shadowZ;
  }
  static get fogZ() {
    return this.params.fogZ;
  }
  static get lightZ() {
    return this.params.lightZ;
  }

  static clearSettings() {
    // Set this attribute to a numeric value to change the fog opacity temporarily
    this.newFogOpacity = false;
    // Set this to use a custom duration for the fog opacity transition
    this.newFogOpacityDuration = 0;
    // Set this to true to fade out the fog and then erase the temporary fog data
    this.needsFogFadeOut = false;
    this.fogFadeOutDuration = 1;

    this.fogMoveX = 0;
    this.fogMoveY = 0;
    this.fogBlendMode = 0;

    // the default opacity and duration are loaded with the map
    this.fogOpacity = 255;
    this.fogDuration = 1;

    this.fogFileName = '';
    this.changedFogFileName = false;

    this.changedLightFileName = false;
    this.lightName = '';

    this.changedShadowFileName = false;
    this.shadowName = '';

    this.changedParallaxFileName = false;
    this.parallaxName = '';

    this.changedGroundFileName = false;
    this.groundName = '';

    this.blockRegionId = this.params.blockRegionId;
    this.unblockRegionId = this.params.unblockRegionId;
    this.blockPlayerRegionId = this.params.blockPlayerRegionId;
    this.unblockPlayerRegionId = this.params.unblockPlayerRegionId;
    this.blockEventRegionId = this.params.blockEventRegionId;
    this.unblockEventRegionId = this.params.unblockEventRegionId;

    this.disableAutoShadows = this.params.disableAutoShadows;

    const commonEventRegions = this.params.commonEventRegions;
    const namedRegions = this.params.namedRegions;

    this.commonEventRegions = new Map();
    this.namedRegions = new Map();

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

  static checkRegionActions() {
    const regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);

    if (this.commonEventRegions.has(regionId)) {
      this.runCommonEvent(this.commonEventRegions.get(regionId));
    }
  }
}

globalThis.CycloneAdvancedMaps = CycloneAdvancedMaps;
CycloneAdvancedMaps.register();
