class UserUI{
    constructor(){
        this.I = 0;
    }
    tickUI(cameraPos){

        //place a plane() right infront of the camera and raw stuff on it
        push();
        
        translate(cameraPos.x, cameraPos.y, cameraPos.z);

        rotateX(HALF_PI);

        //translate(0, 1000, 0);
        this.I+=0.01;

        plane(1000, 1000);
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