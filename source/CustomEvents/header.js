//=============================================================================
// Cyclone Engine - Custom Events
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 
 *
 * <pluginName:CycloneCustomEvents>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-custom-events
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
 * Custom Events                                                     by Hudell
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
 * @command copyEvent
 * @text Copy Event
 * @desc Copy a map event to another position
 *
 * @arg eventId
 * @type number
 * @text Event Id
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 * @arg newIndex
 * @type number
 * @text New ID
 * @default 0
 * @desc (Optional) The ID to use on the new event
 *
 * @command copyEventFrom
 * @text Copy Event From
 * @desc Copy an event from another map to this one
 *
 * @arg mapId
 * @type number
 * @text Map Id
 *
 * @arg eventId
 * @type number
 * @text Event Id
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 * @arg newIndex
 * @type number
 * @text New ID
 * @default 0
 * @desc (Optional) The ID to use on the new event
 *
 * @command createActorAt
 * @text Create Actor
 * @desc Create an event for an actor on the current map
 *
 * @arg actorId
 * @type actor
 * @text Actor
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg d
 * @type select
 * @text Direction
 * @desc What direction should the actor be facing
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 *
 * @arg commonEventId
 * @type common_event
 * @text Common Event
 * @desc (Optional) A Common Event to execute when talking to the actor
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 *
 * @command createNormalEventAt
 * @text Create Normal Event
 * @desc Create an event on the current map
 *
 * @arg characterName
 * @type string
 * @text Character Name
 *
 * @arg characterIndex
 * @type number
 * @text Character Index
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg d
 * @type select
 * @text Direction
 * @desc What direction should the actor be facing
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 *
 * @arg commonEventId
 * @type common_event
 * @text Common Event
 * @desc (Optional) A Common Event to execute when talking to the actor
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 * @command createTriggerEventAt
 * @text Create Trigger Event
 * @desc
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg commonEventId
 * @type common_event
 * @text Common Event
 * @desc (Optional) A Common Event to execute when talking to the actor
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 * @command createTeleportEventAt
 * @text Create Teleport Event
 * @desc Create an event that teleports the player
 *
 * @arg x
 * @type number
 * @text X Position
 * @desc Where to create the event
 *
 * @arg y
 * @type number
 * @text Y Position
 * @desc Where to create the event
 *
 * @arg newMapId
 * @type number
 * @text New Map Id
 * @desc 
 *
 * @arg newX
 * @type number
 * @text New X Position
 * @desc Where to teleport to
 *
 * @arg newY
 * @type number
 * @text New Y Position
 * @desc Where to teleport to
 *
 * @arg newD
 * @type select
 * @text New Direction
 * @desc What direction to be facing after teleporting
 * @default 0
 * @option Retain
 * @value 0
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 *
 * @arg fadeType
 * @type select
 * @text Fade Type
 * @default 0
 * @option 0
 * @option 1
 * @option 2
 *
 * @arg temporary
 * @type boolean
 * @text Temporary
 * @default true
 * @desc Discard the event when the map is reloaded?
 *
 **/