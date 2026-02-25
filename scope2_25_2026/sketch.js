// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let number = 80;

function setup() {
  createCanvas(800, 500);
  background("black");
  stroke("white");
  noLoop();
}

function draw() {
  //background(220);
  
  number = 50;
  
  line(number, 0, number, windowHeight);
  for(let number = 120; number < 200; number += 2){
    line(number, 0, number, height);
    console.log(number);
  }
  
  drawAnotherLine();
  drawYetOneMOreLine();
}

function drawAnotherLine(){
  let number = 320;
  line(number, 0, number, height);
}

function drawYetOneMOreLine(){
  line(number + 5, 0, number + 5, height);
}