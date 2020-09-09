/*:
 * @target MZ
 * @plugindesc
 * <pluginName:WindowResizer>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-time
 *
 * @help
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 */

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

class WindowEffects extends Window_Base {
  update() {
    super.update(this);

    if (this.visible) {
      this.refresh();
    }
  }

  itemPadding() {
    return 0;
  }

  updatePadding() {
    this.padding = 0;
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _refreshFrame() {
  }

  refresh() {
    if (this.contents) {
      this.contents.clear();
      this.contentsBack.clear();
      this.drawContent();
    }
  }

  getSceneWindows() {
    const parentScene = this.parent;
    if (!parentScene.findAllWindows) {
      return;
    }

    return parentScene.findAllWindows();
  }

  getVisibleWindows() {
    const windows = this.getSceneWindows();
    return windows.filter(win => win.visible);
  }

  drawContent() {
    const win = this.getActiveWindow();
    if (!win) {
      return;
    }

    this.drawWindowBorder(win);
  }

  drawWindowBorder(win) {
    let color = '#00FF0066';
    if (!win.visible) {
      color = '#FF000033';
    }

    let parent = win.parent;
    let offsetX = 0;
    let offsetY = 0;

    while (parent && parent !== SceneManager._scene) {
      offsetX += parent.x;
      offsetY += parent.y;
      parent = parent.parent;
    }

    const { x, y, width, height } = win;

    let drawX = x + offsetX;
    let drawY = y + offsetY;
    let drawWidth = width;
    let drawHeight = height;

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

  show() {
    const windows = this.getSceneWindows();

    for (const win of windows) {
      win._lastSnap = new Bitmap(win.width, win.height);
      if (win.visible) {
        win._lastSnap.blt(win.contents, 0, 0, win.contents.width, win.contents.height, 0, 0);
      }
    }

    super.show();
  }

  getWindowRealX(win) {
    let x = win.x;

    let parent = win.parent;
    while (parent && parent !== SceneManager._scene) {
      x += parent.x;
      parent = parent.parent;
    }

    return x;
  }

  getWindowRealY(win) {
    let y = win.y;

    let parent = win.parent;
    while (parent && parent !== SceneManager._scene) {
      y += parent.y;
      parent = parent.parent;
    }

    return y;
  }

  getClosestWindow(x, y) {
    const windows = this.getVisibleWindows();
    let minDistance = Infinity;
    let closestWindow = false;

    for (const win of windows) {
      const winX = this.getWindowRealX(win);
      const winY = this.getWindowRealY(win);

      let xDistance = Math.abs(x - winX);
      let yDistance = Math.abs(y - winY);
      let distance = Math.min(xDistance, yDistance);

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

    return closestWindow;
  }

  getActiveWindow() {
    const windows = this.getVisibleWindows();

    const index = this._index ?? 0;
    return windows[index];
  }

  _onHover(x, y) {
    this._movedX = 0;
    this._movedY = 0;
    const win = this.getActiveWindow();

    const winX = this.getWindowRealX(win);
    const winY = this.getWindowRealY(win);

    const insideH = x > (winX - 10) && x < (winX + win.width + 10);
    const insideV = y > (winY - 10) && y < (winY + win.height + 10);
    const resizeLeft = Math.abs(winX - x) < 10 && insideV;
    const resizeRight = Math.abs((winX + win.width) - x) < 10 && insideV;
    const resizeTop = Math.abs(winY - y) < 10 && insideH;
    const resizeBottom = Math.abs((winY + win.height) - y) < 10 && insideH;

    const directions = [];
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
      document.body.style.cursor = `${ directions.join('') }-resize`;
    } else if (insideV && insideH) {
      document.body.style.cursor = 'move';
    } else {
      document.body.style.cursor = 'default';
    }
  }

  _onMove(x, y) {
    this._movedX = x - this._triggerX;
    this._movedY = y - this._triggerY;
  }

  _onTrigger(x, y) {
    this._windowTriggered = this.getActiveWindow();
    this._triggerX = x;
    this._triggerY = y;
  }

  _onRelease(x, y) {
    this._movedX = 0;
    this._movedY = 0;

    if (!this._windowTriggered) {
      return;
    }

    const diffX = x - this._triggerX;
    const diffY = y - this._triggerY;

    switch (document.body.style.cursor) {
      case 'n-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        break;
      case 's-resize':
        this._windowTriggered.height += diffY;
        break;
      case 'w-resize':
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'e-resize':
        this._windowTriggered.width += diffX;
        break;
      case 'nw-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'sw-resize':
        this._windowTriggered.height += diffY;
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'ne-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        this._windowTriggered.width += diffX;
        break;
      case 'se-resize':
        this._windowTriggered.height += diffY;
        this._windowTriggered.width += diffX;
        break;
      case 'move':
        this._windowTriggered.x += diffX;
        this._windowTriggered.y += diffY;
        break;
    }

    if (this._windowTriggered.width < 0) {
      this._windowTriggered.x -= Math.abs(this._windowTriggered.width);
      this._windowTriggered.width = Math.abs(this._windowTriggered.width);
    }

    if (this._windowTriggered.height < 0) {
      this._windowTriggered.y -= Math.abs(this._windowTriggered.height);
      this._windowTriggered.height = Math.abs(this._windowTriggered.height);
    }

    this._windowTriggered.refresh();
  }

  generateJson() {
    const windows = this.getSceneWindows();
    const data = [];
    for (const win of windows) {
      if (!win) {
        continue;
      }

      data.push({
        name: win.constructor.name,
        index: data.length,
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
      });
    }

    console.log(JSON.stringify(data));
  }

  setActiveWindowIndex(index) {
    this._index = index;
  }
}

class WindowResizer$1 extends CyclonePatcher {
  static register() {
    this.initialize('WindowResizer');

    document.addEventListener('keyup', (...args) => {
      this.onKeyUp(...args);
    });
  }

  static get active() {
    return SceneManager._scene?._windowResizer?.visible;
  }

  static findChildWindows(parent) {
    if (!parent.children) {
      return [];
    }

    const childWindows = [];
    for (const child of parent.children) {
      if (child instanceof WindowEffects) {
        continue;
      }

      if (child instanceof Window) {
        childWindows.push(child);
      }

      const newWindows = this.findChildWindows(child);
      if (newWindows) {
        childWindows.push(...newWindows);
      }
    }

    return childWindows;
  }

  static setActiveWindowIndex(index) {
    SceneManager._scene._windowResizer.setActiveWindowIndex(index);
  }

  static onKeyUp(event) {
    const number = Number(event.key);
    if (!isNaN(number)) {
      return this.setActiveWindowIndex(number);
    }

    if (event.key === 'v') {
      if (SceneManager._scene._windowResizer.visible) {
        SceneManager._scene._windowResizer.hide();
        SceneManager._scene._windowResizer.generateJson();
        document.body.style.cursor = 'default';
      } else {
        SceneManager._scene._windowResizer.show();
      }
      return;
    }
  }

  static _onMouseDown(event) {
    if (event.button !== 0) {
      return;
    }

    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);

    if (Graphics.isInsideCanvas(x, y)) {
      this._mousePressed = true;
      this._pressedTime = 0;
      this._onTrigger(x, y);
    }
  }

  static _onMouseMove(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);

    if (this._mousePressed) {
      this._onMove(x, y);
    } else if (Graphics.isInsideCanvas(x, y)) {
      this._onHover(x, y);
    }
  }

