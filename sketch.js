var backImage, background;
var monkey, monkey_running;
var ground, ground_img;
var BananaGroup, bananaImage;
var obstaclesGroup, obstacleImage;
var gameOver;
var score = 0;


function preload() {

  backImage = loadImage("jungle2.jpg");

  monkey_running =
    loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");



  bananaImage = loadImage("Banana.png");
  
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(800, 400);


  background = createSprite(200, 200, 200, 200);
  background.addImage(backImage);
  background.x = background.width / 2;
  background.velocityX = -2;


  monkey = createSprite(100, 200, 50, 50);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.2;


  ground = createSprite(200, 200, 200, 200);
  ground.velocityX = -2;
  ground.x = ground.width / 2;
  ground.visible = false;


  BananaGroup = new Group();
  obstaclesGroup = new Group();


  score = 0;
}

function draw() {

  background(255);


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (background.x < 100) {
    background.x = background.width / 2;
  }

  if (BananaGroup.isTouching(monkey)) {
    BananaGroup.destroyEach();
    score = score + 2;
  }
  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnBanana();
  spawnObstacles();

  if (obstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.05;

  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnBanana() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(200, 200, 50, 50);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;


    BananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(200, 200, 50, 50);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);

    obstacle.scale = 0.1;



    obstaclesGroup.add(obstacle);
  }
}