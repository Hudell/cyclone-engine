const { server: WebSocketServer } = require('websocket');
const http = require('http');

const server = http.createServer((request, response) => {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080, () => {
  console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const positions = {

};

wsServer.on('request', (request) => {
  console.log('ORIGIN', request.origin);

  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  const playerId = `${(new Date().toISOString())}-${ Math.floor(Math.random() * 100000) }`;
  let mapId = 0;
  let lastPlayerList = [];

  console.log((new Date()) + ' Connection accepted.', playerId);

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      if (message.utf8Data === 'ping') {
        connection.sendUTF('pong');
        return;
      }

      try {
        const obj = JSON.parse(message.utf8Data);

        mapId = obj.mapId;
        positions[playerId] = obj;
      } catch(e) {
        connection.sendUTF('PARSE_ERROR');
        return;
      }

      connection.sendUTF('OK');
    }
  });

  let intervalHandler = setInterval(() => {
    const otherPlayers = {};
    const changedPlayers = [];
    for (let id in positions) {
      if (id === playerId) {
        continue;
      }

      if (mapId !== positions[id].mapId) {
        if (lastPlayerList[id] === undefined) {
          continue;
        }
        changedPlayers.push({
          type: 'remove',
          id,
        });
      }

      otherPlayers[id] = positions[id];
    }

    for (let id in otherPlayers) {
      const {x, y, actorId, mapId, d } = otherPlayers[id];
      const old = lastPlayerList[id];

      if (old && x === old.x && y === old.y && d === old.d && actorId === old.actorId && mapId === old.mapId) {
        continue;
      }

      changedPlayers.push({
        type: 'change',
        id,
        data: otherPlayers[id],
      });
    }

    lastPlayerList = otherPlayers;
    connection.sendUTF(JSON.stringify(changedPlayers));
  }, 1000);

  connection.on('close', (reasonCode, description) => {
    delete positions[playerId];
    clearInterval(intervalHandler);
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
