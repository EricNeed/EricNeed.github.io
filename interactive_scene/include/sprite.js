//****************************************************objects
class Sprite{  
  constructor(newX, newY, image_dir){
    this.x = newX;
    this.y = newY;
    this.image_object = loadImage(image_dir);
    this.image_flip = false;
    this.hitbox_paddingX = 7;
    this.hitbox_paddingY = 6;
    this.walk_speed = 1;
    this.is_climbing = false;
    this.is_indoor = true;
    this.using_block = false;
    this.beside_functional_block = false;//will be a object to the using block
  }
}

class box{
  constructor(newX, newY, newDX, newDY){
    this.x = newX;
    this.y = newY;
    this.dx = newDX;
    this.dy = newDY;
    this.openings = [];//use to place functional block for boxes, 0=is box, 2=special script
    this.image_object;
    this.attribute1;
  }
}

//***************************************************sprite_manager
class SpriteManager{
  constructor(){
    this.sprite_list = [];
  }
  
  createSprite(x, y, image_dir){
    let current_index = this.sprite_list.length;
    this.sprite_list[current_index] = new Sprite(x, y, image_dir);
    return current_index;
  }
}

//***************************************************barriers

class BarrierManager{
  constructor(){
    this.chamber = [];//player can go in but cant go out
    this.box = [];//player cannot go in, only collide with it
    this.ladder = [];
  }
  addChamber(x, y, dx, dy){
    let current_index = this.chamber.length;
    this.chamber[current_index] = new box(x, y, dx, dy);
    return current_index;
  }
  addBox(x, y, dx, dy){
    let current_index = this.box.length;
    this.box[current_index] = new box(x, y, dx, dy);
    return current_index;
  }
  addLadder(newX, newY){
    let current_index = this.ladder.length;
    this.ladder[current_index] = new box(newX, newY, 10, 18);
    this.ladder[current_index].image_object = loadImage("assets/ladder.png");
    return current_index;
  }
  // addTerrain(x, y, dx, dy){
  //   let current_index = this.terrain.length;
  //   this.terrain[current_index] = new box(x, y, dx, dy);
  //   return current_index;
  // }
}

//script for what happens if player interact with those blocks
class DriverSeat{
  working(display_mult, ship_propertie){
    fill(255);
    textSize(7 * display.mult);
    smooth();
    text(`X Velocity: ${ship_propertie.VelocityX} \nY Velocity: ${ship_propertie.VelocityY}`, (display.DEFAULT_CANVA - 80) * display.mult, 40 * display.mult)
    text("you are contoling the ship, press R to escape", 200 * display_mult, 380 * display_mult);

    if(keyIsDown(87)){//w
      ship_propertie.VelocityY -= 0.01;
    }else if(keyIsDown(83)){//s
      ship_propertie.VelocityY += 0.01;
    }else if(ship_propertie.VelocityY !== 0){
      ship_propertie.VelocityY -= Math.sign(ship_propertie.VelocityY) * 0.01;
    }
    if(keyIsDown(65)){//a
      ship_propertie.VelocityX -= 0.01;
    }else if(keyIsDown(68)){//d
      ship_propertie.VelocityX += 0.01;
    }else if(ship_propertie.VelocityX !== 0){
      ship_propertie.VelocityX -= Math.sign(ship_propertie.VelocityX) * 0.01;
    }

    ship_propertie.shipX += ship_propertie.VelocityX;
    ship_propertie.shipY += ship_propertie.VelocityY;
  }
}

class GunnerSeat{
  working(){

  }
}
//***************************************************collision
class Collision{
  constructor(s_m_temp, b_m_temp){
    this.s_m = s_m_temp;
    this.b_m = b_m_temp;
  }

  //give the feed back of how much 1 is suppose to move from 2 if its in a chamber.
  checkDist(x1, y1, endx1, endy1, x2, y2, endx2, endy2){
    let x_dst = x2 - x1;//positive if out, left
    let y_dst = y2 - y1;//positive if out, top
    let dx_dst = endx2 - endx1;//negative if out, right
    let dy_dst = endy2 - endy1;//negative if out, bottom
    return [x_dst, y_dst, dx_dst, dy_dst];
  }

  checkOpening(spriteL, spriteR, spriteU, spriteB, openings, wall_side){
    for(let i = 0; i < openings.length; i += 3){//opening: 1:side(which wall) 2:x or y 4:dist to x or y(depend on the orientation)
      if(wall_side != openings[i]){//0:left wall, 1: top wall, 2: right wall, 3: bottom wall
        continue;
      }
      if((openings[i] == 0 || openings[i] == 2) && openings[i+1] < spriteU && openings[i+1] + openings[i+2] > spriteB){
        return true;
      }
      if((openings[i] == 1 || openings[i] == 3) && openings[i+1] < spriteL && openings[i+1] + openings[i+2] > spriteR){
        return true;
      }
    }
    return false;
  }

