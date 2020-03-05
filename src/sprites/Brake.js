export default class Brake extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    // this.setVisible(false);

    this.alpha = 0;

    this.depth = 60;

    this.animeBrakeFlg = false;

  }
  show(x,y){


    if(!this.animeBrakeFlg){
      this.animeBrakeFlg = true;

      let posX = x;
      let posY = y;
  
      this.x = posX;
      this.y = posY;
      let animeBrake = this.scene.tweens.timeline({
        targets: this,
        tweens: [
        {
          x: posX,
          y: posY - 48,
          scaleX: 0.5,
          scaleY: 0.5,
          alpha: 1,
          duration: 200
        },
        {
          x: posX,
          y: posY - 32,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 200
        }
        ],
        ease: 'liner',
        delay: 0,
        repeat: 0,
        completeDelay: 80,
        callbackScope: this,
        onComplete: function () {
          // this.x = posX - 48;
          // this.y = posY;
          // this.alpha = 1;
        }
      }); 
    }


  }

}
