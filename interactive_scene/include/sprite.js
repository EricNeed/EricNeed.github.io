class Sprite{  
  constructor(newX, newY){
    this.x = newX;
    this.y = newY;
    this.sprite_texture = loadImage('/assets/sprite.png');
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
  
  createSprite(){
    
    return currentID;
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
    this.current_floorID = 0;
    this.chamber = [];
    this.box = [];
  }
  add_chamber(x_start, x_end, y){
    ship_floor_list[this.current_floorID] = color(x_start, x_end, y);
    
    this.current_floorID += 1;
    return this.current_floorID -1;
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

        if(){
          
        }

      }  
    }
  }
}