//=============================================================================
// Cyclone Engine - Aurora
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Basic lighting plugin
 *
 * <pluginName:CycloneAurora>
 * @author Hudell
 * @url 
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
 * Aurora                                                            by Hudell
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
 *
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

//Copied from http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
const colors = {
  'aliceblue': '#f0f8ff',
  'antiquewhite': '#faebd7',
  'aqua': '#00ffff',
  'aquamarine': '#7fffd4',
  'azure': '#f0ffff',
  'beige': '#f5f5dc',
  'bisque': '#ffe4c4',
  'black': '#000000',
  'blanchedalmond': '#ffebcd',
  'blue': '#0000ff',
  'blueviolet': '#8a2be2',
  'brown': '#a52a2a',
  'burlywood': '#deb887',
  'cadetblue': '#5f9ea0',
  'chartreuse': '#7fff00',
  'chocolate': '#d2691e',
  'coral': '#ff7f50',
  'cornflowerblue': '#6495ed',
  'cornsilk': '#fff8dc',
  'crimson': '#dc143c',
  'cyan': '#00ffff',
  'darkblue': '#00008b',
  'darkcyan': '#008b8b',
  'darkgoldenrod': '#b8860b',
  'darkgray': '#a9a9a9',
  'darkgreen': '#006400',
  'darkkhaki': '#bdb76b',
  'darkmagenta': '#8b008b',
  'darkolivegreen': '#556b2f',
  'darkorange': '#ff8c00',
  'darkorchid': '#9932cc',
  'darkred': '#8b0000',
  'darksalmon': '#e9967a',
  'darkseagreen': '#8fbc8f',
  'darkslateblue': '#483d8b',
  'darkslategray': '#2f4f4f',
  'darkturquoise': '#00ced1',
  'darkviolet': '#9400d3',
  'deeppink': '#ff1493',
  'deepskyblue': '#00bfff',
  'dimgray': '#696969',
  'dodgerblue': '#1e90ff',
  'firebrick': '#b22222',
  'floralwhite': '#fffaf0',
  'forestgreen': '#228b22',
  'fuchsia': '#ff00ff',
  'gainsboro': '#dcdcdc',
  'ghostwhite': '#f8f8ff',
  'gold': '#ffd700',
  'goldenrod': '#daa520',
  'gray': '#808080',
  'green': '#008000',
  'greenyellow': '#adff2f',
  'honeydew': '#f0fff0',
  'hotpink': '#ff69b4',
  'indianred ': '#cd5c5c',
  'indigo': '#4b0082',
  'ivory': '#fffff0',
  'khaki': '#f0e68c',
  'lavender': '#e6e6fa',
  'lavenderblush': '#fff0f5',
  'lawngreen': '#7cfc00',
  'lemonchiffon': '#fffacd',
  'lightblue': '#add8e6',
  'lightcoral': '#f08080',
  'lightcyan': '#e0ffff',
  'lightgoldenrodyellow': '#fafad2',
  'lightgrey': '#d3d3d3',
  'lightgreen': '#90ee90',
  'lightpink': '#ffb6c1',
  'lightsalmon': '#ffa07a',
  'lightseagreen': '#20b2aa',
  'lightskyblue': '#87cefa',
  'lightslategray': '#778899',
  'lightsteelblue': '#b0c4de',
  'lightyellow': '#ffffe0',
  'lime': '#00ff00',
  'limegreen': '#32cd32',
  'linen': '#faf0e6',
  'magenta': '#ff00ff',
  'maroon': '#800000',
  'mediumaquamarine': '#66cdaa',
  'mediumblue': '#0000cd',
  'mediumorchid': '#ba55d3',
  'mediumpurple': '#9370d8',
  'mediumseagreen': '#3cb371',
  'mediumslateblue': '#7b68ee',
  'mediumspringgreen': '#00fa9a',
  'mediumturquoise': '#48d1cc',
  'mediumvioletred': '#c71585',
  'midnightblue': '#191970',
  'mintcream': '#f5fffa',
  'mistyrose': '#ffe4e1',
  'moccasin': '#ffe4b5',
  'navajowhite': '#ffdead',
  'navy': '#000080',
  'oldlace': '#fdf5e6',
  'olive': '#808000',
  'olivedrab': '#6b8e23',
  'orange': '#ffa500',
  'orangered': '#ff4500',
  'orchid': '#da70d6',
  'palegoldenrod': '#eee8aa',
  'palegreen': '#98fb98',
  'paleturquoise': '#afeeee',
  'palevioletred': '#d87093',
  'papayawhip': '#ffefd5',
  'peachpuff': '#ffdab9',
  'peru': '#cd853f',
  'pink': '#ffc0cb',
  'plum': '#dda0dd',
  'powderblue': '#b0e0e6',
  'purple': '#800080',
  'red': '#ff0000',
  'rosybrown': '#bc8f8f',
  'royalblue': '#4169e1',
  'saddlebrown': '#8b4513',
  'salmon': '#fa8072',
  'sandybrown': '#f4a460',
  'seagreen': '#2e8b57',
  'seashell': '#fff5ee',
  'sienna': '#a0522d',
  'silver': '#c0c0c0',
  'skyblue': '#87ceeb',
  'slateblue': '#6a5acd',
  'slategray': '#708090',
  'snow': '#fffafa',
  'springgreen': '#00ff7f',
  'steelblue': '#4682b4',
  'tan': '#d2b48c',
  'teal': '#008080',
  'thistle': '#d8bfd8',
  'tomato': '#ff6347',
  'turquoise': '#40e0d0',
  'violet': '#ee82ee',
  'wheat': '#f5deb3',
  'white': '#ffffff',
  'whitesmoke': '#f5f5f5',
  'yellow': '#ffff00',
  'yellowgreen': '#9acd32'
};

