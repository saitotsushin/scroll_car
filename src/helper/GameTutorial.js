/*==============================
ゲームチュートリアル
==============================*/    
let overlapArea;
let stageNowText;
let rect;
let container1;
let container2;
let container3;

export function makeGameTutorial(scene){

  stageNowText = scene.add.bitmapText(
    scene.game.config.width/2,
    80,
    'bitmapFont',
    'TUTORIAL',
    64
  );
  stageNowText.setOrigin(0.5,0.5);
  stageNowText.alpha = 0;
  stageNowText.depth = 101;
  let stageNumberTween = scene.tweens.timeline({
    targets: stageNowText,
    ease: 'liner',
    duration: 100,
    tweens:[{
      x: scene.game.config.width/2,
      y: 80,
      alpha: 0,
      duration: 300
    },{
      duration: 1000
    },{
      x: scene.game.config.width/2,
      y: 70,
      alpha: 1,
      duration: 300
    }
    ],
    delay: 0,
    repeat: 0,
    completeDelay: 0,
    callbackScope: scene,
    onComplete: function () {
      showPopup1(scene)
      // scene.gameStartFlg = true;
      // scene.stageNowText.setActive(false);
      // scene.stageNowText.setVisible(false);
    }
  }); 
  overlapArea = scene.add.graphics(
    {
      fillStyle: { color: 0x000000 }
    }
  );    
  rect = new Phaser.Geom.Rectangle(0, 0, scene.game.config.width, scene.game.config.height);
  overlapArea.fillRectShape(rect);
  overlapArea.alpha = 0.75;
  overlapArea.setScrollFactor(0);   
}
export function showPopup1(scene){
  container1 = scene.add.container(0, 0);
  let popup_1 = scene.add.sprite(
    scene.game.config.width/2,
    100,
    'popup_1'
  );
  let btn_next = scene.add.sprite(
    scene.game.config.width/2,
    100 + 82,
    'btn_next'
  );
  btn_next.depth = 200;
  btn_next.setInteractive();
  btn_next.on('pointerdown', function (pointer) {
    container1.setVisible(false);
    showPopup2(scene)
  });


  container1.y = 140;
  container1.alpha = 0;

  let tween = scene.tweens.add({
    targets: container1,
    ease: 'liner',
    y: 130,
    alpha: 1,
    duration: 400,
    repeat: 0
  }); 
  container1.add(popup_1);
  container1.add(btn_next);
}

export function showPopup2(scene){
  console.log("showPopup2")
  container2 = scene.add.container(0, 0);
  let popup_2 = scene.add.sprite(
    scene.game.config.width/2,
    100,
    'popup_2'
  );
  let btn_next2 = scene.add.sprite(
    scene.game.config.width/2,
    100 + 82,
    'btn_next'
  );
  btn_next2.depth = 200;
  btn_next2.setInteractive();
  btn_next2.on('pointerdown', function (pointer) {
    container2.setVisible(false);
    showPopup3(scene)
  });


  container2.y = 140;
  container2.alpha = 0;

  let tween = scene.tweens.add({
    targets: container2,
    ease: 'liner',
    y: 130,
    alpha: 1,
    duration: 400,
    repeat: 0
  }); 
  container2.add(popup_2);
  container2.add(btn_next2);
}

export function showPopup3(scene){
  container3 = scene.add.container(0, 0);
  let popup_3 = scene.add.sprite(
    scene.game.config.width/2,
    100,
    'popup_3'
  );
  let btn_start_tutorial = scene.add.sprite(
    scene.game.config.width/2,
    100 + 82,
    'btn_start_tutorial'
  );
  btn_start_tutorial.depth = 200;
  btn_start_tutorial.setInteractive();
  btn_start_tutorial.on('pointerdown', function (pointer) {
    container3.setVisible(false);
    overlapArea.setVisible(false);
    stageNowText.setVisible(false);
    let startTimerEvent = scene.time.delayedCall(
      1000,
      function(){
        scene.gameStartFlg = true;
      },
      [],
      this
    );  
    
  });


  container3.y = 140;
  container3.alpha = 0;

  let tween = scene.tweens.add({
    targets: container3,
    ease: 'liner',
    y: 130,
    alpha: 1,
    duration: 400,
    repeat: 0
  }); 
  container3.add(popup_3);
  container3.add(btn_start_tutorial);
}
