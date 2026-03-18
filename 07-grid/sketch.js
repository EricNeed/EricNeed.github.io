let theGrid = 
[
  [1,0,0,0],
  [1,0,1,0],
  [0,1,0,0],
  [0,0,1,1],
];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  let square_length = 50
  for(let y = 0; y < 4; y++){
    for(let x = 0; x < 4; x++){
      fill(255 - (theGrid[y][x] * 255));
      square(x*square_length, y*square_length, square_length);
    }
  }
}
