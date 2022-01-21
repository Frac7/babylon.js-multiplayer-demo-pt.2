import Scene from '../Scene';
import GUI from '../GUI';
import Player from '../Player';

import { INIT, SPAWN, MOVEMENT, REMOVE, OTHERS } from './constants';

export default class Client {
  constructor() {    
    this.players = [];
  
    this.ws = new WebSocket('ws://localhost:5000');

    this.ws.onopen = () => {
      this.scene = new Scene();
      this.GUI = new GUI(this.scene.getBabylonScene());
    }

    this.ws.onmessage = msg => {
      const { id, command, payload } = JSON.parse(msg.data);
      const player = this.players.find(playerItem => playerItem.id === id);
      
      // Connection parameters
      if (command === INIT) {
        const player = new Player(id, payload.transform, true, { camera: this.scene.getBabylonCamera(), scene: this.scene.getBabylonScene() });
        this.players.push(player);
        this.updateBillboard();

        // 3a - Execute cb for each notification
        player.getBabylonPlayer().onTransformChange.add((position) => {
          const stringifiedPosition = JSON.stringify(position);
          this.ws.send(stringifiedPosition);
        });
      }

      if (command === OTHERS) {
        payload.others.forEach(({ id, transform }) => {
          const player = new Player(id, transform, false, { scene: this.scene.getBabylonScene() });
          this.players.push(player);
        });
        this.updateBillboard();
      }

      // Other client connection parameters
      if (command === SPAWN) {
        const player = new Player(id, payload.transform, false, { scene: this.scene.getBabylonScene() });
        this.players.push(player);
        this.updateBillboard();
      }

      if (command === MOVEMENT) {
        player.place(payload.transform);
      }

      if (command === REMOVE) {
        player.remove();
        this.players = this.players.filter(playerItem => playerItem.id !== id);
        this.updateBillboard();
      }
    };
  }

  updateBillboard() {
    this.GUI.addText(this.players.map(player => `Player ${player.id}`).join('\n'));
  }
}
