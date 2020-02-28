import Item from './Item';

export default class Coin extends Item {
  constructor(config) {
    super(config);
    this.coinPoint = 1;
    config.scene.anims.create({
      key: 'coinAnime',
      frames: config.scene.anims.generateFrameNumbers('coin_anime', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.play('coinAnime', true);
  }

  hit(){
    if(this.active && this.visible){
      this.scene.registry.list.coin += this.coinPoint;
      this.scene.CoinCount.getCoin();
      this.setActive(false);
      this.setVisible(false);
    }
  }
}