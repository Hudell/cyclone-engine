/*:
 * @target MZ
 * @plugindesc Live Map Editor - v1.12.01
 *
 * <pluginName:CycloneMapEditor>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-map-editor
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
 * Live Map Editor                                                   by Hudell
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
 * Early map makers used to include fake towns on their maps to identify
 * copies of their work.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2021-01-27 - Version 1.12.00
 *   * Added option to generate 48x48 tilesets when using other sizes.
 * 2020-11-05 - Version 1.11.00
 *   * General bug fixes
 * 2020-10-10 - Version 1.10.00
 *   * Added tileset tabs
 *   * Moved layer list to left side of the screen
 *   * General bug fixes
 *
 * 2020-10-09 - Version 1.09.00
 *   * General bug fixes
 *   * Added support to Cyclone Magic v1.1
 *
 * 2020-10-07 - Version 1.08.00
 *   * Added support to Cyclone Extra Tilesets v1.1
 *
 * 2020-09-22 - Version 1.07.00
 *   * Several quality-of-life updates
 *   * Added support to Cyclone Magic
 *   * Added support to Cyclone Extra Tilesets
 *
 * 2020-09-15 - Version 1.06.00
 *   * New option to view tile properties such as tags, passability, bush,
 *   ladder and so on.
 *
 * 2020-09-14 - Version 1.05.01
 *   * Fixed small delay on integration between movement and map editor.
 *
 * 2020-09-14 - Version 1.05.00
 *   * Added new collision options;
 *   * Changed data compression algorithm;
 *
 * 2020-09-10 - Version 1.04.00
 *   * Added option to customize the collision in blocks of 1/4 of a tile.
 *   * Added options to export the collision map to an image
 *   * Changed the editor to force a larger screen when the game uses a small
 *   resolution.
 *   * Added option to toggle event visibility.
 *
 * 2020-08-30 - Version 1.03.00
 *   * Added options to export the map as images
 *
 * 2020-08-29 - Version 1.02.00
 *   * Created a version of this plugin for Rpg Maker MV
 *   * Changed the way shadows are displayed on the tile list
 *   * Copying an area while holding shift will now skip invisible layers.
 *
 * 2020-08-29 - Version 1.01.00
 *   * Web browser support
 *   * Eraser will now only erase one layer at a time on the auto layer
 *   * Keep changed data in memory even if you leave the map.
 *
 *
 * 2020-08-28 - Version 1.00.00
 * ===========================================================================
 *
 * @param regionIcons
 * @text Region Icons
 * @type struct<RegionIcon>[]
 * @desc Configure certain regions to display an icon instead of the number
 *
 * @param Status Bar
 *
 * @param showMapId
 * @text Show Map Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the Map Id be visible in the status bar?
 *
 * @param showTilesetId
 * @text Show Tileset Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the Tileset Id be visible in the status bar?
 *
 * @param showPosition
 * @text Show Position
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the X and Y position in the status bar?
 *
 * @param showCellTiles
 * @text Show Cell Tiles
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the id of the current position tiles be displayed in the status bar?
 *
 * @param showRegionId
 * @text Show Region Id
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the region id of the current position be displayed in the status bar?
 *
 * @param showTag
 * @text Show Terrain Tag
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the terrain tag of the current position be displayed in the status bar?
 *
 * @param showCollision
 * @text Show Collision
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the collision of the current position be displayed in the status bar?
 *
 * @param showLadder
 * @text Show Ladder
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should status bar indicate if the current position is a ladder?
 *
 * @param showBush
 * @text Show Bush
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a bush?
 *
 * @param showCounter
 * @text Show Counter
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a counter?
 *
 * @param showDamageFloor
 * @text Show Damage Floor
 * @parent Status Bar
 * @type boolean
 * @default true
 * @desc Should the status bar indicate if the current position is a damage floor tile?
 *
 * @param collisionStepCount
 * @text Default Collision Blocks
 * @type select
 * @default 1
 * @desc How many collision blocks per tile should the editor show?
 * @option 4
 * @option 2
 * @option 1
 *
 **/

/*~struct~RegionIcon:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to display an icon on
 *
 * @param icon
 * @text Icon
 * @type string
 * @desc Right click to select icon index
 */