class PlayerLight {
  static get enabled() {
    return this._enabled;
  }

  static set enabled(value) {
    this._enabled = value;
  }

  static get radius() {
    return 60;
  }

  static get color() {
    return '#FFFFFF';
  }

  static get flicker() {
    return false;
  }

  static get flickerFrequency() {
    const min = 3;
    const rng = Math.floor((Math.random() * 8) + 1);

    return min + rng;
  }

  static get flashlightSwitch() {
    return 0;
  }

  static shouldShowFlashlight() {
    return this.flashlightSwitch > 0 && $gameSwitches.value(this.flashlightSwitch);
  }

  static getPlayerPosition() {
    return CycloneAurora.getCharacterPosition($gamePlayer);
  }

  static refresh(lightmask) {
    if (!this.enabled) {
      return;
    }

    this._showingFlashlight = this.shouldShowFlashlight();
    this.flickeringDelay = this.flickerFrequency;

    const canvas = lightmask._maskBitmap.canvas;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';

    const [x, y, direction] = this.getPlayerPosition();

    if (this._showingFlashlight) {
      lightmask._maskBitmap.makeFlashlightEffect(x, y, 0, this.radius, this.color, 'black', direction);
    } else if (this.radius < 100) {
      lightmask._maskBitmap.radialgradientFillRect(x, y, 0, this.radius, '#999999', 'black', this.flicker && !this.flickeringDelay);
    } else {
      lightmask._maskBitmap.radialgradientFillRect(x, y, 20, this.radius, this.color, 'black', this.flicker && !this.flickeringDelay);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  static update() {
    if (!this.enabled) {
      return;
    }

    if (this.shouldShowFlashlight() !== this._showingFlashlight) {
      CycloneAurora.dirty = true;
      return;
    }

    if (this.flicker && !this.shouldShowFlashlight()) {
      if (this.flickeringDelay > 0) {
        this.flickeringDelay--;
      } else {
        CycloneAurora.dirty = true;
        return;
      }
    }
  }

  static register() {
    CycloneAurora.registerEvent('afterRefreshMask', (...args) => {
      this.refresh(...args);
    });
    CycloneAurora.registerEvent('updateMask', (...args) => {
      this.update(...args);
    });

    this.enabled = true;
    this.flickeringDelay = this.flickerFrequency;
  }
}

class EventLight {
  static get enabled() {
    return this._enabled;
  }

  static set enabled(value) {
    this._enabled = value;
  }

  static get radius() {
    return 60;
  }

  static get color() {
    return '#FFFFFF';
  }

  static get flicker() {
    return false;
  }

  static shouldShowFlashlight() {
    return false;
  }

  static getEventPosition(event) {
    return CycloneAurora.getCharacterPosition(event);
  }

  static refresh(lightmask) {
    if (!this.enabled) {
      return;
    }

    const events = $gameMap._events.filter(event => event && event.aurora);
    if (!events.length) {
      return;
    }

    const canvas = lightmask._maskBitmap.canvas;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';

    for (const event of events) {
      if (!event) {
        continue;
      }

      const [x, y, direction] = this.getEventPosition(event);

      const radius = event.aurora.radius ?? this.radius;
      const color = event.aurora.color ?? this.color;
      const flicker = event.aurora.flicker ?? this.flicker;
      const flashlight = event.aurora.flashlight ?? false;

      if (flashlight) {
        lightmask._maskBitmap.makeFlashlightEffect(x, y, 0, radius, color, 'black', direction);
      } else if (radius < 100) {
        lightmask._maskBitmap.radialgradientFillRect(x, y, 0, radius, '#999999', 'black', flicker && Math.randomInt(10) === 3);
      } else {
        lightmask._maskBitmap.radialgradientFillRect(x, y, 20, radius, color, 'black', flicker && Math.randomInt(10) === 3);
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  static update() {
    if (!this.enabled) {
      return;
    }
  }

  static register() {
    CycloneAurora.registerEvent('afterRefreshMask', (...args) => {
      this.refresh(...args);
    });
    // CycloneAurora.registerEvent('updateMask', (...args) => {
    //   this.update(...args);
    // });

    this.enabled = true;
  }
}

function pluginIsActive(pluginName) {
  for (const plugin of globalThis.$plugins) {
    if (!plugin?.status) {
      continue;
    }
    if (!plugin?.description?.includes(`<pluginName:${ pluginName }`)) { //`
      continue;
    }

    return true;
  }

  return false;
}

const hourColors = [
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#111111',
  '#111111',
  '#666666',
  '#AAAAAA',
  '#EEEEEE',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#EEEEEE',
  '#AAAAAA',
  '#776666',
  '#441111',
  '#000000',
  '#000000',
  '#000000',
];

const insideColors = [
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
  '#EEEEEE',
];

class TimeSystemLight {
  static get enabled() {
    return this._enabled;
  }

  static set enabled(value) {
    this._enabled = value;
  }

  static get hourColors() {
    return hourColors;
  }

  static get insideBuildingHoursColor() {
    return insideColors;
  }

  static getCurrentColor(lightmask) {
    if (!window.CycloneTime) {
      return;
    }

    const { hour } = CycloneTime;
    // #ToDo: add support to different colors when inside buildings

    return hourColors[hour % hourColors.length];
  }

  static register() {
    CycloneAurora.registerEvent('calculateMaskColor', (...args) => {
      return this.getCurrentColor(...args);
    });

    this.enabled = pluginIsActive('CycloneTime');
  }
}

/* eslint-disable camelcase */

class CycloneAurora$1 extends CyclonePlugin {
  static register() {
    super.initialize('CycloneAurora');

    super.register({});
    this.enabled = true;

    PlayerLight.register();
    EventLight.register();
    TimeSystemLight.register();
  }

  static get defaultMaskColor() {
    return 'black';
  }
  static get opacityVariable() {
    return 0;
  }
  static get lightMaskSwitch() {
    return 0;
  }
  static get tintSpeed() {
    return 0.3;
  }
  static get defaultBackOpacity() {
    return 160;
  }

  static get enabled() {
    return this._enabled;
  }
  static set enabled(value) {
    this._enabled = value;
  }

  static get dirty() {
    return this._dirty;
  }
  static set dirty(value) {
    this._dirty = value;
  }

  static get lastMaskColor() {
    return this._lastMaskColor;
  }
  static set lastMaskColor(value) {
    this._lastMaskColor = value;
  }
  static get currentRGB() {
    return this._currentRGB;
  }
  static set currentRGB(value) {
    this._currentRGB = value;
  }
  static get lastOpacity() {
    return this._lastOpacity;
  }
  static set lastOpacity(value) {
    this._lastOpacity = value;
  }
  static get showing() {
    return this._showing;
  }
  static set showing(value) {
    this._showing = value;
  }

  static clear() {
    this._currentRGB = undefined;
    this._lastMaskColor = undefined;
    this._lastOpacity = undefined;
  }

  static shouldShowLightMask() {
    return this.lightMaskSwitch === 0 || $gameSwitches.value(this.lightMaskSwitch);
  }

  static isActive() {
    return this.enabled;
  }

  static colorNameToHex(color) {
    if (color.charAt('0') == '#') {
      return color;
    }

    const colorName = color.toLowerCase();

    if (typeof colors[colorName] !== 'undefined') {
      return colors[colorName];
    }

    return false;
  }

  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red : parseInt(result[1], 16),
      green : parseInt(result[2], 16),
      blue : parseInt(result[3], 16)
    } : null;
  }

  static getCharacterPosition(character) {
    const pw = $gameMap.tileWidth();
    const ph = $gameMap.tileHeight();
    const dx = $gameMap.displayX();
    const dy = $gameMap.displayY();
    const px = character._realX;
    const py = character._realY;
    const pd = character._direction;

    const x1 = (pw / 2) + ((px - dx) * pw);
    const y1 = (ph / 2) + ((py - dy) * ph);

    return [x1, y1, pd];
  }
}

globalThis.CycloneAurora = CycloneAurora$1;
CycloneAurora$1.register();

class MaskBitmap extends Bitmap {
  radialgradientFillRect(x, y, startRadius, endRadius, color1, color2, flicker) {
    const context = this._context;

    if (flicker) {
      let gradRnd = Math.floor((Math.random() * 7) + 1);
      let colorRnd = Math.floor((Math.random() * 10) - 5);
      let red = CycloneAurora.hexToRgb(color1).red;
      let green = CycloneAurora.hexToRgb(color1).green;
      let blue = CycloneAurora.hexToRgb(color1).blue;

      green = (green + colorRnd).clamp(0, 255);
      color1 = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
      endRadius -= gradRnd;
    }

    const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);
    context.restore();
  }

  makeFlashlightEffect(x, y, startRadius, endRadius, color1, color2, direction) {
    const context = this._context;

    context.save();

    const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
    grad.addColorStop(0, '#999999');
    grad.addColorStop(1, color2);

    context.fillStyle = grad;
    context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);

    for (let cone = 0; cone < 8; cone++) {
      startRadius = cone * 2;
      endRadius = cone * 12;

      switch (direction) {
        case 6:
          x += cone * 6;
          break;
        case 4:
          x -= cone * 6;
          break;
        case 2:
          y += cone * 6;
          break;
        case 8:
          y -= cone * 6;
          break;
      }

      const grad = context.createRadialGradient(x, y, startRadius, x, y, endRadius);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);

      context.fillStyle = grad;
      context.fillRect(x - endRadius, y - endRadius, endRadius * 2, endRadius * 2);
    }

    context.restore();
  }
}

