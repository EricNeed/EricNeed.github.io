let user_logic;
let draw_3d;
let characterID;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let character = new Character(0,0,0);
  characterID = character.characterID;
  user_logic = new User(characterID);
  draw_3d = new Draw3DStuff();
}

function draw() {
  background(220);

  //console.log(camera.y);

  //render character
  for(let c = 1; c<character_list.length; c++){//the first index is the current id, skip it
    let chara = character_list[c];
    draw_shape(chara.primary_parts);
  }

  orbitControl();
  
  draw_3d.draw_3d();

  //plane(768 * 8, 768 * 8);

  //translate(0, 0, 0);
  //box(100, 100);

  //user logic:
  user_logic.tickUser();
}

//0: part type, 1: is movable part 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
function draw_shape(part){
  translate(part[2], part[3], part[4]);

  switch(part[0]){
    case 0://box
      box(part[5], part[6], part[7]);
  }
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