import Car from '../sprites/Car';
// import Base from '../sprites/Crimp/Base';
import Pylon from '../sprites/Crimp/Pylon';

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'GameScene'
    });
    this.SCROLL_SPEED = 5;
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

    // let pylon = new Pylon({
    //   scene: this,
    //   x: 0,
    //   y: 0,
    //   key: 'pylon'
    // });

    /*==============================
    障害物グループ生成
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


    this.Car = new Car({
      scene: this,
      key: 'car',
      x: 64,
      y: this.game.config.height - 60,
    });


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

    this.physics.add.overlap(this.Car,this.CrimpGroup,function(car,crimp){
      car.hit();
    });


    this.gameOverFlg = false;

    this.crimpTimerEvent = this.time.addEvent({
      delay: 1000,
      duration: 1000,
      startAt: 200,
      callback: function(){
        this.fromCrimpPool();
      },
      callbackScope: this,
      repeat: -1
    }); 
  }
  update(time, delta) {

    if(this.gameOverFlg){
      return;
    }
    this.background1.tilePositionY -= this.SCROLL_SPEED;

    this.CrimpGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
  }
  // createCrimp(object){
  //   let pylon = new Pylon({
  //     scene: this,
  //     x: 60,
  //     y: 60,
  //     key: "pylon"
  //   });
  //   // pylon.setVisible(false);
  //   this.CrimpGroup.add(pylon);
  // }
  fromCrimpPool(object){
    let pylonObject = this.CrimpGroup.get();
    if(pylonObject){
      let randomLane = this.getRandomInt(1,4);
      pylonObject.setActive(true);
      pylonObject.setVisible(true);
      pylonObject.x = randomLane * 60;
      pylonObject.y = 0;
    }
  }
  gameOver(){
    console.log("gameOver");
    this.gameOverFlg = true;
    this.anims.resumeAll();
    this.physics.world.resume();    
  }
  getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }
}

export default GameScene;