  tickCollision(playerID, ship_propertie, map){
    for(let s = 0; s < this.s_m.sprite_list.length; s++){
      let sprite = this.s_m.sprite_list[s];
      let hitbox_dx = sprite.image_object.width - sprite.hitbox_paddingX*2;
      let hitbox_dy = sprite.image_object.height - sprite.hitbox_paddingY*2;
      let hitbox_left = sprite.x + sprite.hitbox_paddingX;
      let hitbox_right = hitbox_left + hitbox_dx;
      let hitbox_top = sprite.y + sprite.hitbox_paddingY;
      let hitbox_bottom = hitbox_top + hitbox_dy;
      let centerX = hitbox_left + hitbox_dx/2;
      let centerY = hitbox_top + hitbox_dy/2;

      //ladder
      if(sprite.is_climbing){
        //console.log("tick ladder");
        for(let l = 0; l < this.b_m.ladder.length; l++){
          let ladder = this.b_m.ladder[l];
          if(centerX > ladder.x && centerX < ladder.x + ladder.dx && centerY > ladder.y && centerY < ladder.y + ladder.dy){
            sprite.y -= sprite.walk_speed*1.5;
          }
        }
      }


      //rooms
      for(let c = 0; c < this.b_m.chamber.length; c++){
        let chamber = this.b_m.chamber[c];

        //if is indoor, check if is in the chambers, if outdoor, check if hit the chambers
        if(sprite.is_indoor && centerX > chamber.x && centerX < chamber.x + chamber.dx && centerY > chamber.y && centerY < chamber.y + chamber.dy){
          let result = this.checkDist(hitbox_left, hitbox_top, hitbox_right, hitbox_bottom, chamber.x, chamber.y, chamber.x + chamber.dx, chamber.y + chamber.dy);
          //console.log(`${x_dst} ${dx_dst} ${y_dst} ${dy_dst}`);

          if(result[0] > 0){
            if(this.checkOpening(hitbox_left, hitbox_right, hitbox_top, hitbox_bottom, chamber.openings, 0)) continue;
            sprite.x += result[0];
          }
          if(result[2] < 0){
            if(this.checkOpening(hitbox_left, hitbox_right, hitbox_top, hitbox_bottom, chamber.openings, 2)) continue;
            sprite.x += result[2];
          }
          if(result[1] > 0){
            if(this.checkOpening(hitbox_left, hitbox_right, hitbox_top, hitbox_bottom, chamber.openings, 1)) continue;
            sprite.y += result[1];
          }
          if(result[3] < 0){
            if(!this.checkOpening(hitbox_left, hitbox_right, hitbox_top, hitbox_bottom, chamber.openings, 3)){
              sprite.y += result[3];
            };
          }
        }else{
          //let result = this.checkDist(chamber.x, chamber.y, chamber.x + chamber.dx, chamber.y + chamber.dy);
        }
      }

      //boxes(including functional blocks)
      sprite.beside_functional_block = false;
      if(s == playerID){
        for(let b = 0; b < this.b_m.box.length; b++){
          let box = this.b_m.box[b];
          let result = this.checkDist(hitbox_right, hitbox_bottom, hitbox_left, hitbox_top, box.x, box.y, box.x + box.dx, box.y + box.dy);//(sprite:box)b:t:neg, t:b:pos, l:r:pos, r:l:neg
          
          if(result[0] < 0 && result[1] < 0 && result[2] > 0 && result[3] > 0){//x_is_touched != -1 && y_is_touched != -1
            if(box.openings[0]){
              sprite.beside_functional_block = box;
              //console.log("is touching the block");
            }else{
              //do it later
            }
          }
        }
      }
    }

    //ship colliding with terrain
    for(let t = 0; t < map.length; t+=4){
      let terrain_offestX = map[t] - Math.floor(ship_propertie.shipX);//offsets to the screen's origon
      let terrain_offestY = map[t+1] - Math.floor(ship_propertie.shipY);
      let terrain_right = terrain_offestX + map[t+2];
      let terrain_bottom = terrain_offestY + map[t+3];

      for(let c = 0; c < this.b_m.chamber.length; c++){
        let chamber = this.b_m.chamber[c];
        let result = this.checkDist(chamber.x + chamber.dx, chamber.y + chamber.dy, chamber.x, chamber.y, terrain_offestX, terrain_offestY, terrain_right, terrain_bottom);
        if(result[0] < 0 && result[1] < 0 && result[2] > 0 && result[3] > 0){
          console.log("colliding with terrain");
          ship_propertie.shipHit = true;
          ship_propertie.health -= 1 * Math.ceil(Math.abs(ship_propertie.VelocityX) + Math.abs(ship_propertie.VelocityY)) * 10;
          ship_propertie.VelocityX = -1 * ship_propertie.VelocityX * 1.5;//if hit a terrain, then bounce the ship and make it go the opposite direction with slower speed
          ship_propertie.VelocityY = -1 * ship_propertie.VelocityY * 1.5;
          break;
        }
      } 
    }
  }
}

