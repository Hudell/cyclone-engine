CycloneMapEditor.patchClass(Scene_Boot, $super => class {
  resizeScreen() {
    if (Utils.isNwjs() && Graphics.width < 1280) {
      const minWidth = Math.min(1920, screen.availWidth - (window.outerWidth - window.innerWidth));
      const minHeight = Math.min(1080, screen.availHeight - (window.outerHeight - window.innerHeight));

      if (Graphics.width < minWidth) {
        Graphics.width = minWidth;
      }
      if (Graphics.boxWidth < minWidth) {
        Graphics.boxWidth = minWidth;
      }

      if (Graphics.height < minHeight) {
        Graphics.height = minHeight;
      }
      if (Graphics.boxHeight < minHeight) {
        Graphics.boxHeight = minHeight;
      }

      const xDelta = Graphics.width - window.innerWidth;
      const yDelta = Graphics.height - window.innerHeight;
      window.moveBy(-xDelta / 2, -yDelta / 2);
      window.resizeBy(xDelta, yDelta);
    }
  }

  start() {
    $super.start.call(this);
    this.resizeScreen();
  }

});
