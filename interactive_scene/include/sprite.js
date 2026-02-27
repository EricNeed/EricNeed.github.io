class Sprite{  
  constructor(newX, newY, image_dir){
    this.x = newX;
    this.y = newY;
    this.image_object = loadImage(image_dir);
    this.hitbox_paddingX = 7;
    this.hitbox_paddingY = 6;
    this.walk_speed = 1;
  }
}

class SpriteManager{
  constructor(){
    this.currentID = 0;
    this.sprite_list = [];
  }
  
  createSprite(x, y, image_dir){
    this.sprite_list[this.currentID] = new Sprite(x, y, image_dir);
    this.currentID += 1;
    return this.currentID - 1;
  }
}

//***************************************************collision
class box{
  constructor(newX, newY, newDX, newDY){
    this.x = newX;
    this.y = newY;
    this.dx = newDX;
    this.dy = newDY;
    this.openings = [];
  }
}


class BarrierManager{
  constructor(){
    this.current_boxID = 0;
    this.current_chamberID = 0;
    this.chamber = [];//player can go in but cant go out
    this.box = [];//player cannot go in, only collide with it
  }
  addChamber(x, y, dx, dy){
    this.chamber[this.current_chamberID] = new box(x, y, dx, dy);
    this.current_chamberID += 1;
    return this.current_chamberID -1;
  }
  addBox(x, y, dx, dy){
    this.box[this.current_boxID] = new box(x, y, dx, dy);
    this.current_boxID += 1;
    return this.current_boxID -1;
  }
}

class Collision{
  constructor(s_m_temp, b_m_temp){
    this.s_m = s_m_temp;
    this.b_m = b_m_temp;
  }
  tickCollision(){
    for(let s = 0; s < this.s_m.sprite_list.length; s++){
      let sprite = this.s_m.sprite_list[s];
      let hitbox_left = sprite.x + sprite.hitbox_paddingX;
      let hitbox_right = sprite.x + sprite.image_object.width - sprite.hitbox_paddingX;
      let hitbox_top = sprite.y + sprite.hitbox_paddingY;
      let hitbox_bottom = sprite.y + sprite.image_object.height - sprite.hitbox_paddingY;

      //rooms
      for(let c = 0; c < this.b_m.chamber.length; c++){
        let chamber = this.b_m.chamber[c];
        let x_dst = chamber.x - hitbox_left;//positive if out
        let y_dst = chamber.y - hitbox_top;//positive if out
        let dx_dst = chamber.x + chamber.dx - hitbox_right;//negative if out
        let dy_dst = chamber.y + chamber.dy - hitbox_bottom;//negative if out
        //console.log(`${x_dst} ${dx_dst} ${y_dst} ${dy_dst}`);

        if(x_dst > 0){
          sprite.x += x_dst;
        }
        if(dx_dst < 0){
          sprite.x += dx_dst;
        }
        if(y_dst > 0){
          sprite.y += y_dst;
        }
        if(dy_dst < 0){
          sprite.y += dy_dst;
        }

      }  
    }
  }
}