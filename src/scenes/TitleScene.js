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

    this.title = this.add.sprite(
      this.scene.systems.game.config.width/2,
      60,
      'title'
    );
    this.title.setOrigin(0.5,0.5);
    this.title.setInteractive();

    this.buttonStart = this.add.sprite(
      this.scene.systems.game.config.width/2,
      140,
      'btn_start'
    );
    this.buttonStart.setOrigin(0.5,0.5);
    this.buttonStart.setInteractive();

    this.buttonStart.on('pointerdown', () => {
      this.startGame();
    });  

    /*==============================
    UI
    ==============================*/     
    this.myScoreText = this.add.text(
      20,
      240,
      'MY SCORE: ' + nowMyScore,
      {
        font: '18px Courier',
        fill: '#FFFFFF'
      }
    );

    this.registry.set('score', 0);
    this.registry.set('coin', 0);
    this.registry.set('myScore', nowMyScore);
    this.registry.set('playedFlg', playedFlg);

    if(this.registry.list.playedFlg === true){
      this.buttonStart.visible = false;      
    }

  }
  startGame() {
    this.scene.start('GameScene');
  }
}

export default TitleScene;
