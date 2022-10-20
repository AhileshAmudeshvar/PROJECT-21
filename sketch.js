var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle

var score,distance
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var bg
var ringsGroup, ring1 , ring2 , ring3 ,ring


function preload(){
    sonic_running = loadAnimation("sonic.gif",);
    sonic_collided = loadAnimation("sonic1.png");
    
    groundImage = loadImage("ground2.png");
    ring1=loadImage("ring.png")
    ring2=loadImage("ring.png")
    ring3=loadImage("ring.png")
    ring4=loadImage("ring.png")
    ring5=loadImage("ring.png")

    obstacle1 = loadImage("bomb.webp");
    obstacle2 = loadImage("bomb.webp");
    obstacle3 = loadImage("bomb.webp");
    obstacle4 = loadImage("bomb.webp");
    obstacle5 = loadImage("bomb.webp");
    obstacle6 = loadImage("bomb.webp");
    
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")
    
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
    bg=loadImage("back.jpg")
    
}

function setup() {
    createCanvas(600, 200);
    
     
    sonic = createSprite(50,100,20,50);
    sonic.addAnimation("running", sonic_running);
    sonic.addAnimation("collided", sonic_collided);
     
   
    ;
     
     ground = createSprite(200,180,400,20);
     ground.addImage("ground",groundImage);
     ground.x = ground.width /2;
     
     gameOver = createSprite(300,100);
     gameOver.addImage(gameOverImg);
     
     restart = createSprite(300,140);
     restart.addImage(restartImg);
     
    
     gameOver.scale = 0.5;
     restart.scale = 0.5;
     
     invisibleGround = createSprite(200,180,400,10);
     invisibleGround.visible = false;
     
     
     obstaclesGroup = createGroup();
     ringsGroup = createGroup();
   
     
     sonic.setCollider("rectangle",0,0,sonic.width,sonic.height);
     sonic.debug = true
     
     score = 0;
     distance=0
    sonic.scale=0.1
    
}

function draw() {
    background(bg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  

  text("Distance: "+ distance, 450,50);
  
  

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* distance/100)
    
    distance = distance + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& sonic.y >= 100) {
      sonic.velocityY = -12;
        jumpSound.play();
    }
    
    
    sonic.velocityY = sonic.velocityY + 0.8

    
    spawnrings();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(sonic)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
    if (sonic.isTouching(ringsGroup)){
      score=score+1
      checkPointSound.play()
      ringsGroup.destroyEach()
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
     sonic.changeAnimation("collided", sonic_collided);
    
     
     
      ground.velocityX = 0;
      sonic.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     ringsGroup.setLifetimeEach(-1);
     ringsGroup.setVelocityXEach(0);
    
     
       
   }

  sonic.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  ringsGroup.destroyEach()
  score=0
  distance=0
  sonic.changeAnimation("running",sonic_running)

}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
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
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
     
  }
 }
 function spawnrings(){
  if (frameCount % 80 === 0){
    var ring = createSprite(600,165,10,40);
    ring.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: ring.addImage(ring1);
               break;
       case 2: ring.addImage(ring2);
               break;
       case 3:ring.addImage(ring3);
               break;
      case 4:ring.addImage(ring4);
               break;
       case 5:ring.addImage(ring5);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     ring.scale = 0.2;
     ring.lifetime = 300;
    
    //add each obstacle to the group
     ringsGroup.add(ring);
     
  }
 }
 



