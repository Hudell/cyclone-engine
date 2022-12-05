//=============================================================================
// Cyclone Engine - Advanced Maps
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds new features to game map 1.00.00
 *
 * <pluginName:CycloneAdvancedMaps>
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
 * Advanced Map Features                                             by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels:
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Opening threads on the plugin's itch.io page
 *   1.c. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 3. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 4. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 5. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2022-07-17 - Version 1.00.00
 *
 * ===========================================================================
 *
 * @param debug
 * @text Debug
 * @desc Generate debug logs to help identify problems
 * @type boolean
 * @default false
 *
 * @param mapChangeEventId
 * @text Map Change Event Id
 * @desc Select a Common Event to be called every time the map changes
 * @type common_event
 * @default 0
 *
 * @param Change Tile Size
 *
 * @param tileWidth
 * @text Tile Width
 * @parent Change Tile Size
 * @desc The width of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param tileHeight
 * @text Tile Height
 * @parent Change Tile Size
 * @desc The height of each tile, in pixels
 * @type number
 * @default 48
 *
 * @param tilesetPath
 * @text Tileset Path
 * @parent Change Tile Size
 * @desc You can define an alternate path for loading the tilesets
 * @type string
 * @default img/tilesets/
 *
 * @param Map Settings
 *
 * @param disableAutoShadows
 * @text Disable Auto Shadows
 * @parent Map Settings
 * @desc Make the game stop rendering the map's auto shadows.
 * @type boolean
 * @default false
 *
 * @param disableTilemap
 * @text Disable Tilemap
 * @parent Map Settings
 * @desc If your entire game uses only parallax mapping, you can disable the tilemap to improve performance
 * @type boolean
 * @default false
 *
 * @param balloonZ
 * @text Balloon Z
 * @parent Map Settings
 * @type number
 * @desc Use this to change the balloon Z value when using parallaxes.
 * Recomended default = 7, with parallaxes = 30
 * @default 7
 *
 * @param animationZ
 * @text Animations Z
 * @parent Map Settings
 * @type number
 * @desc Use this to change the animations Z value when using parallaxes.
 * Recomended default = 8, with parallaxes = 31
 * @default 8
 *
 * @param Overlays
 * @text Overlays
 *
 * @param overlayEnabled
 * @text Enabled
 * @parent Overlays
 * @type boolean
 * @desc Enable the overlay features
 * @default false
 *
 * @param overlayPath
 * @text Overlay Path
 * @parent Overlays
 * @desc You can define an alternate path for loading the overlays
 * @type string
 * @default img/overlays/
 *
 * @param folders
 * @text Folders
 * @parent Overlays
 * @desc How overlay files are organized
 * @type select
 * @default none
 * @option No Folders
 * @value none
 * @option One Per Layer
 * @value perLayer
 * @option One Per Map
 * @value perMap
 *
 * @param layers
 * @text Layers
 * @parent Overlays
 * @type struct<OverlayItem>[]
 * @default ["{\"layerName\":\"Ground\",\"fileName\":\"ground\",\"tagName\":\"ground\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"1\"}","{\"layerName\":\"Parallax\",\"fileName\":\"par\",\"tagName\":\"par\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"20\"}","{\"layerName\":\"Shadow\",\"fileName\":\"shadow\",\"tagName\":\"shadow\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"21\"}","{\"layerName\":\"Fog\",\"fileName\":\"fog\",\"tagName\":\"fog\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"22\"}","{\"layerName\":\"Light\",\"fileName\":\"light\",\"tagName\":\"light\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"23\",\"opacity\":\"185\",\"opacitySpeed\":\"180\",\"blendMode\":\"1\"}"]
 *
 * @param Regions
 *
 * @param bushRegionId
 * @text Bush Region
 * @parent Regions
 * @type number
 * @desc Configure a region id that when used will flag the tile as a bush
 * @default 0
 *
 * @param Region Movement
 * @parent Regions
 *
 * @param blockRegionId
 * @text Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block passage on a tile
 * @default 0
 *
 * @param unblockRegionId
 * @text Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock passage on a tile
 * @default 0
 *
 * @param blockPlayerRegionId
 * @text (Player) Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block the player's passage on a tile
 * @default 0
 *
 * @param unblockPlayerRegionId
 * @text (Player) Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock the player's passage on a tile
 * @default 0
 *
 * @param blockEventRegionId
 * @text (Events) Blocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should block event's passage on a tile
 * @default 0
 *
 * @param unblockEventRegionId
 * @text (Events) Unblocked Region
 * @parent Region Movement
 * @type number
 * @desc Configure a region id that should unblock event's passage on a tile
 * @default 0
 *
 * @param Region Actions
 * @parent Regions
 *
 * @param commonEventRegions
 * @text Region Based Common Events
 * @parent Region Actions
 * @type struct<CommonEventRegion>[]
 * @desc Configure certain regions to trigger common events when stepped on
 *
 * @param namedRegions
 * @text Named Regions
 * @parent Region Actions
 * @type struct<NamedRegion>[]
 * @desc Configure certain regions to display a name on screen
 *
 * @param regionNamesStay
 * @text Region Names Stay on Screen
 * @parent Region Actions
 * @desc if on, the names will stay on screen while the player is over the region
 * @type boolean
 * @default false
 *
 * @command newLayerOpacity
 * @text Change Layer Opacity
 * @desc
 *
 * @arg layerName
 * @text Layer Name
 * @type string
 * @desc The name of the layer that you want to change the opacity of
 *
 * @arg opacity
 * @text Opacity
 * @type number
 * @desc The new value for the layer opacity: 1 - 255
 *
 * @arg duration
 * @text Duration
 * @type number
 * @desc How long should the opacity transition last? Leave it at zero to use the map's default.
 * @default 0
 *
 * @command layer
 * @text Change layer file name
 * @desc
 *
 * @arg layerName
 * @text Layer Name
 * @type string
 * @desc The name of the layer that you want to change the file
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The new file name for this layer
 *
 * @command customLayer
 * @text Create a custom layer only for this map
 * @desc
 *
 * @arg layerName
 * @text Layer Name
 * @type string
 * @desc A name to identify this custom layer
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name for this layer
 *
 * @arg z
 * @text Z Index
 * @type number
 * @desc The Z index for this layer
 *
 * @arg switchId
 * @text Switch
 * @type switch
 * @desc The switch that controls this layer's visibility
 *
 * @arg x
 * @text X Position
 * @type number
 * @desc The X position of this layer
 *
 * @arg y
 * @text Y Position
 * @type number
 * @desc The Y position of this layer
 *
 * @arg unit
 * @text Position Unit
 * @type select
 * @desc The type of position
 * @option Pixels
 * @value pixels
 * @options Tiles
 * @value tiles
 *
 * @arg invertSwitch
 * @text Invert Switch Value?
 * @type boolean
 * @desc Should this layer be visible only when the switch is off?
 * @on Visible when switch is off
 * @off Visible when switch is on
 **/
