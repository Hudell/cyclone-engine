//=============================================================================
// Cyclone Engine - Maps
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds new features to game map
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
 *                d8'
 * Movement                                                          by Hudell
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
 * @param stepCount
 * @text Steps per Tile
 * @desc How many steps the player will need to take to move an entire tile?
 * @type select
 * @default 8
 * @option 8
 * @option 4
 * @option 2
 * @option 1
 *
 * @param followerStepsBehind
 * @text Follower Distance
 * @desc How many steps behind should the followers be?
 * @type number
 * @min 1
 * @max 8
 * @default 6
 *
 * @param triggerAllEvents
 * @text Trigger All Events
 * @desc If true, the player may trigger multiple events when you press a button if there are more than one event in front of you
 * @default false
 *
 * @param triggerTouchEventAfterTeleport
 * @text Trigger Touch Event After Teleport
 * @desc
 * @default false
 *
 * @param blockRepeatedTouchEvents
 * @text Block Repeated Touch Events
 * @desc if false, any touch triggered event will be executed after every step that the player takes inside that tile.
 * @default true
 *
 * @param ignoreEmptyEvents
 * @text Ignore Empty Events
 * @desc if true, the game won't try to trigger events that have no commands
 * @default true
 *
 * @param autoLeaveVehicles
 * @text Leave Vehicles Automatically
 * @desc If true, the player will leave boats and ships automatically when they reach land
 * @default false
 *
 **/