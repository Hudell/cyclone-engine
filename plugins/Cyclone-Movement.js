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
 **/
(function () {
'use strict';

const trueStrings = Object.freeze(['TRUE', 'ON', '1', 'YES', 'T', 'V' ]);

class CyclonePlugin {
  static initialize(pluginName) {
    this.pluginName = pluginName;
    this.fileName = undefined;
    this.superClasses = new Map();
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
    const $super = this.superClasses[baseClass.name] || {};
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

    this.superClasses[baseClass.name] = $dynamicSuper;
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

  static getValueMaybeVariable(rawValue) {
    const value = rawValue.trim();

    if (value.startsWith('$')) {
      const variableId = parseInt(value.slice(1));
      if (isNaN(variableId)) {
        throw new Error(`Invalid Variable ID: ${ variableId }`); //`
      }

      if (variableId === 0) {
        return 0;
      }

      return $gameVariables.value(variableId);
    }

    return value;
  }

  static debounce(fn, delay) {
    let clearTimer;
    return function(...args) {
      const context = this;
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => fn.call(context, ...args), delay);
    };
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
        set: setterFn === true ? (function(value) {this[`_${ propName }`] = value; }) : undefined, //`
        configurable: true,
      });
    }

    return Object.defineProperty(classObj, propName, {
      get: getterFn ?? (function() { return this[`_${ propName }`]; }), //`
      set: setterFn === false ? undefined : (typeof setterFn === 'function' ? setterFn : (function(value) {this[`_${ propName }`] = value; })), //`
      configurable: false,
    });
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

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n;}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return "";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256;}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o));}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return "";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else {if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u);}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++);}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++;}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return ""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return "";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else {if(l!==d)return null;v=s+s.charAt(0);}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++);}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

let currentMapCollisionTable = false;
const checkedTiles = new Set();

class CycloneMovement$1 extends CyclonePlugin {
  static register() {
    super.initialize('CycloneMovement');

    super.register({
      stepCount: {
        type: 'int',
        defaultValue: 8,
      },
      followerStepsBehind: {
        type: 'int',
        defaultValue: 6,
      },
      triggerAllEvents: 'boolean',
      triggerTouchEventAfterTeleport: 'boolean',
      blockRepeatedTouchEvents: {
        type: 'booelan',
        defaultValue: true,
      },
      ignoreEmptyEvents: {
        type: 'boolean',
        defaultValue: true,
      },
      autoLeaveVehicles: 'boolean',
    });

    this.stepCount = [1, 2, 4, 8].includes(this.params.stepCount) ? this.params.stepCount : 8;
    this.collisionStepCount = Math.min(4, this.stepCount);
    this.stepSize = 1 / this.stepCount;
    this.collisionSize = 1 / this.collisionStepCount;
    this.followerStepsBehind = Number(this.params.followerStepsBehind || 1).clamp(1, this.stepCount);
    this.triggerAllEvents = this.params.triggerAllEvents === true;
    this.autoLeaveVehicles = this.params.autoLeaveVehicles === true;
    this.triggerTouchEventAfterTeleport = this.params.triggerTouchEventAfterTeleport === true;
    this.blockRepeatedTouchEvents = this.params.blockRepeatedTouchEvents !== false;
    this.ignoreEmptyEvents = this.params.ignoreEmptyEvents !== false;
  }

  static get currentMapCollisionTable() {
    return currentMapCollisionTable;
  }

  static isRoundNumber(n) {
    return Math.floor(n) === n;
  }

  static goesLeft(d) {
    return d && d % 3 === 1;
  }

  static goesRight(d) {
    return d && d % 3 === 0;
  }

  static goesUp(d) {
    return d >= 7 && d <= 9;
  }

  static goesDown(d) {
    return d >= 1 && d <= 3;
  }

  static xWithDirection(x, d, stepSize = undefined) {
    stepSize = stepSize ?? this.stepSize;

    if (this.goesLeft(d)) {
      return x - stepSize;
    }

    if (this.goesRight(d)) {
      return x + stepSize;
    }

    return x;
  }

  static yWithDirection(y, d, stepSize = undefined) {
    stepSize = stepSize ?? this.stepSize;

    if (this.goesDown(d)) {
      return y + stepSize;
    }

    if (this.goesUp(d)) {
      return y - stepSize;
    }

    return y;
  }

  static roundXWithDirection(x, d, stepSize = undefined) {
    return $gameMap.roundX(this.xWithDirection(x, d, stepSize));
  }

  static roundYWithDirection(y, d, stepSize = undefined) {
    return $gameMap.roundY(this.yWithDirection(y, d, stepSize));
  }

  static parseCollisionData(note) {
    let json;
    try {
      json = LZString.decompress(note);
    } catch(e) {
      console.error('Failed to decompress data from CycloneMapEditor event.');
      console.log(note);
      console.log(e);
      return;
    }

    let data;
    try {
      data = JSON.parse(json);

    } catch(e) {
      console.error('Failed to parse data from CycloneMapEditor event.');
      console.log(json);
      console.log(e);
      return;
    }

    return data;
  }

  static setupCollision() {
    if (!$gameMap._loaded) {
      return;
    }

    const stepCount = Math.min(this.stepCount, 4);
    currentMapCollisionTable = new Array($dataMap.width * $dataMap.height * stepCount * stepCount);
    this.loadDefaultCollisionTable();
    this.loadCustomCollision();
  }

