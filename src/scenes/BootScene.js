class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    this.make.text({
      x: this.sys.game.config.width/2,
      y: 100,
      text: 'LOADING...',
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontSize: 10,
        fontFamily: 'Arial',
        fill: 'white',
        align: 'center'
      }
    });
    let progressNumb = this.make.text({
      x: this.sys.game.config.width/2,
      y: 120,
      text: '',
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontSize: 10,
        fontFamily: 'Arial',
        fill: 'white',
        align: 'center'
      }
    });
    this.progress = this.add.graphics();

    this.load.on('progress', (value) => {
      this.progress.clear();
      this.progress.fillStyle(0xffffff, 1);
      progressNumb.text = Math.round(value*100) + "%";
    });

    this.load.on('complete', () => {
      this.progress.destroy();
      this.scene.start('TitleScene');
    });
    /*bitmap
    midori_box
    https://www.pixiv.net/artworks/56487227
     */

    this.load.image('car', 'assets/images/car.png');
    this.load.image('coin', 'assets/images/item/coin.png');
    this.load.image('pylon', 'assets/images/pylon.png');
    this.load.image('stage', 'assets/images/stage.jpg');
    this.load.image('title', 'assets/images/title.png');
    this.load.image('base_score', 'assets/images/base_score.png');

    this.load.image('attention', 'assets/images/attention.png');
    this.load.image('stone', 'assets/images/stone.png');

    this.load.image('btn_start', 'assets/images/btn_start.png');
    this.load.image('btn_tutorial', 'assets/images/btn_tutorial.png');
    this.load.image('btn_continue', 'assets/images/btn_continue.png');
    this.load.image('btn_title', 'assets/images/btn_title.png');
    this.load.image('btn_tw', 'assets/images/btn_tw.png');
    this.load.bitmapFont('bitmapFont', 'assets/font/font.png', 'assets/font/font.xml');
    this.load.bitmapFont('bitmapFontYellow', 'assets/font/font_yellow.png', 'assets/font/font.xml');
    this.load.spritesheet('top_anime', 'assets/images/top_anime.png', { frameWidth: 80, frameHeight: 56 });
    this.load.spritesheet('car_anime', 'assets/images/car_anime.png', { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet('coin_anime', 'assets/images/coin_anime.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('coin_anime_s', 'assets/images/coin_anime_s.png', { frameWidth: 20, frameHeight: 20 });

  }

}

export default BootScene;
