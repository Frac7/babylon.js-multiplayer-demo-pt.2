class Player {
  transform = {
    position: {
      x: 0,
      y: 3,
      z: 0,
    }
  };

  constructor(ws) {
    this.ws = ws;
    this.id = new Date().getTime();
  }

  // Connection parameters
  processInit() {
    return JSON.stringify({
      id: this.id,
      command: 'init',
      payload: { transform: this.transform },
    });
  }

  // Other client connection parameters
  processSpawn() {
    return JSON.stringify({
      id: this.id,
      command: 'spawn',
      payload: { transform: this.transform },
    });
  }

  processMovement(movementMessage) {
    const { position } = JSON.parse(movementMessage);
    this.transform.position = position;

    return JSON.stringify({
      id: this.id,
      command: 'movement',
      payload: { transform: this.transform },
    });
  }

  processRemove() {
    return JSON.stringify({
      id: this.id,
      command: 'remove',
    });
  }
}

module.exports = Player;
