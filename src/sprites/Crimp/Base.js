export default class Base extends Phaser.Physics.Arcade.Sprite {
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
    console.log(this)
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.active = false;
    this.visible = false;
    this.setActive(false);
    this.setVisible(false);


    // this.depth = 1;

    this.SCROLL_SPEED = config.scene.SCROLL_SPEED;
  }
  update(keys, time, delta) {

    if(!this.active){
      return;
    }
    if(this.y > this.scene.game.config.height){
      this.setActive(false);
      this.setVisible(false);
      return;
    }

    if(this.active){
      this.y += this.SCROLL_SPEED;
    }

  }
}
