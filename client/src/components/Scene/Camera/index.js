import { FollowCamera, Vector3 } from '@babylonjs/core';

export default class Camera {
  constructor(canvas) {
    this.camera = new FollowCamera('Camera', new Vector3(0, 2.5, 0));

    // Collision checks
    this.camera.checkCollision = true;
    this.camera.ellipsoid = new Vector3(1.25, 1.25, 1.25);

    // Attach the input control to the canvas
    this.camera.attachControl(canvas, true);

    this.camera.fov = 1.5;

    // Disable camera horizontal rotation
    this.camera.upperRotationOffsetLimit = 0;
    this.camera.lowerRotationOffsetLimit = 0;

    this.camera.heightOffset = 25;

    // Prevent the camera from going under the ground
    this.camera.lowerHeightOffsetLimit = 2;
    // Prevent the camera from reversing the view
    this.camera.lowerRadiusLimit = 0; 
  }
}