/*~struct~OverlayItem:
 * @param layerName
 * @text Layer Name
 * @desc Name used to identify this layer on plugin commands
 * @default
 *
 * @param fileName
 * @text Layer Filename
 * @desc The base name of the files for this layer.
 * @default
 *
 * @param tagName
 * @text Tag Name
 * @desc If specified, this layer will only be loaded in maps that include this notetag
 * @default
 *
 * @param appendMapId
 * @text Append Map Id
 * @desc Determine if the map id should be appended to the file names
 * @type boolean
 * @default true
 *
 * @param switchId
 * @text Switch ID
 * @type switch
 * @desc A switch to control if this layer should be enabled or not
 * @default 0
 *
 * @param invertSwitch
 * @text Invert Switch
 * @type boolean
 * @desc Display this layer when the switch is off instead of on.
 * @default 0
 *
 * @param quickStart
 * @text Enable Automatically
 * @type boolean
 * @desc If this param is on, the layer switch will be turned on automatically on new game.
 * @default true
 *
 * @param z
 * @text Z value
 * @type number
 * @desc What should be the Z value of this layer?
 * @default 0
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @desc The opacity level for this layer
 * @min 1
 * @max 255
 * @default 255
 *
 * @param opacitySpeed
 * @text Opacity Speed
 * @type number
 * @desc How many frames should it take for this layer to change from completely hidden to completely visible.
 * @min 1
 * @max 255
 * @default 25
 *
 * @param mapList
 * @text Map List
 * @type number[]
 * @desc A list of map ids where this layer will be active without needing tags
 * @default []
 *
 * @param blendMode
 * @text Blend Mode
 * @type number
 * @desc The blend type you want to use in this layer. Default is 0 for most layers, or 1 for lights.
 * @default 0
 *
 * @param position
 * @text Position
 * @type struct<LayerPosition>
 * @desc The top left position of this layer.
 * @default {}
 *
 * @param fadeIn
 * @text Fade In
 * @type boolean
 * @desc Should this layer be made visible with a fade effect or instantly?
 * @on Fade In
 * @off Instantly
 * @default false
 *
*/
/*~struct~LayerPosition:
 * @param x
 * @text X Position
 * @type number
 * @default 0
 *
 * @param y
 * @text Y Position
 * @type number
 * @default 0
 *
 * @param unit
 * @text Position Unit
 * @desc Is this layer's position set in pixels or tiles?
 * @type select
 * @default tiles
 * @option Tiles
 * @value tiles
 * @option Pixels
 * @value pixels
 *
 * @param boundTo
 * @text Bound To
 * @desc Is this layer's position bound to the map or the screen?
 * @type select
 * @default map
 * @option Map
 * @value map
 * @option Screen
 * @value screen
 *
 * @param moveX
 * @text X Speed
 * @type number
 * @desc how many pixels the layer should move horizontally at a time. Use a negative value to move left.
 * @default 0
 *
 * @param moveY
 * @text Y Speed
 * @type number
 * @desc how many pixels the layer should move vertically at a time. Use a negative value to move up.
 * @default 0
 *
 * @param tiling
 * @text Tiling
 * @type boolean
 * @desc Should this layer use a tiling sprite? (Usually only enabled for fog layer)
 * @on Tiled
 * @off Not Tiled
 * @default false
 *
 */
/*~struct~CommonEventRegion:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to add an event to
 *
 * @param commonEventId
 * @text Common Event
 * @type common_event
 * @desc The common event to be executed on this region
 */
/*~struct~NamedRegion:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to display a name on
 *
 * @param name
 * @text Name
 * @type string
 * @desc The name of this region
 */
