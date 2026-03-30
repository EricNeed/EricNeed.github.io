class User{
    constructor(){
        this.pointerLockOn = false;
        this.sensitivity = 0.005;
        this.zoom = 100;
        this.camera_angle = {h: 0, v: 0, x: 0, y: 0, z: 0};

        this.UI = new UserUI();
    }

    //move the plane to each direction
    userKeyInput(){
        let player = myShare.chara;
        const input_list = [87, 65, 83, 68, 69, 32, 16];

        for(let i = 0; i < input_list.length; i++){
            if(!keyIsDown(input_list[i])){
                continue;
            }

            //input
            switch (i){
            case 0://forward
                this.moveCharacter(HALF_PI, 0, player.speeds.forward);
                break;
            case 1://left
                this.moveCharacter(HALF_PI, -HALF_PI, player.speeds.left);
                break;
            case 2://back
                this.moveCharacter(-HALF_PI, 0, player.speeds.backward);
                break;
            case 3://right
                this.moveCharacter(HALF_PI, HALF_PI, player.speeds.right);
                break;
            case 4:
                console.log("press E");
                break;
            case 5://down
                this.moveCharacter(0, 0, player.speeds.down);
                break;
            case 6://up
                this.moveCharacter(PI, 0, player.speeds.down);
                break;        
            }

        }
    }

    //camera orbit around primary part
    move_camera(){
        let player = myShare.chara;

        let camera_pos = findPointAroundPoint(player.primary_parts[2], player.primary_parts[3], player.primary_parts[4], this.camera_angle.v, this.camera_angle.h, this.zoom);//camera
        this.camera_angle.x = camera_pos[0];
        this.camera_angle.y = camera_pos[1];
        this.camera_angle.z = camera_pos[2];

        camera(this.camera_angle.x, this.camera_angle.y, this.camera_angle.z, player.primary_parts[2], player.primary_parts[3], player.primary_parts[4], 0, 0, -1);

        if(this.pointerLockOn){
            player.primary_parts[8] = this.camera_angle.h;
        }

        //player.primary_parts[10] = this.camera_angle.v;
        //player.primary_parts[10] += 0.01;
        //console.log(player.primary_parts[10]);
    }

    //change fov angle
    userMouseInput(){
        if(this.pointerLockOn){
            //prevent the camera to move more than 180 degree vertically, or else it will flip over for some reason
            let new_vertical = this.camera_angle.v + movedY * this.sensitivity;
            if(new_vertical < 0 && new_vertical > -PI){
                this.camera_angle.v = new_vertical;
            }

            this.camera_angle.h += movedX * this.sensitivity;       
        }
    }

    tickUser(){
        this.userKeyInput();
        this.userMouseInput();
        this.move_camera();
        this.UI.tickUI(this.camera_angle);
    }

    eventClicked(){
        if(mouseButton === LEFT){
            console.log("left clicked");
        }
        if(mouseButton === RIGHT){
            this.pointerLockOn = true;
            requestPointerLock();
        }
    }

    moveCharacter(v_add, h_add, speed){
        const player = myShare.chara;
        let new_coord = findPointAroundPoint(player.primary_parts[2], player.primary_parts[3], player.primary_parts[4], player.primary_parts[9]+v_add, player.primary_parts[8]+h_add, speed);

        push();

        //debug vector viual
        translate(player.primary_parts[2], player.primary_parts[3], player.primary_parts[4]);
        box(5, 5, 5);
        resetMatrix();

        translate(new_coord[0], new_coord[1], new_coord[2]);
        box(10 , 10, 10);
        pop();

        player.primary_parts[2] = new_coord[0];
        player.primary_parts[3] = new_coord[1];
        player.primary_parts[4] = new_coord[2];
        //console.log(new_coord + " " + v_angle + " " + h_angle + " " + speed);
    }

    eventKey(){
        if(key === 'm'){
            this.UI.enable_map = !this.UI.enable_map;
        }
    }
}