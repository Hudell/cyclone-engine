function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//=============================================================================
// Cyclone Engine - Tile Priority MV
//=============================================================================

/*:
 * @plugindesc Lets you configure tile priorities (in the same way it worked
 * on Rpg Maker XP). v1.00 - Premium
 *
 * <pluginName:CycloneTilePriority>
 * @author Hudell
 * @url https://hudell.itch.io/cyclone-tile-priority
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
 *                d8'                                                       MV
 * Tile Priority                                                     by Hudell
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
  if (Utils.RPGMAKER_NAME === 'MV') {
    window.globalThis = window;
    ImageManager.iconWidth = Window_Base._iconWidth;
    ImageManager.iconHeight = Window_Base._iconHeight;
    ImageManager.faceWidth = Window_Base._faceWidth;
    ImageManager.faceHeight = Window_Base._faceHeight;
  }

  var CyclonePatcher = /*#__PURE__*/function () {
    function CyclonePatcher() {
      _classCallCheck(this, CyclonePatcher);
    }

    _createClass(CyclonePatcher, null, [{
      key: "initialize",
      value: function initialize(pluginName) {
        this.pluginName = pluginName;
        this.superClasses = new Map();
      }
    }, {
      key: "_descriptorIsProperty",
      value: function _descriptorIsProperty(descriptor) {
        return descriptor.get || descriptor.set || !descriptor.value || typeof descriptor.value !== 'function';
      }
    }, {
      key: "_getAllClassDescriptors",
      value: function _getAllClassDescriptors(classObj) {
        var usePrototype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (classObj === Object) {
          return {};
        }

        var descriptors = Object.getOwnPropertyDescriptors(usePrototype ? classObj.prototype : classObj);
        var parentDescriptors = {};

        if (classObj.prototype) {
          var parentClass = Object.getPrototypeOf(classObj.prototype).constructor;

          if (parentClass !== Object) {
            parentDescriptors = this._getAllClassDescriptors(parentClass, usePrototype);
          }
        }

        return Object.assign({}, parentDescriptors, descriptors);
      }
    }, {
      key: "_assignDescriptor",
      value: function _assignDescriptor(receiver, giver, descriptor, descriptorName) {
        var autoRename = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (this._descriptorIsProperty(descriptor)) {
          if (descriptor.get || descriptor.set) {
            Object.defineProperty(receiver, descriptorName, {
              get: descriptor.get,
              set: descriptor.set,
              enumerable: descriptor.enumerable,
              configurable: descriptor.configurable
            });
          } else {
            Object.defineProperty(receiver, descriptorName, {
              value: descriptor.value,
              enumerable: descriptor.enumerable,
              configurable: descriptor.configurable
            });
          }
        } else {
          var newName = descriptorName;

          if (autoRename) {
            while (newName in receiver) {
              newName = "_".concat(newName);
            }
          }

          receiver[newName] = giver[descriptorName];
        }
      }
    }, {
      key: "_applyPatch",
      value: function _applyPatch(baseClass, patchClass, $super, ignoredNames) {
        var usePrototype = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        var baseMethods = this._getAllClassDescriptors(baseClass, usePrototype);

        var baseClassOrPrototype = usePrototype ? baseClass.prototype : baseClass;
        var patchClassOrPrototype = usePrototype ? patchClass.prototype : patchClass;
        var descriptors = Object.getOwnPropertyDescriptors(patchClassOrPrototype);
        var anyOverride = false;

        for (var methodName in descriptors) {
          if (ignoredNames.includes(methodName)) {
            continue;
          }

          if (methodName in baseMethods) {
            anyOverride = true;
            var baseDescriptor = baseMethods[methodName];

            this._assignDescriptor($super, baseClassOrPrototype, baseDescriptor, methodName, true);
          }

          var descriptor = descriptors[methodName];

          this._assignDescriptor(baseClassOrPrototype, patchClassOrPrototype, descriptor, methodName);
        }

        return anyOverride;
      }
    }, {
      key: "patchClass",
      value: function patchClass(baseClass, patchFn) {
        var $super = this.superClasses[baseClass.name] || {};
        var $prototype = {};
        var $dynamicSuper = {};
        var patchClass = patchFn($dynamicSuper, $prototype);

        if (typeof patchClass !== 'function') {
          throw new Error("Invalid class patch for ".concat(baseClass.name)); //`
        }

        var ignoredStaticNames = Object.getOwnPropertyNames(function Test() {
          _classCallCheck(this, Test);
        });
        var ignoredNames = Object.getOwnPropertyNames(function Test() {
          _classCallCheck(this, Test);
        }.prototype);

        var anyStaticOverride = this._applyPatch(baseClass, patchClass, $super, ignoredStaticNames);

        var anyNonStaticOverride = this._applyPatch(baseClass, patchClass, $prototype, ignoredNames, true);

        if (anyStaticOverride) {
          var descriptors = Object.getOwnPropertyDescriptors($super);

          for (var descriptorName in descriptors) {
            this._assignDescriptor($dynamicSuper, $super, descriptors[descriptorName], descriptorName);
          }

          if (anyNonStaticOverride) {
            $dynamicSuper.$prototype = $prototype;
          }
        } else {
          Object.assign($dynamicSuper, $prototype);
        }

        this.superClasses[baseClass.name] = $dynamicSuper;
      }
    }]);

    return CyclonePatcher;
  }();

  var CycloneTilePriority$1 = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(CycloneTilePriority$1, _CyclonePatcher);

    var _super = _createSuper(CycloneTilePriority$1);

    function CycloneTilePriority$1() {
      _classCallCheck(this, CycloneTilePriority$1);

      return _super.apply(this, arguments);
    }

    _createClass(CycloneTilePriority$1, null, [{
      key: "register",
      value: function register() {
        this.initialize('CycloneTilePriority');
        this._cachedTiles = new Map();
      }
    }, {
      key: "getTileBitmap",
      value: function getTileBitmap(tileId) {
        var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (this._cachedTiles.has(tileId)) {
          return this._cachedTiles.get(tileId);
        }

        var tileset = $gameMap.tileset();
        var setNumber = 5 + Math.floor(tileId / 256);
        var tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

        if (!tilesetBitmap) {
          return;
        }

        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var bitmap = new Bitmap(tileWidth, tileHeight + tileHeight * (priority - 1));
        tilesetBitmap.addLoadListener(function () {
          var sourceX = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * tileWidth;
          var sourceY = Math.floor(tileId % 256 / 8) % 16 * tileHeight;
          bitmap.blt(tilesetBitmap, sourceX, sourceY, tileWidth, tileHeight, 0, bitmap.height - tileHeight * priority);
        });

        this._cachedTiles.set(tileId, bitmap);

        return bitmap;
      }
    }, {
      key: "clearBitmapCache",
      value: function clearBitmapCache() {
        this._cachedTiles.clear();
      }
    }]);

    return CycloneTilePriority$1;
  }(CyclonePatcher);

  globalThis.CycloneTilePriority = CycloneTilePriority$1;
  CycloneTilePriority$1.register();
  CycloneTilePriority.patchClass(Tilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "_drawNormalTile",
        value: function _drawNormalTile(bitmap, tileId, dx, dy) {
          if (bitmap === this._upperBitmap) {
            var tag = this.flags[tileId] >> 12;

            if (tag > 0) {
              return;
            }
          }

          $super._drawNormalTile.call(this, bitmap, tileId, dx, dy);
        }
      }]);

      return _class;
    }();
  });
  CycloneTilePriority.patchClass(ShaderTilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, [{
        key: "_drawNormalTile",
        value: function _drawNormalTile(bitmap, tileId, dx, dy) {
          if (this.upperLayer.children.includes(bitmap)) {
            var tag = this.flags[tileId] >> 12;

            if (tag > 0) {
              return;
            }
          }

          $super._drawNormalTile.call(this, bitmap, tileId, dx, dy);
        }
      }]);

      return _class2;
    }();
  });

  var SpritePriorityTile = /*#__PURE__*/function (_Sprite) {
    _inherits(SpritePriorityTile, _Sprite);

    var _super2 = _createSuper(SpritePriorityTile);

    function SpritePriorityTile() {
      _classCallCheck(this, SpritePriorityTile);

      return _super2.apply(this, arguments);
    }

    _createClass(SpritePriorityTile, [{
      key: "initialize",
      value: function initialize(tileId, x, y, tag) {
        this._tileId = tileId;
        this._mapX = x;
        this._mapY = y;
        this._tilePriority = tag !== null && tag !== void 0 ? tag : 1;

        _get(_getPrototypeOf(SpritePriorityTile.prototype), "initialize", this).call(this);

        this.anchor.x = 0;
        this.anchor.y = 1;
      }
    }, {
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(SpritePriorityTile.prototype), "update", this).call(this);

        this.updateBitmap();
        this.updatePosition();
      }
    }, {
      key: "updateBitmap",
      value: function updateBitmap() {
        if (!this.bitmap) {
          this.bitmap = CycloneTilePriority.getTileBitmap(this._tileId, this._tilePriority);
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var scrolledX = $gameMap.adjustX(this._mapX);
        this.x = Math.floor(scrolledX * $gameMap.tileWidth());
        var scrolledY = $gameMap.adjustY(this._mapY + this._tilePriority);
        this.y = Math.floor(scrolledY * $gameMap.tileHeight());
        this.z = 3;
      }
    }]);

    return SpritePriorityTile;
  }(Sprite);

  CycloneTilePriority.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "createCharacters",
        value: function createCharacters() {
          this.createPriorityTiles();
          $super.createCharacters.call(this);
        }
      }, {
        key: "createPriorityTiles",
        value: function createPriorityTiles() {
          CycloneTilePriority.clearBitmapCache();
          this._priorityTileSprites = [];

          var _iterator = _createForOfIteratorHelper($gameMap.priorityTiles()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _step.value,
                  tileId = _step$value.tileId,
                  x = _step$value.x,
                  y = _step$value.y,
                  tag = _step$value.tag;

              this._priorityTileSprites.push(new SpritePriorityTile(tileId, x, y, tag));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var _iterator2 = _createForOfIteratorHelper(this._priorityTileSprites),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var sprite = _step2.value;

              this._tilemap.addChild(sprite);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }]);

      return _class3;
    }();
  });
  CycloneTilePriority.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, [{
        key: "priorityTiles",
        value: function priorityTiles() {
          var list = [];

          if (!$dataMap) {
            return list;
          }

          var flags = this.tilesetFlags();

          var _maybeAddTile = function _maybeAddTile(tileId, x, y) {
            if (!tileId || tileId >= Tilemap.TILE_ID_A1) {
              return;
            }

            var flag = flags[tileId];

            if (flag & 0x10 === 0) {
              return;
            }

            var tag = flag >> 12;

            if (tag <= 0) {
              return;
            }

            list.push({
              tileId: tileId,
              x: x,
              y: y,
              tag: tag
            });
          };

          var width = $dataMap.width;
          var height = $dataMap.height;

          for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              _maybeAddTile($gameMap.tileId(x, y, 0), x, y);

              _maybeAddTile($gameMap.tileId(x, y, 1), x, y);

              _maybeAddTile($gameMap.tileId(x, y, 2), x, y);

              _maybeAddTile($gameMap.tileId(x, y, 3), x, y);
            }
          }

          return list;
        }
      }]);

      return _class4;
    }();
  });
})();
