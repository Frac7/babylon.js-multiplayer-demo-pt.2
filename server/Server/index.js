const WebSocket = require('ws');

const Player = require('../Player');

class Server {
  constructor() {
    this.players = [];

    this.server = new WebSocket.Server({ host: '0.0.0.0', port: 5000 });

    this.server.on('connection', (ws, req) => {
      const player = new Player(ws);

      const initMessage = player.processInit();
      player.ws.send(initMessage);

      if (this.players.length) {
        this.sendOthersPosition(player);

        const spawnMessage = player.processSpawn();
        this.sendToEveryoneElse(player.id, spawnMessage);
      }

      this.players.push(player);

      ws.on('message', msg => {
        const movementMessage = player.processMovement(msg);

        if (this.players.length) {
          this.sendToEveryoneElse(player.id, movementMessage);
        }
      });

      ws.on('close', () => {
        const removeMessage = player.processRemove();

        if (this.players.length) {
          this.sendToEveryoneElse(player.id, removeMessage);

          this.players = this.players.filter(
            playerItem => playerItem.id !== player.id,
          );
        } else {
          this.players = [];
        }
      });
    });
  }

  sendToEveryoneElse(playerId, msg) {
    this.players.forEach(player => {
      if (player.id !== playerId) {
        player.ws.send(msg);
      }
    });
  }

  sendOthersPosition(player) {
    const msg = JSON.stringify({
      id: player.id,
      command: 'others',
      payload: {
        others: this.players
        .filter(playerItem => playerItem.id !== player.id)
        .map(playerItem => ({
          id: playerItem.id,
          transform: playerItem.transform,
        })),
      },
    });
    player.ws.send(msg);
  }
}

module.exports = Server;
