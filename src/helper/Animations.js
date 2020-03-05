/*==============================
アニメーション
==============================*/    
export default function makeAnimations(scene){
  /*==============================
  車
  ==============================*/   
  scene.anims.create({
    key: 'carAnime',
    frames: scene.anims.generateFrameNumbers('car_anime', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });
  /*==============================
  コイン
  ==============================*/   
  scene.anims.create({
    key: 'coinAnime',
    frames: scene.anims.generateFrameNumbers('coin_anime', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: 'coinGetAnime',
    frames: scene.anims.generateFrameNumbers('coin_anime', { start: 6, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  /*==============================
  コイン小（UI）
  ==============================*/   
  scene.anims.create({
    key: 'coinGetAnimeS',
    frames: scene.anims.generateFrameNumbers('coin_anime_s', { start: 0, end: 6 }),
    frameRate: 6,
    repeat: 1
  });
  scene.anims.create({
    key: 'coinWaitAnimeS',
    frames: scene.anims.generateFrameNumbers('coin_anime_s', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1
  });  
  /*==============================
  ゲームパッド
  ==============================*/   
  scene.anims.create({
    key: 'keyLeftUp',
    frames: scene.anims.generateFrameNumbers('gameKeyPad', { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: 'keyLeftDown',
    frames: scene.anims.generateFrameNumbers('gameKeyPad', { start: 1, end: 1 }),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: 'keyRightUp',
    frames: scene.anims.generateFrameNumbers('gameKeyPad', { start: 2, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  scene.anims.create({
    key: 'keyRightDown',
    frames: scene.anims.generateFrameNumbers('gameKeyPad', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
}

