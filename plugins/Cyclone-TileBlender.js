//=============================================================================
// Cyclone Engine - Tile Blender
//=============================================================================

/*:
 * @target MZ
 * @plugindesc . v1.00 - Premium
 *
 * <pluginName:CycloneTileBlender>
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
 * Tile Blender                                                      by Hudell
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

function getTilesetIndex(tileId) {
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

function drawNormalTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (tileId === undefined) {
    return;
  }

  const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * $gameMap.tileWidth();
  const sourceY = (Math.floor((tileId % 256) / 8) % 16) * $gameMap.tileHeight();

  target.blt(tilesetBitmap, sourceX, sourceY, $gameMap.tileWidth(), $gameMap.tileHeight(), x, y, drawWidth ?? $gameMap.tileWidth(), drawHeight ?? $gameMap.tileHeight());
}

function drawAutoTileTable(target, bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
  const halfWidth = $gameMap.tileWidth() / 2;
  const halfHeight = $gameMap.tileHeight() / 2;
  const drawHalfWidth = (drawWidth ?? $gameMap.tileWidth()) / 2;
  const drawHalfHeight = (drawHeight ?? $gameMap.tileHeight()) / 2;

  for (let i = 0; i < 4; i++) {
    const tableX = table[i][0];
    const tableY = table[i][1];

    const sourceX = (tileX * $gameMap.tileWidth()) + (tableX * halfWidth);
    const sourceY = (tileY * $gameMap.tileHeight()) + (tableY * halfHeight);
    const targetX = x + (i % 2) * drawHalfWidth;
    const targetY = y + Math.floor(i / 2) * drawHalfHeight;

    target.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
  }
}

function drawTileA1(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
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

  drawAutoTileTable(target, bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

function drawTileA2(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = (Math.floor(kind / 8) - 2) * 3;
  const shape = Tilemap.getAutotileShape(tileId);

  drawAutoTileTable(target, bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

function drawTileA3(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = (Math.floor(kind / 8) - 6) * 2;
  const shape = Tilemap.getAutotileShape(tileId);

  drawAutoTileTable(target, bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

function drawTileA4(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
  const shape = Tilemap.getAutotileShape(tileId);
  let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

  if (Math.floor(kind / 8) % 2 === 1) {
    autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
  }

  drawAutoTileTable(target, bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

function drawAutoTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (Tilemap.isTileA1(tileId)) {
    return drawTileA1(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA2(tileId)) {
    return drawTileA2(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA3(tileId)) {
    return drawTileA3(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA4(tileId)) {
    return drawTileA4(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }
}

function drawTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (tileId <= 0) {
    return;
  }

  if (tileId >= Tilemap.TILE_ID_A1) {
    return drawAutoTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  return drawNormalTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
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

let tileBlendingTable = {};

class CycloneTileBlender$1 extends CyclonePatcher {
  static get tileBlendingTable() {
    return tileBlendingTable;
  }

  static register() {
    this.initialize('CycloneTileBlender');
    this._cachedTiles = new Map();
  }

  static buildBitmap(spriteId, tiles, x, y) {
    const bitmap = this._cachedTiles.get(spriteId);
    if (!bitmap) {
      return;
    }

    const tileset = $gameMap.tileset();
    const bitmaps = [];
    for (const tileId of tiles) {
      if (!tileId) {
        continue;
      }

      const setNumber = getTilesetIndex(tileId);
      const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

      if (!tilesetBitmap) {
        continue;
      }

      if (!tilesetBitmap.isReady()) {
        tilesetBitmap.addLoadListener(() => {
          this.buildBitmap(spriteId, tiles);
        });

        return;
      }
      bitmaps[tileId] = tilesetBitmap;
    }

    const tileIndex = (y % $gameMap.height()) * $gameMap.width() + (x % $gameMap.width());
    const magic = tileBlendingTable[tileIndex];

    for (let idx = 1; idx < tiles.length; idx++) {
      const tileId = tiles[idx];
      if (!tileId || !bitmaps[tileId]) {
        continue;
      }

      const tilesetBitmap = bitmaps[tileId];
      if (idx === 1) {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();
        const size = width * height;

        const tempBitmap = new Bitmap(width, height);
        drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);

        const context = tempBitmap.context;
        const imageData = context.getImageData(0, 0, tempBitmap.width, tempBitmap.height);

        if (magic) {
          const pixels = imageData.data;
          for (let i = 0; i < size; i++) {
            if (magic[i] === 1) {
              pixels[i * 4 + 3] = 0;
            }
          }
        }

        bitmap.context.putImageData(imageData, 0, 0);
        continue;
      }

      drawTile(bitmap, tilesetBitmap, tileId, 0, 0);
    }
  }

  static getTileBitmap(spriteId, tiles, x, y) {
    if (this._cachedTiles.has(spriteId)) {
      return this._cachedTiles.get(spriteId);
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const bitmap = new Bitmap(tileWidth, tileHeight);
    this._cachedTiles.set(spriteId, bitmap);

    const tileset = $gameMap.tileset();
    let buildNow = true;
    for (const tileId of tiles) {
      if (!tileId) {
        continue;
      }

      const setNumber = 5 + Math.floor(tileId / 256);
      const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

      if (!tilesetBitmap) {
        continue;
      }

      if (!tilesetBitmap.isReady()) {
        tilesetBitmap.addLoadListener(() => {
          this.buildBitmap(spriteId, tiles, x, y);
        });

        buildNow = false;
        break;
      }
    }

    if (buildNow) {
      this.buildBitmap(spriteId, tiles, x, y);
    }

    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }

  static loadMagic() {
    tileBlendingTable = {};
    this.clearBitmapCache();

    const data = loadMapEditorData();
    if (!data?.magic) {
      return;
    }

    this.setupMagic(data.magic);
  }

  static setupMagic(magic) {
    for (let tileId in magic) {
      if (!magic[tileId]) {
        continue;
      }

      const line = magic[tileId];
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
}

globalThis.CycloneTileBlender = CycloneTileBlender$1;
CycloneTileBlender$1.register();

CycloneTileBlender.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ($gameMap.isMagicTile(mapX, mapY, tileId)) {
        return;
      }
    }

    return $super._addSpotTile.call(this, tileId, dx, dy);
  }
});

class SpriteBlenderTile extends Sprite {
  initialize(tiles, x, y) {
    this._tiles = tiles;
    this._mapX = x;
    this._mapY = y;
    super.initialize();
    this.anchor.x = 0;
    this.anchor.y = 1;
  }

  update() {
    super.update();
    this.updateBitmap();
    this.updatePosition();
  }

  updateBitmap() {
    if (!this.bitmap) {
      this.bitmap = CycloneTileBlender.getTileBitmap(this.spriteId, this._tiles, this._mapX, this._mapY);
    }
  }

  updatePosition() {
    const scrolledX = $gameMap.adjustX(this._mapX);
    this.x = Math.floor(scrolledX * $gameMap.tileWidth());

    const scrolledY = $gameMap.adjustY(this._mapY);
    this.y = Math.floor((scrolledY + 1) * $gameMap.tileHeight());

    this.z = 1;
  }
}

CycloneTileBlender.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createBlenderTiles();
    $super.createCharacters.call(this);
  }

  createBlenderTiles() {
    CycloneTileBlender.clearBitmapCache();
    this._blenderTileSprites = [];

    for (const {tiles, x, y } of $gameMap.magicTiles()) {
      this._blenderTileSprites.push(new SpriteBlenderTile(tiles, x, y));
    }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }

  forceBlenderRefresh() {
    for (const sprite of this._blenderTileSprites) {
      this._tilemap.removeChild(sprite);
      sprite.destroy();
    }

    this.createBlenderTiles();
  }
});

CycloneTileBlender.patchClass(Game_Map, $super => class {
  setup(mapId) {
    $super.setup.call(this, mapId);
    this._loadedMagic = true;
    CycloneTileBlender.loadMagic();
  }

  magicTiles() {
    const list = [];
    const fullTable = CycloneTileBlender.tileBlendingTable;
    if (!fullTable) {
      return list;
    }

    const width = $gameMap.width();
    const height = $gameMap.height();

    for (const tileIndex in fullTable) {
      if (!fullTable[tileIndex]) {
        continue;
      }

      const x = tileIndex % width;
      const y = Math.floor(tileIndex / width);

      // const tileId0 = this._readMapDataIfLowerTile(x, y, 0);
      const tileId1 = this._readMapDataIfLowerTile(x, y, 1);
      const tileId2 = this._readMapDataIfLowerTile(x, y, 2);
      const tileId3 = this._readMapDataIfLowerTile(x, y, 3);
      const tiles = [0, tileId1, tileId2, tileId3];

      list.push({
        tiles,
        x,
        y,
      });
    }

    return list;
  }

  _readMapData(x, y, z) {
    if (!$dataMap?.data) {
      return 0;
    }

    const width = this.width();
    const height = this.height();
    if (this.isLoopHorizontal()) {
      x = x.mod(width);
    }

    if (this.isLoopVertical()) {
      y = y.mod(height);
    }

    if (x >= 0 && x < width && y >= 0 && y < height) {
      return $dataMap.data[(z * height + y) * width + x] || 0;
    } else {
      return 0;
    }
  }

  _readMapDataIfLowerTile(x, y, z) {
    const tileId = this._readMapData(x, y, z);
    const flags = this.tilesetFlags();

    if (flags[tileId] & 0x10) {
      return 0;
    }

    return tileId;
  }

  isMagicTile(x, y, tileId) {
    const tileIndex = (y % $gameMap.height()) * $gameMap.width() + (x % $gameMap.width());
    if (!(tileIndex in CycloneTileBlender.tileBlendingTable)) {
      return false;
    }

    if (tileId === undefined) {
      return true;
    }

    const tileId0 = this._readMapDataIfLowerTile(x, y, 0);
    return tileId !== tileId0;
  }
});

CycloneTileBlender.patchClass(DataManager, $super => class {
  static onLoad(object) {
    $super.onLoad.call(this, object);

    if (this.isMapObject(object)) {
      CycloneTileBlender.loadMagic();
    }
  }
});
})();
