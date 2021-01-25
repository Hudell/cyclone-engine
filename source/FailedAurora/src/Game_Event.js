CycloneAurora.patchClass(Game_Event, $super => class {
  registerLight(lightId) {
    $super.registerLight.call(this, lightId);
    if (SceneManager._scene?._spriteset?._lighting) {
      SceneManager._scene._spriteset._lighting.addEvent(this);
    }
  }

  setupPage(...args) {
    $super.setupPage.call(this, ...args);
    this.clearLight();
  }
});