  static loadDefaultCollisionTable() {
    const { width, height } = $dataMap;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const downPassable = $gameMap.isPassable(x, y, 2);
        const leftPassable = $gameMap.isPassable(x, y, 4);
        const rightPassable = $gameMap.isPassable(x, y, 6);
        const upPassable = $gameMap.isPassable(x, y, 8);

        this.applyTileCollision(x, y, downPassable, leftPassable, rightPassable, upPassable);
      }
    }
  }


  static applyFullTileCollision(x, y, collision) {
    for (let subX = x; subX < x + 1; subX += 0.25) {
      for (let subY = y; subY < y + 1; subY += 0.25) {
        const index = this.collisionIndex(subX, subY);
        currentMapCollisionTable[index] = collision;
      }
    }
  }

  static applyTileDirectionCollision(x, y, direction, collision) {
    if (direction === 2 || direction === 8) {
      const subY = y + (direction === 2 ? 0.75 : 0);
      for (let subX = x; subX < x + 1; subX += 0.25) {
        const index = this.collisionIndex(subX, subY);
        currentMapCollisionTable[index] = collision;
      }
      return;
    }

    const subX = x + (direction === 6 ? 0.75 : 0);
    for (let subY = y; subY < y + 1; subY += 0.25) {
      const index = this.collisionIndex(subX, subY);
      currentMapCollisionTable[index] = collision;
    }
  }

  static collisionIndex(x, y, useEditorStepCount = false) {
    const stepCount = useEditorStepCount ? 4 : Math.min(CycloneMovement$1.stepCount, 4);

    const intX = Math.floor(x * stepCount);
    const intY = Math.floor(y * stepCount);
    const height = $gameMap.height() * stepCount;
    const width = $gameMap.width() * stepCount;
    return (intY % height) * width + (intX % width);
  }

  static setupCustomCollision(compressedData) {
    const data = CycloneMovement$1.parseCollisionData(compressedData);
    if (!data || !data.collision) {
      return;
    }

    const stepCount = Math.min(CycloneMovement$1.stepCount, 4);
    const increment = 1 / stepCount;

    for (let x = 0; x < $dataMap.width; x += increment) {
      for (let y = 0; y < $dataMap.height; y += increment) {
        const index = this.collisionIndex(x, y);
        const editorIndex = this.collisionIndex(x, y, true);

        const customCollision = Number(data.collision[editorIndex] || 0);
        if (customCollision > 0) {
          currentMapCollisionTable[index] = customCollision;
        }
      }
    }
  }

  static loadCustomCollision() {
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      this.setupCustomCollision(event.note);
      return;
    }
  }

  static isPositionPassable(x, y, d) {
    const index = this.collisionIndex(x, y);

    const collision = currentMapCollisionTable[index];
    if (!collision || collision === 1) {
      return true;
    }

    return false;
  }


  static applyTileCollision(x, y, down, left, right, up) {
    if (down === left && down === right && down === up) {
      this.applyFullTileCollision(x, y, down ? 1 : 2);
      return;
    }

    this.applyFullTileCollision(x, y, 1);

    if (!down) {
      this.applyTileDirectionCollision(x, y, 2, 2);
    }

    if (!left) {
      this.applyTileDirectionCollision(x, y, 4, 2);
    }

    if (!right) {
      this.applyTileDirectionCollision(x, y, 6, 2);
    }

    if (!up) {
      this.applyTileDirectionCollision(x, y, 8, 2);
    }
  }

  static tileIdx(x, y) {
    const width = $dataMap.width;
    return y * width + x || 0;
  }

  static markTileAsChecked(x, y) {
    const idx = this.tileIdx(x, y);
    checkedTiles.add(idx);
  }

  static isTileChecked(x, y) {
    const idx = this.tileIdx(x, y);
    return checkedTiles.has(idx);
  }

  static clearCheckedTiles() {
    checkedTiles.clear();
  }

  static markEventAsChecked(event) {
    if (this.blockRepeatedTouchEvents && event.isTriggerIn([1, 2])) {
      this.markTileAsChecked(event.x, event.y);
    }
  }
}

globalThis.CycloneMovement = CycloneMovement$1;
CycloneMovement$1.register();

CycloneMovement.patchClass(Game_Map, $super => class {
  isValid(x, y) {
    return x >= 0 && y >= 0 && Math.floor(x) < this.width() && Math.floor(y) < this.height();
  }

  setup(mapId) {
    $super.setup.call(this, mapId);
    this._loaded = true;
    CycloneMovement.setupCollision();
  }

  isTileClear(x, y) {
    if (!this.checkPassage(x, y, 2)) {
      return false;
    }

    if (!this.checkPassage(x, y, 4)) {
      return false;
    }

    if (!this.checkPassage(x, y, 6)) {
      return false;
    }

    if (!this.checkPassage(x, y, 8)) {
      return false;
    }

    return true;
  }
});

