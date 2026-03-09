let part = {
    x: 0,
    y: 0,
    z: 0,
    type: 0, //0: box, 1: cylinder, 2
};

let character_list = [0];

//different type of plane
let plane_constrcts = [//the first 1 index of each is the primary part
    //1: x offset, 2: y offset, 3: z offset, 4: yawn, 5: pitch, 6:roll, 7: x dimention/radius, 8: y dimention/height, 9:z_dimention 
    [0,0,0,0],//0 default
    [0,0,0,0],//fast plane
    [0,0,0,0],
];

class character{
    constructor(primary_x, primary_y, primary_z, __type){
        this.characterID = character_list[0];
        character_list[0]++;
        this.primary_parts = structuredClone(part);
        this.primary_parts.x = primary_x;
        this.primary_parts.y = primary_y;
        this.primary_parts.z = primary_z;
        this.moving_parts = [];
        character_list.push(this);
    }
}

class user{

}