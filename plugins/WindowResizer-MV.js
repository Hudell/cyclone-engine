function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * @plugindesc
 * <pluginName:WindowResizer>
 * @author Hudell
 *
 * @help
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 */
(function () {
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

  var WindowEffects = /*#__PURE__*/function (_Window_Base) {
    _inherits(WindowEffects, _Window_Base);

    var _super = _createSuper(WindowEffects);

    function WindowEffects() {
      _classCallCheck(this, WindowEffects);

      return _super.apply(this, arguments);
    }

    _createClass(WindowEffects, [{
      key: "update",
      value: function update() {
        _get(_getPrototypeOf(WindowEffects.prototype), "update", this).call(this, this);

        if (this.visible) {
          this.refresh();
        }
      }
    }, {
      key: "itemPadding",
      value: function itemPadding() {
        return 0;
      }
    }, {
      key: "updatePadding",
      value: function updatePadding() {
        this.padding = 0;
      }
    }, {
      key: "updateBackOpacity",
      value: function updateBackOpacity() {
        this.backOpacity = 255;
      }
    }, {
      key: "_refreshFrame",
      value: function _refreshFrame() {}
    }, {
      key: "clearBackContents",
      value: function clearBackContents() {
        this.contentsBack.clear();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (this.contents) {
          this.contents.clear();
          this.clearBackContents();
          this.drawContent();
        }
      }
    }, {
      key: "getSceneWindows",
      value: function getSceneWindows() {
        var parentScene = this.parent;

        if (!parentScene.findAllWindows) {
          return;
        }

        return parentScene.findAllWindows();
      }
    }, {
      key: "getVisibleWindows",
      value: function getVisibleWindows() {
        var windows = this.getSceneWindows();
        return windows.filter(function (win) {
          return win.visible;
        });
      }
    }, {
      key: "drawContent",
      value: function drawContent() {
        var win = this.getActiveWindow();

        if (!win) {
          return;
        }

        this.drawWindowBorder(win);
      }
    }, {
      key: "drawWindowBorder",
      value: function drawWindowBorder(win) {
        var color = '#00FF0066';

        if (!win.visible) {
          color = '#FF000033';
        }

        var parent = win.parent;
        var offsetX = 0;
        var offsetY = 0;

        while (parent && parent !== SceneManager._scene) {
          offsetX += parent.x;
          offsetY += parent.y;
          parent = parent.parent;
        }

        var x = win.x,
            y = win.y,
            width = win.width,
            height = win.height;
        var drawX = x + offsetX;
        var drawY = y + offsetY;
        var drawWidth = width;
        var drawHeight = height;

        switch (document.body.style.cursor) {
          case 'n-resize':
            drawY += this._movedY;
            drawHeight -= this._movedY;
            break;

          case 's-resize':
            drawHeight += this._movedY;
            break;

          case 'w-resize':
            drawX += this._movedX;
            drawWidth -= this._movedX;
            break;

          case 'e-resize':
            drawWidth += this._movedX;
            break;

          case 'nw-resize':
            drawY += this._movedY;
            drawHeight -= this._movedY;
            drawX += this._movedX;
            drawWidth -= this._movedX;
            break;

          case 'sw-resize':
            drawHeight += this._movedY;
            drawX += this._movedX;
            drawWidth -= this._movedX;
            break;

          case 'ne-resize':
            drawY += this._movedY;
            drawHeight -= this._movedY;
            drawWidth += this._movedX;
            break;

          case 'se-resize':
            drawHeight += this._movedY;
            drawWidth += this._movedX;
            break;

          case 'move':
            drawX += this._movedX;
            drawY += this._movedY;
            break;
        }

        if (win._lastSnap) {
          this.contents.blt(win._lastSnap, 0, 0, win._lastSnap.width, win._lastSnap.height, drawX + win.padding, drawY + win.padding, win._lastSnap.width, win._lastSnap.height);
        }

        this.contents.fillRect(drawX, drawY, drawWidth, 4, color);
        this.contents.fillRect(drawX, drawY + drawHeight - 4, drawWidth, 4, color);
        this.contents.fillRect(drawX, drawY, 4, drawHeight, color);
        this.contents.fillRect(drawX + drawWidth - 4, drawY, 4, drawHeight, color);
      }
    }, {
      key: "show",
      value: function show() {
        var windows = this.getSceneWindows();

        var _iterator = _createForOfIteratorHelper(windows),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var win = _step.value;
            win._lastSnap = new Bitmap(win.width, win.height);

            if (win.visible) {
              win._lastSnap.blt(win.contents, 0, 0, win.contents.width, win.contents.height, 0, 0);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _get(_getPrototypeOf(WindowEffects.prototype), "show", this).call(this);
      }
    }, {
      key: "getWindowRealX",
      value: function getWindowRealX(win) {
        var x = win.x;
        var parent = win.parent;

        while (parent && parent !== SceneManager._scene) {
          x += parent.x;
          parent = parent.parent;
        }

        return x;
      }
    }, {
      key: "getWindowRealY",
      value: function getWindowRealY(win) {
        var y = win.y;
        var parent = win.parent;

        while (parent && parent !== SceneManager._scene) {
          y += parent.y;
          parent = parent.parent;
        }

        return y;
      }
    }, {
      key: "getClosestWindow",
      value: function getClosestWindow(x, y) {
        var windows = this.getVisibleWindows();
        var minDistance = Infinity;
        var closestWindow = false;

        var _iterator2 = _createForOfIteratorHelper(windows),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var win = _step2.value;
            var winX = this.getWindowRealX(win);
            var winY = this.getWindowRealY(win);
            var xDistance = Math.abs(x - winX);
            var yDistance = Math.abs(y - winY);
            var distance = Math.min(xDistance, yDistance);

            if (distance < minDistance) {
              minDistance = distance;
              closestWindow = win;
            }

            xDistance = Math.abs(x - (winX + win.width));
            yDistance = Math.abs(y - (winY + win.height));
            distance = Math.min(xDistance, yDistance);

            if (distance < minDistance) {
              minDistance = distance;
              closestWindow = win;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return closestWindow;
      }
    }, {
      key: "getActiveWindow",
      value: function getActiveWindow() {
        var _this$_index;

        var windows = this.getSceneWindows();
        var index = (_this$_index = this._index) !== null && _this$_index !== void 0 ? _this$_index : 0;
        return windows[index];
      }
    }, {
      key: "_onHover",
      value: function _onHover(x, y) {
        this._movedX = 0;
        this._movedY = 0;
        var win = this.getActiveWindow();

        if (!win) {
          return;
        }

        var winX = this.getWindowRealX(win);
        var winY = this.getWindowRealY(win);
        var insideH = x > winX - 10 && x < winX + win.width + 10;
        var insideV = y > winY - 10 && y < winY + win.height + 10;
        var resizeLeft = Math.abs(winX - x) < 10 && insideV;
        var resizeRight = Math.abs(winX + win.width - x) < 10 && insideV;
        var resizeTop = Math.abs(winY - y) < 10 && insideH;
        var resizeBottom = Math.abs(winY + win.height - y) < 10 && insideH;
        var directions = [];

        if (resizeTop) {
          directions.push('n');
        } else if (resizeBottom) {
          directions.push('s');
        }

        if (resizeLeft) {
          directions.push('w');
        } else if (resizeRight) {
          directions.push('e');
        }

        if (directions.length) {
          document.body.style.cursor = "".concat(directions.join(''), "-resize");
        } else if (insideV && insideH) {
          document.body.style.cursor = 'move';
        } else {
          document.body.style.cursor = 'default';
        }
      }
    }, {
      key: "_onMove",
      value: function _onMove(x, y) {
        this._movedX = x - this._triggerX;
        this._movedY = y - this._triggerY;
      }
    }, {
      key: "_onTrigger",
      value: function _onTrigger(x, y) {
        this._windowTriggered = this.getActiveWindow();
        this._triggerX = x;
        this._triggerY = y;
      }
    }, {
      key: "applyMouseDiff",
      value: function applyMouseDiff(diffX, diffY) {
        var win = this._windowTriggered;

        switch (document.body.style.cursor) {
          case 'n-resize':
            win.y += diffY;
            win.height -= diffY;
            break;

          case 's-resize':
            win.height += diffY;
            break;

          case 'w-resize':
            win.x += diffX;
            win.width -= diffX;
            break;

          case 'e-resize':
            win.width += diffX;
            break;

          case 'nw-resize':
            win.y += diffY;
            win.height -= diffY;
            win.x += diffX;
            win.width -= diffX;
            break;

          case 'sw-resize':
            win.height += diffY;
            win.x += diffX;
            win.width -= diffX;
            break;

          case 'ne-resize':
            win.y += diffY;
            win.height -= diffY;
            win.width += diffX;
            break;

          case 'se-resize':
            win.height += diffY;
            win.width += diffX;
            break;

          case 'move':
            win.x += diffX;
            win.y += diffY;
            break;
        }

        if (win.width < 0) {
          win.x -= Math.abs(win.width);
          win.width = Math.abs(win.width);
        }

        if (win.height < 0) {
          win.y -= Math.abs(win.height);
          win.height = Math.abs(win.height);
        }

        win._changedX = win.x;
        win._changedY = win.y;
        win._changedWidth = win.width;
        win._changedHeight = win.height;
        win.refresh && win.refresh();
      }
    }, {
      key: "_onRelease",
      value: function _onRelease(x, y) {
        this._movedX = 0;
        this._movedY = 0;

        if (!this._windowTriggered) {
          return;
        }

        var oldData = this.getOldData(this._windowTriggered);
        var diffX = x - this._triggerX;
        var diffY = y - this._triggerY;
        this.applyMouseDiff(diffX, diffY);
        this.makeReport(oldData, this._windowTriggered);
      }
    }, {
      key: "generateJson",
      value: function generateJson() {
        var windows = this.getSceneWindows();
        var data = [];

        var _iterator3 = _createForOfIteratorHelper(windows),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var win = _step3.value;

            if (!win) {
              continue;
            }

            data.push({
              name: win.constructor.name,
              index: data.length,
              x: win.x,
              y: win.y,
              width: win.width,
              height: win.height
            });
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        console.log(data);
        var json = JSON.stringify(data, null, 2);
        this.downloadJson(json, 'test');
      }
    }, {
      key: "downloadJson",
      value: function downloadJson(json, fileName) {
        // const data = atob(json);
        var buffer = new ArrayBuffer(json.length);
        var view = new Uint8Array(buffer);

        for (var i = 0; i < json.length; i++) {
          view[i] = json.charCodeAt(i) & 0xff;
        }

        var blob = new Blob([buffer], {
          type: 'application/json'
        });
        var url = URL.createObjectURL(blob);
        var iframe = document.getElementsByName('json_download')[0];

        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.setAttribute('name', 'json_download');
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }

        var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', fileName + '.json');
        element.setAttribute('target', 'json_download');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }, {
      key: "setActiveWindowIndex",
      value: function setActiveWindowIndex(index) {
        this._index = index;
      }
    }, {
      key: "findWindowName",
      value: function findWindowName(win) {
        var variableName = false;

        for (var parentProp in this.parent) {
          if (!this.parent[parentProp] || this.parent[parentProp] !== win) {
            continue;
          }

          variableName = parentProp;
          break;
        }

        if (variableName) {
          return "".concat(win.constructor.name, " ( scene.").concat(variableName, " )");
        }

        return win.constructor.name;
      }
    }, {
      key: "listAvailableWindows",
      value: function listAvailableWindows() {
        console.clear();
        console.log('Available Windows:');
        var allWindows = this.getSceneWindows();
        var idx = 0;
        var activeWin = this.getActiveWindow();

        var _iterator4 = _createForOfIteratorHelper(allWindows),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var win = _step4.value;

            if (!win) {
              continue;
            }

            var shortcut = idx < 31 ? idx.toString(31) : idx;
            var line = "".concat(shortcut, ": ").concat(this.findWindowName(win));

            if (win === activeWin) {
              console.warn("".concat(line, " * Selected "));
            } else {
              console.log(line);
            }

            idx++;

            if (idx >= 31) {
              break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        console.log('---------');
        console.log('Available Commands:');
        console.log('v.move(x, y);');
        console.log('v.resize(width, height);');
        console.log('v.reset();');
        console.log('v.change(newWindowIndex);');
        console.log('v.end();');
        console.log('---------');
      }
    }, {
      key: "restoreAllWindows",
      value: function restoreAllWindows() {
        var windows = this.getSceneWindows();

        var _iterator5 = _createForOfIteratorHelper(windows),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var win = _step5.value;

            if (!win) {
              continue;
            }

            if (win._initialX !== undefined) {
              win.x = win._initialX;
            }

            if (win._initialY !== undefined) {
              win.y = win._initialY;
            }

            if (win._initialWidth !== undefined) {
              win.width = win._initialWidth;
            }

            if (win._initialHeight !== undefined) {
              win.height = win._initialHeight;
            }

            win.refresh && win.refresh();
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }, {
      key: "reapplyAllChanges",
      value: function reapplyAllChanges() {
        var windows = this.getSceneWindows();

        var _iterator6 = _createForOfIteratorHelper(windows),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var win = _step6.value;

            if (!win) {
              continue;
            }

            if (win._changedX !== undefined) {
              win.x = win._changedX;
            }

            if (win._changedY !== undefined) {
              win.y = win._changedY;
            }

            if (win._changedWidth !== undefined) {
              win.width = win._changedWidth;
            }

            if (win._changedHeight !== undefined) {
              win.height = win._changedHeight;
            }

            win.refresh && win.refresh();
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "getOldData",
      value: function getOldData(win) {
        if (win._initialX === undefined) {
          win._initialX = win.x;
        }

        if (win._initialY === undefined) {
          win._initialY = win.y;
        }

        if (win._initialWidth === undefined) {
          win._initialWidth = win.width;
        }

        if (win._initialHeight === undefined) {
          win._initialHeight = win.height;
        }

        return {
          x: win.x,
          y: win.y,
          width: win.width,
          height: win.height
        };
      }
    }, {
      key: "makeReport",
      value: function makeReport(oldData, triggeredWindow) {
        var win = triggeredWindow !== null && triggeredWindow !== void 0 ? triggeredWindow : this.getActiveWindow();
        this.listAvailableWindows();

        if (!win) {
          return;
        }

        var winName = this.findWindowName(win);
        console.log("Changing ".concat(winName, ":"));

        if (oldData && (win.x !== oldData.x || win.y !== oldData.y)) {
          console.warn("Moved to ".concat(win.x, ", ").concat(win.y));
        } else {
          console.log("Position: ".concat(win.x, ", ").concat(win.y));
        }

        if (oldData && (win.width !== oldData.width || win.height !== oldData.height)) {
          console.warn("Resized to ".concat(win.width, ", ").concat(win.height));
        } else {
          console.log("Size: ".concat(win.width, ", ").concat(win.height));
        }
      }
    }, {
      key: "enableWindowResizer",
      value: function enableWindowResizer() {
        var _this = this;

        this.show();
        this.reapplyAllChanges();
        nw.Window.get().showDevTools();
        this.listAvailableWindows();
        window.v = {
          move: function move(x, y) {
            var win = _this.getActiveWindow();

            if (!win) {
              console.error('Invalid window');
              return;
            }

            var oldData = _this.getOldData(win);

            win.x = x;
            win.y = y;
            win._changedX = x;
            win._changedY = y;
            win.refresh && win.refresh();

            _this.makeReport(oldData, win);
          },
          resize: function resize(width, height) {
            var win = _this.getActiveWindow();

            if (!win) {
              console.error('Invalid window');
              return;
            }

            var oldData = _this.getOldData(win);

            win.width = width;
            win.height = height;
            win._changedWidth = width;
            win._changedHeight = height;
            win.refresh && win.refresh();

            _this.makeReport(oldData, win);
          },
          reset: function reset() {
            var win = _this.getActiveWindow();

            if (!win) {
              console.error('Invalid window');
              return;
            }

            if (win._initialX !== undefined) {
              win.x = win._initialX;
            }

            if (win._initialY !== undefined) {
              win.y = win._initialY;
            }

            if (win._initialWidth !== undefined) {
              win.width = win._initialWidth;
            }

            if (win._initialHeight !== undefined) {
              win.height = win._initialHeight;
            }

            win.refresh && win.refresh();
          },
          change: function change(newWindowIndex) {
            if (typeof newWindowIndex === 'string') {
              newWindowIndex = parseInt(newWindowIndex, 31);
            }

            if (isNaN(newWindowIndex)) {
              console.error('Invalid Index');
              return;
            }

            _this.setActiveWindowIndex(newWindowIndex);

            var win = _this.getActiveWindow();

            _this.makeReport(false, win);

            if (!win) {
              console.warn('Deselected window');
              return;
            }

            var winName = _this.findWindowName(win);

            console.warn("Changed Selection: ".concat(winName));
          },
          end: function end() {
            _this.disableWindowResizer();
          }
        };
        nw.Window.get().focus();
      }
    }, {
      key: "disableWindowResizer",
      value: function disableWindowResizer() {
        this.hide();
        this.generateJson();
        document.body.style.cursor = 'default';
        delete window.v;
        this.restoreAllWindows();
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.visible) {
          this.disableWindowResizer();
        } else {
          this.enableWindowResizer();
        }
      }
    }]);

    return WindowEffects;
  }(Window_Base);

  var WindowResizer$1 = /*#__PURE__*/function (_CyclonePatcher) {
    _inherits(WindowResizer$1, _CyclonePatcher);

    var _super2 = _createSuper(WindowResizer$1);

    function WindowResizer$1() {
      _classCallCheck(this, WindowResizer$1);

      return _super2.apply(this, arguments);
    }

    _createClass(WindowResizer$1, null, [{
      key: "register",
      value: function register() {
        var _this2 = this;

        this.initialize('WindowResizer');
        document.addEventListener('keyup', function () {
          _this2.onKeyUp.apply(_this2, arguments);
        });
      }
    }, {
      key: "findChildWindows",
      value: function findChildWindows(parent) {
        if (!parent.children) {
          return [];
        }

        var childWindows = [];

        var _iterator7 = _createForOfIteratorHelper(parent.children),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var child = _step7.value;

            if (child instanceof WindowEffects) {
              continue;
            }

            if (child instanceof Window) {
              childWindows.push(child);
            }

            var newWindows = this.findChildWindows(child);

            if (newWindows) {
              childWindows.push.apply(childWindows, _toConsumableArray(newWindows));
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        return childWindows;
      }
    }, {
      key: "setActiveWindowIndex",
      value: function setActiveWindowIndex(index) {
        SceneManager._scene._windowResizer.setActiveWindowIndex(index);

        SceneManager._scene._windowResizer.makeReport();

        console.log(index);
      }
    }, {
      key: "onKeyUp",
      value: function onKeyUp(event) {
        var number = parseInt(event.key, 31);

        if (!isNaN(number) && number < 31) {
          return this.setActiveWindowIndex(number);
        }

        if (event.key === 'v') {
          SceneManager._scene._windowResizer.toggle();

          return;
        }
      }
    }, {
      key: "_onMouseDown",
      value: function _onMouseDown(event) {
        if (event.button !== 0) {
          return;
        }

        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);

        if (Graphics.isInsideCanvas(x, y)) {
          this._mousePressed = true;
          this._pressedTime = 0;

          this._onTrigger(x, y);
        }
      }
    }, {
      key: "_onMouseMove",
      value: function _onMouseMove(event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);

        if (this._mousePressed) {
          this._onMove(x, y);
        } else if (Graphics.isInsideCanvas(x, y)) {
          this._onHover(x, y);
        }
      }
    }, {
      key: "_onMouseUp",
      value: function _onMouseUp(event) {
        if (event.button !== 0) {
          return;
        }

        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;

        this._onRelease(x, y);
      }
    }, {
      key: "_onLostFocus",
      value: function _onLostFocus(event) {
        this._mousePressed = false;
        this._screenPressed = false;
        this._pressedTime = 0;
        this._clicked = false; // this._newState = this._createNewState();
        // this._currentState = this._createNewState();

        this._x = 0;
        this._y = 0;
        this._triggerX = 0;
        this._triggerY = 0;
        this._moved = false;
        this._date = 0;
      }
    }, {
      key: "_onHover",
      value: function _onHover(x, y) {
        SceneManager._scene._windowResizer._onHover(x, y);
      }
    }, {
      key: "_onMove",
      value: function _onMove(x, y) {
        SceneManager._scene._windowResizer._onMove(x, y);
      }
    }, {
      key: "_onTrigger",
      value: function _onTrigger(x, y) {
        SceneManager._scene._windowResizer._onTrigger(x, y);
      }
    }, {
      key: "_onRelease",
      value: function _onRelease(x, y) {
        SceneManager._scene._windowResizer._onRelease(x, y);
      }
    }, {
      key: "active",
      get: function get() {
        var _SceneManager$_scene, _SceneManager$_scene$;

        return (_SceneManager$_scene = SceneManager._scene) === null || _SceneManager$_scene === void 0 ? void 0 : (_SceneManager$_scene$ = _SceneManager$_scene._windowResizer) === null || _SceneManager$_scene$ === void 0 ? void 0 : _SceneManager$_scene$.visible;
      }
    }]);

    return WindowResizer$1;
  }(CyclonePatcher);

  globalThis.WindowResizer = WindowResizer$1;
  WindowResizer$1.register();
  WindowResizer.patchClass(Input, function ($super) {
    return /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }

      _createClass(_class, null, [{
        key: "_onKeyDown",
        value: function _onKeyDown(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onKeyDown.call(this, event);
        }
      }, {
        key: "_onKeyUp",
        value: function _onKeyUp(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onKeyUp.call(this, event);
        }
      }]);

      return _class;
    }();
  });
  WindowResizer.patchClass(Scene_Base, function ($super) {
    return /*#__PURE__*/function () {
      function _class2() {
        _classCallCheck(this, _class2);
      }

      _createClass(_class2, [{
        key: "start",
        value: function start() {
          $super.start.call(this);
          this.createWindowResizer();
        }
      }, {
        key: "createWindowResizer",
        value: function createWindowResizer() {
          this._windowResizer = new WindowEffects(new Rectangle(0, 0, Graphics.width, Graphics.height));
          this.addChild(this._windowResizer);

          this._windowResizer.hide();
        }
      }, {
        key: "findAllWindows",
        value: function findAllWindows() {
          return WindowResizer.findChildWindows(this);
        }
      }]);

      return _class2;
    }();
  });
  WindowResizer.patchClass(Scene_Boot, function ($super) {
    return /*#__PURE__*/function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: "createWindowResizer",
        value: function createWindowResizer() {}
      }]);

      return _class3;
    }();
  });
  WindowResizer.patchClass(TouchInput, function ($super) {
    return /*#__PURE__*/function () {
      function _class4() {
        _classCallCheck(this, _class4);
      }

      _createClass(_class4, null, [{
        key: "_onMouseDown",
        value: function _onMouseDown(event) {
          if (WindowResizer.active) {
            WindowResizer._onMouseDown(event);

            return;
          }

          $super._onMouseDown.call(this, event);
        }
      }, {
        key: "_onMouseMove",
        value: function _onMouseMove(event) {
          if (WindowResizer.active) {
            WindowResizer._onMouseMove(event);

            return;
          }

          $super._onMouseMove.call(this, event);
        }
      }, {
        key: "_onMouseUp",
        value: function _onMouseUp(event) {
          if (WindowResizer.active) {
            WindowResizer._onMouseUp(event);

            return;
          }

          $super._onMouseUp.call(this, event);
        }
      }, {
        key: "_onWheel",
        value: function _onWheel(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onWheel.call(this, event);
        }
      }, {
        key: "_onTouchStart",
        value: function _onTouchStart(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onTouchStart.call(this, event);
        }
      }, {
        key: "_onTouchMove",
        value: function _onTouchMove(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onTouchMove.call(this, event);
        }
      }, {
        key: "_onTouchEnd",
        value: function _onTouchEnd(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onTouchEnd.call(this, event);
        }
      }, {
        key: "_onTouchCancel",
        value: function _onTouchCancel(event) {
          if (WindowResizer.active) {
            return;
          }

          $super._onTouchCancel.call(this, event);
        }
      }, {
        key: "_onLostFocus",
        value: function _onLostFocus(event) {
          if (WindowResizer.active) {
            WindowResizer._onLostFocus(event);
          }

          $super._onTouchCancel.call(this, event);
        }
      }]);

      return _class4;
    }();
  });
  WindowResizer.patchClass(Window_Base, function ($super) {
    return /*#__PURE__*/function () {
      function _class5() {
        _classCallCheck(this, _class5);
      }

      _createClass(_class5, [{
        key: "update",
        value: function update() {
          var _$super$update;

          if (WindowResizer.active && !(this instanceof WindowEffects)) {
            return;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_$super$update = $super.update).call.apply(_$super$update, [this].concat(args));
        }
      }]);

      return _class5;
    }();
  });
  WindowResizer.patchClass(Window_Selectable, function ($super) {
    return /*#__PURE__*/function () {
      function _class6() {
        _classCallCheck(this, _class6);
      }

      _createClass(_class6, [{
        key: "refreshCursor",
        value: function refreshCursor() {
          if (WindowResizer.active) {
            return;
          }

          $super.refreshCursor.call(this);
        }
      }]);

      return _class6;
    }();
  });
  WindowResizer.patchClass(WindowEffects, function ($super) {
    return /*#__PURE__*/function () {
      function _class7() {
        _classCallCheck(this, _class7);
      }

      _createClass(_class7, [{
        key: "initialize",
        value: function initialize(rect) {
          $super.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
        }
      }, {
        key: "clearBackContents",
        value: function clearBackContents() {}
      }, {
        key: "standardPadding",
        value: function standardPadding() {
          return 0;
        }
      }]);

      return _class7;
    }();
  });
})();
