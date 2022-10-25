/*:
 * @plugindesc Adds new movement features to the game v1.01.03
 *
 * <pluginName:CycloneMovement>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-movement
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
 * Movement                                                          by Hudell
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
 * * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2022-09-15 - Version 1.03.00
 *   * Added option to disable player movement by input
 *
 * 2022-07-29 - Version 1.02.00
 *   * Prevent character from avoiding an object in the opposite direction
 *   of the diagonal direction the player is pressing. (Fixes sprite flicker)
 *   * Fixed issue with custom hitboxes
 *   * Implemented pixel movement for events
 *
 * 2020-09-18 - Version 1.01.01
 *   * Added .terrainTag method to character class.
 *
 * 2020-09-18 - Version 1.01.00
 *   * Fixed directional passability tests when Pixel Movement is disabled.
 *   * New settings to control the sidestep feature.
 * 2020-09-14 - Version 1.00.00
 * ===========================================================================
 * @param General
 *
 * @param Player
 *
 * @param Followers
 *
 * @param Events
 *
 * @param Event Triggering
 * @parent Events
 *
 * @param Event Movement
 * @parent Events
 *
 * @param AI
 *
 * @param stepCount
 * @text Steps per Tile
 * @parent General
 * @desc How many steps the player will need to take to move an entire tile?
 * @type select
 * @default 1
 * @option 4
 * @option 2
 * @option 1
 *
 * @param collisionStepCount
 * @text Collision Blocks per Tile
 * @parent General
 * @desc You can customize the map collision with the Cyclone Map Editor plugin
 * @type select
 * @default 1
 * @option 4
 * @option 2
 * @option 1
 *
 * @param followerStepsBehind
 * @text Follower Distance
 * @parent Followers
 * @desc How many steps behind should the followers be? Min = 1 step, Max = 1 tile
 * @type number
 * @min 1
 * @max 4
 * @default 3
 *
 * @param triggerAllEvents
 * @text Trigger All Events
 * @parent Event Triggering
 * @desc If true, the player may trigger multiple events when you press a button if there are more than one event in front of you
 * @type boolean
 * @on Trigger
 * @off Skip
 * @default false
 *
 * @param ignoreEmptyEvents
 * @text Ignore Empty Events
 * @parent Event Triggering
 * @desc if true, the game won't try to trigger events that have no commands
 * @type boolean
 * @on Ignore
 * @off Don't Ignore
 * @default true
 *
 * @param autoLeaveVehicles
 * @text Leave Vehicles Automatically
 * @parent Player
 * @desc If true, the player will leave boats and ships automatically when they reach land
 * @type boolean
 * @on Leave
 * @off Don't Leave
 * @default false
 *
 * @param diagonalPathfinding
 * @text Diagonal Pathfinding
 * @parent Player
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc
 * @default true
 *
 * @param disableMouseMovement
 * @text Disable Mouse Movement
 * @parent Player
 * @type boolean
 * @on Disable
 * @off Don't Disable
 * @desc
 * @default false
 *
 * @param inputSwitch
 * @text Player movement Switch
 * @description The player will only be able to move when this switch is turned on
 * @parent Player
 * @type switch
 * @default 0
 *
 * @param maxOffset
 * @text Max Slide Distance
 * @parent Player
 * @type number
 * @desc How many tiles should the player be able to sidestep when trying to avoid map obstacles?
 * @default 0.75
 * @decimals 2
 *
 * @param sidestepEvents
 * @text Sidestep Events?
 * @parent Player
 * @type boolean
 * @desc Should the player also sidestep to avoid events?
 * @default false
 *
 * @param playerHitbox
 * @text Player Hitbox
 * @parent Player
 * @type struct<Hitbox>
 * @default {"x":"6","y":"24","width":"36","height":"18"}
 *
 * @param applyToEvents
 * @text Apply Pixel Movement
 * @parent Event Movement
 * @desc Should the events also use pixel movement?
 * @type boolean
 * @default false
 *
 *
 * @param Move Toward Character
 * @parent AI
 *
 * @param enableMoveTowardCharacter
 * @text Enable Changes
 * @parent Move Toward Character
 * @desc If you don't want to change this behavior, you can disable it completely to avoid plugin conflicts.
 * @default true
 * @type boolean
 *
 * @param minDistanceToChangeDirection
 * @text Min Distance to Change Direction
 * @parent Move Toward Character
 * @desc Adds a distance buffer so the character doesn't change directions too often
 * @type number
 * @default 2
 * @decimals 2
 *
 * @param approachDiagonally
 * @text Allow Diagonal Movement
 * @parent Move Toward Character
 * @desc Change this to allow events to move diagonally when moving towards the player or another event
 * @default false
 * @type boolean
 *
 **/
/*~struct~Hitbox:
 * @param x
 * @type number
 * @default 0
 * @desc The hitbox X offset
 *
 * @param y
 * @type number
 * @default 0
 * @desc The hitbox Y offset
 *
 * @param width
 * @type number
 * @default 48
 * @desc The hitbox width
 *
 * @param height
 * @type number
 * @default 48
 * @desc The hitbox height
 */
