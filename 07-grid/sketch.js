// let theGrid = 
// [
//   [1,0,0,0],
//   [1,0,1,0],
//   [0,1,0,0],
//   [0,0,1,1],
// ];

let theGrid = [];
let grid_dimX = 10;
let grid_dimY = 10;

let square_length = 50;
function setup() {
  createCanvas(windowWidth, windowHeight);
  randGrid();
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for(let y = 0; y < grid_dimY; y++){
    for(let x = 0; x < grid_dimX; x++){
      fill(255 - theGrid[y][x] * 255);
      square(x*square_length, y*square_length, square_length);
    }
  }
}

function mousePressed(){
  x = floor(mouseX/square_length);
  y = floor(mouseY/square_length);

  if(x > grid_dimX || y > grid_dimY){
    return;
  }

  theGrid[y][x] += !!theGrid[y][x]? -1 : 1;
}

function randGrid(){
  for(let y = 0; y < grid_dimY; y++){
    theGrid[y] = [];
    for(let x = 0; x < grid_dimX; y++){
      theGrid[y][x] = random(0,1);
    }
  }
}