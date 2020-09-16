//=============================================================================
// Cyclone Engine - Tile Priority
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Lets you configure tile priorities (in the same way it worked
 * on Rpg Maker XP).
 *
 * <pluginName:CycloneTilePriority>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-tile-priority
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
 * Tile Priority                                                     by Hudell
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

class CycloneTilePriority$1 extends CyclonePatcher {
  static register() {
    this.initialize('CycloneTilePriority');
    this._cachedTiles = new Map();
  }

  static getTileBitmap(tileId, priority = 1) {
    if (this._cachedTiles.has(tileId)) {
      return this._cachedTiles.get(tileId);
    }

    const tileset = $gameMap.tileset();
    const setNumber = 5 + Math.floor(tileId / 256);
    const tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

    if (!tilesetBitmap) {
      return;
    }

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const bitmap = new Bitmap(tileWidth, tileHeight + tileHeight * (priority - 1));

    tilesetBitmap.addLoadListener(() => {
      const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * tileWidth;
      const sourceY = (Math.floor((tileId % 256) / 8) % 16) * tileHeight;

      bitmap.blt(tilesetBitmap, sourceX, sourceY, tileWidth, tileHeight, 0, bitmap.height - tileHeight * priority);
    });

    this._cachedTiles.set(tileId, bitmap);
    return bitmap;
  }

  static clearBitmapCache() {
    this._cachedTiles.clear();
  }
}

globalThis.CycloneTilePriority = CycloneTilePriority$1;
CycloneTilePriority$1.register();

CycloneTilePriority.patchClass(Tilemap, $super => class {
  _addNormalTile(layer, tileId, dx, dy) {
    if (layer === this._upperLayer) {
      const tag = this.flags[tileId] >> 12;
      if (tag > 0) {
        return;
      }
    }

    $super._addNormalTile.call(this, layer, tileId, dx, dy);
  }
});

class SpritePriorityTile extends Sprite {
  initialize(tileId, x, y, tag) {
    this._tileId = tileId;
    this._mapX = x;
    this._mapY = y;
    this._tilePriority = tag ?? 1;
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
      this.bitmap = CycloneTilePriority.getTileBitmap(this._tileId, this._tilePriority);
    }
  }

  updatePosition() {
    const scrolledX = $gameMap.adjustX(this._mapX);
    this.x = Math.floor(scrolledX * $gameMap.tileWidth());

    const scrolledY = $gameMap.adjustY(this._mapY + this._tilePriority);
    this.y = Math.floor(scrolledY * $gameMap.tileHeight());

    this.z = 3;
  }
}

CycloneTilePriority.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createPriorityTiles();
    $super.createCharacters.call(this);
  }

  createPriorityTiles() {
    CycloneTilePriority.clearBitmapCache();
    this._priorityTileSprites = [];

    for (const {tileId, x, y, tag } of $gameMap.priorityTiles()) {
      this._priorityTileSprites.push(new SpritePriorityTile(tileId, x, y, tag));
    }

    for (const sprite of this._priorityTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});

CycloneTilePriority.patchClass(Game_Map, $super => class {

  priorityTiles() {
    const list = [];

    if (!$dataMap) {
      return list;
    }

    const flags = this.tilesetFlags();

    const _maybeAddTile = (tileId, x, y) => {
      if (!tileId || tileId >= Tilemap.TILE_ID_A1) {
        return;
      }

      const flag = flags[tileId];
      if (flag & 0x10 === 0) {
        return;
      }

      const tag = flag >> 12;
      if (tag <= 0) {
        return;
      }

      list.push({
        tileId,
        x,
        y,
        tag,
      });
    };

    const width = $dataMap.width;
    const height = $dataMap.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        _maybeAddTile($gameMap.tileId(x, y, 0), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 1), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 2), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 3), x, y);
      }
    }

    return list;
  }
});
})();
