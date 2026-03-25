let user_logic;
let draw_3d;
let characterID;

let grass;

let ui;

function setup() {
  grass = loadImage('assets/grass2.jpg');

  ui = createGraphics(100, 100, P2D);

  ui.background(220);

  createCanvas(windowWidth, windowHeight, WEBGL);
  let character = new Character(0,0,0);
  characterID = character.characterID;
  user_logic = new User(characterID);
  draw_3d = new Draw3DStuff();
}


function draw() {
  background(220);
  
  draw_3d.draw_3d();

  push();
  texture(grass);
  plane(768 * 8, 768 * 8);
  pop();

  //user logic:
  user_logic.tickUser();

  image(ui, 10, 10);
}


function mousePressed(){
  user_logic.mouseClick();
}


function mouseReleased(){
  if(user_logic.pointerLockOn){
    exitPointerLock();
    user_logic.pointerLockOn = false;
  }
}


function mouseWheel(event){
  if(event.delta !== 0){//scroll up
    user_logic.zoom += event.delta * 0.5;
  }
}