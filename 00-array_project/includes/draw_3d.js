let SKYBOX_SRC;
const SKYBOX_LENGTH = 512;
const SKYBOX_MULTIPLIER = 15;
const SKYBOX_HALF = SKYBOX_LENGTH * SKYBOX_MULTIPLIER * 0.5;
let skyboxSides = [];
let is_ready = false;
function loadSkybox(){
    skyboxSides[3] = SKYBOX_SRC.get(0, SKYBOX_LENGTH, SKYBOX_LENGTH, SKYBOX_LENGTH);
    skyboxSides[2] = SKYBOX_SRC.get(SKYBOX_LENGTH, SKYBOX_LENGTH, SKYBOX_LENGTH, SKYBOX_LENGTH);
    skyboxSides[1] = SKYBOX_SRC.get(SKYBOX_LENGTH*2, SKYBOX_LENGTH, SKYBOX_LENGTH, SKYBOX_LENGTH);
    skyboxSides[0] = SKYBOX_SRC.get(SKYBOX_LENGTH*3, SKYBOX_LENGTH, SKYBOX_LENGTH, SKYBOX_LENGTH);
    skyboxSides[4] = SKYBOX_SRC.get(SKYBOX_LENGTH, 0, SKYBOX_LENGTH, SKYBOX_LENGTH);//top
    skyboxSides[5] = SKYBOX_SRC.get(SKYBOX_LENGTH, SKYBOX_LENGTH*2, SKYBOX_LENGTH, SKYBOX_LENGTH);//bottom
}
class Draw3DStuff{
    constructor(){
        SKYBOX_SRC = loadImage('assets/skybox.png', loadSkybox);
        
    }
//************************************************************************************************************** skybox*/
    drawSkyBox(){
        if(!(is_ready || skyboxSides.length === 6)){
            return;
        }

        push();
        noStroke();

        for(let i = 0; i < 4; i++){
            resetMatrix();
            translate(user_logic.camera_angle.x, user_logic.camera_angle.y, user_logic.camera_angle.z);
            rotateZ(HALF_PI * i);
            rotateX(-HALF_PI);
            translate(0, 0, SKYBOX_HALF);
            texture(skyboxSides[i]);
            plane(SKYBOX_LENGTH * SKYBOX_MULTIPLIER, SKYBOX_LENGTH * SKYBOX_MULTIPLIER);
        }
        
        resetMatrix();
        translate(user_logic.camera_angle.x, user_logic.camera_angle.y, user_logic.camera_angle.z);
        rotateZ(PI);
        translate(0, 0, SKYBOX_HALF);
        texture(skyboxSides[4]);
        plane(SKYBOX_LENGTH * SKYBOX_MULTIPLIER, SKYBOX_LENGTH * SKYBOX_MULTIPLIER);
        translate(0, 0, -SKYBOX_MULTIPLIER*SKYBOX_LENGTH);
        texture(skyboxSides[5]);
        plane(SKYBOX_LENGTH * SKYBOX_MULTIPLIER, SKYBOX_LENGTH * SKYBOX_MULTIPLIER);
        pop();
    }

//************************************************************************************************************** draw character*/
    //render character
    renderCharacters(){
        for(let c = 1; c<character_list.length; c++){//the first index is the current id, skip it
            let chara = character_list[c];
            draw_shape(chara.primary_parts);
            let chara_part = plane_constrcts[chara.primary_parts[11]];
            
            push();
            for(let p = 0; p < chara.length; p+=11){
            draw_shape(chara_part, p, );
            }
            pop();
        }
    }

//************************************************************************************************************** draw*/
    draw_3d(){
        this.drawSkyBox();
        this.renderCharacters();
    }
}

//0: part type, 1: is movable part 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
function draw_shape(part, sI = 0){//sI: startIndex
    push();
    translate(part[2+sI], part[3+sI], part[4+sI]);
    rotateX(part[10+sI]);
    rotateY(part[9+sI]);
    rotateZ(part[8+sI]);

    switch(part[0+sI]){
        case 0://box
        box(part[5+sI], part[6+sI], part[7+sI]);
    }
    pop();
}