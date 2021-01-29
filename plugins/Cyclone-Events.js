//=============================================================================
// Cyclone Engine - Events
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 
 *
 * <pluginName:CycloneEvents>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-events
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

 **/
(function () {
'use strict';

class CyclonePatcher {
  static initialize(pluginName) {
    this.pluginName = pluginName;
    this.superClasses = new Map();
  }

  static _descriptorIsProperty(descriptor) {
    return descriptor.get || descriptor.set || !descriptor.value || typeof descriptor.value !== 'function';
  }

  static _getAllClassDescriptors(classObj, usePrototype = false) {
    if (classObj === Object) {
      return {};
    }

    const descriptors = Object.getOwnPropertyDescriptors(usePrototype ? classObj.prototype : classObj);
    let parentDescriptors = {};
    if (classObj.prototype) {
      const parentClass = Object.getPrototypeOf(classObj.prototype).constructor;
      if (parentClass !== Object) {
        parentDescriptors = this._getAllClassDescriptors(parentClass, usePrototype);
      }
    }

    return Object.assign({}, parentDescriptors, descriptors);
  }

  static _assignDescriptor(receiver, giver, descriptor, descriptorName, autoRename = false) {
    if (this._descriptorIsProperty(descriptor)) {
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(receiver, descriptorName, {
          get: descriptor.get,
          set: descriptor.set,
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
        });
      } else {
        Object.defineProperty(receiver, descriptorName, {
          value: descriptor.value,
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
        });
      }
    } else {
      let newName = descriptorName;
      if (autoRename) {
        while (newName in receiver) {
          newName = `_${ newName }`;
        }
      }

      receiver[newName] = giver[descriptorName];
    }
  }

  static _applyPatch(baseClass, patchClass, $super, ignoredNames, usePrototype = false) {
    const baseMethods = this._getAllClassDescriptors(baseClass, usePrototype);

    const baseClassOrPrototype = usePrototype ? baseClass.prototype : baseClass;
    const patchClassOrPrototype = usePrototype ? patchClass.prototype : patchClass;
    const descriptors = Object.getOwnPropertyDescriptors(patchClassOrPrototype);
    let anyOverride = false;

    for (const methodName in descriptors) {
      if (ignoredNames.includes(methodName)) {
        continue;
      }

      if (methodName in baseMethods) {
        anyOverride = true;
        const baseDescriptor = baseMethods[methodName];
        this._assignDescriptor($super, baseClassOrPrototype, baseDescriptor, methodName, true);
      }

      const descriptor = descriptors[methodName];
      this._assignDescriptor(baseClassOrPrototype, patchClassOrPrototype, descriptor, methodName);
    }

    return anyOverride;
  }

  static patchClass(baseClass, patchFn) {
    const $super = this.superClasses?.[baseClass.name] || {};
    const $prototype = {};
    const $dynamicSuper = {};
    const patchClass = patchFn($dynamicSuper, $prototype);

    if (typeof patchClass !== 'function') {
      throw new Error(`Invalid class patch for ${ baseClass.name }`); //`
    }

    const ignoredStaticNames = Object.getOwnPropertyNames(class Test{});
    const ignoredNames = Object.getOwnPropertyNames((class Test{}).prototype);
    const anyStaticOverride = this._applyPatch(baseClass, patchClass, $super, ignoredStaticNames);
    const anyNonStaticOverride = this._applyPatch(baseClass, patchClass, $prototype, ignoredNames, true);

    if (anyStaticOverride) {
      const descriptors = Object.getOwnPropertyDescriptors($super);
      for (const descriptorName in descriptors) {
        this._assignDescriptor($dynamicSuper, $super, descriptors[descriptorName], descriptorName);
      }

      if (anyNonStaticOverride) {
        $dynamicSuper.$prototype = $prototype;
      }
    } else  {
      Object.assign($dynamicSuper, $prototype);
    }

    if (this.superClasses) {
      this.superClasses[baseClass.name] = $dynamicSuper;
    }
  }
}

const trueStrings = Object.freeze(['TRUE', 'ON', '1', 'YES', 'T', 'V' ]);

class CyclonePlugin extends CyclonePatcher {
  static initialize(pluginName) {
    super.initialize(pluginName);
    this.fileName = undefined;
    this.params = {};
    this.structs = new Map();
    this.eventListeners = new Map();

    this.structs.set('Dictionary', {
      name: {
        type: 'string',
        defaultValue: '',
      },
      value: {
        type: 'string',
        defaultValue: '',
      },
    });
  }

  static register(paramMap = {}) {
    const dataMap = this.loadAllParams();
    this.params = this.loadParamMap(paramMap, dataMap);
  }

  static loadAllParams() {
    for (const plugin of globalThis.$plugins) {
      if (!plugin?.status) {
        continue;
      }
      if (!plugin?.description?.includes(`<pluginName:${ this.pluginName }`)) { //`
        continue;
      }

      this.fileName = plugin.name;
      const pluginParams = new Map();

      for (const paramName in plugin.parameters) {
        if (!paramName || paramName.startsWith('-')) {
          continue;
        }

        pluginParams.set(paramName, plugin.parameters[paramName]);
      }

      return pluginParams;
    }
  }

  static loadParamMap(paramMap, dataMap = undefined) {
    const params = {};

    for (const key in paramMap) {
      if (!paramMap.hasOwnProperty(key)) {
        continue;
      }

      try {
        params[key] = this.parseParam(key, paramMap, dataMap);
      } catch(e) {
        console.error(`CycloneEngine crashed while trying to parse a parameter value (${ key }). Please report the following error to Hudell:`); //`
        console.log(e);
      }
    }

    return params;
  }

  static registerEvent(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }

    const listeners = this.eventListeners.get(eventName);
    listeners.add(callback);
  }

  static removeEventListener(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      return;
    }

    const listeners = this.eventListeners.get(eventName);
    listeners.delete(callback);
  }

  static shouldReturnCallbackResult(result, { abortOnTrue, abortOnFalse, returnOnValue }) {
    if (result === false && abortOnFalse) {
      return true;
    }

    if (result === true && abortOnTrue) {
      return true;
    }

    if (result !== undefined && returnOnValue) {
      return true;
    }

    return false;
  }

  static runEvent(eventName, { abortOnTrue = false, abortOnFalse = false, returnOnValue = false } = {}, ...args) {
    if (!this.eventListeners.has(eventName)) {
      return;
    }

    const listeners = this.eventListeners.get(eventName);
    for (const callback of listeners) {
      if (typeof callback === 'number') {
        this.runCommonEvent(callback);
        continue;
      }
      if (typeof callback !== 'function') {
        console.error('CycloneEngine: Invalid callback type:');
        console.log(callback);
        continue;
      }

      const result = callback(...args);
      if (this.shouldReturnCallbackResult(result, { abortOnTrue, abortOnFalse, returnOnValue })) {
        return result;
      }
    }
  }

  static runCommonEvent(eventId) {
    const commonEvent = globalThis.$dataCommonEvents[eventId];
    if (!commonEvent) {
      return;
    }

    const interpreter = new Game_Interpreter(1);
    interpreter.setup(commonEvent.list, 0);

    if (!this._interpreters) {
      this._interpreters = new Set();
      // Tap into rpg maker core so we can update our interpreters in sync with the engine
      const oldUpdateMain = SceneManager.updateMain;
      SceneManager.updateMain = () => {
        oldUpdateMain.call(SceneManager);
        this.update();
      };
    }

    this._interpreters.add(interpreter);
  }

  static update() {
    if (!this._interpreters) {
      return;
    }

    for (const interpreter of this._interpreters) {
      interpreter.update();

      if (!interpreter.isRunning()) {
        this._interpreters.delete(interpreter);
      }
    }
  }

  static getPluginFileName() {
    return this.fileName ?? this.pluginName;
  }

  static isTrue(value) {
    if (typeof value !== 'string') {
      return Boolean(value);
    }

    return trueStrings.includes(value.toUpperCase());
  }

  static isFalse(value) {
    return !this.isTrue(value);
  }

  static getIntParam({ value, defaultValue }) {
    try {
      const result = parseInt(value);

      if (isNaN(result)) {
        return defaultValue;
      }

      return result;
    } catch(e) {
      if (value !== '') {
        console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be an integer number, but the received value was '${ value }'.`); //`
      }
      return defaultValue;
    }
  }

  static getFloatParam({ value, defaultValue }) {
    try {
      const result = parseFloat(value.replace(',', '.'));

      if (isNaN(result)) {
        return defaultValue;
      }

      return result;
    } catch(e) {
      if (value !== '') {
        console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be a number, but the received value was '${ value }'.`); //`
      }

      return defaultValue;
    }
  }

  static getIntListParam({ value }) {
    return this.parseArray((value ?? '').trim(), item => {
      try {
        return parseInt(item.trim());
      } catch(e) {
        if (item !== '') {
          console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be a list of integer numbers, but one of the items was '${ item }'.`); //`
        }
        return 0;
      }
    });
  }

  static parseStructArrayParam({ data, type }) {
    const newData = [];
    for (const json of data) {
      const itemData = this.parseStructParam({ value: json, defaultValue: '', type });
      if (itemData) {
        newData.push(itemData);
      }
    }

    return newData;
  }

  static getFloatListParam({ value }) {
    return this.parseArray((value || '').trim(), item => {
      try {
        return parseFloat(item.trim());
      } catch(e) {
        if (item !== '') {
          console.error(`Cyclone Engine plugin ${ this.pluginName }: Param ${ name } is expected to be a list of numbers, but one of the items was '${ item }'.`); //`
        }
        return 0;
      }
    });
  }

  static getParam({ value, defaultValue, type }) {
    if (type.endsWith('[]')) {
      return this.parseArrayParam({ value, type });
    }

    if (type.startsWith('struct<')) {
      return this.parseStructParam({ value, defaultValue, type });
    }

    if (value === undefined) {
      return defaultValue;
    }

    switch(type) {
      case 'int':
        return this.getIntParam({value, defaultValue });
      case 'float':
        return this.getFloatParam({ value, defaultValue });
      case 'boolean':
        return (typeof value === 'boolean') ? value : this.isTrue(String(value).trim());
      default:
        return value;
    }
  }

  static getPluginParam(paramName) {
    return this.params.get(paramName);
  }

  static defaultValueForType(typeName) {
    switch(typeName) {
      case 'int':
        return 0;
      case 'boolean':
        return false;
    }

    return '';
  }

  static parseParam(key, paramMap, dataMap = undefined) {
    let paramData = paramMap[key];
    if (paramData && typeof paramData === 'string') {
      paramData = {
        type: paramData,
        defaultValue: this.defaultValueForType(paramData)
      };
    }

    const { name = key, type = 'string', defaultValue = '' } = paramData;
    let value;
    if (dataMap) {
      value = dataMap.get(name) ?? defaultValue;
    } else {
      const data = this.getPluginParam(name) || {};
      value = data.value ?? defaultValue;
    }
    return this.getParam({
      value,
      defaultValue,
      type
    });
  }

  static parseArrayParam({ value, type }) {
    const data = this.parseArray(value);
    if (!data || !data.length) {
      return data;
    }

    const itemType = type.substr(0, type.length - 2);

    const newData = [];
    for (const value of data) {
      const defaultValue = this.defaultValueForType(itemType);
      newData.push(this.getParam({ value, type: itemType, defaultValue }));
    }

    return newData;
  }

  static getRegexMatch(text, regex, matchIndex) {
    const matches = text.match(regex);
    return matches?.[matchIndex];
  }

  static parseStructParam({ value, defaultValue, type }) {
    let data;
    if (value) {
      try {
        data = JSON.parse(value);
      } catch (e) {
        console.error('Cyclone Engine failed to parse param structure: ', value);
        console.error(e);
      }
    }

    if (!data) {
      data = JSON.parse(defaultValue);
    }

    const structTypeName = this.getRegexMatch(type, /struct<(.*)>/i, 1);
    if (!structTypeName) {
      console.error(`Unknown plugin param type: ${ type }`); //`
      return data;
    }

    const structType = this.structs.get(structTypeName);
    if (!structType) {
      console.error(`Unknown param structure type: ${ structTypeName }`); //`
      return data;
    }

    for (const key in structType) {
      if (!structType.hasOwnProperty(key)) {
        continue;
      }

      let dataType = structType[key];
      if (typeof dataType === 'string') {
        dataType = {
          type: dataType,
          defaultValue: this.defaultValueForType(dataType),
        };
      }

      data[key] = this.getParam({
        value: data[key],
        defaultValue: dataType.defaultValue,
        type: dataType.type,
      });
    }

    return data;
  }

  static parseList(data, mapper) {
    let str = data;
    if (str.startsWith('[')) {
      str = str.substr(1);
    }
    if (str.endsWith(']')) {
      str = str.substr(0, str.length -1);
    }

    const list = str.split(',');

    if (mapper) {
      return list.map(item => mapper(item));
    }

    return list;
  }

  static parseArray(value, mapper) {
    let data;
    try {
      data = JSON.parse(value);
    } catch(e) {
      return [];
    }

    if (!data || !data.length) {
      return [];
    }

    if (mapper) {
      return data.map(item => mapper(item));
    }

    return data;
  }

  static registerCommand(commandName, params, fn) {
    if (typeof params === 'function') {
      return PluginManager.registerCommand(this.getPluginFileName(), commandName, params);
    }

    return PluginManager.registerCommand(this.getPluginFileName(), commandName, (receivedArgs) => {
      const dataMap = new Map();
      for (const key in receivedArgs) {
        if (!receivedArgs.hasOwnProperty(key)) {
          continue;
        }
        dataMap.set(key, receivedArgs[key]);
      }
      const parsedArgs = this.loadParamMap(params, dataMap);
      Object.assign(receivedArgs, parsedArgs);

      return fn(receivedArgs);
    });
  }
}

