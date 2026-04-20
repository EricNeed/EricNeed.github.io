// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Node{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 15;
    this.xTime = random(0, 1000);
    this.yTime = random(0, 1000);
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.speed = 5;

    this.deltaTime = 0.05;

    this.connectDist = 200;

    this.maxSize = 50;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r*2);
  }

  update(){
    this.move();
    this.wrap();
    this.morphSize();
  }

  move(){
    // let dx = (noise(this.xTime) - 0.5) * this.speed;
    // let dy = (noise(this.yTime) - 0.5) * this.speed;
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrap(){
    if(this.x < 0){
      this.x += width;
    }else if(this.x > width){
      this.x -= width;
    }else if(this.y < 0){
      this.y += height;
    }else if(this.y > height){
      this.y -= height;
    }
  }

  connectTo(){
    for(let node of allNodes){
      let bode_dist = dist(node.x, node.y, this.x, this.y);
      // console.log(bode_dist);
      if(bode_dist < this.connectDist && node !== this){
        stroke(this.color);
        line(node.x, node.y, this.x, this.y);
      }
    }
  }

  morphSize(){
    let mouseDist = dist(mouseX, mouseY, this.x, this.y);
    if(mouseDist < this.connectDist){
      this.r = map(mouseDist, 0, this.connectDist, this.maxSize, 15);
    }else{
      this.r = 15;
    }
  }
}

let allNodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for(let node of allNodes){
    node.connectTo();
  }

  for(let node of allNodes){
    node.update();
    node.display();
    
  }
}

function mousePressed(){
  let somePoint = new Node(mouseX, mouseY);
  allNodes.push(somePoint);
}
