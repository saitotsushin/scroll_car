import Item from './Item';

export default class Coin extends Item {
  constructor(config) {
    super(config);
    this.coinPoint = 1;

  }

  hit(){
    if(this.active && this.visible){
      this.scene.registry.list.coin += this.coinPoint;
      this.setActive(false);
      this.setVisible(false);
    }
  }
}