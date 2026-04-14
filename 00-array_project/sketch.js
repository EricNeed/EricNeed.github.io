// Project Name: Air Assult
// By Eric Ni
// 3/30/2026
// a 3d game about plane battle each other, still under development

let user_logic;
let draw_3d;
let user_ui;
let creatorMode;//this is optional, only create object when host want to make a plane

let myShare;
let otherShares;
let gameInfo;
let font;

function preload(){
  font = loadFont("assets\\Inconsolata\\Inconsolata.otf");
  partyConnect("wss://demoserver.p5party.org", "EricPlaneGame2026_3_29");
  gameInfo = partyLoadShared("Game_Info", {currentID :0});
  myShare = partyLoadMyShared();
  otherShares = partyLoadGuestShareds();
}

function setup() {
  myShare.ID = gameInfo.currentID;
  gameInfo.currentID++;

  createCanvas(windowWidth, windowHeight, WEBGL);
  myShare.chara = new Character(0,0,0);
  myShare.creatorEnabled = false;
  user_logic = new User();
  user_ui = new UserUI();
  draw_3d = new Draw3DStuff();

  //createIGButton(0, 0, 0.1, 0.1, 0.3);
}


function draw() {
  background(220);
  
  draw_3d.draw_3d();

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
    let new_zoom = user_logic.zoom + event.delta * 0.1;
    if(new_zoom >= 0){
      //console.log(`zoom: ${new_zoom}`);
      user_logic.zoom = new_zoom;
    }
  }
}

function keyPressed(){
  user_logic.eventKey();
}