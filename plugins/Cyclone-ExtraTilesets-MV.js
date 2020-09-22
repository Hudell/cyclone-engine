function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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
// Cyclone Engine - Extra Tilesets MV
//=============================================================================

/*:
* @plugindesc Loads additional tiles from a second tileset. v1.00 - Premium.
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
*                d8'                                                       MV
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
* Cyclone Map Editor will then let you use anything from the B and C tabs
* of the extra tileset you picked.
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

  var CycloneExtraTilesets$1 = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(CycloneExtraTilesets$1, _CyclonePatcher);

    var _super = _createSuper(CycloneExtraTilesets$1);

    function CycloneExtraTilesets$1() {
      _classCallCheck(this, CycloneExtraTilesets$1);

      return _super.apply(this, arguments);
    }

    _createClass(CycloneExtraTilesets$1, null, [{
      key: "register",
      value: function register() {
        this.initialize('CycloneExtraTilesets');
      }
    }, {
      key: "parseExtraTileIds",
      value: function parseExtraTileIds(object) {
        if (!object || !object.note || !object.data) {
          return;
        }

        if (!object.note.includes('<CycloneExtraTiles>')) {
          return;
        }

        var matches = object.note.match(/<CycloneExtraTiles>(.*)<\/CycloneExtraTiles>/i);

        if (matches.length < 2) {
          return;
        }

        var compressed = matches[1];

        try {
          var extraTilesStr = LZString.decompressFromBase64(compressed);
          var extraTiles = JSON.parse(extraTilesStr);

          if (!extraTiles || !Array.isArray(extraTiles)) {
            return;
          }

          var size = Math.min(extraTiles.length, object.width * object.height * 4);

          for (var i = 0; i < size; i++) {
            if (object.data[i] === 0 && extraTiles[i] > 0) {
              object.data[i] = extraTiles[i];
            }
          }
        } catch (e) {
          console.error(e);
          return;
        }
      }
    }, {
      key: "loadExtraTilesets",
      value: function loadExtraTilesets(object) {
        this.parseExtraTileIds(object);

        if (!$gameMap) {
          return;
        }

        var data = loadMapEditorData();

        if (!(data === null || data === void 0 ? void 0 : data.extraTilesetId)) {
          return;
        }

        $gameMap._extraTilesetId = data.extraTilesetId;
      }
    }]);

    return CycloneExtraTilesets$1;
  }(CyclonePatcher);

  globalThis.CycloneExtraTilesets = CycloneExtraTilesets$1;
  CycloneExtraTilesets$1.register();
  CycloneExtraTilesets.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "setup",
        value: function setup(mapId) {
          $super.setup.call(this, mapId);
          this._extraTilesetId = 0;
          CycloneExtraTilesets.loadExtraTilesets();
          this.buildTilesetFlags();
        }
      }, {
        key: "buildTilesetFlags",
        value: function buildTilesetFlags() {
          if (!this._extraTilesetId || this._extraTilesetId === this._tilesetId) {
            return;
          }

          var baseFlags = $super.tilesetFlags.call(this);
          var tileset = this.extraTileset();
          this._allFlags = _toConsumableArray(baseFlags);

          if (tileset) {
            var newZero = Tilemap.TILE_ID_E + 256;
            var newFlags = tileset.flags;

            for (var tileId = 0; tileId < Tilemap.TILE_ID_D; tileId++) {
              var newTileId = tileId + newZero;
              this._allFlags[newTileId] = newFlags[tileId] || 0;
            }
          }

          return this._allFlags;
        }
      }, {
        key: "tilesetFlags",
        value: function tilesetFlags() {
          if (this._allFlags) {
            return this._allFlags;
          }

          return $super.tilesetFlags.call(this);
        }
      }, {
        key: "changeTileset",
        value: function changeTileset(tilesetId) {
          $super.changeTileset.call(this, tilesetId);
          this.buildTilesetFlags();
        }
      }, {
        key: "extraTileset",
        value: function extraTileset() {
          return $dataTilesets[this._extraTilesetId];
        }
      }]);

      return _class;
    }();
  });
  CycloneExtraTilesets.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, null, [{
        key: "onLoad",
        value: function onLoad(object) {
          $super.onLoad.call(this, object);

          if (this.isMapObject(object)) {
            CycloneExtraTilesets.loadExtraTilesets(object);
          }
        }
      }]);

      return _class2;
    }();
  });
  CycloneExtraTilesets.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "loadTileset",
        value: function loadTileset() {
          this._tileset = $gameMap.tileset();
          this._extraTileset = $gameMap.extraTileset();

          if (!this._tileset) {
            return;
          }

          var tilesetNames = this._tileset.tilesetNames;

          for (var i = 0; i < tilesetNames.length; i++) {
            this._tilemap.bitmaps[i] = ImageManager.loadTileset(tilesetNames[i]);
          }

          if (this._extraTileset) {
            this._tilemap.bitmaps[tilesetNames.length] = ImageManager.loadTileset(this._extraTileset.tilesetNames[5]);
            this._tilemap.bitmaps[tilesetNames.length + 1] = ImageManager.loadTileset(this._extraTileset.tilesetNames[6]);
            this._tilemap.bitmaps[tilesetNames.length + 2] = ImageManager.loadTileset(this._extraTileset.tilesetNames[7]);
          }

          var newTilesetFlags = $gameMap.tilesetFlags();

          this._tilemap.refreshTileset();

          if (!this._tilemap.flags.equals(newTilesetFlags)) {
            this._tilemap.refresh();
          }

          this._tilemap.flags = newTilesetFlags;
        }
      }, {
        key: "updateTileset",
        value: function updateTileset() {
          if (this._extraTileset !== $gameMap.extraTileset()) {
            return this.loadTileset();
          }

          $super.updateTileset.call(this);
        }
      }]);

      return _class3;
    }();
  });
})();
