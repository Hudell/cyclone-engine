import { CyclonePlugin } from '../../Core/main';

const cycloneWeatherTypes = Object.freeze(['none', 'rain', 'storm', 'snow', 'custom1', 'custom2', 'custom3', 'custom4', 'custom5']);

class CycloneTime extends CyclonePlugin {
  static register() {
    this.initialize('CycloneTime');

    this.structs.set('CycloneTime', {
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

    this.structs.set('CycloneTimeVariables', {
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

    this.structs.set('CycloneWeatherSetting', {
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

    this.structs.set('TimeCallback', {
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

    super.register({
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
    return this.params.yearLength ?? 12;
  }

  static get monthLength() {
    if (this.useRealMonths) {
      return 31;
    }
    return this.params.monthLength ?? 31;
  }

  static get dayLength() {
    if (this.useRealMonths) {
      return 24;
    }
    return this.params.dayLength ?? 24;
  }

  static get hourLength() {
    if (this.useRealMonths) {
      return 60;
    }
    return this.params.hourLength ?? 60;
  }

  static get minuteLength() {
    if (this.useRealMonths) {
      return 60;
    }
    return this.params.minuteLength ?? 60;
  }

  static get secondLength() {
    if (this.useRealTime) {
      return 1000;
    }

    if (this.params.secondLengthVariable) {
      return $gameVariables.value(this.params.secondLengthVariable);
    }
    return this.params.secondLength ?? 100;
  }

  static get useRealTime() {
    return this.params.useRealTime;
  }

  static get useRealMonths() {
    if (this.useRealTime) {
      return true;
    }

    return this.params.useRealMonths;
  }

  static get stopped() {
    const mainSwitchId = this.params.mainSwitchId ?? 0;
    if (mainSwitchId) {
      if ($gameSwitches === undefined || $gameSwitches === null) {
        return true;
      }

      return !$gameSwitches.value(mainSwitchId);
    }

    return this._stopped === true;
  }

  static set stopped(value) {
    const mainSwitchId = this.params.mainSwitchId ?? 0;
    if (mainSwitchId) {
      $gameSwitches.setValue(mainSwitchId, !value);
      return;
    }

    this._stopped = value;
  }

  static get paused() {
    if (SceneManager._scene instanceof Scene_Map) {
      const tilesets = this.params.tilesetList || [];
      if (tilesets.length && tilesets.includes($dataMap.tilesetId)) {
        return true;
      }
    }

    if (this.params.pauseSwitchId) {
      if ($gameSwitches.value(this.params.pauseSwitchId)) {
        return true;
      }
    }

    return false;
  }

  static get manualWeather() {
    const manualWeather = this.params.manualWeatherSwitchId;
    if (manualWeather) {
      return $gameSwitches.value(manualWeather);
    }

    return false;
  }

  static get weatherPaused() {
    if (SceneManager._scene instanceof Scene_Map) {
      const tilesets = this.params.weatherTilesetList || [];
      if (tilesets.length && tilesets.includes($dataMap.tilesetId)) {
        return true;
      }
    }

    if (this.params.weatherSwitchId) {
      if ($gameSwitches.value(this.params.weatherSwitchId)) {
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
    return this.params.pauseDuringMessages;
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
    if (!this.params.initialTime) {
      return;
    }

    this.setTime(this.convertObjectToNumber({
      second: this.params.initialTime.second ?? 0,
      minute: this.params.initialTime.minute ?? 0,
      hour: this.params.initialTime.hour ?? 6,
      day: this.params.initialTime.day ?? 1,
      month: this.params.initialTime.month ?? 1,
      year: this.params.initialTime.year ?? 1,
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
    let format = this.params.dateFormat || '[y]-[mm]-[dd]';

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
    const format = this.params.timeFormat || '[hh]:[mm]';

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
    const timeCallbacks = this.params.timeCallbacks;
    if (!timeCallbacks || !timeCallbacks.length) {
      return;
    }

    for (const callback of timeCallbacks) {
      if (!callback || !callback.type || !callback.event || isNaN(Number(callback.value))) {
        continue;
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
    const dayStartTime = this.params.dayStartTime ?? 0;

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

    const variables = this.params.variables;
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
      const pausedId = this.params.variables && this.params.variables.isPaused;
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
    const eventId = this.params[paramName];

    if (eventId) {
      this.runCommonEvent(eventId);
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
    const { second, minute, hour, hour12, day, month, year, weekDay } = this.params.variables;
    return second || minute || hour || hour12 || day || month || year || weekDay;
  }

  static isWeatherAvailable(weatherSettings, dateObj) {
    if (!weatherSettings.enabled) {
      return false;
    }

    if (weatherSettings.monthList && weatherSettings.monthListh.length && !weatherSettings.monthListh.includes(dateObj.month)) {
      return false;
    }

    return true;
  }

  static pickRandomWeather(dateTime) {
    const data = typeof dateTime === 'number' ? this.convertNumberToObject(dateTime) : dateTime;
    const availableWeatherTypes = [];

    const allWeathers = [
      { id: 'rain', ...this.params.rain },
      { id: 'storm', ...this.params.storm },
      { id: 'snow', ...this.params.snow },
      { id: 'custom1', ...this.params.custom1 },
      { id: 'custom2', ...this.params.custom2 },
      { id: 'custom3', ...this.params.custom3 },
      { id: 'custom4', ...this.params.custom4 },
      { id: 'custom5', ...this.params.custom5 },
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
    const dayStartTime = this.params.dayStartTime ?? 0;
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
    const currentWeatherVariable = this.params.currentWeatherVariable;
    if (currentWeatherVariable) {
      const idx = cycloneWeatherTypes.indexOf(this.currentWeather).clamp(0, cycloneWeatherTypes.length -1);
      $gameVariables.setValue(currentWeatherVariable, idx);
    }

    const weatherIsPausedSwitchId = this.params.weatherIsPausedSwitchId;
    if (weatherIsPausedSwitchId) {
      $gameSwitches.setValue(weatherIsPausedSwitchId, this.weatherPaused);
    }
  }

  static updateWeather() {
    const weatherIsPausedSwitchId = this.params.weatherIsPausedSwitchId;
    if (weatherIsPausedSwitchId) {
      $gameSwitches.setValue(weatherIsPausedSwitchId, this.weatherPaused);
    }

    const beforeWeatherEvent = this.params.beforeWeatherEvent;
    if (beforeWeatherEvent) {
      this.runCommonEvent(beforeWeatherEvent);
    }

    if (this.manualWeather) {
      return;
    }

    this.updateWeatherVariable();

    const settings = this.params[this.currentWeather];
    let eventId = this.params.sunEventId;
    if (settings && !this.weatherPaused) {
      eventId = settings.commonEvent ?? eventId;
    }

    if (eventId) {
      this.runCommonEvent(eventId);
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

globalThis.CycloneTime = CycloneTime;
CycloneTime.register();