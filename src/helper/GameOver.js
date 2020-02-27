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
      30
    );

    this.scoreTxt = this.scene.add.bitmapText(
      30,
      90,
      'bitmapFont',
      '',
      30
    );

    this.coinTxt = this.scene.add.bitmapText(
      30,
      100,
      'bitmapFont',
      "",
      30
    );

    this.totalTxt = this.scene.add.bitmapText(
      30,
      110,
      'bitmapFont',
      '',
      30
    );   
    this.myScoreTxt = this.scene.add.bitmapText(
      30,
      120,
      'bitmapFont',
      '',
      30
    );     

    this.stageOverTxt.setOrigin(0.5,0.5);
    config.scene.physics.world.enable(this.stageOverTxt);
    config.scene.add.existing(this.stageOverTxt);
    this.stageOverTxt.setScrollFactor(0);


    this.buttonTw = config.scene.add.sprite(
      config.scene.game.config.width/2,
      200,
      'btn_tw'
    );
    this.buttonTw.setScrollFactor(0);
    this.buttonTw.setOrigin(0.5,0.5);
    this.buttonTw.setInteractive();
    config.scene.physics.world.enable(this.buttonTw);
    config.scene.add.existing(this.buttonTw);

    this.buttonTitle = config.scene.add.sprite(
      config.scene.game.config.width/2,
      260,
      'title'
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
      this.scoreTxt,
      this.coinTxt,
      this.totalTxt,
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
    let getScore = this.scene.registry.list.score;
    let coinCount = this.scene.registry.list.coin;
    let COIN_POINT = 100;
    let cointScore = coinCount * COIN_POINT;
    let totalScore = getScore + cointScore;
    let myScore = totalScore + this.scene.MY_SCORE;

    this.scoreTxt.setText(
      'SCORE:' + getScore
    );
    this.coinTxt.setText(
      'COIN:' + coinCount + ' x' + COIN_POINT + ' = ' + cointScore
    );    
    this.totalTxt.setText(
      'TOTAL:' + totalScore
    );  
    this.myScoreTxt.setText(
      'MY SCORE:' + myScore
    );

    //トータルスコアの更新
    // this.scene.registry.list.myScore = myScore;
    nowMyScore = myScore
    //一日一回のフラグ更新
    // this.scene.registry.list.playedFlg = true;
    playedFlg = true;
  }
}
