var trex, trex_running,ground,groundImage,cloudImage,cloud, score,trex_collided;
var gameState="play";
var gameOver, restart;
var obstaclesGroup,cloudsGroup;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadAnimation("trex_collided.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
  
}


function setup(){
createCanvas(400,400);
  trex = createSprite(30,330,100,50);
 trex.addAnimation("running",trex_running);
  trex.addAnimation("abc" ,trex_collided);
  
  ground=createSprite(200,380,400,20);
  ground.addImage("ground_abc",groundImage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(200,390,400,10);
  invisibleground.visible= false;
  edges=createEdgeSprites();
  trex.scale=0.5;
  
  trex.setCollider("rectangle",0,0,200,trex.height);
  //trex.debug = true
  
  gameOver = createSprite(200,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  restart = createSprite(150,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  
  score=0;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}


function draw(){
background("black");
 // trex.velocityX=2;
  ground.velocityX=-(10+ 3*score/100);
 // console.log(trex.x);
  console.log(trex.y);
  //console.log(ground.x);
  //console.log("abc");
  //drawSprites();
 // console.log(cloud.x);
 // console.log(gameState);
  text("Score : " + score,300,50);
  trex.collide(invisibleground);
  if(gameState=="play"){
    gameOver.visible = false;
      restart.visible = false;
    score=score + Math.round(getFrameRate()/60);
    if(score>0 && score%100==0)
    {
      checkpointSound.play();
    }
  
    if(keyDown("space") && trex.y>=355)
     {
      trex.velocityY = -10;
       jumpSound.play();
     }
    trex.velocityY=trex.velocityY+0.5;
  
    if(ground.x<0)
    {
    //ground.x=200;
      ground.x=ground.width/2;
    }
  
     spawnClouds();
  //console.log(cloud.x);
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex))
       {
         gameState="end";
         dieSound.play();
         //trex.velocityY = -10;
       }
  }
  else if(gameState=="end")
  {  
     gameOver.visible = true;
      restart.visible = true;
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("abc", trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  

  drawSprites();
}// function draw ends here

function spawnClouds()
{
  if(frameCount%90==0)
  {
    var cloud,rand;
    cloud=createSprite(480,300,40,10);
    cloud.addImage(cloudImage);
    cloud.velocityX=-2;
    cloud.scale=0.3;
    rand=Math.round(random(280,320));
    cloud.y=rand;       
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    //cloud.lifetime=290;
    //console.log(World.frameCount)
    //console.log("trex "+trex.depth);
    //console.log("cloud "+cloud.depth);
    //console.log(cloud.x)
    //console.log(rand);
    cloud.lifetime=90;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles()
{
  if(frameCount%120==0)
  {
    var obstacle,rand;
    obstacle=createSprite(400,365,10,40);
    obstacle.velocityX=-(10+ 3*score/100);
    rand=Math.round(random(1,6));
    switch(rand)
    {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
    }  
    obstacle.scale=0.5;
    obstacle.lifetime=190;
    obstaclesGroup.add(obstacle);
  }
}
