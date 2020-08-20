/*:
 * @target MZ
 * @plugindesc Auxiliary plugin that helps keep all other Cyclone plugins
 * smaller and better tested
 * <pluginName:CycloneCore>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-engine
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
 * Core Engine 1.01.000                                              by Hudell
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
 * The Earth's inner core spins slightly faster than the rest of the planet.
 * ===========================================================================
 *
 * By itself this plugin does nothing and changes nothing on the core code
 * So it's impossible to have any incompatibilities with other plugins
 *
 *
 * List of Cyclone plugins available on
 * https://makerdevs.com/plugin/cyclone-engine
 */
/*~struct~Dictionary:
 * @param name
 * @type str
 * @desc The name of the custom parameter
 *
 * @param value
 * @type str
 * @desc The value of the custom parameter
 */

const trueStrings = Object.freeze(['TRUE', 'ON', '1', 'YES', 'T', 'V' ]);

class CycloneEngine {
  static registerPlugin(pluginClass, pluginName, paramMap = {}) {
    const superClasses = CycloneEngine.getSuperClasses(pluginName);

    const params = CycloneEngine.loadParamMap(pluginName, paramMap);

    CycloneEngine.classes.set(pluginName, {
      pluginName,
      pluginClass,
      superClasses,
      params,
    });

    pluginClass.params = params;
  }

  static loadAllParams() {
    for (const plugin of $plugins) {
      if (!plugin?.status) {
        continue;
      }

      let pluginName;
      if (plugin?.description?.includes('<pluginName:')) {
        pluginName = this.getRegexMatch(plugin.description, /<pluginName:(.*)>/i, 1);
        this.pluginFileNames.set(pluginName, plugin.name);
      }

      if (!pluginName) {
        continue;
      }

      const pluginParams = new Map();

      for (const paramName in plugin.parameters) {
        if (!paramName || paramName.startsWith('-')) {
          continue;
        }

        pluginParams.set(paramName, {
          value: plugin.parameters[paramName],
          pluginName,
        });
      }

      CycloneEngine.parameters.set(pluginName, pluginParams);
    }
  }

  static loadParamMap(pluginName, paramMap) {
    const params = new Map();

    for (const key in paramMap) {
      if (!paramMap.hasOwnProperty(key)) {
        continue;
      }

      try {
        const parsedValue = this.parseParam(key, paramMap, pluginName);
        params.set(key, parsedValue);
      } catch(e) {
        console.error(`CycloneEngineCore crashed while trying to parse a parameter value (${ key }). Please report the following error to Hudell:`);
        console.log(e);
      }
    }

    return params;
  }

  static getSuperClass(baseClassName, pluginName) {
    return this.superClasses.get(pluginName)?.[baseClassName];
  }

  static registerEvent(eventName, callback) {
    if (!CycloneEngine.eventListeners.has(eventName)) {
      CycloneEngine.eventListeners.set(eventName, new Set());
    }

    const listeners = CycloneEngine.eventListeners.get(eventName);
    listeners.add(callback);
  }

