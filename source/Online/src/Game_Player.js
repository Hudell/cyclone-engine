import { sendPlayerData } from './sendPlayerData';

CycloneOnline.patchClass(Game_Player, $super => class {
  updateMove(...args) {
    $super.updateMove.call(this, ...args);

    sendPlayerData();
  }
});
