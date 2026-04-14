// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker{
  constructor(x, y){
    this.X = x;
    this.Y = y;
    this.diameter = 2;
    this.speed = 5;
    this.color = "red";
  }

  display(){
    fill(this.color);
    circle(this.X, this.Y, this.diameter);
  }

  move(){
    let choice = round(random(1, 4));
    console.log(choice);
    switch(choice){
    case 1:
      this.X += this.speed;
      break;
    case 2:
      this.X -= this.speed;
      break;
    case 3:
      this.Y += this.speed;
      break;
    case 4:
      this.Y -= this.speed;
      break;
    };
  }
};

let harjot;

function setup() {
  createCanvas(windowWidth, windowHeight);
  harjot = new Walker(width/2, height/2);
}

function draw() {
  harjot.move();
  harjot.display();
}