(function () {
'use strict';

globalThis.CyclonePatcher=class{static initialize(t){this.pluginName=t,this.superClasses=new Map;}static _descriptorIsProperty(t){return t.get||t.set||!t.value||"function"!=typeof t.value}static _getAllClassDescriptors(t,e=!1){if(t===Object)return {};const r=Object.getOwnPropertyDescriptors(e?t.prototype:t);let s={};if(t.prototype){const r=Object.getPrototypeOf(t.prototype).constructor;r!==Object&&(s=this._getAllClassDescriptors(r,e));}return Object.assign({},s,r)}static _assignDescriptor(t,e,r,s,a=!1){if(this._descriptorIsProperty(r))r.get||r.set?Object.defineProperty(t,s,{get:r.get,set:r.set,enumerable:r.enumerable,configurable:r.configurable}):Object.defineProperty(t,s,{value:r.value,enumerable:r.enumerable,configurable:r.configurable});else {let r=s;if(a)for(;r in t;)r=`_${r}`;t[r]=e[s];}}static _applyPatch(t,e,r,s,a=!1){const n=this._getAllClassDescriptors(t,a),i=a?t.prototype:t,o=a?e.prototype:e,l=Object.getOwnPropertyDescriptors(o);let u=!1;for(const t in l){if(s.includes(t))continue;if(t in n){u=!0;const e=n[t];this._assignDescriptor(r,i,e,t,!0);}const e=l[t];this._assignDescriptor(i,o,e,t);}return u}static patchClass(t,e){const r=this.superClasses&&this.superClasses[t.name]||{},s={},a={},n=e(a,s);if("function"!=typeof n)throw new Error(`Invalid class patch for ${t.name}`);const i=Object.getOwnPropertyNames(class{}),o=Object.getOwnPropertyNames(class{}.prototype),l=this._applyPatch(t,n,r,i),u=this._applyPatch(t,n,s,o,!0);if(l){const t=Object.getOwnPropertyDescriptors(r);for(const e in t)this._assignDescriptor(a,r,t[e],e);u&&(a.$prototype=s);}else Object.assign(a,s);this.superClasses&&(this.superClasses[t.name]=a);}};const t=Object.freeze(["TRUE","ON","1","YES","T","V"]);class e extends CyclonePatcher{static initialize(t){super.initialize(t),this.fileName=void 0,this.params={},this.structs=new Map,this.eventListeners=new Map,this.structs.set("Dictionary",{name:{type:"string",defaultValue:""},value:{type:"string",defaultValue:""}});}static register(t={}){const e=this.loadAllParams();this.params=this.loadParamMap(t,e);}static loadAllParams(){for(const t of globalThis.$plugins){if(!t||!t.status)continue;if(!t.description||!t.description.includes(`<pluginName:${this.pluginName}`))continue;this.fileName=t.name;const e=new Map;for(const r in t.parameters)r&&!r.startsWith("-")&&e.set(r,t.parameters[r]);return e}}static loadParamMap(t,e){const r={};for(const s in t)if(t.hasOwnProperty(s))try{r[s]=this.parseParam(s,t,e);}catch(t){console.error(`CycloneEngine crashed while trying to parse a parameter value (${s}). Please report the following error to Hudell:`),console.log(t);}return r}static registerEvent(t,e){this.eventListeners.has(t)||this.eventListeners.set(t,new Set);this.eventListeners.get(t).add(e);}static removeEventListener(t,e){if(!this.eventListeners.has(t))return;this.eventListeners.get(t).delete(e);}static shouldReturnCallbackResult(t,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}){return !(!1!==t||!r)||(!(!0!==t||!e)||!(void 0===t||!s))}static runEvent(t,{abortOnTrue:e=!1,abortOnFalse:r=!1,returnOnValue:s=!1}={},...a){if(!this.eventListeners.has(t))return;const n=this.eventListeners.get(t);for(const t of n){if("number"==typeof t){this.runCommonEvent(t);continue}if("function"!=typeof t){console.error("CycloneEngine: Invalid callback type:"),console.log(t);continue}const n=t(...a);if(this.shouldReturnCallbackResult(n,{abortOnTrue:e,abortOnFalse:r,returnOnValue:s}))return n}}static runCommonEvent(t){const e=globalThis.$dataCommonEvents[t];if(!e)return;const r=new Game_Interpreter(1);if(r.setup(e.list,0),!this._interpreters){this._interpreters=new Set;const t=SceneManager.updateMain;SceneManager.updateMain=()=>{t.call(SceneManager),this.update();};}this._interpreters.add(r);}static update(){if(this._interpreters)for(const t of this._interpreters)t.update(),t.isRunning()||this._interpreters.delete(t);}static getPluginFileName(){return this.fileName??this.pluginName}static isTrue(e){return "string"!=typeof e?Boolean(e):t.includes(e.toUpperCase())}static isFalse(t){return !this.isTrue(t)}static getIntParam({value:t,defaultValue:e}){try{const r=parseInt(t);return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be an integer number, but the received value was '${t}'.`),e}}static getFloatParam({value:t,defaultValue:e}){try{const r=parseFloat(t.replace(",","."));return isNaN(r)?e:r}catch(r){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a number, but the received value was '${t}'.`),e}}static getIntListParam({value:t}){return this.parseArray((t??"").trim(),(t=>{try{return parseInt(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param is expected to be a list of integer numbers, but one of the items was '${t}'.`),0}}))}static parseStructArrayParam({data:t,type:e}){const r=[];for(const s of t){const t=this.parseStructParam({value:s,defaultValue:"",type:e});t&&r.push(t);}return r}static getFloatListParam({value:t}){return this.parseArray((t||"").trim(),(t=>{try{return parseFloat(t.trim())}catch(e){return ""!==t&&console.error(`Cyclone Engine plugin ${this.pluginName}: Param ${name} is expected to be a list of numbers, but one of the items was '${t}'.`),0}}))}static getParam({value:t,defaultValue:e,type:r}){if(r.endsWith("[]"))return this.parseArrayParam({value:t,type:r});if(r.startsWith("struct<"))return this.parseStructParam({value:t,defaultValue:e,type:r});if(void 0===t)return e;switch(r){case"int":return this.getIntParam({value:t,defaultValue:e});case"float":return this.getFloatParam({value:t,defaultValue:e});case"boolean":return "boolean"==typeof t?t:this.isTrue(String(t).trim());default:return t}}static getPluginParam(t){return this.params.get(t)}static defaultValueForType(t){switch(t){case"int":return 0;case"boolean":return !1}return ""}static parseParam(t,e,r){let s=e[t];s&&"string"==typeof s&&(s={type:s,defaultValue:this.defaultValueForType(s)});const{name:a=t,type:n="string",defaultValue:i=""}=s;let o;if(r)o=r.get(a)??i;else {o=(this.getPluginParam(a)||{}).value??i;}return this.getParam({value:o,defaultValue:i,type:n})}static parseArrayParam({value:t,type:e}){const r=this.parseArray(t);if(!r||!r.length)return r;const s=e.substr(0,e.length-2),a=[];for(const t of r){const e=this.defaultValueForType(s);a.push(this.getParam({value:t,type:s,defaultValue:e}));}return a}static getRegexMatch(t,e,r){const s=t.match(e);if(s)return s[r]}static parseStructParam({value:t,defaultValue:e,type:r}){let s;if(t)try{s=JSON.parse(t);}catch(e){console.error("Cyclone Engine failed to parse param structure: ",t),console.error(e);}s||(s=JSON.parse(e));const a=this.getRegexMatch(r,/struct<(.*)>/i,1);if(!a)return console.error(`Unknown plugin param type: ${r}`),s;const n=this.structs.get(a);if(!n)return console.error(`Unknown param structure type: ${a}`),s;for(const t in n){if(!n.hasOwnProperty(t))continue;let e=n[t];"string"==typeof e&&(e={type:e,defaultValue:this.defaultValueForType(e)}),s[t]=this.getParam({value:s[t],defaultValue:e.defaultValue,type:e.type});}return s}static parseList(t,e){let r=t;r.startsWith("[")&&(r=r.substr(1)),r.endsWith("]")&&(r=r.substr(0,r.length-1));const s=r.split(",");return e?s.map((t=>e(t))):s}static parseArray(t,e){let r;try{r=JSON.parse(t);}catch(t){return []}return r&&r.length?e?r.map((t=>e(t))):r:[]}static registerCommand(t,e,r){return "function"==typeof e?PluginManager.registerCommand(this.getPluginFileName(),t,e):PluginManager.registerCommand(this.getPluginFileName(),t,(t=>{const s=new Map;for(const e in t)t.hasOwnProperty(e)&&s.set(e,t[e]);const a=this.loadParamMap(e,s);return Object.assign(t,a),r(t)}))}}globalThis.CyclonePlugin=e;

const Layers = {
  shadows: 4,
  regions: 5,
  events: 6,
  auto: 7,
  collisions: 8,
  tags: 9,
  blend: 10,
};

const Tools = {
  eraser: 'eraser',
  pencil: 'pencil',
  rectangle: 'rectangle',
  fill: 'fill',
  passage: 'passage',
  passage4: 'passage4',
  ladder: 'ladder',
  bush: 'bush',
  counter: 'counter',
  damage: 'damage',
  terrain: 'terrain',
};

const tilePropTools = [
  Tools.passage,
  Tools.passage4,
  Tools.ladder,
  Tools.bush,
  Tools.counter,
  Tools.damage,
  Tools.terrain,
];

const TilePassageType = {
  free: 0,
  blocked: 1,
  star: 2,
};

class MapshotTileMap extends Bitmap {
  constructor() {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const width = $gameMap.width() * tileWidth;
    const height = $gameMap.height() * tileHeight;

    super(width, height);
    this.flags = $gameMap.tileset().flags;
  }

  drawSingleLayer(layerIndex) {
    const width = $gameMap.width();
    const height = $gameMap.height();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawLayerSpot(x, y, layerIndex);
      }
    }
  }

  drawLayerSpot(x, y, z, filterFn = undefined) {
    const index = CycloneMapEditor.tileIndex(x, y, z);
    const tileId = $dataMap.data[index] ?? 0;

    if (filterFn && !filterFn(tileId)) {
      return;
    }

    const drawX = x * $gameMap.tileWidth();
    const drawY = y * $gameMap.tileHeight();

    this.drawTile(tileId, drawX, drawY);
  }

  isHigherTile(tileId) {
    return this.flags[tileId] & 0x10;
  }

  drawLowerTiles() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    const filterFn = (tileId) => !this.isHigherTile(tileId);

    for (let z = 0; z <= 3; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.drawLayerSpot(x, y, z, filterFn);
        }
      }
    }
  }

  drawUpperTiles() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    const filterFn = (tileId) => this.isHigherTile(tileId);

    for (let z = 0; z <= 3; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.drawLayerSpot(x, y, z, filterFn);
        }
      }
    }
  }

  drawEvents(priority = undefined) {
    const events = SceneManager._scene._spriteset._tilemap.children.filter(child => child instanceof Sprite_Character);
    for (const sprite of events) {
      if (sprite._character !== null) {
        if (sprite._character instanceof Game_Player || sprite._character instanceof Game_Follower || sprite._character instanceof Game_Vehicle) {
          continue;
        }
      }

      sprite.update();
      if (sprite._characterName === '' && sprite._tileId === 0) {
        continue;
      }

      if (priority !== undefined && sprite._character._priorityType !== priority) {
        continue;
      }

      const x = sprite.x - sprite._frame.width / 2 + $gameMap._displayX * $gameMap.tileWidth();
      const y = sprite.y - sprite._frame.height + $gameMap._displayY * $gameMap.tileHeight();

      this.blt(sprite.bitmap, sprite._frame.x, sprite._frame.y, sprite._frame.width, sprite._frame.height, x, y, sprite._frame.width, sprite._frame.height);
    }
  }

  drawDefaultCollision() {
    const width = $gameMap.width();
    const height = $gameMap.height();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const drawWidth = CycloneMapEditor.tileWidth;
        const drawHeight = CycloneMapEditor.tileHeight;
        const drawX = x * drawWidth;
        const drawY = y * drawHeight;

        const downBlocked = !$gameMap.isPassable(x, y, 2);
        const upBlocked = !$gameMap.isPassable(x, y, 8);
        const leftBlocked = !$gameMap.isPassable(x, y, 4);
        const rightBlocked = !$gameMap.isPassable(x, y, 6);

        if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
          this.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF0000');
          continue;
        }

        const pieceHeight = Math.floor(drawHeight / 4);
        const pieceWidth = Math.floor(drawWidth / 4);

        if (downBlocked) {
          this.fillRect(drawX, drawY + drawHeight - pieceHeight, drawWidth, pieceHeight, '#FF00FF');
        }
        if (upBlocked) {
          this.fillRect(drawX, drawY, drawWidth, pieceHeight, '#FF00FF');
        }
        if (leftBlocked) {
          this.fillRect(drawX, drawY, pieceWidth, drawHeight, '#FF00FF');
        }
        if (rightBlocked) {
          this.fillRect(drawX + drawWidth - pieceWidth, drawY, pieceWidth, drawHeight, '#FF00FF');
        }
      }
    }
  }

  drawCustomCollision() {
    const customCollisionTable = CycloneMapEditor.customCollisionTable;
    const height = $gameMap.height();
    const width = $gameMap.width();
    const tileWidth = CycloneMapEditor.tileWidth;
    const tileHeight = CycloneMapEditor.tileHeight;
    const drawWidth = tileWidth / 4;
    const drawHeight = tileHeight / 4;
    const colors = ['#00FF00', '#FF0000'];
    const collisionHeight = height * 4;
    const collisionWidth = width * 4;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        for (let cellX = 0; cellX < 4; cellX++) {
          for (let cellY = 0; cellY < 4; cellY++) {

            const intX = Math.floor(x * 4) + cellX;
            const intY = Math.floor(y * 4) + cellY;
            const index = (intY % collisionHeight) * collisionWidth + (intX % collisionWidth);

            // eslint-disable-next-line max-depth
            if (customCollisionTable[index]) {
              const drawX = intX * drawWidth;
              const drawY = intY * drawHeight;

              this.clearRect(drawX, drawY, drawWidth, drawHeight);

              const colorIndex = customCollisionTable[index] - 1;
              const color = colors[colorIndex % colors.length];
              this.fillRect(drawX, drawY, drawWidth, drawHeight, color);
            }
          }
        }
      }
    }
  }
}

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n;}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return "";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256;}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o));}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return "";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else {if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u);}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++);}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++;}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return ""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return "";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else {if(l!==d)return null;v=s+s.charAt(0);}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++);}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

function throttle(fn, delay) {
  let timeout;
  let latestArgs;
  let needsCalling = false;

  const call = () => {
    timeout = setTimeout(() => {
      if (needsCalling) {
        call();
      } else {
        timeout = false;
      }
      needsCalling = false;
    }, delay);

    fn.call(this, ...latestArgs);
  };

  const debounced = function(...args) {
    latestArgs = args;
    if (timeout) {
      needsCalling = true;
      return;
    }

    call();
  };

  return debounced;
}

function debounce(fn, delay) {
  let clearTimer;
  return function(...args) {
    const context = this;
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => fn.call(context, ...args), delay);
  };
}

class DirectionHelper {
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

  static isDiagonal(d) {
    return this.isVertical(d) && this.isHorizontal(d);
  }

  static isVertical(d) {
    return this.goesDown(d) || this.goesUp(d);
  }

  static isHorizontal(d) {
    return this.goesLeft(d) || this.goesRight(d);
  }

  static shareADirection(dir1, dir2) {
    if (this.goesDown(dir1) && this.goesDown(dir2)) {
      return true;
    }

    if (this.goesLeft(dir1) && this.goesLeft(dir2)) {
      return true;
    }

    if (this.goesRight(dir1) && this.goesRight(dir2)) {
      return true;
    }

    if (this.goesUp(dir1) && this.goesUp(dir2)) {
      return true;
    }

    return false;
  }

  static getFirstDirection(diagonalDirection) {
    if (!diagonalDirection) {
      return diagonalDirection;
    }

    if (diagonalDirection > 6) {
      return 8;
    }
    if (diagonalDirection < 4) {
      return 2;
    }
    return diagonalDirection;
  }

  static getAlternativeDirection(direction, diagonalDirection) {
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
}

function logImage(canvas, text) {
  const url = canvas.toDataURL();

  const scale = 1;
  const img = new Image();

  function getBox(width, height) {
    return {
      string: '+',
      style: `font-size: 1px; padding: ${ Math.floor(height / 2) }px ${ Math.floor(width / 2) }px; line-height: ${ height }px;`,
    };
  }

  img.onload = function() {
    const dim = getBox(this.width * scale, this.height * scale);
    if (text) {
      console.log(text);
    }
    console.log(`%c${ dim.string }`, `${ dim.style }background: url('${ url }'); background-size: ${ this.width * scale }px ${ this.height * scale }px; color: transparent;`);
  };

  img.src = url;
}

function getTilesetIndex(tileId) {
  if (tileId >= (Tilemap.TILE_ID_A5 + 256) && tileId < Tilemap.TILE_ID_A1) {
    return 11;
  }

  if (Tilemap.isTileA1(tileId)) {
    return 0;
  }

  if (Tilemap.isTileA2(tileId)) {
    return 1;
  }

  if (Tilemap.isTileA3(tileId)) {
    return 2;
  }

  if (Tilemap.isTileA4(tileId)) {
    return 3;
  }

  if (Tilemap.isTileA5(tileId)) {
    return 4;
  }

  return 5 + Math.floor(tileId / 256);
}

const layerVisibility = [true, true, true, true, true, false, true, false, false, false, false];
let editorActive = true;
let windowWidth = 216;
const mapCaches = {};
let customCollisionTable = {};
let tileBlendingTable = {};

let currentLayer = 7;
let currentTab = 'A';
let currentTileId = undefined;
let tileCols = 1;
let tileRows = 1;
let selectedTileList = [];
let multiLayerSelection = [];
let tileWidth = 48;
let tileHeight = 48;
let currentTool = 'pencil';
let lastDrawingTool = 'pencil';
let wasPressing = false;
let isRightButtonDown = false;
let wasRightButtonDown = false;
let rectangleStartMouseX = 0;
let rectangleStartMouseY = 0;
let rectangleStartX = 0;
let rectangleStartY = 0;
let rectangleWidth = 0;
let rectangleHeight = 0;
let rectangleBackWidth = 0;
let rectangleBackHeight = 0;
const tabs = ['A', 'B', 'C', 'D', 'E'];
let changeHistory = [];
let undoHistory = [];
let currentChange = false;
let previewChanges = {};
let messySelection = false;
let showGrid = true;
let statusTileId = 0;
let statusMapX = 0;
let statusMapY = 0;
let statusTile1 = 0;
let statusTile2 = 0;
let statusTile3 = 0;
let statusTile4 = 0;
let statusRegion = 0;
let statusTag = 0;
let statusCollision = 0;
let statusBush = false;
let statusCounter = false;
let statusDamage = false;
let statusLadder = false;
let currentZoom = 1;
let puzzleMode = false;

let circleData = false;
let smallCircleData = false;

const _ = '';
const o = true;
const x = false;
const autoTileShapeTable = [
  // o means there's a compatible tile on that position,
  // x means there is no compatible tile on that position
  // _ means that position doesn't matter
  [o, o, o, o, o, o, o, o], // 0
  [x, o, o, o, o, o, o, o], // 1
  [o, o, x, o, o, o, o, o], // 2
  [x, o, x, o, o, o, o, o], // 3
  [o, o, o, o, o, o, o, x], // 4
  [x, o, o, o, o, o, o, x], // 5
  [o, o, x, o, o, o, o, x], // 6
  [x, o, x, o, o, o, o, x], // 7
  [o, o, o, o, o, x, o, o], // 8
  [x, o, o, o, o, x, o, o], // 9
  [o, o, x, o, o, x, o, o], //10
  [x, o, x, o, o, x, o, o], //11
  [o, o, o, o, o, x, o, x], //12
  [x, o, o, o, o, x, o, x], //13
  [o, o, x, o, o, x, o, x], //14
  [x, o, x, o, o, x, o, x], //15
  [_, o, o, x, o, _, o, o], //16
  [_, o, x, x, o, _, o, o], //17
  [_, o, o, x, o, _, o, x], //18
  [_, o, x, x, o, _, o, x], //19
  [_, x, _, o, o, o, o, o], //20
  [_, x, _, o, o, o, o, x], //21
  [_, x, _, o, o, x, o, o], //22
  [_, x, _, o, o, x, o, x], //23
  [o, o, _, o, x, o, o, _], //24
  [o, o, _, o, x, x, o, _], //25
  [x, o, _, o, x, o, o, _], //26
  [x, o, _, o, x, x, o, _], //27
  [o, o, o, o, o, _, x, _], //28
  [x, o, o, o, o, _, x, _], //29
  [o, o, x, o, o, _, x, _], //30
  [x, o, x, o, o, _, x, _], //31
  [_, o, _, x, x, _, o, _], //32
  [_, x, _, o, o, _, x, _], //33
  [_, x, _, x, o, _, o, o], //34
  [_, x, _, x, o, _, o, x], //35
  [_, x, _, o, x, o, o, _], //36
  [_, x, _, o, x, x, o, _], //37
  [o, o, _, o, x, _, x, _], //38
  [x, o, _, o, x, _, x, _], //39
  [_, o, o, x, o, _, x, _], //40
  [_, o, x, x, o, _, x, _], //41
  [_, x, _, x, x, _, o, _], //42
  [_, x, _, x, o, _, x, _], //43
  [_, o, _, x, x, _, x, _], //44
  [_, x, _, o, x, _, x, _], //45
  [_, x, _, x, x, _, x, _]  //46
];

const highLayerAutotiles = [
  1,
  2,
  3,
  20,
  21,
  22,
  23,
  28,
  29,
  30,
  31,
  36,
  37,
  38,
  39,
  44,
  45,
  46,
  47,
];

const refreshGrid = throttle(() => {
  SceneManager._scene._mapEditorGrid.refresh();
}, 50);

const refreshTilemap = throttle(() => {
  SceneManager._scene._spriteset._tilemap.refresh();
}, 200);

const refreshCollision = throttle(() => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      refreshCollision();
    }, 1);
    return;
  }
  if (window.CycloneMovement) {
    window.CycloneMovement.setupCollision();
  }
}, 200);

const refreshMagic = throttle(() => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      refreshMagic();
    }, 1);
    return;
  }

  if (window.CycloneMagic) {
    window.CycloneMagic.loadMagic();
    forceBlenderRefresh(true);
  }
});

const forceBlenderRefresh = throttle((...args) => {
  CycloneMapEditor$1.forceBlenderRefresh(...args);
}, 50);

const saveExtraData = throttle((refreshCollisionToo = false) => {
  if (TouchInput.isPressed()) {
    setTimeout(() => {
      saveExtraData(refreshCollisionToo);
    }, 1);
    return;
  }

  CycloneMapEditor$1.saveExtraData();
  if (refreshCollisionToo) {
    refreshCollision();
    refreshMagic();
  }
}, 200);

const fullRefresh = debounce(() => {
  saveExtraData(true);
}, 500);

class CycloneMapEditor$1 extends CyclonePlugin {
  static get currentTab() {
    return currentTab;
  }
  static get active() {
    return editorActive;
  }
  static set active(value) {
    editorActive = value;
  }
  static get tileWidth() {
    return tileWidth;
  }
  static set tileWidth(value) {
    tileWidth = value;
  }
  static get tileDrawWidth() {
    if (Graphics.width < 1280) {
      if (tileWidth > 32) {
        return Math.floor(tileWidth / 2);
      }

      if (tileWidth <= 16) {
        return tileWidth * 2;
      }
    } else {
      if (tileWidth < 32) {
        return tileWidth * 2;
      }
    }

    return tileWidth;
  }
  static get tileHeight() {
    return tileHeight;
  }
  static set tileHeight(value) {
    tileHeight = value;
  }
  static get tileDrawHeight() {
    if (Graphics.width < 1280) {
      if (tileHeight > 32) {
        return Math.floor(tileHeight / 2);
      }

      if (tileHeight <= 16) {
        return tileHeight * 2;
      }
    } else {
      if (tileHeight < 32) {
        return tileHeight * 2;
      }
    }

    return tileHeight;
  }
  static get windowWidth() {
    return windowWidth;
  }
  static set windowWidth(value) {
    windowWidth = value;
  }

  static get isRightButtonDown() {
    return isRightButtonDown;
  }
  static set isRightButtonDown(value) {
    isRightButtonDown = value;
  }

  // the size of the rectangle tool when the user stretches it right
  static get rectangleWidth() { return rectangleWidth; }
  static set rectangleWidth(value) { rectangleWidth = value; }

  // The size of the rectangle tool when the user stretches it down
  static get rectangleHeight() { return rectangleHeight; }
  static set rectangleHeight(value) { rectangleHeight = value; }

  // the size of the rectangle tool when the user stretches it left
  static get rectangleBackWidth() { return rectangleBackWidth; }
  static set rectangleBackWidth(value) { rectangleBackWidth = value; }

  // The size of the rectangle tool when the user stretches it up
  static get rectangleBackHeight() { return rectangleBackHeight; }
  static set rectangleBackHeight(value) { rectangleBackHeight = value; }

  // The X tile where the rectangle started
  static get rectangleStartX() { return rectangleStartX; }
  static set rectangleStartX(value) { rectangleStartX = value; }

  // The Y tile where the rectangle started
  static get rectangleStartY() { return rectangleStartY; }
  static set rectangleStartY(value) { rectangleStartY = value; }

  static get tileCols() { return tileCols; }
  static set tileCols(value) { tileCols = value; }
  static get tileRows() { return tileRows; }
  static set tileRows(value) { tileRows = value; }

  // The Mouse X position where the rectangle started
  static get rectangleStartMouseX() { return rectangleStartMouseX; }
  static set rectangleStartMouseX(value) { rectangleStartMouseX = value; }

  // The Mouse Y position where the rectangle started
  static get rectangleStartMouseY() { return rectangleStartMouseY; }
  static set rectangleStartMouseY(value) { rectangleStartMouseY = value; }

  static get messySelection() { return messySelection; }
  static set messySelection(value) { messySelection = value; }

  static get changeHistory() { return changeHistory; }
  static get undoHistory() { return undoHistory; }
  static get layerVisibility() { return layerVisibility; }

  static get wasRightButtonDown() { return wasRightButtonDown; }
  static set wasRightButtonDown(value) { wasRightButtonDown = value; }
  static get wasPressing() { return wasPressing; }
  static set wasPressing(value) { wasPressing = value; }

  static get currentTool() { return currentTool; }
  static get currentLayer() { return currentLayer; }
  static get showGrid() { return showGrid; }
  static get previewChanges() { return previewChanges; }
  static get puzzleMode() { return puzzleMode; }

  static get currentTileId() { return currentTileId; }
  static set currentTileId(value) { currentTileId = value; }
  static get selectedTileList() { return selectedTileList; }
  static set selectedTileList(value) { selectedTileList = value; }
  static get multiLayerSelection() { return multiLayerSelection; }
  static set multiLayerSelection(value) { multiLayerSelection = value; }

  static get statusTileId() { return statusTileId; }
  static set statusTileId(value) { statusTileId = value; }
  static get statusMapX() { return statusMapX; }
  static set statusMapX(value) { statusMapX = value; }
  static get statusMapY() { return statusMapY; }
  static set statusMapY(value) { statusMapY = value; }
  static get statusTile1() { return statusTile1; }
  static set statusTile1(value) { statusTile1 = value; }
  static get statusTile2() { return statusTile2; }
  static set statusTile2(value) { statusTile2 = value; }
  static get statusTile3() { return statusTile3; }
  static set statusTile3(value) { statusTile3 = value; }
  static get statusTile4() { return statusTile4; }
  static set statusTile4(value) { statusTile4 = value; }
  static get statusRegion() { return statusRegion; }
  static get statusTag() { return statusTag; }
  static get statusCollision() { return statusCollision; }
  static get statusBush() { return statusBush; }
  static get statusCounter() { return statusCounter; }
  static get statusDamage() { return statusDamage; }
  static get statusLadder() { return statusLadder; }
  static get customCollisionTable() { return customCollisionTable; }
  static get tileBlendingTable() { return tileBlendingTable; }

  static get mapCaches() { return mapCaches; }

  static get currentZoom() { return currentZoom; }
  static set currentZoom(value) {
    currentZoom = value;
    $gameScreen._zoomScale = value;

    if (this.isMapEditorScene()) {
      $gameMap.zoom = new Point(value, value);
      SceneManager._scene._mapEditorGrid.refresh();
      SceneManager._scene._spriteset.updatePosition();
    }

    // if (Utils.isNwjs()) {
    //   this.zoom100Menu.checked = value === 1;
    //   this.zoom150Menu.checked = value === 1.5;
    //   this.zoom200Menu.checked = value === 2;
    //   this.zoom400Menu.checked = value === 4;
    // }
  }

  static get changingTileProps() {
    return tilePropTools.includes(currentTool);
  }

  static register() {
    super.initialize('CycloneMapEditor');

    this.structs.set('CycloneRegionIcon', {
      regionId: 'int',
      icon: 'int',
    });

    super.register({
      regionIcons: {
        type: 'struct<CycloneRegionIcon>[]',
        defaultValue: '[]',
      },
      showMapId: {
        type: 'boolean',
        defaultValue: true,
      },
      showTilesetId: {
        type: 'boolean',
        defaultValue: true,
      },
      showPosition: {
        type: 'boolean',
        defaultValue: true,
      },
      showCellTiles: {
        type: 'boolean',
        defaultValue: true,
      },
      showRegionId: {
        type: 'boolean',
        defaultValue: true,
      },
      showTag: {
        type: 'boolean',
        defaultValue: true,
      },
      showCollision: {
        type: 'boolean',
        defaultValue: true,
      },
      showLadder: {
        type: 'boolean',
        defaultValue: true,
      },
      showBush: {
        type: 'boolean',
        defaultValue: true,
      },
      showCounter: {
        type: 'boolean',
        defaultValue: true,
      },
      showDamageFloor: {
        type: 'boolean',
        defaultValue: true,
      },
      collisionStepCount: {
        type: 'int',
        defaultValue: 1,
      }
    });

    document.addEventListener('keydown', (...args) => {
      this.onKeyDown(...args);
    });
    document.addEventListener('keypress', (...args) => {
      this.onKeyPress(...args);
    });
    document.addEventListener('keyup', (...args) => {
      this.onKeyUp(...args);
    });

    const regionIcons = this.params.regionIcons;
    this.regionIcons = new Map();
    if (regionIcons) {
      for (const { regionId, icon } of regionIcons) {
        if (regionId && icon) {
          this.regionIcons.set(regionId, icon);
        }
      }
    }
  }

  static mapEditorScene() {
    return Scene_Map;
  }

  static isMapEditorScene() {
    return SceneManager._scene instanceof (this.mapEditorScene());
  }

  static makeMenuEvent(fn) {
    return () => {
      if (TouchInput.isPressed()) {
        return;
      }

      fn();
    };
  }

  static addFileMenu(menu) {
    const fileMenu = new nw.Menu();
    fileMenu.append(new nw.MenuItem( {
      label: 'Save Current Map',
      key: 's',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.saveButton();
      })
    }));
    fileMenu.append(new nw.MenuItem( {
      label: 'Reload Current Map',
      key: 'r',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.reloadButton();
      })
    }));

    fileMenu.append(new nw.MenuItem( {type: 'separator'}));
    fileMenu.append(new nw.MenuItem( {label: 'Exit', click: this.makeMenuEvent(() => {
      window.close();
    })}));

    menu.append(new nw.MenuItem({
      label: 'File',
      submenu: fileMenu,
    }));
  }

  static addEditMenu(menu) {
    const editMenu = new nw.Menu();
    editMenu.append(new nw.MenuItem( {
      label: 'Undo',
      key: 'z',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.undoButton();
      })
    }));
    editMenu.append(new nw.MenuItem( {
      label: 'Redo',
      key: 'y',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.redoButton();
      })
    }));
    editMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.showGridMenu = new nw.MenuItem( {
      label: 'Show Grid',
      type: 'checkbox',
      checked: showGrid,
      key: 'g',
      modifiers: 'ctrl',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.showGridButton();
      })
    });
    editMenu.append(this.showGridMenu);

    // const zoomMenu = new nw.Menu();
    // this.zoom100Menu = new nw.MenuItem({
    //   label: '100%',
    //   type: 'checkbox',
    //   checked: currentZoom === 1,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 1;

    //   }),
    // });
    // zoomMenu.append(this.zoom100Menu);
    // this.zoom150Menu = new nw.MenuItem({
    //   label: '150%',
    //   type: 'checkbox',
    //   checked: currentZoom === 1.5,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 1.5;

    //   }),
    // });
    // zoomMenu.append(this.zoom150Menu);
    // this.zoom200Menu = new nw.MenuItem({
    //   label: '200%',
    //   type: 'checkbox',
    //   checked: currentZoom === 2,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 2;

    //   }),
    // });
    // zoomMenu.append(this.zoom200Menu);

    // this.zoom400Menu = new nw.MenuItem({
    //   label: '400%',
    //   type: 'checkbox',
    //   checked: currentZoom === 4,
    //   click: this.makeMenuEvent(() => {
    //     this.currentZoom = 4;
    //   }),
    // });
    // zoomMenu.append(this.zoom400Menu);

    // editMenu.append(new nw.MenuItem({
    //   label: 'Zoom',
    //   submenu: zoomMenu,
    // }));

    menu.append(new nw.MenuItem({
      label: 'Edit',
      submenu: editMenu,
    }));
  }

  static addMapMenu(menu) {
    const mapMenu = new nw.Menu();
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Up',
      key: 'w',
      click: () => {
        $gameMap.scrollUp(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Left',
      key: 'a',
      click: () => {
        $gameMap.scrollLeft(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Down',
      key: 's',
      click: () => {
        $gameMap.scrollDown(3);
      },
    }));
    mapMenu.append(new nw.MenuItem({
      label: 'Scroll Right',
      key: 'd',
      click: () => {
        $gameMap.scrollRight(3);
      },
    }));

    menu.append(new nw.MenuItem({
      label: 'Map',
      submenu: mapMenu,
    }));
  }

  static addModeMenu(menu) {
    const modeMenu = new nw.Menu();
    this.pencilMenu = new nw.MenuItem( {
      label: 'Pencil',
      type: 'checkbox',
      checked: currentTool === 'pencil',
      key: 'p',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.pencilButton();
      })
    });
    modeMenu.append(this.pencilMenu);
    this.rectangleMenu = new nw.MenuItem( {
      label: 'Rectangle',
      type: 'checkbox',
      checked: currentTool === 'rectangle',
      key: 'r',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.rectangleButton();
      })
    });
    modeMenu.append(this.rectangleMenu);
    this.fillMenu = new nw.MenuItem( {
      label: 'Flood Fill',
      type: 'checkbox',
      checked: currentTool === 'fill',
      key: 'f',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.fillButton();
      })
    });
    modeMenu.append(this.fillMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.puzzleMenu = new nw.MenuItem( {
      label: 'Magic Mode',
      type: 'checkbox',
      checked: puzzleMode,
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.puzzleButton();
      })
    });
    modeMenu.append(this.puzzleMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));

    this.eraserMenu = new nw.MenuItem( {
      label: 'Eraser',
      type: 'checkbox',
      checked: currentTool === 'eraser',
      key: 'e',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.eraserButton();
      })
    });
    modeMenu.append(this.eraserMenu);
    modeMenu.append(new nw.MenuItem( {type: 'separator'}));

    const tilesetPropsMenu = new nw.Menu();
    this.tilePassageMenu = new nw.MenuItem({
      label: 'Passage',
      type: 'checkbox',
      checked: currentTool === Tools.passage,
      key: 'p',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.passage);
      }),
    });
    tilesetPropsMenu.append(this.tilePassageMenu);

    this.tilePassage4Menu = new nw.MenuItem({
      label: 'Passage (4 dir)',
      type: 'checkbox',
      checked: currentTool === Tools.passage4,
      key: 'o',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.passage4);
      }),
    });
    tilesetPropsMenu.append(this.tilePassage4Menu);

    this.tileLadderMenu = new nw.MenuItem({
      label: 'Ladder',
      type: 'checkbox',
      checked: currentTool === Tools.ladder,
      key: 'l',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.ladder);
      }),
    });
    tilesetPropsMenu.append(this.tileLadderMenu);

    this.tileBushMenu = new nw.MenuItem({
      label: 'Bush',
      type: 'checkbox',
      checked: currentTool === Tools.bush,
      key: 'b',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.bush);
      }),
    });
    tilesetPropsMenu.append(this.tileBushMenu);

    this.tileCounterMenu = new nw.MenuItem({
      label: 'Counter',
      type: 'checkbox',
      checked: currentTool === Tools.counter,
      key: 'c',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.counter);
      }),
    });
    tilesetPropsMenu.append(this.tileCounterMenu);

    this.tileDamageMenu = new nw.MenuItem({
      label: 'Damage',
      type: 'checkbox',
      checked: currentTool === Tools.damage,
      key: 'd',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.damage);
      }),
    });
    tilesetPropsMenu.append(this.tileDamageMenu);

    this.tileTerrainMenu = new nw.MenuItem({
      label: 'Terrain Tag',
      type: 'checkbox',
      checked: currentTool === Tools.terrain,
      key: 't',
      modifiers: 'shift',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.toolButton(Tools.terrain);
      }),
    });
    tilesetPropsMenu.append(this.tileTerrainMenu);

    modeMenu.append(new nw.MenuItem({
      label: 'Tile Properties',
      submenu: tilesetPropsMenu,
    }));

    menu.append(new nw.MenuItem({
      label: 'Mode',
      submenu: modeMenu,
    }));
  }

  static addLayerMenu(menu) {
    const layerMenu = new nw.Menu();
    this.autoLayerButton = new nw.MenuItem( {
      label: 'Automatic',
      type: 'checkbox',
      checked: currentLayer === 7,
      key: '0',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(7);
      })
    });
    this.layer1Button = new nw.MenuItem( {
      label: 'Layer 1',
      type: 'checkbox',
      checked: currentLayer === 0,
      key: '1',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(0);
      })
    });
    this.layer2Button = new nw.MenuItem( {
      label: 'Layer 2',
      type: 'checkbox',
      checked: currentLayer === 1,
      key: '2',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(1);
      })
    });
    this.layer3Button = new nw.MenuItem( {
      label: 'Layer 3',
      type: 'checkbox',
      checked: currentLayer === 2,
      key: '3',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(2);
      })
    });
    this.layer4Button = new nw.MenuItem( {
      label: 'Layer 4',
      type: 'checkbox',
      checked: currentLayer === 3,
      key: '4',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(3);
      })
    });
    layerMenu.append(this.autoLayerButton);
    layerMenu.append(this.layer1Button);
    layerMenu.append(this.layer2Button);
    layerMenu.append(this.layer3Button);
    layerMenu.append(this.layer4Button);

    layerMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.shadowsButton = new nw.MenuItem( {
      label: 'Shadows',
      type: 'checkbox',
      checked: currentLayer === 4,
      key: '5',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(4);
      })
    });
    layerMenu.append(this.shadowsButton);
    this.regionsButton = new nw.MenuItem( {
      label: 'Regions',
      type: 'checkbox',
      checked: currentLayer === 5,
      key: '6',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(5);
      })
    });
    layerMenu.append(this.regionsButton);
    this.eventsButton = new nw.MenuItem( {
      label: 'Events',
      type: 'checkbox',
      checked: currentLayer === 6,
      key: '7',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(6);
      })
    });
    layerMenu.append(this.eventsButton);
    layerMenu.append(new nw.MenuItem( {type: 'separator'}));
    this.collisionsButton = new nw.MenuItem( {
      label: 'Collisions',
      type: 'checkbox',
      checked: currentLayer === 8,
      key: '8',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(8);
      })
    });
    layerMenu.append(this.collisionsButton);
    this.tagsButton = new nw.MenuItem( {
      label: 'Tags',
      type: 'checkbox',
      checked: currentLayer === 9,
      key: '9',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(9);
      })
    });
    layerMenu.append(this.tagsButton);

    menu.append(new nw.MenuItem({
      label: 'Layer',
      submenu: layerMenu,
    }));
  }

  static addBlendMenu(menu) {
    const blendMenu = new nw.Menu();

    this.blendButton = new nw.MenuItem( {
      label: 'Blend Layer',
      type: 'checkbox',
      checked: currentLayer === 10,
      key: 'B',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.changeCurrentLayer(10);
        CycloneMapEditor$1.updateCurrentTool();
      })
    });
    blendMenu.append(this.blendButton);

    blendMenu.append(new nw.MenuItem( {type: 'separator'}));
    blendMenu.append(new nw.MenuItem( {
      label: 'Remove blend effect',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.removeAllBlendsButton();
      })
    }));
    blendMenu.append(new nw.MenuItem( {
      label: 'Optimize blend effect',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.optimizeBlendsButton();
      })
    }));


    menu.append(new nw.MenuItem({
      label: 'Blend',
      submenu: blendMenu,
    }));
  }

  static addTilesetMenu(menu) {
    const tilesetMenu = new nw.Menu();

    this._mainTilesetMenu = new nw.MenuItem({
      label: 'Main Tileset',
      enabled: false,
    });

    tilesetMenu.append(this._mainTilesetMenu);
    this._extraTilesetMenu = new nw.Menu();

    for (const tileset of $dataTilesets) {
      if (!tileset) {
        continue;
      }

      const tilesetNames = tileset.tilesetNames;
      if (!tilesetNames[5] && !tilesetNames[6]) {
        continue;
      }

      const menuItem = new nw.MenuItem({
        label: `${ tileset.id.padZero(4) } ${ tileset.name }`,
        enabled: true,
        type: 'checkbox',
        click: this.makeMenuEvent(() => {
          this.toggleTileset(tileset.id);
        }),
      });

      this._extraTilesetMenu.append(menuItem);
    }

    this._extraTilesetMenuItem = new nw.MenuItem({
      label: 'Extra Tileset',
      submenu: this._extraTilesetMenu,
    });

    tilesetMenu.append(this._extraTilesetMenuItem);

    menu.append(new nw.MenuItem({
      label: 'Tilesets',
      submenu: tilesetMenu,
    }));
  }

  static addJumpMenu(menu) {
    const a1 = Tilemap.TILE_ID_A1;
    const a2 = Tilemap.TILE_ID_A2;
    const a3 = Tilemap.TILE_ID_A3;
    const a4 = Tilemap.TILE_ID_A4;
    const b = Tilemap.TILE_ID_B;
    const c = Tilemap.TILE_ID_C;
    const d = Tilemap.TILE_ID_D;
    const e = Tilemap.TILE_ID_E;
    const f = Tilemap.TILE_ID_E + 256;
    const g = Tilemap.TILE_ID_E + 512;
    const a5 = Tilemap.TILE_ID_A5;
    const h = Tilemap.TILE_ID_A5 + 256;

    const jumpToTabMenu = new nw.Menu();
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'AutoTiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([a1, a2, a3, a4]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'A5 Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToTile(a5);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'B Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([b, c, d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'C Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([c, d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'D Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([d, e, f, g, a5]);
      }),
    }));
    jumpToTabMenu.append(new nw.MenuItem({
      label: 'E Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([e, f, g, a5]);
      }),
    }));
    this._jumpToExtraBMenu = new nw.MenuItem({
      label: 'Extra B Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([f, g, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraBMenu);
    this._jumpToExtraCMenu = new nw.MenuItem({
      label: 'Extra C Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([g, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraCMenu);
    this._jumpToExtraDMenu = new nw.MenuItem({
      label: 'Extra D Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.jumpToOneTileOf([h, a5]);
      }),
    });
    jumpToTabMenu.append(this._jumpToExtraDMenu);

    menu.append(new nw.MenuItem({
      label: 'Jump To',
      submenu: jumpToTabMenu,
    }));
  }

  static refreshTilesetMenu() {
    if (!this._extraTilesetMenu) {
      return;
    }

    const tileset = $gameMap.tileset();
    this._mainTilesetMenu.label = `${ tileset.id.padZero(4) } ${ tileset.name }`;

    for (const item of this._extraTilesetMenu.items) {
      const id = parseInt(item.label.substring(0, 4), 10);
      if (id === $gameMap._tilesetId) {
        item.checked = false;
        item.enabled = false;
        continue;
      }

      item.enabled = true;
      item.checked = $gameMap._extraTilesetId === id;
    }
  }

  static addToolsMenu(menu) {
    const toolsMenu = new nw.Menu();

    const resizeTilesets = new nw.MenuItem({
      label: 'Generate 48x48 Tilesets',
      enabled: $gameMap.tileWidth() !== 48 || $gameMap.tileHeight() !== 48,
      click: this.makeMenuEvent(() => {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();

        let message;

        if (globalThis.CycloneMaps && CycloneMaps.params.tilesetPath) {
          const realPath = CycloneMaps.params.tilesetPath;
          const fakePath = 'img/tilesets/';
          message = `This option will replace the 48x48 files on ${ fakePath } with resized copies of the ${ width }x${ height } files on ${ realPath }. Are you SURE you want to do this?`;
        } else {
          message = `This option will replace the files on /img/tilesets with resized copies of your ${ width }x${ height } tilesets. Are you SURE you want to do this?`;
        }

        CycloneMapEditor$1.resizeTilesets(message);
      }),
    });

    toolsMenu.append(resizeTilesets);
    menu.append(new nw.MenuItem({
      label: 'Tools',
      submenu: toolsMenu,
    }));
  }

  static addExportMenu(menu) {
    const exportMenu = new nw.Menu();
    const exportLayersMenu = new nw.Menu();
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 1',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportSingleLayer(0);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 2',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportSingleLayer(1);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 3',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportSingleLayer(2);
      }),
    }));
    exportLayersMenu.append(new nw.MenuItem({
      label: 'Layer 4',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportSingleLayer(3);
      }),
    }));

    exportMenu.append(new nw.MenuItem({
      label: 'Layers',
      submenu: exportLayersMenu,
    }));

    const exportRenderedMapMenu = new nw.Menu();
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Lower Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportLowerTiles();
      }),
    }));
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Upper Tiles',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportUpperTiles();
      }),
    }));
    exportRenderedMapMenu.append(new nw.MenuItem( {type: 'separator'}));
    exportRenderedMapMenu.append(new nw.MenuItem({
      label: 'Whole Map',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportWholeMap();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Rendered Map',
      submenu: exportRenderedMapMenu,
    }));

    const exportEventsMenu = new nw.Menu();
    exportEventsMenu.append(new nw.MenuItem({
      label: 'Low Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportLowEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'Normal Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportNormalEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'High Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportHighEvents();
      }),
    }));
    exportEventsMenu.append(new nw.MenuItem( {type: 'separator'}));
    exportEventsMenu.append(new nw.MenuItem({
      label: 'All Events',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportAllEvents();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Events',
      submenu: exportEventsMenu,
    }));

    const exportCollisionsMenu = new nw.Menu();
    exportCollisionsMenu.append(new nw.MenuItem({
      label: 'Custom Collision',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportCustomCollision();
      }),
    }));
    exportCollisionsMenu.append(new nw.MenuItem({
      label: 'Full Collision',
      click: this.makeMenuEvent(() => {
        CycloneMapEditor$1.exportFullCollision();
      }),
    }));
    exportMenu.append(new nw.MenuItem({
      label: 'Collision',
      submenu: exportCollisionsMenu,
    }));

    menu.append(new nw.MenuItem({
      label: 'Export',
      submenu: exportMenu,
    }));
  }

  static addHelpMenu(menu) {
    const helpMenu = new nw.Menu();
    helpMenu.append(new nw.MenuItem( {
      label: 'Plugin Page',
      key: 'F1',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://makerdevs.com/plugin/cyclone-map-editor');
      }),
    }));

    helpMenu.append(new nw.MenuItem( {
      label: 'Extra Tilesets Add-on',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-extra-tilesets');
      }),
    }));

    helpMenu.append(new nw.MenuItem( {
      label: 'Magic (Tile Blend) Add-on',
      click: this.makeMenuEvent(() => {
        if (!globalThis.require) {
          return;
        }

        require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-magic');
      }),
    }));

    menu.append(new nw.MenuItem({
      label: 'Help',
      submenu: helpMenu,
    }));
  }

  static addMenuBar() {
    if (!Utils.isNwjs()) {
      return;
    }
    if (this.menu) {
      return this.refreshMenuVisibility();
    }

    const menu = new nw.Menu({ type: 'menubar' });

    this.addFileMenu(menu);
    this.addEditMenu(menu);
    this.addMapMenu(menu);
    this.addModeMenu(menu);
    this.addLayerMenu(menu);
    this.addBlendMenu(menu);
    this.addTilesetMenu(menu);
    this.addJumpMenu(menu);
    this.addToolsMenu(menu);
    this.addExportMenu(menu);
    this.addHelpMenu(menu);

    this.menu = menu;
    this.refreshTilesetMenu();
    this.refreshMenuVisibility();
  }

  static clearAllData() {
    changeHistory = [];
    undoHistory = [];
    rectangleStartMouseX = 0;
    rectangleStartMouseY = 0;
    rectangleStartX = 0;
    rectangleStartY = 0;
    rectangleWidth = 0;
    rectangleHeight = 0;
    rectangleBackWidth = 0;
    rectangleBackHeight = 0;
    customCollisionTable = {};
    tileBlendingTable = {};

    this.clearSelection();
  }

  static toggleTileset(id) {
    if ($gameMap._extraTilesetId === id) {
      $gameMap._extraTilesetId = 0;
    } else {
      $gameMap._extraTilesetId = id;
    }

    $gameMap.buildTilesetFlags && $gameMap.buildTilesetFlags();

    this.refreshTilesetMenu();
    this.refreshMapEditor();

    if (!this.jumpToTile(Tilemap.TILE_ID_E + 256) && !this.jumpToTile(Tilemap.TILE_ID_E + 512)) {
      this.jumpToLastTile();
    }
  }

  static applyExtraData(data) {
    customCollisionTable = {};
    tileBlendingTable = {};
    $gameMap._extraTilesetId = 0;

    const radix = data?.radix || 10;

    if (data?.collision) {
      for (let i = 0; i < data.collision.length; i++) {
        const col = parseInt(data.collision[i], radix) || 0;
        if (col) {
          customCollisionTable[i] = col;
        }
      }
    }

    if (data?.magic) {
      for (let tileId in data.magic) {
        if (!data.magic[tileId]) {
          continue;
        }

        const line = data.magic[tileId];
        const buffer = new ArrayBuffer(line.length);
        const list = new Uint8Array(buffer);
        for (let i = line.indexOf('1'); i < line.length; i++) {
          if (line[i] !== '0') {
            list[i] = Number(line[i]);
          }
        }
        tileBlendingTable[tileId] = list;
      }
    }

    if (data?.extraTilesetId) {
      $gameMap._extraTilesetId = data.extraTilesetId;
    }

    this.refreshTilesetMenu();
    this.refreshMapEditor();
  }

  static dataVersion() {
    return '02';
  }

  static compress(data) {
    return `v=${ this.dataVersion() };` + LZString.compressToBase64(data);
  }

  static decompress(data) {
    if (!data.startsWith('v=')) {
      return LZString.decompress(data);
    }

    const idx = data.indexOf(';') + 1;
    return LZString.decompressFromBase64(data.substring(idx));
  }

  static parseExtraData(note) {
    let json;
    try {
      json = this.decompress(note);
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
      console.error('Failed to parse extra data.');
      console.log(json);
      console.log(e);
      return;
    }

    this.applyExtraData(data);
  }

  static loadExtraData() {
    // Check if there's any event called CycloneMapEditor
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      this.parseExtraData(event.note);
      return;
    }
  }

  static getExtraData() {
    const radix = 36;
    const collision = new Array($dataMap.width * $dataMap.height * 16);
    for (let i = 0; i < collision.length; i++) {
      if (customCollisionTable[i]) {
        if (customCollisionTable[i] >= radix) {
          throw new Error('Invalid collision value: ', customCollisionTable[i]);
        }

        collision[i] = Number(customCollisionTable[i]).toString(radix);
      } else {
        collision[i] = '0';
      }
    }
    const magic = {};
    for (const tileId in tileBlendingTable) {
      if (!tileBlendingTable[tileId]) {
        continue;
      }
      const line = tileBlendingTable[tileId].join('');
      if (!line.includes('1')) {
        continue;
      }
      magic[tileId] = line;
    }

    const puzzle = window.CycloneMagic?.puzzleTiles || undefined;

    return {
      radix,
      collision: collision.join(''),
      magic,
      puzzle,
      extraTilesetId: $gameMap._extraTilesetId,
    };
  }

  static getExtraDataJson() {
    return this.compress(JSON.stringify(this.getExtraData(), null, 0));
  }

  static saveExtraData() {
    const data = this.getExtraDataJson();
    // Check if there's any event called CycloneMapEditor
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      event.note = data;
      return;
    }

    // Create a new event then
    $dataMap.events.push({
      id: $dataMap.events.length,
      name: 'CycloneMapEditor',
      note: data,
      pages: [],
      x: $dataMap.width,
      y: $dataMap.height,
    });
  }

  static clearSelection() {
    currentTileId = undefined;
    tileCols = 1;
    tileRows = 1;
    selectedTileList = [];
    multiLayerSelection = [];
  }

  static shouldDisplayMenu() {
    if (!editorActive) {
      return false;
    }

    if (!this.isMapEditorScene()) {
      return false;
    }

    return true;
  }

  static isFullScreen() {
    return Graphics._isFullScreen();
  }

  static refreshScreenSize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    if (this.isFullScreen()) {
      return;
    }

    this.resizeTimeout = setTimeout(() => {
      // Adds a second timeout to block the show/hide functionality for a little while
      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = false;
      }, 500);

      const xDelta = Graphics.width - window.innerWidth;
      const yDelta = Graphics.height - window.innerHeight;
      if (xDelta !== 0 || yDelta !== 0) {
        window.moveBy(-xDelta / 2, -yDelta / 2);
        window.resizeBy(xDelta, yDelta);
      }
    }, 20);
  }

  static enablePluginOptions() {
    if (this.blendButton) {
      this.blendButton.enabled = Boolean(window.CycloneMagic);
    }
    if (this.puzzleMenu) {
      this.puzzleMenu.enabled = Boolean(window.CycloneMagic);
    }
    if (this._extraTilesetMenuItem) {
      this._extraTilesetMenuItem.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraBMenu) {
      this._jumpToExtraBMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraCMenu) {
      this._jumpToExtraCMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
    if (this._jumpToExtraDMenu) {
      this._jumpToExtraDMenu.enabled = Boolean(window.CycloneExtraTilesets);
    }
  }

  static refreshMenuVisibility() {
    if (!Utils.isNwjs()) {
      return;
    }

    const display = this.shouldDisplayMenu();
    const win = nw.Window.get();

    this.enablePluginOptions();
    if (display && win.menu === this.menu) {
      return;
    }

    if (display) {
      win.menu = this.menu;
    } else {
      win.menu = null;
    }

    this.refreshScreenSize();
  }

  static logImage(canvas, text) {
    logImage(canvas, text);
  }

  static isTabValid(tab) {
    const tileset = $gameMap.tileset();
    if (!tileset) {
      return false;
    }

    const names = tileset.tilesetNames;

    if (tab === 'A') {
      return Boolean(names[0] || names[1] || names[2] || names[3] || names[4]);
    }

    const tilesetIndex = tabs.indexOf(tab) + 4;
    return Boolean(names[tilesetIndex]);
  }

  static validTabs() {
    return tabs.filter(tab => this.isTabValid(tab));
  }

  static areRegionsVisible() {
    return layerVisibility[5];
  }

  static isLayerVisible(index) {
    if (index >= 8 && index <= 10) {
      return currentLayer === index;
    }

    if (index === 7) {
      return true;
    }

    return layerVisibility[index];
  }

  static selectPreviousTab() {
    const validTabs = this.validTabs();
    const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

    const index = oldIndex === 0 ? validTabs.length -1 : oldIndex -1;
    this.changeCurrentTab(validTabs[index % validTabs.length]);
  }

  static selectNextTab() {
    const validTabs = this.validTabs();
    const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

    const index = oldIndex +1;
    this.changeCurrentTab(validTabs[index % validTabs.length]);
  }

  static onKeyDown(event) {
    if (!editorActive) {
      return;
    }

    // const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    if (event.keyCode === 8 || event.keyCode === 46) {
      this.eraserButton();
      return;
    }

    if (event.keyCode === 33) {
      this.selectPreviousTab();
      return;
    }

    if (event.keyCode === 34) {
      this.selectNextTab();
      return;
    }
  }

  static checkNumKeys(code) {
    switch(code) {
      case 'Numpad0':
        this.changeCurrentLayer(7);
        break;
      case 'Numpad1':
        this.changeCurrentLayer(0);
        break;
      case 'Numpad2':
        this.changeCurrentLayer(1);
        break;
      case 'Numpad3':
        this.changeCurrentLayer(2);
        break;
      case 'Numpad4':
        this.changeCurrentLayer(3);
        break;
      case 'Numpad5':
        this.changeCurrentLayer(4);
        break;
      case 'Numpad6':
        this.changeCurrentLayer(5);
        break;
      case 'Numpad7':
        this.changeCurrentLayer(6);
        break;
      case 'Numpad8':
        this.changeCurrentLayer(8);
        break;
      case 'Numpad9':
        this.changeCurrentLayer(9);
        break;
    }
  }

  static checkLayerKeys(key) {
    switch(key) {
      case '0':
        this.changeCurrentLayer(7);
        break;
      case '1':
        this.changeCurrentLayer(0);
        break;
      case '2':
        this.changeCurrentLayer(1);
        break;
      case '3':
        this.changeCurrentLayer(2);
        break;
      case '4':
        this.changeCurrentLayer(3);
        break;
      case '5':
        this.changeCurrentLayer(4);
        break;
      case '6':
        this.changeCurrentLayer(5);
        break;
      case '8':
        this.changeCurrentLayer(8);
        break;
      case '9':
        this.changeCurrentLayer(9);
        break;
    }
  }

  static checkScrollKeys(key) {
    switch(key.toLowerCase()) {
      case 'w':
        $gameMap.scrollUp(3);
        break;
      case 'a':
        $gameMap.scrollLeft(3);
        break;
      case 's':
        $gameMap.scrollDown(3);
        break;
      case 'd':
        $gameMap.scrollRight(3);
        break;
    }
  }

  static sceneToReload() {
    return Scene_Map;
  }

  static loadMapFile() {
    SceneManager._scene._mapEditorCommands.hide();
    delete mapCaches[$gameMap._mapId];
    const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;

    const xhr = new XMLHttpRequest();
    const url = `data/${ fileName }`;

    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);

        // eslint-disable-next-line no-global-assign
        $dataMap = data;
        SoundManager.playLoad();
        SceneManager.goto(this.sceneToReload());
      } catch (e) {
        alert('Failed to parse map data.');
        SceneManager._scene.refreshMapEditorWindows();
      }
    };
    xhr.onerror = () => {
      alert('Failed to load map file from disk.');
      SceneManager._scene.refreshMapEditorWindows();
    };

    xhr.send();
  }

  static downloadMapshot(bitmap, fileName) {
    const imageType = 'png';
    const imageQuality = 1;

    const urlData = bitmap.canvas.toDataURL(imageType, imageQuality);
    const strippedData = urlData.replace(/^data:image\/png;base64,/, '');

    const data = atob(strippedData);
    const buffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < data.length; i++) {
      view[i] = data.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);

    let iframe = document.getElementsByName('image_download')[0];
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('name', 'image_download');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName + '.png');
    element.setAttribute('target', 'image_download');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static resizeTilesets(message) {
    const tileset = $dataTilesets[$dataMap.tilesetId];
    if (!tileset) {
      return alert('Tileset data not found.');
    }

    if (!Utils.isNwjs()) {
      return alert('This feature can only be used on a computer with a non web-version.');
    }

    const fileNames = tileset.tilesetNames;
    const existingFiles = [];
    const fs = require('fs');

    for (const fileName of fileNames) {
      if (!fileName) {
        continue;
      }

      if (fs.existsSync(`img/tilesets/${ fileName }.png`)) {
        existingFiles.push(fileName);
      }
    }

    if (existingFiles.length) {
      const overwrittenFilesMessage = `Files that will be replaced: ${ existingFiles.join(', ') }`;
      const newMessage = `${ message }\n${ overwrittenFilesMessage}`;
      if (!confirm(newMessage)) {
        return;
      }
    }

    this.doResizeTiles(fileNames);
  }

  static doResizeTiles(fileNames) {
    const width = $gameMap.tileWidth();
    const height = $gameMap.tileHeight();
    const fs = require('fs');

    for (const fileName of fileNames) {
      if (!fileName) {
        continue;
      }

      const bitmap = ImageManager.loadTileset(fileName);
      if (!bitmap) {
        continue;
      }

      const newWidth = Math.floor(bitmap.width / width * 48);
      const newHeight = Math.floor(bitmap.height / height * 48);

      const newBitmap = new Bitmap(newWidth, newHeight);
      newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newWidth, newHeight);

      const urlData = newBitmap.canvas.toDataURL('image/png', 70);
      const base64Data = urlData.replace(/^data:image\/png;base64,/, '');

      fs.writeFileSync(`img/tilesets/${ fileName }.png`, base64Data, 'base64');
    }
  }

  static exportSingleLayer(layerIndex) {
    const tilemap = new MapshotTileMap();
    tilemap.drawSingleLayer(layerIndex);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Layer${ layerIndex + 1 }`);
  }

  static exportLowerTiles() {
    const tilemap = new MapshotTileMap();
    tilemap.drawLowerTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Lower`);
  }

  static exportUpperTiles() {
    const tilemap = new MapshotTileMap();
    tilemap.drawUpperTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Upper`);
  }

  static exportWholeMap() {
    const tilemap = new MapshotTileMap();
    tilemap.drawLowerTiles();
    tilemap.drawUpperTiles();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }`);
  }

  static exportLowEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(0);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_0`);
  }

  static exportNormalEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(1);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_1`);
  }

  static exportHighEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents(2);

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events_2`);
  }

  static exportAllEvents() {
    const tilemap = new MapshotTileMap();
    tilemap.drawEvents();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Events`);
  }

  static exportCustomCollision() {
    const tilemap = new MapshotTileMap();
    tilemap.drawCustomCollision();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_Collision`);
  }

  static exportFullCollision() {
    const tilemap = new MapshotTileMap();
    tilemap.drawDefaultCollision();
    tilemap.drawCustomCollision();

    this.downloadMapshot(tilemap, `Map${ $gameMap._mapId.padZero(3) }_FullCollision`);
  }

  static undoButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (changeHistory.length) {
      this.undoLastChange();
    }
  }

  static redoButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (undoHistory.length) {
      this.redoLastUndoneChange();
    }
  }

  static removeAllBlendsButton() {
    if (confirm('Are you sure you want to remove all blend effects on this map?')) {
      this.removeAllBlends();
    }
  }

  static optimizeBlendsButton() {
    if (confirm('This option will remove the blend from tiles that are completely hidden by the effect and change the tile itself to transparent. Optimize now?')) {
      this.optimizeBlends();
    }
  }

  // eslint-disable-next-line complexity
  static getCollisionSymbol(x, y) {
    const downCollision = !$gameMap.isPassable(x, y, 2);
    const leftCollision = !$gameMap.isPassable(x, y, 4);
    const rightCollision = !$gameMap.isPassable(x, y, 6);
    const upCollision = !$gameMap.isPassable(x, y, 8);

    if (downCollision && leftCollision && rightCollision && upCollision) {
      return 'X';
    }

    if (!downCollision && !leftCollision && !rightCollision && !downCollision) {
      return 'O';
    }

    let collisions = '';
    if (downCollision) {
      collisions += 'd:X ';
    } else {
      collisions += 'd:O ';
    }

    if (leftCollision) {
      collisions += 'l:X ';
    } else {
      collisions += 'l:O ';
    }
    if (rightCollision) {
      collisions += 'r:X ';
    } else {
      collisions += 'r:O ';
    }
    if (upCollision) {
      collisions += 'u:X ';
    } else {
      collisions += 'u:O ';
    }

    return collisions;
  }

  // eslint-disable-next-line complexity
  static updateStatus({ tileId, mapX, mapY, tile1, tile2, tile3, tile4 } = {}) {
    const oldTileId = statusTileId;
    const oldX = statusMapX;
    const oldY = statusMapY;
    const oldTile1 = statusTile1;
    const oldTile2 = statusTile2;
    const oldTile3 = statusTile3;
    const oldTile4 = statusTile4;

    statusTileId = tileId ?? statusTileId;
    statusMapX = mapX ?? statusMapX;
    statusMapY = mapY ?? statusMapY;
    statusTile1 = tile1 ?? statusTile1;
    statusTile2 = tile2 ?? statusTile2;
    statusTile3 = tile3 ?? statusTile3;
    statusTile4 = tile4 ?? statusTile4;

    const changedPos = oldX !== statusMapX || oldY !== statusMapY;
    if (changedPos) {
      statusRegion = $gameMap.regionId(statusMapX, statusMapY);
      statusTag = $gameMap.terrainTag(statusMapX, statusMapY);
      statusBush = $gameMap.isBush(statusMapX, statusMapY);
      statusCounter = $gameMap.isCounter(statusMapX, statusMapY);
      statusDamage = $gameMap.isDamageFloor(statusMapX, statusMapY);
      statusLadder = $gameMap.isLadder(statusMapX, statusMapY);
      statusCollision = this.getCollisionSymbol(statusMapX, statusMapY);
    }

    const changedTile = oldTile1 !== statusTile1 || oldTile2 !== statusTile2 || oldTile3 !== statusTile3 || oldTile4 !== statusTile4;
    const changed = changedTile || oldTileId !== statusTileId || changedPos;
    if (!changed) {
      return;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorStatus.refresh();
    }
  }

  static showGridButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    showGrid = !showGrid;
    this.showGridButton.checked = showGrid;
    SceneManager._scene._mapEditorGrid.refresh();
  }

  static selectHigherLayer(x, y) {
    if (currentLayer === Layers.collisions) {
      return;
    }

    for (let z = 3; z >= 0; z--) {
      const tileIndex = this.tileIndex(x, y, z);
      const tileId = $dataMap.data[tileIndex];

      if (tileId) {
        this.changeCurrentLayer(z);
        return;
      }
    }
  }

  static updateCurrentTool() {
    rectangleWidth = 0;
    rectangleHeight = 0;
    rectangleBackWidth = 0;
    rectangleBackHeight = 0;
    rectangleStartX = 0;
    rectangleStartY = 0;
    rectangleStartMouseX = 0;
    rectangleStartMouseY = 0;

    if (Utils.isNwjs()) {
      this.pencilMenu.checked = currentTool === Tools.pencil;
      this.rectangleMenu.checked = currentTool === Tools.rectangle;
      this.fillMenu.checked = currentTool === Tools.fill;
      this.puzzleMenu.checked = puzzleMode;
      this.eraserMenu.checked = currentTool === Tools.eraser;

      this.tilePassageMenu.checked = currentTool === Tools.passage;
      this.tilePassage4Menu.checked = currentTool === Tools.passage4;
      this.tileLadderMenu.checked = currentTool === Tools.ladder;
      this.tileBushMenu.checked = currentTool === Tools.bush;
      this.tileCounterMenu.checked = currentTool === Tools.counter;
      this.tileDamageMenu.checked = currentTool === Tools.damage;
      this.tileTerrainMenu.checked = currentTool === Tools.terrain;
    }

    this.refreshMapEditor();
  }

  static pencilButton() {
    this.toolButton(Tools.pencil);
  }

  static rectangleButton() {
    this.toolButton(Tools.rectangle);
  }

  static fillButton() {
    this.toolButton(Tools.fill);
  }

  static eraserButton() {
    this.toolButton(Tools.eraser);
  }

  static puzzleButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    puzzleMode = !puzzleMode;
    if (puzzleMode) {
      if (currentTool !== Tools.eraser) {
        currentTool = Tools.pencil;
      }
      if (CycloneMapEditor$1.currentLayer !== 1) {
        this.changeCurrentLayer(1);
      }
    }
    this.clearSelection();
    this.updateCurrentTool();
  }

  static toolButton(toolType) {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (puzzleMode && ![Tools.pencil, Tools.eraser].includes(toolType)) {
      return;
    }

    currentTool = toolType;
    if ([Tools.pencil, Tools.rectangle].includes(toolType)) {
      lastDrawingTool = toolType;
    }
    this.updateCurrentTool();
  }

  static _doWebSave(json, fileName) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${ encodeURIComponent(json) }`);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static _doLocalSave(json, fileName) {
    const fs = require('fs');
    const path = require('path');

    const projectFolder = path.dirname(process.mainModule.filename);
    const dataFolder = path.join(projectFolder, 'data');

    const filePath = path.join(dataFolder, fileName);

    fs.writeFileSync(filePath, json);
  }

  static _makeMapJson() {
    const map = {
      ...$dataMap,
      data: [
        ...$dataMap.data,
      ]
    };

    const size = map.width * map.height;
    const extraTiles = new Array(size * 4);
    let anyExtraTile = false;

    for (let i = 0; i < extraTiles.length; i++) {
      if (map.data[i] >= Tilemap.TILE_ID_E + 256 && map.data[i] < Tilemap.TILE_ID_A5) {
        extraTiles[i] = map.data[i];
        map.data[i] = 0;
        anyExtraTile = true;
      } else if (map.data[i] >= Tilemap.TILE_ID_A5 + 256 && map.data[i] < Tilemap.TILE_ID_A1) {
        extraTiles[i] = map.data[i];
        map.data[i] = 0;
        anyExtraTile = true;
      } else {
        extraTiles[i] = 0;
      }
    }

    let extraTilesTag = '';

    if (anyExtraTile) {
      const compressed = LZString.compressToBase64(JSON.stringify(extraTiles, null, 0));

      extraTilesTag = `<CycloneExtraTiles>${ compressed }</CycloneExtraTiles>`;
    }

    if (map.note?.includes('<CycloneExtraTiles>')) {
      map.note = map.note.replace(/<CycloneExtraTiles>.*<\/CycloneExtraTiles>/i, extraTilesTag);
    } else {
      map.note = `${ map.note ?? ''}\n${ extraTilesTag }`;
    }

    return JSON.stringify(map, null, 0);
  }

  static _doSave() {
    this.saveExtraData();

    const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;
    const json = this._makeMapJson();

    if (Utils.isNwjs()) {
      this._doLocalSave(json, fileName);
    } else {
      this._doWebSave(json, fileName);
    }
    SoundManager.playSave();
  }

  static saveButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (!confirm('Are you sure you want to SAVE the map file?')) {
      SceneManager._scene.refreshMapEditorWindows();
      return;
    }

    SceneManager._scene._mapEditorCommands.hide();

    this._doSave();
    SceneManager._scene.refreshMapEditorWindows();
  }

  static reloadButton() {
    if (!this.isMapEditorScene()) {
      return;
    }

    if (!confirm('Are you sure you want to RELOAD the map file?')) {
      SceneManager._scene.refreshMapEditorWindows();
      return;
    }

    this.clearAllData();
    this.loadMapFile();
  }

  static onKeyPress(event) {
    if (editorActive) {
      if (!Utils.isNwjs()) {
        this.checkScrollKeys(event.key);
      }
    }
  }

  static checkWebShortcuts(key) {
    switch (key) {
      case 'e':
        return this.eraserButton();
      case 'r':
        return this.rectangleButton();
      case 'p':
        return this.pencilButton();
      case 'f':
        return this.fillButton();
    }

  }

  static checkControlKeys(code) {
    switch (code) {
      case 'KeyZ':
        this.undoButton();
        return true;
      case 'KeyY':
        this.redoButton();
        return true;
      case 'KeyS':
        this.saveButton();
        return true;
      case 'KeyR':
        this.reloadButton();
        return true;
      case 'KeyG':
        this.showGridButton();
        return true;
    }
  }

  static onKeyUp(event) {
    if (!Utils.isNwjs()) {
      if (Input.isPressed('shift') || Input.isPressed('control')) {
        if (this.checkControlKeys(event.code)) {
          event.preventDefault();
        }
        return;
      }

      this.checkWebShortcuts(event.key);
      this.checkLayerKeys(event.key);
    }

    if (event.key === 'h') {
      this.toggleMapEditor();
      return;
    }

    this.checkNumKeys(event.code);
  }

  static toggleMapEditor() {
    if (this.resizeTimeout) {
      return;
    }

    const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    scene.toggleMapEditor();
  }

  static refreshMapEditor() {
    const scene = SceneManager._scene;
    if (!this.isMapEditorScene()) {
      return;
    }

    scene.refreshMapEditorWindows();
  }

  static getTileIdTilesetIndex(tileId) {
    if (tileId !== 0) {
      if (!Tilemap.isVisibleTile(tileId)) {
        return -1;
      }
    }

    return getTilesetIndex(tileId);
  }

  static getTilesetName(tileId) {
    const tileset = $gameMap.tileset();
    if (!tileset) {
      return;
    }

    const tilesetIndex = this.getTileIdTilesetIndex(tileId);
    if (tilesetIndex < 0) {
      return;
    }

    if (tilesetIndex < tileset.tilesetNames.length) {
      return tileset.tilesetNames[tilesetIndex];
    }

    if (!window.CycloneExtraTilesets) {
      return;
    }

    const extraTileset = $gameMap.extraTileset();
    if (!extraTileset) {
      return;
    }

    const extraIndex = tilesetIndex - 9;
    const newIndex = extraIndex + 5;

    return extraTileset.tilesetNames[newIndex];
  }

  static loadTilesetBitmap(tileId) {
    const realFileName = this.getTilesetName(tileId);
    if (realFileName) {
      return ImageManager.loadTileset(realFileName);
    }
  }

  static deselectShadowOrRegion(newLayerIndex) {
    // coming from or to shadows/regions, then de-select the current index
    if (currentLayer === 4 || currentLayer === 5 || newLayerIndex === 4 || newLayerIndex === 5) {
      this.clearSelection();
    }
  }

  static changeCurrentLayer(newIndex) {
    if (newIndex >= layerVisibility.length) {
      return;
    }

    if (newIndex !== 1 && puzzleMode) {
      puzzleMode = false;
      this.updateCurrentTool();
    }

    this.deselectShadowOrRegion(newIndex);

    currentLayer = newIndex;
    if (Utils.isNwjs()) {
      this.layer1Button.checked = newIndex === 0;
      this.layer2Button.checked = newIndex === 1;
      this.layer3Button.checked = newIndex === 2;
      this.layer4Button.checked = newIndex === 3;
      this.shadowsButton.checked = newIndex === 4;
      this.regionsButton.checked = newIndex === 5;
      this.eventsButton.checked = newIndex === 6;
      this.autoLayerButton.checked = newIndex === 7;
      this.collisionsButton.checked = newIndex === 8;
      this.tagsButton.checked = newIndex === 9;
      this.blendButton.checked = newIndex === 10;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorLayerListWindow.refresh();
      SceneManager._scene._mapEditorWindow.refresh();
      SceneManager._scene._mapEditorStatus.refresh();
      SceneManager._scene._mapEditorGrid.refresh();
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }
  }

  static changeCurrentTab(tabLetter) {
    currentTab = tabLetter;
    this.refreshMapEditor();
  }

  static tileIndex(x, y, z) {
    return (z * $gameMap.height() + (y % $gameMap.height())) * $gameMap.width() + (x % $gameMap.width());
  }

  static indexPositionX(index, z) {
    const y = this.indexPositionY(index, z);
    return index - this.tileIndex(0, y, z);
  }

  static indexPositionY(index, z) {
    return Math.floor((index / $gameMap.width()) - (z * $gameMap.height()));
  }

  static getCurrentTileAtPosition(x, y, z, skipPreview = true) {
    if (x < 0 || y < 0 || x >= $gameMap.width() || y >= $gameMap.height()) {
      return 0;
    }

    const tileIndex = this.tileIndex(x, y, z);
    if (!skipPreview) {
      if (previewChanges[tileIndex] !== undefined) {
        return previewChanges[tileIndex];
      }
    }

    return $dataMap.data[tileIndex] ?? 0;
  }

  static isSameKindTile(tileId, x, y, z, skipPreview = true) {
    return Tilemap.isSameKindTile(tileId, this.getCurrentTileAtPosition(x, y, z, skipPreview));
  }

  static getWallColumnTypeForPosition(x, y, z, tileId, skipPreview = true) {
    // wall auto tiles need the left and right columns to have the same amount of rows for it to match
    let hasLeftColumn = true;
    let hasRightColumn = true;

    const compareWallAutoTileLine = (newY, sameCenter) => {
      const leftTileId = this.getCurrentTileAtPosition(x -1, newY, z, skipPreview);
      const rightTileId = this.getCurrentTileAtPosition(x + 1, newY, z, skipPreview);

      if (sameCenter) {
        if (!Tilemap.isSameKindTile(tileId, leftTileId)) {
          hasLeftColumn = false;
        }
        if (!Tilemap.isSameKindTile(tileId, rightTileId)) {
          hasRightColumn = false;
        }
      } else {
        if (Tilemap.isSameKindTile(tileId, leftTileId)) {
          hasLeftColumn = false;
        }
        if (Tilemap.isSameKindTile(tileId, rightTileId)) {
          hasRightColumn = false;
        }
      }
    };

    for (let newY = y; y < $gameMap.height(); y++) {
      const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
      const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
      compareWallAutoTileLine(newY, sameCenter);
      if (!sameCenter) {
        break;
      }
    }

    for (let newY = y -1; y >= 0; y--) {
      const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
      const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
      compareWallAutoTileLine(newY, sameCenter);
      if (!sameCenter) {
        break;
      }
    }

    if (hasLeftColumn) {
      if (hasRightColumn) {
        return 1;
      }

      return 2;
    }

    if (hasRightColumn) {
      return 0;
    }

    return 3;
  }

  static getWaterfallShapeForPosition(x, y, z, tileId, skipPreview = true) {
    const left = this.isSameKindTile(tileId, x - 1, y, z, skipPreview);
    const right = this.isSameKindTile(tileId, x + 1, y, z, skipPreview);

    if (left && right) {
      return 0;
    }

    if (left) {
      return 1;
    }

    if (right) {
      return 2;
    }

    return 3;
  }

  static getWallShapeForPosition(x, y, z, tileId, skipPreview = true) {
    const columnType = this.getWallColumnTypeForPosition(x, y, z, tileId, skipPreview);

    let shape = 0;
    const above = this.isSameKindTile(tileId, x, y -1, z, skipPreview);
    const below = this.isSameKindTile(tileId, x, y +1, z, skipPreview);

    if (above && below) {
      shape = 0;
    } else if (above) {
      shape = 8;
    } else if (below) {
      shape = 2;
    } else {
      shape = 10;
    }

    switch (columnType) {
      case 0:
        shape += 1;
        break;
      case 2:
        shape += 4;
        break;
      case 3:
        shape += 5;
        break;
    }

    return shape;
  }

  static getShapeForConfiguration(configuration) {
    for (let shape = 0; shape < autoTileShapeTable.length; shape++) {
      const shapeData = autoTileShapeTable[shape];
      let valid = true;

      for (let i = 0; i < configuration.length; i++) {
        const config = shapeData[i];

        if (config === true) {
          if (!configuration[i]) {
            valid = false;
            break;
          }
        } else if (config === false) {
          if (configuration[i]) {
            valid = false;
            break;
          }
        }
      }

      if (valid) {
        return shape;
      }
    }

    return 46;
  }


  static isAutotileMatch(tileId, x, y, z, skipPreview = true) {
    if (!$gameMap.isValid(x, y)) {
      return true;
    }

    const otherTileId = this.getCurrentTileAtPosition(x, y, z, skipPreview);

    if (Tilemap.isSameKindTile(tileId, otherTileId)) {
      return true;
    }

    const specialTiles = [5, 7, 13];
    const leftKind = Tilemap.getAutotileKind(tileId);
    const rightKind = Tilemap.getAutotileKind(otherTileId);

    const leftSpecial = specialTiles.includes(leftKind);
    const rightSpecial = specialTiles.includes(rightKind);
    if (leftSpecial !== rightSpecial) {
      return true;
    }

    return false;
  }

  static getAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
    if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
      return this.getWallShapeForPosition(x, y, z, tileId, skipPreview);
    }

    if (Tilemap.isWaterfallTile(tileId)) {
      return this.getWaterfallShapeForPosition(x, y, z, tileId, skipPreview);
    }

    const a = this.isAutotileMatch(tileId, x -1, y -1, z, skipPreview);
    const b = this.isAutotileMatch(tileId, x, y -1, z, skipPreview);
    const c = this.isAutotileMatch(tileId, x +1, y -1, z, skipPreview);

    const d = this.isAutotileMatch(tileId, x -1, y, z, skipPreview);
    const e = this.isAutotileMatch(tileId, x +1, y, z, skipPreview);

    const f = this.isAutotileMatch(tileId, x -1, y +1, z, skipPreview);
    const g = this.isAutotileMatch(tileId, x, y +1, z, skipPreview);
    const h = this.isAutotileMatch(tileId, x +1, y +1, z, skipPreview);

    const config = [a, b, c, d, e, f, g, h];
    return this.getShapeForConfiguration(config);
  }

  static isShiftMapping() {
    if (Input.isPressed('shift')) {
      return true;
    }

    if (SceneManager._scene._mapEditorWindow._manualTileSelected !== undefined) {
      return true;
    }

    return false;
  }

  static changeAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
    if (z >= 4 || this.isShiftMapping()) {
      return tileId;
    }

    const shape = this.getAutoTileShapeForPosition(x, y, z, tileId, skipPreview);
    return Tilemap.TILE_ID_A1 + Math.floor((tileId - Tilemap.TILE_ID_A1) / 48) * 48 + shape;
  }

  static resetTileShape(x, y, z, previewOnly = false) {
    if (x < 0 || x >= $gameMap.width()) {
      return;
    }

    if (y < 0 || y >= $gameMap.height()) {
      return;
    }

    const tileId = this.getCurrentTileAtPosition(x, y, z, !previewOnly);
    if (Tilemap.isAutotile(tileId)) {
      const effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, !previewOnly);
      if (tileId !== effectiveTileId) {
        this.setMapTile(x, y, z, effectiveTileId, false, previewOnly);
      }
    }
  }

  static resetCurrentChange() {
    currentChange = {
      tiles: {},
      collision: {},
      blend: {},
      puzzle: {},
    };
  }

  static undoLastChange() {
    if (this.changingTileProps) {
      return;
    }

    if (changeHistory.length === 0) {
      SoundManager.playBuzzer();
      return;
    }

    const lastChange = changeHistory.pop();
    this.resetCurrentChange();

    const size = $gameMap.tileWidth() * $gameMap.tileHeight();

    for (const tileIndex in lastChange.tiles) {
      currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
      $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
    }

    for (const tileIndex in lastChange.puzzle) {
      currentChange.puzzle[tileIndex] = CycloneMagic.puzzleTiles[tileIndex];
      CycloneMagic.puzzleTiles[tileIndex] = lastChange.puzzle[tileIndex];
    }

    for (const tileIndex in lastChange.collision) {
      currentChange.collision[tileIndex] = customCollisionTable[tileIndex];
      customCollisionTable[tileIndex] = lastChange.collision[tileIndex];
    }

    for (const tileIndex in lastChange.blend) {
      if (!tileBlendingTable[tileIndex]) {
        const buffer = new ArrayBuffer(size);
        tileBlendingTable[tileIndex] = new Int8Array(buffer);
      }

      const tilePixels = tileBlendingTable[tileIndex];
      currentChange.blend[tileIndex] = {};
      for (const pixelIndex in lastChange.blend[tileIndex]) {
        currentChange.blend[tileIndex][pixelIndex] = tilePixels[pixelIndex];
        tilePixels[pixelIndex] = lastChange.blend[tileIndex][pixelIndex];
      }
    }

    undoHistory.push(currentChange);
    currentChange = false;
    SceneManager._scene._mapEditorCommands.redraw();
    SceneManager._scene._mapEditorGrid.refresh();

    mapCaches[$gameMap._mapId] = $dataMap;
    this.refreshTilemap();
    saveExtraData(true);
  }

  static redoLastUndoneChange() {
    if (this.changingTileProps) {
      return;
    }

    if (undoHistory.length === 0) {
      SoundManager.playBuzzer();
      return;
    }

    const lastChange = undoHistory.pop();
    const size = $gameMap.tileWidth() * $gameMap.tileHeight();
    this.resetCurrentChange();
    let needsSaving = false;

    for (const tileIndex in lastChange.tiles) {
      currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
      $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
    }

    for (const tileIndex in lastChange.puzzle) {
      currentChange.puzzle[tileIndex] = CycloneMagic.puzzleTiles[tileIndex];
      CycloneMagic.puzzleTiles[tileIndex] = lastChange.puzzle[tileIndex];
    }

    for (const tileIndex in lastChange.collision) {
      currentChange.collision[tileIndex] = customCollisionTable[tileIndex];
      customCollisionTable[tileIndex] = lastChange.collision[tileIndex];
      needsSaving = true;
    }

    for (const tileIndex in lastChange.blend) {
      if (!tileBlendingTable[tileIndex]) {
        const buffer = new ArrayBuffer(size);
        tileBlendingTable[tileIndex] = new Int8Array(buffer);
      }

      const tilePixels = tileBlendingTable[tileIndex];
      currentChange.blend[tileIndex] = {};
      for (const pixelIndex in lastChange.blend[tileIndex]) {
        currentChange.blend[tileIndex][pixelIndex] = tilePixels[pixelIndex];
        tilePixels[pixelIndex] = lastChange.blend[tileIndex][pixelIndex];
        needsSaving = true;
      }
    }

    this.logChange(false);
    if (needsSaving) {
      saveExtraData(true);
    }
    this.refreshTilemap();
  }

  static getCurrentLayerChangeType() {
    switch (currentLayer) {
      case Layers.collisions:
        return 'collision';
      case Layers.blend:
        return 'blend';
      default:
        return 'tile';
    }
  }

  static logChange(clearUndo = true) {
    if (!currentChange) {
      return;
    }
    const hasTiles = Object.keys(currentChange.tiles).length > 0;
    const hasBlend = Object.keys(currentChange.blend).length > 0;
    const hasCollision = Object.keys(currentChange.collision).length > 0;
    const hasPuzzle = Object.keys(currentChange.puzzle).length > 0;
    const hasChanges = hasTiles || hasBlend || hasCollision || hasPuzzle;

    if (hasChanges) {
      changeHistory.push(currentChange);
      if (clearUndo) {
        undoHistory = [];
      }
    }
    currentChange = false;

    while (changeHistory.length > 300) {
      changeHistory.shift();
    }

    SceneManager._scene._mapEditorCommands.redraw();
    SceneManager._scene._mapEditorGrid.refresh();

    mapCaches[$gameMap._mapId] = $dataMap;

    fullRefresh();
  }

  static maybeUpdateTileNeighbors(x, y, z, expectedUpdate = true, previewOnly = false) {
    if (this.isShiftMapping()) {
      return;
    }

    if (!expectedUpdate) {
      return;
    }

    this.resetTileShape(x -1, y -1, z, previewOnly);
    this.resetTileShape(x, y -1, z, previewOnly);
    this.resetTileShape(x +1, y -1, z, previewOnly);

    this.resetTileShape(x -1, y, z, previewOnly);
    this.resetTileShape(x +1, y, z, previewOnly);

    this.resetTileShape(x -1, y +1, z, previewOnly);
    this.resetTileShape(x, y + 1, z, previewOnly);
    this.resetTileShape(x +1, y +1, z, previewOnly);
  }

  static getDefaultLayerForTileId(tileId) {
    if (!Tilemap.isAutotile(tileId)) {
      return 3;
    }

    if (tileId >= Tilemap.TILE_ID_A3) {
      return 0;
    }

    const kind = Tilemap.getAutotileKind(tileId);
    if (highLayerAutotiles.includes(kind)) {
      return 1;
    }

    return 0;
  }

  static getItemsToChange(x, y, z, tileId, skipPreview = true, updateHigherLayers = true) {
    if (z !== 7) {
      return [{
        x,
        y,
        z,
        tileId,
      }];
    }

    // When using automatic mode, we may need to change more than one layer at the same time
    const items = [];
    let layerId = this.getDefaultLayerForTileId(tileId);

    if (layerId === 1 && Tilemap.isTileA1(tileId)) {
      items.push({
        x,
        y,
        z: 0,
        tileId: Tilemap.TILE_ID_A1,
      });
    }

    if (layerId === 3) {
      // If there's already something on the fourth layer, then move it to the third and place the new tile on the 4th
      const currentTile = this.getCurrentTileAtPosition(x, y, 3, skipPreview);
      if (currentTile === tileId && tileId !== 0) {
        return [];
      }

      if (currentTile) {
        items.push({
          x,
          y,
          z: 2,
          tileId: currentTile,
        });
      }
    }

    items.push({
      x,
      y,
      z: layerId,
      tileId,
    });

    // Remove anything above the new tile
    if (updateHigherLayers) {
      for (let i = layerId + 1; i <= 3; i++) {
        items.push({
          x,
          y,
          z: i,
          tileId: 0,
        });
      }
    }

    return items;
  }

  static canEraseLayer(layerIndex) {
    if (currentTool === 'eraser') {
      return true;
    }

    if (layerIndex >= 2) {
      return true;
    }

    if (multiLayerSelection.length) {
      return true;
    }

    if (currentLayer !== Layers.auto) {
      return true;
    }

    // The lower layers can only be erased with the pen in auto mode when there are multiple layers selected
    return false;
  }

  static _eraseSingleLayerTile(x, y, z, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (!forceErasure && !this.canEraseLayer(z)) {
      return;
    }

    const tileIndex = this.tileIndex(x, y, z);
    if (previewOnly) {
      previewChanges[tileIndex] = 0;
    } else {
      const oldTile = $dataMap.data[tileIndex];
      if (currentChange.tiles[tileIndex] === undefined && oldTile !== 0) {
        currentChange.tiles[tileIndex] = oldTile;
      }

      $dataMap.data[tileIndex] = 0;
    }
  }

  static _eraseSingleMapTile(x, y, z, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (z > 3 && z !== Layers.auto) {
      this._eraseSingleLayerTile(x, y, z, updateNeighbors, previewOnly, forceErasure);
      return;
    }

    for (let newZ = 0; newZ <= 3; newZ++) {
      if (newZ !== z && z !== Layers.auto) {
        continue;
      }

      this._eraseSingleLayerTile(x, y, newZ, updateNeighbors, previewOnly, forceErasure);
      this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
    }
  }

  // eslint-disable-next-line complexity
  static _getBlockCollision(i, j, count, tileId) {
    if (tileId <= 3) {
      return tileId;
    }

    let goesUp = false;
    let goesDown = false;
    let goesRight = false;
    let goesLeft = false;

    if (tileId >= 20) {
      const d = tileId - 20;
      goesUp = !DirectionHelper.goesUp(d);
      goesDown = !DirectionHelper.goesDown(d);
      goesLeft = !DirectionHelper.goesLeft(d);
      goesRight = !DirectionHelper.goesRight(d);
    } else if (tileId > 10) {
      const d = tileId - 10;
      goesUp = DirectionHelper.goesUp(d);
      goesDown = DirectionHelper.goesDown(d);
      goesLeft = DirectionHelper.goesLeft(d);
      goesRight = DirectionHelper.goesRight(d);
    } else if (tileId === 4) {
      goesUp = true;
      goesDown = true;
    } else if (tileId === 5) {
      goesLeft = true;
      goesRight = true;
    }

    const up = goesUp && j === 0;
    const down = goesDown && j === count -1;
    const left = goesLeft && i === 0;
    const right = goesRight && i === count - 1;

    if (up) {
      if (left) {
        if (right) {
          if (down) {
            return 20;
          }

          return 22;
        }

        if (down) {
          return 26;
        }

        return 17;
      }

      if (right) {
        if (down) {
          return 24;
        }

        return 19;
      }

      if (down) {
        return 4;
      }
      return 18;
    }

    if (down) {
      if (left) {
        if (right) {
          return 28;
        }

        return 11;
      }

      if (right) {
        return 13;
      }
      return 12;
    }

    if (left) {
      if (right) {
        return 5;
      }

      return 14;
    }

    if (right) {
      return 16;
    }

    return 1;
  }

  static _applySingleCollision(x, y, tileId, previewOnly = false) {
    if (previewOnly) {
      return;
    }

    const gridRatio = this.getGridRatio();
    const count = 4 / gridRatio;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const intX = Math.floor(x * 4) + i;
        const intY = Math.floor(y * 4) + j;
        const height = $gameMap.height() * 4;
        const width = $gameMap.width() * 4;
        const index = (intY % height) * width + (intX % width);

        const blockCollision = this._getBlockCollision(i, j, count, tileId);
        const oldTile = customCollisionTable[index] || 0;
        if (currentChange.collision[index] === undefined && oldTile !== blockCollision) {
          currentChange.collision[index] = oldTile;
        }

        if (!blockCollision) {
          delete customCollisionTable[index];
          continue;
        }

        customCollisionTable[index] = blockCollision;
      }
    }
  }

  static _changePixelPositionBlend(x, y, px, py, newBlend, previewOnly = false) {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const fx = Math.floor(x) + Math.floor(px / tileWidth);
    const fy = Math.floor(y) + Math.floor(py / tileHeight);
    const pixelX = px % tileWidth;
    const pixelY = py % tileHeight;

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    const size = tileWidth * tileHeight;

    const fullTable = previewOnly ? window.CycloneMagic.tileBlendingTable : tileBlendingTable;
    if (!fullTable[tileIndex]) {
      const buffer = new ArrayBuffer(size);
      fullTable[tileIndex] = new Int8Array(buffer);
    }
    const table = fullTable[tileIndex];

    const pixelIndex = pixelY * tileWidth + pixelX;

    if (currentChange.blend[tileIndex]?.[pixelIndex] === undefined && (table[pixelIndex] ?? 0) !== newBlend) {
      if (currentChange.blend[tileIndex] === undefined) {
        currentChange.blend[tileIndex] = {};
      }

      currentChange.blend[tileIndex][pixelIndex] = (table[pixelIndex] ?? 0);
    }

    table[pixelIndex] = newBlend;
  }

  static _changePositionBlend(x, y, newBlend) {
    const fx = Math.floor(x);
    const fy = Math.floor(y);
    const tileIndex = this.tileIndex(fx, fy, 0);
    const gridRatio = this.getGridRatio();
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const size = tileWidth * tileHeight;

    if (!tileBlendingTable[tileIndex]) {
      const buffer = new ArrayBuffer(size);
      tileBlendingTable[tileIndex] = new Int8Array(buffer);
    }
    const table = tileBlendingTable[tileIndex];
    const subX = x - fx;
    const subY = y - fy;

    const leftPx = Math.round(subX * tileWidth);
    const topPx = Math.round(subY * tileHeight);
    const blockWidth = Math.floor(tileWidth / gridRatio);
    const blockHeight = Math.floor(tileHeight / gridRatio);

    const rightPx = leftPx + blockWidth;
    const bottomPx = topPx + blockHeight;

    for (let px = leftPx; px < rightPx; px++) {
      for (let py = topPx; py < bottomPx; py++) {
        const pixelIndex = py * tileWidth + px;

        if (currentChange.blend[tileIndex]?.[pixelIndex] === undefined && (table[pixelIndex] ?? 0) !== newBlend) {
          if (currentChange.blend[tileIndex] === undefined) {
            currentChange.blend[tileIndex] = {};
          }

          currentChange.blend[tileIndex][pixelIndex] = (table[pixelIndex] ?? 0);
        }

        table[pixelIndex] = newBlend;
      }
    }
  }

  static isPositionBlendSpriteReady(x, y) {
    if (!SceneManager._scene._spriteset?._blenderTileSprites) {
      return false;
    }

    for (const sprite of SceneManager._scene._spriteset._blenderTileSprites) {
      if (sprite._mapX === x && sprite._mapY === y) {
        return true;
      }
    }

    return false;
  }

  static forceBlenderRefresh(hardRefresh = false) {
    if (!window.CycloneMagic) {
      return;
    }

    SceneManager._scene._spriteset?.forceBlenderRefresh && SceneManager._scene._spriteset.forceBlenderRefresh(hardRefresh);
  }

  static buildSmallCircle() {
    const width = tileWidth / 4;
    const height = tileHeight / 4;
    const bitmap = new Bitmap(width, height);
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 2, '#00FF00');

    const imageData = bitmap.context.getImageData(0, 0, width, height);
    smallCircleData = imageData.data;
  }

  static buildCircle() {
    const width = tileWidth / 2;
    const height = tileHeight / 2;
    const bitmap = new Bitmap(width, height);

    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
    bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 4, '#00FF00');

    const imageData = bitmap.context.getImageData(0, 0, width, height);
    circleData = imageData.data;
  }

  static getCircleData() {
    if (circleData) {
      if (Input.isPressed('shift')) {
        return smallCircleData;
      }

      return circleData;
    }

    this.buildSmallCircle();
    this.buildCircle();

    return this.getCircleData();
  }

  static optimizeBlends() {
    this.resetCurrentChange();

    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        this.optimizeTileBlend(x, y);
      }
    }

    this.logChange(true);
  }

  static removeAllBlends() {
    this.resetCurrentChange();
    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        this.removeTileBlend(x, y, false);
      }
    }

    this.logChange(true);
  }

  static optimizeTileBlend(x, y) {
    const fx = Math.floor(x);
    const fy = Math.floor(y);

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    if (!tileBlendingTable[tileIndex]) {
      return;
    }

    const hasZero = tileBlendingTable[tileIndex].includes(0);
    const hasOne = tileBlendingTable[tileIndex].includes(1);

    if (hasZero === hasOne) {
      return;
    }

    // If it's all blended, then remove whatever tile is on layer 2
    if (hasOne) {
      this._applySingleMapTile(x, y, 1, 0, false, false, true);
    }

    currentChange.blend[tileIndex] = tileBlendingTable[tileIndex];
    delete tileBlendingTable[tileIndex];
  }

  static removeTileBlend(x, y, previewOnly = false) {
    if (previewOnly && !window.CycloneMagic) {
      return;
    }

    const fx = Math.floor(x);
    const fy = Math.floor(y);

    if (fx < 0 || fx >= $gameMap.width()) {
      return;
    }
    if (fy < 0 || fy >= $gameMap.height()) {
      return;
    }

    const tileIndex = this.tileIndex(fx, fy, 0);
    if (previewOnly) {
      if (window.CycloneMagic.tileBlendingTable[tileIndex]) {
        delete window.CycloneMagic.tileBlendingTable[tileIndex];
      }
      return;
    }

    if (tileBlendingTable[tileIndex]) {
      currentChange.blend[tileIndex] = tileBlendingTable[tileIndex];
      delete tileBlendingTable[tileIndex];
    }
  }

  static _applyBlendBrush(x, y, previewOnly = false) {
    if (previewOnly && !window.CycloneMagic) {
      return;
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    const divider = Input.isPressed('shift') ? 4 : 2;
    const width = tileWidth / divider;
    const height = tileHeight / divider;
    const pixels = this.getCircleData();

    let index = -1;

    const tileX = Math.floor(x);
    const tileY = Math.floor(y);
    const pixelX = Math.floor((x - tileX) * tileWidth);
    const pixelY = Math.floor((y - tileY) * tileHeight);
    const newBlend = currentTool === Tools.eraser ? 0 : 1;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        index++;

        if (pixels[index * 4 + 1] > 0) {
          this._changePixelPositionBlend(x, y, pixelX + px, pixelY + py, newBlend, previewOnly);
        } else if (pixels[index * 4 + 2] > 0) {
          if (Math.randomInt(10) > 5) {
            this._changePixelPositionBlend(x, y, pixelX + px, pixelY + py, newBlend, previewOnly);
          }
        }
      }
    }

    if (previewOnly) {
      forceBlenderRefresh();
    } else {
      // Let's do a quick refresh first and then save the data a little later
      if (window.CycloneMagic) {
        window.CycloneMagic.tileBlendingTable = tileBlendingTable;
        const maxTileX = tileX + Math.floor((pixelX + width) / tileWidth);
        const maxTileY = tileY + Math.floor((pixelY + height) / tileHeight);

        if (window.CycloneMagic) {
          for (let cacheX = tileX; cacheX <= maxTileX; cacheX++) {
            for (let cacheY = tileY; cacheY <= maxTileY; cacheY++) {
              window.CycloneMagic.clearPositionCache(cacheX, cacheY);
            }
          }
        }

        forceBlenderRefresh();
      }
    }
  }

  static _applySingleBlend(x, y) {
    if (currentTool === Tools.eraser) {
      this._changePositionBlend(x, y, 0);
      return;
    }

    this._changePositionBlend(x, y, 1);
  }

  static _applyPuzzleTile(x, y, tileId, previewOnly) {
    if (!window.CycloneMagic?.puzzleTiles) {
      return;
    }
    if (previewOnly) {
      return;
    }

    const width = $gameMap.width() * 2;
    const index = (y * 2) * width + x * 2;

    const oldTile = CycloneMagic.puzzleTiles[index] ?? 0;
    if (currentChange.puzzle[index] === undefined && oldTile !== tileId) {
      currentChange.puzzle[index] = oldTile;
    }

    if (tileId) {
      CycloneMagic.puzzleTiles[index] = tileId;
    } else if (CycloneMagic.puzzleTiles[index]) {
      delete CycloneMagic.puzzleTiles[index];
    }
  }

  static _applySingleMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false, forceErasure = false) {
    if (z === Layers.collisions) {
      return this._applySingleCollision(x, y, tileId, previewOnly);
    }

    if (z === 1 && puzzleMode) {
      this._applyPuzzleTile(x, y, tileId, previewOnly);
      return;
    }

    if (!tileId) {
      this._eraseSingleMapTile(x, y, z, updateNeighbors, previewOnly, forceErasure);
      return;
    }

    const itemsToChange = this.getItemsToChange(x, y, z, tileId, !previewOnly, updateNeighbors);
    for (const {x, y, z, tileId} of itemsToChange) {
      if (z > 5) {
        continue;
      }
      const tileIndex = this.tileIndex(x, y, z);
      let effectiveTileId = tileId;
      if (Tilemap.isAutotile(tileId)) {
        effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, false);
      }

      if (z === 1) {
        this.removeTileBlend(x, y, previewOnly);
      }

      if (previewOnly) {
        previewChanges[tileIndex] = effectiveTileId;
      } else {
        const oldTile = $dataMap.data[tileIndex];
        if (currentChange.tiles[tileIndex] === undefined && oldTile !== effectiveTileId) {
          currentChange.tiles[tileIndex] = oldTile;
        }

        $dataMap.data[tileIndex] = effectiveTileId;
      }

      this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
    }
  }

  static setMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false) {
    if (!$gameMap.isValid(x, y)) {
      return;
    }

    if (currentLayer === Layers.blend) {
      if (!previewOnly) {
        CycloneMapEditor$1._applySingleBlend(x, y);
      }
      return;
    }

    if (currentTool !== 'eraser') {
      if (tileId === undefined ) {
        return;
      }

      if (tileId === 0 && !this.canEraseLayer(z)) {
        return;
      }
    }

    this._applySingleMapTile(x, y, z, tileId, updateNeighbors, previewOnly);
  }

  static getSelectedTileIndex(col, row) {
    if (currentTool === 'eraser') {
      return;
    }

    if (currentTileId === undefined) {
      return;
    }

    if (selectedTileList.length < tileCols * tileRows) {
      return;
    }

    const realCol = col % tileCols;
    const realRow = row % tileRows;
    return realRow * tileCols + realCol;
  }

  static getSelectedTileCell(col, row) {
    const index = this.getSelectedTileIndex(col, row);
    if (index || index === 0) {
      return selectedTileList[index];
    }
  }

  static setSelectionTileMaybeMultiLayer(tileX, tileY, selectionCol, selectionRow, previewOnly = false, effectiveLayer = undefined) {
    effectiveLayer = effectiveLayer ?? currentLayer;
    const index = this.getSelectedTileIndex(selectionCol, selectionRow);

    if (effectiveLayer === 7 && multiLayerSelection.length) {
      for (let z = 0; z <= 3; z++) {
        const tileId = multiLayerSelection[z][index] ?? 0;
        this.setMapTile(tileX, tileY, z, tileId, true, previewOnly);
      }
    } else {
      const tileId = selectedTileList[index] ?? 0;
      this.setMapTile(tileX, tileY, effectiveLayer, tileId, true, previewOnly);

      if (effectiveLayer === 2 && currentLayer === 7 && currentTool === 'eraser') {
        this.setMapTile(tileX, tileY, 3, 0, true, previewOnly);
      }
    }
  }

  static canApplyRectangle() {
    return currentTileId !== undefined || currentTool === 'eraser' || currentLayer === Layers.blend;
  }

  static isAutoEraser() {
    return currentLayer === Layers.auto && currentTool === 'eraser' && !Input.isPressed('shift');
  }

  static getHighestLayerOnArea(startX, startY, width, height) {
    const highestLayer = (() => {
      for (let z = 3; z >= 1; z--) {
        for (let tileY = startY; tileY < startY + height; tileY++) {
          for (let tileX = startX; tileX < startX + width; tileX++) {
            const tileIndex = this.tileIndex(tileX, tileY, z);
            const tileId = $dataMap.data[tileIndex];

            if (tileId > 0) {
              return z;
            }
          }
        }
      }

      return 0;
    })();

    if (highestLayer === 3 && Input.isPressed('control')) {
      return 2;
    }

    return highestLayer;
  }

  static applyRectangle(startX, startY, width, height, previewOnly = false) {
    if (!this.canApplyRectangle()) {
      return;
    }

    this.ensureLayerVisibility();
    const gridRatio = this.getGridRatio();
    let initialRow = 0;
    let initialCol = 0;
    let rowIncrement = 1;
    let colIncrement = 1;

    if (rectangleBackWidth > 0) {
      initialCol = (width * gridRatio) - 1;
      colIncrement *= -1;
    }

    if (rectangleBackHeight > 0) {
      initialRow = (height * gridRatio) - 1;
      rowIncrement *= -1;
    }

    let selectionRow = initialRow;
    let selectionCol = initialCol;

    if (previewOnly) {
      previewChanges = {};
    } else {
      this.resetCurrentChange();
    }

    let effectiveLayer = currentLayer;
    if (this.isAutoEraser()) {
      effectiveLayer = this.getHighestLayerOnArea(startX, startY, width, height);
    }

    const tileIncrement = 1 / gridRatio;

    for (let tileY = startY; tileY < startY + height; tileY += tileIncrement) {
      selectionCol = initialCol;
      for (let tileX = startX; tileX < startX + width; tileX += tileIncrement) {
        this.setSelectionTileMaybeMultiLayer(tileX, tileY, selectionCol, selectionRow, previewOnly, effectiveLayer);
        selectionCol += colIncrement;
      }
      selectionRow += rowIncrement;
    }

    if (previewOnly) {
      SceneManager._scene._spriteset._tilemap.refresh();
      this.maybeRefreshGrid();
    } else {
      this.logChange();
      this.refreshTilemap();
    }
  }

  static maybeRefreshGrid() {
    if (currentLayer !== Layers.regions) {
      return;
    }

    refreshGrid();
  }

  static refreshTilemap() {
    previewChanges = {};
    if (currentLayer === Layers.collisions || currentLayer === Layers.blend) {
      saveExtraData(true);
    }

    if (TouchInput.isLongPressed()) {
      refreshTilemap();
    } else {
      SceneManager._scene._spriteset._tilemap.refresh();
    }
    refreshGrid();
  }

  static copyAutoRectangle(startX, startY, width, height) {
    for (let z = 0; z <= 3; z++) {
      multiLayerSelection[z] = Array(width * height);
    }

    this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
      for (let z = 0; z <= 3; z++) {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        multiLayerSelection[z][index] = $dataMap.data[tileIndex] || 0;
        selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;
        if (currentTileId === undefined) {
          currentTileId = selectedTileList[index];
        }
      }
    });
  }

  static _selectTileIfNoneSelectedYet(tileId) {
    if (currentTileId === undefined) {
      currentTileId = tileId;
    }
  }

  static _shouldSkipRemainingLayersCopy(foundAny, z) {
    if (!foundAny) {
      return false;
    }

    if (Input.isPressed('control')) {
      return z !== 3;
    }

    return true;
  }

  static iterateRectangle(startX, startY, width, height, fn) {
    let index = 0;
    for (let tileY = startY; tileY < startY + height; tileY++) {
      for (let tileX = startX; tileX < startX + width; tileX++) {
        fn(tileX, tileY, index);
        index++;
      }
    }
  }

  static copyHigherAutoRectangle(startX, startY, width, height) {
    for (let z = 0; z <= 3; z++) {
      multiLayerSelection[z] = Array(width * height);
    }

    let foundAny = false;
    for (let z = 3; z >= 0; z--) {
      if (!this.isLayerVisible(z)) {
        continue;
      }

      this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        multiLayerSelection[z][index] = $dataMap.data[tileIndex] || 0;
        selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;
        this._selectTileIfNoneSelectedYet(selectedTileList[index]);

        if ($dataMap.data[tileIndex]) {
          foundAny = true;
        }
      });

      if (this._shouldSkipRemainingLayersCopy(foundAny, z)) {
        return;
      }
    }
  }

  static copyHigherRectangle(startX, startY, width, height) {
    let foundAny = false;

    for (let z = 3; z >= 0; z--) {
      if (!this.isLayerVisible(z)) {
        continue;
      }

      this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
        const tileIndex = this.tileIndex(tileX, tileY, z);
        selectedTileList[index] = selectedTileList[index] || $dataMap.data[tileIndex] || 0;
        this._selectTileIfNoneSelectedYet(selectedTileList[index]);
        if ($dataMap.data[tileIndex]) {
          foundAny = true;
        }
      });

      if (this._shouldSkipRemainingLayersCopy(foundAny, z)) {
        return;
      }
    }
  }

  static copyManualRectangle(startX, startY, width, height) {
    this.iterateRectangle(startX, startY, width, height, (tileX, tileY, index) => {
      const tileIndex = this.tileIndex(tileX, tileY, currentLayer);
      selectedTileList[index] = $dataMap.data[tileIndex] || 0;
      this._selectTileIfNoneSelectedYet(selectedTileList[index]);
    });
  }

  static copyRectangle(startX, startY, width, height) {
    if (puzzleMode) {
      return;
    }
    if (!wasRightButtonDown) {
      return;
    }
    if (currentLayer === Layers.collisions) {
      return;
    }

    const gridRatio = this.getGridRatio();
    multiLayerSelection = [];
    selectedTileList = Array((width * gridRatio) * (height * gridRatio));
    currentTileId = undefined;

    if (currentLayer === 7) {
      if (Input.isPressed('shift')) {
        this.copyHigherAutoRectangle(startX, startY, width, height);
      } else {
        this.copyAutoRectangle(startX, startY, width, height);
      }
    } else if (Input.isPressed('shift')) {
      this.copyHigherRectangle(startX, startY, width, height);
    } else {
      this.copyManualRectangle(startX, startY, width, height);
    }

    tileCols = width;
    tileRows = height;
    messySelection = true;

    if (currentTool == 'eraser') {
      this.restoreLastDrawingTool();
    }

    this.refreshTilemap();
    SceneManager._scene._mapEditorWindow._manualTileSelected = undefined;
    SceneManager._scene._mapEditorWindow.refresh();
    SceneManager._scene._mapEditorWindow.ensureSelectionVisible();
  }

  static restoreLastDrawingTool() {
    if (lastDrawingTool === 'rectangle') {
      this.rectangleButton();
    } else {
      this.pencilButton();
    }
  }

  static isSameKindTileCurrentLayer(layers, index) {
    const size = $gameMap.width() * $gameMap.height();

    if (currentLayer > 3) {
      for (let z = 0; z <= 3; z++) {
        const tileId = $dataMap.data[index + z * size];
        if (!Tilemap.isSameKindTile(tileId, layers[z])) {
          return false;
        }
      }

      return true;
    }

    const tileId = $dataMap.data[index];
    return Tilemap.isSameKindTile(layers[currentLayer], tileId);
  }

  static _maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds) {
    if (area[index] !== undefined) {
      return;
    }

    const height = $gameMap.height();
    const width = $gameMap.width();

    area[index] = this.isSameKindTileCurrentLayer(initialTileIds, index);

    if (!area[index]) {
      return;
    }

    const workLayer = currentLayer <= 3 ? currentLayer : 0;

    const y = this.indexPositionY(index, workLayer);
    const x = index - this.tileIndex(0, y, workLayer);

    const leftIndex = x > 0 ? this.tileIndex(x - 1, y, workLayer) : -1;
    const rightIndex = x < width -1 ? this.tileIndex(x + 1, y, workLayer) : -1;
    const upIndex = y > 0 ? this.tileIndex(x, y - 1, workLayer) : -1;
    const downIndex = y < height - 1 ? this.tileIndex(x, y + 1, workLayer) : -1;

    const maybeAddIndex = (index) => {
      if (index >= 0 && !list.includes(index)) {
        list.push(index);
      }
    };

    maybeAddIndex(leftIndex);
    maybeAddIndex(rightIndex);
    maybeAddIndex(upIndex);
    maybeAddIndex(downIndex);
  }

  static collectFillAreaFrom(mapX, mapY) {
    const list = [];
    const initialTileIds = [];

    const area = {};

    if (currentLayer === Layers.auto || currentLayer < 4) {
      for (let z = 0; z <= 3; z++) {
        const tileIndex = this.tileIndex(mapX, mapY, z);

        initialTileIds[z] = $dataMap.data[tileIndex];
        if (z === currentLayer || (currentLayer === 7 && z === 0)) {
          list.push(tileIndex);
        }
      }

      for (let i = 0; i < list.length; i++) {
        const index = list[i];
        this._maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds);
      }
    }

    return Object.keys(area).filter(key => area[key]);
  }

  static applyFillArea(mapX, mapY) {
    if (currentTileId === undefined) {
      return;
    }

    this.ensureLayerVisibility();
    const affectedArea = this.collectFillAreaFrom(mapX, mapY);
    const height = $gameMap.height();
    const width = $gameMap.width();
    const workLayer = currentLayer <= 3 ? currentLayer : 0;

    this.resetCurrentChange();
    for (const tileIndex of affectedArea) {
      const y = this.indexPositionY(tileIndex, workLayer);
      const x = tileIndex - this.tileIndex(0, y, workLayer);

      const xDiff = (x + width - mapX) % tileCols;
      const yDiff = (y + height - mapY) % tileRows;

      this.setSelectionTileMaybeMultiLayer(x, y, xDiff, yDiff, false);
    }

    this.logChange();
    this.refreshTilemap();
  }

  static ensureLayerVisibility() {
    if (!layerVisibility[currentLayer]) {
      layerVisibility[currentLayer] = true;

      if (this.isMapEditorScene()) {
        SceneManager._scene._mapEditorLayerListWindow.refresh();
      }
    }
  }

  static applySelectedTiles(mapX, mapY) {
    if (currentLayer !== Layers.blend) {
      if (currentTileId === undefined) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }
    }

    this.ensureLayerVisibility();
    let index = 0;
    const gridRatio = this.getGridRatio();
    const increment = 1 / gridRatio;

    for (let y = mapY; y < mapY + tileRows; y += increment) {
      for (let x = mapX; x < mapX + tileCols; x += increment) {
        if (!$gameMap.isValid(x, y)) {
          continue;
        }

        if (currentLayer === 7 && multiLayerSelection.length) {
          for (let z = 0; z <= 3; z++) {
            this.setMapTile(x, y, z, multiLayerSelection[z][index]);
          }
        } else {
          this.setMapTile(x, y, currentLayer, selectedTileList[index]);
        }

        index++;
      }
    }

    this.refreshTilemap();
  }

  static updateRightTouch(x, y) {
    if (CycloneMapEditor$1.isRightButtonDown) {
      if (!CycloneMapEditor$1.wasRightButtonDown) {
        CycloneMapEditor$1.rectangleStartX = x;
        CycloneMapEditor$1.rectangleStartY = y;
        CycloneMapEditor$1.rectangleStartMouseX = TouchInput.x;
        CycloneMapEditor$1.rectangleStartMouseY = TouchInput.y;
      }

      const gridRatio = CycloneMapEditor$1.getGridRatio();

      CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleBackWidth = (CycloneMapEditor$1.rectangleStartX - x).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleBackHeight = (CycloneMapEditor$1.rectangleStartY - y).clamp(0, 30) * gridRatio;

      if (this.crossedHorizontalLoop()) {
        // moved right through the edge, limit the width to it
        if (CycloneMapEditor$1.rectangleStartX > x) {
          CycloneMapEditor$1.rectangleWidth = ($gameMap.width() - CycloneMapEditor$1.rectangleStartX) * gridRatio;
          CycloneMapEditor$1.rectangleBackWidth = 0;
        } else if (x > CycloneMapEditor$1.rectangleStartX) {
          CycloneMapEditor$1.rectangleBackWidth = CycloneMapEditor$1.rectangleStartX * gridRatio;
          CycloneMapEditor$1.rectangleWidth = 0;
        }
      }

      if (this.crossedVerticalLoop()) {
        if (CycloneMapEditor$1.rectangleStartY > y) {
          CycloneMapEditor$1.rectangleHeight = ($gameMap.height() - CycloneMapEditor$1.rectangleStartY) * gridRatio;
          CycloneMapEditor$1.rectangleBackHeight = 0;
        } else if (y > CycloneMapEditor$1.rectangleStartY) {
          CycloneMapEditor$1.rectangleBackHeight = CycloneMapEditor$1.rectangleStartY * gridRatio;
          CycloneMapEditor$1.rectangleHeight = 0;
        }
      }
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      return;
    }

    if (CycloneMapEditor$1.wasRightButtonDown) {
      this.updateRectangleReleased();
      return;
    }
  }

  static updateCurrentToolTouch(x, y) {
    switch(CycloneMapEditor$1.currentTool) {
      case 'fill':
        this.updateFill(x, y);
        break;
      case 'pencil':
        this.updatePencil(x, y);
        break;
      case 'rectangle':
        this.updateRectangle(x, y);
        break;
      case 'eraser':
        this.updateEraser(x, y);
        break;
    }
  }

  static changeRectangleArea(previewOnly = false) {
    let startX = CycloneMapEditor$1.rectangleStartX;
    let startY = CycloneMapEditor$1.rectangleStartY;
    let applyWidth = 0;
    let applyHeight = 0;
    const gridRatio = CycloneMapEditor$1.getGridRatio();

    if (CycloneMapEditor$1.rectangleWidth > 0) {
      applyWidth = CycloneMapEditor$1.rectangleWidth / gridRatio;
    } else if (CycloneMapEditor$1.rectangleBackWidth > 0) {
      startX -= CycloneMapEditor$1.rectangleBackWidth / gridRatio;
      applyWidth = (CycloneMapEditor$1.rectangleBackWidth + 1) / gridRatio;
    }

    if (CycloneMapEditor$1.rectangleHeight > 0) {
      applyHeight = CycloneMapEditor$1.rectangleHeight / gridRatio;
    } else if (CycloneMapEditor$1.rectangleBackHeight > 0) {
      startY -= CycloneMapEditor$1.rectangleBackHeight / gridRatio;
      applyHeight = (CycloneMapEditor$1.rectangleBackHeight + 1) / gridRatio;
    }

    if (applyWidth > 0 && applyHeight > 0) {
      if (CycloneMapEditor$1.wasRightButtonDown) {
        if (!previewOnly) {
          CycloneMapEditor$1.copyRectangle(startX, startY, applyWidth, applyHeight);
        }
      } else {
        CycloneMapEditor$1.applyRectangle(startX, startY, applyWidth, applyHeight, previewOnly);
      }
    }
  }

  static updateRectangleReleased() {
    this.changeRectangleArea();

    CycloneMapEditor$1.rectangleWidth = 0;
    CycloneMapEditor$1.rectangleHeight = 0;
    CycloneMapEditor$1.rectangleBackWidth = 0;
    CycloneMapEditor$1.rectangleBackHeight = 0;
    SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
  }

  static crossedHorizontalLoop() {
    if (!$gameMap.isLoopHorizontal()) {
      return false;
    }

    // if moved left but the end position is to the right
    if ((CycloneMapEditor$1.rectangleStartMouseX > TouchInput.x && CycloneMapEditor$1.rectangleWidth > 0) ) {
      return true;
    }

    if ((CycloneMapEditor$1.rectangleStartMouseX < TouchInput.x && CycloneMapEditor$1.rectangleBackWidth > 0)) {
      return true;
    }

    return false;
  }

  static crossedVerticalLoop() {
    if (!$gameMap.isLoopVertical()) {
      return false;
    }

    if ((CycloneMapEditor$1.rectangleStartMouseY > TouchInput.y && CycloneMapEditor$1.rectangleHeight > 0)) {
      return true;
    }

    if ((CycloneMapEditor$1.rectangleStartMouseY < TouchInput.y && CycloneMapEditor$1.rectangleBackHeight > 0)) {
      return true;
    }

    return false;
  }

  static updateRectangle(x, y) {
    if (TouchInput.isPressed()) {
      if (!wasPressing) {
        CycloneMapEditor$1.rectangleStartX = x;
        CycloneMapEditor$1.rectangleStartY = y;
        CycloneMapEditor$1.rectangleStartMouseX = TouchInput.x;
        CycloneMapEditor$1.rectangleStartMouseY = TouchInput.y;
      }

      const gridRatio = CycloneMapEditor$1.getGridRatio();
      CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + (1 / gridRatio)).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleBackWidth = (CycloneMapEditor$1.rectangleStartX - x).clamp(0, 30) * gridRatio;
      CycloneMapEditor$1.rectangleBackHeight = (CycloneMapEditor$1.rectangleStartY - y).clamp(0, 30) * gridRatio;

      if (this.crossedHorizontalLoop()) {
        // moved right through the edge, limit the width to it
        if (CycloneMapEditor$1.rectangleStartX > x) {
          CycloneMapEditor$1.rectangleWidth = ($gameMap.width() - CycloneMapEditor$1.rectangleStartX) * gridRatio;
          CycloneMapEditor$1.rectangleBackWidth = 0;
        } else if (x > CycloneMapEditor$1.rectangleStartX) {
          CycloneMapEditor$1.rectangleBackWidth = CycloneMapEditor$1.rectangleStartX * gridRatio;
          CycloneMapEditor$1.rectangleWidth = 0;
        }
      }

      if (this.crossedVerticalLoop()) {
        if (CycloneMapEditor$1.rectangleStartY > y) {
          CycloneMapEditor$1.rectangleHeight = ($gameMap.height() - CycloneMapEditor$1.rectangleStartY) * gridRatio;
          CycloneMapEditor$1.rectangleBackHeight = 0;
        } else if (y > CycloneMapEditor$1.rectangleStartY) {
          CycloneMapEditor$1.rectangleBackHeight = CycloneMapEditor$1.rectangleStartY * gridRatio;
          CycloneMapEditor$1.rectangleHeight = 0;
        }
      }

      this.changeRectangleArea(true);
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      return;
    }

    if (wasPressing) {
      this.updateRectangleReleased();
      return;
    }
  }

  static updateFill(x, y) {
    if (!TouchInput.isPressed() || wasPressing) {
      return;
    }

    CycloneMapEditor$1.applyFillArea(x, y);
  }

  static updateEraser(x, y) {
    if (this.isLayerVisible(Layers.blend)) {
      this.updatePencil(x, y);
      return;
    }

    this.updateRectangle(x, y);
  }

  static updatePencil(x, y) {
    if (TouchInput.isPressed()) {
      if (!currentChange) {
        this.resetCurrentChange();
      }

      if (currentLayer === Layers.blend) {
        const offset = Input.isPressed('shift') ? 0.125 : 0.25;
        CycloneMapEditor$1._applyBlendBrush(x - offset, y - offset, false);
        return;
      }

      CycloneMapEditor$1.applySelectedTiles(x, y);
      return;
    }

    if (wasPressing) {
      CycloneMapEditor$1.logChange();
    }
  }

  static getGridRatio(drawRatio = false) {
    if (!drawRatio) {
      if (currentLayer === Layers.blend) {
        return 16;
      }
    }

    if (puzzleMode) {
      return 2;
    }

    if (currentLayer === Layers.collisions) {
      if (window.CycloneMovement) {
        return window.CycloneMovement.collisionStepCount;
      }

      const count = this.params.collisionStepCount;
      if ([1, 2, 4].includes(count)) {
        return count;
      }

      return 1;
    }

    return 1;
  }

  static canvasToMapX(x) {
    const gridRatio = this.getGridRatio();
    const originX = $gameMap._displayX * tileWidth;
    const mapX = (originX + x) / tileWidth;
    return Math.floor(mapX * gridRatio) / gridRatio;
  }

  static canvasToMapY(y) {
    const gridRatio = this.getGridRatio();


    const originY = $gameMap._displayY * tileHeight;
    const mapY = (originY + y) / tileHeight;
    return Math.floor(mapY * gridRatio) / gridRatio;
  }

  static requestCollisionRefresh() {
    if (!this.active) {
      return;
    }

    if (currentLayer !== Layers.collisions) {
      return;
    }

    if (this.isMapEditorScene()) {
      SceneManager._scene._mapEditorGrid.requestRefresh();
    }
  }

  static jumpToTile(tileId) {
    return SceneManager._scene._mapEditorWindow && SceneManager._scene._mapEditorWindow.jumpToTile(tileId);
  }

  static jumpToLastTile() {
    if (!SceneManager._scene._mapEditorWindow) {
      return;
    }

    SceneManager._scene._mapEditorWindow.setTopRow(SceneManager._scene._mapEditorWindow.maxTopRow());
  }

  static jumpToOneTileOf(tileList) {
    for (const tileId of tileList) {
      if (this.jumpToTile(tileId)) {
        return;
      }
    }
  }
}

globalThis.CycloneMapEditor = CycloneMapEditor$1;
CycloneMapEditor$1.register();

const regionColors = [
  '#e75858',
  '#c0986f',
  '#cbcf32',
  '#8ab24c',
  '#22aa47',
  '#1cbf97',
  '#7ec1df',
  '#4da4dc',
  '#4f36a9',
  '#725fb9',
  '#d48de4',
  '#fa5e84'
];

CycloneMapEditor.patchClass(Bitmap, $super => class {
  drawNormalTile(tileId, x, y, drawWidth, drawHeight) {
    if (tileId === undefined) {
      return;
    }

    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);
    if (!bitmap) {
      return;
    }

    const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * CycloneMapEditor.tileWidth;
    const sourceY = (Math.floor((tileId % 256) / 8) % 16) * CycloneMapEditor.tileHeight;

    this.blt(bitmap, sourceX, sourceY, CycloneMapEditor.tileWidth, CycloneMapEditor.tileHeight, x, y, drawWidth ?? CycloneMapEditor.tileWidth, drawHeight ?? CycloneMapEditor.tileHeight);
    return bitmap;
  }

  drawAutoTileTable(bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
    const halfWidth = CycloneMapEditor.tileWidth / 2;
    const halfHeight = CycloneMapEditor.tileHeight / 2;
    const drawHalfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const drawHalfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    for (let i = 0; i < 4; i++) {
      const tableX = table[i][0];
      const tableY = table[i][1];

      const sourceX = (tileX * CycloneMapEditor.tileWidth) + (tableX * halfWidth);
      const sourceY = (tileY * CycloneMapEditor.tileHeight) + (tableY * halfHeight);
      const targetX = x + (i % 2) * drawHalfWidth;
      const targetY = y + Math.floor(i / 2) * drawHalfHeight;

      this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
    }

    return bitmap;
  }

  drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight) {
    let tileX = 0;
    let tileY = 0;
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    const kind = Tilemap.getAutotileKind(tileId);
    const shape = Tilemap.getAutotileShape(tileId);

    switch(kind) {
      case 0:
        tileX = 0;
        tileY = 0;
        break;
      case 1:
        tileX = 0;
        tileY = 3;
        break;
      case 2:
        tileX = 6;
        tileY = 0;
        break;
      case 3:
        tileX = 6;
        tileY = 3;
        break;
      default:
        tileX = Math.floor((kind % 8) / 4) * 8;
        tileY = Math.floor(kind / 8) * 6 + (Math.floor((kind % 8) / 2) % 2) * 3;

        if (kind % 2 === 1) {
          tileX += 6;
          autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
        }
        break;
    }

    return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = (Math.floor(kind / 8) - 2) * 3;
    const shape = Tilemap.getAutotileShape(tileId);

    return this.drawAutoTileTable(bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = (Math.floor(kind / 8) - 6) * 2;
    const shape = Tilemap.getAutotileShape(tileId);

    return this.drawAutoTileTable(bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
    const shape = Tilemap.getAutotileShape(tileId);
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

    if (Math.floor(kind / 8) % 2 === 1) {
      autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    }

    return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawAutoTile(tileId, x, y, drawWidth, drawHeight) {
    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);
    if (!bitmap) {
      return;
    }

    if (Tilemap.isTileA1(tileId)) {
      return this.drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA2(tileId)) {
      return this.drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA3(tileId)) {
      return this.drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA4(tileId)) {
      return this.drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight);
    }
  }

  drawTile(tileId, x, y, drawWidth, drawHeight) {
    if (tileId <= 0) {
      return;
    }

    if (Tilemap.isAutotile(tileId)) {
      return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
    }

    return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
  }

  drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY) {
    const halfWidth = CycloneMapEditor.tileWidth / 2;
    const halfHeight = CycloneMapEditor.tileHeight / 2;
    const realDrawWidth = (drawWidth ?? CycloneMapEditor.tileWidth);
    const realDrawHeight = (drawHeight ?? CycloneMapEditor.tileHeight);

    const sourceX = (tileX * CycloneMapEditor.tileWidth) + (pieceX * halfWidth);
    const sourceY = (tileY * CycloneMapEditor.tileHeight) + (pieceY * halfHeight);
    const targetX = x;
    const targetY = y;

    this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, realDrawWidth, realDrawHeight);

    return bitmap;
  }

  drawTilePieceA1(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY) {
    let tileX = 0;
    let tileY = 0;
    const kind = Tilemap.getAutotileKind(tileId);

    switch(kind) {
      case 0:
        tileX = 0;
        tileY = 0;
        break;
      case 1:
        tileX = 0;
        tileY = 3;
        break;
      case 2:
        tileX = 6;
        tileY = 0;
        break;
      case 3:
        tileX = 6;
        tileY = 3;
        break;
      default:
        tileX = Math.floor((kind % 8) / 4) * 8;
        tileY = Math.floor(kind / 8) * 6 + (Math.floor((kind % 8) / 2) % 2) * 3;

        if (kind % 2 === 1) {
          tileX += 6;
        }
        break;
    }

    return this.drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY);
  }

  drawTilePieceA2(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = (Math.floor(kind / 8) - 2) * 3;

    return this.drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY);
  }

  drawPuzzlePiece(pieceId, x, y, drawWidth, drawHeight) {
    if (pieceId <= 0) {
      return;
    }

    if (!Tilemap.isAutotile(pieceId)) {
      return;
    }

    const kind = Tilemap.getAutotileKind(pieceId);
    const tileId = Tilemap.makeAutotileId(kind, 0);
    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);
    if (!bitmap) {
      return;
    }

    const pieceShape = pieceId - tileId;
    const pieceX = pieceShape % 4;
    const pieceY = Math.floor(pieceShape / 4);

    if (Tilemap.isTileA1(tileId)) {
      return this.drawTilePieceA1(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY);
    }

    if (Tilemap.isTileA2(tileId)) {
      return this.drawTilePieceA2(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY);
    }
  }

  drawIcon(iconIndex, x, y, drawWidth, drawHeight) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;

    const realDrawWidth = drawWidth ?? pw;
    const realDrawHeight = drawHeight ?? ph;

    this.blt(bitmap, sx, sy, pw, ph, x, y, realDrawWidth, realDrawHeight);
  }

  drawRegion(regionId, x, y, drawWidth, drawHeight, stretchIcon = false) {
    const realDrawWidth = drawWidth ?? CycloneMapEditor.tileWidth;
    const realDrawHeight = drawHeight ?? CycloneMapEditor.tileHeight;

    if (regionId > 0) {
      const color = regionColors[regionId % regionColors.length];
      this.fillRect(x, y, realDrawWidth, realDrawHeight, `${ color}66`);
    }

    let iconIndex = CycloneMapEditor.regionIcons.get(regionId) ?? 0;
    if (iconIndex) {
      const {iconWidth, iconHeight} = ImageManager;
      const diffX = (realDrawWidth - iconWidth) / 2;
      const diffY = (realDrawHeight - iconHeight) / 2;

      const iconDrawWidth = stretchIcon ? realDrawWidth : iconWidth;
      const iconDrawHeight = stretchIcon ? realDrawHeight : iconHeight;
      const iconX = stretchIcon ? x : x + diffX;
      const iconY = stretchIcon ? y : y + diffY;

      this.drawIcon(iconIndex, iconX, iconY, iconDrawWidth, iconDrawHeight);
    } else {
      this.drawText(regionId, x, y, realDrawWidth, realDrawHeight, 'center');
    }
  }

  drawShadow(shadowId, x, y, drawWidth, drawHeight) {
    const halfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const halfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    if (shadowId <= 0 || shadowId > 15) {
      return;
    }

    const table = shadowId.toString(2).padZero(4);
    for (let i = 0; i < 4; i++) {
      if (table[3 - i] !== '1') {
        continue;
      }

      const drawX = x + (i % 2) * halfWidth;
      const drawY = y + Math.floor(i / 2) * halfHeight;

      this.fillRect(drawX, drawY, halfWidth, halfHeight, '#00000066');
    }
  }

  drawCollisionType(collision, x, y, drawWidth, drawHeight) {
    if (collision === 0) {
      return;
    }

    const realDrawWidth = drawWidth ?? CycloneMapEditor.tileWidth;
    const realDrawHeight = drawHeight ?? CycloneMapEditor.tileHeight;

    const colorIndex = collision <= 3 ? collision - 1 : 0;

    const context = this.context;
    context.save();

    const color = ['#00FF00', '#FF0000', '#FF00FF'][colorIndex];
    context.fillStyle = color;
    context.fillRect(x, y, realDrawWidth, realDrawHeight);

    let goesUp = false;
    let goesDown = false;
    let goesLeft = false;
    let goesRight = false;

    if (collision >= 20) {
      const unblockedDirection = collision - 20;
      goesUp = !DirectionHelper.goesUp(unblockedDirection);
      goesDown = !DirectionHelper.goesDown(unblockedDirection);
      goesLeft = !DirectionHelper.goesLeft(unblockedDirection);
      goesRight = !DirectionHelper.goesRight(unblockedDirection);
    } else if (collision > 10) {
      const blockedDirection = collision - 10;
      goesUp = DirectionHelper.goesUp(blockedDirection);
      goesDown = DirectionHelper.goesDown(blockedDirection);
      goesLeft = DirectionHelper.goesLeft(blockedDirection);
      goesRight = DirectionHelper.goesRight(blockedDirection);
    } else if (collision === 4) {
      goesDown = true;
      goesUp = true;
    } else if (collision === 5) {
      goesLeft = true;
      goesRight = true;
    }

    if (collision > 3) {
      const pieceWidth = Math.floor(realDrawWidth / 4);
      const pieceHeight = Math.floor(realDrawHeight / 4);
      context.fillStyle = '#FF00FF';

      if (goesUp) {
        context.fillRect(x, y, realDrawWidth, pieceHeight);
      }
      if (goesDown) {
        context.fillRect(x, y + realDrawHeight - pieceHeight, realDrawWidth, pieceHeight);
      }

      if (goesLeft) {
        context.fillRect(x, y, pieceWidth, realDrawHeight);
      }

      if (goesRight) {
        context.fillRect(x + realDrawWidth - pieceWidth, y, pieceWidth, realDrawHeight);
      }
    }

    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + realDrawWidth, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + realDrawHeight);
    context.stroke();
  }
});

CycloneMapEditor.patchClass(DataManager, $super => class {
  static loadMapData(mapId) {
    if (mapId > 0 && CycloneMapEditor.mapCaches[mapId]) {
      globalThis.$dataMap = CycloneMapEditor.mapCaches[mapId];
      this.onLoad('$dataMap');
      return;
    }

    return $super.loadMapData.call(this, mapId);
  }
});

CycloneMapEditor.patchClass(Game_Map, $super => class {
  screenTileX() {
    if (!CycloneMapEditor.active) {
      return $super.screenTileX.call(this);
    }

    return (Graphics.width - CycloneMapEditor.windowWidth) / this.tileWidth();
  }

  screenTileY() {
    if (!CycloneMapEditor.active) {
      return $super.screenTileY.call(this);
    }

    return (Graphics.height - 40) / this.tileHeight();
  }

  regionId(x, y) {
    if (CycloneMapEditor.active) {
      return CycloneMapEditor.getCurrentTileAtPosition(x, y, 5, false);
    }

    return $super.regionId.call(this, x, y);
  }

  isLoopHorizontal() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isLoopHorizontal.call(this);
  }

  isLoopVertical() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isLoopVertical.call(this);
  }

  canvasToMapX(x) {
    if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
      return $super.canvasToMapX.call(this, x);
    }

    const tileWidth = this.tileWidth() * CycloneMapEditor.currentZoom;
    const originX = this._displayX * tileWidth;
    const mapX = Math.floor((originX + x) / tileWidth);
    return this.roundX(mapX);
  }

  canvasToMapY(y) {
    if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
      return $super.canvasToMapY.call(this, y);
    }

    const tileHeight = this.tileHeight() * CycloneMapEditor.currentZoom;
    const originY = this._displayY * tileHeight;
    const mapY = Math.floor((originY + y) / tileHeight);
    return this.roundY(mapY);
  }

  scrollDown(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollDown.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
    const lastY = this._displayY;
    this._displayY = Math.min(this._displayY + distance, this.height() - this.screenTileY() + extraTiles);
    this._parallaxY += this._displayY - lastY;
  }

  scrollLeft(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollLeft.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 3;
    const lastX = this._displayX;
    this._displayX = Math.max(this._displayX - distance, -extraTiles);
    this._parallaxX += this._displayX - lastX;
  }

  scrollRight(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollRight.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 5;
    const lastX = this._displayX;
    this._displayX = Math.min(this._displayX + distance, this.width() - this.screenTileX() + extraTiles);
    this._parallaxX += this._displayX - lastX;
  }

  scrollUp(distance) {
    if (!CycloneMapEditor.active) {
      return $super.scrollUp.call(this, distance);
    }

    const extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
    const lastY = this._displayY;
    this._displayY = Math.max(this._displayY - distance, -extraTiles);
    this._parallaxY += this._displayY - lastY;
  }

  checkTileIdPassage(tileId, d) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return this.getPassageBitType(flag, d);
  }

  getPassageBitType(flag, d) {
    const bit = (1 << (d / 2 - 1)) & 0x0f;
    if ((flag & bit) === 0) {
      // [o] Passable
      return true;
    }
    if ((flag & bit) === bit) {
      // [x] Impassable
      return false;
    }
  }

  getTileFlag(tileId) {
    const flags = this.tilesetFlags();
    return flags[tileId];
  }

  checkTileIdPassageType(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    if ((flag & 0x10) !== 0) {
      if (tileId < Tilemap.TILE_ID_A1) {
        return TilePassageType.star;
      }
      return TilePassageType.free;
    }

    const top = this.getPassageBitType(flag, 8);
    const bottom = this.getPassageBitType(flag, 2);
    const left = this.getPassageBitType(flag, 4);
    const right = this.getPassageBitType(flag, 6);

    if (top === false && bottom === false && left === false && right === false) {
      return TilePassageType.blocked;
    }

    return TilePassageType.free;
  }

  tileIdIsBush(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x40) !== 0;
  }

  tileIdIsLadder(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x20) !== 0;
  }

  tileIdIsCounter(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x80) !== 0;
  }

  tileIdIsDamage(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    return (flag & 0x100) !== 0;
  }

  tileIdTerrainTag(tileId) {
    const flags = this.tilesetFlags();
    const flag = flags[tileId];

    const tag = flag >> 12;
    if (tag > 0) {
      return tag;
    }

    return 0;
  }
});

CycloneMapEditor.patchClass(Game_Player, $super => class {
  centerX() {
    if (!CycloneMapEditor.active) {
      return $super.centerX.call(this);
    }

    return ((Graphics.width - CycloneMapEditor.windowWidth) / $gameMap.tileWidth() - 1) / 2.0;
  }

  centerY() {
    if (!CycloneMapEditor.active) {
      return $super.centerY.call(this);
    }

    return ((Graphics.height - 40) / $gameMap.tileHeight() - 1) / 2.0;
  }

  reserveTransfer(mapId, ...args) {
    if (CycloneMapEditor.changeHistory.length > 0) {
      if (confirm('Do you want to save your map before teleporting away?')) {
        CycloneMapEditor._doSave();
      }
    }

    $super.reserveTransfer.call(this, mapId, ...args);
  }

  executeEncounter() {
    const result = $super.executeEncounter.call(this);

    if (result) {
      if (CycloneMapEditor.changeHistory.length > 0) {
        if (confirm('Do you want to save your map before the battle starts?')) {
          CycloneMapEditor._doSave();
        }
      }
    }

    return result;
  }

  updateMove() {
    $super.updateMove.call(this);
    CycloneMapEditor.requestCollisionRefresh();
  }
});

class WindowCycloneGrid extends Window_Base {
  initialize() {
    const width = Graphics.width;
    const height = Graphics.height;
    const rect = new Rectangle(0, 0, width, height);

    super.initialize(rect);

    this.padding = 0;
    this.refresh();
    this.opacity = 0;

    this.backOpacity = 0;
    this.hide();
    this.deactivate();
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  drawCellGrid(x, y) {
    if (!CycloneMapEditor.showGrid) {
      return;
    }

    const gridRatio = CycloneMapEditor.getGridRatio(true);

    const drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom) / gridRatio;
    const drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom) / gridRatio;

    const context = this.contents.context;
    context.strokeStyle = '#666666';

    for (let cellX = 0; cellX < gridRatio; cellX++) {
      for (let cellY = 0; cellY < gridRatio; cellY++) {

        const drawX = x + cellX * drawWidth;
        const drawY = y + cellY * drawHeight;

        context.strokeRect(drawX, drawY, drawWidth, drawHeight);
      }
    }
    context.stroke();
  }

  maybeDrawRegions(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.regions)) {
      return;
    }

    if (CycloneMapEditor.isLayerVisible(Layers.tags)) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    const regionId = $gameMap.regionId(mapX, mapY);
    if (regionId > 0) {
      this.contents.drawRegion(regionId, x, y);
    }
  }

  checkTilePassability(x, y, d) {
    return $gameMap.isPassable(x, y, d);
  }

  drawTilesetCollision(x, y) {
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);
    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    const downBlocked = !this.checkTilePassability(mapX, mapY, 2);
    const upBlocked = !this.checkTilePassability(mapX, mapY, 8);
    const leftBlocked = !this.checkTilePassability(mapX, mapY, 4);
    const rightBlocked = !this.checkTilePassability(mapX, mapY, 6);
    const same = downBlocked === upBlocked && downBlocked === leftBlocked && downBlocked === rightBlocked;

    if (downBlocked && same) {
      this.contents.fillRect(x, y, drawWidth, drawHeight, '#FF000033');
      return;
    }

    const sideHeight = 2;
    const sideWidth = 2;

    this.contents.fillRect(x, y, drawWidth, drawHeight, '#00FF0033');

    if (downBlocked) {
      this.contents.fillRect(x, y + drawHeight - sideHeight, drawWidth, sideHeight, '#FF00FFAA');
    }
    if (upBlocked) {
      this.contents.fillRect(x, y, drawWidth, sideHeight, '#FF00FFAA');
    }
    if (leftBlocked) {
      this.contents.fillRect(x, y, sideWidth, drawHeight, '#FF00FFAA');
    }
    if (rightBlocked) {
      this.contents.fillRect(x + drawWidth - sideWidth, y, sideWidth, drawHeight, '#FF00FFAA');
    }
  }

  drawCustomCollision(x, y) {
    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);
    const customCollisionTable = CycloneMapEditor.customCollisionTable;
    const height = $gameMap.height() * 4;
    const width = $gameMap.width() * 4;
    const tileWidth = CycloneMapEditor.tileWidth;
    const tileHeight = CycloneMapEditor.tileHeight;
    const drawWidth = tileWidth / 4;
    const drawHeight = tileHeight / 4;
    const colors = ['#00FF00AA', '#FF0000AA', '#FF00FFFF'];

    const context = this.contents.context;
    context.save();

    const drawCustomSideCollisions = (goesUp, goesDown, goesLeft, goesRight, drawX, drawY) => {
      context.fillStyle = colors[2];
      const pieceWidth = Math.floor(drawWidth / 4);
      const pieceHeight = Math.floor(drawHeight / 4);

      if (goesUp) {
        context.fillRect(drawX, drawY, drawWidth, pieceHeight);
      }
      if (goesDown) {
        context.fillRect(drawX, drawY + drawHeight - pieceHeight, drawWidth, pieceHeight);
      }

      if (goesLeft) {
        context.fillRect(drawX, drawY, pieceWidth, drawHeight);
      }
      if (goesRight) {
        context.fillRect(drawX + drawWidth - pieceWidth, drawY, pieceWidth, drawHeight);
      }
    };

    for (let cellX = 0; cellX < 4; cellX++) {
      for (let cellY = 0; cellY < 4; cellY++) {

        const intX = Math.floor(mapX * 4) + cellX;
        const intY = Math.floor(mapY * 4) + cellY;
        const index = (intY % height) * width + (intX % width);

        if (customCollisionTable[index]) {
          const drawX = x + (cellX * drawWidth);
          const drawY = y + (cellY * drawHeight);

          context.clearRect(drawX, drawY, drawWidth, drawHeight);

          const collision = customCollisionTable[index];
          const colorIndex = collision <= 3 ? collision - 1 : 0;
          const color = colors[colorIndex];
          context.fillStyle = color;
          context.fillRect(drawX, drawY, drawWidth, drawHeight);

          let goesUp = false;
          let goesDown = false;
          let goesLeft = false;
          let goesRight = false;

          if (collision >= 20) {
            const d = collision - 20;
            goesUp = !DirectionHelper.goesUp(d);
            goesDown = !DirectionHelper.goesDown(d);
            goesLeft = !DirectionHelper.goesLeft(d);
            goesRight = !DirectionHelper.goesRight(d);
          } else if (collision > 10) {
            const d = collision - 10;
            goesUp = DirectionHelper.goesUp(d);
            goesDown = DirectionHelper.goesDown(d);
            goesLeft = DirectionHelper.goesLeft(d);
            goesRight = DirectionHelper.goesRight(d);
          } else if (collision === 4) {
            goesUp = true;
            goesDown = true;
          } else if (collision === 5) {
            goesLeft = true;
            goesRight = true;
          }

          if (collision > 3) {
            drawCustomSideCollisions(goesUp, goesDown, goesLeft, goesRight, drawX, drawY);
          }
        }
      }
    }

    context.restore();
    this.contents._baseTexture.update();
  }

  maybeDrawCollisions(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.collisions)) {
      return;
    }

    this.drawTilesetCollision(x, y);
    this.drawCustomCollision(x, y);
  }

  maybeDrawTags(x, y) {
    if (!CycloneMapEditor.isLayerVisible(Layers.tags)) {
      return;
    }

    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    const terrainTag = $gameMap.terrainTag(mapX, mapY);
    if (terrainTag === 0) {
      return;
    }

    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    this.contents.drawText(terrainTag, x, y, drawWidth, drawHeight, 'center');
  }

  drawCell(x, y) {
    const mapX = $gameMap.canvasToMapX(x);
    const mapY = $gameMap.canvasToMapY(y);

    if (!$gameMap.isValid(mapX, mapY)) {
      return false;
    }


    this.maybeDrawCollisions(x, y);
    this.maybeDrawRegions(x, y);
    this.maybeDrawTags(x, y);

    this.drawCellGrid(x, y);
  }

  refresh() {
    this.contents.clear();

    this._lastDisplayX = $gameMap._displayX;
    this._lastDisplayY = $gameMap._displayY;

    const drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom);
    const drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom);

    let paddingX;
    let paddingY;

    if ($gameMap._displayX < 0) {
      paddingX = Math.floor($gameMap._displayX * CycloneMapEditor.tileWidth);
    } else {
      paddingX = Math.floor(($gameMap._displayX - Math.floor($gameMap._displayX)) * drawWidth);
    }

    if ($gameMap._displayY < 0) {
      paddingY = Math.floor($gameMap._displayY * CycloneMapEditor.tileHeight);
    } else {
      paddingY = Math.floor(($gameMap._displayY - Math.floor($gameMap._displayY)) * drawHeight);
    }

    const mapStartX = 0 - paddingX;
    const mapStartY = 0 - paddingY;
    const mapEndX = mapStartX + ($gameMap.width() * drawWidth);
    const mapEndY = mapStartY + ($gameMap.height() * drawHeight);

    const rightPos = Math.min(Graphics.width, mapEndX);
    let bottomPos = Math.min(Graphics.height, mapEndY);

    for (let x = mapStartX; x < rightPos; x += drawWidth) {
      if (x + drawWidth < 0) {
        continue;
      }

      for (let y = mapStartY; y < bottomPos; y += drawHeight) {
        if (y + drawHeight < 0) {
          continue;
        }

        this.drawCell(x, y);
      }
    }

    if (CycloneMapEditor.isLayerVisible(Layers.collisions)) {
      this.drawEventsCollision();
      this.drawPlayerCollision();
    }
  }

  drawEventsCollision() {
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();

    for (const event of $gameMap._events) {
      if (!event) {
        continue;
      }
      if (event._priorityType !== 1 || event._through || event._erased) {
        continue;
      }

      const x = event.x * $gameMap.tileWidth();
      const y = event.y * $gameMap.tileHeight();
      const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
      const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

      if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
        continue;
      }

      this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF00FF66');
    }
  }

  drawPlayerCollision() {
    if (window.CycloneMovement) {
      return this.drawCycloneMovementPlayerCollision();
    }

    const x = $gamePlayer.x * $gameMap.tileWidth();
    const y = $gamePlayer.y * $gameMap.tileHeight();
    const drawWidth = $gameMap.tileWidth();
    const drawHeight = $gameMap.tileHeight();
    const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
    const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

    if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
      return;
    }

    this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
  }

  drawCycloneMovementPlayerCollision() {
    const { top, left, width, height } = $gamePlayer;

    const x = left * $gameMap.tileWidth();
    const y = top * $gameMap.tileHeight();
    const drawWidth = width * $gameMap.tileWidth();
    const drawHeight = height * $gameMap.tileHeight();
    const drawX = x - ($gameMap._displayX * $gameMap.tileWidth());
    const drawY = y - ($gameMap._displayY * $gameMap.tileHeight());

    if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
      return;
    }

    this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
  }

  update() {
    if (!CycloneMapEditor.active) {
      return;
    }

    if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
      this.refresh();
    }
  }

  requestRefresh() {
    this._lastDisplayX = -999;
  }
}

const pencilIcon = new Image();
pencilIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQUOhdRws4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABGElEQVRIx9XUIW/CQBiA4ZcFwRQhkEEysEdSNAoFPwKBmcXO4FBTwxB+Av8BDQo1PQi1sGSChKBGMsHUkR7XMnpfQ8KnWvO8vVzv4N4nJQV+Doejfn7MZCwvLcVbShnv55G0FB88P+E1agC0lLIiDyL8NUe5n2cx/wRg0m6eIs4BA6+WAIyInko2e4wdCMMBNqtvaP9akVh7cBEHytUSna8lU99HFYvxftOr8K6Jr/f71FUBCf5vQIpfDCSBRwaSwkMDSeLWOdB4/6VJb7gT45EHreDVGb336HSXItwIBL9ej16JKx66goJXB2C7+DhFXHFjk4N3u17F23gG4IxHBvRMfR/AGbd+0+A9HoRd8dBzoO9xKXyz+QMErgZJQZj0xAAAAABJRU5ErkJggg==';

const lineIcon = new Image();
lineIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVD1j5N6wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeklEQVRIx2NgGAWjYBTQHDAic77/+PGfGoZycnDAzWVBNtxJTY0qrv7+48d/mCUs6JJ89XsYpJ1VyTb8up08AwMDA4MsP///xx8/MjKhK6DE8Kd7b2OIseByAbUAC3LEUCuS1cTFsaciWNhRw5LHHz8yjmbSUTAKIAAAHrcgEXUU5YwAAAAASUVORK5CYII=';

const rectangleIcon = new Image();
rectangleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVGNsqsmsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA0klEQVRIx2NgGAUEACM2we8/fvwnxzBODg4M81iwGe6kpkaWa7//+PEf3RIWbIbz1e9hkHZWJcnwp3tvMzipqWFYwoJNsbSzKsPTvbdJskDaWZXhUyOELcvP///xx4+MDAwMDEz4NL3beozh3dZjRPOxASZCLhPytkJho/MJASZiDSdXDROt8wHBOCAEKI4DmvpgNA6I8gGhjEYIsJASvoT4RFvwdO9tsgo7ouoDSorrfbduMaiJizMwMDAwwAo7qlY46IbjtABW5JJjCbLhwwMAAI5+ZZrvEYecAAAAAElFTkSuQmCC';

const fillIcon = new Image();
fillIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVI2ohW08AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABpElEQVRIx82VMUtCURiGH0PQlhxFwusSBxyCwKGMKLiELc5uIQ0FDtFWUzQb1B/oB0Q2NCfq4OQ/EE4tInFxKGlKabgNcS733vQeFaPOdM65l+f9vu+83znw38bHYGB/DAb2pP+Hp4WbQjjzxWg0NNfIs4Zh3x+s2d3bdTtrGBNlsjCLWKs6pFJOYAqBTmQmgev6m2edjMXsuQr8inNU/bOG4TmDZCxmB2UwlYteF1cp5gGkZ7/7/h6auUTKmsX8DgBbx+cA3DzWMIVA9nqzu2gUvH1ZcL4rkSAnhSeBP2TOudr83t/IRWhVh6TXfoqMarxQEHzpogZAadliJZUA4LljAThrtVc+2qchJX4R7RmUlq0fYD880z8d23haAT9MCbnh/uG2bWhcedLNDu3tlFNnN1iNTP+UVnXIRi5C4cyiISUiHvdYV5tBQ0oO93Y9mQB83p1o4VqBdLODKYQj4oYrRwXBp+rkhpSYQlApJyAXAdDCtQIv9SdnLuJxZK+HenCUaBBce7mNutDUkznJRTe20RRIRe6P0A2dKvJRftZF+OfjCySNE5ddU05FAAAAAElFTkSuQmCC';

const eraseIcon = new Image();
eraseIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVLhSQJ/IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABK0lEQVRIx2NgGAUEACMxir7/+PEfXYyTg4MovSzEGO6kpkbQUlwWshBj+EwDNQZpNWm4+NNbTxnQLf3+48d/bJawEONNZMNh/C1oYk5qalgtYSLG9YTA01tP4WxZfv7/RFmAy/WkAiZqup5oC0h1/ek7z4i3gBzXz/nyhWHfrVsMauLixCdT7t4Ohg9Q9pO7Txh09qwnyvWPP35kxGkBzPUdsyahaJJRlmH4oJyLInZw53YGk1tP8boeZxzIKMvgDZond58wMDAwMJxxs8freqKSKTZw985lBgYGBobZXbPxuh5nHMBciM1H6HL4XE90UYFsKCmux7CAk4ODEVvpiR7pxLoeqw9glqAXZOiAGNfjrXCQC61bL19iyMMMx+d6oms0bKUkMYYPDwAArdGaa9wnQ0IAAAAASUVORK5CYII=';

const saveIcon = new Image();
saveIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVN3D7jzIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA4ElEQVRIx2NgGAUDDRhxSXz/8eM/KQZxcnBgNYsFl+FOamokufT7jx//sVnCgstwC6dMBgl1RQZ1Q0kGFXlJrIbeefic4eb55wwvbt5ncFJTw2oJEy4XSagrMjAwMOA0PNXdBUMtAwMDgyw//3+iLKAWIGjBnYfPsYqXz1pMlAUshBTcPA8JZ5r5gFJA0Acvbt7HK48cwWRZgM8QQpYTbQExBg1fHzARMvTEvukMEuqKWPGJfdMJOoCRWoXdvlu3GNTExRkYGBgYHn/8yEj14hqb4XgtwFZwEQLoho8CogAAz0BbPsc/fBQAAAAASUVORK5CYII=';

const reloadIcon = new Image();
reloadIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWA3piKEQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABe0lEQVRIx9VVq7KDMBDdzCBARVbcwaaytpoavoUf4Bv6A/0WDGgsklgGUYkqjorOMpvthuSaO3PXpSTn7OPsKcB/DxVz6bWuG/8tS9Oot0kMaGGM9zsS8fMhwWtdNwr6uP/A+ZLv53GYdlIEpmdKonzgHFSKcZigqmcniVvZQ2ftXkkigbfNVQThFZ0vObTNB5Qnk2u9TcuikiPwW9kDAEBnrfP40455J6JvooaMWSOwOZ2c7/b5hMIYqOoZ2iaPU1GWpooOt7PWAZ6WRfkqjZYpktCsEViqkvd9HKbwoklLxfXNZUyDVu4MOfSQ6ptWyoNXnsTqvzDmiyTXeqOD5/MSVSSB096ivqXBI1GWpmEvknaBy5XaBFbOKw0StM0VbmUPhTG0DY7/SJL92mQpc7qp1OB8Jog+RCv1bjIAQFXP8LiD4zuhzecqUj6Zok3gWbJsaoIS+OGi4WXsu7Qf1AR9my/aAOobL+dab1TnHFTS/6/+kzlxCPRP4w3A6io0yt+JDgAAAABJRU5ErkJggg==';

const undoIcon = new Image();
undoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWHYBtFScAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABKUlEQVRIx+1Uq7LCMBA97URwMchiro2s7AdUFF3db0H1W9DVRfABlZWx14DEAK6Ym50lbJqAwXBmOtNNZs7Zx9kAX3waie/iertNAPCzWCQ8dmHvfVA+8lLrByEbhxIJCljyZbtGXeREbGMXPBFJJPWVxsl85ADQ9BWW7Rql1mIbVWhITV/R/26zf7izwnWRo2tBIrySNNYN3TACAA7G0HfZHumcV/i7Wk0vC9RFjqavqOc6y0hkDmko49BZCErytXXSDs/ZHYyBzrL3BbiIdGfJ/87nBMD0loBbCc/enE42pH2Za5+aeypKrcmm3TA+bTPfj8v2KLZPveIi9HmUIf7bF98i3yZ3w0g29Q0/CWXuzkFylTD8eIG5p5oTS+TRAu76u5CIv4jGHaoeqH4byFz/AAAAAElFTkSuQmCC';

const redoIcon = new Image();
redoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWJahvrbkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABIklEQVRIx+1VqxaCQBC96yGAhYjFupHoBxDsZr/FxLeYyRQ/gEikWiRalIZBhzMsuzBosHDPIeze3TvPHYAF/4aSHHo2TWvbD3xfcZ7WHJ5EONFaxD+bpjWNeGPidPGY7wd8VpTgPK1NI6sx8XW6sYoDwGEXY51uemvCNgxbZwRcnC5lRYnH6dY7d8z3bz6PR+u3chGm+KWquo/2JfCmDpC4jiJUdY1Ea2faZkUwBpv3roi8OcKB7yuq0Rm3AU+Rfm2AG7FxJH6939Wkgawou1ZMtEZV1wDQCfPHxz3n4lYDPA3IYxx2MbJ0+Jp5G5MDs0cFRSHpd3pgZgRKMiq4t6YDvI1tKVK/DLup/IvG9TYM20+BIe2c2f8Dc4CZcIkvEOEFIdSyhtt+PqwAAAAASUVORK5CYII=';

class WindowCycloneMapEditorCommands extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = 0;
    const w = CycloneMapEditor.windowWidth;
    const h = (CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280) ? 74 : 50;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
    this.configureHandlers();
  }

  configureHandlers() {
    this.setHandler('undo', () => {
      CycloneMapEditor.undoButton();
      this.activate();
    });
    this.setHandler('redo', () => {
      CycloneMapEditor.redoButton();
      this.activate();
    });
    this.setHandler('pencil', () => {
      CycloneMapEditor.pencilButton();
      this.activate();
    });
    this.setHandler('rectangle', () => {
      CycloneMapEditor.rectangleButton();
      this.activate();
    });
    this.setHandler('fill', () => {
      CycloneMapEditor.fillButton();
      this.activate();
    });
    this.setHandler('eraser', () => {
      CycloneMapEditor.eraserButton();
      this.activate();
    });
    this.setHandler('save', () => {
      CycloneMapEditor.saveButton();
      this.activate();
    });
    this.setHandler('reload', () => {
      CycloneMapEditor.reloadButton();
      this.activate();
    });
  }

  maxScrollY() {
    return 0;
  }

  maxScrollX() {
    return 0;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  makeCommandList() {
    this.addCommand('Undo', 'undo');
    this.addCommand('Redo', 'redo');

    this.addCommand('', '');

    this.addCommand('Pen', 'pencil');
    this.addCommand('Rect', 'rectangle');
    this.addCommand('Fill', 'fill');
    this.addCommand('Erase', 'eraser');
  }

  colSpacing() {
    return 6;
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    return 7;
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);
  }

  getSymbolIcon(symbol) {
    switch(symbol) {
      case 'undo':
        return undoIcon;
      case 'redo':
        return redoIcon;
      case Tools.pencil:
        return pencilIcon;
      case Tools.rectangle:
        return rectangleIcon;
      case Tools.fill:
        return fillIcon;
      case Tools.eraser:
        return eraseIcon;
      case 'save':
        return saveIcon;
      case 'reload':
        return reloadIcon;
    }
  }

  itemRect(index) {
    const rect = super.itemRect(index);

    if (Graphics.width < 1280) {
      rect.width += 3;
    }

    return rect;
  }

  lineHeight() {
    if (Graphics.width >= 1280) {
      if (CycloneMapEditor.tileDrawWidth < 48) {
        return 14;
      }

      return 36;
    }

    return 14;
  }

  drawItem(index) {
    const symbol = this.commandSymbol(index);
    const rect = this.itemRect(index);

    if (CycloneMapEditor.changingTileProps && ['undo', 'redo'].includes(symbol)) {
      return;
    }

    if (CycloneMapEditor.currentLayer === Layers.blend) {
      if (symbol === Tools.fill) {
        return;
      }
    } else if (CycloneMapEditor.puzzleMode) {
      if ([Tools.rectangle, Tools.fill].includes(symbol)) {
        return;
      }
    }

    if (symbol === CycloneMapEditor.currentTool) {
      this.contents.fillRect(rect.x, rect.y + 2, rect.width, rect.height, '#00FF0066');

      this.contents.fillRect(rect.x -2, rect.y, rect.width + 4, 4, '#000000');
      this.contents.fillRect(rect.x -2, rect.y + 2 + rect.height, rect.width + 6, 4, '#000000');
      this.contents.fillRect(rect.x - 2, rect.y, 4, rect.height + 4, '#000000');
      this.contents.fillRect(rect.x + rect.width, rect.y, 4, rect.height + 4, '#000000');

      this.contents.fillRect(rect.x, rect.y + 2, rect.width, 2, '#FFFFFF');
      this.contents.fillRect(rect.x, rect.y + 2 + rect.height, rect.width + 2, 2, '#FFFFFF');
      this.contents.fillRect(rect.x, rect.y + 2, 2, rect.height, '#FFFFFF');
      this.contents.fillRect(rect.x + rect.width, rect.y + 2, 2, rect.height, '#FFFFFF');
    }

    const icon = this.getSymbolIcon(symbol);

    if (!icon) {
      return super.drawItem(index);
    }

    this.resetTextColor();
    if (symbol === 'undo') {
      this.changePaintOpacity(CycloneMapEditor.changeHistory.length > 0);
    } else if (symbol === 'redo') {
      this.changePaintOpacity(CycloneMapEditor.undoHistory.length > 0);
    } else {
      this.changePaintOpacity(true);
    }

    const ctx = this.contents._canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const iconWidth = (CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280) ? 48 : 24;
    ctx.drawImage(icon, rect.x + 1, rect.y, iconWidth, iconWidth);
  }

  drawAllItems() {
    super.drawAllItems();
  }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }
}

const hiddenIcon = new Image();
hiddenIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWFPmxrYMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABBElEQVRIx+2UMQqDMBSGf4uDTo6dXCMIXsJLCEIPUfAYBc8gQqF3EM/woFBo1k4dOzWbnSJRk5jSsf4gmOfL95u8lwCbNv0qzzXxLcSgjsMgcJrru4JzxrTxNSN/DS7BVV1Pvsn4W4jBZuKtwSU4STMAwP12neSdjkf0nBtXsluDJ2k2wlUREZI0Q1XXyBlb1MhoMIdLXc7t4u/lymwmO9MWEdFkXJQHENH4FOVBmxtH0WAtchgEnlpcFaS+qyvrmgY952D7vVsXzU108Mu5BYAF/PF6eU5tqjNR1TUNAFjhTifZdNB6zgHACne+KuIoGvjzOYmp+22Cf3UX6TrEBt70R/oAQESSsFk1AwIAAAAASUVORK5CYII=';

const visibleIcon = new Image();
visibleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWDOrdNdUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABOUlEQVRIx+2Uu07DMBSG/6AM6WR1apdYQkiRMrUbZM1SXgB2RkYY8hBdsvYJOtCpEqqYuvQpsIQiAQOdok7xdphOidM2NmIkv+ThHNvfufgCdOr0V3muCyutqW73gsBpr+8KTqPoqN8WyLfBGTyfxcYc+yutqS2Ib4MzeJguDTD70yiyBjkKT6SkYjWhSmtjJFJSIiUt7sZUaU3FakKJlNQ8I9ZZW+acNQA8318dnANXNp/F+0qcW/T5+oVh+mPH2RMecWvY9bWsUAj62O08pxZt8tFBi5pjk4/2LQqFoFAIslbQCwKPWzXFJQCgf73AxbkEALwV7yhfbgAAWV5irRSiwQAA0Mzec72m04e+MZflJQC0wp1e8qmHtlYKAFrhzl9FKASp7dbwMbgN/qu/iAPVbett6fQ/9A0c7tBBCKKL7gAAAABJRU5ErkJggg==';

class WindowCycloneMapEditorLayerList extends Window_Base {
  initialize() {
    const x = 0;
    const w = 180;
    const y = 0;
    const h = Graphics.height - 40;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
  }

  update() {
    super.update();
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  refresh() {
    this.drawContents();
    SceneManager._scene.redrawMap();
  }

  drawContents() {
    this.contents.clear();
    const ctx = this.contents._canvas.getContext('2d');

    const names = [
      'Auto Layer',
      'Layer 1',
      'Layer 2',
      'Layer 3',
      'Layer 4',
      'Shadows',
      'Regions',
      'Events',
    ];
    this.contents.fontSize = 22;

    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < 8; i++) {
      const layerIndex = i === 0 ? Layers.auto : i - 1;
      this.contents.fontBold = CycloneMapEditor.currentLayer === layerIndex;
      this.changeTextColor(CycloneMapEditor.currentLayer === layerIndex ? ColorManager.powerUpColor() : ColorManager.normalColor());

      if (layerIndex !== Layers.auto) {
        ctx.drawImage(CycloneMapEditor.layerVisibility[layerIndex] ? visibleIcon : hiddenIcon, -4, 30 * i - 4, 48, 48);
        this.drawText(names[i], 40, i * 30, this.contents.width - 40, 'left');
      } else {
        this.drawText(names[i], 10, i * 30, this.contents.width - 10, 'left');
      }

    }
  }

  toggleLayerVisibility(layerIndex) {
    CycloneMapEditor.layerVisibility[layerIndex] = !CycloneMapEditor.layerVisibility[layerIndex];
    this.refresh();
    SceneManager._scene._mapEditorGrid.refresh();
  }

  getLayerIndex(y) {
    const padding = this.padding + 10;

    if (y < padding || y > this.height - padding + 6) {
      return -1;
    }

    const layerIndex = Math.floor((y - padding) / 30);
    if (y > padding + (layerIndex * 30) + 22) {
      return -1;
    }

    if (layerIndex > CycloneMapEditor.layerVisibility.length) {
      return -1;
    }

    if (layerIndex === 0) {
      return Layers.auto;
    }

    return layerIndex - 1;
  }

  onMapTouch(x, y) {
    let layerIndex = this.getLayerIndex(y);
    if (layerIndex < 0) {
      return;
    }

    if (x >= CycloneMapEditor.windowWidth / 2) {
      x -= CycloneMapEditor.windowWidth / 2;
      layerIndex += 4;
    }

    if (x < 50 && layerIndex < 7) {
      this.toggleLayerVisibility(layerIndex);
      return;
    }

    CycloneMapEditor.changeCurrentLayer(layerIndex);
    this.refresh();
  }
}

class WindowCycloneMapEditorStatus extends Window_Base {
  initialize() {
    const h = 40;
    super.initialize(new Rectangle(0, Graphics.height - h, Graphics.width, h));
    this.showBackgroundDimmer();
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  refresh() {
    this.drawContents();
  }

  lineHeight() {
    return 16;
  }

  makeLine() {
    let line = '';

    const addConditional = (paramName, newPart) => {
      if (CycloneMapEditor.params[paramName]) {
        if (line && newPart) {
          return `, ${ newPart }`;
        }

        return newPart;
      }

      return '';
    };

    line += addConditional('showMapId', `Map: ${ $gameMap._mapId }`);
    line += addConditional('showTilesetId', `Tileset: ${ $gameMap._tilesetId }`);
    line += addConditional('showPosition', `Pos: ${ CycloneMapEditor.statusMapX }, ${ CycloneMapEditor.statusMapY }`);

    if (CycloneMapEditor.params.showCellTiles) {
      const { statusTile1, statusTile2, statusTile3, statusTile4 } = CycloneMapEditor;
      if (line) {
        line += ' - ';
      }
      line += `Tiles: (${ statusTile1 }, ${ statusTile2 }, ${ statusTile3 }, ${ statusTile4 })`;
    }

    line += addConditional('showRegionId', `Region: ${ CycloneMapEditor.statusRegion }`);
    line += addConditional('showTag', `Tag: ${ CycloneMapEditor.statusTag }`);
    line += addConditional('showCollision', `Collision: ${ CycloneMapEditor.statusCollision }`);
    line += addConditional('showLadder', CycloneMapEditor.statusLadder ? ' Ladder' : '');
    line += addConditional('showBush', CycloneMapEditor.statusBush ? ' Bush' : '');
    line += addConditional('showCounter', CycloneMapEditor.statusCounter ? ' Counter' : '');
    line += addConditional('showDamageFloor', CycloneMapEditor.statusDamage ? ' Damage' : '');

    return line;
  }

  textY() {
    return 12;
  }

  drawMainLine() {
    const line = this.makeLine();
    this.drawText(line, 8, this.textY(), this.width - 8, 'left');
  }

  drawRightLine() {
    this.drawText(`TileId: ${ CycloneMapEditor.statusTileId }`, 0, this.textY(), this.width - 8, 'right');
  }

  drawContents() {
    this.contents.clear();
    this.contents.fontSize = 16;

    this.drawMainLine();
    this.drawRightLine();
  }
}

// import { Layers, Tools } from './constants';

class WindowCycloneMapEditorTabs extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = SceneManager._scene._mapEditorCommands.y + SceneManager._scene._mapEditorCommands.height;
    const w = CycloneMapEditor.windowWidth;
    const h = 74;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
    this.configureHandlers();
  }

  configureHandlers() {
    this.setHandler('a', () => {
      CycloneMapEditor.jumpToOneTileOf([Tilemap.TILE_ID_A1, Tilemap.TILE_ID_A2, Tilemap.TILE_ID_A3, Tilemap.TILE_ID_A4, Tilemap.TILE_ID_A5]);
      this.activate();
    });
    this.setHandler('b', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_B);
      this.activate();
    });
    this.setHandler('c', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_C);
      this.activate();
    });
    this.setHandler('d', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_D);
      this.activate();
    });
    this.setHandler('e', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E);
      this.activate();
    });
    this.setHandler('f', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 256);
      this.activate();
    });
    this.setHandler('g', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 512);
      this.activate();
    });
    this.setHandler('h', () => {
      CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_A5 + 256);
      this.activate();
    });
  }
  maxScrollY() {
    return 0;
  }

  maxScrollX() {
    return 0;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  makeCommandList() {
    this.addCommand('A', 'a');
    this.addCommand('B', 'b');
    this.addCommand('C', 'c');
    this.addCommand('D', 'd');
    this.addCommand('E', 'e');
    this.addCommand('F', 'f', Boolean(window.CycloneExtraTilesets));
    this.addCommand('G', 'g', Boolean(window.CycloneExtraTilesets));
    this.addCommand('H', 'h', Boolean(window.CycloneExtraTilesets));
  }

  colSpacing() {
    return 6;
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    return 8;
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);
  }

  // itemRect(index) {
  //   const rect = super.itemRect(index);

  //   if (Graphics.width < 1280) {
  //     rect.width += 3;
  //   }

  //   return rect;
  // }

  // lineHeight() {
  //   if (Graphics.width >= 1280) {
  //     if (CycloneMapEditor.tileDrawWidth < 48) {
  //       return 14;
  //     }

  //     return 36;
  //   }

  //   return 14;
  // }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }
}

class WindowCycloneMapEditor extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
    const w = CycloneMapEditor.windowWidth;
    const h = Graphics.height - y - SceneManager._scene._mapEditorStatus.height;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
  }

  onMapTouch(x, y) {

  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  addTile(tileId) {
    if (!CycloneMapEditor.getTilesetName(tileId)) {
      return;
    }

    if (Tilemap.isAutotile(tileId)) {
      if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
        this.addCommand(tileId, 'tile', true, tileId);
      } else if (Tilemap.isWaterfallTile(tileId)) {
        this.addCommand(tileId, 'tile', true, tileId);
      } else {
        this.addCommand(tileId, 'tile', true, tileId + 46);
      }
      return;
    }

    this.addCommand(tileId, 'tile', true, tileId);
  }

  makeManualTilesList() {
    const tileId = this._manualTileSelected;
    let maxShape = 46;

    if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
      maxShape = 15;
    } else if (Tilemap.isWaterfallTile(tileId)) {
      maxShape = 3;
    }

    for (let i = 0; i <= maxShape; i++) {
      this.addCommand(tileId + i, 'tile', true, tileId + i);
    }
  }

  makeShadowList() {
    for (let i = 0; i <= 15; i++) {
      this.addCommand(i, 'shadow', true, i);
    }
  }

  makeRegionList() {
    for (let i = 0; i <= 255; i++) {
      this.addCommand(i, 'region', true, i);
    }
  }

  isTileLayer() {
    return CycloneMapEditor.currentLayer === 7 || CycloneMapEditor.currentLayer < 4;
  }

  makeTileList() {
    if (CycloneMapEditor.puzzleMode) {
      this.makePuzzleList();
      return;
    }

    for (let tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_A5; tileId < Tilemap.TILE_ID_A5 + 128; tileId++) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_A5; tileId++) {
      this.addTile(tileId);
    }

    for (let tileId = Tilemap.TILE_ID_A5 + 256; tileId < Tilemap.TILE_ID_A5 + 512; tileId++) {
      this.addTile(tileId);
    }
  }

  makePuzzleList() {
    const min = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A1) ? Tilemap.TILE_ID_A1 : Tilemap.TILE_ID_A2;
    const max = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A2) ? Tilemap.TILE_ID_A3 : Tilemap.TILE_ID_A2;

    const tileList = [];

    for (let tileId = min; tileId < max; tileId += 48) {
      if (Tilemap.isWaterfallTile(tileId)) {
        continue;
      }
      if (tileId === 2144 || tileId === 2192) {
        continue;
      }

      tileList.push(tileId);
    }

    for (let i = 0; i < tileList.length; i += 4) {
      for (let pieceY = 0; pieceY < 6; pieceY++) {
        for (let idx = 0; idx <= 3; idx++) {
          const tileId = tileList[i + idx];
          if (!tileId) {
            continue;
          }

          for (let pieceX = 0; pieceX < 4; pieceX++) {
            const pieceId = tileId + pieceX + pieceY * 4;
            this.addCommand(pieceId, 'puzzle', true, pieceId);
          }
        }
      }
    }
  }

  makeCommandList() {
    if (CycloneMapEditor.changingTileProps) {
      this.makeTileList();
      return;
    }

    if (this._manualTileSelected) {
      this.makeManualTilesList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 4) {
      this.makeShadowList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 5) {
      this.makeRegionList();
      return;
    }

    if (this.isTileLayer()) {
      this.makeTileList();
      return;
    }

    if (CycloneMapEditor.currentLayer === 8) {
      this.makeCollisionList();
      return;
    }
  }

  makeCollisionList() {
    this.addCommand(0, 'collision', true, 0);
    this.addCommand(1, 'collision', true, 1);
    this.addCommand(2, 'collision', true, 2);

    this.addCommand(17, 'collision', true, 17);
    this.addCommand(18, 'collision', true, 18);
    this.addCommand(19, 'collision', true, 19);

    this.addCommand(14, 'collision', true, 14);
    this.addCommand(20, 'collision', true, 20);
    this.addCommand(16, 'collision', true, 16);

    this.addCommand(11, 'collision', true, 11);
    this.addCommand(12, 'collision', true, 12);
    this.addCommand(13, 'collision', true, 13);

    this.addCommand(22, 'collision', true, 22);
    this.addCommand(26, 'collision', true, 26);
    this.addCommand(24, 'collision', true, 24);
    this.addCommand(28, 'collision', true, 28);

    this.addCommand(4, 'collision', true, 4);
    this.addCommand(5, 'collision', true, 5);
  }

  getTileRow(tileId) {
    const index = this._list.findIndex(item => item?.name === tileId);
    if (index >= 0) {
      return Math.floor(index / this.maxCols());
    }

    return -1;
  }

  jumpToTile(tileId) {
    const row = this.getTileRow(tileId);
    if (row < 0) {
      return false;
    }

    this.setTopRow(row || 0);
    return true;
  }

  ensureSelectionVisible() {
    if (this._selectionIndex < 0 || CycloneMapEditor.currentTileId === undefined) {
      return;
    }

    const row = Math.floor(this._selectionIndex / this.maxCols());
    if (row < this.topRow()) {
      this.setTopRow(Math.min(row, this.maxTopRow()));
    } else if (row > this.topRow() + this.maxPageRows()) {
      this.setTopRow(Math.min(row, this.maxTopRow()));
    }
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);

    if (!CycloneMapEditor.changingTileProps) {
      // Force the tilemap cursor to redraw too
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }
  }

  colSpacing() {
    if (CycloneMapEditor.currentLayer === Layers.collisions) {
      return 0;
    }

    return Math.floor((this.width - (this.maxCols() * this.itemWidth())) / this.maxCols());
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    if (CycloneMapEditor.currentLayer === Layers.collisions) {
      return 3;
    }

    if (CycloneMapEditor.puzzleMode) {
      return 16;
    }

    return 8;
  }

  itemWidth() {
    const w = CycloneMapEditor.tileDrawWidth;
    if (CycloneMapEditor.puzzleMode) {
      return w / 2;
    }

    return w;
  }

  itemHeight() {
    const h = CycloneMapEditor.tileDrawHeight;
    if (CycloneMapEditor.puzzleMode) {
      return h / 2;
    }

    return h;
  }

  drawRegion(index) {
    const rect = this.itemRect(index);
    this.contents.fontSize = Graphics.width < 1280 ? 14 : 18;
    this.contents.drawRegion(index, rect.x, rect.y, rect.width, rect.height, true);
  }

  drawCollision(index) {
    if (index === 0) {
      return;
    }
    const collision = this._list[index].ext ?? index;
    if (collision === 0) {
      return;
    }

    const rect = this.itemRect(index);
    this.contents.drawCollisionType(collision, rect.x, rect.y, rect.width, rect.height);
  }

  drawPuzzle(index) {
    const pieceId = this._list[index].ext;
    if (!pieceId) {
      return;
    }

    const rect = this.itemRect(index);
    this.contents.drawPuzzlePiece(pieceId, rect.x, rect.y, rect.width, rect.height);
  }

  drawShadow(index) {
    const rect = this.itemRect(index);
    const shadowId = index;
    const x = rect.x;
    const y = rect.y;
    const drawWidth = rect.width;
    const drawHeight = rect.height;

    const halfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const halfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    if (shadowId < 0 || shadowId > 15) {
      return;
    }

    const table = shadowId.toString(2).padZero(4);
    for (let i = 0; i < 4; i++) {
      let color = '#000000';
      if (table[3 - i] !== '1') {
        color = '#FFFFFF99';
      }

      const drawX = x + (i % 2) * halfWidth;
      const drawY = y + Math.floor(i / 2) * halfHeight;

      this.contents.fillRect(drawX, drawY, halfWidth, halfHeight, color);
    }

    const context = this.contents.context;
    context.save();
    context.strokeStyle = '#FF0000';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + drawWidth, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + drawHeight);
    context.stroke();
  }

  updateOpacityForTile(tileId) {
    if (!CycloneMapEditor.changingTileProps || Input.isPressed('shift')) {
      return this.changePaintOpacity(true);
    }

    return this.changePaintOpacity(false);
  }

  drawItem(index) {
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    const symbol = this.commandSymbol(index);

    if (symbol === 'region') {
      this.drawRegion(index);
      return;
    }

    if (symbol === 'shadow') {
      this.drawShadow(index);
      return;
    }

    if (symbol === 'collision') {
      this.drawCollision(index);
      return;
    }

    if (symbol === 'puzzle') {
      this.drawPuzzle(index);
      return;
    }

    const rect = this.itemRect(index);
    const tileId = this._list[index].ext;

    this.updateOpacityForTile(tileId);

    const bitmap = this.contents.drawTile(tileId, rect.x, rect.y, this.itemWidth(), this.itemHeight());
    if (!bitmap) {
      return;
    }

    if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
      bitmap.addLoadListener(() => {
        this._needsRedraw = true;
      });
    }

    this.changePaintOpacity(true);
    if (!this._needsRedraw && CycloneMapEditor.changingTileProps) {
      this.drawTileProp(this.commandName(index), rect);
    }
  }

  translucentOpacity() {
    return 90;
  }

  drawTileProp(tileId, rect) {
    if (Input.isPressed('shift')) {
      return;
    }

    switch(CycloneMapEditor.currentTool) {
      case Tools.passage:
        return this.drawTilePassage(tileId, rect);
      case Tools.passage4:
        return this.drawTilePassage4(tileId, rect);
      case Tools.ladder:
        return this.drawTileLadder(tileId, rect);
      case Tools.bush:
        return this.drawTileBush(tileId, rect);
      case Tools.counter:
        return this.drawTileCounter(tileId, rect);
      case Tools.damage:
        return this.drawTileDamage(tileId, rect);
      case Tools.terrain:
        return this.drawTileTerrain(tileId, rect);
    }
  }

  drawTilePassage(tileId, rect) {
    const passageType = $gameMap.checkTileIdPassageType(tileId);
    const context = this.contents.context;

    if (passageType === TilePassageType.blocked) {
      context.strokeStyle = '#000000';
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(rect.x + 8, rect.y + 8);
      context.lineTo(rect.x + rect.width - 8, rect.y + rect.height - 8);
      context.stroke();

      context.beginPath();
      context.moveTo(rect.x + rect.width - 8, rect.y + 8);
      context.lineTo(rect.x + 8, rect.y + rect.height - 8);
      context.stroke();

      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(rect.x + 8, rect.y + 8);
      context.lineTo(rect.x + rect.width - 8, rect.y + rect.height - 8);
      context.stroke();

      context.beginPath();
      context.moveTo(rect.x + rect.width - 8, rect.y + 8);
      context.lineTo(rect.x + 8, rect.y + rect.height - 8);
      context.stroke();

      return;
    }

    if (passageType === TilePassageType.star) {
      let rot = Math.PI / 5;
      const step = Math.PI / 5;
      const outerRadius = Math.floor(Math.min(rect.width, rect.height) / 3);
      const innerRadius = Math.floor(Math.min(rect.width, rect.height) / 6);
      const baseX = Math.floor(rect.x + (rect.width / 2));
      const baseY = Math.floor(rect.y + (rect.height / 2));

      context.beginPath();
      context.moveTo(baseX, baseY - outerRadius);
      for (let i = 0; i < 5; i++) {
        const x = baseX + Math.cos(rot) * outerRadius;
        const y = baseY + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        const inX = baseX + Math.cos(rot) * innerRadius;
        const inY = baseY + Math.sin(rot) * innerRadius;
        context.lineTo(inX, inY);
        rot += step;
      }
      context.lineTo(baseX, baseY - outerRadius);
      context.closePath();
      context.lineWidth = 5;
      context.strokeStyle = '#000000';
      context.stroke();
      context.fillStyle = '#FFFFFF';
      context.fill();
      return;
    }

    context.strokeStyle = '#000000';
    context.lineWidth = 8;
    context.beginPath();
    context.arc(Math.floor(rect.x + rect.width / 2), Math.floor(rect.y + rect.height / 2), Math.floor(Math.min(rect.width - 10, rect.height - 10) / 2), 0, Math.PI * 2, false);
    context.stroke();

    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 4;
    context.beginPath();
    context.arc(Math.floor(rect.x + rect.width / 2), Math.floor(rect.y + rect.height / 2), Math.floor(Math.min(rect.width - 10, rect.height - 10) / 2), 0, Math.PI * 2, false);
    context.stroke();
  }

  drawTilePassage4(tileId, rect) {
    const flag = $gameMap.getTileFlag(tileId);
    const top = $gameMap.getPassageBitType(flag, 8);
    const bottom = $gameMap.getPassageBitType(flag, 2);
    const left = $gameMap.getPassageBitType(flag, 4);
    const right = $gameMap.getPassageBitType(flag, 6);
    const margin = 3;

    const middleX = rect.x + Math.floor(rect.width / 2);
    const middleY = rect.y + Math.floor(rect.height / 2);

    const context = this.contents.context;
    context.lineWidth = 6;
    context.strokeStyle = '#000000';

    const drawArrow = (x, y, x2, y2) => {
      const headLen = Math.floor(rect.width / 5);
      const angle1 = Math.PI / 13;
      const angle2 = Math.atan2(y2 - y, x2 - x);
      const diff1 = angle2 - angle1;
      const diff2 = angle2 + angle1;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x2, y2);
      context.moveTo(x2, y2);
      context.lineTo(x2 - headLen * Math.cos(diff1), y2 - headLen * Math.sin(diff1));

      context.moveTo(x2, y2);
      context.lineTo(x2 - headLen * Math.cos(diff2), y2 - headLen * Math.sin(diff2));
      context.closePath();
      context.stroke();
    };

    const drawArrows = () => {
      if (top) {
        drawArrow(middleX, middleY, middleX, rect.y + margin);
      }

      if (bottom) {
        drawArrow(middleX, middleY, middleX, rect.y + rect.height - margin);
      }

      if (left) {
        drawArrow(middleX, middleY, rect.x + margin, middleY);
      }

      if (right) {
        drawArrow(middleX, middleY, rect.x + rect.width - margin, middleY);
      }
    };

    drawArrows();
    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    drawArrows();
  }

  drawTileLadder(tileId, rect) {
    if (!$gameMap.tileIdIsLadder(tileId)) {
      return;
    }

    const context = this.contents.context;
    const w = Math.floor(rect.width / 4);
    const h = Math.floor(rect.height / 3);
    const x = Math.floor(rect.x + (rect.width / 2) - (w / 2));
    const y = Math.floor(rect.y + (rect.height / 2) - (w / 2));

    const drawLadder = () => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x, y + h);

      context.moveTo(x + w, y);
      context.lineTo(x + w, y + h);

      context.moveTo(x, y + Math.floor(h / 3));
      context.lineTo(x + w, y + Math.floor(h / 3));

      context.moveTo(x, y + Math.floor(h / 3) * 2);
      context.lineTo(x + w, y + Math.floor(h / 3) * 2);

      context.closePath();

      context.stroke();
    };

    context.strokeStyle = '#000000';
    context.lineWidth = 6;
    drawLadder();
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = 2;
    drawLadder();
  }

  drawTileBush(tileId, rect) {
    if (!$gameMap.tileIdIsBush(tileId)) {
      return;
    }

    this.contents.drawText('~', rect.x, rect.y, rect.width, rect.height - 8, 'center');
    this.contents.drawText('~', rect.x, rect.y + 8, rect.width, rect.height - 8, 'center');
  }

  drawTileCounter(tileId, rect) {
    if (!$gameMap.tileIdIsCounter(tileId)) {
      return;
    }

    const context = this.contents.context;
    const w = Math.floor(rect.width / 2);
    const h = Math.floor(rect.height / 2);
    const x = rect.x + w;
    const y = rect.y + h / 2;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - w / 2, y + h / 2);
    context.lineTo(x, y + h);
    context.lineTo(x + w / 2, y + h / 2);

    context.closePath();

    context.strokeStyle = '#000000';
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = '#FFFFFF';
    context.fill();
  }

  drawTileDamage(tileId, rect) {
    if (!$gameMap.tileIdIsDamage(tileId)) {
      return;
    }

    this.contents.drawText('DMG', rect.x, rect.y, rect.width, rect.height, 'center');
  }

  drawTileTerrain(tileId, rect) {
    const tag = $gameMap.tileIdTerrainTag(tileId);
    if (!tag) {
      return;
    }

    this.contents.drawText(tag, rect.x, rect.y, rect.width, rect.height, 'center');
  }

  drawAllItems() {
    super.drawAllItems();
    this.drawSelection();
  }

  drawMessySelection() {
    this._selectionIndex = -1;

    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      let isSelected = Tilemap.isSameKindTile(item.name, CycloneMapEditor.currentTileId);
      if (isSelected) {
        this._selectionIndex = index;
      } else {
        for (const tileId of CycloneMapEditor.selectedTileList) {
          if (Tilemap.isSameKindTile(tileId, item.name)) {
            isSelected = true;
          }
        }
      }

      if (!isSelected) {
        continue;
      }

      this._drawSelection(index, 1, 1);
    }
  }

  _drawSelection(topIndex, rowDrawCount, colDrawCount) {
    const rect = this.itemRect(topIndex);
    const { x, y } = rect;

    if (CycloneMapEditor.puzzleMode) {
      rowDrawCount = 0.5;
      colDrawCount = 0.5;
    } else if (!this._manualTileSelected && CycloneMapEditor.selectedTileList.length >= 2 && Tilemap.isSameKindTile(CycloneMapEditor.selectedTileList[0], CycloneMapEditor.selectedTileList[1])) {
      rowDrawCount = 1;
      colDrawCount = 1;
    }

    const selectionWidth = CycloneMapEditor.tileDrawWidth * colDrawCount;
    const selectionHeight = CycloneMapEditor.tileDrawHeight * rowDrawCount;

    const context = this.contents.context;
    context.fillStyle = '#000000';

    context.fillRect(x - 1, y - 1, selectionWidth + 2, 4);
    context.fillRect(x - 1, y + selectionHeight - 2, selectionWidth + 2, 4);
    context.fillRect(x - 1, y, 4, selectionHeight);
    context.fillRect(x + selectionWidth - 1, y, 4, selectionHeight);

    context.fillStyle = '#FFFFFF';
    context.fillRect(x + 2, y + 2, selectionWidth - 3, 2);
    context.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 3, 2);
    context.fillRect(x + 2, y + 2, 2, selectionHeight - 4);
    context.fillRect(x + selectionWidth - 3, y + 2, 2, selectionHeight - 4);
  }

  isSelectedTile(tileId) {
    if (!Tilemap.isSameKindTile(tileId, CycloneMapEditor.currentTileId)) {
      return false;
    }

    if (tileId !== CycloneMapEditor.currentTileId) {
      if (this._manualTileSelected !== undefined) {
        return false;
      }

      if (CycloneMapEditor.puzzleMode) {
        return false;
      }
    }

    return true;
  }

  drawSelection() {
    if (CycloneMapEditor.changingTileProps) {
      return;
    }

    if (CycloneMapEditor.messySelection) {
      this.drawMessySelection();
      return;
    }

    const cols = this.maxCols();
    this._selectionIndex = -1;

    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      if (!this.isSelectedTile(item.name)) {
        continue;
      }

      this._selectionIndex = index;

      let col = index % cols;
      let row = Math.floor(index / cols);
      let rowCount = CycloneMapEditor.tileRows;
      let colCount = CycloneMapEditor.tileCols;
      let rowDrawCount = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
      let colDrawCount = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

      while (rowCount <= 0) {
        rowCount++;
        row--;
      }

      while (colCount <= 0) {
        colCount++;
        col--;
      }

      const topIndex = (row * cols) + col;
      this._drawSelection(topIndex, rowDrawCount, colDrawCount);
      break;
    }
  }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }

  selectTileId(tileId, cols = 1, rows = 1) {
    if (CycloneMapEditor.currentTool === 'eraser') {
      CycloneMapEditor.restoreLastDrawingTool();
    }

    CycloneMapEditor.currentTileId = tileId;
    CycloneMapEditor.tileCols = cols ?? 1;
    CycloneMapEditor.tileRows = rows ?? 1;
    CycloneMapEditor.messySelection = false;
    CycloneMapEditor.multiLayerSelection = [];

    const topIndex = this._list.findIndex((item) => item.name === tileId);
    if (topIndex < 0) {
      CycloneMapEditor.currentTileId = undefined;
      CycloneMapEditor.selectedTileList = [];
      this.redraw();
      return;
    }

    CycloneMapEditor.selectedTileList = Array(cols * rows);
    CycloneMapEditor.selectedTileList[0] = CycloneMapEditor.currentTileId;

    const maxCols = this.maxCols();
    const topRow = Math.floor(topIndex / maxCols);
    const leftCol = topIndex % maxCols;

    let selectionIndex = 0;
    for (let y = topRow; y < topRow + CycloneMapEditor.tileRows; y++) {
      for (let x = leftCol; x < leftCol + CycloneMapEditor.tileCols; x++) {
        const newIndex = y * maxCols + x;
        const newTileId = this.commandName(newIndex);
        CycloneMapEditor.selectedTileList[selectionIndex] = newTileId;

        selectionIndex++;
      }
    }

    this.redraw();
  }

  startSelectingTile() {
    if (!this._mouseDown) {
      const index = this.hitIndex();
      if (index < 0) {
        return;
      }
      const tileId = this.commandName(index);
      this.selectTileId(tileId);
      this._mouseDown = true;
    }
  }

  findName(name) {
    return this._list.findIndex(item => item.name === name);
  }

  continueSelectingTile() {
    const index = this.hitIndex();
    const prevCols = CycloneMapEditor.tileCols;
    const prevRows = CycloneMapEditor.tileRows;

    if (index >= 0) {
      let initialIndex = this.findName(CycloneMapEditor.currentTileId);
      if (initialIndex < 0) {
        initialIndex = this._index;
      }

      const initialCol = initialIndex % this.maxCols();
      const initialRow = Math.floor(initialIndex / this.maxCols());
      const newCol = index % this.maxCols();
      const newRow = Math.floor(index / this.maxCols());

      CycloneMapEditor.tileCols = (newCol - initialCol) + 1;
      CycloneMapEditor.tileRows = (newRow - initialRow) + 1;
    }

    if (this._mouseDown) {
      if (!TouchInput.isPressed() || CycloneMapEditor.changingTileProps || CycloneMapEditor.puzzleMode) {
        this.finalizeTileSelection();
      } else if (TouchInput.isMoved()) {
        if (prevCols !== CycloneMapEditor.tileCols || prevRows !== CycloneMapEditor.tileRows) {
          this.redraw();
        }
      }
    }
  }

  finalizeTileSelection() {
    this._mouseDown = false;

    const cols = this.maxCols();
    for (let index = 0; index < this._list.length; index++) {
      const item = this._list[index];
      if (item.name !== CycloneMapEditor.currentTileId) {
        continue;
      }

      let col = index % cols;
      let row = Math.floor(index / cols);
      let rowCount = CycloneMapEditor.tileRows;
      let colCount = CycloneMapEditor.tileCols;
      const newTileRows = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
      const newTileCols = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

      while (rowCount <= 0) {
        rowCount++;
        row--;
      }

      while (colCount <= 0) {
        colCount++;
        col--;
      }

      const topIndex = (row * cols) + col;
      if (topIndex >= 0) {
        const newTileId = this.commandName(topIndex);
        if (newTileId || newTileId === 0) {
          this.selectTileId(newTileId, newTileCols, newTileRows);
        } else {
          this.selectTileId(CycloneMapEditor.currentTileId);
        }
      } else {
        this.selectTileId(0);
      }

      break;
    }

    this.redraw();
  }

  activateManualTile() {
    const index = this.hitIndex();
    if (index < 0) {
      return;
    }

    const tileId = this.commandName(index);
    if (Tilemap.isAutotile(tileId)) {
      this._manualTileSelected = tileId;
      this._selectionIndex = -1;
    }
  }

  toggleManualTiles() {
    if (this._manualTileSelected === undefined) {
      this.activateManualTile();
    } else {
      this._manualTileSelected = undefined;
    }

    this.refresh();
    this._mouseDown = false;
    CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
  }

  processTouchScroll() {
    if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
      this.startSelectingTile();
    } else if (CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown && !this._mouseDown && !CycloneMapEditor.changingTileProps) {
      this.toggleManualTiles();
      return;
    }

    if (this._mouseDown) {
      this._mouseMoved = true;
      this.continueSelectingTile();
    }
  }

  update() {
    const shift = Input.isPressed('shift');
    if (shift !== this._oldShift) {
      this._needsRedraw = true;
      this._oldShift = shift;
    }

    if (this._needsRedraw) {
      this._needsRedraw = false;
      this.redraw();
    }

    super.update();
  }
}

let lastDisplayX = 0;
let lastDisplayY = 0;

CycloneMapEditor.patchClass(Scene_Map, $super => class {
  createAllWindows() {
    $super.createAllWindows.call(this);

    this.createMapEditorWindows();
    CycloneMapEditor.clearAllData();
    this.refreshMapEditorWindows();
    CycloneMapEditor.addMenuBar();

    CycloneMapEditor.loadExtraData();
  }

  toggleMapEditor() {
    if (CycloneMapEditor.active && CycloneMapEditor.changeHistory.length > 0) {
      if (confirm('Do you want to save your map before hiding the map editor?')) {
        CycloneMapEditor._doSave();
      }
    }

    CycloneMapEditor.tileWidth = $gameMap.tileWidth();
    CycloneMapEditor.tileHeight = $gameMap.tileHeight();
    CycloneMapEditor.active = !CycloneMapEditor.active;

    this.refreshMapEditorWindows();
    this._spriteset._mapEditorCursor.updateDrawing();
    this._spriteset.updatePosition();
  }

  createMapEditorWindows() {
    CycloneMapEditor.tileWidth = $gameMap.tileWidth();
    CycloneMapEditor.tileHeight = $gameMap.tileHeight();

    const neededWidth = CycloneMapEditor.tileDrawWidth * 8 + 24;
    if (neededWidth > CycloneMapEditor.windowWidth) {
      CycloneMapEditor.windowWidth = neededWidth;
    }

    this._mapEditorGrid = new WindowCycloneGrid();
    this.addChild(this._mapEditorGrid);
    this._mapEditorGrid.hide();
    this._mapEditorGrid.deactivate();

    this._mapEditorCommands = new WindowCycloneMapEditorCommands();
    this.addChild(this._mapEditorCommands);
    this._mapEditorCommands.hide();
    this._mapEditorCommands.deactivate();

    this._mapEditorLayerListWindow = new WindowCycloneMapEditorLayerList();
    this.addChild(this._mapEditorLayerListWindow);
    this._mapEditorLayerListWindow.hide();
    this._mapEditorLayerListWindow.deactivate();

    this._mapEditorTabsWindow = new WindowCycloneMapEditorTabs();
    this.addChild(this._mapEditorTabsWindow);
    this._mapEditorTabsWindow.hide();
    this._mapEditorTabsWindow.deactivate();

    this._mapEditorStatus = new WindowCycloneMapEditorStatus();
    this.addChild(this._mapEditorStatus);
    this._mapEditorStatus.hide();
    this._mapEditorStatus.deactivate();

    this._mapEditorWindow = new WindowCycloneMapEditor();
    this.addChild(this._mapEditorWindow);
    this._mapEditorWindow.hide();
    this._mapEditorWindow.deactivate();
  }

  refreshMapEditorWindows() {
    const { active } = CycloneMapEditor;

    this._mapEditorGrid.visible = active;
    this._mapEditorCommands.visible = active;
    this._mapEditorLayerListWindow.visible = active;
    this._mapEditorWindow.visible = active;
    this._mapEditorStatus.visible = active;
    this._mapEditorTabsWindow.visible = active;

    this._mapEditorCommands.active = active;
    this._mapEditorLayerListWindow.active = active;
    this._mapEditorWindow.active = active;
    this._mapEditorTabsWindow.active = active;

    this._mapEditorCommands.refresh();
    this._mapEditorLayerListWindow.refresh();
    this._mapEditorTabsWindow.refresh();
    this._mapEditorWindow.refresh();
    this._mapEditorGrid.refresh();
    this._mapEditorStatus.refresh();

    if (active) {
      this._spriteset._mapEditorCursor.updateDrawing();
    }
    CycloneMapEditor.refreshMenuVisibility();
  }

  redrawMap() {
    this._spriteset._tilemap.refresh();
  }

  processMapTouch() {
    if (!CycloneMapEditor.active) {
      $super.processMapTouch.call(this);
      return;
    }

    this._touchCount = 0;
    if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
      this.onMapTouch();
    }
  }

  onMapTouch() {
    if (!CycloneMapEditor.active) {
      $super.onMapTouch.call(this);
      return;
    }
  }

  editorX() {
    return Graphics.width - CycloneMapEditor.windowWidth;
  }

  canUpdateMouse() {
    return CycloneMapEditor.active && this._mapEditorWindow && this._mapEditorLayerListWindow;
  }

  updateMenuTouch(x, y, pressed) {
    if (!pressed) {
      return;
    }

    if (x > this._mapEditorLayerListWindow.x && x < this._mapEditorLayerListWindow.x + this._mapEditorLayerListWindow.width) {
      if (y < this._mapEditorLayerListWindow.height + this._mapEditorLayerListWindow.y) {
        if (!CycloneMapEditor.wasPressing) {
          this._mapEditorLayerListWindow.onMapTouch(x - this._mapEditorLayerListWindow.x, y - this._mapEditorLayerListWindow.y);
          CycloneMapEditor.wasPressing = true;
        }

        return true;
      }
    }

    if (x > this._mapEditorWindow.x && x < this._mapEditorWindow.x + this._mapEditorWindow.width) {
      this._mapEditorWindow.onMapTouch(x - this._mapEditorWindow.x, y - this._mapEditorWindow.y);
      return true;
    }
  }

  updateRightMouse() {
    if (!this.canUpdateMouse()) {
      CycloneMapEditor.isRightButtonDown = false;
      CycloneMapEditor.wasRightButtonDown = false;
      return;
    }

    if (!CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown) {
      return;
    }

    const { x, y } = TouchInput;
    if (this.updateMenuTouch(x, y, CycloneMapEditor.isRightButtonDown)) {
      return;
    }

    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);

    if (mapX >= 0 && mapY >= 0) {
      CycloneMapEditor.updateRightTouch(mapX, mapY);
    }

    CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
  }

  updateDisplayPositionData() {
    if (lastDisplayX === $gameMap._displayX && lastDisplayY === $gameMap._displayY) {
      return;
    }

    const xDiff = $gameMap._displayX - lastDisplayX;
    const yDiff = $gameMap._displayY - lastDisplayY;

    if (xDiff > 10 || yDiff > 10) {
      // If the difference is too big, then we don't update
      return;
    }

    if ((CycloneMapEditor.rectangleWidth > 0 || CycloneMapEditor.rectangleBackWidth > 0) && (CycloneMapEditor.rectangleHeight > 0 || CycloneMapEditor.rectangleBackHeight > 0)) {
      CycloneMapEditor.rectangleStartMouseX += xDiff * CycloneMapEditor.tileWidth;
      CycloneMapEditor.rectangleStartMouseY += yDiff * CycloneMapEditor.tileHeight;
    }
  }

  getSelectionTileAt(x, y) {
    if (x <= this._mapEditorWindow.x || x >= this._mapEditorWindow.x + this._mapEditorWindow.width) {
      return CycloneMapEditor.currentTileId;
    }

    if (y >= this._mapEditorWindow.height + this._mapEditorWindow.y) {
      return CycloneMapEditor.currentTileId;
    }

    const index = this._mapEditorWindow.hitIndex();
    if (index >= 0) {
      return this._mapEditorWindow.commandName(index);
    }
  }

  updateMouse() {
    if (!this.canUpdateMouse()) {
      CycloneMapEditor.wasPressing = false;
      return;
    }

    this.updateDisplayPositionData();
    lastDisplayX = $gameMap._displayX;
    lastDisplayY = $gameMap._displayY;

    const pressed = TouchInput.isPressed();
    const { x, y } = TouchInput;
    const mapX = CycloneMapEditor.canvasToMapX(x);
    const mapY = CycloneMapEditor.canvasToMapY(y);
    const fx = Math.floor(mapX);
    const fy = Math.floor(mapY);

    const tile1 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 0, true);
    const tile2 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 1, true);
    const tile3 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 2, true);
    const tile4 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 3, true);
    const tileId = this.getSelectionTileAt(x, y) ?? '';

    CycloneMapEditor.updateStatus({
      mapX,
      mapY,
      tile1,
      tile2,
      tile3,
      tile4,
      tileId,
    });

    if (!pressed && !CycloneMapEditor.wasPressing) {
      return;
    }

    if (this.updateMenuTouch(x, y, pressed)) {
      return;
    }

    let minX = 0;
    let minY = 0;

    if (CycloneMapEditor.isLayerVisible(Layers.blend) && [Tools.pencil, Tools.eraser].includes(CycloneMapEditor.currentTool)) {
      minX--;
      minY--;
    }

    if (mapX >= minX && mapY >= minY) {
      if (Input.isPressed('control') && !CycloneMapEditor.wasPressing) {
        CycloneMapEditor.selectHigherLayer(mapX, mapY);
      } else {
        CycloneMapEditor.updateCurrentToolTouch(mapX, mapY);
      }
    }

    CycloneMapEditor.wasPressing = pressed;
  }


  isMenuEnabled() {
    if (CycloneMapEditor.active) {
      return false;
    }

    return $super.isMenuEnabled.call(this);
  }

  update() {
    $super.update.call(this);

    if (!CycloneMapEditor.active) {
      return;
    }

    if (CycloneMapEditor.wasPressing || CycloneMapEditor.wasRightButtonDown) {
      if (this._isControlPressed !== Input.isPressed('control') || this._isShiftPressed !== Input.isPressed('shift')) {
        this.updateMouse();
      }
    }

    this._isControlPressed = Input.isPressed('control');
    this._isShiftPressed = Input.isPressed('shift');
  }
});

CycloneMapEditor.patchClass(SceneManager, $super => class {
  static onSceneTerminate() {
    CycloneMapEditor.refreshMenuVisibility();
  }
});

class SpriteMapEditorCursor extends Sprite {
  initialize() {
    super.initialize(new Bitmap(CycloneMapEditor.tileWidth, CycloneMapEditor.tileHeight));
  }

  update() {
    super.update();
    if (this.visible !== CycloneMapEditor.active) {
      this.visible = CycloneMapEditor.active;
    }

    if (CycloneMapEditor.active) {
      this.updatePosition();
    }
  }

  updateDrawing() {
    if (CycloneMapEditor.isRightButtonDown) {
      return this.updateRectangle();
    }

    switch (CycloneMapEditor.currentTool) {
      case Tools.fill:
        return this.updateTiles();
      case Tools.pencil:
        if (CycloneMapEditor.isLayerVisible(Layers.blend)) {
          return this.updateBrush();
        }
        return this.updateTiles();
      case Tools.eraser:
        if (CycloneMapEditor.isLayerVisible(Layers.blend)) {
          return this.updateBrush();
        }
        return this.updateEraser();
      case Tools.rectangle:
        if ((!CycloneMapEditor.rectangleWidth && !CycloneMapEditor.rectangleBackWidth) || (!CycloneMapEditor.rectangleHeight && !CycloneMapEditor.rectangleBackHeight)) {
          this.updateTiles();
          return;
        }

        return this.updateRectangle();
      default:
        return this.updateOther();
    }
  }

  getNewBitmapWidth() {
    return ((CycloneMapEditor.tileWidth * (CycloneMapEditor.rectangleWidth || (CycloneMapEditor.rectangleBackWidth + 1))) || 1) / CycloneMapEditor.getGridRatio();
  }

  getNewBitmapHeight() {
    return ((CycloneMapEditor.tileHeight * (CycloneMapEditor.rectangleHeight || (CycloneMapEditor.rectangleBackHeight + 1))) || 1) / CycloneMapEditor.getGridRatio();
  }

  updateRectangle() {
    const width = this.getNewBitmapWidth();
    const height = this.getNewBitmapHeight();

    if (width !== this.bitmap.width || height !== this.bitmap.height) {
      this.bitmap = new Bitmap(width, height);
    } else {
      this.bitmap.clear();
    }

    const fillColor = CycloneMapEditor.isRightButtonDown ? '#00000033' : '#00FF0033';

    if (CycloneMapEditor.currentLayer === 5) {
      this.drawTiles();
    }

    if (width > 8 && height > 8) {
      this.bitmap.fillRect(0, 0, width, 4, '#000000');
      this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
      this.bitmap.fillRect(0, 0, 4, height, '#000000');
      this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

      this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
      this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

      this.bitmap.fillRect(4, 4, width - 8, height - 8, fillColor);
    } else if (width > 0 && height > 0) {
      this.bitmap.fillRect(0, 0, width, height, fillColor);
    }
  }

  updateBrush() {
    const size = Input.isPressed('shift') ? 4 : 2;

    const width = $gameMap.tileWidth() / size;
    const height = $gameMap.tileHeight() / size;

    if (width !== this.bitmap.width || height !== this.bitmap.height) {
      this.bitmap = new Bitmap(width, height);
    } else {
      this.bitmap.clear();
    }

    const fillColor = CycloneMapEditor.currentTool === Tools.eraser ? '#99000099' : '#00999999';
    this.bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, fillColor);
  }

  updateEraser() {
    const width = this.getNewBitmapWidth();
    const height = this.getNewBitmapHeight();

    if (width !== this.bitmap.width || height !== this.bitmap.height) {
      this.bitmap = new Bitmap(width, height);
    } else {
      this.bitmap.clear();
    }

    if (width > 8 && height > 8) {
      this.bitmap.fillRect(0, 0, width, 4, '#000000');
      this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
      this.bitmap.fillRect(0, 0, 4, height, '#000000');
      this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

      this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
      this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

      this.bitmap.fillRect(4, 4, width - 8, height - 8, '#FF000033');
    } else if (width > 0 && height > 0) {
      this.bitmap.fillRect(0, 0, width, height, '#FF000033');
    }
  }

  drawMultiLayerTiles() {
    for (let z = 0; z < CycloneMapEditor.multiLayerSelection.length; z++) {
      let column = 0;
      let row = 0;

      for (const tileId of CycloneMapEditor.multiLayerSelection[z]) {
        if (column >= CycloneMapEditor.tileCols) {
          column = 0;
          row++;
        }

        const x = column * CycloneMapEditor.tileWidth;
        const y = row * CycloneMapEditor.tileHeight;

        this.bitmap.drawTile(tileId, x, y);
        column++;
      }
    }
  }

  drawTiles() {
    if (CycloneMapEditor.currentLayer === Layers.auto && CycloneMapEditor.multiLayerSelection.length) {
      this.drawMultiLayerTiles();
      return;
    }

    let column = 0;
    let row = 0;

    for (const tileId of CycloneMapEditor.selectedTileList) {
      if (column >= CycloneMapEditor.tileCols) {
        column = 0;
        row++;
      }

      const x = column * CycloneMapEditor.tileWidth;
      const y = row * CycloneMapEditor.tileHeight;

      if (CycloneMapEditor.currentLayer === 5) {
        this.bitmap.drawRegion(tileId, x, y);
      } else if (CycloneMapEditor.currentLayer === 4) {
        this.bitmap.drawShadow(tileId, x, y);
      } else if (CycloneMapEditor.currentLayer === 8) {
        this.drawCollision(tileId, x, y);
      } else if (CycloneMapEditor.puzzleMode) {
        this.bitmap.drawPuzzlePiece(tileId, x, y, CycloneMapEditor.tileWidth / 2, CycloneMapEditor.tileHeight / 2);
      } else {
        this.bitmap.drawTile(tileId, x, y);
      }
      column++;
    }
  }

  drawCollision(tileId, x, y) {
    const drawWidth = CycloneMapEditor.tileWidth;
    const drawHeight = CycloneMapEditor.tileHeight;

    if (tileId === 0) {
      return;
    }

    this.bitmap.drawCollisionType(tileId, x, y, drawWidth, drawHeight);
  }

  updateOther() {
    this.bitmap.clear();
  }

  updateTiles() {
    const gridRatio = CycloneMapEditor.getGridRatio();

    const width = CycloneMapEditor.tileWidth * CycloneMapEditor.tileCols / gridRatio;
    const height = CycloneMapEditor.tileHeight * CycloneMapEditor.tileRows / gridRatio;

    if (width !== this.bitmap.width || height !== this.bitmap.height) {
      this.bitmap = new Bitmap(width, height);
    } else {
      this.bitmap.clear();
    }

    this.drawTiles();

    if (width > 8 && height > 8) {
      this.bitmap.fillRect(0, 0, width, 4, '#000000');
      this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
      this.bitmap.fillRect(0, 0, 4, height, '#000000');
      this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

      this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
      this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
      this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');
    }
  }

  getCursorTileX() {
    if (CycloneMapEditor.currentTool === 'rectangle' || CycloneMapEditor.currentTool === 'eraser' || CycloneMapEditor.isRightButtonDown) {
      if (CycloneMapEditor.rectangleWidth > 0) {
        return CycloneMapEditor.rectangleStartX;
      }
      if (CycloneMapEditor.rectangleBackWidth > 0) {
        return CycloneMapEditor.rectangleStartX - CycloneMapEditor.rectangleBackWidth / CycloneMapEditor.getGridRatio();
      }
    }

    if (SceneManager._scene._mapEditorWindow) {
      if (TouchInput.x >= SceneManager._scene._mapEditorWindow.x) {
        return CycloneMapEditor.canvasToMapX(SceneManager._scene._mapEditorWindow.x);
      }
    }

    return CycloneMapEditor.canvasToMapX(TouchInput.x);
  }

  getCursorTileY() {
    if (CycloneMapEditor.currentTool === 'rectangle' || CycloneMapEditor.currentTool === 'eraser' || CycloneMapEditor.isRightButtonDown) {
      if (CycloneMapEditor.rectangleHeight > 0) {
        return CycloneMapEditor.rectangleStartY;
      }
      if (CycloneMapEditor.rectangleBackHeight > 0) {
        return CycloneMapEditor.rectangleStartY - CycloneMapEditor.rectangleBackHeight / CycloneMapEditor.getGridRatio();
      }
    }

    return CycloneMapEditor.canvasToMapY(TouchInput.y);
  }

  updatePosition() {
    if (!CycloneMapEditor.active) {
      return;
    }

    const tileX = this.getCursorTileX();
    const tileY = this.getCursorTileY();

    let offsetX = 0;
    let offsetY = 0;

    if (CycloneMapEditor.isLayerVisible(Layers.blend) && [Tools.eraser, Tools.pencil].includes(CycloneMapEditor.currentTool)) {
      offsetX -= Math.floor(this.bitmap.width / 2);
      offsetY -= Math.floor(this.bitmap.height / 2);
    }

    this.x = Math.floor($gameMap.adjustX(tileX) * CycloneMapEditor.tileWidth) + offsetX;
    this.y = Math.floor($gameMap.adjustY(tileY) * CycloneMapEditor.tileHeight) + offsetY;
  }
}

CycloneMapEditor.patchClass(Spriteset_Map, $super => class {
  initialize() {
    $super.initialize.call(this);

    this.createMapEditorCursor();
  }

  createMapEditorCursor() {
    this._mapEditorCursor = new SpriteMapEditorCursor();
    this.addChild(this._mapEditorCursor);
  }

  forceBlenderRefresh(hardRefresh = false) {
    if (!window.CycloneMagic) {
      return;
    }

    if (hardRefresh) {
      for (const sprite of this._blenderTileSprites) {
        sprite.parent.removeChild(sprite);
        sprite.destroy();
      }
      this._blenderTileSprites = [];
      this.createBlenderTiles();
      return;
    }

    const magicTiles = $gameMap.magicTiles();
    for (const tile of magicTiles) {
      let found = false;

      for (const sprite of this._blenderTileSprites) {
        if (sprite._mapX !== tile.x || sprite._mapY !== tile.y) {
          continue;
        }

        found = true;
        if (!window.CycloneMagic.isSpriteCached(sprite.spriteId)) {
          sprite._bitmap = null;
        }
        break;
      }

      if (!found) {
        const newSprite = new window.CycloneMagic.SpriteBlenderTile(tile.tiles, tile.x, tile.y, 1, 1);
        this._blenderTileSprites.push(newSprite);
        this._tilemap.addChild(newSprite);
      }
    }

    this._tilemap.refresh();
  }

  // updatePosition() {
  //   if (!CycloneMapEditor.active) {
  //     return $super.updatePosition.call(this);
  //   }

  //   const scale = $gameMap.zoom ?? { x : 1, y : 1};
  //   const screen = $gameScreen;
  //   this.x = -($gameMap.zoom?.x ?? 1) * (scale.x - 1);
  //   this.y = -($gameMap.zoom?.y ?? 1) * (scale.y - 1);
  //   this.x = this.x + screen.shake();

  //   if (this.scale.x !== scale.x || this.scale.y !== scale.y) {
  //     const sw = Graphics.width / scale.x + this._tilemap._margin * 2;
  //     const sh = Graphics.height / scale.y + this._tilemap._margin * 2;

  //     if (sw !== this._tilemap.width || sh !== this._tilemap.height) {
  //       this._tilemap.width = sw;
  //       this._tilemap.height = sh;
  //       this._tilemap.refresh();
  //     }

  //     this.scale = new PIXI.Point(scale.x, scale.y);
  //     this._weather.scale = new PIXI.Point(1.0 / scale.x,  1.0 / scale.y);
  //     this._parallax.move(this._parallax.x, this._parallax.y, Graphics.width / scale.x, Graphics.height / scale.y);
  //   }

  // }
});

CycloneMapEditor.patchClass(Tilemap, $super => class {
  _readMapData(x, y, z) {
    if (!$gameMap.isValid(x, y)) {
      return 0;
    }

    if (z <= 4 && !CycloneMapEditor.layerVisibility[z]) {
      return 0;
    }

    const tileIndex = CycloneMapEditor.tileIndex(x, y, z);
    if (CycloneMapEditor.previewChanges?.[tileIndex] !== undefined) {
      return CycloneMapEditor.previewChanges[tileIndex];
    }

    return $super._readMapData.call(this, x, y, z);
  }

  canUpdateAnimationCount() {
    if (CycloneMapEditor.active && CycloneMapEditor.isLayerVisible(Layers.blend) && TouchInput.isPressed()) {
      return false;
    }

    return true;
  }

  update() {
    // Prevent the water animation while modifying blending
    if (!this.canUpdateAnimationCount()) {
      this.animationCount--;
    }

    $super.update.call(this);
  }
});

CycloneMapEditor.patchClass(TouchInput, $super => class {
  static _onLeftButtonDown(event) {
    $super._onLeftButtonDown.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.updateMouse();
    }
  }

  static _onMouseMove(event) {
    $super._onMouseMove.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.updateMouse();
      SceneManager._scene.updateRightMouse();
    }
  }

  static _onMouseUp(event) {
    $super._onMouseUp.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      if (event.button === 0) {
        SceneManager._scene.updateMouse();
      } else if (event.button === 2) {
        CycloneMapEditor.isRightButtonDown = false;
        SceneManager._scene.updateRightMouse();
      }
    }
  }

  static _onRightButtonDown(event) {
    $super._onRightButtonDown.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      CycloneMapEditor.isRightButtonDown = true;
      SceneManager._scene.updateRightMouse();
    }
  }
});

CycloneMapEditor.patchClass(Sprite_Character, $super => class {
  update(...args) {
    if (CycloneMapEditor.active) {
      this.visible = CycloneMapEditor.isLayerVisible(Layers.events);
      if (!this.visible) {
        return;
      }
    }
    $super.update.call(this, ...args);
  }
});

CycloneMapEditor.patchClass(Scene_Boot, $super => class {
  resizeScreen() {
    if (Utils.isNwjs() && $dataSystem.advanced.screenWidth < 1280) {
      const minWidth = Math.min(1920, screen.availWidth - (window.outerWidth - window.innerWidth));
      const minHeight = Math.min(1080, screen.availHeight - (window.outerHeight - window.innerHeight));

      const { screenWidth, screenHeight, uiAreaWidth, uiAreaHeight } = $dataSystem.advanced;

      if (screenWidth < minWidth) {
        $dataSystem.advanced.screenWidth = minWidth;
      }
      if (uiAreaWidth < minWidth) {
        $dataSystem.advanced.uiAreaWidth = minWidth;
      }

      if (screenHeight < minHeight) {
        $dataSystem.advanced.screenHeight = minHeight;
      }
      if (uiAreaHeight < minHeight) {
        $dataSystem.advanced.uiAreaHeight = minHeight;
      }
    }

    $super.resizeScreen.call(this);
  }

});

let delaysTried = 0;

const addFilter = () => {
  if (!window.CycloneMagic) {
    if (delaysTried > 10) {
      return;
    }

    setTimeout(addFilter, 100);
    delaysTried++;
    return;
  }

  CycloneMapEditor.patchClass(window.CycloneMagic.SpriteBlenderTile, $super => class {
    update() {
      $super.update.call(this);
      this.visible = CycloneMapEditor.isLayerVisible(1);
    }
  });
};

setTimeout(addFilter, 200);
})();