(function () {
'use strict';

globalThis.CyclonePatcher=class{static initialize(t){this.pluginName=t,this.superClasses=new Map;}static _descriptorIsProperty(t){return t.get||t.set||!t.value||"function"!=typeof t.value}static _getAllClassDescriptors(t,e=!1){if(t===Object)return {};const r=Object.getOwnPropertyDescriptors(e?t.prototype:t);let s={};if(t.prototype){const r=Object.getPrototypeOf(t.prototype).constructor;r!==Object&&(s=this._getAllClassDescriptors(r,e));}return Object.assign({},s,r)}static _assignDescriptor(t,e,r,s,a=!1){if(this._descriptorIsProperty(r))r.get||r.set?Object.defineProperty(t,s,{get:r.get,set:r.set,enumerable:r.enumerable,configurable:r.configurable}):Object.defineProperty(t,s,{value:r.value,enumerable:r.enumerable,configurable:r.configurable});else {let r=s;if(a)for(;r in t;)r=`_${r}`;t[r]=e[s];}}static _applyPatch(t,e,r,s,a=!1){const n=this._getAllClassDescriptors(t,a),i=a?t.prototype:t,o=a?e.prototype:e,l=Object.getOwnPropertyDescriptors(o);let u=!1;for(const t in l){if(s.includes(t))continue;if(t in n){u=!0;const e=n[t];this._assignDescriptor(r,i,e,t,!0);}const e=l[t];this._assignDescriptor(i,o,e,t);}return u}static patchClass(t,e){const r=this.superClasses&&this.superClasses[t.name]||{},s={},a={},n=e(a,s);if("function"!=typeof n)throw new Error(`Invalid class patch for ${t.name}`);const i=Object.getOwnPropertyNames(class{}),o=Object.getOwnPropertyNames(class{}.prototype),l=this._applyPatch(t,n,r,i),u=this._applyPatch(t,n,s,o,!0);if(l){const t=Object.getOwnPropertyDescriptors(r);for(const e in t)this._assignDescriptor(a,r,t[e],e);u&&(a.$prototype=s);}else Object.assign(a,s);this.superClasses&&(this.superClasses[t.name]=a);}};const t=Object.freeze(["TRUE","ON","1","YES","T","V"]);class e extends CyclonePatcher{static initialize(t){super.initialize(t),this.fileName=void 0,this.params={},this.structs=new Map,this.eventListeners=new Map,this.structs.set("Dictionary",{name:{type:"string",defaultValue:""},value:{type:"string",defaultValue:""}});}static register(t={}){const e=this.loadAllParams();this.params=this.loadParamMap(t,e);}static loadAllParams(){for(const t of globalThis.$plugins){if(!t||!t.status)continue;if(!t.description||!t.description.includes(`<pluginName:${this.pluginName}`))continue;this.fileName=t.name;const e=new Map;for(const r in t.parameters)r&&!r.startsWith("-")&&e.set(r,t.parameters[r]);return e}}static loadParamMap(t,e){const r={};for(const s in t)if(t.hasOwnProperty(s))try{r[s]=this.parseParam(s,t,e);}catch(t){console.error(`CycloneEngine crashed while trying to parse a parameter value (${s}). Please report the following error to Hudell:`),console.log(t);}return r}static registerEvent(t,e){this.eventListeners.has(t)||this.eventListeners.set(t,new Set);this.eventListeners.get(t).add(e);}static removeEventListener(t,e){if(!this.eventListeners.has(t))return;this.eventListeners.get(t).delete(e);}static shouldReturnCallbackResult(t,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}){return !(!1!==t||!r)||(!(!0!==t||!e)||!(void 0===t||!s))}static runEvent(t,{abortOnTrue:e=!1,abortOnFalse:r=!1,returnOnValue:s=!1}={},...a){if(!this.eventListeners.has(t))return;const n=this.eventListeners.get(t);for(const t of n){if("number"==typeof t){this.runCommonEvent(t);continue}if("function"!=typeof t){console.error("CycloneEngine: Invalid callback type:"),console.log(t);continue}const n=t(...a);if(this.shouldReturnCallbackResult(n,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}))return n}}static runCommonEvent(t){const e=globalThis.$dataCommonEvents[t];if(!e)return;const r=new Game_Interpreter(1);if(r.setup(e.list,0),!this._interpreters){this._interpreters=new Set;const t=SceneManager.updateMain;SceneManager.updateMain=()=>{t.call(SceneManager),this.update();};}this._interpreters.add(r);}static update(){if(this._interpreters)for(const t of this._interpreters)t.update(),t.isRunning()||this._interpreters.delete(t);}static getPluginFileName(){return this.fileName??this.pluginName}static isTrue(e){return "string"!=typeof e?Boolean(e):t.includes(e.toUpperCase())}static isFalse(t){return !this.isTrue(t)}static getIntParam({value:t,defaultValue:e}){try{const r=parseInt(t);return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be an integer number, but the received value was '${t}'.`),e}}static getFloatParam({value:t,defaultValue:e}){try{const r=parseFloat(t.replace(",","."));return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a number, but the received value was '${t}'.`),e}}static getIntListParam({value:t}){return this.parseArray((t??"").trim(),(t=>{try{return parseInt(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a list of integer numbers, but one of the items was '${t}'.`),0}}))}static parseStructArrayParam({data:t,type:e}){const r=[];for(const s of t){const t=this.parseStructParam({value:s,defaultValue:"",type:e});t&&r.push(t);}return r}static getFloatListParam({value:t}){return this.parseArray((t||"").trim(),(t=>{try{return parseFloat(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param ${name} is expected to be a list of numbers, but one of the items was '${t}'.`),0}}))}static getParam({value:t,defaultValue:e,type:r}){if(r.endsWith("[]"))return this.parseArrayParam({value:t,type:r});if(r.startsWith("struct<"))return this.parseStructParam({value:t,defaultValue:e,type:r});if(void 0===t)return e;switch(r){case"int":return this.getIntParam({value:t,defaultValue:e});case"float":return this.getFloatParam({value:t,defaultValue:e});case"boolean":return "boolean"==typeof t?t:this.isTrue(String(t).trim());default:return t}}static getPluginParam(t){return this.params.get(t)}static defaultValueForType(t){switch(t){case"int":case"float":return 0;case"boolean":return !1}return ""}static parseParam(t,e,r){let s=e[t];s&&"string"==typeof s&&(s={type:s,defaultValue:this.defaultValueForType(s)});const{name:a=t,type:n="string",defaultValue:i=""}=s;let o;if(r)o=r.get(a)??i;else {o=(this.getPluginParam(a)||{}).value??i;}return this.getParam({value:o,defaultValue:i,type:n})}static parseArrayParam({value:t,type:e}){const r=this.parseArray(t);if(!r||!r.length)return r;const s=e.substr(0,e.length-2),a=[];for(const t of r){const e=this.defaultValueForType(s);a.push(this.getParam({value:t,type:s,defaultValue:e}));}return a}static getRegexMatch(t,e,r){const s=t.match(e);if(s)return s[r]}static parseStructData(t,e){for(const r in t){if(!t.hasOwnProperty(r))continue;let s=t[r];"string"==typeof s&&(s={type:s,defaultValue:this.defaultValueForType(s)}),e[r]=this.getParam({value:e[r],defaultValue:s.defaultValue,type:s.type});}return e}static parseStructParam({value:t,defaultValue:e,type:r}){let s;if(t)try{s=JSON.parse(t);}catch(e){console.error("Cyclone Engine failed to parse param structure: ",t),console.error(e);}s||(s=JSON.parse(e));const a=this.getRegexMatch(r,/struct<(.*)>/i,1);if(!a)return console.error(`Unknown plugin param type: ${r}`),s;const n=this.structs.get(a);return n?this.parseStructData(n,s):(console.error(`Unknown param structure type: ${a}`),s)}static parseList(t,e,r=","){let s=t;s.startsWith("[")&&(s=s.substr(1)),s.endsWith("]")&&(s=s.substr(0,s.length-1));const a=s.split(r||",");return e?a.map((t=>e(t))):a}static parseArray(t,e){let r;try{r=JSON.parse(t);}catch(t){return []}return r&&r.length?e?r.map((t=>e(t))):r:[]}static registerCommand(t,e,r,s=[]){return "function"==typeof e?PluginManager.registerCommand(this.getPluginFileName(),t,e):PluginManager.registerCommand(this.getPluginFileName(),t,(t=>{const s=new Map;for(const e in t)t.hasOwnProperty(e)&&s.set(e,t[e]);const a=this.loadParamMap(e,s);return Object.assign(t,a),r(t)}))}}globalThis.CyclonePlugin=e;

