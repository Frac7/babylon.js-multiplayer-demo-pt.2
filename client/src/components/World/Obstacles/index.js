import { TransformNode, Angle } from '@babylonjs/core';

import Block from '../../Block';

import { BLOCK_SIZE } from '../../../constants';

export default class Obstacles {
  constructor() {
    this.obstacles = new TransformNode('Obstacles');

    this.blocksPerStripe = 16;
    this.stripes = 3;
    this.verticalCoordinate = BLOCK_SIZE / 2;

    const block = new Block('Obstacle', 'assets/textures/blue-block.jpg');
    this.originalBox = block.box;
    this.originalBox.position.y = this.verticalCoordinate;

    this.place();

    block.addMaterial('assets/textures/green-block.jpg');
  }

  createStripe() {
    const stripe = new TransformNode('Stripe');
    stripe.parent = this.obstacles;

    let i = BLOCK_SIZE / 2;
    for (i; i < this.blocksPerStripe; i += BLOCK_SIZE) {
      const leftBox = this.originalBox.clone('Box', stripe);
      leftBox.position.x = -i;
      leftBox.position.y = 0;
      leftBox.position.z = 0;

      const rightBox = this.originalBox.clone('Box', stripe);
      rightBox.position.x = i;
      rightBox.position.y = 0;
      rightBox.position.z = 0;
    }

    return stripe;
  }

  place() {
    const leftStripe = this.createStripe();
    leftStripe.position.x = -5;
    leftStripe.position.y = this.verticalCoordinate;
    leftStripe.position.z = -20;
    
    const rightStripe = this.createStripe();
    rightStripe.position.x = 5;
    rightStripe.position.y = this.verticalCoordinate;
    rightStripe.position.z = 20;

    const downStripe = leftStripe.clone('Stripe', this.obstacles);
    downStripe.rotation.y = Angle.FromDegrees(90).radians();
    downStripe.position.x = -5;
    downStripe.position.z = 0;

    const upStripe = downStripe.clone('Stripe', this.obstacles);
    upStripe.position.x = 5;
  }
}
