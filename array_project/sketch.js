let user_logic;
let characterID;
let camera = [0, 0, 0]; //lookX, lookY, lookZ

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let character = new Character(0,0,0);
  characterID = character.characterID;
  user_logic = new User(characterID);
}

function draw() {
  background(220);

  console.log(camera.y);

  //render character
  for(let c = 1; c<character_list.length; c++){//the first index is the current id, skip it
    let chara = character_list[c];
    draw_shape(chara.primary_parts);
  }

  orbitControl();

  //plane(10000, 10000);

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