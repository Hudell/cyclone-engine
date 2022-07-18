function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e7) { throw _e7; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e8) { didErr = true; err = _e8; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
// Cyclone Engine - Advanced Maps
//=============================================================================

/*:
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
 * @default false
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
 * @type Struct<LayerPosition>
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
  if (Utils.RPGMAKER_NAME === 'MV') {
    window.globalThis = window;
    ImageManager.iconWidth = Window_Base._iconWidth;
    ImageManager.iconHeight = Window_Base._iconHeight;
    ImageManager.faceWidth = Window_Base._faceWidth;
    ImageManager.faceHeight = Window_Base._faceHeight;
  }

  globalThis.CyclonePatcher = /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
      key: "initialize",
      value: function initialize(t) {
        this.pluginName = t, this.superClasses = new Map();
      }
    }, {
      key: "_descriptorIsProperty",
      value: function _descriptorIsProperty(t) {
        return t.get || t.set || !t.value || "function" != typeof t.value;
      }
    }, {
      key: "_getAllClassDescriptors",
      value: function _getAllClassDescriptors(t) {
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        if (t === Object) return {};
        var r = Object.getOwnPropertyDescriptors(e ? t.prototype : t);
        var s = {};

        if (t.prototype) {
          var _r = Object.getPrototypeOf(t.prototype).constructor;
          _r !== Object && (s = this._getAllClassDescriptors(_r, e));
        }

        return Object.assign({}, s, r);
      }
    }, {
      key: "_assignDescriptor",
      value: function _assignDescriptor(t, e, r, s) {
        var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
        if (this._descriptorIsProperty(r)) r.get || r.set ? Object.defineProperty(t, s, {
          get: r.get,
          set: r.set,
          enumerable: r.enumerable,
          configurable: r.configurable
        }) : Object.defineProperty(t, s, {
          value: r.value,
          enumerable: r.enumerable,
          configurable: r.configurable
        });else {
          var _r2 = s;
          if (a) for (; (_r2 in t);) {
            _r2 = "_".concat(_r2);
          }
          t[_r2] = e[s];
        }
      }
    }, {
      key: "_applyPatch",
      value: function _applyPatch(t, e, r, s) {
        var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

        var n = this._getAllClassDescriptors(t, a),
            i = a ? t.prototype : t,
            o = a ? e.prototype : e,
            l = Object.getOwnPropertyDescriptors(o);

        var u = !1;

        for (var _t in l) {
          if (s.includes(_t)) continue;

          if (_t in n) {
            u = !0;
            var _e2 = n[_t];

            this._assignDescriptor(r, i, _e2, _t, !0);
          }

          var _e = l[_t];

          this._assignDescriptor(i, o, _e, _t);
        }

        return u;
      }
    }, {
      key: "patchClass",
      value: function patchClass(t, e) {
        var r = this.superClasses && this.superClasses[t.name] || {},
            s = {},
            a = {},
            n = e(a, s);
        if ("function" != typeof n) throw new Error("Invalid class patch for ".concat(t.name));

        var i = Object.getOwnPropertyNames( /*#__PURE__*/function () {
          function _class2() {
            _classCallCheck(this, _class2);
          }

          return _class2;
        }()),
            o = Object.getOwnPropertyNames( /*#__PURE__*/function () {
          function _class3() {
            _classCallCheck(this, _class3);
          }

          return _class3;
        }().prototype),
            l = this._applyPatch(t, n, r, i),
            u = this._applyPatch(t, n, s, o, !0);

        if (l) {
          var _t2 = Object.getOwnPropertyDescriptors(r);

          for (var _e3 in _t2) {
            this._assignDescriptor(a, r, _t2[_e3], _e3);
          }

          u && (a.$prototype = s);
        } else Object.assign(a, s);

        this.superClasses && (this.superClasses[t.name] = a);
      }
    }]);

    return _class;
  }();

  var t = Object.freeze(["TRUE", "ON", "1", "YES", "T", "V"]);

  var e = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(e, _CyclonePatcher);

    var _super = _createSuper(e);

    function e() {
      _classCallCheck(this, e);

      return _super.apply(this, arguments);
    }

    _createClass(e, null, [{
      key: "initialize",
      value: function initialize(t) {
        _get(_getPrototypeOf(e), "initialize", this).call(this, t), this.fileName = void 0, this.params = {}, this.structs = new Map(), this.eventListeners = new Map(), this.structs.set("Dictionary", {
          name: {
            type: "string",
            defaultValue: ""
          },
          value: {
            type: "string",
            defaultValue: ""
          }
        });
      }
    }, {
      key: "register",
      value: function register() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var e = this.loadAllParams();
        this.params = this.loadParamMap(t, e);
      }
    }, {
      key: "loadAllParams",
      value: function loadAllParams() {
        var _iterator = _createForOfIteratorHelper(globalThis.$plugins),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _t3 = _step.value;
            if (!_t3 || !_t3.status) continue;
            if (!_t3.description || !_t3.description.includes("<pluginName:".concat(this.pluginName))) continue;
            this.fileName = _t3.name;

            var _e4 = new Map();

            for (var r in _t3.parameters) {
              r && !r.startsWith("-") && _e4.set(r, _t3.parameters[r]);
            }

            return _e4;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "loadParamMap",
      value: function loadParamMap(t, e) {
        var r = {};

        for (var s in t) {
          if (t.hasOwnProperty(s)) try {
            r[s] = this.parseParam(s, t, e);
          } catch (t) {
            console.error("CycloneEngine crashed while trying to parse a parameter value (".concat(s, "). Please report the following error to Hudell:")), console.log(t);
          }
        }

        return r;
      }
    }, {
      key: "registerEvent",
      value: function registerEvent(t, e) {
        this.eventListeners.has(t) || this.eventListeners.set(t, new Set());
        this.eventListeners.get(t).add(e);
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(t, e) {
        if (!this.eventListeners.has(t)) return;
        this.eventListeners.get(t)["delete"](e);
      }
    }, {
      key: "shouldReturnCallbackResult",
      value: function shouldReturnCallbackResult(t, _ref) {
        var e = _ref.abortOnTrue,
            r = _ref.abortOnFalse,
            s = _ref.returnOnValue;
        return !(!1 !== t || !r) || !(!0 !== t || !e) || !(void 0 === t || !s);
      }
    }, {
      key: "runEvent",
      value: function runEvent(t) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$abortOnTrue = _ref2.abortOnTrue,
            e = _ref2$abortOnTrue === void 0 ? !1 : _ref2$abortOnTrue,
            _ref2$abortOnFalse = _ref2.abortOnFalse,
            r = _ref2$abortOnFalse === void 0 ? !1 : _ref2$abortOnFalse,
            _ref2$returnOnValue = _ref2.returnOnValue,
            s = _ref2$returnOnValue === void 0 ? !1 : _ref2$returnOnValue;

        if (!this.eventListeners.has(t)) return;
        var n = this.eventListeners.get(t);

        for (var _len = arguments.length, a = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          a[_key - 2] = arguments[_key];
        }

        var _iterator2 = _createForOfIteratorHelper(n),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _t4 = _step2.value;

            if ("number" == typeof _t4) {
              this.runCommonEvent(_t4);
              continue;
            }

            if ("function" != typeof _t4) {
              console.error("CycloneEngine: Invalid callback type:"), console.log(_t4);
              continue;
            }

            var _n = _t4.apply(void 0, a);

            if (this.shouldReturnCallbackResult(_n, {
              abortOnTrue: e,
              abortOnFalse: r,
              returnOnValue: s
            })) return _n;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "runCommonEvent",
      value: function runCommonEvent(t) {
        var _this = this;

        var e = globalThis.$dataCommonEvents[t];
        if (!e) return;
        var r = new Game_Interpreter(1);

        if (r.setup(e.list, 0), !this._interpreters) {
          this._interpreters = new Set();
          var _t5 = SceneManager.updateMain;

          SceneManager.updateMain = function () {
            _t5.call(SceneManager), _this.update();
          };
        }

        this._interpreters.add(r);
      }
    }, {
      key: "update",
      value: function update() {
        if (this._interpreters) {
          var _iterator3 = _createForOfIteratorHelper(this._interpreters),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _t6 = _step3.value;
              _t6.update(), _t6.isRunning() || this._interpreters["delete"](_t6);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    }, {
      key: "getPluginFileName",
      value: function getPluginFileName() {
        var _this$fileName;

        return (_this$fileName = this.fileName) !== null && _this$fileName !== void 0 ? _this$fileName : this.pluginName;
      }
    }, {
      key: "isTrue",
      value: function isTrue(e) {
        return "string" != typeof e ? Boolean(e) : t.includes(e.toUpperCase());
      }
    }, {
      key: "isFalse",
      value: function isFalse(t) {
        return !this.isTrue(t);
      }
    }, {
      key: "getIntParam",
      value: function getIntParam(_ref3) {
        var t = _ref3.value,
            e = _ref3.defaultValue;

        try {
          var r = parseInt(t);
          return isNaN(r) ? e : r;
        } catch (r) {
          return "" !== t && console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be an integer number, but the received value was '").concat(t, "'.")), e;
        }
      }
    }, {
      key: "getFloatParam",
      value: function getFloatParam(_ref4) {
        var t = _ref4.value,
            e = _ref4.defaultValue;

        try {
          var r = parseFloat(t.replace(",", "."));
          return isNaN(r) ? e : r;
        } catch (r) {
          return "" !== t && console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be a number, but the received value was '").concat(t, "'.")), e;
        }
      }
    }, {
      key: "getIntListParam",
      value: function getIntListParam(_ref5) {
        var _this2 = this;

        var t = _ref5.value;
        return this.parseArray((t !== null && t !== void 0 ? t : "").trim(), function (t) {
          try {
            return parseInt(t.trim());
          } catch (e) {
            return "" !== t && console.error("Cyclone Engine plugin ".concat(_this2.pluginName, ": Param is expected to be a list of integer numbers, but one of the items was '").concat(t, "'.")), 0;
          }
        });
      }
    }, {
      key: "parseStructArrayParam",
      value: function parseStructArrayParam(_ref6) {
        var t = _ref6.data,
            e = _ref6.type;
        var r = [];

        var _iterator4 = _createForOfIteratorHelper(t),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var s = _step4.value;

            var _t7 = this.parseStructParam({
              value: s,
              defaultValue: "",
              type: e
            });

            _t7 && r.push(_t7);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return r;
      }
    }, {
      key: "getFloatListParam",
      value: function getFloatListParam(_ref7) {
        var _this3 = this;

        var t = _ref7.value;
        return this.parseArray((t || "").trim(), function (t) {
          try {
            return parseFloat(t.trim());
          } catch (e) {
            return "" !== t && console.error("Cyclone Engine plugin ".concat(_this3.pluginName, ": Param ").concat(name, " is expected to be a list of numbers, but one of the items was '").concat(t, "'.")), 0;
          }
        });
      }
    }, {
      key: "getParam",
      value: function getParam(_ref8) {
        var t = _ref8.key,
            e = _ref8.value,
            r = _ref8.defaultValue,
            s = _ref8.type;

        try {
          if (s.endsWith("[]")) return this.parseArrayParam({
            key: t,
            value: e,
            type: s
          });
          if (s.startsWith("struct<")) return this.parseStructParam({
            key: t,
            value: e,
            defaultValue: r,
            type: s
          });
          if (void 0 === e) return r;

          switch (s) {
            case "int":
              return this.getIntParam({
                value: e,
                defaultValue: r
              });

            case "float":
              return this.getFloatParam({
                value: e,
                defaultValue: r
              });

            case "boolean":
              return "boolean" == typeof e ? e : this.isTrue(String(e).trim());

            default:
              return e;
          }
        } catch (e) {
          throw t && console.error(t), e;
        }
      }
    }, {
      key: "getPluginParam",
      value: function getPluginParam(t) {
        return this.params.get(t);
      }
    }, {
      key: "defaultValueForType",
      value: function defaultValueForType(t) {
        switch (t) {
          case "int":
          case "float":
            return 0;

          case "boolean":
            return !1;
        }

        return "";
      }
    }, {
      key: "parseParam",
      value: function parseParam(t, e, r) {
        var _r$get;

        var s = e[t];
        s && "string" == typeof s && (s = {
          type: s,
          defaultValue: this.defaultValueForType(s)
        });
        var _s = s,
            _s$name = _s.name,
            a = _s$name === void 0 ? t : _s$name,
            _s$type = _s.type,
            n = _s$type === void 0 ? "string" : _s$type,
            _s$defaultValue = _s.defaultValue,
            i = _s$defaultValue === void 0 ? "" : _s$defaultValue;
        var o;
        if (r) o = (_r$get = r.get(a)) !== null && _r$get !== void 0 ? _r$get : i;else {
          var _value;

          o = (_value = (this.getPluginParam(a) || {}).value) !== null && _value !== void 0 ? _value : i;
        }
        return this.getParam({
          key: t,
          value: o,
          defaultValue: i,
          type: n
        });
      }
    }, {
      key: "parseArrayParam",
      value: function parseArrayParam(_ref9) {
        var t = _ref9.value,
            e = _ref9.type;
        var r = this.parseArray(t);
        if (!r || !r.length) return r;
        var s = e.substr(0, e.length - 2),
            a = [];

        var _iterator5 = _createForOfIteratorHelper(r),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _t8 = _step5.value;

            var _e5 = this.defaultValueForType(s);

            a.push(this.getParam({
              value: _t8,
              type: s,
              defaultValue: _e5
            }));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return a;
      }
    }, {
      key: "getRegexMatch",
      value: function getRegexMatch(t, e, r) {
        var s = t.match(e);
        if (s) return s[r];
      }
    }, {
      key: "parseStructData",
      value: function parseStructData(t, e) {
        for (var r in t) {
          if (!t.hasOwnProperty(r)) continue;
          var s = t[r];
          "string" == typeof s && (s = {
            type: s,
            defaultValue: this.defaultValueForType(s)
          }), e[r] = this.getParam({
            key: r,
            value: e[r],
            defaultValue: s.defaultValue,
            type: s.type
          });
        }

        return e;
      }
    }, {
      key: "parseStructParam",
      value: function parseStructParam(_ref10) {
        var t = _ref10.key,
            e = _ref10.value,
            r = _ref10.defaultValue,
            s = _ref10.type;
        var a;
        if (e) try {
          a = JSON.parse(e);
        } catch (r) {
          console.error("Cyclone Engine failed to parse param structure: ", t, e), console.error(r);
        }
        if (!a) try {
          a = JSON.parse(r);
        } catch (e) {
          throw console.error("Cyclone Engine failed to parse default value: ", t, r), e;
        }
        var n = this.getRegexMatch(s, /struct<(.*)>/i, 1);
        if (!n) return console.error("Unknown plugin param type: ".concat(s, " (").concat(t || "", ")")), a;
        var i = this.structs.get(n);
        return i ? this.parseStructData(i, a) : (console.error("Unknown param structure type: ".concat(n, " (").concat(t || "", ")")), a);
      }
    }, {
      key: "parseList",
      value: function parseList(t, e) {
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";
        var s = t;
        s.startsWith("[") && (s = s.substr(1)), s.endsWith("]") && (s = s.substr(0, s.length - 1));
        var a = s.split(r || ",");
        return e ? a.map(function (t) {
          return e(t);
        }) : a;
      }
    }, {
      key: "parseArray",
      value: function parseArray(t, e) {
        var r;

        try {
          r = JSON.parse(t);
        } catch (t) {
          return [];
        }

        return r && r.length ? e ? r.map(function (t) {
          return e(t);
        }) : r : [];
      }
    }, {
      key: "registerCommand",
      value: function registerCommand(t, e, r) {
        var _this4 = this;

        var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        return "function" == typeof e ? PluginManager.registerCommand(this.getPluginFileName(), t, e) : PluginManager.registerCommand(this.getPluginFileName(), t, function (t) {
          var s = new Map();

          for (var _e6 in t) {
            t.hasOwnProperty(_e6) && s.set(_e6, t[_e6]);
          }

          var a = _this4.loadParamMap(e, s);

          return Object.assign(t, a), r(t);
        });
      }
    }]);

    return e;
  }(CyclonePatcher);

  globalThis.CyclonePlugin = e;

  function objectFromEntries(entries) {
    if (typeof Object.fromEntries === 'function') {
      return Object.fromEntries(entries);
    }

    return _toConsumableArray(entries).reduce(function (obj, _ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          key = _ref12[0],
          value = _ref12[1];

      obj[key] = value;
      return obj;
    }, {});
  }

  if (Utils.RPGMAKER_NAME === 'MV') {
    CyclonePlugin.registerCommand = function (commandName, params, fn) {
      var mvParamOrder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var callback = typeof params === 'function' ? params : fn;
      var paramMap = typeof params === 'function' ? {} : params;
      var paramOrder = Array.isArray(fn) ? fn : mvParamOrder;
      var plugin = this;
      var oldParsePluginCommand = Game_Interpreter.prototype.pluginCommand;

      Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command.toLowerCase() === 'cyclone' && args.length > 0) {
          var _args = _toArray(args),
              _name = _args[0],
              receivedArgs = _args.slice(1);

          if (_name === commandName) {
            var dataMap = new Map();

            for (var i = 0; i < receivedArgs.length; i++) {
              if (i >= paramOrder.length) {
                break;
              }

              dataMap.set(paramOrder[i], receivedArgs[i]);
            }

            var parsedArgs = plugin.loadParamMap(paramMap, dataMap);
            return callback(_objectSpread(_objectSpread({}, objectFromEntries(dataMap)), parsedArgs));
          }
        }

        return oldParsePluginCommand.call(this, command, args);
      };
    };
  }

  function getMetaObject(notes, tagName) {
    var rgx = new RegExp("<".concat(tagName, "([^>]*)"), 'gis');
    var list = [];

    while (true) {
      var match = rgx.exec(notes);

      if (!match) {
        break;
      }

      if (match.length < 2) {
        continue;
      }

      var dataRgx = /([^=:\n\r\t]+)[=:]?(.*)/gm;
      var obj = match[1];
      var newObject = {};

      while (true) {
        var attribute = dataRgx.exec(obj);

        if (!attribute) {
          break;
        }

        if (attribute.length < 2) {
          continue;
        }

        var _name2 = attribute[1].trim();

        if (!_name2) {
          continue;
        }

        if (attribute.length > 2 && attribute[0] !== attribute[1]) {
          newObject[_name2] = attribute[2].trim();
        } else {
          newObject[_name2] = true;
        }
      }

      list.push(newObject);
    }

    return list;
  }

  var CycloneAdvancedMaps$1 = /*#__PURE__*/function (_CyclonePlugin) {
    _inherits(CycloneAdvancedMaps$1, _CyclonePlugin);

    var _super2 = _createSuper(CycloneAdvancedMaps$1);

    function CycloneAdvancedMaps$1() {
      _classCallCheck(this, CycloneAdvancedMaps$1);

      return _super2.apply(this, arguments);
    }

    _createClass(CycloneAdvancedMaps$1, null, [{
      key: "register",
      value: function register() {
        var _this5 = this;

        _get(_getPrototypeOf(CycloneAdvancedMaps$1), "initialize", this).call(this, 'CycloneAdvancedMaps');

        this.structs.set('CycloneCommonEventRegion', {
          regionId: 'int',
          commonEventId: 'int'
        });
        this.structs.set('CycloneNamedRegion', {
          regionId: 'int',
          name: 'string'
        });
        this.structs.set('CycloneLayerPosition', {
          x: 'int',
          y: 'int',
          unit: 'string',
          boundTo: 'string',
          moveX: 'int',
          moveY: 'int',
          tiling: 'boolean'
        });
        this.structs.set('CycloneOverlayItem', {
          layerName: 'string',
          fileName: 'string',
          tagName: 'string',
          appendMapId: {
            type: 'boolean',
            defaultValue: true
          },
          switchId: 'int',
          invertSwitch: 'boolean',
          quickStart: {
            type: 'boolean',
            defaultValue: true
          },
          z: 'int',
          opacity: {
            type: 'int',
            defaultValue: 255
          },
          opacitySpeed: {
            type: 'int',
            defaultValue: 25
          },
          blendMode: 'int',
          mapList: 'int[]',
          position: 'struct<CycloneLayerPosition>',
          fadeIn: 'boolean'
        });
        this.structs.set('CycloneCustomLayer', {
          name: 'string',
          layerName: 'string',
          file: 'string',
          fileName: 'string',
          // tag: 'string',
          "switch": 'int',
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

        _get(_getPrototypeOf(CycloneAdvancedMaps$1), "register", this).call(this, {
          debug: {
            name: 'debug',
            type: 'boolean',
            defaultValue: false
          },
          mapChangeEventId: 'int',
          tileWidth: {
            type: 'int',
            defaultValue: 48
          },
          tileHeight: {
            type: 'int',
            defaultValue: 48
          },
          tilesetPath: {
            type: 'string',
            defaultValue: 'img/tilesets/'
          },
          disableTilemap: 'boolean',
          disableAutoShadows: 'boolean',
          balloonZ: {
            type: 'int',
            defaultValue: 7
          },
          animationZ: {
            type: 'int',
            defaultValue: 8
          },
          overlayEnabled: 'boolean',
          overlayPath: {
            type: 'string',
            defaultValue: 'img/overlays'
          },
          folders: 'string',
          layers: {
            type: 'struct<CycloneOverlayItem>[]',
            defaultValue: '[]'
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
            defaultValue: '[]'
          },
          namedRegions: {
            type: 'struct<CycloneNamedRegion>[]',
            defaultValue: '[]'
          },
          regionNamesStay: 'boolean'
        });

        this.registerCommand('newLayerOpacity', {
          layerName: 'string',
          opacity: 'int',
          duration: 'int'
        }, function (_ref13) {
          var layerName = _ref13.layerName,
              opacity = _ref13.opacity,
              duration = _ref13.duration;

          _this5.changeLayerOpacity(layerName, opacity, duration);
        }, ['layerName', 'opacity', 'duration']);
        this.registerCommand('layer', {
          layerName: 'string',
          fileName: 'string'
        }, function (_ref14) {
          var layerName = _ref14.layerName,
              fileName = _ref14.fileName;

          if (!layerName || !fileName) {
            CycloneAdvancedMaps$1.params.debug && console.error('Invalid layer parameters', layerName, fileName);
            return;
          }

          CycloneAdvancedMaps$1.changeLayerFileName(layerName, fileName);
        }, ['layerName', 'fileName']);
        this.registerCommand('customLayer', {
          layerName: 'string',
          fileName: 'string',
          z: 'int',
          switchId: 'int',
          x: 'int',
          y: 'int',
          unit: 'string',
          invertSwitch: 'boolean'
        }, function (_ref15) {
          var layerName = _ref15.layerName,
              fileName = _ref15.fileName,
              z = _ref15.z,
              _ref15$switchId = _ref15.switchId,
              switchId = _ref15$switchId === void 0 ? 0 : _ref15$switchId,
              _ref15$x = _ref15.x,
              x = _ref15$x === void 0 ? 0 : _ref15$x,
              _ref15$y = _ref15.y,
              y = _ref15$y === void 0 ? 0 : _ref15$y,
              _ref15$unit = _ref15.unit,
              unit = _ref15$unit === void 0 ? 'tiles' : _ref15$unit,
              _ref15$invertSwitch = _ref15.invertSwitch,
              invertSwitch = _ref15$invertSwitch === void 0 ? false : _ref15$invertSwitch;

          if (!layerName || !fileName || typeof z !== 'number') {
            CycloneAdvancedMaps$1.params.debug && console.error('Invalid custom layer parameters', layerName, fileName, z);
            return;
          }

          CycloneAdvancedMaps$1.addCustomLayer({
            layerName: layerName,
            fileName: fileName,
            z: z,
            switchId: switchId,
            invertSwitch: invertSwitch,
            position: {
              x: x,
              y: y,
              unit: ['pixels', 'px'].includes(unit) ? 'pixels' : 'tiles'
            }
          });
        }, ['layerName', 'fileName', 'z', 'switchId', 'x', 'y', 'unit', 'invertSwitch']);
        this.clearSettings();
      }
    }, {
      key: "clearSettings",
      value: function clearSettings() {
        this.params.debug && console.log('Clearing CycloneAdvancedMaps settings');
        var layers = this.params.layers;
        var commonEventRegions = this.params.commonEventRegions;
        var namedRegions = this.params.namedRegions;
        this.commonEventRegions = new Map();
        this.namedRegions = new Map();
        this.layers = [];

        for (var i = 0; i < layers.length; i++) {
          this.layers.push(_objectSpread(_objectSpread({}, layers[i]), {}, {
            index: i,
            id: "cyclone_layer_".concat(i),
            changed: false,
            extraX: 0,
            extraY: 0,
            opacityChange: this.opacitySpeedToChange(layers[i].opacitySpeed)
          }));
        }

        this.params.debug && console.log('Layer Configuration', this.layers);

        var _iterator6 = _createForOfIteratorHelper(commonEventRegions),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var config = _step6.value;

            if (config.regionId > 0 && config.commonEventId > 0) {
              this.commonEventRegions.set(config.regionId, config.commonEventId);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        var _iterator7 = _createForOfIteratorHelper(namedRegions),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _config = _step7.value;

            if (_config.regionId > 0) {
              this.namedRegions.set(_config.regionId, _config.name.trim());
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }, {
      key: "opacitySpeedToChange",
      value: function opacitySpeedToChange(speed) {
        if (speed) {
          return 255 / speed;
        }

        return 10;
      }
    }, {
      key: "changeLayerOpacity",
      value: function changeLayerOpacity(layerName, opacity, duration) {
        var _iterator8 = _createForOfIteratorHelper(this.layers),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var layer = _step8.value;

            if (layer.layerName === layerName) {
              CycloneAdvancedMaps$1.params.debug && console.log("Layer ".concat(layerName, " opacity changed from ").concat(layer.opacity, " to ").concat(opacity, ", duration = ").concat(duration || layer.opacitySpeed));
              layer.opacity = opacity;
              layer.oneTimeOpacityDuration = duration;
              return;
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    }, {
      key: "addCustomLayer",
      value: function addCustomLayer(layerData) {
        this.params.debug && console.log('Add custom layer', layerData); // Remove an existing layer with the same name if found

        if (layerData.layerName) {
          for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].layerName === layerData.layerName) {
              this.layers.splice(i, 1);
              break;
            }
          }
        }

        this.layers.push(_objectSpread(_objectSpread({
          extraX: 0,
          extraY: 0
        }, layerData), {}, {
          index: this.layers.length,
          id: "cyclone_custom_layer_".concat(this.layers.length),
          changed: false,
          opacityChange: this.opacitySpeedToChange(layerData.opacitySpeed),
          mapList: [$gameMap._mapId]
        }));
      }
    }, {
      key: "loadMapCustomLayers",
      value: function loadMapCustomLayers() {
        var objects = getMetaObject($dataMap.note || '', 'customLayer');
        var structType = this.structs.get('CycloneCustomLayer');

        var _iterator9 = _createForOfIteratorHelper(objects),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var data = _step9.value;
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
              switchId: data["switch"] || data.switchId || 0,
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
                tiling: !!data.tiling
              }
            });
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    }, {
      key: "changeLayerFileName",
      value: function changeLayerFileName(layerName, fileName) {
        var _iterator10 = _createForOfIteratorHelper(this.layers),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var layer = _step10.value;

            if (layer.layerName === layerName) {
              CycloneAdvancedMaps$1.params.debug && console.log("Layer ".concat(layerName, " file name changed from ").concat(layer.fileName, " to ").concat(fileName));
              layer.fileName = fileName;
              layer.changed = true;
              return;
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }
    }, {
      key: "checkRegionActions",
      value: function checkRegionActions() {
        var regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);

        if (this.commonEventRegions.has(regionId)) {
          this.runCommonEvent(this.commonEventRegions.get(regionId));
        }
      }
    }]);

    return CycloneAdvancedMaps$1;
  }(CyclonePlugin);

  globalThis.CycloneAdvancedMaps = CycloneAdvancedMaps$1;
  CycloneAdvancedMaps$1.register();
  CycloneAdvancedMaps.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, null, [{
        key: "setupNewGame",
        value: function setupNewGame() {
          $super.setupNewGame.call(this);

          if (!CycloneAdvancedMaps.params.overlayEnabled) {
            return;
          }

          var _iterator11 = _createForOfIteratorHelper(CycloneAdvancedMaps.params.layers),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var _step11$value = _step11.value,
                  quickStart = _step11$value.quickStart,
                  switchId = _step11$value.switchId;

              if (!quickStart || !switchId) {
                continue;
              }

              CycloneAdvancedMaps.params.debug && console.log("Initializing switch ".concat(switchId));
              $gameSwitches.setValue(switchId, true);
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }
      }, {
        key: "createGameObjects",
        value: function createGameObjects() {
          $super.createGameObjects.call(this);
          CycloneAdvancedMaps.clearSettings();
        }
      }]);

      return _class4;
    }();
  });
  CycloneAdvancedMaps.patchClass(Game_Event, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "isMapPassable",
        value: function isMapPassable(x, y, d) {
          var blockRegionId = CycloneAdvancedMaps.params.blockEventRegionId;
          var unblockRegionId = CycloneAdvancedMaps.params.unblockEventRegionId;

          if (blockRegionId > 0 || unblockRegionId > 0) {
            var newX = $gameMap.roundXWithDirection(x, d);
            var newY = $gameMap.roundYWithDirection(y, d);
            var regionId = $gameMap.regionId(newX, newY);

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
      }]);

      return _class5;
    }();
  });
  CycloneAdvancedMaps.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, [{
        key: "setup",
        value: function setup() {
          var _$super$setup;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          (_$super$setup = $super.setup).call.apply(_$super$setup, [this].concat(args));

          if (CycloneAdvancedMaps.params.overlayEnabled) {
            CycloneAdvancedMaps.loadMapCustomLayers();
          }
        }
      }, {
        key: "tileWidth",
        value: function tileWidth() {
          var customWidth = CycloneAdvancedMaps.params.tileWidth;

          if (typeof customWidth === 'number' && customWidth > 0) {
            return customWidth;
          }

          return $super.tileWidth.call(this);
        }
      }, {
        key: "tileHeight",
        value: function tileHeight() {
          var customHeight = CycloneAdvancedMaps.params.tileHeight;

          if (typeof customHeight === 'number' && customHeight > 0) {
            return customHeight;
          }

          return $super.tileHeight.call(this);
        }
      }, {
        key: "isBush",
        value: function isBush(x, y) {
          if ($super.isBush.call(this, x, y)) {
            return true;
          }

          var bushRegionId = CycloneAdvancedMaps.params.bushRegionId;

          if (!bushRegionId) {
            return false;
          }

          if (!this.isValid(x, y)) {
            return false;
          }

          return $gameMap.regionId(x, y) === bushRegionId;
        }
      }, {
        key: "checkRegionPassability",
        value: function checkRegionPassability(x, y) {
          var blockRegionId = CycloneAdvancedMaps.params.blockRegionId;
          var unblockRegionId = CycloneAdvancedMaps.params.unblockRegionId;

          if (blockRegionId > 0 || unblockRegionId > 0) {
            var regionId = this.regionId(x, y);

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
      }, {
        key: "checkPassage",
        value: function checkPassage(x, y, bit) {
          var region = this.checkRegionPassability(x, y);

          if (typeof region === 'boolean') {
            return region;
          }

          return $super.checkPassage.call(this, x, y, bit);
        }
      }]);

      return _class6;
    }();
  });
  CycloneAdvancedMaps.patchClass(Game_Party, function ($super) {
    return /*#__PURE__*/function () {
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "onPlayerWalk",
        value: function onPlayerWalk() {
          $super.onPlayerWalk.call(this);

          if (CycloneAdvancedMaps.commonEventRegions.size > 0) {
            CycloneAdvancedMaps.checkRegionActions();
          }
        }
      }]);

      return _class7;
    }();
  });
  CycloneAdvancedMaps.patchClass(Game_Player, function ($super) {
    return /*#__PURE__*/function () {
      function _class8() {
        _classCallCheck(this, _class8);
      }

      _createClass(_class8, [{
        key: "performTransfer",
        value: function performTransfer() {
          if (this.isTransferring()) {
            if (CycloneAdvancedMaps.params.commonEventId > 0) {
              $gameTemp.reserveCommonEvent(CycloneAdvancedMaps.params.commonEventId);
            }
          }

          $super.performTransfer.call(this);
        }
      }, {
        key: "isMapPassable",
        value: function isMapPassable(x, y, d) {
          var blockRegionId = CycloneAdvancedMaps.params.blockPlayerRegionId;
          var unblockRegionId = CycloneAdvancedMaps.params.unblockPlayerRegionId;

          if (blockRegionId > 0 || unblockRegionId > 0) {
            var newX = $gameMap.roundXWithDirection(x, d);
            var newY = $gameMap.roundYWithDirection(y, d);
            var regionId = $gameMap.regionId(newX, newY);

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
      }]);

      return _class8;
    }();
  });
  CycloneAdvancedMaps.patchClass(ImageManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class9() {
        _classCallCheck(this, _class9);
      }

      _createClass(_class9, null, [{
        key: "loadTileset",
        value: function loadTileset(filename) {
          var customPath = CycloneAdvancedMaps.params.tilesetPath;

          if (customPath) {
            return this.loadBitmap(customPath, filename);
          }

          return $super.loadTileset.call(this, filename);
        }
      }]);

      return _class9;
    }();
  });
  CycloneAdvancedMaps.patchClass(Scene_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class10() {
        _classCallCheck(this, _class10);
      }

      _createClass(_class10, [{
        key: "mapNameWindowRect",
        value: function mapNameWindowRect() {}
      }]);

      return _class10;
    }();
  });

  var WindowRegionName = /*#__PURE__*/function (_Window_MapName) {
    _inherits(WindowRegionName, _Window_MapName);

    var _super3 = _createSuper(WindowRegionName);

    function WindowRegionName() {
      _classCallCheck(this, WindowRegionName);

      return _super3.apply(this, arguments);
    }

    _createClass(WindowRegionName, [{
      key: "refresh",
      value: function refresh() {
        this.contents.clear();
        var regionId = this._currentRegionId || 0;

        if (regionId === 0) {
          return;
        }

        var regionName = CycloneAdvancedMaps.namedRegions.get(regionId);

        if (!regionName) {
          return;
        }

        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText(regionName, 0, 0, width, 'center');
      }
    }, {
      key: "update",
      value: function update() {
        if (this._delay) {
          this._delay--;
          return;
        }

        this._delay = 10;
        var regionId = $gameMap.regionId($gamePlayer._x, $gamePlayer._y);
        var shouldUpdate = regionId > 0 || !this._showCount;

        if (shouldUpdate && (CycloneAdvancedMaps.params.regionNamesStay || regionId !== this._currentRegionId)) {
          this._currentRegionId = regionId;
          this.open();
          return;
        }

        _get(_getPrototypeOf(WindowRegionName.prototype), "update", this).call(this);
      }
    }]);

    return WindowRegionName;
  }(Window_MapName);

  CycloneAdvancedMaps.patchClass(Scene_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class11() {
        _classCallCheck(this, _class11);
      }

      _createClass(_class11, [{
        key: "createRegionNameWindow",
        value: function createRegionNameWindow() {
          var rect = this.mapNameWindowRect();
          this._regionNameWindow = new WindowRegionName(rect);
          this.addChild(this._regionNameWindow);
        }
      }, {
        key: "createMapNameWindow",
        value: function createMapNameWindow() {
          $super.createMapNameWindow.call(this);
          this.createRegionNameWindow();
        }
      }, {
        key: "updateTransferPlayer",
        value: function updateTransferPlayer() {
          if ($gamePlayer.isTransferring()) {
            this._regionNameWindow.close();
          }

          $super.updateTransferPlayer();
          this._regionNameWindow._delay = 0;

          this._regionNameWindow.update();
        }
      }, {
        key: "callMenu",
        value: function callMenu() {
          $super.callMenu.call(this);

          this._regionNameWindow.hide();
        }
      }, {
        key: "launchBattle",
        value: function launchBattle() {
          $super.launchBattle.call(this);

          this._regionNameWindow.hide();
        }
      }, {
        key: "stop",
        value: function stop() {
          this._regionNameWindow.close();

          $super.stop.call(this);
        }
      }]);

      return _class11;
    }();
  });
  CycloneAdvancedMaps.patchClass(Sprite_Animation, function ($super) {
    return /*#__PURE__*/function () {
      function _class12() {
        _classCallCheck(this, _class12);
      }

      _createClass(_class12, [{
        key: "initMembers",
        value: function initMembers() {
          $super.initMembers.call(this);
          var animationZ = CycloneAdvancedMaps.params.animationZ; // Only apply if we have a valid Z different from the default

          if (animationZ !== 0 && animationZ !== 8) {
            this.z = animationZ;
          }
        }
      }]);

      return _class12;
    }();
  });
  CycloneAdvancedMaps.patchClass(Sprite_Balloon, function ($super) {
    return /*#__PURE__*/function () {
      function _class13() {
        _classCallCheck(this, _class13);
      }

      _createClass(_class13, [{
        key: "initMembers",
        value: function initMembers() {
          $super.initMembers.call(this);
          var balloonZ = CycloneAdvancedMaps.params.balloonZ; // Only apply if we have a valid Z different from the default

          if (balloonZ !== 0 && balloonZ !== 7) {
            this.z = balloonZ;
          }
        }
      }]);

      return _class13;
    }();
  });
  CycloneAdvancedMaps.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class14() {
        _classCallCheck(this, _class14);
      }

      _createClass(_class14, [{
        key: "getLayerFolderName",
        value: function getLayerFolderName(layerData) {
          switch (CycloneAdvancedMaps.params.folders) {
            case 'perLayer':
              return layerData.tagName;

            case 'perMap':
              return $gameMap._mapId ? String($gameMap._mapId) : '';
          }

          return '';
        }
      }, {
        key: "getLayerFileName",
        value: function getLayerFileName(layerData) {
          var fileNamePrefix = layerData.fileName || '';
          var tagFileName = this.getMeta(layerData.tagName);
          var fileName = typeof tagFileName === 'string' ? tagFileName : '';
          var fileNameSuffix = layerData.appendMapId ? $gameMap._mapId : '';
          return "".concat(fileNamePrefix).concat(fileName).concat(fileNameSuffix);
        }
      }, {
        key: "loadOverlayBitmap",
        value: function loadOverlayBitmap(layerData) {
          var bitmapPath = this.getLayerFileName(layerData);

          if (!bitmapPath) {
            return null;
          }

          CycloneAdvancedMaps.params.debug && console.log('Loading bitmap: ', bitmapPath);
          var overlayFolder = CycloneAdvancedMaps.params.overlayPath || 'img/overlays';
          var folderName = this.getLayerFolderName(layerData);
          var path = folderName ? "".concat(overlayFolder, "/").concat(folderName) : overlayFolder;
          return ImageManager.loadBitmap("".concat(path, "/"), bitmapPath);
        }
      }, {
        key: "isLayerEnabled",
        value: function isLayerEnabled(layerData) {
          if (layerData.switchId > 0) {
            var switchValue = $gameSwitches.value(layerData.switchId);
            return layerData.invertSwitch ? !switchValue : switchValue;
          }

          return true;
        }
      }, {
        key: "isLayerAllowed",
        value: function isLayerAllowed(layerData) {
          var _layerData$mapList, _layerData$mapList2;

          var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if ((_layerData$mapList = layerData.mapList) === null || _layerData$mapList === void 0 ? void 0 : _layerData$mapList.includes($gameMap._mapId)) {
            debug && CycloneAdvancedMaps.params.debug && console.log("Layer ".concat(layerData.layerName || layerData.tagName, " allowed by map list. (Map ").concat($gameMap._mapId, ")"));
            return true;
          }

          if (layerData.tagName) {
            if (this.getMeta(layerData.tagName) || this.getMeta('all')) {
              debug && CycloneAdvancedMaps.params.debug && console.log("Layer ".concat(layerData.layerName || layerData.tagName, " allowed by tag. (Map ").concat($gameMap._mapId, ")"));
              return true;
            }

            debug && CycloneAdvancedMaps.params.debug && console.log("Layer ".concat(layerData.layerName || layerData.tagName, " blocked by tag. (Map ").concat($gameMap._mapId, ")"));
            return false;
          }

          if (!((_layerData$mapList2 = layerData.mapList) === null || _layerData$mapList2 === void 0 ? void 0 : _layerData$mapList2.length)) {
            debug && CycloneAdvancedMaps.params.debug && console.log("Layer ".concat(layerData.layerName || layerData.tagName, " allowed by lack of filters. (Map ").concat($gameMap._mapId, ")"));
            return true;
          }

          debug && CycloneAdvancedMaps.params.debug && console.log("Layer ".concat(layerData.layerName || layerData.tagName, " blocked by map list. (Map ").concat($gameMap._mapId, ")"));
          return false;
        }
      }, {
        key: "createOverlayLayer",
        value: function createOverlayLayer(layerData) {
          var _layerData$position, _layerData$position2;

          if (!this.isLayerAllowed(layerData, true)) {
            return null;
          }

          var bitmap = this.loadOverlayBitmap(layerData);

          if (!bitmap) {
            return null;
          }

          var layer = ((_layerData$position = layerData.position) === null || _layerData$position === void 0 ? void 0 : _layerData$position.tiling) ? new TilingSprite(bitmap) : new Sprite(bitmap);

          if ((_layerData$position2 = layerData.position) === null || _layerData$position2 === void 0 ? void 0 : _layerData$position2.tiling) {
            layer.width = Graphics.width;
            layer.height = Graphics.height;
          }

          layer.z = layerData.z || 0;

          this._tilemap.addChild(layer);

          if (layerData.fadeIn) {
            layer.opacity = 0;
          } else {
            layer.opacity = this.isLayerEnabled(layerData) ? layerData.opacity || 255 : 0;
          }

          if (layerData.blendMode) {
            layer.blendMode = layerData.blendMode;
          }

          return layer;
        }
      }, {
        key: "createLowerOverlayLayers",
        value: function createLowerOverlayLayers() {
          var _iterator12 = _createForOfIteratorHelper(CycloneAdvancedMaps.layers),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var layer = _step12.value;

              if (layer.z > 1) {
                continue;
              }

              this[layer.id] = this.createOverlayLayer(layer);
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
        }
      }, {
        key: "createUpperOverlayLayers",
        value: function createUpperOverlayLayers() {
          var _iterator13 = _createForOfIteratorHelper(CycloneAdvancedMaps.layers),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var layer = _step13.value;

              if (layer.z > 1) {
                this[layer.id] = this.createOverlayLayer(layer);
              }
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }
      }, {
        key: "createCharacters",
        value: function createCharacters() {
          if (!CycloneAdvancedMaps.params.overlayEnabled) {
            return $super.createCharacters.call(this);
          }

          this.createLowerOverlayLayers();
          $super.createCharacters.call(this);
          this.createUpperOverlayLayers();
        }
      }, {
        key: "getMeta",
        value: function getMeta(name) {
          if ($dataMap && $dataMap.meta) {
            return $dataMap.meta[name];
          }
        }
      }, {
        key: "getLayerPosition",
        value: function getLayerPosition(layerData) {
          var _layerData$position3, _layerData$position4, _layerData$position5, _layerData$position6;

          var boundToScreen = ((_layerData$position3 = layerData.position) === null || _layerData$position3 === void 0 ? void 0 : _layerData$position3.boundTo) === 'screen';
          var top = boundToScreen ? 0 : $gameMap.displayY() * (0 - $gameMap.tileHeight());
          var left = boundToScreen ? 0 : $gameMap.displayX() * (0 - $gameMap.tileWidth());
          var x = ((_layerData$position4 = layerData.position) === null || _layerData$position4 === void 0 ? void 0 : _layerData$position4.x) || 0;
          var y = ((_layerData$position5 = layerData.position) === null || _layerData$position5 === void 0 ? void 0 : _layerData$position5.y) || 0;

          if (((_layerData$position6 = layerData.position) === null || _layerData$position6 === void 0 ? void 0 : _layerData$position6.unit) === 'pixels') {
            return [left + x, top + y];
          }

          return [left + x * $gameMap.tileWidth(), top + y * $gameMap.tileHeight()];
        }
      }, {
        key: "updateOverlayLayer",
        value: function updateOverlayLayer(layerData) {
          var _layer, _layerData$position7, _layerData$position8, _layerData$position9;

          var layer = this[layerData.id];
          var bitmap = ((_layer = layer) === null || _layer === void 0 ? void 0 : _layer.bitmap) || this.loadOverlayBitmap(layerData);

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

          layerData.extraX -= ((_layerData$position7 = layerData.position) === null || _layerData$position7 === void 0 ? void 0 : _layerData$position7.moveX) || 0;
          layerData.extraY -= ((_layerData$position8 = layerData.position) === null || _layerData$position8 === void 0 ? void 0 : _layerData$position8.moveY) || 0;

          var _this$getLayerPositio = this.getLayerPosition(layerData),
              _this$getLayerPositio2 = _slicedToArray(_this$getLayerPositio, 2),
              x = _this$getLayerPositio2[0],
              y = _this$getLayerPositio2[1];

          if ((_layerData$position9 = layerData.position) === null || _layerData$position9 === void 0 ? void 0 : _layerData$position9.tiling) {
            var _layerData$position10;

            if (((_layerData$position10 = layerData.position) === null || _layerData$position10 === void 0 ? void 0 : _layerData$position10.boundTo) === 'screen') {
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
      }, {
        key: "updateOverlayLayers",
        value: function updateOverlayLayers() {
          var _iterator14 = _createForOfIteratorHelper(CycloneAdvancedMaps.layers),
              _step14;

          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var layer = _step14.value;

              if (this.isLayerAllowed(layer, layer.changed)) {
                this.updateOverlayLayer(layer);
              }
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }
      }, {
        key: "updateLayerOpacity",
        value: function updateLayerOpacity(layer, layerData) {
          var _layerData$opacity;

          var opacity = this.isLayerEnabled(layerData) ? (_layerData$opacity = layerData.opacity) !== null && _layerData$opacity !== void 0 ? _layerData$opacity : 255 : 0;

          if (layer.opacity === opacity) {
            return;
          }

          if (layerData.oneTimeOpacityDuration) {
            layerData.oneTimeOpacityChange = Math.ceil(Math.abs(layer.opacity - layerData.opacity) / layerData.oneTimeOpacityDuration);
            CycloneAdvancedMaps.params.debug && console.log('Single use opacity change calculated: ', layerData.oneTimeOpacityChange);
            layerData.oneTimeOpacityDuration = undefined;
          }

          var opacityChange = (layerData.oneTimeOpacityChange || layerData.opacityChange || 10) * (opacity > layer.opacity ? 1 : -1); // If the opacity is decreasing, the minimum is the target, otherwise it's 0

          var min = opacityChange > 0 ? 0 : opacity; // If the opacity is increasing, the maximum is the target, otherwise it's 255

          var max = opacityChange > 0 ? opacity : 255;
          var newOpacity = (layer.opacity + opacityChange).clamp(min, max);

          if (layer.opacity !== newOpacity) {
            layer.opacity = newOpacity;
          }

          if (newOpacity === opacity && layerData.oneTimeOpacityChange) {
            delete layerData.oneTimeOpacityChange;
          }
        }
      }, {
        key: "updateTilemap",
        value: function updateTilemap() {
          if (CycloneAdvancedMaps.params.overlayEnabled) {
            this.updateOverlayLayers();
          }

          $super.updateTilemap.call(this);
        }
      }]);

      return _class14;
    }();
  });
  CycloneAdvancedMaps.patchClass(Tilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class15() {
        _classCallCheck(this, _class15);
      }

      _createClass(_class15, [{
        key: "initialize",
        value: function initialize() {
          $super.initialize.call(this);
          this._tileWidth = $gameMap.tileWidth();
          this._tileHeight = $gameMap.tileHeight();
        }
      }, {
        key: "updateTransform",
        value: function updateTransform() {
          if (CycloneAdvancedMaps.params.disableTilemap) {
            this._sortChildren();

            PIXI.Container.prototype.updateTransform.call(this);
            return;
          }

          $super.updateTransform.call(this);
        }
      }, {
        key: "_addShadow",
        value: function _addShadow() {
          var _$super$_addShadow;

          if (CycloneAdvancedMaps.params.disableAutoShadows) {
            return;
          }

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return (_$super$_addShadow = $super._addShadow).call.apply(_$super$_addShadow, [this].concat(args));
        }
      }]);

      return _class15;
    }();
  });
  CycloneAdvancedMaps.patchClass(ShaderTilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class16() {
        _classCallCheck(this, _class16);
      }

      _createClass(_class16, [{
        key: "updateTransform",
        value: function updateTransform() {
          if (CycloneAdvancedMaps.params.disableTilemap) {
            this._sortChildren();

            PIXI.Container.prototype.updateTransform.call(this);
            return;
          }

          $super.updateTransform.call(this);
        }
      }, {
        key: "_drawShadow",
        value: function _drawShadow() {
          var _$super$_drawShadow;

          if (CycloneAdvancedMaps.params.disableAutoShadows) {
            return;
          }

          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return (_$super$_drawShadow = $super._drawShadow).call.apply(_$super$_drawShadow, [this].concat(args));
        }
      }]);

      return _class16;
    }();
  });
})();
