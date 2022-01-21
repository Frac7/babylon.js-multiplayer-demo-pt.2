import { Vector3 } from '@babylonjs/core';

export const objectToVector3 = object => new Vector3(object.x, object.y, object.z);

export const vector3ToObject = (vector) => ({
  x: vector.x,
  y: vector.y,
  z: vector.z
});
