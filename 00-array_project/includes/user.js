class User{
    constructor(__ID){
        this.characterID = __ID;
        this.pointerLockOn = false;
        this.sensitivity = 1;
        this.zoom = 1000;
        this.camera_angle = {h: 0, v: 0, x: 0, y: 0, z: 0};

        this.UI = new UserUI();
    }

    //move the plane to each direction
    userKeyInput(){
        let player = character_list[this.characterID];
        const input_list = [87, 65, 83, 68, 69, 77, 32, 16];

        for(let i = 0; i < input_list.length; i++){
            if(!keyIsDown(input_list[i])){
            continue;
            }

            let v_angle;
            let h_angle;
            let speed;

            //input
            switch (i){
            case 0://forward
                v_angle = player.primary_parts[9] + HALF_PI;
                h_angle = player.primary_parts[8];
                speed = player.speeds.forward;
                break;
            case 1://left
                v_angle = player.primary_parts[9] + HALF_PI;
                h_angle = player.primary_parts[8] - HALF_PI;
                speed = player.speeds.forward;
                break;
            case 2://down
                v_angle = player.primary_parts[9] - HALF_PI;
                h_angle = player.primary_parts[8];
                speed = player.speeds.forward;
                break;
            case 3://right
                v_angle = player.primary_parts[9] + HALF_PI;
                h_angle = player.primary_parts[8] + HALF_PI;
                speed = player.speeds.forward;
                break;
            case 4:
                console.log("press E");
                break;
            case 6:
                v_angle = player.primary_parts[9];
                h_angle = player.primary_parts[8];
                speed = player.speeds.forward;
                break;
            case 7:
                v_angle = player.primary_parts[9] + PI;
                h_angle = player.primary_parts[8];
                speed = player.speeds.forward;
                break;
            default:
                v_angle = 0;
                h_angle = 0;
                speed = 0;
            }

            //this is just for testing

            //for up:
            // v_angle = player.primary_parts[9];
            // h_angle = player.primary_parts[8];

            let new_coord = findPointAroundPoint(player.primary_parts[2], player.primary_parts[3], player.primary_parts[4], v_angle, h_angle, speed);
            
            push();
            translate(player.primary_parts[2], player.primary_parts[3], player.primary_parts[4]);
            box(5, 5, 5);
            resetMatrix()
            translate(new_coord[0], new_coord[1], new_coord[2]);
            box(10 , 10, 10);
            pop();
            player.primary_parts[2] = new_coord[0];
            player.primary_parts[3] = new_coord[1];
            player.primary_parts[4] = new_coord[2];
            console.log(new_coord + " " + v_angle + " " + h_angle + " " + speed);
        }
    }

    //camera orbit around primary part
    move_camera(){
        let player = character_list[this.characterID];

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
        let plane = character_list[this.characterID];
        if(this.pointerLockOn){
            //console.log(movedX + " " + movedY);
            this.camera_angle.v += movedY * 0.005;
            this.camera_angle.h += movedX * 0.005;
        }
    }

    tickUser(){
        this.userKeyInput();
        this.userMouseInput();
        this.move_camera();
        this.UI.tickUI();
    }

    mouseClick(){
        if(mouseButton === LEFT){
            console.log("left clicked");
        }
        if(mouseButton === RIGHT){
            this.pointerLockOn = true;
            requestPointerLock();
        }
    }
}