class Lightmask extends PIXI.Container {
  constructor(...args) {
    super(...args);
    this.initialize();
  }

  initialize() {
    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];
    this.createMaskBitmap();
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get sprites() {
    return this._sprites;
  }
  get currentMapId() {
    return this._currentMapId;
  }
  set currentMapId(value) {
    this._currentMapId = value;
  }
  get currentDisplayX() {
    return this._currentDisplayX;
  }
  set currentDisplayX(value) {
    this._currentDisplayX = value;
  }
  get currentDisplayY() {
    return this._currentDisplayY;
  }
  set currentDisplayY(value) {
    this._currentDisplayY = value;
  }

  update() {
    this.updateMask();
  }

  createMaskBitmap() {
    this._maskBitmap = new MaskBitmap(Graphics.width, Graphics.height);
  }

  maskColor() {
    return CycloneAurora.runEvent('calculateMaskColor', {
      returnOnValue: true,
    }, this) ?? CycloneAurora.defaultMaskColor;
  }

  walkColor(newRGB, currentRGB, colorName, tintSpeed) {
    if (newRGB[colorName] < currentRGB[colorName]) {
      currentRGB[colorName] = currentRGB[colorName] - tintSpeed;
      if (newRGB[colorName] > currentRGB[colorName]) {
        currentRGB[colorName] = newRGB[colorName];
      }
    } else if(newRGB[colorName] > currentRGB[colorName]) {
      currentRGB[colorName] = currentRGB[colorName] + tintSpeed;
      if (newRGB[colorName] < currentRGB[colorName]) {
        currentRGB[colorName] = newRGB[colorName];
      }
    }

    newRGB[colorName] = newRGB[colorName].clamp(0, 255);
  }

