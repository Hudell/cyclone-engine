Bitmap.prototype.strokeRect = function(x, y, width, height, color) {
  const context = this.context;
  context.save();
  context.strokeStyle = color;
  context.strokeRect(x, y, width, height);
  context.restore();
  this._baseTexture.update();
};