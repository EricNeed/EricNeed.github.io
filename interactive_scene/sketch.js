let display = {
  DEFAULT_CANVA : 400,
  display_multiplier : 1,
  zoom : 1,
  mult : 1//this is what everything should multiply by
};

let ship_propertie = {
  health : 100,
  depth : 255,
  shipX : 0,
  VelocityX: 0,
  VelocityY: 0,
  shipHit : false,
  shipY : 0,
  goalX : 0,
  goalY : 0,
}

let playerID;//player's sprite in the sprite list
let sprite_manager;
let barrier_manager;
let collision;


function setup() {
  //display setup
  let square = windowWidth < windowHeight? windowWidth : windowHeight;
  createCanvas(square, square);
  display.display_multiplier = square / 400;
  display.mult = display.display_multiplier * display.zoom;


  sprite_manager = new SpriteManager();
  playerID = sprite_manager.createSprite(20, 20, "assets/sprite.png");
  barrier_manager = new BarrierManager();
  collision = new Collision(sprite_manager, barrier_manager);

  //submarine
  //choose a random coordinate as goal
  ship_propertie.goalX = Math.floor(Math.random() * 5000);
  ship_propertie.goalX = Math.floor(Math.random() * 5000);

  barrier_manager.addChamber(0, 0, 200, 200);
  barrier_manager.addLadder(180, 180);
  let driver_seatID = barrier_manager.addBox(180, 170, 10,10);
  let driver_seat = barrier_manager.box[driver_seatID]
  driver_seat.openings[0] = true;
  driver_seat.openings[1] = new DriverSeat();
  console.log(ship_propertie.ship_health);

  //terrain
  barrier_manager.addTerrain(200, 200, 50, 50);
}


function draw() {
  background(0, 0, ship_propertie.depth);

  
  let player = sprite_manager.sprite_list[playerID];
  noSmooth();
  image(player.image_object, player.x * display.mult, player.y * display.mult, player.image_object.width * display.mult, player.image_object.height * display.mult);

  //render chambers
  for(let i = 0; i < barrier_manager.chamber.length; i++){
    let chamber = barrier_manager.chamber[i];
    fill(0, 0, 0, 0)
    rect(chamber.x * display.mult, chamber.y * display.mult, chamber.dx * display.mult, chamber.dy * display.mult);
  };
  //render ladders
  for(let i = 0; i < barrier_manager.ladder.length; i++){
    let ladder = barrier_manager.ladder[i];
    image(ladder.image_object, ladder.x * display.mult, ladder.y * display.mult, ladder.dx * display.mult, ladder.dy * display.mult);
  };

  //box and functional stations
  for(let i = 0; i < barrier_manager.box.length; i++){
    let box = barrier_manager.box[i];
    fill(150);
    rect(box.x * display.mult, box.y * display.mult, box.dx * display.mult, box.dy * display.mult);
  }

  //render terrain
  for(let i = 0; i < barrier_manager.terrain.length; i++){
    let terrain = barrier_manager.terrain[i];
    fill(0);
    let terrain_offestX = terrain.x - Math.floor(ship_propertie.shipX);//offsets to the screen's origon
    let terrain_offestY = terrain.y - Math.floor(ship_propertie.shipY); 
    rect(terrain_offestX * display.mult, terrain_offestY * display.mult, terrain.dx * display.mult, terrain.dy * display.mult);
  }

  playerInput();
  tick_phisics();

  //tick the functional block logic
  if(player.using_block){
    player.beside_functional_block.openings[1].working(display.mult, ship_propertie);
  }

  smooth();
  fill(0, 0, 0);
  textSize(10 * display.mult);
  text(`Ship Health: ${ship_propertie.health} \n X: ${ship_propertie.shipX} Y: ${ship_propertie.shipY}`, (display.DEFAULT_CANVA - 80) * display.mult, 10 * display.mult);
}


//**********************************************************************input
function playerInput(){
  //console.log("pressed")
  let player = sprite_manager.sprite_list[playerID];

  if(keyIsDown(82)){
    player.using_block = false;
  }

  if(player.using_block){
    return;
  }

  const input_list = [87, 65, 83, 68, 69];
  player.is_climbing = false;
  
  for(let i = 0; i < input_list.length; i++){
    if(!keyIsDown(input_list[i])){
      continue;
    }
    
    switch (i){
    case 0:
      player.is_climbing = true;
      break;
    case 1:
      player.x -= player.walk_speed;
      break;
    case 3:
      player.x += player.walk_speed;
      break;
    case 4:
      console.log("press E");
      if(typeof player.beside_functional_block === 'object'){
        player.using_block = player.beside_functional_block.openings[0];
      }
    }
  }
}

//**********************************************************************render
function tick_phisics(){
  let player = sprite_manager.sprite_list[playerID];
  player.y += 1;

  collision.tickCollision(playerID, ship_propertie, display);
}


//**********************************************************************logic