/*:
 * @target MZ
 * @plugindesc Create short parallel events from inside regular events
 *
 * <pluginName:CycloneAsync>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-async
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
 * Async                                                             by Hudell
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
 * Change Log
 * ===========================================================================
 * 2021-09-09 - Version 1.01.00
 * - Changed plugin to run async code independently from source event.
 * 2021-09-09 - Version 1.00.00
 * ===========================================================================
 * @command asyncWait
 * @text Wait for Async Blocks
 * @desc Wait for Async Blocks to complete before running the next command
 *
 * @command asyncKill
 * @text End Async Blocks
 * @desc Stop processing active async blocks on this event
 */

(function () {
'use strict';

globalThis.CyclonePatcher=class{static initialize(t){this.pluginName=t,this.superClasses=new Map;}static _descriptorIsProperty(t){return t.get||t.set||!t.value||"function"!=typeof t.value}static _getAllClassDescriptors(t,e=!1){if(t===Object)return {};const r=Object.getOwnPropertyDescriptors(e?t.prototype:t);let s={};if(t.prototype){const r=Object.getPrototypeOf(t.prototype).constructor;r!==Object&&(s=this._getAllClassDescriptors(r,e));}return Object.assign({},s,r)}static _assignDescriptor(t,e,r,s,a=!1){if(this._descriptorIsProperty(r))r.get||r.set?Object.defineProperty(t,s,{get:r.get,set:r.set,enumerable:r.enumerable,configurable:r.configurable}):Object.defineProperty(t,s,{value:r.value,enumerable:r.enumerable,configurable:r.configurable});else {let r=s;if(a)for(;r in t;)r=`_${r}`;t[r]=e[s];}}static _applyPatch(t,e,r,s,a=!1){const n=this._getAllClassDescriptors(t,a),i=a?t.prototype:t,o=a?e.prototype:e,l=Object.getOwnPropertyDescriptors(o);let u=!1;for(const t in l){if(s.includes(t))continue;if(t in n){u=!0;const e=n[t];this._assignDescriptor(r,i,e,t,!0);}const e=l[t];this._assignDescriptor(i,o,e,t);}return u}static patchClass(t,e){const r=this.superClasses&&this.superClasses[t.name]||{},s={},a={},n=e(a,s);if("function"!=typeof n)throw new Error(`Invalid class patch for ${t.name}`);const i=Object.getOwnPropertyNames(class{}),o=Object.getOwnPropertyNames(class{}.prototype),l=this._applyPatch(t,n,r,i),u=this._applyPatch(t,n,s,o,!0);if(l){const t=Object.getOwnPropertyDescriptors(r);for(const e in t)this._assignDescriptor(a,r,t[e],e);u&&(a.$prototype=s);}else Object.assign(a,s);this.superClasses&&(this.superClasses[t.name]=a);}};const t=Object.freeze(["TRUE","ON","1","YES","T","V"]);class e extends CyclonePatcher{static initialize(t){super.initialize(t),this.fileName=void 0,this.params={},this.structs=new Map,this.eventListeners=new Map,this.structs.set("Dictionary",{name:{type:"string",defaultValue:""},value:{type:"string",defaultValue:""}});}static register(t={}){const e=this.loadAllParams();this.params=this.loadParamMap(t,e);}static loadAllParams(){for(const t of globalThis.$plugins){if(!t||!t.status)continue;if(!t.description||!t.description.includes(`<pluginName:${this.pluginName}`))continue;this.fileName=t.name;const e=new Map;for(const r in t.parameters)r&&!r.startsWith("-")&&e.set(r,t.parameters[r]);return e}}static loadParamMap(t,e){const r={};for(const s in t)if(t.hasOwnProperty(s))try{r[s]=this.parseParam(s,t,e);}catch(t){console.error(`CycloneEngine crashed while trying to parse a parameter value (${s}). Please report the following error to Hudell:`),console.log(t);}return r}static registerEvent(t,e){this.eventListeners.has(t)||this.eventListeners.set(t,new Set);this.eventListeners.get(t).add(e);}static removeEventListener(t,e){if(!this.eventListeners.has(t))return;this.eventListeners.get(t).delete(e);}static shouldReturnCallbackResult(t,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}){return !(!1!==t||!r)||(!(!0!==t||!e)||!(void 0===t||!s))}static runEvent(t,{abortOnTrue:e=!1,abortOnFalse:r=!1,returnOnValue:s=!1}={},...a){if(!this.eventListeners.has(t))return;const n=this.eventListeners.get(t);for(const t of n){if("number"==typeof t){this.runCommonEvent(t);continue}if("function"!=typeof t){console.error("CycloneEngine: Invalid callback type:"),console.log(t);continue}const n=t(...a);if(this.shouldReturnCallbackResult(n,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}))return n}}static runCommonEvent(t){const e=globalThis.$dataCommonEvents[t];if(!e)return;const r=new Game_Interpreter(1);if(r.setup(e.list,0),!this._interpreters){this._interpreters=new Set;const t=SceneManager.updateMain;SceneManager.updateMain=()=>{t.call(SceneManager),this.update();};}this._interpreters.add(r);}static update(){if(this._interpreters)for(const t of this._interpreters)t.update(),t.isRunning()||this._interpreters.delete(t);}static getPluginFileName(){return this.fileName??this.pluginName}static isTrue(e){return "string"!=typeof e?Boolean(e):t.includes(e.toUpperCase())}static isFalse(t){return !this.isTrue(t)}static getIntParam({value:t,defaultValue:e}){try{const r=parseInt(t);return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be an integer number, but the received value was '${t}'.`),e}}static getFloatParam({value:t,defaultValue:e}){try{const r=parseFloat(t.replace(",","."));return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a number, but the received value was '${t}'.`),e}}static getIntListParam({value:t}){return this.parseArray((t??"").trim(),(t=>{try{return parseInt(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a list of integer numbers, but one of the items was '${t}'.`),0}}))}static parseStructArrayParam({data:t,type:e}){const r=[];for(const s of t){const t=this.parseStructParam({value:s,defaultValue:"",type:e});t&&r.push(t);}return r}static getFloatListParam({value:t}){return this.parseArray((t||"").trim(),(t=>{try{return parseFloat(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param ${name} is expected to be a list of numbers, but one of the items was '${t}'.`),0}}))}static getParam({value:t,defaultValue:e,type:r}){if(r.endsWith("[]"))return this.parseArrayParam({value:t,type:r});if(r.startsWith("struct<"))return this.parseStructParam({value:t,defaultValue:e,type:r});if(void 0===t)return e;switch(r){case"int":return this.getIntParam({value:t,defaultValue:e});case"float":return this.getFloatParam({value:t,defaultValue:e});case"boolean":return "boolean"==typeof t?t:this.isTrue(String(t).trim());default:return t}}static getPluginParam(t){return this.params.get(t)}static defaultValueForType(t){switch(t){case"int":return 0;case"boolean":return !1}return ""}static parseParam(t,e,r){let s=e[t];s&&"string"==typeof s&&(s={type:s,defaultValue:this.defaultValueForType(s)});const{name:a=t,type:n="string",defaultValue:i=""}=s;let o;if(r)o=r.get(a)??i;else {o=(this.getPluginParam(a)||{}).value??i;}return this.getParam({value:o,defaultValue:i,type:n})}static parseArrayParam({value:t,type:e}){const r=this.parseArray(t);if(!r||!r.length)return r;const s=e.substr(0,e.length-2),a=[];for(const t of r){const e=this.defaultValueForType(s);a.push(this.getParam({value:t,type:s,defaultValue:e}));}return a}static getRegexMatch(t,e,r){const s=t.match(e);if(s)return s[r]}static parseStructParam({value:t,defaultValue:e,type:r}){let s;if(t)try{s=JSON.parse(t);}catch(e){console.error("Cyclone Engine failed to parse param structure: ",t),console.error(e);}s||(s=JSON.parse(e));const a=this.getRegexMatch(r,/struct<(.*)>/i,1);if(!a)return console.error(`Unknown plugin param type: ${r}`),s;const n=this.structs.get(a);if(!n)return console.error(`Unknown param structure type: ${a}`),s;for(const t in n){if(!n.hasOwnProperty(t))continue;let e=n[t];"string"==typeof e&&(e={type:e,defaultValue:this.defaultValueForType(e)}),s[t]=this.getParam({value:s[t],defaultValue:e.defaultValue,type:e.type});}return s}static parseList(t,e){let r=t;r.startsWith("[")&&(r=r.substr(1)),r.endsWith("]")&&(r=r.substr(0,r.length-1));const s=r.split(",");return e?s.map((t=>e(t))):s}static parseArray(t,e){let r;try{r=JSON.parse(t);}catch(t){return []}return r&&r.length?e?r.map((t=>e(t))):r:[]}static registerCommand(t,e,r){return "function"==typeof e?PluginManager.registerCommand(this.getPluginFileName(),t,e):PluginManager.registerCommand(this.getPluginFileName(),t,(t=>{const s=new Map;for(const e in t)t.hasOwnProperty(e)&&s.set(e,t[e]);const a=this.loadParamMap(e,s);return Object.assign(t,a),r(t)}))}}globalThis.CyclonePlugin=e;

