import { TransformNode, Angle } from '@babylonjs/core';

import { BLOCK_SIZE, WORLD_SIZE } from '../../../constants';
import Block from '../../Block';

export default class Walls {
  constructor() {
    this.walls = new TransformNode('Walls');

    // Blocks per side without corners
    this.blocksPerSide = WORLD_SIZE / 2 - 2;

    // x and z max/min coordinates to place blocks for each side
    this.horizontalCoordinate = WORLD_SIZE / 2 - BLOCK_SIZE;
    this.verticalCoordinate = BLOCK_SIZE / 2;

    const block = new Block('WallBlock', 'assets/textures/red-block.jpg');
    this.originalBox = block.box;

    this.placeSides();

    this.originalBox.setEnabled(false);
  }

  placeSides() {
    const upSide = new TransformNode('UpWall');
    upSide.position.y = this.verticalCoordinate;
    upSide.position.z = this.horizontalCoordinate;
    upSide.parent = this.walls;

    let i = 1 + BLOCK_SIZE / 2;
    for (i; i < this.blocksPerSide; i += BLOCK_SIZE) {
      const leftBox = this.originalBox.clone('Box', upSide);
      leftBox.position.x = -i;
      leftBox.position.y = 0;
      leftBox.position.z = 0;

      const rightBox = this.originalBox.clone('Box', upSide);
      rightBox.position.x = i;
      rightBox.position.y = 0;
      rightBox.position.z = 0;
    }

    const downSide = upSide.clone('DownWall', this.walls);
    downSide.position.z = -upSide.position.z;

    const leftSide = upSide.clone('LeftWall', this.walls);
    leftSide.rotation.y = Angle.FromDegrees(-90).radians();
    leftSide.position.x = -this.horizontalCoordinate;
    leftSide.position.z = 0;

    const rightSide = upSide.clone('RightWall', this.walls);
    rightSide.rotation.y = Angle.FromDegrees(90).radians();
    rightSide.position.x = this.horizontalCoordinate;
    rightSide.position.z = 0;
  }
}
