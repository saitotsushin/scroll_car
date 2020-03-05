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

    this.SCROLL_SPEED = config.scene.SCROLL_SPEED;
    this.diffHeight = 0;

    this.scrollEnd = false;

    this.STONE_HEIGHT = config.scene.game.config.height + 64 - (config.scene.game.config.height % 64);
    this.STONE_DIFF = 64 - (config.scene.game.config.height % 64);

  }
  update(time, delta) {

    if(!this.active){
      return;
    }

    if(this.y >= this.scene.game.config.height + this.height){
      this.setActive(false);
      this.setVisible(false);
      this.diffHeight = 0;
      this.tilePositionY = 0;
      this.laneNumber = 0;
      return;
    }

    if(this.active){
      this.dispTimer -= delta;
      if(this.dispTimer <= 0){
        this.scene.AttentionMark.setVisible(false);

        if(!this.scrollEnd){
          this.diffHeight = 64 - (this.tilePositionY % 64 * -1);

          // this.tilePositionY += this.diffHeight;
          // this.height = this.height + this.diffHeight;  
          this.scrollEnd = true;
        }
        if(this.diffHeight >= 0){
          this.tilePositionY -= this.scene.SCROLL_SPEED;
          this.diffHeight -= this.scene.SCROLL_SPEED;
          // this.y += this.scene.SCROLL_SPEED;
          // this.height += this.scene.SCROLL_SPEED;  
        }else{
          this.y += this.scene.SCROLL_SPEED;
        }
        return;
      }
      
      if(this.y <= this.STONE_HEIGHT/2 - this.STONE_DIFF){
        this.y += this.scene.SCROLL_SPEED;
      }else{
        this.tilePositionY -= this.scene.SCROLL_SPEED;
      }
      // this.tilePositionY -= this.scene.SCROLL_SPEED;
    }

  }
}
