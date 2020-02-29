export default class StoneDiff extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame
    );

    this.x = 0;
    this.y = 0;
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // this.alpha = 0.5;

    // this.active = false;
    // this.visible = false;
    // this.setActive(false);
    // this.setVisible(false);

    /*======
    マスクの追加
    ========*/

    // this.mask = config.scene.make.image({
    //   x: this.x,
    //   y: this.y,
    //   key: 'rect_mask_64x64',
    //   add: false
    // });
    // this.mask.scaleX = 1;
    // this.mask.scaleY = 1;
    // this.maskImage = new Phaser.Display.Masks.BitmapMask(config.scene, this.mask);
    
    // this.setMask(this.maskImage); 
  }

}
