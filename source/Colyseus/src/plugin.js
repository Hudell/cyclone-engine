import '../../Core/main.min';

let client;

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
}

globalThis.CycloneColyseus = CycloneColyseus;
CycloneColyseus.register();