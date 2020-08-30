/*:
 * @target MZ
 * @plugindesc Background extendable time system with automatic weather change
 * and custom common event callbacks
 * <pluginName:CycloneTime>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-time
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
 * Time and Weather System                                           by Hudell
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
 * The portuguese word "Tempo" can mean both "Time" and "Weather".
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2020-08-30 - Version 1.01.00
 *   * Removed Cyclone Core Dependency
 *
 *
 * 2020-08-19 - Version 1.00.00
 * ===========================================================================
 * @param Time System
 *
 * @param Initial Time
 * @parent Time System
 * @type struct<Time>
 * @default {"second":0,"minute":0,"hour":6,"day":1,"month":1,"year": 1}
 * @desc Set the date and time that the system should be set at on a new game
 *
 * @param Use real months
 * @parent Time System
 * @desc If enabled, the game will use the real world calendars with variable
 * month lengths, leap years and daylight saving time.
 * @default false
 * @type boolean
 *
 * @param Use real time
 * @parent Time System
 * @desc If enabled, the game will use the player's clock
 * @default false
 * @type boolean
 *
 * @param Time Speed
 * @parent Time System
 * @desc How many real time milliseconds should an ingame second last
 * @default 100
 * @type number
 *
 * @param Variable Time Speed
 * @parent Time System
 * @desc Load the length of the second from a variable instead of a fixed value
 * @default 0
 * @type variable
 *
 * @param Seconds in a minute
 * @parent Time System
 * @desc How many ingame seconds should an ingame minute last
 * @default 60
 * @type number
 *
 * @param Minutes in an hour
 * @parent Time System
 * @desc How many ingame minutes should an ingame hour last
 * @default 60
 * @type number
 *
 * @param Hours in a day
 * @parent Time System
 * @desc How many ingame hours should an ingame day last
 * @default 24
 * @type number
 *
 * @param Days in a week
 * @parent Time System
 * @desc How many ingame days should an ingame week last
 * @default 7
 * @type number
 *
 * @param Days in a month
 * @parent Time System
 * @desc How many ingame days should an ingame month last
 * @default 31
 * @type number
 *
 * @param Months in a year
 * @parent Time System
 * @desc How many ingame months should an ingame year last
 * @default 12
 * @type number
 *
 * @param First day ever
 * @parent Time System
 * @desc What day of the week was it on 01/01/0001 ? This is used to determine the week days (IRL it was a monday)
 * @type select
 * @default 1
 * @option Sunday
 * @value 0
 * @option Monday
 * @value 1
 * @option Tuesday
 * @value 2
 * @option Wednesday
 * @value 3
 * @option Thursday
 * @value 4
 * @option Friday
 * @value 5
 * @option Saturday
 * @value 6
 *
 * @param Pause during messages
 * @parent Time System
 * @desc If ON, it will stop the flow of time while messages are being displayed on screen.
 * @type boolean
 * @default true
 *
 * @param Day start time
 * @parent Time System
 * @desc At what time does a new day start
 * This may affect weather and other plugins that are based on this one.
 * @type number
 * @default 6
 *
 * @param Clock main switch
 * @parent Time System
 * @desc A switch that controls if the clock is ticking or not
 * @type switch
 * @default 0
 * @param Time Variables
 * @parent Time System
 * @type struct<TimeVariables>
 * @default
 * @desc Copy the time data to variables to use on events
 *
 * @param Clock pause switch
 * @parent Time System
 * @desc A switch that pauses the clock when turned on
 * @type switch
 * @default 0
 *
 * @param Clock pause tilesets
 * @parent Time System
 * @desc A list of map tilesets where the clock should be paused
 * @type tileset[]
 *
 * @param Weather System
 *
 * @param Weather pause switch
 * @parent Weather System
 * @desc A switch that pauses the weather when turned on
 * @type switch
 * @default 0
 *
 * @param Weather pause tilesets
 * @parent Weather System
 * @desc A list of map tilesets where the weather should be ignored
 * @type tileset[]
 *
 * @param Weather is paused switch
 * @parent Weather System
 * @desc A switch that will be turned on automatically every time the weather system is paused
 * @type switch
 *
 * @param Manual weather switch
 * @parent Weather System
 * @desc When this switch is turned on, the weather system will do nothing
 * @type switch
 * @default 0
 *
 * @param No special weather event
 * @parent Weather System
 * @type common_event
 * @desc The common event that should be triggered when there's no active weather effect
 *
 * @param Rain Effect
 * @parent Weather System
 * @type struct<WeatherEffect>
 * @desc The weather effect is not triggered automatically, you'll need to add a common event with a "Change Weather" command
 *
 * @param Storm Effect
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Snow Effect
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Custom Effect 1
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Custom Effect 2
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Custom Effect 3
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Custom Effect 4
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Custom Effect 5
 * @parent Weather System
 * @type struct<WeatherEffect>
 *
 * @param Current weather variable
 * @parent Weather System
 * @type variable
 * @default 0
 * @desc A variable that will be automatically updated with the code for the current weather
 * Manual changes to this variable will be ignored
 *
 * @param Before weather update
 * @parent Weather System
 * @type common_event
 * @default 0
 * @desc A common event to be executed every time the weather will be updated
 *
 * @param Formats
 *
 * @param Time format
 * @parent Formats
 * @default [hh]:[mm]
 * @desc The format of the time string: [h], [hh], [m], [mm], [s], [ss]. Use [h12] or [hh12] and [ampm] for 12hr clock
 *
 * @param Date format
 * @parent Formats
 * @default [y]-[mm]-[dd]
 * @desc The format of the date string. Accepts [y], [yy], [yyy], [yyyy], [mm], [m], [d], [dd]
 *
 * @param Callbacks
 *
 * @param Time Callbacks
 * @parent Callbacks
 * @type struct<TimeCallback>[]
 * @default
 * @desc Make the system trigger a common event on any specific time
 *
 * @param On change time
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the clock changes
 *
 * @param On change second
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the clock's seconds changes
 *
 * @param On change minute
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the clock's minutes changes
 *
 * @param On change hour
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the clock's hours changes
 *
 * @param On change day
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the date changes
 *
 * @param On change month
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the month changes
 *
 * @param On change year
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time the year changes
 *
 * @param On day start
 * @parent Callbacks
 * @type common_event
 * @default 0
 * @desc Trigger a common event every time a new day starts (as configured on the "day start time" param)
 **/
