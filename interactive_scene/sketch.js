//change editor to m
//add more discription on pilot ship

let display = {
  DEFAULT_CANVA : 400,
  display_multiplier : 1,
  zoom : 1,
  mult : 1//this is what everything should multiply by
};

let ship_propertie = {
  health : 50,
  shipX : 0,
  VelocityX: 0,
  VelocityY: 0,
  shipHit : false,
  shipY : 0,
  goalX : 0,
  goalY : 0,
};

let playerID;//player's sprite in the sprite list
let sprite_manager;
let barrier_manager;
let collision;
let editor_mode = false;
let editor;

function setup() {
  //display setup
  let square = windowWidth < windowHeight? windowWidth : windowHeight;
  createCanvas(square, square);
  display.display_multiplier = square / 400;
  display.mult = display.display_multiplier * display.zoom;


  sprite_manager = new SpriteManager();
  barrier_manager = new BarrierManager();
  collision = new Collision(sprite_manager, barrier_manager);

  let driver_seatID = barrier_manager.addBox(250, 190, 10,10);
  let driver_seat = barrier_manager.box[driver_seatID];
  playerID = sprite_manager.createSprite(driver_seat.x, driver_seat.y -10, "assets/sprite.png");

  //submarine

  let chamber = barrier_manager.chamber[barrier_manager.addChamber(100, 150, 200, 50)];
  chamber.openings = [3, 175, 20];
  chamber = barrier_manager.chamber[barrier_manager.addChamber(100, 200, 200, 50)];
  chamber.openings = [1, 175, 20];

  barrier_manager.addLadder(180, 230);
  barrier_manager.addLadder(180, 215);
  barrier_manager.addLadder(180, 200);
  barrier_manager.addLadder(180, 185);

  driver_seat.openings[0] = true;
  driver_seat.openings[1] = new DriverSeat();
  console.log(ship_propertie.ship_health);

  //terrain
}


function draw() {
  background(0, 0, 255 - ship_propertie.shipY/25);

  if(editor_mode){
    editor.tickEditor();
    if(editor.finished){
      map1 = editor.Result;
      editor_mode = false;
    }
    return;
  }

  if(ship_propertie.health <= 0){
    fill(0, 0, 0);
    textSize(10 * display.mult);
    text("       game over \nreload to play again", 180 * display.mult, 200 * display.mult);
    return;
  }
  
  let player = sprite_manager.sprite_list[playerID];
  noSmooth();

  //render chambers
  for(let i = 0; i < barrier_manager.chamber.length; i++){
    let chamber = barrier_manager.chamber[i];
    strokeWeight(4);
    stroke(0);
    fill(25, 75, 27);
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
    strokeWeight(1);
    fill(150);
    rect(box.x * display.mult, box.y * display.mult, box.dx * display.mult, box.dy * display.mult);
  }

  //render terrain
  for(let i = 0; i < map1.length; i+=4){
    stroke(255);
    fill(0);
    let terrain_offestX = map1[i] - Math.floor(ship_propertie.shipX);//offsets to the screen's origon
    let terrain_offestY = map1[i+1] - Math.floor(ship_propertie.shipY); 
    rect(terrain_offestX * display.mult, terrain_offestY * display.mult, map1[i+2] * display.mult, map1[i+3] * display.mult);
  }

  image(player.image_object, player.x * display.mult, player.y * display.mult, player.image_object.width * display.mult, player.image_object.height * display.mult);

  playerInput();
  tick_phisics();

  //tick the functional block logic
  if(player.using_block){
    player.beside_functional_block.openings[1].working(display.mult, ship_propertie);
  }

  smooth();
  fill(255);
  textSize(10 * display.mult);
  text(`Ship Health: ${ship_propertie.health} \n X: ${Math.floor(ship_propertie.shipX)} Y: ${Math.floor(ship_propertie.shipY)}`, (display.DEFAULT_CANVA - 80) * display.mult, 10 * display.mult);
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
      // if(typeof player.beside_functional_block === 'object'){
      //   player.using_block = player.beside_functional_block.openings[0];
      // }
      editor_mode = true;
      editor = new Editor(windowWidth < windowHeight? windowWidth : windowHeight);
    }
  }
}

function mousePressed(){
  if(editor_mode){
    editor.mousePressedInput();
  }

  let player = sprite_manager.sprite_list[playerID]
  let box = player.beside_functional_block;
  let mouseX_scaled = mouseX / display.mult;
  let mouseY_scaled = mouseY / display.mult;
  if(typeof player.beside_functional_block === 'object' && mouseX_scaled > box.x && mouseX_scaled < box.x + box.dx && mouseY_scaled > box.y && mouseY_scaled < box.y + box.dy){
    player.using_block = !player.using_block;
  }
}

//**********************************************************************render
function tick_phisics(){
  let player = sprite_manager.sprite_list[playerID];
  player.y += 1;

  collision.tickCollision(playerID, ship_propertie, map1);
}

//**********************************************************************terrain
let map1 = [//x, y, dx, dy
  300, 300, 3000, 400,
  -5000, 300, 5000, 1000,
  400, 700, 1000, 200,
  -100, 1300, 1000, 300

];