const addPixelMovementToClass = (classRef) => {
  CycloneMovement.patchClass(classRef, $super => class {
    get width() {
      return 0.75;
    }
    get height() {
      return 0.375;
    }

    get hitboxX() {
      return 0.125;
    }

    get hitboxY() {
      return 0.5;
    }

    get left() {
      return this._x + this.hitboxX;
    }
    get right() {
      return this._x + this.hitboxX + this.width;
    }
    get top() {
      return this._y + this.hitboxY;
    }
    get bottom() {
      return this._y + this.hitboxY + this.height;
    }

    get firstY() {
      return this.firstYAt(this._y);
    }
    get lastY() {
      return this.lastYAt(this._y);
    }

    get firstX() {
      return this.firstXAt(this._x);
    }
    get lastX() {
      return this.lastXAt(this._x);
    }

    firstXAt(x) {
      return Math.floor(x + this.hitboxX);
    }
    lastXAt(x) {
      const right = x + this.hitboxX + this.width;
      if (CycloneMovement.isRoundNumber(right)) {
        return right - 1;
      }

      return Math.floor(right);
    }
    firstYAt(y) {
      return Math.floor(y + this.hitboxY);
    }
    lastYAt(y) {
      const bottom = y + this.hitboxY + this.height;
      if (CycloneMovement.isRoundNumber(bottom)) {
        return bottom - 1;
      }

      return Math.floor(bottom);
    }

    firstCollisionXAt(x) {
      const count = CycloneMovement.collisionStepCount;
      return Math.floor((x + this.hitboxX) * count) / count;
    }

    lastCollisionXAt(x) {
      const count = CycloneMovement.collisionStepCount;
      const right = (x + this.hitboxX + this.width) * count;
      if (CycloneMovement.isRoundNumber(right)) {
        return (right - 1) / count;
      }

      return Math.floor(right) / count;
    }

    firstCollisionYAt(y) {
      const count = CycloneMovement.collisionStepCount;
      return Math.floor((y + this.hitboxY) * count) / count;
    }

    lastCollisionYAt(y) {
      const count = CycloneMovement.collisionStepCount;
      const bottom = (y + this.hitboxY + this.height) * count;
      if (CycloneMovement.isRoundNumber(bottom)) {
        return (bottom - 1) / count;
      }

      return Math.floor(bottom) / count;
    }

    shouldSkipExtraPassabilityTests() {
      return false;
    }

    shouldPassThrough() {
      if (this.isThrough() || this.isDebugThrough()) {
        return true;
      }

      return false;
    }

    canPass(x, y, d) {
      const x2 = CycloneMovement.roundXWithDirection(x, d);
      const y2 = CycloneMovement.roundYWithDirection(y, d);

      if (!$gameMap.isValid(x2, y2)) {
        return false;
      }

      if (this.shouldPassThrough()) {
        return true;
      }

      if (!this.isMapPassable(x, y, d)) {
        return false;
      }

      if (this.shouldSkipExtraPassabilityTests()) {
        return true;
      }

      if (!this.isMapPassable(x2, y2, this.reverseDir(d))) {
        return false;
      }

      if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
      }

      return true;
    }

    canPassDiagonally(x, y, horz, vert) {
      if (!this.canPass(x, y, vert)) {
        return false;
      }
      if (!this.canPass(x, y, horz)) {
        return false;
      }

      const y2 = CycloneMovement.roundYWithDirection(y, vert);
      if (!this.canPass(x, y2, horz)) {
        return false;
      }

      const x2 = CycloneMovement.roundXWithDirection(x, horz);
      if (!this.canPass(x2, y, vert)) {
        return false;
      }

      return true;
    }

    isMapPassable(x, y, d) {
      if (CycloneMovement.goesUp(d)) {
        if (!this.canGoUp(x, y)) {
          return false;
        }
      } else if (CycloneMovement.goesDown(d)) {
        if (!this.canGoDown(x, y)) {
          return false;
        }
      }

      if (CycloneMovement.goesLeft(d)) {
        if (!this.canGoLeft(x, y)) {
          return false;
        }
      } else if (CycloneMovement.goesRight(d)) {
        if (!this.canGoRight(x, y)) {
          return false;
        }
      }

      return true;
    }

    canGoLeft(x, y) {
      const left = x + this.hitboxX;
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);
      const destinationLeft = left - CycloneMovement.stepSize;

      // Run the collision check for every Y tile the character is touching
      for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
        if (this.checkLeftPassage(left, newY, destinationLeft) === false) {
          return false;
        }
      }

      return true;
    }

    isPositionPassable(x, y, d) {
      return CycloneMovement.isPositionPassable(x, y, d);
    }

    checkLeftPassage(left, y, destinationLeft) {
      const count = CycloneMovement.collisionStepCount;
      const leftFloor = Math.floor(left * count) / count;
      const destinationLeftFloor = Math.floor(destinationLeft * count) / count;

      // if we're entering a new left tile
      if (destinationLeftFloor < leftFloor) {
        // check if the current left-most tile allows moving left
        if (!this.isPositionPassable(leftFloor, y, 4)) {
          return false;
        }

        // and check if the new left-most tile allows moving right
        if (!this.isPositionPassable(destinationLeftFloor, y, 6)) {
          return false;
        }
      }

      return null;
    }

    canGoRight(x, y) {
      const right = x + this.hitboxX + this.width;
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);
      const destinationRight = right + CycloneMovement.stepSize;

      for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
        if (this.checkRightPassage(right, newY, destinationRight) === false) {
          return false;
        }
      }

      return true;
    }

    checkRightPassage(right, y, destinationRight) {
      const lastXDestination = this.lastCollisionXAt((destinationRight - this.width - this.hitboxX));
      const lastX = this.lastCollisionXAt((right - this.width - this.hitboxX));

      // if we're entering a new right tile
      if (lastXDestination > lastX) {
        // check if the current right-most tile allows moving right
        if (!this.isPositionPassable(lastX, y, 6)) {
          return false;
        }

        // and check if the new right-most tile allows moving left
        if (!this.isPositionPassable(lastXDestination, y, 4)) {
          return false;
        }
      }

      return null;
    }

    canGoUp(x, y) {
      const top = y + this.hitboxY;
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const destinationTop = (top - CycloneMovement.stepSize);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        if (this.checkUpPassage(newX, top, destinationTop) === false) {
          return false;
        }
      }

      return true;
    }

    checkUpPassage(x, top, destinationTop) {
      const count = CycloneMovement.collisionStepCount;
      const topFloor = Math.floor(top * count) / count;
      const destinationTopFloor = Math.floor(destinationTop * count) / count;

      // if we're entering a new top tile
      if (destinationTopFloor < topFloor) {
        // check if the current top tile allows moving up
        if (!this.isPositionPassable(x, topFloor, 8)) {
          return false;
        }

        // and check if the new top tile allows moving down
        if (!this.isPositionPassable(x, destinationTopFloor, 2)) {
          return false;
        }
      }

      return null;
    }

    canGoDown(x, y) {
      const bottom = y + this.hitboxY + this.height;
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const destinationBottom = (bottom + CycloneMovement.stepSize);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        if (this.checkDownPassage(newX, bottom, destinationBottom) === false) {
          return false;
        }
      }

      return true;
    }

    checkDownPassage(x, bottom, destinationBottom) {
      const lastYDestination = this.lastCollisionYAt((destinationBottom - this.height - this.hitboxY));
      const lastY = this.lastCollisionYAt((bottom - this.height - this.hitboxY));

      // if we're entering a new bottom tile
      if (lastYDestination > lastY) {
        // check if the current bottom tile allows moving down
        if (!this.isPositionPassable(x, lastY, 2)) {
          return false;
        }

        // and check if the new bottom tile allows moving up
        if (!this.isPositionPassable(x, lastYDestination, 8)) {
          return false;
        }
      }

      return null;
    }

    addNewPosition(x, y) {
      if (this instanceof Game_Vehicle) {
        return;
      }

      if (CycloneMovement.followerStepsBehind <= 1) {
        return;
      }

      if (!this._positionHistory) {
        this._positionHistory = [];
      }

      this._positionHistory.push({x, y});

      if (this._positionHistory.length > CycloneMovement.followerStepsBehind + 1) {
        this._positionHistory.shift();
      }
    }

    getPositionToFollow() {
      if (!this._positionHistory) {
        this._positionHistory = [];
        if (CycloneMovement.followerStepsBehind > 1) {
          return false;
        }
      }

      if (!$gamePlayer.areFollowersGathering()) {
        if (this._positionHistory.length < CycloneMovement.followerStepsBehind - 1) {
          return false;
        }
      }

      if (this._positionHistory.length === 0) {
        return {
          x : this._x,
          y : this._y,
        };
      }

      return this._positionHistory.shift();
    }

    locate(...args) {
      this._positionHistory = [];
      $super.locate.call(this, ...args);
    }

    _moveStraight(d) {
      this.setMovementSuccess(this.canPass(this._x, this._y, d));
      if (this.isMovementSucceeded()) {
        this.setDirection(d);

        const { stepCount } = CycloneMovement;

        this._x = Math.round(CycloneMovement.roundXWithDirection(this._x, d) * stepCount) / stepCount;
        this._y = Math.round(CycloneMovement.roundYWithDirection(this._y, d) * stepCount) / stepCount;
        this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(d));
        this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(d));

        this.updateAnimationCount();
        this.addNewPosition(this._x, this._y);
        this.increaseSteps();
      } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
      }
    }

    _moveDiagonally(horz, vert) {
      this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));

      if (this.isMovementSucceeded()) {
        this._x = CycloneMovement.roundXWithDirection(this._x, horz);
        this._y = CycloneMovement.roundYWithDirection(this._y, vert);
        this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(vert));

        this.updateAnimationCount();
        this.addNewPosition(this._x, this._y);
        this.increaseSteps();
      }

      if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
      }
      if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
      }
    }

    moveStraight(d) {
      return this._moveStraight(d);
    }

    moveDiagonally(horz, vert) {
      return this._moveDiagonally(horz, vert);
    }

    isTouchingPos(x, y) {
      if (!(x >= this.firstX && x <= this.lastX)) {
        return false;
      }

      if (!(y >= this.firstY && y <= this.lastY)) {
        return false;
      }

      return true;
    }

    isTouchingRect(left, top, right, bottom) {
      return this.wouldTouchRectAt(left, top, right, bottom, this._x, this._y);
    }

    isTouchingCharacter(character) {
      return this.wouldTouchCharacterAt(character, this._x, this._y);
    }

    wouldTouchRectAt(left, top, right, bottom, x, y) {
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);

      if (right < firstX) {
        return false;
      }

      if (left >= lastX) {
        return false;
      }

      if (bottom < firstY) {
        return false;
      }

      if (top >= lastY) {
        return false;
      }

      return true;
    }

    wouldTouchCharacterAt(character, x, y) {
      const {
        left = character.x,
        right = character.x + 1,
        top = character.y,
        bottom = character.y + 1,
      } = character;

      return this.wouldTouchRectAt(left, top, right, bottom, x, y);
    }

    pos(x, y) {
      if (this._x === x && this._y === y) {
        return true;
      }

      return this.isTouchingPos(x, y);
    }

    iterateTiles(callback) {
      return this.runForAllTiles(this._x, this._y, callback);
    }

    runForAllTiles(x, y, callback) {
      const firstX = Math.floor(this.firstCollisionXAt(x));
      const lastX = Math.floor(this.lastCollisionXAt(x));
      const firstY = Math.floor(this.firstCollisionYAt(y));
      const lastY = Math.floor(this.lastCollisionYAt(y));

      for (let newX = firstX; newX <= lastX; newX++) {
        for (let newY = firstY; newY <= lastY; newY++) {
          if (callback.call(this, newX, newY) === true) {
            return true;
          }
        }
      }

      return false;
    }

    iteratePositions(callback) {
      return this.runForAllPositions(this._x, this._y, callback);
    }

    runForAllPositions(x, y, callback) {
      const firstX = this.firstCollisionXAt(x);
      const lastX = this.lastCollisionXAt(x);
      const firstY = this.firstCollisionYAt(y);
      const lastY = this.lastCollisionYAt(y);

      for (let newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
        for (let newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
          if (callback.call(this, newX, newY) === true) {
            return true;
          }
        }
      }

      return false;
    }

    isCollidedWithEvents(x, y) {
      return this.runForAllTiles(x, y, function(blockX, blockY) {
        //If the player is "inside" it, then this event won't be considered,
        //because if it did, the player would be locked on it
        //this shouldn't be possible on normal conditions.

        if (this.isTouchingPos(blockX, blockY)) {
          return false;
        }

        return $gameMap.eventsXyNt(blockX, blockY).some(event  => event.isNormalPriority());
      });
    }

    isOnBush() {
      let bushCount = 0;
      let nonBushCount = 0;

      this.iteratePositions((x, y) => {
        if ($gameMap.isBush(Math.floor(x), Math.floor(y))) {
          bushCount++;
        } else {
          nonBushCount++;
        }
      });

      return bushCount > nonBushCount;
    }

    isOnLadder() {
      let ladderCount = 0;
      let nonLadderCount = 0;

      this.iteratePositions((x, y) => {
        if ($gameMap.isLadder(Math.floor(x), Math.floor(y))) {
          ladderCount++;
        } else {
          nonLadderCount++;
        }
      });

      return ladderCount > nonLadderCount;
    }

    isCollidedWithVehicles() {
      return false;
    }

    chasePosition(x, y) {
      const sx = this.deltaXFrom(x);
      const sy = this.deltaYFrom(y);

      const sxAbs = Math.abs(sx);
      const syAbs = Math.abs(sy);
      const { stepSize } = CycloneMovement;

      if (sxAbs >= stepSize && syAbs >= stepSize) {
        this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
      } else if (sxAbs >= stepSize) {
        this.moveStraight(sx > 0 ? 4 : 6);
      } else if (syAbs >= stepSize) {
        this.moveStraight(sy > 0 ? 8 : 2);
      }

      this.setMoveSpeed($gamePlayer.realMoveSpeed());
    }
  });
};

