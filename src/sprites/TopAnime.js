export default class TopAnime extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key,config.frame);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    
    // this.key = "stone"
    config.scene.anims.create({
      key: 'topAnime',
      frames: config.scene.anims.generateFrameNumbers('top_anime', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('topAnime', true);
  }
  update(keys, time, delta) {
    
  }
}