class CustomEventDataPageCondition {
  get actorId() {
    return this._actorId;
  }
  set actorId(value) {
    this._actorId = value;
  }
  get actorValid() {
    return this._actorValid;
  }
  set actorValid(value) {
    this._actorValid = value;
  }
  get itemId() {
    return this._itemId;
  }
  set itemId(value) {
    this._itemId = value;
  }
  get itemValid() {
    return this._itemValid;
  }
  set itemValid(value) {
    this._itemValid = value;
  }
  get selfSwitchCh() {
    return this._selfSwitchCh;
  }
  set selfSwitchCh(value) {
    this._selfSwitchCh = value;
  }
  get selfSwitchValid() {
    return this._selfSwitchValid;
  }
  set selfSwitchValid(value) {
    this._selfSwitchValid = value;
  }
  get switch1Id() {
    return this._switch1Id;
  }
  set switch1Id(value) {
    this._switch1Id = value;
  }
  get switch1Valid() {
    return this._switch1Valid;
  }
  set switch1Valid(value) {
    this._switch1Valid = value;
  }
  get switch2Id() {
    return this._switch2Id;
  }
  set switch2Id(value) {
    this._switch2Id = value;
  }
  get switch2Valid() {
    return this._switch2Valid;
  }
  set switch2Valid(value) {
    this._switch2Valid = value;
  }
  get variableId() {
    return this._variableId;
  }
  set variableId(value) {
    this._variableId = value;
  }
  get variableValid() {
    return this._variableValid;
  }
  set variableValid(value) {
    this._variableValid = value;
  }
  get variableValue() {
    return this._variableValue;
  }
  set variableValue(value) {
    this._variableValue = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.actorId = 1;
    this.actorValid = false;
    this.itemId = 1;
    this.itemValid = false;
    this.selfSwitchCh = 'A';
    this.selfSwitchValid = false;
    this.switch1Id = 1;
    this.switch1Valid = false;
    this.switch2Id = 1;
    this.switch2Valid = false;
    this.variableId = 1;
    this.variableValid = false;
    this.variableValue = 0;
  }

