import { Layers } from './constants';

CycloneMapEditor.patchClass(Sprite_Character, $super => class {
  update(...args) {
    if (CycloneMapEditor.active) {
      this.visible = CycloneMapEditor.isLayerVisible(Layers.events);
      if (!this.visible) {
        return;
      }
    }
    $super.update.call(this, ...args);
  }
});
