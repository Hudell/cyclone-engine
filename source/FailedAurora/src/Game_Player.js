CycloneAurora.patchClass(Game_Player, $super => class {
  registerLight(lightId) {
    $super.registerLight.call(this, lightId);
    if (SceneManager._scene?._spriteset?._lighting) {
      SceneManager._scene._spriteset._lighting.addPlayer();
    }
  }
});
