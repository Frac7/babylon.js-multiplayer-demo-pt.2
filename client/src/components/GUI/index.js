import { AdvancedDynamicTexture, TextBlock, Rectangle, Control } from '@babylonjs/gui';

export default class GUI {
  constructor(scene) {
    this.createPanel(scene);
  }

  createPanel(scene) {
    const fullScreenGUI = AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene);

    this.panel = new Rectangle('Panel');
    this.panel.width = 0.25;
    this.panel.height = 0.25;
    this.panel.alpha = 0.75;
    this.panel.background = 'white';
    this.panel.thickness = 0;
    
    this.panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    fullScreenGUI.addControl(this.panel);

    this.textBlock = new TextBlock();
    this.textBlock.fontSize = 18;

    this.panel.addControl(this.textBlock);
  }

  addText(text) {
    this.textBlock.text = text;
  }
}