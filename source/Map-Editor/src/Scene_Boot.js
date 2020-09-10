CycloneMapEditor.patchClass(Scene_Boot, $super => class {
  resizeScreen() {
    if (Utils.isNwjs() && $dataSystem.advanced.screenWidth < 1280) {
      const minWidth = screen.availWidth - (window.outerWidth - window.innerWidth);
      const minHeight = screen.availHeight - (window.outerHeight - window.innerHeight);

      const { screenWidth, screenHeight, uiAreaWidth, uiAreaHeight } = $dataSystem.advanced;

      if (screenWidth < minWidth) {
        $dataSystem.advanced.screenWidth = minWidth;
      }
      if (uiAreaWidth < minWidth) {
        $dataSystem.advanced.uiAreaWidth = minWidth;
      }

      if (screenHeight < minHeight) {
        $dataSystem.advanced.screenHeight = minHeight;
      }
      if (uiAreaHeight < minHeight) {
        $dataSystem.advanced.uiAreaHeight = minHeight;
      }
    }

    $super.resizeScreen.call(this);
  }

});
