export default class GameOver extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene);

    this.container = this.scene.add.container(0, 0);
    this.container.setScrollFactor(0);
    this.container.depth = 100;

    this.overlapArea = this.scene.add.graphics(
      {
        fillStyle: { color: 0x000000 }
      }
    );    
    this.rect = new Phaser.Geom.Rectangle(0, 0, config.scene.game.config.width, config.scene.game.config.height);
    this.overlapArea.fillRectShape(this.rect);
    this.overlapArea.alpha = 0.75;
    this.overlapArea.setScrollFactor(0);


    this.stageOverTxt = this.scene.add.bitmapText(
      config.scene.game.config.width/2,
      70,
      'bitmapFont',
      'GAME OVER',
      70
    );
    /*==============================
    スコア：ベーシック
    ==============================*/
    this.scoreLeftTxt = this.scene.add.bitmapText(
      30,
      110,
      'bitmapFont',
      'SCORE',
      30
    );
    this.scoreTxt = this.scene.add.bitmapText(
      config.scene.game.config.width - 30,
      120,
      'bitmapFont',
      '',
      42,{
        align: 'right'
      }
    );
    this.scoreTxt.setOrigin(1, 0);

    /*==============================
    スコア：コイン
    ==============================*/
    this.coinLeftTxt = this.scene.add.bitmapText(
      30,
      140,
      'bitmapFont',
      "COIN",
      30,
      {
        align: 'right'
      }
    );
    this.coinTxt = this.scene.add.bitmapText(
      config.scene.game.config.width - 30,
      150,
      'bitmapFont',
      "",
      42
    );
    this.coinTxt.setOrigin(1, 0);

    /*==============================
    スコア：トータル
    ==============================*/
    this.totalLeftTxt = this.scene.add.bitmapText(
      30,
      170,
      'bitmapFont',
      'TOTAL',
      30
    );  

    this.totalTxt = this.scene.add.bitmapText(
      config.scene.game.config.width - 30,
      180,
      'bitmapFontYellow',
      '',
      42,
      {
        align: 'right'
      }
    );   
    this.totalTxt.setOrigin(1, 0);
    /*==============================
    スコア：今までのと合算
    ==============================*/
    this.myScoreLeftTxt = this.scene.add.bitmapText(
      30,
      200,
      'bitmapFont',
      'MY SCORE',
      30
    );
    this.myScoreTxt = this.scene.add.bitmapText(
      config.scene.game.config.width - 30,
      210,
      'bitmapFont',
      '',
      42,
      {
        align: 'right'
      }
    );
    this.myScoreTxt.setOrigin(1, 0);

    this.stageOverTxt.setOrigin(0.5,0.5);
    config.scene.physics.world.enable(this.stageOverTxt);
    config.scene.add.existing(this.stageOverTxt);
    this.stageOverTxt.setScrollFactor(0);


    this.buttonTw = config.scene.add.sprite(
      config.scene.game.config.width/2,
      320,
      'btn_tw'
    );
    this.buttonTw.setScrollFactor(0);
    this.buttonTw.setOrigin(0.5,0.5);
    this.buttonTw.setInteractive();
    config.scene.physics.world.enable(this.buttonTw);
    config.scene.add.existing(this.buttonTw);

    this.buttonTitle = config.scene.add.sprite(
      config.scene.game.config.width/2,
      420,
      'btn_title'
    );
    this.buttonTitle.setScrollFactor(0);
    this.buttonTitle.setOrigin(0.5,0.5);
    this.buttonTitle.setInteractive();
    config.scene.physics.world.enable(this.buttonTitle);
    config.scene.add.existing(this.buttonTitle);

    this.container.add([
      this.overlapArea,
      this.stageOverTxt,
      this.buttonTw,
      this.buttonTitle,
      this.scoreLeftTxt,
      this.scoreTxt,
      this.coinLeftTxt,
      this.coinTxt,
      this.totalLeftTxt,
      this.totalTxt,
      this.myScoreLeftTxt,
      this.myScoreTxt
    ]);
    
    this.container.visible = false;

    this.buttonTitle.on('pointerdown', () => {
      this.scene.titleGame();
    });
    this.buttonTw.on('pointerdown', () => {
      alert("tw")
    });
  }

  scoreDisplay(){
    this.container.visible = true;
    let getScore = Math.floor(this.scene.registry.list.score);
    let coinCount = this.scene.registry.list.coin;
    let COIN_POINT = 100;
    let cointScore = coinCount * COIN_POINT;
    let totalScore = getScore + cointScore;
    let myScore = totalScore + this.scene.MY_SCORE;

    this.scoreTxt.setText(
      getScore
    );
    this.coinLeftTxt.setText(
      'COIN('+COIN_POINT+'pt)x'+coinCount
    );  
    this.coinTxt.setText(
      cointScore
    );    
    this.totalTxt.setText(
      totalScore
    );  
    this.myScoreTxt.setText(
      myScore
    );

    this.scene.gameOverFlg = false;
    this.scene.gameStartFlg = false;

    if(this.scene.registry.list.gameMode === "PLAY"){
      //トータルスコアの更新
      nowMyScore = myScore
      //一日一回のフラグ更新
      playedFlg = true;
    }
    if(this.scene.registry.list.gameMode === "TUTORIAL"){
      this.myScoreTxt.setVisible(false);
      this.buttonTw.setVisible(false);
      this.buttonTitle.y = 320;
    }
  }
}
