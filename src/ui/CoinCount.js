export default class CoinCount extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.x = config.scene.game.config.width - 20;
    this.y = 20;

    this.animaFlg = false;

    this.coinText = config.scene.add.bitmapText(
      config.scene.game.config.width - 26,
      28,
      'bitmapFont',
      'x',
      30,
      {
        align: 'right'
      }
    );    
    this.coinText = config.scene.add.bitmapText(
      config.scene.game.config.width - 10,
      40,
      'bitmapFont',
      config.scene.registry.list.coin,
      40,
      {
        align: 'right'
      }
    );
    this.coinText.setOrigin(1, 0);
    this.anims.play('coinWaitAnimeS', true);
  }
  update(){
    this.coinText.setText(
      this.scene.registry.list.coin
    );
  }
  getCoin(){
    this.anims.play('coinGetAnimeS', true);
 
    let anime = this.scene.tweens.timeline({
      targets: this,
      tweens: [
      {
        y: 20,
        scaleX: 1,
        scaleY: 1,
        duration: 100
      },
      {
        y: 10,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 100
      },
      {
        y: 20,
        scaleX: 1,
        scaleY: 1,
        duration: 100
      }
      ],
      ease: 'liner',
      duration: 400,
      repeat: 0,
      callbackScope: this
    }); 

    this.animaFlg = true;
  }
}