function getMetaObject(notes, tagName) {
  const rgx = new RegExp(`<${tagName}([^>]*)`, 'gis');
  const list = [];

  while (true) {
    const match = rgx.exec(notes);
    if (!match) {
      break;
    }

    if (match.length < 2) {
      continue;
    }

    const dataRgx = /([^=:\n\r\t]+)[=:]?(.*)/gm;
    const obj = match[1];
    const newObject = {};

    while (true) {
      const attribute = dataRgx.exec(obj);
      if (!attribute) {
        break;
      }

      if (attribute.length < 2) {
        continue;
      }

      const name = attribute[1].trim();
      if (!name) {
        continue;
      }

      if (attribute.length > 2 && attribute[0] !== attribute[1]) {
        newObject[name] = attribute[2].trim();
      } else {
        newObject[name] = true;
      }
    }

    list.push(newObject);
  }

  return list;
}

class CycloneAdvancedMaps$1 extends CyclonePlugin {
  static register() {
    super.initialize('CycloneAdvancedMaps');

    this.structs.set('CycloneCommonEventRegion', {
      regionId: 'int',
      commonEventId: 'int',
    });
    this.structs.set('CycloneNamedRegion', {
      regionId: 'int',
      name: 'string',
    });
    this.structs.set('CycloneLayerPosition', {
      x: 'int',
      y: 'int',
      unit: 'string',
      boundTo: 'string',
      moveX: 'int',
      moveY: 'int',
      tiling: 'boolean',
    });
    this.structs.set('CycloneOverlayItem', {
      layerName: 'string',
      fileName: 'string',
      tagName: 'string',
      appendMapId: {
        type: 'boolean',
        defaultValue: true,
      },
      switchId: 'int',
      invertSwitch: 'boolean',
      quickStart: {
        type: 'boolean',
        defaultValue: true,
      },
      z: 'int',
      opacity: {
        type: 'int',
        defaultValue: 255,
      },
      opacitySpeed: {
        type: 'int',
        defaultValue: 25,
      },
      blendMode: 'int',
      mapList: 'int[]',
      position: 'struct<CycloneLayerPosition>',
      fadeIn: 'boolean',
    });
    this.structs.set('CycloneCustomLayer', {
      name: 'string',
      layerName: 'string',
      file: 'string',
      fileName: 'string',
      // tag: 'string',
      switch: 'int',
      switchId: 'int',
      invertSwitch: 'boolean',
      z: 'int',
      opacity: 'int',
      opacitySpeed: 'int',
      blendMode: 'int',
      x: 'int',
      y: 'int',
      unit: 'string',
      boundTo: 'string',
      moveX: 'int',
      moveY: 'int',
      tiling: 'boolean'
    });

    super.register({
      debug: {
        name: 'debug',
        type: 'boolean',
        defaultValue: false,
      },
      mapChangeEventId: 'int',
      tileWidth: {
        type: 'int',
        defaultValue: 48,
      },
      tileHeight: {
        type: 'int',
        defaultValue: 48,
      },
      tilesetPath: {
        type: 'string',
        defaultValue: 'img/tilesets/',
      },
      disableTilemap: 'boolean',
      disableAutoShadows: 'boolean',
      balloonZ: {
        type: 'int',
        defaultValue: 7,
      },
      animationZ: {
        type: 'int',
        defaultValue: 8,
      },

      overlayEnabled: 'boolean',
      overlayPath: {
        type: 'string',
        defaultValue: 'img/overlays',
      },
      folders: 'string',

      layers: {
        type: 'struct<CycloneOverlayItem>[]',
        defaultValue: '[]',
      },

      bushRegionId: 'int',
      blockRegionId: 'int',
      unblockRegionId: 'int',
      blockPlayerRegionId: 'int',
      unblockPlayerRegionId: 'int',
      blockEventRegionId: 'int',
      unblockEventRegionId: 'int',

      commonEventRegions: {
        type: 'struct<CycloneCommonEventRegion>[]',
        defaultValue: '[]',
      },
      namedRegions: {
        type: 'struct<CycloneNamedRegion>[]',
        defaultValue: '[]',
      },
      regionNamesStay: 'boolean',
    });

    this.registerCommand('newLayerOpacity', {
      layerName: 'string',
      opacity: 'int',
      duration: 'int',
    }, ({layerName, opacity, duration}) => {
      this.changeLayerOpacity(layerName, opacity, duration);
    }, ['layerName', 'opacity', 'duration']);

    this.registerCommand('layer', {
      layerName: 'string',
      fileName: 'string',
    }, ({layerName, fileName}) => {
      if (!layerName || !fileName) {
        CycloneAdvancedMaps$1.params.debug && console.error('Invalid layer parameters', layerName, fileName);
        return;
      }

      CycloneAdvancedMaps$1.changeLayerFileName(layerName, fileName);
    }, ['layerName', 'fileName']);

    this.registerCommand('customLayer', {
      layerName: 'string',
      fileName: 'string',
      z : 'int',
      switchId: 'int',
      x: 'int',
      y: 'int',
      unit: 'string',
      invertSwitch: 'boolean',
    }, ({layerName, fileName, z, switchId = 0, x = 0, y = 0, unit = 'tiles', invertSwitch = false}) => {
      if (!layerName || !fileName || typeof z !== 'number') {
        CycloneAdvancedMaps$1.params.debug && console.error('Invalid custom layer parameters', layerName, fileName, z);
        return;
      }

      CycloneAdvancedMaps$1.addCustomLayer({
        layerName,
        fileName,
        z,
        switchId,
        invertSwitch,
        position: {
          x,
          y,
          unit: ['pixels', 'px'].includes(unit)  ? 'pixels' : 'tiles',
        },
      });
    }, ['layerName', 'fileName', 'z', 'switchId', 'x', 'y', 'unit', 'invertSwitch']);

    this.clearSettings();
  }

