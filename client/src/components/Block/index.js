import {
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector4,
} from '@babylonjs/core';

import { BLOCK_SIZE } from '../../constants';

export default class Block {
  constructor(name, texture) {
    this.box = MeshBuilder.CreateBox(name, {
      size: BLOCK_SIZE,
      faceUV: [
        new Vector4(0, 0, 1, 1), // Back
        new Vector4(0, 0, 1, 1), // Front
        new Vector4(0, 0, 1, 1), // Right
        new Vector4(0, 0, 1, 1), // Left
        new Vector4(0.9, 0.9, 1, 1), // Up
        new Vector4(0, 0, 0.1, 0.1), // Down
      ],
      wrap: true,
    });
    this.box.checkCollisions = true;

    if (texture) {
      this.addMaterial(texture);
    }
  }

  addMaterial(texture) {
    this.material = new StandardMaterial('BoxMaterial');
    this.material.diffuseTexture = new Texture(texture);
    this.box.material = this.material;
  }

  setPosition(position) {
    this.box.position = position;
  }

  setParent(parent) {
    this.box.parent = parent;
  }
}