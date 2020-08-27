CycloneMapEditor.patchClass(SceneManager, $super => class {
  static onSceneTerminate() {
    CycloneMapEditor.refreshMenuVisibility();
  }
});

