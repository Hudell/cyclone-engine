let delaysTried = 0;

const addFilter = () => {
  if (!window.CycloneMagic) {
    if (delaysTried > 10) {
      return;
    }

    setTimeout(addFilter, 100);
    delaysTried++;
    return;
  }

  CycloneMapEditor.patchClass(window.CycloneMagic.SpriteBlenderTile, $super => class {
    update() {
      $super.update.call(this);
      this.visible = CycloneMapEditor.isLayerVisible(1);
    }
  });
};

setTimeout(addFilter, 200);