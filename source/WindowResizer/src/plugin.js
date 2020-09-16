import { CyclonePatcher } from '../../Core/patcher';
import { WindowEffects } from './WindowEffects';

class WindowResizer extends CyclonePatcher {
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

globalThis.WindowResizer = WindowResizer;
WindowResizer.register();