  static clearSettings() {
    this.params.debug && console.log('Clearing CycloneAdvancedMaps settings');

    const layers = this.params.layers;
    const commonEventRegions = this.params.commonEventRegions;
    const namedRegions = this.params.namedRegions;

    this.commonEventRegions = new Map();
    this.namedRegions = new Map();
    this.layers = [];
    for (let i = 0; i < layers.length; i++) {
      this.layers.push({
        ...layers[i],
        index: i,
        id: `cyclone_layer_${i}`,
        changed: false,
        extraX: 0,
        extraY: 0,
        opacityChange: this.opacitySpeedToChange(layers[i].opacitySpeed),
      });
    }

    this.params.debug && console.log('Layer Configuration', this.layers);

    for (const config of commonEventRegions) {
      if (config.regionId > 0 && config.commonEventId > 0) {
        this.commonEventRegions.set(config.regionId, config.commonEventId);
      }
    }
    for (const config of namedRegions) {
      if (config.regionId > 0) {
        this.namedRegions.set(config.regionId, config.name.trim());
      }
    }
  }

  static opacitySpeedToChange(speed) {
    if (speed) {
      return 255 / speed;
    }

    return 10;
  }

  static changeLayerOpacity(layerName, opacity, duration) {
    for (const layer of this.layers) {
      if (layer.layerName === layerName) {
        CycloneAdvancedMaps$1.params.debug && console.log(`Layer ${layerName} opacity changed from ${ layer.opacity } to ${ opacity }, duration = ${ duration || layer.opacitySpeed }`);
        layer.opacity = opacity;
        layer.oneTimeOpacityDuration = duration;
        return;
      }
    }
  }

  static addCustomLayer(layerData) {
    this.params.debug && console.log('Add custom layer', layerData);

    // Remove an existing layer with the same name if found
    if (layerData.layerName) {
      for (let i = 0; i < this.layers.length; i++) {
        if (this.layers[i].layerName === layerData.layerName) {
          this.layers.splice(i, 1);
          break;
        }
      }
    }

    this.layers.push({
      extraX: 0,
      extraY: 0,
      ...layerData,
      index: this.layers.length,
      id: `cyclone_custom_layer_${ this.layers.length }`,
      changed: false,
      opacityChange: this.opacitySpeedToChange(layerData.opacitySpeed),
      mapList: [
        $gameMap._mapId,
      ],
    });
  }

