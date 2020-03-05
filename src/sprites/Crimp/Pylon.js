import Base from './Base';

export default class Pylon extends Base {

  constructor(config) {

    super(config);

    // this.setCircle(32);
    // this.setCollideWorldBounds(true);

    this.body.setSize(30,40);
    this.setOrigin(0.5, 0.8);

    this.setImmovable(true);/*ぶつかっても影響を受けない*/

  }
}