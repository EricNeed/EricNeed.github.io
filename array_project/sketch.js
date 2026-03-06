// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);

  orbitControl();

  plane(10000, 10000);

  translate(30, 10, 100);
  box(100, 100);
}