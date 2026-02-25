let player;
let zoom = 0.5;


function setup() {
  createCanvas(400, 400);
  player = new Sprite(1, 1);
}
function draw() {
  background(220);
  noSmooth();
  image(player.img_dir, player.x, player.y, 100 * zoom, 100 * zoom);
  playerInput();
  tick_phisics();
  tick_collision();
}


//**********************************************************************input
function playerInput(){
  //console.log("pressed")
  const input_list = [87, 65, 83, 68];
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