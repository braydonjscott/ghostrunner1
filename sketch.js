var ghost, ghostimage, climber, climberimage, door, doorimage, tower, towerimage
var invisibleblock, doorGroup,climberGroup,invisibleblockGroup
var PLAY=1
var END=0
var gameState=PLAY
var score=0
var spookysound

function preload(){
    ghostimage = loadImage("ghost-standing.png")
    climberimage = loadImage("climber.png")
    doorimage = loadImage("door.png")
    towerimage = loadImage("tower.png")
    spookysound = loadSound("spooky.wav")
}

function setup(){
    createCanvas(600,600)
    tower = createSprite(200,150,20,20)
    tower.addImage(towerimage)
    tower.scale=0.8
    ghost = createSprite(200,350,20,20)
    ghost.addImage(ghostimage)
    ghost.scale=0.3
    doorGroup=createGroup()
    climberGroup=createGroup()
    invisibleblockGroup=createGroup()
    spookysound.play()
}

function draw(){
    background("white")
    if(gameState===PLAY){
        spawndoor()
        if(tower.y>400){
            tower.y=300
        }
        tower.velocityY=5
        if(keyDown("space")){
            ghost.velocityY=-7
        }
        if(keyDown("right")){
            ghost.x+=5
        }
        if(keyDown("left")){
            ghost.x-=5
        }
        ghost.velocityY+=0.5
        if(ghost.isTouching(invisibleblockGroup)||ghost.y>600){
            //doorGroup.destroy()
            //climberGroup.destroy()
            //invisibleblockGroup.destroy()
            ghost.destroy()
            gameState=END
        }
        if(ghost.isTouching(climberGroup)){
            ghost.velocityY=0
            ghost.velocityX=0
            score+=1
        }
        drawSprites()
    }
    else if(gameState===END){
        fill ("blue")
        text("Game Over", 300, 300)
    }
    fill ("blue")
    text(score,300,100)
}

function spawndoor(){
    if(frameCount%120===0){
        climber = createSprite(200,104,20,20)
        climber.addImage(climberimage)
        door = createSprite(200,50,20,20)
        door.addImage(doorimage)
        door.scale=0.7
        door.debug=true
        invisibleblock = createSprite(200,105,60,5)
        invisibleblock.visible=false
        //invisibleblock.debug=true
        invisibleblock.width=climber.width
        door.x = Math.round(random(50,350))
        climber.x = door.x
        invisibleblock.x = door.x
        door.velocityY=2
        climber.velocityY=2
        invisibleblock.velocityY=2
        ghost.depth=door.depth+1
        doorGroup.add(door)
        climberGroup.add(climber)
        invisibleblockGroup.add(invisibleblock)
        doorGroup.lifetime=300
        climberGroup.lifetime=300
        invisibleblockGroup.lifetime=300
    }
}