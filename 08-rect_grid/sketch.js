const CELL_SIZE = 40;
let rows;
let column;
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = Math.floor(height/CELL_SIZE);
  column = Math.floor(width/CELL_SIZE);

  randGrid();
}


function draw() {
  background(220);

  for(let y = 0; y < rows; y++){
    for(let x = 0; x < column; x++){
      fill(255 - grid[y][x] * 255);
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}


function randGrid(){
  for(let y = 0; y < rows; y++){
    grid[y] = [];
    for(let x = 0; x < column; x++){
      grid[y][x] = Math.round(random(0, 1));
      // grid[y][x] = random(0, 1);
    }
  }
};


function mouseClicked(){
  let mouseGridX = Math.floor(mouseX/CELL_SIZE);
  let mouseGridY = Math.floor(mouseY/CELL_SIZE);

  if(mouseGridX >= column || mouseGridY >= rows){
    return;
  }

  clickGrid(mouseGridX, mouseGridY);
  clickGrid(mouseGridX + 1, mouseGridY);
  clickGrid(mouseGridX - 1, mouseGridY);
  clickGrid(mouseGridX, mouseGridY + 1);
  clickGrid(mouseGridX, mouseGridY - 1);
}


function keyPressed(){
  if(keyIsDown(82)){
    randGrid();
  }else if(keyIsDown(69)){
    for(let y = 0; y < rows; y++){
      grid[y] = [];
      for(let x = 0; x < column; x++){
        grid[y][x] = 0;
      }
    }
  }
}


function clickGrid(x, y){
  grid[y][x] += !!grid[y][x]? -1:1;
}