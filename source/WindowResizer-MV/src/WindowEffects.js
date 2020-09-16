import { WindowEffects } from '../../WindowResizer/src/WindowEffects';

WindowResizer.patchClass(WindowEffects, $super => class {
  initialize(rect) {
    $super.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
  }

  clearBackContents() {

  }

  standardPadding() {
    return 0;
  }
});