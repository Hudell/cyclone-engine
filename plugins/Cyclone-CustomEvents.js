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
 * @arg wait
 * @type boolean
 * @text Wait
 * @default true
 * @desc Wait until the event is loaded before continuing
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
(function () {
'use strict';

globalThis.CyclonePatcher=class{static initialize(t){this.pluginName=t,this.superClasses=new Map;}static _descriptorIsProperty(t){return t.get||t.set||!t.value||"function"!=typeof t.value}static _getAllClassDescriptors(t,e=!1){if(t===Object)return {};const r=Object.getOwnPropertyDescriptors(e?t.prototype:t);let s={};if(t.prototype){const r=Object.getPrototypeOf(t.prototype).constructor;r!==Object&&(s=this._getAllClassDescriptors(r,e));}return Object.assign({},s,r)}static _assignDescriptor(t,e,r,s,a=!1){if(this._descriptorIsProperty(r))r.get||r.set?Object.defineProperty(t,s,{get:r.get,set:r.set,enumerable:r.enumerable,configurable:r.configurable}):Object.defineProperty(t,s,{value:r.value,enumerable:r.enumerable,configurable:r.configurable});else {let r=s;if(a)for(;r in t;)r=`_${r}`;t[r]=e[s];}}static _applyPatch(t,e,r,s,a=!1){const n=this._getAllClassDescriptors(t,a),i=a?t.prototype:t,o=a?e.prototype:e,l=Object.getOwnPropertyDescriptors(o);let u=!1;for(const t in l){if(s.includes(t))continue;if(t in n){u=!0;const e=n[t];this._assignDescriptor(r,i,e,t,!0);}const e=l[t];this._assignDescriptor(i,o,e,t);}return u}static patchClass(t,e){const r=this.superClasses&&this.superClasses[t.name]||{},s={},a={},n=e(a,s);if("function"!=typeof n)throw new Error(`Invalid class patch for ${t.name}`);const i=Object.getOwnPropertyNames(class{}),o=Object.getOwnPropertyNames(class{}.prototype),l=this._applyPatch(t,n,r,i),u=this._applyPatch(t,n,s,o,!0);if(l){const t=Object.getOwnPropertyDescriptors(r);for(const e in t)this._assignDescriptor(a,r,t[e],e);u&&(a.$prototype=s);}else Object.assign(a,s);this.superClasses&&(this.superClasses[t.name]=a);}};const t=Object.freeze(["TRUE","ON","1","YES","T","V"]);class e extends CyclonePatcher{static initialize(t){super.initialize(t),this.fileName=void 0,this.params={},this.structs=new Map,this.eventListeners=new Map,this.structs.set("Dictionary",{name:{type:"string",defaultValue:""},value:{type:"string",defaultValue:""}});}static register(t={}){const e=this.loadAllParams();this.params=this.loadParamMap(t,e);}static loadAllParams(){for(const t of globalThis.$plugins){if(!t||!t.status)continue;if(!t.description||!t.description.includes(`<pluginName:${this.pluginName}`))continue;this.fileName=t.name;const e=new Map;for(const r in t.parameters)r&&!r.startsWith("-")&&e.set(r,t.parameters[r]);return e}}static loadParamMap(t,e){const r={};for(const s in t)if(t.hasOwnProperty(s))try{r[s]=this.parseParam(s,t,e);}catch(t){console.error(`CycloneEngine crashed while trying to parse a parameter value (${s}). Please report the following error to Hudell:`),console.log(t);}return r}static registerEvent(t,e){this.eventListeners.has(t)||this.eventListeners.set(t,new Set);this.eventListeners.get(t).add(e);}static removeEventListener(t,e){if(!this.eventListeners.has(t))return;this.eventListeners.get(t).delete(e);}static shouldReturnCallbackResult(t,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}){return !(!1!==t||!r)||(!(!0!==t||!e)||!(void 0===t||!s))}static runEvent(t,{abortOnTrue:e=!1,abortOnFalse:r=!1,returnOnValue:s=!1}={},...a){if(!this.eventListeners.has(t))return;const n=this.eventListeners.get(t);for(const t of n){if("number"==typeof t){this.runCommonEvent(t);continue}if("function"!=typeof t){console.error("CycloneEngine: Invalid callback type:"),console.log(t);continue}const n=t(...a);if(this.shouldReturnCallbackResult(n,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}))return n}}static runCommonEvent(t){const e=globalThis.$dataCommonEvents[t];if(!e)return;const r=new Game_Interpreter(1);if(r.setup(e.list,0),!this._interpreters){this._interpreters=new Set;const t=SceneManager.updateMain;SceneManager.updateMain=()=>{t.call(SceneManager),this.update();};}this._interpreters.add(r);}static update(){if(this._interpreters)for(const t of this._interpreters)t.update(),t.isRunning()||this._interpreters.delete(t);}static getPluginFileName(){return this.fileName??this.pluginName}static isTrue(e){return "string"!=typeof e?Boolean(e):t.includes(e.toUpperCase())}static isFalse(t){return !this.isTrue(t)}static getIntParam({value:t,defaultValue:e}){try{const r=parseInt(t);return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be an integer number, but the received value was '${t}'.`),e}}static getFloatParam({value:t,defaultValue:e}){try{const r=parseFloat(t.replace(",","."));return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a number, but the received value was '${t}'.`),e}}static getIntListParam({value:t}){return this.parseArray((t??"").trim(),(t=>{try{return parseInt(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a list of integer numbers, but one of the items was '${t}'.`),0}}))}static parseStructArrayParam({data:t,type:e}){const r=[];for(const s of t){const t=this.parseStructParam({value:s,defaultValue:"",type:e});t&&r.push(t);}return r}static getFloatListParam({value:t}){return this.parseArray((t||"").trim(),(t=>{try{return parseFloat(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param ${name} is expected to be a list of numbers, but one of the items was '${t}'.`),0}}))}static getParam({value:t,defaultValue:e,type:r}){if(r.endsWith("[]"))return this.parseArrayParam({value:t,type:r});if(r.startsWith("struct<"))return this.parseStructParam({value:t,defaultValue:e,type:r});if(void 0===t)return e;switch(r){case"int":return this.getIntParam({value:t,defaultValue:e});case"float":return this.getFloatParam({value:t,defaultValue:e});case"boolean":return "boolean"==typeof t?t:this.isTrue(String(t).trim());default:return t}}static getPluginParam(t){return this.params.get(t)}static defaultValueForType(t){switch(t){case"int":return 0;case"boolean":return !1}return ""}static parseParam(t,e,r){let s=e[t];s&&"string"==typeof s&&(s={type:s,defaultValue:this.defaultValueForType(s)});const{name:a=t,type:n="string",defaultValue:i=""}=s;let o;if(r)o=r.get(a)??i;else {o=(this.getPluginParam(a)||{}).value??i;}return this.getParam({value:o,defaultValue:i,type:n})}static parseArrayParam({value:t,type:e}){const r=this.parseArray(t);if(!r||!r.length)return r;const s=e.substr(0,e.length-2),a=[];for(const t of r){const e=this.defaultValueForType(s);a.push(this.getParam({value:t,type:s,defaultValue:e}));}return a}static getRegexMatch(t,e,r){const s=t.match(e);if(s)return s[r]}static parseStructParam({value:t,defaultValue:e,type:r}){let s;if(t)try{s=JSON.parse(t);}catch(e){console.error("Cyclone Engine failed to parse param structure: ",t),console.error(e);}s||(s=JSON.parse(e));const a=this.getRegexMatch(r,/struct<(.*)>/i,1);if(!a)return console.error(`Unknown plugin param type: ${r}`),s;const n=this.structs.get(a);if(!n)return console.error(`Unknown param structure type: ${a}`),s;for(const t in n){if(!n.hasOwnProperty(t))continue;let e=n[t];"string"==typeof e&&(e={type:e,defaultValue:this.defaultValueForType(e)}),s[t]=this.getParam({value:s[t],defaultValue:e.defaultValue,type:e.type});}return s}static parseList(t,e){let r=t;r.startsWith("[")&&(r=r.substr(1)),r.endsWith("]")&&(r=r.substr(0,r.length-1));const s=r.split(",");return e?s.map((t=>e(t))):s}static parseArray(t,e){let r;try{r=JSON.parse(t);}catch(t){return []}return r&&r.length?e?r.map((t=>e(t))):r:[]}static registerCommand(t,e,r){return "function"==typeof e?PluginManager.registerCommand(this.getPluginFileName(),t,e):PluginManager.registerCommand(this.getPluginFileName(),t,(t=>{const s=new Map;for(const e in t)t.hasOwnProperty(e)&&s.set(e,t[e]);const a=this.loadParamMap(e,s);return Object.assign(t,a),r(t)}))}}globalThis.CyclonePlugin=e;

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

