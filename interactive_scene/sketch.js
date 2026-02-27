let display;

let playerID;//player's sprite in the sprite list
let sprite_manager;
let barrier_manager;
let collision;


function setup() {
  //display setup
  display = {
    DEFAULT_CANVA : 400,
    display_multiplier : 1,
    zoom : 1,
    mult : 1//this is what everything should multiply by
  };
  createCanvas(windowWidth, windowHeight);
  display.display_multiplier = (windowWidth < windowHeight? windowWidth : windowHeight) / 400;
  display.mult = display.display_multiplier * display.zoom;


  sprite_manager = new SpriteManager();
  playerID = sprite_manager.createSprite(20, 20, "assets/sprite.png");
  barrier_manager = new BarrierManager();
  barrier_manager.addChamber(0, 0, 200, 200);
  collision = new Collision(sprite_manager, barrier_manager);
}


function draw() {
  background(220);
  let player = sprite_manager.sprite_list[playerID];
  noSmooth();
  image(player.image_object, player.x * display.mult, player.y * display.mult, player.image_object.width * display.mult, player.image_object.height * display.mult);

  //render chambers
  for(let i = 0; i < barrier_manager.current_chamberID; i++){
    let chamber = barrier_manager.chamber[i];
    fill(0, 0, 0, 0)
    rect(chamber.x * display.mult, chamber.y * display.mult, chamber.dx * display.mult, chamber.dy * display.mult);
  };

  playerInput();
  tick_phisics();
}


//**********************************************************************input
function playerInput(){
  //console.log("pressed")
  const input_list = [87, 65, 83, 68];
  let player = sprite_manager.sprite_list[playerID];
  
  for(let i = 0; i < input_list.length; i++){
    if(!keyIsDown(input_list[i])){
      continue;
    }
    
    switch (i){
    case 1:
      player.x -= player.walk_speed;
      break;
    case 3:
      player.x += player.walk_speed;
      break;
    }
  }
}

//**********************************************************************render
function tick_phisics(){
  let player = sprite_manager.sprite_list[playerID];
  player.y += 1;

  collision.tickCollision();
}


//**********************************************************************logic