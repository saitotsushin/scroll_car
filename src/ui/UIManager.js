import CoinCount from './CoinCount';

export default class UIManager{
  constructor(config) {
    this.scene = config.scene;


    /*==============================
    UI コイン
    ==============================*/     
    this.CoinCount = new CoinCount({
      scene: config.scene
    });
    /*==============================
    UI スピード
    ==============================*/
    this.speedText = config.scene.add.text(
      20,
      68,
      '0',
      {
        font: '18px Courier',
        fill: '#FFFFFF'
      }
    );
    this.speedText.depth = 40;

    /*==============================
    UI スコア
    ==============================*/  

    this.scoreTitleText = this.scene.add.bitmapText(
      20,
      20,
      'bitmapFont',
      'SCORE',
      28
    );
    this.scoreTitleText.depth = 41;
    this.scoreCountText = this.scene.add.bitmapText(
      20,
      36,
      'bitmapFont',
      0,
      36
    );
    this.scoreCountText.depth = 41;

    this.baseScore = config.scene.add.graphics(
      {
        fillStyle: { color: 0x000000 }
      }
    ); 
    this.SCORE_PADDING = 10;
    this.SCORE_HEIGHT = 46;
    this.baseScoreRect = new Phaser.Geom.Rectangle(
      10,
      10,
      this.scoreTitleText + this.SCORE_PADDING*2,
      this.SCORE_HEIGHT
    );
    this.baseScore.fillRectShape(this.baseScoreRect);
    this.baseScore.alpha = 0.5;
    this.baseScore.depth = 40;
        
    /*==============================
    UI レベル
    ==============================*/
    this.levelText = config.scene.add.text(
      config.scene.game.config.width - 10,
      68,
      '0',
      {
        font: '18px Courier',
        fill: '#FFFFFF',
        align: 'right'
      }
    );
    this.levelText.setOrigin(1, 0);
    this.levelText.depth = 100;      

    /*==============================
    キーパッド
    ==============================*/    
    this.keyLeft = config.scene.add.sprite(
      config.scene.game.config.width/4,
      config.scene.game.config.height - 40
    );
    this.keyLeft.depth = 100;
    this.keyLeft.anims.play('keyLeftUp', true);  

    this.keyRight = config.scene.add.sprite(
      config.scene.game.config.width/4*3,
      config.scene.game.config.height - 40
    );
    this.keyRight.depth = 100;
    this.keyRight.anims.play('keyRightUp', true);  
  }
  update(keys, time, delta) {
    this.levelText.setText(
      'LEVEL :'+this.scene.LEVEL
    );
    this.speedText.setText(
      'SPEED :'+Math.floor(this.scene.SCROLL_SPEED)
    );

    /*==============================
    スコアの更新
    ==============================*/
    this.scoreCountText.setText(
      Math.floor(this.scene.registry.list.score)
    );

    //スコアの背景を更新
    this.baseScore.clear();
    //スコアのタイトル＞スコアのカウント
    if(this.scoreCountText.width > this.scoreTitleText.width){
      this.baseScoreRect.width = this.scoreCountText.width + this.SCORE_PADDING*2;
    }else{
      this.baseScoreRect.width = this.scoreTitleText.width + this.SCORE_PADDING*2;
    }
    this.baseScore.fillRectShape(this.baseScoreRect);

    /*==============================
    コインの更新
    ==============================*/
    this.CoinCount.update();
  }
}
