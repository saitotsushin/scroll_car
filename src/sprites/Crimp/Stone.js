export default class Stone extends Phaser.GameObjects.TileSprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.width,
      config.height,
      config.key,
      config.frame
    );

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.laneNumber = 0;

    this.active = false;
    this.visible = false;
    this.setActive(false);
    this.setVisible(false);

    this.dispTimer = 0;

    this.StoneDiff = config.scene.add.sprite(
      40,
      40,
      'stone'
    );
    this.StoneDiff.setActive(false);
    this.StoneDiff.setVisible(false);
    this.StoneDiff.depth = 20;
    config.scene.physics.world.enable(this.StoneDiff);
    config.scene.add.existing(this.StoneDiff);
    // this.y = this.game.config.height/2 * -1 - this.LEVEL*this.game.config.height;
    // this.body.setSize(64,this.game.config.height * this.LEVEL*2)
    // this.body.height = this.game.config.height * this.LEVEL*2;
    // this.depth = 1;

    this.SCROLL_SPEED = config.scene.SCROLL_SPEED;
    this.diffHeight = 0;
  }
  update(time, delta) {

    if(!this.active){
      return;
    }

    if(this.y >= this.scene.game.config.height*1.5){
      this.setActive(false);
      this.setVisible(false);
      this.StoneDiff.setActive(false);
      this.StoneDiff.setVisible(false);
      this.diffHeight = 0;
      this.tilePositionY = 0;
      this.laneNumber = 0;
      return;
    }

    if(this.active){
      this.dispTimer -= delta;
      if(this.dispTimer <= 0){
        // this.StoneDiff.x = this.x;
        this.scene.AttentionMark.setVisible(false);
        if(this.diffHeight === 0){
          this.diffHeight = this.tilePositionY % 64 / 2;
          if(this.diffHeight === 0){
          }else{
            this.diffHeight *= -1;
            this.StoneDiff.setActive(true);
            this.StoneDiff.setVisible(true);
          }
          console.log("this.diffHeight",this.diffHeight)
          this.StoneDiff.y = this.diffHeight;
        }
        this.StoneDiff.y += this.scene.SCROLL_SPEED;
        this.y += this.scene.SCROLL_SPEED;
        return;
      }
      if(this.y <= this.scene.game.config.height/2){
        this.y += this.scene.SCROLL_SPEED;
      }else{
        this.tilePositionY -= this.scene.SCROLL_SPEED;
      }
    }

  }
}