  refreshMaskColor() {
    const destinationColor = this.maskColor();
    let newColor = destinationColor;

    if (CycloneAurora.lastMaskColor !== undefined && destinationColor !== CycloneAurora.lastMaskColor) {
      let currentColor = CycloneAurora.lastMaskColor;
      let currentRGB = CycloneAurora.currentRGB;

      if (!!currentRGB || currentColor.charAt(0) == '#') {
        newColor = CycloneAurora.colorNameToHex(destinationColor);
        if (newColor === false) {
          newColor = destinationColor;
        }

        if (currentRGB === undefined) {
          currentRGB = CycloneAurora.hexToRgb(currentColor);
        }
        const newRGB = CycloneAurora.hexToRgb(newColor);

        this.walkColor(newRGB, currentRGB, 'red', CycloneAurora.tintSpeed);
        this.walkColor(newRGB, currentRGB, 'green', CycloneAurora.tintSpeed);
        this.walkColor(newRGB, currentRGB, 'blue', CycloneAurora.tintSpeed);

        newColor = '#' + ((1 << 24) + (Math.floor(currentRGB.red) << 16) + (Math.floor(currentRGB.green) << 8) + Math.floor(currentRGB.blue)).toString(16).slice(1);
        CycloneAurora.currentRGB = currentRGB;
      }
    } else {
      CycloneAurora.currentRGB = undefined;
    }

    CycloneAurora.lastMaskColor = newColor;
  }


