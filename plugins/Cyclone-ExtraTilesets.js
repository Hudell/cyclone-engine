//=============================================================================
// Cyclone Engine - Extra Tilesets
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Loads additional tiles from a second tileset. v1.01 - Premium.
 * Integrates with Cyclone Map Editor.
 * <pluginName:CycloneExtraTilesets>
 * @author Hudell
 * @url https://hudell.itch.io/cyclone-extra-tilesets
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
 * Extra Tilesets                                                    by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. This is a PREMIUM plugin, if you haven't bought it nor received it as
 * a patreon bonus, you do not have permission to use it.
 *
 * 2. If you acquired this plugin legitimately, you're free to use it in any
 * kind of game.
 *
 * 3. You can change this plugin for your own use, but you may not
 * redistribute it, with or without changes.
 *
 * 4. For support, feature requests or bug reports, you may contact me through
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
 * 5. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 6. A special exception is created for patreon users who get access to my
 * priority support discord server.
 *
 * 7. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 8. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 9. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Instructions
 * ===========================================================================
 * The easiest way to use this plugin is to add the Cyclone Map Editor to
 * your project. It can be found here:
 * https://makerdevs.com/plugin/cyclone-map-editor
 *
 * When both plugins are in your project, run your game and open the "Tilesets"
 * menu, then select the extra tileset you want to use.
 * Cyclone Map Editor will then let you use anything from the B, C and D tabs
 * of the extra tileset you picked.
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
}

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n;}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return "";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256;}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o));}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return "";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else {if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u);}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++);}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++;}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return ""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return "";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else {if(l!==d)return null;v=s+s.charAt(0);}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++);}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

function decompress(data) {
  if (!data.startsWith('v=')) {
    return LZString.decompress(data);
  }

  const idx = data.indexOf(';') + 1;
  return LZString.decompressFromBase64(data.substring(idx));
}

function parseMapEditorData(note) {
  let json;
  try {
    json = decompress(note);
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

function loadMapEditorData() {
  if (!$dataMap) {
    return false;
  }

  for (const event of $dataMap.events) {
    if (!event) {
      continue;
    }

    if (event.name !== 'CycloneMapEditor') {
      continue;
    }

    return parseMapEditorData(event.note);
  }
}

class CycloneExtraTilesets$1 extends CyclonePatcher {
  static register() {
    this.initialize('CycloneExtraTilesets');
  }

  static parseExtraTileIds(object) {
    if (!object || !object.note || !object.data) {
      return;
    }

    if (!object.note.includes('<CycloneExtraTiles>')) {
      return;
    }

    const matches = object.note.match(/<CycloneExtraTiles>(.*)<\/CycloneExtraTiles>/i);
    if (matches.length < 2) {
      return;
    }

    const compressed = matches[1];
    try {
      const extraTilesStr = LZString.decompressFromBase64(compressed);
      const extraTiles = JSON.parse(extraTilesStr);
      if (!extraTiles || !Array.isArray(extraTiles)) {
        return;
      }
      const size = Math.min(extraTiles.length, object.width * object.height * 4);
      for (let i = 0; i < size; i++) {
        if (object.data[i] === 0 && extraTiles[i] > 0) {
          object.data[i] = extraTiles[i];
        }
      }
    } catch(e) {
      console.error(e);
      return;
    }
  }

  static loadExtraTilesets(object) {
    this.parseExtraTileIds(object);

    if (!$gameMap) {
      return;
    }

    const data = loadMapEditorData();
    if (!data?.extraTilesetId) {
      return;
    }

    $gameMap._extraTilesetId = data.extraTilesetId;
  }
}

globalThis.CycloneExtraTilesets = CycloneExtraTilesets$1;
CycloneExtraTilesets$1.register();

CycloneExtraTilesets.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    this._extraTilesetId = 0;

    CycloneExtraTilesets.loadExtraTilesets();
    this.buildTilesetFlags();
  }

  buildTilesetFlags() {
    if (!this._extraTilesetId || this._extraTilesetId === this._tilesetId) {
      return;
    }

    const baseFlags = $super.tilesetFlags.call(this);
    const tileset = this.extraTileset();

    this._allFlags = [...baseFlags];

    if (tileset) {
      const newZero = Tilemap.TILE_ID_E + 256;
      const newFlags = tileset.flags;

      for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_D; tileId++) {
        const newTileId = tileId + newZero;
        this._allFlags[newTileId] = newFlags[tileId] || 0;
      }

      for (let tileId = Tilemap.TILE_ID_D; tileId < Tilemap.TILE_ID_E; tileId++) {
        const newTileId = tileId - Tilemap.TILE_ID_D + Tilemap.TILE_ID_A5 + 256;
        this._allFlags[newTileId] = newFlags[tileId] || 0;
      }
    }

    return this._allFlags;
  }

  tilesetFlags() {
    if (this._allFlags) {
      return this._allFlags;
    }

    return $super.tilesetFlags.call(this);
  }

  changeTileset(tilesetId) {
    $super.changeTileset.call(this, tilesetId);
    this.buildTilesetFlags();
  }

  extraTileset() {
    return $dataTilesets[this._extraTilesetId];
  }
});

CycloneExtraTilesets.patchClass(DataManager, $super => class {
  static onLoad(object) {
    $super.onLoad.call(this, object);

    if (this.isMapObject(object) && window.$dataMap) {
      CycloneExtraTilesets.loadExtraTilesets(object);
    }
  }
});

CycloneExtraTilesets.patchClass(Spriteset_Map, $super => class {
  loadTileset() {
    this._tileset = $gameMap.tileset();
    this._extraTileset = $gameMap.extraTileset();

    if (!this._tileset) {
      return;
    }

    const bitmaps = [];
    const tilesetNames = this._tileset.tilesetNames;
    for (const name of tilesetNames) {
      bitmaps.push(ImageManager.loadTileset(name));
    }

    if (this._extraTileset) {
      const tilesetNames = this._extraTileset.tilesetNames;
      bitmaps.push(ImageManager.loadTileset(tilesetNames[5]));
      bitmaps.push(ImageManager.loadTileset(tilesetNames[6]));
      bitmaps.push(ImageManager.loadTileset(tilesetNames[7]));
    }

    this._tilemap.setBitmaps(bitmaps);
    this._tilemap.flags = $gameMap.tilesetFlags();
  }

  updateTileset() {
    if (this._extraTileset !== $gameMap.extraTileset()) {
      return this.loadTileset();
    }

    $super.updateTileset.call(this);
  }
});

CycloneExtraTilesets.patchClass(Tilemap, $super => class {
  isTileA5(tileId) {
    return tileId >= Tilemap.TILE_ID_A5 && tileId < (Tilemap.TILE_ID_A5 + 128);
  }

  _addNormalTile(layer, tileId, dx, dy) {
    if (tileId >= Tilemap.TILE_ID_A5 + 256 && tileId < Tilemap.TILE_ID_A1) {
      const setNumber = 11;
      const w = this._tileWidth;
      const h = this._tileHeight;
      const sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
      const sy = (Math.floor((tileId % 256) / 8) % 16) * h;

      layer.addRect(setNumber, sx, sy, dx, dy, w, h);
      return;
    }

    $super._addNormalTile.call(this, layer, tileId, dx, dy);
  }
});
})();
