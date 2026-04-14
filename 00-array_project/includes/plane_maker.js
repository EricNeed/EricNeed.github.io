//i also need this to build all the planes in game
//this class should be ticked in the draw GUI loop
class PlaneMaker{
    constructor(){
        this.editorButton = [
            createIGButton(-0.35, 0.42, 0.05, 0.05, 0.5, "Back"),
            createIGButton(-0.28, 0.42, 0.05, 0.05, 0.5, "Left"),
            createIGButton(-0.21, 0.42, 0.05, 0.05, 0.5, "Down"),
            createIGButton(-0.14, 0.42, 0.05, 0.05, 0.5, "Front"),
            createIGButton(-0.07, 0.42, 0.05, 0.05, 0.5, "Right"),
            createIGButton(0.0, 0.42, 0.05, 0.05, 0.5, "Up"),
            createIGButton(0.07, 0.42, 0.05, 0.05, 0.4, "rotateX"),
            createIGButton(0.14, 0.42, 0.05, 0.05, 0.4, "rotateY"),
            createIGButton(0.21, 0.42, 0.05, 0.05, 0.4, "rotateZ"),
            createIGButton(0.28, 0.42, 0.05, 0.05, 0.3, "sizeX/rad"),
            createIGButton(0.35, 0.42, 0.05, 0.05, 0.3, "sizeY/height"),
            createIGButton(0.42, 0.42, 0.05, 0.05, 0.3, "sizeZ/LOD"),
            createIGButton(-0.49, 0.30, 0.05, 0.05, 0.4, "cube"),
            createIGButton(-0.49, 0.36, 0.05, 0.05, 0.4, "cylinder"),
            createIGButton(-0.49, 0.42, 0.05, 0.05, 0.4, "cone"),
            createIGButton(-0.49, -0.49, 0.05, 0.05, 0.4, "delete"),
            createIGButton(-0.43, -0.49, 0.05, 0.05, 0.4, "export"),
        ];
        this.infoText = createIGButton(0, 0.3, 0, 0, 0.5, "hi");

        this.new_plane_index = plane_constructs.length;
        this.new_plane = plane_constructs[this.new_plane_index] = [];
        myShare.chara.y_sync_primary = false;
        myShare.chara.primary_parts[11] = this.new_plane_index;

        this.newPartHeadIndex = 0; //the begining index of current editing part of plane
        this.radiusMode = false;//whether button [10,11,12] is [sizeX, sizeY, sizeZ], or [radius, height, lod]

        this.distMultiplier = 1;
    }

    tickEditorGUI(){
        let direction = 1; //1:forward -1:reverse

        this.distMultiplier = round(this.distMultiplier);

        //tick all the buttons
        for(let i = 0; i<this.editorButton.length; i++){
            let current_button = this.editorButton[i];
            if(!current_button.pressed){continue;}

            switch(i){
            //move
                case 0: case 1: case 2:
                    direction = -1;
                    //no breaking
                case 3:case 4:case 5:
                    let axis_index = i%3 + 2;
                    this.new_plane[this.newPartHeadIndex+axis_index] += 0.5 * direction * this.distMultiplier;
                break;
            //rotate
                case 6: case 7: case 8://combine case, because they are consecutive in part description as well
                    let angle_index = i + 2;//from 6,7,8 to 8,9,10
                    this.new_plane[this.newPartHeadIndex+angle_index] += 0.1 * this.distMultiplier;
                break;
            //size
                case 9:
                    this.new_plane[this.newPartHeadIndex+5] = round(this.new_plane[this.newPartHeadIndex+5] + ((this.radiusMode? 0.2 : 0.5)*this.distMultiplier), 1);//more percise control in radius mode
                break;
                case 10:
                    this.new_plane[this.newPartHeadIndex+6] = round(this.new_plane[this.newPartHeadIndex+6] + (0.5*this.distMultiplier), 1);
                break;
                case 11:
                    if(this.radiusMode){
                        this.new_plane[this.newPartHeadIndex+7] = round(this.new_plane[this.newPartHeadIndex+7] + 1);//lod only support interger
                    }else{
                        this.new_plane[this.newPartHeadIndex+7] = round(this.new_plane[this.newPartHeadIndex+7] + (0.5*this.distMultiplier), 1);
                    }
                break;
            //shapes
                case 12:
                    console.log("adding a cube");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 0;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                    this.new_plane[this.newPartHeadIndex+2] = 10;
                    this.new_plane[this.newPartHeadIndex+5] = 5;
                    this.new_plane[this.newPartHeadIndex+6] = 5;
                    this.new_plane[this.newPartHeadIndex+7] = 5;
                    this.radiusMode = false;
                break;
                case 13:
                    console.log("adding a cylinder");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 1;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                    this.new_plane[this.newPartHeadIndex+2] = 10;
                    this.new_plane[this.newPartHeadIndex+5] = 5;
                    this.new_plane[this.newPartHeadIndex+6] = 5;
                    this.new_plane[this.newPartHeadIndex+7] = 4;
                    this.radiusMode = true;
                break;
                case 14:
                    console.log("adding a cone");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 2;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                    this.new_plane[this.newPartHeadIndex+2] = 10;
                    this.new_plane[this.newPartHeadIndex+5] = 5;
                    this.new_plane[this.newPartHeadIndex+6] = 5;
                    this.new_plane[this.newPartHeadIndex+7] = 4;
                    this.radiusMode = true;
                break;
                case 15:
                    
                break;
                case 16:
                    saveJSON(this.new_plane, "plane construct");
                break;
            }

            current_button.pressed = false;
            console.log(this.new_plane);
            break;
        }

        this.infoText = `shape: ${}, offset: [${}], rotation: [], size: []`

        //reset this so it wont stuck on multiplied state
        this.distMultiplier = 1;
    }

    fillInDefaultPlacement(start_index){
        for(let i = 2;i<11; i++){
            this.new_plane[start_index+i] = 0;
        }
    }
}