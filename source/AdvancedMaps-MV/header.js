//=============================================================================
// Cyclone Engine - Advanced Maps
//=============================================================================

/*:
 * @plugindesc Adds new features to game map 1.00.00
 *
 * <pluginName:CycloneAdvancedMaps>
 * @author Hudell
 * @url
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
 *                d8'                                                       MV
 * Advanced Map Features                                             by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels:
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Opening threads on the plugin's itch.io page
 *   1.c. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 3. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 4. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 5. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2022-07-17 - Version 1.00.00
 *
 * ===========================================================================
 *
 * @param debug
 * @text Debug
 * @desc Generate debug logs to help identify problems
 * @type boolean
 * @default false
 *
 * @param mapChangeEventId
 * @text Map Change Event Id
 * @desc Select a Common Event to be called every time the map changes
 * @type common_event
 * @default 0
 *
 * @param Change Tile Size
 *
 * @param tileWidth
 * @text Tile Width
 * @parent Change Tile Size
 * @desc The width of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param tileHeight
 * @text Tile Height
 * @parent Change Tile Size
 * @desc The height of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param tilesetPath
 * @text Tileset Path
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
 * @param disableTilemap
 * @text Disable Tilemap
 * @parent Map Settings
 * @desc If your entire game uses only parallax mapping, you can disable the tilemap to improve performance
 * @type boolean
 * @default false
 *
 * @param balloonZ
 * @text Balloon Z
 * @parent Map Settings
 * @type number
 * @desc Use this to change the balloon Z value when using parallaxes.
 * Recomended default = 7, with parallaxes = 30
 * @default 7
 *
 * @param animationZ
 * @text Animations Z
 * @parent Map Settings
 * @type number
 * @desc Use this to change the animations Z value when using parallaxes.
 * Recomended default = 8, with parallaxes = 31
 * @default 8
 *
 * @param Overlays
 * @text Overlays
 *
 * @param overlayEnabled
 * @text Enabled
 * @parent Overlays
 * @type boolean
 * @desc Enable the overlay features
 * @default false
 *
 * @param overlayPath
 * @text Overlay Path
 * @parent Overlays
 * @desc You can define an alternate path for loading the overlays
 * @type string
 * @default img/overlays/
 *
 * @param folders
 * @text Folders
 * @parent Overlays
 * @desc How overlay files are organized
 * @type select
 * @default none
 * @option No Folders
 * @value none
 * @option One Per Layer
 * @value perLayer
 * @option One Per Map
 * @value perMap
 *
 * @param layers
 * @text Layers
 * @parent Overlays
 * @type struct<OverlayItem>[]
 * @default ["{\"layerName\":\"Ground\",\"fileName\":\"ground\",\"tagName\":\"ground\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"1\"}","{\"layerName\":\"Parallax\",\"fileName\":\"par\",\"tagName\":\"par\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"20\"}","{\"layerName\":\"Shadow\",\"fileName\":\"shadow\",\"tagName\":\"shadow\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"21\"}","{\"layerName\":\"Fog\",\"fileName\":\"fog\",\"tagName\":\"fog\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"22\"}","{\"layerName\":\"Light\",\"fileName\":\"light\",\"tagName\":\"light\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"23\",\"opacity\":\"185\",\"opacitySpeed\":\"180\",\"blendMode\":\"1\"}"]
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
 **/
/*~struct~OverlayItem:
 * @param layerName
 * @text Layer Name
 * @desc Name used to identify this layer on plugin commands
 * @default
 *
 * @param fileName
 * @text Layer Filename
 * @desc The base name of the files for this layer.
 * @default
 *
 * @param tagName
 * @text Tag Name
 * @desc If specified, this layer will only be loaded in maps that include this notetag
 * @default
 *
 * @param appendMapId
 * @text Append Map Id
 * @desc Determine if the map id should be appended to the file names
 * @type boolean
 * @default true
 *
 * @param switchId
 * @text Switch ID
 * @type switch
 * @desc A switch to control if this layer should be enabled or not
 * @default 0
 *
 * @param invertSwitch
 * @text Invert Switch
 * @type boolean
 * @desc Display this layer when the switch is off instead of on.
 * @default false
 *
 * @param quickStart
 * @text Enable Automatically
 * @type boolean
 * @desc If this param is on, the layer switch will be turned on automatically on new game.
 * @default true
 *
 * @param z
 * @text Z value
 * @type number
 * @desc What should be the Z value of this layer?
 * @default 0
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @desc The opacity level for this layer
 * @min 1
 * @max 255
 * @default 255
 *
 * @param opacitySpeed
 * @text Opacity Speed
 * @type number
 * @desc How many frames should it take for this layer to change from completely hidden to completely visible.
 * @min 1
 * @max 255
 * @default 25
 *
 * @param mapList
 * @text Map List
 * @type number[]
 * @desc A list of map ids where this layer will be active without needing tags
 * @default []
 *
 * @param blendMode
 * @text Blend Mode
 * @type number
 * @desc The blend type you want to use in this layer. Default is 0 for most layers, or 1 for lights.
 * @default 0
 *
 * @param position
 * @text Position
 * @type Struct<LayerPosition>
 * @desc The top left position of this layer.
 * @default {}
 *
 * @param fadeIn
 * @text Fade In
 * @type boolean
 * @desc Should this layer be made visible with a fade effect or instantly?
 * @on Fade In
 * @off Instantly
 * @default false
 *
*/
/*~struct~LayerPosition:
 * @param x
 * @text X Position
 * @type number
 * @default 0
 *
 * @param y
 * @text Y Position
 * @type number
 * @default 0
 *
 * @param unit
 * @text Position Unit
 * @desc Is this layer's position set in pixels or tiles?
 * @type select
 * @default tiles
 * @option Tiles
 * @value tiles
 * @option Pixels
 * @value pixels
 *
 * @param boundTo
 * @text Bound To
 * @desc Is this layer's position bound to the map or the screen?
 * @type select
 * @default map
 * @option Map
 * @value map
 * @option Screen
 * @value screen
 *
 * @param moveX
 * @text X Speed
 * @type number
 * @desc how many pixels the layer should move horizontally at a time. Use a negative value to move left.
 * @default 0
 *
 * @param moveY
 * @text Y Speed
 * @type number
 * @desc how many pixels the layer should move vertically at a time. Use a negative value to move up.
 * @default 0
 *
 * @param tiling
 * @text Tiling
 * @type boolean
 * @desc Should this layer use a tiling sprite? (Usually only enabled for fog layer)
 * @on Tiled
 * @off Not Tiled
 * @default false
 *
 */
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