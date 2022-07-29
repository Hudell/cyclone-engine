/*:
 * @plugindesc Live Map Editor - 1.12.02
 *
 * <pluginName:CycloneMapEditor>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-map-editor
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
 * Live Map Editor                                                   by Hudell
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
 * 2022-07-29 - Version 1.12.02
 *   * Added support for custom event hitboxes
 * 2021-01-27 - Version 1.12.00
 *   * Added option to generate 48x48 tilesets when using other sizes.
 * 2020-11-05 - Version 1.11.00
 *   * General bug fixes
 * 2020-10-10 - Version 1.10.00
 *   * Added tileset tabs
 *   * Moved layer list to left side of the screen
 *   * General bug fixes
 *
 * 2020-10-09 - Version 1.09.00
 *   * General bug fixes
 *   * Added support to Cyclone Magic v1.1
 *
 * 2020-10-07 - Version 1.08.00
 *   * Added support to Cyclone Extra Tilesets v1.1
 *
 * 2020-09-22 - Version 1.07.00
 *   * Several quality-of-life updates
 *   * Added support to Cyclone Magic
 *   * Added support to Cyclone Extra Tilesets
 *
 * 2020-09-18 - Version 1.06.01
 *   * Fixed "Default Collision Blocks" param options.
 *
 * 2020-09-15 - Version 1.06.00
 *   * New option to view tile properties such as tags, passability, bush,
 *   ladder and so on.
 *
 * 2020-09-14 - Version 1.05.01
 *   * Fixed small delay on integration between movement and map editor.
 *
 * 2020-09-14 - Version 1.05.00
 *   * Added new collision options;
 *   * Changed data compression algorithm;
 *
 * 2020-09-10 - Version 1.04.00
 *   * Added option to customize the collision in blocks of 1/4 of a tile.
 *   * Added options to export the collision map to an image
 *   * Changed the editor to force a larger screen when the game uses a small
 *   resolution.
 *   * Added option to toggle event visibility.
 *
 * 2020-08-30 - Version 1.03.00
 *   * Added options to export the map as images
 *
 * 2020-08-29 - Version 1.02.00
 *   * First MV Compatible version
 * ===========================================================================
 *
 * @param regionIcons
 * @text Region Icons
 * @type struct<RegionIcon>[]
 * @desc Configure certain regions to display an icon instead of the number
 *
 * @param Status Bar
 *
 * @param showMapId
 * @text Show Map Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the Map Id be visible in the status bar?
 *
 * @param showTilesetId
 * @text Show Tileset Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the Tileset Id be visible in the status bar?
 *
 * @param showPosition
 * @text Show Position
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the X and Y position in the status bar?
 *
 * @param showCellTiles
 * @text Show Cell Tiles
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the id of the current position tiles be displayed in the status bar?
 *
 * @param showRegionId
 * @text Show Region Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the region id of the current position be displayed in the status bar?
 *
 * @param showTag
 * @text Show Terrain Tag
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the terrain tag of the current position be displayed in the status bar?
 *
 * @param showCollision
 * @text Show Collision
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the collision of the current position be displayed in the status bar?
 *
 * @param showLadder
 * @text Show Ladder
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should status bar indicate if the current position is a ladder?
 *
 * @param showBush
 * @text Show Bush
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a bush?
 *
 * @param showCounter
 * @text Show Counter
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a counter?
 *
 * @param showDamageFloor
 * @text Show Damage Floor
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a damage floor tile?
 *
 * @param collisionStepCount
 * @text Default Collision Blocks
 * @type select
 * @default 1
 * @desc How many collision blocks per tile should the editor show?
 * @option 4
 * @option 2
 * @option 1
 *
 **/

/*~struct~RegionIcon:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to display an icon on
 *
 * @param icon
 * @text Icon
 * @type string
 * @desc Right click to select icon index
 */