  static loadMapCustomLayers() {
    const objects = getMetaObject($dataMap.note || '', 'customLayer');
    const structType = this.structs.get('CycloneCustomLayer');

    for (const data of objects) {
      CycloneAdvancedMaps$1.parseStructData(structType, data);

      if (!data.name && !data.layerName) {
        this.params.debug && console.error('Custom Layer is missing a name');
        continue;
      }

      this.addCustomLayer({
        layerName: data.name || data.layerName,
        fileName: data.file || data.fileName || '',
        tagName: '',
        appendMapId: false,
        switchId: data.switch || data.switchId || 0,
        invertSwitch: !!data.invertSwitch,
        quickStart: false,
        z: data.z || 0,
        opacity: data.opacity || 255,
        opacitySpeed: data.opacitySpeed || 25,
        blendMode: data.blendMode || 0,
        fadeIn: false,
        position: {
          x: data.x || 0,
          y: data.y || 0,
          unit: ['pixels', 'px'].includes(data.unit) ? 'pixels' : 'tiles',
          boundTo: data.boundTo === 'screen' ? 'screen' : 'map',
          moveX: data.moveX || 0,
          moveY: data.moveY || 0,
          tiling: !!data.tiling,
        }
      });
    }
  }

  static changeLayerFileName(layerName, fileName) {
    for (const layer of this.layers) {
      if (layer.layerName === layerName) {
        CycloneAdvancedMaps$1.params.debug && console.log(`Layer ${layerName} file name changed from ${ layer.fileName } to ${ fileName }`);
        layer.fileName = fileName;
        layer.changed = true;
        return;
      }
    }
  }

  static checkRegionActions() {
    const regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);

    if (this.commonEventRegions.has(regionId)) {
      this.runCommonEvent(this.commonEventRegions.get(regionId));
    }
  }
}

globalThis.CycloneAdvancedMaps = CycloneAdvancedMaps$1;
CycloneAdvancedMaps$1.register();

CycloneAdvancedMaps.patchClass(DataManager, $super => class {
  static setupNewGame() {
    $super.setupNewGame.call(this);

    if (!CycloneAdvancedMaps.params.overlayEnabled) {
      return;
    }

    for (const { quickStart, switchId } of CycloneAdvancedMaps.params.layers) {
      if (!quickStart || !switchId) {
        continue;
      }

      CycloneAdvancedMaps.params.debug && console.log(`Initializing switch ${ switchId }`);
      $gameSwitches.setValue(switchId, true);
    }
  }

  static createGameObjects() {
    $super.createGameObjects.call(this);
    CycloneAdvancedMaps.clearSettings();
  }
});

