import Base from './Base';

export default class Pylon extends Base {

  constructor(config) {

    super(config);

    this.setCircle(32);
    // this.setCollideWorldBounds(true);

    this.body.setSize(46,46)

    this.setImmovable(true);/*ぶつかっても影響を受けない*/

  }
}