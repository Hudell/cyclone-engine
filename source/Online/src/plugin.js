import { CyclonePlugin } from '../../Core/main';
import { ReadyState } from './constants';

class CycloneOnline extends CyclonePlugin {
  static register() {
    super.initialize('CycloneOnline');
    super.register({});
  }

  static onOpen() {
    this.sendMessage('Hello');
  }

  static onMessage(messageEvent) {
    if (messageEvent.data === 'pong' || messageEvent.data === 'OK') {
      return;
    }

    if (messageEvent.data === 'PARSE_ERROR') {
      console.error('Server failed to parse our data.');
      return;
    }

    try {
      const data = JSON.parse(messageEvent.data);

      if (Array.isArray(data)) {
        for (const playerData of data) {
          if (playerData.type === 'remove') {
            continue;
          }

          if (playerData.type === 'change') {
            console.log('SHOW actor ', playerData.data.actorId, 'at position', playerData.data.x, playerData.data.y);
            continue;
          }

        }

      }

    } catch(e) {
      console.log(messageEvent.data);
      console.error(e);
      return;
    }
  }

  static onClose() {
    console.log('Connection Closed');
  }

  static onError(e) {
    console.error('Connection Error', e);
  }

  static connectToServer() {
    try {
      this._webSocket = new WebSocket('ws://localhost:8080', 'echo-protocol');
    } catch(e) {
      console.error(e);
      throw new Error('Fatal error when trying to establish connection to server.');
    }

    this._webSocket.onopen = (...args) => {
      this.onOpen(...args);
    };

    this._webSocket.onmessage = (...args) => {
      this.onMessage(...args);
    };

    this._webSocket.onclose = (...args) => {
      this.onClose(...args);
    };

    this._webSocket.onerror = (...args) => {
      this.onError(...args);
    };
  }

  static hideAllPlayers() {
  }

  static ensureConnection() {
    if (this._webSocket && [ReadyState.CLOSED, ReadyState.CLOSING].includes(this._webSocket.readyState)) {
      this._webSocket = undefined;
    }

    if (!this._webSocket) {
      this.pingServer();
    }
  }

  static endConnection() {
    if (!this._webSocket) {
      return;
    }

    this._webSocket.close();
  }

  static sendMessage(message) {
    try {
      if (!this._webSocket) {
        this.connectToServer();
      }

      if (this._timeoutHandler) {
        clearTimeout(this._timeoutHandler);
      }

      switch (this._webSocket.readyState) {
        case ReadyState.CONNECTING:
          console.log('Delaying message to pending connection');
          this._timeoutHandler = setTimeout(() => {
            this.sendMessage(message);
          }, 300);

          break;
        case ReadyState.OPEN:
          console.log('Send message to open connection');
          this._webSocket.send(message);
          this._timeoutHandler = setTimeout(() => {
            this.pingServer();
          }, 2000);

          break;
        case ReadyState.CLOSING:
          console.log('Unable to send message to server because the connection is closing.');
          break;
        case ReadyState.CLOSED:
          console.log('Unable to send message to server because the connection is closed.');
          break;
      }
    } catch(e) {
      console.log('Failed to send message to online server.');
      console.error(e);
    }
  }

  static pingServer() {
    this.sendMessage('ping');
  }

  static sendCurrentPlayerData() {
    this.sendMessage(JsonEx.stringify({
      actorId: $gameParty._actors[0],
      mapId: $gameMap._mapId,
      x: $gamePlayer._x,
      y: $gamePlayer._y,
      d: $gamePlayer._direction,
    }));
  }
}

globalThis.CycloneOnline = CycloneOnline;
CycloneOnline.register();

