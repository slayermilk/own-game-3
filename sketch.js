var beach;
var droplet;
var obstacle;
var player;
var turtle;
var trashEmptied = 0;

function preload(){
    
    beachImg = loadImage("images/bg-wowo-wowo.png");
    dropletImg = loadImage("images/droplet-si.png");
    playerImg = loadImage("images/plastic-bottle-si.png");
    obstacleImg = loadImage("images/obstacle-si.png");
    turtleImg = loadImage("images/turtle.png")
}

function setup(){
    createCanvas(600,600);
    
    beach = createSprite(300,-30);
    beach.addImage(beachImg);
    beach.scale = 1

    player = createSprite(50, 475);
    player.addImage(playerImg);
    player.scale = 0.2

    turtle = createSprite(200, 550);
    turtle.addImage(turtleImg);
    turtle.scale = 0.3

    turtle.velocityX = 13

    obstaclesGroup = new Group()
    createEdgeSprites()
}

function draw(){
    background(200);
    push()
    fill("black");
    text("Trash Emptied: "+trashEmptied, 550, 30);
    textFont()
    

    pop()
    beach.velocityY = -10
    

    if(beach.y <= -10){
        beach.y = 200
    }

    if(turtle.x >= 550){
        turtle.velocityX = -13
    }

    if(turtle.x <= 20){
        turtle.velocityX = 13
    }

    if(obstaclesGroup.isTouching(droplet)){
        obstaclesGroup.destroyEach()
        trashEmptied += 1
    } 

    spawnObstacles()
    playerControls()

    drawSprites()
}

function spawnObstacles(){
    if(frameCount % 120 === 0){
        obstacle = createSprite(200,-50);
        obstacle.addImage(obstacleImg);
        obstacle.scale = 0.7
        obstacle.x = Math.round(random(40,400));
        obstacle.velocityY = 5;
        obstaclesGroup.add(obstacle);

    }
}

function playerControls(){
    if(keyDown("right_arrow")){
        player.x = player.x+5;
    }

    if(keyDown("left_arrow")){
        player.x = player.x-5;
    }

    if(keyDown("space")){

        droplet = createSprite(player.x, player.y);
        droplet.addImage(dropletImg);
        droplet.scale = 0.2
        droplet.velocityY = -7; 

    }
}