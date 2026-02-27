let playerID;//player's sprite in the sprite list
let zoom = 0.5;
let sprite_manager;
let barrier_manager;

function setup() {
  createCanvas(400, 400);
  sprite_manager = new SpriteManager();
  playerID =  sprite_manager.createSprite(20, 20, '/assets/sprite.png');
}
function draw() {
  background(220);
  let player = sprite_manager.sprite_list[playerID]
  noSmooth();
  image(player.image_object, player.x, player.y, player.image_object.width * zoom, player.image_object.height * zoom);
  playerInput();
  tick_phisics();
}


//**********************************************************************input
function playerInput(){
  //console.log("pressed")
  const input_list = [87, 65, 83, 68];
  let player = sprite_manager.sprite_list[playerID]
  
  for(let i = 0; i < input_list.length; i++){
    if(!keyIsDown(input_list[i])){
      continue;
    }
    
    switch (i){
    case 1:
      player.x -= player.walk_speed * zoom;
      break;
    case 3:
      player.x += player.walk_speed * zoom;
      break;
    }
  }
}

//**********************************************************************render
function tick_phisics(){
  player.y += 1;
}


//**********************************************************************logic
function tick_collision(){
  
}