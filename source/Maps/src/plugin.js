import '../../Core/main.min';

class CycloneMaps extends CyclonePlugin {
  static register() {
    super.initialize('CycloneMaps');

    this.structs.set('CycloneCommonEventRegion', {
      regionId: 'int',
      commonEventId: 'int',
    });
    this.structs.set('CycloneNamedRegion', {
      regionId: 'int',
      name: 'string',
    });

    super.register({
      commonEventId: {
        name: 'Map Change Event Id',
        type: 'int',
      },
      tileWidth: {
        name: 'Tile Width',
        type: 'int',
        defaultValue: 48,
      },
      tileHeight: {
        name: 'Tile Height',
        type: 'int',
        defaultValue: 48,
      },
      tilesetPath: {
        name: 'Tileset Path',
        type: 'string',
        defaultValue: 'img/tilesets/',
      },
      enableOverlays: 'boolean',
      disableTilemap: 'boolean',
      disableAutoShadows: 'boolean',
      organizedFolders: {
        name: 'Organized Folders',
        type: 'boolean',
        defaultValue: false,
      },
      parallaxLayerFileName: {
        name: 'Parallax Layer Filename',
        type: 'string',
        defaultValue: 'par',
      },
      groundLayerFileName: {
        name: 'Ground Layer Filename',
        type: 'string',
        defaultValue: 'ground',
      },
      lightLayerFileName: {
        name: 'Light Layer Filename',
        type: 'string',
        defaultValue: 'light',
      },
      shadowLayerFileName: {
        name: 'Shadow Layer Filename',
        type: 'string',
        defaultValue: 'shadow',
      },
      lightOpacity: {
        name: 'Light Opacity',
        type: 'int',
        defaultValue: 185,
      },
      quickStart: {
        name: 'Quick Start',
        type: 'boolean',
        defaultValue: true,
      },
      fogSwitchId: {
        name: 'Fog Switch ID',
        type: 'int',
        defaultValue: 0,
      },
      lightSwitchId: {
        name: 'Light Switch ID',
        type: 'int',
        defaultValue: 0,
      },
      parallaxSwitchId: {
        name: 'Parallax Switch ID',
        type: 'int',
        defaultValue: 0,
      },
      shadowSwitchId: {
        name: 'Shadow Switch ID',
        type: 'int',
        defaultValue: 0,
      },
      groundZ: {
        name: 'Ground Z',
        type: 'int',
        defaultValue: 1,
      },
      parallaxZ: {
        name: 'Parallax Z',
        type: 'int',
        defaultValue: 20,
      },
      shadowZ: {
        name: 'Shadow Z',
        type: 'int',
        defaultValue: 21,
      },
      fogZ: {
        name: 'Fog Z',
        type: 'int',
        defaultValue: 22,
      },
      lightZ: {
        name: 'Light Z',
        type: 'int',
        defaultValue: 23,
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

    this.registerCommand('newFogOpacity', {
      opacity: 'int',
      duration: 'int',
    }, ({opacity, duration}) => {
      this.newFogOpacity = opacity;
      this.newFogOpacityDuration = duration;
    });

    this.registerCommand('fogFadeout', {
      duration: 'int',
    }, ({duration}) => {
      this.needsFogFadeOut = true;
      this.fogFadeOutDuration = duration;
    });

    this.registerCommand('moveFog', {
      moveX: 'int',
      moveY: 'int',
    }, ({moveX, moveY}) => {
      this.fogMoveX = moveX;
      this.fogMoveY = moveY;
    });

    this.registerCommand('fogBlendMode', {
      blend: 'int',
    }, ({blend}) => {
      this.fogBlendMode = blend;
    });

    this.registerCommand('fog', {
      fileName: 'string',
      moveX: 'int',
      moveY: 'int',
      blend: 'int',
    }, ({fileName, moveX, moveY, blend}) => {
      this.fogFileName = fileName;
      this.changedFogFileName = true;
    });

    this.registerCommand('light', ({fileName}) => {
      this.lightName = fileName;
      this.changedLightFileName = true;
    });

    this.registerCommand('shadow', ({fileName}) => {
      this.shadowName = fileName;
      this.changedShadowFileName = true;
    });
    this.registerCommand('par', ({fileName}) => {
      this.parallaxName = fileName;
      this.changedParallaxFileName = true;
    });

    this.registerCommand('ground', ({fileName}) => {
      this.groundName = fileName;
      this.changedGroundFileName = true;
    });

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

globalThis.CycloneMaps = CycloneMaps;
CycloneMaps.register();
