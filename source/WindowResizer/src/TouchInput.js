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