var door
var ghostjump, ghoststand
var tower
var gamestate = 'play'
function preload(){
  climber = loadImage('climber.png')
  doors = loadImage('door.png')
  ghostjump = loadAnimation('ghost-jumping.png')
  ghostjumpr = loadAnimation('ghost-jumping - Copy.png')
  ghoststand = loadAnimation('ghost-standing.png')
  tower = loadImage('tower.png')
}
function setup(){
  climbergroup = createGroup()
  doorgroup = createGroup()
  invisgroup = createGroup()
  createCanvas(windowWidth,windowHeight)
  towers = createSprite(width/2,height/2)
  towers.addImage(tower)
  towers.scale = 2.6
  ghost = createSprite(width/2,height/2)
  ghost.scale = 0.35
  ghost.addAnimation('stand', ghoststand)
  ghost.addAnimation('jump', ghostjump)
  ghost.addAnimation('jumpright', ghostjumpr)
}
function draw(){
  background(0)
  if (gamestate === 'play'){
    console.log(ghost.y)
    ghost.changeAnimation('stand',ghoststand)
    towers.velocityY = 2
    ghost.velocityY += 1
    if (towers.y >= 1600){
      towers.y = 720
    }
    if (keyDown('SPACE') || keyDown('UP')) {
      if (ghost.y < 50) {
        ghost.y = 50
      } 
      else {
        ghost.changeAnimation('jump',ghostjump)
        ghost.velocityY = -10
      }
    }
    if (keyDown('LEFT')) {
      if (ghost.x <= 188) {
        ghost.x = 187
      }
      else {
        ghost.changeAnimation('jump',ghostjump)
        ghost.x -= 10
      }
    }
    if (keyDown('RIGHT')) {
      if (ghost.x >= 1350) {
        ghost.x = 1351
      }
      else {
        ghost.changeAnimation('jumpright',ghostjumpr)
        ghost.x += 10
      }
    }
    spawndoor()
    if (invisgroup.isTouching(ghost) || ghost.y >= 1000) {
      ghost.destroy()
      gamestate = 'end'
    }
    drawSprites()
  }
  else if (gamestate === 'end') {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", width/2-30,height/2-30)
    ghost.visible = false
    towers.visible = false
  }
}
function spawndoor() {
  if (frameCount % 240 === 0){
    var door = createSprite(random(0+200,windowWidth-200),-50)
    var climbers = createSprite(door.x,10)
    var invis = createSprite(door.x,15)

    climbers.addImage(climber)
    door.addImage(doors)
    invis.visible = false

    climbers.velocityY = 2
    door.velocityY = 2
    invis.velocityY = 2

    ghost.depth = door.depth
    ghost.depth += 1

    climbers.lifetime = 800
    door.lifetime = 800
    invis.lifetime = 800

    climbergroup.add(climbers)
    doorgroup.add(door)
    invisgroup.add(invis)
  }
}