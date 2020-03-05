export default class Car extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.anims.play('carAnime', true);

    this.animaFlg = false;
    // this.setCircle(32);
    this.setImmovable(true);/*ぶつかっても影響を受けない*/

    this.laneNumber = 0;
  }
  update(keys, time, delta) {
  }
  hit(target){
    if(!this.animaFlg){
      this.scene.tweens.add({
        targets: this,
        ease: 'liner',
        angle: 10,
        duration: 40,
        repeat: 0
      }); 
      this.animaFlg = true;
    }

    //ぶつかったら位置を戻す
    // console.log("target.laneNumber",target.laneNumber)
    // console.log("this.scene.LANE_NUMBER",this.scene.LANE_NUMBER)

    // if(target.laneNumber === this.scene.LANE_NUMBER){
    //   // target.y = this.y - target.height/2 - this.height/2;
      
    // }else{
    //   if(this.scene.LANE_NUMBER === 1 || this.scene.LANE_NUMBER === 2){
    //     this.x = this.scene.LANE_NUMBER * 60;
    //   }else{
    //     this.x = this.scene.LANE_NUMBER * 60;
    //   }
    // }
    // this.scene.Stone.tilePositionY += 100;

    this.scene.gameOver();

  }
}
