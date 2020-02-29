/*==============================
アニメーション
==============================*/    
export default function ConfigStage(scene){
  let STAGE_STATUS = [
    {
      LEVEL: 1,
      SCORE: 0,
      SPEED: scene.BASE_SPEED,
      DURATION: 500,
      DELAY: 500
    },
    {
      LEVEL: 2,
      SCORE: 2000,
      SPEED: (scene.BASE_SPEED + scene.MAX_SPEED) /4 * 2,
      DURATION: 400,
      DELAY: 400
    },
    {
      LEVEL: 3,
      SCORE: 4000,
      SPEED: (scene.BASE_SPEED + scene.MAX_SPEED) /4 * 3,
      DURATION: 300,
      DELAY: 300
    },
    {
      LEVEL: 4,
      SCORE: 6000,
      SPEED: scene.MAX_SPEED,
      DURATION: 200,
      DELAY: 200
    }
  ];
  return STAGE_STATUS;
}

