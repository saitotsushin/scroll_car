export default class CoinCount extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // config.scene.anims.create({
    //   key: 'carAnime',
    //   frames: config.scene.anims.generateFrameNumbers('car_anime', { start: 0, end: 1 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    this.x = config.scene.game.config.width - 20;
    this.y = 20;

    this.animaFlg = false;
    config.scene.anims.create({
      key: 'coinGetAnimeS',
      frames: config.scene.anims.generateFrameNumbers('coin_anime_s', { start: 0, end: 6 }),
      frameRate: 6,
      repeat: 1
    });
    config.scene.anims.create({
      key: 'coinWaitAnimeS',
      frames: config.scene.anims.generateFrameNumbers('coin_anime_s', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
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

    // this.coinText.setText(
    //   config.scene.registry.list.coin
    // );
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
