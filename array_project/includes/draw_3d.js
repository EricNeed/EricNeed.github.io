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

    draw_3d(){
        this.drawSkyBox();
    }
}