  clearConditions() {
    this.actorValid = false;
    this.itemValid = false;
    this.selfSwitchValid = false;
    this.switch1Valid = false;
    this.switch2Valid = false;
    this.variableValid = false;
  }

  addActorCondition(actorId) {
    this.actorId = actorId;
    this.actorValid = true;
  }

  addItemCondition(itemId) {
    this.itemId = itemId;
    this.itemValid = true;
  }

  addSelfSwitchCondition(selfSwitchCh) {
    this.selfSwitchCh = selfSwitchCh;
    this.selfSwitchValid = true;
  }

  addSwitch1Condition(switchId) {
    this.switch1Id = switchId;
    this.switch1Valid = true;
  }

  addSwitch2Condition(switchId) {
    this.switch2Id = switchId;
    this.switch2Valid = true;
  }

  addVariableCondition(variableId, value) {
    this.variableId = variableId;
    this.variableValue = value;
    this.variableValid = true;
  }
}

class CustomEventDataPageImage {
  get characterIndex() {
    return this._characterIndex;
  }
  set characterIndex(value) {
    this._characterIndex = value;
  }
  get characterName() {
    return this._characterName;
  }
  set characterName(value) {
    this._characterName = value;
  }
  get direction() {
    return this._direction;
  }
  set direction(value) {
    this._direction = value;
  }
  get pattern() {
    return this._pattern;
  }
  set pattern(value) {
    this._pattern = value;
  }
  get tileId() {
    return this._tileId;
  }
  set tileId(value) {
    this._tileId = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.characterIndex = 0;
    this.characterName = '';
    this.direction = 2;
    this.pattern = 1;
    this.tileId = 0;
  }
}

