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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e8) { throw _e8; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e9) { didErr = true; err = _e9; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
 * <pluginName:CycloneMaps>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-maps
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
 *  any of the following channels (in order of preference):
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Opening threads on the plugin's itch.io page
 *   1.c. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 3. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 4. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 5. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 6. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 7. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2022-07-17 - Version 1.00.00
 * ===========================================================================
 * Instructions
 * ===========================================================================
 * You can use this plugin to add overlay images to your maps
 * You can keep the images either on the img/parallaxes folder
 * or (if you set the Organized Folders param to true) on separate
 * folders like this:
 *
 * img/overlays/grounds
 * img/overlays/pars
 * img/overlays/shadows
 * img/overlays/lights
 * img/overlays/fogs
 *
 * All image filenames must end with the number of the map
 *
 * Map notetags:
 *
 * <all> : Display all overlays
 * <ground> : Display ground overlay
 * <par> : Display parallax overlay
 * <light> : Display light overlay
 * <shadow> : Display shadow overlay
 * <fogName:filename> : Display the specified fog image
 * <fogOpacity:number> : Change the opacity level of the fog image (0 to 255)
 * <fogBlend:number> : Changes the blend type of the fog image
 * <fogDuration:number> : Changes the duration of the opacity transition
 * <xMove:number> : Changes the horizontal speed of the fog
 * <yMove:number> : Changes the vertical speed of the fog
 *
 * Go to https://makerdevs.com/plugin/cyclone-maps for more instructions
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
 * @param animationsZ
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
 * @default ["{\"layerName\":\"Ground\",\"fileName\":\"ground\",\"tagName\":\"ground\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"1\"}","{\"layerName\":\"Parallax\",\"fileName\":\"par\",\"tagName\":\"par\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"20\"}","{\"layerName\":\"Shadow\",\"fileName\":\"shadow\",\"tagName\":\"shadow\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"21\"}","{\"layerName\":\"Fog\",\"fileName\":\"fog\",\"tagName\":\"fog\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"22\"}","{\"layerName\":\"Light\",\"fileName\":\"light\",\"tagName\":\"light\",\"appendMapId\":\"true\",\"switchId\":\"0\",\"quickStart\":\"true\",\"z\":\"23\",\"opacity\":\"185\"}"]
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
 * @command newFogOpacity
 * @text Change Fog Opacity
 * @desc
 *
 * @arg opacity
 * @text Opacity
 * @type number
 * @desc The new value for the fog opacity: 1 - 255
 *
 * @arg duration
 * @text Duration
 * @type number
 * @desc How long should the opacity transition last? Leave it at zero to use the map's default.
 * @default 0
 *
 * @command fogFadeout
 * @text Fog fade out
 * @desc Fade out and deactivate the fog layer
 *
 * @arg duration
 * @text Duration
 * @type number
 * @desc How long should the fade out last?
 * @default 0
 *
 * @command moveFog
 * @text Move Fog
 * @desc Change the speed at which the fog moves
 *
 * @arg moveX
 * @text X Speed
 * @type number
 * @desc how many pixels the fog should move horizontally at a time. Use a negative value to move left.
 *
 * @arg moveY
 * @text Y Speed
 * @type number
 * @desc how many pixels the fog should move vertically at a time. Use a negative value to move up.
 *
 * @command fogBlendMode
 * @text Change Fog Blend Mode
 * @desc
 *
 * @arg blend
 * @text Blend Type
 * @type select
 * @desc The blend type you want to use in the fog layer
 * @default 0
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 *
 * @command fog
 * @text Change Fog
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new fog
 *
 * @command light
 * @text Change Light
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new light
 *
 * @command shadow
 * @text Change Shadow
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new shadow
 *
 * @command par
 * @text Change Parallax
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new parallax
 *
 * @command ground
 * @text Change Ground
 * @desc
 *
 * @arg fileName
 * @text File Name
 * @type string
 * @desc The file name of the new ground
 *
 **/

/*~struct~OverlayItem:
 * @param layerName
 * @text Layer Name
 * @desc Used only for your own organization
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
 * @default 255
 *
 * @param mapList
 * @text Map List
 * @type number[]
 * @desc A list of map ids where this layer will be active without needing tags
 * @default []
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
        var t = _ref8.value,
            e = _ref8.defaultValue,
            r = _ref8.type;
        if (r.endsWith("[]")) return this.parseArrayParam({
          value: t,
          type: r
        });
        if (r.startsWith("struct<")) return this.parseStructParam({
          value: t,
          defaultValue: e,
          type: r
        });
        if (void 0 === t) return e;

        switch (r) {
          case "int":
            return this.getIntParam({
              value: t,
              defaultValue: e
            });

          case "float":
            return this.getFloatParam({
              value: t,
              defaultValue: e
            });

          case "boolean":
            return "boolean" == typeof t ? t : this.isTrue(String(t).trim());

          default:
            return t;
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
      key: "parseStructParam",
      value: function parseStructParam(_ref10) {
        var t = _ref10.value,
            e = _ref10.defaultValue,
            r = _ref10.type;
        var s;
        if (t) try {
          s = JSON.parse(t);
        } catch (e) {
          console.error("Cyclone Engine failed to parse param structure: ", t), console.error(e);
        }
        s || (s = JSON.parse(e));
        var a = this.getRegexMatch(r, /struct<(.*)>/i, 1);
        if (!a) return console.error("Unknown plugin param type: ".concat(r)), s;
        var n = this.structs.get(a);
        if (!n) return console.error("Unknown param structure type: ".concat(a)), s;

        for (var _t9 in n) {
          if (!n.hasOwnProperty(_t9)) continue;
          var _e6 = n[_t9];
          "string" == typeof _e6 && (_e6 = {
            type: _e6,
            defaultValue: this.defaultValueForType(_e6)
          }), s[_t9] = this.getParam({
            value: s[_t9],
            defaultValue: _e6.defaultValue,
            type: _e6.type
          });
        }

        return s;
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

          for (var _e7 in t) {
            t.hasOwnProperty(_e7) && s.set(_e7, t[_e7]);
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

  var CycloneMaps$1 = /*#__PURE__*/function (_CyclonePlugin) {
    _inherits(CycloneMaps$1, _CyclonePlugin);

    var _super2 = _createSuper(CycloneMaps$1);

    function CycloneMaps$1() {
      _classCallCheck(this, CycloneMaps$1);

      return _super2.apply(this, arguments);
    }

    _createClass(CycloneMaps$1, null, [{
      key: "register",
      value: function register() {
        var _this5 = this;

        _get(_getPrototypeOf(CycloneMaps$1), "initialize", this).call(this, 'CycloneMaps');

        this.structs.set('CycloneCommonEventRegion', {
          regionId: 'int',
          commonEventId: 'int'
        });
        this.structs.set('CycloneNamedRegion', {
          regionId: 'int',
          name: 'string'
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
          quickStart: {
            type: 'boolean',
            defaultValue: true
          },
          z: 'int',
          opacity: {
            type: 'int',
            defaultValue: 255
          },
          mapList: 'int[]'
        });

        _get(_getPrototypeOf(CycloneMaps$1), "register", this).call(this, {
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
          animationsZ: {
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

        console.log(this.params);
        this.registerCommand('newFogOpacity', {
          opacity: 'int',
          duration: 'int'
        }, function (_ref13) {
          var opacity = _ref13.opacity,
              duration = _ref13.duration;
          _this5.newFogOpacity = opacity;
          _this5.newFogOpacityDuration = duration;
        }, ['opacity', 'duration']);
        this.registerCommand('fogFadeout', {
          duration: 'int'
        }, function (_ref14) {
          var duration = _ref14.duration;
          _this5.needsFogFadeOut = true;
          _this5.fogFadeOutDuration = duration;
        }, ['duration']);
        this.registerCommand('moveFog', {
          moveX: 'int',
          moveY: 'int'
        }, function (_ref15) {
          var moveX = _ref15.moveX,
              moveY = _ref15.moveY;
          _this5.fogMoveX = moveX;
          _this5.fogMoveY = moveY;
        }, ['moveX', 'moveY']);
        this.registerCommand('fogBlendMode', {
          blend: 'int'
        }, function (_ref16) {
          var blend = _ref16.blend;
          _this5.fogBlendMode = blend;
        }, ['blend']);
        this.registerCommand('fog', {
          fileName: 'string',
          moveX: 'int',
          moveY: 'int',
          blend: 'int'
        }, function (_ref17) {
          var fileName = _ref17.fileName,
              moveX = _ref17.moveX,
              moveY = _ref17.moveY,
              blend = _ref17.blend;
          CycloneMaps$1.params.debug && console.log('change FOG layer', fileName);
          _this5.fogFileName = fileName;
          _this5.changedFogFileName = true;
        }, ['fileName', 'moveX', 'moveY', 'blend']);
        this.registerCommand('light', function (_ref18) {
          var fileName = _ref18.fileName;
          CycloneMaps$1.params.debug && console.log('change LIGHT layer', fileName);
          _this5.lightName = fileName;
          _this5.changedLightFileName = true;
        }, ['fileName']);
        this.registerCommand('shadow', function (_ref19) {
          var fileName = _ref19.fileName;
          CycloneMaps$1.params.debug && console.log('change SHADOW layer', fileName);
          _this5.shadowName = fileName;
          _this5.changedShadowFileName = true;
        }, ['fileName']);
        this.registerCommand('par', function (_ref20) {
          var fileName = _ref20.fileName;
          CycloneMaps$1.params.debug && console.log('change PAR layer', fileName);
          _this5.parallaxName = fileName;
          _this5.changedParallaxFileName = true;
        }, ['fileName']);
        this.registerCommand('ground', function (_ref21) {
          var fileName = _ref21.fileName;
          CycloneMaps$1.params.debug && console.log('change GROUND layer', fileName);
          _this5.groundName = fileName;
          _this5.changedGroundFileName = true;
        }, ['fileName']);
        this.clearSettings();
      }
    }, {
      key: "clearSettings",
      value: function clearSettings() {
        // Set this attribute to a numeric value to change the fog opacity temporarily
        this.newFogOpacity = false; // Set this to use a custom duration for the fog opacity transition

        this.newFogOpacityDuration = 0; // Set this to true to fade out the fog and then erase the temporary fog data

        this.needsFogFadeOut = false;
        this.fogFadeOutDuration = 1;
        this.fogMoveX = 0;
        this.fogMoveY = 0;
        this.fogBlendMode = 0; // the default opacity and duration are loaded with the map

        this.fogOpacity = 255;
        this.fogDuration = 1;
        this.fogFileName = '';
        this.changedFogFileName = false;
        this.changedLightFileName = false;
        this.lightName = '';
        this.changedShadowFileName = false;
        this.shadowName = '';
        this.changedParallaxFileName = false;
        this.parallaxName = '';
        this.changedGroundFileName = false;
        this.groundName = '';
        this.blockRegionId = this.params.blockRegionId;
        this.unblockRegionId = this.params.unblockRegionId;
        this.blockPlayerRegionId = this.params.blockPlayerRegionId;
        this.unblockPlayerRegionId = this.params.unblockPlayerRegionId;
        this.blockEventRegionId = this.params.blockEventRegionId;
        this.unblockEventRegionId = this.params.unblockEventRegionId;
        this.disableAutoShadows = this.params.disableAutoShadows;
        var commonEventRegions = this.params.commonEventRegions;
        var namedRegions = this.params.namedRegions;
        this.commonEventRegions = new Map();
        this.namedRegions = new Map();

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
      key: "checkRegionActions",
      value: function checkRegionActions() {
        var regionId = $gameMap.regionId($gamePlayer.x, $gamePlayer.y);

        if (this.commonEventRegions.has(regionId)) {
          this.runCommonEvent(this.commonEventRegions.get(regionId));
        }
      }
    }, {
      key: "groundZ",
      get: function get() {
        return this.params.groundZ;
      }
    }, {
      key: "parallaxZ",
      get: function get() {
        return this.params.parallaxZ;
      }
    }, {
      key: "shadowZ",
      get: function get() {
        return this.params.shadowZ;
      }
    }, {
      key: "fogZ",
      get: function get() {
        return this.params.fogZ;
      }
    }, {
      key: "lightZ",
      get: function get() {
        return this.params.lightZ;
      }
    }]);

    return CycloneMaps$1;
  }(CyclonePlugin);

  globalThis.CycloneMaps = CycloneMaps$1;
  CycloneMaps$1.register();
  CycloneMaps.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, null, [{
        key: "setupNewGame",
        value: function setupNewGame() {
          $super.setupNewGame.call(this);

          if (CycloneMaps.params.enableOverlays && CycloneMaps.params.quickStart) {
            var _CycloneMaps$params = CycloneMaps.params,
                fogSwitchId = _CycloneMaps$params.fogSwitchId,
                lightSwitchId = _CycloneMaps$params.lightSwitchId,
                parallaxSwitchId = _CycloneMaps$params.parallaxSwitchId,
                shadowSwitchId = _CycloneMaps$params.shadowSwitchId;

            if (fogSwitchId > 0) {
              $gameSwitches.setValue(fogSwitchId, true);
            }

            if (lightSwitchId > 0) {
              $gameSwitches.setValue(lightSwitchId, true);
            }

            if (parallaxSwitchId > 0) {
              $gameSwitches.setValue(parallaxSwitchId, true);
            }

            if (shadowSwitchId > 0) {
              $gameSwitches.setValue(shadowSwitchId, true);
            }
          }
        }
      }]);

      return _class4;
    }();
  });
  CycloneMaps.patchClass(Game_Event, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "isMapPassable",
        value: function isMapPassable(x, y, d) {
          var blockRegionId = CycloneMaps.blockEventRegionId;
          var unblockRegionId = CycloneMaps.unblockEventRegionId;

          if (blockRegionId > 0 || unblockRegionId > 0) {
            var newX = $gameMap.roundXWithDirection(x, d);
            var newY = $gameMap.roundYWithDirection(y, d);
            var regionId = $gameMap.regionId(newX, newY);

            if (regionId > 0) {
              if (regionId === blockRegionId) {
                return false;
              }

              if (regionId === unblockRegionId) {
                return false;
              }
            }
          }

          return $super.isMapPassable.call(this, x, y, d);
        }
      }]);

      return _class5;
    }();
  });
  CycloneMaps.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, [{
        key: "tileWidth",
        value: function tileWidth() {
          var customWidth = CycloneMaps.params.tileWidth;

          if (typeof customWidth === 'number' && customWidth > 0) {
            return customWidth;
          }

          return $super.tileWidth.call(this);
        }
      }, {
        key: "tileHeight",
        value: function tileHeight() {
          var customHeight = CycloneMaps.params.tileHeight;

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

          var bushRegionId = CycloneMaps.params.bushRegionId;

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
          var blockRegionId = CycloneMaps.blockRegionId;
          var unblockRegionId = CycloneMaps.unblockRegionId;

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
  CycloneMaps.patchClass(Game_Party, function ($super) {
    return /*#__PURE__*/function () {
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "onPlayerWalk",
        value: function onPlayerWalk() {
          $super.onPlayerWalk.call(this);

          if (CycloneMaps.commonEventRegions.size > 0) {
            CycloneMaps.checkRegionActions();
          }
        }
      }]);

      return _class7;
    }();
  });
  CycloneMaps.patchClass(Game_Player, function ($super) {
    return /*#__PURE__*/function () {
      function _class8() {
        _classCallCheck(this, _class8);
      }

      _createClass(_class8, [{
        key: "performTransfer",
        value: function performTransfer() {
          if (this.isTransferring()) {
            if (CycloneMaps.params.commonEventId > 0) {
              $gameTemp.reserveCommonEvent(CycloneMaps.params.commonEventId);
            }
          }

          $super.performTransfer.call(this);
        }
      }, {
        key: "isMapPassable",
        value: function isMapPassable(x, y, d) {
          var blockRegionId = CycloneMaps.blockPlayerRegionId;
          var unblockRegionId = CycloneMaps.unblockPlayerRegionId;

          if (blockRegionId > 0 || unblockRegionId > 0) {
            var newX = $gameMap.roundXWithDirection(x, d);
            var newY = $gameMap.roundYWithDirection(y, d);
            var regionId = $gameMap.regionId(newX, newY);

            if (regionId > 0) {
              if (regionId === blockRegionId) {
                return false;
              }

              if (regionId === unblockRegionId) {
                return false;
              }
            }
          }

          return $super.isMapPassable.call(this, x, y, d);
        }
      }]);

      return _class8;
    }();
  });
  CycloneMaps.patchClass(ImageManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class9() {
        _classCallCheck(this, _class9);
      }

      _createClass(_class9, null, [{
        key: "loadTileset",
        value: function loadTileset(filename) {
          var customPath = CycloneMaps.params.tilesetPath;

          if (customPath) {
            return this.loadBitmap(customPath, filename);
          }

          return $super.loadTileset.call(this, filename);
        }
      }]);

      return _class9;
    }();
  });
  CycloneMaps.patchClass(Scene_Map, function ($super) {
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

        var regionName = CycloneMaps.namedRegions.get(regionId);

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

        if (shouldUpdate && (CycloneMaps.params.regionNamesStay || regionId !== this._currentRegionId)) {
          this._currentRegionId = regionId;
          this.open();
          return;
        }

        _get(_getPrototypeOf(WindowRegionName.prototype), "update", this).call(this);
      }
    }]);

    return WindowRegionName;
  }(Window_MapName);

  CycloneMaps.patchClass(Scene_Map, function ($super) {
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
  CycloneMaps.patchClass(Sprite_Animation, function ($super) {
    return /*#__PURE__*/function () {
      function _class12() {
        _classCallCheck(this, _class12);
      }

      _createClass(_class12, [{
        key: "initMembers",
        value: function initMembers() {
          $super.initMembers.call(this);
          var animationZ = CycloneMaps.params.animationZ; // Only apply if we have a valid Z different from the default

          if (animationZ !== 0 && animationZ !== 8) {
            this.z = animationZ;
          }
        }
      }]);

      return _class12;
    }();
  });
  CycloneMaps.patchClass(Sprite_Balloon, function ($super) {
    return /*#__PURE__*/function () {
      function _class13() {
        _classCallCheck(this, _class13);
      }

      _createClass(_class13, [{
        key: "initMembers",
        value: function initMembers() {
          $super.initMembers.call(this);
          var balloonZ = CycloneMaps.params.balloonZ; // Only apply if we have a valid Z different from the default

          if (balloonZ !== 0 && balloonZ !== 7) {
            this.z = balloonZ;
          }
        }
      }]);

      return _class13;
    }();
  });

  function defaultIfNaN(value, defaultValue) {
    if (isNaN(Number(value))) {
      return defaultValue;
    }

    return value;
  }

  function getValueMaybeVariable(rawValue) {
    var value = rawValue.trim();

    if (value.startsWith('$')) {
      var variableId = parseInt(value.slice(1));

      if (isNaN(variableId)) {
        throw new Error("Invalid Variable ID: ".concat(variableId)); //`
      }

      if (variableId === 0) {
        return 0;
      }

      return $gameVariables.value(variableId);
    }

    return value;
  }

  CycloneMaps.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class14() {
        _classCallCheck(this, _class14);
      }

      _createClass(_class14, [{
        key: "createLowerLayer",
        value: function createLowerLayer() {
          CycloneMaps.clearSettings();
          $super.createLowerLayer.call(this);
        }
      }, {
        key: "loadOverlayBitmap",
        value: function loadOverlayBitmap(folderName, fileName) {
          var overlayFolder = CycloneMaps.params.overlayFolder || 'img/overlays';

          if (CycloneMaps.params.organizedFolders) {
            CycloneMaps.params.debug && console.log('Loading bitmap: ', "".concat(overlayFolder, "/").concat(folderName, "/").concat(fileName));
            return ImageManager.loadBitmap("".concat(overlayFolder, "/").concat(folderName, "/"), fileName);
          }

          CycloneMaps.params.debug && console.log('Loading bitmap: ', "".concat(overlayFolder, "/").concat(fileName));
          return ImageManager.loadBitmap("".concat(overlayFolder, "/"), fileName); // return ImageManager.loadParallax(fileName);
        }
      }, {
        key: "createOverlayLayer",
        value: function createOverlayLayer(folderName, fileNamePrefix, tagName, zValue) {
          var visibilitySwitchId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
          var maxOpacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 255;

          if (!this.getMeta(tagName) && !this.getMeta('all')) {
            return null;
          }

          var bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
          var layer = new Sprite(bitmap);
          layer.z = zValue;

          this._tilemap.addChild(layer);

          if (visibilitySwitchId > 0) {
            layer.opacity = $gameSwitches.value(visibilitySwitchId) ? maxOpacity : 0;
          }

          return layer;
        }
      }, {
        key: "createGroundLayer",
        value: function createGroundLayer() {
          this._groundLayer = this.createOverlayLayer('grounds', CycloneMaps.params.groundLayerFileName, 'ground', CycloneMaps.groundZ);
        }
      }, {
        key: "createParallaxLayer",
        value: function createParallaxLayer() {
          var _CycloneMaps$params2 = CycloneMaps.params,
              parallaxLayerFileName = _CycloneMaps$params2.parallaxLayerFileName,
              parallaxSwitchId = _CycloneMaps$params2.parallaxSwitchId;
          this._parallaxLayer = this.createOverlayLayer('pars', parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
        }
      }, {
        key: "createShadowLayer",
        value: function createShadowLayer() {
          var _CycloneMaps$params3 = CycloneMaps.params,
              shadowLayerFileName = _CycloneMaps$params3.shadowLayerFileName,
              shadowSwitchId = _CycloneMaps$params3.shadowSwitchId;
          this._shadowLayer = this.createOverlayLayer('shadows', shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
        }
      }, {
        key: "createLightLayer",
        value: function createLightLayer() {
          var _CycloneMaps$params4 = CycloneMaps.params,
              lightLayerFileName = _CycloneMaps$params4.lightLayerFileName,
              lightSwitchId = _CycloneMaps$params4.lightSwitchId,
              lightOpacity = _CycloneMaps$params4.lightOpacity;
          this._lightLayer = this.createOverlayLayer('lights', lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity);

          if (this._lightLayer) {
            this._lightLayer.blendMode = 1;
          }
        }
      }, {
        key: "createFogLayer",
        value: function createFogLayer() {
          CycloneMaps.fogFileName = this.getOverlayVariable('fogName');
          CycloneMaps.fogOpacity = this.getOverlayIntVariable('fogOpacity', 255);
          CycloneMaps.fogMoveX = this.getOverlayIntVariable('xMove', 0);
          CycloneMaps.fogMoveY = this.getOverlayIntVariable('yMove', 0);
          CycloneMaps.fogBlendMode = this.getOverlayIntVariable('fogBlend', 0);
          CycloneMaps.fogDuration = this.getOverlayIntVariable('fogDuration', 1);

          if (!CycloneMaps.fogFileName) {
            return;
          }

          var bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);

          if (!bitmap) {
            return;
          }

          var layer = new TilingSprite();
          layer.bitmap = bitmap;
          layer.width = Graphics.width;
          layer.height = Graphics.height;
          layer.blendMode = CycloneMaps.fogBlendMode;
          layer.opacity = 0;
          layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
          layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
          layer.z = CycloneMaps.fogZ;
          CycloneMaps.fogNewX = 0;
          CycloneMaps.fogNewY = 0;

          this._tilemap.addChild(layer);

          this._fogLayer = layer;
          CycloneMaps.changedFogFileName = false;
        }
      }, {
        key: "createCharacters",
        value: function createCharacters() {
          if (!CycloneMaps.params.enableOverlays) {
            $super.createCharacters.call(this);
            return;
          }

          this.createGroundLayer();
          $super.createCharacters.call(this);
          this.createParallaxLayer();
          this.createShadowLayer();
          this.createFogLayer();
          this.createLightLayer();
        }
      }, {
        key: "getMeta",
        value: function getMeta(name) {
          if ($dataMap && $dataMap.meta) {
            return $dataMap.meta[name];
          }
        }
      }, {
        key: "getOverlayVariable",
        value: function getOverlayVariable(variableName) {
          if (this.getMeta(variableName) === undefined) {
            return false;
          }

          return getValueMaybeVariable($dataMap.meta[variableName]);
        }
      }, {
        key: "getOverlayIntVariable",
        value: function getOverlayIntVariable(variableName, defaultValue) {
          var _parseInt;

          var value = (_parseInt = parseInt(this.getOverlayVariable(variableName))) !== null && _parseInt !== void 0 ? _parseInt : defaultValue;
          return defaultIfNaN(value, defaultValue);
        }
      }, {
        key: "updateLayerOpacity",
        value: function updateLayerOpacity(layer, maxOpacity, opacityChange) {
          var newOpacity = (layer.opacity + opacityChange).clamp(0, maxOpacity);

          if (layer.opacity !== newOpacity) {
            layer.opacity = newOpacity;
          }
        }
      }, {
        key: "updateLayer",
        value: function updateLayer(layerName, update, folderName, fileNamePrefix, tagName, zValue, switchId) {
          var maxOpacity = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 255;
          var opacityChange = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 10;
          update && CycloneMaps.params.debug && console.log('UPDATE layer ', layerName, folderName, fileNamePrefix, tagName);
          var layer = this[layerName];

          if (!layer) {
            layer = this.createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity);
            update = false;
          }

          if (!layer) {
            return;
          }

          layer.x = $gameMap.displayX() * (0 - $gameMap.tileWidth());
          layer.y = $gameMap.displayY() * (0 - $gameMap.tileHeight());

          if (switchId > 0) {
            this.updateLayerOpacity(layer, maxOpacity, opacityChange * ($gameSwitches.value(switchId) ? 1 : -1));
          }

          if (update) {
            layer.bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
          }

          this[layerName] = layer;
        }
      }, {
        key: "updateGroundLayer",
        value: function updateGroundLayer() {
          var groundLayerFileName = CycloneMaps.params.groundLayerFileName;
          this.updateLayer('_groundLayer', CycloneMaps.changedGroundFileName, 'grounds', CycloneMaps.groundName || groundLayerFileName, 'ground', CycloneMaps.groundZ, 0);
          CycloneMaps.changedGroundFileName = false;
        }
      }, {
        key: "updateParallaxLayer",
        value: function updateParallaxLayer() {
          var _CycloneMaps$params5 = CycloneMaps.params,
              parallaxLayerFileName = _CycloneMaps$params5.parallaxLayerFileName,
              parallaxSwitchId = _CycloneMaps$params5.parallaxSwitchId;
          this.updateLayer('_parallaxLayer', CycloneMaps.changedParallaxFileName, 'pars', CycloneMaps.parallaxName || parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
          CycloneMaps.changedParallaxFileName = false;
        }
      }, {
        key: "updateShadowLayer",
        value: function updateShadowLayer() {
          var _CycloneMaps$params6 = CycloneMaps.params,
              shadowLayerFileName = _CycloneMaps$params6.shadowLayerFileName,
              shadowSwitchId = _CycloneMaps$params6.shadowSwitchId;
          this.updateLayer('_shadowLayer', CycloneMaps.changedShadowFileName, 'shadows', CycloneMaps.shadowName || shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
          CycloneMaps.changedShadowFileName = false;
        }
      }, {
        key: "stepFogLayerOpacity",
        value: function stepFogLayerOpacity() {
          var stepSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -10;
          var maxOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
          this._fogLayer.opacity = (this._fogLayer.opacity + stepSize).clamp(0, maxOpacity);
        }
      }, {
        key: "isFogEnabled",
        value: function isFogEnabled() {
          var fogSwitchId = CycloneMaps.params.fogSwitchId;
          return fogSwitchId > 0 && $gameSwitches.value(fogSwitchId);
        }
      }, {
        key: "fadeOutOpacity",
        value: function fadeOutOpacity() {
          // if a manual fade out was triggered
          if (CycloneMaps.needsFogFadeOut) {
            // If there's a new opacity level set by a plugin command, use that instead of the map's default
            var targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
            var transition = targetOpacity / (CycloneMaps.fogFadeOutDuration || 1);

            if (this._fogLayer.opacity > 0) {
              this.stepFogLayerOpacity(0 - transition, this._fogLayer.opacity);
              return;
            } // When the manual fade out is complete, we reset the temporary data and deactivate the fog switch


            CycloneMaps.needsFogFadeOut = false;
            CycloneMaps.newFogOpacity = false;
            CycloneMaps.newFogOpacityDuration = 0;
            CycloneMaps.currentOpacityTarget = 0;
            var fogSwitchId = CycloneMaps.params.fogSwitchId;

            if (fogSwitchId > 0) {
              $gameSwitches.setValue(fogSwitchId, false);
            }

            return;
          } // If there's no manual fade out requested, then the switch was turned off - so use the default fade out


          if (this._fogLayer.opacity > 0) {
            this.stepFogLayerOpacity(-10, this._fogLayer.opacity);
          }
        }
      }, {
        key: "updateFogOpacity",
        value: function updateFogOpacity() {
          if (!this.isFogEnabled() || CycloneMaps.needsFogFadeOut) {
            this.fadeOutOpacity();
            return;
          } // If there's a new opacity level set by a plugin command, use that instead of the map's default


          var targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
          var duration = CycloneMaps.newFogOpacityDuration || CycloneMaps.fogDuration;
          var transition = targetOpacity / duration; // If the opacity is not at the desired level yet, fade it in

          if (this._fogLayer.opacity < targetOpacity) {
            this.stepFogLayerOpacity(transition, targetOpacity);
          } else if (this._fogLayer.opacity > targetOpacity) {
            this._fogLayer.opacity = targetOpacity;
          }
        }
      }, {
        key: "updateFogLayer",
        value: function updateFogLayer() {
          if (!this._fogLayer) {
            this.createFogLayer();

            if (!this._fogLayer) {
              return;
            }
          }

          this._fogLayer.blendMode = CycloneMaps.fogBlendMode;
          CycloneMaps.fogNewX += CycloneMaps.fogMoveX;
          CycloneMaps.fogNewY += CycloneMaps.fogMoveY;
          this._fogLayer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() - CycloneMaps.fogNewX;
          this._fogLayer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() - CycloneMaps.fogNewY;
          this.updateFogOpacity();

          if (CycloneMaps.changedFogFileName && CycloneMaps.fogFileName) {
            this._fogLayer.bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);
            CycloneMaps.changedFogFileName = false;
          }
        }
      }, {
        key: "updateLightLayer",
        value: function updateLightLayer() {
          var _CycloneMaps$params7 = CycloneMaps.params,
              lightLayerFileName = _CycloneMaps$params7.lightLayerFileName,
              lightSwitchId = _CycloneMaps$params7.lightSwitchId,
              lightOpacity = _CycloneMaps$params7.lightOpacity;
          this.updateLayer('_lightLayer', CycloneMaps.changedLightFileName, 'lights', CycloneMaps.lightName || lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity, 1);
          CycloneMaps.changedLightFileName = false;
        }
      }, {
        key: "updateTilemap",
        value: function updateTilemap() {
          if (CycloneMaps.params.enableOverlays) {
            this.updateGroundLayer();
            this.updateParallaxLayer();
            this.updateShadowLayer();
            this.updateFogLayer();
            this.updateLightLayer();
          }

          $super.updateTilemap.call(this);
        }
      }]);

      return _class14;
    }();
  });
  CycloneMaps.patchClass(Tilemap, function ($super) {
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
          if (CycloneMaps.params.disableTilemap && CycloneMaps.params.enableOverlays) {
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

          if (CycloneMaps.disableAutoShadows) {
            return;
          }

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return (_$super$_addShadow = $super._addShadow).call.apply(_$super$_addShadow, [this].concat(args));
        }
      }]);

      return _class15;
    }();
  });
  CycloneMaps.patchClass(ShaderTilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class16() {
        _classCallCheck(this, _class16);
      }

      _createClass(_class16, [{
        key: "updateTransform",
        value: function updateTransform() {
          if (CycloneMaps.params.disableTilemap && CycloneMaps.params.enableOverlays) {
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

          if (CycloneMaps.disableAutoShadows) {
            return;
          }

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return (_$super$_drawShadow = $super._drawShadow).call.apply(_$super$_drawShadow, [this].concat(args));
        }
      }]);

      return _class16;
    }();
  });
})();
