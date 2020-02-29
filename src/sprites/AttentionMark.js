export default class AttentionMark extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.visible = false;
    this.depth = 30;
  }
  tick(){
    let markTickTween = this.scene.tweens.timeline({
      targets: this,
      ease: 'liner',
      duration: 100,
      tweens:[
      {
        alpha: 1,
        duration: 10
      },
      {
        alpha: 0,
        duration: 10
      }
      ],
      delay: 40,
      repeat: 4,
      completeDelay: 80,
      callbackScope: this,
      onComplete: function () {
        this.alpha = 1;
      }
    });  
  }
}
