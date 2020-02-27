import Car from '../sprites/Car';
import AttentionMark from '../sprites/AttentionMark';
import Pylon from '../sprites/Crimp/Pylon';
import Stone from '../sprites/Crimp/Stone';
import Coin from '../sprites/item/Coin';
import GameOver from '../helper/GameOver';

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene'
    });
    this.SCROLL_SPEED = 5;
    this.crimpTimerEvent;
    this.attentionBlockTimerEvent;
    this.MY_SCORE = nowMyScore;
  }
  create(){

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
    /*==============================
    UI
    ==============================*/     
    this.speedText = this.add.text(
      20,
      40,
      '0',
      {
        font: '18px Courier',
        fill: '#FFFFFF'
      }
    );
    this.speedText.depth = 100;

    this.scoreText = this.add.text(
      20,
      20,
      '0',
      {
        font: '18px Courier',
        fill: '#FFFFFF'
      }
    );
    this.scoreText.depth = 100;
    /*==============================
    UI
    ==============================*/     
    this.coinText = this.add.text(
      this.game.config.width - 10,
      20,
      '0',
      {
        font: '18px Courier',
        fill: '#FFFFFF',
        align: 'right'
      }
    );
    this.coinText.setOrigin(1, 0);
    this.coinText.depth = 100;
    /*==============================
    UI レベル
    ==============================*/
    this.LEVEL = 1;  
    this.levelText = this.add.text(
      this.game.config.width - 10,
      60,
      '0',
      {
        font: '24px Courier',
        fill: '#FFFFFF',
        align: 'right'
      }
    );
    this.levelText.setOrigin(1, 0);
    this.levelText.depth = 100;
    /*==============================
    ゲームオーバーの生成
    ==============================*/    
    this.GameOver = new GameOver({
      scene: this
    });

    /*==============================
    障害物グループ生成（パイロン）
    ==============================*/      
    this.CrimpGroup = this.add.group();
    let pylon;
    for(var i = 0; i < 20; i++){
      pylon = new Pylon({
        scene: this,
        x: 0,
        y: 0,
        key: 'pylon'
      });  
      this.CrimpGroup.add(pylon);    
    }

    /*==============================
    コイングループ生成
    ==============================*/      
    this.CoinGroup = this.add.group();
    let coin;
    for(var i = 0; i < 20; i++){
      coin = new Coin({
        scene: this,
        x: 0,
        y: 0,
        key: 'coin'
      });  
      this.CoinGroup.add(coin);    
    }
    /*==============================
    プレイヤー（車）の生成
    ==============================*/    
    this.Car = new Car({
      scene: this,
      key: 'car',
      x: 64,
      y: this.game.config.height - 60,
    });
    /*==============================
    障害物グループ生成（アテンション）
    ==============================*/  
    this.AttentionMark = new AttentionMark({
      scene: this,
      key: 'attention',
      x: 0,
      y: this.game.config.height/2,
    });
    this.Stone = new Stone({
      scene: this,
      x: 0,
      y: 200,
      width: 37,
      height: 200,
      key: 'stone'
    });  
    console.log("this.Stone",this.Stone)

    // this.Stone = this.add.tileSprite(
    //   12,//x
    //   this.game.config.height/2,
    //   // this.game.config.height*-1,//y
    //   37,
    //   this.game.config.height,
    //   'stone'
    // ); 
    this.Stone.setVisible(false)

    this.STAGE_STATUS = [
      {
        LEVEL: 1,
        SCORE: 0,
        SPEED: 5,
        DURATION: 1000,
        DELAY: 1000
      }
      // {
      //   LEVEL: 2,
      //   SCORE: 2000,
      //   SPEED: 10,
      //   DURATION: 500,
      //   DELAY: 500
      // },
      // {
      //   LEVEL: 3,
      //   SCORE: 4000,
      //   SPEED: 12,
      //   DURATION: 400,
      //   DELAY: 400
      // },
      // {
      //   LEVEL: 4,
      //   SCORE: 6000,
      //   SPEED: 14,
      //   DURATION: 300,
      //   DELAY: 300
      // }
    ];


    /*==============================
    キーの判定
    ==============================*/  
    this.isTouched = false;
    this.keyDirection = "LEFT";

    this.input.on('pointerdown', function (pointer) {
      if(!this.isTouched){
        this.isTouched = true;
        if( pointer.x < this.game.config.width/2){
          this.keyDirection = "LEFT";
          if(this.Car.x >= 80){
            this.Car.x -= 60;
          }
        }else{
          this.keyDirection = "RIGHT";
          if(this.Car.x <= 240){
            this.Car.x += 60;
          }
        }
      }
    }, this);

    this.input.on('pointerup', function (pointer) {
      if(this.isTouched){
        this.isTouched = false;
      }
    }, this);
    /*==============================
    当たり判定
    ==============================*/   
    this.physics.add.overlap(this.Car,this.CrimpGroup,function(car,crimp){
      car.hit();
    });
    this.physics.add.overlap(this.Car,this.CoinGroup,function(car,coin){
      coin.hit();
    });
    this.physics.add.overlap(this.Car,this.Stone,function(car,stone){
      car.hit();
    });
    /*==============================
    ゲームオーバー
    ==============================*/   
    this.gameOverFlg = false;
    /*==============================
    タイマー
    ==============================*/   
    this.attentionBlockTimerEvent = this.time.addEvent({
      delay: 2000,
      duration: 1000,
      startAt: 200,
      callback: function(){
        this.attentionDisplay();
      },
      callbackScope: this,
      loop: true
    }); 
    this.crimpTimerEvent = this.time.addEvent({
      delay: 1000,
      duration: 1000,
      startAt: 200,
      callback: function(){
        this.fromCrimpPool();
      },
      callbackScope: this,
      loop: true
    }); 
  }
  update(time, delta) {

    if(this.gameOverFlg){
      return;
    }
    this.changeLevel();

    this.registry.list.score += this.SCROLL_SPEED;

    this.levelText.setText(
      'LEVEL :'+this.LEVEL
    );
    this.speedText.setText(
      'SPEED :'+this.SCROLL_SPEED
    );
    this.scoreText.setText(
      'SCORE :'+this.registry.list.score
    );
    this.coinText.setText(
      'COIN :'+this.registry.list.coin
    );
    this.background1.tilePositionY -= this.SCROLL_SPEED;

    this.CrimpGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    this.CoinGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    if(this.Stone.active){
      this.Stone.update(time, delta);
    }
  }

  fromCrimpPool(object){
    /*
    1 | パイロン
    2 | アイテム
    3 | アテンション＆ストーン
    */
    //1)パイロン.2)アイテムは50:50の確率で計算
    let setGroupId = this.getRandomInt(1,2);
    let displayObject;
    if(setGroupId === 1){
      displayObject = this.CrimpGroup.get();
    }
    if(setGroupId === 2){
      displayObject = this.CoinGroup.get();
    }

    if(displayObject){
      let randomLane = this.getRandomInt(1,4);
      displayObject.setActive(true);
      displayObject.setVisible(true);
      displayObject.x = randomLane * 60;
      displayObject.y = 0;
    }
  }
  gameOver(){
    this.gameOverFlg = true;
    this.crimpTimerEvent.remove(false);
    this.anims.resumeAll();
    this.physics.world.resume();

    this.GameOver.scoreDisplay();
  }
  getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }
  titleGame(){
    this.scene.start('TitleScene');
  }
  //
  changeLevel(){

    let afterLevel = 1;
    let afterDuration = 0;
    let afterDelay = 0;

    this.STAGE_STATUS.forEach(
      (status) => {
        if(this.registry.list.score > status.SCORE){
          this.SCROLL_SPEED = status.SPEED;
          afterLevel = status.LEVEL;
          afterDuration = status.DURATION;
          afterDelay = status.DELAY;
        }
      },this
    );
    if(afterLevel !== this.LEVEL){
      console.log("afterDuration",afterDuration);
      this.LEVEL = afterLevel;
      this.levelText.setText(
        'LEVEL :'+this.LEVEL
      );
      /*タイマーの更新*/
      this.crimpTimerEvent.remove(false);
      this.crimpTimerEvent = this.time.addEvent({
        delay: afterDelay,
        duration: afterDuration,
        startAt: 0,
        callback: function(){
          this.fromCrimpPool();
        },
        callbackScope: this,
        loop: true
      }); 
    }

  }
  attentionDisplay(){
    if(this.Stone.active){
      return;
    }
    //3)ストーンは別で1/10確率で表示
    let setStoneId = this.getRandomInt(1,2);
    let setLane = this.getRandomInt(1,4);
    let stoneObject;
    if(setStoneId === 1){
      //マークの表示
      this.AttentionMark.x = setLane * 60;
      this.AttentionMark.y = this.game.config.height/2;
      this.AttentionMark.setVisible(true);
      //ストーンの設置
      this.Stone.setVisible(true);
      this.Stone.x = setLane * 60;
      this.Stone.y = this.game.config.height/2 * -1;
      this.Stone.setActive(true);
      this.Stone.active = true;      
    }
  }

}

export default GameScene;