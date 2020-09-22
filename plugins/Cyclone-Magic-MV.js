function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//=============================================================================
// Cyclone Engine - Magic Features
//=============================================================================

/*:
 * @plugindesc . v1.00 - Premium
 *
 * <pluginName:CycloneMagic>
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
 *                d8'                                                       MV
 * Magic Features                                                    by Hudell
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

  if (Utils.RPGMAKER_NAME === 'MV') {
    DataManager.isMapObject = function (object) {
      return !!(object.data && object.events);
    };
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

  function drawNormalTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
    if (tileId === undefined) {
      return;
    }

    var sourceX = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * $gameMap.tileWidth();
    var sourceY = Math.floor(tileId % 256 / 8) % 16 * $gameMap.tileHeight();
    target.blt(tilesetBitmap, sourceX, sourceY, $gameMap.tileWidth(), $gameMap.tileHeight(), x, y, drawWidth !== null && drawWidth !== void 0 ? drawWidth : $gameMap.tileWidth(), drawHeight !== null && drawHeight !== void 0 ? drawHeight : $gameMap.tileHeight());
  }

  function drawAutoTileTable(target, bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
    var halfWidth = $gameMap.tileWidth() / 2;
    var halfHeight = $gameMap.tileHeight() / 2;
    var drawHalfWidth = (drawWidth !== null && drawWidth !== void 0 ? drawWidth : $gameMap.tileWidth()) / 2;
    var drawHalfHeight = (drawHeight !== null && drawHeight !== void 0 ? drawHeight : $gameMap.tileHeight()) / 2;

    for (var i = 0; i < 4; i++) {
      var tableX = table[i][0];
      var tableY = table[i][1];
      var sourceX = tileX * $gameMap.tileWidth() + tableX * halfWidth;
      var sourceY = tileY * $gameMap.tileHeight() + tableY * halfHeight;
      var targetX = x + i % 2 * drawHalfWidth;
      var targetY = y + Math.floor(i / 2) * drawHalfHeight;
      target.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
    }
  }

  function drawTileA1(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
    var tileX = 0;
    var tileY = 0;
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    var kind = Tilemap.getAutotileKind(tileId);
    var shape = Tilemap.getAutotileShape(tileId);

    switch (kind) {
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
        tileX = Math.floor(kind % 8 / 4) * 8;
        tileY = Math.floor(kind / 8) * 6 + Math.floor(kind % 8 / 2) % 2 * 3;

        if (kind % 2 === 1) {
          tileX += 6;
          autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
        }

        break;
    }

    drawAutoTileTable(target, bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  function drawTileA2(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
    var kind = Tilemap.getAutotileKind(tileId);
    var tileX = kind % 8 * 2;
    var tileY = (Math.floor(kind / 8) - 2) * 3;
    var shape = Tilemap.getAutotileShape(tileId);
    drawAutoTileTable(target, bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  function drawTileA3(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
    var kind = Tilemap.getAutotileKind(tileId);
    var tileX = kind % 8 * 2;
    var tileY = (Math.floor(kind / 8) - 6) * 2;
    var shape = Tilemap.getAutotileShape(tileId);
    drawAutoTileTable(target, bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  function drawTileA4(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
    var kind = Tilemap.getAutotileKind(tileId);
    var tileX = kind % 8 * 2;
    var tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
    var shape = Tilemap.getAutotileShape(tileId);
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

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

  var LZString = function () {
    function o(o, r) {
      if (!t[o]) {
        t[o] = {};

        for (var n = 0; n < o.length; n++) {
          t[o][o.charAt(n)] = n;
        }
      }

      return t[o][r];
    }

    var r = String.fromCharCode,
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        t = {},
        i = {
      compressToBase64: function compressToBase64(o) {
        if (null == o) return "";

        var r = i._compress(o, 6, function (o) {
          return n.charAt(o);
        });

        switch (r.length % 4) {
          default:
          case 0:
            return r;

          case 1:
            return r + "===";

          case 2:
            return r + "==";

          case 3:
            return r + "=";
        }
      },
      decompressFromBase64: function decompressFromBase64(r) {
        return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
          return o(n, r.charAt(e));
        });
      },
      compressToUTF16: function compressToUTF16(o) {
        return null == o ? "" : i._compress(o, 15, function (o) {
          return r(o + 32);
        }) + " ";
      },
      decompressFromUTF16: function decompressFromUTF16(o) {
        return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
          return o.charCodeAt(r) - 32;
        });
      },
      compressToUint8Array: function compressToUint8Array(o) {
        for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
          var s = r.charCodeAt(e);
          n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256;
        }

        return n;
      },
      decompressFromUint8Array: function decompressFromUint8Array(o) {
        if (null === o || void 0 === o) return i.decompress(o);

        for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) {
          n[e] = 256 * o[2 * e] + o[2 * e + 1];
        }

        var s = [];
        return n.forEach(function (o) {
          s.push(r(o));
        }), i.decompress(s.join(""));
      },
      compressToEncodedURIComponent: function compressToEncodedURIComponent(o) {
        return null == o ? "" : i._compress(o, 6, function (o) {
          return e.charAt(o);
        });
      },
      decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(r) {
        return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
          return o(e, r.charAt(n));
        }));
      },
      compress: function compress(o) {
        return i._compress(o, 16, function (o) {
          return r(o);
        });
      },
      _compress: function _compress(o, r, n) {
        if (null == o) return "";
        var e,
            t,
            i,
            s = {},
            p = {},
            u = "",
            c = "",
            a = "",
            l = 2,
            f = 3,
            h = 2,
            d = [],
            m = 0,
            v = 0;

        for (i = 0; i < o.length; i += 1) {
          if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c;else {
            if (Object.prototype.hasOwnProperty.call(p, a)) {
              if (a.charCodeAt(0) < 256) {
                for (e = 0; h > e; e++) {
                  m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                }

                for (t = a.charCodeAt(0), e = 0; 8 > e; e++) {
                  m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
              } else {
                for (t = 1, e = 0; h > e; e++) {
                  m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                }

                for (t = a.charCodeAt(0), e = 0; 16 > e; e++) {
                  m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
              }

              l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
            } else for (t = s[a], e = 0; h > e; e++) {
              m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
            }

            l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u);
          }
        }

        if ("" !== a) {
          if (Object.prototype.hasOwnProperty.call(p, a)) {
            if (a.charCodeAt(0) < 256) {
              for (e = 0; h > e; e++) {
                m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
              }

              for (t = a.charCodeAt(0), e = 0; 8 > e; e++) {
                m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
              }
            } else {
              for (t = 1, e = 0; h > e; e++) {
                m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
              }

              for (t = a.charCodeAt(0), e = 0; 16 > e; e++) {
                m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
              }
            }

            l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
          } else for (t = s[a], e = 0; h > e; e++) {
            m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
          }

          l--, 0 == l && (l = Math.pow(2, h), h++);
        }

        for (t = 2, e = 0; h > e; e++) {
          m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
        }

        for (;;) {
          if (m <<= 1, v == r - 1) {
            d.push(n(m));
            break;
          }

          v++;
        }

        return d.join("");
      },
      decompress: function decompress(o) {
        return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
          return o.charCodeAt(r);
        });
      },
      _decompress: function _decompress(o, n, e) {
        var t,
            i,
            s,
            p,
            u,
            c,
            a,
            l,
            f = [],
            h = 4,
            d = 4,
            m = 3,
            v = "",
            w = [],
            A = {
          val: e(0),
          position: n,
          index: 1
        };

        for (i = 0; 3 > i; i += 1) {
          f[i] = i;
        }

        for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) {
          u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
        }

        switch (t = p) {
          case 0:
            for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) {
              u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
            }

            l = r(p);
            break;

          case 1:
            for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) {
              u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
            }

            l = r(p);
            break;

          case 2:
            return "";
        }

        for (f[3] = l, s = l, w.push(l);;) {
          if (A.index > o) return "";

          for (p = 0, c = Math.pow(2, m), a = 1; a != c;) {
            u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
          }

          switch (l = p) {
            case 0:
              for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) {
                u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
              }

              f[d++] = r(p), l = d - 1, h--;
              break;

            case 1:
              for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) {
                u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
              }

              f[d++] = r(p), l = d - 1, h--;
              break;

            case 2:
              return w.join("");
          }

          if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l];else {
            if (l !== d) return null;
            v = s + s.charAt(0);
          }
          w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++);
        }
      }
    };
    return i;
  }();

  "function" == typeof define && define.amd ? define(function () {
    return LZString;
  }) : "undefined" != typeof module && null != module && (module.exports = LZString);

  function decompress(data) {
    if (!data.startsWith('v=')) {
      return LZString.decompress(data);
    }

    var idx = data.indexOf(';') + 1;
    return LZString.decompressFromBase64(data.substring(idx));
  }

  function parseMapEditorData(note) {
    var json;

    try {
      json = decompress(note);
    } catch (e) {
      console.error('Failed to decompress data from CycloneMapEditor event.');
      console.log(note);
      console.log(e);
      return;
    }

    var data;

    try {
      data = JSON.parse(json);
    } catch (e) {
      console.error('Failed to parse data from CycloneMapEditor event.');
      console.log(json);
      console.log(e);
      return;
    }

    return data;
  }

  function loadMapEditorData() {
    var _iterator = _createForOfIteratorHelper($dataMap.events),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;

        if (!event) {
          continue;
        }

        if (event.name !== 'CycloneMapEditor') {
          continue;
        }

        return parseMapEditorData(event.note);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  var SpriteBlenderTile = /*#__PURE__*/function (_Sprite) {
    _inherits(SpriteBlenderTile, _Sprite);

    var _super = _createSuper(SpriteBlenderTile);

    function SpriteBlenderTile() {
      _classCallCheck(this, SpriteBlenderTile);

      return _super.apply(this, arguments);
    }

    _createClass(SpriteBlenderTile, [{
      key: "initialize",
      value: function initialize(tiles, x, y, width, height) {
        this._tiles = tiles;
        this._mapX = x;
        this._mapY = y;
        this._mapWidth = width;
        this._mapHeight = height;

        _get(_getPrototypeOf(SpriteBlenderTile.prototype), "initialize", this).call(this);

        this.anchor.x = 0;
        this.anchor.y = 0;
      }
    }, {
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(SpriteBlenderTile.prototype), "update", this).call(this);

        this.updateBitmap();
        this.updatePosition();
      }
    }, {
      key: "updateBitmap",
      value: function updateBitmap() {
        if (!this.bitmap) {
          this.bitmap = CycloneMagic.getTileBitmap(this.spriteId, this._tiles, this._mapX, this._mapY, this._mapWidth, this._mapHeight);
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var scrolledX = $gameMap.adjustX(this._mapX);
        this.x = Math.floor(scrolledX * $gameMap.tileWidth());
        var scrolledY = $gameMap.adjustY(this._mapY);
        this.y = Math.floor(scrolledY * $gameMap.tileHeight());
        this.z = 1;
      }
    }]);

    return SpriteBlenderTile;
  }(Sprite);

  var tileBlendingTable = {};

  var CycloneMagic$1 = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(CycloneMagic$1, _CyclonePatcher);

    var _super2 = _createSuper(CycloneMagic$1);

    function CycloneMagic$1() {
      _classCallCheck(this, CycloneMagic$1);

      return _super2.apply(this, arguments);
    }

    _createClass(CycloneMagic$1, null, [{
      key: "register",
      value: function register() {
        this.initialize('CycloneMagic');
        this._cachedTiles = new Map();
      }
    }, {
      key: "isSpriteCached",
      value: function isSpriteCached(spriteId) {
        return this._cachedTiles.has(spriteId);
      }
    }, {
      key: "clearPositionCache",
      value: function clearPositionCache(x, y) {
        var _SceneManager$_scene, _SceneManager$_scene$;

        if (!((_SceneManager$_scene = SceneManager._scene) === null || _SceneManager$_scene === void 0 ? void 0 : (_SceneManager$_scene$ = _SceneManager$_scene._spriteset) === null || _SceneManager$_scene$ === void 0 ? void 0 : _SceneManager$_scene$._blenderTileSprites)) {
          this.clearBitmapCache();
          return true;
        }

        var clearedAny = false;

        var _iterator2 = _createForOfIteratorHelper(SceneManager._scene._spriteset._blenderTileSprites),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var sprite = _step2.value;

            if (!sprite) {
              continue;
            }

            if (sprite._mapX > x || sprite._mapY > y) {
              continue;
            }

            if (sprite._mapX + sprite._mapWidth <= x) {
              continue;
            }

            if (sprite._mapY + sprite._mapHeight <= y) {
              continue;
            }

            if (this._cachedTiles.has(sprite.spriteId)) {
              this._cachedTiles["delete"](sprite.spriteId);
            }

            clearedAny = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return clearedAny;
      }
    }, {
      key: "getBitmapList",
      value: function getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
        var _this = this;

        var tileset = $gameMap.tileset();
        var bitmaps = [];

        var _iterator3 = _createForOfIteratorHelper(tiles),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var tileGroup = _step3.value;

            var _iterator4 = _createForOfIteratorHelper(tileGroup),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var tileId = _step4.value;

                if (!tileId || bitmaps[tileId]) {
                  continue;
                }

                var setNumber = getTilesetIndex(tileId);
                var tilesetBitmap = ImageManager.loadTileset(tileset.tilesetNames[setNumber]);

                if (!tilesetBitmap) {
                  continue;
                }

                if (!tilesetBitmap.isReady()) {
                  tilesetBitmap.addLoadListener(function () {
                    _this.buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);
                  });
                  return false;
                }

                bitmaps[tileId] = tilesetBitmap;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return bitmaps;
      }
    }, {
      key: "buildBitmap",
      value: function buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
        var bitmap = this._cachedTiles.get(spriteId);

        if (!bitmap) {
          return;
        }

        var bitmaps = this.getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);

        if (!bitmaps) {
          return;
        }

        var width = $gameMap.tileWidth();
        var height = $gameMap.tileHeight();
        var size = width * height;
        var spriteTileIndex = -1;

        for (var tileY = y; tileY < y + spriteMapHeight; tileY++) {
          for (var tileX = x; tileX < x + spriteMapWidth; tileX++) {
            spriteTileIndex++;
            var drawX = (tileX - x) * width;
            var drawY = (tileY - y) * height;
            var tileIndex = tileY % $gameMap.height() * $gameMap.width() + tileX % $gameMap.width();
            var magic = tileBlendingTable[tileIndex];
            var cellTiles = tiles[spriteTileIndex];

            for (var idx = 1; idx < cellTiles.length; idx++) {
              var tileId = cellTiles[idx];

              if (!tileId || !bitmaps[tileId]) {
                continue;
              }

              var tilesetBitmap = bitmaps[tileId];

              if (idx === 1) {
                var tempBitmap = new Bitmap(width, height);
                drawTile(tempBitmap, tilesetBitmap, tileId, 0, 0);
                var context = tempBitmap.context;
                var imageData = context.getImageData(0, 0, tempBitmap.width, tempBitmap.height);

                if (magic) {
                  var pixels = imageData.data;

                  for (var i = 0; i < size; i++) {
                    if (magic[i] === 1) {
                      pixels[i * 4 + 3] = 0;
                    }
                  }
                }

                bitmap.context.putImageData(imageData, drawX, drawY);
                continue;
              }

              drawTile(bitmap, tilesetBitmap, tileId, drawX, drawY);
            }
          }
        }
      }
    }, {
      key: "getTileBitmap",
      value: function getTileBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight) {
        if (this._cachedTiles.has(spriteId)) {
          return this._cachedTiles.get(spriteId);
        }

        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var bitmap = new Bitmap(tileWidth * spriteMapWidth, tileHeight * spriteMapHeight);

        this._cachedTiles.set(spriteId, bitmap);

        var bitmaps = this.getBitmapList(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);

        if (bitmaps) {
          this.buildBitmap(spriteId, tiles, x, y, spriteMapWidth, spriteMapHeight);
        }

        return bitmap;
      }
    }, {
      key: "clearBitmapCache",
      value: function clearBitmapCache() {
        this._cachedTiles.clear();
      }
    }, {
      key: "loadMagic",
      value: function loadMagic() {
        tileBlendingTable = {};
        this.clearBitmapCache();
        var data = loadMapEditorData();

        if (!(data === null || data === void 0 ? void 0 : data.magic)) {
          return;
        }

        this.setupMagic(data.magic);
      }
    }, {
      key: "setupMagic",
      value: function setupMagic(magic) {
        for (var tileId in magic) {
          if (!magic[tileId]) {
            continue;
          }

          var line = magic[tileId];
          var buffer = new ArrayBuffer(line.length);
          var list = new Uint8Array(buffer);

          for (var i = line.indexOf('1'); i < line.length; i++) {
            if (line[i] !== '0') {
              list[i] = Number(line[i]);
            }
          }

          tileBlendingTable[tileId] = list;
        }
      }
    }, {
      key: "tileBlendingTable",
      get: function get() {
        return tileBlendingTable;
      },
      set: function set(value) {
        tileBlendingTable = value;
      }
    }, {
      key: "SpriteBlenderTile",
      get: function get() {
        return SpriteBlenderTile;
      }
    }]);

    return CycloneMagic$1;
  }(CyclonePatcher);

  globalThis.CycloneMagic = CycloneMagic$1;
  CycloneMagic$1.register();
  CycloneMagic.patchClass(Tilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "_addSpotTile",
        value: function _addSpotTile(tileId, dx, dy) {
          if (!this._isHigherTile(tileId)) {
            var mapX = Math.round(dx / this._tileWidth) + this._lastStartX;

            var mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

            if ($gameMap.isMagicTile(mapX, mapY, tileId)) {
              // when editing, delay hiding the position until the sprite is added to the spriteset
              if (window.CycloneMapEditor && window.CycloneMapEditor.isPositionBlendSpriteReady(mapX, mapY)) {
                return;
              }
            }
          }

          return $super._addSpotTile.call(this, tileId, dx, dy);
        }
      }]);

      return _class;
    }();
  });
  CycloneMagic.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, [{
        key: "createCharacters",
        value: function createCharacters() {
          this.createBlenderTiles();
          $super.createCharacters.call(this);
        }
      }, {
        key: "createBlenderTiles",
        value: function createBlenderTiles() {
          CycloneMagic.clearBitmapCache();
          this._blenderTileSprites = [];

          var _iterator5 = _createForOfIteratorHelper($gameMap.magicTiles()),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = _step5.value,
                  tiles = _step5$value.tiles,
                  x = _step5$value.x,
                  y = _step5$value.y,
                  width = _step5$value.width,
                  height = _step5$value.height;

              this._blenderTileSprites.push(new SpriteBlenderTile(tiles, x, y, width, height));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          var _iterator6 = _createForOfIteratorHelper(this._blenderTileSprites),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var sprite = _step6.value;

              this._tilemap.addChild(sprite);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }]);

      return _class2;
    }();
  });
  CycloneMagic.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "setup",
        value: function setup(mapId) {
          $super.setup.call(this, mapId);
          this._loadedMagic = true;
          CycloneMagic.loadMagic();
        }
      }, {
        key: "getMagicTilesLongList",
        value: function getMagicTilesLongList() {
          var list = [];
          var fullTable = CycloneMagic.tileBlendingTable;

          if (!fullTable) {
            return list;
          }

          var width = $gameMap.width();

          for (var tileIndex in fullTable) {
            if (!fullTable[tileIndex]) {
              continue;
            }

            var x = tileIndex % width;
            var y = Math.floor(tileIndex / width);

            var tileId1 = this._readMapDataIfLowerTile(x, y, 1);

            var tileId2 = this._readMapDataIfLowerTile(x, y, 2);

            var tileId3 = this._readMapDataIfLowerTile(x, y, 3);

            var tiles = [0, tileId1, tileId2, tileId3];
            list.push({
              tiles: tiles,
              x: x,
              y: y
            });
          }

          return list;
        }
      }, {
        key: "magicTiles",
        value: function magicTiles() {
          var list = this.getMagicTilesLongList(); // When editing, keep each tile as a separate sprite

          if (window.CycloneMapEditor) {
            return list.map(function (item) {
              return {
                x: item.x,
                y: item.y,
                width: 1,
                height: 1,
                tiles: [item.tiles]
              };
            });
          }

          var width = $gameMap.width();
          var height = $gameMap.height();

          var isPositionOnList = function isPositionOnList(x, y) {
            return list.find(function (item) {
              return item.x === x && item.y === y;
            });
          };

          var pluckItem = function pluckItem(x, y) {
            var index = list.findIndex(function (item) {
              return item.x === x && item.y === y;
            });

            if (index < 0) {
              return;
            }

            var item = list[index];
            list.splice(index, 1);
            return item;
          };

          var shortList = [];

          while (list.length > 0) {
            var firstItem = list[0];
            var minX = firstItem.x;
            var maxX = firstItem.x;
            var minY = firstItem.y;
            var maxY = firstItem.y;

            for (var newX = minX + 1; newX < width; newX++) {
              if (!isPositionOnList(newX, minY)) {
                break;
              }

              maxX = newX;
            }

            for (var _newX = minX; _newX <= maxX; _newX++) {
              for (var newY = minY + 1; newY < height; newY++) {
                if (!isPositionOnList(_newX, newY)) {
                  break;
                }

                maxY = newY;
              }
            }

            var itemWidth = maxX - minX + 1;
            var itemHeight = maxY - minY + 1;
            var tiles = new Array(itemWidth * itemHeight);
            var index = 0;

            for (var blockY = minY; blockY <= maxY; blockY++) {
              for (var blockX = minX; blockX <= maxX; blockX++) {
                var oldItem = pluckItem(blockX, blockY);
                tiles[index] = (oldItem === null || oldItem === void 0 ? void 0 : oldItem.tiles) || [];
                index++;
              }
            }

            shortList.push({
              x: minX,
              y: minY,
              width: itemWidth,
              height: itemHeight,
              tiles: tiles
            });
          }

          return shortList;
        }
      }, {
        key: "_readMapData",
        value: function _readMapData(x, y, z) {
          var _$dataMap;

          if (!((_$dataMap = $dataMap) === null || _$dataMap === void 0 ? void 0 : _$dataMap.data)) {
            return 0;
          }

          var width = this.width();
          var height = this.height();

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
      }, {
        key: "_readMapDataIfLowerTile",
        value: function _readMapDataIfLowerTile(x, y, z) {
          var tileId = this._readMapData(x, y, z);

          var flags = this.tilesetFlags();

          if (flags[tileId] & 0x10) {
            return 0;
          }

          return tileId;
        }
      }, {
        key: "isMagicTile",
        value: function isMagicTile(x, y, tileId) {
          var tileIndex = y % $gameMap.height() * $gameMap.width() + x % $gameMap.width();

          if (!(tileIndex in CycloneMagic.tileBlendingTable)) {
            return false;
          }

          if (tileId === undefined) {
            return true;
          }

          var tileId0 = this._readMapDataIfLowerTile(x, y, 0);

          return tileId !== tileId0;
        }
      }]);

      return _class3;
    }();
  });
  CycloneMagic.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, null, [{
        key: "onLoad",
        value: function onLoad(object) {
          $super.onLoad.call(this, object);

          if (this.isMapObject(object)) {
            CycloneMagic.loadMagic();
          }
        }
      }]);

      return _class4;
    }();
  });
})();