class CustomEventDataPageMoveRoute {
  get repeat() {
    return this._repeat;
  }
  set repeat(value) {
    this._repeat = value;
  }
  get skippable() {
    return this._skippable;
  }
  set skippable(value) {
    this._skippable = value;
  }
  get wait() {
    return this._wait;
  }
  set wait(value) {
    this._wait = value;
  }
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.repeat = true;
    this.skippable = false;
    this.wait = false;
    this.list = [{
      code: 0,
      parameters: [],
    }];
  }
}

class CustomEventDataPage {

  get conditions() {
    return this._conditions;
  }
  set conditions(value) {
    this._conditions = value;
  }
  get directionFix() {
    return this._directionFix;
  }
  set directionFix(value) {
    this._directionFix = value;
  }
  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }
  get moveFrequency() {
    return this._moveFrequency;
  }
  set moveFrequency(value) {
    this._moveFrequency = value;
  }
  get moveRoute() {
    return this._moveRoute;
  }
  set moveRoute(value) {
    this._moveRoute = value;
  }
  get moveSpeed() {
    return this._moveSpeed;
  }
  set moveSpeed(value) {
    this._moveSpeed = value;
  }
  get moveType() {
    return this._moveType;
  }
  set moveType(value) {
    this._moveType = value;
  }
  get priorityType() {
    return this._priorityType;
  }
  set priorityType(value) {
    this._priorityType = value;
  }
  get stepAnime() {
    return this._stepAnime;
  }
  set stepAnime(value) {
    this._stepAnime = value;
  }
  get through() {
    return this._through;
  }
  set through(value) {
    this._through = value;
  }
  get trigger() {
    return this._trigger;
  }
  set trigger(value) {
    this._trigger = value;
  }
  get walkAnime() {
    return this._walkAnime;
  }
  set walkAnime(value) {
    this._walkAnime = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.conditions = new CustomEventDataPageCondition();
    this.directionFix = false;
    this.image = new CustomEventDataPageImage();
    this.list = [{
      code: 0,
      indent: 0,
      parameters: [],
    }];
    this.moveFrequency = 3;
    this.moveRoute = new CustomEventDataPageMoveRoute();
    this.moveSpeed = 3;
    this.moveType = 0;
    this.priorityType = 1;
    this.stepAnime = true;
    this.through = false;
    this.trigger = 0;
    this.walkAnime = true;

    this._indent = -1;
  }

  addCommand(command) {
    if (command instanceof Array) {
      for (let i = 0; i < command.length; i++) {
        this.addCommand(command[i]);
      }
    } else {
      // When you add a command on the page for the first time, the script will remove the auto-added "end" command. Make sure to add your own or call .end().
      if (this.list.length == 1 && this.list[0].code === 0) {
        this.list = [];
        this._indent = 0;
      }

      command.indent = this._indent;
      this.list.push(command);

      if (command.code === 0) {
        this._indent -= 1;
      }
    }
  }

  increaseIndent() {
    this._indent += 1;
  }

  end() {
    while (this._indent >= 0) {
      this.addCommand({
        code: 0
      });
    }
  }

  callScriptOrCommonEvent(scriptOrCommonEventId) {
    let commandCode = undefined;

    if (scriptOrCommonEventId !== undefined) {
      if (typeof(scriptOrCommonEventId) == 'number') {
        commandCode = 117;
      } else if (typeof(scriptOrCommonEventId) == 'string') {
        commandCode = 355;
      }
    }

    if (commandCode !== undefined) {
      this.addCommand({
        code: commandCode,
        parameters: [scriptOrCommonEventId]
      });
    }
  }

}

