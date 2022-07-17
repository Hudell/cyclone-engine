//=============================================================================
// Cyclone Engine - Advanced Maps
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds new features to game map 1.00.00
 *
 * <pluginName:CycloneAdvancedMaps>
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
 * Advanced Map Features                                             by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels (in order of preference):
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Opening threads on the plugin's itch.io page
 *   1.c. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 3. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 4. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 5. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 6. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 7. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2020-08-30 - Version 1.01.00
 *   * Fixed issue with fog opacity not going down
 *   * Removed Cyclone Core Dependency
 *
 *
 * 2020-08-23 - Version 1.00.00
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
 * @param Overlay Path
 * @parent Overlay
 * @desc You can define an alternate path for loading the overlays
 * @type string
 * @default img/overlays/
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