  static _onMouseUp(event) {
    if (event.button !== 0) {
      return;
    }

    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    this._mousePressed = false;
    this._onRelease(x, y);
  }

  static _onLostFocus(event) {
    this._mousePressed = false;
    this._screenPressed = false;
    this._pressedTime = 0;
    this._clicked = false;
    // this._newState = this._createNewState();
    // this._currentState = this._createNewState();
    this._x = 0;
    this._y = 0;
    this._triggerX = 0;
    this._triggerY = 0;
    this._moved = false;
    this._date = 0;
  }

  static _onHover(x, y) {
    SceneManager._scene._windowResizer._onHover(x, y);
  }

  static _onMove(x, y) {
    SceneManager._scene._windowResizer._onMove(x, y);
  }

  static _onTrigger(x, y) {
    SceneManager._scene._windowResizer._onTrigger(x, y);
  }

  static _onRelease(x, y) {
    SceneManager._scene._windowResizer._onRelease(x, y);
  }
}

globalThis.WindowResizer = WindowResizer$1;
WindowResizer$1.register();

WindowResizer.patchClass(Scene_Base, $super => class {
  start() {
    $super.start.call(this);

    this.createWindowResizer();
  }

  createWindowResizer() {
    this._windowResizer = new WindowEffects(new Rectangle(0, 0, Graphics.width, Graphics.height));
    this.addChild(this._windowResizer);

    this._windowResizer.hide();
  }

  // update() {
  //   $super.update.call(this);


  // }

  findAllWindows() {
    return WindowResizer.findChildWindows(this);
  }

});

WindowResizer.patchClass(Scene_Boot, $super => class {
  createWindowResizer() {
  }
});

WindowResizer.patchClass(Window_Base, $super => class {
  update(...args) {
    if (WindowResizer.active && !(this instanceof WindowEffects)) {
      return;
    }

    $super.update.call(this, ...args);
  }
});

WindowResizer.patchClass(Window_Selectable, $super => class {
  refreshCursor() {
    if (WindowResizer.active) {
      return;
    }

    $super.refreshCursor.call(this);
  }
});

WindowResizer.patchClass(TouchInput, $super => class {
  static _onMouseDown(event) {
    if (WindowResizer.active) {
      WindowResizer._onMouseDown(event);
      return;
    }

    $super._onMouseDown.call(this, event);
  }

  static _onMouseMove(event) {
    if (WindowResizer.active) {
      WindowResizer._onMouseMove(event);
      return;
    }

    $super._onMouseMove.call(this, event);
  }

  static _onMouseUp(event) {
    if (WindowResizer.active) {
      WindowResizer._onMouseUp(event);
      return;
    }

    $super._onMouseUp.call(this, event);
  }

  static _onWheel(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onWheel.call(this, event);
  }

  static _onTouchStart(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onTouchStart.call(this, event);
  }

  static _onTouchMove(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onTouchMove.call(this, event);
  }

  static _onTouchEnd(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onTouchEnd.call(this, event);
  }

  static _onTouchCancel(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onTouchCancel.call(this, event);
  }

  static _onLostFocus(event) {
    if (WindowResizer.active) {
      WindowResizer._onLostFocus(event);
    }

    $super._onTouchCancel.call(this, event);
  }
});

WindowResizer.patchClass(Input, $super => class {
  static _onKeyDown(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onKeyDown.call(this, event);
  }

  static _onKeyUp(event) {
    if (WindowResizer.active) {
      return;
    }

    $super._onKeyUp.call(this, event);
  }
});
})();
