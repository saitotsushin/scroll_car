/*==============================
当たり判定
==============================*/    
export default function makeCollision(scene){
  scene.physics.add.overlap(scene.Car,scene.CrimpGroup,function(car,crimp){

    car.x = car.laneNumber * 64;
    if(scene.carTween){
      scene.carTween.stop();
    }
    car.hit(crimp);
  });
  scene.physics.add.overlap(scene.Car,scene.Stone,function(car,stone){

    car.x = car.laneNumber * 64;
    if(scene.carTween){
      scene.carTween.stop();
    }
    car.hit(stone);
  });
  scene.physics.add.overlap(scene.Car,scene.CoinGroup,function(car,coin){
    coin.hit();
  });
  scene.physics.add.overlap(scene.Stone,scene.CoinGroup,function(stone,coin){
    coin.setActive(false);
    coin.setVisible(false);
  });
  scene.physics.add.overlap(scene.Stone,scene.CrimpGroup,function(stone,crimp){
    crimp.setActive(false);
    crimp.setVisible(false);
  });
  // scene.physics.add.collider(scene.Car,scene.CrimpGroup,
  //   function(car,crimp){
  //     if(scene.carTween){
  //       scene.carTween.stop();
  //     }
  //     car.hit();
  //   }
  //   ,null, this);
  // scene.physics.add.collider(scene.Car,scene.Stone,
  //   function(car,stone){
  //     if(scene.carTween){
  //       scene.carTween.stop();
  //     }
  //     car.hit();
  //   }
  //   ,null, this);
}

