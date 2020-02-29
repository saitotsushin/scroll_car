import Item from './Item';

export default class Coin extends Item {
  constructor(config) {
    super(config);
    this.coinPoint = 1;
    // this.body.width = 64;
    // this.body.height = 64;
    // this.setOrigin(0.5,0.5);

    this.anims.play('coinAnime', true);


    this.getFlg = false;
    this.depth = 20;
  }

  hit(){
    if(!this.getFlg){
      this.getFlg = true;
      this.anims.play('coinGetAnime', true);
      
      let coinGetTween = this.scene.tweens.timeline({
        targets: this,
        ease: 'liner',
        duration: 100,
        tweens:[
        {
          y: this.y - 60,
          angle: 40,
          duration: 100
        },
        {
          y: this.y,
          angle: 40,
          duration: 100
        }
        ],
        delay: 0,
        repeat: 0,
        completeDelay: 80,
        callbackScope: this,
        onComplete: function () {
          this.setActive(false);
          this.setVisible(false);
        }
      });  
      
      this.scene.registry.list.coin += this.coinPoint;
      this.scene.UIManager.CoinCount.getCoin();
    }
  }
  resetAnime(){
    this.anims.play('coinAnime', true);
    this.angle = 0;
  }
}