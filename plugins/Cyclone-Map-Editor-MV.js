function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

/*:
 * @plugindesc Live Map Editor - 1.11.00
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
 *                d8'                                                       MV
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
 * 2020-09-18 - Version 1.06.01
 *   * Fixed "Default Collision Blocks" param options.
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
 *   * First MV Compatible version
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
  if (Utils.RPGMAKER_NAME === 'MV') {
    window.globalThis = window;
    ImageManager.iconWidth = Window_Base._iconWidth;
    ImageManager.iconHeight = Window_Base._iconHeight;
    ImageManager.faceWidth = Window_Base._faceWidth;
    ImageManager.faceHeight = Window_Base._faceHeight;
  } // ColorManager polyfill for MV


  if (Utils.RPGMAKER_NAME === 'MV') {
    window.ColorManager = /*#__PURE__*/function () {
      function ColorManager() {
        _classCallCheck(this, ColorManager);
      }

      _createClass(ColorManager, null, [{
        key: "loadWindowskin",
        value: function loadWindowskin() {
          this._windowskin = ImageManager.loadSystem('Window');
        }
      }, {
        key: "textColor",
        value: function textColor(n) {
          var px = 96 + n % 8 * 12 + 6;
          var py = 144 + Math.floor(n / 8) * 12 + 6;
          return this._windowskin.getPixel(px, py);
        }
      }, {
        key: "normalColor",
        value: function normalColor() {
          return this.textColor(0);
        }
      }, {
        key: "systemColor",
        value: function systemColor() {
          return this.textColor(16);
        }
      }, {
        key: "crisisColor",
        value: function crisisColor() {
          return this.textColor(17);
        }
      }, {
        key: "deathColor",
        value: function deathColor() {
          return this.textColor(18);
        }
      }, {
        key: "gaugeBackColor",
        value: function gaugeBackColor() {
          return this.textColor(19);
        }
      }, {
        key: "hpGaugeColor1",
        value: function hpGaugeColor1() {
          return this.textColor(20);
        }
      }, {
        key: "hpGaugeColor2",
        value: function hpGaugeColor2() {
          return this.textColor(21);
        }
      }, {
        key: "mpGaugeColor1",
        value: function mpGaugeColor1() {
          return this.textColor(22);
        }
      }, {
        key: "mpGaugeColor2",
        value: function mpGaugeColor2() {
          return this.textColor(23);
        }
      }, {
        key: "mpCostColor",
        value: function mpCostColor() {
          return this.textColor(23);
        }
      }, {
        key: "powerUpColor",
        value: function powerUpColor() {
          return this.textColor(24);
        }
      }, {
        key: "powerDownColor",
        value: function powerDownColor() {
          return this.textColor(25);
        }
      }, {
        key: "ctGaugeColor1",
        value: function ctGaugeColor1() {
          return this.textColor(26);
        }
      }, {
        key: "ctGaugeColor2",
        value: function ctGaugeColor2() {
          return this.textColor(27);
        }
      }, {
        key: "tpGaugeColor1",
        value: function tpGaugeColor1() {
          return this.textColor(28);
        }
      }, {
        key: "tpGaugeColor2",
        value: function tpGaugeColor2() {
          return this.textColor(29);
        }
      }, {
        key: "tpCostColor",
        value: function tpCostColor() {
          return this.textColor(29);
        }
      }, {
        key: "pendingColor",
        value: function pendingColor() {
          return this._windowskin.getPixel(120, 120);
        }
      }, {
        key: "hpColor",
        value: function hpColor(actor) {
          if (!actor) {
            return this.normalColor();
          } else if (actor.isDead()) {
            return this.deathColor();
          } else if (actor.isDying()) {
            return this.crisisColor();
          } else {
            return this.normalColor();
          }
        }
      }, {
        key: "mpColor",
        value: function mpColor() {
          return this.normalColor();
        }
      }, {
        key: "tpColor",
        value: function tpColor() {
          return this.normalColor();
        }
      }, {
        key: "paramchangeTextColor",
        value: function paramchangeTextColor(change) {
          if (change > 0) {
            return this.powerUpColor();
          } else if (change < 0) {
            return this.powerDownColor();
          } else {
            return this.normalColor();
          }
        }
      }, {
        key: "damageColor",
        value: function damageColor(colorType) {
          switch (colorType) {
            case 0:
              // HP damage
              return '#ffffff';

            case 1:
              // HP recover
              return '#b9ffb5';

            case 2:
              // MP damage
              return '#ffff90';

            case 3:
              // MP recover
              return '#80b0ff';

            default:
              return '#808080';
          }
        }
      }, {
        key: "outlineColor",
        value: function outlineColor() {
          return 'rgba(0, 0, 0, 0.6)';
        }
      }, {
        key: "dimColor1",
        value: function dimColor1() {
          return 'rgba(0, 0, 0, 0.6)';
        }
      }, {
        key: "dimColor2",
        value: function dimColor2() {
          return 'rgba(0, 0, 0, 0)';
        }
      }, {
        key: "itemBackColor1",
        value: function itemBackColor1() {
          return 'rgba(32, 32, 32, 0.5)';
        }
      }, {
        key: "itemBackColor2",
        value: function itemBackColor2() {
          return 'rgba(0, 0, 0, 0.5)';
        }
      }]);

      return ColorManager;
    }();

    var oldLoadSystemImages = Scene_Boot.loadSystemImages;

    Scene_Boot.loadSystemImages = function () {
      oldLoadSystemImages.call(this);
      ColorManager.loadWindowskin();
    };
  }

  if (Utils.RPGMAKER_NAME === 'MV') {
    Window_Selectable.prototype.hitIndex = function () {
      var touchPos = new Point(TouchInput.x, TouchInput.y);
      var localPos = this.worldTransform.applyInverse(touchPos);
      return this.hitTest(localPos.x, localPos.y);
    };
  }

  if (Utils.RPGMAKER_NAME === 'MV') {
    Scene_Map.prototype.isAnyButtonPressed = function () {
      return false;
    };
  }

  if (Utils.RPGMAKER_NAME === 'MV') {
    var oldTouchInputMouseMove = TouchInput._onMouseMove;

    TouchInput._onMouseMove = function (event) {
      oldTouchInputMouseMove.call(this, event);
      var x = Graphics.pageToCanvasX(event.pageX);
      var y = Graphics.pageToCanvasY(event.pageY);
      this._x = x;
      this._y = y;
    };
  }

  Bitmap.prototype.strokeRect = function (x, y, width, height, color) {
    var context = this.context;
    context.save();
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
    context.restore();

    this._baseTexture.update();
  };

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

  var trueStrings = Object.freeze(['TRUE', 'ON', '1', 'YES', 'T', 'V']);

  var CyclonePlugin = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(CyclonePlugin, _CyclonePatcher);

    var _super = _createSuper(CyclonePlugin);

    function CyclonePlugin() {
      _classCallCheck(this, CyclonePlugin);

      return _super.apply(this, arguments);
    }

    _createClass(CyclonePlugin, null, [{
      key: "initialize",
      value: function initialize(pluginName) {
        _get(_getPrototypeOf(CyclonePlugin), "initialize", this).call(this, pluginName);

        this.fileName = undefined;
        this.params = {};
        this.structs = new Map();
        this.eventListeners = new Map();
        this.structs.set('Dictionary', {
          name: {
            type: 'string',
            defaultValue: ''
          },
          value: {
            type: 'string',
            defaultValue: ''
          }
        });
      }
    }, {
      key: "register",
      value: function register() {
        var paramMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var dataMap = this.loadAllParams();
        this.params = this.loadParamMap(paramMap, dataMap);
      }
    }, {
      key: "loadAllParams",
      value: function loadAllParams() {
        var _iterator = _createForOfIteratorHelper(globalThis.$plugins),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _plugin$description;

            var plugin = _step.value;

            if (!(plugin === null || plugin === void 0 ? void 0 : plugin.status)) {
              continue;
            }

            if (!(plugin === null || plugin === void 0 ? void 0 : (_plugin$description = plugin.description) === null || _plugin$description === void 0 ? void 0 : _plugin$description.includes("<pluginName:".concat(this.pluginName)))) {
              //`
              continue;
            }

            this.fileName = plugin.name;
            var pluginParams = new Map();

            for (var paramName in plugin.parameters) {
              if (!paramName || paramName.startsWith('-')) {
                continue;
              }

              pluginParams.set(paramName, plugin.parameters[paramName]);
            }

            return pluginParams;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "loadParamMap",
      value: function loadParamMap(paramMap) {
        var dataMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var params = {};

        for (var key in paramMap) {
          if (!paramMap.hasOwnProperty(key)) {
            continue;
          }

          try {
            params[key] = this.parseParam(key, paramMap, dataMap);
          } catch (e) {
            console.error("CycloneEngine crashed while trying to parse a parameter value (".concat(key, "). Please report the following error to Hudell:")); //`

            console.log(e);
          }
        }

        return params;
      }
    }, {
      key: "registerEvent",
      value: function registerEvent(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
          this.eventListeners.set(eventName, new Set());
        }

        var listeners = this.eventListeners.get(eventName);
        listeners.add(callback);
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
          return;
        }

        var listeners = this.eventListeners.get(eventName);
        listeners["delete"](callback);
      }
    }, {
      key: "shouldReturnCallbackResult",
      value: function shouldReturnCallbackResult(result, _ref) {
        var abortOnTrue = _ref.abortOnTrue,
            abortOnFalse = _ref.abortOnFalse,
            returnOnValue = _ref.returnOnValue;

        if (result === false && abortOnFalse) {
          return true;
        }

        if (result === true && abortOnTrue) {
          return true;
        }

        if (result !== undefined && returnOnValue) {
          return true;
        }

        return false;
      }
    }, {
      key: "runEvent",
      value: function runEvent(eventName) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$abortOnTrue = _ref2.abortOnTrue,
            abortOnTrue = _ref2$abortOnTrue === void 0 ? false : _ref2$abortOnTrue,
            _ref2$abortOnFalse = _ref2.abortOnFalse,
            abortOnFalse = _ref2$abortOnFalse === void 0 ? false : _ref2$abortOnFalse,
            _ref2$returnOnValue = _ref2.returnOnValue,
            returnOnValue = _ref2$returnOnValue === void 0 ? false : _ref2$returnOnValue;

        if (!this.eventListeners.has(eventName)) {
          return;
        }

        var listeners = this.eventListeners.get(eventName);

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var _iterator2 = _createForOfIteratorHelper(listeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var callback = _step2.value;

            if (typeof callback === 'number') {
              this.runCommonEvent(callback);
              continue;
            }

            if (typeof callback !== 'function') {
              console.error('CycloneEngine: Invalid callback type:');
              console.log(callback);
              continue;
            }

            var result = callback.apply(void 0, args);

            if (this.shouldReturnCallbackResult(result, {
              abortOnTrue: abortOnTrue,
              abortOnFalse: abortOnFalse,
              returnOnValue: returnOnValue
            })) {
              return result;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "runCommonEvent",
      value: function runCommonEvent(eventId) {
        var _this = this;

        var commonEvent = globalThis.$dataCommonEvents[eventId];

        if (!commonEvent) {
          return;
        }

        var interpreter = new Game_Interpreter(1);
        interpreter.setup(commonEvent.list, 0);

        if (!this._interpreters) {
          this._interpreters = new Set(); // Tap into rpg maker core so we can update our interpreters in sync with the engine

          var oldUpdateMain = SceneManager.updateMain;

          SceneManager.updateMain = function () {
            oldUpdateMain.call(SceneManager);

            _this.update();
          };
        }

        this._interpreters.add(interpreter);
      }
    }, {
      key: "update",
      value: function update() {
        if (!this._interpreters) {
          return;
        }

        var _iterator3 = _createForOfIteratorHelper(this._interpreters),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var interpreter = _step3.value;
            interpreter.update();

            if (!interpreter.isRunning()) {
              this._interpreters["delete"](interpreter);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
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
      value: function isTrue(value) {
        if (typeof value !== 'string') {
          return Boolean(value);
        }

        return trueStrings.includes(value.toUpperCase());
      }
    }, {
      key: "isFalse",
      value: function isFalse(value) {
        return !this.isTrue(value);
      }
    }, {
      key: "getIntParam",
      value: function getIntParam(_ref3) {
        var value = _ref3.value,
            defaultValue = _ref3.defaultValue;

        try {
          var result = parseInt(value);

          if (isNaN(result)) {
            return defaultValue;
          }

          return result;
        } catch (e) {
          if (value !== '') {
            console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be an integer number, but the received value was '").concat(value, "'.")); //`
          }

          return defaultValue;
        }
      }
    }, {
      key: "getFloatParam",
      value: function getFloatParam(_ref4) {
        var value = _ref4.value,
            defaultValue = _ref4.defaultValue;

        try {
          var result = parseFloat(value.replace(',', '.'));

          if (isNaN(result)) {
            return defaultValue;
          }

          return result;
        } catch (e) {
          if (value !== '') {
            console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be a number, but the received value was '").concat(value, "'.")); //`
          }

          return defaultValue;
        }
      }
    }, {
      key: "getIntListParam",
      value: function getIntListParam(_ref5) {
        var _this2 = this;

        var value = _ref5.value;
        return this.parseArray((value !== null && value !== void 0 ? value : '').trim(), function (item) {
          try {
            return parseInt(item.trim());
          } catch (e) {
            if (item !== '') {
              console.error("Cyclone Engine plugin ".concat(_this2.pluginName, ": Param is expected to be a list of integer numbers, but one of the items was '").concat(item, "'.")); //`
            }

            return 0;
          }
        });
      }
    }, {
      key: "parseStructArrayParam",
      value: function parseStructArrayParam(_ref6) {
        var data = _ref6.data,
            type = _ref6.type;
        var newData = [];

        var _iterator4 = _createForOfIteratorHelper(data),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var json = _step4.value;
            var itemData = this.parseStructParam({
              value: json,
              defaultValue: '',
              type: type
            });

            if (itemData) {
              newData.push(itemData);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return newData;
      }
    }, {
      key: "getFloatListParam",
      value: function getFloatListParam(_ref7) {
        var _this3 = this;

        var value = _ref7.value;
        return this.parseArray((value || '').trim(), function (item) {
          try {
            return parseFloat(item.trim());
          } catch (e) {
            if (item !== '') {
              console.error("Cyclone Engine plugin ".concat(_this3.pluginName, ": Param ").concat(name, " is expected to be a list of numbers, but one of the items was '").concat(item, "'.")); //`
            }

            return 0;
          }
        });
      }
    }, {
      key: "getParam",
      value: function getParam(_ref8) {
        var value = _ref8.value,
            defaultValue = _ref8.defaultValue,
            type = _ref8.type;

        if (type.endsWith('[]')) {
          return this.parseArrayParam({
            value: value,
            type: type
          });
        }

        if (type.startsWith('struct<')) {
          return this.parseStructParam({
            value: value,
            defaultValue: defaultValue,
            type: type
          });
        }

        if (value === undefined) {
          return defaultValue;
        }

        switch (type) {
          case 'int':
            return this.getIntParam({
              value: value,
              defaultValue: defaultValue
            });

          case 'float':
            return this.getFloatParam({
              value: value,
              defaultValue: defaultValue
            });

          case 'boolean':
            return typeof value === 'boolean' ? value : this.isTrue(String(value).trim());

          default:
            return value;
        }
      }
    }, {
      key: "getPluginParam",
      value: function getPluginParam(paramName) {
        return this.params.get(paramName);
      }
    }, {
      key: "defaultValueForType",
      value: function defaultValueForType(typeName) {
        switch (typeName) {
          case 'int':
            return 0;

          case 'boolean':
            return false;
        }

        return '';
      }
    }, {
      key: "parseParam",
      value: function parseParam(key, paramMap) {
        var dataMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var paramData = paramMap[key];

        if (paramData && typeof paramData === 'string') {
          paramData = {
            type: paramData,
            defaultValue: this.defaultValueForType(paramData)
          };
        }

        var _paramData = paramData,
            _paramData$name = _paramData.name,
            name = _paramData$name === void 0 ? key : _paramData$name,
            _paramData$type = _paramData.type,
            type = _paramData$type === void 0 ? 'string' : _paramData$type,
            _paramData$defaultVal = _paramData.defaultValue,
            defaultValue = _paramData$defaultVal === void 0 ? '' : _paramData$defaultVal;
        var value;

        if (dataMap) {
          var _dataMap$get;

          value = (_dataMap$get = dataMap.get(name)) !== null && _dataMap$get !== void 0 ? _dataMap$get : defaultValue;
        } else {
          var _data$value;

          var data = this.getPluginParam(name) || {};
          value = (_data$value = data.value) !== null && _data$value !== void 0 ? _data$value : defaultValue;
        }

        return this.getParam({
          value: value,
          defaultValue: defaultValue,
          type: type
        });
      }
    }, {
      key: "parseArrayParam",
      value: function parseArrayParam(_ref9) {
        var value = _ref9.value,
            type = _ref9.type;
        var data = this.parseArray(value);

        if (!data || !data.length) {
          return data;
        }

        var itemType = type.substr(0, type.length - 2);
        var newData = [];

        var _iterator5 = _createForOfIteratorHelper(data),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _value = _step5.value;
            var defaultValue = this.defaultValueForType(itemType);
            newData.push(this.getParam({
              value: _value,
              type: itemType,
              defaultValue: defaultValue
            }));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return newData;
      }
    }, {
      key: "getRegexMatch",
      value: function getRegexMatch(text, regex, matchIndex) {
        var matches = text.match(regex);
        return matches === null || matches === void 0 ? void 0 : matches[matchIndex];
      }
    }, {
      key: "parseStructParam",
      value: function parseStructParam(_ref10) {
        var value = _ref10.value,
            defaultValue = _ref10.defaultValue,
            type = _ref10.type;
        var data;

        if (value) {
          try {
            data = JSON.parse(value);
          } catch (e) {
            console.error('Cyclone Engine failed to parse param structure: ', value);
            console.error(e);
          }
        }

        if (!data) {
          data = JSON.parse(defaultValue);
        }

        var structTypeName = this.getRegexMatch(type, /struct<(.*)>/i, 1);

        if (!structTypeName) {
          console.error("Unknown plugin param type: ".concat(type)); //`

          return data;
        }

        var structType = this.structs.get(structTypeName);

        if (!structType) {
          console.error("Unknown param structure type: ".concat(structTypeName)); //`

          return data;
        }

        for (var key in structType) {
          if (!structType.hasOwnProperty(key)) {
            continue;
          }

          var dataType = structType[key];

          if (typeof dataType === 'string') {
            dataType = {
              type: dataType,
              defaultValue: this.defaultValueForType(dataType)
            };
          }

          data[key] = this.getParam({
            value: data[key],
            defaultValue: dataType.defaultValue,
            type: dataType.type
          });
        }

        return data;
      }
    }, {
      key: "parseList",
      value: function parseList(data, mapper) {
        var str = data;

        if (str.startsWith('[')) {
          str = str.substr(1);
        }

        if (str.endsWith(']')) {
          str = str.substr(0, str.length - 1);
        }

        var list = str.split(',');

        if (mapper) {
          return list.map(function (item) {
            return mapper(item);
          });
        }

        return list;
      }
    }, {
      key: "parseArray",
      value: function parseArray(value, mapper) {
        var data;

        try {
          data = JSON.parse(value);
        } catch (e) {
          return [];
        }

        if (!data || !data.length) {
          return [];
        }

        if (mapper) {
          return data.map(function (item) {
            return mapper(item);
          });
        }

        return data;
      }
    }, {
      key: "registerCommand",
      value: function registerCommand(commandName, params, fn) {
        var _this4 = this;

        if (typeof params === 'function') {
          return PluginManager.registerCommand(this.getPluginFileName(), commandName, params);
        }

        return PluginManager.registerCommand(this.getPluginFileName(), commandName, function (receivedArgs) {
          var dataMap = new Map();

          for (var key in receivedArgs) {
            if (!receivedArgs.hasOwnProperty(key)) {
              continue;
            }

            dataMap.set(key, receivedArgs[key]);
          }

          var parsedArgs = _this4.loadParamMap(params, dataMap);

          Object.assign(receivedArgs, parsedArgs);
          return fn(receivedArgs);
        });
      }
    }]);

    return CyclonePlugin;
  }(CyclonePatcher);

  var Layers = {
    shadows: 4,
    regions: 5,
    events: 6,
    auto: 7,
    collisions: 8,
    tags: 9,
    blend: 10
  };
  var Tools = {
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
    terrain: 'terrain'
  };
  var tilePropTools = [Tools.passage, Tools.passage4, Tools.ladder, Tools.bush, Tools.counter, Tools.damage, Tools.terrain];
  var TilePassageType = {
    free: 0,
    blocked: 1,
    star: 2
  };

  var MapshotTileMap = /*#__PURE__*/function (_Bitmap) {
    _inherits(MapshotTileMap, _Bitmap);

    var _super2 = _createSuper(MapshotTileMap);

    function MapshotTileMap() {
      var _this5;

      _classCallCheck(this, MapshotTileMap);

      var tileWidth = $gameMap.tileWidth();
      var tileHeight = $gameMap.tileHeight();
      var width = $gameMap.width() * tileWidth;
      var height = $gameMap.height() * tileHeight;
      _this5 = _super2.call(this, width, height);
      _this5.flags = $gameMap.tileset().flags;
      return _this5;
    }

    _createClass(MapshotTileMap, [{
      key: "drawSingleLayer",
      value: function drawSingleLayer(layerIndex) {
        var width = $gameMap.width();
        var height = $gameMap.height();

        for (var y = 0; y < height; y++) {
          for (var _x = 0; _x < width; _x++) {
            this.drawLayerSpot(_x, y, layerIndex);
          }
        }
      }
    }, {
      key: "drawLayerSpot",
      value: function drawLayerSpot(x, y, z) {
        var _$dataMap$data$index;

        var filterFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        var index = CycloneMapEditor.tileIndex(x, y, z);
        var tileId = (_$dataMap$data$index = $dataMap.data[index]) !== null && _$dataMap$data$index !== void 0 ? _$dataMap$data$index : 0;

        if (filterFn && !filterFn(tileId)) {
          return;
        }

        var drawX = x * $gameMap.tileWidth();
        var drawY = y * $gameMap.tileHeight();
        this.drawTile(tileId, drawX, drawY);
      }
    }, {
      key: "isHigherTile",
      value: function isHigherTile(tileId) {
        return this.flags[tileId] & 0x10;
      }
    }, {
      key: "drawLowerTiles",
      value: function drawLowerTiles() {
        var _this6 = this;

        var width = $gameMap.width();
        var height = $gameMap.height();

        var filterFn = function filterFn(tileId) {
          return !_this6.isHigherTile(tileId);
        };

        for (var z = 0; z <= 3; z++) {
          for (var y = 0; y < height; y++) {
            for (var _x2 = 0; _x2 < width; _x2++) {
              this.drawLayerSpot(_x2, y, z, filterFn);
            }
          }
        }
      }
    }, {
      key: "drawUpperTiles",
      value: function drawUpperTiles() {
        var _this7 = this;

        var width = $gameMap.width();
        var height = $gameMap.height();

        var filterFn = function filterFn(tileId) {
          return _this7.isHigherTile(tileId);
        };

        for (var z = 0; z <= 3; z++) {
          for (var y = 0; y < height; y++) {
            for (var _x3 = 0; _x3 < width; _x3++) {
              this.drawLayerSpot(_x3, y, z, filterFn);
            }
          }
        }
      }
    }, {
      key: "drawEvents",
      value: function drawEvents() {
        var priority = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        var events = SceneManager._scene._spriteset._tilemap.children.filter(function (child) {
          return child instanceof Sprite_Character;
        });

        var _iterator6 = _createForOfIteratorHelper(events),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var sprite = _step6.value;

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

            var _x4 = sprite.x - sprite._frame.width / 2 + $gameMap._displayX * $gameMap.tileWidth();

            var y = sprite.y - sprite._frame.height + $gameMap._displayY * $gameMap.tileHeight();
            this.blt(sprite.bitmap, sprite._frame.x, sprite._frame.y, sprite._frame.width, sprite._frame.height, _x4, y, sprite._frame.width, sprite._frame.height);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "drawDefaultCollision",
      value: function drawDefaultCollision() {
        var width = $gameMap.width();
        var height = $gameMap.height();

        for (var y = 0; y < height; y++) {
          for (var _x5 = 0; _x5 < width; _x5++) {
            var drawWidth = CycloneMapEditor.tileWidth;
            var drawHeight = CycloneMapEditor.tileHeight;
            var drawX = _x5 * drawWidth;
            var drawY = y * drawHeight;
            var downBlocked = !$gameMap.isPassable(_x5, y, 2);
            var upBlocked = !$gameMap.isPassable(_x5, y, 8);
            var leftBlocked = !$gameMap.isPassable(_x5, y, 4);
            var rightBlocked = !$gameMap.isPassable(_x5, y, 6);

            if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
              this.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF0000');
              continue;
            }

            var pieceHeight = Math.floor(drawHeight / 4);
            var pieceWidth = Math.floor(drawWidth / 4);

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
    }, {
      key: "drawCustomCollision",
      value: function drawCustomCollision() {
        var customCollisionTable = CycloneMapEditor.customCollisionTable;
        var height = $gameMap.height();
        var width = $gameMap.width();
        var tileWidth = CycloneMapEditor.tileWidth;
        var tileHeight = CycloneMapEditor.tileHeight;
        var drawWidth = tileWidth / 4;
        var drawHeight = tileHeight / 4;
        var colors = ['#00FF00', '#FF0000'];
        var collisionHeight = height * 4;
        var collisionWidth = width * 4;

        for (var y = 0; y < height; y++) {
          for (var _x6 = 0; _x6 < width; _x6++) {
            for (var cellX = 0; cellX < 4; cellX++) {
              for (var cellY = 0; cellY < 4; cellY++) {
                var intX = Math.floor(_x6 * 4) + cellX;
                var intY = Math.floor(y * 4) + cellY;
                var index = intY % collisionHeight * collisionWidth + intX % collisionWidth; // eslint-disable-next-line max-depth

                if (customCollisionTable[index]) {
                  var drawX = intX * drawWidth;
                  var drawY = intY * drawHeight;
                  this.clearRect(drawX, drawY, drawWidth, drawHeight);
                  var colorIndex = customCollisionTable[index] - 1;
                  var color = colors[colorIndex % colors.length];
                  this.fillRect(drawX, drawY, drawWidth, drawHeight, color);
                }
              }
            }
          }
        }
      }
    }]);

    return MapshotTileMap;
  }(Bitmap);

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

  function throttle(fn, delay) {
    var _this8 = this;

    var timeout;
    var latestArgs;
    var needsCalling = false;

    var call = function call() {
      timeout = setTimeout(function () {
        if (needsCalling) {
          call();
        } else {
          timeout = false;
        }

        needsCalling = false;
      }, delay);
      fn.call.apply(fn, [_this8].concat(_toConsumableArray(latestArgs)));
    };

    var debounced = function debounced() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

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
    var clearTimer;
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var context = this;
      clearTimeout(clearTimer);
      clearTimer = setTimeout(function () {
        return fn.call.apply(fn, [context].concat(args));
      }, delay);
    };
  }

  var DirectionHelper = /*#__PURE__*/function () {
    function DirectionHelper() {
      _classCallCheck(this, DirectionHelper);
    }

    _createClass(DirectionHelper, null, [{
      key: "goesLeft",
      value: function goesLeft(d) {
        return d && d % 3 === 1;
      }
    }, {
      key: "goesRight",
      value: function goesRight(d) {
        return d && d % 3 === 0;
      }
    }, {
      key: "goesUp",
      value: function goesUp(d) {
        return d >= 7 && d <= 9;
      }
    }, {
      key: "goesDown",
      value: function goesDown(d) {
        return d >= 1 && d <= 3;
      }
    }, {
      key: "isDiagonal",
      value: function isDiagonal(d) {
        return this.isVertical(d) && this.isHorizontal(d);
      }
    }, {
      key: "isVertical",
      value: function isVertical(d) {
        return this.goesDown(d) || this.goesUp(d);
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal(d) {
        return this.goesLeft(d) || this.goesRight(d);
      }
    }, {
      key: "shareADirection",
      value: function shareADirection(dir1, dir2) {
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
    }, {
      key: "getFirstDirection",
      value: function getFirstDirection(diagonalDirection) {
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
    }, {
      key: "getAlternativeDirection",
      value: function getAlternativeDirection(direction, diagonalDirection) {
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
    }]);

    return DirectionHelper;
  }();

  function _logImage(canvas, text) {
    var url = canvas.toDataURL();
    var scale = 1;
    var img = new Image();

    function getBox(width, height) {
      return {
        string: '+',
        style: "font-size: 1px; padding: ".concat(Math.floor(height / 2), "px ").concat(Math.floor(width / 2), "px; line-height: ").concat(height, "px;")
      };
    }

    img.onload = function () {
      var dim = getBox(this.width * scale, this.height * scale);

      if (text) {
        console.log(text);
      }

      console.log("%c".concat(dim.string), "".concat(dim.style, "background: url('").concat(url, "'); background-size: ").concat(this.width * scale, "px ").concat(this.height * scale, "px; color: transparent;"));
    };

    img.src = url;
  }

  function getTilesetIndex(tileId) {
    if (tileId >= Tilemap.TILE_ID_A5 + 256 && tileId < Tilemap.TILE_ID_A1) {
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

  var layerVisibility = [true, true, true, true, true, false, true, false, false, false, false];
  var editorActive = true;
  var windowWidth = 216;
  var mapCaches = {};
  var customCollisionTable = {};
  var tileBlendingTable = {};
  var currentLayer = 7;
  var currentTab = 'A';
  var currentTileId = undefined;
  var tileCols = 1;
  var tileRows = 1;
  var selectedTileList = [];
  var multiLayerSelection = [];
  var tileWidth = 48;
  var tileHeight = 48;
  var currentTool = 'pencil';
  var lastDrawingTool = 'pencil';
  var wasPressing = false;
  var isRightButtonDown = false;
  var wasRightButtonDown = false;
  var rectangleStartMouseX = 0;
  var rectangleStartMouseY = 0;
  var rectangleStartX = 0;
  var rectangleStartY = 0;
  var rectangleWidth = 0;
  var rectangleHeight = 0;
  var rectangleBackWidth = 0;
  var rectangleBackHeight = 0;
  var tabs = ['A', 'B', 'C', 'D', 'E'];
  var changeHistory = [];
  var undoHistory = [];
  var currentChange = false;
  var previewChanges = {};
  var messySelection = false;
  var showGrid = true;
  var statusTileId = 0;
  var statusMapX = 0;
  var statusMapY = 0;
  var statusTile1 = 0;
  var statusTile2 = 0;
  var statusTile3 = 0;
  var statusTile4 = 0;
  var statusRegion = 0;
  var statusTag = 0;
  var statusCollision = 0;
  var statusBush = false;
  var statusCounter = false;
  var statusDamage = false;
  var statusLadder = false;
  var currentZoom = 1;
  var puzzleMode = false;
  var circleData = false;
  var smallCircleData = false;
  var _ = '';
  var o = true;
  var x = false;
  var autoTileShapeTable = [// o means there's a compatible tile on that position,
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
  [_, x, _, x, x, _, x, _] //46
  ];
  var highLayerAutotiles = [1, 2, 3, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47];
  var refreshGrid = throttle(function () {
    SceneManager._scene._mapEditorGrid.refresh();
  }, 50);

  var _refreshTilemap = throttle(function () {
    SceneManager._scene._spriteset._tilemap.refresh();
  }, 200);

  var refreshCollision = throttle(function () {
    if (TouchInput.isPressed()) {
      setTimeout(function () {
        refreshCollision();
      }, 1);
      return;
    }

    if (window.CycloneMovement) {
      window.CycloneMovement.setupCollision();
    }
  }, 200);
  var refreshMagic = throttle(function () {
    if (TouchInput.isPressed()) {
      setTimeout(function () {
        refreshMagic();
      }, 1);
      return;
    }

    if (window.CycloneMagic) {
      window.CycloneMagic.loadMagic();
      forceBlenderRefresh(true);
    }
  });
  var forceBlenderRefresh = throttle(function () {
    CycloneMapEditor$1.forceBlenderRefresh.apply(CycloneMapEditor$1, arguments);
  }, 50);
  var saveExtraData = throttle(function () {
    var refreshCollisionToo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (TouchInput.isPressed()) {
      setTimeout(function () {
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
  var fullRefresh = debounce(function () {
    saveExtraData(true);
  }, 500);

  var CycloneMapEditor$1 = /*#__PURE__*/function (_CyclonePlugin) {
    _inherits(CycloneMapEditor$1, _CyclonePlugin);

    var _super3 = _createSuper(CycloneMapEditor$1);

    function CycloneMapEditor$1() {
      _classCallCheck(this, CycloneMapEditor$1);

      return _super3.apply(this, arguments);
    }

    _createClass(CycloneMapEditor$1, null, [{
      key: "register",
      value: function register() {
        var _this9 = this;

        _get(_getPrototypeOf(CycloneMapEditor$1), "initialize", this).call(this, 'CycloneMapEditor');

        this.structs.set('CycloneRegionIcon', {
          regionId: 'int',
          icon: 'int'
        });

        _get(_getPrototypeOf(CycloneMapEditor$1), "register", this).call(this, {
          regionIcons: {
            type: 'struct<CycloneRegionIcon>[]',
            defaultValue: '[]'
          },
          showMapId: {
            type: 'boolean',
            defaultValue: true
          },
          showTilesetId: {
            type: 'boolean',
            defaultValue: true
          },
          showPosition: {
            type: 'boolean',
            defaultValue: true
          },
          showCellTiles: {
            type: 'boolean',
            defaultValue: true
          },
          showRegionId: {
            type: 'boolean',
            defaultValue: true
          },
          showTag: {
            type: 'boolean',
            defaultValue: true
          },
          showCollision: {
            type: 'boolean',
            defaultValue: true
          },
          showLadder: {
            type: 'boolean',
            defaultValue: true
          },
          showBush: {
            type: 'boolean',
            defaultValue: true
          },
          showCounter: {
            type: 'boolean',
            defaultValue: true
          },
          showDamageFloor: {
            type: 'boolean',
            defaultValue: true
          },
          collisionStepCount: {
            type: 'int',
            defaultValue: 1
          }
        });

        document.addEventListener('keydown', function () {
          _this9.onKeyDown.apply(_this9, arguments);
        });
        document.addEventListener('keypress', function () {
          _this9.onKeyPress.apply(_this9, arguments);
        });
        document.addEventListener('keyup', function () {
          _this9.onKeyUp.apply(_this9, arguments);
        });
        var regionIcons = this.params.regionIcons;
        this.regionIcons = new Map();

        if (regionIcons) {
          var _iterator7 = _createForOfIteratorHelper(regionIcons),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _step7$value = _step7.value,
                  regionId = _step7$value.regionId,
                  icon = _step7$value.icon;

              if (regionId && icon) {
                this.regionIcons.set(regionId, icon);
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      }
    }, {
      key: "mapEditorScene",
      value: function mapEditorScene() {
        return Scene_Map;
      }
    }, {
      key: "isMapEditorScene",
      value: function isMapEditorScene() {
        return SceneManager._scene instanceof this.mapEditorScene();
      }
    }, {
      key: "makeMenuEvent",
      value: function makeMenuEvent(fn) {
        return function () {
          if (TouchInput.isPressed()) {
            return;
          }

          fn();
        };
      }
    }, {
      key: "addFileMenu",
      value: function addFileMenu(menu) {
        var fileMenu = new nw.Menu();
        fileMenu.append(new nw.MenuItem({
          label: 'Save Current Map',
          key: 's',
          modifiers: 'ctrl',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.saveButton();
          })
        }));
        fileMenu.append(new nw.MenuItem({
          label: 'Reload Current Map',
          key: 'r',
          modifiers: 'ctrl',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.reloadButton();
          })
        }));
        fileMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        fileMenu.append(new nw.MenuItem({
          label: 'Exit',
          click: this.makeMenuEvent(function () {
            window.close();
          })
        }));
        menu.append(new nw.MenuItem({
          label: 'File',
          submenu: fileMenu
        }));
      }
    }, {
      key: "addEditMenu",
      value: function addEditMenu(menu) {
        var editMenu = new nw.Menu();
        editMenu.append(new nw.MenuItem({
          label: 'Undo',
          key: 'z',
          modifiers: 'ctrl',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.undoButton();
          })
        }));
        editMenu.append(new nw.MenuItem({
          label: 'Redo',
          key: 'y',
          modifiers: 'ctrl',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.redoButton();
          })
        }));
        editMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.showGridMenu = new nw.MenuItem({
          label: 'Show Grid',
          type: 'checkbox',
          checked: showGrid,
          key: 'g',
          modifiers: 'ctrl',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.showGridButton();
          })
        });
        editMenu.append(this.showGridMenu); // const zoomMenu = new nw.Menu();
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
          submenu: editMenu
        }));
      }
    }, {
      key: "addMapMenu",
      value: function addMapMenu(menu) {
        var mapMenu = new nw.Menu();
        mapMenu.append(new nw.MenuItem({
          label: 'Scroll Up',
          key: 'w',
          click: function click() {
            $gameMap.scrollUp(3);
          }
        }));
        mapMenu.append(new nw.MenuItem({
          label: 'Scroll Left',
          key: 'a',
          click: function click() {
            $gameMap.scrollLeft(3);
          }
        }));
        mapMenu.append(new nw.MenuItem({
          label: 'Scroll Down',
          key: 's',
          click: function click() {
            $gameMap.scrollDown(3);
          }
        }));
        mapMenu.append(new nw.MenuItem({
          label: 'Scroll Right',
          key: 'd',
          click: function click() {
            $gameMap.scrollRight(3);
          }
        }));
        menu.append(new nw.MenuItem({
          label: 'Map',
          submenu: mapMenu
        }));
      }
    }, {
      key: "addModeMenu",
      value: function addModeMenu(menu) {
        var modeMenu = new nw.Menu();
        this.pencilMenu = new nw.MenuItem({
          label: 'Pencil',
          type: 'checkbox',
          checked: currentTool === 'pencil',
          key: 'p',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.pencilButton();
          })
        });
        modeMenu.append(this.pencilMenu);
        this.rectangleMenu = new nw.MenuItem({
          label: 'Rectangle',
          type: 'checkbox',
          checked: currentTool === 'rectangle',
          key: 'r',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.rectangleButton();
          })
        });
        modeMenu.append(this.rectangleMenu);
        this.fillMenu = new nw.MenuItem({
          label: 'Flood Fill',
          type: 'checkbox',
          checked: currentTool === 'fill',
          key: 'f',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.fillButton();
          })
        });
        modeMenu.append(this.fillMenu);
        modeMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.puzzleMenu = new nw.MenuItem({
          label: 'Magic Mode',
          type: 'checkbox',
          checked: puzzleMode,
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.puzzleButton();
          })
        });
        modeMenu.append(this.puzzleMenu);
        modeMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.eraserMenu = new nw.MenuItem({
          label: 'Eraser',
          type: 'checkbox',
          checked: currentTool === 'eraser',
          key: 'e',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.eraserButton();
          })
        });
        modeMenu.append(this.eraserMenu);
        modeMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        var tilesetPropsMenu = new nw.Menu();
        this.tilePassageMenu = new nw.MenuItem({
          label: 'Passage',
          type: 'checkbox',
          checked: currentTool === Tools.passage,
          key: 'p',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.passage);
          })
        });
        tilesetPropsMenu.append(this.tilePassageMenu);
        this.tilePassage4Menu = new nw.MenuItem({
          label: 'Passage (4 dir)',
          type: 'checkbox',
          checked: currentTool === Tools.passage4,
          key: 'o',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.passage4);
          })
        });
        tilesetPropsMenu.append(this.tilePassage4Menu);
        this.tileLadderMenu = new nw.MenuItem({
          label: 'Ladder',
          type: 'checkbox',
          checked: currentTool === Tools.ladder,
          key: 'l',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.ladder);
          })
        });
        tilesetPropsMenu.append(this.tileLadderMenu);
        this.tileBushMenu = new nw.MenuItem({
          label: 'Bush',
          type: 'checkbox',
          checked: currentTool === Tools.bush,
          key: 'b',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.bush);
          })
        });
        tilesetPropsMenu.append(this.tileBushMenu);
        this.tileCounterMenu = new nw.MenuItem({
          label: 'Counter',
          type: 'checkbox',
          checked: currentTool === Tools.counter,
          key: 'c',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.counter);
          })
        });
        tilesetPropsMenu.append(this.tileCounterMenu);
        this.tileDamageMenu = new nw.MenuItem({
          label: 'Damage',
          type: 'checkbox',
          checked: currentTool === Tools.damage,
          key: 'd',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.damage);
          })
        });
        tilesetPropsMenu.append(this.tileDamageMenu);
        this.tileTerrainMenu = new nw.MenuItem({
          label: 'Terrain Tag',
          type: 'checkbox',
          checked: currentTool === Tools.terrain,
          key: 't',
          modifiers: 'shift',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.toolButton(Tools.terrain);
          })
        });
        tilesetPropsMenu.append(this.tileTerrainMenu);
        modeMenu.append(new nw.MenuItem({
          label: 'Tile Properties',
          submenu: tilesetPropsMenu
        }));
        menu.append(new nw.MenuItem({
          label: 'Mode',
          submenu: modeMenu
        }));
      }
    }, {
      key: "addLayerMenu",
      value: function addLayerMenu(menu) {
        var layerMenu = new nw.Menu();
        this.autoLayerButton = new nw.MenuItem({
          label: 'Automatic',
          type: 'checkbox',
          checked: currentLayer === 7,
          key: '0',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(7);
          })
        });
        this.layer1Button = new nw.MenuItem({
          label: 'Layer 1',
          type: 'checkbox',
          checked: currentLayer === 0,
          key: '1',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(0);
          })
        });
        this.layer2Button = new nw.MenuItem({
          label: 'Layer 2',
          type: 'checkbox',
          checked: currentLayer === 1,
          key: '2',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(1);
          })
        });
        this.layer3Button = new nw.MenuItem({
          label: 'Layer 3',
          type: 'checkbox',
          checked: currentLayer === 2,
          key: '3',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(2);
          })
        });
        this.layer4Button = new nw.MenuItem({
          label: 'Layer 4',
          type: 'checkbox',
          checked: currentLayer === 3,
          key: '4',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(3);
          })
        });
        layerMenu.append(this.autoLayerButton);
        layerMenu.append(this.layer1Button);
        layerMenu.append(this.layer2Button);
        layerMenu.append(this.layer3Button);
        layerMenu.append(this.layer4Button);
        layerMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.shadowsButton = new nw.MenuItem({
          label: 'Shadows',
          type: 'checkbox',
          checked: currentLayer === 4,
          key: '5',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(4);
          })
        });
        layerMenu.append(this.shadowsButton);
        this.regionsButton = new nw.MenuItem({
          label: 'Regions',
          type: 'checkbox',
          checked: currentLayer === 5,
          key: '6',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(5);
          })
        });
        layerMenu.append(this.regionsButton);
        this.eventsButton = new nw.MenuItem({
          label: 'Events',
          type: 'checkbox',
          checked: currentLayer === 6,
          key: '7',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(6);
          })
        });
        layerMenu.append(this.eventsButton);
        layerMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.collisionsButton = new nw.MenuItem({
          label: 'Collisions',
          type: 'checkbox',
          checked: currentLayer === 8,
          key: '8',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(8);
          })
        });
        layerMenu.append(this.collisionsButton);
        this.tagsButton = new nw.MenuItem({
          label: 'Tags',
          type: 'checkbox',
          checked: currentLayer === 9,
          key: '9',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(9);
          })
        });
        layerMenu.append(this.tagsButton);
        menu.append(new nw.MenuItem({
          label: 'Layer',
          submenu: layerMenu
        }));
      }
    }, {
      key: "addBlendMenu",
      value: function addBlendMenu(menu) {
        var blendMenu = new nw.Menu();
        this.blendButton = new nw.MenuItem({
          label: 'Blend Layer',
          type: 'checkbox',
          checked: currentLayer === 10,
          key: 'B',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.changeCurrentLayer(10);
            CycloneMapEditor$1.updateCurrentTool();
          })
        });
        blendMenu.append(this.blendButton);
        blendMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        blendMenu.append(new nw.MenuItem({
          label: 'Remove blend effect',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.removeAllBlendsButton();
          })
        }));
        blendMenu.append(new nw.MenuItem({
          label: 'Optimize blend effect',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.optimizeBlendsButton();
          })
        }));
        menu.append(new nw.MenuItem({
          label: 'Blend',
          submenu: blendMenu
        }));
      }
    }, {
      key: "addTilesetMenu",
      value: function addTilesetMenu(menu) {
        var _this10 = this;

        var tilesetMenu = new nw.Menu();
        this._mainTilesetMenu = new nw.MenuItem({
          label: 'Main Tileset',
          enabled: false
        });
        tilesetMenu.append(this._mainTilesetMenu);
        this._extraTilesetMenu = new nw.Menu();

        var _iterator8 = _createForOfIteratorHelper($dataTilesets),
            _step8;

        try {
          var _loop = function _loop() {
            var tileset = _step8.value;

            if (!tileset) {
              return "continue";
            }

            var tilesetNames = tileset.tilesetNames;

            if (!tilesetNames[5] && !tilesetNames[6]) {
              return "continue";
            }

            var menuItem = new nw.MenuItem({
              label: "".concat(tileset.id.padZero(4), " ").concat(tileset.name),
              enabled: true,
              type: 'checkbox',
              click: _this10.makeMenuEvent(function () {
                _this10.toggleTileset(tileset.id);
              })
            });

            _this10._extraTilesetMenu.append(menuItem);
          };

          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _ret = _loop();

            if (_ret === "continue") continue;
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        this._extraTilesetMenuItem = new nw.MenuItem({
          label: 'Extra Tileset',
          submenu: this._extraTilesetMenu
        });
        tilesetMenu.append(this._extraTilesetMenuItem);
        menu.append(new nw.MenuItem({
          label: 'Tilesets',
          submenu: tilesetMenu
        }));
      }
    }, {
      key: "addJumpMenu",
      value: function addJumpMenu(menu) {
        var a1 = Tilemap.TILE_ID_A1;
        var a2 = Tilemap.TILE_ID_A2;
        var a3 = Tilemap.TILE_ID_A3;
        var a4 = Tilemap.TILE_ID_A4;
        var b = Tilemap.TILE_ID_B;
        var c = Tilemap.TILE_ID_C;
        var d = Tilemap.TILE_ID_D;
        var e = Tilemap.TILE_ID_E;
        var f = Tilemap.TILE_ID_E + 256;
        var g = Tilemap.TILE_ID_E + 512;
        var a5 = Tilemap.TILE_ID_A5;
        var h = Tilemap.TILE_ID_A5 + 256;
        var jumpToTabMenu = new nw.Menu();
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'AutoTiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([a1, a2, a3, a4]);
          })
        }));
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'A5 Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToTile(a5);
          })
        }));
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'B Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([b, c, d, e, f, g, a5]);
          })
        }));
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'C Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([c, d, e, f, g, a5]);
          })
        }));
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'D Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([d, e, f, g, a5]);
          })
        }));
        jumpToTabMenu.append(new nw.MenuItem({
          label: 'E Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([e, f, g, a5]);
          })
        }));
        this._jumpToExtraBMenu = new nw.MenuItem({
          label: 'Extra B Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([f, g, a5]);
          })
        });
        jumpToTabMenu.append(this._jumpToExtraBMenu);
        this._jumpToExtraCMenu = new nw.MenuItem({
          label: 'Extra C Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([g, a5]);
          })
        });
        jumpToTabMenu.append(this._jumpToExtraCMenu);
        this._jumpToExtraDMenu = new nw.MenuItem({
          label: 'Extra D Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.jumpToOneTileOf([h, a5]);
          })
        });
        jumpToTabMenu.append(this._jumpToExtraDMenu);
        menu.append(new nw.MenuItem({
          label: 'Jump To',
          submenu: jumpToTabMenu
        }));
      }
    }, {
      key: "refreshTilesetMenu",
      value: function refreshTilesetMenu() {
        if (!this._extraTilesetMenu) {
          return;
        }

        var tileset = $gameMap.tileset();
        this._mainTilesetMenu.label = "".concat(tileset.id.padZero(4), " ").concat(tileset.name);

        var _iterator9 = _createForOfIteratorHelper(this._extraTilesetMenu.items),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var item = _step9.value;
            var id = parseInt(item.label.substring(0, 4), 10);

            if (id === $gameMap._tilesetId) {
              item.checked = false;
              item.enabled = false;
              continue;
            }

            item.enabled = true;
            item.checked = $gameMap._extraTilesetId === id;
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    }, {
      key: "addExportMenu",
      value: function addExportMenu(menu) {
        var exportMenu = new nw.Menu();
        var exportLayersMenu = new nw.Menu();
        exportLayersMenu.append(new nw.MenuItem({
          label: 'Layer 1',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportSingleLayer(0);
          })
        }));
        exportLayersMenu.append(new nw.MenuItem({
          label: 'Layer 2',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportSingleLayer(1);
          })
        }));
        exportLayersMenu.append(new nw.MenuItem({
          label: 'Layer 3',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportSingleLayer(2);
          })
        }));
        exportLayersMenu.append(new nw.MenuItem({
          label: 'Layer 4',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportSingleLayer(3);
          })
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Layers',
          submenu: exportLayersMenu
        }));
        var exportRenderedMapMenu = new nw.Menu();
        exportRenderedMapMenu.append(new nw.MenuItem({
          label: 'Lower Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportLowerTiles();
          })
        }));
        exportRenderedMapMenu.append(new nw.MenuItem({
          label: 'Upper Tiles',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportUpperTiles();
          })
        }));
        exportRenderedMapMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        exportRenderedMapMenu.append(new nw.MenuItem({
          label: 'Whole Map',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportWholeMap();
          })
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Rendered Map',
          submenu: exportRenderedMapMenu
        }));
        var exportEventsMenu = new nw.Menu();
        exportEventsMenu.append(new nw.MenuItem({
          label: 'Low Events',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportLowEvents();
          })
        }));
        exportEventsMenu.append(new nw.MenuItem({
          label: 'Normal Events',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportNormalEvents();
          })
        }));
        exportEventsMenu.append(new nw.MenuItem({
          label: 'High Events',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportHighEvents();
          })
        }));
        exportEventsMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        exportEventsMenu.append(new nw.MenuItem({
          label: 'All Events',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportAllEvents();
          })
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Events',
          submenu: exportEventsMenu
        }));
        var exportCollisionsMenu = new nw.Menu();
        exportCollisionsMenu.append(new nw.MenuItem({
          label: 'Custom Collision',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportCustomCollision();
          })
        }));
        exportCollisionsMenu.append(new nw.MenuItem({
          label: 'Full Collision',
          click: this.makeMenuEvent(function () {
            CycloneMapEditor$1.exportFullCollision();
          })
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Collision',
          submenu: exportCollisionsMenu
        }));
        menu.append(new nw.MenuItem({
          label: 'Export',
          submenu: exportMenu
        }));
      }
    }, {
      key: "addHelpMenu",
      value: function addHelpMenu(menu) {
        var helpMenu = new nw.Menu();
        helpMenu.append(new nw.MenuItem({
          label: 'Plugin Page',
          key: 'F1',
          click: this.makeMenuEvent(function () {
            if (!globalThis.require) {
              return;
            }

            require('nw.gui').Shell.openExternal('https://makerdevs.com/plugin/cyclone-map-editor');
          })
        }));
        helpMenu.append(new nw.MenuItem({
          label: 'Extra Tilesets Add-on',
          click: this.makeMenuEvent(function () {
            if (!globalThis.require) {
              return;
            }

            require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-extra-tilesets');
          })
        }));
        helpMenu.append(new nw.MenuItem({
          label: 'Magic (Tile Blend) Add-on',
          click: this.makeMenuEvent(function () {
            if (!globalThis.require) {
              return;
            }

            require('nw.gui').Shell.openExternal('https://hudell.itch.io/cyclone-magic');
          })
        }));
        menu.append(new nw.MenuItem({
          label: 'Help',
          submenu: helpMenu
        }));
      }
    }, {
      key: "addMenuBar",
      value: function addMenuBar() {
        if (!Utils.isNwjs()) {
          return;
        }

        if (this.menu) {
          return this.refreshMenuVisibility();
        }

        var menu = new nw.Menu({
          type: 'menubar'
        });
        this.addFileMenu(menu);
        this.addEditMenu(menu);
        this.addMapMenu(menu);
        this.addModeMenu(menu);
        this.addLayerMenu(menu);
        this.addBlendMenu(menu);
        this.addTilesetMenu(menu);
        this.addJumpMenu(menu);
        this.addExportMenu(menu);
        this.addHelpMenu(menu);
        this.menu = menu;
        this.refreshTilesetMenu();
        this.refreshMenuVisibility();
      }
    }, {
      key: "clearAllData",
      value: function clearAllData() {
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
    }, {
      key: "toggleTileset",
      value: function toggleTileset(id) {
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
    }, {
      key: "applyExtraData",
      value: function applyExtraData(data) {
        customCollisionTable = {};
        tileBlendingTable = {};
        $gameMap._extraTilesetId = 0;
        var radix = (data === null || data === void 0 ? void 0 : data.radix) || 10;

        if (data === null || data === void 0 ? void 0 : data.collision) {
          for (var i = 0; i < data.collision.length; i++) {
            var col = parseInt(data.collision[i], radix) || 0;

            if (col) {
              customCollisionTable[i] = col;
            }
          }
        }

        if (data === null || data === void 0 ? void 0 : data.magic) {
          for (var tileId in data.magic) {
            if (!data.magic[tileId]) {
              continue;
            }

            var line = data.magic[tileId];
            var buffer = new ArrayBuffer(line.length);
            var list = new Uint8Array(buffer);

            for (var _i = line.indexOf('1'); _i < line.length; _i++) {
              if (line[_i] !== '0') {
                list[_i] = Number(line[_i]);
              }
            }

            tileBlendingTable[tileId] = list;
          }
        }

        if (data === null || data === void 0 ? void 0 : data.extraTilesetId) {
          $gameMap._extraTilesetId = data.extraTilesetId;
        }

        this.refreshTilesetMenu();
        this.refreshMapEditor();
      }
    }, {
      key: "dataVersion",
      value: function dataVersion() {
        return '02';
      }
    }, {
      key: "compress",
      value: function compress(data) {
        return "v=".concat(this.dataVersion(), ";") + LZString.compressToBase64(data);
      }
    }, {
      key: "decompress",
      value: function decompress(data) {
        if (!data.startsWith('v=')) {
          return LZString.decompress(data);
        }

        var idx = data.indexOf(';') + 1;
        return LZString.decompressFromBase64(data.substring(idx));
      }
    }, {
      key: "parseExtraData",
      value: function parseExtraData(note) {
        var json;

        try {
          json = this.decompress(note);
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
          console.error('Failed to parse extra data.');
          console.log(json);
          console.log(e);
          return;
        }

        this.applyExtraData(data);
      }
    }, {
      key: "loadExtraData",
      value: function loadExtraData() {
        // Check if there's any event called CycloneMapEditor
        var _iterator10 = _createForOfIteratorHelper($dataMap.events),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var event = _step10.value;

            if (!event) {
              continue;
            }

            if (event.name !== 'CycloneMapEditor') {
              continue;
            }

            this.parseExtraData(event.note);
            return;
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }
    }, {
      key: "getExtraData",
      value: function getExtraData() {
        var _window$CycloneMagic;

        var radix = 36;
        var collision = new Array($dataMap.width * $dataMap.height * 16);

        for (var i = 0; i < collision.length; i++) {
          if (customCollisionTable[i]) {
            if (customCollisionTable[i] >= radix) {
              throw new Error('Invalid collision value: ', customCollisionTable[i]);
            }

            collision[i] = Number(customCollisionTable[i]).toString(radix);
          } else {
            collision[i] = '0';
          }
        }

        var magic = {};

        for (var tileId in tileBlendingTable) {
          if (!tileBlendingTable[tileId]) {
            continue;
          }

          var line = tileBlendingTable[tileId].join('');

          if (!line.includes('1')) {
            continue;
          }

          magic[tileId] = line;
        }

        var puzzle = ((_window$CycloneMagic = window.CycloneMagic) === null || _window$CycloneMagic === void 0 ? void 0 : _window$CycloneMagic.puzzleTiles) || undefined;
        return {
          radix: radix,
          collision: collision.join(''),
          magic: magic,
          puzzle: puzzle,
          extraTilesetId: $gameMap._extraTilesetId
        };
      }
    }, {
      key: "getExtraDataJson",
      value: function getExtraDataJson() {
        return this.compress(JSON.stringify(this.getExtraData(), null, 0));
      }
    }, {
      key: "saveExtraData",
      value: function saveExtraData() {
        var data = this.getExtraDataJson(); // Check if there's any event called CycloneMapEditor

        var _iterator11 = _createForOfIteratorHelper($dataMap.events),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var event = _step11.value;

            if (!event) {
              continue;
            }

            if (event.name !== 'CycloneMapEditor') {
              continue;
            }

            event.note = data;
            return;
          } // Create a new event then

        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        $dataMap.events.push({
          id: $dataMap.events.length,
          name: 'CycloneMapEditor',
          note: data,
          pages: [],
          x: $dataMap.width,
          y: $dataMap.height
        });
      }
    }, {
      key: "clearSelection",
      value: function clearSelection() {
        currentTileId = undefined;
        tileCols = 1;
        tileRows = 1;
        selectedTileList = [];
        multiLayerSelection = [];
      }
    }, {
      key: "shouldDisplayMenu",
      value: function shouldDisplayMenu() {
        if (!editorActive) {
          return false;
        }

        if (!this.isMapEditorScene()) {
          return false;
        }

        return true;
      }
    }, {
      key: "isFullScreen",
      value: function isFullScreen() {
        return Graphics._isFullScreen();
      }
    }, {
      key: "refreshScreenSize",
      value: function refreshScreenSize() {
        var _this11 = this;

        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }

        if (this.isFullScreen()) {
          return;
        }

        this.resizeTimeout = setTimeout(function () {
          // Adds a second timeout to block the show/hide functionality for a little while
          _this11.resizeTimeout = setTimeout(function () {
            _this11.resizeTimeout = false;
          }, 500);
          var xDelta = Graphics.width - window.innerWidth;
          var yDelta = Graphics.height - window.innerHeight;

          if (xDelta !== 0 || yDelta !== 0) {
            window.moveBy(-xDelta / 2, -yDelta / 2);
            window.resizeBy(xDelta, yDelta);
          }
        }, 20);
      }
    }, {
      key: "enablePluginOptions",
      value: function enablePluginOptions() {
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
    }, {
      key: "refreshMenuVisibility",
      value: function refreshMenuVisibility() {
        if (!Utils.isNwjs()) {
          return;
        }

        var display = this.shouldDisplayMenu();
        var win = nw.Window.get();
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
    }, {
      key: "logImage",
      value: function logImage(canvas, text) {
        _logImage(canvas, text);
      }
    }, {
      key: "isTabValid",
      value: function isTabValid(tab) {
        var tileset = $gameMap.tileset();

        if (!tileset) {
          return false;
        }

        var names = tileset.tilesetNames;

        if (tab === 'A') {
          return Boolean(names[0] || names[1] || names[2] || names[3] || names[4]);
        }

        var tilesetIndex = tabs.indexOf(tab) + 4;
        return Boolean(names[tilesetIndex]);
      }
    }, {
      key: "validTabs",
      value: function validTabs() {
        var _this12 = this;

        return tabs.filter(function (tab) {
          return _this12.isTabValid(tab);
        });
      }
    }, {
      key: "areRegionsVisible",
      value: function areRegionsVisible() {
        return layerVisibility[5];
      }
    }, {
      key: "isLayerVisible",
      value: function isLayerVisible(index) {
        if (index >= 8 && index <= 10) {
          return currentLayer === index;
        }

        if (index === 7) {
          return true;
        }

        return layerVisibility[index];
      }
    }, {
      key: "selectPreviousTab",
      value: function selectPreviousTab() {
        var validTabs = this.validTabs();
        var oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);
        var index = oldIndex === 0 ? validTabs.length - 1 : oldIndex - 1;
        this.changeCurrentTab(validTabs[index % validTabs.length]);
      }
    }, {
      key: "selectNextTab",
      value: function selectNextTab() {
        var validTabs = this.validTabs();
        var oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);
        var index = oldIndex + 1;
        this.changeCurrentTab(validTabs[index % validTabs.length]);
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (!editorActive) {
          return;
        }

        var scene = SceneManager._scene;

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
    }, {
      key: "checkNumKeys",
      value: function checkNumKeys(code) {
        switch (code) {
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
    }, {
      key: "checkLayerKeys",
      value: function checkLayerKeys(key) {
        switch (key) {
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
    }, {
      key: "checkScrollKeys",
      value: function checkScrollKeys(key) {
        switch (key.toLowerCase()) {
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
    }, {
      key: "sceneToReload",
      value: function sceneToReload() {
        return Scene_Map;
      }
    }, {
      key: "loadMapFile",
      value: function loadMapFile() {
        var _this13 = this;

        SceneManager._scene._mapEditorCommands.hide();

        delete mapCaches[$gameMap._mapId];
        var fileName = "Map".concat($gameMap._mapId.padZero(3), ".json");
        var xhr = new XMLHttpRequest();
        var url = "data/".concat(fileName);
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');

        xhr.onload = function () {
          try {
            var data = JSON.parse(xhr.responseText); // eslint-disable-next-line no-global-assign

            $dataMap = data;
            SoundManager.playLoad();
            SceneManager["goto"](_this13.sceneToReload());
          } catch (e) {
            alert('Failed to parse map data.');

            SceneManager._scene.refreshMapEditorWindows();
          }
        };

        xhr.onerror = function () {
          alert('Failed to load map file from disk.');

          SceneManager._scene.refreshMapEditorWindows();
        };

        xhr.send();
      }
    }, {
      key: "downloadMapshot",
      value: function downloadMapshot(bitmap, fileName) {
        var imageType = 'png';
        var imageQuality = 1;
        var urlData = bitmap.canvas.toDataURL(imageType, imageQuality);
        var strippedData = urlData.replace(/^data:image\/png;base64,/, '');
        var data = atob(strippedData);
        var buffer = new ArrayBuffer(data.length);
        var view = new Uint8Array(buffer);

        for (var i = 0; i < data.length; i++) {
          view[i] = data.charCodeAt(i) & 0xff;
        }

        var blob = new Blob([buffer], {
          type: 'application/octet-stream'
        });
        var url = URL.createObjectURL(blob);
        var iframe = document.getElementsByName('image_download')[0];

        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.setAttribute('name', 'image_download');
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }

        var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', fileName + '.png');
        element.setAttribute('target', 'image_download');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, {
      key: "exportSingleLayer",
      value: function exportSingleLayer(layerIndex) {
        var tilemap = new MapshotTileMap();
        tilemap.drawSingleLayer(layerIndex);
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Layer").concat(layerIndex + 1));
      }
    }, {
      key: "exportLowerTiles",
      value: function exportLowerTiles() {
        var tilemap = new MapshotTileMap();
        tilemap.drawLowerTiles();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Lower"));
      }
    }, {
      key: "exportUpperTiles",
      value: function exportUpperTiles() {
        var tilemap = new MapshotTileMap();
        tilemap.drawUpperTiles();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Upper"));
      }
    }, {
      key: "exportWholeMap",
      value: function exportWholeMap() {
        var tilemap = new MapshotTileMap();
        tilemap.drawLowerTiles();
        tilemap.drawUpperTiles();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3)));
      }
    }, {
      key: "exportLowEvents",
      value: function exportLowEvents() {
        var tilemap = new MapshotTileMap();
        tilemap.drawEvents(0);
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Events_0"));
      }
    }, {
      key: "exportNormalEvents",
      value: function exportNormalEvents() {
        var tilemap = new MapshotTileMap();
        tilemap.drawEvents(1);
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Events_1"));
      }
    }, {
      key: "exportHighEvents",
      value: function exportHighEvents() {
        var tilemap = new MapshotTileMap();
        tilemap.drawEvents(2);
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Events_2"));
      }
    }, {
      key: "exportAllEvents",
      value: function exportAllEvents() {
        var tilemap = new MapshotTileMap();
        tilemap.drawEvents();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Events"));
      }
    }, {
      key: "exportCustomCollision",
      value: function exportCustomCollision() {
        var tilemap = new MapshotTileMap();
        tilemap.drawCustomCollision();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_Collision"));
      }
    }, {
      key: "exportFullCollision",
      value: function exportFullCollision() {
        var tilemap = new MapshotTileMap();
        tilemap.drawDefaultCollision();
        tilemap.drawCustomCollision();
        this.downloadMapshot(tilemap, "Map".concat($gameMap._mapId.padZero(3), "_FullCollision"));
      }
    }, {
      key: "undoButton",
      value: function undoButton() {
        if (!this.isMapEditorScene()) {
          return;
        }

        if (changeHistory.length) {
          this.undoLastChange();
        }
      }
    }, {
      key: "redoButton",
      value: function redoButton() {
        if (!this.isMapEditorScene()) {
          return;
        }

        if (undoHistory.length) {
          this.redoLastUndoneChange();
        }
      }
    }, {
      key: "removeAllBlendsButton",
      value: function removeAllBlendsButton() {
        if (confirm('Are you sure you want to remove all blend effects on this map?')) {
          this.removeAllBlends();
        }
      }
    }, {
      key: "optimizeBlendsButton",
      value: function optimizeBlendsButton() {
        if (confirm('This option will remove the blend from tiles that are completely hidden by the effect and change the tile itself to transparent. Optimize now?')) {
          this.optimizeBlends();
        }
      } // eslint-disable-next-line complexity

    }, {
      key: "getCollisionSymbol",
      value: function getCollisionSymbol(x, y) {
        var downCollision = !$gameMap.isPassable(x, y, 2);
        var leftCollision = !$gameMap.isPassable(x, y, 4);
        var rightCollision = !$gameMap.isPassable(x, y, 6);
        var upCollision = !$gameMap.isPassable(x, y, 8);

        if (downCollision && leftCollision && rightCollision && upCollision) {
          return 'X';
        }

        if (!downCollision && !leftCollision && !rightCollision && !downCollision) {
          return 'O';
        }

        var collisions = '';

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
      } // eslint-disable-next-line complexity

    }, {
      key: "updateStatus",
      value: function updateStatus() {
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            tileId = _ref11.tileId,
            mapX = _ref11.mapX,
            mapY = _ref11.mapY,
            tile1 = _ref11.tile1,
            tile2 = _ref11.tile2,
            tile3 = _ref11.tile3,
            tile4 = _ref11.tile4;

        var oldTileId = statusTileId;
        var oldX = statusMapX;
        var oldY = statusMapY;
        var oldTile1 = statusTile1;
        var oldTile2 = statusTile2;
        var oldTile3 = statusTile3;
        var oldTile4 = statusTile4;
        statusTileId = tileId !== null && tileId !== void 0 ? tileId : statusTileId;
        statusMapX = mapX !== null && mapX !== void 0 ? mapX : statusMapX;
        statusMapY = mapY !== null && mapY !== void 0 ? mapY : statusMapY;
        statusTile1 = tile1 !== null && tile1 !== void 0 ? tile1 : statusTile1;
        statusTile2 = tile2 !== null && tile2 !== void 0 ? tile2 : statusTile2;
        statusTile3 = tile3 !== null && tile3 !== void 0 ? tile3 : statusTile3;
        statusTile4 = tile4 !== null && tile4 !== void 0 ? tile4 : statusTile4;
        var changedPos = oldX !== statusMapX || oldY !== statusMapY;

        if (changedPos) {
          statusRegion = $gameMap.regionId(statusMapX, statusMapY);
          statusTag = $gameMap.terrainTag(statusMapX, statusMapY);
          statusBush = $gameMap.isBush(statusMapX, statusMapY);
          statusCounter = $gameMap.isCounter(statusMapX, statusMapY);
          statusDamage = $gameMap.isDamageFloor(statusMapX, statusMapY);
          statusLadder = $gameMap.isLadder(statusMapX, statusMapY);
          statusCollision = this.getCollisionSymbol(statusMapX, statusMapY);
        }

        var changedTile = oldTile1 !== statusTile1 || oldTile2 !== statusTile2 || oldTile3 !== statusTile3 || oldTile4 !== statusTile4;
        var changed = changedTile || oldTileId !== statusTileId || changedPos;

        if (!changed) {
          return;
        }

        if (this.isMapEditorScene()) {
          SceneManager._scene._mapEditorStatus.refresh();
        }
      }
    }, {
      key: "showGridButton",
      value: function showGridButton() {
        if (!this.isMapEditorScene()) {
          return;
        }

        showGrid = !showGrid;
        this.showGridButton.checked = showGrid;

        SceneManager._scene._mapEditorGrid.refresh();
      }
    }, {
      key: "selectHigherLayer",
      value: function selectHigherLayer(x, y) {
        if (currentLayer === Layers.collisions) {
          return;
        }

        for (var z = 3; z >= 0; z--) {
          var tileIndex = this.tileIndex(x, y, z);
          var tileId = $dataMap.data[tileIndex];

          if (tileId) {
            this.changeCurrentLayer(z);
            return;
          }
        }
      }
    }, {
      key: "updateCurrentTool",
      value: function updateCurrentTool() {
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
    }, {
      key: "pencilButton",
      value: function pencilButton() {
        this.toolButton(Tools.pencil);
      }
    }, {
      key: "rectangleButton",
      value: function rectangleButton() {
        this.toolButton(Tools.rectangle);
      }
    }, {
      key: "fillButton",
      value: function fillButton() {
        this.toolButton(Tools.fill);
      }
    }, {
      key: "eraserButton",
      value: function eraserButton() {
        this.toolButton(Tools.eraser);
      }
    }, {
      key: "puzzleButton",
      value: function puzzleButton() {
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
    }, {
      key: "toolButton",
      value: function toolButton(toolType) {
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
    }, {
      key: "_doWebSave",
      value: function _doWebSave(json, fileName) {
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/plain;charset=utf-8,".concat(encodeURIComponent(json)));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, {
      key: "_doLocalSave",
      value: function _doLocalSave(json, fileName) {
        var fs = require('fs');

        var path = require('path');

        var projectFolder = path.dirname(process.mainModule.filename);
        var dataFolder = path.join(projectFolder, 'data');
        var filePath = path.join(dataFolder, fileName);
        fs.writeFileSync(filePath, json);
      }
    }, {
      key: "_makeMapJson",
      value: function _makeMapJson() {
        var _map$note;

        var map = _objectSpread(_objectSpread({}, $dataMap), {}, {
          data: _toConsumableArray($dataMap.data)
        });

        var size = map.width * map.height;
        var extraTiles = new Array(size * 4);
        var anyExtraTile = false;

        for (var i = 0; i < extraTiles.length; i++) {
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

        var extraTilesTag = '';

        if (anyExtraTile) {
          var compressed = LZString.compressToBase64(JSON.stringify(extraTiles, null, 0));
          extraTilesTag = "<CycloneExtraTiles>".concat(compressed, "</CycloneExtraTiles>");
        }

        if ((_map$note = map.note) === null || _map$note === void 0 ? void 0 : _map$note.includes('<CycloneExtraTiles>')) {
          map.note = map.note.replace(/<CycloneExtraTiles>.*<\/CycloneExtraTiles>/i, extraTilesTag);
        } else {
          var _map$note2;

          map.note = "".concat((_map$note2 = map.note) !== null && _map$note2 !== void 0 ? _map$note2 : '', "\n").concat(extraTilesTag);
        }

        return JSON.stringify(map, null, 0);
      }
    }, {
      key: "_doSave",
      value: function _doSave() {
        this.saveExtraData();
        var fileName = "Map".concat($gameMap._mapId.padZero(3), ".json");

        var json = this._makeMapJson();

        if (Utils.isNwjs()) {
          this._doLocalSave(json, fileName);
        } else {
          this._doWebSave(json, fileName);
        }

        SoundManager.playSave();
      }
    }, {
      key: "saveButton",
      value: function saveButton() {
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
    }, {
      key: "reloadButton",
      value: function reloadButton() {
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
    }, {
      key: "onKeyPress",
      value: function onKeyPress(event) {
        if (editorActive) {
          if (!Utils.isNwjs()) {
            this.checkScrollKeys(event.key);
          }
        }
      }
    }, {
      key: "checkWebShortcuts",
      value: function checkWebShortcuts(key) {
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
    }, {
      key: "checkControlKeys",
      value: function checkControlKeys(code) {
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
    }, {
      key: "onKeyUp",
      value: function onKeyUp(event) {
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
    }, {
      key: "toggleMapEditor",
      value: function toggleMapEditor() {
        if (this.resizeTimeout) {
          return;
        }

        var scene = SceneManager._scene;

        if (!this.isMapEditorScene()) {
          return;
        }

        scene.toggleMapEditor();
      }
    }, {
      key: "refreshMapEditor",
      value: function refreshMapEditor() {
        var scene = SceneManager._scene;

        if (!this.isMapEditorScene()) {
          return;
        }

        scene.refreshMapEditorWindows();
      }
    }, {
      key: "getTileIdTilesetIndex",
      value: function getTileIdTilesetIndex(tileId) {
        if (tileId !== 0) {
          if (!Tilemap.isVisibleTile(tileId)) {
            return -1;
          }
        }

        return getTilesetIndex(tileId);
      }
    }, {
      key: "getTilesetName",
      value: function getTilesetName(tileId) {
        var tileset = $gameMap.tileset();

        if (!tileset) {
          return;
        }

        var tilesetIndex = this.getTileIdTilesetIndex(tileId);

        if (tilesetIndex < 0) {
          return;
        }

        if (tilesetIndex < tileset.tilesetNames.length) {
          return tileset.tilesetNames[tilesetIndex];
        }

        if (!window.CycloneExtraTilesets) {
          return;
        }

        var extraTileset = $gameMap.extraTileset();

        if (!extraTileset) {
          return;
        }

        var extraIndex = tilesetIndex - 9;
        var newIndex = extraIndex + 5;
        return extraTileset.tilesetNames[newIndex];
      }
    }, {
      key: "loadTilesetBitmap",
      value: function loadTilesetBitmap(tileId) {
        var realFileName = this.getTilesetName(tileId);

        if (realFileName) {
          return ImageManager.loadTileset(realFileName);
        }
      }
    }, {
      key: "deselectShadowOrRegion",
      value: function deselectShadowOrRegion(newLayerIndex) {
        // coming from or to shadows/regions, then de-select the current index
        if (currentLayer === 4 || currentLayer === 5 || newLayerIndex === 4 || newLayerIndex === 5) {
          this.clearSelection();
        }
      }
    }, {
      key: "changeCurrentLayer",
      value: function changeCurrentLayer(newIndex) {
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
    }, {
      key: "changeCurrentTab",
      value: function changeCurrentTab(tabLetter) {
        currentTab = tabLetter;
        this.refreshMapEditor();
      }
    }, {
      key: "tileIndex",
      value: function tileIndex(x, y, z) {
        return (z * $gameMap.height() + y % $gameMap.height()) * $gameMap.width() + x % $gameMap.width();
      }
    }, {
      key: "indexPositionX",
      value: function indexPositionX(index, z) {
        var y = this.indexPositionY(index, z);
        return index - this.tileIndex(0, y, z);
      }
    }, {
      key: "indexPositionY",
      value: function indexPositionY(index, z) {
        return Math.floor(index / $gameMap.width() - z * $gameMap.height());
      }
    }, {
      key: "getCurrentTileAtPosition",
      value: function getCurrentTileAtPosition(x, y, z) {
        var _$dataMap$data$tileIn;

        var skipPreview = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        if (x < 0 || y < 0 || x >= $gameMap.width() || y >= $gameMap.height()) {
          return 0;
        }

        var tileIndex = this.tileIndex(x, y, z);

        if (!skipPreview) {
          if (previewChanges[tileIndex] !== undefined) {
            return previewChanges[tileIndex];
          }
        }

        return (_$dataMap$data$tileIn = $dataMap.data[tileIndex]) !== null && _$dataMap$data$tileIn !== void 0 ? _$dataMap$data$tileIn : 0;
      }
    }, {
      key: "isSameKindTile",
      value: function isSameKindTile(tileId, x, y, z) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        return Tilemap.isSameKindTile(tileId, this.getCurrentTileAtPosition(x, y, z, skipPreview));
      }
    }, {
      key: "getWallColumnTypeForPosition",
      value: function getWallColumnTypeForPosition(x, y, z, tileId) {
        var _this14 = this;

        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        // wall auto tiles need the left and right columns to have the same amount of rows for it to match
        var hasLeftColumn = true;
        var hasRightColumn = true;

        var compareWallAutoTileLine = function compareWallAutoTileLine(newY, sameCenter) {
          var leftTileId = _this14.getCurrentTileAtPosition(x - 1, newY, z, skipPreview);

          var rightTileId = _this14.getCurrentTileAtPosition(x + 1, newY, z, skipPreview);

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

        for (var newY = y; y < $gameMap.height(); y++) {
          var centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
          var sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
          compareWallAutoTileLine(newY, sameCenter);

          if (!sameCenter) {
            break;
          }
        }

        for (var _newY = y - 1; y >= 0; y--) {
          var _centerTileId = this.getCurrentTileAtPosition(x, _newY, z, skipPreview);

          var _sameCenter = Tilemap.isSameKindTile(tileId, _centerTileId);

          compareWallAutoTileLine(_newY, _sameCenter);

          if (!_sameCenter) {
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
    }, {
      key: "getWaterfallShapeForPosition",
      value: function getWaterfallShapeForPosition(x, y, z, tileId) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var left = this.isSameKindTile(tileId, x - 1, y, z, skipPreview);
        var right = this.isSameKindTile(tileId, x + 1, y, z, skipPreview);

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
    }, {
      key: "getWallShapeForPosition",
      value: function getWallShapeForPosition(x, y, z, tileId) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var columnType = this.getWallColumnTypeForPosition(x, y, z, tileId, skipPreview);
        var shape = 0;
        var above = this.isSameKindTile(tileId, x, y - 1, z, skipPreview);
        var below = this.isSameKindTile(tileId, x, y + 1, z, skipPreview);

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
    }, {
      key: "getShapeForConfiguration",
      value: function getShapeForConfiguration(configuration) {
        for (var shape = 0; shape < autoTileShapeTable.length; shape++) {
          var shapeData = autoTileShapeTable[shape];
          var valid = true;

          for (var i = 0; i < configuration.length; i++) {
            var config = shapeData[i];

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
    }, {
      key: "isAutotileMatch",
      value: function isAutotileMatch(tileId, x, y, z) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (!$gameMap.isValid(x, y)) {
          return true;
        }

        var otherTileId = this.getCurrentTileAtPosition(x, y, z, skipPreview);

        if (Tilemap.isSameKindTile(tileId, otherTileId)) {
          return true;
        }

        var specialTiles = [5, 7, 13];
        var leftKind = Tilemap.getAutotileKind(tileId);
        var rightKind = Tilemap.getAutotileKind(otherTileId);
        var leftSpecial = specialTiles.includes(leftKind);
        var rightSpecial = specialTiles.includes(rightKind);

        if (leftSpecial !== rightSpecial) {
          return true;
        }

        return false;
      }
    }, {
      key: "getAutoTileShapeForPosition",
      value: function getAutoTileShapeForPosition(x, y, z, tileId) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
          return this.getWallShapeForPosition(x, y, z, tileId, skipPreview);
        }

        if (Tilemap.isWaterfallTile(tileId)) {
          return this.getWaterfallShapeForPosition(x, y, z, tileId, skipPreview);
        }

        var a = this.isAutotileMatch(tileId, x - 1, y - 1, z, skipPreview);
        var b = this.isAutotileMatch(tileId, x, y - 1, z, skipPreview);
        var c = this.isAutotileMatch(tileId, x + 1, y - 1, z, skipPreview);
        var d = this.isAutotileMatch(tileId, x - 1, y, z, skipPreview);
        var e = this.isAutotileMatch(tileId, x + 1, y, z, skipPreview);
        var f = this.isAutotileMatch(tileId, x - 1, y + 1, z, skipPreview);
        var g = this.isAutotileMatch(tileId, x, y + 1, z, skipPreview);
        var h = this.isAutotileMatch(tileId, x + 1, y + 1, z, skipPreview);
        var config = [a, b, c, d, e, f, g, h];
        return this.getShapeForConfiguration(config);
      }
    }, {
      key: "isShiftMapping",
      value: function isShiftMapping() {
        if (Input.isPressed('shift')) {
          return true;
        }

        if (SceneManager._scene._mapEditorWindow._manualTileSelected !== undefined) {
          return true;
        }

        return false;
      }
    }, {
      key: "changeAutoTileShapeForPosition",
      value: function changeAutoTileShapeForPosition(x, y, z, tileId) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (z >= 4 || this.isShiftMapping()) {
          return tileId;
        }

        var shape = this.getAutoTileShapeForPosition(x, y, z, tileId, skipPreview);
        return Tilemap.TILE_ID_A1 + Math.floor((tileId - Tilemap.TILE_ID_A1) / 48) * 48 + shape;
      }
    }, {
      key: "resetTileShape",
      value: function resetTileShape(x, y, z) {
        var previewOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (x < 0 || x >= $gameMap.width()) {
          return;
        }

        if (y < 0 || y >= $gameMap.height()) {
          return;
        }

        var tileId = this.getCurrentTileAtPosition(x, y, z, !previewOnly);

        if (Tilemap.isAutotile(tileId)) {
          var effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, !previewOnly);

          if (tileId !== effectiveTileId) {
            this.setMapTile(x, y, z, effectiveTileId, false, previewOnly);
          }
        }
      }
    }, {
      key: "resetCurrentChange",
      value: function resetCurrentChange() {
        currentChange = {
          tiles: {},
          collision: {},
          blend: {},
          puzzle: {}
        };
      }
    }, {
      key: "undoLastChange",
      value: function undoLastChange() {
        if (this.changingTileProps) {
          return;
        }

        if (changeHistory.length === 0) {
          SoundManager.playBuzzer();
          return;
        }

        var lastChange = changeHistory.pop();
        this.resetCurrentChange();
        var size = $gameMap.tileWidth() * $gameMap.tileHeight();

        for (var tileIndex in lastChange.tiles) {
          currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
          $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
        }

        for (var _tileIndex in lastChange.puzzle) {
          currentChange.puzzle[_tileIndex] = CycloneMagic.puzzleTiles[_tileIndex];
          CycloneMagic.puzzleTiles[_tileIndex] = lastChange.puzzle[_tileIndex];
        }

        for (var _tileIndex2 in lastChange.collision) {
          currentChange.collision[_tileIndex2] = customCollisionTable[_tileIndex2];
          customCollisionTable[_tileIndex2] = lastChange.collision[_tileIndex2];
        }

        for (var _tileIndex3 in lastChange.blend) {
          if (!tileBlendingTable[_tileIndex3]) {
            var buffer = new ArrayBuffer(size);
            tileBlendingTable[_tileIndex3] = new Int8Array(buffer);
          }

          var tilePixels = tileBlendingTable[_tileIndex3];
          currentChange.blend[_tileIndex3] = {};

          for (var pixelIndex in lastChange.blend[_tileIndex3]) {
            currentChange.blend[_tileIndex3][pixelIndex] = tilePixels[pixelIndex];
            tilePixels[pixelIndex] = lastChange.blend[_tileIndex3][pixelIndex];
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
    }, {
      key: "redoLastUndoneChange",
      value: function redoLastUndoneChange() {
        if (this.changingTileProps) {
          return;
        }

        if (undoHistory.length === 0) {
          SoundManager.playBuzzer();
          return;
        }

        var lastChange = undoHistory.pop();
        var size = $gameMap.tileWidth() * $gameMap.tileHeight();
        this.resetCurrentChange();
        var needsSaving = false;

        for (var tileIndex in lastChange.tiles) {
          currentChange.tiles[tileIndex] = $dataMap.data[tileIndex];
          $dataMap.data[tileIndex] = lastChange.tiles[tileIndex];
        }

        for (var _tileIndex4 in lastChange.puzzle) {
          currentChange.puzzle[_tileIndex4] = CycloneMagic.puzzleTiles[_tileIndex4];
          CycloneMagic.puzzleTiles[_tileIndex4] = lastChange.puzzle[_tileIndex4];
        }

        for (var _tileIndex5 in lastChange.collision) {
          currentChange.collision[_tileIndex5] = customCollisionTable[_tileIndex5];
          customCollisionTable[_tileIndex5] = lastChange.collision[_tileIndex5];
          needsSaving = true;
        }

        for (var _tileIndex6 in lastChange.blend) {
          if (!tileBlendingTable[_tileIndex6]) {
            var buffer = new ArrayBuffer(size);
            tileBlendingTable[_tileIndex6] = new Int8Array(buffer);
          }

          var tilePixels = tileBlendingTable[_tileIndex6];
          currentChange.blend[_tileIndex6] = {};

          for (var pixelIndex in lastChange.blend[_tileIndex6]) {
            currentChange.blend[_tileIndex6][pixelIndex] = tilePixels[pixelIndex];
            tilePixels[pixelIndex] = lastChange.blend[_tileIndex6][pixelIndex];
            needsSaving = true;
          }
        }

        this.logChange(false);

        if (needsSaving) {
          saveExtraData(true);
        }

        this.refreshTilemap();
      }
    }, {
      key: "getCurrentLayerChangeType",
      value: function getCurrentLayerChangeType() {
        switch (currentLayer) {
          case Layers.collisions:
            return 'collision';

          case Layers.blend:
            return 'blend';

          default:
            return 'tile';
        }
      }
    }, {
      key: "logChange",
      value: function logChange() {
        var clearUndo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!currentChange) {
          return;
        }

        var hasTiles = Object.keys(currentChange.tiles).length > 0;
        var hasBlend = Object.keys(currentChange.blend).length > 0;
        var hasCollision = Object.keys(currentChange.collision).length > 0;
        var hasPuzzle = Object.keys(currentChange.puzzle).length > 0;
        var hasChanges = hasTiles || hasBlend || hasCollision || hasPuzzle;

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
    }, {
      key: "maybeUpdateTileNeighbors",
      value: function maybeUpdateTileNeighbors(x, y, z) {
        var expectedUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (this.isShiftMapping()) {
          return;
        }

        if (!expectedUpdate) {
          return;
        }

        this.resetTileShape(x - 1, y - 1, z, previewOnly);
        this.resetTileShape(x, y - 1, z, previewOnly);
        this.resetTileShape(x + 1, y - 1, z, previewOnly);
        this.resetTileShape(x - 1, y, z, previewOnly);
        this.resetTileShape(x + 1, y, z, previewOnly);
        this.resetTileShape(x - 1, y + 1, z, previewOnly);
        this.resetTileShape(x, y + 1, z, previewOnly);
        this.resetTileShape(x + 1, y + 1, z, previewOnly);
      }
    }, {
      key: "getDefaultLayerForTileId",
      value: function getDefaultLayerForTileId(tileId) {
        if (!Tilemap.isAutotile(tileId)) {
          return 3;
        }

        if (tileId >= Tilemap.TILE_ID_A3) {
          return 0;
        }

        var kind = Tilemap.getAutotileKind(tileId);

        if (highLayerAutotiles.includes(kind)) {
          return 1;
        }

        return 0;
      }
    }, {
      key: "getItemsToChange",
      value: function getItemsToChange(x, y, z, tileId) {
        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var updateHigherLayers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

        if (z !== 7) {
          return [{
            x: x,
            y: y,
            z: z,
            tileId: tileId
          }];
        } // When using automatic mode, we may need to change more than one layer at the same time


        var items = [];
        var layerId = this.getDefaultLayerForTileId(tileId);

        if (layerId === 1 && Tilemap.isTileA1(tileId)) {
          items.push({
            x: x,
            y: y,
            z: 0,
            tileId: Tilemap.TILE_ID_A1
          });
        }

        if (layerId === 3) {
          // If there's already something on the fourth layer, then move it to the third and place the new tile on the 4th
          var currentTile = this.getCurrentTileAtPosition(x, y, 3, skipPreview);

          if (currentTile === tileId && tileId !== 0) {
            return [];
          }

          if (currentTile) {
            items.push({
              x: x,
              y: y,
              z: 2,
              tileId: currentTile
            });
          }
        }

        items.push({
          x: x,
          y: y,
          z: layerId,
          tileId: tileId
        }); // Remove anything above the new tile

        if (updateHigherLayers) {
          for (var i = layerId + 1; i <= 3; i++) {
            items.push({
              x: x,
              y: y,
              z: i,
              tileId: 0
            });
          }
        }

        return items;
      }
    }, {
      key: "canEraseLayer",
      value: function canEraseLayer(layerIndex) {
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
        } // The lower layers can only be erased with the pen in auto mode when there are multiple layers selected


        return false;
      }
    }, {
      key: "_eraseSingleLayerTile",
      value: function _eraseSingleLayerTile(x, y, z) {
        var updateNeighbors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var forceErasure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        if (!forceErasure && !this.canEraseLayer(z)) {
          return;
        }

        var tileIndex = this.tileIndex(x, y, z);

        if (previewOnly) {
          previewChanges[tileIndex] = 0;
        } else {
          var oldTile = $dataMap.data[tileIndex];

          if (currentChange.tiles[tileIndex] === undefined && oldTile !== 0) {
            currentChange.tiles[tileIndex] = oldTile;
          }

          $dataMap.data[tileIndex] = 0;
        }
      }
    }, {
      key: "_eraseSingleMapTile",
      value: function _eraseSingleMapTile(x, y, z) {
        var updateNeighbors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var forceErasure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        if (z > 3 && z !== Layers.auto) {
          this._eraseSingleLayerTile(x, y, z, updateNeighbors, previewOnly, forceErasure);

          return;
        }

        for (var newZ = 0; newZ <= 3; newZ++) {
          if (newZ !== z && z !== Layers.auto) {
            continue;
          }

          this._eraseSingleLayerTile(x, y, newZ, updateNeighbors, previewOnly, forceErasure);

          this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
        }
      } // eslint-disable-next-line complexity

    }, {
      key: "_getBlockCollision",
      value: function _getBlockCollision(i, j, count, tileId) {
        if (tileId <= 3) {
          return tileId;
        }

        var goesUp = false;
        var goesDown = false;
        var goesRight = false;
        var goesLeft = false;

        if (tileId >= 20) {
          var d = tileId - 20;
          goesUp = !DirectionHelper.goesUp(d);
          goesDown = !DirectionHelper.goesDown(d);
          goesLeft = !DirectionHelper.goesLeft(d);
          goesRight = !DirectionHelper.goesRight(d);
        } else if (tileId > 10) {
          var _d = tileId - 10;

          goesUp = DirectionHelper.goesUp(_d);
          goesDown = DirectionHelper.goesDown(_d);
          goesLeft = DirectionHelper.goesLeft(_d);
          goesRight = DirectionHelper.goesRight(_d);
        } else if (tileId === 4) {
          goesUp = true;
          goesDown = true;
        } else if (tileId === 5) {
          goesLeft = true;
          goesRight = true;
        }

        var up = goesUp && j === 0;
        var down = goesDown && j === count - 1;
        var left = goesLeft && i === 0;
        var right = goesRight && i === count - 1;

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
    }, {
      key: "_applySingleCollision",
      value: function _applySingleCollision(x, y, tileId) {
        var previewOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (previewOnly) {
          return;
        }

        var gridRatio = this.getGridRatio();
        var count = 4 / gridRatio;

        for (var i = 0; i < count; i++) {
          for (var j = 0; j < count; j++) {
            var intX = Math.floor(x * 4) + i;
            var intY = Math.floor(y * 4) + j;
            var height = $gameMap.height() * 4;
            var width = $gameMap.width() * 4;
            var index = intY % height * width + intX % width;

            var blockCollision = this._getBlockCollision(i, j, count, tileId);

            var oldTile = customCollisionTable[index] || 0;

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
    }, {
      key: "_changePixelPositionBlend",
      value: function _changePixelPositionBlend(x, y, px, py, newBlend) {
        var _currentChange$blend$, _table$pixelIndex;

        var previewOnly = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var fx = Math.floor(x) + Math.floor(px / tileWidth);
        var fy = Math.floor(y) + Math.floor(py / tileHeight);
        var pixelX = px % tileWidth;
        var pixelY = py % tileHeight;

        if (fx < 0 || fx >= $gameMap.width()) {
          return;
        }

        if (fy < 0 || fy >= $gameMap.height()) {
          return;
        }

        var tileIndex = this.tileIndex(fx, fy, 0);
        var size = tileWidth * tileHeight;
        var fullTable = previewOnly ? window.CycloneMagic.tileBlendingTable : tileBlendingTable;

        if (!fullTable[tileIndex]) {
          var buffer = new ArrayBuffer(size);
          fullTable[tileIndex] = new Int8Array(buffer);
        }

        var table = fullTable[tileIndex];
        var pixelIndex = pixelY * tileWidth + pixelX;

        if (((_currentChange$blend$ = currentChange.blend[tileIndex]) === null || _currentChange$blend$ === void 0 ? void 0 : _currentChange$blend$[pixelIndex]) === undefined && ((_table$pixelIndex = table[pixelIndex]) !== null && _table$pixelIndex !== void 0 ? _table$pixelIndex : 0) !== newBlend) {
          var _table$pixelIndex2;

          if (currentChange.blend[tileIndex] === undefined) {
            currentChange.blend[tileIndex] = {};
          }

          currentChange.blend[tileIndex][pixelIndex] = (_table$pixelIndex2 = table[pixelIndex]) !== null && _table$pixelIndex2 !== void 0 ? _table$pixelIndex2 : 0;
        }

        table[pixelIndex] = newBlend;
      }
    }, {
      key: "_changePositionBlend",
      value: function _changePositionBlend(x, y, newBlend) {
        var fx = Math.floor(x);
        var fy = Math.floor(y);
        var tileIndex = this.tileIndex(fx, fy, 0);
        var gridRatio = this.getGridRatio();
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var size = tileWidth * tileHeight;

        if (!tileBlendingTable[tileIndex]) {
          var buffer = new ArrayBuffer(size);
          tileBlendingTable[tileIndex] = new Int8Array(buffer);
        }

        var table = tileBlendingTable[tileIndex];
        var subX = x - fx;
        var subY = y - fy;
        var leftPx = Math.round(subX * tileWidth);
        var topPx = Math.round(subY * tileHeight);
        var blockWidth = Math.floor(tileWidth / gridRatio);
        var blockHeight = Math.floor(tileHeight / gridRatio);
        var rightPx = leftPx + blockWidth;
        var bottomPx = topPx + blockHeight;

        for (var px = leftPx; px < rightPx; px++) {
          for (var py = topPx; py < bottomPx; py++) {
            var _currentChange$blend$2, _table$pixelIndex3;

            var pixelIndex = py * tileWidth + px;

            if (((_currentChange$blend$2 = currentChange.blend[tileIndex]) === null || _currentChange$blend$2 === void 0 ? void 0 : _currentChange$blend$2[pixelIndex]) === undefined && ((_table$pixelIndex3 = table[pixelIndex]) !== null && _table$pixelIndex3 !== void 0 ? _table$pixelIndex3 : 0) !== newBlend) {
              var _table$pixelIndex4;

              if (currentChange.blend[tileIndex] === undefined) {
                currentChange.blend[tileIndex] = {};
              }

              currentChange.blend[tileIndex][pixelIndex] = (_table$pixelIndex4 = table[pixelIndex]) !== null && _table$pixelIndex4 !== void 0 ? _table$pixelIndex4 : 0;
            }

            table[pixelIndex] = newBlend;
          }
        }
      }
    }, {
      key: "isPositionBlendSpriteReady",
      value: function isPositionBlendSpriteReady(x, y) {
        var _SceneManager$_scene$;

        if (!((_SceneManager$_scene$ = SceneManager._scene._spriteset) === null || _SceneManager$_scene$ === void 0 ? void 0 : _SceneManager$_scene$._blenderTileSprites)) {
          return false;
        }

        var _iterator12 = _createForOfIteratorHelper(SceneManager._scene._spriteset._blenderTileSprites),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var sprite = _step12.value;

            if (sprite._mapX === x && sprite._mapY === y) {
              return true;
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        return false;
      }
    }, {
      key: "forceBlenderRefresh",
      value: function forceBlenderRefresh() {
        var _SceneManager$_scene$2;

        var hardRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!window.CycloneMagic) {
          return;
        }

        ((_SceneManager$_scene$2 = SceneManager._scene._spriteset) === null || _SceneManager$_scene$2 === void 0 ? void 0 : _SceneManager$_scene$2.forceBlenderRefresh) && SceneManager._scene._spriteset.forceBlenderRefresh(hardRefresh);
      }
    }, {
      key: "buildSmallCircle",
      value: function buildSmallCircle() {
        var width = tileWidth / 4;
        var height = tileHeight / 4;
        var bitmap = new Bitmap(width, height);
        bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
        bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 2, '#00FF00');
        var imageData = bitmap.context.getImageData(0, 0, width, height);
        smallCircleData = imageData.data;
      }
    }, {
      key: "buildCircle",
      value: function buildCircle() {
        var width = tileWidth / 2;
        var height = tileHeight / 2;
        var bitmap = new Bitmap(width, height);
        bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, '#0000FF');
        bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2 - 4, '#00FF00');
        var imageData = bitmap.context.getImageData(0, 0, width, height);
        circleData = imageData.data;
      }
    }, {
      key: "getCircleData",
      value: function getCircleData() {
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
    }, {
      key: "optimizeBlends",
      value: function optimizeBlends() {
        this.resetCurrentChange();

        for (var _x7 = 0; _x7 < $gameMap.width(); _x7++) {
          for (var y = 0; y < $gameMap.height(); y++) {
            this.optimizeTileBlend(_x7, y);
          }
        }

        this.logChange(true);
      }
    }, {
      key: "removeAllBlends",
      value: function removeAllBlends() {
        this.resetCurrentChange();

        for (var _x8 = 0; _x8 < $gameMap.width(); _x8++) {
          for (var y = 0; y < $gameMap.height(); y++) {
            this.removeTileBlend(_x8, y, false);
          }
        }

        this.logChange(true);
      }
    }, {
      key: "optimizeTileBlend",
      value: function optimizeTileBlend(x, y) {
        var fx = Math.floor(x);
        var fy = Math.floor(y);

        if (fx < 0 || fx >= $gameMap.width()) {
          return;
        }

        if (fy < 0 || fy >= $gameMap.height()) {
          return;
        }

        var tileIndex = this.tileIndex(fx, fy, 0);

        if (!tileBlendingTable[tileIndex]) {
          return;
        }

        var hasZero = tileBlendingTable[tileIndex].includes(0);
        var hasOne = tileBlendingTable[tileIndex].includes(1);

        if (hasZero === hasOne) {
          return;
        } // If it's all blended, then remove whatever tile is on layer 2


        if (hasOne) {
          this._applySingleMapTile(x, y, 1, 0, false, false, true);
        }

        currentChange.blend[tileIndex] = tileBlendingTable[tileIndex];
        delete tileBlendingTable[tileIndex];
      }
    }, {
      key: "removeTileBlend",
      value: function removeTileBlend(x, y) {
        var previewOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (previewOnly && !window.CycloneMagic) {
          return;
        }

        var fx = Math.floor(x);
        var fy = Math.floor(y);

        if (fx < 0 || fx >= $gameMap.width()) {
          return;
        }

        if (fy < 0 || fy >= $gameMap.height()) {
          return;
        }

        var tileIndex = this.tileIndex(fx, fy, 0);

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
    }, {
      key: "_applyBlendBrush",
      value: function _applyBlendBrush(x, y) {
        var previewOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (previewOnly && !window.CycloneMagic) {
          return;
        }

        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var divider = Input.isPressed('shift') ? 4 : 2;
        var width = tileWidth / divider;
        var height = tileHeight / divider;
        var pixels = this.getCircleData();
        var index = -1;
        var tileX = Math.floor(x);
        var tileY = Math.floor(y);
        var pixelX = Math.floor((x - tileX) * tileWidth);
        var pixelY = Math.floor((y - tileY) * tileHeight);
        var newBlend = currentTool === Tools.eraser ? 0 : 1;

        for (var py = 0; py < height; py++) {
          for (var px = 0; px < width; px++) {
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
            var maxTileX = tileX + Math.floor((pixelX + width) / tileWidth);
            var maxTileY = tileY + Math.floor((pixelY + height) / tileHeight);

            if (window.CycloneMagic) {
              for (var cacheX = tileX; cacheX <= maxTileX; cacheX++) {
                for (var cacheY = tileY; cacheY <= maxTileY; cacheY++) {
                  window.CycloneMagic.clearPositionCache(cacheX, cacheY);
                }
              }
            }

            forceBlenderRefresh();
          }
        }
      }
    }, {
      key: "_applySingleBlend",
      value: function _applySingleBlend(x, y) {
        if (currentTool === Tools.eraser) {
          this._changePositionBlend(x, y, 0);

          return;
        }

        this._changePositionBlend(x, y, 1);
      }
    }, {
      key: "_applyPuzzleTile",
      value: function _applyPuzzleTile(x, y, tileId, previewOnly) {
        var _window$CycloneMagic2, _CycloneMagic$puzzleT;

        if (!((_window$CycloneMagic2 = window.CycloneMagic) === null || _window$CycloneMagic2 === void 0 ? void 0 : _window$CycloneMagic2.puzzleTiles)) {
          return;
        }

        if (previewOnly) {
          return;
        }

        var width = $gameMap.width() * 2;
        var index = y * 2 * width + x * 2;
        var oldTile = (_CycloneMagic$puzzleT = CycloneMagic.puzzleTiles[index]) !== null && _CycloneMagic$puzzleT !== void 0 ? _CycloneMagic$puzzleT : 0;

        if (currentChange.puzzle[index] === undefined && oldTile !== tileId) {
          currentChange.puzzle[index] = oldTile;
        }

        if (tileId) {
          CycloneMagic.puzzleTiles[index] = tileId;
        } else if (CycloneMagic.puzzleTiles[index]) {
          delete CycloneMagic.puzzleTiles[index];
        }
      }
    }, {
      key: "_applySingleMapTile",
      value: function _applySingleMapTile(x, y, z, tileId) {
        var updateNeighbors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var previewOnly = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var forceErasure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

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

        var itemsToChange = this.getItemsToChange(x, y, z, tileId, !previewOnly, updateNeighbors);

        var _iterator13 = _createForOfIteratorHelper(itemsToChange),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var _step13$value = _step13.value,
                _x9 = _step13$value.x,
                _y = _step13$value.y,
                _z = _step13$value.z,
                _tileId = _step13$value.tileId;

            if (_z > 5) {
              continue;
            }

            var tileIndex = this.tileIndex(_x9, _y, _z);
            var effectiveTileId = _tileId;

            if (Tilemap.isAutotile(_tileId)) {
              effectiveTileId = this.changeAutoTileShapeForPosition(_x9, _y, _z, _tileId, false);
            }

            if (_z === 1) {
              this.removeTileBlend(_x9, _y, previewOnly);
            }

            if (previewOnly) {
              previewChanges[tileIndex] = effectiveTileId;
            } else {
              var oldTile = $dataMap.data[tileIndex];

              if (currentChange.tiles[tileIndex] === undefined && oldTile !== effectiveTileId) {
                currentChange.tiles[tileIndex] = oldTile;
              }

              $dataMap.data[tileIndex] = effectiveTileId;
            }

            this.maybeUpdateTileNeighbors(_x9, _y, _z, updateNeighbors, previewOnly);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
    }, {
      key: "setMapTile",
      value: function setMapTile(x, y, z, tileId) {
        var updateNeighbors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var previewOnly = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

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
          if (tileId === undefined) {
            return;
          }

          if (tileId === 0 && !this.canEraseLayer(z)) {
            return;
          }
        }

        this._applySingleMapTile(x, y, z, tileId, updateNeighbors, previewOnly);
      }
    }, {
      key: "getSelectedTileIndex",
      value: function getSelectedTileIndex(col, row) {
        if (currentTool === 'eraser') {
          return;
        }

        if (currentTileId === undefined) {
          return;
        }

        if (selectedTileList.length < tileCols * tileRows) {
          return;
        }

        var realCol = col % tileCols;
        var realRow = row % tileRows;
        return realRow * tileCols + realCol;
      }
    }, {
      key: "getSelectedTileCell",
      value: function getSelectedTileCell(col, row) {
        var index = this.getSelectedTileIndex(col, row);

        if (index || index === 0) {
          return selectedTileList[index];
        }
      }
    }, {
      key: "setSelectionTileMaybeMultiLayer",
      value: function setSelectionTileMaybeMultiLayer(tileX, tileY, selectionCol, selectionRow) {
        var _effectiveLayer;

        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var effectiveLayer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
        effectiveLayer = (_effectiveLayer = effectiveLayer) !== null && _effectiveLayer !== void 0 ? _effectiveLayer : currentLayer;
        var index = this.getSelectedTileIndex(selectionCol, selectionRow);

        if (effectiveLayer === 7 && multiLayerSelection.length) {
          for (var z = 0; z <= 3; z++) {
            var _multiLayerSelection$;

            var tileId = (_multiLayerSelection$ = multiLayerSelection[z][index]) !== null && _multiLayerSelection$ !== void 0 ? _multiLayerSelection$ : 0;
            this.setMapTile(tileX, tileY, z, tileId, true, previewOnly);
          }
        } else {
          var _selectedTileList$ind;

          var _tileId2 = (_selectedTileList$ind = selectedTileList[index]) !== null && _selectedTileList$ind !== void 0 ? _selectedTileList$ind : 0;

          this.setMapTile(tileX, tileY, effectiveLayer, _tileId2, true, previewOnly);

          if (effectiveLayer === 2 && currentLayer === 7 && currentTool === 'eraser') {
            this.setMapTile(tileX, tileY, 3, 0, true, previewOnly);
          }
        }
      }
    }, {
      key: "canApplyRectangle",
      value: function canApplyRectangle() {
        return currentTileId !== undefined || currentTool === 'eraser' || currentLayer === Layers.blend;
      }
    }, {
      key: "isAutoEraser",
      value: function isAutoEraser() {
        return currentLayer === Layers.auto && currentTool === 'eraser' && !Input.isPressed('shift');
      }
    }, {
      key: "getHighestLayerOnArea",
      value: function getHighestLayerOnArea(startX, startY, width, height) {
        var _this15 = this;

        var highestLayer = function () {
          for (var z = 3; z >= 1; z--) {
            for (var tileY = startY; tileY < startY + height; tileY++) {
              for (var tileX = startX; tileX < startX + width; tileX++) {
                var tileIndex = _this15.tileIndex(tileX, tileY, z);

                var tileId = $dataMap.data[tileIndex];

                if (tileId > 0) {
                  return z;
                }
              }
            }
          }

          return 0;
        }();

        if (highestLayer === 3 && Input.isPressed('control')) {
          return 2;
        }

        return highestLayer;
      }
    }, {
      key: "applyRectangle",
      value: function applyRectangle(startX, startY, width, height) {
        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        if (!this.canApplyRectangle()) {
          return;
        }

        this.ensureLayerVisibility();
        var gridRatio = this.getGridRatio();
        var initialRow = 0;
        var initialCol = 0;
        var rowIncrement = 1;
        var colIncrement = 1;

        if (rectangleBackWidth > 0) {
          initialCol = width * gridRatio - 1;
          colIncrement *= -1;
        }

        if (rectangleBackHeight > 0) {
          initialRow = height * gridRatio - 1;
          rowIncrement *= -1;
        }

        var selectionRow = initialRow;
        var selectionCol = initialCol;

        if (previewOnly) {
          previewChanges = {};
        } else {
          this.resetCurrentChange();
        }

        var effectiveLayer = currentLayer;

        if (this.isAutoEraser()) {
          effectiveLayer = this.getHighestLayerOnArea(startX, startY, width, height);
        }

        var tileIncrement = 1 / gridRatio;

        for (var tileY = startY; tileY < startY + height; tileY += tileIncrement) {
          selectionCol = initialCol;

          for (var tileX = startX; tileX < startX + width; tileX += tileIncrement) {
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
    }, {
      key: "maybeRefreshGrid",
      value: function maybeRefreshGrid() {
        if (currentLayer !== Layers.regions) {
          return;
        }

        refreshGrid();
      }
    }, {
      key: "refreshTilemap",
      value: function refreshTilemap() {
        previewChanges = {};

        if (currentLayer === Layers.collisions || currentLayer === Layers.blend) {
          saveExtraData(true);
        }

        if (TouchInput.isLongPressed()) {
          _refreshTilemap();
        } else {
          SceneManager._scene._spriteset._tilemap.refresh();
        }

        refreshGrid();
      }
    }, {
      key: "copyAutoRectangle",
      value: function copyAutoRectangle(startX, startY, width, height) {
        var _this16 = this;

        for (var z = 0; z <= 3; z++) {
          multiLayerSelection[z] = Array(width * height);
        }

        this.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
          for (var _z2 = 0; _z2 <= 3; _z2++) {
            var tileIndex = _this16.tileIndex(tileX, tileY, _z2);

            multiLayerSelection[_z2][index] = $dataMap.data[tileIndex] || 0;
            selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;

            if (currentTileId === undefined) {
              currentTileId = selectedTileList[index];
            }
          }
        });
      }
    }, {
      key: "_selectTileIfNoneSelectedYet",
      value: function _selectTileIfNoneSelectedYet(tileId) {
        if (currentTileId === undefined) {
          currentTileId = tileId;
        }
      }
    }, {
      key: "_shouldSkipRemainingLayersCopy",
      value: function _shouldSkipRemainingLayersCopy(foundAny, z) {
        if (!foundAny) {
          return false;
        }

        if (Input.isPressed('control')) {
          return z !== 3;
        }

        return true;
      }
    }, {
      key: "iterateRectangle",
      value: function iterateRectangle(startX, startY, width, height, fn) {
        var index = 0;

        for (var tileY = startY; tileY < startY + height; tileY++) {
          for (var tileX = startX; tileX < startX + width; tileX++) {
            fn(tileX, tileY, index);
            index++;
          }
        }
      }
    }, {
      key: "copyHigherAutoRectangle",
      value: function copyHigherAutoRectangle(startX, startY, width, height) {
        var _this17 = this;

        for (var z = 0; z <= 3; z++) {
          multiLayerSelection[z] = Array(width * height);
        }

        var foundAny = false;

        var _loop2 = function _loop2(_z3) {
          if (!_this17.isLayerVisible(_z3)) {
            return "continue";
          }

          _this17.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
            var tileIndex = _this17.tileIndex(tileX, tileY, _z3);

            multiLayerSelection[_z3][index] = $dataMap.data[tileIndex] || 0;
            selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;

            _this17._selectTileIfNoneSelectedYet(selectedTileList[index]);

            if ($dataMap.data[tileIndex]) {
              foundAny = true;
            }
          });

          if (_this17._shouldSkipRemainingLayersCopy(foundAny, _z3)) {
            return {
              v: void 0
            };
          }
        };

        for (var _z3 = 3; _z3 >= 0; _z3--) {
          var _ret2 = _loop2(_z3);

          if (_ret2 === "continue") continue;
          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }
    }, {
      key: "copyHigherRectangle",
      value: function copyHigherRectangle(startX, startY, width, height) {
        var _this18 = this;

        var foundAny = false;

        var _loop3 = function _loop3(z) {
          if (!_this18.isLayerVisible(z)) {
            return "continue";
          }

          _this18.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
            var tileIndex = _this18.tileIndex(tileX, tileY, z);

            selectedTileList[index] = selectedTileList[index] || $dataMap.data[tileIndex] || 0;

            _this18._selectTileIfNoneSelectedYet(selectedTileList[index]);

            if ($dataMap.data[tileIndex]) {
              foundAny = true;
            }
          });

          if (_this18._shouldSkipRemainingLayersCopy(foundAny, z)) {
            return {
              v: void 0
            };
          }
        };

        for (var z = 3; z >= 0; z--) {
          var _ret3 = _loop3(z);

          if (_ret3 === "continue") continue;
          if (_typeof(_ret3) === "object") return _ret3.v;
        }
      }
    }, {
      key: "copyManualRectangle",
      value: function copyManualRectangle(startX, startY, width, height) {
        var _this19 = this;

        this.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
          var tileIndex = _this19.tileIndex(tileX, tileY, currentLayer);

          selectedTileList[index] = $dataMap.data[tileIndex] || 0;

          _this19._selectTileIfNoneSelectedYet(selectedTileList[index]);
        });
      }
    }, {
      key: "copyRectangle",
      value: function copyRectangle(startX, startY, width, height) {
        if (puzzleMode) {
          return;
        }

        if (!wasRightButtonDown) {
          return;
        }

        if (currentLayer === Layers.collisions) {
          return;
        }

        var gridRatio = this.getGridRatio();
        multiLayerSelection = [];
        selectedTileList = Array(width * gridRatio * (height * gridRatio));
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
    }, {
      key: "restoreLastDrawingTool",
      value: function restoreLastDrawingTool() {
        if (lastDrawingTool === 'rectangle') {
          this.rectangleButton();
        } else {
          this.pencilButton();
        }
      }
    }, {
      key: "isSameKindTileCurrentLayer",
      value: function isSameKindTileCurrentLayer(layers, index) {
        var size = $gameMap.width() * $gameMap.height();

        if (currentLayer > 3) {
          for (var z = 0; z <= 3; z++) {
            var _tileId3 = $dataMap.data[index + z * size];

            if (!Tilemap.isSameKindTile(_tileId3, layers[z])) {
              return false;
            }
          }

          return true;
        }

        var tileId = $dataMap.data[index];
        return Tilemap.isSameKindTile(layers[currentLayer], tileId);
      }
    }, {
      key: "_maybeValidateTileIndexForCollectionList",
      value: function _maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds) {
        if (area[index] !== undefined) {
          return;
        }

        var height = $gameMap.height();
        var width = $gameMap.width();
        area[index] = this.isSameKindTileCurrentLayer(initialTileIds, index);

        if (!area[index]) {
          return;
        }

        var workLayer = currentLayer <= 3 ? currentLayer : 0;
        var y = this.indexPositionY(index, workLayer);
        var x = index - this.tileIndex(0, y, workLayer);
        var leftIndex = x > 0 ? this.tileIndex(x - 1, y, workLayer) : -1;
        var rightIndex = x < width - 1 ? this.tileIndex(x + 1, y, workLayer) : -1;
        var upIndex = y > 0 ? this.tileIndex(x, y - 1, workLayer) : -1;
        var downIndex = y < height - 1 ? this.tileIndex(x, y + 1, workLayer) : -1;

        var maybeAddIndex = function maybeAddIndex(index) {
          if (index >= 0 && !list.includes(index)) {
            list.push(index);
          }
        };

        maybeAddIndex(leftIndex);
        maybeAddIndex(rightIndex);
        maybeAddIndex(upIndex);
        maybeAddIndex(downIndex);
      }
    }, {
      key: "collectFillAreaFrom",
      value: function collectFillAreaFrom(mapX, mapY) {
        var list = [];
        var initialTileIds = [];
        var area = {};

        if (currentLayer === Layers.auto || currentLayer < 4) {
          for (var z = 0; z <= 3; z++) {
            var tileIndex = this.tileIndex(mapX, mapY, z);
            initialTileIds[z] = $dataMap.data[tileIndex];

            if (z === currentLayer || currentLayer === 7 && z === 0) {
              list.push(tileIndex);
            }
          }

          for (var i = 0; i < list.length; i++) {
            var index = list[i];

            this._maybeValidateTileIndexForCollectionList(list, index, area, initialTileIds);
          }
        }

        return Object.keys(area).filter(function (key) {
          return area[key];
        });
      }
    }, {
      key: "applyFillArea",
      value: function applyFillArea(mapX, mapY) {
        if (currentTileId === undefined) {
          return;
        }

        this.ensureLayerVisibility();
        var affectedArea = this.collectFillAreaFrom(mapX, mapY);
        var height = $gameMap.height();
        var width = $gameMap.width();
        var workLayer = currentLayer <= 3 ? currentLayer : 0;
        this.resetCurrentChange();

        var _iterator14 = _createForOfIteratorHelper(affectedArea),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var tileIndex = _step14.value;
            var y = this.indexPositionY(tileIndex, workLayer);

            var _x10 = tileIndex - this.tileIndex(0, y, workLayer);

            var xDiff = (_x10 + width - mapX) % tileCols;
            var yDiff = (y + height - mapY) % tileRows;
            this.setSelectionTileMaybeMultiLayer(_x10, y, xDiff, yDiff, false);
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }

        this.logChange();
        this.refreshTilemap();
      }
    }, {
      key: "ensureLayerVisibility",
      value: function ensureLayerVisibility() {
        if (!layerVisibility[currentLayer]) {
          layerVisibility[currentLayer] = true;

          if (this.isMapEditorScene()) {
            SceneManager._scene._mapEditorLayerListWindow.refresh();
          }
        }
      }
    }, {
      key: "applySelectedTiles",
      value: function applySelectedTiles(mapX, mapY) {
        if (currentLayer !== Layers.blend) {
          if (currentTileId === undefined) {
            return;
          }

          if (selectedTileList.length < tileCols * tileRows) {
            return;
          }
        }

        this.ensureLayerVisibility();
        var index = 0;
        var gridRatio = this.getGridRatio();
        var increment = 1 / gridRatio;

        for (var y = mapY; y < mapY + tileRows; y += increment) {
          for (var _x11 = mapX; _x11 < mapX + tileCols; _x11 += increment) {
            if (!$gameMap.isValid(_x11, y)) {
              continue;
            }

            if (currentLayer === 7 && multiLayerSelection.length) {
              for (var z = 0; z <= 3; z++) {
                this.setMapTile(_x11, y, z, multiLayerSelection[z][index]);
              }
            } else {
              this.setMapTile(_x11, y, currentLayer, selectedTileList[index]);
            }

            index++;
          }
        }

        this.refreshTilemap();
      }
    }, {
      key: "updateRightTouch",
      value: function updateRightTouch(x, y) {
        if (CycloneMapEditor$1.isRightButtonDown) {
          if (!CycloneMapEditor$1.wasRightButtonDown) {
            CycloneMapEditor$1.rectangleStartX = x;
            CycloneMapEditor$1.rectangleStartY = y;
            CycloneMapEditor$1.rectangleStartMouseX = TouchInput.x;
            CycloneMapEditor$1.rectangleStartMouseY = TouchInput.y;
          }

          var gridRatio = CycloneMapEditor$1.getGridRatio();
          CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + 1 / gridRatio).clamp(0, 30) * gridRatio;
          CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + 1 / gridRatio).clamp(0, 30) * gridRatio;
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
    }, {
      key: "updateCurrentToolTouch",
      value: function updateCurrentToolTouch(x, y) {
        switch (CycloneMapEditor$1.currentTool) {
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
    }, {
      key: "changeRectangleArea",
      value: function changeRectangleArea() {
        var previewOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var startX = CycloneMapEditor$1.rectangleStartX;
        var startY = CycloneMapEditor$1.rectangleStartY;
        var applyWidth = 0;
        var applyHeight = 0;
        var gridRatio = CycloneMapEditor$1.getGridRatio();

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
    }, {
      key: "updateRectangleReleased",
      value: function updateRectangleReleased() {
        this.changeRectangleArea();
        CycloneMapEditor$1.rectangleWidth = 0;
        CycloneMapEditor$1.rectangleHeight = 0;
        CycloneMapEditor$1.rectangleBackWidth = 0;
        CycloneMapEditor$1.rectangleBackHeight = 0;

        SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      }
    }, {
      key: "crossedHorizontalLoop",
      value: function crossedHorizontalLoop() {
        if (!$gameMap.isLoopHorizontal()) {
          return false;
        } // if moved left but the end position is to the right


        if (CycloneMapEditor$1.rectangleStartMouseX > TouchInput.x && CycloneMapEditor$1.rectangleWidth > 0) {
          return true;
        }

        if (CycloneMapEditor$1.rectangleStartMouseX < TouchInput.x && CycloneMapEditor$1.rectangleBackWidth > 0) {
          return true;
        }

        return false;
      }
    }, {
      key: "crossedVerticalLoop",
      value: function crossedVerticalLoop() {
        if (!$gameMap.isLoopVertical()) {
          return false;
        }

        if (CycloneMapEditor$1.rectangleStartMouseY > TouchInput.y && CycloneMapEditor$1.rectangleHeight > 0) {
          return true;
        }

        if (CycloneMapEditor$1.rectangleStartMouseY < TouchInput.y && CycloneMapEditor$1.rectangleBackHeight > 0) {
          return true;
        }

        return false;
      }
    }, {
      key: "updateRectangle",
      value: function updateRectangle(x, y) {
        if (TouchInput.isPressed()) {
          if (!wasPressing) {
            CycloneMapEditor$1.rectangleStartX = x;
            CycloneMapEditor$1.rectangleStartY = y;
            CycloneMapEditor$1.rectangleStartMouseX = TouchInput.x;
            CycloneMapEditor$1.rectangleStartMouseY = TouchInput.y;
          }

          var gridRatio = CycloneMapEditor$1.getGridRatio();
          CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + 1 / gridRatio).clamp(0, 30) * gridRatio;
          CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + 1 / gridRatio).clamp(0, 30) * gridRatio;
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
    }, {
      key: "updateFill",
      value: function updateFill(x, y) {
        if (!TouchInput.isPressed() || wasPressing) {
          return;
        }

        CycloneMapEditor$1.applyFillArea(x, y);
      }
    }, {
      key: "updateEraser",
      value: function updateEraser(x, y) {
        if (this.isLayerVisible(Layers.blend)) {
          this.updatePencil(x, y);
          return;
        }

        this.updateRectangle(x, y);
      }
    }, {
      key: "updatePencil",
      value: function updatePencil(x, y) {
        if (TouchInput.isPressed()) {
          if (!currentChange) {
            this.resetCurrentChange();
          }

          if (currentLayer === Layers.blend) {
            var offset = Input.isPressed('shift') ? 0.125 : 0.25;

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
    }, {
      key: "getGridRatio",
      value: function getGridRatio() {
        var drawRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

          var count = this.params.collisionStepCount;

          if ([1, 2, 4].includes(count)) {
            return count;
          }

          return 1;
        }

        return 1;
      }
    }, {
      key: "canvasToMapX",
      value: function canvasToMapX(x) {
        var gridRatio = this.getGridRatio();
        var originX = $gameMap._displayX * tileWidth;
        var mapX = (originX + x) / tileWidth;
        return Math.floor(mapX * gridRatio) / gridRatio;
      }
    }, {
      key: "canvasToMapY",
      value: function canvasToMapY(y) {
        var gridRatio = this.getGridRatio();
        var originY = $gameMap._displayY * tileHeight;
        var mapY = (originY + y) / tileHeight;
        return Math.floor(mapY * gridRatio) / gridRatio;
      }
    }, {
      key: "requestCollisionRefresh",
      value: function requestCollisionRefresh() {
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
    }, {
      key: "jumpToTile",
      value: function jumpToTile(tileId) {
        return SceneManager._scene._mapEditorWindow && SceneManager._scene._mapEditorWindow.jumpToTile(tileId);
      }
    }, {
      key: "jumpToLastTile",
      value: function jumpToLastTile() {
        if (!SceneManager._scene._mapEditorWindow) {
          return;
        }

        SceneManager._scene._mapEditorWindow.setTopRow(SceneManager._scene._mapEditorWindow.maxTopRow());
      }
    }, {
      key: "jumpToOneTileOf",
      value: function jumpToOneTileOf(tileList) {
        var _iterator15 = _createForOfIteratorHelper(tileList),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var tileId = _step15.value;

            if (this.jumpToTile(tileId)) {
              return;
            }
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }
      }
    }, {
      key: "currentTab",
      get: function get() {
        return currentTab;
      }
    }, {
      key: "active",
      get: function get() {
        return editorActive;
      },
      set: function set(value) {
        editorActive = value;
      }
    }, {
      key: "tileWidth",
      get: function get() {
        return tileWidth;
      },
      set: function set(value) {
        tileWidth = value;
      }
    }, {
      key: "tileDrawWidth",
      get: function get() {
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
    }, {
      key: "tileHeight",
      get: function get() {
        return tileHeight;
      },
      set: function set(value) {
        tileHeight = value;
      }
    }, {
      key: "tileDrawHeight",
      get: function get() {
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
    }, {
      key: "windowWidth",
      get: function get() {
        return windowWidth;
      },
      set: function set(value) {
        windowWidth = value;
      }
    }, {
      key: "isRightButtonDown",
      get: function get() {
        return isRightButtonDown;
      },
      set: function set(value) {
        isRightButtonDown = value;
      } // the size of the rectangle tool when the user stretches it right

    }, {
      key: "rectangleWidth",
      get: function get() {
        return rectangleWidth;
      },
      set: function set(value) {
        rectangleWidth = value;
      } // The size of the rectangle tool when the user stretches it down

    }, {
      key: "rectangleHeight",
      get: function get() {
        return rectangleHeight;
      },
      set: function set(value) {
        rectangleHeight = value;
      } // the size of the rectangle tool when the user stretches it left

    }, {
      key: "rectangleBackWidth",
      get: function get() {
        return rectangleBackWidth;
      },
      set: function set(value) {
        rectangleBackWidth = value;
      } // The size of the rectangle tool when the user stretches it up

    }, {
      key: "rectangleBackHeight",
      get: function get() {
        return rectangleBackHeight;
      },
      set: function set(value) {
        rectangleBackHeight = value;
      } // The X tile where the rectangle started

    }, {
      key: "rectangleStartX",
      get: function get() {
        return rectangleStartX;
      },
      set: function set(value) {
        rectangleStartX = value;
      } // The Y tile where the rectangle started

    }, {
      key: "rectangleStartY",
      get: function get() {
        return rectangleStartY;
      },
      set: function set(value) {
        rectangleStartY = value;
      }
    }, {
      key: "tileCols",
      get: function get() {
        return tileCols;
      },
      set: function set(value) {
        tileCols = value;
      }
    }, {
      key: "tileRows",
      get: function get() {
        return tileRows;
      },
      set: function set(value) {
        tileRows = value;
      } // The Mouse X position where the rectangle started

    }, {
      key: "rectangleStartMouseX",
      get: function get() {
        return rectangleStartMouseX;
      },
      set: function set(value) {
        rectangleStartMouseX = value;
      } // The Mouse Y position where the rectangle started

    }, {
      key: "rectangleStartMouseY",
      get: function get() {
        return rectangleStartMouseY;
      },
      set: function set(value) {
        rectangleStartMouseY = value;
      }
    }, {
      key: "messySelection",
      get: function get() {
        return messySelection;
      },
      set: function set(value) {
        messySelection = value;
      }
    }, {
      key: "changeHistory",
      get: function get() {
        return changeHistory;
      }
    }, {
      key: "undoHistory",
      get: function get() {
        return undoHistory;
      }
    }, {
      key: "layerVisibility",
      get: function get() {
        return layerVisibility;
      }
    }, {
      key: "wasRightButtonDown",
      get: function get() {
        return wasRightButtonDown;
      },
      set: function set(value) {
        wasRightButtonDown = value;
      }
    }, {
      key: "wasPressing",
      get: function get() {
        return wasPressing;
      },
      set: function set(value) {
        wasPressing = value;
      }
    }, {
      key: "currentTool",
      get: function get() {
        return currentTool;
      }
    }, {
      key: "currentLayer",
      get: function get() {
        return currentLayer;
      }
    }, {
      key: "showGrid",
      get: function get() {
        return showGrid;
      }
    }, {
      key: "previewChanges",
      get: function get() {
        return previewChanges;
      }
    }, {
      key: "puzzleMode",
      get: function get() {
        return puzzleMode;
      }
    }, {
      key: "currentTileId",
      get: function get() {
        return currentTileId;
      },
      set: function set(value) {
        currentTileId = value;
      }
    }, {
      key: "selectedTileList",
      get: function get() {
        return selectedTileList;
      },
      set: function set(value) {
        selectedTileList = value;
      }
    }, {
      key: "multiLayerSelection",
      get: function get() {
        return multiLayerSelection;
      },
      set: function set(value) {
        multiLayerSelection = value;
      }
    }, {
      key: "statusTileId",
      get: function get() {
        return statusTileId;
      },
      set: function set(value) {
        statusTileId = value;
      }
    }, {
      key: "statusMapX",
      get: function get() {
        return statusMapX;
      },
      set: function set(value) {
        statusMapX = value;
      }
    }, {
      key: "statusMapY",
      get: function get() {
        return statusMapY;
      },
      set: function set(value) {
        statusMapY = value;
      }
    }, {
      key: "statusTile1",
      get: function get() {
        return statusTile1;
      },
      set: function set(value) {
        statusTile1 = value;
      }
    }, {
      key: "statusTile2",
      get: function get() {
        return statusTile2;
      },
      set: function set(value) {
        statusTile2 = value;
      }
    }, {
      key: "statusTile3",
      get: function get() {
        return statusTile3;
      },
      set: function set(value) {
        statusTile3 = value;
      }
    }, {
      key: "statusTile4",
      get: function get() {
        return statusTile4;
      },
      set: function set(value) {
        statusTile4 = value;
      }
    }, {
      key: "statusRegion",
      get: function get() {
        return statusRegion;
      }
    }, {
      key: "statusTag",
      get: function get() {
        return statusTag;
      }
    }, {
      key: "statusCollision",
      get: function get() {
        return statusCollision;
      }
    }, {
      key: "statusBush",
      get: function get() {
        return statusBush;
      }
    }, {
      key: "statusCounter",
      get: function get() {
        return statusCounter;
      }
    }, {
      key: "statusDamage",
      get: function get() {
        return statusDamage;
      }
    }, {
      key: "statusLadder",
      get: function get() {
        return statusLadder;
      }
    }, {
      key: "customCollisionTable",
      get: function get() {
        return customCollisionTable;
      }
    }, {
      key: "tileBlendingTable",
      get: function get() {
        return tileBlendingTable;
      }
    }, {
      key: "mapCaches",
      get: function get() {
        return mapCaches;
      }
    }, {
      key: "currentZoom",
      get: function get() {
        return currentZoom;
      },
      set: function set(value) {
        currentZoom = value;
        $gameScreen._zoomScale = value;

        if (this.isMapEditorScene()) {
          $gameMap.zoom = new Point(value, value);

          SceneManager._scene._mapEditorGrid.refresh();

          SceneManager._scene._spriteset.updatePosition();
        } // if (Utils.isNwjs()) {
        //   this.zoom100Menu.checked = value === 1;
        //   this.zoom150Menu.checked = value === 1.5;
        //   this.zoom200Menu.checked = value === 2;
        //   this.zoom400Menu.checked = value === 4;
        // }

      }
    }, {
      key: "changingTileProps",
      get: function get() {
        return tilePropTools.includes(currentTool);
      }
    }]);

    return CycloneMapEditor$1;
  }(CyclonePlugin);

  globalThis.CycloneMapEditor = CycloneMapEditor$1;
  CycloneMapEditor$1.register();
  var regionColors = ['#e75858', '#c0986f', '#cbcf32', '#8ab24c', '#22aa47', '#1cbf97', '#7ec1df', '#4da4dc', '#4f36a9', '#725fb9', '#d48de4', '#fa5e84'];
  CycloneMapEditor.patchClass(Bitmap, function ($super) {
    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, [{
        key: "drawNormalTile",
        value: function drawNormalTile(tileId, x, y, drawWidth, drawHeight) {
          if (tileId === undefined) {
            return;
          }

          var bitmap = CycloneMapEditor.loadTilesetBitmap(tileId);

          if (!bitmap) {
            return;
          }

          var sourceX = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * CycloneMapEditor.tileWidth;
          var sourceY = Math.floor(tileId % 256 / 8) % 16 * CycloneMapEditor.tileHeight;
          this.blt(bitmap, sourceX, sourceY, CycloneMapEditor.tileWidth, CycloneMapEditor.tileHeight, x, y, drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth, drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight);
          return bitmap;
        }
      }, {
        key: "drawAutoTileTable",
        value: function drawAutoTileTable(bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
          var halfWidth = CycloneMapEditor.tileWidth / 2;
          var halfHeight = CycloneMapEditor.tileHeight / 2;
          var drawHalfWidth = (drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth) / 2;
          var drawHalfHeight = (drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight) / 2;

          for (var i = 0; i < 4; i++) {
            var tableX = table[i][0];
            var tableY = table[i][1];
            var sourceX = tileX * CycloneMapEditor.tileWidth + tableX * halfWidth;
            var sourceY = tileY * CycloneMapEditor.tileHeight + tableY * halfHeight;
            var targetX = x + i % 2 * drawHalfWidth;
            var targetY = y + Math.floor(i / 2) * drawHalfHeight;
            this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
          }

          return bitmap;
        }
      }, {
        key: "drawTileA1",
        value: function drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight) {
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

          return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawTileA2",
        value: function drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight) {
          var kind = Tilemap.getAutotileKind(tileId);
          var tileX = kind % 8 * 2;
          var tileY = (Math.floor(kind / 8) - 2) * 3;
          var shape = Tilemap.getAutotileShape(tileId);
          return this.drawAutoTileTable(bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawTileA3",
        value: function drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight) {
          var kind = Tilemap.getAutotileKind(tileId);
          var tileX = kind % 8 * 2;
          var tileY = (Math.floor(kind / 8) - 6) * 2;
          var shape = Tilemap.getAutotileShape(tileId);
          return this.drawAutoTileTable(bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawTileA4",
        value: function drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight) {
          var kind = Tilemap.getAutotileKind(tileId);
          var tileX = kind % 8 * 2;
          var tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
          var shape = Tilemap.getAutotileShape(tileId);
          var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

          if (Math.floor(kind / 8) % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
          }

          return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawAutoTile",
        value: function drawAutoTile(tileId, x, y, drawWidth, drawHeight) {
          var bitmap = CycloneMapEditor.loadTilesetBitmap(tileId);

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
      }, {
        key: "drawTile",
        value: function drawTile(tileId, x, y, drawWidth, drawHeight) {
          if (tileId <= 0) {
            return;
          }

          if (Tilemap.isAutotile(tileId)) {
            return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
          }

          return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawAutoTilePieceTable",
        value: function drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY) {
          var halfWidth = CycloneMapEditor.tileWidth / 2;
          var halfHeight = CycloneMapEditor.tileHeight / 2;
          var realDrawWidth = drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth;
          var realDrawHeight = drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight;
          var sourceX = tileX * CycloneMapEditor.tileWidth + pieceX * halfWidth;
          var sourceY = tileY * CycloneMapEditor.tileHeight + pieceY * halfHeight;
          var targetX = x;
          var targetY = y;
          this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, realDrawWidth, realDrawHeight);
          return bitmap;
        }
      }, {
        key: "drawTilePieceA1",
        value: function drawTilePieceA1(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY) {
          var tileX = 0;
          var tileY = 0;
          var kind = Tilemap.getAutotileKind(tileId);

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
              }

              break;
          }

          return this.drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY);
        }
      }, {
        key: "drawTilePieceA2",
        value: function drawTilePieceA2(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY) {
          var kind = Tilemap.getAutotileKind(tileId);
          var tileX = kind % 8 * 2;
          var tileY = (Math.floor(kind / 8) - 2) * 3;
          return this.drawAutoTilePieceTable(bitmap, tileX, tileY, x, y, drawWidth, drawHeight, pieceX, pieceY);
        }
      }, {
        key: "drawPuzzlePiece",
        value: function drawPuzzlePiece(pieceId, x, y, drawWidth, drawHeight) {
          if (pieceId <= 0) {
            return;
          }

          if (!Tilemap.isAutotile(pieceId)) {
            return;
          }

          var kind = Tilemap.getAutotileKind(pieceId);
          var tileId = Tilemap.makeAutotileId(kind, 0);
          var bitmap = CycloneMapEditor.loadTilesetBitmap(tileId);

          if (!bitmap) {
            return;
          }

          var pieceShape = pieceId - tileId;
          var pieceX = pieceShape % 4;
          var pieceY = Math.floor(pieceShape / 4);

          if (Tilemap.isTileA1(tileId)) {
            return this.drawTilePieceA1(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY);
          }

          if (Tilemap.isTileA2(tileId)) {
            return this.drawTilePieceA2(bitmap, tileId, x, y, drawWidth, drawHeight, pieceX, pieceY);
          }
        }
      }, {
        key: "drawIcon",
        value: function drawIcon(iconIndex, x, y, drawWidth, drawHeight) {
          var bitmap = ImageManager.loadSystem('IconSet');
          var pw = ImageManager.iconWidth;
          var ph = ImageManager.iconHeight;
          var sx = iconIndex % 16 * pw;
          var sy = Math.floor(iconIndex / 16) * ph;
          var realDrawWidth = drawWidth !== null && drawWidth !== void 0 ? drawWidth : pw;
          var realDrawHeight = drawHeight !== null && drawHeight !== void 0 ? drawHeight : ph;
          this.blt(bitmap, sx, sy, pw, ph, x, y, realDrawWidth, realDrawHeight);
        }
      }, {
        key: "drawRegion",
        value: function drawRegion(regionId, x, y, drawWidth, drawHeight) {
          var _CycloneMapEditor$reg;

          var stretchIcon = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          var realDrawWidth = drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth;
          var realDrawHeight = drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight;

          if (regionId > 0) {
            var color = regionColors[regionId % regionColors.length];
            this.fillRect(x, y, realDrawWidth, realDrawHeight, "".concat(color, "66"));
          }

          var iconIndex = (_CycloneMapEditor$reg = CycloneMapEditor.regionIcons.get(regionId)) !== null && _CycloneMapEditor$reg !== void 0 ? _CycloneMapEditor$reg : 0;

          if (iconIndex) {
            var _ImageManager = ImageManager,
                iconWidth = _ImageManager.iconWidth,
                iconHeight = _ImageManager.iconHeight;
            var diffX = (realDrawWidth - iconWidth) / 2;
            var diffY = (realDrawHeight - iconHeight) / 2;
            var iconDrawWidth = stretchIcon ? realDrawWidth : iconWidth;
            var iconDrawHeight = stretchIcon ? realDrawHeight : iconHeight;
            var iconX = stretchIcon ? x : x + diffX;
            var iconY = stretchIcon ? y : y + diffY;
            this.drawIcon(iconIndex, iconX, iconY, iconDrawWidth, iconDrawHeight);
          } else {
            this.drawText(regionId, x, y, realDrawWidth, realDrawHeight, 'center');
          }
        }
      }, {
        key: "drawShadow",
        value: function drawShadow(shadowId, x, y, drawWidth, drawHeight) {
          var halfWidth = (drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth) / 2;
          var halfHeight = (drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight) / 2;

          if (shadowId <= 0 || shadowId > 15) {
            return;
          }

          var table = shadowId.toString(2).padZero(4);

          for (var i = 0; i < 4; i++) {
            if (table[3 - i] !== '1') {
              continue;
            }

            var drawX = x + i % 2 * halfWidth;
            var drawY = y + Math.floor(i / 2) * halfHeight;
            this.fillRect(drawX, drawY, halfWidth, halfHeight, '#00000066');
          }
        }
      }, {
        key: "drawCollisionType",
        value: function drawCollisionType(collision, x, y, drawWidth, drawHeight) {
          if (collision === 0) {
            return;
          }

          var realDrawWidth = drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth;
          var realDrawHeight = drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight;
          var colorIndex = collision <= 3 ? collision - 1 : 0;
          var context = this.context;
          context.save();
          var color = ['#00FF00', '#FF0000', '#FF00FF'][colorIndex];
          context.fillStyle = color;
          context.fillRect(x, y, realDrawWidth, realDrawHeight);
          var goesUp = false;
          var goesDown = false;
          var goesLeft = false;
          var goesRight = false;

          if (collision >= 20) {
            var unblockedDirection = collision - 20;
            goesUp = !DirectionHelper.goesUp(unblockedDirection);
            goesDown = !DirectionHelper.goesDown(unblockedDirection);
            goesLeft = !DirectionHelper.goesLeft(unblockedDirection);
            goesRight = !DirectionHelper.goesRight(unblockedDirection);
          } else if (collision > 10) {
            var blockedDirection = collision - 10;
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
            var pieceWidth = Math.floor(realDrawWidth / 4);
            var pieceHeight = Math.floor(realDrawHeight / 4);
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
      }]);

      return _class;
    }();
  });
  CycloneMapEditor.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, null, [{
        key: "loadMapData",
        value: function loadMapData(mapId) {
          if (mapId > 0 && CycloneMapEditor.mapCaches[mapId]) {
            globalThis.$dataMap = CycloneMapEditor.mapCaches[mapId];
            this.onLoad('$dataMap');
            return;
          }

          return $super.loadMapData.call(this, mapId);
        }
      }]);

      return _class2;
    }();
  });
  CycloneMapEditor.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "screenTileX",
        value: function screenTileX() {
          if (!CycloneMapEditor.active) {
            return $super.screenTileX.call(this);
          }

          return (Graphics.width - CycloneMapEditor.windowWidth) / this.tileWidth();
        }
      }, {
        key: "screenTileY",
        value: function screenTileY() {
          if (!CycloneMapEditor.active) {
            return $super.screenTileY.call(this);
          }

          return (Graphics.height - 40) / this.tileHeight();
        }
      }, {
        key: "regionId",
        value: function regionId(x, y) {
          if (CycloneMapEditor.active) {
            return CycloneMapEditor.getCurrentTileAtPosition(x, y, 5, false);
          }

          return $super.regionId.call(this, x, y);
        }
      }, {
        key: "isLoopHorizontal",
        value: function isLoopHorizontal() {
          if (CycloneMapEditor.active) {
            return false;
          }

          return $super.isLoopHorizontal.call(this);
        }
      }, {
        key: "isLoopVertical",
        value: function isLoopVertical() {
          if (CycloneMapEditor.active) {
            return false;
          }

          return $super.isLoopVertical.call(this);
        }
      }, {
        key: "canvasToMapX",
        value: function canvasToMapX(x) {
          if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
            return $super.canvasToMapX.call(this, x);
          }

          var tileWidth = this.tileWidth() * CycloneMapEditor.currentZoom;
          var originX = this._displayX * tileWidth;
          var mapX = Math.floor((originX + x) / tileWidth);
          return this.roundX(mapX);
        }
      }, {
        key: "canvasToMapY",
        value: function canvasToMapY(y) {
          if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
            return $super.canvasToMapY.call(this, y);
          }

          var tileHeight = this.tileHeight() * CycloneMapEditor.currentZoom;
          var originY = this._displayY * tileHeight;
          var mapY = Math.floor((originY + y) / tileHeight);
          return this.roundY(mapY);
        }
      }, {
        key: "scrollDown",
        value: function scrollDown(distance) {
          if (!CycloneMapEditor.active) {
            return $super.scrollDown.call(this, distance);
          }

          var extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
          var lastY = this._displayY;
          this._displayY = Math.min(this._displayY + distance, this.height() - this.screenTileY() + extraTiles);
          this._parallaxY += this._displayY - lastY;
        }
      }, {
        key: "scrollLeft",
        value: function scrollLeft(distance) {
          if (!CycloneMapEditor.active) {
            return $super.scrollLeft.call(this, distance);
          }

          var extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 3;
          var lastX = this._displayX;
          this._displayX = Math.max(this._displayX - distance, -extraTiles);
          this._parallaxX += this._displayX - lastX;
        }
      }, {
        key: "scrollRight",
        value: function scrollRight(distance) {
          if (!CycloneMapEditor.active) {
            return $super.scrollRight.call(this, distance);
          }

          var extraTiles = Math.ceil(Graphics.width / this.tileWidth()) - 5;
          var lastX = this._displayX;
          this._displayX = Math.min(this._displayX + distance, this.width() - this.screenTileX() + extraTiles);
          this._parallaxX += this._displayX - lastX;
        }
      }, {
        key: "scrollUp",
        value: function scrollUp(distance) {
          if (!CycloneMapEditor.active) {
            return $super.scrollUp.call(this, distance);
          }

          var extraTiles = Math.ceil(Graphics.height / this.tileHeight()) - 3;
          var lastY = this._displayY;
          this._displayY = Math.max(this._displayY - distance, -extraTiles);
          this._parallaxY += this._displayY - lastY;
        }
      }, {
        key: "checkTileIdPassage",
        value: function checkTileIdPassage(tileId, d) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          return this.getPassageBitType(flag, d);
        }
      }, {
        key: "getPassageBitType",
        value: function getPassageBitType(flag, d) {
          var bit = 1 << d / 2 - 1 & 0x0f;

          if ((flag & bit) === 0) {
            // [o] Passable
            return true;
          }

          if ((flag & bit) === bit) {
            // [x] Impassable
            return false;
          }
        }
      }, {
        key: "getTileFlag",
        value: function getTileFlag(tileId) {
          var flags = this.tilesetFlags();
          return flags[tileId];
        }
      }, {
        key: "checkTileIdPassageType",
        value: function checkTileIdPassageType(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];

          if ((flag & 0x10) !== 0) {
            if (tileId < Tilemap.TILE_ID_A1) {
              return TilePassageType.star;
            }

            return TilePassageType.free;
          }

          var top = this.getPassageBitType(flag, 8);
          var bottom = this.getPassageBitType(flag, 2);
          var left = this.getPassageBitType(flag, 4);
          var right = this.getPassageBitType(flag, 6);

          if (top === false && bottom === false && left === false && right === false) {
            return TilePassageType.blocked;
          }

          return TilePassageType.free;
        }
      }, {
        key: "tileIdIsBush",
        value: function tileIdIsBush(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          return (flag & 0x40) !== 0;
        }
      }, {
        key: "tileIdIsLadder",
        value: function tileIdIsLadder(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          return (flag & 0x20) !== 0;
        }
      }, {
        key: "tileIdIsCounter",
        value: function tileIdIsCounter(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          return (flag & 0x80) !== 0;
        }
      }, {
        key: "tileIdIsDamage",
        value: function tileIdIsDamage(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          return (flag & 0x100) !== 0;
        }
      }, {
        key: "tileIdTerrainTag",
        value: function tileIdTerrainTag(tileId) {
          var flags = this.tilesetFlags();
          var flag = flags[tileId];
          var tag = flag >> 12;

          if (tag > 0) {
            return tag;
          }

          return 0;
        }
      }]);

      return _class3;
    }();
  });
  CycloneMapEditor.patchClass(Game_Player, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, [{
        key: "centerX",
        value: function centerX() {
          if (!CycloneMapEditor.active) {
            return $super.centerX.call(this);
          }

          return ((Graphics.width - CycloneMapEditor.windowWidth) / $gameMap.tileWidth() - 1) / 2.0;
        }
      }, {
        key: "centerY",
        value: function centerY() {
          if (!CycloneMapEditor.active) {
            return $super.centerY.call(this);
          }

          return ((Graphics.height - 40) / $gameMap.tileHeight() - 1) / 2.0;
        }
      }, {
        key: "reserveTransfer",
        value: function reserveTransfer(mapId) {
          var _$super$reserveTransf;

          if (CycloneMapEditor.changeHistory.length > 0) {
            if (confirm('Do you want to save your map before teleporting away?')) {
              CycloneMapEditor._doSave();
            }
          }

          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          (_$super$reserveTransf = $super.reserveTransfer).call.apply(_$super$reserveTransf, [this, mapId].concat(args));
        }
      }, {
        key: "executeEncounter",
        value: function executeEncounter() {
          var result = $super.executeEncounter.call(this);

          if (result) {
            if (CycloneMapEditor.changeHistory.length > 0) {
              if (confirm('Do you want to save your map before the battle starts?')) {
                CycloneMapEditor._doSave();
              }
            }
          }

          return result;
        }
      }, {
        key: "updateMove",
        value: function updateMove() {
          $super.updateMove.call(this);
          CycloneMapEditor.requestCollisionRefresh();
        }
      }]);

      return _class4;
    }();
  });

  var WindowCycloneGrid = /*#__PURE__*/function (_Window_Base) {
    _inherits(WindowCycloneGrid, _Window_Base);

    var _super4 = _createSuper(WindowCycloneGrid);

    function WindowCycloneGrid() {
      _classCallCheck(this, WindowCycloneGrid);

      return _super4.apply(this, arguments);
    }

    _createClass(WindowCycloneGrid, [{
      key: "initialize",
      value: function initialize() {
        var width = Graphics.width;
        var height = Graphics.height;
        var rect = new Rectangle(0, 0, width, height);

        _get(_getPrototypeOf(WindowCycloneGrid.prototype), "initialize", this).call(this, rect);

        this.padding = 0;
        this.refresh();
        this.opacity = 0;
        this.backOpacity = 0;
        this.hide();
        this.deactivate();
      }
    }, {
      key: "createContents",
      value: function createContents() {
        this._padding = 0;

        _get(_getPrototypeOf(WindowCycloneGrid.prototype), "createContents", this).call(this);
      }
    }, {
      key: "drawCellGrid",
      value: function drawCellGrid(x, y) {
        if (!CycloneMapEditor.showGrid) {
          return;
        }

        var gridRatio = CycloneMapEditor.getGridRatio(true);
        var drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom) / gridRatio;
        var drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom) / gridRatio;
        var context = this.contents.context;
        context.strokeStyle = '#666666';

        for (var cellX = 0; cellX < gridRatio; cellX++) {
          for (var cellY = 0; cellY < gridRatio; cellY++) {
            var drawX = x + cellX * drawWidth;
            var drawY = y + cellY * drawHeight;
            context.strokeRect(drawX, drawY, drawWidth, drawHeight);
          }
        }

        context.stroke();
      }
    }, {
      key: "maybeDrawRegions",
      value: function maybeDrawRegions(x, y) {
        if (!CycloneMapEditor.isLayerVisible(Layers.regions)) {
          return;
        }

        if (CycloneMapEditor.isLayerVisible(Layers.tags)) {
          return;
        }

        var mapX = $gameMap.canvasToMapX(x);
        var mapY = $gameMap.canvasToMapY(y);
        var regionId = $gameMap.regionId(mapX, mapY);

        if (regionId > 0) {
          this.contents.drawRegion(regionId, x, y);
        }
      }
    }, {
      key: "checkTilePassability",
      value: function checkTilePassability(x, y, d) {
        return $gameMap.isPassable(x, y, d);
      }
    }, {
      key: "drawTilesetCollision",
      value: function drawTilesetCollision(x, y) {
        var mapX = $gameMap.canvasToMapX(x);
        var mapY = $gameMap.canvasToMapY(y);
        var drawWidth = CycloneMapEditor.tileWidth;
        var drawHeight = CycloneMapEditor.tileHeight;
        var downBlocked = !this.checkTilePassability(mapX, mapY, 2);
        var upBlocked = !this.checkTilePassability(mapX, mapY, 8);
        var leftBlocked = !this.checkTilePassability(mapX, mapY, 4);
        var rightBlocked = !this.checkTilePassability(mapX, mapY, 6);
        var same = downBlocked === upBlocked && downBlocked === leftBlocked && downBlocked === rightBlocked;

        if (downBlocked && same) {
          this.contents.fillRect(x, y, drawWidth, drawHeight, '#FF000033');
          return;
        }

        var sideHeight = 2;
        var sideWidth = 2;
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
    }, {
      key: "drawCustomCollision",
      value: function drawCustomCollision(x, y) {
        var mapX = CycloneMapEditor.canvasToMapX(x);
        var mapY = CycloneMapEditor.canvasToMapY(y);
        var customCollisionTable = CycloneMapEditor.customCollisionTable;
        var height = $gameMap.height() * 4;
        var width = $gameMap.width() * 4;
        var tileWidth = CycloneMapEditor.tileWidth;
        var tileHeight = CycloneMapEditor.tileHeight;
        var drawWidth = tileWidth / 4;
        var drawHeight = tileHeight / 4;
        var colors = ['#00FF00AA', '#FF0000AA', '#FF00FFFF'];
        var context = this.contents.context;
        context.save();

        var drawCustomSideCollisions = function drawCustomSideCollisions(goesUp, goesDown, goesLeft, goesRight, drawX, drawY) {
          context.fillStyle = colors[2];
          var pieceWidth = Math.floor(drawWidth / 4);
          var pieceHeight = Math.floor(drawHeight / 4);

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

        for (var cellX = 0; cellX < 4; cellX++) {
          for (var cellY = 0; cellY < 4; cellY++) {
            var intX = Math.floor(mapX * 4) + cellX;
            var intY = Math.floor(mapY * 4) + cellY;
            var index = intY % height * width + intX % width;

            if (customCollisionTable[index]) {
              var drawX = x + cellX * drawWidth;
              var drawY = y + cellY * drawHeight;
              context.clearRect(drawX, drawY, drawWidth, drawHeight);
              var collision = customCollisionTable[index];
              var colorIndex = collision <= 3 ? collision - 1 : 0;
              var color = colors[colorIndex];
              context.fillStyle = color;
              context.fillRect(drawX, drawY, drawWidth, drawHeight);
              var goesUp = false;
              var goesDown = false;
              var goesLeft = false;
              var goesRight = false;

              if (collision >= 20) {
                var d = collision - 20;
                goesUp = !DirectionHelper.goesUp(d);
                goesDown = !DirectionHelper.goesDown(d);
                goesLeft = !DirectionHelper.goesLeft(d);
                goesRight = !DirectionHelper.goesRight(d);
              } else if (collision > 10) {
                var _d2 = collision - 10;

                goesUp = DirectionHelper.goesUp(_d2);
                goesDown = DirectionHelper.goesDown(_d2);
                goesLeft = DirectionHelper.goesLeft(_d2);
                goesRight = DirectionHelper.goesRight(_d2);
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
    }, {
      key: "maybeDrawCollisions",
      value: function maybeDrawCollisions(x, y) {
        if (!CycloneMapEditor.isLayerVisible(Layers.collisions)) {
          return;
        }

        this.drawTilesetCollision(x, y);
        this.drawCustomCollision(x, y);
      }
    }, {
      key: "maybeDrawTags",
      value: function maybeDrawTags(x, y) {
        if (!CycloneMapEditor.isLayerVisible(Layers.tags)) {
          return;
        }

        var mapX = $gameMap.canvasToMapX(x);
        var mapY = $gameMap.canvasToMapY(y);
        var terrainTag = $gameMap.terrainTag(mapX, mapY);

        if (terrainTag === 0) {
          return;
        }

        var drawWidth = CycloneMapEditor.tileWidth;
        var drawHeight = CycloneMapEditor.tileHeight;
        this.contents.drawText(terrainTag, x, y, drawWidth, drawHeight, 'center');
      }
    }, {
      key: "drawCell",
      value: function drawCell(x, y) {
        var mapX = $gameMap.canvasToMapX(x);
        var mapY = $gameMap.canvasToMapY(y);

        if (!$gameMap.isValid(mapX, mapY)) {
          return false;
        }

        this.maybeDrawCollisions(x, y);
        this.maybeDrawRegions(x, y);
        this.maybeDrawTags(x, y);
        this.drawCellGrid(x, y);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.contents.clear();
        this._lastDisplayX = $gameMap._displayX;
        this._lastDisplayY = $gameMap._displayY;
        var drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom);
        var drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom);
        var paddingX;
        var paddingY;

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

        var mapStartX = 0 - paddingX;
        var mapStartY = 0 - paddingY;
        var mapEndX = mapStartX + $gameMap.width() * drawWidth;
        var mapEndY = mapStartY + $gameMap.height() * drawHeight;
        var rightPos = Math.min(Graphics.width, mapEndX);
        var bottomPos = Math.min(Graphics.height, mapEndY);

        for (var _x12 = mapStartX; _x12 < rightPos; _x12 += drawWidth) {
          if (_x12 + drawWidth < 0) {
            continue;
          }

          for (var y = mapStartY; y < bottomPos; y += drawHeight) {
            if (y + drawHeight < 0) {
              continue;
            }

            this.drawCell(_x12, y);
          }
        }

        if (CycloneMapEditor.isLayerVisible(Layers.collisions)) {
          this.drawEventsCollision();
          this.drawPlayerCollision();
        }
      }
    }, {
      key: "drawEventsCollision",
      value: function drawEventsCollision() {
        var drawWidth = $gameMap.tileWidth();
        var drawHeight = $gameMap.tileHeight();

        var _iterator16 = _createForOfIteratorHelper($gameMap._events),
            _step16;

        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var event = _step16.value;

            if (!event) {
              continue;
            }

            if (event._priorityType !== 1 || event._through || event._erased) {
              continue;
            }

            var _x13 = event.x * $gameMap.tileWidth();

            var y = event.y * $gameMap.tileHeight();

            var drawX = _x13 - $gameMap._displayX * $gameMap.tileWidth();

            var drawY = y - $gameMap._displayY * $gameMap.tileHeight();

            if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
              continue;
            }

            this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#FF00FF66');
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
      }
    }, {
      key: "drawPlayerCollision",
      value: function drawPlayerCollision() {
        if (window.CycloneMovement) {
          return this.drawCycloneMovementPlayerCollision();
        }

        var x = $gamePlayer.x * $gameMap.tileWidth();
        var y = $gamePlayer.y * $gameMap.tileHeight();
        var drawWidth = $gameMap.tileWidth();
        var drawHeight = $gameMap.tileHeight();
        var drawX = x - $gameMap._displayX * $gameMap.tileWidth();
        var drawY = y - $gameMap._displayY * $gameMap.tileHeight();

        if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
          return;
        }

        this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
      }
    }, {
      key: "drawCycloneMovementPlayerCollision",
      value: function drawCycloneMovementPlayerCollision() {
        var _$gamePlayer = $gamePlayer,
            top = _$gamePlayer.top,
            left = _$gamePlayer.left,
            width = _$gamePlayer.width,
            height = _$gamePlayer.height;
        var x = left * $gameMap.tileWidth();
        var y = top * $gameMap.tileHeight();
        var drawWidth = width * $gameMap.tileWidth();
        var drawHeight = height * $gameMap.tileHeight();
        var drawX = x - $gameMap._displayX * $gameMap.tileWidth();
        var drawY = y - $gameMap._displayY * $gameMap.tileHeight();

        if (drawX + drawWidth < 0 || drawY + drawHeight < 0) {
          return;
        }

        this.contents.fillRect(drawX, drawY, drawWidth, drawHeight, '#0000FF66');
      }
    }, {
      key: "update",
      value: function update() {
        if (!CycloneMapEditor.active) {
          return;
        }

        if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
          this.refresh();
        }
      }
    }, {
      key: "requestRefresh",
      value: function requestRefresh() {
        this._lastDisplayX = -999;
      }
    }]);

    return WindowCycloneGrid;
  }(Window_Base);

  var pencilIcon = new Image();
  pencilIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQUOhdRws4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABGElEQVRIx9XUIW/CQBiA4ZcFwRQhkEEysEdSNAoFPwKBmcXO4FBTwxB+Av8BDQo1PQi1sGSChKBGMsHUkR7XMnpfQ8KnWvO8vVzv4N4nJQV+Doejfn7MZCwvLcVbShnv55G0FB88P+E1agC0lLIiDyL8NUe5n2cx/wRg0m6eIs4BA6+WAIyInko2e4wdCMMBNqtvaP9akVh7cBEHytUSna8lU99HFYvxftOr8K6Jr/f71FUBCf5vQIpfDCSBRwaSwkMDSeLWOdB4/6VJb7gT45EHreDVGb336HSXItwIBL9ej16JKx66goJXB2C7+DhFXHFjk4N3u17F23gG4IxHBvRMfR/AGbd+0+A9HoRd8dBzoO9xKXyz+QMErgZJQZj0xAAAAABJRU5ErkJggg==';
  var lineIcon = new Image();
  lineIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVD1j5N6wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeklEQVRIx2NgGAWjYBTQHDAic77/+PGfGoZycnDAzWVBNtxJTY0qrv7+48d/mCUs6JJ89XsYpJ1VyTb8up08AwMDA4MsP///xx8/MjKhK6DE8Kd7b2OIseByAbUAC3LEUCuS1cTFsaciWNhRw5LHHz8yjmbSUTAKIAAAHrcgEXUU5YwAAAAASUVORK5CYII=';
  var rectangleIcon = new Image();
  rectangleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVGNsqsmsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA0klEQVRIx2NgGAUEACM2we8/fvwnxzBODg4M81iwGe6kpkaWa7//+PEf3RIWbIbz1e9hkHZWJcnwp3tvMzipqWFYwoJNsbSzKsPTvbdJskDaWZXhUyOELcvP///xx4+MDAwMDEz4NL3beozh3dZjRPOxASZCLhPytkJho/MJASZiDSdXDROt8wHBOCAEKI4DmvpgNA6I8gGhjEYIsJASvoT4RFvwdO9tsgo7ouoDSorrfbduMaiJizMwMDAwwAo7qlY46IbjtABW5JJjCbLhwwMAAI5+ZZrvEYecAAAAAElFTkSuQmCC';
  var fillIcon = new Image();
  fillIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVI2ohW08AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABpElEQVRIx82VMUtCURiGH0PQlhxFwusSBxyCwKGMKLiELc5uIQ0FDtFWUzQb1B/oB0Q2NCfq4OQ/EE4tInFxKGlKabgNcS733vQeFaPOdM65l+f9vu+83znw38bHYGB/DAb2pP+Hp4WbQjjzxWg0NNfIs4Zh3x+s2d3bdTtrGBNlsjCLWKs6pFJOYAqBTmQmgev6m2edjMXsuQr8inNU/bOG4TmDZCxmB2UwlYteF1cp5gGkZ7/7/h6auUTKmsX8DgBbx+cA3DzWMIVA9nqzu2gUvH1ZcL4rkSAnhSeBP2TOudr83t/IRWhVh6TXfoqMarxQEHzpogZAadliJZUA4LljAThrtVc+2qchJX4R7RmUlq0fYD880z8d23haAT9MCbnh/uG2bWhcedLNDu3tlFNnN1iNTP+UVnXIRi5C4cyiISUiHvdYV5tBQ0oO93Y9mQB83p1o4VqBdLODKYQj4oYrRwXBp+rkhpSYQlApJyAXAdDCtQIv9SdnLuJxZK+HenCUaBBce7mNutDUkznJRTe20RRIRe6P0A2dKvJRftZF+OfjCySNE5ddU05FAAAAAElFTkSuQmCC';
  var eraseIcon = new Image();
  eraseIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVLhSQJ/IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABK0lEQVRIx2NgGAUEACMxir7/+PEfXYyTg4MovSzEGO6kpkbQUlwWshBj+EwDNQZpNWm4+NNbTxnQLf3+48d/bJawEONNZMNh/C1oYk5qalgtYSLG9YTA01tP4WxZfv7/RFmAy/WkAiZqup5oC0h1/ek7z4i3gBzXz/nyhWHfrVsMauLixCdT7t4Ohg9Q9pO7Txh09qwnyvWPP35kxGkBzPUdsyahaJJRlmH4oJyLInZw53YGk1tP8boeZxzIKMvgDZond58wMDAwMJxxs8freqKSKTZw985lBgYGBobZXbPxuh5nHMBciM1H6HL4XE90UYFsKCmux7CAk4ODEVvpiR7pxLoeqw9glqAXZOiAGNfjrXCQC61bL19iyMMMx+d6oms0bKUkMYYPDwAArdGaa9wnQ0IAAAAASUVORK5CYII=';
  var saveIcon = new Image();
  saveIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVN3D7jzIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA4ElEQVRIx2NgGAUDDRhxSXz/8eM/KQZxcnBgNYsFl+FOamokufT7jx//sVnCgstwC6dMBgl1RQZ1Q0kGFXlJrIbeefic4eb55wwvbt5ncFJTw2oJEy4XSagrMjAwMOA0PNXdBUMtAwMDgyw//3+iLKAWIGjBnYfPsYqXz1pMlAUshBTcPA8JZ5r5gFJA0Acvbt7HK48cwWRZgM8QQpYTbQExBg1fHzARMvTEvukMEuqKWPGJfdMJOoCRWoXdvlu3GNTExRkYGBgYHn/8yEj14hqb4XgtwFZwEQLoho8CogAAz0BbPsc/fBQAAAAASUVORK5CYII=';
  var reloadIcon = new Image();
  reloadIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWA3piKEQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABe0lEQVRIx9VVq7KDMBDdzCBARVbcwaaytpoavoUf4Bv6A/0WDGgsklgGUYkqjorOMpvthuSaO3PXpSTn7OPsKcB/DxVz6bWuG/8tS9Oot0kMaGGM9zsS8fMhwWtdNwr6uP/A+ZLv53GYdlIEpmdKonzgHFSKcZigqmcniVvZQ2ftXkkigbfNVQThFZ0vObTNB5Qnk2u9TcuikiPwW9kDAEBnrfP40455J6JvooaMWSOwOZ2c7/b5hMIYqOoZ2iaPU1GWpooOt7PWAZ6WRfkqjZYpktCsEViqkvd9HKbwoklLxfXNZUyDVu4MOfSQ6ptWyoNXnsTqvzDmiyTXeqOD5/MSVSSB096ivqXBI1GWpmEvknaBy5XaBFbOKw0StM0VbmUPhTG0DY7/SJL92mQpc7qp1OB8Jog+RCv1bjIAQFXP8LiD4zuhzecqUj6Zok3gWbJsaoIS+OGi4WXsu7Qf1AR9my/aAOobL+dab1TnHFTS/6/+kzlxCPRP4w3A6io0yt+JDgAAAABJRU5ErkJggg==';
  var undoIcon = new Image();
  undoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWHYBtFScAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABKUlEQVRIx+1Uq7LCMBA97URwMchiro2s7AdUFF3db0H1W9DVRfABlZWx14DEAK6Ym50lbJqAwXBmOtNNZs7Zx9kAX3waie/iertNAPCzWCQ8dmHvfVA+8lLrByEbhxIJCljyZbtGXeREbGMXPBFJJPWVxsl85ADQ9BWW7Rql1mIbVWhITV/R/26zf7izwnWRo2tBIrySNNYN3TACAA7G0HfZHumcV/i7Wk0vC9RFjqavqOc6y0hkDmko49BZCErytXXSDs/ZHYyBzrL3BbiIdGfJ/87nBMD0loBbCc/enE42pH2Za5+aeypKrcmm3TA+bTPfj8v2KLZPveIi9HmUIf7bF98i3yZ3w0g29Q0/CWXuzkFylTD8eIG5p5oTS+TRAu76u5CIv4jGHaoeqH4byFz/AAAAAElFTkSuQmCC';
  var redoIcon = new Image();
  redoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWJahvrbkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABIklEQVRIx+1VqxaCQBC96yGAhYjFupHoBxDsZr/FxLeYyRQ/gEikWiRalIZBhzMsuzBosHDPIeze3TvPHYAF/4aSHHo2TWvbD3xfcZ7WHJ5EONFaxD+bpjWNeGPidPGY7wd8VpTgPK1NI6sx8XW6sYoDwGEXY51uemvCNgxbZwRcnC5lRYnH6dY7d8z3bz6PR+u3chGm+KWquo/2JfCmDpC4jiJUdY1Ea2faZkUwBpv3roi8OcKB7yuq0Rm3AU+Rfm2AG7FxJH6939Wkgawou1ZMtEZV1wDQCfPHxz3n4lYDPA3IYxx2MbJ0+Jp5G5MDs0cFRSHpd3pgZgRKMiq4t6YDvI1tKVK/DLup/IvG9TYM20+BIe2c2f8Dc4CZcIkvEOEFIdSyhtt+PqwAAAAASUVORK5CYII=';

  var WindowCycloneMapEditorCommands = /*#__PURE__*/function (_Window_Command) {
    _inherits(WindowCycloneMapEditorCommands, _Window_Command);

    var _super5 = _createSuper(WindowCycloneMapEditorCommands);

    function WindowCycloneMapEditorCommands() {
      _classCallCheck(this, WindowCycloneMapEditorCommands);

      return _super5.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorCommands, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = 0;
        var w = CycloneMapEditor.windowWidth;
        var h = CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280 ? 74 : 50;

        _get(_getPrototypeOf(WindowCycloneMapEditorCommands.prototype), "initialize", this).call(this, new Rectangle(x, y, w, h));

        this.showBackgroundDimmer();
        this.configureHandlers();
      }
    }, {
      key: "configureHandlers",
      value: function configureHandlers() {
        var _this20 = this;

        this.setHandler('undo', function () {
          CycloneMapEditor.undoButton();

          _this20.activate();
        });
        this.setHandler('redo', function () {
          CycloneMapEditor.redoButton();

          _this20.activate();
        });
        this.setHandler('pencil', function () {
          CycloneMapEditor.pencilButton();

          _this20.activate();
        });
        this.setHandler('rectangle', function () {
          CycloneMapEditor.rectangleButton();

          _this20.activate();
        });
        this.setHandler('fill', function () {
          CycloneMapEditor.fillButton();

          _this20.activate();
        });
        this.setHandler('eraser', function () {
          CycloneMapEditor.eraserButton();

          _this20.activate();
        });
        this.setHandler('save', function () {
          CycloneMapEditor.saveButton();

          _this20.activate();
        });
        this.setHandler('reload', function () {
          CycloneMapEditor.reloadButton();

          _this20.activate();
        });
      }
    }, {
      key: "maxScrollY",
      value: function maxScrollY() {
        return 0;
      }
    }, {
      key: "maxScrollX",
      value: function maxScrollX() {
        return 0;
      }
    }, {
      key: "processCursorMove",
      value: function processCursorMove() {}
    }, {
      key: "processHandling",
      value: function processHandling() {}
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "_updateCursor",
      value: function _updateCursor() {
        this._cursorSprite.visible = false;
      }
    }, {
      key: "makeCommandList",
      value: function makeCommandList() {
        this.addCommand('Undo', 'undo');
        this.addCommand('Redo', 'redo');
        this.addCommand('', '');
        this.addCommand('Pen', 'pencil');
        this.addCommand('Rect', 'rectangle');
        this.addCommand('Fill', 'fill');
        this.addCommand('Erase', 'eraser');
      }
    }, {
      key: "colSpacing",
      value: function colSpacing() {
        return 6;
      }
    }, {
      key: "rowSpacing",
      value: function rowSpacing() {
        return 0;
      }
    }, {
      key: "maxCols",
      value: function maxCols() {
        return 7;
      }
    }, {
      key: "redraw",
      value: function redraw() {
        Window_Selectable.prototype.refresh.call(this);
      }
    }, {
      key: "getSymbolIcon",
      value: function getSymbolIcon(symbol) {
        switch (symbol) {
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
    }, {
      key: "itemRect",
      value: function itemRect(index) {
        var rect = _get(_getPrototypeOf(WindowCycloneMapEditorCommands.prototype), "itemRect", this).call(this, index);

        if (Graphics.width < 1280) {
          rect.width += 3;
        }

        return rect;
      }
    }, {
      key: "lineHeight",
      value: function lineHeight() {
        if (Graphics.width >= 1280) {
          if (CycloneMapEditor.tileDrawWidth < 48) {
            return 14;
          }

          return 36;
        }

        return 14;
      }
    }, {
      key: "drawItem",
      value: function drawItem(index) {
        var symbol = this.commandSymbol(index);
        var rect = this.itemRect(index);

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
          this.contents.fillRect(rect.x - 2, rect.y, rect.width + 4, 4, '#000000');
          this.contents.fillRect(rect.x - 2, rect.y + 2 + rect.height, rect.width + 6, 4, '#000000');
          this.contents.fillRect(rect.x - 2, rect.y, 4, rect.height + 4, '#000000');
          this.contents.fillRect(rect.x + rect.width, rect.y, 4, rect.height + 4, '#000000');
          this.contents.fillRect(rect.x, rect.y + 2, rect.width, 2, '#FFFFFF');
          this.contents.fillRect(rect.x, rect.y + 2 + rect.height, rect.width + 2, 2, '#FFFFFF');
          this.contents.fillRect(rect.x, rect.y + 2, 2, rect.height, '#FFFFFF');
          this.contents.fillRect(rect.x + rect.width, rect.y + 2, 2, rect.height, '#FFFFFF');
        }

        var icon = this.getSymbolIcon(symbol);

        if (!icon) {
          return _get(_getPrototypeOf(WindowCycloneMapEditorCommands.prototype), "drawItem", this).call(this, index);
        }

        this.resetTextColor();

        if (symbol === 'undo') {
          this.changePaintOpacity(CycloneMapEditor.changeHistory.length > 0);
        } else if (symbol === 'redo') {
          this.changePaintOpacity(CycloneMapEditor.undoHistory.length > 0);
        } else {
          this.changePaintOpacity(true);
        }

        var ctx = this.contents._canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;
        var iconWidth = CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280 ? 48 : 24;
        ctx.drawImage(icon, rect.x + 1, rect.y, iconWidth, iconWidth);
      }
    }, {
      key: "drawAllItems",
      value: function drawAllItems() {
        _get(_getPrototypeOf(WindowCycloneMapEditorCommands.prototype), "drawAllItems", this).call(this);
      }
    }, {
      key: "playCursorSound",
      value: function playCursorSound() {}
    }, {
      key: "playOkSound",
      value: function playOkSound() {}
    }, {
      key: "playBuzzerSound",
      value: function playBuzzerSound() {}
    }]);

    return WindowCycloneMapEditorCommands;
  }(Window_Command);

  var hiddenIcon = new Image();
  hiddenIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWFPmxrYMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABBElEQVRIx+2UMQqDMBSGf4uDTo6dXCMIXsJLCEIPUfAYBc8gQqF3EM/woFBo1k4dOzWbnSJRk5jSsf4gmOfL95u8lwCbNv0qzzXxLcSgjsMgcJrru4JzxrTxNSN/DS7BVV1Pvsn4W4jBZuKtwSU4STMAwP12neSdjkf0nBtXsluDJ2k2wlUREZI0Q1XXyBlb1MhoMIdLXc7t4u/lymwmO9MWEdFkXJQHENH4FOVBmxtH0WAtchgEnlpcFaS+qyvrmgY952D7vVsXzU108Mu5BYAF/PF6eU5tqjNR1TUNAFjhTifZdNB6zgHACne+KuIoGvjzOYmp+22Cf3UX6TrEBt70R/oAQESSsFk1AwIAAAAASUVORK5CYII=';
  var visibleIcon = new Image();
  visibleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWDOrdNdUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABOUlEQVRIx+2Uu07DMBSG/6AM6WR1apdYQkiRMrUbZM1SXgB2RkYY8hBdsvYJOtCpEqqYuvQpsIQiAQOdok7xdphOidM2NmIkv+ThHNvfufgCdOr0V3muCyutqW73gsBpr+8KTqPoqN8WyLfBGTyfxcYc+yutqS2Ib4MzeJguDTD70yiyBjkKT6SkYjWhSmtjJFJSIiUt7sZUaU3FakKJlNQ8I9ZZW+acNQA8318dnANXNp/F+0qcW/T5+oVh+mPH2RMecWvY9bWsUAj62O08pxZt8tFBi5pjk4/2LQqFoFAIslbQCwKPWzXFJQCgf73AxbkEALwV7yhfbgAAWV5irRSiwQAA0Mzec72m04e+MZflJQC0wp1e8qmHtlYKAFrhzl9FKASp7dbwMbgN/qu/iAPVbett6fQ/9A0c7tBBCKKL7gAAAABJRU5ErkJggg==';

  var WindowCycloneMapEditorLayerList = /*#__PURE__*/function (_Window_Base2) {
    _inherits(WindowCycloneMapEditorLayerList, _Window_Base2);

    var _super6 = _createSuper(WindowCycloneMapEditorLayerList);

    function WindowCycloneMapEditorLayerList() {
      _classCallCheck(this, WindowCycloneMapEditorLayerList);

      return _super6.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorLayerList, [{
      key: "initialize",
      value: function initialize() {
        var x = 0;
        var w = 180;
        var y = 0;
        var h = Graphics.height - 40;

        _get(_getPrototypeOf(WindowCycloneMapEditorLayerList.prototype), "initialize", this).call(this, new Rectangle(x, y, w, h));

        this.showBackgroundDimmer();
      }
    }, {
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(WindowCycloneMapEditorLayerList.prototype), "update", this).call(this);
      }
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.drawContents();

        SceneManager._scene.redrawMap();
      }
    }, {
      key: "drawContents",
      value: function drawContents() {
        this.contents.clear();

        var ctx = this.contents._canvas.getContext('2d');

        var names = ['Auto Layer', 'Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Shadows', 'Regions', 'Events'];
        this.contents.fontSize = 22;
        ctx.imageSmoothingEnabled = false;

        for (var i = 0; i < 8; i++) {
          var layerIndex = i === 0 ? Layers.auto : i - 1;
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
    }, {
      key: "toggleLayerVisibility",
      value: function toggleLayerVisibility(layerIndex) {
        CycloneMapEditor.layerVisibility[layerIndex] = !CycloneMapEditor.layerVisibility[layerIndex];
        this.refresh();

        SceneManager._scene._mapEditorGrid.refresh();
      }
    }, {
      key: "getLayerIndex",
      value: function getLayerIndex(y) {
        var padding = this.padding + 10;

        if (y < padding || y > this.height - padding + 6) {
          return -1;
        }

        var layerIndex = Math.floor((y - padding) / 30);

        if (y > padding + layerIndex * 30 + 22) {
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
    }, {
      key: "onMapTouch",
      value: function onMapTouch(x, y) {
        var layerIndex = this.getLayerIndex(y);

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
    }]);

    return WindowCycloneMapEditorLayerList;
  }(Window_Base);

  var WindowCycloneMapEditorStatus = /*#__PURE__*/function (_Window_Base3) {
    _inherits(WindowCycloneMapEditorStatus, _Window_Base3);

    var _super7 = _createSuper(WindowCycloneMapEditorStatus);

    function WindowCycloneMapEditorStatus() {
      _classCallCheck(this, WindowCycloneMapEditorStatus);

      return _super7.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorStatus, [{
      key: "initialize",
      value: function initialize() {
        var h = 40;

        _get(_getPrototypeOf(WindowCycloneMapEditorStatus.prototype), "initialize", this).call(this, new Rectangle(0, Graphics.height - h, Graphics.width, h));

        this.showBackgroundDimmer();
      }
    }, {
      key: "createContents",
      value: function createContents() {
        this._padding = 0;

        _get(_getPrototypeOf(WindowCycloneMapEditorStatus.prototype), "createContents", this).call(this);
      }
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.drawContents();
      }
    }, {
      key: "lineHeight",
      value: function lineHeight() {
        return 16;
      }
    }, {
      key: "makeLine",
      value: function makeLine() {
        var line = '';

        var addConditional = function addConditional(paramName, newPart) {
          if (CycloneMapEditor.params[paramName]) {
            if (line && newPart) {
              return ", ".concat(newPart);
            }

            return newPart;
          }

          return '';
        };

        line += addConditional('showMapId', "Map: ".concat($gameMap._mapId));
        line += addConditional('showTilesetId', "Tileset: ".concat($gameMap._tilesetId));
        line += addConditional('showPosition', "Pos: ".concat(CycloneMapEditor.statusMapX, ", ").concat(CycloneMapEditor.statusMapY));

        if (CycloneMapEditor.params.showCellTiles) {
          var _CycloneMapEditor = CycloneMapEditor,
              _statusTile = _CycloneMapEditor.statusTile1,
              _statusTile2 = _CycloneMapEditor.statusTile2,
              _statusTile3 = _CycloneMapEditor.statusTile3,
              _statusTile4 = _CycloneMapEditor.statusTile4;

          if (line) {
            line += ' - ';
          }

          line += "Tiles: (".concat(_statusTile, ", ").concat(_statusTile2, ", ").concat(_statusTile3, ", ").concat(_statusTile4, ")");
        }

        line += addConditional('showRegionId', "Region: ".concat(CycloneMapEditor.statusRegion));
        line += addConditional('showTag', "Tag: ".concat(CycloneMapEditor.statusTag));
        line += addConditional('showCollision', "Collision: ".concat(CycloneMapEditor.statusCollision));
        line += addConditional('showLadder', CycloneMapEditor.statusLadder ? ' Ladder' : '');
        line += addConditional('showBush', CycloneMapEditor.statusBush ? ' Bush' : '');
        line += addConditional('showCounter', CycloneMapEditor.statusCounter ? ' Counter' : '');
        line += addConditional('showDamageFloor', CycloneMapEditor.statusDamage ? ' Damage' : '');
        return line;
      }
    }, {
      key: "textY",
      value: function textY() {
        return 12;
      }
    }, {
      key: "drawMainLine",
      value: function drawMainLine() {
        var line = this.makeLine();
        this.drawText(line, 8, this.textY(), this.width - 8, 'left');
      }
    }, {
      key: "drawRightLine",
      value: function drawRightLine() {
        this.drawText("TileId: ".concat(CycloneMapEditor.statusTileId), 0, this.textY(), this.width - 8, 'right');
      }
    }, {
      key: "drawContents",
      value: function drawContents() {
        this.contents.clear();
        this.contents.fontSize = 16;
        this.drawMainLine();
        this.drawRightLine();
      }
    }]);

    return WindowCycloneMapEditorStatus;
  }(Window_Base); // import { Layers, Tools } from './constants';


  var WindowCycloneMapEditorTabs = /*#__PURE__*/function (_Window_Command2) {
    _inherits(WindowCycloneMapEditorTabs, _Window_Command2);

    var _super8 = _createSuper(WindowCycloneMapEditorTabs);

    function WindowCycloneMapEditorTabs() {
      _classCallCheck(this, WindowCycloneMapEditorTabs);

      return _super8.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorTabs, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = SceneManager._scene._mapEditorCommands.y + SceneManager._scene._mapEditorCommands.height;
        var w = CycloneMapEditor.windowWidth;
        var h = 74;

        _get(_getPrototypeOf(WindowCycloneMapEditorTabs.prototype), "initialize", this).call(this, new Rectangle(x, y, w, h));

        this.showBackgroundDimmer();
        this.configureHandlers();
      }
    }, {
      key: "configureHandlers",
      value: function configureHandlers() {
        var _this21 = this;

        this.setHandler('a', function () {
          CycloneMapEditor.jumpToOneTileOf([Tilemap.TILE_ID_A1, Tilemap.TILE_ID_A2, Tilemap.TILE_ID_A3, Tilemap.TILE_ID_A4, Tilemap.TILE_ID_A5]);

          _this21.activate();
        });
        this.setHandler('b', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_B);

          _this21.activate();
        });
        this.setHandler('c', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_C);

          _this21.activate();
        });
        this.setHandler('d', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_D);

          _this21.activate();
        });
        this.setHandler('e', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E);

          _this21.activate();
        });
        this.setHandler('f', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 256);

          _this21.activate();
        });
        this.setHandler('g', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_E + 512);

          _this21.activate();
        });
        this.setHandler('h', function () {
          CycloneMapEditor.jumpToTile(Tilemap.TILE_ID_A5 + 256);

          _this21.activate();
        });
      }
    }, {
      key: "maxScrollY",
      value: function maxScrollY() {
        return 0;
      }
    }, {
      key: "maxScrollX",
      value: function maxScrollX() {
        return 0;
      }
    }, {
      key: "processCursorMove",
      value: function processCursorMove() {}
    }, {
      key: "processHandling",
      value: function processHandling() {}
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "_updateCursor",
      value: function _updateCursor() {
        this._cursorSprite.visible = false;
      }
    }, {
      key: "makeCommandList",
      value: function makeCommandList() {
        this.addCommand('A', 'a');
        this.addCommand('B', 'b');
        this.addCommand('C', 'c');
        this.addCommand('D', 'd');
        this.addCommand('E', 'e');
        this.addCommand('F', 'f', Boolean(window.CycloneExtraTilesets));
        this.addCommand('G', 'g', Boolean(window.CycloneExtraTilesets));
        this.addCommand('H', 'h', Boolean(window.CycloneExtraTilesets));
      }
    }, {
      key: "colSpacing",
      value: function colSpacing() {
        return 6;
      }
    }, {
      key: "rowSpacing",
      value: function rowSpacing() {
        return 0;
      }
    }, {
      key: "maxCols",
      value: function maxCols() {
        return 8;
      }
    }, {
      key: "redraw",
      value: function redraw() {
        Window_Selectable.prototype.refresh.call(this);
      } // itemRect(index) {
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

    }, {
      key: "playCursorSound",
      value: function playCursorSound() {}
    }, {
      key: "playOkSound",
      value: function playOkSound() {}
    }, {
      key: "playBuzzerSound",
      value: function playBuzzerSound() {}
    }]);

    return WindowCycloneMapEditorTabs;
  }(Window_Command);

  var WindowCycloneMapEditor = /*#__PURE__*/function (_Window_Command3) {
    _inherits(WindowCycloneMapEditor, _Window_Command3);

    var _super9 = _createSuper(WindowCycloneMapEditor);

    function WindowCycloneMapEditor() {
      _classCallCheck(this, WindowCycloneMapEditor);

      return _super9.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditor, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
        var w = CycloneMapEditor.windowWidth;
        var h = Graphics.height - y - SceneManager._scene._mapEditorStatus.height;

        _get(_getPrototypeOf(WindowCycloneMapEditor.prototype), "initialize", this).call(this, new Rectangle(x, y, w, h));

        this.showBackgroundDimmer();
      }
    }, {
      key: "onMapTouch",
      value: function onMapTouch(x, y) {}
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "_updateCursor",
      value: function _updateCursor() {
        this._cursorSprite.visible = false;
      }
    }, {
      key: "processCursorMove",
      value: function processCursorMove() {}
    }, {
      key: "processHandling",
      value: function processHandling() {}
    }, {
      key: "addTile",
      value: function addTile(tileId) {
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
    }, {
      key: "makeManualTilesList",
      value: function makeManualTilesList() {
        var tileId = this._manualTileSelected;
        var maxShape = 46;

        if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
          maxShape = 15;
        } else if (Tilemap.isWaterfallTile(tileId)) {
          maxShape = 3;
        }

        for (var i = 0; i <= maxShape; i++) {
          this.addCommand(tileId + i, 'tile', true, tileId + i);
        }
      }
    }, {
      key: "makeShadowList",
      value: function makeShadowList() {
        for (var i = 0; i <= 15; i++) {
          this.addCommand(i, 'shadow', true, i);
        }
      }
    }, {
      key: "makeRegionList",
      value: function makeRegionList() {
        for (var i = 0; i <= 255; i++) {
          this.addCommand(i, 'region', true, i);
        }
      }
    }, {
      key: "isTileLayer",
      value: function isTileLayer() {
        return CycloneMapEditor.currentLayer === 7 || CycloneMapEditor.currentLayer < 4;
      }
    }, {
      key: "makeTileList",
      value: function makeTileList() {
        if (CycloneMapEditor.puzzleMode) {
          this.makePuzzleList();
          return;
        }

        for (var tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
          this.addTile(tileId);
        }

        for (var _tileId4 = Tilemap.TILE_ID_A5; _tileId4 < Tilemap.TILE_ID_A5 + 128; _tileId4++) {
          this.addTile(_tileId4);
        }

        for (var _tileId5 = Tilemap.TILE_ID_B; _tileId5 < Tilemap.TILE_ID_A5; _tileId5++) {
          this.addTile(_tileId5);
        }

        for (var _tileId6 = Tilemap.TILE_ID_A5 + 256; _tileId6 < Tilemap.TILE_ID_A5 + 512; _tileId6++) {
          this.addTile(_tileId6);
        }
      }
    }, {
      key: "makePuzzleList",
      value: function makePuzzleList() {
        var min = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A1) ? Tilemap.TILE_ID_A1 : Tilemap.TILE_ID_A2;
        var max = CycloneMapEditor.getTilesetName(Tilemap.TILE_ID_A2) ? Tilemap.TILE_ID_A3 : Tilemap.TILE_ID_A2;
        var tileList = [];

        for (var tileId = min; tileId < max; tileId += 48) {
          if (Tilemap.isWaterfallTile(tileId)) {
            continue;
          }

          if (tileId === 2144 || tileId === 2192) {
            continue;
          }

          tileList.push(tileId);
        }

        for (var i = 0; i < tileList.length; i += 4) {
          for (var pieceY = 0; pieceY < 6; pieceY++) {
            for (var idx = 0; idx <= 3; idx++) {
              var _tileId7 = tileList[i + idx];

              if (!_tileId7) {
                continue;
              }

              for (var pieceX = 0; pieceX < 4; pieceX++) {
                var pieceId = _tileId7 + pieceX + pieceY * 4;
                this.addCommand(pieceId, 'puzzle', true, pieceId);
              }
            }
          }
        }
      }
    }, {
      key: "makeCommandList",
      value: function makeCommandList() {
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
    }, {
      key: "makeCollisionList",
      value: function makeCollisionList() {
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
    }, {
      key: "getTileRow",
      value: function getTileRow(tileId) {
        var index = this._list.findIndex(function (item) {
          return (item === null || item === void 0 ? void 0 : item.name) === tileId;
        });

        if (index >= 0) {
          return Math.floor(index / this.maxCols());
        }

        return -1;
      }
    }, {
      key: "jumpToTile",
      value: function jumpToTile(tileId) {
        var row = this.getTileRow(tileId);

        if (row < 0) {
          return false;
        }

        this.setTopRow(row || 0);
        return true;
      }
    }, {
      key: "ensureSelectionVisible",
      value: function ensureSelectionVisible() {
        if (this._selectionIndex < 0 || CycloneMapEditor.currentTileId === undefined) {
          return;
        }

        var row = Math.floor(this._selectionIndex / this.maxCols());

        if (row < this.topRow()) {
          this.setTopRow(Math.min(row, this.maxTopRow()));
        } else if (row > this.topRow() + this.maxPageRows()) {
          this.setTopRow(Math.min(row, this.maxTopRow()));
        }
      }
    }, {
      key: "redraw",
      value: function redraw() {
        Window_Selectable.prototype.refresh.call(this);

        if (!CycloneMapEditor.changingTileProps) {
          // Force the tilemap cursor to redraw too
          SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
        }
      }
    }, {
      key: "colSpacing",
      value: function colSpacing() {
        if (CycloneMapEditor.currentLayer === Layers.collisions) {
          return 0;
        }

        return Math.floor((this.width - this.maxCols() * this.itemWidth()) / this.maxCols());
      }
    }, {
      key: "rowSpacing",
      value: function rowSpacing() {
        return 0;
      }
    }, {
      key: "maxCols",
      value: function maxCols() {
        if (CycloneMapEditor.currentLayer === Layers.collisions) {
          return 3;
        }

        if (CycloneMapEditor.puzzleMode) {
          return 16;
        }

        return 8;
      }
    }, {
      key: "itemWidth",
      value: function itemWidth() {
        var w = CycloneMapEditor.tileDrawWidth;

        if (CycloneMapEditor.puzzleMode) {
          return w / 2;
        }

        return w;
      }
    }, {
      key: "itemHeight",
      value: function itemHeight() {
        var h = CycloneMapEditor.tileDrawHeight;

        if (CycloneMapEditor.puzzleMode) {
          return h / 2;
        }

        return h;
      }
    }, {
      key: "drawRegion",
      value: function drawRegion(index) {
        var rect = this.itemRect(index);
        this.contents.fontSize = Graphics.width < 1280 ? 14 : 18;
        this.contents.drawRegion(index, rect.x, rect.y, rect.width, rect.height, true);
      }
    }, {
      key: "drawCollision",
      value: function drawCollision(index) {
        var _this$_list$index$ext;

        if (index === 0) {
          return;
        }

        var collision = (_this$_list$index$ext = this._list[index].ext) !== null && _this$_list$index$ext !== void 0 ? _this$_list$index$ext : index;

        if (collision === 0) {
          return;
        }

        var rect = this.itemRect(index);
        this.contents.drawCollisionType(collision, rect.x, rect.y, rect.width, rect.height);
      }
    }, {
      key: "drawPuzzle",
      value: function drawPuzzle(index) {
        var pieceId = this._list[index].ext;

        if (!pieceId) {
          return;
        }

        var rect = this.itemRect(index);
        this.contents.drawPuzzlePiece(pieceId, rect.x, rect.y, rect.width, rect.height);
      }
    }, {
      key: "drawShadow",
      value: function drawShadow(index) {
        var rect = this.itemRect(index);
        var shadowId = index;
        var x = rect.x;
        var y = rect.y;
        var drawWidth = rect.width;
        var drawHeight = rect.height;
        var halfWidth = (drawWidth !== null && drawWidth !== void 0 ? drawWidth : CycloneMapEditor.tileWidth) / 2;
        var halfHeight = (drawHeight !== null && drawHeight !== void 0 ? drawHeight : CycloneMapEditor.tileHeight) / 2;

        if (shadowId < 0 || shadowId > 15) {
          return;
        }

        var table = shadowId.toString(2).padZero(4);

        for (var i = 0; i < 4; i++) {
          var color = '#000000';

          if (table[3 - i] !== '1') {
            color = '#FFFFFF99';
          }

          var drawX = x + i % 2 * halfWidth;
          var drawY = y + Math.floor(i / 2) * halfHeight;
          this.contents.fillRect(drawX, drawY, halfWidth, halfHeight, color);
        }

        var context = this.contents.context;
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
    }, {
      key: "updateOpacityForTile",
      value: function updateOpacityForTile(tileId) {
        if (!CycloneMapEditor.changingTileProps || Input.isPressed('shift')) {
          return this.changePaintOpacity(true);
        }

        return this.changePaintOpacity(false);
      }
    }, {
      key: "drawItem",
      value: function drawItem(index) {
        var _this22 = this;

        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var symbol = this.commandSymbol(index);

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

        var rect = this.itemRect(index);
        var tileId = this._list[index].ext;
        this.updateOpacityForTile(tileId);
        var bitmap = this.contents.drawTile(tileId, rect.x, rect.y, this.itemWidth(), this.itemHeight());

        if (!bitmap) {
          return;
        }

        if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
          bitmap.addLoadListener(function () {
            _this22._needsRedraw = true;
          });
        }

        this.changePaintOpacity(true);

        if (!this._needsRedraw && CycloneMapEditor.changingTileProps) {
          this.drawTileProp(this.commandName(index), rect);
        }
      }
    }, {
      key: "translucentOpacity",
      value: function translucentOpacity() {
        return 90;
      }
    }, {
      key: "drawTileProp",
      value: function drawTileProp(tileId, rect) {
        if (Input.isPressed('shift')) {
          return;
        }

        switch (CycloneMapEditor.currentTool) {
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
    }, {
      key: "drawTilePassage",
      value: function drawTilePassage(tileId, rect) {
        var passageType = $gameMap.checkTileIdPassageType(tileId);
        var context = this.contents.context;

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
          var rot = Math.PI / 5;
          var step = Math.PI / 5;
          var outerRadius = Math.floor(Math.min(rect.width, rect.height) / 3);
          var innerRadius = Math.floor(Math.min(rect.width, rect.height) / 6);
          var baseX = Math.floor(rect.x + rect.width / 2);
          var baseY = Math.floor(rect.y + rect.height / 2);
          context.beginPath();
          context.moveTo(baseX, baseY - outerRadius);

          for (var i = 0; i < 5; i++) {
            var _x14 = baseX + Math.cos(rot) * outerRadius;

            var y = baseY + Math.sin(rot) * outerRadius;
            context.lineTo(_x14, y);
            rot += step;
            var inX = baseX + Math.cos(rot) * innerRadius;
            var inY = baseY + Math.sin(rot) * innerRadius;
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
    }, {
      key: "drawTilePassage4",
      value: function drawTilePassage4(tileId, rect) {
        var flag = $gameMap.getTileFlag(tileId);
        var top = $gameMap.getPassageBitType(flag, 8);
        var bottom = $gameMap.getPassageBitType(flag, 2);
        var left = $gameMap.getPassageBitType(flag, 4);
        var right = $gameMap.getPassageBitType(flag, 6);
        var margin = 3;
        var middleX = rect.x + Math.floor(rect.width / 2);
        var middleY = rect.y + Math.floor(rect.height / 2);
        var context = this.contents.context;
        context.lineWidth = 6;
        context.strokeStyle = '#000000';

        var drawArrow = function drawArrow(x, y, x2, y2) {
          var headLen = Math.floor(rect.width / 5);
          var angle1 = Math.PI / 13;
          var angle2 = Math.atan2(y2 - y, x2 - x);
          var diff1 = angle2 - angle1;
          var diff2 = angle2 + angle1;
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

        var drawArrows = function drawArrows() {
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
    }, {
      key: "drawTileLadder",
      value: function drawTileLadder(tileId, rect) {
        if (!$gameMap.tileIdIsLadder(tileId)) {
          return;
        }

        var context = this.contents.context;
        var w = Math.floor(rect.width / 4);
        var h = Math.floor(rect.height / 3);
        var x = Math.floor(rect.x + rect.width / 2 - w / 2);
        var y = Math.floor(rect.y + rect.height / 2 - w / 2);

        var drawLadder = function drawLadder() {
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
    }, {
      key: "drawTileBush",
      value: function drawTileBush(tileId, rect) {
        if (!$gameMap.tileIdIsBush(tileId)) {
          return;
        }

        this.contents.drawText('~', rect.x, rect.y, rect.width, rect.height - 8, 'center');
        this.contents.drawText('~', rect.x, rect.y + 8, rect.width, rect.height - 8, 'center');
      }
    }, {
      key: "drawTileCounter",
      value: function drawTileCounter(tileId, rect) {
        if (!$gameMap.tileIdIsCounter(tileId)) {
          return;
        }

        var context = this.contents.context;
        var w = Math.floor(rect.width / 2);
        var h = Math.floor(rect.height / 2);
        var x = rect.x + w;
        var y = rect.y + h / 2;
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
    }, {
      key: "drawTileDamage",
      value: function drawTileDamage(tileId, rect) {
        if (!$gameMap.tileIdIsDamage(tileId)) {
          return;
        }

        this.contents.drawText('DMG', rect.x, rect.y, rect.width, rect.height, 'center');
      }
    }, {
      key: "drawTileTerrain",
      value: function drawTileTerrain(tileId, rect) {
        var tag = $gameMap.tileIdTerrainTag(tileId);

        if (!tag) {
          return;
        }

        this.contents.drawText(tag, rect.x, rect.y, rect.width, rect.height, 'center');
      }
    }, {
      key: "drawAllItems",
      value: function drawAllItems() {
        _get(_getPrototypeOf(WindowCycloneMapEditor.prototype), "drawAllItems", this).call(this);

        this.drawSelection();
      }
    }, {
      key: "drawMessySelection",
      value: function drawMessySelection() {
        this._selectionIndex = -1;

        for (var index = 0; index < this._list.length; index++) {
          var item = this._list[index];
          var isSelected = Tilemap.isSameKindTile(item.name, CycloneMapEditor.currentTileId);

          if (isSelected) {
            this._selectionIndex = index;
          } else {
            var _iterator17 = _createForOfIteratorHelper(CycloneMapEditor.selectedTileList),
                _step17;

            try {
              for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                var tileId = _step17.value;

                if (Tilemap.isSameKindTile(tileId, item.name)) {
                  isSelected = true;
                }
              }
            } catch (err) {
              _iterator17.e(err);
            } finally {
              _iterator17.f();
            }
          }

          if (!isSelected) {
            continue;
          }

          this._drawSelection(index, 1, 1);
        }
      }
    }, {
      key: "_drawSelection",
      value: function _drawSelection(topIndex, rowDrawCount, colDrawCount) {
        var rect = this.itemRect(topIndex);
        var x = rect.x,
            y = rect.y;

        if (CycloneMapEditor.puzzleMode) {
          rowDrawCount = 0.5;
          colDrawCount = 0.5;
        } else if (!this._manualTileSelected && CycloneMapEditor.selectedTileList.length >= 2 && Tilemap.isSameKindTile(CycloneMapEditor.selectedTileList[0], CycloneMapEditor.selectedTileList[1])) {
          rowDrawCount = 1;
          colDrawCount = 1;
        }

        var selectionWidth = CycloneMapEditor.tileDrawWidth * colDrawCount;
        var selectionHeight = CycloneMapEditor.tileDrawHeight * rowDrawCount;
        var context = this.contents.context;
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
    }, {
      key: "isSelectedTile",
      value: function isSelectedTile(tileId) {
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
    }, {
      key: "drawSelection",
      value: function drawSelection() {
        if (CycloneMapEditor.changingTileProps) {
          return;
        }

        if (CycloneMapEditor.messySelection) {
          this.drawMessySelection();
          return;
        }

        var cols = this.maxCols();
        this._selectionIndex = -1;

        for (var index = 0; index < this._list.length; index++) {
          var item = this._list[index];

          if (!this.isSelectedTile(item.name)) {
            continue;
          }

          this._selectionIndex = index;
          var col = index % cols;
          var row = Math.floor(index / cols);
          var rowCount = CycloneMapEditor.tileRows;
          var colCount = CycloneMapEditor.tileCols;
          var rowDrawCount = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
          var colDrawCount = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

          while (rowCount <= 0) {
            rowCount++;
            row--;
          }

          while (colCount <= 0) {
            colCount++;
            col--;
          }

          var topIndex = row * cols + col;

          this._drawSelection(topIndex, rowDrawCount, colDrawCount);

          break;
        }
      }
    }, {
      key: "playCursorSound",
      value: function playCursorSound() {}
    }, {
      key: "playOkSound",
      value: function playOkSound() {}
    }, {
      key: "playBuzzerSound",
      value: function playBuzzerSound() {}
    }, {
      key: "selectTileId",
      value: function selectTileId(tileId) {
        var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (CycloneMapEditor.currentTool === 'eraser') {
          CycloneMapEditor.restoreLastDrawingTool();
        }

        CycloneMapEditor.currentTileId = tileId;
        CycloneMapEditor.tileCols = cols !== null && cols !== void 0 ? cols : 1;
        CycloneMapEditor.tileRows = rows !== null && rows !== void 0 ? rows : 1;
        CycloneMapEditor.messySelection = false;
        CycloneMapEditor.multiLayerSelection = [];

        var topIndex = this._list.findIndex(function (item) {
          return item.name === tileId;
        });

        if (topIndex < 0) {
          CycloneMapEditor.currentTileId = undefined;
          CycloneMapEditor.selectedTileList = [];
          this.redraw();
          return;
        }

        CycloneMapEditor.selectedTileList = Array(cols * rows);
        CycloneMapEditor.selectedTileList[0] = CycloneMapEditor.currentTileId;
        var maxCols = this.maxCols();
        var topRow = Math.floor(topIndex / maxCols);
        var leftCol = topIndex % maxCols;
        var selectionIndex = 0;

        for (var y = topRow; y < topRow + CycloneMapEditor.tileRows; y++) {
          for (var _x15 = leftCol; _x15 < leftCol + CycloneMapEditor.tileCols; _x15++) {
            var newIndex = y * maxCols + _x15;
            var newTileId = this.commandName(newIndex);
            CycloneMapEditor.selectedTileList[selectionIndex] = newTileId;
            selectionIndex++;
          }
        }

        this.redraw();
      }
    }, {
      key: "startSelectingTile",
      value: function startSelectingTile() {
        if (!this._mouseDown) {
          var index = this.hitIndex();

          if (index < 0) {
            return;
          }

          var tileId = this.commandName(index);
          this.selectTileId(tileId);
          this._mouseDown = true;
        }
      }
    }, {
      key: "findName",
      value: function findName(name) {
        return this._list.findIndex(function (item) {
          return item.name === name;
        });
      }
    }, {
      key: "continueSelectingTile",
      value: function continueSelectingTile() {
        var index = this.hitIndex();
        var prevCols = CycloneMapEditor.tileCols;
        var prevRows = CycloneMapEditor.tileRows;

        if (index >= 0) {
          var initialIndex = this.findName(CycloneMapEditor.currentTileId);

          if (initialIndex < 0) {
            initialIndex = this._index;
          }

          var initialCol = initialIndex % this.maxCols();
          var initialRow = Math.floor(initialIndex / this.maxCols());
          var newCol = index % this.maxCols();
          var newRow = Math.floor(index / this.maxCols());
          CycloneMapEditor.tileCols = newCol - initialCol + 1;
          CycloneMapEditor.tileRows = newRow - initialRow + 1;
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
    }, {
      key: "finalizeTileSelection",
      value: function finalizeTileSelection() {
        this._mouseDown = false;
        var cols = this.maxCols();

        for (var index = 0; index < this._list.length; index++) {
          var item = this._list[index];

          if (item.name !== CycloneMapEditor.currentTileId) {
            continue;
          }

          var col = index % cols;
          var row = Math.floor(index / cols);
          var rowCount = CycloneMapEditor.tileRows;
          var colCount = CycloneMapEditor.tileCols;
          var newTileRows = CycloneMapEditor.tileRows <= 0 ? Math.abs(CycloneMapEditor.tileRows) + 2 : CycloneMapEditor.tileRows;
          var newTileCols = CycloneMapEditor.tileCols <= 0 ? Math.abs(CycloneMapEditor.tileCols) + 2 : CycloneMapEditor.tileCols;

          while (rowCount <= 0) {
            rowCount++;
            row--;
          }

          while (colCount <= 0) {
            colCount++;
            col--;
          }

          var topIndex = row * cols + col;

          if (topIndex >= 0) {
            var newTileId = this.commandName(topIndex);

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
    }, {
      key: "activateManualTile",
      value: function activateManualTile() {
        var index = this.hitIndex();

        if (index < 0) {
          return;
        }

        var tileId = this.commandName(index);

        if (Tilemap.isAutotile(tileId)) {
          this._manualTileSelected = tileId;
          this._selectionIndex = -1;
        }
      }
    }, {
      key: "toggleManualTiles",
      value: function toggleManualTiles() {
        if (this._manualTileSelected === undefined) {
          this.activateManualTile();
        } else {
          this._manualTileSelected = undefined;
        }

        this.refresh();
        this._mouseDown = false;
        CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
      }
    }, {
      key: "processTouchScroll",
      value: function processTouchScroll() {
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
    }, {
      key: "update",
      value: function update() {
        var shift = Input.isPressed('shift');

        if (shift !== this._oldShift) {
          this._needsRedraw = true;
          this._oldShift = shift;
        }

        if (this._needsRedraw) {
          this._needsRedraw = false;
          this.redraw();
        }

        _get(_getPrototypeOf(WindowCycloneMapEditor.prototype), "update", this).call(this);
      }
    }]);

    return WindowCycloneMapEditor;
  }(Window_Command);

  var lastDisplayX = 0;
  var lastDisplayY = 0;
  CycloneMapEditor.patchClass(Scene_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "createAllWindows",
        value: function createAllWindows() {
          $super.createAllWindows.call(this);
          this.createMapEditorWindows();
          CycloneMapEditor.clearAllData();
          this.refreshMapEditorWindows();
          CycloneMapEditor.addMenuBar();
          CycloneMapEditor.loadExtraData();
        }
      }, {
        key: "toggleMapEditor",
        value: function toggleMapEditor() {
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
      }, {
        key: "createMapEditorWindows",
        value: function createMapEditorWindows() {
          CycloneMapEditor.tileWidth = $gameMap.tileWidth();
          CycloneMapEditor.tileHeight = $gameMap.tileHeight();
          var neededWidth = CycloneMapEditor.tileDrawWidth * 8 + 24;

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
      }, {
        key: "refreshMapEditorWindows",
        value: function refreshMapEditorWindows() {
          var _CycloneMapEditor2 = CycloneMapEditor,
              active = _CycloneMapEditor2.active;
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
      }, {
        key: "redrawMap",
        value: function redrawMap() {
          this._spriteset._tilemap.refresh();
        }
      }, {
        key: "processMapTouch",
        value: function processMapTouch() {
          if (!CycloneMapEditor.active) {
            $super.processMapTouch.call(this);
            return;
          }

          this._touchCount = 0;

          if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
            this.onMapTouch();
          }
        }
      }, {
        key: "onMapTouch",
        value: function onMapTouch() {
          if (!CycloneMapEditor.active) {
            $super.onMapTouch.call(this);
            return;
          }
        }
      }, {
        key: "editorX",
        value: function editorX() {
          return Graphics.width - CycloneMapEditor.windowWidth;
        }
      }, {
        key: "canUpdateMouse",
        value: function canUpdateMouse() {
          return CycloneMapEditor.active && this._mapEditorWindow && this._mapEditorLayerListWindow;
        }
      }, {
        key: "updateMenuTouch",
        value: function updateMenuTouch(x, y, pressed) {
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
      }, {
        key: "updateRightMouse",
        value: function updateRightMouse() {
          if (!this.canUpdateMouse()) {
            CycloneMapEditor.isRightButtonDown = false;
            CycloneMapEditor.wasRightButtonDown = false;
            return;
          }

          if (!CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown) {
            return;
          }

          var _TouchInput = TouchInput,
              x = _TouchInput.x,
              y = _TouchInput.y;

          if (this.updateMenuTouch(x, y, CycloneMapEditor.isRightButtonDown)) {
            return;
          }

          var mapX = CycloneMapEditor.canvasToMapX(x);
          var mapY = CycloneMapEditor.canvasToMapY(y);

          if (mapX >= 0 && mapY >= 0) {
            CycloneMapEditor.updateRightTouch(mapX, mapY);
          }

          CycloneMapEditor.wasRightButtonDown = CycloneMapEditor.isRightButtonDown;
        }
      }, {
        key: "updateDisplayPositionData",
        value: function updateDisplayPositionData() {
          if (lastDisplayX === $gameMap._displayX && lastDisplayY === $gameMap._displayY) {
            return;
          }

          var xDiff = $gameMap._displayX - lastDisplayX;
          var yDiff = $gameMap._displayY - lastDisplayY;

          if (xDiff > 10 || yDiff > 10) {
            // If the difference is too big, then we don't update
            return;
          }

          if ((CycloneMapEditor.rectangleWidth > 0 || CycloneMapEditor.rectangleBackWidth > 0) && (CycloneMapEditor.rectangleHeight > 0 || CycloneMapEditor.rectangleBackHeight > 0)) {
            CycloneMapEditor.rectangleStartMouseX += xDiff * CycloneMapEditor.tileWidth;
            CycloneMapEditor.rectangleStartMouseY += yDiff * CycloneMapEditor.tileHeight;
          }
        }
      }, {
        key: "getSelectionTileAt",
        value: function getSelectionTileAt(x, y) {
          if (x <= this._mapEditorWindow.x || x >= this._mapEditorWindow.x + this._mapEditorWindow.width) {
            return CycloneMapEditor.currentTileId;
          }

          if (y >= this._mapEditorWindow.height + this._mapEditorWindow.y) {
            return CycloneMapEditor.currentTileId;
          }

          var index = this._mapEditorWindow.hitIndex();

          if (index >= 0) {
            return this._mapEditorWindow.commandName(index);
          }
        }
      }, {
        key: "updateMouse",
        value: function updateMouse() {
          var _this$getSelectionTil;

          if (!this.canUpdateMouse()) {
            CycloneMapEditor.wasPressing = false;
            return;
          }

          this.updateDisplayPositionData();
          lastDisplayX = $gameMap._displayX;
          lastDisplayY = $gameMap._displayY;
          var pressed = TouchInput.isPressed();
          var _TouchInput2 = TouchInput,
              x = _TouchInput2.x,
              y = _TouchInput2.y;
          var mapX = CycloneMapEditor.canvasToMapX(x);
          var mapY = CycloneMapEditor.canvasToMapY(y);
          var fx = Math.floor(mapX);
          var fy = Math.floor(mapY);
          var tile1 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 0, true);
          var tile2 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 1, true);
          var tile3 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 2, true);
          var tile4 = CycloneMapEditor.getCurrentTileAtPosition(fx, fy, 3, true);
          var tileId = (_this$getSelectionTil = this.getSelectionTileAt(x, y)) !== null && _this$getSelectionTil !== void 0 ? _this$getSelectionTil : '';
          CycloneMapEditor.updateStatus({
            mapX: mapX,
            mapY: mapY,
            tile1: tile1,
            tile2: tile2,
            tile3: tile3,
            tile4: tile4,
            tileId: tileId
          });

          if (!pressed && !CycloneMapEditor.wasPressing) {
            return;
          }

          if (this.updateMenuTouch(x, y, pressed)) {
            return;
          }

          var minX = 0;
          var minY = 0;

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
      }, {
        key: "isMenuEnabled",
        value: function isMenuEnabled() {
          if (CycloneMapEditor.active) {
            return false;
          }

          return $super.isMenuEnabled.call(this);
        }
      }, {
        key: "update",
        value: function update() {
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
      }]);

      return _class5;
    }();
  });
  CycloneMapEditor.patchClass(SceneManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, null, [{
        key: "onSceneTerminate",
        value: function onSceneTerminate() {
          CycloneMapEditor.refreshMenuVisibility();
        }
      }]);

      return _class6;
    }();
  });

  var SpriteMapEditorCursor = /*#__PURE__*/function (_Sprite) {
    _inherits(SpriteMapEditorCursor, _Sprite);

    var _super10 = _createSuper(SpriteMapEditorCursor);

    function SpriteMapEditorCursor() {
      _classCallCheck(this, SpriteMapEditorCursor);

      return _super10.apply(this, arguments);
    }

    _createClass(SpriteMapEditorCursor, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(SpriteMapEditorCursor.prototype), "initialize", this).call(this, new Bitmap(CycloneMapEditor.tileWidth, CycloneMapEditor.tileHeight));
      }
    }, {
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(SpriteMapEditorCursor.prototype), "update", this).call(this);

        if (this.visible !== CycloneMapEditor.active) {
          this.visible = CycloneMapEditor.active;
        }

        if (CycloneMapEditor.active) {
          this.updatePosition();
        }
      }
    }, {
      key: "updateDrawing",
      value: function updateDrawing() {
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
            if (!CycloneMapEditor.rectangleWidth && !CycloneMapEditor.rectangleBackWidth || !CycloneMapEditor.rectangleHeight && !CycloneMapEditor.rectangleBackHeight) {
              this.updateTiles();
              return;
            }

            return this.updateRectangle();

          default:
            return this.updateOther();
        }
      }
    }, {
      key: "getNewBitmapWidth",
      value: function getNewBitmapWidth() {
        return (CycloneMapEditor.tileWidth * (CycloneMapEditor.rectangleWidth || CycloneMapEditor.rectangleBackWidth + 1) || 1) / CycloneMapEditor.getGridRatio();
      }
    }, {
      key: "getNewBitmapHeight",
      value: function getNewBitmapHeight() {
        return (CycloneMapEditor.tileHeight * (CycloneMapEditor.rectangleHeight || CycloneMapEditor.rectangleBackHeight + 1) || 1) / CycloneMapEditor.getGridRatio();
      }
    }, {
      key: "updateRectangle",
      value: function updateRectangle() {
        var width = this.getNewBitmapWidth();
        var height = this.getNewBitmapHeight();

        if (width !== this.bitmap.width || height !== this.bitmap.height) {
          this.bitmap = new Bitmap(width, height);
        } else {
          this.bitmap.clear();
        }

        var fillColor = CycloneMapEditor.isRightButtonDown ? '#00000033' : '#00FF0033';

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
    }, {
      key: "updateBrush",
      value: function updateBrush() {
        var size = Input.isPressed('shift') ? 4 : 2;
        var width = $gameMap.tileWidth() / size;
        var height = $gameMap.tileHeight() / size;

        if (width !== this.bitmap.width || height !== this.bitmap.height) {
          this.bitmap = new Bitmap(width, height);
        } else {
          this.bitmap.clear();
        }

        var fillColor = CycloneMapEditor.currentTool === Tools.eraser ? '#99000099' : '#00999999';
        this.bitmap.drawCircle(width / 2, height / 2, Math.min(width, height) / 2, fillColor);
      }
    }, {
      key: "updateEraser",
      value: function updateEraser() {
        var width = this.getNewBitmapWidth();
        var height = this.getNewBitmapHeight();

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
    }, {
      key: "drawMultiLayerTiles",
      value: function drawMultiLayerTiles() {
        for (var z = 0; z < CycloneMapEditor.multiLayerSelection.length; z++) {
          var column = 0;
          var row = 0;

          var _iterator18 = _createForOfIteratorHelper(CycloneMapEditor.multiLayerSelection[z]),
              _step18;

          try {
            for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
              var tileId = _step18.value;

              if (column >= CycloneMapEditor.tileCols) {
                column = 0;
                row++;
              }

              var _x16 = column * CycloneMapEditor.tileWidth;

              var y = row * CycloneMapEditor.tileHeight;
              this.bitmap.drawTile(tileId, _x16, y);
              column++;
            }
          } catch (err) {
            _iterator18.e(err);
          } finally {
            _iterator18.f();
          }
        }
      }
    }, {
      key: "drawTiles",
      value: function drawTiles() {
        if (CycloneMapEditor.currentLayer === Layers.auto && CycloneMapEditor.multiLayerSelection.length) {
          this.drawMultiLayerTiles();
          return;
        }

        var column = 0;
        var row = 0;

        var _iterator19 = _createForOfIteratorHelper(CycloneMapEditor.selectedTileList),
            _step19;

        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var tileId = _step19.value;

            if (column >= CycloneMapEditor.tileCols) {
              column = 0;
              row++;
            }

            var _x17 = column * CycloneMapEditor.tileWidth;

            var y = row * CycloneMapEditor.tileHeight;

            if (CycloneMapEditor.currentLayer === 5) {
              this.bitmap.drawRegion(tileId, _x17, y);
            } else if (CycloneMapEditor.currentLayer === 4) {
              this.bitmap.drawShadow(tileId, _x17, y);
            } else if (CycloneMapEditor.currentLayer === 8) {
              this.drawCollision(tileId, _x17, y);
            } else if (CycloneMapEditor.puzzleMode) {
              this.bitmap.drawPuzzlePiece(tileId, _x17, y, CycloneMapEditor.tileWidth / 2, CycloneMapEditor.tileHeight / 2);
            } else {
              this.bitmap.drawTile(tileId, _x17, y);
            }

            column++;
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
      }
    }, {
      key: "drawCollision",
      value: function drawCollision(tileId, x, y) {
        var drawWidth = CycloneMapEditor.tileWidth;
        var drawHeight = CycloneMapEditor.tileHeight;

        if (tileId === 0) {
          return;
        }

        this.bitmap.drawCollisionType(tileId, x, y, drawWidth, drawHeight);
      }
    }, {
      key: "updateOther",
      value: function updateOther() {
        this.bitmap.clear();
      }
    }, {
      key: "updateTiles",
      value: function updateTiles() {
        var gridRatio = CycloneMapEditor.getGridRatio();
        var width = CycloneMapEditor.tileWidth * CycloneMapEditor.tileCols / gridRatio;
        var height = CycloneMapEditor.tileHeight * CycloneMapEditor.tileRows / gridRatio;

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
    }, {
      key: "getCursorTileX",
      value: function getCursorTileX() {
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
    }, {
      key: "getCursorTileY",
      value: function getCursorTileY() {
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
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        if (!CycloneMapEditor.active) {
          return;
        }

        var tileX = this.getCursorTileX();
        var tileY = this.getCursorTileY();
        var offsetX = 0;
        var offsetY = 0;

        if (CycloneMapEditor.isLayerVisible(Layers.blend) && [Tools.eraser, Tools.pencil].includes(CycloneMapEditor.currentTool)) {
          offsetX -= Math.floor(this.bitmap.width / 2);
          offsetY -= Math.floor(this.bitmap.height / 2);
        }

        this.x = Math.floor($gameMap.adjustX(tileX) * CycloneMapEditor.tileWidth) + offsetX;
        this.y = Math.floor($gameMap.adjustY(tileY) * CycloneMapEditor.tileHeight) + offsetY;
      }
    }]);

    return SpriteMapEditorCursor;
  }(Sprite);

  CycloneMapEditor.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "initialize",
        value: function initialize() {
          $super.initialize.call(this);
          this.createMapEditorCursor();
        }
      }, {
        key: "createMapEditorCursor",
        value: function createMapEditorCursor() {
          this._mapEditorCursor = new SpriteMapEditorCursor();
          this.addChild(this._mapEditorCursor);
        }
      }, {
        key: "forceBlenderRefresh",
        value: function forceBlenderRefresh() {
          var hardRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (!window.CycloneMagic) {
            return;
          }

          if (hardRefresh) {
            var _iterator20 = _createForOfIteratorHelper(this._blenderTileSprites),
                _step20;

            try {
              for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                var sprite = _step20.value;
                sprite.parent.removeChild(sprite);
                sprite.destroy();
              }
            } catch (err) {
              _iterator20.e(err);
            } finally {
              _iterator20.f();
            }

            this._blenderTileSprites = [];
            this.createBlenderTiles();
            return;
          }

          var magicTiles = $gameMap.magicTiles();

          var _iterator21 = _createForOfIteratorHelper(magicTiles),
              _step21;

          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var tile = _step21.value;
              var found = false;

              var _iterator22 = _createForOfIteratorHelper(this._blenderTileSprites),
                  _step22;

              try {
                for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                  var _sprite = _step22.value;

                  if (_sprite._mapX !== tile.x || _sprite._mapY !== tile.y) {
                    continue;
                  }

                  found = true;

                  if (!window.CycloneMagic.isSpriteCached(_sprite.spriteId)) {
                    _sprite._bitmap = null;
                  }

                  break;
                }
              } catch (err) {
                _iterator22.e(err);
              } finally {
                _iterator22.f();
              }

              if (!found) {
                var newSprite = new window.CycloneMagic.SpriteBlenderTile(tile.tiles, tile.x, tile.y, 1, 1);

                this._blenderTileSprites.push(newSprite);

                this._tilemap.addChild(newSprite);
              }
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }

          this._tilemap.refresh();
        } // updatePosition() {
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

      }]);

      return _class7;
    }();
  });
  CycloneMapEditor.patchClass(Tilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class8() {
        _classCallCheck(this, _class8);
      }

      _createClass(_class8, [{
        key: "_readMapData",
        value: function _readMapData(x, y, z) {
          var _CycloneMapEditor$pre;

          if (!$gameMap.isValid(x, y)) {
            return 0;
          }

          if (z <= 4 && !CycloneMapEditor.layerVisibility[z]) {
            return 0;
          }

          var tileIndex = CycloneMapEditor.tileIndex(x, y, z);

          if (((_CycloneMapEditor$pre = CycloneMapEditor.previewChanges) === null || _CycloneMapEditor$pre === void 0 ? void 0 : _CycloneMapEditor$pre[tileIndex]) !== undefined) {
            return CycloneMapEditor.previewChanges[tileIndex];
          }

          return $super._readMapData.call(this, x, y, z);
        }
      }, {
        key: "canUpdateAnimationCount",
        value: function canUpdateAnimationCount() {
          if (CycloneMapEditor.active && CycloneMapEditor.isLayerVisible(Layers.blend) && TouchInput.isPressed()) {
            return false;
          }

          return true;
        }
      }, {
        key: "update",
        value: function update() {
          // Prevent the water animation while modifying blending
          if (!this.canUpdateAnimationCount()) {
            this.animationCount--;
          }

          $super.update.call(this);
        }
      }]);

      return _class8;
    }();
  });
  CycloneMapEditor.patchClass(TouchInput, function ($super) {
    return /*#__PURE__*/function () {
      function _class9() {
        _classCallCheck(this, _class9);
      }

      _createClass(_class9, null, [{
        key: "_onLeftButtonDown",
        value: function _onLeftButtonDown(event) {
          $super._onLeftButtonDown.call(this, event);

          if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.updateMouse();
          }
        }
      }, {
        key: "_onMouseMove",
        value: function _onMouseMove(event) {
          $super._onMouseMove.call(this, event);

          if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.updateMouse();

            SceneManager._scene.updateRightMouse();
          }
        }
      }, {
        key: "_onMouseUp",
        value: function _onMouseUp(event) {
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
      }, {
        key: "_onRightButtonDown",
        value: function _onRightButtonDown(event) {
          $super._onRightButtonDown.call(this, event);

          if (SceneManager._scene instanceof Scene_Map) {
            CycloneMapEditor.isRightButtonDown = true;

            SceneManager._scene.updateRightMouse();
          }
        }
      }]);

      return _class9;
    }();
  });
  CycloneMapEditor.patchClass(Sprite_Character, function ($super) {
    return /*#__PURE__*/function () {
      function _class10() {
        _classCallCheck(this, _class10);
      }

      _createClass(_class10, [{
        key: "update",
        value: function update() {
          var _$super$update;

          if (CycloneMapEditor.active) {
            this.visible = CycloneMapEditor.isLayerVisible(Layers.events);

            if (!this.visible) {
              return;
            }
          }

          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          (_$super$update = $super.update).call.apply(_$super$update, [this].concat(args));
        }
      }]);

      return _class10;
    }();
  });

  WindowCycloneGrid.prototype.initialize = function () {
    var width = Graphics.width;
    var height = Graphics.height;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    this.opacity = 0;
    this.backOpacity = 0;
    this.hide();
    this.deactivate();
  };

  WindowCycloneGrid.prototype.standardPadding = function () {
    return 0;
  };

  WindowCycloneMapEditor.prototype.initialize = function () {
    var x = Graphics.width - CycloneMapEditor.windowWidth;
    var y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
    Window_Command.prototype.initialize.call(this, x, y);
    this.showBackgroundDimmer();
  };

  WindowCycloneMapEditor.prototype.windowWidth = function () {
    return CycloneMapEditor.windowWidth;
  };

  WindowCycloneMapEditor.prototype.windowHeight = function () {
    var y = SceneManager._scene._mapEditorTabsWindow.y + SceneManager._scene._mapEditorTabsWindow.height;
    return Graphics.height - y - SceneManager._scene._mapEditorStatus.height;
  };

  WindowCycloneMapEditor.prototype.spacing = function () {
    return 0;
  };

  WindowCycloneMapEditor.prototype.standardPadding = function () {
    return 8;
  };

  WindowCycloneMapEditor.prototype.processTouch = function () {
    return this.processTouchScroll();
  };

  WindowCycloneMapEditor.prototype._updateCursor = function () {
    this._windowCursorSprite.visible = false;
  };

  WindowCycloneMapEditorCommands.prototype.initialize = function () {
    var x = Graphics.width - CycloneMapEditor.windowWidth;
    var y = 0;
    Window_Command.prototype.initialize.call(this, x, y);
    this.showBackgroundDimmer();
    this.configureHandlers();
  };

  WindowCycloneMapEditorCommands.prototype.windowWidth = function () {
    return CycloneMapEditor.windowWidth;
  };

  WindowCycloneMapEditorCommands.prototype.windowHeight = function () {
    return 74;
  };

  WindowCycloneMapEditorCommands.prototype.standardPadding = function () {
    return 8;
  };

  WindowCycloneMapEditorCommands.prototype.spacing = function () {
    return 6;
  };

  WindowCycloneMapEditorCommands.prototype._updateCursor = function () {
    this._windowCursorSprite.visible = false;
  };

  WindowCycloneMapEditorCommands.prototype.itemHeight = function () {
    return this.lineHeight() + 8;
  };

  WindowCycloneMapEditorCommands.prototype.onTouch = function (triggered) {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);

    if (hitIndex >= 0) {
      this.select(hitIndex);

      if (triggered) {
        this.processOk();
      }
    }
  };

  WindowCycloneMapEditorLayerList.prototype.initialize = function () {
    var x = 0;
    var y = 0;
    var h = Graphics.height - 40;
    var w = 180;
    Window_Base.prototype.initialize.call(this, x, y, w, h);
    this.showBackgroundDimmer();
  };

  WindowCycloneMapEditorLayerList.prototype.standardPadding = function () {
    return 8;
  };

  WindowCycloneMapEditorStatus.prototype.initialize = function () {
    var h = 40;
    Window_Base.prototype.initialize.call(this, 0, Graphics.height - h, Graphics.width, h);
    this.showBackgroundDimmer();
  };

  WindowCycloneMapEditorStatus.prototype.textY = function () {
    return 2;
  };

  WindowCycloneMapEditorStatus.prototype.standardPadding = function () {
    return 8;
  };

  WindowCycloneMapEditorStatus.prototype.drawRightLine = function () {
    this.drawText("TileId: ".concat(CycloneMapEditor.statusTileId), 0, this.textY(), this.width - 16, 'right');
  };

  WindowCycloneMapEditorTabs.prototype.initialize = function () {
    var x = Graphics.width - CycloneMapEditor.windowWidth;
    var y = SceneManager._scene._mapEditorCommands.y + SceneManager._scene._mapEditorCommands.height;
    Window_Command.prototype.initialize.call(this, x, y);
    this.showBackgroundDimmer();
    this.configureHandlers();
  };

  WindowCycloneMapEditorTabs.prototype.windowWidth = function () {
    return CycloneMapEditor.windowWidth;
  };

  WindowCycloneMapEditorTabs.prototype.windowHeight = function () {
    return 65;
  };

  WindowCycloneMapEditorTabs.prototype.standardPadding = function () {
    return 8;
  };

  WindowCycloneMapEditorTabs.prototype.spacing = function () {
    return 6;
  };

  WindowCycloneMapEditorTabs.prototype._updateCursor = function () {
    this._windowCursorSprite.visible = false;
  };

  WindowCycloneMapEditorTabs.prototype.itemHeight = function () {
    return this.lineHeight() + 8;
  };

  WindowCycloneMapEditorTabs.prototype.onTouch = function (triggered) {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);

    if (hitIndex >= 0) {
      this.select(hitIndex);

      if (triggered) {
        this.processOk();
      }
    }
  };

  CycloneMapEditor.patchClass(Scene_Boot, function ($super) {
    return /*#__PURE__*/function () {
      function _class11() {
        _classCallCheck(this, _class11);
      }

      _createClass(_class11, [{
        key: "resizeScreen",
        value: function resizeScreen() {
          if (Utils.isNwjs() && Graphics.width < 1280) {
            var minWidth = Math.min(1920, screen.availWidth - (window.outerWidth - window.innerWidth));
            var minHeight = Math.min(1080, screen.availHeight - (window.outerHeight - window.innerHeight));

            if (Graphics.width < minWidth) {
              Graphics.width = minWidth;
            }

            if (Graphics.boxWidth < minWidth) {
              Graphics.boxWidth = minWidth;
            }

            if (Graphics.height < minHeight) {
              Graphics.height = minHeight;
            }

            if (Graphics.boxHeight < minHeight) {
              Graphics.boxHeight = minHeight;
            }

            var xDelta = Graphics.width - window.innerWidth;
            var yDelta = Graphics.height - window.innerHeight;
            window.moveBy(-xDelta / 2, -yDelta / 2);
            window.resizeBy(xDelta, yDelta);
          }
        }
      }, {
        key: "start",
        value: function start() {
          $super.start.call(this);
          this.resizeScreen();
        }
      }]);

      return _class11;
    }();
  });

  CycloneMapEditor.isFullScreen = function () {
    // MV's _isFullScreen was broken, it would return the opposite value
    return !Graphics._isFullScreen();
  };
})();
