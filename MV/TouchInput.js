if (Utils.RPGMAKER_NAME === 'MV') {
  const oldTouchInputMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    oldTouchInputMouseMove.call(this, event);

    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);

    this._x = x;
    this._y = y;
  };
}