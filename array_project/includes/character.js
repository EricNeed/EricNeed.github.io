let part = [0,1,1,1,1,1,1,1,1,0];//0: part type, 1: is can collide 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll

let character_list = [0];

//different type of plane
let plane_constrcts = [//the first 1 index of each is the primary part
    //0: part type, 1: is movable part 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
    [0,0,0,0],//0 default
    [0,0,0,0],//fast plane
    [0,0,0,0],
];

class Character{
    constructor(primary_x, primary_y, primary_z, __type){
        character_list[0]++;
        this.characterID = character_list[0];
        this.primary_parts = [0, false, primary_x, primary_y, primary_z, 100, 100, 100, 0,0,0];
        this.moving_parts = [];
        character_list[this.characterID] = this;
        return this.characterID;
    }
}

//****************************************************************************************************************user logic */

class User{
    constructor(__ID){
        this.characterID = __ID;
    }

    userKeyInput(){
        let plane = character_list[this.characterID];
        const input_list = [87, 65, 83, 68, 69, 77];
        
        for(let i = 0; i < input_list.length; i++){
            if(!keyIsDown(input_list[i])){
            continue;
            }
            //input
            switch (i){
            case 0://forward
                plane.primary_parts[2]++;
                break;
            case 1://left
                break;
            case 2://down

            case 3://right
                break;
            case 4:
                console.log("press E");
                break;
            }
        }
    }

    tickUser(){
        this.userKeyInput();
    }
}