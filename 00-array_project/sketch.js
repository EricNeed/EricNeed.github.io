let user_logic;
let draw_3d;
let characterID;

let grass;

function setup() {
  grass = loadImage('assets/grass2.jpg');

  createCanvas(windowWidth, windowHeight, WEBGL);
  let character = new Character(0,0,0);
  characterID = character.characterID;
  user_logic = new User(characterID);
  draw_3d = new Draw3DStuff();
}

function draw() {
  background(220);

  //console.log(camera.y);


  //orbitControl();
  
  draw_3d.draw_3d();

  push();
  texture(grass);
  plane(768 * 8, 768 * 8);
  pop();

  //translate(0, 0, 0);
  //box(100, 100);

  //user logic:
  user_logic.tickUser();
}

//0: part type, 1: is movable part 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
function draw_shape(part, sI = 0){//sI: startIndex
  push();
  translate(part[2+sI], part[3+sI], part[4+sI]);
  rotateX(part[10+sI]);
  rotateY(part[9+sI]);
  rotateZ(part[8+sI]);

  switch(part[0+sI]){
    case 0://box
      box(part[5+sI], part[6+sI], part[7+sI]);
  }
  pop();
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