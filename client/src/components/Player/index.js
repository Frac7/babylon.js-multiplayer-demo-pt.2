import {
  StandardMaterial,
  MeshBuilder,
  Observable,
  ReflectionProbe,
  Color3,
  Vector3,
  Sound
} from '@babylonjs/core';

import Input from '../Input';

import { objectToVector3, vector3ToObject } from '../../utilities';
import { WORLD_SIZE, PLAYER_DIAMETER } from '../../constants';

export default class Player {
  constructor(id, transform, isCurrentPlayer, { scene, camera } = {}) {
    this.id = id;
    this.isCurrentPlayer = isCurrentPlayer;
    this.scene = scene;

    this.player = new MeshBuilder.CreateSphere(`Player ${id}`, {
      segments: 16,
      diameter: PLAYER_DIAMETER,
    });
    this.player.checkCollisions = true;
    this.player.ellipsoid = Vector3.One();

    this.crashSound = new Sound('Crash', 'assets/sounds/crash.wav', this.scene);

    if (this.isCurrentPlayer) {
      this.camera = camera;
      this.camera.lockedTarget = this.player;

      // 1a - Add observable prop
      this.player.onTransformChange = new Observable();

      this.input = new Input(this.scene, this.player);

      this.renderObserver = this.scene.onBeforeRenderObservable.add(() => {
        const translation = this.input.translation;
        const speed = this.input.speed;

        if (translation.x || translation.z) {
          this.move(translation, speed);
          // 2a - Notify observable changes to all observers
          this.player.onTransformChange.notifyObservers({
            position: vector3ToObject(this.player.position),
          });
        }
      });
    }

    this.place(transform);
    this.generateMaterial();

    // 2b - If moveWithCollisions detect a collision, it is intercepted by this function
    this.collideObserver = this.player.onCollideObservable.add((mesh) => {
      if (mesh.id.includes('Player')) {
        this.crashSound.play();
      }
    });
  }

  getBabylonPlayer() {
    return this.player;
  }

  generateMaterial() {
    const material = new StandardMaterial('PlayerMaterial');

    const playerProbe = new ReflectionProbe('PlayerProbe', WORLD_SIZE, this.scene);
    playerProbe.renderList.push(this.scene.getMeshByName('SkyBox'), this.scene.getMeshByName('Ground'));

    material.reflectionTexture = playerProbe.cubeTexture;
    material.diffuseColor = Color3.Black();

    this.player.material = material;
    playerProbe.attachToMesh(this.player);
  }

  move(translation, speed) {
    const deltaTime = this.scene.getEngine().getDeltaTime() / 1000;
    const velocity = translation.scale(speed * deltaTime);

    // 1b - Move the player using this function
    this.player.moveWithCollisions(velocity);
  }

  place(transform) {
    const { position } = transform;
    const positionToVector3 = objectToVector3(position);

    this.player.position = positionToVector3;
  }

  remove() {
    if (this.isCurrentPlayer) {
      this.scene.onBeforeRenderObservable.remove(this.renderObserver);
      this.player.onCollideObservable.remove(this.collideObserver);
    }
    this.player.dispose();
  }
}
