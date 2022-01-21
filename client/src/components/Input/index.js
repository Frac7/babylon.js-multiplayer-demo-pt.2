import { ActionManager, ExecuteCodeAction, Vector3 } from '@babylonjs/core';

import { inputToAxisMapping } from './constants';

export default class Input {
  constructor(scene) {
    this.scene = scene;

    this.speed = 10;
    this.translation = Vector3.Down();

    this.createActionManager();
  }

  createActionManager() {
    this.scene.actionManager = new ActionManager(this.scene);

    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, event => {
        const inputKey = event.sourceEvent.key;
        const axis = inputToAxisMapping[inputKey]?.axis;
        if (axis) {
          this.translation[axis] = 0;
        }
      }),
    );

    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, event => {
        const inputKey = event.sourceEvent.key;
        const axis = inputToAxisMapping[inputKey]?.axis;
        if (axis) {
          this.translation[axis] = inputToAxisMapping[inputKey]?.direction;
        }
      }),
    );
  }
}
