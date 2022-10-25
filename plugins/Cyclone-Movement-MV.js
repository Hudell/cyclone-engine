function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/*:
 * @plugindesc Adds new movement features to the game v1.01.03
 *
 * <pluginName:CycloneMovement>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-movement
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
 * Movement                                                          by Hudell
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
 * * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2022-09-15 - Version 1.03.00
 *   * Added option to disable player movement by input
 *
 * 2022-07-29 - Version 1.02.00
 *   * Prevent character from avoiding an object in the opposite direction
 *   of the diagonal direction the player is pressing. (Fixes sprite flicker)
 *   * Fixed issue with custom hitboxes
 *   * Implemented pixel movement for events
 *
 * 2020-09-18 - Version 1.01.01
 *   * Added .terrainTag method to character class.
 *
 * 2020-09-18 - Version 1.01.00
 *   * Fixed directional passability tests when Pixel Movement is disabled.
 *   * New settings to control the sidestep feature.
 * 2020-09-14 - Version 1.00.00
 * ===========================================================================
 * @param General
 *
 * @param Player
 *
 * @param Followers
 *
 * @param Events
 *
 * @param Event Triggering
 * @parent Events
 *
 * @param Event Movement
 * @parent Events
 *
 * @param AI
 *
 * @param stepCount
 * @text Steps per Tile
 * @parent General
 * @desc How many steps the player will need to take to move an entire tile?
 * @type select
 * @default 1
 * @option 4
 * @option 2
 * @option 1
 *
 * @param collisionStepCount
 * @text Collision Blocks per Tile
 * @parent General
 * @desc You can customize the map collision with the Cyclone Map Editor plugin
 * @type select
 * @default 1
 * @option 4
 * @option 2
 * @option 1
 *
 * @param followerStepsBehind
 * @text Follower Distance
 * @parent Followers
 * @desc How many steps behind should the followers be? Min = 1 step, Max = 1 tile
 * @type number
 * @min 1
 * @max 4
 * @default 3
 *
 * @param triggerAllEvents
 * @text Trigger All Events
 * @parent Event Triggering
 * @desc If true, the player may trigger multiple events when you press a button if there are more than one event in front of you
 * @type boolean
 * @on Trigger
 * @off Skip
 * @default false
 *
 * @param ignoreEmptyEvents
 * @text Ignore Empty Events
 * @parent Event Triggering
 * @desc if true, the game won't try to trigger events that have no commands
 * @type boolean
 * @on Ignore
 * @off Don't Ignore
 * @default true
 *
 * @param autoLeaveVehicles
 * @text Leave Vehicles Automatically
 * @parent Player
 * @desc If true, the player will leave boats and ships automatically when they reach land
 * @type boolean
 * @on Leave
 * @off Don't Leave
 * @default false
 *
 * @param diagonalPathfinding
 * @text Diagonal Pathfinding
 * @parent Player
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc
 * @default true
 *
 * @param disableMouseMovement
 * @text Disable Mouse Movement
 * @parent Player
 * @type boolean
 * @on Disable
 * @off Don't Disable
 * @desc
 * @default false
 *
 * @param inputSwitch
 * @text Player movement Switch
 * @description The player will only be able to move when this switch is turned on
 * @parent Player
 * @type switch
 * @default 0
 *
 * @param maxOffset
 * @text Max Slide Distance
 * @parent Player
 * @type number
 * @desc How many tiles should the player be able to sidestep when trying to avoid map obstacles?
 * @default 0.75
 * @decimals 2
 *
 * @param sidestepEvents
 * @text Sidestep Events?
 * @parent Player
 * @type boolean
 * @desc Should the player also sidestep to avoid events?
 * @default false
 *
 * @param playerHitbox
 * @text Player Hitbox
 * @parent Player
 * @type struct<Hitbox>
 * @default {"x":"6","y":"24","width":"36","height":"18"}
 *
 * @param applyToEvents
 * @text Apply Pixel Movement
 * @parent Event Movement
 * @desc Should the events also use pixel movement?
 * @type boolean
 * @default false
 *
 *
 * @param Move Toward Character
 * @parent AI
 *
 * @param enableMoveTowardCharacter
 * @text Enable Changes
 * @parent Move Toward Character
 * @desc If you don't want to change this behavior, you can disable it completely to avoid plugin conflicts.
 * @default true
 * @type boolean
 *
 * @param minDistanceToChangeDirection
 * @text Min Distance to Change Direction
 * @parent Move Toward Character
 * @desc Adds a distance buffer so the character doesn't change directions too often
 * @type number
 * @default 2
 * @decimals 2
 *
 * @param approachDiagonally
 * @text Allow Diagonal Movement
 * @parent Move Toward Character
 * @desc Change this to allow events to move diagonally when moving towards the player or another event
 * @default false
 * @type boolean
 *
 **/

