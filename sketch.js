var backImage,backgroundImage;
var player,playerImage;
var ground;
var ghost,ghostImg,ghostGrp;
var foodGrp,apple,appleImg;
var score;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
function preload () {
backImage = loadImage("jungle.jpg"); 
playerImage = loadAnimation("player.png");
ghostImg = loadImage("ghost.png");  

appleImg = loadImage("firefox_2018-07-10_07-50-11.png")
}


function setup() {
  createCanvas(400, 400);

backgroundImage = createSprite(0,0,400,400);
backgroundImage.addImage(backImage);
backgroundImage.velocityX = -4;
//backgroundImage.x = backgroundImage.width/2;

ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
 player = createSprite(40,340,20,50);
  player.addAnimation("Running",playerImage);
  player.scale = 0.5;
  //player.velocityX = 2;

ghostGrp = createGroup();
foodGrp = createGroup();

  
  score = 0;
}

function draw() {
  background(220);

if (gameState=== PLAY) {
    if(ground.x<0) {
    ground.x=ground.width/2;
  }

  
  if(backgroundImage.x<100){
    backgroundImage.x=backgroundImage.width/2;
  }
  
 if(foodGrp.isTouching(player)){
      foodGrp.destroyEach();
    score = score + 3;
    }
  
  if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  
  if(ghostGrp.isTouching(player)){ 
       gameState = END ;
    
    }
  spawnGhost();
spawnFood();
    
    

}
  
  if (gameState === END) {
      foodGrp.destroyEach();
        ghostGrp.destroyEach();
        foodGrp.setVelocityXEach(0);
        ghostGrp.setVelocityXEach(0);
       player.velocityX = 0;
    player.velocityY = 0;
      stroke("black");
  textSize(20);
  fill("purple");
  text("gameover", 200,200);
    player.visible = false;
    backgroundImage.visible = false;
      }
  
  
  
  
  
  
  drawSprites();

stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);




} 


function spawnGhost (){

if (frameCount % 300 === 0) {
    var ghost = createSprite(600,250,40,10);
    ghost.y = random(120,200);    
    ghost.addImage(ghostImg);
    ghost.scale = 0.2;
    ghost.velocityX = -5;
     //assign lifetime to the variable
    ghost.lifetime = 300;
    
    //add each banana to the group
    ghostGrp.add(ghost);
  }
}


 function spawnFood() {
  
  if (frameCount % 80 === 0) {
    var apple = createSprite(600,200,40,10);
    apple.y = random(120,200);    
    apple.addImage(appleImg);
    apple.scale = 0.05;
    apple.velocityX = -5;
     //assign lifetime to the variable
    apple.lifetime = 300;
    
    
    //add each banana to the group
    foodGrp.add(apple);
  } 
  
  
 }  
  
