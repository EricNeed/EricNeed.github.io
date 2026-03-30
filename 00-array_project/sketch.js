let user_logic;
let draw_3d;
let grass;
let ui;
let myShare;
let otherShares;

function preload(){
  partyConnect("wss://demoserver.p5party.org", "EricPlaneGame2026_3_29");
  myShare = partyLoadMyShared();
  otherShares = partyLoadGuestShareds();
}

function setup() {
  grass = loadImage('assets/grass2.jpg');

  createCanvas(windowWidth, windowHeight, WEBGL);
  myShare.chara = new Character(0,0,0);
  user_logic = new User();
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