  static removeEventListener(eventName, callback) {
    if (!CycloneEngine.eventListeners.has(eventName)) {
      return;
    }

    const listeners = CycloneEngine.eventListeners.get(eventName);
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
    if (!CycloneEngine.eventListeners.has(eventName)) {
      return;
    }

    const listeners = CycloneEngine.eventListeners.get(eventName);
    for (const callback of listeners) {
      if (typeof callback === 'number') {
        CycloneEngine.runCommonEvent(callback);
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
    const commonEvent = $dataCommonEvents[eventId];
    if (!commonEvent) {
      return;
    }

    const interpreter = new Game_Interpreter(1);
    interpreter.setup(commonEvent.list, 0);

    if (!this._interpreters) {
      this._interpreters = new Set();
      // Tap into rpg maker core so we can update our interpreters in sync with the engine
      const oldUpdateMain = SceneManager.updateMain;
      SceneManager.updateMain = function() {
        oldUpdateMain.call(this);
        CycloneEngine.update();
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

  static getPluginFileName(pluginName) {
    return this.pluginFileNames.get(`ThirdParty_${ pluginName }`) ?? pluginName;
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

  static _assignDescriptor(receiver, giver, descriptor, descriptorName) {
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
      receiver[descriptorName] = giver[descriptorName];
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
        this._assignDescriptor($super, baseClassOrPrototype, baseDescriptor, methodName);
      }

      const descriptor = descriptors[methodName];
      this._assignDescriptor(baseClassOrPrototype, patchClassOrPrototype, descriptor, methodName);
    }

    return anyOverride;
  }

  static patchClass(baseClass, patchFn, pluginName) {
    const $super = {};
    const $prototype = {};
    const $dynamicSuper = {};
    const patchClass = patchFn($dynamicSuper, $prototype);

    if (typeof patchClass !== 'function') {
      throw new Error(`Invalid class patch for ${ baseClass.name }`);
    }

    const ignoredStaticNames = Object.getOwnPropertyNames(class {});
    const ignoredNames = Object.getOwnPropertyNames((class {}).prototype);
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

    if (pluginName) {
      const superClasses = this.getSuperClasses(pluginName);
      superClasses[baseClass.name] = $dynamicSuper;
    }
  }

  static getSuperClasses(pluginName) {
    if (!this.superClasses.has(pluginName)) {
      const superClasses = {};
      this.superClasses.set(pluginName, superClasses);
      return superClasses;
    }

    return this.superClasses.get(pluginName);
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

  static getIntParam({ value, defaultValue, pluginName }) {
    try {
      const result = parseInt(value);

      if (isNaN(result)) {
        return defaultValue;
      }

      return result;
    } catch(e) {
      if (value !== '') {
        console.error(`Cyclone Engine plugin ${ pluginName }: Param is expected to be an integer number, but the received value was '${ value }'.`);
      }
      return defaultValue;
    }
  }

  static getFloatParam({ value, defaultValue, pluginName }) {
    try {
      const result = parseFloat(value.replace(',', '.'));

      if (isNaN(result)) {
        return defaultValue;
      }

      return result;
    } catch(e) {
      if (value !== '') {
        console.error(`Cyclone Engine plugin ${ pluginName }: Param is expected to be a number, but the received value was '${ value }'.`);
      }

      return defaultValue;
    }
  }

  static getIntListParam({ value, pluginName }) {
    return this.parseArray((value ?? '').trim(), item => {
      try {
        return parseInt(item.trim());
      } catch(e) {
        if (item !== '') {
          console.error(`Cyclone Engine plugin ${ pluginName }: Param is expected to be a list of integer numbers, but one of the items was '${ item }'.`);
        }
        return 0;
      }
    });
  }

  static parseStructArrayParam({ data, pluginName, type }) {
    const newData = [];
    for (const json of data) {
      const itemData = this.parseStructParam({ value: json, defaultValue: '', pluginName, type });
      if (itemData) {
        newData.push(itemData);
      }
    }

    return newData;
  }

  static getFloatListParam({ value, pluginName }) {
    return this.parseArray((value || '').trim(), item => {
      try {
        return parseFloat(item.trim());
      } catch(e) {
        if (item !== '') {
          console.error(`Cyclone Engine plugin ${ pluginName }: Param ${ name } is expected to be a list of numbers, but one of the items was '${ item }'.`);
        }
        return 0;
      }
    });
  }

  static getParam({ value, defaultValue, pluginName, type }) {
    if (type.endsWith('[]')) {
      return this.parseArrayParam({ value, defaultValue, pluginName, type });
    }

    if (type.startsWith('struct<')) {
      return this.parseStructParam({ value, defaultValue, pluginName, type });
    }

    if (value === undefined) {
      return defaultValue;
    }

    switch(type) {
      case 'int':
        return this.getIntParam({value, pluginName, defaultValue });
      case 'float':
        return this.getFloatParam({ value, pluginName, defaultValue });
      case 'boolean':
        return (typeof value === 'boolean') ? value : this.isTrue(String(value).trim());
      default:
        return value;
    }
  }

  static getPluginParam(pluginName, paramName) {
    const pluginParams = this.parameters.get(pluginName);
    if (!pluginParams) {
      return;
    }

    return pluginParams.get(paramName);
  }

  static parseParam(key, paramMap, pluginName) {
    const { name = key, type = 'string', defaultValue = '' } = paramMap[key];
    const { value = defaultValue } = this.getPluginParam(pluginName, name) || {};

    return this.getParam({
      value,
      defaultValue,
      pluginName,
      type
    });
  }

  static parseArrayParam({ value, pluginName, type }) {
    const data = this.parseArray(value);
    if (!data || !data.length) {
      return data;
    }

    const itemType = type.substr(0, type.length - 2);

    const newData = [];
    for (const value of data) {
      newData.push(this.getParam({ value, pluginName, type: itemType }));
    }

    return newData;
  }

  static getRegexMatch(text, regex, matchIndex) {
    const matches = text.match(regex);
    return matches?.[matchIndex];
  }

  static parseStructParam({ value, defaultValue, pluginName, type }) {
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
      console.error(`Unknown plugin param type: ${ type }`);
      return data;
    }

    const structType = CycloneEngine.structs.get(structTypeName);
    if (!structType) {
      console.error(`Unknown param structure type: ${ structTypeName }`);
      return data;
    }

    for (const key in structType) {
      if (!structType.hasOwnProperty(key)) {
        continue;
      }

      const dataType = structType[key];
      data[key] = this.getParam({
        value: data[key],
        defaultValue: dataType.defaultValue,
        pluginName,
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

  static buildMetadata(notes) {
    const rgx = /<([^<>:]+)(:?)([^>]*)>/g;
    const matches = notes.matchAll(rgx);
    const values = new Map();

    for (const match of matches) {
      if (match.length > 3 && match[2] === ':') {
        values.set(match[1], match[3]);
      } else {
        values.set(match[1], true);
      }
    }

    return values;
  }

  static defaultIfNaN(value, defaultValue) {
    if (isNaN(Number(value))) {
      return defaultValue;
    }

    return value;
  }
}

class CyclonePlugin { // eslint-disable-line no-unused-vars
  static register(pluginName, paramMap = {}) {
    if (!pluginName) {
      throw new Error('Invalid Cyclone Plugin.');
    }

    this.pluginName = pluginName;
    CycloneEngine.registerPlugin(this, pluginName, paramMap);
  }

  static _addProperty(classObj, propName, { getter: getterFn, setter: setterFn, lazy = false })  {
    if (lazy) {
      // Creates a property that replaces itself with the value the first time it's called.
      return Object.defineProperty(classObj, propName, {
        get: function() { // eslint-disable-line object-shorthand
          delete this[propName];
          const value = getterFn.call(this);
          Object.defineProperty(this, propName, { value });
          return value;
        },
        set: setterFn === true ? (function(value) {this[`_${ propName }`] = value; }) : undefined,
        configurable: true,
      });
    }

    return Object.defineProperty(classObj, propName, {
      get: getterFn ?? (function() { return this[`_${ propName }`]; }),
      set: setterFn === false ? undefined : (typeof setterFn === 'function' ? setterFn : (function(value) {this[`_${ propName }`] = value; })),
      configurable: false,
    });
  }

  static registerEvent(eventName, callback) {
    CycloneEngine.registerEvent(`${ this.pluginName }:${ eventName }`, callback);
  }

  static runEvent(eventName) {
    CycloneEngine.runEvent(`${ this.pluginName }:${ eventName }`);
  }

  static getFileName() {
    return CycloneEngine.pluginFileNames.get(this.pluginName) ?? this.pluginName;
  }

  static patchClass(baseClass, patchFn) {
    return CycloneEngine.patchClass(baseClass, patchFn, this.pluginName);
  }

  static registerCommand(commandName, fn) {
    const fileName = this.getFileName();
    return PluginManager.registerCommand(fileName, commandName, fn);
  }
}


CycloneEngine.superClasses = new Map();
CycloneEngine.classes = new Map();
CycloneEngine.parameters = new Map();
CycloneEngine.structs = new Map();
CycloneEngine.eventListeners = new Map();
CycloneEngine.pluginFileNames = new Map();



CycloneEngine.loadAllParams();
CycloneEngine.structs.set('Dictionary', {
  name: {
    type: 'string',
    defaultValue: '',
  },
  value: {
    type: 'string',
    defaultValue: '',
  },
});
