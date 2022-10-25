CycloneNewFolder7.patchClass(TouchInput, $super => class {
  static _onMouseMove(event) {
    $super._onMouseMove.call(this, event);

    this._mouseX = Graphics.pageToCanvasX(event.pageX);
    this._mouseY = Graphics.pageToCanvasY(event.pageY);
  }
});
