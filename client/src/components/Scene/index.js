import { Engine, Scene as BabylonJsScene } from '@babylonjs/core';
import '@babylonjs/inspector'; // Needed for showing the inspector

import Light from './Light';
import Camera from './Camera';
import World from '../World';

export default class Scene {
  constructor() {
    // Canvas used for create the WebGL context that will be used by the enginge
    this.canvas = document.querySelector('#renderCanvas');

    // Engine used for creating the scene
    this.engine = new Engine(this.canvas, true);
    this.scene = new BabylonJsScene(this.engine);

    this.scene.collisionsEnabled = true;

    // Render the scene: function called every frame
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    this.showInspector();

    this.createCamera();
    this.createLight();

    this.createWorld();
  }
  
  getBabylonScene() {
    return this.scene;
  }

  showInspector() {
    this.scene.debugLayer.show({
      embedMode: true,
    });
  }

  createCamera() {
    this.camera = new Camera(this.canvas);
  }

  getBabylonCamera() {
    return this.scene.activeCamera;
  }

  createLight() {
    this.light = new Light();
  }

  createWorld() {
    this.world = new World(this.scene);
  }
}