class CustomEventData {
  get pages() {
    return this._pages;
  }
  set pages(value) {
    this._pages = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get page() {
    return this.pages[this._pageIndex];
  }

  constructor(id) {
    this.initialize(id);
  }

  initialize(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.name = 'Custom Event';
    this.pages = [new CustomEventDataPage()];
    this._pageIndex = 0;
  }

  addPage(page) {
    this.pages.push(page);
    return this.pages[this.pages.length - 1];
  }

  changePage(pageIndex) {
    this._pageIndex = pageIndex;
    while (this.pages.length < pageIndex) {
      this.pages.push(new CustomEventDataPage());
    }
  }

  addCommand(command) {
    this.page.addCommand(command);
  }

  endPage() {
    this.page.end();
  }

  endAllPages() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].end();
    }
  }
}

function loadFileAsync(filePath, mimeType = 'application/json', onLoad = undefined, onError = undefined) {
  const xhr = new XMLHttpRequest();
  const name = `$${ filePath.replace(/^.*(\\|\/|:)/, '').replace(/\..*/, '') }`;
  xhr.open('GET', filePath);

  if (mimeType && xhr.overrideMimeType) {
    xhr.overrideMimeType(mimeType);
  }

  const loadFn = onLoad ?? function (xhr, filePath, name) {
    if (xhr.status < 400) {
      window[name] = JSON.parse(xhr.responseText);
      DataManager.onLoad(window[name]);
    }
  };

  const errorFn = onError ?? function() {
    DataManager._errorUrl = DataManager._errorUrl ?? filePath;
  };

  xhr.onLoad = function() {
    loadFn.call(this, xhr, filePath, name);
  };

  xhr.onError = errorFn;
  window[name] = null;
  xhr.send();
}

const EventTriggers = {
  ACTION_BUTTON: 0,
  PLAYER_TOUCH: 1,
  EVENT_TOUCH: 2,
  AUTORUN: 3,
  PARALLEL: 4,
};

const EventPriorities = {
  UNDER_PLAYER: 0,
  NORMAL: 1,
  OVER_PLAYER: 2,
};

class CycloneEvents$1 extends CyclonePlugin {
  static register() {
    super.initialize('CycloneEvents');

    super.register({
    });
  }