CycloneAdvancedMaps.patchClass(Game_Event, $super => class {
  isMapPassable(x, y, d) {
    const blockRegionId = CycloneAdvancedMaps.params.blockEventRegionId;
    const unblockRegionId = CycloneAdvancedMaps.params.unblockEventRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});

CycloneAdvancedMaps.patchClass(Game_Map, $super => class {
  setup(...args) {
    $super.setup.call(this, ...args);
    if (CycloneAdvancedMaps.params.overlayEnabled) {
      CycloneAdvancedMaps.loadMapCustomLayers();
    }
  }

  tileWidth() {
    const customWidth = CycloneAdvancedMaps.params.tileWidth;
    if (typeof customWidth === 'number' && customWidth > 0) {
      return customWidth;
    }

    return $super.tileWidth.call(this);
  }

  tileHeight() {
    const customHeight = CycloneAdvancedMaps.params.tileHeight;
    if (typeof customHeight === 'number' && customHeight > 0) {
      return customHeight;
    }

    return $super.tileHeight.call(this);
  }

  isBush(x, y) {
    if ($super.isBush.call(this, x, y)) {
      return true;
    }

    const bushRegionId = CycloneAdvancedMaps.params.bushRegionId;
    if (!bushRegionId) {
      return false;
    }

    if (!this.isValid(x, y)) {
      return false;
    }

    return $gameMap.regionId(x, y) === bushRegionId;
  }

  checkRegionPassability(x, y) {
    const blockRegionId = CycloneAdvancedMaps.params.blockRegionId;
    const unblockRegionId = CycloneAdvancedMaps.params.unblockRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const regionId = this.regionId(x, y);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return null;
  }

  checkPassage(x, y, bit) {
    const region = this.checkRegionPassability(x, y);
    if (typeof region === 'boolean') {
      return region;
    }

    return $super.checkPassage.call(this, x, y, bit);
  }
});

CycloneAdvancedMaps.patchClass(Game_Party, $super => class {
  onPlayerWalk() {
    $super.onPlayerWalk.call(this);

    if (CycloneAdvancedMaps.commonEventRegions.size > 0) {
      CycloneAdvancedMaps.checkRegionActions();
    }
  }
});

CycloneAdvancedMaps.patchClass(Game_Player, $super => class {
  performTransfer() {
    if (this.isTransferring()) {
      if (CycloneAdvancedMaps.params.commonEventId > 0) {
        $gameTemp.reserveCommonEvent(CycloneAdvancedMaps.params.commonEventId);
      }
    }

    $super.performTransfer.call(this);
  }

  isMapPassable(x, y, d) {
    const blockRegionId = CycloneAdvancedMaps.params.blockPlayerRegionId;
    const unblockRegionId = CycloneAdvancedMaps.params.unblockPlayerRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});

CycloneAdvancedMaps.patchClass(ImageManager, $super => class {
  static loadTileset(filename) {
    const customPath = CycloneAdvancedMaps.params.tilesetPath;
    if (customPath) {
      return this.loadBitmap(customPath, filename);
    }

    return $super.loadTileset.call(this, filename);
  }
});

class WindowRegionName extends Window_MapName {
  refresh() {
    this.contents.clear();

    const regionId = this._currentRegionId || 0;
    if (regionId === 0) {
      return;
    }

    const regionName = CycloneAdvancedMaps.namedRegions.get(regionId);
    if (!regionName) {
      return;
    }

    const width = this.contentsWidth();
    this.drawBackground(0, 0, width, this.lineHeight());
    this.drawText(regionName, 0, 0, width, 'center');
  }

  update() {
    if (this._delay) {
      this._delay--;
      return;
    }

    this._delay = 10;
    const regionId = $gameMap.regionId($gamePlayer._x, $gamePlayer._y);

    const shouldUpdate = regionId > 0 || !this._showCount;

    if (shouldUpdate && (CycloneAdvancedMaps.params.regionNamesStay || regionId !== this._currentRegionId)) {
      this._currentRegionId = regionId;
      this.open();
      return;
    }

    super.update();
  }
}

CycloneAdvancedMaps.patchClass(Scene_Map, $super => class {
  createRegionNameWindow() {
    const rect = this.mapNameWindowRect();
    this._regionNameWindow = new WindowRegionName(rect);
    this.addChild(this._regionNameWindow);
  }

  createMapNameWindow() {
    $super.createMapNameWindow.call(this);
    this.createRegionNameWindow();
  }

  updateTransferPlayer() {
    if ($gamePlayer.isTransferring()) {
      this._regionNameWindow.close();
    }

    $super.updateTransferPlayer();
    this._regionNameWindow._delay = 0;
    this._regionNameWindow.update();
  }

  callMenu() {
    $super.callMenu.call(this);
    this._regionNameWindow.hide();
  }

  launchBattle() {
    $super.launchBattle.call(this);
    this._regionNameWindow.hide();
  }

  stop() {
    this._regionNameWindow.close();
    $super.stop.call(this);
  }
});

CycloneAdvancedMaps.patchClass(Sprite_Animation, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const animationZ = CycloneAdvancedMaps.params.animationZ;

    // Only apply if we have a valid Z different from the default
    if (animationZ !== 0 && animationZ !== 8) {
      this.z = animationZ;
    }
  }
});

CycloneAdvancedMaps.patchClass(Sprite_Balloon, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const balloonZ = CycloneAdvancedMaps.params.balloonZ;

    // Only apply if we have a valid Z different from the default
    if (balloonZ !== 0 && balloonZ !== 7) {
      this.z = balloonZ;
    }
  }
});

