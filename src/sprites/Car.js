export default class Car extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    config.scene.anims.create({
      key: 'carAnime',
      frames: config.scene.anims.generateFrameNumbers('car_anime', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('carAnime', true);

    this.animaFlg = false;
  }
  update(keys, time, delta) {
  }
  hit(target){
    if(!this.animaFlg){
      this.scene.tweens.add({
        targets: this,
        ease: 'liner',
        angle: 270,
        // x: this._scene.game.config.width/2,
        // y: this._scene.game.config.width + this.height,
        duration: 200,
        repeat: 0,
        // onComplete: function () {
        //   _this.appearChildAnime();
          
        // },
      }); 
      this.animaFlg = true;
    }

    //ぶつかったら位置を戻す

    if(target.laneNumber === this.scene.LANE_NUMBER){
      target.y = this.y - target.height/2 - this.height/2;
    }else{
      if(this.scene.LANE_NUMBER === 1 || this.scene.LANE_NUMBER === 2){
        this.x = this.scene.LANE_NUMBER * 60 + 60;
      }else{
        this.x = this.scene.LANE_NUMBER * 60 - 60;
      }
    }

    this.scene.gameOver();

  }
}