  static getAnotherMapData(mapId, callback) {
    const variableName = `$Map${ mapId.padZero(3) }`;
    const fileName = `data/Map${ mapId.padZero(3) }.json`;

    const onLoad = (xhr, filePath, name) => {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);

        callback();
      }
    };

    if (window[variableName] === undefined || window[variableName] === null) {
      loadFileAsync(fileName, undefined, onLoad);
    } else {
      callback();
    }
  }

  static createActorAt(actorId, x, y, d, scriptOrCommonEventId, temporary) {
    const actor = $gameActors.actor(actorId);
    if (!actor) {
      return;
    }

    return this.createNormalEventAt(actor.characterName(), actor.characterIndex(), x, y, d, scriptOrCommonEventId, temporary);
  }

  static createNormalEventAt(characterName, characterIndex, x, y, d, scriptOrCommonEventId, temporary) {
    const eventData = new CustomEventData();
    eventData.page.image.direction = d;
    eventData.page.image.characterName = characterName;
    eventData.page.image.characterIndex = characterIndex;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createTriggerEventAt(x, y, scriptOrCommonEventId, temporary) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PLAYER_TOUCH;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createTeleportEventAt(x, y, newMapId, newX, newY, newDirection, fadeType, temporary) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PLAYER_TOUCH;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;

    if (newDirection === undefined) {
      newDirection = $gamePlayer.direction();
    }

    if (fadeType === undefined) {
      fadeType = 0;
    }

    eventData.page.addCommand({
      code: 201,
      parameters: [0, newMapId, newX, newY, newDirection, fadeType],
    });

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createParallelProcess(scriptOrCommonEventId, temporary, autoErase) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PARALLEL;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    if (autoErase === true) {
      eventData.page.addCommand({
        code: 214,
      });
    }

    return $gameMap.addEventAt(eventData, temporary);
  }
}

globalThis.CycloneEvents = CycloneEvents$1;
CycloneEvents$1.register();

class CustomEvent extends Game_Event {
  initialize(mapId, eventId, eventData) {
    this._eventData = eventData;
    super.initialize(mapId, eventId);
  }

  event() {
    return this._eventData;
  }

  revive(data) {
    return new CustomEvent(data.mapId, data.id, data.eventData);
  }
}

CycloneEvents.patchClass(Game_Map, $super => class {
  getIndexForNewEvent() {
    let index = 1;
    while (index < this._events.length && !!this._events[index]) {
      index++;
    }

    return index;
  }

  addEvent(eventData, temporary = false, index = undefined) {
    // If it's a custom event data, make sure to add an end command to all pages.
    if (eventData.endAllPages) {
      eventData.endAllPages();
    }

    if (!index) {
      index = this.getIndexForNewEvent();
    }

    eventData.id = index;
    const gameEvent = new CustomEvent(this._mapId, index, eventData);
    $gameSystem.clearSelfSwitches(this._mapId, index);

    this._events[index] = gameEvent;

    if (SceneManager._scene instanceof Scene_Map) {
      const sprite = new Sprite_Character(gameEvent);
      SceneManager._scene._spriteset._characterSprites.push(sprite);
      SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }

    if (!temporary) {
      $gameSystem.addCustomEvent(this._mapId, eventData);
    }

    return gameEvent;
  }

  setupEvents() {
    $super.setupEvents.call(this);

    const customEvents = $gameSystem.getCustomEvents(this._mapId);
    for (const eventId in customEvents) {
      if (!customEvents[eventId]) {
        continue;
      }

      const newEventId = this.getIndexForNewEvent();
      customEvents[eventId].eventId = newEventId;
      this._events[newEventId] = new CustomEvent(this._mapId, newEventId, customEvents[eventId]);
    }
  }

  addEventAt(eventData, x, y, temporary = false, index = undefined) {
    eventData.x = x;
    eventData.y = y;
    return this.addEvent(eventData, temporary, index);
  }

  spawnEvent(eventData, tileList, temporary = false) {
    for (let i = 0; i < tileList.length; i++) {
      const newEventData = JsonEx.makeDeepCopy(eventData);
      newEventData.x = tileList[i].x;
      newEventData.y = tileList[i].y;
      this.addEvent(newEventData, temporary);
    }
  }

  getEventData(eventIdOrigin) {
    const event = $dataMap.events[eventIdOrigin];
    if (!event) {
      return undefined;
    }

    return JsonEx.makeDeepCopy(event);
  }

  getEventDataFrom(mapIdOrigin, eventIdOrigin, callback) {
    CycloneEvents.getAnotherMapData(mapIdOrigin, () => {
      const variableName = `$Map${ mapIdOrigin.padZero(3) }`;

      if (!window[variableName]) {
        return;
      }

      const event = window[variableName].events[eventIdOrigin];
      if (!event) {
        return;
      }

      const eventData = JsonEx.makeDeepCopy(event);
      if (eventData.note) {
        DataManager.extractMetadata(eventData);
      }
      callback.call(this, eventData);
    });
  }

  copyEvent(eventIdOrigin, x, y, temporary = false, newIndex = undefined) {
    const eventData = this.getEventData(eventIdOrigin);
    if (eventData) {
      $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
    }
  }

  getRegionTileList(regionId) {
    const tileList = [];

    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        if ($gameMap.eventsXy(x, y).length) {
          continue;
        }

        if ($gameMap.regionId(x, y) !== regionId) {
          continue;
        }

        tileList.push({ x, y });
      }
    }

    return tileList;
  }

  getRandomRegionTile(regionId) {
    const tileList = this.getRegionTileList(regionId);

    if (tileList.length) {
      const index = Math.randomInt(tileList.length);
      return tileList[index];
    }
  }

  copyEventToRegion(eventIdOrigin, regionId, temporary = false, newIndex = undefined) {
    const tile = this.getRandomRegionTile(regionId);
    if (tile) {
      this.copyEvent(eventIdOrigin, tile.x, tile.y, temporary, newIndex);
    }
  }

  copyEventFrom(mapIdOrigin, eventIdOrigin, x, y, temporary = false, newIndex = undefined, callback = undefined) {
    this.getEventDataFrom(mapIdOrigin, eventIdOrigin, (eventData) => {
      const event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);

      callback && callback.call(this, event);
    });
  }

  copyEventFromMapToRegion(mapIdOrigin, eventIdOrigin, regionId, temporary = false, newIndex = undefined, callback = undefined) {
    const tile = this.getRandomRegionTile(regionId);
    if (tile) {
      this.copyEventFrom(mapIdOrigin, eventIdOrigin, tile.x, tile.y, temporary, newIndex, callback);
    }
  }

  spawnMapEvent(eventIdOrigin, regionId, temporary) {
    const eventData = this.getEventData(eventIdOrigin);
    const tileList = this.getRegionTileList(regionId);

    if (eventData && tileList) {
      this.spawnEvent(eventData, tileList, temporary);
    }
  }

  spawnMapEventFrom(mapIdOrigin, eventIdOrigin, regionId, temporary) {
    const tileList = this.getRegionTileList(regionId);
    if (tileList.length > 0) {
      this.getEventDataFrom(mapIdOrigin, eventIdOrigin, (eventData) => {
        $gameMap.spawnEvent(eventData, tileList, temporary);
      });
    }
  }

  createActorAt(...args) {
    return CycloneEvents.createActorAt(...args);
  }

  createNormalEventAt(...args) {
    return CycloneEvents.createNormalEventAt(...args);
  }

  createTriggerEventAt(...args) {
    return CycloneEvents.createTriggerEventAt(...args);
  }

  createTeleportEventAt(...args) {
    return CycloneEvents.createTeleportEventAt(...args);
  }

  createParallelProcess(...args) {
    return CycloneEvents.createParallelProcess(...args);
  }
});

