if (Utils.RPGMAKER_NAME === 'MV') {
  Window_Selectable.prototype.hitIndex = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
  };
}