CycloneAdvancedMaps.patchClass(Spriteset_Map, $super => class {
  getLayerFolderName(layerData) {
    switch (CycloneAdvancedMaps.params.folders) {
      case 'perLayer':
        return layerData.tagName;
      case 'perMap':
        return $gameMap._mapId ? String($gameMap._mapId) : '';
    }

    return '';
  }

  getLayerFileName(layerData) {
    const fileNamePrefix = layerData.fileName || '';
    const tagFileName = this.getMeta(layerData.tagName);
    const fileName = typeof tagFileName === 'string' ? tagFileName : '';

    const fileNameSuffix = layerData.appendMapId ? $gameMap._mapId : '';
    return `${fileNamePrefix}${fileName}${fileNameSuffix}`;
  }

  loadOverlayBitmap(layerData) {
    const bitmapPath = this.getLayerFileName(layerData);
    if (!bitmapPath) {
      return null;
    }

    CycloneAdvancedMaps.params.debug && console.log('Loading bitmap: ', bitmapPath);
    const overlayFolder = CycloneAdvancedMaps.params.overlayPath || 'img/overlays';
    const folderName = this.getLayerFolderName(layerData);
    const path = folderName ? `${overlayFolder}/${folderName}` : overlayFolder;

    return ImageManager.loadBitmap(`${path}/`, bitmapPath);
  }

  isLayerEnabled(layerData) {
    if (layerData.switchId > 0) {
      const switchValue = $gameSwitches.value(layerData.switchId);
      return layerData.invertSwitch ? !switchValue : switchValue;
    }

    return true;
  }

  isLayerAllowed(layerData, debug = false) {
    if (layerData.mapList?.includes($gameMap._mapId)) {
      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by map list. (Map ${ $gameMap._mapId })`);
      return true;
    }

    if (layerData.tagName) {
      if ((this.getMeta(layerData.tagName) || this.getMeta('all'))) {
        debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by tag. (Map ${ $gameMap._mapId })`);
        return true;
      }

      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} blocked by tag. (Map ${ $gameMap._mapId })`);
      return false;
    }

    if (!layerData.mapList?.length) {
      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by lack of filters. (Map ${ $gameMap._mapId })`);
      return true;
    }

    debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} blocked by map list. (Map ${ $gameMap._mapId })`);
    return false;
  }

  createOverlayLayer(layerData) {
    if (!this.isLayerAllowed(layerData, true)) {
      return null;
    }

    const bitmap = this.loadOverlayBitmap(layerData);
    if (!bitmap) {
      return null;
    }

    const layer = layerData.position?.tiling ? new TilingSprite(bitmap) : new Sprite(bitmap);

    if (layerData.position?.tiling) {
      layer.width = Graphics.width;
      layer.height = Graphics.height;
    }

    layer.z = layerData.z || 0;

    this._tilemap.addChild(layer);

    if (layerData.fadeIn) {
      layer.opacity = 0;
    } else {
      layer.opacity = this.isLayerEnabled(layerData) ? (layerData.opacity || 255) : 0;
    }

    if (layerData.blendMode) {
      layer.blendMode = layerData.blendMode;
    }

    return layer;
  }

  createLowerOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (layer.z > 1) {
        continue;
      }

      this[layer.id] = this.createOverlayLayer(layer);
    }
  }

  createUpperOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (layer.z > 1) {
        this[layer.id] = this.createOverlayLayer(layer);
      }
    }
  }

  createCharacters() {
    if (!CycloneAdvancedMaps.params.overlayEnabled) {
      return $super.createCharacters.call(this);
    }

    this.createLowerOverlayLayers();
    $super.createCharacters.call(this);
    this.createUpperOverlayLayers();
  }

  getMeta(name) {
    if ($dataMap && $dataMap.meta) {
      return $dataMap.meta[name];
    }
  }

  getLayerPosition(layerData) {
    const boundToScreen = layerData.position?.boundTo === 'screen';

    const top = boundToScreen ? 0 : $gameMap.displayY() * (0 - $gameMap.tileHeight());
    const left = boundToScreen ? 0 : $gameMap.displayX() * (0 - $gameMap.tileWidth());
    const x = layerData.position?.x || 0;
    const y = layerData.position?.y || 0;

    if (layerData.position?.unit === 'pixels') {
      return [left + x, top + y];
    }

    return [
      left + x * $gameMap.tileWidth(),
      top + y * $gameMap.tileHeight(),
    ];
  }

  updateOverlayLayer(layerData) {
    let layer = this[layerData.id];

    const bitmap = layer?.bitmap || this.loadOverlayBitmap(layerData);
    if (!bitmap) {
      return;
    }

    if (!layer) {
      layer = this.createOverlayLayer(layerData);
      layerData.changed = false;
    }

    if (!layer) {
      return;
    }

    layerData.extraX -= layerData.position?.moveX || 0;
    layerData.extraY -= layerData.position?.moveY || 0;

    const [x, y] = this.getLayerPosition(layerData);
    if (layerData.position?.tiling) {
      if (layerData.position?.boundTo === 'screen') {
        layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() + layerData.extraX;
        layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() + layerData.extraY;
      } else {
        layer.origin.x = layerData.extraX;
        layer.origin.y = layerData.extraY;
      }
      layer.x = x;
      layer.y = y;
    } else {
      layer.x = x + layerData.extraX;
      layer.y = y + layerData.extraY;
    }

    this.updateLayerOpacity(layer, layerData);

    if (layerData.changed) {
      layer.bitmap = this.loadOverlayBitmap(layerData);
      layerData.changed = false;
    }

    this[layerData.id] = layer;
  }

  updateOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (this.isLayerAllowed(layer, layer.changed)) {
        this.updateOverlayLayer(layer);
      }
    }
  }

  updateLayerOpacity(layer, layerData) {
    const opacity = this.isLayerEnabled(layerData) ? layerData.opacity ?? 255 : 0;
    if (layer.opacity === opacity) {
      return;
    }

    if (layerData.oneTimeOpacityDuration) {
      layerData.oneTimeOpacityChange = Math.ceil(Math.abs(layer.opacity - layerData.opacity) / layerData.oneTimeOpacityDuration);
      CycloneAdvancedMaps.params.debug && console.log('Single use opacity change calculated: ', layerData.oneTimeOpacityChange);
      layerData.oneTimeOpacityDuration = undefined;
    }
    const opacityChange = (layerData.oneTimeOpacityChange || layerData.opacityChange || 10) * (opacity > layer.opacity ? 1 : -1);

    // If the opacity is decreasing, the minimum is the target, otherwise it's 0
    const min = opacityChange > 0 ? 0 : opacity;
    // If the opacity is increasing, the maximum is the target, otherwise it's 255
    const max = opacityChange > 0 ? opacity : 255;

    const newOpacity = (layer.opacity + opacityChange).clamp(min, max);

    if (layer.opacity !== newOpacity) {
      layer.opacity = newOpacity;
    }

    if (newOpacity === opacity && layerData.oneTimeOpacityChange) {
      delete layerData.oneTimeOpacityChange;
    }
  }

  updateTilemap() {
    if (CycloneAdvancedMaps.params.overlayEnabled) {
      this.updateOverlayLayers();
    }

    $super.updateTilemap.call(this);
  }
});

CycloneAdvancedMaps.patchClass(Tilemap, $super => class {
  initialize() {
    $super.initialize.call(this);
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
  }

  updateTransform() {
    if (CycloneAdvancedMaps.params.disableTilemap) {
      this._sortChildren();
      PIXI.Container.prototype.updateTransform.call(this);
      return;
    }

    $super.updateTransform.call(this);
  }

  _addShadow(...args) {
    if (CycloneAdvancedMaps.params.disableAutoShadows) {
      return;
    }

    return $super._addShadow.call(this, ...args);
  }
});
})();
