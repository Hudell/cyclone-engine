/*:
 * @target MZ
 * @plugindesc Live Map Editor
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
 *                d8'
 * Live  Map Editor 1.00.00                                          by Hudell
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
 * Early map makers used to include fake towns on their maps to identify
 * copies of their work.
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