/*~struct~Hitbox:
 * @param x
 * @type number
 * @default 0
 * @desc The hitbox X offset
 *
 * @param y
 * @type number
 * @default 0
 * @desc The hitbox Y offset
 *
 * @param width
 * @type number
 * @default 48
 * @desc The hitbox width
 *
 * @param height
 * @type number
 * @default 48
 * @desc The hitbox height
 */
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
        var i,
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

        switch (p) {
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

  var _addPixelMovementToClass = function addPixelMovementToClass(classRef) {
    CycloneMovement.patchClass(classRef, function ($super) {
      return /*#__PURE__*/function () {
        function _class4() {
          _classCallCheck(this, _class4);
        }

        _createClass(_class4, [{
          key: "getWidth",
          value: function getWidth() {
            return 1;
          }
        }, {
          key: "getHeight",
          value: function getHeight() {
            return 1;
          }
        }, {
          key: "getHitboxX",
          value: function getHitboxX() {
            return 0;
          }
        }, {
          key: "getHitboxY",
          value: function getHitboxY() {
            return 0;
          }
        }, {
          key: "firstXAt",
          value: function firstXAt(x) {
            return Math.floor(x + this.hitboxX);
          }
        }, {
          key: "lastXAt",
          value: function lastXAt(x) {
            var right = x + this.hitboxX + this.width;

            if (CycloneMovement.isRoundNumber(right)) {
              return right - 1;
            }

            return Math.floor(right);
          }
        }, {
          key: "firstYAt",
          value: function firstYAt(y) {
            return Math.floor(y + this.hitboxY);
          }
        }, {
          key: "lastYAt",
          value: function lastYAt(y) {
            var bottom = y + this.hitboxY + this.height;

            if (CycloneMovement.isRoundNumber(bottom)) {
              return bottom - 1;
            }

            return Math.floor(bottom);
          }
        }, {
          key: "firstCollisionXAt",
          value: function firstCollisionXAt(x) {
            var count = CycloneMovement.collisionStepCount;
            return Math.floor((x + this.hitboxX) * count) / count;
          }
        }, {
          key: "lastCollisionXAt",
          value: function lastCollisionXAt(x) {
            var count = CycloneMovement.collisionStepCount;
            var right = (x + this.hitboxX + this.width) * count;

            if (CycloneMovement.isRoundNumber(right)) {
              return (right - 1) / count;
            }

            return Math.floor(right) / count;
          }
        }, {
          key: "firstCollisionYAt",
          value: function firstCollisionYAt(y) {
            var count = CycloneMovement.collisionStepCount;
            return Math.floor((y + this.hitboxY) * count) / count;
          }
        }, {
          key: "lastCollisionYAt",
          value: function lastCollisionYAt(y) {
            var count = CycloneMovement.collisionStepCount;
            var bottom = (y + this.hitboxY + this.height) * count;

            if (CycloneMovement.isRoundNumber(bottom)) {
              return (bottom - 1) / count;
            }

            return Math.floor(bottom) / count;
          }
        }, {
          key: "shouldSkipExtraPassabilityTests",
          value: function shouldSkipExtraPassabilityTests() {
            return false;
          }
        }, {
          key: "updateHitbox",
          value: function updateHitbox() {
            this.width = this.getWidth();
            this.height = this.getHeight();
            this.hitboxX = this.getHitboxX();
            this.hitboxY = this.getHitboxY();
          }
        }, {
          key: "update",
          value: function update() {
            var _$super$update;

            this.updateHitbox();
            this.updateIsMoving();

            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            (_$super$update = $super.update).call.apply(_$super$update, [this].concat(args));
          }
        }, {
          key: "shouldPassThrough",
          value: function shouldPassThrough() {
            if (this.isThrough() || this.isDebugThrough()) {
              return true;
            }

            return false;
          }
        }, {
          key: "canPass",
          value: function canPass(x, y, d) {
            if (CycloneMovement.isDiagonal(d)) {
              var d1 = CycloneMovement.getFirstDirection(d);
              var d2 = CycloneMovement.getAlternativeDirection(d1, d);
              return this.canPassDiagonally(x, y, d2, d1);
            }

            var x2 = CycloneMovement.roundXWithDirection(x, d);
            var y2 = CycloneMovement.roundYWithDirection(y, d);
            this._blockingReason = 'free';

            if (!$gameMap.isValid(x2, y2)) {
              this._blockingReason = 'invalid';
              return false;
            }

            if (this.shouldPassThrough()) {
              return true;
            }

            if (!this.isMapPassable(x, y, d)) {
              this._blockingReason = 'tile';
              return false;
            }

            if (this.shouldSkipExtraPassabilityTests()) {
              return true;
            }

            if (!this.isMapPassable(x2, y2, this.reverseDir(d))) {
              this._blockingReason = 'tileReverse';
              return false;
            }

            if (this.isCollidedWithCharacters(x2, y2)) {
              this._blockingReason = 'characters';
              return false;
            }

            return true;
          }
        }, {
          key: "canPassDiagonally",
          value: function canPassDiagonally(x, y, horz, vert) {
            var y2 = CycloneMovement.roundYWithDirection(y, vert);
            var x2 = CycloneMovement.roundXWithDirection(x, horz);
            this._blockingReason = 'free';

            if (!$gameMap.isValid(x2, y2)) {
              this._blockingReason = 'invalid';
              return false;
            }

            if (this.shouldPassThrough()) {
              return true;
            } // Can move vertically at the current position?


            if (!this.isMapPassable(x, y, vert)) {
              this._blockingReason = 'tile';
              return false;
            } // Can move horizontally at the current position?


            if (!this.isMapPassable(x, y, horz)) {
              this._blockingReason = 'tile';
              return false;
            } // Can move horizontally at the new Y position?


            if (!this.isMapPassable(x, y2, horz)) {
              this._blockingReason = 'tile';
              return false;
            } // Can move vertically at the new X position?


            if (!this.isMapPassable(x2, y, vert)) {
              this._blockingReason = 'tile';
              return false;
            }

            if (this.shouldSkipExtraPassabilityTests()) {
              return true;
            }

            var reverseHorz = this.reverseDir(horz);
            var reverseVert = this.reverseDir(vert); // Can move vertically at the current position? (reverse)

            if (!this.isMapPassable(x2, y2, reverseVert)) {
              this._blockingReason = 'tileReverse';
              return false;
            } // Can move horizontally at the current position? (reverse)


            if (!this.isMapPassable(x2, y2, reverseHorz)) {
              this._blockingReason = 'tileReverse';
              return false;
            } // Can move horizontally at the new Y position? (reverse)


            var y3 = CycloneMovement.roundYWithDirection(y2, vert);

            if (!this.isMapPassable(x2, y3, reverseHorz)) {
              this._blockingReason = 'tileReverse';
              return false;
            } // Can move vertically at the new X position? (reverse)


            var x3 = CycloneMovement.roundXWithDirection(x2, horz);

            if (!this.isMapPassable(x3, y2, reverseVert)) {
              this._blockingReason = 'tileReverse';
              return false;
            } // Finally, check if the destination position doesn't have an event on it


            if (this.isCollidedWithCharacters(x2, y2)) {
              this._blockingReason = 'characters';
              return false;
            }

            return true;
          }
        }, {
          key: "isMapPassable",
          value: function isMapPassable(x, y, d) {
            if (CycloneMovement.goesUp(d)) {
              if (!this.canGoUp(x, y)) {
                return false;
              }
            } else if (CycloneMovement.goesDown(d)) {
              if (!this.canGoDown(x, y)) {
                return false;
              }
            }

            if (CycloneMovement.goesLeft(d)) {
              if (!this.canGoLeft(x, y)) {
                return false;
              }
            } else if (CycloneMovement.goesRight(d)) {
              if (!this.canGoRight(x, y)) {
                return false;
              }
            }

            return true;
          }
        }, {
          key: "canGoLeft",
          value: function canGoLeft(x, y) {
            var left = x + this.hitboxX;
            var firstY = this.firstCollisionYAt(y);
            var lastY = this.lastCollisionYAt(y);
            var destinationLeft = left - CycloneMovement.stepSize; // Run the collision check for every Y tile the character is touching

            for (var newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
              var checkUp = newY > firstY;
              var checkDown = newY < lastY;

              if (this.checkLeftPassage(left, newY, destinationLeft, checkUp, checkDown) === false) {
                return false;
              }
            }

            return true;
          }
        }, {
          key: "isPositionPassable",
          value: function isPositionPassable(x, y, d) {
            return CycloneMovement.isPositionPassable(x, y, d);
          }
        }, {
          key: "checkLeftPassage",
          value: function checkLeftPassage(left, y, destinationLeft) {
            var checkUp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var checkDown = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var count = CycloneMovement.collisionStepCount;
            var leftFloor = Math.floor(left * count) / count;
            var destinationLeftFloor = Math.floor(destinationLeft * count) / count; // if we're entering a new left tile

            if (destinationLeftFloor < leftFloor) {
              // check if the current left-most tile allows moving left
              if (!this.isPositionPassable(leftFloor, y, 4)) {
                return false;
              } // and check if the new left-most tile allows moving right


              if (!this.isPositionPassable(destinationLeftFloor, y, 6)) {
                return false;
              }

              if (this.checkVerticalPassage(destinationLeftFloor, y, checkUp, checkDown) === false) {
                return false;
              }
            }

            return null;
          }
        }, {
          key: "canGoRight",
          value: function canGoRight(x, y) {
            var right = x + this.hitboxX + this.width;
            var firstY = this.firstCollisionYAt(y);
            var lastY = this.lastCollisionYAt(y);
            var destinationRight = right + CycloneMovement.stepSize;

            for (var newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
              var checkUp = newY > firstY;
              var checkDown = newY < lastY;

              if (this.checkRightPassage(right, newY, destinationRight, checkUp, checkDown) === false) {
                return false;
              }
            }

            return true;
          }
        }, {
          key: "checkRightPassage",
          value: function checkRightPassage(right, y, destinationRight) {
            var checkUp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var checkDown = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var lastXDestination = this.lastCollisionXAt(destinationRight - this.width - this.hitboxX);
            var lastX = this.lastCollisionXAt(right - this.width - this.hitboxX); // if we're entering a new right tile

            if (lastXDestination > lastX) {
              if (!$gameMap.isValid(lastXDestination, y)) {
                return false;
              } // check if the current right-most tile allows moving right


              if (!this.isPositionPassable(lastX, y, 6)) {
                return false;
              } // and check if the new right-most tile allows moving left


              if (!this.isPositionPassable(lastXDestination, y, 4)) {
                return false;
              }

              if (this.checkVerticalPassage(lastXDestination, y, checkUp, checkDown) === false) {
                return false;
              }
            }

            return null;
          }
        }, {
          key: "canGoUp",
          value: function canGoUp(x, y) {
            var top = y + this.hitboxY;
            var firstX = this.firstCollisionXAt(x);
            var lastX = this.lastCollisionXAt(x);
            var destinationTop = top - CycloneMovement.stepSize;

            for (var newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
              var checkLeft = newX > firstX;
              var checkRight = newX < lastX;

              if (this.checkUpPassage(newX, top, destinationTop, checkLeft, checkRight) === false) {
                return false;
              }
            }

            return true;
          }
        }, {
          key: "checkVerticalPassage",
          value: function checkVerticalPassage(x, y, checkUp, checkDown) {
            if (checkUp && !this.isPositionPassable(x, y, 8)) {
              return false;
            }

            if (checkDown && !this.isPositionPassable(x, y, 2)) {
              return false;
            }
          }
        }, {
          key: "checkHorizontalPassage",
          value: function checkHorizontalPassage(x, y, checkLeft, checkRight) {
            if (checkLeft && !this.isPositionPassable(x, y, 4)) {
              return false;
            }

            if (checkRight && !this.isPositionPassable(x, y, 6)) {
              return false;
            }
          }
        }, {
          key: "checkUpPassage",
          value: function checkUpPassage(x, top, destinationTop) {
            var checkLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var checkRight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var count = CycloneMovement.collisionStepCount;
            var topFloor = Math.floor(top * count) / count;
            var destinationTopFloor = Math.floor(destinationTop * count) / count; // if we're entering a new top tile

            if (destinationTopFloor < topFloor) {
              // check if the current top tile allows moving up
              if (!this.isPositionPassable(x, topFloor, 8)) {
                return false;
              } // and check if the new top tile allows moving down


              if (!this.isPositionPassable(x, destinationTopFloor, 2)) {
                return false;
              }

              if (this.checkHorizontalPassage(x, destinationTopFloor, checkLeft, checkRight) === false) {
                return false;
              }
            }

            return null;
          }
        }, {
          key: "canGoDown",
          value: function canGoDown(x, y) {
            var bottom = y + this.hitboxY + this.height;
            var firstX = this.firstCollisionXAt(x);
            var lastX = this.lastCollisionXAt(x);
            var destinationBottom = bottom + CycloneMovement.stepSize;

            for (var newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
              var checkLeft = newX > firstX;
              var checkRight = newX < lastX;

              if (this.checkDownPassage(newX, bottom, destinationBottom, checkLeft, checkRight) === false) {
                return false;
              }
            }

            return true;
          }
        }, {
          key: "checkDownPassage",
          value: function checkDownPassage(x, bottom, destinationBottom) {
            var checkLeft = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var checkRight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var lastYDestination = this.lastCollisionYAt(destinationBottom - this.height - this.hitboxY);
            var lastY = this.lastCollisionYAt(bottom - this.height - this.hitboxY); // if we're entering a new bottom tile

            if (lastYDestination > lastY) {
              if (!$gameMap.isValid(x, lastYDestination)) {
                return false;
              } // check if the current bottom tile allows moving down


              if (!this.isPositionPassable(x, lastY, 2)) {
                return false;
              } // and check if the new bottom tile allows moving up


              if (!this.isPositionPassable(x, lastYDestination, 8)) {
                return false;
              }

              if (this.checkHorizontalPassage(x, lastYDestination, checkLeft, checkRight) === false) {
                return false;
              }
            }

            return null;
          }
        }, {
          key: "addNewPosition",
          value: function addNewPosition(x, y) {
            if (this instanceof Game_Vehicle) {
              return;
            }

            if (CycloneMovement.followerStepsBehind <= 1) {
              return;
            }

            if (!this._positionHistory) {
              this._positionHistory = [];
            }

            this._positionHistory.push({
              x: x,
              y: y
            });

            if (this._positionHistory.length > CycloneMovement.followerStepsBehind + 1) {
              this._positionHistory.shift();
            }
          }
        }, {
          key: "getPositionToFollow",
          value: function getPositionToFollow() {
            if (!this._positionHistory) {
              this._positionHistory = [];

              if (CycloneMovement.followerStepsBehind > 1) {
                return false;
              }
            }

            if (!$gamePlayer.areFollowersGathering()) {
              if (this._positionHistory.length < CycloneMovement.followerStepsBehind - 1) {
                return false;
              }
            }

            if (this._positionHistory.length === 0) {
              return {
                x: this._x,
                y: this._y
              };
            }

            return this._positionHistory.shift();
          }
        }, {
          key: "locate",
          value: function locate() {
            var _$super$locate;

            this._positionHistory = [];

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            (_$super$locate = $super.locate).call.apply(_$super$locate, [this].concat(args));
          }
        }, {
          key: "_moveStraight",
          value: function _moveStraight(d) {
            this.setMovementSuccess(this.canPass(this._x, this._y, d));

            if (this.isMovementSucceeded()) {
              this.setDirection(d);
              var _CycloneMovement = CycloneMovement,
                  stepCount = _CycloneMovement.stepCount;
              this._x = Math.round(CycloneMovement.roundXWithDirection(this._x, d) * stepCount) / stepCount;
              this._y = Math.round(CycloneMovement.roundYWithDirection(this._y, d) * stepCount) / stepCount;
              this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(d));
              this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(d));
              this.updateIsMoving();
              this.updateAnimationCount();
              this.addNewPosition(this._x, this._y);
              this.increaseSteps();
            } else {
              this.setDirection(d);
              this.checkEventTriggerTouchFront(d);
            }
          }
        }, {
          key: "_moveDiagonally",
          value: function _moveDiagonally(horz, vert) {
            this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));

            if (this.isMovementSucceeded()) {
              this._x = CycloneMovement.roundXWithDirection(this._x, horz);
              this._y = CycloneMovement.roundYWithDirection(this._y, vert);
              this._realX = CycloneMovement.xWithDirection(this._x, this.reverseDir(horz));
              this._realY = CycloneMovement.yWithDirection(this._y, this.reverseDir(vert));
              this.updateIsMoving();
              this.updateAnimationCount();
              this.addNewPosition(this._x, this._y);
              this.increaseSteps();
            }

            if (this._direction === this.reverseDir(horz)) {
              this.setDirection(horz);
            }

            if (this._direction === this.reverseDir(vert)) {
              this.setDirection(vert);
            }
          }
        }, {
          key: "moveStraight",
          value: function moveStraight(d) {
            return this._moveStraight(d);
          }
        }, {
          key: "moveDiagonally",
          value: function moveDiagonally(horz, vert) {
            return this._moveDiagonally(horz, vert);
          }
        }, {
          key: "isTouchingPos",
          value: function isTouchingPos(x, y) {
            if (!(x >= this.firstX && x <= this.lastX)) {
              return false;
            }

            if (!(y >= this.firstY && y <= this.lastY)) {
              return false;
            }

            return true;
          }
        }, {
          key: "isTouchingRect",
          value: function isTouchingRect(left, top, right, bottom) {
            return this.wouldTouchRectAt(left, top, right, bottom, this._x, this._y);
          }
        }, {
          key: "isTouchingCharacter",
          value: function isTouchingCharacter(character) {
            return this.wouldTouchCharacterAt(character, this._x, this._y);
          }
        }, {
          key: "wouldTouchRectAt",
          value: function wouldTouchRectAt(left, top, right, bottom, x, y) {
            var firstX = this.firstCollisionXAt(x);
            var lastX = this.lastCollisionXAt(x);
            var firstY = this.firstCollisionYAt(y);
            var lastY = this.lastCollisionYAt(y);

            if (right < firstX) {
              return false;
            }

            if (left > lastX) {
              return false;
            }

            if (bottom < firstY) {
              return false;
            }

            if (top > lastY) {
              return false;
            }

            return true;
          }
        }, {
          key: "wouldTouchCharacterAt",
          value: function wouldTouchCharacterAt(character, x, y) {
            var _character$left = character.left,
                left = _character$left === void 0 ? character.x : _character$left,
                _character$right = character.right,
                right = _character$right === void 0 ? character.x + 1 : _character$right,
                _character$top = character.top,
                top = _character$top === void 0 ? character.y : _character$top,
                _character$bottom = character.bottom,
                bottom = _character$bottom === void 0 ? character.y + 1 : _character$bottom;
            return this.wouldTouchRectAt(left, top, right, bottom, x, y);
          }
        }, {
          key: "pos",
          value: function pos(x, y) {
            if (this._x === x && this._y === y) {
              return true;
            }

            return this.isTouchingPos(x, y);
          }
        }, {
          key: "iterateNewTiles",
          value: function iterateNewTiles(callback) {
            var firstX = Math.floor(this.firstCollisionXAt(this.x));
            var firstRealX = Math.floor(this.firstCollisionXAt(this._realX));
            var lastX = Math.floor(this.lastCollisionXAt(this.x));
            var lastRealX = Math.floor(this.lastCollisionXAt(this._realX));
            var firstY = Math.floor(this.firstCollisionYAt(this.y));
            var firstRealY = Math.floor(this.firstCollisionYAt(this._realY));
            var lastY = Math.floor(this.lastCollisionYAt(this.y));
            var lastRealY = Math.floor(this.lastCollisionYAt(this._realY));
            var left = Math.min(firstX, firstRealX);
            var right = Math.max(lastX, lastRealX);
            var top = Math.min(firstY, firstRealY);
            var bottom = Math.max(lastY, lastRealY);

            for (var x = left; x <= right; x++) {
              var isNewX = x < firstRealX || x > lastRealX;

              for (var y = top; y <= bottom; y++) {
                var isNewY = y < firstRealY || y > lastRealY;

                if (!isNewX && !isNewY) {
                  continue;
                }

                if (callback.call(this, x, y) === true) {
                  return true;
                }
              }
            }

            return false;
          }
        }, {
          key: "iterateTiles",
          value: function iterateTiles(callback) {
            return this.runForAllTiles(this._x, this._y, callback);
          }
        }, {
          key: "runForAllTiles",
          value: function runForAllTiles(x, y, callback) {
            var firstX = Math.floor(this.firstCollisionXAt(x));
            var lastX = Math.floor(this.lastCollisionXAt(x));
            var firstY = Math.floor(this.firstCollisionYAt(y));
            var lastY = Math.floor(this.lastCollisionYAt(y));

            for (var newX = firstX; newX <= lastX; newX++) {
              for (var newY = firstY; newY <= lastY; newY++) {
                if (callback.call(this, newX, newY) === true) {
                  return true;
                }
              }
            }

            return false;
          }
        }, {
          key: "iteratePositions",
          value: function iteratePositions(callback) {
            return this.runForAllPositions(this._x, this._y, callback);
          }
        }, {
          key: "runForAllPositions",
          value: function runForAllPositions(x, y, callback) {
            var firstX = this.firstCollisionXAt(x);
            var lastX = this.lastCollisionXAt(x);
            var firstY = this.firstCollisionYAt(y);
            var lastY = this.lastCollisionYAt(y);

            for (var newX = firstX; newX <= lastX; newX += CycloneMovement.collisionSize) {
              for (var newY = firstY; newY <= lastY; newY += CycloneMovement.collisionSize) {
                if (callback.call(this, newX, newY) === true) {
                  return true;
                }
              }
            }

            return false;
          }
        }, {
          key: "isCollidedWithEvents",
          value: function isCollidedWithEvents(x, y) {
            return this.runForAllTiles(x, y, function (blockX, blockY) {
              //If the player is "inside" it, then this event won't be considered,
              //because if it did, the player would be locked on it
              //this shouldn't be possible on normal conditions.
              if (this.isTouchingPos(blockX, blockY)) {
                return false;
              }

              return $gameMap.eventsXyNt(blockX, blockY).some(function (event) {
                return event.isNormalPriority();
              });
            });
          }
        }, {
          key: "isOnBush",
          value: function isOnBush() {
            var bushCount = 0;
            var nonBushCount = 0;
            this.iteratePositions(function (x, y) {
              if ($gameMap.isBush(Math.floor(x), Math.floor(y))) {
                bushCount++;
              } else {
                nonBushCount++;
              }
            });
            return bushCount > nonBushCount;
          }
        }, {
          key: "isOnLadder",
          value: function isOnLadder() {
            var ladderCount = 0;
            var nonLadderCount = 0;
            this.iteratePositions(function (x, y) {
              if ($gameMap.isLadder(Math.floor(x), Math.floor(y))) {
                ladderCount++;
              } else {
                nonLadderCount++;
              }
            });
            return ladderCount > nonLadderCount;
          }
        }, {
          key: "isCollidedWithVehicles",
          value: function isCollidedWithVehicles() {
            return false;
          }
        }, {
          key: "chasePosition",
          value: function chasePosition(x, y) {
            var sx = this.deltaXFrom(x);
            var sy = this.deltaYFrom(y);
            var sxAbs = Math.abs(sx);
            var syAbs = Math.abs(sy);
            var _CycloneMovement2 = CycloneMovement,
                stepSize = _CycloneMovement2.stepSize;

            if (sxAbs >= stepSize && syAbs >= stepSize) {
              this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
            } else if (sxAbs >= stepSize) {
              this.moveStraight(sx > 0 ? 4 : 6);
            } else if (syAbs >= stepSize) {
              this.moveStraight(sy > 0 ? 8 : 2);
            } else if (sxAbs > 0 || syAbs > 0) {
              this._x = x;
              this._y = y;
            }

            this.setMoveSpeed($gamePlayer.realMoveSpeed());
          }
        }, {
          key: "setDirection",
          value: function setDirection(d) {
            if (CycloneMovement.goesUp(d)) {
              $super.setDirection.call(this, 8);
            } else if (CycloneMovement.goesDown(d)) {
              $super.setDirection.call(this, 2);
            } else if (CycloneMovement.goesLeft(d)) {
              $super.setDirection.call(this, 4);
            } else if (CycloneMovement.goesRight(d)) {
              $super.setDirection.call(this, 6);
            }
          }
        }, {
          key: "_findNextBestNode",
          value: function _findNextBestNode(best, x1, y1, direction, closedList, goalX, goalY, current, openList, nodeList) {
            var x2 = CycloneMovement.roundXWithDirection(x1, direction);
            var y2 = CycloneMovement.roundYWithDirection(y1, direction);
            var pos2 = y2 * $gameMap.width() + x2;

            if (closedList.contains(pos2)) {
              return best;
            }

            if (Math.floor(x1) === goalX && Math.floor(y1) === goalY) {
              return false;
            }

            if (!this.canPass(x1, y1, direction)) {
              return best;
            }

            var g2 = current.g + CycloneMovement.stepSize;

            if (CycloneMovement.isDiagonal(direction)) {
              g2 += CycloneMovement.stepSize;
            }

            var index2 = openList.indexOf(pos2);

            if (index2 < 0 || g2 < nodeList[index2].g) {
              var neighbor;

              if (index2 >= 0) {
                neighbor = nodeList[index2];
              } else {
                neighbor = {};
                nodeList.push(neighbor);
                openList.push(pos2);
              }

              neighbor.parent = current;
              neighbor.x = x2;
              neighbor.y = y2;
              neighbor.g = g2;
              neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);

              if (!best || neighbor.f - neighbor.g < best.f - best.g) {
                return neighbor;
              }
            }

            return best;
          }
        }, {
          key: "getDirectionNode",
          value: function getDirectionNode(start, goalX, goalY) {
            var searchLimit = this.searchLimit();
            var mapWidth = $gameMap.width();
            var nodeList = [];
            var openList = [];
            var closedList = [];
            var best = start;

            if (this.x === goalX && this.y === goalY) {
              return undefined;
            }

            nodeList.push(start);
            openList.push(start.y * mapWidth + start.x);

            while (nodeList.length) {
              var bestIndex = 0;

              for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i].f < nodeList[bestIndex].f) {
                  bestIndex = i;
                }
              }

              var current = nodeList[bestIndex];
              var x1 = current.x;
              var y1 = current.y;
              var pos1 = y1 * mapWidth + x1;
              var g1 = current.g;
              nodeList.splice(bestIndex, 1);
              openList.splice(openList.indexOf(pos1), 1);
              closedList.push(pos1);

              if (this._positionMatch(current.x, current.y, goalX, goalY)) {
                best = current;
                break;
              }

              if (g1 >= searchLimit) {
                continue;
              }

              for (var d = 1; d <= 9; d++) {
                if (d === 5) {
                  continue;
                }

                if (!CycloneMovement.diagonalPathfinding && CycloneMovement.isDiagonal(d)) {
                  continue;
                }

                var nextBest = this._findNextBestNode(best, x1, y1, d, closedList, goalX, goalY, current, openList, nodeList);

                if (nextBest === false) {
                  break;
                }

                best = nextBest;
              }
            }

            return best;
          }
        }, {
          key: "clearCachedNode",
          value: function clearCachedNode() {
            this.setCachedNode();
          }
        }, {
          key: "setCachedNode",
          value: function setCachedNode(node, goalX, goalY) {
            this._cachedNode = node;
            this._cachedGoalX = goalX;
            this._cachedGoalY = goalY;
            this._cacheTTL = 2 * CycloneMovement.collisionStepCount * CycloneMovement.stepCount - 1;
          }
        }, {
          key: "_getDirectionFromDeltas",
          value: function _getDirectionFromDeltas(deltaX, deltaY) {
            if (CycloneMovement.diagonalPathfinding) {
              if (deltaY > 0) {
                if (deltaX > 0) {
                  return 3;
                }

                if (deltaX < 0) {
                  return 1;
                }
              } else if (deltaY < 0) {
                if (deltaX < 0) {
                  return 7;
                }

                if (deltaX > 0) {
                  return 9;
                }
              }
            }

            if (deltaY > 0) {
              return 2;
            }

            if (deltaX < 0) {
              return 4;
            }

            if (deltaX > 0) {
              return 6;
            }

            if (deltaY < 0) {
              return 8;
            }

            return 0;
          }
        }, {
          key: "_returnDirection",
          value: function _returnDirection(direction, goalX, goalY, canRetry) {
            if (direction) {
              if (!this.canPass(this._x, this._y, direction)) {
                this.clearCachedNode();

                if (canRetry) {
                  return this.findDirectionTo(goalX, goalY);
                }

                this._direction = direction;
                return 0;
              }
            }

            return direction;
          }
        }, {
          key: "_positionMatch",
          value: function _positionMatch(x1, y1, x2, y2) {
            return x1 === x2 && y1 === y2;
          }
        }, {
          key: "_nodeIsNotNextStep",
          value: function _nodeIsNotNextStep(node, x, y) {
            if (!node.parent) {
              return false;
            }

            return !this._positionMatch(node.parent.x, node.parent.y, x, y);
          }
        }, {
          key: "_findDirectionTo",
          value: function _findDirectionTo(goalX, goalY) {
            var node = this._cachedNode;
            var start = {};
            start.parent = null;
            start.x = this.x;
            start.y = this.y;
            start.g = 0;
            start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
            var canRetry = true;

            if (node === undefined) {
              node = this.getDirectionNode(start, goalX, goalY);
              this.setCachedNode(node, goalX, goalY);

              if (node === undefined) {
                return 0;
              }

              canRetry = false;
            }

            if (node.x !== start.x || node.y !== start.y) {
              while (this._nodeIsNotNextStep(node, start.x, start.y)) {
                node = node.parent;
              }

              if (!node.parent) {
                this.clearCachedNode();

                if (canRetry) {
                  node = this.getDirectionNode(start, goalX, goalY);
                  this.setCachedNode(node, goalX, goalY);

                  if (node === undefined) {
                    return 0;
                  }
                }
              }
            }

            var deltaX1 = $gameMap.deltaX(node.x, start.x);
            var deltaY1 = $gameMap.deltaY(node.y, start.y);

            var deltaD = this._getDirectionFromDeltas(deltaX1, deltaY1);

            if (deltaD) {
              return deltaD;
            }

            var deltaX2 = this.deltaXFrom(goalX);
            var deltaY2 = this.deltaYFrom(goalY);
            var direction = 0;

            if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
              direction = deltaX2 > 0 ? 4 : 6;
            } else if (deltaY2 !== 0) {
              direction = deltaY2 > 0 ? 8 : 2;
            }

            return this._returnDirection(direction, goalX, goalY, canRetry);
          }
        }, {
          key: "findDirectionTo",
          value: function findDirectionTo(goalX, goalY) {
            if (this.x === goalX && this.y === goalY) {
              return 0;
            }

            if (this._cachedNode) {
              if (this._cachedGoalX !== goalX || this._cachedGoalY !== goalY) {
                this.clearCachedNode();
              } else if (this._cacheTTL > 0) {
                this._cacheTTL--;
              } else {
                this.clearCachedNode();
              }
            }

            return this._findDirectionTo(goalX, goalY);
          }
        }, {
          key: "originalIsMoving",
          value: function originalIsMoving() {
            return $super.isMoving.call(this);
          }
        }, {
          key: "isMoving",
          value: function isMoving() {
            if (this.distancePerFrame() >= CycloneMovement.stepSize) {
              return this._isMoving;
            }

            return this.originalIsMoving();
          }
        }, {
          key: "updateIsMoving",
          value: function updateIsMoving() {
            this._isMoving = this.originalIsMoving();
          }
        }, {
          key: "setPosition",
          value: function setPosition() {
            var _$super$setPosition;

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            (_$super$setPosition = $super.setPosition).call.apply(_$super$setPosition, [this].concat(args));

            this.updateIsMoving();
          }
        }, {
          key: "copyPosition",
          value: function copyPosition(character) {
            $super.copyPosition.call(this, character);
            this.updateIsMoving();
          }
        }, {
          key: "updateJump",
          value: function updateJump() {
            $super.updateJump.call(this);
            this.updateIsMoving();
          }
        }, {
          key: "jump",
          value: function jump() {
            var _$super$jump;

            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            (_$super$jump = $super.jump).call.apply(_$super$jump, [this].concat(args));

            this.updateIsMoving();
          }
        }, {
          key: "terrainTag",
          value: function terrainTag() {
            return $gameMap.terrainTag(this.middleX, this.middleY);
          }
        }, {
          key: "left",
          get: function get() {
            return this._x + this.hitboxX;
          }
        }, {
          key: "right",
          get: function get() {
            return this._x + this.hitboxX + this.width;
          }
        }, {
          key: "top",
          get: function get() {
            return this._y + this.hitboxY;
          }
        }, {
          key: "bottom",
          get: function get() {
            return this._y + this.hitboxY + this.height;
          }
        }, {
          key: "firstY",
          get: function get() {
            return this.firstYAt(this._y);
          }
        }, {
          key: "lastY",
          get: function get() {
            return this.lastYAt(this._y);
          }
        }, {
          key: "firstX",
          get: function get() {
            return this.firstXAt(this._x);
          }
        }, {
          key: "lastX",
          get: function get() {
            return this.lastXAt(this._x);
          }
        }, {
          key: "middleX",
          get: function get() {
            return Math.round(this.left + this.getWidth() / 2);
          }
        }, {
          key: "middleY",
          get: function get() {
            return Math.round(this.top + this.getHeight() / 2);
          }
        }]);

        return _class4;
      }();
    });
  };

  var currentMapCollisionTable = false;

  var CycloneMovement$1 = /*#__PURE__*/function (_CyclonePlugin) {
    _inherits(CycloneMovement, _CyclonePlugin);

    var _super2 = _createSuper(CycloneMovement);

    function CycloneMovement() {
      _classCallCheck(this, CycloneMovement);

      return _super2.apply(this, arguments);
    }

    _createClass(CycloneMovement, null, [{
      key: "register",
      value: function register() {
        _get(_getPrototypeOf(CycloneMovement), "initialize", this).call(this, 'CycloneMovement');

        this.structs.set('CycloneHitbox', {
          x: {
            type: 'int',
            defaultValue: 0
          },
          y: {
            type: 'int',
            defaultValue: 0
          },
          width: {
            type: 'int',
            defaultValue: 48
          },
          height: {
            type: 'int',
            defaultValue: 48
          }
        });

        _get(_getPrototypeOf(CycloneMovement), "register", this).call(this, {
          stepCount: {
            type: 'int',
            defaultValue: 1
          },
          collisionStepCount: {
            type: 'int',
            defaultValue: 1
          },
          followerStepsBehind: {
            type: 'int',
            defaultValue: 3
          },
          triggerAllEvents: 'boolean',
          ignoreEmptyEvents: {
            type: 'boolean',
            defaultValue: true
          },
          autoLeaveVehicles: 'boolean',
          diagonalPathfinding: {
            type: 'boolean',
            defaultValue: true
          },
          disableMouseMovement: 'boolean',
          inputSwitch: 'int',
          maxOffset: {
            type: 'float',
            defaultValue: 0.75
          },
          sidestepEvents: 'boolean',
          playerHitbox: {
            type: 'struct<CycloneHitbox>',
            defaultValue: '{"x":6,"y":24,"width":36,"height":18}'
          },
          applyToEvents: 'boolean',
          minDistanceToChangeDirection: {
            type: 'float',
            defaultValue: 1
          },
          enableMoveTowardCharacter: {
            type: 'boolean',
            defaultValue: true
          },
          approachDiagonally: 'boolean'
        });

        this.stepCount = [1, 2, 4].includes(this.params.stepCount) ? this.params.stepCount : 1;
        this.collisionStepCount = Math.min(this.stepCount, [1, 2, 4].includes(this.params.collisionStepCount) ? this.params.collisionStepCount : 1);
        this.stepSize = 1 / this.stepCount;
        this.collisionSize = 1 / this.collisionStepCount;
        this.followerStepsBehind = Number(this.params.followerStepsBehind || 1).clamp(1, 12);
        this.triggerAllEvents = this.params.triggerAllEvents === true;
        this.autoLeaveVehicles = this.params.autoLeaveVehicles === true;
        this.ignoreEmptyEvents = this.params.ignoreEmptyEvents !== false;
        this.diagonalPathfinding = this.params.diagonalPathfinding !== false;
        this.disableMouseMovement = this.params.disableMouseMovement === true;

        _addPixelMovementToClass(Game_Player);

        _addPixelMovementToClass(Game_Follower);

        if (this.params.applyToEvents) {
          _addPixelMovementToClass(Game_Event);
        }
      }
    }, {
      key: "isRoundNumber",
      value: function isRoundNumber(n) {
        return Math.floor(n) === n;
      }
    }, {
      key: "goesLeft",
      value: function goesLeft(d) {
        return DirectionHelper.goesLeft(d);
      }
    }, {
      key: "goesRight",
      value: function goesRight(d) {
        return DirectionHelper.goesRight(d);
      }
    }, {
      key: "goesUp",
      value: function goesUp(d) {
        return DirectionHelper.goesUp(d);
      }
    }, {
      key: "goesDown",
      value: function goesDown(d) {
        return DirectionHelper.goesDown(d);
      }
    }, {
      key: "isDiagonal",
      value: function isDiagonal(d) {
        return DirectionHelper.isDiagonal(d);
      }
    }, {
      key: "isVertical",
      value: function isVertical(d) {
        return DirectionHelper.isVertical(d);
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal(d) {
        return DirectionHelper.isHorizontal(d);
      }
    }, {
      key: "shareADirection",
      value: function shareADirection(dir1, dir2) {
        return DirectionHelper.shareADirection(dir1, dir2);
      }
    }, {
      key: "getFirstDirection",
      value: function getFirstDirection(diagonalDirection) {
        return DirectionHelper.getFirstDirection(diagonalDirection);
      }
    }, {
      key: "getAlternativeDirection",
      value: function getAlternativeDirection(direction, diagonalDirection) {
        return DirectionHelper.getAlternativeDirection(direction, diagonalDirection);
      }
    }, {
      key: "xWithDirection",
      value: function xWithDirection(x, d) {
        var _stepSize;

        var stepSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        stepSize = (_stepSize = stepSize) !== null && _stepSize !== void 0 ? _stepSize : this.stepSize;

        if (this.goesLeft(d)) {
          return x - stepSize;
        }

        if (this.goesRight(d)) {
          return x + stepSize;
        }

        return x;
      }
    }, {
      key: "yWithDirection",
      value: function yWithDirection(y, d) {
        var _stepSize2;

        var stepSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        stepSize = (_stepSize2 = stepSize) !== null && _stepSize2 !== void 0 ? _stepSize2 : this.stepSize;

        if (this.goesDown(d)) {
          return y + stepSize;
        }

        if (this.goesUp(d)) {
          return y - stepSize;
        }

        return y;
      }
    }, {
      key: "roundXWithDirection",
      value: function roundXWithDirection(x, d) {
        var stepSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        return $gameMap.roundX(this.xWithDirection(x, d, stepSize));
      }
    }, {
      key: "roundYWithDirection",
      value: function roundYWithDirection(y, d) {
        var stepSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        return $gameMap.roundY(this.yWithDirection(y, d, stepSize));
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
      key: "parseCollisionData",
      value: function parseCollisionData(note) {
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
          console.error('Failed to parse data from CycloneMapEditor event.');
          console.log(json);
          console.log(e);
          return;
        }

        return data;
      }
    }, {
      key: "setupCollision",
      value: function setupCollision() {
        if (!$gameMap || !$gameMap._loaded) {
          return;
        }

        var stepCount = this.collisionStepCount;
        currentMapCollisionTable = new Array($dataMap.width * $dataMap.height * stepCount * stepCount);
        this.loadDefaultCollisionTable();
        this.loadCustomCollision();
      }
    }, {
      key: "loadDefaultCollisionTable",
      value: function loadDefaultCollisionTable() {
        var _$dataMap = $dataMap,
            width = _$dataMap.width,
            height = _$dataMap.height;

        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var downPassable = $gameMap.isPassable(x, y, 2);
            var leftPassable = $gameMap.isPassable(x, y, 4);
            var rightPassable = $gameMap.isPassable(x, y, 6);
            var upPassable = $gameMap.isPassable(x, y, 8);
            this.applyTileCollision(x, y, downPassable, leftPassable, rightPassable, upPassable);
          }
        }
      }
    }, {
      key: "setBlockCollision",
      value: function setBlockCollision(x, y, collision) {
        var index = this.collisionIndex(x, y);
        currentMapCollisionTable[index] = collision;
      }
    }, {
      key: "applySingleTileCollision",
      value: function applySingleTileCollision(x, y, blockUp, blockDown, blockLeft, blockRight) {
        var collision = this._mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) || 1;
        this.setBlockCollision(x, y, collision);
      }
    }, {
      key: "applyFullTileCollision",
      value: function applyFullTileCollision(x, y, collision) {
        var size = this.collisionSize;

        for (var subX = x; subX < x + 1; subX += size) {
          for (var subY = y; subY < y + 1; subY += size) {
            this.setBlockCollision(subX, subY, collision);
          }
        }
      }
    }, {
      key: "applyTileDirectionCollision",
      value: function applyTileDirectionCollision(x, y, direction, collision) {
        var size = this.collisionSize;

        if (direction === 2 || direction === 8) {
          var subY = y + (direction === 2 ? 1 - size : 0);

          for (var _subX = x; _subX < x + 1; _subX += size) {
            this.setBlockCollision(_subX, subY, collision);
          }

          return;
        }

        var subX = x + (direction === 6 ? 1 - size : 0);

        for (var _subY = y; _subY < y + 1; _subY += size) {
          this.setBlockCollision(subX, _subY, collision);
        }
      }
    }, {
      key: "applyTileCornerCollision",
      value: function applyTileCornerCollision(x, y, horz, vert, collision) {
        var size = this.collisionSize;
        var blockY = vert === 2 ? y + 1 - size : y;
        var blockX = horz === 6 ? x + 1 - size : x;
        this.setBlockCollision(blockX, blockY, collision);
      }
    }, {
      key: "collisionIndex",
      value: function collisionIndex(x, y) {
        var useEditorStepCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var stepCount = useEditorStepCount ? 4 : this.collisionStepCount;
        var intX = Math.floor(x * stepCount);
        var intY = Math.floor(y * stepCount);
        var height = $gameMap.height() * stepCount;
        var width = $gameMap.width() * stepCount;
        return intY % height * width + intX % width;
      } // eslint-disable-next-line complexity

    }, {
      key: "_mergeCustomCollisionValues",
      value: function _mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) {
        if (blockLeft && blockRight && blockDown && blockUp) {
          return 20;
        }

        if (blockUp) {
          if (blockLeft) {
            if (blockRight) {
              return 22;
            }

            return 17;
          }

          if (blockRight) {
            if (blockDown) {
              return 24;
            }

            return 19;
          }

          if (blockDown) {
            return 4;
          }

          return 18;
        }

        if (blockDown) {
          if (blockLeft) {
            if (blockRight) {
              return 28;
            }

            return 11;
          }

          if (blockRight) {
            return 13;
          }

          return 12;
        }

        if (blockLeft) {
          if (blockRight) {
            return 5;
          }

          return 14;
        }

        if (blockRight) {
          return 16;
        }
      } // If the collision is using less than 4 blocks per tile, then merge the sub-blocks into bigger blocks.
      // This is needed for the directional passabilities to work properly
      // eslint-disable-next-line complexity

    }, {
      key: "_mergeCustomCollisions",
      value: function _mergeCustomCollisions(x, y, data) {
        var _data$radix;

        var radix = (_data$radix = data.radix) !== null && _data$radix !== void 0 ? _data$radix : 10;

        if (this.collisionStepCount === 4) {
          var editorIndex = this.collisionIndex(x, y);
          return parseInt(data.collision[editorIndex], radix) || 0;
        } // merge every sub-block into a single one


        var diffCount = Math.floor(4 / this.collisionStepCount);
        var diffSize = 1 / diffCount;
        var result = false;
        var blockUp = false;
        var blockDown = false;
        var blockRight = false;
        var blockLeft = false;

        for (var blockX = 0; blockX < diffCount; blockX++) {
          for (var blockY = 0; blockY < diffCount; blockY++) {
            var _editorIndex = this.collisionIndex(x + blockX * diffSize, y + blockY * diffSize, true);

            var customCollision = parseInt(data.collision[_editorIndex], radix) || 0;

            if (customCollision === 2) {
              return 2;
            }

            var goesUp = false;
            var goesLeft = false;
            var goesRight = false;
            var goesDown = false;

            if (customCollision >= 20) {
              var d = customCollision - 20;
              goesUp = !DirectionHelper.goesUp(d);
              goesLeft = !DirectionHelper.goesLeft(d);
              goesRight = !DirectionHelper.goesRight(d);
              goesDown = !DirectionHelper.goesDown(d);
            } else if (customCollision > 10) {
              var _d = customCollision - 10;

              goesUp = DirectionHelper.goesUp(_d);
              goesLeft = DirectionHelper.goesLeft(_d);
              goesRight = DirectionHelper.goesRight(_d);
              goesDown = DirectionHelper.goesDown(_d);
            } else if (customCollision === 4) {
              goesUp = true;
              goesDown = true;
            } else if (customCollision === 5) {
              goesLeft = true;
              goesRight = true;
            } else {
              if (result === false) {
                result = customCollision;
              }

              continue;
            }

            if (goesUp && blockY === 0) {
              blockUp = true;
            }

            if (goesDown && blockY === diffCount - 1) {
              blockDown = true;
            }

            if (goesLeft && blockX === 0) {
              blockLeft = true;
            }

            if (goesRight && blockX === diffCount - 1) {
              blockRight = true;
            }
          }
        }

        return this._mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) || result || 0;
      }
    }, {
      key: "setupCustomCollision",
      value: function setupCustomCollision(compressedData) {
        var data = CycloneMovement$1.parseCollisionData(compressedData);

        if (!data || !data.collision) {
          return;
        }

        var increment = this.collisionSize;

        for (var x = 0; x < $dataMap.width; x += increment) {
          for (var y = 0; y < $dataMap.height; y += increment) {
            var customCollision = this._mergeCustomCollisions(x, y, data);

            if (customCollision > 0) {
              this.setBlockCollision(x, y, customCollision);
            }
          }
        }
      }
    }, {
      key: "loadCustomCollision",
      value: function loadCustomCollision() {
        var _iterator6 = _createForOfIteratorHelper($dataMap.events),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var event = _step6.value;

            if (!event) {
              continue;
            }

            if (event.name !== 'CycloneMapEditor') {
              continue;
            }

            this.setupCustomCollision(event.note);
            return;
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "isPositionPassable",
      value: function isPositionPassable(x, y, d) {
        var index = this.collisionIndex(x, y);
        var collision = currentMapCollisionTable[index];

        if (!collision || collision === 1) {
          return true;
        }

        if (collision === 2) {
          return false;
        }

        if (collision >= 20) {
          var unblockedDirection = collision - 20;

          if (!this.shareADirection(d, unblockedDirection)) {
            return false;
          }
        } else if (collision > 10) {
          var blockedDirection = collision - 10;

          if (this.shareADirection(d, blockedDirection)) {
            return false;
          }
        } else if (collision === 4) {
          if (DirectionHelper.goesUp(d) || DirectionHelper.goesDown(d)) {
            return false;
          }
        } else if (collision === 5) {
          if (DirectionHelper.goesLeft(d) || DirectionHelper.goesRight(d)) {
            return false;
          }
        }

        return true;
      }
    }, {
      key: "applyTileCollision",
      value: function applyTileCollision(x, y, down, left, right, up) {
        if (down === left && down === right && down === up) {
          this.applyFullTileCollision(x, y, down ? 1 : 2);
          return;
        }

        if (CycloneMovement$1.collisionStepCount === 1) {
          this.applySingleTileCollision(x, y, !up, !down, !left, !right);
          return;
        }

        this.applyFullTileCollision(x, y, 1);

        if (!left) {
          this.applyTileDirectionCollision(x, y, 4, 14);
        }

        if (!right) {
          this.applyTileDirectionCollision(x, y, 6, 16);
        }

        if (!down) {
          this.applyTileDirectionCollision(x, y, 2, 12);

          if (!left) {
            this.applyTileCornerCollision(x, y, 4, 2, 11);
          }

          if (!right) {
            this.applyTileCornerCollision(x, y, 6, 2, 13);
          }
        }

        if (!up) {
          this.applyTileDirectionCollision(x, y, 8, 18);

          if (!left) {
            this.applyTileCornerCollision(x, y, 4, 8, 17);
          }

          if (!right) {
            this.applyTileCornerCollision(x, y, 6, 8, 19);
          }
        }
      }
    }, {
      key: "tileIdx",
      value: function tileIdx(x, y) {
        var width = $dataMap.width;
        return y * width + x || 0;
      }
    }, {
      key: "addPixelMovementToClass",
      value: function addPixelMovementToClass(classObj) {
        _addPixelMovementToClass(classObj);
      }
    }, {
      key: "currentMapCollisionTable",
      get: function get() {
        return currentMapCollisionTable;
      }
    }]);

    return CycloneMovement;
  }(CyclonePlugin);

  globalThis.CycloneMovement = CycloneMovement$1;
  CycloneMovement$1.register();
  CycloneMovement.patchClass(Game_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "isValid",
        value: function isValid(x, y) {
          return x >= 0 && y >= 0 && Math.floor(x) < this.width() && Math.floor(y) < this.height();
        }
      }, {
        key: "setup",
        value: function setup(mapId) {
          $super.setup.call(this, mapId);
          this._loaded = true;
          CycloneMovement.setupCollision();
        }
      }, {
        key: "isTileClear",
        value: function isTileClear(x, y) {
          if (!this.checkPassage(x, y, 2)) {
            return false;
          }

          if (!this.checkPassage(x, y, 4)) {
            return false;
          }

          if (!this.checkPassage(x, y, 6)) {
            return false;
          }

          if (!this.checkPassage(x, y, 8)) {
            return false;
          }

          return true;
        }
      }, {
        key: "distance",
        value: function distance(x1, y1, x2, y2) {
          if (!CycloneMovement.diagonalPathfinding) {
            return $super.distance.call(this, x1, y1, x2, y2);
          } // good old Pythagoras


          var b = Math.abs(this.deltaY(y1, y2));
          var c = Math.abs(this.deltaX(x1, x2));
          var a2 = Math.pow(b, 2) + Math.pow(c, 2);
          var a = Math.sqrt(a2);
          return a;
        }
      }, {
        key: "regionId",
        value: function regionId(x, y) {
          return $super.regionId.call(this, Math.floor(x), Math.floor(y));
        }
      }]);

      return _class5;
    }();
  });
  CycloneMovement.patchClass(Game_Character, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, [{
        key: "moveTowardCharacter",
        value: function moveTowardCharacter(character) {
          if (!CycloneMovement.params.enableMoveTowardCharacter) {
            return $super.moveTowardCharacter.call(this, character);
          }

          var sx = this.deltaXFrom(character.x);
          var sy = this.deltaYFrom(character.y);
          var horizontalDirection = sx > 0 ? 4 : 6;
          var verticalDirection = sy > 0 ? 8 : 2;
          var realHorizontalDistance = CycloneMovement.params.applyToEvents ? Math.abs(sx) : Math.floor(Math.abs(sx));
          var realVerticalDistance = CycloneMovement.params.applyToEvents ? Math.abs(sy) : Math.floor(Math.abs(sy));

          if (CycloneMovement.params.approachDiagonally && realVerticalDistance > 0 && realHorizontalDistance > 0) {
            this.moveDiagonally(horizontalDirection, verticalDirection);

            if (this.isMovementSucceeded()) {
              return;
            }
          }

          var minDistance = CycloneMovement.params.minDistanceToChangeDirection;
          var horizontalDistance = realHorizontalDistance + (this._direction === horizontalDirection ? Math.min(minDistance, realVerticalDistance) : 0);
          var verticalDistance = realVerticalDistance + (this._direction === verticalDirection ? Math.min(minDistance, realHorizontalDistance) : 0);

          if (horizontalDistance > verticalDistance) {
            this.moveStraight(horizontalDirection);

            if (!this.isMovementSucceeded() && realVerticalDistance !== 0) {
              this.moveStraight(verticalDirection);
            }
          } else if (realVerticalDistance !== 0) {
            this.moveStraight(verticalDirection);

            if (!this.isMovementSucceeded() && realHorizontalDistance !== 0) {
              this.moveStraight(horizontalDirection);
            }
          } else if (realHorizontalDistance !== 0) {
            this.moveStraight(horizontalDirection);
          }
        }
      }]);

      return _class6;
    }();
  });
  var tryToLeaveVehicleDelay = 0;
  CycloneMovement.patchClass(Game_Player, function ($super) {
    return /*#__PURE__*/function () {
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "refresh",
        value: function refresh() {
          $super.refresh.call(this);
          this._defaultWidth = Math.floor(CycloneMovement.params.playerHitbox.width / $gameMap.tileWidth() * 8) / 8;
          this._defaultHeight = Math.floor(CycloneMovement.params.playerHitbox.height / $gameMap.tileHeight() * 8) / 8;
          this._defaultHitboxX = Math.floor(CycloneMovement.params.playerHitbox.x / $gameMap.tileWidth() * 8) / 8;
          this._defaultHitboxY = Math.floor(CycloneMovement.params.playerHitbox.y / $gameMap.tileWidth() * 8) / 8;
        }
      }, {
        key: "getWidth",
        value: function getWidth() {
          if (this.isInAnyVehicle()) {
            return 1;
          }

          return this.defaultWidth;
        }
      }, {
        key: "getHeight",
        value: function getHeight() {
          if (this.isInAnyVehicle()) {
            return 1;
          }

          return this.defaultHeight;
        }
      }, {
        key: "getHitboxX",
        value: function getHitboxX() {
          if (this.isInAnyVehicle()) {
            return 0;
          }

          return this.defaultHitboxX;
        }
      }, {
        key: "getHitboxY",
        value: function getHitboxY() {
          if (this.isInAnyVehicle()) {
            return 0;
          }

          return this.defaultHitboxY;
        }
      }, {
        key: "isInAnyVehicle",
        value: function isInAnyVehicle() {
          if (this._ignoreVehicle) {
            return false;
          }

          return this._vehicleType !== 'walk';
        }
      }, {
        key: "moveByInput",
        value: function moveByInput() {
          if (this.isMoving() || !this.canMove()) {
            return;
          }

          if (CycloneMovement.params.inputSwitch > 0 && !$gameSwitches.value(CycloneMovement.params.inputSwitch)) {
            return;
          }

          var direction = Input.dir4;
          var diagonalDirection = Input.dir8;
          var alternativeD = direction;

          if (direction > 0) {
            $gameTemp.clearDestination();
          } else if ($gameTemp.isDestinationValid()) {
            diagonalDirection = this.determineDirectionToDestination();
            direction = CycloneMovement.getFirstDirection(diagonalDirection);
          }

          alternativeD = CycloneMovement.getAlternativeDirection(direction, diagonalDirection);

          if (direction === 0) {
            return;
          }

          this.tryMoving(direction, alternativeD, diagonalDirection);

          if (!this.isMoving()) {
            if (this.tryOtherMovementOptions(direction, diagonalDirection)) {
              return;
            }

            if (this._direction !== direction) {
              this.setDirection(direction);
              this.checkEventTriggerTouchFront();
            }
          }
        }
      }, {
        key: "tryMoving",
        value: function tryMoving(direction, alternativeD, diagonalDirection) {
          if (this.canPass(this._x, this._y, direction) || direction !== alternativeD && this.canPass(this._x, this._y, alternativeD)) {
            this.onBeforeMove();
            var oldDirection = this._direction;
            this.executeMove(diagonalDirection);

            if (this.isMovementSucceeded()) {
              return;
            }

            this.executeMove(direction);

            if (!this.isMovementSucceeded()) {
              this.executeMove(alternativeD); // If none of the directions were clear and we were already facing one of them before, then revert back to it

              if (!this.isMovementSucceeded()) {
                if (oldDirection === direction || oldDirection === alternativeD) {
                  this._direction = oldDirection;
                }
              }
            }
          }
        }
      }, {
        key: "onBeforeMove",
        value: function onBeforeMove() {
          tryToLeaveVehicleDelay = 20;
        }
      }, {
        key: "tryOtherMovementOptions",
        value: function tryOtherMovementOptions(direction, diagonalDirection) {
          if (this.tryToLeaveVehicle(direction)) {
            return true;
          }

          if (this.isInAnyVehicle()) {
            return false;
          }

          if (this.tryToAvoid(direction, CycloneMovement.params.maxOffset, diagonalDirection)) {
            return true;
          }

          return false;
        }
      }, {
        key: "tryToLeaveVehicle",
        value: function tryToLeaveVehicle(direction) {
          if (!CycloneMovement.autoLeaveVehicles) {
            return false;
          }

          if (tryToLeaveVehicleDelay > 0) {
            tryToLeaveVehicleDelay--;
            return false;
          }

          if (!this.isInBoat() && !this.isInShip()) {
            return false;
          }

          return this.getOffVehicle(direction);
        }
      }, {
        key: "tryToAvoid",
        value: function tryToAvoid(direction, maxOffset, diagonalDirection) {
          if (!CycloneMovement.params.sidestepEvents) {
            if (this._blockingReason === 'characters') {
              return false;
            }
          }

          if (direction === 4 || direction === 6) {
            if (this.tryToAvoidVertically(direction, maxOffset, diagonalDirection)) {
              return true;
            }
          }

          if (direction === 2 || direction === 8) {
            if (this.tryToAvoidHorizontally(direction, maxOffset, diagonalDirection)) {
              return true;
            }
          }

          return false;
        }
      }, {
        key: "tryToAvoidDirection",
        value: function tryToAvoidDirection(xOffset, yOffset, movementDirection, faceDirection) {
          if (this.canPass(this._x + xOffset, this._y + yOffset, faceDirection)) {
            this.executeMove(movementDirection);
            this.setDirection(faceDirection);
            return true;
          }

          return false;
        }
      }, {
        key: "tryToAvoidVertically",
        value: function tryToAvoidVertically(direction, maxOffset, diagonalDirection) {
          var previousOffset = 0;
          var offset = CycloneMovement.stepSize;
          var downEnabled = !CycloneMovement.goesUp(diagonalDirection);
          var upEnabled = !CycloneMovement.goesDown(diagonalDirection);

          while (offset <= maxOffset) {
            if (downEnabled) {
              if (!this.canPass(this._x, this._y + previousOffset, 2)) {
                downEnabled = false;
              }
            }

            if (upEnabled) {
              if (!this.canPass(this._x, this._y - previousOffset, 8)) {
                upEnabled = false;
              }
            }

            if (downEnabled && this.tryToAvoidDirection(0, offset, 2, direction)) {
              return true;
            }

            if (upEnabled && this.tryToAvoidDirection(0, -offset, 8, direction)) {
              return true;
            }

            previousOffset = offset;
            offset += CycloneMovement.stepSize;
          }
        }
      }, {
        key: "tryToAvoidHorizontally",
        value: function tryToAvoidHorizontally(direction, maxOffset, diagonalDirection) {
          var previousOffset = 0;
          var offset = CycloneMovement.stepSize;
          var leftEnabled = !CycloneMovement.goesRight(diagonalDirection);
          var rightEnabled = !CycloneMovement.goesLeft(diagonalDirection);

          while (offset <= maxOffset) {
            if (leftEnabled) {
              if (!this.canPass(this._x - previousOffset, 4)) {
                leftEnabled = false;
              }
            }

            if (rightEnabled) {
              if (!this.canPass(this._x + previousOffset, 6)) {
                rightEnabled = false;
              }
            }

            if (rightEnabled && this.tryToAvoidDirection(offset, 0, 6, direction)) {
              return true;
            }

            if (leftEnabled && this.tryToAvoidDirection(-offset, 0, 4, direction)) {
              return true;
            }

            previousOffset = offset;
            offset += CycloneMovement.stepSize;
          }

          return false;
        }
      }, {
        key: "executeMove",
        value: function executeMove(direction) {
          switch (direction) {
            case 8:
            case 2:
            case 4:
            case 6:
              this.moveStraight(direction);
              break;

            case 7:
              this.moveDiagonally(4, 8);
              break;

            case 9:
              this.moveDiagonally(6, 8);
              break;

            case 1:
              this.moveDiagonally(4, 2);
              break;

            case 3:
              this.moveDiagonally(6, 2);
              break;
          }
        }
      }, {
        key: "updateDashing",
        value: function updateDashing() {
          this.updateIsMoving();
          $super.updateDashing.call(this);
        }
      }, {
        key: "moveStraight",
        value: function moveStraight(d) {
          if (this.isMovementSucceeded()) {
            this._followers.updateMove();
          }

          this._moveStraight(d);
        }
      }, {
        key: "moveDiagonally",
        value: function moveDiagonally(horz, vert) {
          if (this.isMovementSucceeded()) {
            this._followers.updateMove();
          }

          this._moveDiagonally(horz, vert);
        }
      }, {
        key: "checkEventTriggerThere",
        value: function checkEventTriggerThere(triggers) {
          if (!this.canStartLocalEvents()) {
            return;
          }

          var direction = this.direction();
          var x1 = this.left;
          var y1 = this.top;
          var x2 = CycloneMovement.roundXWithDirection(x1, direction);
          var y2 = CycloneMovement.roundYWithDirection(y1, direction);
          this.startMapEvent(x2, y2, triggers, true);

          if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            this.startMapEvent(x3, y3, triggers, true);
          }
        }
      }, {
        key: "shouldTriggerEvent",
        value: function shouldTriggerEvent(event, triggers, normal) {
          if (!event) {
            return false;
          }

          if (!event.isTriggerIn(triggers)) {
            return false;
          }

          if (event.isNormalPriority() !== normal) {
            return false;
          }

          if (!event.hasAnythingToRun()) {
            return false;
          }

          return true;
        }
      }, {
        key: "startMapTileEvent",
        value: function startMapTileEvent(tileX, tileY, triggers, normal) {
          if (!CycloneMovement.triggerAllEvents && $gameMap.isEventRunning()) {
            return;
          }

          var anyStarted = false;
          var events = $gameMap.eventsXy(tileX, tileY);

          var _iterator7 = _createForOfIteratorHelper(events),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var event = _step7.value;

              if (!this.shouldTriggerEvent(event, triggers, normal)) {
                continue;
              }

              event.start();
              anyStarted = true;

              if (!CycloneMovement.triggerAllEvents) {
                return true;
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }

          return anyStarted;
        }
      }, {
        key: "checkEventTriggerHere",
        value: function checkEventTriggerHere(triggers) {
          if (!this.canStartLocalEvents()) {
            return;
          } // Remove "Player Touch" and "Event Touch" from possible trigers


          var newTriggers = [];

          var _iterator8 = _createForOfIteratorHelper(triggers),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _t9 = _step8.value;

              if (_t9 !== 1 && _t9 !== 2) {
                newTriggers.push(_t9);
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }

          if (newTriggers.length) {
            this.startMapEvent(this.left, this.top, newTriggers, false);
          }
        }
      }, {
        key: "startMapEvent",
        value: function startMapEvent(x, y, triggers, normal) {
          if ($gameMap.isEventRunning()) {
            return;
          }

          var left = x;
          var right = x + this.width;
          var top = y;
          var bottom = y + this.height;
          var firstX = Math.floor(left);
          var lastX = CycloneMovement.isRoundNumber(right) ? right - 1 : Math.floor(right);
          var firstY = Math.floor(top);
          var lastY = CycloneMovement.isRoundNumber(bottom) ? bottom - 1 : Math.floor(bottom);

          for (var newX = firstX; newX <= lastX; newX++) {
            for (var newY = firstY; newY <= lastY; newY++) {
              if (this.startMapTileEvent(newX, newY, triggers, normal) === true) {
                return true;
              }
            }
          }

          return false;
        }
      }, {
        key: "isOnDamageFloor",
        value: function isOnDamageFloor() {
          if (this.isInAirship()) {
            return false;
          }

          if (this._newMaxX < 0 || this._newMaxY < 0) {
            return false;
          }

          for (var x = this._newMinX; x <= this._newMaxX; x++) {
            for (var y = this._newMinY; y <= this._newMaxY; y++) {
              if ($gameMap.isDamageFloor(x, y)) {
                return true;
              }
            }
          }

          return false;
        }
      }, {
        key: "encounterProgressValue",
        value: function encounterProgressValue() {
          var old = $super.encounterProgressValue.call(this);
          return old / CycloneMovement.stepCount;
        }
      }, {
        key: "updateNonmoving",
        value: function updateNonmoving(wasMoving, sceneActive) {
          try {
            if ($gameMap.isEventRunning()) {
              return;
            }

            var enteredNewTile = this._newMaxX >= 0 && this._newMaxY >= 0;

            if (enteredNewTile) {
              $gameParty.onPlayerWalk();
            }

            if (enteredNewTile) {
              for (var x = this._newMinX; x <= this._newMaxX; x++) {
                for (var y = this._newMinY; y <= this._newMaxY; y++) {
                  this.startMapEvent(x, y, [1, 2], false);

                  if ($gameMap.setupStartingEvent()) {
                    return;
                  }
                }
              }
            }

            if (sceneActive && this.triggerAction()) {
              return;
            }

            if (wasMoving) {
              this.updateEncounterCount();
            } else {
              $gameTemp.clearDestination();
            }

            if (wasMoving || Input.dir4 !== 0) {
              this.checkEventTriggerThere([1, 2]);
              $gameMap.setupStartingEvent();
            }
          } finally {
            this._newMinX = Infinity;
            this._newMinY = Infinity;
            this._newMaxX = -Infinity;
            this._newMaxY = -Infinity;
          }
        }
      }, {
        key: "updateMove",
        value: function updateMove() {
          var _this5 = this;

          this.iterateNewTiles(function (x, y) {
            var _this5$_newMinX, _this5$_newMinY, _this5$_newMaxX, _this5$_newMaxY;

            _this5._newMinX = Math.min(x, (_this5$_newMinX = _this5._newMinX) !== null && _this5$_newMinX !== void 0 ? _this5$_newMinX : -Infinity);
            _this5._newMinY = Math.min(y, (_this5$_newMinY = _this5._newMinY) !== null && _this5$_newMinY !== void 0 ? _this5$_newMinY : -Infinity);
            _this5._newMaxX = Math.max(x, (_this5$_newMaxX = _this5._newMaxX) !== null && _this5$_newMaxX !== void 0 ? _this5$_newMaxX : Infinity);
            _this5._newMaxY = Math.max(y, (_this5$_newMaxY = _this5._newMaxY) !== null && _this5$_newMaxY !== void 0 ? _this5$_newMaxY : Infinity);
          });
          $super.updateMove.call(this);
        }
      }, {
        key: "_isSamePos",
        value: function _isSamePos(x1, y1, destX, destY) {
          if (Math.floor(x1) !== destX && Math.ceil(x1) !== destX) {
            return false;
          }

          if (Math.floor(y1) !== destY && Math.ceil(y1) !== destY) {
            return false;
          }

          return true;
        }
      }, {
        key: "triggerTouchAction",
        value: function triggerTouchAction() {
          if (!$gameTemp.isDestinationValid()) {
            return false;
          }

          var direction = this.direction();
          var x1 = this.x;
          var y1 = this.y;
          var destX = $gameTemp.destinationX();
          var destY = $gameTemp.destinationY();

          if (this._isSamePos(x1, y1, destX, destY)) {
            var result = this.triggerTouchActionD1(x1, y1);

            if (result) {
              return result;
            }
          }

          var x2 = CycloneMovement.roundXWithDirection(x1, direction);
          var y2 = CycloneMovement.roundYWithDirection(y1, direction);

          if (this._isSamePos(x2, y2, destX, destY)) {
            var _result = this.triggerTouchActionD2(x2, y2);

            if (_result) {
              return _result;
            }
          }

          var x3 = CycloneMovement.roundXWithDirection(x2, direction);
          var y3 = CycloneMovement.roundYWithDirection(y2, direction);

          if (this._isSamePos(x3, y3, destX, destY)) {
            return this.triggerTouchActionD3(x3, y3);
          }

          return false;
        }
      }, {
        key: "isTouchingAirship",
        value: function isTouchingAirship() {
          var airship = $gameMap.airship();

          if (!airship) {
            return false;
          }

          return this.isTouchingCharacter(airship);
        }
      }, {
        key: "isFacingVehicle",
        value: function isFacingVehicle(vehicle) {
          if (!vehicle) {
            return false;
          }

          var x = this.x,
              y = this.y;

          switch (this._direction) {
            case 2:
              y++;
              break;

            case 4:
              x--;
              break;

            case 6:
              x++;
              break;

            case 8:
              y--;
              break;
          }

          return this.wouldTouchCharacterAt(vehicle, x, y);
        }
      }, {
        key: "getOnVehicle",
        value: function getOnVehicle() {
          if (this.isTouchingAirship()) {
            this._vehicleType = 'airship';
          } else if (this.isFacingVehicle($gameMap.ship())) {
            this._vehicleType = 'ship';
          } else if (this.isFacingVehicle($gameMap.boat())) {
            this._vehicleType = 'boat';
          }

          if (this.isInAnyVehicle()) {
            this._vehicleGettingOn = true;

            if (!this.isInAirship()) {
              var vehicle = this.vehicle();

              if (vehicle) {
                this._x = vehicle._x;
                this._y = vehicle._y;
                this.updateAnimationCount();
              }
            }

            this.gatherFollowers();
          }

          return this._vehicleGettingOn;
        }
      }, {
        key: "checkDistanceToLand",
        value: function checkDistanceToLand(direction, targetX, targetY) {
          switch (direction) {
            case 2:
              if (Math.abs(targetY - this.bottom) > 0.5) {
                return false;
              }

              break;

            case 4:
              if (Math.abs(targetX - this.left) > 1) {
                return false;
              }

              break;

            case 6:
              if (Math.abs(targetX - this.right) > 0.5) {
                return false;
              }

              break;

            case 8:
              if (Math.abs(targetY - this.top) > 1) {
                return false;
              }

              break;
          }

          return true;
        }
      }, {
        key: "isValidLandingPosition",
        value: function isValidLandingPosition(vehicle, x, y, d) {
          if (!this.canLandOn(x, y, d)) {
            return false;
          }

          if (this.isCollidedWithCharacters(x, y)) {
            return false;
          }

          if (!vehicle.isLandOk(x, y, d)) {
            return false;
          }

          return true;
        }
      }, {
        key: "getLandingXOffset",
        value: function getLandingXOffset(vehicle, x, y, direction) {
          var maxOffset = this.isInAirship() ? Math.ceil(CycloneMovement.stepCount / 2) : CycloneMovement.stepCount;

          for (var i = 1; i < maxOffset; i++) {
            var offset = CycloneMovement.stepSize * i;

            if (this.isValidLandingPosition(vehicle, x - offset, y, direction)) {
              return -offset;
            }

            if (this.isValidLandingPosition(vehicle, x + offset, y, direction)) {
              return offset;
            }
          }

          return 0;
        }
      }, {
        key: "getLandingYOffset",
        value: function getLandingYOffset(vehicle, x, y, direction) {
          var maxOffset = this.isInAirship() ? Math.ceil(CycloneMovement.stepCount / 2) : CycloneMovement.stepCount;

          for (var i = 1; i < maxOffset; i++) {
            var offset = CycloneMovement.stepSize * i;

            if (this.isValidLandingPosition(vehicle, x, y - offset, direction)) {
              return -offset;
            }

            if (this.isValidLandingPosition(vehicle, x, y + offset, direction)) {
              return offset;
            }
          }

          return 0;
        }
      }, {
        key: "getBestLandingPosition",
        value: function getBestLandingPosition(vehicle, direction) {
          var x;
          var y;
          var vehicleX = this.x;
          var vehicleY = this.y;
          var _CycloneMovement3 = CycloneMovement,
              stepCount = _CycloneMovement3.stepCount;

          if (this.isInAirship()) {
            x = Math.round(this.x * stepCount) / stepCount;
            y = Math.round(this.y * stepCount) / stepCount;
          } else {
            switch (direction) {
              case 2:
                x = Math.round(this.x * stepCount) / stepCount;
                y = Math.ceil((this.y + this.hitboxY + this.height) * stepCount) / stepCount;
                break;

              case 4:
                x = Math.floor((this.x - this.defaultHitboxX - this.defaultWidth) * stepCount) / stepCount;
                y = Math.round(this.y * stepCount) / stepCount;
                break;

              case 6:
                x = Math.ceil((this.x + this.hitboxX + this.width) * stepCount) / stepCount;
                y = Math.round(this.y * stepCount) / stepCount;
                break;

              case 8:
                x = Math.round(this.x * stepCount) / stepCount;
                y = Math.floor((this.y - this.defaultHitboxY - this.defaultHeight) * stepCount) / stepCount;
                break;
            }
          }

          if (this.isValidLandingPosition(vehicle, x, y, direction)) {
            return {
              x: x,
              y: y,
              vehicleX: vehicleX,
              vehicleY: vehicleY
            };
          }

          if (CycloneMovement.isVertical(direction) || this.isInAirship()) {
            var xOffset = this.getLandingXOffset(vehicle, x, y, direction);

            if (xOffset !== 0) {
              return {
                x: x + xOffset,
                y: y,
                vehicleX: vehicleX + xOffset,
                vehicleY: vehicleY
              };
            }

            if (!this.isInAirship()) {
              return false;
            }
          }

          var yOffset = this.getLandingYOffset(vehicle, x, y, direction);

          if (yOffset !== 0) {
            return {
              x: x,
              y: y + yOffset,
              vehicleX: vehicleX,
              vehicleY: vehicleY + yOffset
            };
          }

          return false;
        }
      }, {
        key: "getOffVehicle",
        value: function getOffVehicle() {
          var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
          direction = direction || this.direction();
          var vehicle = this.vehicle();

          if (!vehicle) {
            return this._vehicleGettingOff;
          }

          var target = this.getBestLandingPosition(vehicle, direction);

          if (!target) {
            return this._vehicleGettingOff;
          }

          if (this.isInAirship()) {
            this.setDirection(2);
          }

          this._followers.synchronize(this.x, this.y, direction);

          vehicle.getOff();
          var oldVehicleY = vehicle._y;
          var oldVehicleX = vehicle._x;
          vehicle._x = target.vehicleX;
          vehicle._y = target.vehicleY;
          this._x = target.x;
          this._y = target.y;
          this._positionHistory = [];

          if (!this.isInAirship()) {
            if (oldVehicleX < target.vehicleX) {
              vehicle.setDirection(6);
            } else if (oldVehicleX > target.vehicleX) {
              vehicle.setDirection(4);
            } else if (oldVehicleY < target.vehicleY) {
              vehicle.setDirection(2);
            } else if (oldVehicleY > target.vehicleY) {
              vehicle.setDirection(8);
            }

            this.updateAnimationCount();
            this.setTransparent(false);
          }

          this._vehicleGettingOff = true;
          this.setMoveSpeed(4);
          this.setThrough(false);
          this.makeEncounterCount();
          this.gatherFollowers();
        } // Stop airship from setting the movement as through

      }, {
        key: "updateVehicleGetOn",
        value: function updateVehicleGetOn() {
          var oldThrough = this._through;
          $super.updateVehicleGetOn.call(this);
          this._through = oldThrough;
        }
      }, {
        key: "isThrough",
        value: function isThrough() {
          if (!this._ignoreVehicle && this.isInAirship()) {
            return true;
          }

          return $super.isThrough.call(this);
        }
      }, {
        key: "isPositionPassable",
        value: function isPositionPassable(x, y, d) {
          var vehicle = this.vehicle();

          if (vehicle && !this._ignoreVehicle) {
            return vehicle.checkPassage(Math.floor(x), Math.floor(y));
          }

          return $super.isPositionPassable.call(this, x, y, d);
        }
      }, {
        key: "shouldSkipExtraPassabilityTests",
        value: function shouldSkipExtraPassabilityTests() {
          var vehicle = this.vehicle();

          if (vehicle && !this._ignoreVehicle) {
            return true;
          }

          return false;
        }
      }, {
        key: "isInVehicle",
        value: function isInVehicle() {
          if (this._ignoreVehicle) {
            return false;
          }

          return $super.isInVehicle.call(this);
        } // Check if there's enough room for the player on that position

      }, {
        key: "canLandOn",
        value: function canLandOn(x, y, direction) {
          this._ignoreVehicle = true;
          this.updateHitbox();

          try {
            if (this.canPass(x, y, 2)) {
              return true;
            }

            if (this.canPass(x, y, 4)) {
              return true;
            }

            if (this.canPass(x, y, 6)) {
              return true;
            }

            if (this.canPass(x, y, 8)) {
              return true;
            }

            return false;
          } finally {
            this._ignoreVehicle = false;
            this.updateHitbox();
          }
        }
      }, {
        key: "determineDirectionToDestination",
        value: function determineDirectionToDestination() {
          var x = $gameTemp.destinationX();
          var y = $gameTemp.destinationY();
          return this.findDirectionTo(x, y);
        }
      }, {
        key: "searchLimit",
        value: function searchLimit() {
          var limit = $super.searchLimit.call(this);

          if (TouchInput.isLongPressed()) {
            return Math.floor(limit / CycloneMovement.stepCount);
          }

          return limit;
        }
      }, {
        key: "defaultWidth",
        get: function get() {
          return this._defaultWidth;
        }
      }, {
        key: "defaultHeight",
        get: function get() {
          return this._defaultHeight;
        }
      }, {
        key: "defaultHitboxX",
        get: function get() {
          return this._defaultHitboxX;
        }
      }, {
        key: "defaultHitboxY",
        get: function get() {
          return this._defaultHitboxY;
        }
      }]);

      return _class7;
    }();
  });
  CycloneMovement.patchClass(Game_Follower, function ($super) {
    return /*#__PURE__*/function () {
      function _class8() {
        _classCallCheck(this, _class8);
      }

      _createClass(_class8, [{
        key: "getWidth",
        value: function getWidth() {
          return 0.75;
        }
      }, {
        key: "getHeight",
        value: function getHeight() {
          return 0.375;
        }
      }, {
        key: "getHitboxX",
        value: function getHitboxX() {
          return 0.125;
        }
      }, {
        key: "getHibtoxY",
        value: function getHibtoxY() {
          return 0.5;
        }
      }, {
        key: "chaseCharacter",
        value: function chaseCharacter(character) {
          if (this.isMoving()) {
            return;
          }

          var position = character.getPositionToFollow();

          if (!position) {
            return;
          }

          var x = position.x,
              y = position.y;
          this.chasePosition(x, y);
        }
      }]);

      return _class8;
    }();
  });
  CycloneMovement.patchClass(Game_Vehicle, function ($super) {
    return /*#__PURE__*/function () {
      function _class9() {
        _classCallCheck(this, _class9);
      }

      _createClass(_class9, [{
        key: "checkPassage",
        value: function checkPassage(x, y) {
          if (this.isBoat()) {
            return $gameMap.isBoatPassable(x, y);
          }

          if (this.isShip()) {
            return $gameMap.isShipPassable(x, y);
          }

          return this.isAirship();
        }
      }, {
        key: "shouldPassThrough",
        value: function shouldPassThrough() {
          if (this.isAirship()) {
            return true;
          }

          return $super.shouldPassThrough.call(this);
        }
      }, {
        key: "isAirshipLandOk",
        value: function isAirshipLandOk(x, y) {
          if (!$gamePlayer.canLandOn(x, y)) {
            return false;
          }

          var floorX = Math.floor(x);
          var floorY = Math.floor(y);

          if (!$gameMap.isAirshipLandOk(floorX, floorY)) {
            return false;
          }

          if ($gameMap.eventsXy(floorX, floorY).length > 0) {
            return false;
          }

          return true;
        }
      }, {
        key: "isLandOk",
        value: function isLandOk(x, y, d) {
          if (this.isAirship()) {
            return this.isAirshipLandOk(x, y);
          }

          return true;
        }
      }, {
        key: "getOff",
        value: function getOff() {
          this._driving = false;
          this.setWalkAnime(false);
          this.setStepAnime(false);
          $gameSystem.replayWalkingBgm();
        }
      }]);

      return _class9;
    }();
  });

  function buildEventPageMetadata(page) {
    page.meta = page.meta || {};
    var rgx = /<([^<>:]+)(:?)([^>]*)>/g;

    var _iterator9 = _createForOfIteratorHelper(page.list),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var command = _step9.value;

        if (!(command === null || command === void 0 ? void 0 : command.code) || command.code !== 108 && command.code !== 408) {
          continue;
        }

        var comment = command.parameters[0];

        while (true) {
          var match = rgx.exec(comment);

          if (match) {
            if (match[2] === ':') {
              page.meta[match[1]] = match[3];
            } else {
              page.meta[match[1]] = true;
            }
          } else {
            break;
          }
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    return page.meta;
  }

  var uselessCommands = Object.freeze([// comments
  108, 408, // label
  118, // end of list
  0]);
  CycloneMovement.patchClass(Game_Event, function ($super) {
    return /*#__PURE__*/function () {
      function _class10() {
        _classCallCheck(this, _class10);
      }

      _createClass(_class10, [{
        key: "refresh",
        value: function refresh() {
          $super.refresh.call(this);
          this._defaultWidth = 1;
          this._defaultHeight = 1;
          this._defaultHitboxX = 0;
          this._defaultHitboxY = 0;
          var page = this.page();

          if (!page) {
            return;
          }

          buildEventPageMetadata(page);
          this._defaultWidth = this.getHitboxValue(page.meta, 'hitboxWidth', this._defaultWidth, $gameMap.tileWidth());
          this._defaultHeight = this.getHitboxValue(page.meta, 'hitboxHeight', this._defaultHeight, $gameMap.tileHeight());
          this._defaultHitboxX = this.getHitboxValue(page.meta, 'hitboxX', this._defaultHitboxX, $gameMap.tileWidth());
          this._defaultHitboxY = this.getHitboxValue(page.meta, 'hitboxY', this._defaultHitboxY, $gameMap.tileHeight());
        }
      }, {
        key: "getWidth",
        value: function getWidth() {
          return this.defaultWidth;
        }
      }, {
        key: "getHeight",
        value: function getHeight() {
          return this.defaultHeight;
        }
      }, {
        key: "getHitboxX",
        value: function getHitboxX() {
          return this.defaultHitboxX;
        }
      }, {
        key: "getHitboxY",
        value: function getHitboxY() {
          return this.defaultHitboxY;
        }
      }, {
        key: "getHitboxValue",
        value: function getHitboxValue(meta, tagName, defaultValue, tileSize) {
          if (meta[tagName] && meta[tagName] !== '0') {
            return Math.floor(parseInt(meta[tagName]) / tileSize * 8) / 8;
          }

          if (meta[tagName] === '0' || meta[tagName] === 0) {
            return 0;
          }

          return defaultValue;
        }
      }, {
        key: "turnTowardPlayer",
        value: function turnTowardPlayer() {
          var sx = this.deltaXFrom($gamePlayer.x);
          var sy = this.deltaYFrom($gamePlayer.y);
          var asx = Math.abs(sx);
          var asy = Math.abs(sy);

          if (asx < 1 && asy < 1) {
            this.setDirection(10 - $gamePlayer._direction);
            return;
          }

          if (asx > asy) {
            this.setDirection(sx > 0 ? 4 : 6);
            return;
          }

          if (sy !== 0) {
            this.setDirection(sy > 0 ? 8 : 2);
          }
        }
      }, {
        key: "turnAwayFromPlayer",
        value: function turnAwayFromPlayer() {
          var sx = this.deltaXFrom($gamePlayer.x);
          var sy = this.deltaYFrom($gamePlayer.y);
          var asx = Math.abs(sx);
          var asy = Math.abs(sy);

          if (asx < 1 && asy < 1) {
            this.setDirection($gamePlayer._direction);
            return;
          }

          if (asx > asy) {
            this.setDirection(sx > 0 ? 6 : 4);
            return;
          }

          if (sy !== 0) {
            this.setDirection(sy > 0 ? 2 : 8);
          }
        }
      }, {
        key: "hasAnythingToRun",
        value: function hasAnythingToRun() {
          if (!CycloneMovement.ignoreEmptyEvents) {
            return true;
          }

          var _iterator10 = _createForOfIteratorHelper(this.list()),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var command = _step10.value;

              if (uselessCommands.includes(Number(command.code))) {
                continue;
              }

              return true;
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          return false;
        }
      }, {
        key: "moveStraight",
        value: function moveStraight(d) {
          this._lastMove = d;
          return $super.moveStraight.call(this, d);
        }
      }, {
        key: "moveDiagonally",
        value: function moveDiagonally(horz, vert) {
          this._lastMove = {
            horz: horz,
            vert: vert
          };
          return $super.moveDiagonally.call(this, horz, vert);
        }
      }, {
        key: "repeatMovement",
        value: function repeatMovement() {
          if (!this._repeatMovementCount) {
            return false;
          }

          this._repeatMovementCount--;

          if (!this._lastMove) {
            return true;
          }

          if (typeof this._lastMove === 'number') {
            this.moveStraight(this._lastMove);
            return true;
          }

          if (_typeof(this._lastMove) === 'object') {
            this.moveDiagonally(this._lastMove.horz, this._lastMove.vert);
            return true;
          }

          return true;
        }
      }, {
        key: "runMoveType",
        value: function runMoveType(fn) {
          if (this.repeatMovement()) {
            return;
          }

          this._lastMove = 0;
          fn.call(this);

          if (!CycloneMovement.params.applyToEvents || CycloneMovement.params.stepCount === 1) {
            return;
          }

          if (!this._lastMove) {
            return;
          }

          this._repeatMovementCount = Math.max(CycloneMovement.params.stepCount - 1, 0);
        }
      }, {
        key: "moveTypeRandom",
        value: function moveTypeRandom() {
          return this.runMoveType($super.moveTypeRandom);
        }
      }, {
        key: "moveTypeTowardPlayer",
        value: function moveTypeTowardPlayer() {
          return this.runMoveType($super.moveTypeTowardPlayer);
        }
      }, {
        key: "repeatCommand",
        value: function repeatCommand() {
          if (!this._repeatCommandCount) {
            return false;
          }

          if (!this._lastCommand) {
            return false;
          }

          this.setMovementSuccess(true);
          this.processMoveCommand(this._lastCommand);

          var _ref11 = this._moveRoute || {
            skippable: true
          },
              skippable = _ref11.skippable;

          if (this.isMovementSucceeded() || skippable) {
            this._repeatCommandCount--;
          }

          return true;
        }
      }, {
        key: "updateRoutineMove",
        value: function updateRoutineMove() {
          if (!CycloneMovement.params.applyToEvents || CycloneMovement.params.stepCount === 1) {
            return $super.updateRoutineMove.call(this);
          }

          if (this.repeatCommand()) {
            if (!this._repeatCommandCount) {
              this.advanceMoveRouteIndex();
            }

            return;
          }

          if (this._waitCount > 0) {
            this._waitCount--;
            return;
          }

          this.setMovementSuccess(true);
          var command = this._moveRoute.list[this._moveRouteIndex];

          if (!command) {
            return;
          }

          this._lastCommand = command;
          this._repeatCommandCount = 0;
          this.processMoveCommand(command);

          if (command.code > 0 && command.code <= 13 && this.isMovementSucceeded()) {
            this._repeatCommandCount = Math.max(CycloneMovement.params.stepCount - 1, 0);
          }

          if (!this._repeatCommandCount) {
            this.advanceMoveRouteIndex();
          }
        }
      }, {
        key: "defaultWidth",
        get: function get() {
          return this._defaultWidth;
        }
      }, {
        key: "defaultHeight",
        get: function get() {
          return this._defaultHeight;
        }
      }, {
        key: "defaultHitboxX",
        get: function get() {
          return this._defaultHitboxX;
        }
      }, {
        key: "defaultHitboxY",
        get: function get() {
          return this._defaultHitboxY;
        }
      }]);

      return _class10;
    }();
  });
  var timeout;
  var latestX;
  var latestY;
  var needsCalling = false;
  CycloneMovement.patchClass(Game_Temp, function ($super) {
    return /*#__PURE__*/function () {
      function _class11() {
        _classCallCheck(this, _class11);
      }

      _createClass(_class11, [{
        key: "_setDestination",
        value: function _setDestination(x, y) {
          var _this6 = this;

          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(function () {
            timeout = false;

            if (needsCalling) {
              _this6._setDestination(latestX, latestY);
            }
          }, 50 * CycloneMovement.stepCount);
          $super.setDestination.call(this, x, y);
          needsCalling = false;
          latestX = x;
          latestY = y;
        }
      }, {
        key: "setDestination",
        value: function setDestination(x, y) {
          if (!TouchInput.isLongPressed()) {
            return this._setDestination(x, y);
          }

          if (!timeout) {
            return this._setDestination(x, y);
          }

          var delta = $gameMap.distance(x, y, latestX, latestY);

          if (delta > 3) {
            return this._setDestination(x, y);
          }

          latestX = x;
          latestY = y;
          needsCalling = true;
        }
      }, {
        key: "clearDestination",
        value: function clearDestination() {
          var _$super$clearDestinat;

          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          (_$super$clearDestinat = $super.clearDestination).call.apply(_$super$clearDestinat, [this].concat(args));

          needsCalling = false;
          latestX = undefined;
          latestY = undefined;

          if (timeout) {
            clearTimeout(timeout);
            timeout = false;
          }
        }
      }]);

      return _class11;
    }();
  });
  CycloneMovement.patchClass(Game_Party, function ($super) {
    return /*#__PURE__*/function () {
      function _class12() {
        _classCallCheck(this, _class12);
      }

      _createClass(_class12, [{
        key: "steps",
        value: function steps() {
          return Math.floor(this._steps);
        }
      }, {
        key: "increaseSteps",
        value: function increaseSteps() {
          this._steps += CycloneMovement.stepSize;
        }
      }]);

      return _class12;
    }();
  });
  CycloneMovement.patchClass(Scene_Map, function ($super) {
    return /*#__PURE__*/function () {
      function _class13() {
        _classCallCheck(this, _class13);
      }

      _createClass(_class13, [{
        key: "onMapTouch",
        value: function onMapTouch() {
          var _$super$onMapTouch;

          if (CycloneMovement.disableMouseMovement) {
            return;
          }

          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          (_$super$onMapTouch = $super.onMapTouch).call.apply(_$super$onMapTouch, [this].concat(args));
        }
      }]);

      return _class13;
    }();
  });
  CycloneMovement.patchClass(DataManager, function ($super) {
    return /*#__PURE__*/function () {
      function _class14() {
        _classCallCheck(this, _class14);
      }

      _createClass(_class14, null, [{
        key: "onLoad",
        value: function onLoad(object) {
          $super.onLoad.call(this, object);

          if (this.isMapObject(object)) {
            CycloneMovement.setupCollision();
          }
        }
      }]);

      return _class14;
    }();
  });
  CycloneMovement.patchClass(Game_Temp, function ($super) {
    return /*#__PURE__*/function () {
      function _class15() {
        _classCallCheck(this, _class15);
      }

      _createClass(_class15, [{
        key: "setDestination",
        value: function setDestination() {
          var _$super$setDestinatio;

          if (CycloneMovement.disableMouseMovement) {
            return;
          }

          for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }

          (_$super$setDestinatio = $super.setDestination).call.apply(_$super$setDestinatio, [this].concat(args));
        }
      }]);

      return _class15;
    }();
  });
})();
