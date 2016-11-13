var game = new Phaser.Game(300, 520, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var bg;
var floor;
var player;
var toppipe;
var bottompipe;
var pipes;
var timer;
var space;
function preload() {
  game.load.spritesheet('sheet', 'sheet.png',148,426,-1,-158,0);
  game.load.spritesheet('floor', 'floor.png');
  game.load.spritesheet('player','player.png',30,25,1);
  game.load.spritesheet('toppipe', 'top.png');
  game.load.spritesheet('bottompipe', 'bottom.png');
  game.load.spritesheet('pipe', 'pipe.png');
}

function create() {
// game attributes
game.physics.startSystem(Phaser.Physics.ARCADE);

//  Set the world (global) gravity
game.physics.arcade.gravity.y = 200;

// add background
bg = game.add.sprite(0, 0, 'sheet');
bg.frame = 1;
bg.scale.setTo(2.5,1.27);

floor = game.add.sprite(-5, 460, 'floor');
floor.frame = 1;
floor.scale.setTo(2,1.5);
floor.position.z = 2;
game.physics.enable( floor , Phaser.Physics.ARCADE);
floor.body.allowGravity = false;

player = game.add.sprite(70,240,'player');
player.frame = 1;
player.scale.setTo(2,2);
game.physics.enable( player , Phaser.Physics.ARCADE);
player.body.static = true;
player.body.allowGravity = true;


// user input
this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
timer = game.time.events.loop(Phaser.Timer.SECOND * 2, Loop, this);
}

function update() {
game.physics.arcade.collide(player, floor, collisionHandler, null, this);


if (this.space.isDown){
  player.body.velocity.y = -250;

} else if(this.space.isUp){
  player.body.velocity.y = 100;
}

if(player.body.checkWorldBounds === true)
  player.x += -2;



}
//collisions
function collisionHandler (obj1, obj2) {

game.paused = true;
}

function Loop() {
  pipes = game.add.group();
  var hole = Math.floor(Math.random() * 5) + 1;

  for (var i = 0; i < 10; i++)
   {

       if (i != hole && i != hole + 1){

            toppipe = game.add.sprite(300,i * 60 + 10 , 'pipe');
      }
   }
   pipes.add(toppipe);
   game.physics.enable( toppipe , Phaser.Physics.ARCADE);
   toppipe.body.static = true;
   toppipe.body.allowGravity = false;
   toppipe.body.velocity.x -= 50;
   console.log("lolz");
}
