// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  hi(windowWidth, windowWidth/2, windowHeight/2);
}

function draw() {
  // background(220);
}

function hi(radius, centerX, centerY){
  if(radius < 1){
    return;
  }
  console.log("draw" + radius);
  circle(centerX, centerY, radius);
  let new_rad = radius/2;
  hi(new_rad, centerX-new_rad/2, centerY);
  hi(new_rad, centerX+new_rad/2, centerY);
  return;
}