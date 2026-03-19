let ball_array = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let ball of ball_array){
    ball.x += ball.dx;
    ball.y += ball.dy;
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius);
    if(ball.x - ball.radius/2 > width){
      ball.x = 0;
      ball.y = height - ball.y;
    }
    if(ball.x + ball.radius/2 < 0){
      ball.x = width;
      ball.y = height - ball.y;
    }
    if(ball.y - ball.radius/2 > height){
      ball.y = 0;
      ball.x = width - ball.x;
    }
    if(ball.y + ball.radius/2 < 0){
      ball.y = height;
      ball.x = width - ball.x;
    }
  } 
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y, _color){
  let theBalls = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
    color: color(random(0,255),random(0,255),random(0,255))
  };
  ball_array.push(theBalls);
}