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

class CycloneTileBlender$1 extends CyclonePatcher {
  static register() {
    this.initialize('CycloneTileBlender');
    this._cachedTiles = new Map();
  }

  static buildBitmap(spriteId, tiles) {
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

    let drewAny = false;
    for (let idx = 0; idx < tiles.length; idx++) {
      const tileId = tiles[idx];
      if (!tileId || !bitmaps[tileId]) {
        continue;
      }

      const tilesetBitmap = bitmaps[tileId];
      if (idx === 1 && drewAny) {
        const width = $gameMap.tileWidth();
        const height = $gameMap.tileHeight();

        const tempBitmap = new Bitmap(width, height);
        drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);

        for (let y = 0; y < height; y++) {
          tempBitmap.clearRect(0, y, 10 + Math.randomInt(5), 1);
        }

        bitmap.blt(tempBitmap, 0, 0, tempBitmap.width, tempBitmap.height, 0, 0);
        continue;
      }
      drawTile(bitmap, tilesetBitmap, tileId, 0, 0);
      drewAny = true;
    }
  }

  static getTileBitmap(spriteId, tiles) {
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
          this.buildBitmap(spriteId, tiles);
        });

        buildNow = false;
        break;
      }
    }

    if (buildNow) {
      this.buildBitmap(spriteId, tiles);
    }

    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }
}

globalThis.CycloneTileBlender = CycloneTileBlender$1;
CycloneTileBlender$1.register();

CycloneTileBlender.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ((mapX === 2 || mapX === 3) && mapY === 3) {
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
      this.bitmap = CycloneTileBlender.getTileBitmap(this.spriteId, this._tiles);
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

    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2832, 184], 2, 3));
    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2816, 185], 3, 3));

    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2849], 5, 3));
    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2861], 6, 3));

    // for (const {tileId, x, y, tag } of $gameMap.priorityTiles()) {
    //   this._blenderTileSprites.push(new SpriteBlenderTile(tileId, x, y, tag));
    // }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});
})();
