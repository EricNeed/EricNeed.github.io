class Sprite{  
  constructor(newX, newY, image_dir){
    this.x = newX;
    this.y = newY;
    this.image_object = loadImage(image_dir);
    this.hitbox_paddingX = 10;
    this.hitbox_paddingY = 10;
    this.walk_speed = 4;
  }
}

class SpriteManager{
  constructor(){
    this.currentID = 0;
    this.sprite_list = [];
  }
  
  createSprite(x, y, image_dir){
    this.sprite_list[this.sprite_list] = new Sprite(x, y, image_dir);
    this.currentID += 1;
    return currentID - 1;
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
    this.current_chamberID;
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
  constructor(s_m, b_m){
    this.sprite_manager = s_m;
    this.barrier_manager = b_m;
  }
  tickCollision(){
    for(let s = 0; s < s_m.sprite_list.length; s++){
      let sprite = s_m.sprite_list[s];
      let hitbox_left = sprite.x + sprite.hitbox_paddingX;
      let hitbox_right = sprite.x + sprite_texture.width - sprite.hitbox_paddingX;
      let hitbox_top = sprite.y + sprite.hitbox_paddingY;
      let hitbox_bottom = sprite.y + sprite_texture.length - sprite.hitbox_paddingY;

      //rooms
      for(let c = 0; c < b_m.chamber.length; c++){
        let chamber = b_m.chamber[c];
        let x_dst = chamber.x - hitbox_left;//positive if out
        let y_dst = chamber.y - hitbox_top;//positive if out
        let dx_dst = (chamber.x + chamber.dx) - hitbox_right;//negative if out
        let dy_dst = (chamber.y + chamber.dy) - hitbox_bottom;//negative if out
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