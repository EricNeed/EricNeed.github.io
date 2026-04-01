let SKYBOX_SRC;
let grass;
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
        grass = loadImage('assets/grass2.jpg');
        
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
    renderCharacter(chara){
        strokeWeight(0.1);
        this.transformAndDraw3D(chara.primary_parts, 0, true);
        let chara_part = plane_constructs[chara.primary_parts[11]];
        
        for(let p = 0; p < chara_part.length; p+=11){
            this.transformAndDraw3D(chara_part, p);
        }
        pop();//pop the trnaformation because transformAndDraw3D ordered to not pop
    }

    //render character
    renderAllCharacters(){
        for(const otherShare of otherShares){
            this.renderCharacter(otherShare.chara);
        }
    }

    //0: part type, 1: is movable part 2: x offset, 3: y offset, 4: z offset, 5: x dimention/radius, 6: y dimention/height, 7:z_dimention, 8: yawn, 9: pitch, 10:roll
    transformAndDraw3D(part, sI = 0, kept_transition = false){
        //be cautious when using this function, when "kept_transition" is true, remember to call pop() afterward
        push();
        translate(part[2+sI], part[3+sI], part[4+sI]);
        rotateX(part[10+sI]);
        rotateY(part[9+sI]);
        rotateZ(part[8+sI]);

        draw_shape(part[0+sI], part[5+sI], part[6+sI], part[7+sI]);

        if(!kept_transition){
            pop();
        }
    }


//************************************************************************************************************** draw terrain*/
    drawTerrain(){
        push();
        texture(grass);
        plane(2048, 2048);
        pop();
    }


//************************************************************************************************************** main draw*/
    draw_3d(){
        this.drawSkyBox();
        this.drawTerrain();
        this.renderAllCharacters();
    }
}

function draw_shape(shape, length, width, height){//sI: startIndex
    switch(shape){
        case 0://box
        box(length, width, height);
    }
}