  refreshMask() {
    CycloneAurora.runEvent('beforeRefreshMask', {}, this);

    this.popAllSprites();

    if (CycloneAurora.isActive()) {
      CycloneAurora.showing = CycloneAurora.shouldShowLightMask();

      if (CycloneAurora.showing) {
        CycloneAurora.runEvent('refreshMask', {}, this);

        let backOpacity = CycloneAurora.defaultBackOpacity;
        if (CycloneAurora.opacityVariable > 0) {
          backOpacity = $gameVariables.value(CycloneAurora.opacityVariable).clamp(0, 255);
        }

        //calculates what will be the new mask color
        this.refreshMaskColor();
        CycloneAurora.runEvent('refreshMaskColor', {}, this);

        CycloneAurora.lastOpacity = backOpacity;

        // Adds the mask sprite
        this.addSprite(0, 0, this._maskBitmap, backOpacity);
        this._maskBitmap.fillRect(0, 0, Graphics.width, Graphics.height, CycloneAurora.lastMaskColor);

        CycloneAurora.runEvent('afterRefreshMask', {}, this);
      }
    }
  }

  updateMask() {
    if (!CycloneAurora.isActive()){
      if (this._sprites.length > 0) {
        CycloneAurora.dirty = true;
      }
      return;
    }

    let newId = 0;
    let newDisplayX = 0;
    let newDisplayY = 0;

    if ($gameMap !== undefined && $gameMap !== null) {
      newId = $gameMap._mapId;
      newDisplayX = $gameMap._displayX;
      newDisplayY = $gameMap._displayY;
    }

    if (newId !== this.currentMapId || newDisplayY !== this.currentDisplayY || newDisplayX !== this.currentDisplayX) {
      CycloneAurora.dirty = true;
    }

    if (CycloneAurora.shouldShowLightMask() !== CycloneAurora.showing) {
      CycloneAurora.dirty = true;
    }

    if (CycloneAurora.lastMaskColor !== this.maskColor()) {
      CycloneAurora.dirty = true;
    }

    // if (CycloneAurora.opacityVariable > 0) {
    //   var backOpacity = $gameVariables.value(CycloneAurora.opacityVariable).clamp(0, 255);
    //   if (backOpacity !== CycloneAurora.lastOpacity) {
    //     CycloneAurora.dirty = true;
    //   }
    // }

    CycloneAurora.runEvent('updateMask', {}, this);

    if (CycloneAurora.dirty) {
      this.refreshMask();
      CycloneAurora.dirty = false;
      this.currentMapId = newId;
      this.currentDisplayX = newDisplayX;
      this.currentDisplayY = newDisplayY;
    }
  }

  addSprite(x, y, bitmap, opacity, blendMode, rotation, anchorX, anchorY) {
    if (opacity === undefined) opacity = 255;
    if (blendMode === undefined) blendMode = 2;
    if (rotation === undefined) rotation = 0;
    if (anchorX === undefined) anchorX = 0;
    if (anchorY === undefined) anchorY = 0;

    const sprite = new Sprite(this.viewport);
    sprite.bitmap = bitmap;
    sprite.opacity = opacity;
    sprite.blendMode = blendMode;
    sprite.x = x;
    sprite.y = y;

    this._sprites.push(sprite);
    this.addChild(sprite);

    sprite.rotation = rotation;
    sprite.ax = anchorX;
    sprite.ay = anchorY;
    sprite.opacity = opacity;

    return sprite;
  }

