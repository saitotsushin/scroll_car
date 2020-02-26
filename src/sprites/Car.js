export default class Car extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
  }
  update(keys, time, delta) {
  }
  hit(){
    this.scene.gameOver();
  }
}
