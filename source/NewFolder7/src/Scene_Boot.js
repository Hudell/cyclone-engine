CycloneNewFolder7.patchClass(Scene_Boot, $super => class {
  resizeGameScreen() {
    Graphics.width = 1280;
    Graphics.height = 720;
    Graphics.boxWidth = 1280;
    Graphics.boxHeight = 720;

    if (Utils.isNwjs() && Graphics.width < 1024) {
      const fullWidth = Math.min(1920, screen.availWidth - (window.outerWidth - window.innerWidth)) === 1920;
      const fullHeight = Math.min(1080, screen.availHeight - (window.outerHeight - window.innerHeight)) === 1080;
      const fullSize = fullWidth && fullHeight;

      const windowWidth = fullSize ? 1920 : 1280;
      const windowHeight = fullSize ? 1080 : 720;

      const xDelta = windowWidth - window.innerWidth;
      const yDelta = windowHeight - window.innerHeight;
      window.moveBy(-xDelta / 2, -yDelta / 2);
      window.resizeBy(xDelta, yDelta);
    }
  }

  start() {
    $super.start.call(this);
    this.resizeGameScreen();
  }
});
