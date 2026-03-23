const CELL_SIZE = 40;
let rows;
let column;
let grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = Math.floor(height/CELL_SIZE);
  column = Math.floor(width/CELL_SIZE);

  genGrid(grid, true);
}


function draw() {
  background(220);

  for(let y = 0; y < rows; y++){
    for(let x = 0; x < column; x++){
      fill(255 - grid[y][x] * 255);
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }

  tickCanvas();
}


function genGrid(target_grid, is_rand){
  for(let y = 0; y < rows; y++){
    target_grid[y] = [];
    for(let x = 0; x < column; x++){
      if(is_rand){
        target_grid[y][x] = Math.round(random(0, 1));
      }else{
        target_grid[y][x] = 0;
      }
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
  // clickGrid(mouseGridX + 1, mouseGridY);
  // clickGrid(mouseGridX - 1, mouseGridY);
  // clickGrid(mouseGridX, mouseGridY + 1);
  // clickGrid(mouseGridX, mouseGridY - 1);
}


function keyPressed(){
  if(keyIsDown(82)){
    gendGrid(grid, true);
  }else if(keyIsDown(69)){
    genGrid(grid, false);
  }else if(keyIsDown(32)){
    tickCanvas();
  }
}


function clickGrid(x, y){
  grid[y][x] += !!grid[y][x]? -1:1;
}


function tickCanvas(){
  let new_grid = [];
  for(let y = 0; y < rows; y++){
    new_grid[y] = [];
    for(let x = 0; x < column; x++){
      tickCells(x, y, new_grid);
    }
  }
  grid = new_grid;
}

function tickCells(x, y, new_grid){
  let neighbors = 0;
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      if(x+j >= 0 && x+j < column && y+i >= 0 && y+i < rows){
        neighbors += grid[y + i][x + j];
      }
    }
  }

  neighbors -= grid[y][x];

  if(neighbors === 3){
    new_grid[y][x] = 1;
  }else if(neighbors === 2){
    new_grid[y][x] = grid[y][x];
  }else{    
    new_grid[y][x] = 0;
  }
}