class CycloneCustomEvents$1 extends CyclonePlugin {
  static register() {
    super.initialize('CycloneCustomEvents');

    super.register({
    });

    this.registerCommand('copyEvent', {
      eventId: 'int',
      x: 'int',
      y: 'int',
      temporary: 'boolean',
      newIndex: 'int',
    }, (eventIdOrigin, x, y, temporary, newIndex) => {
      return $gameMap.copyEvent(eventIdOrigin, x, y, temporary, newIndex);
    });

    this.registerCommand('copyEventFrom', {
      mapId: 'int',
      eventId: 'int',
      x: 'int',
      y: 'int',
      temporary: 'boolean',
      newIndex: 'int',
      wait: 'boolean',
    }, (mapId, eventId, x, y, temporary, newIndex, wait) => {
      if (!wait) {
        return $gameMap.copyEventFrom(mapId, eventId, x, y, temporary, newIndex);
      }

      // #ToDo: make the interpreter wait for copying to be complete
    });

    this.registerCommand('createActorAt', {
      actorId: 'int',
      x: 'int',
      y: 'int',
      d: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (actorId, x, y, d, commonEventId, temporary) => {
      return this.createActorAt(actorId, x, y, d, commonEventId, temporary);
    });

    this.registerCommand('createNormalEventAt', {
      characterName: 'string',
      characterIndex: 'int',
      x: 'int',
      y: 'int',
      d: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (characterName, characterIndex, x, y, d, commonEventId, temporary) => {
      return this.createNormalEventAt(characterName, x, y, d, commonEventId, temporary);
    });

    this.registerCommand('createTriggerEventAt', {
      x: 'int',
      y: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (x, y, commonEventId, temporary) => {
      return this.createTriggerEventAt(x, y, commonEventId, temporary);
    });

    this.registerCommand('createTeleportEventAt', {
      x: 'int',
      y: 'int',
      newMapId: 'int',
      newX: 'int',
      newY: 'int',
      newDirection: 'int',
      fadeType: 'int',
      temporary: 'boolean',
    }, (x, y, newMapId, newX, newY, newDirection, fadeType, temporary) => {
      return this.createTeleportEventAt(x, y, newMapId, newX, newY, newDirection, fadeType, temporary);
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

globalThis.CycloneCustomEvents = CycloneCustomEvents$1;
CycloneCustomEvents$1.register();

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

CycloneCustomEvents.patchClass(Game_Map, $super => class {
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

    if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._spriteset && SceneManager._scene._spriteset._characterSprites) {
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
    CycloneCustomEvents.getAnotherMapData(mapIdOrigin, () => {
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
    return CycloneCustomEvents.createActorAt(...args);
  }

  createNormalEventAt(...args) {
    return CycloneCustomEvents.createNormalEventAt(...args);
  }

  createTriggerEventAt(...args) {
    return CycloneCustomEvents.createTriggerEventAt(...args);
  }

  createTeleportEventAt(...args) {
    return CycloneCustomEvents.createTeleportEventAt(...args);
  }

  createParallelProcess(...args) {
    return CycloneCustomEvents.createParallelProcess(...args);
  }
});

CycloneCustomEvents.patchClass(Game_System, $super => class {
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
})();
