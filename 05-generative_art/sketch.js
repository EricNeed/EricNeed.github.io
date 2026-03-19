let theTiles = [];
const TILE_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let x = 0; x < windowWidth; x+= TILE_SIZE){
    for(let y = 0; y < windowHeight; y+= TILE_SIZE){
      spawnTile(x, y, TILE_SIZE);
    }
  }

}

function draw() {
  background(220);

  for(let tile of theTiles){
    line(tile.x1, tile.y1, tile.x2, tile.y2);
  }
}

function spawnTile(x, y, tile_size){
  let choice = random(100);
  let tile;
  if(choice < 50){
    tile = {
      x1: x - tile_size/2,
      y1: y + tile_size/2,
      x2: x + tile_size/2,
      y2: y - tile_size/2,
    };
  }else{
    tile = {
      x1: x - tile_size/2,
      y1: y - tile_size/2,
      x2: x + tile_size/2,
      y2: y + tile_size/2,
    };
  }
  theTiles.push(tile);
  return tile;
}