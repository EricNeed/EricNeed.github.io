let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let x = noise(time) * width;
  let y = noise(time + 1000) * height;

  fill("black");
  circle(x, y, 75);
  time+=0.01;
}
