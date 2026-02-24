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
    
    return currentID
  }
}

//***************************************************collision

class BarrierManager{
  constructor(){
    this.current_floorID = 0;
    this.ship_floor_list = [];
    this.ship_wall_list = [];
  }
  add_floor(x_start, x_end, y){
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
      
      //floor and ceiling
      for(let f = 0; f < s_m.ship_floor_list.length; f++){
        let floor_segment = s_m.ship_floor_list[f];
        
        if(sprite.y + sprite.sprite_texture.height - sprite.hitbox_paddingX < floor_segment.b){
           
        }
      }
      //wall
      
    }
  }
}