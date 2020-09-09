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