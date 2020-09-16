/*:
 * @target MZ
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
    const windows = this.getSceneWindows();

    const index = this._index ?? 0;
    return windows[index];
  }

  _onHover(x, y) {
    this._movedX = 0;
    this._movedY = 0;
    const win = this.getActiveWindow();

    if (!win) {
      return;
    }

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

  applyMouseDiff(diffX, diffY) {
    const win = this._windowTriggered;

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

  _onRelease(x, y) {
    this._movedX = 0;
    this._movedY = 0;

    if (!this._windowTriggered) {
      return;
    }

    const oldData = this.getOldData(this._windowTriggered);
    const diffX = x - this._triggerX;
    const diffY = y - this._triggerY;

    this.applyMouseDiff(diffX, diffY);
    this.makeReport(oldData, this._windowTriggered);
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

    console.log(data);

    const json = JSON.stringify(data, null, 2);
    this.downloadJson(json, 'test');
  }

  downloadJson(json, fileName) {
    // const data = atob(json);
    const buffer = new ArrayBuffer(json.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < json.length; i++) {
      view[i] = json.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/json'});
    const url = URL.createObjectURL(blob);

    let iframe = document.getElementsByName('json_download')[0];
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('name', 'json_download');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName + '.json');
    element.setAttribute('target', 'json_download');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  setActiveWindowIndex(index) {
    this._index = index;
  }

  findWindowName(win) {
    let variableName = false;
    for (const parentProp in this.parent) {
      if (!this.parent[parentProp] || this.parent[parentProp] !== win) {
        continue;
      }

      variableName = parentProp;
      break;
    }

    if (variableName) {
      return `${ win.constructor.name } ( scene.${ variableName } )`;
    }

    return win.constructor.name;
  }

  listAvailableWindows() {
    console.clear();
    console.log('Available Windows:');

    const allWindows = this.getSceneWindows();
    let idx = 0;

    const activeWin = this.getActiveWindow();

    for (const win of allWindows) {
      if (!win) {
        continue;
      }

      const shortcut = idx < 31 ? idx.toString(31) : idx;
      const line = `${ shortcut }: ${ this.findWindowName(win) }`;

      if (win === activeWin) {
        console.warn(`${ line } * Selected `);
      } else {
        console.log(line);
      }
      idx++;
      if (idx >= 31) {
        break;
      }
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

  restoreAllWindows() {
    const windows = this.getSceneWindows();
    for (const win of windows) {
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
  }

  reapplyAllChanges() {
    const windows = this.getSceneWindows();
    for (const win of windows) {
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
  }

  getOldData(win) {
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
      height: win.height,
    };
  }

  makeReport(oldData, triggeredWindow) {
    const win = triggeredWindow ?? this.getActiveWindow();
    this.listAvailableWindows();

    if (!win) {
      return;
    }

    const winName = this.findWindowName(win);
    console.log(`Changing ${ winName }:`);

    if (oldData && (win.x !== oldData.x || win.y !== oldData.y)) {
      console.warn(`Moved to ${ win.x }, ${ win.y }`);
    } else {
      console.log(`Position: ${ win.x }, ${ win.y }`);
    }

    if (oldData && (win.width !== oldData.width || win.height !== oldData.height)) {
      console.warn(`Resized to ${ win.width }, ${ win.height }`);
    } else {
      console.log(`Size: ${ win.width }, ${ win.height }`);
    }
  }

  enableWindowResizer() {
    this.show();

    this.reapplyAllChanges();

    nw.Window.get().showDevTools();
    this.listAvailableWindows();

    window.v = {
      move: (x, y) => {
        const win = this.getActiveWindow();
        if (!win) {
          console.error('Invalid window');
          return;
        }

        const oldData = this.getOldData(win);
        win.x = x;
        win.y = y;

        win._changedX = x;
        win._changedY = y;

        win.refresh && win.refresh();
        this.makeReport(oldData, win);
      },
      resize: (width, height) => {
        const win = this.getActiveWindow();
        if (!win) {
          console.error('Invalid window');
          return;
        }

        const oldData = this.getOldData(win);
        win.width = width;
        win.height = height;

        win._changedWidth = width;
        win._changedHeight = height;

        win.refresh && win.refresh();
        this.makeReport(oldData, win);
      },
      reset: () => {
        const win = this.getActiveWindow();
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
      change: (newWindowIndex) => {
        if (typeof newWindowIndex === 'string') {
          newWindowIndex = parseInt(newWindowIndex, 31);
        }

        if (isNaN(newWindowIndex)) {
          console.error('Invalid Index');
          return;
        }

        this.setActiveWindowIndex(newWindowIndex);
        const win = this.getActiveWindow();

        this.makeReport(false, win);
        if (!win) {
          console.warn('Deselected window');
          return;
        }
        const winName = this.findWindowName(win);
        console.warn(`Changed Selection: ${ winName }`);
      },
      end: () => {
        this.disableWindowResizer();
      }
    };

    nw.Window.get().focus();
  }

  disableWindowResizer() {
    this.hide();
    this.generateJson();
    document.body.style.cursor = 'default';

    delete window.v;

    this.restoreAllWindows();
  }

  toggle() {
    if (this.visible) {
      this.disableWindowResizer();
    } else {
      this.enableWindowResizer();
    }
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
    SceneManager._scene._windowResizer.makeReport();

    console.log(index);
  }

  static onKeyUp(event) {
    const number = parseInt(event.key, 31);
    if (!isNaN(number) && number < 31) {
      return this.setActiveWindowIndex(number);
    }

    if (event.key === 'v') {
      SceneManager._scene._windowResizer.toggle();
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
