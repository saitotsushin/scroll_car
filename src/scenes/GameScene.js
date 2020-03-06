import Car from '../sprites/Car';
import Brake from '../sprites/Brake';
import AttentionMark from '../sprites/AttentionMark';
import Pylon from '../sprites/Crimp/Pylon';
import Stone from '../sprites/Crimp/Stone';
import Coin from '../sprites/item/Coin';

import makeGameStart from '../helper/GameStart';
import * as SceneTitles from '../helper/GameTutorial';


import GameOver from '../helper/GameOver';

import UIManager from '../ui/UIManager';

import ConfigStage from '../helper/ConfigStage';
import makeCollision from '../helper/Collisions';

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene'
    });
    this.gameStartFlg = false;
    this.crimpTimerEvent;
    this.attentionBlockTimerEvent;
    this.MY_SCORE = nowMyScore;

    this.SCROLL_SPEED = 5;
    this.BASE_SPEED = 5;
    this.MAX_SPEED = 15;
    this.ADD_SPEED = 0.001;
    this.CoinCount;
    this.LEVEL = 1;
    this.LANE_NUMBER = 1;

    this.START_LANE = 2;

    // this.laneSetedStone = 0;//ストーンを置いたレーン
  }
  create(){
    this.STONE_HEIGHT = this.game.config.height + 64 - (this.game.config.height % 64);
    this.STONE_DIFF = 64 - (this.game.config.height % 64);
    this.STONE_Y = this.STONE_HEIGHT/2 * -1;

    /*==============================
    ステージの設定周り
    ==============================*/ 
    this.STAGE_STATUS = ConfigStage(this);

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
    this.UIManager = new UIManager({
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
    ブレーキセリフの生成
    ==============================*/    
    this.Brake = new Brake({
      scene: this,
      key: 'brake',
      x: this.START_LANE * 64,
      y: this.game.config.height - 160,
    });
    /*==============================
    プレイヤー（車）の生成
    ==============================*/    
    this.Car = new Car({
      scene: this,
      key: 'car',
      x: this.START_LANE * 64,
      y: this.game.config.height - 120,
    });
    this.Car.laneNumber = this.START_LANE;
    
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
      y: this.STONE_Y,
      width: 64,
      height: this.STONE_HEIGHT,
      key: 'stone'
    });
    this.Stone.setVisible(false);

    
    /*==============================
    キーの判定
    ==============================*/  
    this.isTouched = false;
    this.keyDirection = "LEFT";

    this.carTween;

    

    this.input.on('pointerdown', function (pointer) {
      if(!this.gameStartFlg){
        return;
      }
      if(this.gameOverFlg){
        return;
      }
      if(!this.isTouched){
        this.isTouched = true;
        if( pointer.x < this.game.config.width/2){
          this.keyDirection = "LEFT";
          this.UIManager.keyLeft.anims.play('keyLeftDown', true);  
          if(this.Car.x >= 80){
            this.carTween = this.tweens.timeline({
              targets: this.Car,
              ease: 'liner',
              tweens:[
                {
                  x: this.Car.x - 64,
                  angle: -20,
                  duration: (200 - this.SCROLL_SPEED*10)/2
                },
                {
                  angle: 0,
                  duration: (200 - this.SCROLL_SPEED*10)/2
                }
              ],          
              duration: 200 - this.SCROLL_SPEED*10,
              repeat: 0,
              callbackScope: this,
              onComplete: function () {
                this.Car.laneNumber--;
              }
            }); 
          }
        }else{
          this.keyDirection = "RIGHT";
          this.UIManager.keyRight.anims.play('keyRightDown', true);  
          if(this.Car.x <= 240){
            this.carTween = this.tweens.timeline({
              targets: this.Car,
              ease: 'liner',
              tweens:[
                {
                  x: this.Car.x + 64,
                  angle: 20,
                  duration: (200 - this.SCROLL_SPEED*10)/2
                },
                {
                  angle: 0,
                  duration: (200 - this.SCROLL_SPEED*10)/2
                }
              ], 
              duration: 200 - this.SCROLL_SPEED*10,
              repeat: 0,
              callbackScope: this,
              onComplete: function () {
                this.Car.laneNumber++;
              }
            }); 
          }
        }
      }
    }, this);

    this.input.on('pointerup', function (pointer) {
      if(this.gameOverFlg){
        return;
      }
      if(this.isTouched){
        this.isTouched = false;
      }
      this.UIManager.keyLeft.anims.play('keyLeftUp', true); 
      this.UIManager.keyRight.anims.play('keyRightUp', true); 
    }, this);

    /*==============================
    当たり判定
    ==============================*/   
    makeCollision(this);

    /*==============================
    ゲームスタートorチュートリアル
    ==============================*/
    if(this.registry.list.gameMode === "PLAY"){
      makeGameStart(this);
    }
    if(this.registry.list.gameMode === "TUTORIAL"){
      SceneTitles.makeGameTutorial(this);
    }     

    /*==============================
    ゲームオーバー
    ==============================*/   
    this.gameOverFlg = false;  
    this.GameOver = new GameOver({
      scene: this
    });

    this.gameSettingFlg = false;
  }
  update(time, delta) {
    /*==============================
    ゲームの状態のチェック
    ==============================*/
    if(!this.gameStartFlg){
      return;
    }
    if(this.gameOverFlg){
      return;
    }
    if(!this.gameSettingFlg){
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
        delay: 500,
        duration: 500,
        startAt: 200,
        callback: function(){
          this.fromCrimpPool();
        },
        callbackScope: this,
        loop: true
      }); 
      this.gameSettingFlg = true;
    }
    

    /*==============================
    レーンのチェック
    ==============================*/
    this.LANE_NUMBER = this.checkLane();


    /*==============================
    レベルのチェック
    ==============================*/
    this.changeLevel();

    /*==============================
    スピードの更新
    ==============================*/    
    if(this.SCROLL_SPEED <= this.MAX_SPEED){
      this.SCROLL_SPEED += this.ADD_SPEED;
    }else{
      this.SCROLL_SPEED = this.MAX_SPEED;
    }
    /*==============================
    スコアの更新
    ==============================*/   
    this.registry.list.score += this.SCROLL_SPEED;

    /*==============================
    背景のアニメーション
    ==============================*/
    this.background1.tilePositionY -= this.SCROLL_SPEED;

    /*==============================
    障害物グループのアップデート
    ==============================*/    
    this.CrimpGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    /*==============================
    コイングループのアップデート
    ==============================*/   
    this.CoinGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    /*==============================
    ストーンのアップデート
    ==============================*/
    if(this.Stone.active){
      this.Stone.update(time, delta);
    }
    /*==============================
    UI（コインのカウントなど）のアップデート
    ==============================*/
    this.UIManager.update(time, delta);
  }

  fromCrimpPool(object){
    /*
    1 | パイロン
    2 | アイテム
    3 | アテンション＆ストーン
    */
    //1)パイロン.2)アイテムは50:50の確率で計算
    // for(var i = 0; i< 2; i++){
      
    // }
    let setGroupId = this.getRandomInt(1,3);
    let displayObject;
    if(setGroupId === 1 || setGroupId === 2){
      displayObject = this.CrimpGroup.get();
    }
    if(setGroupId === 3){
      displayObject = this.CoinGroup.get();
    }

    if(displayObject){
      let randomLane = this.getRandomInt(1,4);

      //ストーンがあるレーンには置かない
      if(this.Stone.laneNumber === randomLane && this.Stone.laneNumber !== 0){
        return;
      }
      displayObject.getFlg = false;
      displayObject.setActive(true);
      displayObject.setVisible(true);
      displayObject.x = randomLane * 64;
      displayObject.y = 0;
      displayObject.laneNumber = randomLane;
      if(setGroupId === 3){
        displayObject.resetAnime();
      }
    }
  }

  gameOver(){
    this.gameOverFlg = true;
    this.gameSettingFlg = false;
    this.crimpTimerEvent.remove(false);
    this.anims.resumeAll();
    this.physics.world.resume();
    this.Brake.show(this.Car.x,this.Car.y - 20);
    let gameOverDelay = this.time.delayedCall(
      2000,
      function(){
        this.GameOver.scoreDisplay();
      },
      [],
      this
    );
  }
  getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }
  titleGame(){
    this.scene.start('TitleScene');
    //スコア、スピードのリセット
    this.SCROLL_SPEED = this.BASE_SPEED;
    this.registry.set('score', 0);
    this.registry.set('coin', 0);
  }
  //
  changeLevel(){

    let afterLevel = 1;
    let afterDuration = 0;
    let afterDelay = 0;

    this.STAGE_STATUS.forEach(
      (status) => {
        if(this.SCROLL_SPEED >= status.SPEED){
          afterLevel = status.LEVEL;
          afterDuration = status.DURATION;
          afterDelay = status.DELAY;
        }
      },this
    );
    if(afterLevel !== this.LEVEL){
      this.LEVEL = afterLevel;
      
      /*タイマーの更新*/
      this.attentionBlockTimerEvent.remove(false);
      this.attentionBlockTimerEvent = this.time.addEvent({
        delay: afterDelay*2,
        duration: afterDuration,
        startAt: 0,
        callback: function(){
          this.attentionDisplay();
        },
        callbackScope: this,
        loop: true
      });  
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
  checkLane(){
    let PADDING = 30;//左右の余白
    let LOAD_WIDTH = this.game.config.width - PADDING*2;
    let LANE_WIDTH = LOAD_WIDTH/4;
    let lane_number = Math.floor((this.Car.x - PADDING)/LANE_WIDTH) + 1;
    return lane_number;
    // if(this.LANE_NUMBER);
  }
  attentionDisplay(){
    if(this.Stone.active){
      return;
    }

    //ストーンは別で1/10確率で表示 1が出たら！
    let setStoneId = this.getRandomInt(1,2);
    let setLane = this.getRandomInt(1,2);
    let setStoneDispTimer = this.getRandomInt(1,4);
    let STONE_TIMER_BASE = 1000;
    let setStoneTimer = setStoneDispTimer * STONE_TIMER_BASE + 2000;

    if(setStoneId === 1){
      //マークの表示
      this.AttentionMark.y = this.game.config.height/2;
      this.AttentionMark.setVisible(true);
      this.AttentionMark.tick();
      //ストーンの設置
      this.Stone.setVisible(true);
      if(setLane === 1){
        this.AttentionMark.x = setLane * 64;
        this.Stone.x = setLane * 64;
      }
      if(setLane === 2){
        this.AttentionMark.x = setLane * 128;
        this.Stone.x = setLane * 128;
      }
      // this.laneSetedStone = setLane;//ストーンを置いたレーンにはパイロンとアイテムを置かない
      this.Stone.laneNumber = setLane;


      this.Stone.tilePositionY = 0;
      this.Stone.dispTimer = setStoneTimer;
      this.Stone.scrollEnd = false;
      this.Stone.height = this.STONE_HEIGHT;
      this.Stone.y = this.STONE_Y;
      this.Stone.setActive(true);
      this.Stone.active = true;   
    }
  }

}

export default GameScene;