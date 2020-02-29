/*==============================
ゲームスタート
==============================*/    
export default function makeGameStart(scene){

  scene.stageNowText = scene.add.bitmapText(
    scene.game.config.width/2 - 20,
    100,
    'bitmapFont',
    'GAME START',
    64
  );
  scene.stageNowText.setOrigin(0.5,0.5);
  scene.stageNowText.alpha = 0;
  let stageNumberTween = scene.tweens.timeline({
    targets: scene.stageNowText,
    ease: 'liner',
    duration: 100,
    tweens:[{
      x: scene.game.config.width/2,
      alpha: 1,
      duration: 300
    },{
      duration: 1000
    },{
      x: scene.game.config.width/2 + 20,
      alpha: 0,
      duration: 300
    }
    ],
    delay: 500,
    repeat: 0,
    completeDelay: 400,
    callbackScope: scene,
    onComplete: function () {
      scene.gameStartFlg = true;
      scene.stageNowText.setActive(false);
      scene.stageNowText.setVisible(false);
    }
  });  
}

