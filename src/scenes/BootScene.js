import makeAnimations from '../helper/Animations';

class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    this.make.text({
      x: this.sys.game.config.width/2,
      y: this.sys.game.config.height/2 - 48,
      text: 'LOADING...',
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'white',
        align: 'center'
      }
    });
    let progressNumb = this.make.text({
      x: this.sys.game.config.width/2,
      y: this.sys.game.config.height/2 - 12,
      text: '',
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontSize: 18,
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
      makeAnimations(this);
      this.progress.destroy();
      this.scene.start('TitleScene');
    });

    this.load.image('car', 'assets/images/car.png');
    this.load.image('coin', 'assets/images/item/coin.png');
    this.load.image('pylon', 'assets/images/pylon.png');
    this.load.image('stage', 'assets/images/stage.jpg');
    this.load.image('title', 'assets/images/title.png');

    this.load.image('base_score', 'assets/images/base_score.png');
    this.load.image('attention', 'assets/images/attention.png');
    this.load.image('stone', 'assets/images/stone.png');
    this.load.image('brake', 'assets/images/brake.png');

    this.load.image('btn_start', 'assets/images/btn_start.png');
    this.load.image('btn_tutorial', 'assets/images/btn_tutorial.png');
    this.load.image('btn_next', 'assets/images/btn_next.png');
    this.load.image('btn_start_tutorial', 'assets/images/btn_start_tutorial.png');
    this.load.image('btn_continue', 'assets/images/btn_continue.png');
    this.load.image('btn_title', 'assets/images/btn_title.png');
    this.load.image('btn_tw', 'assets/images/btn_tw.png');

    this.load.image('popup_1', 'assets/images/popup_1.png');
    this.load.image('popup_2', 'assets/images/popup_2.png');
    this.load.image('popup_3', 'assets/images/popup_3.png');

    this.load.bitmapFont('bitmapFont', 'assets/font/font.png', 'assets/font/font.xml');
    this.load.bitmapFont('bitmapFontYellow', 'assets/font/font_yellow.png', 'assets/font/font.xml');
    this.load.spritesheet('top_anime', 'assets/images/top_anime.png', { frameWidth: 80, frameHeight: 56 });
    this.load.spritesheet('car_anime', 'assets/images/car_anime.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('coin_anime', 'assets/images/coin_anime.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('coin_anime_s', 'assets/images/coin_anime_s.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('gameKeyPad', 'assets/images/gameKeyPad.png', { frameWidth: 52, frameHeight: 38 });

  }

}

export default BootScene;
