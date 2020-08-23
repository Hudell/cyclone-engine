//=============================================================================
// Cyclone Engine - Maps
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds new features to game map
 *
 * <pluginName:CycloneMaps>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-maps
 *
 * @help
 * ===========================================================================
 *                                    88
 *                                    88
 *                                    88
 *   ,adPPYba, 8b       d8  ,adPPYba, 88  ,adPPYba,  8b,dPPYba,   ,adPPYba,
 *  a8"     "" `8b     d8' a8"     "" 88 a8"     "8a 88P'   `"8a a8P_____88
 *  8b          `8b   d8'  8b         88 8b       d8 88       88 8PP"""""""
 *  "8a,   ,aa   `8b,d8'   "8a,   ,aa 88 "8a,   ,a8" 88       88 "8b,   ,aa
 *   `"Ybbd8"'     Y88'     `"Ybbd8"' 88  `"YbbdP"'  88       88  `"Ybbd8"'
 *                 d8'
 *                d8'
 * Advanced Map Features 1.00.00                                     by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels (in order of preference):
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Tagging me on threads on Rpg Maker related Forums, such as:
 *      rpgmakerweb.com (English)
 *      centrorpg.com (Portuguese)
 *      condadobraveheart.com (Portuguese)
 *   1.c. Opening threads on the plugin's itch.io page
 *   1.d. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 3. A special exception is created for patreon users who get access to my
 * priority support discord server.
 *
 * 4. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 5. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 6. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 7. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 8. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Did you know?
 * Early maps used to have the east side on top. That's the origin of the verb
 * "to orient", which meant putting the orient (east) on its correct position.
 * ===========================================================================
 * Instructions
 * ===========================================================================
 * You can use this plugin to add overlay images to your maps
 * You can keep the images either on the img/parallaxes folder
 * or (if you set the Organized Folders param to true) on separate
 * folders like this:
 *
 * img/overlays/grounds
 * img/overlays/pars
 * img/overlays/shadows
 * img/overlays/lights
 * img/overlays/fogs
 *
 * All image filenames must end with the number of the map
 *
 * Map notetags:
 *
 * <all> : Display all overlays
 * <ground> : Display ground overlay
 * <par> : Display parallax overlay
 * <light> : Display light overlay
 * <shadow> : Display shadow overlay
 * <fogName:filename> : Display the specified fog image
 * <fogOpacity:number> : Change the opacity level of the fog image (0 to 255)
 * <fogBlend:number> : Changes the blend type of the fog image
 * <fogDuration:number> : Changes the duration of the opacity transition
 * <xMove:number> : Changes the horizontal speed of the fog
 * <yMove:number> : Changes the vertical speed of the fog
 *
 * Go to https://makerdevs.com/plugin/cyclone-maps for more instructions
 *
 * @param Map Change Event Id
 * @desc Select a Common Event to be called every time the map changes
 * @type common_event
 * @default 0
 *
 * @param Change Tile Size
 *
 * @param Tile Width
 * @parent Change Tile Size
 * @desc The width of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param Tile Height
 * @parent Change Tile Size
 * @desc The height of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param Tileset Path
 * @parent Change Tile Size
 * @desc You can define an alternate path for loading the tilesets
 * @type string
 * @default img/tilesets/
 *
 * @param Map Settings
 *
 * @param disableAutoShadows
 * @text Disable Auto Shadows
 * @parent Map Settings
 * @desc Make the game stop rendering the map's auto shadows.
 * @type boolean
 * @default false
 *
 * @param Overlay
 *
 * @param enableOverlays
 * @text Enable Overlays
 * @parent Overlay
 * @desc Change this to on to enable the overlay features
 * @type boolean
 * @default false
 *
 * @param disableTilemap
 * @text Disable Tilemap
 * @parent Overlay
 * @desc If your entire game uses only parallax mapping, you can disable the tilemap to improve performance
 * @type boolean
 * @default false
 *
 * @param Organized Folders
 * @parent Overlay
 * @desc Use different folders for each type of parallax
 * @type boolean
 * @default false
 *
 * @param Parallax Layer Filename
 * @parent Overlay
 * @desc The base name of the files for the parallax layer. Must have the mapId appended at the end
 * @default par
 *
 * @param Ground Layer Filename
 * @parent Overlay
 * @desc The base name of the files for the ground layer. Must have the mapId appended at the end
 * @default ground
 *
 * @param Light Layer Filename
 * @parent Overlay
 * @desc The base name of the files for the light layer. Must have the mapId appended at the end
 * @default light
 *
 * @param Shadow Layer Filename
 * @parent Overlay
 * @desc The base name of the files for the shadow layer. Must have the mapId appended at the end
 * @default shadow
 *
 * @param Light Opacity
 * @parent Overlay
 * @type number
 * @desc The opacity level of the light layer
 * @default 185
 *
 * @param Quick Start
 * @parent Overlay
 * @type boolean
 * @desc If this param is on, the fog, light, parallax and shadow switches will start new games turned on.
 * @default true
 *
 * @param Fog Switch ID
 * @parent Overlay
 * @type switch
 * @desc A switch to control if fog should be enabled or not
 * @default 0
 *
 * @param Light Switch ID
 * @parent Overlay
 * @type switch
 * @desc A switch to control if light should be enabled or not
 * @default 0
 *
 * @param Parallax Switch ID
 * @parent Overlay
 * @type switch
 * @desc A switch to control if parallax should be enabled or not
 * @default 0
 *
 * @param Shadow Switch ID
 * @parent Overlay
 * @type switch
 * @desc A switch to control if shadow should be enabled or not
 * @default 0
 *
 * @param Fog Z
 * @parent Overlay
 * @type number
 * @desc What should be the Z value of the fog layer?
 * @default 22
 *
 * @param Light Z
 * @parent Overlay
 * @type number
 * @desc What should be the Z value of the light layer?
 * @default 23
 *
 * @param Parallax Z
 * @parent Overlay
 * @type number
 * @desc What should be the Z value of the overlay layer?
 * @default 20
 *
 * @param Shadow Z
 * @parent Overlay
 * @type number
 * @desc What should be the Z value of the shadow layer?
 * @default 21
 *
 * @param Ground Z
 * @parent Overlay
 * @type number
 * @desc What should be the Z value of the ground layer?
 * @default 1
 *
 * @param Balloon Z
 * @parent Overlay
 * @type number
 * @desc Use this to change the balloon Z value when using parallaxes.
 * Recomended default = 7, with parallaxes = 30
 * @default 7
 *
 * @param Animations Z
 * @parent Overlay
 * @type number
 * @desc Use this to change the animations Z value when using parallaxes.
 * Recomended default = 8, with parallaxes = 31
 * @default 8
 *
 * @param Regions
 *
 * @param bushRegionId
 * @text Bush Region
 * @parent Regions
 * @type number
 * @desc Configure a region id that when used will flag the tile as a bush
 * @default 0
 *
 * @param Region Movement
 * @parent Regions
 *
 * @param blockRegionId
 * @text Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block passage on a tile
 * @default 0
 *
 * @param unblockRegionId
 * @text Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock passage on a tile
 * @default 0
 *
 * @param blockPlayerRegionId
 * @text (Player) Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block the player's passage on a tile
 * @default 0
 *
 * @param unblockPlayerRegionId
 * @text (Player) Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock the player's passage on a tile
 * @default 0
 *
 * @param blockEventRegionId
 * @text (Events) Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block event's passage on a tile
 * @default 0
 *
 * @param unblockEventRegionId
 * @text (Events) Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock event's passage on a tile
 * @default 0
 *
 * @param Region Actions
 * @parent Regions
 *
 * @param commonEventRegions
 * @text Region Based Common Events
 * @parent Region Actions
 * @type struct<CommonEventRegion>[]
 * @desc Configure certain regions to trigger common events when stepped on
 *
 * @param namedRegions
 * @text Named Regions
 * @parent Region Actions
 * @type struct<NamedRegion>[]
 * @desc Configure certain regions to display a name on screen
 *
 * @param regionNamesStay
 * @text Region Names Stay on Screen
 * @parent Region Actions
 * @desc if on, the names will stay on screen while the player is over the region
 * @type boolean
 * @default false
 *
 * @command newFogOpacity
 * @text Change Fog Opacity
 * @desc
 *
 * @arg opacity
 * @text Opacity
 * @type number
 * @desc The new value for the fog opacity: 1 - 255
 *
 * @arg duration
 * @text Duration
 * @type number
 * @desc How long should the opacity transition last? Leave it at zero to use the map's default.
 * @default 0
 *
 * @command fogFadeout
 * @text Fog fade out
 * @desc Fade out and deactivate the fog layer
 *
 * @arg duration
 * @text Duration
 * @type number
 * @desc How long should the fade out last?
 * @default 0
 *
 * @command moveFog
 * @text Move Fog
 * @desc Change the speed at which the fog moves
 *
 * @arg moveX
 * @text X Speed
 * @type number
 * @desc how many pixels the fog should move horizontally at a time. Use a negative value to move left.
 *
 * @arg moveY
 * @text Y Speed
 * @type number
 * @desc how many pixels the fog should move vertically at a time. Use a negative value to move up.
 *
 * @command fogBlendMode
 * @text Change Fog Blend Mode
 * @desc
 *
 * @arg blend
 * @text Blend Type
 * @type select
 * @desc The blend type you want to use in the fog layer
 * @default 0
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 *
 * @command fog
 * @text Change Fog
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new fog
 *
 * @command light
 * @text Change Light
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new light
 *
 * @command shadow
 * @text Change Shadow
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new shadow
 *
 * @command par
 * @text Change Parallax
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new parallax
 *
 * @command ground
 * @text Change Ground
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new ground
 *
 **/
/*~struct~CommonEventRegion:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to add an event to
 *
 * @param commonEventId
 * @text Common Event
 * @type common_event
 * @desc The common event to be executed on this region
 */
/*~struct~NamedRegion:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to display a name on
 *
 * @param name
 * @text Name
 * @type string
 * @desc The name of this region
 */

CycloneEngine.requireVersion(2, 'CycloneMaps');

class CycloneMaps extends CyclonePlugin {
  static register() {
    CycloneEngine.structs.set('CycloneCommonEventRegion', {
      regionId: 'int',
      commonEventId: 'int',
    });
    CycloneEngine.structs.set('CycloneNamedRegion', {
      regionId: 'int',
      name: 'string',
    });

    super.register('CycloneMaps', {
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

  static get enableOverlays() {
    return this.params.get('enableOverlays');
  }
  static get groundZ() {
    return this.params.get('groundZ');
  }
  static get parallaxZ() {
    return this.params.get('parallaxZ');
  }
  static get shadowZ() {
    return this.params.get('shadowZ');
  }
  static get fogZ() {
    return this.params.get('fogZ');
  }
  static get lightZ() {
    return this.params.get('lightZ');
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

    this.blockRegionId = this.params.get('blockRegionId');
    this.unblockRegionId = this.params.get('unblockRegionId');
    this.blockPlayerRegionId = this.params.get('blockPlayerRegionId');
    this.unblockPlayerRegionId = this.params.get('unblockPlayerRegionId');
    this.blockEventRegionId = this.params.get('blockEventRegionId');
    this.unblockEventRegionId = this.params.get('unblockEventRegionId');

    this.disableTilemap = this.params.get('disableTilemap');
    this.disableAutoShadows = this.params.get('disableAutoShadows');

    const commonEventRegions = this.params.get('commonEventRegions');
    const namedRegions = this.params.get('namedRegions');

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
      CycloneEngine.runCommonEvent(this.commonEventRegions.get(regionId));
    }
  }
}

CycloneMaps.register();

CycloneMaps.patchClass(Game_Player, $super => class {
  performTransfer() {
    if (this.isTransferring()) {
      if (CycloneMaps.params.get('commonEventId') > 0) {
        $gameTemp.reserveCommonEvent(CycloneMaps.params.get('commonEventId'));
      }
    }

    $super.performTransfer.call(this);
  }

  isMapPassable(x, y, d) {
    const blockRegionId = CycloneMaps.blockPlayerRegionId;
    const unblockRegionId = CycloneMaps.unblockPlayerRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return false;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});

CycloneMaps.patchClass(Game_Party, $super => class {
  onPlayerWalk() {
    $super.onPlayerWalk.call(this);

    if (CycloneMaps.commonEventRegions.size > 0) {
      CycloneMaps.checkRegionActions();
    }
  }
});

CycloneMaps.patchClass(Game_Event, $super => class {
  isMapPassable(x, y, d) {
    const blockRegionId = CycloneMaps.blockEventRegionId;
    const unblockRegionId = CycloneMaps.unblockEventRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return false;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});

CycloneMaps.patchClass(Game_Map, $super => class {
  tileWidth() {
    const customWidth = CycloneMaps.params.get('tileWidth');
    if (typeof customWidth === 'number' && customWidth > 0) {
      return customWidth;
    }

    return $super.tileWidth.call(this);
  }

  tileHeight() {
    const customHeight = CycloneMaps.params.get('tileHeight');
    if (typeof customHeight === 'number' && customHeight > 0) {
      return customHeight;
    }

    return $super.tileHeight.call(this);
  }

  isBush(x, y) {
    if ($super.isBush.call(this, x, y)) {
      return true;
    }

    const bushRegionId = CycloneMaps.params.get('bushRegionId');
    if (!bushRegionId) {
      return false;
    }

    if (!this.isValid(x, y)) {
      return false;
    }

    return $gameMap.regionId(x, y) === bushRegionId;
  }

  checkPassage(x, y, bit) {
    const blockRegionId = CycloneMaps.blockRegionId;
    const unblockRegionId = CycloneMaps.unblockRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const regionId = this.regionId(x, y);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return $super.checkPassage.call(this, x, y, bit);
  }
});

CycloneMaps.patchClass(Tilemap, $super => class {
  initialize() {
    $super.initialize.call(this);
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
  }

  updateTransform() {
    if (CycloneMaps.disableTilemap && CycloneMaps.enableOverlays) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _addShadow(...args) {
    if (CycloneMaps.disableAutoShadows) {
      return;
    }

    return $super._addShadow.call(this, ...args);
  }
});

CycloneMaps.patchClass(ImageManager, $super => class {
  static loadTileset(filename) {
    const customPath = CycloneMaps.params.get('tilesetPath');
    if (customPath) {
      return this.loadBitmap(customPath, filename);
    }

    return $super.loadTileset.call(this, filename);
  }
});

CycloneMaps.patchClass(DataManager, $super => class {
  static setupNewGame() {
    $super.setupNewGame.call(this);

    if (CycloneMaps.params.get('enableOverlays') && CycloneMaps.params.get('quickStart')) {
      const { fogSwitchId, lightSwitchId, parallaxSwitchId, shadowSwitchId } = CycloneMaps.getParamList();

      if (fogSwitchId > 0) {
        $gameSwitches.setValue(fogSwitchId, true);
      }

      if (lightSwitchId > 0) {
        $gameSwitches.setValue(lightSwitchId, true);
      }

      if (parallaxSwitchId > 0) {
        $gameSwitches.setValue(parallaxSwitchId, true);
      }

      if (shadowSwitchId > 0) {
        $gameSwitches.setValue(shadowSwitchId, true);
      }
    }
  }
});

CycloneMaps.patchClass(Spriteset_Map, $super => class {
  createLowerLayer() {
    CycloneMaps.clearSettings();
    $super.createLowerLayer.call(this);
  }

  loadOverlayBitmap(folderName, fileName) {
    if (CycloneMaps.params.get('organizedFolders')) {
      return ImageManager.loadBitmap(`img/overlays/${ folderName }/`, fileName);
    }

    return ImageManager.loadParallax(fileName);
  }

  createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, visibilitySwitchId = 0, maxOpacity = 255) {
    if (!$dataMap?.meta?.[tagName] && !$dataMap?.meta?.all) {
      return null;
    }

    const bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
    const layer = new Sprite(bitmap);
    layer.z = zValue;

    this._tilemap.addChild(layer);

    if (visibilitySwitchId > 0) {
      layer.opacity = $gameSwitches.value(visibilitySwitchId) ? maxOpacity : 0;
    }

    return layer;
  }

  createGroundLayer() {
    this._groundLayer = this.createOverlayLayer('grounds', CycloneMaps.params.get('groundLayerFileName'), 'ground', CycloneMaps.groundZ);
  }

  createParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneMaps.getParamList();
    this._parallaxLayer = this.createOverlayLayer('pars', parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
  }

  createShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneMaps.getParamList();
    this._shadowLayer = this.createOverlayLayer('shadows', shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
  }

  createLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneMaps.getParamList();
    this._lightLayer = this.createOverlayLayer('lights', lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity);
    if (this._lightLayer) {
      this._lightLayer.blendMode = 1;
    }
  }

  createFogLayer() {
    CycloneMaps.fogFileName = this.getOverlayVariable('fogName');
    CycloneMaps.fogOpacity = this.getOverlayIntVariable('fogOpacity', 255);
    CycloneMaps.fogMoveX = this.getOverlayIntVariable('xMove', 0);
    CycloneMaps.fogMoveY = this.getOverlayIntVariable('yMove', 0);
    CycloneMaps.fogBlendMode = this.getOverlayIntVariable('fogBlend', 0);
    CycloneMaps.fogDuration = this.getOverlayIntVariable('fogDuration', 1);

    if (!CycloneMaps.fogFileName) {
      return;
    }

    const bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);
    if (!bitmap) {
      return;
    }

    const layer = new TilingSprite();
    layer.bitmap = bitmap;
    layer.width = Graphics.width;
    layer.height = Graphics.height;

    layer.blendMode = CycloneMaps.fogBlendMode;
    layer.opacity = 0;
    layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    layer.z = CycloneMaps.fogZ;

    CycloneMaps.fogNewX = 0;
    CycloneMaps.fogNewY = 0;

    this._tilemap.addChild(layer);
    this._fogLayer = layer;
    CycloneMaps.changedFogFileName = false;
  }

  createCharacters() {
    if (!CycloneMaps.params.get('enableOverlays')) {
      $super.createCharacters.call(this);
      return;
    }

    this.createGroundLayer();
    $super.createCharacters.call(this);
    this.createParallaxLayer();
    this.createShadowLayer();
    this.createFogLayer();
    this.createLightLayer();
  }

  getOverlayVariable(variableName) {
    if ($dataMap?.meta?.[variableName] === undefined) {
      return false;
    }

    return CycloneEngine.getValueMaybeVariable($dataMap.meta[variableName]);
  }

  getOverlayIntVariable(variableName, defaultValue) {
    const value = parseInt(this.getOverlayVariable(variableName)) ?? defaultValue;
    return CycloneEngine.defaultIfNaN(value, defaultValue);
  }

  updateLayerOpacity(layer, maxOpacity, opacityChange) {
    const newOpacity = (layer.opacity + opacityChange).clamp(0, maxOpacity);

    if (layer.opacity !== newOpacity) {
      layer.opacity = newOpacity;
    }
  }

  updateLayer(layerName, update, folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity = 255, opacityChange = 10) {
    let layer = this[layerName];

    if (!layer) {
      layer = this.createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity);
      update = false;
    }

    if (!layer) {
      return;
    }

    layer.x = $gameMap.displayX() * (0 - $gameMap.tileWidth());
    layer.y = $gameMap.displayY() * (0 - $gameMap.tileHeight());

    if (switchId > 0) {
      this.updateLayerOpacity(layer, maxOpacity, opacityChange * ($gameSwitches.value(switchId) ? 1 : -1));
    }

    if (update) {
      layer.bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
    }

    this[layerName] = layer;
  }

  updateGroundLayer() {
    const { groundLayerFileName } = CycloneMaps.getParamList();

    this.updateLayer('_groundLayer', CycloneMaps.changedGroundFileName, 'grounds', CycloneMaps.groundName || groundLayerFileName, 'ground', CycloneMaps.groundZ, 0);
    CycloneMaps.changedGroundFileName = false;
  }

  updateParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneMaps.getParamList();

    this.updateLayer('_parallaxLayer', CycloneMaps.changedParallaxFileName, 'pars', CycloneMaps.parallaxName || parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
    CycloneMaps.changedParallaxFileName = false;
  }

  updateShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneMaps.getParamList();

    this.updateLayer('_shadowLayer', CycloneMaps.changedShadowFileName, 'shadows', CycloneMaps.shadowName || shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
    CycloneMaps.changedShadowFileName = false;
  }

  stepFogLayerOpacity(stepSize = -10, maxOpacity = 255) {
    this._fogLayer.opacity = (this._fogLayer.opacity + stepSize).clamp(0, maxOpacity);
  }

  isFogEnabled() {
    const { fogSwitchId } = CycloneMaps.getParamList();
    return fogSwitchId > 0 && $gameSwitches.value(fogSwitchId);
  }

  fadeOutOpacity() {
    // if a manual fade out was triggered
    if (CycloneMaps.needsFogFadeOut) {
      // If there's a new opacity level set by a plugin command, use that instead of the map's default
      const targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
      const transition = targetOpacity / (CycloneMaps.fogFadeOutDuration || 1);

      if (this._fogLayer.opacity > 0) {
        this.stepFogLayerOpacity(0 - transition, this._fogLayer.opacity);
        return;
      }

      // When the manual fade out is complete, we reset the temporary data and deactivate the fog switch
      CycloneMaps.needsFogFadeOut = false;
      CycloneMaps.newFogOpacity = false;
      CycloneMaps.newFogOpacityDuration = 0;
      CycloneMaps.currentOpacityTarget = 0;

      const fogSwitchId = CycloneMaps.params.get('fogSwitchId');
      if (fogSwitchId > 0) {
        $gameSwitches.setValue(fogSwitchId, false);
      }

      return;
    }

    // If there's no manual fade out requested, then the switch was turned off - so use the default fade out
    if (this._fogLayer.opacity > 0) {
      this.stepFogLayerOpacity(-10, this._fogLayer.opacity);
    }
  }

  updateFogOpacity() {
    if (!this.isFogEnabled() || CycloneMaps.needsFogFadeOut) {
      this.fadeOutOpacity();
      return;
    }

    // If there's a new opacity level set by a plugin command, use that instead of the map's default
    const targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
    const duration = CycloneMaps.newFogOpacityDuration || CycloneMaps.fogDuration;
    const transition = targetOpacity / duration;

    // If the opacity is not at the desired level yet, fade it in
    if (this._fogLayer.opacity < targetOpacity) {
      this.stepFogLayerOpacity(transition, targetOpacity);
    }
  }

  updateFogLayer() {
    if (!this._fogLayer) {
      this.createFogLayer();
      if (!this._fogLayer) {
        return;
      }
    }

    this._fogLayer.blendMode = CycloneMaps.fogBlendMode;
    CycloneMaps.fogNewX += CycloneMaps.fogMoveX;
    CycloneMaps.fogNewY += CycloneMaps.fogMoveY;

    this._fogLayer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() - CycloneMaps.fogNewX;
    this._fogLayer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() - CycloneMaps.fogNewY;
    this.updateFogOpacity();

    if (CycloneMaps.changedFogFileName && CycloneMaps.fogFileName) {
      this._fogLayer.bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);
      CycloneMaps.changedFogFileName = false;
    }
  }

  updateLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneMaps.getParamList();
    this.updateLayer('_lightLayer', CycloneMaps.changedLightFileName, 'lights', CycloneMaps.lightName || lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity, 1);
    CycloneMaps.changedLightFileName = false;
  }

  updateTilemap() {
    if (CycloneMaps.params.get('enableOverlays')) {
      this.updateGroundLayer();
      this.updateParallaxLayer();
      this.updateShadowLayer();
      this.updateFogLayer();
      this.updateLightLayer();
    }

    $super.updateTilemap.call(this);
  }
});

CycloneMaps.patchClass(Sprite_Balloon, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const balloonZ = CycloneMaps.params.get('balloonZ');

    // Only apply if we have a valid Z different from the default
    if (balloonZ !== 0 && balloonZ !== 7) {
      this.z = balloonZ;
    }
  }
});

CycloneMaps.patchClass(Sprite_Animation, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const animationZ = CycloneMaps.params.get('animationZ');

    // Only apply if we have a valid Z different from the default
    if (animationZ !== 0 && animationZ !== 8) {
      this.z = animationZ;
    }
  }
});

CycloneMaps.patchClass(Scene_Map, $super => class {
  createRegionNameWindow() {
    const rect = this.mapNameWindowRect();
    this._regionNameWindow = new WindowRegionName(rect);
    this.addChild(this._regionNameWindow);
  }

  createMapNameWindow() {
    $super.createMapNameWindow.call(this);
    this.createRegionNameWindow();
  }

  updateTransferPlayer() {
    if ($gamePlayer.isTransferring()) {
      this._regionNameWindow.close();
    }

    $super.updateTransferPlayer();
    this._regionNameWindow._delay = 0;
    this._regionNameWindow.update();
  }

  callMenu() {
    $super.callMenu.call(this);
    this._regionNameWindow.hide();
  }

  launchBattle() {
    $super.launchBattle.call(this);
    this._regionNameWindow.hide();
  }

  stop() {
    this._regionNameWindow.close();
    $super.stop.call(this);
  }
});

class WindowRegionName extends Window_MapName {
  refresh() {
    this.contents.clear();

    const regionId = this._currentRegionId || 0;
    if (regionId === 0) {
      return;
    }

    const regionName = CycloneMaps.namedRegions.get(regionId);
    if (!regionName) {
      return;
    }

    const width = this.contentsWidth();
    this.drawBackground(0, 0, width, this.lineHeight());
    this.drawText(regionName, 0, 0, width, 'center');
  }

  update() {
    if (this._delay) {
      this._delay--;
      return;
    }

    this._delay = 10;
    const regionId = $gameMap.regionId($gamePlayer._x, $gamePlayer._y);

    const shouldUpdate = regionId > 0 || !this._showCount;

    if (shouldUpdate && (CycloneMaps.params.get('regionNamesStay') || regionId !== this._currentRegionId)) {
      this._currentRegionId = regionId;
      this.open();
      return;
    }

    super.update();
  }
}