addPixelMovementToClass(Game_Player);
addPixelMovementToClass(Game_Follower);
// addPixelMovementToClass(Game_Vehicle);

let tryToLeaveVehicleDelay = 0;

CycloneMovement.patchClass(Game_Player, $super => class {
  get defaultWidth() {
    return 0.75;
  }
  get defaultHeight() {
    return 0.375;
  }
  get defaultHitboxX() {
    return 0.125;
  }
  get defaultHitboxY() {
    return 0.5;
  }

  get width() {
    if (this.isInVehicle()) {
      return 1;
    }

    return this.defaultWidth;
  }
  get height() {
    if (this.isInVehicle()) {
      return 1;
    }

    return this.defaultHeight;
  }

  get hitboxX() {
    if (this.isInVehicle()) {
      return 0;
    }

    return this.defaultHitboxX;
  }

  get hitboxY() {
    if (this.isInVehicle()) {
      return 0;
    }

    return this.defaultHitboxY;
  }

  // eslint-disable-next-line complexity
  moveByInput() {
    if (this.isMoving() || !this.canMove()) {
      return;
    }

    let direction = Input.dir4;
    let diagonalDirection = Input.dir8;
    let alternativeD = direction;

    if (direction > 0) {
      $gameTemp.clearDestination();
    // } else if ($gameTemp.isDestinationValid()) {
      // direction = this.determineDirectionToDestination();
      // diagonalDirection = direction;
    }

    alternativeD = this.getAlternativeDirection(direction, diagonalDirection);

    // this.clearCheckedTiles();

    if (direction === 0) {
      return;
    }

    if (this.canPass(this._x, this._y, direction) || (direction !== alternativeD && this.canPass(this._x, this._y, alternativeD))) {
      this.onBeforeMove();

      const oldDirection = this._direction;
      this.executeMove(diagonalDirection);
      if (this.isMovementSucceeded()) {
        return;
      }

      this.executeMove(direction);
      if (!this.isMovementSucceeded()) {
        this.executeMove(alternativeD);

        // If none of the directions was clear and we were already facing one of them before, then revert back to it
        if (!this.isMovementSucceeded()) {
          if (oldDirection === direction || oldDirection === alternativeD) {
            this._direction = oldDirection;
          }
        }
      }

      return;
    }

    if (this.tryOtherMovementOptions(direction)) {
      return;
    }

    if (this._direction !== direction) {
      this.setDirection(direction);
      this.checkEventTriggerTouchFront();
    }
  }

  onBeforeMove() {
    tryToLeaveVehicleDelay = 20;
  }

  tryOtherMovementOptions(direction) {
    if (this.tryToLeaveVehicle(direction)) {
      return true;
    }

    if (this.tryToAvoidDiagonally(direction)) {
      return true;
    }

    if (this.tryToAvoid(direction, 0.75)) {
      return true;
    }

    return false;
  }

  tryToLeaveVehicle(direction) {
    if (!CycloneMovement.autoLeaveVehicles) {
      return false;
    }

    if (tryToLeaveVehicleDelay > 0) {
      tryToLeaveVehicleDelay--;
      return false;
    }

    if (!this.isInBoat() && !this.isInShip()) {
      return false;
    }

    return this.getOffVehicle(direction);
  }

  tryToAvoid(direction, maxOffset) {
    if (direction === 4 || direction === 6) {
      if (this.tryToAvoidVertically(direction, maxOffset)) {
        return true;
      }
    }

    if (direction === 2 || direction === 8) {
      if (this.tryToAvoidHorizontally(direction, maxOffset)) {
        return true;
      }
    }

    return false;

  }

  tryToAvoidDirection(xOffset, yOffset, movementDirection, faceDirection) {
    if (this.canPass(this._x + xOffset, this._y + yOffset, faceDirection)) {
      this.executeMove(movementDirection);
      this.setDirection(faceDirection);
      return true;
    }

    return false;
  }

  tryToAvoidDiagonally(direction) {
    if (direction === 4 || direction === 6) {
      if (this.canPassDiagonally(this._x, this._y, direction, 2)) {
        this.executeMove(direction - 3);
        return true;
      }

      if (this.canPassDiagonally(this._x, this._y, direction, 8)) {
        this.executeMove(direction + 3);
        return true;
      }

      return false;
    }

    if (direction === 2 || direction === 8) {
      if (this.canPassDiagonally(this._x, this._y, 4, direction)) {
        this.executeMove(direction - 1);
        return true;
      }

      if (this.canPassDiagonally(this._x, this._y, 6, direction)) {
        this.executeMove(direction + 1);
        return true;
      }

      return false;
    }

    return false;
  }

  tryToAvoidVertically(direction, maxOffset) {
    let previousOffset = 0;
    let offset = CycloneMovement.stepSize;

    let downEnabled = true;
    let upEnabled = true;

    while (offset <= maxOffset) {
      if (downEnabled) {
        if (!this.canPass(this._x, this._y + previousOffset, 2)) {
          downEnabled = false;
        }
      }

      if (upEnabled) {
        if (!this.canPass(this._x, this._y - previousOffset, 8)) {
          upEnabled = false;
        }
      }

      if (downEnabled && this.tryToAvoidDirection(0, offset, 2, direction)) {
        return true;
      }

      if (upEnabled && this.tryToAvoidDirection(0, -offset, 8, direction)) {
        return true;
      }

      previousOffset = offset;
      offset += CycloneMovement.stepSize;
    }
  }

  tryToAvoidHorizontally(direction, maxOffset) {
    let previousOffset = 0;
    let offset = CycloneMovement.stepSize;
    let leftEnabled = true;
    let rightEnabled = true;

    while (offset <= maxOffset) {
      if (leftEnabled) {
        if (!this.canPass(this._x - previousOffset, 4)) {
          leftEnabled = false;
        }
      }

      if (rightEnabled) {
        if (!this.canPass(this._x + previousOffset, 6)) {
          rightEnabled = false;
        }
      }

      if (rightEnabled && this.tryToAvoidDirection(offset, 0, 6, direction)) {
        return true;
      }

      if (leftEnabled && this.tryToAvoidDirection(-offset, 0, 4, direction)) {
        return true;
      }

      previousOffset = offset;
      offset += CycloneMovement.stepSize;
    }

    return false;
  }

  executeMove(direction) {
    switch (direction) {
      case 8:
      case 2:
      case 4:
      case 6:
        this.moveStraight(direction);
        break;

      case 7:
        this.moveDiagonally(4, 8);
        break;
      case 9:
        this.moveDiagonally(6, 8);
        break;
      case 1:
        this.moveDiagonally(4, 2);
        break;
      case 3:
        this.moveDiagonally(6, 2);
        break;
    }
  }

  getAlternativeDirection(direction, diagonalDirection) {
    if (direction === diagonalDirection) {
      return direction;
    }

    switch (diagonalDirection) {
      case 7:
        return direction == 8 ? 4 : 8;
      case 9:
        return direction == 8 ? 6 : 8;
      case 1:
        return direction == 2 ? 4 : 2;
      case 3:
        return direction == 2 ? 6 : 2;
    }

    return direction;
  }

  moveStraight(d) {
    if (this.isMovementSucceeded()) {
      this._followers.updateMove();
    }

    this._moveStraight(d);
  }

  moveDiagonally(horz, vert) {
    if (this.isMovementSucceeded()) {
      this._followers.updateMove();
    }

    this._moveDiagonally(horz, vert);
  }

  checkEventTriggerThere(triggers) {
    if (!this.canStartLocalEvents()) {
      return;
    }

    const direction = this.direction();
    const x1 = this.left;
    const y1 = this.top;

    const x2 = CycloneMovement.roundXWithDirection(x1, direction);
    const y2 = CycloneMovement.roundYWithDirection(y1, direction);

    this.startMapEvent(x2, y2, triggers, true);

    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
      const x3 = $gameMap.roundXWithDirection(x2, direction);
      const y3 = $gameMap.roundYWithDirection(y2, direction);

      this.startMapEvent(x3, y3, triggers, true);
    }
  }

  shouldTriggerEvent(event, triggers, normal) {
    if (!event) {
      return false;
    }

    if (!event.isTriggerIn(triggers)) {
      return false;
    }

    if (event.isNormalPriority() !== normal) {
      return false;
    }

    if (!event.hasAnythingToRun()) {
      return false;
    }

    return true;
  }

  startMapTileEvent(tileX, tileY, triggers, normal) {
    if (!CycloneMovement.triggerAllEvents && $gameMap.isEventRunning()) {
      return;
    }

    if (!CycloneMovement.blockRepeatedTouchEvents) {
      return $super.startMapEvent.call(this, tileX, tileY, triggers, normal);
    }

    if (CycloneMovement.isTileChecked(tileX, tileY)) {
      return;
    }

    let anyStarted = false;

    for (const event of $gameMap.eventsXy(tileX, tileY)) {
      if (!this.shouldTriggerEvent(event, triggers, normal)) {
        continue;
      }

      CycloneMovement.markEventAsChecked(event);

      event.start();
      anyStarted = true;

      if (!CycloneMovement.triggerAllEvents) {
        return true;
      }
    }

    return anyStarted;
  }

  startMapEvent(x, y, triggers, normal) {
    if ($gameMap.isEventRunning()) {
      return;
    }

    const left = x;
    const right = x + this.width;
    const top = y;
    const bottom = y + this.height;

    const firstX = Math.floor(left);
    const lastX = CycloneMovement.isRoundNumber(right) ? right - 1 : Math.floor(right);
    const firstY = Math.floor(top);
    const lastY = CycloneMovement.isRoundNumber(bottom) ? bottom -1 : Math.floor(bottom);

    for (let newX = firstX; newX <= lastX; newX++) {
      for (let newY = firstY; newY <= lastY; newY++) {
        if (this.startMapTileEvent(newX, newY, triggers, normal) === true) {
          return true;
        }
      }
    }

    return false;
  }

  updateNonmoving(wasMoving, sceneActive) {
    $super.updateNonmoving.call(this, wasMoving, sceneActive);

    if (wasMoving || Input.dir4 !== 0) {
      if (!$gameMap.isEventRunning()) {
        this.checkEventTriggerThere([1, 2]);
        $gameMap.setupStartingEvent();
      }
    }
  }

  _isSamePos(x1, y1, destX, destY) {
    if (Math.floor(x1) !== destX && Math.ceil(x1) !== destX) {
      return false;
    }

    if (Math.floor(y1) !== destY && Math.ceil(y1) !== destY) {
      return false;
    }

    return true;
  }

  triggerTouchAction() {
    if (!$gameTemp.isDestinationValid()) {
      return false;
    }

    const direction = this.direction();
    const x1 = this.x;
    const y1 = this.y;
    const destX = $gameTemp.destinationX();
    const destY = $gameTemp.destinationY();

    if (this._isSamePos(x1, y1, destX, destY)) {
      return this.triggerTouchActionD1(x1, y1);
    }

    const x2 = CycloneMovement.roundXWithDirection(x1, direction);
    const y2 = CycloneMovement.roundYWithDirection(y1, direction);

    if (this._isSamePos(x2, y2, destX, destY)) {
      return this.triggerTouchActionD2(x2, y2);
    }

    const x3 = CycloneMovement.roundXWithDirection(x2, direction);
    const y3 = CycloneMovement.roundYWithDirection(y2, direction);

    if (this._isSamePos(x3, y3, destX, destY)) {
      return this.triggerTouchActionD3(x3, y3);
    }

    return false;
  }

  isTouchingAirship() {
    const airship = $gameMap.airship();
    if (!airship) {
      return false;
    }

    return this.isTouchingCharacter(airship);
  }

  isFacingVehicle(vehicle) {
    if (!vehicle) {
      return false;
    }

    let { x, y } = this;
    switch (this._direction) {
      case 2:
        y++;
        break;
      case 4:
        x--;
        break;
      case 6:
        x++;
        break;
      case 8:
        y--;
        break;
    }

    return this.wouldTouchCharacterAt(vehicle, x, y);
  }

  getOnVehicle() {
    if (this.isTouchingAirship()) {
      this._vehicleType = 'airship';
    } else if (this.isFacingVehicle($gameMap.ship())) {
      this._vehicleType = 'ship';
    } else if (this.isFacingVehicle($gameMap.boat())) {
      this._vehicleType = 'boat';
    }

    if (this.isInVehicle()) {
      this._vehicleGettingOn = true;

      if (!this.isInAirship()) {
        const vehicle = this.vehicle();
        if (vehicle) {
          this._x = vehicle._x;
          this._y = vehicle._y;

          this.updateAnimationCount();
        }
      }

      this.gatherFollowers();
    }
    return this._vehicleGettingOn;
  }

  checkDistanceToLand(direction, targetX, targetY) {
    switch (direction) {
      case 2:
        if (Math.abs(targetY - this.bottom) > 0.5) {
          return false;
        }
        break;
      case 4:
        if (Math.abs(targetX - this.left) > 1) {
          return false;
        }
        break;
      case 6:
        if (Math.abs(targetX - this.right) > 0.5) {
          return false;
        }
        break;
      case 8:
        if (Math.abs(targetY - this.top) > 1) {
          return false;
        }
        break;
    }

    return true;
  }

  getBestLandingPosition(vehicle, direction) {
    let x;
    let y;

    switch(direction) {
      case 2:
        x = this.x;
        y = this.y + this.defaultHitboxY + this.defaultHeight;
        break;
      case 4:
        x = this.x - this.defaultHitboxX - this.defaultWidth;
        y = this.y;
        break;
      case 6:
        x = this.x + this.defaultHitboxX + this.defaultWidth;
        y = this.y;
        break;
      case 8:
        x = this.x;
        y = this.y - this.defaultHitboxY - this.defaultHeight;
        break;
    }

    if (!this.canLandOn(x, y)) {
      return false;
    }

    if (this.isCollidedWithCharacters(x, y)) {
      return false;
    }

    if (!vehicle.isLandOk(x, y, direction)) {
      return false;
    }

    return {
      x,
      y,
    };
  }

  getOffVehicle(direction = undefined) {
    direction = direction || this.direction();
    const vehicle = this.vehicle();
    if (!vehicle) {
      return this._vehicleGettingOff;
    }

    const target = this.getBestLandingPosition(vehicle, direction);
    if (!target) {
      return this._vehicleGettingOff;
    }

    if (this.isInAirship()) {
      this.setDirection(2);
    }

    this._followers.synchronize(this.x, this.y, direction);
    this.vehicle().getOff();

    if (!this.isInAirship()) {
      this._x = target.x;
      this._y = target.y;

      this._positionHistory = [];

      this.updateAnimationCount();
      this.setTransparent(false);
    }

    this._vehicleGettingOff = true;
    this.setMoveSpeed(4);
    this.setThrough(false);
    this.makeEncounterCount();
    this.gatherFollowers();
  }

  isPositionPassable(x, y, d) {
    const vehicle = this.vehicle();
    if (vehicle) {
      return vehicle.checkPassage(Math.floor(x), Math.floor(y));
    }

    return $super.isPositionPassable.call(this, x, y, d);
  }

  shouldSkipExtraPassabilityTests() {
    const vehicle = this.vehicle();

    if (vehicle) {
      return true;
    }

    return false;
  }

  // Check if there's enough room for the player on that position
  canLandOn(x, y) {
    const x1 = Math.floor(x + this.defaultHitboxX);
    const y1 = Math.floor(y + this.defaultHitboxY);

    if (!$gameMap.isTileClear(x1, y1)) {
      return false;
    }

    const x2 = x + this.defaultHitboxX + this.defaultWidth;
    const x2f = CycloneMovement.isRoundNumber(x2) ? x2 -1 : Math.floor(x2);

    if (x1 !== x2f) {
      if (!$gameMap.isTileClear(x2f, y1)) {
        return false;
      }
    }

    const y2 = y + this.defaultHitboxY + this.defaultHeight;
    const y2f = CycloneMovement.isRoundNumber(y2) ? y2 - 1 : Math.floor(y2);

    if (y1 !== y2f) {
      if (!$gameMap.isTileClear(x1, y2f)) {
        return false;
      }

      if (x1 !== x2f) {
        if (!$gameMap.isTileClear(x2f, y2f)) {
          return false;
        }
      }
    }

    return true;
  }
});

