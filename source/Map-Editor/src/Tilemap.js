import { Layers } from './constants';

CycloneMapEditor.patchClass(Tilemap, $super => class {
  _readMapData(x, y, z) {
    if (z <= 4 && !CycloneMapEditor.layerVisibility[z]) {
      return 0;
    }

    const tileIndex = CycloneMapEditor.tileIndex(x, y, z);
    if (CycloneMapEditor.previewChanges?.[tileIndex] !== undefined) {
      return CycloneMapEditor.previewChanges[tileIndex];
    }

    return $super._readMapData.call(this, x, y, z);
  }

  canUpdateAnimationCount() {
    if (CycloneMapEditor.active && CycloneMapEditor.isLayerVisible(Layers.blend) && TouchInput.isPressed()) {
      return false;
    }

    return true;
  }

  update() {
    // Prevent the water animation while modifying blending
    if (!this.canUpdateAnimationCount()) {
      this.animationCount--;
    }

    $super.update.call(this);
  }
});
