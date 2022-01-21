import { Color3, HemisphericLight, Vector3 } from '@babylonjs/core';

export default class Light {
  constructor() {
    this.light = new HemisphericLight('Light', Vector3.One().scale(0.1));
    this.light.groundColor = Color3.White();
  }
}
