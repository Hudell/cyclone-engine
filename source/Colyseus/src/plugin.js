import { CyclonePlugin } from '../../Core/main';
import { throttle } from '../../Utils/throttle';

let client;

const sendPosition = throttle((room) => {
  // room.send('move', {
  //   x: $gamePlayer._x,
  //   y: $gamePlayer._y,
  // });
}, 300);

class CycloneColyseus extends CyclonePlugin {
  static register() {
    super.initialize('CycloneColyseus');

    super.register({});
  }

  static get serverUrl() {
    return 'ws://localhost:2567';
  }

  static get client() {
    if (client) {
      return client;
    }

    if (!globalThis.Colyseus) {
      throw new Error('The core file of Colyseus.js was not found. It needs to be added to your plugin list along with CycloneColyseus.');
    }

    client = new globalThis.Colyseus.Client(this.serverUrl);
    return client;
  }

  static connectToLobby() {
    this.client.joinOrCreate('battle_room', {
      name: 'Player',
    }).then(room => {
      this._room = room;

      room.onStateChange((state) => {
        console.log(room.name, 'has new state:', state);
      });

      room.onMessage('join', (message) => {
        console.log(client.id, 'join', room.name, message);
      });

      room.onError((code, message) => {
        console.log(client.id, 'couldn\'t join', room.name);
      });

      room.onLeave((code) => {
        console.log(client.id, 'left', room.name);
      });
    });
  }

  static sendPlayerPosition() {
    if (!this._room) {
      return;
    }

    sendPosition(this._room);
  }
}

globalThis.CycloneColyseus = CycloneColyseus;
CycloneColyseus.register();