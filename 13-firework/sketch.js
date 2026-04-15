// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Particle{
  constructor(x, y){
    this.X = x;
    this.Y = y;
    this.R = 3;
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
    this.alpha = random(0, 255);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
  }

  display(){
    noStroke();
    fill(this.red, this.green, this.blue, this.alpha);
    circle(this.X, this.Y, this.R);
  }

  update(){
    this.X += this.dx;
    this.Y += this.dy;
    this.alpha--;
  }
}

let all_particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(particle of all_particles){
    particle.update();
    particle.display();
  }
}

const PARTICLE_PER_CLICK = 100;
function mousePressed(){
  console.log("firework");
  for(let i = PARTICLE_PER_CLICK; i>0; i--){
    all_particles.push(new Particle(mouseX, mouseY));
  }
}
