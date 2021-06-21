var PLAY=1;
var END=0;
var gameState=PLAY;
var bg, bgimg;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var playSound;
var overSound;
var cage,cageImg;
var GAMEOVER;
var survival;
function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  playSound=loadSound("mixkit-walking-in-the-forest-1214.wav");
  
overSound=loadSound("mixkit-falling-game-over-1942.wav");
cageImg=loadImage("cage.png");
        bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
     bgimg = loadImage("jungle.png");
  
}
function setup() {
    createCanvas(580,500);
  survival=0;
    bg = createSprite(340,400,50,50);
  bg.addImage(bgimg);
 bg.scale=1.3;
    bg.x = bg.width/2;
   bg.velocityX = -4;
    cage=createSprite(300,150,10,10);
    cage.addImage(cageImg);
    cage.scale=0.4;
     ground = createSprite(400,500,1200,10);
ground.visible=false;
    
    monkey = createSprite(70,400,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.27;


  

    
  
  
    bananaGroup = createGroup();
obstacleGroup = createGroup();
  
  score = 0;
  
  
}
function draw() {
  background("white");
  
createEdgeSprites();
  
     survival=survival+Math.round(frameCount/60);
  
if(keyDown("space") && monkey.y >= 340){
    monkey.velocityY=-14;
  }

     if (gameState===PLAY){
       Food();
       Obstacle();
       

              cage.visible=false;

       
       if(bananaGroup.isTouching(monkey)){
         bananaGroup.destroyEach();
         score=score+1;
       }
       playSound.play();
       overSound.stop();
       
       
      monkey.collide(ground);
      monkey.velocityY = monkey.velocityY + 0.8;
 
       bg.velocityX = -4;
  
  if(bg.x<100){
     bg.x=bg.width/2;
      }
       
     }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    overSound.play()
    playSound.stop();
    
  }
  else if(gameState===END){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
   cage.visible=true;
    monkey.destroy();
    bg.destroy();
    score=0;
    survival=0;
    if(keyDown("R")){
  gameState=PLAY;
      score=0;
    survival=0;
       bg = createSprite(340,400,50,50);
  bg.addImage(bgimg);
 bg.scale=1.3;
       monkey = createSprite(70,400,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.27;
}
    }
    
     
  
 
drawSprites();
  fill("black");
  text("algerian");
  stroke("black");
  text("SCORE : "+score,400,20);
  text("SURVIVAL TIME : "+survival,20,20);
  
 stroke("black");
  textSize(15);
  fill("black");
  text("score "+score,500,50);
if(gameState===END){
  stroke("black");
  textSize(45);
  fill("yellow");
  text("GAMEOVER",200,300);
  stroke("black");
  textSize(45);
  fill("black");
  text("press R to Restart",200,100);
}
     }


function Food(){
  if(frameCount%100===0){
    banana = createSprite(500,200,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-5;
    banana.lifetime=300;
    banana.y = Math.round(random(100,300));
    banana.depth=monkey.depth-1;
    bananaGroup.add(banana);

  }
}
function Obstacle(){
  if(frameCount%90===0){
    obstacle = createSprite(450,450,10,10);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale=0.25;
    obstacle.velocityX=-5;
    obstacle.lifetime = 300;
    obstacle.depth = monkey.depth-1;
    obstacleGroup.add(obstacle);
  }
}
