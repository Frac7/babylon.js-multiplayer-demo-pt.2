import {
  MeshBuilder,
  StandardMaterial,
  Texture,
  CubeTexture,
} from '@babylonjs/core';

import { WORLD_SIZE } from '../../../constants';

export default class SkyBox {
  constructor() {
    this.skyBox = MeshBuilder.CreateBox('SkyBox', { size: WORLD_SIZE });
    this.skyBox.checkCollisions = true;

    this.addMaterial();
  }

  addMaterial() {
    const material = new StandardMaterial('SkyBox');
    // Show material in "hidden faces"
    material.backFaceCulling = false;
    material.reflectionTexture = new CubeTexture(
      'assets/textures/TropicalSunnyDay',
    );
    material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    material.disableLighting = true;

    this.skyBox.material = material;
  }
}