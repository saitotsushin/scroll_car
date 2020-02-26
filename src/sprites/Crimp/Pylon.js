import Base from './Base';

export default class Pylon extends Base {

  constructor(config) {

    super(config);



    this.setImmovable(true);/*ぶつかっても影響を受けない*/

  }
}