import { Color3 } from '@babylonjs/core';

import Ground from './Ground';
import Walls from './Walls';
import Obstacles from './Obstacles';

export default class World {
  constructor(scene) {
    this.ground = new Ground();
    this.walls = new Walls();
    this.obstacles = new Obstacles();

    // "Raw" sky setting, used instead of Skybox
    scene.clearColor =    Color3.FromHexString('#70b642');
  }
}
