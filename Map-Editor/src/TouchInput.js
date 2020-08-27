CycloneMapEditor.patchClass(TouchInput, $super => class {
  static _onLeftButtonDown(event) {
    $super._onLeftButtonDown.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.updateMouse();
    }
  }

  static _onMouseMove(event) {
    $super._onMouseMove.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.updateMouse();
      SceneManager._scene.updateRightMouse();
    }
  }

  static _onMouseUp(event) {
    $super._onMouseUp.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      if (event.button === 0) {
        SceneManager._scene.updateMouse();
      } else if (event.button === 2) {
        CycloneMapEditor.isRightButtonDown = false;
        SceneManager._scene.updateRightMouse();
      }
    }
  }

  static _onRightButtonDown(event) {
    $super._onRightButtonDown.call(this, event);

    if (SceneManager._scene instanceof Scene_Map) {
      CycloneMapEditor.isRightButtonDown = true;
      SceneManager._scene.updateRightMouse();
    }
  }
});