CycloneEvents.patchClass(Game_System, $super => class {
  clearSelfSwitches(mapId, eventId) {
    const switches = ['A', 'B', 'C', 'D'];

    for (const switchLetter of switches) {
      const key = [mapId, eventId, switchLetter];
      $gameSelfSwitches.setValue(key, false);
    }
  }

  initCustomEvents(mapId) {
    if (this._customEvents === undefined) {
      this._customEvents = {};
    }

    if (this._customEvents[mapId] === undefined) {
      this._customEvents[mapId] = {};
    }
  }

  addCustomEvent(mapId, event) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, event.id);
    this._customEvents[mapId][event.id] = event;

    return event;
  }

  removeCustomEvent(mapId, eventId) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, eventId);
    delete this._customEvents[mapId][eventId];
  }

  clearCustomEvents(mapId) {
    this.initCustomEvents(mapId);
    this._customEvents[mapId] = {};
  }

  getCustomEvents(mapId) {
    this.initCustomEvents(mapId);
    return this._customEvents[mapId];
  }
});

const failedMovementDelay = 30;

CycloneEvents.patchClass(Game_CharacterBase, $super => class {
  _updateXyDestinationPartialTile() {
    const xDistance = this._x - this._xDestination;
    const yDistance = this._y - this._yDestination;

    // Check if there's any additional partial tile to walk
    if (Math.abs(xDistance) < 1 && Math.abs(yDistance) < 1) {
      if (xDistance < 0) {
        this._direction = 6;
        this._x = this._xDestination;
        return true;
      }

      if (yDistance < 0) {
        this._direction = 2;
        this._y = this._yDestination;
        return true;
      }

      if (xDistance > 0) {
        this._direction = 4;
        this._x = this._xDestination;
        return true;
      }

      if (yDistance > 0) {
        this._y = this._yDestination;
        this._direction = 8;
        return true;
      }
    }

    //Check if there's any partial position to fix before start walking
    if (this._x - Math.floor(this._x) || this._y - Math.floor(this._y)) {
      if (this._xDestination > this._x) {
        this._direction = 6;
        this._x = Math.ceil(this._x);
      } else {
        this._direction = 4;
        this._x = Math.floor(this._x);
      }

      if (this._yDestination > this._y) {
        this._direction = 2;
        this._y = Math.ceil(this._y);
      } else {
        this._direction = 8;
        this._y = Math.floor(this._y);
      }

      return true;
    }
  }

  updateXyDestination() {
    if (this._xDestination == this._x && this._yDestination == this._y) {
      // If the character reached the destination, check if there's a direction to face
      if (this._dDestination !== undefined && this._dDestination !== 0) {
        if (this.isMoving()) {
          return true;
        }
        this._direction = this._dDestination;
      }

      this.clearDestination();
    }

    if (this._xDestination === undefined) {
      return false;
    }

    if (this.isMoving()) {
      return false;
    }

    if (this._updateXyDestinationPartialTile()) {
      return true;
    }

    const direction = this.findDirectionTo(Math.floor(this._xDestination), Math.floor(this._yDestination));

    if (direction > 0) {
      this.moveStraight(direction);
      if (!this.isMovementSucceeded()) {
        this._cycloneMovementDelay = failedMovementDelay;
      }

      return true;
    }
  }

  updateCharacterDestination() {
    if (this._destinationCharacter._x === this._x && this._destinationCharacter._y == this._y) {
      //If the stalker reached the character, check if it needs to keep following it
      if (this._followCharacter !== true) {
        this.clearDestination();
        return false;
      }

      return true;
    }

    if (this.isMoving()) {
      return false;
    }

    const direction = this.findDirectionTo(this._destinationCharacter._x, this._destinationCharacter._y);
    if (direction > 0) {
      this.moveStraight(direction);

      if (!this.isMovementSucceeded()) {
        //If failed to move, and it's not set to follow the character and distance is less than 1 tile, stop moving.
        if (this._followCharacter !== true) {
          const distance = Math.abs(this._x - this._destinationCharacter._x) + Math.abs(this._y - this._destinationCharacter._y);
          if (distance <= 1) {
            this.clearDestination();
            return true;
          }
        }

        this._cycloneMovementDelay = failedMovementDelay;
      }

      return true;
    }
  }

  updateStop() {
    if (this._cycloneMovementDelay !== undefined && this._cycloneMovementDelay > 0) {
      this._cycloneMovementDelay--;
      return;
    }


    if (this._xDestination !== undefined && this._yDestination !== undefined && this.updateXyDestination()) {
      return;
    }


    if (this._destinationCharacter !== undefined && this.updateCharacterDestination()) {
      return;
    }

    $super.updateStop.call(this);
  }

  // Change the advanceMoveRouteIndex  to only advance the index when the character reach the destination.
  advanceMoveRouteIndex() {
    if (this._xDestination === undefined && this._yDestination === undefined && this._destinationCharacter === undefined) {
      $super.advanceMoveRouteIndex.call(this);
    }
  }

  // Clears the destination automatically if a new move route is set
  setMoveRoute(moveRoute) {
    this.clearDestination();
    $super.setMoveRoute.call(this, moveRoute);
  }

  setDestination(x, y, d) {
    if (this._x != x || this._y != y || this.isMoving()) {
      this._xDestination = x;
      this._yDestination = y;

      if (d !== undefined) {
        this._dDestination = d;
      }
    } else if (d !== undefined && d !== 0) {
      this._direction = d;
    }
  }

  setCharacterDestination(character, follow = false) {
    if (typeof(character) == 'number') {
      character = $gameMap._interpreter.character(character);
    }

    if (character === undefined) return;

    if (follow === true) {
      this._destinationCharacter = character;
      this._followCharacter = true;
    } else {
      if (this._x != character._x || this._y != character._y || this.isMoving()) {
        this._destinationCharacter = character;
        this._followCharacter = false;
      }
    }
  }

  clearDestination() {
    this._xDestination = undefined;
    this._yDestination = undefined;
    this._dDestination = undefined;
    this._destinationCharacter = undefined;
    this._followCharacter = false;
  }
});

CycloneEvents.patchClass(Game_Temp, $super => class {
  // Updates Game_Temp.prototype.setDestination to only be executed when the player has no destination set on itself
  setDestination(x, y) {
    if ($gamePlayer._xDestination === undefined && $gamePlayer._destinationCharacter === undefined && $gamePlayer._yDestination === undefined) {
      $super.setDestination.call(this, x, y);
    }
  }
});

CycloneEvents.patchClass(Game_Interpreter, $super => class {
  waitForEventMovement(eventId) {
    this._waitingForEventMovement = eventId;
    if (this._waitingForEventMovement) {
      this._waitMode = 'eventMovement';
    }
  }

  updateWaitMode(...args) {
    if (this._waitMode == 'eventMovement') {
      if (this._waitingForEventMovement) {
        const eventId = this._waitingForEventMovement;
        const event = this.character(eventId);

        if (event) {
          if (event.isMoving() || event.isJumping() || event.isBalloonPlaying()) {
            return true;
          }

          if (event._xDestination !== undefined && event._yDestination !== undefined) {
            return true;
          }
        }
      }

      this._waitMode = '';
    }

    return $super.updateWaitMode.call(this, ...args);
  }
});
})();