class CycloneAsync$1 extends CyclonePlugin {
  static register() {
    this.initialize('CycloneAsync');

    super.register({});

    this.registerCommand('asyncWait', function() {
      this.waitForAsyncJobs();
    });

    this.registerCommand('asyncKill', () => {
      $gameMap.killAsyncJobs();
    });
  }
}

globalThis.CycloneAsync = CycloneAsync$1;
CycloneAsync$1.register();

CycloneAsync.patchClass(Game_Interpreter, $super => class {
  command111(params, ...args) {
    const [code, value] = params;
    if (code !== 12) {
      return $super.command111.call(this, params, ...args);
    }

    const script = value.trim().toLowerCase();
    if (script !== 'async') {
      return $super.command111.call(this, params, ...args);
    }

    this._branch[this._indent] = false;
    this.loadCurrentBlock();
    this.skipBranch();
    return true;
  }

  loadCurrentBlock() {
    const commandList = [];
    let index = this._index + 1;

    while (this._list[index].indent > this._indent) {
      const newBlock = { ...this._list[index] };
      newBlock.indent -= (this._indent + 1);

      commandList.push(newBlock);
      index++;
    }

    const eventId = this.isOnCurrentMap() ? this._eventId : 0;
    $gameMap.addAsyncBlock(commandList, this._depth + 1, eventId);
  }

  waitForAsyncJobs() {
    this.setWaitMode('async');
  }

  updateWaitMode() {
    if (this._waitMode !== 'async') {
      return $super.updateWaitMode.call(this);
    }

    if ($gameMap.hasAsyncRunning()) {
      return true;
    }

    this._waitMode = '';
    return false;
  }
});

CycloneAsync.patchClass(Game_Map, $super => class {
  update(...args) {
    this.updateAsync();
    $super.update.call(this, ...args);
  }

  updateAsync() {
    let needsFiltering = false;

    for (const child of this._asyncInterpreters) {
      if (!child) {
        continue;
      }

      child.update();
      if (!child.isRunning()) {
        needsFiltering = true;
      }
    }

    if (needsFiltering) {
      this._asyncInterpreters = this._asyncInterpreters.filter(child => child.isRunning());
    }
  }

  hasAsyncRunning() {
    return this._asyncInterpreters.find(child => child.isRunning());
  }

  killAsyncJobs() {
    this._asyncInterpreters = [];
  }

  initialize(...args) {
    $super.initialize.call(this, ...args);
    this._asyncInterpreters = [];
  }

  setup(...args) {
    $super.setup.call(this, ...args);
    this._asyncInterpreters = [];
  }

  addAsyncBlock(commandList, depth = 0, eventId = 0) {
    const child = new Game_Interpreter(depth);

    child.setup(commandList, eventId);

    this._asyncInterpreters.push(child);
  }
});
})();
