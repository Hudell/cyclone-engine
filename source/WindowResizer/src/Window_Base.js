import { WindowEffects } from './WindowEffects';

WindowResizer.patchClass(Window_Base, $super => class {
  update(...args) {
    if (WindowResizer.active && !(this instanceof WindowEffects)) {
      return;
    }

    $super.update.call(this, ...args);
  }
});