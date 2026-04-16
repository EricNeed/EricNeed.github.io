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
let loadTemp;
let bulletThing;

let is_still_host = false;

//info button:
let infoButton;
let sidbar_tip = "\n\nWASD/SHIFT/SPACE\n to move, 0-9 to \nswith plane (if \nhost imported \n any), 0 is default";

function preload(){
  //planes
  defaultPlanes[0] = loadJSON("assets\\planes\\plane_construct_1.json");
  defaultPlanes[1] = loadJSON("assets\\planes\\plane_construct_2.json");

  font = loadFont("assets\\Inconsolata\\Inconsolata.otf");
  partyConnect("wss://demoserver.p5party.org", "EricPlaneGame2026_3_29");
  gameInfo = partyLoadShared("Game_Info", {currentID :0, planeConstrcuts:[]});
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
  bulletThing = new Bullet();

  //edit the finally fully loaded arrays to the files
  for(const plane_array of defaultPlanes){
    gameInfo.planeConstrcuts.push(plane_array.plane);
  }

  //button that display some game info
  infoButton = createIGButton(-0.49, -0.15, 0.15, 0.3, 0.08);
  infoButton.idleColor = [0,0,0, 100];
  infoButton.text = sidbar_tip;
}


function draw() {
  background(220);
  
  if(partyIsHost()){
    if(!is_still_host){
      infoButton.text = "you are the host, \npress \"]\" to use \nplane maker, press\n \"[\" to import" + sidbar_tip;
      is_still_host = true;
    }
    
  }else{
    is_still_host = false;
  }

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