CycloneMovement.patchClass(Game_Follower, $super => class {
  // eslint-disable-next-line complexity
  chaseCharacter(character) {
    if (this.isMoving()) {
      return;
    }

    const position = character.getPositionToFollow();
    if (!position) {
      return;
    }

    const { x, y } = position;

    this.chasePosition(x, y);
  }
});

CycloneMovement.patchClass(Game_Vehicle, $super => class {
  get width() {
    return 1;
  }
  get height() {
    return 1;
  }

  get hitboxX() {
    return 0;
  }

  get hitboxY() {
    return 0;
  }

  checkPassage(x, y) {
    if (this.isBoat()) {
      return $gameMap.isBoatPassable(x, y);
    }

    if (this.isShip()) {
      return $gameMap.isShipPassable(x, y);
    }

    return this.isAirship();
  }

  shouldPassThrough() {
    if (this.isAirship()) {
      return true;
    }

    return $super.shouldPassThrough.call(this);
  }

  isAirshipLandOk(x, y) {
    if (!$gamePlayer.canLandOn(x, y)) {
      return false;
    }

    const floorX = Math.floor(x);
    const floorY = Math.floor(y);

    if (!$gameMap.isAirshipLandOk(floorX, floorY)) {
      return false;
    }

    if ($gameMap.eventsXy(floorX, floorY).length > 0) {
      return false;
    }

    return true;
  }

  isLandOk(x, y, d) {
    if (this.isAirship()) {
      return this.isAirshipLandOk(x, y);
    }

    // // const x2 = CycloneMovement.roundXWithDirection(x, d, CycloneMovement.collisionSize);
    // // const y2 = CycloneMovement.roundYWithDirection(y, d, CycloneMovement.collisionSize);

    // if (!$gameMap.isValid(x, y)) {
    //   return false;
    // }

    // if (!$gamePlayer.canLandOn(x, y)) {
    //   return false;
    // }

    // // if (!$gameMap.isPassable(x, y, this.reverseDir(d))) {
    // //   return false;
    // // }

    // if (this.isCollidedWithCharacters(x, y)) {
    //   return false;
    // }

    return true;
  }
});