/*~struct~Time:
 * @param second
 * @type number
 * @default 0
 *
 * @param minute
 * @type number
 * @default 0
 *
 * @param hour
 * @type number
 * @default 6
 *
 * @param day
 * @type number
 * @default 1
 *
 * @param month
 * @type number
 * @default 1
 *
 * @param year
 * @type number
 * @default 1
 */
/*~struct~TimeVariables:
 * @param second
 * @type variable
 * @default 0
 * @desc a variable that will automatically update with the current second
 * Changing the value of this variable will change the clock's second
 *
 * @param minute
 * @type variable
 * @desc a variable that will automatically update with the current minute
 * Changing the value of this variable will change the clock's minute
 *
 * @param hour
 * @type variable
 * @desc a variable that will automatically update with the current hour
 * Changing the value of this variable will change the clock's hour
 *
 * @param hour12
 * @type variable
 * @default 0
 * @desc a variable that will receive the current hour in 12hr format
 * Manual changes to this variable will be ignored
 *
 * @param pm
 * @type switch
 * @default 0
 * @desc a switch that will be turned on after 12:00pm
 * Manual changes to this switch will be ignored
 *
 * @param day
 * @type variable
 * @default 0
 * @desc a variable that will automatically update with the current day
 * Changing the value of this variable will change the calendar's date
 *
 * @param weekDay
 * @type variable
 * @desc a variable that will automatically update with the current week day
 * Manual changes to this variable will be ignored
 *
 * @param month
 * @type variable
 * @default 0
 * @desc a variable that will automatically update with the current month
 * Changing the value of this variable will change the calendar's month
 *
 * @param year
 * @type variable
 * @default 0
 * @desc a variable that will automatically update with the current year
 * Changing the value of this variable will change the calendar's year
 *
 * @param dateString
 * @type variable
 * @default
 * @desc a variable that will automatically update with the current formatted date
 * Changing the value of this variable will change the calendar's year
 *
 * @param timeString
 * @type variable
 * @default
 * @desc a variable that will automatically update with the current formatted time
 * Changing the value of this variable will change the calendar's year
 *
 * @param isPaused
 * @type switch
 * @default
 * @desc a switch that will be turned on whenever the time system is paused
 *
 */
/*~struct~WeatherEffect:
 * @param enabled
 * @type boolean
 * @default false
 * @desc Should this weather effect be enabled?
 *
 * @param commonEvent
 * @type common_event
 * @default 0
 * @desc What common even should be triggered when the weather changes to this?
 *
 * @param chance
 * @type number
 * @default 20
 * @desc What should be the chance of this weather happening? (0-100)
 *
 * @param monthList
 * @type number[]
 * @default []
 * @desc Add any month number to this list to make this weather only occur on them.
 *
 * @param extraParams
 * @type struct<Dictionary>[]
 * @desc Add extra params to this weather effect, to be used by other plugins
 */
/*~struct~TimeCallback:
 * @param type
 * @type select
 * @default hour
 * @option Hour
 * @value hour
 * @option Minute
 * @value minute
 * @option Day
 * @value day
 * @option Week Day
 * @value weekDay
 * @option Month
 * @value month
 * @option Year
 * @value year
 * @option Second
 * @value second
 * @desc What kind of value are you adding a callback to?
 *
 * @param value
 * @type number
 * @desc The value that you want to attach an event to
 *
 * @param event
 * @type common_event
 * @desc The common event that will be triggered when the specificed is met
 */
/*~struct~Dictionary:
 * @param name
 * @type string
 * @desc The name of the custom parameter
 *
 * @param value
 * @type string
 * @desc The value of the custom parameter
 */
