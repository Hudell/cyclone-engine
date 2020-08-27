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
    this.loadParamMap(paramMap, dataMap);
  }

  static loadAllParams() {
    for (const plugin of globalThis.$plugins) {
      if (!plugin?.status) {
        continue;
      }
      if (!plugin?.description?.includes(`<pluginName:${ this.pluginName }`)) {
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
        console.error(`CycloneEngine crashed while trying to parse a parameter value (${ key }). Please report the following error to Hudell:`);
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
        oldUpdateMain.call(this);
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

  static patchClass(baseClass, patchFn) {
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
        console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be an integer number, but the received value was '${ value }'.`);
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
        console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be a number, but the received value was '${ value }'.`);
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
          console.error(`Cyclone Engine plugin ${ this.pluginName }: Param is expected to be a list of integer numbers, but one of the items was '${ item }'.`);
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
          console.error(`Cyclone Engine plugin ${ this.pluginName }: Param ${ name } is expected to be a list of numbers, but one of the items was '${ item }'.`);
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
      console.error(`Unknown plugin param type: ${ type }`);
      return data;
    }

    const structType = this.structs.get(structTypeName);
    if (!structType) {
      console.error(`Unknown param structure type: ${ structTypeName }`);
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
        throw new Error(`Invalid Variable ID: ${ variableId }`);
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

export {
  CyclonePlugin,
};
