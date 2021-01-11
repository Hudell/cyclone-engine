import { throttle } from '../../Utils/throttle';

export const sendPlayerData = throttle(() => {
  CycloneOnline.sendCurrentPlayerData();
}, 500);