var PLAY = 1

var END = 0

var restart;

var gameOver;

var gameState = PLAY;

var trex ,trex_running, trex_died;

var edges;

var invisibleGround;

var ground, groundImage;

var cloud, cloudImage;

var cactus, cactusImage1,cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6;

var score = 0;

var cactusGroup;

var cloudGroup;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage ("ground2.png");
  cloudImage = loadImage ("cloud.png");
  cactusImage1 = loadImage ("obstacle1.png");
  cactusImage2 = loadImage ("obstacle2.png");
  cactusImage3 = loadImage ("obstacle3.png");
  cactusImage4 = loadImage ("obstacle4.png");
  cactusImage5 = loadImage ("obstacle5.png");
  cactusImage6 = loadImage ("obstacle6.png");
  trex_died = loadAnimation ("trex_collided.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200);
  
  trex = createSprite(70,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_died);
  trex.scale = 0.6; 

  ground = createSprite(300,190,1200,20);
  ground.addImage(groundImage);
  ground.x = ground.width/2
  
  invisibleGround = createSprite (300,205,1200,20);
  invisibleGround.visible = false; 

  cloudGroup = new Group();
  cactusGroup = new Group();

  restart = createSprite(310,110);
  restart.addImage("restart", restartImage);
  restart.scale = 0.45;

  gameOver = createSprite(310,75);
  gameOver.addImage("over", gameOverImage);
  gameOver.scale = 0.6;

  score = 0;

  edges = createEdgeSprites();
}
 
function draw(){
  background("235")
  textSize(15);
  text("Score: " + score, 420,20);

  if(gameState === PLAY){
    trex.changeAnimation("running", trex_running);
    ground.velocityX = -6;
    score = score + Math.round(frameCount/60);
    if (keyDown("space") && trex.y >= 160){
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8;

    if(ground.x < 0){
      ground.x = ground.width/2
    }
    restart.visible = false;
    gameOver.visible = false;
    cloudCreater();
    cactusCreater();
    if(cactusGroup.isTouching(trex)){
      gameState = END;
    }
  }


  else if(gameState === END){
    ground.velocityX = 0
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_died)
    trex.velocityY = 0;

    cactusGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;
  }


  trex.collide(invisibleGround);
  trex.setCollider("circle",0,0,25);
  trex.debug = true ;

  drawSprites();
}


function cloudCreater(){
  if(frameCount%85 === 0){
    cloud = createSprite(600,70,30,20);
    cloud.addImage ("cloud_1", cloudImage);
    cloud.scale = 0.90
    cloud.velocityX = -2;
    cloud.y = Math.round(random(35,130)); 
    cloud.lifetime = 320;

    trex.depth = cloud.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
}


function cactusCreater(){
  if(frameCount%50 === 0){
    cactus = createSprite(600,169,10,10);
    cactus.scale = 0.6
    cactus.velocityX = -6
    var select_cactus = Math.round(random(1,6));
    switch(select_cactus){
      case 1: cactus.addImage(cactusImage1);
      break;
      case 2: cactus.addImage(cactusImage2);
      break;
      case 3: cactus.addImage(cactusImage3);
      break;
      case 4: cactus.addImage(cactusImage4);
      break;
      case 5: cactus.addImage(cactusImage5);
      break;
      case 6: cactus.addImage(cactusImage6);
      break;
      default:break;
    }
    cactus.lifetime = 210;
    cactusGroup.add(cactus);
    cactus.debug = true;
  }
}

