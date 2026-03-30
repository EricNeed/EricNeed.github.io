let user_logic;
let draw_3d;
let characterID;

let grass;

let ui;

function preload(){
  partyConnect("wss://demoserver.p5party.org", "EricPlaneGame2026_3_29");
  character_list = partyLoadShared("character_list", {list: []});
}

function setup() {
  grass = loadImage('assets/grass2.jpg');

  createCanvas(windowWidth, windowHeight, WEBGL);
  let character = new Character(0,0,0);
  characterID = character.characterID;
  user_logic = new User(characterID);
  draw_3d = new Draw3DStuff();

  //console.log(character_list.list.length);
}


function draw() {

  //console.log(character_list.list.length);

  background(220);
  
  draw_3d.draw_3d();

  push();
  texture(grass);
  plane(768 * 8, 768 * 8);
  pop();

  //user logic:
  user_logic.tickUser();
}


function mousePressed(){
  user_logic.eventClicked();
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

function keyPressed(){
  user_logic.eventKey();
}