const uselessCommands = Object.freeze([
  // comments
  108,
  408,
  // label
  118,
  // end of list
  0,
]);

CycloneMovement.patchClass(Game_Event, $super => class {
  turnTowardPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);

    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection(10 - $gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 4 : 6);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  }

  turnAwayFromPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);
    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection($gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 6 : 4);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  }

  hasAnythingToRun() {
    if (!CycloneMovement.ignoreEmptyEvents) {
      return true;
    }

    for (const command of this.list()) {
      if (uselessCommands.includes(Number(command.code))) {
        continue;
      }

      return true;
    }

    return false;
  }
});

CycloneMovement.patchClass(Game_Interpreter, $super => class {
  command201() {
    $super.command201.call(this);

    if ($gameParty.inBattle()) {
      return;
    }

    CycloneMovement.clearCheckedTiles();
    if (!CycloneMovement.triggerTouchEventAfterTeleport) {
      $gamePlayer.runForAllTiles((x, y) => {
        CycloneMovement.markTileAsChecked(x, y);
      });
    }
  }
});

CycloneMovement.patchClass(DataManager, $super => class {
  static onLoad(object) {
    $super.onLoad.call(this, object);

    if (this.isMapObject(object)) {
      CycloneMovement.setupCollision();
    }
  }
});
})();
