/*:
 * @target MZ
 * @plugindesc Background extendable time system with automatic weather change
 * and custom common event callbacks
 * <hudell><pluginName:CycloneTime>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-time
 * @orderAfter Cyclone-Core
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
 * Time and Weather System 1.00.00                                   by Hudell
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

CycloneEngine.requireVersion(2, 'CycloneTime');

class CycloneTime extends CyclonePlugin {
  static register() {
    CycloneEngine.structs.set('CycloneTime', {
      second: {
        type: 'int',
        defaultValue: 0,
      },
      minute: {
        type: 'int',
        defaultValue: 0,
      },
      hour: {
        type: 'int',
        defaultValue: 0,
      },
      day: {
        type: 'int',
        defaultValue: 1,
      },
      month: {
        type: 'int',
        defaultValue: 1,
      },
      year: {
        type: 'int',
        defaultValue: 1,
      },
    });

    CycloneEngine.structs.set('CycloneTimeVariables', {
      second: {
        type: 'int',
        defaultValue: 0,
      },
      minute: {
        type: 'int',
        defaultValue: 0,
      },
      hour: {
        type: 'int',
        defaultValue: 0,
      },
      hour12: {
        type: 'int',
        defaultValue: 0,
      },
      day: {
        type: 'int',
        defaultValue: 0,
      },
      pm: {
        type: 'int',
        defaultValue: 0,
      },
      weekDay: {
        type: 'int',
        defaultValue: 0,
      },
      month: {
        type: 'int',
        defaultValue: 0,
      },
      year: {
        type: 'int',
        defaultValue: 0,
      },
      dateString: {
        type: 'int',
        defaultValue: 0,
      },
      timeString: {
        type: 'int',
        defaultValue: 0,
      },
      isPaused: {
        type: 'int',
        defaultValue: 0
      }
    });

    CycloneEngine.structs.set('CycloneWeatherSetting', {
      enabled: {
        type: 'boolean',
        defaultValue: false,
      },
      commonEvent: {
        type: 'int',
        defaultValue: 0,
      },
      chance: {
        type: 'int',
        defaultValue: 20,
      },
      monthList: {
        type: 'int[]',
        defaultValue: '[]',
      },
      extraParams: {
        type: 'struct<Dictionary>[]',
        defaultValue: '{}',
      },
    });

    CycloneEngine.structs.set('TimeCallback', {
      type: {
        type: 'string',
        defaultValue: '',
      },
      value: {
        type: 'int',
        defaultValue: NaN,
      },
      event: {
        type: 'int',
        defaultValue: 0,
      },
    });

    super.register('CycloneTime', {
      initialTime: {
        name: 'Initial Time',
        type: 'struct<CycloneTime>',
        defaultValue: '{"second":0,"minute":0,"hour":6,"day":1,"month":1,"year": 1}',
      },
      weekDayOffset: {
        name: 'First day ever',
        type: 'int',
        defaultValue: 1,
      },
      pauseDuringMessages: {
        name: 'Pause during messages',
        type: 'boolean',
        defaultValue: true,
      },
      minuteLength: {
        name: 'Seconds in a minute',
        type: 'int',
        defaultValue: 60,
      },
      hourLength: {
        name: 'Minutes in an hour',
        type: 'int',
        defaultValue: 60,
      },
      dayLength: {
        name: 'Hours in a day',
        type: 'int',
        defaultValue: 24,
      },
      weekLength: {
        name: 'Days in a week',
        type: 'int',
        defaultValue: 7,
      },
      monthLength: {
        name: 'Days in a month',
        type: 'int',
        defaultValue: 31,
      },
      yearLength: {
        name: 'Months in a year',
        type: 'int',
        defaultValue: 12,
      },
      secondLength: {
        name: 'Time Speed',
        type: 'int',
        defaultValue: 100,
      },
      secondLengthVariable: {
        name: 'Variable Time Speed',
        type: 'int',
        defaultValue: 0,
      },
      useRealMonths: {
        name: 'Use real months',
        type: 'boolean',
        defaultValue: false,
      },
      useRealTime: {
        name: 'Use real time',
        type: 'boolean',
        defaultValue: false,
      },
      mainSwitchId: {
        name: 'Clock main switch',
        type: 'int',
        defaultValue: 0,
      },
      pauseSwitchId: {
        name: 'Clock pause switch',
        type: 'int',
        defaultValue: 0,
      },
      tilesetList: {
        name: 'Clock pause tilesets',
        type: 'int[]',
        defaultValue: '[]'
      },
      variables: {
        name: 'Time Variables',
        type: 'struct<CycloneTimeVariables>',
        defaultValue: '{"second":0,"minute":0,"hour":0,"day":0,"month":0,"year":0,"pm":0,"weekDay":0}',
      },
      dayStartTime: {
        name: 'Day start time',
        type: 'int',
        defaultValue: 6,
      },
      weatherSwitchId: {
        name: 'Weather pause switch',
        type: 'int',
        defaultValue: 0,
      },
      manualWeatherSwitchId: {
        name: 'Manual weather switch',
        type: 'int',
        defaultValue: 0,
      },
      weatherTilesetList: {
        name: 'Weather pause tilesets',
        type: 'int[]',
        defaultValue: '[]'
      },
      weatherIsPausedSwitchId: {
        name: 'Weather is paused switch',
        type: 'int',
        defaultValue: 0,
      },
      sunEventId: {
        name: 'No special weather event',
        type: 'int',
        defaultValue: 0,
      },
      rain: {
        name: 'Rain Effect',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      storm: {
        name: 'Storm Effect',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      snow: {
        name: 'Snow Effect',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      custom1: {
        name: 'Custom Effect 1',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      custom2: {
        name: 'Custom Effect 2',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      custom3: {
        name: 'Custom Effect 3',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      custom4: {
        name: 'Custom Effect 4',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      custom5: {
        name: 'Custom Effect 5',
        type: 'struct<CycloneWeatherSetting>',
        defaultValue: '{}',
      },
      currentWeatherVariable: {
        name: 'Current weather variable',
        type: 'int',
        defaultValue: 0,
      },
      beforeWeatherEvent: {
        name: 'Before weather update',
        type: 'int',
        defaultValue: 0,
      },
      timeCallbacks: {
        name: 'Time Callbacks',
        type: 'struct<TimeCallback>[]',
        defaultValue: '[]',
      },
      timeFormat: {
        name: 'Time format',
        type: 'string',
        defaultValue: '[hh]:[mm]'
      },
      dateFormat: {
        name: 'Date format',
        type: 'string',
        defaultValue: '[y]-[mm]-[dd]'
      },
      onChangeTime: {
        name: 'On change time',
        type: 'int',
        defaultValue: 0,
      },
      onChangeSecond: {
        name: 'On change second',
        type: 'int',
        defaultValue: 0,
      },
      onChangeMinute: {
        name: 'On change minute',
        type: 'int',
        defaultValue: 0,
      },
      onChangeHour: {
        name: 'On change hour',
        type: 'int',
        defaultValue: 0,
      },
      onChangeDay: {
        name: 'On change day',
        type: 'int',
        defaultValue: 0,
      },
      onChangeMonth: {
        name: 'On change month',
        type: 'int',
        defaultValue: 0,
      },
      onChangeYear: {
        name: 'On change year',
        type: 'int',
        defaultValue: 0,
      },
      onDayStart: {
        name: 'On day start',
        type: 'int',
        defaultValue: 0,
      },
    });

    this.time = 0;
    this.recalculate();
    this.assignCallbacks();
  }

  static get second() { return this._second; }
  static set second(value) { this._second = value; }
  static get minute() { return this._minute; }
  static set minute(value) { this._minute = value; }
  static get hour() { return this._hour; }
  static set hour(value) { this._hour = value; }
  static get day() { return this._day; }
  static set day(value) { this._day = value; }
  static get month() { return this._month; }
  static set month(value) { this._month = value; }
  static get year() { return this._year; }
  static set year(value) { this._year = value; }
  static get weekDay() { return this._weekDay; }
  static set weekDay(value) { this._weekDay = value; }
  static get previousWeather() { return this._previousWeather; }
  static get currentWeather() { return this._currentWeather; }
  static set currentWeather(value) {
    this._previousWeather = this._currentWeather;
    this._currentWeather = value;
    this.updateWeather();
  }

  static get timeString() {
    return this.getTimeString();
  }

  static get dateString() {
    return this.getDateString();
  }

  static get hour12() {
    const hour = this.hour % 12;
    if (hour === 0) {
      return 12;
    }
    return hour;
  }
  static get amPm() {
    if (this.hour < 12) {
      return 'am';
    }

    return 'pm';
  }

  static get yearLength() {
    if (this.useRealMonths) {
      return 12;
    }
    return this.params.get('yearLength') ?? 12;
  }

  static get monthLength() {
    if (this.useRealMonths) {
      return 31;
    }
    return this.params.get('monthLength') ?? 31;
  }

  static get dayLength() {
    if (this.useRealMonths) {
      return 24;
    }
    return this.params.get('dayLength') ?? 24;
  }

  static get hourLength() {
    if (this.useRealMonths) {
      return 60;
    }
    return this.params.get('hourLength') ?? 60;
  }

  static get minuteLength() {
    if (this.useRealMonths) {
      return 60;
    }
    return this.params.get('minuteLength') ?? 60;
  }

  static get secondLength() {
    if (this.useRealTime) {
      return 1000;
    }

    if (this.params.get('secondLengthVariable')) {
      return $gameVariables.value(this.params.get('secondLengthVariable'));
    }
    return this.params.get('secondLength') ?? 100;
  }

  static get useRealTime() {
    return this.params.get('useRealTime');
  }

  static get useRealMonths() {
    if (this.useRealTime) {
      return true;
    }

    return this.params.get('useRealMonths');
  }

  static get stopped() {
    const mainSwitchId = this.params.get('mainSwitchId') ?? 0;
    if (mainSwitchId) {
      if ($gameSwitches === undefined || $gameSwitches === null) {
        return true;
      }

      return !$gameSwitches.value(mainSwitchId);
    }

    return this._stopped === true;
  }

  static set stopped(value) {
    const mainSwitchId = this.params.get('mainSwitchId') ?? 0;
    if (mainSwitchId) {
      $gameSwitches.setValue(mainSwitchId, !value);
      return;
    }

    this._stopped = value;
  }

  static get paused() {
    if (SceneManager._scene instanceof Scene_Map) {
      const tilesets = this.params.get('tilesetList');
      if (tilesets?.length && tilesets.includes($dataMap.tilesetId)) {
        return true;
      }
    }

    if (this.params.get('pauseSwitchId')) {
      if ($gameSwitches.value(this.params.get('pauseSwitchId'))) {
        return true;
      }
    }

    return false;
  }

  static get manualWeather() {
    const manualWeather = this.params.get('manualWeatherSwitchId');
    if (manualWeather) {
      return $gameSwitches.value(manualWeather);
    }

    return false;
  }

  static get weatherPaused() {
    if (SceneManager._scene instanceof Scene_Map) {
      const tilesets = this.params.get('weatherTilesetList');
      if (tilesets?.length && tilesets.includes($dataMap.tilesetId)) {
        return true;
      }
    }

    if (this.params.get('weatherSwitchId')) {
      if ($gameSwitches.value(this.params.get('weatherSwitchId'))) {
        return true;
      }
    }

    return false;
  }

  static get pausedInternally() {
    if (!$dataMap) {
      return true;
    }

    if ($gamePlayer.isTransferring()) {
      return true;
    }

    if (SceneManager._scene instanceof Scene_Map) {
      if (this.shouldPauseDuringMessages && $gameMessage.isBusy()) {
        return true;
      }
    }

    return false;
  }

  static get shouldPauseDuringMessages() {
    return this.params.get('pauseDuringMessages');
  }

  static get currentData() {
    return {
      second: this.second,
      minute: this.minute,
      hour: this.hour,
      day: this.day,
      month: this.month,
      year: this.year,
      weekDay: this.weekDay,
      stopped: this.stopped,
    };
  }

  static get tomorrow() {
    return this.getDayAfterDate(this.currentData);
  }

  static loadInitialTime() {
    this.setTime(this.convertObjectToNumber({
      second: this.params.get('initialTime')?.second ?? 0,
      minute: this.params.get('initialTime')?.minute ?? 0,
      hour: this.params.get('initialTime')?.hour ?? 6,
      day: this.params.get('initialTime')?.day ?? 1,
      month: this.params.get('initialTime')?.month ?? 1,
      year: this.params.get('initialTime')?.year ?? 1,
    }));
  }

  static getDayBeforeDate(data) {
    data.hour = 0;
    data.minute = 0;
    data.second = 0;
    data.day -= 1;

    if (data.day === 0) {
      data.month -= 1;
      data.day = this.monthLength;

      if (data.month === 0) {
        data.year -= 1;
        data.month = this.yearLength;
      }
    }
    const time = this.convertObjectToNumber(data);
    return this.convertNumberToObject(time);
  }

  static getDayAfterDate(data) {
    data.hour = 0;
    data.minute = 0;
    data.second = 0;
    data.day += 1;
    const time = this.convertObjectToNumber(data);
    return this.convertNumberToObject(time);
  }

  static getDateString() {
    const { day, month, year } = this;
    let format = this.params.get('dateFormat') || '[y]-[mm]-[dd]';

    return format
      .replace('[yyyy]', year.padZero(4))
      .replace('[yyy]', year.padZero(3))
      .replace('[yy]', year.padZero(2))
      .replace('[y]', year)
      .replace('[mm]', month.padZero(2))
      .replace('[m]', month)
      .replace('[dd]', day.padZero(2))
      .replace('[d]', day);
  }

  static getTimeString() {
    const { hour, hour12, minute, second, amPm } = this;
    const format = this.params.get('timeFormat') || '[hh]:[mm]';

    return format
      .replace('[hh]', hour.padZero(2))
      .replace('[h]', hour)
      .replace('[hh12]', hour12.padZero(2))
      .replace('[h12]', hour12)
      .replace('[mm]', minute.padZero(2))
      .replace('[m]', minute)
      .replace('[ss]', second.padZero(2))
      .replace('[s]', second)
      .replace('[ampm]', amPm);
  }

  static assignCallbacks() {
    const timeCallbacks = this.params.get('timeCallbacks');
    if (!timeCallbacks || !timeCallbacks.length) {
      return;
    }

    for (const callback of timeCallbacks) {
      if (!callback?.type || !callback.event || isNaN(Number(callback.value))) {
        return;
      }

      const eventName = `${ callback.type }:${ callback.value}`;
      this.registerEvent(eventName, callback.event);
    }
  }

  static runTimeChangeEvents(oldData) {
    let changedTime = false;

    const check = (oldValue, newValue, callback) => {
      if (oldValue !== newValue) {
        changedTime = true;
        callback.call(this);
      }
    };

    check(oldData.second, this.second, this.onChangeSecond);
    check(oldData.minute, this.minute, this.onChangeMinute);
    check(oldData.hour, this.hour, this.onChangeHour);
    check(oldData.day, this.day, this.onChangeDay);
    check(oldData.month, this.month, this.onChangeMonth);
    check(oldData.year, this.year, this.onChangeYear);

    if (this.checkIfStartedNewDay(oldData)) {
      this.onStartDay();
    }

    if (changedTime) {
      this.onChangeTime();
    }
  }

  static checkIfStartedNewDay(oldData) {
    const dayStartTime = this.params.get('dayStartTime') ?? 0;

    const dayStartSeconds = dayStartTime * this.hourLength * this.minuteLength;
    const effectiveTime = this.time - dayStartSeconds;
    const oldEffectiveTime = this.convertObjectToNumber(oldData) - dayStartSeconds;

    const newDay = this.convertNumberToObject(effectiveTime).day;
    const oldDay = this.convertNumberToObject(oldEffectiveTime).day;
    return newDay !== oldDay;
  }

  static convertObjectToNumber(dateTime) {
    const months = ((dateTime.year ?? 1) -1) * this.yearLength + (dateTime.month ?? 1) - 1;
    const days = months * this.monthLength + (dateTime.day ?? 1) - 1;
    const hours = days * this.dayLength + (dateTime.hour ?? 0);
    const minutes = hours * this.hourLength + (dateTime.minute ?? 0);
    return minutes * this.minuteLength + (dateTime.second ?? 0);
  }

  static convertNumberToObject(time) {
    let remainingTime = time;
    const secondsPerHour = this.minuteLength * this.hourLength;
    const secondsPerDay = secondsPerHour * this.dayLength;
    const secondsPerMonth = secondsPerDay * this.monthLength;
    const secondsPerYear = secondsPerMonth * this.yearLength;

    const year = Math.floor(remainingTime / secondsPerYear);
    remainingTime -= year * secondsPerYear;
    const month = Math.floor(remainingTime / secondsPerMonth);
    remainingTime -= month * secondsPerMonth;
    const day = Math.floor(remainingTime / secondsPerDay);
    remainingTime -= day * secondsPerDay;
    const hour = Math.floor(remainingTime / secondsPerHour);
    remainingTime -= hour * secondsPerHour;
    const minute = Math.floor(remainingTime / this.minuteLength);
    remainingTime -= minute * this.minuteLength;
    const second = remainingTime;

    return {
      second,
      minute,
      hour,
      day: day + 1,
      month: month + 1,
      year: year + 1
    };
  }

  static recalculate() {
    const data = this.convertNumberToObject(this.time);

    this._second = data.second;
    this._minute = data.minute;
    this._hour = data.hour;
    this._day = data.day;
    this._month = data.month;
    this._year = data.year;
    this._weekDay = data.weekDay;

    this.updateVariables();
  }

  static updateVariables() {
    if (this.time === 0) {
      return;
    }

    const update = (variableId, value) => {
      if (variableId && $gameVariables) {
        $gameVariables._data[variableId] = value;
      }
    };

    const variables = this.params.get('variables');
    update(variables.second, this.second);
    update(variables.minute, this.minute);
    update(variables.hour, this.hour);
    update(variables.hour12, this.hour12);
    update(variables.day, this.day);
    update(variables.month, this.month);
    update(variables.year, this.year);
    update(variables.timeString, this.timeString);
    update(variables.dateString, this.dateString);

    if ($gameSwitches) {
      if (variables.pm) {
        $gameSwitches._data[variables.pm] = this.amPm === 'pm';
      }

      if (variables.isPaused) {
        $gameSwitches._data[variables.isPaused] = this.pausedInternally || this.paused;
      }
    }

    $gameMap.requestRefresh();
  }

  static updateTime(runEvents = true) {
    const oldData = this.currentData;

    if (this.useRealMonths && !this.useRealTime) {
      this.applyRealTimeLogic();
    }

    this.recalculate();

    if (runEvents) {
      this.runTimeChangeEvents(oldData);
    }
  }

  static applyRealTimeLogic() {
    const date = new Date();
    const obj = this.convertNumberToObject(this.time);

    date.setDate(1);

    date.setFullYear(obj.year);
    date.setMonth(obj.month - 1);
    date.setDate(obj.day);
    date.setHours(obj.hour);
    date.setMinutes(obj.minute);
    date.setSeconds(obj.second);

    this.setTime(this.convertObjectToNumber(this.convertJSDateToObject(date)));
  }

  static convertJSDateToObject(date) {
    return {
      second: date.getSeconds(),
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      weekDay: date.getDay(),
    };
  }

  static loadRealTime() {
    this.setTime(this.convertObjectToNumber(this.convertJSDateToObject(new Date())));
    this.updateTime();
  }

  static setTime(newTime) {
    const oldData = this.currentData;

    if (typeof newTime === 'object') {
      this.time = this.convertObjectToNumber(newTime);
    } else {
      this.time = newTime;
    }

    this.updateTime(false);
    this.runTimeChangeEvents(oldData);
  }

  static addSeconds(number) {
    this.time += number;
    this.updateTime(true);
  }

  static addMinutes(number) {
    this.addSeconds(number * this.minuteLength);
  }

  static addHours(number) {
    this.addMinutes(number * this.hourLength);
  }

  static addDays(number) {
    this.addHours(number * this.dayLength);
  }

  static addMonths(number) {
    this.addDays(number * this.monthLength);
  }

  static addYears(number) {
    this.addMonths(number * this.yearLength);
  }

  static passTime({seconds = 0, minutes = 0, hours = 0, days = 0, months = 0, years = 0}) {
    const monthsToAdd = years * this.yearLength + months;
    const daysToAdd = monthsToAdd * this.monthLength + days;
    const hoursToAdd = daysToAdd * this.dayLength + hours;
    const minutesToAdd = hoursToAdd * this.hourLength + minutes;

    this.addSeconds(minutesToAdd * this.minuteLength + seconds);
  }

  static progressTime(increment = 1) {
    if (this.stopped || this.pausedInternally || this.paused) {
      const pausedId = this.params.get('variables')?.isPaused;
      if (pausedId) {
        $gameSwitches.setValue(pausedId, true);
      }
      return;
    }

    if (this.useRealTime) {
      this.loadRealTime();
    } else if (SceneManager._scene instanceof Scene_Map) {
      this.addSeconds(increment);
    }
  }

  static maybeRunParamCommonEvent(paramName) {
    const eventId = this.params.get(paramName);

    if (eventId) {
      CycloneEngine.runCommonEvent(eventId);
    }
  }

  static onChangeSecond() {
    this.runEvent('changeSecond');
    this.runEvent(`second:${ this.second }`);

    this.maybeRunParamCommonEvent('onChangeSecond');
  }

  static onChangeMinute() {
    this.runEvent('changeMinute');
    this.runEvent(`minute:${ this.minute }`);

    this.maybeRunParamCommonEvent('onChangeMinute');
  }

  static onChangeHour() {
    this.runEvent('changeHour');
    this.runEvent(`hour:${ this.hour }`);
    this.runEvent(`time:${ this.hour }:${ this.minute }`);
    this.runEvent(`fullTime:${ this.hour }:${ this.minute }:${ this.second }`);

    this.maybeRunParamCommonEvent('onChangeHour');
  }

  static onStartDay() {
    this.runEvent('startDay');

    this.skipToNextWeather();
    this.maybeRunParamCommonEvent('onDayStart');
  }

  static onChangeDay() {
    this.runEvent('changeDay');
    this.runEvent(`day:${ this.day }`);

    this.maybeRunParamCommonEvent('onChangeDay');
  }

  static onChangeMonth() {
    this.runEvent('changeMonth');
    this.runEvent(`month:${ this.month }`);

    this.maybeRunParamCommonEvent('onChangeMonth');
  }

  static onChangeYear() {
    this.runEvent('changeYear');
    this.runEvent(`year:${ this.year }`);

    this.maybeRunParamCommonEvent('onChangeYear');
  }

  static onChangeTime() {
    this.runEvent('changeTime');

    this.maybeRunParamCommonEvent('onChangeTime');
  }

  static setSecond(value) {
    const data = this.currentData;
    data.second = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static setMinute(value) {
    const data = this.currentData;
    data.minute = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static setHour(value) {
    const data = this.currentData;
    data.hour = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static setDay(value) {
    const data = this.currentData;
    data.day = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static setMonth(value) {
    const data = this.currentData;
    data.month = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static setYear(value) {
    const data = this.currentData;
    data.year = value;

    this.setTime(this.convertObjectToNumber(data));
  }

  static enableTime() {
    if (this._intervalHandler !== undefined) {
      return;
    }

    let length = this.secondLength;
    let increment = 1;
    if (length < 10) {
      const multiplier = Math.ceil(10 / length);
      increment *= multiplier;
      length *= multiplier;
    }

    this._intervalHandler = setInterval(() => {
      this.progressTime(increment);
    }, length);
  }

  static isEnabled() {
    return this._intervalHandler !== undefined;
  }

  static disableTime() {
    if (this._intervalHandler === undefined) {
      return;
    }

    clearInterval(this._intervalHandler);
    this._intervalHandler = undefined;
  }

  static refreshTimeSystem() {
    this.disableTime();
    this.enableTime();
  }

  static usingVariables() {
    const { second, minute, hour, hour12, day, month, year, weekDay } = this.params.get('variables');
    return second || minute || hour || hour12 || day || month || year || weekDay;
  }

  static isWeatherAvailable(weatherSettings, dateObj) {
    if (!weatherSettings.enabled) {
      return false;
    }

    if (weatherSettings.monthListh?.length && !weatherSettings.monthListh.includes(dateObj.month)) {
      return false;
    }

    return true;
  }

  static pickRandomWeather(dateTime) {
    const data = typeof dateTime === 'number' ? this.convertNumberToObject(dateTime) : dateTime;
    const availableWeatherTypes = [];

    const allWeathers = [
      { id: 'rain', ...this.params.get('rain') },
      { id: 'storm', ...this.params.get('storm') },
      { id: 'snow', ...this.params.get('snow') },
      { id: 'custom1', ...this.params.get('custom1') },
      { id: 'custom2', ...this.params.get('custom2') },
      { id: 'custom3', ...this.params.get('custom3') },
      { id: 'custom4', ...this.params.get('custom4') },
      { id: 'custom5', ...this.params.get('custom5') },
    ];

    for (const weatherSettings of allWeathers) {
      if (this.isWeatherAvailable(weatherSettings, data)) {
        availableWeatherTypes.push(weatherSettings);
      }
    }

    if (!availableWeatherTypes.length) {
      return 'none';
    }

    const maxNumber = availableWeatherTypes.length * 100;
    const randomNumber = Math.randomInt(maxNumber);
    const weatherIndex = Math.floor(randomNumber / 100);
    const chance = randomNumber - weatherIndex * 100;

    const weather = availableWeatherTypes[weatherIndex];
    if (weather.chance > chance) {
      return weather.id;
    }

    return 'none';
  }

  static skipDay() {
    const dayStartTime = this.params.get('dayStartTime') ?? 0;
    const data = this.currentData;
    if (data.hour >= dayStartTime) {
      data.day += 1;
    }

    data.hour = dayStartTime;
    data.minute = 0;
    data.second = 0;

    this.setTime(this.convertObjectToNumber(data));
  }

  static skipToNextWeather() {
    this.currentWeather = this.pickRandomWeather(this.currentData);
  }

  static updateWeatherVariable() {
    const currentWeatherVariable = this.params.get('currentWeatherVariable');
    if (currentWeatherVariable) {
      const idx = cycloneWeatherTypes.indexOf(this.currentWeather).clamp(0, cycloneWeatherTypes.length -1);
      $gameVariables.setValue(currentWeatherVariable, idx);
    }

    const weatherIsPausedSwitchId = this.params.get('weatherIsPausedSwitchId');
    if (weatherIsPausedSwitchId) {
      $gameSwitches.setValue(weatherIsPausedSwitchId, this.weatherPaused);
    }
  }

  static updateWeather() {
    const weatherIsPausedSwitchId = this.params.get('weatherIsPausedSwitchId');
    if (weatherIsPausedSwitchId) {
      $gameSwitches.setValue(weatherIsPausedSwitchId, this.weatherPaused);
    }

    const beforeWeatherEvent = this.params.get('beforeWeatherEvent');
    if (beforeWeatherEvent) {
      CycloneEngine.runCommonEvent(beforeWeatherEvent);
    }

    if (this.manualWeather) {
      return;
    }

    this.updateWeatherVariable();

    const settings = this.params.get(this.currentWeather);
    let eventId = this.params.get('sunEventId');
    if (settings && !this.weatherPaused) {
      eventId = settings.commonEvent ?? eventId;
    }

    if (eventId) {
      CycloneEngine.runCommonEvent(eventId);
    }
  }

  static getData() {
    return {
      time: this.time,
      weather: this.currentWeather,
    };
  }

  static setData(data) {
    if (data.time) {
      this.time = data.time;
      this.recalculate();
    } else {
      this.loadInitialTime();
    }

    this._previousWeather = 'none';
    if (data.weather) {
      this._currentWeather = data.weather;
    } else {
      this._currentWeather = 'none';
    }
  }
}

CycloneTime.register();

CycloneTime.patchClass(DataManager, $super => class {
  static makeSaveContents() {
    const contents = $super.makeSaveContents.call(this);
    contents.cycloneTime = CycloneTime.getData();

    return contents;
  }

  static extractSaveContents(contents) {
    $super.extractSaveContents.call(this, contents);

    if (contents.cycloneTime !== undefined) {
      CycloneTime.setData(contents.cycloneTime);
    }
  }

  static setupNewGame() {
    $super.setupNewGame.call(this);
    CycloneTime.disableTime();
    CycloneTime.loadInitialTime();
    CycloneTime.enableTime();
  }
});

if (CycloneTime.usingVariables()) {
  CycloneTime.patchClass(Game_Variables, $super => class {
    setValue(variableId, value) {
      $super.setValue.call(this, variableId, value);

      switch (variableId) {
        case CycloneTime.params.get('variables').second:
          return CycloneTime.setSecond(value);
        case CycloneTime.params.get('variables').minute:
          return CycloneTime.setMinute(value);
        case CycloneTime.params.get('variables').hour:
          return CycloneTime.setHour(value);
        case CycloneTime.params.get('variables').day:
          return CycloneTime.setDay(value);
        case CycloneTime.params.get('variables').month:
          return CycloneTime.setMonth(value);
        case CycloneTime.params.get('variables').year:
          return CycloneTime.setYear(value);
      }
    }
  });
}

CycloneTime.patchClass(Game_Player, $super => class {
  performTransfer(...args) {
    $super.performTransfer.call(this, ...args);
    CycloneTime.updateWeather();
    CycloneTime.updateVariables();
  }
});

CycloneTime.patchClass(Game_Map, $super => class {
  setup(...args) {
    $super.setup.call(this, ...args);
    CycloneTime.updateWeather();
    CycloneTime.updateVariables();
  }
});

const cycloneWeatherTypes = Object.freeze(['none', 'rain', 'storm', 'snow', 'custom1', 'custom2', 'custom3', 'custom4', 'custom5']);