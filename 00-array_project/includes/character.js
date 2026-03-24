let part = [0,1,1,1,1,1,1,1,1,0];//0: part type, 1: is can collide 2: x, 3: y, 4: z, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll

let character_list = [0];

//different type of plane
let plane_constrcts = [//the first 1 index of each is the primary part
    //0: part type, 1: is movable part 2: x offset(from primary part), 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
    [0,0,10,10,0,10,10,10,0,0,0],//0 default
    [0,0,0,0],//fast plane
    [0,0,0,0],
];

class Character{
    constructor(primary_x, primary_y, primary_z, __type){
        character_list[0]++;
        this.characterID = character_list[0];
        this.primary_parts = [0, false, primary_x, primary_y, primary_z, 10, 10, 10, 0,0,0, 0];
        this.moving_parts = [];
        this.speeds = {left: 10, right: 10, forward: 10, backward: 10};
        this.x_sync_primary = false;//the plane tilt down when look down
        this.y_sync_primary = true;//the plane look at the direction pointing at

        character_list[this.characterID] = this;
        return this.characterID;
    }
}