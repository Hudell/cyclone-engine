import { WindowEffects } from './WindowEffects';

WindowResizer.patchClass(Scene_Base, $super => class {
  start() {
    $super.start.call(this);

    this.createWindowResizer();
  }

  createWindowResizer() {
    this._windowResizer = new WindowEffects(new Rectangle(0, 0, Graphics.width, Graphics.height));
    this.addChild(this._windowResizer);

    this._windowResizer.hide();
  }

  findAllWindows() {
    return WindowResizer.findChildWindows(this);
  }

});