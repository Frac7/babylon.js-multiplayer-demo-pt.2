import {
  MeshBuilder,
  StandardMaterial,
  Texture,
} from '@babylonjs/core';

import { WORLD_SIZE, GROUND_REPEAT_TEXTURE } from '../../../constants';

export default class Ground {
  constructor() {
    this.ground = MeshBuilder.CreateGround(
      'Ground',
      {
        width: WORLD_SIZE,
        height: WORLD_SIZE,
      },
    );
    this.ground.checkCollisions = true;

    this.addMaterial();
  }

  addMaterial() {
    const material = new StandardMaterial('GroundMaterial');

    material.diffuseTexture = new Texture('assets/textures/bg-tile.gif');
    // Texture scale (repeat texture)
    material.diffuseTexture.uScale = GROUND_REPEAT_TEXTURE;
    material.diffuseTexture.vScale = GROUND_REPEAT_TEXTURE;

    this.ground.material = material;
  }
}