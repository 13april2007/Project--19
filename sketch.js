var monkey,mImage,monkeyImage,jungle,jImage,jungleImage;
var banana,bImage,bananaImage,FoodGroup;
var stone,sImage,stoneImage,obstacleGroup;
var PLAY=1;
var END=0;
var gameState = PLAY
var ground

score = 0;

function preload(){
  monkeyImage =   loadAnimation("Monkey_01.png","Monkey_02.png",
                                "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  jungleImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600,600);
  
  jungle = createSprite(250,150,500,500);
  jungle.addImage("jImage",jungleImage);
  jungle.velocityX = -5; 
  jungle.scale = 1.5
  
  monkey = createSprite(80,390,20,20);
  monkey.addAnimation("mImage",monkeyImage);
  monkey.scale = 0.2;
  
  ground = createSprite(250,465,500,35);
  ground.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw(){
  background("white")
  monkey.collide(ground)
  
  
  if(gameState === PLAY){
    
    if(jungle.x < 0){
      jungle.x = jungle.width/2
    }
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 2
    }
   
    if(keyDown("space") && monkey.y >= 312.3){
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.4;
    
    jungle.velocityX = -(4 + 3*score/5);
    spawnObstacle();
  spawnFood();
       if(obstacleGroup.isTouching(monkey)){
          gameState = END;
       }
     
  
  }
  drawSprites();
  if(gameState === END){
    monkey.destroy();
     // FoodGroup.setVelocityXEach(0);
      //obstacleGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    fill("blue");
    textSize(20);
    text("Game Over",300,230);
      
     
  
      
}

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,400,45);
  }

  
function spawnObstacle(){
  if(frameCount%60 === 0){
    stone = createSprite(700,420,10,10);
    stone.velocityX = -7
    stone.addImage(stoneImage);
    stone.scale = 0.25;
    
    obstacleGroup.add(stone);
}
  }

function spawnFood(){
  if(frameCount%80 === 0){
    banana = createSprite(650,150,40,10);
    banana.velocityX = -6;
    banana.y = random(100,150);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.debug = 
    
    FoodGroup.add(banana);
  }
}
