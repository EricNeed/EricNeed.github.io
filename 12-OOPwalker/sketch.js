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
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  display(){
    fill(this.color);
    noStroke();
    circle(this.X, this.Y, this.diameter);
  }

  move(){
    let choice = floor(random(1, 5));
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

let the_walkers = [];
let harjot;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  for(let walker of the_walkers){
    walker.move();
    walker.display();
  }
}

function mousePressed(){
  let new_walker = new Walker(mouseX, mouseY);
  the_walkers.push(new_walker);
}