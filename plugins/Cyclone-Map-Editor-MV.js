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

/*:
 * @plugindesc Live Map Editor
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
 * Live  Map Editor                                                  by Hudell
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

  var trueStrings = Object.freeze(['TRUE', 'ON', '1', 'YES', 'T', 'V']);

  var CyclonePlugin = /*#__PURE__*/function () {
    function CyclonePlugin() {
      _classCallCheck(this, CyclonePlugin);
    }

    _createClass(CyclonePlugin, null, [{
      key: "initialize",
      value: function initialize(pluginName) {
        this.pluginName = pluginName;
        this.fileName = undefined;
        this.superClasses = new Map();
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
            console.error("CycloneEngine crashed while trying to parse a parameter value (".concat(key, "). Please report the following error to Hudell:"));
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
          receiver[descriptorName] = giver[descriptorName];
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

            this._assignDescriptor($super, baseClassOrPrototype, baseDescriptor, methodName);
          }

          var descriptor = descriptors[methodName];

          this._assignDescriptor(baseClassOrPrototype, patchClassOrPrototype, descriptor, methodName);
        }

        return anyOverride;
      }
    }, {
      key: "patchClass",
      value: function patchClass(baseClass, patchFn) {
        var $super = {};
        var $prototype = {};
        var $dynamicSuper = {};
        var patchClass = patchFn($dynamicSuper, $prototype);

        if (typeof patchClass !== 'function') {
          throw new Error("Invalid class patch for ".concat(baseClass.name));
        }

        var ignoredStaticNames = Object.getOwnPropertyNames( /*#__PURE__*/function () {
          function _class() {
            _classCallCheck(this, _class);
          }

          return _class;
        }());
        var ignoredNames = Object.getOwnPropertyNames( /*#__PURE__*/function () {
          function _class2() {
            _classCallCheck(this, _class2);
          }

          return _class2;
        }().prototype);

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
            console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be an integer number, but the received value was '").concat(value, "'."));
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
            console.error("Cyclone Engine plugin ".concat(this.pluginName, ": Param is expected to be a number, but the received value was '").concat(value, "'."));
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
              console.error("Cyclone Engine plugin ".concat(_this2.pluginName, ": Param is expected to be a list of integer numbers, but one of the items was '").concat(item, "'."));
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
              console.error("Cyclone Engine plugin ".concat(_this3.pluginName, ": Param ").concat(name, " is expected to be a list of numbers, but one of the items was '").concat(item, "'."));
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
          console.error("Unknown plugin param type: ".concat(type));
          return data;
        }

        var structType = this.structs.get(structTypeName);

        if (!structType) {
          console.error("Unknown param structure type: ".concat(structTypeName));
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
      key: "buildMetadata",
      value: function buildMetadata(notes) {
        var rgx = /<([^<>:]+)(:?)([^>]*)>/g;
        var matches = notes.matchAll(rgx);
        var values = new Map();

        var _iterator6 = _createForOfIteratorHelper(matches),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var match = _step6.value;

            if (match.length > 3 && match[2] === ':') {
              values.set(match[1], match[3]);
            } else {
              values.set(match[1], true);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        return values;
      }
    }, {
      key: "defaultIfNaN",
      value: function defaultIfNaN(value, defaultValue) {
        if (isNaN(Number(value))) {
          return defaultValue;
        }

        return value;
      }
    }, {
      key: "getValueMaybeVariable",
      value: function getValueMaybeVariable(rawValue) {
        var value = rawValue.trim();

        if (value.startsWith('$')) {
          var variableId = parseInt(value.slice(1));

          if (isNaN(variableId)) {
            throw new Error("Invalid Variable ID: ".concat(variableId));
          }

          if (variableId === 0) {
            return 0;
          }

          return $gameVariables.value(variableId);
        }

        return value;
      }
    }, {
      key: "debounce",
      value: function debounce(fn, delay) {
        var clearTimer;
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var context = this;
          clearTimeout(clearTimer);
          clearTimer = setTimeout(function () {
            return fn.call.apply(fn, [context].concat(args));
          }, delay);
        };
      }
    }, {
      key: "_addProperty",
      value: function _addProperty(classObj, propName, _ref11) {
        var getterFn = _ref11.getter,
            setterFn = _ref11.setter,
            _ref11$lazy = _ref11.lazy,
            lazy = _ref11$lazy === void 0 ? false : _ref11$lazy;

        if (lazy) {
          // Creates a property that replaces itself with the value the first time it's called.
          return Object.defineProperty(classObj, propName, {
            get: function get() {
              // eslint-disable-line object-shorthand
              delete this[propName];
              var value = getterFn.call(this);
              Object.defineProperty(this, propName, {
                value: value
              });
              return value;
            },
            set: setterFn === true ? function (value) {
              this["_".concat(propName)] = value;
            } : undefined,
            configurable: true
          });
        }

        return Object.defineProperty(classObj, propName, {
          get: getterFn !== null && getterFn !== void 0 ? getterFn : function () {
            return this["_".concat(propName)];
          },
          set: setterFn === false ? undefined : typeof setterFn === 'function' ? setterFn : function (value) {
            this["_".concat(propName)] = value;
          },
          configurable: false
        });
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
  }();

  var Layers = {
    shadows: 4,
    regions: 5,
    auto: 7,
    collisions: 8,
    tags: 9
  };

  var MapshotTileMap = /*#__PURE__*/function (_Bitmap) {
    _inherits(MapshotTileMap, _Bitmap);

    var _super = _createSuper(MapshotTileMap);

    function MapshotTileMap() {
      var _this5;

      _classCallCheck(this, MapshotTileMap);

      var tileWidth = $gameMap.tileWidth();
      var tileHeight = $gameMap.tileHeight();
      var width = $gameMap.width() * tileWidth;
      var height = $gameMap.height() * tileHeight;
      _this5 = _super.call(this, width, height);
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

        var _iterator7 = _createForOfIteratorHelper(events),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var sprite = _step7.value;

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
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }]);

    return MapshotTileMap;
  }(Bitmap);

  var layerVisibility = [true, true, true, true, true, false, false, false, false, false];
  var editorActive = true;
  var windowWidth = 408;
  var mapCaches = {};
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
  var gridPreviewBlockHandler = false;
  var gridNeedsRefresh = false;
  var currentZoom = 1;
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

  var CycloneMapEditor$1 = /*#__PURE__*/function (_CyclonePlugin) {
    _inherits(CycloneMapEditor$1, _CyclonePlugin);

    var _super2 = _createSuper(CycloneMapEditor$1);

    function CycloneMapEditor$1() {
      _classCallCheck(this, CycloneMapEditor$1);

      return _super2.apply(this, arguments);
    }

    _createClass(CycloneMapEditor$1, null, [{
      key: "register",
      value: function register() {
        var _this8 = this;

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
          }
        });

        document.addEventListener('keydown', function () {
          _this8.onKeyDown.apply(_this8, arguments);
        });
        document.addEventListener('keypress', function () {
          _this8.onKeyPress.apply(_this8, arguments);
        });
        document.addEventListener('keyup', function () {
          _this8.onKeyUp.apply(_this8, arguments);
        });
        var regionIcons = this.params.regionIcons;
        this.regionIcons = new Map();

        if (regionIcons) {
          var _iterator8 = _createForOfIteratorHelper(regionIcons),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _step8$value = _step8.value,
                  regionId = _step8$value.regionId,
                  icon = _step8$value.icon;

              if (regionId && icon) {
                this.regionIcons.set(regionId, icon);
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }

        this.addMenuBar();
      }
    }, {
      key: "addMenuBar",
      value: function addMenuBar() {
        if (!Utils.isNwjs()) {
          return;
        }

        var menu = new nw.Menu({
          type: 'menubar'
        });
        var fileMenu = new nw.Menu();
        fileMenu.append(new nw.MenuItem({
          label: 'Save',
          key: 's',
          modifiers: 'ctrl',
          click: function click() {
            CycloneMapEditor$1.saveButton();
          }
        }));
        fileMenu.append(new nw.MenuItem({
          label: 'Reload',
          key: 'r',
          modifiers: 'ctrl',
          click: function click() {
            CycloneMapEditor$1.reloadButton();
          }
        }));
        fileMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        fileMenu.append(new nw.MenuItem({
          label: 'Exit',
          click: function click() {
            window.close();
          }
        }));
        menu.append(new nw.MenuItem({
          label: 'File',
          submenu: fileMenu
        }));
        var editMenu = new nw.Menu();
        editMenu.append(new nw.MenuItem({
          label: 'Undo',
          key: 'z',
          modifiers: 'ctrl',
          click: function click() {
            CycloneMapEditor$1.undoButton();
          }
        }));
        editMenu.append(new nw.MenuItem({
          label: 'Redo',
          key: 'y',
          modifiers: 'ctrl',
          click: function click() {
            CycloneMapEditor$1.redoButton();
          }
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
          click: function click() {
            CycloneMapEditor$1.showGridButton();
          }
        });
        editMenu.append(this.showGridMenu); // const zoomMenu = new nw.Menu();
        // this.zoom30Menu = new nw.MenuItem({
        //   label: '30%',
        //   type: 'checkbox',
        //   checked: currentZoom === 0.3,
        //   click: () => {
        //     this.currentZoom = 0.3;
        //   },
        // });
        // zoomMenu.append(this.zoom30Menu);
        // this.zoom50Menu = new nw.MenuItem({
        //   label: '50%',
        //   type: 'checkbox',
        //   checked: currentZoom === 0.5,
        //   click: () => {
        //     this.currentZoom = 0.5;
        //   },
        // });
        // zoomMenu.append(this.zoom50Menu);
        // this.zoom67Menu = new nw.MenuItem({
        //   label: '67%',
        //   type: 'checkbox',
        //   checked: currentZoom === 0.67,
        //   click: () => {
        //     this.currentZoom = 0.67;
        //   },
        // });
        // zoomMenu.append(this.zoom67Menu);
        // this.zoom75Menu = new nw.MenuItem({
        //   label: '75%',
        //   type: 'checkbox',
        //   checked: currentZoom === 0.75,
        //   click: () => {
        //     this.currentZoom = 0.75;
        //   },
        // });
        // zoomMenu.append(this.zoom75Menu);
        // this.zoom90Menu = new nw.MenuItem({
        //   label: '90%',
        //   type: 'checkbox',
        //   checked: currentZoom === 0.9,
        //   click: () => {
        //     this.currentZoom = 0.9;
        //   },
        // });
        // zoomMenu.append(this.zoom90Menu);
        // this.zoom100Menu = new nw.MenuItem({
        //   label: '100%',
        //   type: 'checkbox',
        //   checked: currentZoom === 1,
        //   click: () => {
        //     this.currentZoom = 1;
        //   },
        // });
        // zoomMenu.append(this.zoom100Menu);
        // this.zoom150Menu = new nw.MenuItem({
        //   label: '150%',
        //   type: 'checkbox',
        //   checked: currentZoom === 1.5,
        //   click: () => {
        //     this.currentZoom = 1.5;
        //   },
        // });
        // zoomMenu.append(this.zoom150Menu);
        // editMenu.append(new nw.MenuItem({
        //   label: 'Zoom',
        //   submenu: zoomMenu,
        // }));

        menu.append(new nw.MenuItem({
          label: 'Edit',
          submenu: editMenu
        }));
        var drawMenu = new nw.Menu();
        this.pencilMenu = new nw.MenuItem({
          label: 'Pencil',
          type: 'checkbox',
          checked: currentTool === 'pencil',
          key: 'p',
          click: function click() {
            CycloneMapEditor$1.pencilButton();
          }
        });
        drawMenu.append(this.pencilMenu);
        this.rectangleMenu = new nw.MenuItem({
          label: 'Rectangle',
          type: 'checkbox',
          checked: currentTool === 'rectangle',
          key: 'r',
          click: function click() {
            CycloneMapEditor$1.rectangleButton();
          }
        });
        drawMenu.append(this.rectangleMenu);
        this.fillMenu = new nw.MenuItem({
          label: 'Flood Fill',
          type: 'checkbox',
          checked: currentTool === 'fill',
          key: 'f',
          click: function click() {
            CycloneMapEditor$1.fillButton();
          }
        });
        drawMenu.append(this.fillMenu);
        drawMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.eraserMenu = new nw.MenuItem({
          label: 'Eraser',
          type: 'checkbox',
          checked: currentTool === 'eraser',
          key: 'e',
          click: function click() {
            CycloneMapEditor$1.eraserButton();
          }
        });
        drawMenu.append(this.eraserMenu);
        menu.append(new nw.MenuItem({
          label: 'Draw',
          submenu: drawMenu
        }));
        var layerMenu = new nw.Menu();
        this.autoLayerButton = new nw.MenuItem({
          label: 'Automatic',
          type: 'checkbox',
          checked: currentLayer === 7,
          key: '0',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(7);
          }
        });
        this.layer1Button = new nw.MenuItem({
          label: 'Layer 1',
          type: 'checkbox',
          checked: currentLayer === 0,
          key: '1',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(0);
          }
        });
        this.layer2Button = new nw.MenuItem({
          label: 'Layer 2',
          type: 'checkbox',
          checked: currentLayer === 1,
          key: '2',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(1);
          }
        });
        this.layer3Button = new nw.MenuItem({
          label: 'Layer 3',
          type: 'checkbox',
          checked: currentLayer === 2,
          key: '3',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(2);
          }
        });
        this.layer4Button = new nw.MenuItem({
          label: 'Layer 4',
          type: 'checkbox',
          checked: currentLayer === 3,
          key: '4',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(3);
          }
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
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(4);
          }
        });
        layerMenu.append(this.shadowsButton);
        this.regionsButton = new nw.MenuItem({
          label: 'Regions',
          type: 'checkbox',
          checked: currentLayer === 5,
          key: '6',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(5);
          }
        });
        layerMenu.append(this.regionsButton);
        layerMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        this.collisionsButton = new nw.MenuItem({
          label: 'Collisions',
          type: 'checkbox',
          checked: currentLayer === 8,
          key: '8',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(8);
          }
        });
        layerMenu.append(this.collisionsButton);
        this.tagsButton = new nw.MenuItem({
          label: 'Tags',
          type: 'checkbox',
          checked: currentLayer === 9,
          key: '9',
          click: function click() {
            CycloneMapEditor$1.changeCurrentLayer(9);
          }
        });
        layerMenu.append(this.tagsButton);
        menu.append(new nw.MenuItem({
          label: 'Layer',
          submenu: layerMenu
        }));
        var exportMenu = new nw.Menu();
        exportMenu.append(new nw.MenuItem({
          label: 'Layer 1',
          click: function click() {
            CycloneMapEditor$1.exportSingleLayer(0);
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Layer 2',
          click: function click() {
            CycloneMapEditor$1.exportSingleLayer(1);
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Layer 3',
          click: function click() {
            CycloneMapEditor$1.exportSingleLayer(2);
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Layer 4',
          click: function click() {
            CycloneMapEditor$1.exportSingleLayer(3);
          }
        }));
        exportMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Lower Tiles',
          click: function click() {
            CycloneMapEditor$1.exportLowerTiles();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Upper Tiles',
          click: function click() {
            CycloneMapEditor$1.exportUpperTiles();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Whole Map',
          click: function click() {
            CycloneMapEditor$1.exportWholeMap();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          type: 'separator'
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Low Events',
          click: function click() {
            CycloneMapEditor$1.exportLowEvents();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'Normal Events',
          click: function click() {
            CycloneMapEditor$1.exportNormalEvents();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'High Events',
          click: function click() {
            CycloneMapEditor$1.exportHighEvents();
          }
        }));
        exportMenu.append(new nw.MenuItem({
          label: 'All Events',
          click: function click() {
            CycloneMapEditor$1.exportAllEvents();
          }
        }));
        menu.append(new nw.MenuItem({
          label: 'Export',
          submenu: exportMenu
        }));
        var helpMenu = new nw.Menu();
        helpMenu.append(new nw.MenuItem({
          label: 'Plugin Page',
          key: 'F1',
          click: function click() {
            if (!globalThis.require) {
              return;
            }

            require('nw.gui').Shell.openExternal('https://makerdevs.com/plugin/cyclone-map-editor');
          }
        }));
        menu.append(new nw.MenuItem({
          label: 'Help',
          submenu: helpMenu
        }));
        this.menu = menu;
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
        this.clearSelection();
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

        if (!(SceneManager._scene instanceof Scene_Map)) {
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
        var _this9 = this;

        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }

        if (this.isFullScreen()) {
          return;
        }

        this.resizeTimeout = setTimeout(function () {
          // Adds a second timeout to block the show/hide functionality for a little while
          _this9.resizeTimeout = setTimeout(function () {
            _this9.resizeTimeout = false;
          }, 500);
          var xDelta = Graphics.width - window.innerWidth;
          var yDelta = Graphics.height - window.innerHeight;
          window.moveBy(-xDelta / 2, -yDelta / 2);
          window.resizeBy(xDelta, yDelta);
        }, 20);
      }
    }, {
      key: "refreshMenuVisibility",
      value: function refreshMenuVisibility() {
        if (!Utils.isNwjs()) {
          return;
        }

        var display = this.shouldDisplayMenu();
        var win = nw.Window.get();

        if (display && win.menu === this.menu) {
          return;
        }

        if (display) {
          win.menu = this.menu; // return;
        } else {
          win.menu = null;
        }

        this.refreshScreenSize();
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
        var _this10 = this;

        return tabs.filter(function (tab) {
          return _this10.isTabValid(tab);
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
        if (index === 8 || index === 9) {
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

        if (!(scene instanceof Scene_Map)) {
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
        switch (key) {
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
      key: "loadMapFile",
      value: function loadMapFile() {
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
            SceneManager["goto"](Scene_Map);
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
      key: "undoButton",
      value: function undoButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        if (changeHistory.length) {
          this.undoLastChange();
        }
      }
    }, {
      key: "redoButton",
      value: function redoButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        if (undoHistory.length) {
          this.redoLastUndoneChange();
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
        var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            tileId = _ref12.tileId,
            mapX = _ref12.mapX,
            mapY = _ref12.mapY,
            tile1 = _ref12.tile1,
            tile2 = _ref12.tile2,
            tile3 = _ref12.tile3,
            tile4 = _ref12.tile4;

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

        if (SceneManager._scene instanceof Scene_Map) {
          SceneManager._scene._mapEditorStatus.refresh();
        }
      }
    }, {
      key: "showGridButton",
      value: function showGridButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        showGrid = !showGrid;
        this.showGridButton.checked = showGrid;

        SceneManager._scene._mapEditorGrid.refresh();
      }
    }, {
      key: "selectHigherLayer",
      value: function selectHigherLayer(x, y) {
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
          this.pencilMenu.checked = currentTool === 'pencil';
          this.rectangleMenu.checked = currentTool === 'rectangle';
          this.fillMenu.checked = currentTool === 'fill';
          this.eraserMenu.checked = currentTool === 'eraser';
        }

        this.refreshMapEditor();
      }
    }, {
      key: "pencilButton",
      value: function pencilButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        currentTool = 'pencil';
        lastDrawingTool = 'pencil';
        this.updateCurrentTool();
      }
    }, {
      key: "rectangleButton",
      value: function rectangleButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        currentTool = 'rectangle';
        lastDrawingTool = 'rectangle';
        this.updateCurrentTool();
      }
    }, {
      key: "fillButton",
      value: function fillButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        currentTool = 'fill';
        this.updateCurrentTool();
      }
    }, {
      key: "eraserButton",
      value: function eraserButton() {
        if (!(SceneManager._scene instanceof Scene_Map)) {
          return;
        }

        currentTool = 'eraser';
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
      key: "_doSave",
      value: function _doSave() {
        var fileName = "Map".concat($gameMap._mapId.padZero(3), ".json");
        var json = JSON.stringify($dataMap, null, 0);

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
        if (!(SceneManager._scene instanceof Scene_Map)) {
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
        if (!(SceneManager._scene instanceof Scene_Map)) {
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
          this.checkScrollKeys(event.key);
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

        if (!(scene instanceof Scene_Map)) {
          return;
        }

        scene.toggleMapEditor();
      }
    }, {
      key: "refreshMapEditor",
      value: function refreshMapEditor() {
        var scene = SceneManager._scene;

        if (!(scene instanceof Scene_Map)) {
          return;
        }

        scene.refreshMapEditorWindows();
      }
    }, {
      key: "getTileIdTilesetIndex",
      value: function getTileIdTilesetIndex(tileId) {
        if (tileId < Tilemap.TILE_ID_A5) {
          var tilesetIndex = Math.floor(tileId / 256);

          if (tilesetIndex >= 0 && tilesetIndex < 4) {
            return 5 + tilesetIndex;
          }

          return -1;
        }

        if (tileId < Tilemap.TILE_ID_A1) {
          return 4;
        }

        if (tileId < Tilemap.TILE_ID_A2) {
          return 0;
        }

        if (tileId < Tilemap.TILE_ID_A3) {
          return 1;
        }

        if (tileId < Tilemap.TILE_ID_A4) {
          return 2;
        }

        if (tileId < Tilemap.TILE_ID_MAX) {
          return 3;
        }

        return -1;
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

        return tileset.tilesetNames[tilesetIndex];
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

        this.deselectShadowOrRegion(newIndex);
        currentLayer = newIndex;

        if (Utils.isNwjs()) {
          this.layer1Button.checked = newIndex === 0;
          this.layer2Button.checked = newIndex === 1;
          this.layer3Button.checked = newIndex === 2;
          this.layer4Button.checked = newIndex === 3;
          this.shadowsButton.checked = newIndex === 4;
          this.regionsButton.checked = newIndex === 5;
          this.autoLayerButton.checked = newIndex === 7;
          this.collisionsButton.checked = newIndex === 8;
          this.tagsButton.checked = newIndex === 9;
        }

        if (SceneManager._scene instanceof Scene_Map) {
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
        var _this11 = this;

        var skipPreview = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        // wall auto tiles need the left and right columns to have the same amount of rows for it to match
        var hasLeftColumn = true;
        var hasRightColumn = true;

        var compareWallAutoTileLine = function compareWallAutoTileLine(newY, sameCenter) {
          var leftTileId = _this11.getCurrentTileAtPosition(x - 1, newY, z, skipPreview);

          var rightTileId = _this11.getCurrentTileAtPosition(x + 1, newY, z, skipPreview);

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
      key: "undoLastChange",
      value: function undoLastChange() {
        if (changeHistory.length === 0) {
          SoundManager.playBuzzer();
          return;
        }

        var lastChange = changeHistory.pop();
        currentChange = {};

        for (var tileIndex in lastChange) {
          currentChange[tileIndex] = $dataMap.data[tileIndex];
          $dataMap.data[tileIndex] = lastChange[tileIndex];
        }

        undoHistory.push(currentChange);
        currentChange = false;

        SceneManager._scene._mapEditorCommands.redraw();

        SceneManager._scene._mapEditorGrid.refresh();

        mapCaches[$gameMap._mapId] = $dataMap;
        this.refreshTilemap();
      }
    }, {
      key: "redoLastUndoneChange",
      value: function redoLastUndoneChange() {
        if (undoHistory.length === 0) {
          SoundManager.playBuzzer();
          return;
        }

        var lastChange = undoHistory.pop();
        currentChange = {};

        for (var tileIndex in lastChange) {
          currentChange[tileIndex] = $dataMap.data[tileIndex];
          $dataMap.data[tileIndex] = lastChange[tileIndex];
        }

        this.logChange(false);
        this.refreshTilemap();
      }
    }, {
      key: "logChange",
      value: function logChange() {
        var clearUndo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var hasChanges = Object.keys(currentChange).length > 0;

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
      key: "_eraseSingleMapTile",
      value: function _eraseSingleMapTile(x, y, z) {
        var updateNeighbors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var previewOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        for (var newZ = 0; newZ <= 3; newZ++) {
          if (newZ !== z && z !== Layers.auto) {
            continue;
          }

          if (!this.canEraseLayer(newZ)) {
            continue;
          }

          var tileIndex = this.tileIndex(x, y, newZ);

          if (previewOnly) {
            previewChanges[tileIndex] = 0;
          } else {
            var oldTile = $dataMap.data[tileIndex];

            if (currentChange[tileIndex] === undefined && oldTile !== 0) {
              currentChange[tileIndex] = oldTile;
            }

            $dataMap.data[tileIndex] = 0;
          }

          this.maybeUpdateTileNeighbors(x, y, z, updateNeighbors, previewOnly);
        }
      }
    }, {
      key: "_applySingleMapTile",
      value: function _applySingleMapTile(x, y, z, tileId) {
        var updateNeighbors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var previewOnly = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        if (!tileId) {
          this._eraseSingleMapTile(x, y, z, updateNeighbors, previewOnly);

          return;
        }

        var itemsToChange = this.getItemsToChange(x, y, z, tileId, !previewOnly, updateNeighbors);

        var _iterator9 = _createForOfIteratorHelper(itemsToChange),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = _step9.value,
                _x5 = _step9$value.x,
                _y = _step9$value.y,
                _z = _step9$value.z,
                _tileId = _step9$value.tileId;

            if (_z > 5) {
              continue;
            }

            var tileIndex = this.tileIndex(_x5, _y, _z);
            var effectiveTileId = _tileId;

            if (Tilemap.isAutotile(_tileId)) {
              effectiveTileId = this.changeAutoTileShapeForPosition(_x5, _y, _z, _tileId, false);
            }

            if (previewOnly) {
              previewChanges[tileIndex] = effectiveTileId;
            } else {
              var oldTile = $dataMap.data[tileIndex];

              if (currentChange[tileIndex] === undefined && oldTile !== effectiveTileId) {
                currentChange[tileIndex] = oldTile;
              }

              $dataMap.data[tileIndex] = effectiveTileId;
            }

            this.maybeUpdateTileNeighbors(_x5, _y, _z, updateNeighbors, previewOnly);
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
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
        return currentTileId !== undefined || currentTool === 'eraser';
      }
    }, {
      key: "isAutoEraser",
      value: function isAutoEraser() {
        return currentLayer === Layers.auto && currentTool === 'eraser' && !Input.isPressed('shift');
      }
    }, {
      key: "getHighestLayerOnArea",
      value: function getHighestLayerOnArea(startX, startY, width, height) {
        var _this12 = this;

        var highestLayer = function () {
          for (var z = 3; z >= 1; z--) {
            for (var tileY = startY; tileY < startY + height; tileY++) {
              for (var tileX = startX; tileX < startX + width; tileX++) {
                var tileIndex = _this12.tileIndex(tileX, tileY, z);

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
        var initialRow = 0;
        var initialCol = 0;
        var rowIncrement = 1;
        var colIncrement = 1;

        if (rectangleBackWidth > 0) {
          initialCol = width - 1;
          colIncrement *= -1;
        }

        if (rectangleBackHeight > 0) {
          initialRow = height - 1;
          rowIncrement *= -1;
        }

        var selectionRow = initialRow;
        var selectionCol = initialCol;

        if (previewOnly) {
          previewChanges = {};
        } else {
          currentChange = {};
        }

        var effectiveLayer = currentLayer;

        if (this.isAutoEraser()) {
          effectiveLayer = this.getHighestLayerOnArea(startX, startY, width, height);
        }

        for (var tileY = startY; tileY < startY + height; tileY++) {
          selectionCol = initialCol;

          for (var tileX = startX; tileX < startX + width; tileX++) {
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
        var _this13 = this;

        if (currentLayer !== 5) {
          return;
        } // Grid refresh is a heavy operation, so let's limit how often we do it


        if (!gridPreviewBlockHandler) {
          gridPreviewBlockHandler = setTimeout(function () {
            gridPreviewBlockHandler = false;

            if (gridNeedsRefresh) {
              setTimeout(function () {
                _this13.maybeRefreshGrid();
              }, 50);
            }
          }, 50);

          SceneManager._scene._mapEditorGrid.refresh();

          return;
        }

        gridNeedsRefresh = true;
      }
    }, {
      key: "refreshTilemap",
      value: function refreshTilemap() {
        previewChanges = {};

        SceneManager._scene._spriteset._tilemap.refresh();

        SceneManager._scene._mapEditorGrid.refresh();
      }
    }, {
      key: "copyAutoRectangle",
      value: function copyAutoRectangle(startX, startY, width, height) {
        var _this14 = this;

        for (var z = 0; z <= 3; z++) {
          multiLayerSelection[z] = Array(width * height);
        }

        this.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
          for (var _z2 = 0; _z2 <= 3; _z2++) {
            var tileIndex = _this14.tileIndex(tileX, tileY, _z2);

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
        var _this15 = this;

        for (var z = 0; z <= 3; z++) {
          multiLayerSelection[z] = Array(width * height);
        }

        var foundAny = false;

        var _loop = function _loop(_z3) {
          if (!_this15.isLayerVisible(_z3)) {
            return "continue";
          }

          _this15.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
            var tileIndex = _this15.tileIndex(tileX, tileY, _z3);

            multiLayerSelection[_z3][index] = $dataMap.data[tileIndex] || 0;
            selectedTileList[index] = $dataMap.data[tileIndex] || selectedTileList[index] || 0;

            _this15._selectTileIfNoneSelectedYet(selectedTileList[index]);

            if ($dataMap.data[tileIndex]) {
              foundAny = true;
            }
          });

          if (_this15._shouldSkipRemainingLayersCopy(foundAny, _z3)) {
            return {
              v: void 0
            };
          }
        };

        for (var _z3 = 3; _z3 >= 0; _z3--) {
          var _ret = _loop(_z3);

          if (_ret === "continue") continue;
          if (_typeof(_ret) === "object") return _ret.v;
        }
      }
    }, {
      key: "copyHigherRectangle",
      value: function copyHigherRectangle(startX, startY, width, height) {
        var _this16 = this;

        var foundAny = false;

        var _loop2 = function _loop2(z) {
          if (!_this16.isLayerVisible(z)) {
            return "continue";
          }

          _this16.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
            var tileIndex = _this16.tileIndex(tileX, tileY, z);

            selectedTileList[index] = selectedTileList[index] || $dataMap.data[tileIndex] || 0;

            _this16._selectTileIfNoneSelectedYet(selectedTileList[index]);

            if ($dataMap.data[tileIndex]) {
              foundAny = true;
            }
          });

          if (_this16._shouldSkipRemainingLayersCopy(foundAny, z)) {
            return {
              v: void 0
            };
          }
        };

        for (var z = 3; z >= 0; z--) {
          var _ret2 = _loop2(z);

          if (_ret2 === "continue") continue;
          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }
    }, {
      key: "copyManualRectangle",
      value: function copyManualRectangle(startX, startY, width, height) {
        var _this17 = this;

        this.iterateRectangle(startX, startY, width, height, function (tileX, tileY, index) {
          var tileIndex = _this17.tileIndex(tileX, tileY, currentLayer);

          selectedTileList[index] = $dataMap.data[tileIndex] || 0;

          _this17._selectTileIfNoneSelectedYet(selectedTileList[index]);
        });
      }
    }, {
      key: "copyRectangle",
      value: function copyRectangle(startX, startY, width, height) {
        if (!wasRightButtonDown) {
          return;
        }

        multiLayerSelection = [];
        selectedTileList = Array(width * height);
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
        currentChange = {};

        var _iterator10 = _createForOfIteratorHelper(affectedArea),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var tileIndex = _step10.value;
            var y = this.indexPositionY(tileIndex, workLayer);

            var _x6 = tileIndex - this.tileIndex(0, y, workLayer);

            var xDiff = (_x6 + width - mapX) % tileCols;
            var yDiff = (y + height - mapY) % tileRows;
            this.setSelectionTileMaybeMultiLayer(_x6, y, xDiff, yDiff, false);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        this.logChange();
        this.refreshTilemap();
      }
    }, {
      key: "ensureLayerVisibility",
      value: function ensureLayerVisibility() {
        if (!layerVisibility[currentLayer]) {
          layerVisibility[currentLayer] = true;

          if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene._mapEditorLayerListWindow.refresh();
          }
        }
      }
    }, {
      key: "applySelectedTiles",
      value: function applySelectedTiles(mapX, mapY) {
        if (currentTileId === undefined) {
          return;
        }

        if (selectedTileList.length < tileCols * tileRows) {
          return;
        }

        this.ensureLayerVisibility();
        var index = 0;

        for (var y = mapY; y < mapY + tileRows; y++) {
          for (var _x7 = mapX; _x7 < mapX + tileCols; _x7++) {
            if (!$gameMap.isValid(_x7, y)) {
              continue;
            }

            if (currentLayer === 7 && multiLayerSelection.length) {
              for (var z = 0; z <= 3; z++) {
                this.setMapTile(_x7, y, z, multiLayerSelection[z][index]);
              }
            } else {
              this.setMapTile(_x7, y, currentLayer, selectedTileList[index]);
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

          CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + 1).clamp(0, 30);
          CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + 1).clamp(0, 30);
          CycloneMapEditor$1.rectangleBackWidth = (CycloneMapEditor$1.rectangleStartX - x).clamp(0, 30);
          CycloneMapEditor$1.rectangleBackHeight = (CycloneMapEditor$1.rectangleStartY - y).clamp(0, 30);

          if (this.crossedHorizontalLoop()) {
            // moved right through the edge, limit the width to it
            if (CycloneMapEditor$1.rectangleStartX > x) {
              CycloneMapEditor$1.rectangleWidth = $gameMap.width() - CycloneMapEditor$1.rectangleStartX;
              CycloneMapEditor$1.rectangleBackWidth = 0;
            } else if (x > CycloneMapEditor$1.rectangleStartX) {
              CycloneMapEditor$1.rectangleBackWidth = CycloneMapEditor$1.rectangleStartX;
              CycloneMapEditor$1.rectangleWidth = 0;
            }
          }

          if (this.crossedVerticalLoop()) {
            if (CycloneMapEditor$1.rectangleStartY > y) {
              CycloneMapEditor$1.rectangleHeight = $gameMap.height() - CycloneMapEditor$1.rectangleStartY;
              CycloneMapEditor$1.rectangleBackHeight = 0;
            } else if (y > CycloneMapEditor$1.rectangleStartY) {
              CycloneMapEditor$1.rectangleBackHeight = CycloneMapEditor$1.rectangleStartY;
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

        if (CycloneMapEditor$1.rectangleWidth > 0) {
          applyWidth = CycloneMapEditor$1.rectangleWidth;
        } else if (CycloneMapEditor$1.rectangleBackWidth > 0) {
          startX -= CycloneMapEditor$1.rectangleBackWidth;
          applyWidth = CycloneMapEditor$1.rectangleBackWidth + 1;
        }

        if (CycloneMapEditor$1.rectangleHeight > 0) {
          applyHeight = CycloneMapEditor$1.rectangleHeight;
        } else if (CycloneMapEditor$1.rectangleBackHeight > 0) {
          startY -= CycloneMapEditor$1.rectangleBackHeight;
          applyHeight = CycloneMapEditor$1.rectangleBackHeight + 1;
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

          CycloneMapEditor$1.rectangleWidth = (x - CycloneMapEditor$1.rectangleStartX + 1).clamp(0, 30);
          CycloneMapEditor$1.rectangleHeight = (y - CycloneMapEditor$1.rectangleStartY + 1).clamp(0, 30);
          CycloneMapEditor$1.rectangleBackWidth = (CycloneMapEditor$1.rectangleStartX - x).clamp(0, 30);
          CycloneMapEditor$1.rectangleBackHeight = (CycloneMapEditor$1.rectangleStartY - y).clamp(0, 30);

          if (this.crossedHorizontalLoop()) {
            // moved right through the edge, limit the width to it
            if (CycloneMapEditor$1.rectangleStartX > x) {
              CycloneMapEditor$1.rectangleWidth = $gameMap.width() - CycloneMapEditor$1.rectangleStartX;
              CycloneMapEditor$1.rectangleBackWidth = 0;
            } else if (x > CycloneMapEditor$1.rectangleStartX) {
              CycloneMapEditor$1.rectangleBackWidth = CycloneMapEditor$1.rectangleStartX;
              CycloneMapEditor$1.rectangleWidth = 0;
            }
          }

          if (this.crossedVerticalLoop()) {
            if (CycloneMapEditor$1.rectangleStartY > y) {
              CycloneMapEditor$1.rectangleHeight = $gameMap.height() - CycloneMapEditor$1.rectangleStartY;
              CycloneMapEditor$1.rectangleBackHeight = 0;
            } else if (y > CycloneMapEditor$1.rectangleStartY) {
              CycloneMapEditor$1.rectangleBackHeight = CycloneMapEditor$1.rectangleStartY;
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
        this.updateRectangle(x, y);
      }
    }, {
      key: "updatePencil",
      value: function updatePencil(x, y) {
        if (TouchInput.isPressed()) {
          if (!currentChange) {
            currentChange = {};
          }

          CycloneMapEditor$1.applySelectedTiles(x, y);
          return;
        }

        if (wasPressing) {
          CycloneMapEditor$1.logChange();
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
      key: "tileHeight",
      get: function get() {
        return tileHeight;
      },
      set: function set(value) {
        tileHeight = value;
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

        if (SceneManager._scene instanceof Scene_Map) {
          $gameMap.zoom = new Point(value, value);

          SceneManager._scene._mapEditorGrid.refresh();

          SceneManager._scene._spriteset.updatePosition();
        }
      }
    }]);

    return CycloneMapEditor$1;
  }(CyclonePlugin);

  globalThis.CycloneMapEditor = CycloneMapEditor$1;
  CycloneMapEditor$1.register();
  var regionColors = ['#e75858', '#c0986f', '#cbcf32', '#8ab24c', '#22aa47', '#1cbf97', '#7ec1df', '#4da4dc', '#4f36a9', '#725fb9', '#d48de4', '#fa5e84'];
  CycloneMapEditor.patchClass(Bitmap, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "drawNormalTile",
        value: function drawNormalTile(tileId, x, y, drawWidth, drawHeight) {
          if (tileId === undefined) {
            return;
          }

          var bitmap = CycloneMapEditor.loadTilesetBitmap(tileId);
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
            var targetX = x + i % 2 * halfWidth;
            var targetY = y + Math.floor(i / 2) * halfHeight;
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

          if (tileId >= Tilemap.TILE_ID_A1) {
            return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
          }

          return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
        }
      }, {
        key: "drawIcon",
        value: function drawIcon(iconIndex, x, y) {
          var bitmap = ImageManager.loadSystem('IconSet');
          var pw = ImageManager.iconWidth;
          var ph = ImageManager.iconHeight;
          var sx = iconIndex % 16 * pw;
          var sy = Math.floor(iconIndex / 16) * ph;
          this.blt(bitmap, sx, sy, pw, ph, x, y);
        }
      }, {
        key: "drawRegion",
        value: function drawRegion(regionId, x, y, drawWidth, drawHeight) {
          var _CycloneMapEditor$reg;

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
            this.drawIcon(iconIndex, x + diffX, y + diffY);
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
      }]);

      return _class3;
    }();
  });
  CycloneMapEditor.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, null, [{
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

      return _class4;
    }();
  });
  CycloneMapEditor.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
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
        } // canvasToMapX(x) {
        //   if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
        //     return $super.canvasToMapX.call(this, x);
        //   }
        //   const tileWidth = this.tileWidth() * CycloneMapEditor.currentZoom;
        //   const originX = this._displayX * tileWidth;
        //   const mapX = Math.floor((originX + x) / tileWidth);
        //   return this.roundX(mapX);
        // }
        // canvasToMapY(y) {
        //   if (!CycloneMapEditor.active || CycloneMapEditor.currentZoom === 1) {
        //     return $super.canvasToMapY.call(this, y);
        //   }
        //   const tileHeight = this.tileHeight() * CycloneMapEditor.currentZoom;
        //   const originY = this._displayY * tileHeight;
        //   const mapY = Math.floor((originY + y) / tileHeight);
        //   return this.roundY(mapY);
        // }

      }]);

      return _class5;
    }();
  });
  CycloneMapEditor.patchClass(Game_Player, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, [{
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

          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
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
      }]);

      return _class6;
    }();
  });

  var WindowCycloneGrid = /*#__PURE__*/function (_Window_Base) {
    _inherits(WindowCycloneGrid, _Window_Base);

    var _super3 = _createSuper(WindowCycloneGrid);

    function WindowCycloneGrid() {
      _classCallCheck(this, WindowCycloneGrid);

      return _super3.apply(this, arguments);
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

        var drawWidth = Math.floor(CycloneMapEditor.tileWidth * CycloneMapEditor.currentZoom);
        var drawHeight = Math.floor(CycloneMapEditor.tileHeight * CycloneMapEditor.currentZoom);
        var padding = this.padding;
        var context = this.contents.context;
        context.save();
        context.strokeStyle = '#000000';
        context.beginPath();
        context.moveTo(x - padding, y - padding);
        context.lineTo(x - padding + drawWidth, y - padding);
        context.stroke();
        context.beginPath();
        context.moveTo(x - padding, y - padding);
        context.lineTo(x - padding, y - padding + drawHeight);
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
      key: "maybeDrawCollisions",
      value: function maybeDrawCollisions(x, y) {
        if (!CycloneMapEditor.isLayerVisible(Layers.collisions)) {
          return;
        }

        var mapX = $gameMap.canvasToMapX(x);
        var mapY = $gameMap.canvasToMapY(y);
        var drawWidth = CycloneMapEditor.tileWidth;
        var drawHeight = CycloneMapEditor.tileHeight;
        var downBlocked = !$gameMap.isPassable(mapX, mapY, 2);
        var upBlocked = !$gameMap.isPassable(mapX, mapY, 8);
        var leftBlocked = !$gameMap.isPassable(mapX, mapY, 4);
        var rightBlocked = !$gameMap.isPassable(mapX, mapY, 6);

        if (downBlocked && upBlocked && leftBlocked && rightBlocked) {
          this.contents.fillRect(x, y, drawWidth, drawHeight, '#FF000066');
          return;
        }

        var pieceHeight = Math.floor(drawHeight / 4);
        var pieceWidth = Math.floor(drawWidth / 4);

        if (downBlocked) {
          this.contents.fillRect(x, y + drawHeight - pieceHeight, drawWidth, pieceHeight, '#FF0000AA');
        }

        if (upBlocked) {
          this.contents.fillRect(x, y, drawWidth, pieceHeight, '#FF0000AA');
        }

        if (leftBlocked) {
          this.contents.fillRect(x, y, pieceWidth, drawHeight, '#FF0000AA');
        }

        if (rightBlocked) {
          this.contents.fillRect(x + drawWidth - pieceWidth, y, pieceWidth, drawHeight, '#FF0000AA');
        }
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
        this.drawCellGrid(x, y);
        this.maybeDrawRegions(x, y);
        this.maybeDrawCollisions(x, y);
        this.maybeDrawTags(x, y);
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

        for (var _x8 = mapStartX; _x8 < rightPos; _x8 += drawWidth) {
          if (_x8 + drawWidth < 0) {
            continue;
          }

          for (var y = mapStartY; y < bottomPos; y += drawHeight) {
            if (y + drawHeight < 0) {
              continue;
            }

            this.drawCell(_x8, y);
          }
        }
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

    var _super4 = _createSuper(WindowCycloneMapEditorCommands);

    function WindowCycloneMapEditorCommands() {
      _classCallCheck(this, WindowCycloneMapEditorCommands);

      return _super4.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorCommands, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = 0;
        var w = CycloneMapEditor.windowWidth;
        var h = 74;

        _get(_getPrototypeOf(WindowCycloneMapEditorCommands.prototype), "initialize", this).call(this, new Rectangle(x, y, w, h));

        this.showBackgroundDimmer();
        this.configureHandlers();
      }
    }, {
      key: "configureHandlers",
      value: function configureHandlers() {
        var _this18 = this;

        this.setHandler('undo', function () {
          CycloneMapEditor.undoButton();

          _this18.activate();
        });
        this.setHandler('redo', function () {
          CycloneMapEditor.redoButton();

          _this18.activate();
        });
        this.setHandler('pencil', function () {
          CycloneMapEditor.pencilButton();

          _this18.activate();
        });
        this.setHandler('rectangle', function () {
          CycloneMapEditor.rectangleButton();

          _this18.activate();
        });
        this.setHandler('fill', function () {
          CycloneMapEditor.fillButton();

          _this18.activate();
        });
        this.setHandler('eraser', function () {
          CycloneMapEditor.eraserButton();

          _this18.activate();
        });
        this.setHandler('save', function () {
          CycloneMapEditor.saveButton();

          _this18.activate();
        });
        this.setHandler('reload', function () {
          CycloneMapEditor.reloadButton();

          _this18.activate();
        });
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

          case 'pencil':
            return pencilIcon;

          case 'rectangle':
            return rectangleIcon;

          case 'fill':
            return fillIcon;

          case 'eraser':
            return eraseIcon;

          case 'save':
            return saveIcon;

          case 'reload':
            return reloadIcon;
        }
      }
    }, {
      key: "drawItem",
      value: function drawItem(index) {
        var symbol = this.commandSymbol(index);
        var rect = this.itemRect(index);

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
        ctx.drawImage(icon, rect.x + 1, rect.y, 48, 48);
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

    var _super5 = _createSuper(WindowCycloneMapEditorLayerList);

    function WindowCycloneMapEditorLayerList() {
      _classCallCheck(this, WindowCycloneMapEditorLayerList);

      return _super5.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditorLayerList, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = SceneManager._scene._mapEditorCommands.height;
        var h = 150;

        _get(_getPrototypeOf(WindowCycloneMapEditorLayerList.prototype), "initialize", this).call(this, new Rectangle(x, y, CycloneMapEditor.windowWidth, h));

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
        this.contents.fontSize = 22;

        var ctx = this.contents._canvas.getContext('2d');

        var names = ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Shadows', 'Regions', false, 'Auto Layer'];
        ctx.imageSmoothingEnabled = false;

        for (var i = 0; i < 4; i++) {
          ctx.drawImage(CycloneMapEditor.layerVisibility[i] ? visibleIcon : hiddenIcon, -4, 30 * i - 4, 48, 48);
          this.contents.fontBold = CycloneMapEditor.currentLayer === i;
          this.changeTextColor(CycloneMapEditor.currentLayer === i ? ColorManager.powerUpColor() : ColorManager.normalColor());
          this.drawText(names[i], 40, i * 30, CycloneMapEditor.windowWidth / 2 - 40, 'left');

          if (names[i + 4]) {
            var _x9 = CycloneMapEditor.windowWidth / 2;

            if (i !== 3) {
              ctx.drawImage(CycloneMapEditor.layerVisibility[i + 4] ? visibleIcon : hiddenIcon, _x9 - 4, 30 * i - 4, 48, 48);
              _x9 += 40;
            } else {
              _x9 += 10;
            }

            this.contents.fontBold = CycloneMapEditor.currentLayer === i + 4;
            this.changeTextColor(CycloneMapEditor.currentLayer === i + 4 ? ColorManager.powerUpColor() : ColorManager.normalColor());
            this.drawText(names[i + 4], _x9, i * 30, CycloneMapEditor.windowWidth / 2 - 40, 'left');
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

        return layerIndex;
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

    var _super6 = _createSuper(WindowCycloneMapEditorStatus);

    function WindowCycloneMapEditorStatus() {
      _classCallCheck(this, WindowCycloneMapEditorStatus);

      return _super6.apply(this, arguments);
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
      key: "drawContents",
      value: function drawContents() {
        this.contents.clear();
        this.contents.fontSize = 16;
        var line = this.makeLine();
        this.drawText(line, 8, this.textY(), this.width - 8, 'left');
        this.drawText("TileId: ".concat(CycloneMapEditor.statusTileId), 0, this.textY(), this.width - 8, 'right');
      }
    }]);

    return WindowCycloneMapEditorStatus;
  }(Window_Base);

  var WindowCycloneMapEditor = /*#__PURE__*/function (_Window_Command2) {
    _inherits(WindowCycloneMapEditor, _Window_Command2);

    var _super7 = _createSuper(WindowCycloneMapEditor);

    function WindowCycloneMapEditor() {
      _classCallCheck(this, WindowCycloneMapEditor);

      return _super7.apply(this, arguments);
    }

    _createClass(WindowCycloneMapEditor, [{
      key: "initialize",
      value: function initialize() {
        var x = Graphics.width - CycloneMapEditor.windowWidth;
        var y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
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
      key: "makeCommandList",
      value: function makeCommandList() {
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

        for (var tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
          this.addTile(tileId);
        }

        for (var _tileId4 = Tilemap.TILE_ID_B; _tileId4 < Tilemap.TILE_ID_A5; _tileId4++) {
          this.addTile(_tileId4);
        }
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
        Window_Selectable.prototype.refresh.call(this); // Force the tilemap cursor to redraw too

        SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
      }
    }, {
      key: "colSpacing",
      value: function colSpacing() {
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
        return 8;
      }
    }, {
      key: "itemWidth",
      value: function itemWidth() {
        return 48; // return tileWidth;
      }
    }, {
      key: "itemHeight",
      value: function itemHeight() {
        return 48; // return tileHeight;
      }
    }, {
      key: "drawRegion",
      value: function drawRegion(index) {
        var rect = this.itemRect(index);
        this.contents.drawRegion(index, rect.x, rect.y, rect.width, rect.height);
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
      key: "drawItem",
      value: function drawItem(index) {
        var _this19 = this;

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

        var rect = this.itemRect(index);
        var bitmap = this.contents.drawTile(this._list[index].ext, rect.x, rect.y, this.itemWidth(), this.itemHeight());

        if (!bitmap) {
          return;
        }

        if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
          bitmap.addLoadListener(function () {
            _this19._needsRefresh = true;
          });
        }
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
            var _iterator11 = _createForOfIteratorHelper(CycloneMapEditor.selectedTileList),
                _step11;

            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                var tileId = _step11.value;

                if (Tilemap.isSameKindTile(tileId, item.name)) {
                  isSelected = true;
                }
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
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

        if (!this._manualTileSelected && CycloneMapEditor.selectedTileList.length >= 2 && Tilemap.isSameKindTile(CycloneMapEditor.selectedTileList[0], CycloneMapEditor.selectedTileList[1])) {
          rowDrawCount = 1;
          colDrawCount = 1;
        }

        var selectionWidth = 48 * colDrawCount;
        var selectionHeight = 48 * rowDrawCount;
        this.contents.fillRect(x, y, selectionWidth, 4, '#000000');
        this.contents.fillRect(x, y + selectionHeight - 4, selectionWidth, 4, '#000000');
        this.contents.fillRect(x, y, 4, selectionHeight, '#000000');
        this.contents.fillRect(x + selectionWidth - 4, y, 4, selectionHeight, '#000000');
        this.contents.fillRect(x + 2, y + 2, selectionWidth - 4, 2, '#FFFFFF');
        this.contents.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 4, 2, '#FFFFFF');
        this.contents.fillRect(x + 2, y + 2, 2, selectionHeight - 4, '#FFFFFF');
        this.contents.fillRect(x + selectionWidth - 4, y + 2, 2, selectionHeight - 4, '#FFFFFF');
      }
    }, {
      key: "isSelectedTile",
      value: function isSelectedTile(tileId) {
        if (!Tilemap.isSameKindTile(tileId, CycloneMapEditor.currentTileId)) {
          return false;
        }

        if (this._manualTileSelected !== undefined) {
          if (tileId !== CycloneMapEditor.currentTileId) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "drawSelection",
      value: function drawSelection() {
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
          for (var _x10 = leftCol; _x10 < leftCol + CycloneMapEditor.tileCols; _x10++) {
            var newIndex = y * maxCols + _x10;
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
          if (!TouchInput.isPressed()) {
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
        } else if (CycloneMapEditor.isRightButtonDown && !CycloneMapEditor.wasRightButtonDown && !this._mouseDown) {
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
        if (this._needsRefresh) {
          this.refresh();
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
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "createAllWindows",
        value: function createAllWindows() {
          $super.createAllWindows.call(this);
          this.createMapEditorWindows();
          CycloneMapEditor.clearAllData();
          this.refreshMapEditorWindows();
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
          var neededWidth = CycloneMapEditor.tileWidth * 8 + 24;

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
          this._mapEditorCommands.active = active;
          this._mapEditorLayerListWindow.active = active;
          this._mapEditorWindow.active = active;

          this._mapEditorCommands.refresh();

          this._mapEditorLayerListWindow.refresh();

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

          var mapX = $gameMap.canvasToMapX(x);
          var mapY = $gameMap.canvasToMapY(y);

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
          var mapX = $gameMap.canvasToMapX(x);
          var mapY = $gameMap.canvasToMapY(y);
          var tile1 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 0, true);
          var tile2 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 1, true);
          var tile3 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 2, true);
          var tile4 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 3, true);
          var tileId = this.getSelectionTileAt(x, y);
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

          if (mapX >= 0 && mapY >= 0) {
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

      return _class7;
    }();
  });
  CycloneMapEditor.patchClass(SceneManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class8() {
        _classCallCheck(this, _class8);
      }

      _createClass(_class8, null, [{
        key: "onSceneTerminate",
        value: function onSceneTerminate() {
          CycloneMapEditor.refreshMenuVisibility();
        }
      }]);

      return _class8;
    }();
  });

  var SpriteMapEditorCursor = /*#__PURE__*/function (_Sprite) {
    _inherits(SpriteMapEditorCursor, _Sprite);

    var _super8 = _createSuper(SpriteMapEditorCursor);

    function SpriteMapEditorCursor() {
      _classCallCheck(this, SpriteMapEditorCursor);

      return _super8.apply(this, arguments);
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
          case 'fill':
            return this.updateTiles();

          case 'pencil':
            return this.updateTiles();

          case 'eraser':
            return this.updateEraser();

          case 'rectangle':
            if (!CycloneMapEditor.rectangleWidth && !CycloneMapEditor.rectangleBackWidth || !CycloneMapEditor.rectangleHeight && !CycloneMapEditor.rectangleBackHeight) {
              this.updateTiles();
              return;
            }

            return this.updateRectangle();
        }
      }
    }, {
      key: "getNewBitmapWidth",
      value: function getNewBitmapWidth() {
        return CycloneMapEditor.tileWidth * (CycloneMapEditor.rectangleWidth || CycloneMapEditor.rectangleBackWidth + 1) || 1;
      }
    }, {
      key: "getNewBitmapHeight",
      value: function getNewBitmapHeight() {
        return CycloneMapEditor.tileHeight * (CycloneMapEditor.rectangleHeight || CycloneMapEditor.rectangleBackHeight + 1) || 1;
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

          var _iterator12 = _createForOfIteratorHelper(CycloneMapEditor.multiLayerSelection[z]),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var tileId = _step12.value;

              if (column >= CycloneMapEditor.tileCols) {
                column = 0;
                row++;
              }

              var _x11 = column * CycloneMapEditor.tileWidth;

              var y = row * CycloneMapEditor.tileHeight;
              this.bitmap.drawTile(tileId, _x11, y);
              column++;
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
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

        var _iterator13 = _createForOfIteratorHelper(CycloneMapEditor.selectedTileList),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var tileId = _step13.value;

            if (column >= CycloneMapEditor.tileCols) {
              column = 0;
              row++;
            }

            var _x12 = column * CycloneMapEditor.tileWidth;

            var y = row * CycloneMapEditor.tileHeight;

            if (CycloneMapEditor.currentLayer === 5) {
              this.bitmap.drawRegion(tileId, _x12, y);
            } else if (CycloneMapEditor.currentLayer === 4) {
              this.bitmap.drawShadow(tileId, _x12, y);
            } else {
              this.bitmap.drawTile(tileId, _x12, y);
            }

            column++;
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
    }, {
      key: "updateTiles",
      value: function updateTiles() {
        var width = CycloneMapEditor.tileWidth * CycloneMapEditor.tileCols;
        var height = CycloneMapEditor.tileHeight * CycloneMapEditor.tileRows;

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
            return CycloneMapEditor.rectangleStartX - CycloneMapEditor.rectangleBackWidth;
          }
        }

        if (SceneManager._scene._mapEditorWindow) {
          if (TouchInput.x >= SceneManager._scene._mapEditorWindow.x) {
            return $gameMap.canvasToMapX(SceneManager._scene._mapEditorWindow.x);
          }
        }

        return $gameMap.canvasToMapX(TouchInput.x);
      }
    }, {
      key: "getCursorTileY",
      value: function getCursorTileY() {
        if (CycloneMapEditor.currentTool === 'rectangle' || CycloneMapEditor.currentTool === 'eraser' || CycloneMapEditor.isRightButtonDown) {
          if (CycloneMapEditor.rectangleHeight > 0) {
            return CycloneMapEditor.rectangleStartY;
          }

          if (CycloneMapEditor.rectangleBackHeight > 0) {
            return CycloneMapEditor.rectangleStartY - CycloneMapEditor.rectangleBackHeight;
          }
        }

        return $gameMap.canvasToMapY(TouchInput.y);
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        if (!CycloneMapEditor.active) {
          return;
        }

        var tileX = this.getCursorTileX();
        var tileY = this.getCursorTileY();
        this.x = Math.floor($gameMap.adjustX(tileX) * CycloneMapEditor.tileWidth);
        this.y = Math.floor($gameMap.adjustY(tileY) * CycloneMapEditor.tileHeight);
      }
    }]);

    return SpriteMapEditorCursor;
  }(Sprite);

  CycloneMapEditor.patchClass(Spriteset_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class9() {
        _classCallCheck(this, _class9);
      }

      _createClass(_class9, [{
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

      return _class9;
    }();
  });
  CycloneMapEditor.patchClass(Tilemap, function ($super) {
    return /*#__PURE__*/function () {
      function _class10() {
        _classCallCheck(this, _class10);
      }

      _createClass(_class10, [{
        key: "_readMapData",
        value: function _readMapData(x, y, z) {
          var _CycloneMapEditor$pre;

          if (z <= 4 && !CycloneMapEditor.layerVisibility[z]) {
            return 0;
          }

          var tileIndex = CycloneMapEditor.tileIndex(x, y, z);

          if (((_CycloneMapEditor$pre = CycloneMapEditor.previewChanges) === null || _CycloneMapEditor$pre === void 0 ? void 0 : _CycloneMapEditor$pre[tileIndex]) !== undefined) {
            return CycloneMapEditor.previewChanges[tileIndex];
          }

          return $super._readMapData.call(this, x, y, z);
        }
      }]);

      return _class10;
    }();
  });
  CycloneMapEditor.patchClass(TouchInput, function ($super) {
    return /*#__PURE__*/function () {
      function _class11() {
        _classCallCheck(this, _class11);
      }

      _createClass(_class11, null, [{
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

      return _class11;
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
    var y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
    Window_Command.prototype.initialize.call(this, x, y);
    this.showBackgroundDimmer();
  };

  WindowCycloneMapEditor.prototype.windowWidth = function () {
    return CycloneMapEditor.windowWidth;
  };

  WindowCycloneMapEditor.prototype.windowHeight = function () {
    var y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
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

  WindowCycloneMapEditorCommands.prototype.spacing = function () {
    return 0;
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
    var x = Graphics.width - CycloneMapEditor.windowWidth;
    var y = SceneManager._scene._mapEditorCommands.height;
    var h = 150;
    Window_Base.prototype.initialize.call(this, x, y, CycloneMapEditor.windowWidth, h);
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

  CycloneMapEditor.isFullScreen = function () {
    // MV's _isFullScreen was broken, it would return the opposite value
    return !Graphics._isFullScreen();
  };
})();
