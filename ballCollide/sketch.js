// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = random(15, 40);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.R = random(0, 255);
    this.G = random(0, 255);
    this.B = random(0, 255);
  }

  display(){
    noStroke();
    fill(this.R, this.G, this.B);
    circle(this.x, this.y, this.radius*2);
  }

  update(){

    if(this.x-this.radius < 0 || this.x+this.radius > width){
      this.dx *= -1;
    }else if(this.y-this.radius < 0 || this.y+this.radius > height){
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  bounceOff(otherBall){
    let radiisum = this.radius + otherBall.radius;
    let dist_actual = dist(this.x, this.y, otherBall.x, otherBall.y);
    if(dist_actual <= radiisum){
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempX;
      otherBall.dy = tempY;

      // let dx_before = this.dx;
      // let dy_before = this.dy;
      // this.dx = dy_before*-1;
      // this.dy = dx_before*-1;
    }
  }
}

let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let ball of balls){
    ball.display();
    ball.update();
    for(let otherball of balls){
      if(ball === otherball){continue;}
      ball.bounceOff(otherball);
    }
  }
}


function mousePressed(){
  let someBalll = new Ball(mouseX, mouseY);
  balls.push(someBalll);
}