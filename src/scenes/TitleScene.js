import TopAnime from '../sprites/TopAnime';

class TitleScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'TitleScene'
    });
    
  }
  create() {

    let config = {
      key: 'title',
      frames: [{
          frame: 'title',
      }]
    };
    this.registry.set('score', 0);
    this.registry.set('coin', 0);
    this.registry.set('myScore', nowMyScore);
    this.registry.set('playedFlg', playedFlg);

    /*==============================
    背景生成
    ==============================*/      
    this.background1 = this.add.tileSprite(
      this.game.config.width/2,//x
      this.game.config.height/2,//y
      this.game.config.width,
      this.game.config.height,
      'stage'
    );
    this.background1.alpha = 0.2;

    /*==============================
    UI
    ==============================*/  
    this.title = this.add.sprite(
      this.scene.systems.game.config.width/2,
      80,
      'title'
    );
    this.title.setOrigin(0.5,0.5);
    this.title.setInteractive();
    /*==============================
    UI
    ==============================*/  
    this.buttonStart = this.add.sprite(
      this.scene.systems.game.config.width/2,
      240,
      'btn_start'
    );
    this.buttonStart.setOrigin(0.5,0.5);
    this.buttonStart.setInteractive();
    console.log("this.buttonStart",this.buttonStart)
    console.log("this.registry.list.playedFlg",this.registry.list.playedFlg)
    if(this.registry.list.playedFlg === true){
      this.buttonStart.alpha = 0.4;      
    }
    this.buttonStart.on('pointerdown', () => {
      if(this.registry.list.playedFlg === true){
        return;  
      }
      this.startGame();
    });  
    /*==============================
    UI
    ==============================*/  
    this.buttonTutorial = this.add.sprite(
      this.scene.systems.game.config.width/2,
      310,
      'btn_tutorial'
    );
    this.buttonTutorial.setOrigin(0.5,0.5);
    this.buttonTutorial.setInteractive();

    this.buttonTutorial.on('pointerdown', () => {
      this.startGame();
    });  

    /*==============================
    UI
    ==============================*/  
    this.baseScore = this.add.sprite(
      this.scene.systems.game.config.width/2,
      400,
      'base_score'
    );
    this.myScoreText = this.add.bitmapText(
      this.game.config.width*0.75,
      405,
      'bitmapFont',
      nowMyScore,
      64
    );
    this.myScoreText.setOrigin(1, 0);

    // this.myScoreText = this.add.text(
    //   20,
    //   240,
    //   nowMyScore,
    //   {
    //     font: '18px Courier',
    //     fill: '#FFFFFF'
    //   }
    // );

    // this.top_anime = this.add.sprite(160, 160, 'top_anime');

    this.TopAnime = new TopAnime({
      scene: this,
      x: 160,
      y: 160
    });




  }
  update(){
    this.TopAnime.update();
  }
  startGame() {
    this.scene.start('GameScene');
  }
}

export default TitleScene;