//*******************************************editor mode */
class Editor{
  constructor(canvasLength, goal){
    this.multiplier = goal / canvasLength;
    this.Result = [];
    this.canvas_length = canvasLength;
    this.drawing_rn = false;
    this.startx;
    this.starty;
    this.shipOffsetX = Math.floor(300 / this.multiplier);
    this.shipOffsetY = Math.floor(300 / this.multiplier);
    this.finished = false;
  }
  tickEditor(){
    fill(0);
    let button_length = Math.floor(this.canvas_length * 0.05);
    rect(0,0,button_length, button_length);
    rect(button_length, 0, button_length, button_length)
    textSize(0.02 * this.canvas_length)
    text("undo  use    check console for changes", 0, button_length/2);

    for(let i = 0; i < this.Result.length; i+=4){
      rect(this.Result[i], this.Result[i+1], this.Result[i+2], this.Result[i+3]);
    }
    if(this.drawing_rn){
      rect(this.startx, this.starty, mouseX - this.startx, mouseY - this.starty);
    }

    textSize(0.01 * this.canvas_length)
    text("your ship", this.shipOffsetX, this.shipOffsetY - 10);
    rect(this.shipOffsetX, this.shipOffsetY, 200 / this.multiplier, 100 / this.multiplier);
    text("goal here", this.canvas_length *0.96, this.canvas_length * 0.95);
    fill(0, 255, 0);
    rect(this.canvas_length * 0.96, this.canvas_length * 0.96, this.canvas_length, this.canvas_length);
  }
  mousePressedInput(){//mouse pressed should triger this
    let button_length = Math.floor(this.canvas_length * 0.05);
    if(this.drawing_rn){//save changes
      this.drawing_rn = false;
      let new_vec = this.Result.length;
      this.Result[new_vec] = this.startx;
      this.Result[new_vec+1] = this.starty;
      this.Result[new_vec+2] = mouseX - this.startx;
      this.Result[new_vec+3] = mouseY - this.starty;
      console.log(`${this.Result[new_vec]} ${this.Result[new_vec+1]} ${this.Result[new_vec+2]} ${this.Result[new_vec+3]}`);

    }else if(mouseX < button_length && mouseY < button_length){//undo button
      this.Result.pop();
      this.Result.pop();
      this.Result.pop();
      this.Result.pop();
      console.log("undo");
    }else if(mouseX > button_length && mouseX < button_length*2 && mouseY < button_length){//use button
      for(let i = 0; i < this.Result.length; i+=4){//convert it to size in the world
        this.Result[i] = Math.floor(this.multiplier * (this.Result[i] - this.shipOffsetX*0.7));
        this.Result[i+1] = Math.floor(this.multiplier * (this.Result[i+1] - this.shipOffsetY * 0.5));
        this.Result[i+2] = Math.floor(this.multiplier * this.Result[i+2]);
        this.Result[i+3] = Math.floor(this.multiplier * this.Result[i+3]);
        // console.log(`${this.Result[i]}, ${this.Result[i+1]}, ${this.Result[i+2]}, ${this.Result[i+3]},`)
        this.finished = true;
      }
      console.log(this.Result);
    }else{
      this.startx = mouseX;
      this.starty = mouseY;
      this.drawing_rn = true;
    }
  }
}

// this.drawing_rn = false;
//       let new_vec = this.Result.length;
//       this.Result[new_vec] = Math.floor(this.startx * this.multiplier);
//       this.Result[new_vec+1] = Math.floor(this.starty * this.multiplier);
//       this.Result[new_vec+2] = Math.floor((mouseX - this.startx) * this.multiplier);
//       this.Result[new_vec+3] = Math.floor((mouseY - this.starty) * this.multiplier);