  popSprite() {
    const sprite = this._sprites.pop();

    if (sprite) {
      this.removeChild(sprite);
    }

    return sprite;
  }

  popAllSprites() {
    let sprite;
    while (this._sprites.length > 0) {
      sprite = this._sprites.pop();

      if (sprite) {
        this.removeChild(sprite);
      }
    }
  }

}

CycloneAurora.patchClass(Spriteset_Map, $super => class {
  createWeather() {
    this.createLightmask();
    $super.createWeather.call(this);
  }

  createLightmask() {
    this._lightmask = new Lightmask();
    this.addChild(this._lightmask);
  }
});

CycloneAurora.patchClass(Game_Event, $super => class {
  enableLight(flashlight, radius, color, flicker) {
    this.aurora = {
      flashlight: flashlight ?? false,
      radius: radius ?? EventLight.radius,
      color: color ?? EventLight.color,
      flicker: flicker ?? EventLight.flicker,
    };

    CycloneAurora.dirty = true;
  }

  disableLight() {
    if (this.aurora) {
      CycloneAurora.dirty = true;
    }

    delete this.aurora;
  }

  enableFlashlight() {
    this.enableLight(true);
  }

  disableFlashlight() {
    this.enableLight(false);
  }

  update(...args) {
    const { _x, _y, _direction } = this;
    $super.update.call(this, ...args);

    if (!this.aurora) {
      return;
    }

    if (this.isMoving() || _x !== this._x || _y !== this._y || _direction !== this._direction) {
      CycloneAurora.dirty = true;
    }
  }

  // $.checkNoteTags = function(){
  //   if (!this.event().meta) return;

  //   var orangeLight = {
  //     flashlight : false,
  //     flicker : eventLight.Param.eventFlicker,
  //     radius : eventLight.Param.eventRadius,
  //     color : eventLight.Param.eventColor
  //   };

  //   var add = false;

  //   if (this.event().meta.light_radius !== undefined) {
  //     add = true;
  //     orangeLight.radius = this.event().meta.light_radius;
  //   }

  //   if (this.event().meta.light_color !== undefined) {
  //     add = true;
  //     orangeLight.color = this.event().meta.light_color;
  //   }

  //   if (this.event().meta.light_flickle !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flickle;
  //   }

  //   if (this.event().meta.light_flickler !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flickler;
  //   }

  //   if (this.event().meta.light_flicker !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flicker;
  //   }

  //   if (this.event().meta.light) {
  //     add = true;
  //   }

  //   if (this.event().meta.flashlight) {
  //     add = true;
  //     orangeLight.flashlight = true;
  //   }

  //   if (add) {
  //     this.orangeLight = orangeLight;
  //   } else {
  //     this.orangeLight = undefined;
  //   }
  // };


  initialize(...args) {
    $super.initialize.call(this, ...args);
    // this.checkNoteTags();
  }
});

CycloneAurora.patchClass(Game_Interpreter, $super => class {
  enableEventLight(eventId, flashlight, radius, color, flicker) {
    if (eventId <= 0) {
      return;
    }

    const eventData = $gameMap.event(eventId);
    if (eventData) {
      eventData.enableLight(flashlight, radius, color, flicker);
    }
  }

  disableEventLight(eventId) {
    if (eventId <= 0) {
      return;
    }

    const eventData = $gameMap.event(eventId);
    if (eventData) {
      eventData.disableLight();
    }
  }

  enableEventFlashlight(eventId) {
    this.enableEventLight(eventId, true);
  }

  disableEventFlashlight(eventId) {
    this.enableEventLight(eventId, false);
  }

  enableLight(...args) {
    this.enableEventLight(this._eventId, ...args);
  }

  disableLight() {
    this.disableEventLight(this._eventId);
  }

  enableFlashlight() {
    this.enableEventLight(this._eventId, true);
  }

  disableFlashlight() {
    this.enableEventLight(this._eventId, false);
  }
});

CycloneAurora.patchClass(Game_Player, $super => class {
  update(...args) {
    const { _x, _y, _direction } = this;

    $super.update.call(this, ...args);

    if (this.isMoving() || _direction !== this._direction || _x !== this._x || _y !== this._y) {
      CycloneAurora.dirty = true;
    }
  }
});
})();
