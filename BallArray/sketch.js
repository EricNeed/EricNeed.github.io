let ball_array = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  for(ball in ball_array){
    ball.x += ball.dx;
    ball.y += ball.dy;
    circle(ball.x, ball.y, ball.radius);
  } 
}



function spawnBall(){
  let theBalls = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
  };

  ball_array.push(theBalls);
}