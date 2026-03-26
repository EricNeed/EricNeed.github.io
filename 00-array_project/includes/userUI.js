const hui = 1;

class UserUI{
    constructor(){
        this.I = 0;
    }
    tickUI(cameraPos){

        //place a plane() right infront of the camera and raw stuff on it
        push();
        
        translate(cameraPos.x, cameraPos.y, cameraPos.z);

        rotateZ(cameraPos.h + HALF_PI);
        rotateX(cameraPos.v + HALF_PI);
        translate(0, -80.01, 0);
        rotateX(HALF_PI);

        noStroke();
        plane(90, 90);
        rect(10, 10, 10, 10);
        pop();
    }
}



class GridMap{
    constructor(){
        this.activated = false;
    }
    tickMap(){
        
    }
}