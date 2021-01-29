import { CyclonePlugin } from '../../Core/main';

class GGJ extends CyclonePlugin {
  static register() {
    super.initialize('GGJ');

    super.register({});
  }

}

globalThis.GGJ = GGJ;
GGJ.register();
