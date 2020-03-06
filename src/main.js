import 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

let BASE_WIDTH = 320;
let BASE_HEIGHT = 480;
let DEVICE_WIDTH = window.innerWidth;
let DEVICE_HEIGHT = window.innerHeight;
let wd;
let hi;
if(DEVICE_WIDTH >= DEVICE_HEIGHT){
  wd = BASE_WIDTH;
  hi = BASE_HEIGHT;
}else{
  wd = BASE_WIDTH/DEVICE_WIDTH;
  hi = DEVICE_HEIGHT * wd;  
}
const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  // roundPixels: true,
  parent: 'content',
  width: BASE_WIDTH,
  height: hi,
  physics: {
    default: 'arcade',
    arcade: {
      fps: 30,
      // debug: true,
      gravity: {
          y: 0
      },
      
    }
  },
  scene: [
    BootScene,
    TitleScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);        

